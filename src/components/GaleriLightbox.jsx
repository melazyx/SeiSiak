import { X } from "lucide-react";

export default function GaleriLightbox({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-ink"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        <div className="rounded-2xl overflow-hidden bg-white">
          <img src={photo.image_url} alt={photo.keterangan || "Galeri"} className="w-full max-h-[75vh] object-contain bg-ink" />
          {photo.keterangan && (
            <p className="text-sm text-ink p-4">{photo.keterangan}</p>
          )}
        </div>
      </div>
    </div>
  );
}