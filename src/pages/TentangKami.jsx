import { useState } from "react";
import {
  Leaf,
  Expand,
  HeartHandshake,
  Building2,
  MapPin,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Sprout,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";
import SectionHeading from "../components/SectionHeading";
import ActivityCard from "../components/ActivityCard";
import ActivityDetailModal from "../components/ActivityDetailModal";
import GaleriLightbox from "../components/GaleriLightbox";

import { useKegiatan } from "../context/KegiatanContext";
import { useGaleri } from "../context/GaleriContext";

import pertaminaLogo from "../assets/pertamina-logo.png";
import fuelTerminalImage from "../assets/fuel-terminal.jpeg";

const NOMOR_WHATSAPP = "6281270958582";

export default function TentangKami() {
  const { kegiatan, loading } = useKegiatan();
  const { galeri } = useGaleri();

  const [selected, setSelected] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  function handleWhatsApp() {
    const pesan =
      "Halo Admin Juragan Kambing Sei Siak, saya ingin mendapatkan informasi lebih lanjut mengenai produk dan layanan.";

    const url = `https://wa.me/${NOMOR_WHATSAPP}?text=${encodeURIComponent(
      pesan
    )}`;

    window.open(url, "_blank");
  }

  function handleMaps() {
    const url =
      "https://www.google.com/maps/search/?api=1&query=Jl.+Sei+Siak,+Pekanbaru,+Riau";

    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-tint via-cream to-white" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-14 sm:pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-line shadow-sm">
              <Leaf size={14} className="text-primary" />
              <span className="text-[11px] sm:text-xs font-bold text-primary">
                Juragan Kambing Sei Siak
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight mt-5">
              Tentang{" "}
              <span className="text-primary">
                Kami
              </span>
            </h1>

            <p className="text-sm sm:text-base text-muted leading-relaxed mt-4 max-w-2xl">
              Mengenal lebih dekat Juragan Kambing Sei Siak, usaha ternak
              keluarga yang menjadi bagian dari program UMKM binaan Pertamina
              Patra Niaga Fuel Terminal Sei Siak.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
              >
                <MessageCircle size={17} />
                Hubungi Kami
              </button>

              <button
                type="button"
                onClick={handleMaps}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-line text-ink text-sm font-bold hover:border-primary hover:text-primary transition-colors"
              >
                <MapPin size={17} />
                Lihat Lokasi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROFIL JURAGAN KAMBING
      ========================================================= */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
        <section>
          <SectionHeading
            blueWord="Profil"
            redWord="Kami"
            subtitle="Mengenal lebih dekat usaha dan kegiatan Juragan Kambing Sei Siak."
          />

          <div className="mt-7 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6">
            {/* Profil */}
            <div className="bg-white rounded-2xl border border-line shadow-sm p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-tint flex items-center justify-center shrink-0">
                  <Leaf size={21} className="text-primary" />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    Juragan Kambing Sei Siak
                  </p>

                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-ink mt-1">
                    Usaha Ternak yang Terus Berkembang
                  </h2>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <p className="text-sm leading-7 text-muted">
                  Juragan Kambing Sei Siak merupakan usaha ternak keluarga
                  yang bergerak dalam pengelolaan dan pengembangan peternakan.
                  Kegiatan usaha mencakup peternakan kambing, ayam kampung,
                  serta pengembangan produk pendukung peternakan.
                </p>

                <p className="text-sm leading-7 text-muted">
                  Dalam perkembangannya, usaha ini juga menyediakan layanan
                  titip ternak kambing, pembelian kambing untuk kebutuhan
                  qurban dan aqiqah, serta produk seperti susu dan pupuk
                  peternakan.
                </p>

                <p className="text-sm leading-7 text-muted">
                  Pengembangan usaha dilakukan secara bertahap dengan
                  memperhatikan pengelolaan ternak, kualitas produk, serta
                  pemanfaatan sumber daya yang tersedia.
                </p>
              </div>
            </div>

            {/* Fokus usaha */}
            <div className="bg-white rounded-2xl border border-line shadow-sm p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Fokus Usaha
              </p>

              <h2 className="font-heading text-xl sm:text-2xl font-bold text-ink mt-1">
                Produk & Layanan
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <FocusItem
                  icon={Leaf}
                  title="Kambing"
                  description="Kambing perah dan kambing gemuk."
                />

                <FocusItem
                  icon={HeartHandshake}
                  title="Titip Ternak"
                  description="Layanan penitipan ternak kambing."
                />

                <FocusItem
                  icon={Sprout}
                  title="Produk Peternakan"
                  description="Susu dan pupuk hasil peternakan."
                />

                <FocusItem
                  icon={Users}
                  title="Ayam & Maggot"
                  description="Pengembangan usaha peternakan lainnya."
                />
              </div>
            </div>
          </div>

          {/* Galeri profil */}
          {galeri.length > 0 && (
            <div className="mt-6 bg-white rounded-2xl border border-line shadow-sm p-5 sm:p-6">
              <div className="flex items-end justify-between gap-4 mb-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    Dokumentasi
                  </p>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-ink mt-1">
                    Galeri Juragan Kambing
                  </h3>
                </div>

                <span className="hidden sm:block text-xs text-muted">
                  Klik foto untuk melihat lebih besar
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {galeri.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedPhoto(item)}
                    className="group relative rounded-xl overflow-hidden aspect-square border border-line shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.image_url}
                      alt={item.keterangan || "Galeri Juragan Kambing"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Expand size={13} className="text-ink" />
                    </div>

                    {item.keterangan && (
                      <p className="absolute bottom-0 left-0 right-0 text-white text-[11px] font-medium px-2.5 py-2 text-left leading-snug line-clamp-2">
                        {item.keterangan}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* =========================================================
            PROGRAM CSR
        ========================================================= */}
        <section className="mt-16">
          <div className="bg-[#0F4229] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Branding */}
              <div className="p-7 sm:p-9 lg:p-10 flex flex-col justify-center">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-3">
                  <img
                    src={pertaminaLogo}
                    alt="Pertamina Patra Niaga"
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-white/60 mt-6">
                  Program Pemberdayaan
                </p>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-2 leading-tight">
                  Bagian dari Program UMKM Binaan
                </h2>

                <p className="text-sm leading-6 text-white/75 mt-4">
                  Juragan Kambing Sei Siak berkembang sebagai bagian dari
                  program UMKM binaan Pertamina Patra Niaga Fuel Terminal Sei
                  Siak.
                </p>
              </div>

              {/* Penjelasan */}
              <div className="bg-white p-7 sm:p-9 lg:p-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-tint flex items-center justify-center">
                    <HeartHandshake size={19} className="text-primary" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      Dukungan & Pendampingan
                    </p>
                    <h3 className="font-heading text-lg font-bold text-ink">
                      Pengembangan Usaha
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-muted leading-7 mt-5">
                  Dukungan melalui program tanggung jawab sosial dan
                  pemberdayaan masyarakat menjadi bagian dari proses
                  pengembangan usaha Juragan Kambing Sei Siak. Pendampingan
                  tersebut diarahkan untuk membantu pengembangan usaha dan
                  meningkatkan keberlanjutan kegiatan peternakan.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  <BenefitItem text="Pengembangan usaha" />
                  <BenefitItem text="Pemberdayaan masyarakat" />
                  <BenefitItem text="Pengelolaan peternakan" />
                  <BenefitItem text="Usaha berkelanjutan" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FUEL TERMINAL SEI SIAK
        ========================================================= */}
        <section className="mt-16">
          <SectionHeading
            blueWord="Fuel Terminal"
            redWord="Sei Siak"
            subtitle="Bagian dari lingkungan Pertamina Patra Niaga yang mendukung pelaksanaan program pemberdayaan masyarakat di sekitar wilayah operasional."
          />

          <div className="mt-7 bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[260px] md:min-h-[350px]">
                <img
                  src={fuelTerminalImage}
                  alt="Fuel Terminal Sei Siak"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                <div className="absolute left-5 bottom-5 sm:left-7 sm:bottom-7">
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 shadow-sm">
                    <Building2 size={16} className="text-primary" />
                    <span className="text-xs font-bold text-ink">
                      Fuel Terminal Sei Siak
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Pertamina Patra Niaga
                </p>

                <h2 className="font-heading text-xl sm:text-2xl font-bold text-ink mt-1">
                  Fuel Terminal Sei Siak
                </h2>

                <p className="text-sm text-muted leading-7 mt-5">
                  Fuel Terminal Sei Siak merupakan bagian dari Pertamina Patra
                  Niaga yang berada di wilayah Sei Siak, Pekanbaru, Riau.
                </p>

                <p className="text-sm text-muted leading-7 mt-3">
                  Melalui program pemberdayaan masyarakat dan UMKM binaan,
                  hubungan dengan Juragan Kambing Sei Siak menjadi salah satu
                  bagian dari upaya pengembangan usaha masyarakat di sekitar
                  wilayah operasional.
                </p>

                <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-primary-tint">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />

                  <div>
                    <p className="text-xs font-bold text-ink">
                      Wilayah Sei Siak
                    </p>
                    <p className="text-xs text-muted mt-1">
                      Pekanbaru, Riau
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            KEGIATAN
        ========================================================= */}
        <section className="mt-16">
          <SectionHeading
            blueWord="Kegiatan"
            redWord="Kami"
            subtitle="Dokumentasi kegiatan bersama Pertamina Patra Niaga Fuel Terminal Sei Siak. Klik untuk melihat selengkapnya."
          />

          {loading ? (
            <div className="mt-6 bg-white rounded-2xl border border-line p-8 text-center">
              <p className="text-sm text-muted">Memuat kegiatan...</p>
            </div>
          ) : kegiatan.length === 0 ? (
            <div className="mt-6 bg-white rounded-2xl border border-line p-8 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary-tint flex items-center justify-center">
                <Leaf size={20} className="text-primary" />
              </div>

              <h3 className="font-heading text-sm font-bold text-ink mt-4">
                Belum Ada Kegiatan
              </h3>

              <p className="text-xs text-muted mt-1">
                Belum ada kegiatan yang ditambahkan ke galeri.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              {kegiatan.map((item) => (
                <ActivityCard
                  key={item.id}
                  image={
                    item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : null
                  }
                  category={item.category}
                  categoryColor={item.category_color}
                  title={item.title}
                  date={item.activity_date}
                  large={item.is_large}
                  onClick={() => setSelected(item)}
                />
              ))}
            </div>
          )}
        </section>

        {/* =========================================================
            LOKASI & KONTAK
        ========================================================= */}
        <section className="mt-16">
          <SectionHeading
            blueWord="Lokasi &"
            redWord="Kontak"
            subtitle="Temukan lokasi dan hubungi Juragan Kambing Sei Siak untuk mendapatkan informasi lebih lanjut."
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-6 mt-7">
            {/* Lokasi */}
            <div className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
              <div className="h-52 bg-[#EEF2EF] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                  <div className="w-full h-full bg-[linear-gradient(45deg,transparent_48%,#D9E2DC_49%,#D9E2DC_51%,transparent_52%),linear-gradient(-45deg,transparent_48%,#D9E2DC_49%,#D9E2DC_51%,transparent_52%)] bg-[length:42px_42px]" />
                </div>

                <div className="relative w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                  <MapPin size={25} />
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Lokasi Kami
                </p>

                <h3 className="font-heading text-xl font-bold text-ink mt-1">
                  Juragan Kambing Sei Siak
                </h3>

                <p className="text-sm text-muted leading-6 mt-3">
                  Jl. Sei Siak, Pekanbaru, Riau
                </p>

                <button
                  type="button"
                  onClick={handleMaps}
                  className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                >
                  Lihat lokasi di Google Maps
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Kontak */}
            <div className="bg-[#0F4229] rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <MessageCircle size={22} className="text-white" />
                </div>

                <p className="text-[11px] font-bold uppercase tracking-wider text-white/60 mt-6">
                  Hubungi Kami
                </p>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">
                  Ada yang ingin ditanyakan?
                </h3>

                <p className="text-sm text-white/70 leading-6 mt-3">
                  Hubungi admin melalui WhatsApp untuk informasi produk,
                  layanan titip ternak, atau pertanyaan lainnya.
                </p>
              </div>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="mt-7 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white text-primary px-4 py-3.5 text-sm font-bold hover:bg-primary-tint transition-colors"
              >
                <MessageCircle size={17} />
                Chat WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================
            CTA
        ========================================================= */}
        <section className="mt-16">
          <CTABanner />
        </section>
      </main>

      <Footer />

      {/* =========================================================
          MODALS
      ========================================================= */}
      <ActivityDetailModal
        activity={
          selected
            ? {
                ...selected,
                date: selected.activity_date,
                image: selected.image_url ? (
                  <img
                    src={selected.image_url}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                ) : null,
              }
            : null
        }
        onClose={() => setSelected(null)}
      />

      <GaleriLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}

/* =========================================================
   COMPONENT KECIL
========================================================= */

function FocusItem({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAF8] border border-line">
      <div className="w-9 h-9 rounded-lg bg-primary-tint flex items-center justify-center shrink-0">
        <Icon size={16} className="text-primary" />
      </div>

      <div>
        <h4 className="text-xs font-bold text-ink">{title}</h4>
        <p className="text-[11px] text-muted leading-5 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}

function BenefitItem({ text }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 size={15} className="text-primary shrink-0" />
      <span className="text-xs font-medium text-ink">{text}</span>
    </div>
  );
}