import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Recycle, Coins, BadgeCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import BenefitsRow from "../components/BenefitsRow";
import SectionHeading from "../components/SectionHeading";
import SearchInput from "../components/SearchInput";
import ProductCard from "../components/ProductCard";
import CTABanner from "../components/CTABanner";
import WaButton from "../components/WaButton";
import { useProduk } from "../context/ProdukContext";
import { useKategori } from "../context/KategoriContext";
import kambingImage from "../assets/hero-kambing.jpeg";

const BENEFITS = [
  { icon: Leaf, color: "primary", title: "Susu Segar Berkualitas", desc: "Diperah setiap pagi" },
  { icon: Recycle, color: "secondary", title: "Pupuk Organik", desc: "Dari kandang, ramah lingkungan" },
  { icon: Coins, color: "accent", title: "Harga Bersahabat", desc: "Cocok untuk kebutuhan harian" },
  { icon: BadgeCheck, color: "secondary", title: "Kambing Sehat", desc: "Dirawat & diberi pakan terjaga" },
];

export default function Kambing() {
  const { data } = useProduk();
  const { getByAnimal, loading: loadingKategori } = useKategori();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState(null);

  const tabs = getByAnimal("kambing");
  const currentTabKey = activeTab || (tabs[0] && tabs[0].section_key);
  const currentTab = tabs.find((t) => t.section_key === currentTabKey);

  const produkList = currentTab
    ? (data[currentTab.section_key] || []).filter((p) =>
        p.nama.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div>
      <Navbar />

      <PageHero
        category="Kambing"
        titleBlue="Kam"
        titleRed="bing"
        subtitle="Susu, Pupuk, hingga Qurban & Aqiqah dari Juragan Kambing Sei Siak"
        description="Kambing perah dan kambing gemuk yang dirawat dengan telaten, siap untuk kebutuhan harian maupun ibadah."
        badgeText="Bagian dari Program UMKM Binaan Pertamina Patra Niaga"
        image={kambingImage}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 -mt-2 pb-14 flex flex-col gap-10">
        <BenefitsRow items={BENEFITS} />

        {loadingKategori ? (
          <p className="text-sm text-muted text-center py-10">Memuat kategori...</p>
        ) : tabs.length === 0 ? (
          <p className="text-sm text-muted text-center py-10">Belum ada kategori untuk kambing.</p>
        ) : (
          <>
            <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.section_key)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    currentTabKey === t.section_key
                      ? "bg-primary text-white"
                      : "bg-white text-muted border border-line"
                  }`}
                >
                  {t.judul}
                </button>
              ))}
            </div>

            {currentTab && currentTab.tipe === "produk" && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                  <SectionHeading blueWord={currentTab.judul} redWord="" subtitle={currentTab.deskripsi} />
                  <SearchInput placeholder="Cari produk..." value={query} onChange={setQuery} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
                  {produkList.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      waMessage={(i) => `Halo, saya ingin pesan ${i.nama} (${i.harga}).`}
                    />
                  ))}
                  {produkList.length === 0 && (
                    <p className="text-sm text-muted">Belum ada produk di kategori ini.</p>
                  )}
                </div>
              </div>
            )}

            {currentTab && currentTab.tipe === "layanan" && (
              <div className="rounded-card border border-line bg-white p-8 text-center max-w-2xl mx-auto">
                <h2 className="font-bold text-lg mb-2 text-ink font-heading">{currentTab.judul}</h2>
                <p className="text-sm leading-relaxed mb-5 text-muted whitespace-pre-line">
                  {currentTab.deskripsi}
                </p>
                <div className="max-w-xs mx-auto space-y-3">
                  <WaButton
                    full
                    message={`Halo, saya ingin tanya-tanya soal ${currentTab.judul.toLowerCase()}.`}
                  />
                  {currentTab.section_key === "kambingTitipTernak" && (
                    <Link
                      to="/lacak-ternak"
                      className="block text-sm font-semibold text-secondary-dark hover:underline"
                    >
                      Sudah titip ternak? Lacak perkembangannya di sini →
                    </Link>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        <CTABanner />
      </div>

      <Footer />
    </div>
  );
}