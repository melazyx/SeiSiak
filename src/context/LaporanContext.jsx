import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const LaporanContext = createContext(null);

export function LaporanProvider({ children }) {
  const [produksi, setProduksi] = useState([]);
  const [penjualan, setPenjualan] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAll() {
    setLoading(true);

    const [{ data: pr, error: e1 }, { data: pj, error: e2 }] = await Promise.all([
      supabase.from("produksi").select("*").order("tanggal", { ascending: false }),
      supabase.from("penjualan").select("*").order("tanggal", { ascending: false }),
    ]);

    if (e1) console.error("Gagal ambil produksi:", e1.message);
    if (e2) console.error("Gagal ambil penjualan:", e2.message);

    setProduksi(pr || []);
    setPenjualan(pj || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  async function addProduksi(fields) {
    const { error } = await supabase.from("produksi").insert(fields);
    if (error) {
      alert("Gagal menyimpan data produksi: " + error.message);
      return { ok: false };
    }

    catatAktivitas("tambah", "produksi", `Mencatat produksi ${fields.jenis} sejumlah ${fields.jumlah}`);

    await fetchAll();
    return { ok: true };
  }

  async function deleteProduksi(id) {
    const { error } = await supabase.from("produksi").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }

    catatAktivitas("tambah", "penjualan", `Menghapus catatan produksi id ${id}`);

    await fetchAll();
  }

  async function addPenjualan(fields) {
    const { error } = await supabase.from("penjualan").insert(fields);
    if (error) {
      alert("Gagal menyimpan data penjualan: " + error.message);
      return { ok: false };
    }

    catatAktivitas("tambah", "penjualan", `Mencatat penjualan ${fields.jenis} sejumlah ${fields.jumlah}`);

    await fetchAll();
    return { ok: true };
  }

  async function deletePenjualan(id) {
    const { error } = await supabase.from("penjualan").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }

    catatAktivitas("hapus", "penjualan", `Menghapus catatan penjualan id ${id}`);
    
    await fetchAll();
  }

  return (
    <LaporanContext.Provider
      value={{
        produksi,
        penjualan,
        loading,
        addProduksi,
        deleteProduksi,
        addPenjualan,
        deletePenjualan,
      }}
    >
      {children}
    </LaporanContext.Provider>
  );
}

export function useLaporan() {
  return useContext(LaporanContext);
}