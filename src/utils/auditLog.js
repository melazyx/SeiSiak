import { supabase } from "../lib/supabaseClient";

export async function catatAktivitas(aksi, tabelTerkait, deskripsi) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("audit_log").insert({
    user_email: user?.email || "tidak diketahui",
    aksi,
    tabel_terkait: tabelTerkait,
    deskripsi,
  });

  if (error) {
    console.error("Gagal mencatat aktivitas:", error.message);
  }
}