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

import maggotImage from "../assets/hero-maggot.jpeg";
import maggotFreshImage from "../assets/maggot-fresh.webp";
import maggotKeringImage from "../assets/maggot-kering.jpg";

const BENEFITS = [
  {
    icon: Leaf,
    color: "primary",
    title: "Pakan Tinggi Nutrisi",
    desc: "Baik untuk pertumbuhan ternak",
  },
  {
    icon: Recycle,
    color: "secondary",
    title: "Ramah Lingkungan",
    desc: "Mendukung ekonomi sirkular",
  },
  {
    icon: Coins,
    color: "accent",
    title: "Harga Kompetitif",
    desc: "Solusi pakan yang ekonomis",
  },
  {
    icon: BadgeCheck,
    color: "secondary",
    title: "Kualitas Terjamin",
    desc: "Diproses secara higienis",
  },
];

export default function Maggot() {
  const { data } = useProduk();
  const [query, setQuery] = useState("");

  // DATA MAGGOT
  // Di mockData.js namanya adalah "maggotProduk"
  const produk = (data.maggotProduk || [])
    .map((p) => {
      const nama = p.nama.toLowerCase();

      let fallbackImage = maggotFreshImage;
      let badgeText = "Fresh";

      if (nama.includes("kering")) {
        fallbackImage = maggotKeringImage;
        badgeText = "Kering";
      }

      return {
        ...p,
        image: p.image || fallbackImage,
        badgeText,
      };
    })
    .filter((p) =>
      p.nama.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <PageHero
        category="Maggot"
        titleBlue="Mag"
        titleRed="got"
        subtitle="Solusi Pakan Ternak Berkelanjutan dari Juragan Kambing Sei Siak"
        description="Maggot berkualitas untuk pakan ternak yang lebih sehat, ekonomis, dan ramah lingkungan."
        badgeText="Dukung Ekonomi Sirkular Bersama Pertamina Patra Niaga"
        image={maggotImage}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 -mt-2 pb-14 flex flex-col gap-10">

        {/* BENEFITS */}
        <BenefitsRow items={BENEFITS} />

        {/* PRODUK */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">

            <SectionHeading
              blueWord="Produk"
              redWord="Maggot"
              subtitle="Pilih produk maggot berkualitas sesuai kebutuhan Anda."
            />

            <SearchInput
              placeholder="Cari produk maggot..."
              value={query}
              onChange={setQuery}
            />

          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">

            {produk.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                image={item.image}
                badgeText={item.badgeText}
                badgeColorKey={
                  item.nama.toLowerCase().includes("kering")
                    ? "primary"
                    : "accent"
                }
                waMessage={(i) =>
                  `Halo, saya ingin pesan ${i.nama} (${i.harga}).`
                }
              />
            ))}

          </div>

          {/* JIKA PRODUK TIDAK DITEMUKAN */}
          {produk.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted">
                Produk maggot tidak ditemukan.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <CTABanner />

      </div>

      <Footer />
    </div>
  );
}