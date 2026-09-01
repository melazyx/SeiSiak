import {
  Package,
  ShoppingBag,
  Egg,
  Bug,
  ArrowRight,
  Building2,
  MapPin,
  ShieldCheck,
  Leaf,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout";
import { useProduk } from "../../context/ProdukContext";

import pertaminaLogo from "../../assets/pertamina-logo.png";
import fuelTerminalImage from "../../assets/fuel-terminal.jpeg";


export default function Dashboard() {

  const navigate = useNavigate();
  const { data } = useProduk();


  // =====================================================
  // HITUNG JUMLAH PRODUK
  // =====================================================

  const totalKambing =
    (data.kambingSusuPupuk || []).length +
    (data.kambingQurban || []).length;

  const totalAyam =
    (data.ayamJual || []).length +
    (data.ayamPupuk || []).length;

  const totalMaggot =
    (data.maggotProduk || []).length;

  const totalProduk =
    totalKambing +
    totalAyam +
    totalMaggot;


  // =====================================================
  // STATISTIK
  // =====================================================

  const statistics = [
    {
      title: "Total Produk",
      value: totalProduk,
      description: "Semua produk",
      icon: Package,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },

    {
      title: "Produk Kambing",
      value: totalKambing,
      description: "Susu, pupuk, qurban & aqiqah",
      icon: ShoppingBag,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },

    {
      title: "Produk Ayam",
      value: totalAyam,
      description: "Ayam kampung & pupuk",
      icon: Egg,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },

    {
      title: "Produk Maggot",
      value: totalMaggot,
      description: "Maggot basah & kering",
      icon: Bug,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];


  // =====================================================
  // QUICK ACCESS
  // =====================================================

  const categories = [
    {
      title: "Produk Kambing",
      description:
        "Kelola produk susu, pupuk, qurban, aqiqah dan layanan ternak.",
      icon: "🐐",
      count: totalKambing,
      path: "/admin/produk/kambing",
      bg: "bg-green-50",
      border: "border-green-100",
    },

    {
      title: "Produk Ayam",
      description:
        "Kelola ayam kampung dan produk pupuk dari kandang.",
      icon: "🐔",
      count: totalAyam,
      path: "/admin/produk/ayam",
      bg: "bg-yellow-50",
      border: "border-yellow-100",
    },

    {
      title: "Produk Maggot",
      description:
        "Kelola produk maggot basah dan maggot kering.",
      icon: "🪱",
      count: totalMaggot,
      path: "/admin/produk/maggot",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
  ];


  return (
    <AdminLayout>

      <div className="min-h-screen bg-slate-50">

        <div className="max-w-7xl mx-auto p-5 sm:p-8">


          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">

            <div>

              <div className="flex items-center gap-2 mb-2">

                <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wide">
                  Admin Panel
                </span>

                <span className="text-xs text-slate-400">
                  Fuel Terminal Sei Siak
                </span>

              </div>


              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-heading">

                Selamat datang,{" "}

                <span className="text-blue-700">
                  Admin FT Sei Siak
                </span>

                {" "}👋

              </h1>


              <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">

                Kelola informasi produk Juragan Kambing Sei Siak
                melalui panel administrasi.

              </p>

            </div>


            {/* IDENTITAS TERMINAL */}

            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">

                <Building2
                  size={25}
                  className="text-blue-700"
                />

              </div>


              <div>

                <p className="text-sm font-bold text-slate-800">
                  Fuel Terminal Sei Siak
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  PT Pertamina Patra Niaga
                </p>

                <div className="flex items-center gap-1.5 mt-1">

                  <span className="w-2 h-2 rounded-full bg-green-500" />

                  <span className="text-[11px] text-green-600 font-medium">
                    Sistem aktif
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* STATISTICS */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {statistics.map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    p-5
                    shadow-sm
                    hover:shadow-md
                    transition-all
                  "
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm text-slate-500">
                        {item.title}
                      </p>


                      <p className="text-3xl font-bold text-slate-900 mt-2">
                        {item.value}
                      </p>


                      <p className="text-xs text-slate-400 mt-1">
                        {item.description}
                      </p>

                    </div>


                    <div
                      className={`
                        w-12
                        h-12
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        ${item.iconBg}
                      `}
                    >

                      <Icon
                        size={22}
                        className={item.iconColor}
                      />

                    </div>

                  </div>

                </div>

              );

            })}

          </div>


          {/* ================================================= */}
          {/* INFORMATION FUEL TERMINAL */}
          {/* ================================================= */}

          <div className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            overflow-hidden
            shadow-sm
            mb-8
          ">

            <div className="grid grid-cols-1 lg:grid-cols-5">


              {/* IMAGE */}

              <div className="lg:col-span-2 h-64 lg:h-auto">

                <img
                  src={fuelTerminalImage}
                  alt="Fuel Terminal Sei Siak"
                  className="w-full h-full object-cover"
                />

              </div>


              {/* CONTENT */}

              <div className="lg:col-span-3 p-6 sm:p-8">

                <div className="flex items-center gap-3 mb-4">

                  <img
                    src={pertaminaLogo}
                    alt="Pertamina Patra Niaga"
                    className="h-9 w-auto object-contain"
                  />

                  <div className="h-8 w-px bg-slate-200" />

                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                    Fuel Terminal Sei Siak
                  </span>

                </div>


                <h2 className="text-2xl font-bold text-slate-900">
                  Juragan Kambing Sei Siak
                </h2>


                <p className="text-sm text-slate-500 leading-relaxed mt-3 max-w-2xl">

                  Website pengelolaan dan informasi produk usaha
                  peternakan Juragan Kambing Sei Siak sebagai bagian
                  dari pengembangan usaha dan pemberdayaan masyarakat
                  di lingkungan Fuel Terminal Sei Siak.

                </p>


                {/* INFO */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">


                  <div className="flex items-start gap-3">

                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">

                      <MapPin
                        size={17}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        Lokasi
                      </p>

                      <p className="text-sm font-semibold text-slate-700">
                        Sei Siak
                      </p>

                    </div>

                  </div>


                  <div className="flex items-start gap-3">

                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">

                      <ShieldCheck
                        size={17}
                        className="text-green-600"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        Pengelolaan
                      </p>

                      <p className="text-sm font-semibold text-slate-700">
                        Profesional
                      </p>

                    </div>

                  </div>


                  <div className="flex items-start gap-3">

                    <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0">

                      <Users
                        size={17}
                        className="text-yellow-600"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        Fokus
                      </p>

                      <p className="text-sm font-semibold text-slate-700">
                        Pemberdayaan
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* KELOLA PRODUK */}
          {/* ================================================= */}

          <div className="mb-8">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Manajemen Produk
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Kelola Produk
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Pilih kategori produk yang ingin dikelola.
                </p>

              </div>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {categories.map((category) => (

                <button
                  key={category.title}
                  onClick={() => navigate(category.path)}
                  className={`
                    text-left
                    ${category.bg}
                    border
                    ${category.border}
                    rounded-2xl
                    p-6
                    hover:-translate-y-1
                    hover:shadow-lg
                    transition-all
                    group
                  `}
                >

                  <div className="flex items-start justify-between">

                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                      {category.icon}
                    </div>


                    <div className="bg-white rounded-full px-3 py-1.5 shadow-sm">

                      <span className="text-xs font-bold text-slate-600">
                        {category.count} produk
                      </span>

                    </div>

                  </div>


                  <h3 className="text-lg font-bold text-slate-900 mt-5">
                    {category.title}
                  </h3>


                  <p className="text-sm text-slate-500 leading-relaxed mt-2">
                    {category.description}
                  </p>


                  <div className="flex items-center gap-2 text-blue-700 text-sm font-bold mt-5">

                    Kelola Produk

                    <ArrowRight
                      size={16}
                      className="
                        group-hover:translate-x-1
                        transition-transform
                      "
                    />

                  </div>

                </button>

              ))}

            </div>

          </div>


          {/* ================================================= */}
          {/* FOOTER INFORMATION */}
          {/* ================================================= */}

          <div className="
            relative
            overflow-hidden
            rounded-2xl
            bg-gradient-to-r
            from-blue-800
            to-blue-600
            p-6
            sm:p-7
            text-white
          ">

            {/* DECORATION */}

            <div className="
              absolute
              -right-10
              -top-16
              w-48
              h-48
              rounded-full
              bg-white/10
            " />

            <div className="
              absolute
              -right-5
              -bottom-20
              w-40
              h-40
              rounded-full
              bg-green-400/10
            " />


            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">

              <div>

                <div className="flex items-center gap-2 mb-2">

                  <Leaf size={17} />

                  <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                    Juragan Kambing Sei Siak
                  </p>

                </div>


                <h3 className="text-xl font-bold">
                  Bersama Pertamina Patra Niaga
                </h3>


                <p className="text-sm text-white/75 mt-2 max-w-xl leading-relaxed">

                  Mendukung pengembangan usaha dan pemberdayaan
                  masyarakat melalui pengelolaan produk peternakan
                  yang terintegrasi.

                </p>

              </div>


              <button
                onClick={() => navigate("/")}
                className="
                  shrink-0
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  bg-white
                  text-blue-700
                  px-5
                  py-3
                  rounded-xl
                  text-sm
                  font-bold
                  hover:bg-slate-100
                  transition-colors
                "
              >

                Lihat Website

                <ArrowRight size={16} />

              </button>

            </div>

          </div>


          {/* COPYRIGHT */}

          <div className="text-center mt-7">

            <p className="text-xs text-slate-400">

              © {new Date().getFullYear()} PT Pertamina Patra Niaga
              · Fuel Terminal Sei Siak

            </p>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}