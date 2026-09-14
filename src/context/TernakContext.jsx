import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { catatAktivitas } from "../utils/auditLog";

const TernakContext = createContext(null);

export function TernakProvider({ children }) {
  const [ternak, setTernak] = useState([]);
  const [kesehatan, setKesehatan] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAll() {
    setLoading(true);

    const [{ data: tn, error: e1 }, { data: ks, error: e2 }] = await Promise.all([
      supabase.from("ternak").select("*").order("tanggal_masuk", { ascending: false }),
      supabase.from("kesehatan").select("*").order("tanggal", { ascending: false }),
    ]);

    if (e1) console.error("Gagal ambil ternak:", e1.message);
    if (e2) console.error("Gagal ambil kesehatan:", e2.message);

    setTernak(tn || []);
    setKesehatan(ks || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  function getByKategori(kategori) {
    return ternak.filter((t) => t.kategori === kategori);
  }

  function getKesehatanByTernak(ternakId) {
    return kesehatan.filter((k) => k.ternak_id === ternakId);
  }

  async function addTernak(fields) {
    const { error } = await supabase.from("ternak").insert(fields);
    if (error) {
      alert("Gagal menambah ternak: " + error.message);
      return { ok: false };
    }

    catatAktivitas("tambah", "ternak", `Menambah ternak "${fields.kode}"`);

    await fetchAll();
    return { ok: true };
  }

  async function editTernak(id, fields) {
    const { error } = await supabase.from("ternak").update(fields).eq("id", id);
    if (error) {
      alert("Gagal mengubah ternak: " + error.message);
      return { ok: false };
    }

    catatAktivitas("ubah", "ternak", `Mengubah data ternak id ${id}`);

    await fetchAll();
    return { ok: true };
  }

  async function deleteTernak(id) {
    const { error } = await supabase.from("ternak").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus ternak: " + error.message);
      return;
    }

    catatAktivitas("hapus", "ternak", `Menghapus ternak id ${id}`);

    await fetchAll();
  }

  async function addKesehatan(fields) {
    const { error } = await supabase.from("kesehatan").insert(fields);
    if (error) {
      alert("Gagal menambah catatan kesehatan: " + error.message);
      return { ok: false };
    }

    catatAktivitas("tambah", "kesehatan", `Menambah catatan kesehatan (${fields.tipe}) untuk ternak id ${fields.ternak_id}`);

    await fetchAll();
    return { ok: true };
  }

  async function deleteKesehatan(id) {
    const { error } = await supabase.from("kesehatan").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }

    catatAktivitas("hapus", "kesehatan", `Menghapus catatan kesehatan id ${id}`);
    await fetchAll();
  }

  return (
    <TernakContext.Provider
      value={{
        ternak,
        kesehatan,
        loading,
        getByKategori,
        getKesehatanByTernak,
        addTernak,
        editTernak,
        deleteTernak,
        addKesehatan,
        deleteKesehatan,
      }}
    >
      {children}
    </TernakContext.Provider>
  );
}

export function useTernak() {
  return useContext(TernakContext);
}