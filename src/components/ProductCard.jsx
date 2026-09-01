import { Pencil, Trash2 } from "lucide-react";
import EarTagBadge from "./EarTagBadge";
import WaButton from "./WaButton";
import { getProductImage } from "../utils/productImages";

export default function ProductCard({
  item,
  waMessage,
  adminControls,
}) {
  const resolvedImage = item.image || getProductImage(item);

  return (
    <div className="group relative overflow-hidden rounded-card border border-line bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">

      {/* GAMBAR PRODUK */}
      <div className="relative w-full h-52 overflow-hidden">
        {resolvedImage ? (
          <img
            src={resolvedImage}
            alt={item.nama}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(0,114,188,0.10), transparent 55%), radial-gradient(circle at 75% 75%, rgba(141,198,63,0.12), transparent 55%), #F5F6F8",
            }}
          >
            <div className="w-24 h-24 rounded-full bg-white shadow-md ring-1 ring-line flex items-center justify-center text-5xl transition-transform duration-200 group-hover:scale-105">
              {item.emoji || "🐐"}
            </div>
          </div>
        )}
      </div>

      {/* KONTEN */}
      <div className="relative p-5">

        {/* ADMIN BUTTON */}
        {adminControls && (
          <div className="absolute top-3 right-3 flex gap-1">

            <button
              onClick={adminControls.onEdit}
              className="p-1.5 rounded-md bg-primary-tint text-primary-dark hover:opacity-80"
              aria-label="Ubah produk"
            >
              <Pencil size={13} />
            </button>

            <button
              onClick={adminControls.onDelete}
              className="p-1.5 rounded-md bg-red-100 text-red-700 hover:opacity-80"
              aria-label="Hapus produk"
            >
              <Trash2 size={13} />
            </button>

          </div>
        )}

        <h4 className="font-semibold text-base pr-14 text-ink">
          {item.nama}
        </h4>

        <p className="text-sm text-muted mt-1">
          {item.deskripsi}
        </p>

        <div className="mt-3">
          <EarTagBadge>
            {item.harga}
          </EarTagBadge>
        </div>

        <div className="mt-4">
          <WaButton
            message={waMessage(item)}
          />
        </div>

      </div>
    </div>
  );
}