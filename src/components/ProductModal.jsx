import { useEffect, useState } from "react";
import {
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
  Loader2,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function ProductModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] =
    useState("");

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama || "");
      setHarga(initialData.harga || "");
      setDeskripsi(
        initialData.deskripsi || ""
      );
      setImage(initialData.image || "");
    } else {
      setNama("");
      setHarga("");
      setDeskripsi("");
      setImage("");
    }
    setUploading(false);
    setSaving(false);
  }, [initialData, open]);

  if (!open) return null;


  // =========================
  // UPLOAD GAMBAR
  // =========================

  async function handleImageChange(e) {
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

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("produk-images")
      .upload(fileName, file);

    if (uploadError) {
      alert("Gagal upload gambar: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("produk-images")
      .getPublicUrl(fileName);

    setImage(data.publicUrl);
    setUploading(false);
  }


  // =========================
  // HAPUS GAMBAR
  // =========================

  function removeImage() {
    setImage("");
  }


  // =========================
  // SAVE
  // =========================

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nama.trim()) {
      alert("Nama produk wajib diisi.");
      return;
    }

    if (!harga.trim()) {
      alert("Harga produk wajib diisi.");
      return;
    }

    if (uploading) {
      alert("Tunggu sampai foto selesai diunggah dulu.");
      return;
    }

    setSaving(true);

    await onSave({
      nama: nama.trim(),
      harga: harga.trim(),
      deskripsi: deskripsi.trim(),
      image: image || "",
    });

    setSaving(false);
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* BACKDROP */}

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />


      {/* MODAL */}

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">

        {/* HEADER */}

        <div className="sticky top-0 z-10 bg-white border-b border-line px-6 py-4 flex items-center justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Manajemen Produk
            </p>

            <h2 className="text-lg font-bold text-ink mt-0.5">
              {initialData
                ? "Edit Produk"
                : "Tambah Produk"}
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X size={19} />
          </button>

        </div>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* ================= NAMA ================= */}

          <div>

            <label className="block text-sm font-semibold text-ink mb-2">
              Nama Produk
            </label>

            <input
              type="text"
              value={nama}
              onChange={(e) =>
                setNama(e.target.value)
              }
              placeholder="Contoh: Ayam Kampung Hidup"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-line
                text-sm
                outline-none
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />

          </div>


          {/* ================= HARGA ================= */}

          <div>

            <label className="block text-sm font-semibold text-ink mb-2">
              Harga
            </label>

            <input
              type="text"
              value={harga}
              onChange={(e) =>
                setHarga(e.target.value)
              }
              placeholder="Contoh: Rp 75.000 / ekor"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-line
                text-sm
                outline-none
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />

          </div>


          {/* ================= DESKRIPSI ================= */}

          <div>

            <label className="block text-sm font-semibold text-ink mb-2">
              Deskripsi
            </label>

            <textarea
              value={deskripsi}
              onChange={(e) =>
                setDeskripsi(
                  e.target.value
                )
              }
              placeholder="Jelaskan produk..."
              rows={4}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-line
                text-sm
                outline-none
                resize-none
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />

          </div>


          {/* ================= GAMBAR ================= */}

          <div>

            <label className="block text-sm font-semibold text-ink mb-2">
              Gambar Produk
            </label>

            {image ? (

              <div className="relative rounded-xl overflow-hidden border border-line bg-gray-50">

                <img
                  src={image}
                  alt={nama || "Preview"}
                  className="w-full h-52 object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="
                    absolute
                    top-3
                    right-3
                    w-9
                    h-9
                    rounded-lg
                    bg-white
                    text-red-600
                    shadow-md
                    flex
                    items-center
                    justify-center
                    hover:bg-red-50
                  "
                  title="Hapus gambar"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            ) : (

              <label className={`
                block
                cursor-pointer
                border-2
                border-dashed
                border-line
                rounded-xl
                p-8
                text-center
                transition-colors
                ${uploading
                  ? "opacity-60 pointer-events-none"
                  : "hover:border-primary hover:bg-primary-light/30"
                }
              `}>

                <div className="w-12 h-12 mx-auto rounded-xl bg-primary-light flex items-center justify-center mb-3">

                  {uploading ? (
                    <Loader2
                      size={22}
                      className="text-primary animate-spin"
                    />
                  ) : (
                    <ImageIcon
                      size={22}
                      className="text-primary"
                    />
                  )}

                </div>

                <p className="text-sm font-semibold text-ink">
                  {uploading ? "Mengunggah..." : "Upload gambar produk"}
                </p>

                {!uploading && (
                  <>
                    <p className="text-xs text-muted mt-1">
                      PNG, JPG, JPEG atau WEBP
                    </p>

                    <p className="text-xs text-muted">
                      Maksimal 2 MB
                    </p>

                    <div className="inline-flex items-center gap-2 mt-4 bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold">

                      <Upload size={14} />

                      Pilih Gambar

                    </div>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                  disabled={uploading}
                  className="hidden"
                />

              </label>

            )}

          </div>


          {/* ================= BUTTON ================= */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                px-4
                py-3
                rounded-xl
                border
                border-line
                text-sm
                font-semibold
                text-muted
                hover:bg-gray-50
              "
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving || uploading}
              className="
                flex-1
                px-4
                py-3
                rounded-xl
                bg-primary
                hover:bg-primary-dark
                text-white
                text-sm
                font-semibold
                disabled:opacity-60
              "
            >
              {saving
                ? "Menyimpan..."
                : initialData
                  ? "Simpan Perubahan"
                  : "Tambah Produk"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}