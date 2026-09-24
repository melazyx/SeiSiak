import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { useProduk } from "../context/ProdukContext";

import heroKambing from "../assets/hero-kambing.jpeg";

const FILTERS = [
  "Semua",
  "Kambing",
  "Ayam",
  "Maggot",
  "Pupuk",
  "Susu",
];

const PRICE_FILTERS = [
  "Semua",
  "≤ Rp100.000",
  "Rp100.000 - Rp2.000.000",
  "Rp2.000.000 - Rp5.000.000",
  "> Rp5.000.000",
];

const STATUS_FILTERS = [
  "Semua",
  "Tersedia",
  "Stok Habis",
];

const PRODUCTS_PER_PAGE = 9;

// ============================================================
// HELPER
// ============================================================

function getHargaNumber(harga) {
  if (!harga) return 0;

  const angka = String(harga).replace(/[^\d]/g, "");

  return Number(angka) || 0;
}

function getProductType(product, kategori) {
  const text = `
    ${product?.nama || ""}
    ${product?.deskripsi || ""}
    ${product?.description || ""}
  `.toLowerCase();

  if (text.includes("susu")) {
    return "Susu";
  }

  if (text.includes("pupuk")) {
    return "Pupuk";
  }

  return kategori;
}

function buildProductList(data) {
  if (!data) return [];

  const list = [];

  const pushProducts = (
    items,
    kategori,
    defaultTipe = kategori
  ) => {
    (items || []).forEach((product) => {
      list.push({
        ...product,
        kategori,
        tipe: getProductType(product, defaultTipe),
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

function matchesCategory(product, filter) {
  if (filter === "Semua") {
    return true;
  }

  return (
    product.kategori === filter ||
    product.tipe === filter
  );
}

function matchesPrice(harga, filter) {
  const value = getHargaNumber(harga);

  if (filter === "Semua") return true;

  if (filter === "≤ Rp100.000") {
    return value <= 100000;
  }

  if (filter === "Rp100.000 - Rp2.000.000") {
    return value > 100000 && value <= 2000000;
  }

  if (filter === "Rp2.000.000 - Rp5.000.000") {
    return value > 2000000 && value <= 5000000;
  }

  if (filter === "> Rp5.000.000") {
    return value > 5000000;
  }

  return true;
}

function matchesStatus(product, filter) {
  if (filter === "Semua") {
    return true;
  }

  const status = String(
    product?.status || "Tersedia"
  ).toLowerCase();

  if (filter === "Tersedia") {
    return (
      status !== "habis" &&
      status !== "stok habis"
    );
  }

  if (filter === "Stok Habis") {
    return (
      status === "habis" ||
      status === "stok habis"
    );
  }

  return true;
}

// ============================================================
// PAGE
// ============================================================

export default function Katalog() {
  const { data } = useProduk();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState("Semua");

  const [priceFilter, setPriceFilter] =
    useState("Semua");

  const [statusFilter, setStatusFilter] =
    useState("Semua");

  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);

  const [page, setPage] = useState(1);

  // ----------------------------------------------------------
  // ALL PRODUCTS
  // ----------------------------------------------------------

  const allProducts = useMemo(() => {
    return buildProductList(data);
  }, [data]);

  // ----------------------------------------------------------
  // FILTER
  // ----------------------------------------------------------

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return allProducts.filter((product) => {
      const nama = String(
        product.nama || ""
      ).toLowerCase();

      const deskripsi = String(
        product.deskripsi ||
          product.description ||
          ""
      ).toLowerCase();

      const kategori = String(
        product.kategori || ""
      ).toLowerCase();

      const tipe = String(
        product.tipe || ""
      ).toLowerCase();

      const cocokSearch =
        !keyword ||
        nama.includes(keyword) ||
        deskripsi.includes(keyword) ||
        kategori.includes(keyword) ||
        tipe.includes(keyword);

      const cocokKategori =
        matchesCategory(
          product,
          activeFilter
        );

      const cocokHarga =
        matchesPrice(
          product.harga,
          priceFilter
        );

      const cocokStatus =
        matchesStatus(
          product,
          statusFilter
        );

      return (
        cocokSearch &&
        cocokKategori &&
        cocokHarga &&
        cocokStatus
      );
    });
  }, [
    allProducts,
    search,
    activeFilter,
    priceFilter,
    statusFilter,
  ]);

  // ----------------------------------------------------------
  // PAGINATION
  // ----------------------------------------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        PRODUCTS_PER_PAGE
    )
  );

  const currentPage = Math.min(
    page,
    totalPages
  );

  const paginatedProducts =
    filteredProducts.slice(
      (currentPage - 1) *
        PRODUCTS_PER_PAGE,
      currentPage *
        PRODUCTS_PER_PAGE
    );

  // ----------------------------------------------------------
  // RESET
  // ----------------------------------------------------------

  function resetFilter() {
    setSearch("");
    setActiveFilter("Semua");
    setPriceFilter("Semua");
    setStatusFilter("Semua");
    setPage(1);
  }

  function handleCategoryChange(category) {
    setActiveFilter(category);
    setPage(1);
  }

  function handleSearch(value) {
    setSearch(value);
    setPage(1);
  }

  // ----------------------------------------------------------
  // PAGE
  // ----------------------------------------------------------

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative">
        <div className="relative h-[280px] sm:h-[330px] lg:h-[350px] overflow-hidden">
          <img
            src={heroKambing}
            alt="Katalog Produk Juragan Kambing Sei Siak"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-5 sm:px-8 lg:px-10 flex items-center">
            <div className="max-w-2xl text-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-white" />

                <span className="text-xs sm:text-sm font-semibold">
                  Produk Peternakan Sei Siak
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
                Katalog Produk
              </h1>

              <p className="mt-3 text-sm sm:text-base lg:text-lg text-white/90">
                Pilih produk peternakan terbaik
                sesuai kebutuhan Anda.
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 -mt-7">
          <div className="bg-white border border-line rounded-2xl shadow-card p-2">
            <div className="flex items-center gap-3 px-3 sm:px-4">
              <Search
                size={20}
                className="text-muted shrink-0"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="Cari produk..."
                className="flex-1 h-12 outline-none bg-transparent text-sm text-ink placeholder:text-muted"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  className="text-muted hover:text-ink"
                >
                  <X size={17} />
                </button>
              )}

              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-primary text-white items-center justify-center">
                <Search size={17} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-10 pb-16">

        {/* CATEGORY TABS */}
        <div className="flex items-center justify-between gap-4 mb-7">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {FILTERS.map((filter) => {
              const active =
                activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(filter)
                  }
                  className={`
                    shrink-0
                    px-5
                    py-2.5
                    rounded-full
                    text-xs
                    sm:text-sm
                    font-semibold
                    transition-all
                    ${
                      active
                        ? "bg-primary text-white shadow-sm"
                        : "bg-white text-muted border border-line hover:border-primary hover:text-primary"
                    }
                  `}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileFilterOpen(true)
            }
            className="lg:hidden shrink-0 inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-line text-xs font-semibold text-ink"
          >
            <SlidersHorizontal size={15} />
            Filter
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-7">

          {/* =================================================
              SIDEBAR
          ================================================== */}
          <aside className="hidden lg:block">
            <div className="bg-white border border-line rounded-2xl p-5 sticky top-24">

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={17}
                    className="text-primary"
                  />

                  <h2 className="font-heading font-bold text-base text-ink">
                    Filter
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={resetFilter}
                  className="text-[11px] font-semibold text-primary hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* JENIS PRODUK */}
              <div className="pb-5 border-b border-line">
                <h3 className="text-xs font-bold text-ink mb-4">
                  Jenis Produk
                </h3>

                <div className="space-y-3">
                  {FILTERS.map((filter) => (
                    <label
                      key={filter}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="desktop-category"
                        checked={
                          activeFilter === filter
                        }
                        onChange={() =>
                          handleCategoryChange(
                            filter
                          )
                        }
                        className="accent-[#087F5B]"
                      />

                      <span className="text-xs text-muted">
                        {filter}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* HARGA */}
              <div className="py-5 border-b border-line">
                <h3 className="text-xs font-bold text-ink mb-4">
                  Harga
                </h3>

                <div className="space-y-3">
                  {PRICE_FILTERS.map((filter) => (
                    <label
                      key={filter}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="desktop-price"
                        checked={
                          priceFilter === filter
                        }
                        onChange={() => {
                          setPriceFilter(filter);
                          setPage(1);
                        }}
                        className="accent-[#087F5B]"
                      />

                      <span className="text-xs text-muted">
                        {filter}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* STATUS */}
              <div className="pt-5">
                <h3 className="text-xs font-bold text-ink mb-4">
                  Status
                </h3>

                <div className="space-y-3">
                  {STATUS_FILTERS.map((filter) => (
                    <label
                      key={filter}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="desktop-status"
                        checked={
                          statusFilter === filter
                        }
                        onChange={() => {
                          setStatusFilter(filter);
                          setPage(1);
                        }}
                        className="accent-[#087F5B]"
                      />

                      <span className="text-xs text-muted">
                        {filter}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={resetFilter}
                className="w-full mt-6 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors"
              >
                <RotateCcw size={13} />
                Reset Filter
              </button>
            </div>
          </aside>

          {/* =================================================
              PRODUCTS
          ================================================== */}
          <section>

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-ink">
                  {activeFilter === "Semua"
                    ? "Semua Produk"
                    : activeFilter}
                </h2>

                <p className="text-xs sm:text-sm text-muted mt-1">
                  Pilihan produk peternakan
                  berkualitas dari Sei Siak.
                </p>
              </div>

              <p className="text-xs text-muted">
                {filteredProducts.length} produk
              </p>
            </div>

            {/* ACTIVE FILTER */}
            {(activeFilter !== "Semua" ||
              priceFilter !== "Semua" ||
              statusFilter !== "Semua" ||
              search) && (
              <div className="flex flex-wrap gap-2 mb-5">

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      handleSearch("")
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-tint text-primary text-[11px] font-semibold"
                  >
                    "{search}"
                    <X size={12} />
                  </button>
                )}

                {activeFilter !== "Semua" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryChange(
                        "Semua"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-tint text-primary text-[11px] font-semibold"
                  >
                    {activeFilter}
                    <X size={12} />
                  </button>
                )}

                {priceFilter !== "Semua" && (
                  <button
                    type="button"
                    onClick={() => {
                      setPriceFilter("Semua");
                      setPage(1);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-tint text-primary text-[11px] font-semibold"
                  >
                    {priceFilter}
                    <X size={12} />
                  </button>
                )}

                {statusFilter !== "Semua" && (
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("Semua");
                      setPage(1);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-tint text-primary text-[11px] font-semibold"
                  >
                    {statusFilter}
                    <X size={12} />
                  </button>
                )}
              </div>
            )}

            {/* PRODUCT GRID */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginatedProducts.map(
                  (product) => (
                    <ProductCard
                      key={`${product.kategori}-${product.id}`}
                      item={product}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="bg-white border border-line rounded-2xl p-12 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary-tint flex items-center justify-center">
                  <Search
                    size={23}
                    className="text-primary"
                  />
                </div>

                <h3 className="font-heading text-base font-bold text-ink mt-5">
                  Produk tidak ditemukan
                </h3>

                <p className="text-sm text-muted mt-2">
                  Coba ubah pencarian atau filter
                  yang digunakan.
                </p>

                <button
                  type="button"
                  onClick={resetFilter}
                  className="mt-5 text-xs font-bold text-primary hover:underline"
                >
                  Reset semua filter
                </button>
              </div>
            )}

            {/* PAGINATION */}
            {filteredProducts.length > 0 &&
              totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-9">

                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setPage((p) =>
                        Math.max(1, p - 1)
                      )
                    }
                    className="w-9 h-9 rounded-lg border border-line bg-white flex items-center justify-center text-muted disabled:opacity-40 hover:border-primary hover:text-primary"
                  >
                    <ChevronLeft size={15} />
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) =>
                      index + 1
                  ).map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={() =>
                        setPage(number)
                      }
                      className={`
                        w-9
                        h-9
                        rounded-lg
                        text-xs
                        font-semibold
                        ${
                          currentPage === number
                            ? "bg-primary text-white"
                            : "bg-white border border-line text-muted hover:border-primary hover:text-primary"
                        }
                      `}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={
                      currentPage === totalPages
                    }
                    onClick={() =>
                      setPage((p) =>
                        Math.min(
                          totalPages,
                          p + 1
                        )
                      )
                    }
                    className="w-9 h-9 rounded-lg border border-line bg-white flex items-center justify-center text-muted disabled:opacity-40 hover:border-primary hover:text-primary"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              )}
          </section>
        </div>
      </main>

      {/* =====================================================
          MOBILE FILTER
      ====================================================== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileFilterOpen(false)
            }
          />

          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[88vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg font-bold text-ink">
                Filter Produk
              </h2>

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

            {/* CATEGORY */}
            <div className="pb-5 border-b border-line">
              <h3 className="text-xs font-bold text-ink mb-4">
                Jenis Produk
              </h3>

              <div className="space-y-3">
                {FILTERS.map((filter) => (
                  <label
                    key={filter}
                    className="flex items-center gap-3"
                  >
                    <input
                      type="radio"
                      name="mobile-category"
                      checked={
                        activeFilter === filter
                      }
                      onChange={() =>
                        handleCategoryChange(
                          filter
                        )
                      }
                      className="accent-[#087F5B]"
                    />

                    <span className="text-sm text-muted">
                      {filter}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div className="py-5 border-b border-line">
              <h3 className="text-xs font-bold text-ink mb-4">
                Harga
              </h3>

              <div className="space-y-3">
                {PRICE_FILTERS.map((filter) => (
                  <label
                    key={filter}
                    className="flex items-center gap-3"
                  >
                    <input
                      type="radio"
                      name="mobile-price"
                      checked={
                        priceFilter === filter
                      }
                      onChange={() => {
                        setPriceFilter(filter);
                        setPage(1);
                      }}
                      className="accent-[#087F5B]"
                    />

                    <span className="text-sm text-muted">
                      {filter}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* STATUS */}
            <div className="pt-5">
              <h3 className="text-xs font-bold text-ink mb-4">
                Status
              </h3>

              <div className="space-y-3">
                {STATUS_FILTERS.map((filter) => (
                  <label
                    key={filter}
                    className="flex items-center gap-3"
                  >
                    <input
                      type="radio"
                      name="mobile-status"
                      checked={
                        statusFilter === filter
                      }
                      onChange={() => {
                        setStatusFilter(filter);
                        setPage(1);
                      }}
                      className="accent-[#087F5B]"
                    />

                    <span className="text-sm text-muted">
                      {filter}
                    </span>
                  </label>
                ))}
              </div>
            </div>

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