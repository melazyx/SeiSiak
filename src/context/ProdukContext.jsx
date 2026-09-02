import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ProdukContext = createContext(null);

const SECTIONS = [
  "kambingSusuPupuk",
  "kambingQurban",
  "ayamJual",
  "ayamPupuk",
  "maggotProduk",
];

function groupBySection(rows) {
  const grouped = {};
  SECTIONS.forEach((s) => (grouped[s] = []));

  rows.forEach((row) => {
    if (!grouped[row.section]) grouped[row.section] = [];
    grouped[row.section].push({
      id: row.id,
      nama: row.nama,
      harga: row.harga,
      deskripsi: row.deskripsi,
      image: row.image_url || "",
    });
  });

  return grouped;
}

export function ProdukProvider({ children }) {
  const [data, setData] = useState(() => {
    const empty = {};
    SECTIONS.forEach((s) => (empty[s] = []));
    return empty;
  });
  const [loading, setLoading] = useState(true);

  async function fetchProduk() {
    setLoading(true);

    const { data: rows, error } = await supabase
      .from("produk")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Gagal ambil data produk:", error.message);
      setLoading(false);
      return;
    }

    setData(groupBySection(rows));
    setLoading(false);
  }

  useEffect(() => {
    fetchProduk();
  }, []);

  async function addProduk(section, fields) {
    const { error } = await supabase.from("produk").insert({
      section,
      nama: fields.nama,
      harga: fields.harga,
      deskripsi: fields.deskripsi,
      image_url: fields.image || null,
    });

    if (error) {
      alert("Gagal menyimpan produk: " + error.message);
      return;
    }

    await fetchProduk();
  }

  async function editProduk(section, id, fields) {
    const { error } = await supabase
      .from("produk")
      .update({
        nama: fields.nama,
        harga: fields.harga,
        deskripsi: fields.deskripsi,
        image_url: fields.image || null,
      })
      .eq("id", id);

    if (error) {
      alert("Gagal mengubah produk: " + error.message);
      return;
    }

    await fetchProduk();
  }

  async function deleteProduk(section, id) {
    const { error } = await supabase.from("produk").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus produk: " + error.message);
      return;
    }

    await fetchProduk();
  }

  return (
    <ProdukContext.Provider
      value={{ data, loading, addProduk, editProduk, deleteProduk }}
    >
      {children}
    </ProdukContext.Provider>
  );
}

export function useProduk() {
  return useContext(ProdukContext);
}