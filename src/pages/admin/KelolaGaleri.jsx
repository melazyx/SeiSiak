import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { useGaleri } from "../../context/GaleriContext";

export default function KelolaGaleri() {
  const { galeri, loading, addFoto, deleteFoto } = useGaleri();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [keterangan, setKeterangan] = useState("");
  const [uploading, setUploading] = useState(false);

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

  async function handleUpload(e) {
    e.preventDefault();
    if (!imageFile) {
      alert("Pilih foto dulu.");
      return;
    }

    setUploading(true);
    try {
      await addFoto(imageFile, keterangan.trim());
      setImageFile(null);
      setImagePreview(null);
      setKeterangan("");
    } catch (err) {
      alert("Gagal upload: " + err.message);
    }
    setUploading(false);
  }

  function handleDelete(item) {
    const ok = window.confirm("Hapus foto ini dari galeri?");
    if (ok) deleteFoto(item.id);
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Admin Panel</p>
          <h1 className="text-2xl font-bold text-ink font-heading">Kelola Galeri Foto</h1>
          <p className="text-sm text-muted mt-1">Foto-foto ini tampil di galeri halaman Tentang Kami.</p>
        </div>

        <form onSubmit={handleUpload} className="bg-white border border-line rounded-2xl p-5 space-y-4">
          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-line">
              <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={() => { setImageFile(null); setImagePreview(null); }}
                className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white text-red-600 shadow flex items-center justify-center"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <label className="block cursor-pointer border-2 border-dashed border-line rounded-xl p-8 text-center hover:border-primary hover:bg-primary-light/30 transition-colors">
              <ImageIcon size={22} className="mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium text-ink">Upload foto baru</p>
              <p className="text-xs text-muted mt-1">Maksimal 2 MB per foto</p>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}

          <div>
            <label className="block text-sm font-semibold text-ink mb-1">Keterangan (opsional)</label>
            <input
              type="text"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Contoh: Kandang biotechnology tanpa bau"
              className="w-full px-4 py-2.5 rounded-xl border border-line text-sm outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60"
          >
            <Plus size={16} />
            {uploading ? "Mengunggah..." : "Tambah ke Galeri"}
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {galeri.map((item) => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden border border-line">
              <img src={item.image_url} alt={item.keterangan} className="w-full h-32 object-cover" />
              {item.keterangan && (
                <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 truncate">
                  {item.keterangan}
                </p>
              )}
              <button
                onClick={() => handleDelete(item)}
                className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/90 text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          {!loading && galeri.length === 0 && (
            <div className="col-span-full text-center py-10 text-muted text-sm">
              Belum ada foto di galeri.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}