import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Users,
  ShieldCheck,
  Search,
  MessageCircle,
  Calendar,
  Award,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import pertaminaLogo from "../assets/pertamina-logo.png";
import heroImage from "../assets/hero-kambing.jpeg";

import { useProduk } from "../context/ProdukContext";
import { useKegiatan } from "../context/KegiatanContext";

const WA_NUMBER = "6281270958582";

const FILTERS = [
  "Semua",
  "Kambing",
  "Ayam",
  "Maggot",
  "Pupuk",
  "Susu",
];

const CATEGORY_EMOJI = {
  Kambing: "🐐",
  Ayam: "🐔",
  Maggot: "🪱",
};

/* ============================================================
   BUILD PRODUCT LIST
============================================================ */

function buildProductList(data) {
  if (!data) return [];

  const list = [];

  const push = (items, kategori, defaultTipe) => {
    (items || []).forEach((product) => {
      const nama = product.nama || "";
      const namaLower = nama.toLowerCase();

      let tipe = defaultTipe;

      if (namaLower.includes("susu")) {
        tipe = "Susu";
      } else if (namaLower.includes("pupuk")) {
        tipe = "Pupuk";
      }

      list.push({
        ...product,
        kategori,
        tipe,
        link: `/${kategori.toLowerCase()}`,
      });
    });
  };

  push(data.kambingSusuPupuk, "Kambing", "Kambing");
  push(data.kambingQurban, "Kambing", "Kambing");
  push(data.ayamJual, "Ayam", "Ayam");
  push(data.ayamPupuk, "Ayam", "Pupuk");
  push(data.maggotProduk, "Maggot", "Maggot");

  return list;
}

/* ============================================================
   BERANDA
============================================================ */

export default function Beranda() {
  const { data } = useProduk();
  const { kegiatan } = useKegiatan();

  const [filter, setFilter] = useState("Semua");

  const allProducts = buildProductList(data);

  const filteredProducts =
    filter === "Semua"
      ? allProducts
      : allProducts.filter(
          (product) =>
            product.kategori === filter ||
            product.tipe === filter
        );

  const shownProducts = filteredProducts.slice(0, 4);

  const latestKegiatan = (kegiatan || []).slice(0, 3);

  /* ==========================================================
     WHATSAPP
  ========================================================== */

  const whatsappLink =
    `https://wa.me/${WA_NUMBER}?text=` +
    encodeURIComponent(
      "Halo, saya ingin bertanya tentang produk Juragan Kambing Sei Siak."
    );

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
          <div className="relative overflow-hidden rounded-[18px] sm:rounded-[22px] min-h-[430px] sm:min-h-[500px] lg:min-h-[530px]">

            {/* Background */}
            <img
              src={heroImage}
              alt="Peternakan Juragan Kambing Sei Siak"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />

            {/* Mobile overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:hidden" />

            {/* Hero Content */}
            <div className="relative z-10 flex items-center min-h-[430px] sm:min-h-[500px] lg:min-h-[530px]">
              <div className="px-6 py-12 sm:px-10 lg:px-14 max-w-[680px]">

                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-[2px] rounded-full bg-primary" />

                  <span className="text-[9px] sm:text-xs font-semibold text-white/90 uppercase tracking-wider">
                    UMKM Binaan Fuel Terminal Sei Siak
                  </span>
                </div>

                <h1 className="font-heading font-extrabold text-white text-[30px] leading-[1.08] sm:text-5xl lg:text-[52px] lg:leading-[1.08]">
                  Dari Sei Siak,
                  <br />
                  untuk Peternakan
                  <br />
                  yang Lebih
                  <br className="hidden sm:block" />
                  Berkelanjutan
                </h1>

                <p className="mt-5 text-sm sm:text-base text-white/85 leading-relaxed max-w-[510px]">
                  Menyediakan produk peternakan dan layanan titip ternak
                  yang dikelola secara bertanggung jawab oleh UMKM binaan
                  Fuel Terminal Sei Siak.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-7">

                  {/* Lihat Produk */}
                  <Link
                    to="/kambing"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      bg-secondary
                      hover:bg-secondary-dark
                      text-white
                      px-5
                      sm:px-6
                      py-2.5
                      sm:py-3
                      rounded-full
                      font-bold
                      text-xs
                      sm:text-sm
                      shadow-lg
                      transition-all
                      hover:-translate-y-0.5
                    "
                  >
                    Lihat Produk
                    <ArrowRight size={15} />
                  </Link>

                  {/* Titip Ternak */}
                  <Link
                    to="/titip-ternak"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      bg-white/10
                      hover:bg-white/20
                      border
                      border-white/70
                      text-white
                      px-5
                      sm:px-6
                      py-2.5
                      sm:py-3
                      rounded-full
                      font-bold
                      text-xs
                      sm:text-sm
                      backdrop-blur-sm
                      transition-all
                    "
                  >
                    Titip Ternak
                  </Link>
                </div>
              </div>
            </div>

            {/* Pertamina Badge */}
            <div
              className="
                absolute
                z-20
                right-4
                bottom-4
                sm:right-6
                sm:bottom-6
                bg-white
                rounded-xl
                sm:rounded-2xl
                px-3
                sm:px-4
                py-2.5
                sm:py-3
                shadow-xl
                flex
                items-center
                gap-2.5
                max-w-[210px]
              "
            >
              <img
                src={pertaminaLogo}
                alt="Pertamina Patra Niaga"
                className="h-6 sm:h-7 w-auto"
              />

              <div className="leading-tight">
                <p className="text-[8px] sm:text-[9px] text-muted">
                  Didukung oleh
                </p>

                <p className="text-[9px] sm:text-[10px] font-bold text-ink">
                  Pertamina Patra Niaga
                </p>

                <p className="text-[8px] sm:text-[9px] text-muted">
                  Fuel Terminal Sei Siak
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            KEUNGGULAN
        ====================================================== */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">

            <FeatureCard
              icon={ShieldCheck}
              title="Ternak Terawat"
              subtitle="& Sehat"
            />

            <FeatureCard
              icon={Users}
              title="Dikelola Peternak"
              subtitle="Lokal"
            />

            <FeatureCard
              icon={Leaf}
              title="Produk Berkualitas"
              subtitle="& Halal"
            />

            <FeatureCard
              icon={Search}
              title="Bisa Lacak Ternak"
              subtitle="Secara Online"
            />

          </div>
        </section>

        {/* =====================================================
            PRODUK UNGGULAN
        ====================================================== */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-9 sm:mt-12">

          <SectionHeading
            title="Produk Unggulan"
            subtitle="Pilihan produk peternakan dari Sei Siak untuk kebutuhan Anda."
          />

          {/* Filter */}
          <div className="flex items-center gap-2 overflow-x-auto mt-5 pb-1">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`
                  shrink-0
                  px-4
                  sm:px-5
                  py-2
                  rounded-full
                  text-[11px]
                  sm:text-xs
                  font-semibold
                  border
                  transition-all
                  ${
                    filter === item
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "bg-white border-line text-muted hover:border-primary hover:text-primary"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5">

            {shownProducts.length === 0 ? (
              <div className="col-span-full bg-white border border-line rounded-2xl p-8 text-center">
                <p className="text-sm text-muted">
                  Belum ada produk untuk kategori ini.
                </p>
              </div>
            ) : (
              shownProducts.map((product) => (
                <ProductCard
                  key={`${product.kategori}-${product.id}`}
                  product={product}
                />
              ))
            )}

          </div>
        </section>

        {/* =====================================================
            KENAPA MEMILIH KAMI
        ====================================================== */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">

          <SectionHeading title="Kenapa Memilih Kami?" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-5">

            <WhyCard
              icon={HeartHandshake}
              title="Peternakan Lokal"
            />

            <WhyCard
              icon={ShieldCheck}
              title="Ternak Sehat"
            />

            <WhyCard
              icon={Award}
              title="Produk Berkualitas"
            />

            <WhyCard
              icon={Sparkles}
              title="Pelayanan Terbaik"
            />

          </div>
        </section>

        {/* =====================================================
            TITIP TERNAK
        ====================================================== */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">

          <div className="relative overflow-hidden rounded-[18px] sm:rounded-[22px] min-h-[190px] sm:min-h-[220px]">

            <img
              src={heroImage}
              alt="Titip ternak Juragan Kambing"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#143528]/95 via-[#143528]/75 to-[#143528]/20" />

            <div className="relative z-10 min-h-[190px] sm:min-h-[220px] flex items-center">

              <div className="px-6 sm:px-10 lg:px-12">

                <div className="border-l-[3px] border-primary pl-4 sm:pl-5">

                  <p className="text-[9px] sm:text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
                    Layanan Titip Ternak
                  </p>

                  <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                    Titip Ternak Lebih Mudah
                    <br />
                    Pantau Perkembangan Lewat Website
                  </h2>

                  {/* Mulai Sekarang */}
                  <Link
                    to="/titip-ternak"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      mt-4
                      bg-primary
                      hover:bg-primary-dark
                      text-white
                      px-4
                      sm:px-5
                      py-2
                      sm:py-2.5
                      rounded-full
                      text-[10px]
                      sm:text-xs
                      font-bold
                      transition-all
                      hover:-translate-y-0.5
                    "
                  >
                    Mulai Sekarang
                    <ArrowRight size={13} />
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            KEGIATAN TERBARU
        ====================================================== */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 pb-10">

          <div className="flex items-end justify-between gap-4">

            <SectionHeading
              title="Kegiatan Terbaru"
              subtitle="Aktivitas dan perkembangan terbaru Juragan Kambing Sei Siak."
            />

            <Link
              to="/tentang"
              className="
                shrink-0
                inline-flex
                items-center
                gap-1
                text-[10px]
                sm:text-xs
                font-semibold
                text-primary
                hover:text-primary-dark
              "
            >
              Lihat Semua
              <ArrowRight size={13} />
            </Link>

          </div>

          {latestKegiatan.length === 0 ? (
            <div className="mt-5 bg-white border border-line rounded-2xl p-8 text-center">

              <Calendar
                size={28}
                className="mx-auto text-muted mb-2"
              />

              <p className="text-sm text-muted">
                Belum ada kegiatan yang ditambahkan.
              </p>

            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-5">

              {latestKegiatan.map((item) => (
                <ActivityCard
                  key={item.id}
                  item={item}
                />
              ))}

            </div>
          )}

        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({ title, subtitle }) {
  return (
    <div>
      <h2 className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-ink">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-1 text-[10px] sm:text-xs text-muted max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   FEATURE CARD
============================================================ */

function FeatureCard({ icon: Icon, title, subtitle }) {
  return (
    <div
      className="
        bg-white
        border
        border-line
        rounded-xl
        sm:rounded-2xl
        px-3
        sm:px-4
        py-3
        sm:py-3.5
        flex
        items-center
        gap-2.5
        sm:gap-3
        min-h-[65px]
      "
    >
      <div
        className="
          w-8
          h-8
          sm:w-9
          sm:h-9
          rounded-full
          bg-primary-tint
          text-primary
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        <Icon size={15} />
      </div>

      <div className="leading-tight">
        <p className="text-[9px] sm:text-[10px] font-bold text-ink">
          {title}
        </p>

        <p className="text-[9px] sm:text-[10px] text-muted mt-0.5">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   WHY CARD
============================================================ */

function WhyCard({ icon: Icon, title }) {
  return (
    <div
      className="
        bg-white
        border
        border-line
        rounded-xl
        sm:rounded-2xl
        px-3
        sm:px-4
        py-3
        flex
        items-center
        gap-2.5
        sm:gap-3
      "
    >
      <div
        className="
          w-8
          h-8
          sm:w-9
          sm:h-9
          rounded-full
          bg-primary-tint
          text-primary
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        <Icon size={15} />
      </div>

      <span className="text-[10px] sm:text-xs font-semibold text-ink">
        {title}
      </span>
    </div>
  );
}

/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({ product }) {
  const productName = product.nama || "Produk";

  const productImage =
    product.image ||
    product.image_url ||
    product.gambar ||
    "";

  const productDescription =
    product.deskripsi ||
    product.description ||
    "Produk peternakan pilihan.";

  const productPrice =
    product.harga ||
    product.price ||
    "Hubungi kami";

  const whatsappMessage =
    `Halo, saya ingin bertanya tentang ${productName}.`;

  const productWhatsapp =
    `https://wa.me/${WA_NUMBER}?text=` +
    encodeURIComponent(whatsappMessage);

  return (
    <article
      className="
        group
        overflow-hidden
        bg-white
        border
        border-line
        rounded-xl
        sm:rounded-2xl
        shadow-card
        hover:shadow-soft
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* Image */}
      <Link to={product.link}>
        <div className="relative h-[125px] sm:h-[155px] bg-cream overflow-hidden">

          {productImage ? (
            <img
              src={productImage}
              alt={productName}
              className="
                w-full
                h-full
                object-cover
                group-hover:scale-105
                transition-transform
                duration-500
              "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl bg-primary-tint">
              {CATEGORY_EMOJI[product.kategori] || "📦"}
            </div>
          )}

          {/* Category */}
          <span
            className="
              absolute
              top-2
              left-2
              bg-white/95
              backdrop-blur-sm
              text-primary
              text-[8px]
              sm:text-[9px]
              font-bold
              px-2
              py-1
              rounded-full
            "
          >
            {product.tipe || product.kategori}
          </span>

        </div>
      </Link>

      {/* Content */}
      <div className="p-2.5 sm:p-3">

        <Link to={product.link}>
          <h3 className="font-heading text-[11px] sm:text-sm font-bold text-ink line-clamp-1 hover:text-primary transition-colors">
            {productName}
          </h3>
        </Link>

        <p className="text-[9px] sm:text-[10px] text-muted mt-1 line-clamp-1">
          {productDescription}
        </p>

        <p className="text-secondary font-extrabold text-[11px] sm:text-sm mt-1.5">
          {productPrice}
        </p>

        <div className="flex items-center gap-1.5 mt-2.5">

          <Link
            to={product.link}
            className="
              flex-1
              text-center
              bg-primary
              hover:bg-primary-dark
              text-white
              text-[9px]
              sm:text-[10px]
              font-bold
              py-1.5
              sm:py-2
              rounded-lg
              transition-colors
            "
          >
            Detail
          </Link>

          <a
            href={productWhatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label={`Pesan ${productName} melalui WhatsApp`}
            className="
              w-7
              h-7
              sm:w-8
              sm:h-8
              rounded-lg
              bg-primary-tint
              text-primary
              flex
              items-center
              justify-center
              shrink-0
              hover:bg-primary
              hover:text-white
              transition-colors
            "
          >
            <MessageCircle size={13} />
          </a>

        </div>
      </div>
    </article>
  );
}

/* ============================================================
   ACTIVITY CARD
============================================================ */

function ActivityCard({ item }) {
  const title =
    item.title ||
    item.judul ||
    item.nama ||
    "Kegiatan Juragan Kambing";

  const image =
    item.image_url ||
    item.gambar_url ||
    item.image ||
    item.gambar ||
    "";

  const date =
    item.activity_date ||
    item.tanggal ||
    item.created_at ||
    "";

  let formattedDate = "Tanggal tidak tersedia";

  if (date) {
    const parsedDate = new Date(date);

    if (!Number.isNaN(parsedDate.getTime())) {
      formattedDate = parsedDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }

  return (
    <article
      className="
        overflow-hidden
        bg-white
        border
        border-line
        rounded-xl
        sm:rounded-2xl
        shadow-card
        hover:shadow-soft
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      <div className="h-[155px] sm:h-[170px] bg-cream">

        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-tint text-primary">
            <Calendar size={30} />
          </div>
        )}

      </div>

      <div className="p-3.5 sm:p-4">

        <h3 className="font-heading text-xs sm:text-sm font-bold text-ink leading-snug line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-1.5 mt-2 text-[9px] sm:text-[10px] text-muted">
          <Calendar size={11} />
          <span>{formattedDate}</span>
        </div>

      </div>
    </article>
  );
}