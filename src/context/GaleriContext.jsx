import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { catatAktivitas } from "../utils/auditLog";

const GaleriContext = createContext(null);
const BUCKET = "galeri-images";

export function GaleriProvider({ children }) {
    const [galeri, setGaleri] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchGaleri() {
        setLoading(true);

        const { data, error } = await supabase
            .from("galeri")
            .select("*")
            .order("urutan", { ascending: true });

        if (error) {
            console.error("Gagal mengambil galeri:", error.message);
        } else {
            setGaleri(data);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchGaleri();
    }, []);

    async function addFoto(file, keterangan) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from(BUCKET)
            .upload(fileName, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

        const urutan = galeri.length;

        const { error } = await supabase.from("galeri").insert({
            image_url: data.publicUrl,
            keterangan: keterangan || "",
            urutan,
        });

        if (error) {
            throw error;
        }

        catatAktivitas("tambah", "galeri", `Menambah foto galeri${keterangan ? ` ("${keterangan}")` : ""}`);

        await fetchGaleri();
    }

    async function deleteFoto(id) {
        const { error } = await supabase.from("galeri").delete().eq("id", id);
        if (error) {
            alert("Gagal menghapus foto: " + error.message);
            return;
        }

        catatAktivitas("hapus", "galeri", `Menghapus foto galeri id ${id}`);

        await fetchGaleri();
    }

    return (
        <GaleriContext.Provider value={{ galeri, loading, addFoto, deleteFoto }}>
            {children}
        </GaleriContext.Provider>
    );
}

export function useGaleri() {
    return useContext(GaleriContext);
}