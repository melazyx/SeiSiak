import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const PakanContext = createContext(null);

export function PakanProvider({ children }) {
  const [jenisPakan, setJenisPakan] = useState([]);
  const [pakanMasuk, setPakanMasuk] = useState([]);
  const [pakanKeluar, setPakanKeluar] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAll() {
    setLoading(true);

    const [
      { data: jp, error: e1 },
      { data: pm, error: e2 },
      { data: pk, error: e3 },
    ] = await Promise.all([
      supabase.from("jenis_pakan").select("*").order("nama"),
      supabase.from("pakan_masuk").select("*").order("tanggal_masuk", { ascending: false }),
      supabase.from("pakan_keluar").select("*").order("tanggal", { ascending: false }),
    ]);

    if (e1) console.error("Gagal ambil jenis pakan:", e1.message);
    if (e2) console.error("Gagal ambil pakan masuk:", e2.message);
    if (e3) console.error("Gagal ambil pakan keluar:", e3.message);

    setJenisPakan(jp || []);
    setPakanMasuk(pm || []);
    setPakanKeluar(pk || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  function hitungStok(jenisPakanId) {
    const totalMasuk = pakanMasuk
      .filter((m) => m.jenis_pakan_id === jenisPakanId)
      .reduce((sum, m) => sum + Number(m.jumlah), 0);
    const totalKeluar = pakanKeluar
      .filter((k) => k.jenis_pakan_id === jenisPakanId)
      .reduce((sum, k) => sum + Number(k.jumlah), 0);
    return totalMasuk - totalKeluar;
  }

  function ringkasanStok() {
    return jenisPakan.map((jp) => ({
      ...jp,
      stok: hitungStok(jp.id),
      menipis: hitungStok(jp.id) <= jp.batas_minimum,
    }));
  }

  function pakanKadaluarsaMendekat(hariBatas = 14) {
    const batas = new Date();
    batas.setDate(batas.getDate() + hariBatas);
    const batasStr = batas.toISOString().slice(0, 10);

    return pakanMasuk
      .filter((m) => m.tanggal_kadaluarsa && m.tanggal_kadaluarsa <= batasStr)
      .map((m) => ({
        ...m,
        jenis: jenisPakan.find((jp) => jp.id === m.jenis_pakan_id)?.nama || "-",
      }));
  }

  async function addJenisPakan(fields) {
    const { error } = await supabase.from("jenis_pakan").insert(fields);
    if (error) {
      alert("Gagal menambah jenis pakan: " + error.message);
      return { ok: false };
    }

    catatAktivitas("tambah", "jenis_pakan", `Menambah jenis pakan "${fields.nama}"`);

    await fetchAll();
    return { ok: true };
  }

  async function deleteJenisPakan(id) {
    const { error } = await supabase.from("jenis_pakan").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus jenis pakan: " + error.message);
      return;
    }

    catatAktivitas("hapus", "jenis_pakan", `Menghapus jenis pakan id ${id}`);

    await fetchAll();
  }

  async function addPakanMasuk(fields) {
    const { error } = await supabase.from("pakan_masuk").insert(fields);
    if (error) {
      alert("Gagal mencatat pakan masuk: " + error.message);
      return { ok: false };
    }

    catatAktivitas("tambah", "pakan_masuk", `Mencatat pakan masuk ${fields.jumlah} untuk jenis id ${fields.jenis_pakan_id}`);

    await fetchAll();
    return { ok: true };
  }

  async function deletePakanMasuk(id) {
    const { error } = await supabase.from("pakan_masuk").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }

    catatAktivitas("hapus", "pakan_masuk", `Menghapus catatan pakan masuk id ${id}`);

    await fetchAll();
  }

  async function addPakanKeluar(fields) {
    const { error } = await supabase.from("pakan_keluar").insert(fields);
    if (error) {
      alert("Gagal mencatat pemakaian: " + error.message);
      return { ok: false };
    }

    catatAktivitas("tambah", "pakan_keluar", `Mencatat pemakaian ${fields.jumlah} untuk kandang ${fields.kandang}`);

    await fetchAll();
    return { ok: true };
  }

  async function deletePakanKeluar(id) {
    const { error } = await supabase.from("pakan_keluar").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }

    catatAktivitas("hapus", "pakan_keluar", `Menghapus catatan pemakaian id ${id}`);
    
    await fetchAll();
  }

  return (
    <PakanContext.Provider
      value={{
        jenisPakan,
        pakanMasuk,
        pakanKeluar,
        loading,
        hitungStok,
        ringkasanStok,
        pakanKadaluarsaMendekat,
        addJenisPakan,
        deleteJenisPakan,
        addPakanMasuk,
        deletePakanMasuk,
        addPakanKeluar,
        deletePakanKeluar,
      }}
    >
      {children}
    </PakanContext.Provider>
  );
}

export function usePakan() {
  return useContext(PakanContext);
}