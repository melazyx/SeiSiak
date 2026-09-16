import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { catatAktivitas } from "../utils/auditLog";

const KategoriContext = createContext(null);

function toSectionKey(animal, judul) {
  const words = (animal + " " + judul).trim().split(/\s+/);
  return words
    .map((w, i) =>
      i === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join("")
    .replace(/[^a-zA-Z0-9]/g, "");
}

export function KategoriProvider({ children }) {
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchKategori() {
    setLoading(true);

    const { data, error } = await supabase
      .from("kategori")
      .select("*")
      .order("urutan", { ascending: true });

    if (error) {
      console.error("Gagal ambil kategori:", error.message);
      setLoading(false);
      return;
    }

    setKategori(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchKategori();
  }, []);

  function getByAnimal(animal) {
    return kategori.filter((k) => k.animal === animal);
  }

  async function addKategori({ animal, judul, deskripsi, tipe }) {
    const sectionKey = toSectionKey(animal, judul);
    const urutan = getByAnimal(animal).length + 1;

    const { error } = await supabase.from("kategori").insert({
      animal,
      section_key: sectionKey,
      judul,
      deskripsi: deskripsi || "",
      tipe: tipe || "produk",
      urutan,
    });

    if (error) {
      alert("Gagal menambah kategori: " + error.message);
      return { ok: false, message: error.message };
    }

    catatAktivitas("tambah", "kategori", `Menambah kategori "${judul}" untuk ${animal}`);

    await fetchKategori();
    return { ok: true };
  }

  async function editKategori(id, fields) {
    const { error } = await supabase
      .from("kategori")
      .update({
        judul: fields.judul,
        deskripsi: fields.deskripsi,
        tipe: fields.tipe,
      })
      .eq("id", id);

    if (error) {
      alert("Gagal mengubah kategori: " + error.message);
      return;
    }

    catatAktivitas("ubah", "kategori", `Mengubah kategori id ${id}`);

    await fetchKategori();
  }

  async function deleteKategori(id) {
    const { error } = await supabase.from("kategori").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus kategori: " + error.message);
      return;
    }

    catatAktivitas("hapus", "kategori", `Menghapus kategori id ${id}`);

    await fetchKategori();
  }

  return (
    <KategoriContext.Provider
      value={{
        kategori,
        loading,
        getByAnimal,
        addKategori,
        editKategori,
        deleteKategori,
      }}
    >
      {children}
    </KategoriContext.Provider>
  );
}

export function useKategori() {
  return useContext(KategoriContext);
}