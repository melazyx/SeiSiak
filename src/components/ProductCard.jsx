import { Link } from "react-router-dom";
import {
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

import { getProductImage } from "../utils/productImages";

const WA_NUMBER = "6281270958582";

function getCategoryLabel(item) {
  if (item?.tipe) {
    return item.tipe;
  }

  if (item?.kategori) {
    return item.kategori;
  }

  return "Produk";
}

function getWhatsAppUrl(item) {
  const message = `
Halo, saya ingin bertanya tentang produk Juragan Kambing Sei Siak.

Produk: ${item?.nama || "-"}
Harga: ${item?.harga || "-"}

Mohon informasi selanjutnya. Terima kasih.
  `.trim();

  return (
    `https://wa.me/${WA_NUMBER}?text=` +
    encodeURIComponent(message)
  );
}

export default function ProductCard({
  item,
}) {
  const image =
    item?.image ||
    item?.image_url ||
    item?.gambar ||
    getProductImage(item);

  const status =
    item?.status || "Tersedia";

  const available =
    String(status).toLowerCase() !==
      "habis" &&
    String(status).toLowerCase() !==
      "stok habis";

  const category =
    getCategoryLabel(item);

  return (
    <article className="group bg-white border border-line rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

      {/* =====================================================
          IMAGE
      ====================================================== */}
      <div className="relative h-48 overflow-hidden bg-cream">

        {image ? (
          <img
            src={image}
            alt={item?.nama || "Produk"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-tint">
            <span className="text-5xl">
              {category === "Ayam"
                ? "🐔"
                : category === "Maggot"
                ? "🪱"
                : category === "Pupuk"
                ? "🌱"
                : category === "Susu"
                ? "🥛"
                : "🐐"}
            </span>
          </div>
        )}

        {/* CATEGORY BADGE */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-bold text-ink shadow-sm">
            {category}
          </span>
        </div>

        {/* STATUS BADGE */}
        <div className="absolute top-3 right-3">
          <span
            className={`
              inline-flex items-center gap-1
              px-2.5
              py-1
              rounded-full
              bg-white/95
              backdrop-blur-sm
              text-[10px]
              font-bold
              shadow-sm
              ${
                available
                  ? "text-primary"
                  : "text-red-600"
              }
            `}
          >
            <CheckCircle2 size={11} />
            {available
              ? "Tersedia"
              : "Stok Habis"}
          </span>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="p-4">

        <h3 className="font-heading font-bold text-sm sm:text-base text-ink line-clamp-1">
          {item?.nama || "Produk"}
        </h3>

        <p className="mt-1.5 text-[11px] sm:text-xs text-muted leading-relaxed line-clamp-2 min-h-[34px]">
          {item?.deskripsi ||
            item?.description ||
            "Produk peternakan berkualitas dari Juragan Kambing Sei Siak."}
        </p>

        {/* PRICE */}
        <div className="mt-3">
          <p className="text-base sm:text-lg font-extrabold text-secondary">
            {item?.harga || "Hubungi kami"}
          </p>
        </div>

        {/* ACTION */}
        <div className="grid grid-cols-2 gap-2 mt-4">

          <Link
            to={`/produk/${item?.id}`}
            state={{ product: item }}
            className="h-9 rounded-lg bg-primary hover:bg-primary-dark text-white flex items-center justify-center text-[11px] font-bold transition-colors"
          >
            Detail
          </Link>

          <a
            href={getWhatsAppUrl(item)}
            target="_blank"
            rel="noreferrer"
            className="h-9 rounded-lg border border-primary text-primary hover:bg-primary-tint flex items-center justify-center gap-1.5 text-[11px] font-bold transition-colors"
          >
            <MessageCircle size={13} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}