import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { useKategori } from "../../context/KategoriContext";

const PAGE_INFO = {
  kambing: { title: "Kategori Kambing", icon: "🐐" },
  ayam: { title: "Kategori Ayam", icon: "🐔" },
  maggot: { title: "Kategori Maggot", icon: "🪱" },
};

export default function KelolaKategori() {
  const { kategori: animal } = useParams();
  const { getByAnimal, addKategori, editKategori, deleteKategori } = useKategori();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tipe, setTipe] = useState("produk");
  const [saving, setSaving] = useState(false);

  const list = getByAnimal(animal);
  const pageInfo = PAGE_INFO[animal] || { title: "Kategori", icon: "📦" };

  function openAdd() {
    setEditing(null);
    setJudul("");
    setDeskripsi("");
    setTipe("produk");
    setShowForm(true);
  }

  function openEdit(k) {
    setEditing(k);
    setJudul(k.judul);
    setDeskripsi(k.deskripsi || "");
    setTipe(k.tipe);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!judul.trim()) {
      alert("Judul kategori wajib diisi.");
      return;
    }

    setSaving(true);

    if (editing) {
      await editKategori(editing.id, {
        judul: judul.trim(),
        deskripsi: deskripsi.trim(),
        tipe,
      });
    } else {
      const res = await addKategori({
        animal,
        judul: judul.trim(),
        deskripsi: deskripsi.trim(),
        tipe,
      });
      if (!res.ok) {
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    setShowForm(false);
  }

  function handleDelete(k) {
    const confirmDelete = window.confirm(
      `Hapus kategori "${k.judul}"? Produk yang sudah ada di kategori ini TIDAK ikut terhapus, tapi jadi tidak punya tab tempat tampil.`
    );
    if (!confirmDelete) return;
    deleteKategori(k.id);
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-2xl">
              {pageInfo.icon}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Admin Panel
              </p>
              <h1 className="text-2xl font-bold text-ink font-heading">
                {pageInfo.title}
              </h1>
            </div>
          </div>

          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            <Plus size={17} />
            Tambah Kategori
          </button>
        </div>

        <div className="space-y-3">
          {list.map((k) => (
            <div
              key={k.id}
              className="bg-white border border-line rounded-2xl p-5 flex items-start justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Tag size={15} className="text-primary" />
                  <h3 className="font-bold text-ink">{k.judul}</h3>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cream text-muted">
                    {k.tipe === "layanan" ? "Layanan" : "Produk"}
                  </span>
                </div>
                <p className="text-sm text-muted mt-1">{k.deskripsi}</p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEdit(k)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-line text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(k)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-line text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}

          {list.length === 0 && (
            <div className="text-center py-10 text-muted text-sm">
              Belum ada kategori. Tambahkan yang pertama.
            </div>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowForm(false)}
            />
            <form
              onSubmit={handleSubmit}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4"
            >
              <h2 className="text-lg font-bold text-ink">
                {editing ? "Edit Kategori" : "Tambah Kategori"}
              </h2>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">
                  Judul kategori
                </label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: Pakan Kambing"
                  className="w-full px-4 py-3 rounded-xl border border-line text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">
                  Deskripsi singkat
                </label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-line text-sm outline-none resize-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">
                  Jenis tab
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setTipe("produk")}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border ${
                      tipe === "produk"
                        ? "bg-primary text-white border-primary"
                        : "border-line text-muted"
                    }`}
                  >
                    Daftar produk
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipe("layanan")}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border ${
                      tipe === "layanan"
                        ? "bg-primary text-white border-primary"
                        : "border-line text-muted"
                    }`}
                  >
                    Info layanan (teks + WA)
                  </button>
                </div>
                <p className="text-xs text-muted mt-2">
                  Pilih "Daftar produk" kalau tab ini nanti diisi kartu-kartu
                  produk (kayak Susu & Pupuk). Pilih "Info layanan" kalau tab
                  ini cuma teks penjelasan + tombol WhatsApp (kayak Titip
                  Ternak).
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-line text-sm font-semibold text-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-60"
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}