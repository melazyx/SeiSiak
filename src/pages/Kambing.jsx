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
import WaButton from "../components/WaButton";
import { useProduk } from "../context/ProdukContext";
import kambingImage from "../assets/hero-kambing.jpeg";
import susuKambingImage from "../assets/susu-kambing.jpeg";
import pupukKambingImage from "../assets/pupuk-kambing.jpg";
import kambingQurbanImage from "../assets/kambing-qurban.jpeg";
import kambingPerahImage from "../assets/kambing-perah.jpeg";

const TABS = [
  { id: "produk", label: "Susu & Pupuk" },
  { id: "qurban", label: "Qurban & Aqiqah" },
  { id: "titip", label: "Titip Ternak" },
];

const BENEFITS = [
  { icon: Leaf, color: "primary", title: "Susu Segar Berkualitas", desc: "Diperah setiap pagi" },
  { icon: Recycle, color: "secondary", title: "Pupuk Organik", desc: "Dari kandang, ramah lingkungan" },
  { icon: Coins, color: "accent", title: "Harga Bersahabat", desc: "Cocok untuk kebutuhan harian" },
  { icon: BadgeCheck, color: "secondary", title: "Kambing Sehat", desc: "Dirawat & diberi pakan terjaga" },
];

export default function Kambing() {
  const [tab, setTab] = useState("produk");
  const [query, setQuery] = useState("");
  const { data } = useProduk();

  const susuPupuk = data.kambingSusuPupuk
    .map((p) => {
      let fallbackImage = susuKambingImage;

      if (p.nama.toLowerCase().includes("pupuk")) {
        fallbackImage = pupukKambingImage;
      }

      return {
        ...p,
        image: p.image || fallbackImage,
      };
    })
    .filter((p) =>
      p.nama.toLowerCase().includes(query.toLowerCase())
    );

  const qurban = data.kambingQurban
    .map((p) => ({
      ...p,
      image: p.image || kambingQurbanImage,
    }))
    .filter((p) =>
      p.nama.toLowerCase().includes(query.toLowerCase())
    );

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

        <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${tab === t.id ? "bg-primary text-white" : "bg-white text-muted border border-line"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "produk" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <SectionHeading blueWord="Susu &" redWord="Pupuk" subtitle="Produk harian dari kandang kambing kami." />
              <SearchInput placeholder="Cari produk..." value={query} onChange={setQuery} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
              {susuPupuk.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  image={item.image}
                  badgeText="Segar"
                  badgeColorKey="accent"
                  waMessage={(i) => `Halo, saya ingin pesan ${i.nama} (${i.harga}).`}
                />
              ))}
            </div>
          </div>
        )}

        {tab === "qurban" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <SectionHeading blueWord="Qurban &" redWord="Aqiqah" subtitle="Kambing siap qurban dan aqiqah, cukup umur & sehat." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
              {qurban.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  image={item.image}
                  badgeText="Siap Qurban"
                  badgeColorKey="secondary"
                  waMessage={(i) => `Halo, saya ingin pesan ${i.nama} untuk qurban/aqiqah (${i.harga}).`}
                />
              ))}
            </div>
          </div>
        )}

        {tab === "titip" && (
          <div className="rounded-card border border-line bg-white p-8 text-center max-w-2xl mx-auto">
            <h2 className="font-bold text-lg mb-2 text-ink font-heading">Titip ternak</h2>
            <p className="text-sm leading-relaxed mb-5 text-muted">
              Punya kambing tapi tidak sempat merawat? Titip di kandang kami —
              untuk digemukkan (fattening) maupun diperah susunya. Kami urus
              makan dan kesehatannya, kamu tinggal pantau lewat kabar rutin.
            </p>
            <div className="max-w-xs mx-auto">
              <WaButton full message="Halo, saya ingin tanya-tanya soal titip ternak kambing." />
            </div>
          </div>
        )}

        <CTABanner />
      </div>

      <Footer />
    </div>
  );
}