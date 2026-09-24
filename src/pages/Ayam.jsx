import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  X,
  Leaf,
  Recycle,
  Coins,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import CTABanner from "../components/CTABanner";
import WaButton from "../components/WaButton";

import { useProduk } from "../context/ProdukContext";
import { useKategori } from "../context/KategoriContext";

import ayamImage from "../assets/hero-ayam.jpg";

const BENEFITS = [
  {
    icon: BadgeCheck,
    title: "Ayam Sehat",
    desc: "Dirawat dengan baik",
  },
  {
    icon: Leaf,
    title: "Ayam Kampung",
    desc: "Produk peternakan lokal",
  },
  {
    icon: Coins,
    title: "Harga Bersahabat",
    desc: "Sesuai kebutuhan",
  },
  {
    icon: Recycle,
    title: "Pupuk Organik",
    desc: "Ramah lingkungan",
  },
];

const FILTER_KATEGORI = [
  "Semua",
  "Ayam",
  "Pupuk",
];

const FILTER_HARGA = [
  "Semua",
  "≤ Rp100.000",
  "Rp100.000 - Rp500.000",
  "Rp500.000 - Rp2.000.000",
  "> Rp2.000.000",
];

function getHargaNumber(harga) {
  if (!harga) return 0;

  const angka = String(harga).replace(/[^\d]/g, "");

  return Number(angka) || 0;
}

function cocokHarga(harga, filter) {
  const nilai = getHargaNumber(harga);

  if (filter === "Semua") return true;

  if (filter === "≤ Rp100.000") {
    return nilai <= 100000;
  }

  if (filter === "Rp100.000 - Rp500.000") {
    return nilai > 100000 && nilai <= 500000;
  }

  if (filter === "Rp500.000 - Rp2.000.000") {
    return nilai > 500000 && nilai <= 2000000;
  }

  if (filter === "> Rp2.000.000") {
    return nilai > 2000000;
  }

  return true;
}

export default function Ayam() {
  const { data } = useProduk();

  const {
    getByAnimal,
    loading: loadingKategori,
  } = useKategori();

  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState(null);

  const [kategoriFilter, setKategoriFilter] =
    useState("Semua");

  const [hargaFilter, setHargaFilter] =
    useState("Semua");

  const [statusFilter, setStatusFilter] =
    useState("Semua");

  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);

  const tabs = getByAnimal("ayam");

  const currentTabKey =
    activeTab ||
    (tabs[0] && tabs[0].section_key);

  const currentTab = tabs.find(
    (tab) =>
      tab.section_key === currentTabKey
  );

  const produkList = currentTab
    ? data[currentTab.section_key] || []
    : [];

  const filteredProducts = produkList.filter(
    (product) => {
      const nama = String(
        product.nama || ""
      ).toLowerCase();

      const deskripsi = String(
        product.deskripsi ||
          product.description ||
          ""
      ).toLowerCase();

      const search = query.toLowerCase();

      const cocokSearch =
        nama.includes(search) ||
        deskripsi.includes(search);

      const cocokHargaFilter =
        cocokHarga(
          product.harga,
          hargaFilter
        );

      let cocokKategori = true;

      if (kategoriFilter !== "Semua") {
        const text =
          `${nama} ${deskripsi}`;

        cocokKategori =
          text.includes(
            kategoriFilter.toLowerCase()
          );
      }

      let cocokStatus = true;

      if (statusFilter === "Tersedia") {
        cocokStatus =
          product.status !== "Habis" &&
          product.status !== "habis";
      }

      if (statusFilter === "Stok Habis") {
        cocokStatus =
          product.status === "Habis" ||
          product.status === "habis";
      }

      return (
        cocokSearch &&
        cocokHargaFilter &&
        cocokKategori &&
        cocokStatus
      );
    }
  );

  const resetFilter = () => {
    setKategoriFilter("Semua");
    setHargaFilter("Semua");
    setStatusFilter("Semua");
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-cream">

      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative">

        <div className="relative h-[300px] sm:h-[350px] overflow-hidden">

          <img
            src={ayamImage}
            alt="Katalog Ayam Sei Siak"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-5 sm:px-8 lg:px-10 flex items-center">

            <div className="max-w-2xl text-white">

              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm">
                <Leaf size={13} />

                <span className="text-[10px] sm:text-xs font-semibold">
                  Produk Peternakan Sei Siak
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Katalog Ayam
              </h1>

              <p className="mt-3 text-sm sm:text-base text-white/85 max-w-xl">
                Pilih produk ayam dan hasil peternakan
                terbaik dari Juragan Kambing Sei Siak.
              </p>

            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 -mt-7">

          <div className="bg-white rounded-2xl shadow-card border border-line p-2">

            <div className="flex items-center gap-3 px-3 sm:px-4">

              <Search
                size={19}
                className="text-muted shrink-0"
              />

              <input
                type="text"
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Cari produk ayam..."
                className="flex-1 h-12 bg-transparent outline-none text-sm text-ink placeholder:text-muted"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-muted hover:text-ink"
                >
                  <X size={17} />
                </button>
              )}

              <button
                type="button"
                className="hidden sm:flex w-10 h-10 rounded-xl bg-primary items-center justify-center text-white hover:bg-primary-dark transition-colors"
              >
                <Search size={16} />
              </button>

            </div>
          </div>
        </div>

      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-10 pb-16">

        {/* BENEFITS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">

          {BENEFITS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white border border-line rounded-xl px-4 py-4 flex items-center gap-3"
              >

                <div className="w-9 h-9 rounded-lg bg-primary-tint flex items-center justify-center shrink-0">

                  <Icon
                    size={17}
                    className="text-primary"
                  />

                </div>

                <div className="min-w-0">

                  <p className="text-xs sm:text-sm font-bold text-ink truncate">
                    {item.title}
                  </p>

                  <p className="text-[10px] sm:text-xs text-muted mt-0.5">
                    {item.desc}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

        {/* ===================================================
            KATEGORI
        =================================================== */}
        {!loadingKategori &&
          tabs.length > 0 && (
            <div className="mb-8">

              <div className="flex items-center justify-between mb-4">

                <div>

                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Kategori
                  </p>

                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-ink mt-1">
                    Produk Ayam
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMobileFilterOpen(true)
                  }
                  className="lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-line bg-white text-xs font-semibold text-ink"
                >
                  <SlidersHorizontal size={15} />
                  Filter
                </button>

              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">

                {tabs.map((tab) => {

                  const active =
                    currentTabKey ===
                    tab.section_key;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(
                          tab.section_key
                        );
                        setQuery("");
                      }}
                      className={`
                        shrink-0 px-5 py-2.5 rounded-full
                        text-xs sm:text-sm font-semibold
                        transition-all
                        ${
                          active
                            ? "bg-primary text-white shadow-sm"
                            : "bg-white text-muted border border-line hover:border-primary hover:text-primary"
                        }
                      `}
                    >
                      {tab.judul}
                    </button>
                  );
                })}

              </div>

            </div>
          )}

        {/* LOADING */}
        {loadingKategori && (
          <div className="py-16 text-center">
            <p className="text-sm text-muted">
              Memuat kategori...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loadingKategori &&
          tabs.length === 0 && (
            <div className="bg-white border border-line rounded-2xl p-10 text-center">

              <p className="text-sm text-muted">
                Belum ada kategori untuk ayam.
              </p>

            </div>
          )}

        {/* ===================================================
            PRODUK
        =================================================== */}
        {!loadingKategori &&
          currentTab &&
          currentTab.tipe === "produk" && (
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">

              {/* FILTER DESKTOP */}
              <aside className="hidden lg:block">

                <div className="bg-white border border-line rounded-2xl p-5 sticky top-24">

                  <div className="flex items-center justify-between mb-5">

                    <div className="flex items-center gap-2">

                      <SlidersHorizontal
                        size={16}
                        className="text-primary"
                      />

                      <h3 className="font-heading text-sm font-bold text-ink">
                        Filter
                      </h3>

                    </div>

                    <button
                      type="button"
                      onClick={resetFilter}
                      className="text-[10px] font-semibold text-primary hover:underline"
                    >
                      Reset
                    </button>

                  </div>

                  {/* JENIS */}
                  <div className="pb-5 border-b border-line">

                    <p className="text-xs font-bold text-ink mb-3">
                      Jenis Produk
                    </p>

                    <div className="space-y-2.5">

                      {FILTER_KATEGORI.map(
                        (item) => (
                          <label
                            key={item}
                            className="flex items-center gap-2.5 cursor-pointer"
                          >

                            <input
                              type="radio"
                              name="ayam-kategori"
                              checked={
                                kategoriFilter ===
                                item
                              }
                              onChange={() =>
                                setKategoriFilter(
                                  item
                                )
                              }
                              className="accent-[#087F5B]"
                            />

                            <span className="text-xs text-muted">
                              {item}
                            </span>

                          </label>
                        )
                      )}

                    </div>
                  </div>

                  {/* HARGA */}
                  <div className="py-5 border-b border-line">

                    <p className="text-xs font-bold text-ink mb-3">
                      Harga
                    </p>

                    <div className="space-y-2.5">

                      {FILTER_HARGA.map(
                        (item) => (
                          <label
                            key={item}
                            className="flex items-center gap-2.5 cursor-pointer"
                          >

                            <input
                              type="radio"
                              name="ayam-harga"
                              checked={
                                hargaFilter ===
                                item
                              }
                              onChange={() =>
                                setHargaFilter(
                                  item
                                )
                              }
                              className="accent-[#087F5B]"
                            />

                            <span className="text-xs text-muted">
                              {item}
                            </span>

                          </label>
                        )
                      )}

                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="pt-5">

                    <p className="text-xs font-bold text-ink mb-3">
                      Status
                    </p>

                    <div className="space-y-2.5">

                      {[
                        "Semua",
                        "Tersedia",
                        "Stok Habis",
                      ].map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2.5 cursor-pointer"
                        >

                          <input
                            type="radio"
                            name="ayam-status"
                            checked={
                              statusFilter ===
                              item
                            }
                            onChange={() =>
                              setStatusFilter(
                                item
                              )
                            }
                            className="accent-[#087F5B]"
                          />

                          <span className="text-xs text-muted">
                            {item}
                          </span>

                        </label>
                      ))}

                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={resetFilter}
                    className="w-full mt-6 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors"
                  >
                    Reset Filter
                  </button>

                </div>
              </aside>

              {/* PRODUK */}
              <section>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">

                  <div>

                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-ink">
                      {currentTab.judul}
                    </h2>

                    {currentTab.deskripsi && (
                      <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
                        {currentTab.deskripsi}
                      </p>
                    )}

                  </div>

                  <p className="text-xs text-muted shrink-0">
                    {filteredProducts.length} produk
                  </p>

                </div>

                {/* FILTER MOBILE */}
                {(kategoriFilter !== "Semua" ||
                  hargaFilter !== "Semua" ||
                  statusFilter !== "Semua") && (
                  <div className="lg:hidden flex flex-wrap gap-2 mb-5">

                    {kategoriFilter !==
                      "Semua" && (
                      <button
                        type="button"
                        onClick={() =>
                          setKategoriFilter(
                            "Semua"
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-primary-tint text-primary text-[10px] font-semibold"
                      >
                        {kategoriFilter}
                        <X size={11} />
                      </button>
                    )}

                    {hargaFilter !==
                      "Semua" && (
                      <button
                        type="button"
                        onClick={() =>
                          setHargaFilter(
                            "Semua"
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-primary-tint text-primary text-[10px] font-semibold"
                      >
                        {hargaFilter}
                        <X size={11} />
                      </button>
                    )}

                    {statusFilter !==
                      "Semua" && (
                      <button
                        type="button"
                        onClick={() =>
                          setStatusFilter(
                            "Semua"
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-primary-tint text-primary text-[10px] font-semibold"
                      >
                        {statusFilter}
                        <X size={11} />
                      </button>
                    )}

                  </div>
                )}

                {/* GRID */}
                {filteredProducts.length > 0 ? (

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

                    {filteredProducts.map(
                      (item) => (
                        <ProductCard
                          key={item.id}
                          item={item}
                          waMessage={(i) =>
                            `Halo, saya ingin pesan ${i.nama} (${i.harga}).`
                          }
                        />
                      )
                    )}

                  </div>

                ) : (

                  <div className="bg-white border border-line rounded-2xl p-10 text-center">

                    <div className="w-12 h-12 mx-auto rounded-full bg-primary-tint flex items-center justify-center mb-4">

                      <Search
                        size={20}
                        className="text-primary"
                      />

                    </div>

                    <h3 className="font-heading text-sm font-bold text-ink">
                      Produk tidak ditemukan
                    </h3>

                    <p className="text-xs text-muted mt-1">
                      Coba ubah kata pencarian
                      atau filter yang digunakan.
                    </p>

                    <button
                      type="button"
                      onClick={resetFilter}
                      className="mt-4 text-xs font-bold text-primary hover:underline"
                    >
                      Reset filter
                    </button>

                  </div>
                )}

              </section>

            </div>
          )}

        {/* ===================================================
            LAYANAN
        =================================================== */}
        {!loadingKategori &&
          currentTab &&
          currentTab.tipe === "layanan" && (

            <div className="max-w-2xl mx-auto">

              <div className="bg-white border border-line rounded-2xl p-7 sm:p-10 text-center">

                <div className="w-14 h-14 mx-auto rounded-full bg-primary-tint flex items-center justify-center mb-5">

                  <Leaf
                    size={24}
                    className="text-primary"
                  />

                </div>

                <h2 className="font-heading text-xl font-bold text-ink">
                  {currentTab.judul}
                </h2>

                <p className="text-sm leading-relaxed mt-3 mb-6 text-muted whitespace-pre-line">
                  {currentTab.deskripsi}
                </p>

                <div className="max-w-xs mx-auto space-y-3">

                  <WaButton
                    full
                    message={`Halo, saya ingin tanya-tanya soal ${currentTab.judul.toLowerCase()}.`}
                  />

                  <Link
                    to="/katalog"
                    className="flex items-center justify-center gap-1 text-xs font-semibold text-secondary-dark hover:underline"
                  >
                    Lihat katalog lainnya
                    <ChevronRight size={13} />
                  </Link>

                </div>

              </div>

            </div>
          )}

        {/* CTA */}
        <div className="mt-12">
          <CTABanner />
        </div>

      </main>

      {/* =====================================================
          MOBILE FILTER
      ===================================================== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileFilterOpen(false)
            }
          />

          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">

              <h3 className="font-heading text-lg font-bold text-ink">
                Filter Produk
              </h3>

              <button
                type="button"
                onClick={() =>
                  setMobileFilterOpen(false)
                }
                className="w-9 h-9 rounded-full bg-cream flex items-center justify-center"
              >
                <X size={17} />
              </button>

            </div>

            {/* KATEGORI */}
            <div className="pb-5 border-b border-line">

              <p className="text-xs font-bold text-ink mb-3">
                Jenis Produk
              </p>

              <div className="space-y-3">

                {FILTER_KATEGORI.map(
                  (item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <input
                        type="radio"
                        name="mobile-ayam-kategori"
                        checked={
                          kategoriFilter ===
                          item
                        }
                        onChange={() =>
                          setKategoriFilter(
                            item
                          )
                        }
                        className="accent-[#087F5B]"
                      />

                      <span className="text-sm text-muted">
                        {item}
                      </span>

                    </label>
                  )
                )}

              </div>
            </div>

            {/* HARGA */}
            <div className="py-5 border-b border-line">

              <p className="text-xs font-bold text-ink mb-3">
                Harga
              </p>

              <div className="space-y-3">

                {FILTER_HARGA.map(
                  (item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <input
                        type="radio"
                        name="mobile-ayam-harga"
                        checked={
                          hargaFilter ===
                          item
                        }
                        onChange={() =>
                          setHargaFilter(
                            item
                          )
                        }
                        className="accent-[#087F5B]"
                      />

                      <span className="text-sm text-muted">
                        {item}
                      </span>

                    </label>
                  )
                )}

              </div>
            </div>

            {/* STATUS */}
            <div className="pt-5">

              <p className="text-xs font-bold text-ink mb-3">
                Status
              </p>

              <div className="space-y-3">

                {[
                  "Semua",
                  "Tersedia",
                  "Stok Habis",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <input
                      type="radio"
                      name="mobile-ayam-status"
                      checked={
                        statusFilter ===
                        item
                      }
                      onChange={() =>
                        setStatusFilter(
                          item
                        )
                      }
                      className="accent-[#087F5B]"
                    />

                    <span className="text-sm text-muted">
                      {item}
                    </span>

                  </label>
                ))}

              </div>
            </div>

            {/* BUTTON */}
            <div className="flex gap-3 mt-7">

              <button
                type="button"
                onClick={resetFilter}
                className="flex-1 py-3 rounded-xl border border-line text-sm font-bold text-ink"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() =>
                  setMobileFilterOpen(false)
                }
                className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold"
              >
                Terapkan
              </button>

            </div>

          </div>
        </div>
      )}

      <Footer />

    </div>
  );
}