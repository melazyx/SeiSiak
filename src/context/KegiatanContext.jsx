import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { catatAktivitas } from "../utils/auditLog";

const KegiatanContext = createContext(null);

const BUCKET = "kegiatan-images";

export function KegiatanProvider({ children }) {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchKegiatan() {
    setLoading(true);

    const { data, error } = await supabase
      .from("kegiatan")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil data kegiatan:", error);
    } else {
      setKegiatan(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchKegiatan();
  }, []);

  async function uploadImage(file) {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file);

    if (uploadError) {
      console.error("Gagal upload gambar:", uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function addKegiatan(fields, imageFile) {
    let image_url = null;

    if (imageFile) {
      image_url = await uploadImage(imageFile);
    }

    const { error } = await supabase
      .from("kegiatan")
      .insert({
        ...fields,
        image_url,
      });

    if (error) {
      console.error("Gagal menambah kegiatan:", error);
      throw error;
    }

    await fetchKegiatan();
  }

  async function editKegiatan(id, fields, imageFile) {
    const updateData = {
      ...fields,
    };

    if (imageFile) {
      updateData.image_url = await uploadImage(imageFile);
    }

    const { error } = await supabase
      .from("kegiatan")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error("Gagal mengubah kegiatan:", error);
      throw error;
    }

    await fetchKegiatan();
  }

  async function deleteKegiatan(id) {
    const { error } = await supabase
      .from("kegiatan")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Gagal menghapus kegiatan:", error);
      throw error;
    }

    await fetchKegiatan();
  }

  return (
    <KegiatanContext.Provider
      value={{
        kegiatan,
        loading,
        addKegiatan,
        editKegiatan,
        deleteKegiatan,
      }}
    >
      {children}
    </KegiatanContext.Provider>
  );
}

export function useKegiatan() {
  return useContext(KegiatanContext);
}