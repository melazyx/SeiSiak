import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Truck,
  Leaf,
  UserRound,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useProduk } from "../context/ProdukContext";
import { getProductImage } from "../utils/productImages";

const WA_NUMBER = "6281270958582";

// ============================================================
// HELPER
// ============================================================

function buildProductList(data) {
  if (!data) return [];

  const list = [];

  const pushProducts = (
    items,
    kategori,
    defaultTipe
  ) => {
    (items || []).forEach((product) => {
      const text = `
        ${product?.nama || ""}
        ${product?.deskripsi || ""}
      `.toLowerCase();

      let tipe = defaultTipe;

      if (text.includes("susu")) {
        tipe = "Susu";
      } else if (text.includes("pupuk")) {
        tipe = "Pupuk";
      }

      list.push({
        ...product,
        kategori,
        tipe,
      });
    });
  };

  pushProducts(
    data.kambingSusuPupuk,
    "Kambing",
    "Kambing"
  );

  pushProducts(
    data.kambingQurban,
    "Kambing",
    "Kambing"
  );

  pushProducts(
    data.ayamJual,
    "Ayam",
    "Ayam"
  );

  pushProducts(
    data.ayamPupuk,
    "Ayam",
    "Pupuk"
  );

  pushProducts(
    data.maggotProduk,
    "Maggot",
    "Maggot"
  );

  return list;
}

function getImage(product) {
  return (
    product?.image ||
    product?.image_url ||
    product?.gambar ||
    getProductImage(product)
  );
}

function getCategory(product) {
  return (
    product?.tipe ||
    product?.kategori ||
    "Produk"
  );
}

function getWhatsAppUrl(
  product,
  quantity
) {
  const message = `
Halo, saya tertarik dengan produk Juragan Kambing Sei Siak.

Produk: ${product?.nama || "-"}
Harga: ${product?.harga || "-"}
Jumlah: ${quantity}

Mohon informasi selanjutnya mengenai produk tersebut. Terima kasih.
  `.trim();

  return (
    `https://wa.me/${WA_NUMBER}?text=` +
    encodeURIComponent(message)
  );
}

function getProductDescription(product) {
  return (
    product?.deskripsi ||
    product?.description ||
    `Produk ${getCategory(
      product
    ).toLowerCase()} berkualitas dari Juragan Kambing Sei Siak yang dikelola dengan baik dan siap memenuhi kebutuhan Anda.`
  );
}

function getSpecification(
  product,
  keys
) {
  for (const key of keys) {
    if (
      product?.[key] !== undefined &&
      product?.[key] !== null &&
      product?.[key] !== ""
    ) {
      return product[key];
    }
  }

  return "-";
}

// ============================================================
// PAGE
// ============================================================

export default function DetailProduk() {
  const { id } = useParams();
  const location = useLocation();

  const { data } = useProduk();

  const allProducts = useMemo(
    () => buildProductList(data),
    [data]
  );

  // Produk dari state Link digunakan terlebih dahulu
  const productFromState =
    location.state?.product;

  const product =
    productFromState ||
    allProducts.find(
      (item) =>
        String(item.id) === String(id)
    );

  const [quantity, setQuantity] =
    useState(1);

  const [activeImage, setActiveImage] =
    useState(0);

  // ==========================================================
  // NOT FOUND
  // ==========================================================

  if (!product) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />

        <main className="max-w-4xl mx-auto px-5 py-24 text-center">
          <div className="bg-white border border-line rounded-2xl p-10">

            <div className="text-5xl mb-5">
              🐐
            </div>

            <h1 className="font-heading text-2xl font-bold text-ink">
              Produk tidak ditemukan
            </h1>

            <p className="text-sm text-muted mt-2">
              Produk yang kamu cari tidak tersedia
              atau sudah dihapus.
            </p>

            <Link
              to="/katalog"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-primary text-white text-sm font-bold"
            >
              <ArrowLeft size={16} />
              Kembali ke Katalog
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ==========================================================
  // PRODUCT DATA
  // ==========================================================

  const category =
    getCategory(product);

  const image = getImage(product);

  const available =
    String(
      product?.status || "Tersedia"
    ).toLowerCase() !== "habis";

  const bobot = getSpecification(
    product,
    [
      "bobot",
      "berat",
      "berat_kg",
      "weight",
    ]
  );

  const jenisKelamin =
    getSpecification(product, [
      "jenis_kelamin",
      "jenisKelamin",
      "kelamin",
      "gender",
    ]);

  const umur = getSpecification(
    product,
    ["umur", "usia", "age"]
  );

  // ==========================================================
  // GALLERY
  // ==========================================================

  const gallery = [
    image,
    product?.image2,
    product?.image_2,
    product?.gambar2,
    product?.image3,
    product?.image_3,
    product?.gambar3,
  ].filter(Boolean);

  const uniqueGallery = [
    ...new Set(gallery),
  ];

  const galleryImages =
    uniqueGallery.length > 0
      ? uniqueGallery
      : [null];

  const currentImage =
    galleryImages[activeImage] ||
    galleryImages[0];

  // ==========================================================
  // RELATED PRODUCTS
  // ==========================================================

  const relatedProducts =
    allProducts
      .filter(
        (item) =>
          String(item.id) !==
            String(product.id) &&
          (
            item.kategori ===
              product.kategori ||
            item.tipe === product.tipe
          )
      )
      .slice(0, 4);

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-6 sm:py-8">

        {/* ===================================================
            BREADCRUMB
        ==================================================== */}
        <div className="flex items-center gap-2 text-xs text-muted mb-6 overflow-x-auto whitespace-nowrap">
          <Link
            to="/"
            className="hover:text-primary"
          >
            Beranda
          </Link>

          <ChevronRight size={13} />

          <Link
            to="/katalog"
            className="hover:text-primary"
          >
            Katalog
          </Link>

          <ChevronRight size={13} />

          <span>
            {category}
          </span>

          <ChevronRight size={13} />

          <span className="text-ink font-semibold">
            {product.nama}
          </span>
        </div>

        {/* ===================================================
            PRODUCT MAIN
        ==================================================== */}
        <section className="bg-white border border-line rounded-3xl p-4 sm:p-6 lg:p-7">

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10">

            {/* =============================================
                LEFT - GALLERY
            ============================================== */}
            <div>

              <div className="relative rounded-2xl overflow-hidden bg-cream aspect-[4/3]">

                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={product.nama}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-tint">
                    <span className="text-7xl">
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

                {/* CATEGORY */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary text-white text-[11px] font-bold">
                    {category}
                  </span>
                </div>

                {/* STATUS */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-primary text-[11px] font-bold shadow-sm">
                    <CheckCircle2 size={12} />
                    {available
                      ? "Tersedia"
                      : "Stok Habis"}
                  </span>
                </div>

                {/* ARROWS */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImage(
                          (prev) =>
                            prev === 0
                              ? galleryImages.length -
                                1
                              : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                    >
                      <ChevronLeft size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveImage(
                          (prev) =>
                            prev ===
                            galleryImages.length -
                              1
                              ? 0
                              : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                    >
                      <ChevronRight size={17} />
                    </button>
                  </>
                )}
              </div>

              {/* THUMBNAILS */}
              <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
                {galleryImages.map(
                  (galleryImage, index) => (
                    <button
                      key={`${galleryImage}-${index}`}
                      type="button"
                      onClick={() =>
                        setActiveImage(index)
                      }
                      className={`
                        w-20
                        h-16
                        shrink-0
                        rounded-xl
                        overflow-hidden
                        border-2
                        ${
                          activeImage === index
                            ? "border-primary"
                            : "border-transparent"
                        }
                      `}
                    >
                      {galleryImage ? (
                        <img
                          src={galleryImage}
                          alt={`${product.nama} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary-tint flex items-center justify-center text-2xl">
                          🐐
                        </div>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* =============================================
                RIGHT - INFO
            ============================================== */}
            <div>

              {/* TITLE */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-ink leading-tight">
                    {product.nama}
                  </h1>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                    </div>

                    <span className="text-xs text-muted">
                      Produk pilihan
                    </span>
                  </div>
                </div>
              </div>

              {/* PRICE */}
              <div className="mt-4 pb-5 border-b border-line">
                <p className="text-2xl sm:text-3xl font-extrabold text-secondary">
                  {product.harga ||
                    "Hubungi kami"}
                </p>
              </div>

              {/* SPECIFICATIONS */}
              <div className="grid grid-cols-3 border-b border-line py-5">

                <div className="pr-3 border-r border-line">
                  <div className="flex items-center gap-2 text-muted">
                    <ShieldCheck size={16} />
                    <span className="text-[11px]">
                      Bobot
                    </span>
                  </div>

                  <p className="text-xs font-bold text-ink mt-1">
                    {bobot}
                  </p>
                </div>

                <div className="px-3 border-r border-line">
                  <div className="flex items-center gap-2 text-muted">
                    <UserRound size={16} />
                    <span className="text-[11px]">
                      Jenis Kelamin
                    </span>
                  </div>

                  <p className="text-xs font-bold text-ink mt-1">
                    {jenisKelamin}
                  </p>
                </div>

                <div className="pl-3">
                  <div className="flex items-center gap-2 text-muted">
                    <Leaf size={16} />
                    <span className="text-[11px]">
                      Umur
                    </span>
                  </div>

                  <p className="text-xs font-bold text-ink mt-1">
                    {umur}
                  </p>
                </div>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-5">
                <span className="px-3 py-1.5 rounded-full bg-primary-tint text-primary text-[10px] font-bold">
                  Sehat
                </span>

                <span className="px-3 py-1.5 rounded-full bg-primary-tint text-primary text-[10px] font-bold">
                  Terawat
                </span>

                {category ===
                  "Kambing" && (
                  <span className="px-3 py-1.5 rounded-full bg-primary-tint text-primary text-[10px] font-bold">
                    Siap Qurban
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="mt-6">
                <h2 className="font-heading font-bold text-base text-ink">
                  Deskripsi
                </h2>

                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {getProductDescription(
                    product
                  )}
                </p>
              </div>

              {/* BENEFITS */}
              <div className="mt-6">
                <h2 className="font-heading font-bold text-base text-ink">
                  Keunggulan
                </h2>

                <div className="mt-3 space-y-2.5">

                  {[
                    "Sehat dan terawat",
                    "Makan pakan berkualitas",
                    "Dikelola peternak lokal",
                    "Siap dikirim ke lokasi tertentu",
                  ].map((text) => (
                    <div
                      key={text}
                      className="flex items-center gap-2.5"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-primary shrink-0"
                      />

                      <span className="text-xs text-muted">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUANTITY */}
              <div className="mt-7">
                <p className="text-xs font-bold text-ink mb-2">
                  Jumlah
                </p>

                <div className="inline-flex items-center border border-line rounded-xl overflow-hidden">

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        Math.max(
                          1,
                          quantity - 1
                        )
                      )
                    }
                    className="w-10 h-10 flex items-center justify-center text-muted hover:bg-cream"
                  >
                    <Minus size={14} />
                  </button>

                  <div className="w-12 h-10 flex items-center justify-center border-x border-line text-sm font-bold text-ink">
                    {quantity}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        quantity + 1
                      )
                    }
                    className="w-10 h-10 flex items-center justify-center text-muted hover:bg-cream"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

                <a
                  href={getWhatsAppUrl(
                    product,
                    quantity
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="h-12 rounded-xl bg-primary hover:bg-primary-dark text-white flex items-center justify-center gap-2 text-sm font-bold transition-colors"
                >
                  <MessageCircle
                    size={17}
                  />
                  Pesan via WhatsApp
                </a>

                <a
                  href={getWhatsAppUrl(
                    product,
                    1
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="h-12 rounded-xl border-2 border-primary text-primary hover:bg-primary-tint flex items-center justify-center gap-2 text-sm font-bold transition-colors"
                >
                  <MessageCircle
                    size={17}
                  />
                  Tanyakan Produk
                </a>
              </div>
            </div>
          </div>

          {/* =================================================
              WHY US
          ================================================== */}
          <div className="mt-8 pt-8 border-t border-line">

            <h2 className="font-heading text-lg sm:text-xl font-bold text-ink">
              Kenapa Pilih Kami?
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">

              <WhyUs
                icon={ShieldCheck}
                title="Ternak Sehat & Terawat"
              />

              <WhyUs
                icon={UserRound}
                title="Peternak Lokal Berpengalaman"
              />

              <WhyUs
                icon={Leaf}
                title="Produk Berkualitas & Halal"
              />

              <WhyUs
                icon={Truck}
                title="Pengiriman Aman & Tepat Waktu"
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            RELATED PRODUCTS
        ==================================================== */}
        {relatedProducts.length > 0 && (
          <section className="mt-10">

            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-xl font-bold text-ink">
                Produk Terkait
              </h2>

              <Link
                to="/katalog"
                className="text-xs font-bold text-primary hover:underline"
              >
                Lihat Semua →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map(
                (item) => (
                  <RelatedProduct
                    key={`${item.kategori}-${item.id}`}
                    product={item}
                  />
                )
              )}
            </div>
          </section>
        )}

        {/* BACK */}
        <div className="mt-8">
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary"
          >
            <ArrowLeft size={16} />
            Kembali ke Katalog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ============================================================
// WHY US
// ============================================================

function WhyUs({
  icon: Icon,
  title,
}) {
  return (
    <div className="bg-primary-tint rounded-2xl p-5 text-center">
      <div className="w-11 h-11 mx-auto rounded-full bg-primary text-white flex items-center justify-center">
        <Icon size={19} />
      </div>

      <p className="text-xs font-bold text-ink leading-relaxed mt-3">
        {title}
      </p>
    </div>
  );
}

// ============================================================
// RELATED PRODUCT
// ============================================================

function RelatedProduct({
  product,
}) {
  const image = getImage(product);

  return (
    <Link
      to={`/produk/${product.id}`}
      state={{ product }}
      className="group bg-white border border-line rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative h-36 overflow-hidden bg-cream">

        {image ? (
          <img
            src={image}
            alt={product.nama}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-primary-tint flex items-center justify-center text-4xl">
            🐐
          </div>
        )}

        <span className="absolute top-2 right-2 px-2 py-1 rounded-full bg-white/95 text-[9px] font-bold text-primary">
          Tersedia
        </span>
      </div>

      <div className="p-3">
        <p className="text-[10px] text-primary font-semibold">
          {product.tipe ||
            product.kategori ||
            "Produk"}
        </p>

        <h3 className="font-heading text-sm font-bold text-ink mt-1 line-clamp-1">
          {product.nama}
        </h3>

        <p className="text-sm font-extrabold text-secondary mt-2">
          {product.harga ||
            "Hubungi kami"}
        </p>

        <div className="mt-3 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-[10px] font-bold">
          Detail
        </div>
      </div>
    </Link>
  );
}