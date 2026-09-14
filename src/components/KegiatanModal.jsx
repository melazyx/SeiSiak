import { useEffect, useState } from "react";
import { X, Upload, Image as ImageIcon, Trash2 } from "lucide-react";

const CATEGORY_OPTIONS = [
  { label: "Kegiatan", value: "Kegiatan", color: "primary" },
  { label: "Pelatihan", value: "Pelatihan", color: "secondary" },
  { label: "Bantuan", value: "Bantuan", color: "accent" },
];

export default function KegiatanModal({ open, onClose, onSave, initialData }) {
  const [category, setCategory] = useState("Kegiatan");
  const [title, setTitle] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [description, setDescription] = useState("");
  const [isLarge, setIsLarge] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category || "Kegiatan");
      setTitle(initialData.title || "");
      setActivityDate(initialData.activity_date || "");
      setDescription(initialData.description || "");
      setIsLarge(initialData.is_large || false);
      setPreview(initialData.image_url || "");
      setImageFile(null);
    } else {
      setCategory("Kegiatan");
      setTitle("");
      setActivityDate("");
      setDescription("");
      setIsLarge(false);
      setPreview("");
      setImageFile(null);
    }
  }, [initialData, open]);

  if (!open) return null;

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
    setPreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    setPreview("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Judul kegiatan wajib diisi.");
      return;
    }
    if (!activityDate.trim()) {
      alert("Tanggal/periode wajib diisi.");
      return;
    }

    setSaving(true);
    try {
      const categoryColor = CATEGORY_OPTIONS.find((c) => c.value === category)?.color || "primary";

      await onSave(
        {
          category,
          category_color: categoryColor,
          title: title.trim(),
          activity_date: activityDate.trim(),
          description: description.trim(),
          is_large: isLarge,
        },
        imageFile
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <div className="sticky top-0 z-10 bg-white border-b border-line px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Kelola Kegiatan</p>
            <h2 className="text-lg font-bold text-ink mt-0.5">{initialData ? "Edit Kegiatan" : "Tambah Kegiatan"}</h2>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">Kategori</label>
            <div className="flex gap-2">
              {CATEGORY_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setCategory(opt.value)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold border ${
                    category === opt.value ? "bg-primary text-white border-primary" : "border-line text-muted"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">Judul Kegiatan</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Pelatihan Manajemen Ternak"
              className="w-full px-4 py-3 rounded-xl border border-line text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">Tanggal / Periode</label>
            <input
              type="text"
              value={activityDate}
              onChange={(e) => setActivityDate(e.target.value)}
              placeholder="Contoh: Maret 2024"
              className="w-full px-4 py-3 rounded-xl border border-line text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">Deskripsi Lengkap</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan kegiatan ini selengkapnya..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-line text-sm outline-none resize-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={isLarge} onChange={(e) => setIsLarge(e.target.checked)} className="w-4 h-4" />
            Tampilkan sebagai kartu besar
          </label>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">Foto Kegiatan</label>

            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-line bg-gray-50">
                <img src={preview} alt={title || "Preview"} className="w-full h-52 object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white text-red-600 shadow-md flex items-center justify-center hover:bg-red-50"
                  title="Hapus gambar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer border-2 border-dashed border-line rounded-xl p-8 text-center hover:border-primary transition-colors">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary-tint flex items-center justify-center mb-3">
                  <ImageIcon size={22} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-ink">Upload foto kegiatan</p>
                <p className="text-xs text-muted mt-1">PNG, JPG, JPEG atau WEBP — maksimal 2 MB</p>
                <div className="inline-flex items-center gap-2 mt-4 bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold">
                  <Upload size={14} />
                  Pilih Gambar
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-line text-sm font-semibold text-muted hover:bg-gray-50">
              Batal
            </button>
            <button type="submit" disabled={saving} className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold disabled:opacity-60">
              {saving ? "Menyimpan..." : initialData ? "Simpan Perubahan" : "Tambah Kegiatan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}