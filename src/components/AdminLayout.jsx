import {
  LayoutDashboard,
  Package,
  PawPrint,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  UserCircle,
  LineChart,
  Warehouse,
  History,
  Camera,
  FileText,
  Settings,
  Bell,
  Tags,
} from "lucide-react";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import pertaminaLogo from "../assets/pertamina-logo.png";


export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [produkOpen, setProdukOpen] = useState(true);
  const [kategoriOpen, setKategoriOpen] = useState(false);
  const [ternakOpen, setTernakOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();


  const handleLogout = () => {
    const yakin = window.confirm(
      "Apakah kamu yakin ingin keluar dari halaman admin?"
    );

    if (!yakin) return;

    logout();
    navigate("/login");
  };


  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });


  const closeMobile = () => {
    setMobileOpen(false);
  };


  return (
    <div className="min-h-screen bg-[#F5F8FC]">


      {/* =====================================================
          MOBILE HEADER
      ====================================================== */}

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-[#0F4229] flex items-center justify-between px-4 shadow-md">

        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition"
        >
          <Menu size={22} />
        </button>


        <div className="flex items-center gap-2">

          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img
              src={pertaminaLogo}
              alt="Pertamina"
              className="w-6 h-6 object-contain"
            />
          </div>

          <div className="text-white">

            <p className="text-[11px] font-bold leading-none">
              JURAGAN KAMBING
            </p>

            <p className="text-[8px] opacity-70 mt-1">
              SEI SIAK
            </p>

          </div>

        </div>


        <div className="w-9" />

      </div>



      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {mobileOpen && (
        <div
          onClick={closeMobile}
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
        />
      )}



      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed
          z-50
          top-0
          bottom-0
          left-0
          w-[230px]
          bg-[#0F4229]
          text-white
          shadow-xl
          transition-transform
          duration-300

          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >


        {/* =================================================
            CLOSE MOBILE
        ================================================== */}

        <button
          onClick={closeMobile}
          className="lg:hidden absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>



        {/* =================================================
            BRAND
        ================================================== */}

        <div className="px-5 pt-5 pb-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">

              <img
                src={pertaminaLogo}
                alt="Pertamina"
                className="w-8 h-8 object-contain"
              />

            </div>


            <div>

              <h1 className="font-bold text-[11px] leading-tight">
                JURAGAN KAMBING
              </h1>

              <p className="text-[8px] text-white/55 mt-1">
                SEI SIAK
              </p>

            </div>

          </div>

        </div>



        {/* =================================================
            USER PROFILE
        ================================================== */}

        <div className="mx-3 mb-4">

          <div className="p-3 rounded-xl bg-[#0A3824] border border-white/5">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">

                <UserCircle
                  size={23}
                  className="text-white"
                />

              </div>


              <div className="min-w-0">

                <p className="text-[11px] font-semibold truncate">
                  {user?.nama || "Admin"}
                </p>

                <p className="text-[8px] text-white/50 truncate">
                  Super Admin
                </p>

              </div>

            </div>

          </div>

        </div>



        {/* =================================================
            NAVIGATION
        ================================================== */}

        <nav className="px-3 pb-24 overflow-y-auto h-[calc(100vh-165px)] scrollbar-thin">


          {/* =================================================
              DASHBOARD
          ================================================== */}

          <NavLink
            to="/admin/dashboard"
            onClick={closeMobile}
            className={({ isActive }) => `
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              mb-1
              text-[11px]
              font-medium
              transition-all

              ${
                isActive
                  ? "bg-[#087F5B] text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <LayoutDashboard size={16} />

            <span>
              Dashboard
            </span>

          </NavLink>



          {/* =================================================
              PRODUK
          ================================================== */}

          <button
            onClick={() => setProdukOpen(!produkOpen)}
            className={`
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-[11px]
              font-medium
              transition
              ${
                produkOpen
                  ? "text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <Package size={16} />

            <span className="flex-1 text-left">
              Produk
            </span>

            {produkOpen ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}

          </button>


          {produkOpen && (
            <div className="ml-4 pl-3 border-l border-white/10 mb-1 space-y-0.5">

              <NavLink
                to="/admin/produk/kambing"
                onClick={closeMobile}
                className={({ isActive }) => `
                  block
                  px-3
                  py-2
                  rounded-md
                  text-[10px]
                  transition
                  ${
                    isActive
                      ? "bg-[#087F5B] text-white font-semibold"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Produk Kambing
              </NavLink>


              <NavLink
                to="/admin/produk/ayam"
                onClick={closeMobile}
                className={({ isActive }) => `
                  block
                  px-3
                  py-2
                  rounded-md
                  text-[10px]
                  transition
                  ${
                    isActive
                      ? "bg-[#087F5B] text-white font-semibold"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Produk Ayam
              </NavLink>


              <NavLink
                to="/admin/produk/maggot"
                onClick={closeMobile}
                className={({ isActive }) => `
                  block
                  px-3
                  py-2
                  rounded-md
                  text-[10px]
                  transition
                  ${
                    isActive
                      ? "bg-[#087F5B] text-white font-semibold"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Produk Maggot
              </NavLink>

            </div>
          )}



          {/* =================================================
              KATEGORI
          ================================================== */}

          <button
            onClick={() => setKategoriOpen(!kategoriOpen)}
            className={`
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-[11px]
              font-medium
              transition
              ${
                kategoriOpen
                  ? "text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <Tags size={16} />

            <span className="flex-1 text-left">
              Kategori
            </span>

            {kategoriOpen ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}

          </button>


          {kategoriOpen && (
            <div className="ml-4 pl-3 border-l border-white/10 mb-1 space-y-0.5">

              <NavLink
                to="/admin/kategori/kambing"
                onClick={closeMobile}
                className={({ isActive }) => `
                  block
                  px-3
                  py-2
                  rounded-md
                  text-[10px]
                  transition
                  ${
                    isActive
                      ? "bg-[#087F5B] text-white font-semibold"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Kategori Kambing
              </NavLink>


              <NavLink
                to="/admin/kategori/ayam"
                onClick={closeMobile}
                className={({ isActive }) => `
                  block
                  px-3
                  py-2
                  rounded-md
                  text-[10px]
                  transition
                  ${
                    isActive
                      ? "bg-[#087F5B] text-white font-semibold"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Kategori Ayam
              </NavLink>


              <NavLink
                to="/admin/kategori/maggot"
                onClick={closeMobile}
                className={({ isActive }) => `
                  block
                  px-3
                  py-2
                  rounded-md
                  text-[10px]
                  transition
                  ${
                    isActive
                      ? "bg-[#087F5B] text-white font-semibold"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Kategori Maggot
              </NavLink>

            </div>
          )}



          {/* =================================================
              TERNAK
          ================================================== */}

          <button
            onClick={() => setTernakOpen(!ternakOpen)}
            className={`
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-[11px]
              font-medium
              transition
              ${
                ternakOpen
                  ? "text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <PawPrint size={16} />

            <span className="flex-1 text-left">
              Ternak
            </span>

            {ternakOpen ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}

          </button>


          {ternakOpen && (
            <div className="ml-4 pl-3 border-l border-white/10 mb-1 space-y-0.5">

              <NavLink
                to="/admin/ternak/kambing"
                onClick={closeMobile}
                className={({ isActive }) => `
                  block
                  px-3
                  py-2
                  rounded-md
                  text-[10px]
                  transition
                  ${
                    isActive
                      ? "bg-[#087F5B] text-white font-semibold"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Ternak Kambing
              </NavLink>


              <NavLink
                to="/admin/ternak/ayam"
                onClick={closeMobile}
                className={({ isActive }) => `
                  block
                  px-3
                  py-2
                  rounded-md
                  text-[10px]
                  transition
                  ${
                    isActive
                      ? "bg-[#087F5B] text-white font-semibold"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Ternak Ayam
              </NavLink>


              <NavLink
                to="/admin/ternak/maggot"
                onClick={closeMobile}
                className={({ isActive }) => `
                  block
                  px-3
                  py-2
                  rounded-md
                  text-[10px]
                  transition
                  ${
                    isActive
                      ? "bg-[#087F5B] text-white font-semibold"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                Ternak Maggot
              </NavLink>

            </div>
          )}



          {/* =================================================
              PRODUKSI & PENJUALAN
          ================================================== */}

          <NavLink
            to="/admin/produksi-penjualan"
            onClick={closeMobile}
            className={({ isActive }) => `
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-[11px]
              font-medium
              transition
              ${
                isActive
                  ? "bg-[#087F5B] text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <LineChart size={16} />

            <span>
              Produksi & Penjualan
            </span>

          </NavLink>



          {/* =================================================
              GUDANG PAKAN
          ================================================== */}

          <NavLink
            to="/admin/gudang-pakan"
            onClick={closeMobile}
            className={({ isActive }) => `
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-[11px]
              font-medium
              transition
              ${
                isActive
                  ? "bg-[#087F5B] text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <Warehouse size={16} />

            <span>
              Gudang Pakan
            </span>

          </NavLink>



          {/* =================================================
              KEGIATAN
          ================================================== */}

          <NavLink
            to="/admin/kegiatan"
            onClick={closeMobile}
            className={({ isActive }) => `
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-[11px]
              font-medium
              transition
              ${
                isActive
                  ? "bg-[#087F5B] text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <Camera size={16} />

            <span>
              Kegiatan
            </span>

          </NavLink>



          {/* =================================================
              GALERI
          ================================================== */}

          <NavLink
            to="/admin/galeri"
            onClick={closeMobile}
            className={({ isActive }) => `
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-[11px]
              font-medium
              transition
              ${
                isActive
                  ? "bg-[#087F5B] text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <Camera size={16} />

            <span>
              Galeri
            </span>

          </NavLink>



          {/* =================================================
              LAPORAN
          ================================================== */}

          <NavLink
            to="/admin/produksi-penjualan"
            onClick={closeMobile}
            className={({ isActive }) => `
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-[11px]
              font-medium
              transition
              ${
                isActive
                  ? "bg-[#087F5B] text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <FileText size={16} />

            <span>
              Laporan
            </span>

          </NavLink>



          {/* =================================================
              RIWAYAT AKTIVITAS
          ================================================== */}

          <NavLink
            to="/admin/riwayat-aktivitas"
            onClick={closeMobile}
            className={({ isActive }) => `
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-[11px]
              font-medium
              transition
              ${
                isActive
                  ? "bg-[#087F5B] text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <History size={16} />

            <span>
              Riwayat Aktivitas
            </span>

          </NavLink>

        </nav>



        {/* =================================================
            BOTTOM MENU
        ================================================== */}

        <div className="absolute left-3 right-3 bottom-3 bg-[#0F4229] pt-2">

          <button
            onClick={() => navigate("/admin/pengaturan")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[11px] text-white/70 hover:bg-white/10 hover:text-white transition"
          >

            <Settings size={16} />

            <span>
              Pengaturan
            </span>

          </button>


          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[11px] text-white/70 hover:bg-red-500/15 hover:text-red-300 transition"
          >

            <LogOut size={16} />

            <span>
              Keluar
            </span>

          </button>

        </div>

      </aside>



      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <div className="lg:ml-[230px] min-h-screen">


        {/* =================================================
            TOPBAR
        ================================================== */}

        <header className="hidden lg:flex h-[58px] bg-white border-b border-[#E5E9E7] items-center justify-end px-7">

          <div className="flex items-center gap-5">


            {/* DATE */}

            <div className="text-right">

              <p className="text-[9px] text-[#8A949E]">
                Hari ini
              </p>

              <p className="text-[10px] font-semibold text-[#45515B]">
                {today}
              </p>

            </div>



            {/* NOTIFICATION */}

            <button
              className="relative w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
            >

              <Bell
                size={16}
                className="text-[#5C6670]"
              />

              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#D71920] rounded-full" />

            </button>



            {/* USER */}

            <div className="flex items-center gap-2">

              <div className="w-8 h-8 rounded-full bg-[#E8F5EF] flex items-center justify-center">

                <UserCircle
                  size={22}
                  className="text-[#087F5B]"
                />

              </div>


              <div className="hidden xl:block">

                <p className="text-[10px] font-semibold text-[#27313A]">
                  {user?.nama || "Admin"}
                </p>

                <p className="text-[8px] text-[#8A949E]">
                  Super Admin
                </p>

              </div>

            </div>

          </div>

        </header>



        {/* =================================================
            CONTENT
        ================================================== */}

        <main className="pt-16 lg:pt-0 min-h-[calc(100vh-58px)]">

          {children}

        </main>


      </div>

    </div>
  );
}