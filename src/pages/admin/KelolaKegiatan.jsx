import { useState } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { useKegiatan } from "../../context/KegiatanContext";

const KATEGORI_OPTIONS = [
  { value: "primary", label: "Merah" },
  { value: "secondary", label: "Biru" },
  { value: "accent", label: "Hijau" },
];

const FORM_KOSONG = {
  title: "",
  category: "",
  category_color: "primary",
  activity_date: "",
  is_large: false,
  description: "",
};

export default function KelolaKegiatan() {
  const { kegiatan, loading, addKegiatan, editKegiatan, deleteKegiatan } = useKegiatan();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(FORM_KOSONG);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditing(null);
    setForm(FORM_KOSONG);
    setImageFile(null);
    setImagePreview(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setEditing(item);
    setForm({
      title: item.title || "",
      category: item.category || "",
      category_color: item.category_color || "primary",
      activity_date: item.activity_date || "",
      is_large: item.is_large || false,
      description: item.description || "",
    });
    setImageFile(null);
    setImagePreview(item.image_url || null);
    setShowForm(true);
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2 MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim() || !form.activity_date) {
      alert("Judul dan tanggal kegiatan wajib diisi.");
      return;
    }

    setSaving(true);

    try {
      if (editing) {
        await editKegiatan(editing.id, form, imageFile);
      } else {
        await addKegiatan(form, imageFile);
      }
      setShowForm(false);
    } catch (err) {
      alert("Gagal menyimpan: " + err.message);
    }

    setSaving(false);
  }

  function handleDelete(item) {
    const ok = window.confirm(`Hapus kegiatan "${item.title}"?`);
    if (ok) deleteKegiatan(item.id);
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Admin Panel</p>
            <h1 className="text-2xl font-bold text-ink font-heading">Kelola Kegiatan</h1>
            <p className="text-sm text-muted mt-1">Atur dokumentasi kegiatan yang tampil di halaman Tentang Kami.</p>
          </div>

          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            <Plus size={17} />
            Tambah Kegiatan
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {kegiatan.map((item) => (
            <div key={item.id} className="bg-white border border-line rounded-2xl overflow-hidden">
              <div className="relative h-36 bg-cream">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted">
                    <ImageIcon size={28} />
                  </div>
                )}
                {item.category && (
                  <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-ink">
                    {item.category}
                  </span>
                )}
              </div>

              <div className="p-4">
                <p className="text-xs text-muted mb-1">{item.activity_date}</p>
                <h3 className="font-bold text-ink mb-2">{item.title}</h3>
                <p className="text-xs text-muted line-clamp-2 mb-3">{item.description}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-line text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-line text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!loading && kegiatan.length === 0 && (
            <div className="sm:col-span-2 text-center py-10 text-muted text-sm">
              Belum ada kegiatan. Tambahkan yang pertama.
            </div>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowForm(false)} />

            <form
              onSubmit={handleSubmit}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4"
            >
              <h2 className="text-lg font-bold text-ink">
                {editing ? "Edit Kegiatan" : "Tambah Kegiatan"}
              </h2>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Judul kegiatan</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Contoh: Kunjungan Fuel Terminal Sei Siak"
                  className="w-full px-4 py-2.5 rounded-xl border border-line text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Kategori (label)</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Contoh: Pelatihan"
                    className="w-full px-4 py-2.5 rounded-xl border border-line text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Warna label</label>
                  <select
                    value={form.category_color}
                    onChange={(e) => setForm({ ...form, category_color: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-line text-sm outline-none focus:border-primary"
                  >
                    {KATEGORI_OPTIONS.map((k) => (
                      <option key={k.value} value={k.value}>{k.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Tanggal kegiatan</label>
                <input
                  type="date"
                  value={form.activity_date}
                  onChange={(e) => setForm({ ...form, activity_date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-line text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Deskripsi lengkap</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  placeholder="Muncul saat kartu kegiatan diklik pengunjung"
                  className="w-full px-4 py-2.5 rounded-xl border border-line text-sm outline-none resize-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Foto kegiatan</label>
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-line">
                    <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover" />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(null); }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white text-red-600 shadow flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="block cursor-pointer border-2 border-dashed border-line rounded-xl p-6 text-center hover:border-primary hover:bg-primary-light/30 transition-colors">
                    <ImageIcon size={20} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium text-ink">Upload foto (opsional)</p>
                    <p className="text-xs text-muted mt-1">Maksimal 2 MB</p>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={form.is_large}
                  onChange={(e) => setForm({ ...form, is_large: e.target.checked })}
                />
                Tampilkan sebagai kartu besar (menonjol) di halaman Tentang Kami
              </label>

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