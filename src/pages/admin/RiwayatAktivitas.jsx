import { useEffect, useState } from "react";
import { History, Filter } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { supabase } from "../../lib/supabaseClient";

const AKSI_WARNA = {
  tambah: "bg-green-100 text-green-700",
  ubah: "bg-blue-100 text-blue-700",
  hapus: "bg-red-100 text-red-700",
};

export default function RiwayatAktivitas() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTabel, setFilterTabel] = useState("semua");
  const [filterEmail, setFilterEmail] = useState("");

  async function fetchLogs() {
    setLoading(true);
    const { data, error } = await supabase
      .from("audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.error("Gagal ambil riwayat:", error.message);
    }
    setLogs(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  const daftarTabel = ["semua", ...new Set(logs.map((l) => l.tabel_terkait))];

  const filtered = logs.filter((l) => {
    if (filterTabel !== "semua" && l.tabel_terkait !== filterTabel) return false;
    if (filterEmail && !l.user_email?.toLowerCase().includes(filterEmail.toLowerCase())) return false;
    return true;
  });

  function formatWaktu(iso) {
    return new Date(iso).toLocaleString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
            <History size={22} className="text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Admin Panel</p>
            <h1 className="text-2xl font-bold text-ink font-heading">Riwayat Aktivitas</h1>
          </div>
        </div>

        <div className="bg-white border border-line rounded-2xl p-5 flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Filter data</label>
            <select value={filterTabel} onChange={(e) => setFilterTabel(e.target.value)} className="px-3 py-2 rounded-lg border border-line text-sm capitalize">
              {daftarTabel.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Cari email karyawan</label>
            <input type="text" value={filterEmail} onChange={(e) => setFilterEmail(e.target.value)} placeholder="nama@email.com" className="px-3 py-2 rounded-lg border border-line text-sm" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted ml-auto">
            <Filter size={13} /> Menampilkan {filtered.length} dari {logs.length} aktivitas terakhir
          </div>
        </div>

        <div className="bg-white border border-line rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream text-left">
              <tr>
                <th className="px-4 py-3">Waktu</th>
                <th className="px-4 py-3">Karyawan</th>
                <th className="px-4 py-3">Aksi</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="border-t border-line">
                  <td className="px-4 py-3 text-muted whitespace-nowrap">{formatWaktu(l.created_at)}</td>
                  <td className="px-4 py-3">{l.user_email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${AKSI_WARNA[l.aksi] || "bg-gray-100 text-gray-700"}`}>
                      {l.aksi}
                    </span>
                  </td>
                  <td className="px-4 py-3 capitalize">{l.tabel_terkait}</td>
                  <td className="px-4 py-3 text-muted">{l.deskripsi}</td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted">Belum ada aktivitas tercatat.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}