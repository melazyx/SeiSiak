import { useState } from "react";
import { Leaf, Recycle, Coins, BadgeCheck } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import BenefitsRow from "../components/BenefitsRow";
import SectionHeading from "../components/SectionHeading";
import SearchInput from "../components/SearchInput";
import ProductCard from "../components/ProductCard";
import CTABanner from "../components/CTABanner";
import { useProduk } from "../context/ProdukContext";

// ===============================
// GAMBAR
// ===============================
import heroAyamImage from "../assets/hero-ayam.jpg";
import ayamKampungImage from "../assets/ayam-kampung.webp";
import pupukAyamImage from "../assets/pupuk-ayam.jpeg";

// ===============================
// TAB
// ===============================
const TABS = [
  {
    id: "produk",
    label: "Ayam Kampung",
  },
  {
    id: "pupuk",
    label: "Pupuk Ayam",
  },
];

// ===============================
// BENEFITS
// ===============================
const BENEFITS = [
  {
    icon: Leaf,
    color: "primary",
    title: "Ayam Berkualitas",
    desc: "Dipelihara dengan baik",
  },
  {
    icon: Recycle,
    color: "secondary",
    title: "Ramah Lingkungan",
    desc: "Mendukung usaha berkelanjutan",
  },
  {
    icon: Coins,
    color: "accent",
    title: "Harga Bersahabat",
    desc: "Cocok untuk kebutuhan Anda",
  },
  {
    icon: BadgeCheck,
    color: "secondary",
    title: "Kualitas Terjamin",
    desc: "Sehat dan terawat",
  },
];

export default function Ayam() {
  const { data } = useProduk();

  const [tab, setTab] = useState("produk");
  const [query, setQuery] = useState("");

  // ===============================
  // DATA AYAM KAMPUNG
  // ===============================
  const ayamJual = (data.ayamJual || [])
  .map((p) => ({
    ...p,
    image: p.image || ayamKampungImage,
  }))
  .filter((p) =>
    p.nama.toLowerCase().includes(query.toLowerCase())
  );

  // ===============================
  // DATA PUPUK AYAM
  // ===============================
  const ayamPupuk = (data.ayamPupuk || [])
  .map((p) => ({
    ...p,
    image: p.image || pupukAyamImage,
  }))
  .filter((p) =>
    p.nama.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* =========================
          NAVBAR
      ========================== */}
      <Navbar />

      {/* =========================
          HERO
      ========================== */}
      <PageHero
        category="Ayam"
        titleBlue="Ayam"
        titleRed=" Kampung"
        subtitle="Ayam Kampung Berkualitas dari Juragan Kambing Sei Siak"
        description="Ayam kampung yang dipelihara dengan baik, sehat, dan siap memenuhi kebutuhan konsumsi keluarga maupun usaha."
        badgeText="Bagian dari Program UMKM Binaan Pertamina Patra Niaga"
        image={heroAyamImage}
      />

      {/* =========================
          CONTENT
      ========================== */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 -mt-2 pb-14 flex flex-col gap-10">

        {/* BENEFITS */}
        <BenefitsRow items={BENEFITS} />

        {/* =========================
            TABS
        ========================== */}
        <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setQuery("");
              }}
              className={`
                shrink-0
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                transition-colors
                ${
                  tab === t.id
                    ? "bg-primary text-white"
                    : "bg-white text-muted border border-line hover:border-primary hover:text-primary"
                }
              `}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* =========================
            AYAM KAMPUNG
        ========================== */}
        {tab === "produk" && (
          <div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">

              <SectionHeading
                blueWord="Ayam"
                redWord="Kampung"
                subtitle="Ayam kampung berkualitas untuk kebutuhan konsumsi Anda."
              />

              <SearchInput
                placeholder="Cari ayam..."
                value={query}
                onChange={setQuery}
              />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">

              {ayamJual.length > 0 ? (
                ayamJual.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    image={item.image}
                    badgeText="Ayam Kampung"
                    badgeColorKey="secondary"
                    waMessage={(i) =>
                      `Halo, saya ingin pesan ${i.nama} (${i.harga}).`
                    }
                  />
                ))
              ) : (
                <p className="text-muted text-sm">
                  Produk ayam tidak ditemukan.
                </p>
              )}

            </div>

          </div>
        )}

        {/* =========================
            PUPUK AYAM
        ========================== */}
        {tab === "pupuk" && (
          <div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">

              <SectionHeading
                blueWord="Pupuk"
                redWord="Ayam"
                subtitle="Pupuk organik dari kandang ayam yang siap digunakan."
              />

              <SearchInput
                placeholder="Cari pupuk..."
                value={query}
                onChange={setQuery}
              />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">

              {ayamPupuk.length > 0 ? (
                ayamPupuk.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    image={item.image}
                    badgeText="Organik"
                    badgeColorKey="secondary"
                    waMessage={(i) =>
                      `Halo, saya ingin pesan ${i.nama} (${i.harga}).`
                    }
                  />
                ))
              ) : (
                <p className="text-muted text-sm">
                  Produk pupuk tidak ditemukan.
                </p>
              )}

            </div>

          </div>
        )}

        {/* =========================
            CTA
        ========================== */}
        <CTABanner />

      </div>

      {/* =========================
          FOOTER
      ========================== */}
      <Footer />
    </div>
  );
}