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
  Activity,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useProduk } from "../../context/ProdukContext";

import pertaminaLogo from "../../assets/pertamina-logo.png";
import fuelTerminalImage from "../../assets/fuel-terminal.jpeg";


export default function Dashboard() {
  const navigate = useNavigate();
  const { data } = useProduk();


  // =====================================================
  // HITUNG PRODUK
  // =====================================================

  const totalKambing =
    (data?.kambingSusuPupuk || []).length +
    (data?.kambingQurban || []).length;

  const totalAyam =
    (data?.ayamJual || []).length +
    (data?.ayamPupuk || []).length;

  const totalMaggot =
    (data?.maggotProduk || []).length;

  const totalProduk =
    totalKambing +
    totalAyam +
    totalMaggot;


  // =====================================================
  // TANGGAL
  // =====================================================

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  // =====================================================
  // DATA KARTU STATISTIK
  // =====================================================

  const statistics = [
    {
      title: "Total Produk",
      value: totalProduk,
      description: "Semua produk terdaftar",
      icon: Package,
      bg: "bg-[#E8F5EF]",
      iconColor: "text-[#087F5B]",
    },
    {
      title: "Produk Kambing",
      value: totalKambing,
      description: "Susu, pupuk & qurban",
      icon: ShoppingBag,
      bg: "bg-[#EAF4EE]",
      iconColor: "text-[#16835F]",
    },
    {
      title: "Produk Ayam",
      value: totalAyam,
      description: "Ayam & produk pupuk",
      icon: Egg,
      bg: "bg-[#FFF5DF]",
      iconColor: "text-[#C98500]",
    },
    {
      title: "Produk Maggot",
      value: totalMaggot,
      description: "Maggot basah & kering",
      icon: Bug,
      bg: "bg-[#F1EAF8]",
      iconColor: "text-[#7952A5]",
    },
  ];


  // =====================================================
  // DATA PRODUK
  // =====================================================

  const productSummary = [
    {
      name: "Kambing",
      count: totalKambing,
      icon: "🐐",
      color: "#087F5B",
      light: "#E8F5EF",
      path: "/admin/produk/kambing",
    },
    {
      name: "Ayam",
      count: totalAyam,
      icon: "🐔",
      color: "#C98500",
      light: "#FFF5DF",
      path: "/admin/produk/ayam",
    },
    {
      name: "Maggot",
      count: totalMaggot,
      icon: "🪱",
      color: "#7952A5",
      light: "#F1EAF8",
      path: "/admin/produk/maggot",
    },
  ];


  // =====================================================
  // PERSENTASE BAR
  // =====================================================

  const maxProduct = Math.max(
    totalKambing,
    totalAyam,
    totalMaggot,
    1
  );


  return (
    <div className="min-h-screen bg-[#F5F8FC]">

      <div className="max-w-[1500px] mx-auto p-4 sm:p-6 lg:p-7">


        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">

          <div>

            <div className="flex items-center gap-2 mb-2">

              <span className="w-2 h-2 rounded-full bg-[#087F5B]" />

              <p className="text-[10px] sm:text-[11px] font-semibold text-[#087F5B] uppercase tracking-wider">
                Dashboard Admin
              </p>

            </div>


            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2933] font-heading tracking-tight">

              Selamat datang,{" "}

              <span className="text-[#087F5B]">
                Admin
              </span>

              {" "}👋

            </h1>


            <p className="text-sm text-[#68737D] mt-2">
              Berikut ringkasan aktivitas peternakan hari ini.
            </p>

          </div>


          {/* TANGGAL */}

          <div className="lg:text-right">

            <p className="text-[10px] text-[#98A1A9]">
              Hari ini
            </p>

            <p className="text-xs sm:text-sm font-semibold text-[#45515B] mt-1">
              {today}
            </p>

          </div>

        </div>



        {/* =================================================
            STATISTIK
        ================================================== */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-5">

          {statistics.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  bg-white
                  border border-[#E4E7E5]
                  rounded-xl
                  p-4
                  sm:p-5
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p className="text-[11px] sm:text-xs text-[#68737D]">
                      {item.title}
                    </p>

                    <p className="text-2xl sm:text-3xl font-bold text-[#1F2933] mt-2">
                      {item.value}
                    </p>

                    <p className="text-[9px] sm:text-[10px] text-[#98A1A9] mt-1">
                      {item.description}
                    </p>

                  </div>


                  <div
                    className={`
                      w-10
                      h-10
                      sm:w-11
                      sm:h-11
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      shrink-0
                      ${item.bg}
                    `}
                  >

                    <Icon
                      size={19}
                      className={item.iconColor}
                    />

                  </div>

                </div>

              </div>
            );

          })}

        </div>



        {/* =================================================
            MAIN CONTENT
        ================================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">


          {/* =================================================
              RINGKASAN PRODUK
          ================================================== */}

          <div className="xl:col-span-2 bg-white border border-[#E4E7E5] rounded-xl shadow-sm p-5">

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">
                  Statistik
                </p>

                <h2 className="text-base sm:text-lg font-bold text-[#1F2933] mt-1">
                  Produk Peternakan
                </h2>

              </div>


              <div className="w-9 h-9 rounded-lg bg-[#E8F5EF] flex items-center justify-center">

                <TrendingUp
                  size={17}
                  className="text-[#087F5B]"
                />

              </div>

            </div>


            {/* BARS */}

            <div className="space-y-5">

              {productSummary.map((item) => {

                const percentage =
                  Math.max(
                    (item.count / maxProduct) * 100,
                    item.count > 0 ? 8 : 0
                  );

                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className="w-full text-left group"
                  >

                    <div className="flex items-center justify-between mb-2">

                      <div className="flex items-center gap-3">

                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                          style={{
                            backgroundColor: item.light,
                          }}
                        >
                          {item.icon}
                        </div>


                        <div>

                          <p className="text-xs font-semibold text-[#34404A]">
                            Produk {item.name}
                          </p>

                          <p className="text-[10px] text-[#98A1A9]">
                            {item.count} produk
                          </p>

                        </div>

                      </div>


                      <div className="flex items-center gap-2">

                        <span
                          className="text-xs font-bold"
                          style={{
                            color: item.color,
                          }}
                        >
                          {item.count}
                        </span>

                        <ChevronRight
                          size={14}
                          className="text-[#A5ADB4] group-hover:translate-x-1 transition"
                        />

                      </div>

                    </div>


                    <div className="w-full h-2 bg-[#F0F2F1] rounded-full overflow-hidden">

                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />

                    </div>

                  </button>
                );

              })}

            </div>


            {/* TOTAL */}

            <div className="mt-6 pt-4 border-t border-[#EEF0EF] flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Activity
                  size={15}
                  className="text-[#087F5B]"
                />

                <span className="text-[11px] text-[#68737D]">
                  Total produk terdaftar
                </span>

              </div>

              <span className="text-sm font-bold text-[#1F2933]">
                {totalProduk}
              </span>

            </div>

          </div>



          {/* =================================================
              AKTIVITAS
          ================================================== */}

          <div className="bg-white border border-[#E4E7E5] rounded-xl shadow-sm p-5">

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">
                  Aktivitas
                </p>

                <h2 className="text-base sm:text-lg font-bold text-[#1F2933] mt-1">
                  Ringkasan Sistem
                </h2>

              </div>


              <Activity
                size={18}
                className="text-[#087F5B]"
              />

            </div>


            <div className="space-y-4">


              {/* TOTAL PRODUK */}

              <div className="flex gap-3">

                <div className="w-9 h-9 rounded-lg bg-[#E8F5EF] flex items-center justify-center shrink-0">

                  <Package
                    size={16}
                    className="text-[#087F5B]"
                  />

                </div>


                <div>

                  <p className="text-xs font-semibold text-[#34404A]">
                    Produk terdaftar
                  </p>

                  <p className="text-[10px] text-[#98A1A9] mt-1">
                    {totalProduk} produk tersedia di sistem
                  </p>

                </div>

              </div>



              {/* KAMBING */}

              <div className="flex gap-3">

                <div className="w-9 h-9 rounded-lg bg-[#EAF4EE] flex items-center justify-center shrink-0">

                  <ShoppingBag
                    size={16}
                    className="text-[#16835F]"
                  />

                </div>


                <div>

                  <p className="text-xs font-semibold text-[#34404A]">
                    Produk kambing
                  </p>

                  <p className="text-[10px] text-[#98A1A9] mt-1">
                    {totalKambing} produk kambing terdaftar
                  </p>

                </div>

              </div>



              {/* AYAM */}

              <div className="flex gap-3">

                <div className="w-9 h-9 rounded-lg bg-[#FFF5DF] flex items-center justify-center shrink-0">

                  <Egg
                    size={16}
                    className="text-[#C98500]"
                  />

                </div>


                <div>

                  <p className="text-xs font-semibold text-[#34404A]">
                    Produk ayam
                  </p>

                  <p className="text-[10px] text-[#98A1A9] mt-1">
                    {totalAyam} produk ayam terdaftar
                  </p>

                </div>

              </div>



              {/* MAGGOT */}

              <div className="flex gap-3">

                <div className="w-9 h-9 rounded-lg bg-[#F1EAF8] flex items-center justify-center shrink-0">

                  <Bug
                    size={16}
                    className="text-[#7952A5]"
                  />

                </div>


                <div>

                  <p className="text-xs font-semibold text-[#34404A]">
                    Produk maggot
                  </p>

                  <p className="text-[10px] text-[#98A1A9] mt-1">
                    {totalMaggot} produk maggot terdaftar
                  </p>

                </div>

              </div>

            </div>


            {/* STATUS */}

            <div className="mt-6 p-3 rounded-lg bg-[#F5FAF7] border border-[#DDEEE5]">

              <div className="flex items-center gap-2">

                <span className="w-2 h-2 rounded-full bg-[#188A5B]" />

                <span className="text-[10px] font-semibold text-[#188A5B]">
                  Sistem aktif
                </span>

              </div>

              <p className="text-[9px] text-[#8A949E] mt-1">
                Data produk berhasil dimuat dari sistem.
              </p>

            </div>

          </div>

        </div>



        {/* =================================================
            QUICK ACCESS
        ================================================== */}

        <div className="bg-white border border-[#E4E7E5] rounded-xl shadow-sm p-5 mb-5">

          <div className="flex items-center justify-between mb-4">

            <div>

              <p className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wider">
                Akses Cepat
              </p>

              <h2 className="text-base font-bold text-[#1F2933] mt-1">
                Kelola Produk
              </h2>

            </div>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">


            {/* KAMBING */}

            <button
              onClick={() => navigate("/admin/produk/kambing")}
              className="
                group
                flex
                items-center
                justify-between
                gap-3
                p-4
                rounded-xl
                border border-[#DCECE3]
                bg-[#F7FBF9]
                hover:border-[#087F5B]
                hover:shadow-sm
                transition
              "
            >

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-[#E8F5EF] flex items-center justify-center text-xl">
                  🐐
                </div>

                <div className="text-left">

                  <p className="text-xs font-bold text-[#34404A]">
                    Produk Kambing
                  </p>

                  <p className="text-[10px] text-[#8A949E] mt-1">
                    {totalKambing} produk
                  </p>

                </div>

              </div>


              <ArrowRight
                size={15}
                className="text-[#087F5B] group-hover:translate-x-1 transition"
              />

            </button>



            {/* AYAM */}

            <button
              onClick={() => navigate("/admin/produk/ayam")}
              className="
                group
                flex
                items-center
                justify-between
                gap-3
                p-4
                rounded-xl
                border border-[#F0E4C7]
                bg-[#FFFCF5]
                hover:border-[#C98500]
                hover:shadow-sm
                transition
              "
            >

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-[#FFF5DF] flex items-center justify-center text-xl">
                  🐔
                </div>

                <div className="text-left">

                  <p className="text-xs font-bold text-[#34404A]">
                    Produk Ayam
                  </p>

                  <p className="text-[10px] text-[#8A949E] mt-1">
                    {totalAyam} produk
                  </p>

                </div>

              </div>


              <ArrowRight
                size={15}
                className="text-[#C98500] group-hover:translate-x-1 transition"
              />

            </button>



            {/* MAGGOT */}

            <button
              onClick={() => navigate("/admin/produk/maggot")}
              className="
                group
                flex
                items-center
                justify-between
                gap-3
                p-4
                rounded-xl
                border border-[#E5DCEF]
                bg-[#FBF8FD]
                hover:border-[#7952A5]
                hover:shadow-sm
                transition
              "
            >

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-[#F1EAF8] flex items-center justify-center text-xl">
                  🪱
                </div>

                <div className="text-left">

                  <p className="text-xs font-bold text-[#34404A]">
                    Produk Maggot
                  </p>

                  <p className="text-[10px] text-[#8A949E] mt-1">
                    {totalMaggot} produk
                  </p>

                </div>

              </div>


              <ArrowRight
                size={15}
                className="text-[#7952A5] group-hover:translate-x-1 transition"
              />

            </button>

          </div>

        </div>



        {/* =================================================
            FUEL TERMINAL
        ================================================== */}

        <div className="bg-white border border-[#E4E7E5] rounded-xl overflow-hidden shadow-sm mb-5">

          <div className="grid grid-cols-1 lg:grid-cols-5">


            {/* IMAGE */}

            <div className="lg:col-span-2 h-56 lg:h-full min-h-[260px]">

              <img
                src={fuelTerminalImage}
                alt="Fuel Terminal Sei Siak"
                className="w-full h-full object-cover"
              />

            </div>



            {/* CONTENT */}

            <div className="lg:col-span-3 p-6 sm:p-7">

              <div className="flex items-center gap-3 mb-4">

                <img
                  src={pertaminaLogo}
                  alt="Pertamina Patra Niaga"
                  className="h-8 w-auto object-contain"
                />

                <div className="h-6 w-px bg-[#E4E7E5]" />

                <span className="text-[10px] font-bold text-[#087F5B] uppercase tracking-wide">
                  Fuel Terminal Sei Siak
                </span>

              </div>


              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2933]">
                Juragan Kambing Sei Siak
              </h2>


              <p className="text-sm text-[#68737D] leading-relaxed mt-3 max-w-2xl">

                Website pengelolaan dan informasi produk usaha
                peternakan Juragan Kambing Sei Siak sebagai bagian
                dari pengembangan usaha dan pemberdayaan masyarakat
                di lingkungan Fuel Terminal Sei Siak.

              </p>


              {/* INFO */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">


                {/* LOKASI */}

                <div className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-lg bg-[#E8F5EF] flex items-center justify-center shrink-0">

                    <MapPin
                      size={16}
                      className="text-[#087F5B]"
                    />

                  </div>


                  <div>

                    <p className="text-[10px] text-[#98A1A9]">
                      Lokasi
                    </p>

                    <p className="text-xs font-semibold text-[#34404A] mt-1">
                      Sei Siak
                    </p>

                  </div>

                </div>



                {/* PENGELOLAAN */}

                <div className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-lg bg-[#EAF4EE] flex items-center justify-center shrink-0">

                    <ShieldCheck
                      size={16}
                      className="text-[#16835F]"
                    />

                  </div>


                  <div>

                    <p className="text-[10px] text-[#98A1A9]">
                      Pengelolaan
                    </p>

                    <p className="text-xs font-semibold text-[#34404A] mt-1">
                      Profesional
                    </p>

                  </div>

                </div>



                {/* FOKUS */}

                <div className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-lg bg-[#FFF5DF] flex items-center justify-center shrink-0">

                    <Users
                      size={16}
                      className="text-[#C98500]"
                    />

                  </div>


                  <div>

                    <p className="text-[10px] text-[#98A1A9]">
                      Fokus
                    </p>

                    <p className="text-xs font-semibold text-[#34404A] mt-1">
                      Pemberdayaan
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>



        {/* =================================================
            FOOTER BANNER
        ================================================== */}

        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0F4229] to-[#1A5D3A] p-6 sm:p-7 text-white">

          <div className="absolute -right-10 -top-16 w-48 h-48 rounded-full bg-white/10" />

          <div className="absolute -right-5 -bottom-20 w-40 h-40 rounded-full bg-[#8DC63F]/20" />


          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div>

              <div className="flex items-center gap-2 mb-2">

                <Leaf size={16} />

                <p className="text-[10px] font-bold uppercase tracking-wider text-white/75">
                  Juragan Kambing Sei Siak
                </p>

              </div>


              <h3 className="text-lg sm:text-xl font-bold">
                Bersama Membangun Peternakan Berkelanjutan
              </h3>


              <p className="text-xs sm:text-sm text-white/70 mt-2 max-w-xl">
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
                text-[#0F4229]
                px-5
                py-2.5
                rounded-lg
                text-xs
                font-bold
                hover:bg-slate-100
                transition
              "
            >

              Lihat Website

              <ArrowRight size={15} />

            </button>

          </div>

        </div>



        {/* =================================================
            COPYRIGHT
        ================================================== */}

        <div className="text-center mt-5 pb-2">

          <p className="text-[10px] text-[#98A1A9]">
            © {new Date().getFullYear()} PT Pertamina Patra Niaga · Fuel Terminal Sei Siak
          </p>

        </div>

      </div>

    </div>
  );
}