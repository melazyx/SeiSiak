import {
  LayoutDashboard,
  Package,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  UserCircle,
  LineChart,
  PawPrint,
  Warehouse,
  History,
  Camera,
  Images,
} from "lucide-react";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import pertaminaLogo from "../assets/pertamina-logo.png";


export default function AdminLayout({ children }) {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);


  function handleLogout() {

    const confirmLogout = window.confirm(
      "Apakah kamu yakin ingin keluar dari halaman admin?"
    );

    if (!confirmLogout) return;

    logout();

    navigate("/login");

  }

  const menuTernak = [
    {
      label: "Ternak Kambing",
      path: "/admin/ternak/kambing",
      icon: "🐐",
    },
    {
      label: "Ternak Ayam",
      path: "/admin/ternak/ayam",
      icon: "🐔",
    },
  ];

  const menuProduk = [
    {
      label: "Produk Kambing",
      path: "/admin/produk/kambing",
      icon: "🐐",
    },

    {
      label: "Produk Ayam",
      path: "/admin/produk/ayam",
      icon: "🐔",
    },

    {
      label: "Produk Maggot",
      path: "/admin/produk/maggot",
      icon: "🪱",
    },
  ];


  return (

    <div className="min-h-screen bg-slate-50">


      {/* ================================================= */}
      {/* MOBILE OVERLAY */}
      {/* ================================================= */}

      {sidebarOpen && (

        <div
          className="
            fixed
            inset-0
            bg-black/40
            z-40
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />

      )}


      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside
        className={`
          fixed
          z-50
          top-0
          left-0
          h-screen
          w-72
          bg-[#062A55]
          text-white
          flex
          flex-col
          transition-transform
          duration-300

          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
        `}
      >


        {/* ================================================= */}
        {/* BRAND */}
        {/* ================================================= */}

        <div className="px-6 py-6 border-b border-white/10">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2">

              <img
                src={pertaminaLogo}
                alt="Pertamina Patra Niaga"
                className="w-full h-full object-contain"
              />

            </div>


            <div>

              <p className="text-sm font-bold tracking-wide">
                PERTAMINA
              </p>

              <p className="text-sm font-bold text-red-400">
                PATRA NIAGA
              </p>

            </div>


            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto lg:hidden text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>

          </div>


          <div className="mt-5">

            <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">
              Fuel Terminal
            </p>

            <p className="text-lg font-bold mt-1">
              Sei Siak
            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* NAVIGATION */}
        {/* ================================================= */}

        <div className="flex-1 overflow-y-auto px-4 py-6">


          {/* ADMIN PANEL */}

          <p className="px-3 text-[11px] uppercase tracking-wider text-blue-200 font-bold mb-3">
            Admin Panel
          </p>


          <NavLink
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-sm
              font-semibold
              transition-all

              ${isActive
                ? "bg-white text-[#062A55] shadow-sm"
                : "text-white/80 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            <LayoutDashboard size={19} />

            <span>
              Dashboard
            </span>

          </NavLink>


          {/* PRODUK */}

          <div className="mt-7">

            <p className="px-3 text-[11px] uppercase tracking-wider text-blue-200 font-bold mb-3">
              Manajemen Produk
            </p>


            <div className="space-y-1">

              {menuProduk.map((item) => (

                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all

                    ${isActive
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >

                  <span className="text-lg">
                    {item.icon}
                  </span>

                  <span className="flex-1">
                    {item.label}
                  </span>

                  <ChevronRight
                    size={15}
                    className="opacity-50"
                  />

                </NavLink>

              ))}

            </div>

          </div>

          {/* TERNAK & KESEHATAN */}

          <div className="mt-7">

            <p className="px-3 text-[11px] uppercase tracking-wider text-blue-200 font-bold mb-3">
              Ternak & Kesehatan
            </p>

            <div className="space-y-1">

              {menuTernak.map((item) => (

                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all

                    ${isActive
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >

                  <span className="text-lg">
                    {item.icon}
                  </span>

                  <span className="flex-1">
                    {item.label}
                  </span>

                  <ChevronRight
                    size={15}
                    className="opacity-50"
                  />

                </NavLink>

              ))}

            </div>

          </div>

          {/* GUDANG PAKAN */}

          <div className="mt-7">

            <p className="px-3 text-[11px] uppercase tracking-wider text-blue-200 font-bold mb-3">
              Gudang
            </p>

            <NavLink
              to="/admin/gudang-pakan"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-sm
                font-semibold
                transition-all

                ${isActive
                  ? "bg-white text-[#062A55] shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
                }
              `}
            >

              <Warehouse size={19} />

              <span>
                Gudang Pakan
              </span>

            </NavLink>

          </div>

          {/* RIWAYAT AKTIVITAS */}

          <div className="mt-7">

            <p className="px-3 text-[11px] uppercase tracking-wider text-blue-200 font-bold mb-3">
              Audit
            </p>

            <NavLink
              to="/admin/riwayat-aktivitas"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-sm
                font-semibold
                transition-all

                ${
                  isActive
                    ? "bg-white text-[#062A55] shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }
              `}
            >

              <History size={19} />

              <span>
                Riwayat Aktivitas
              </span>

            </NavLink>

          </div>

          {/* PRODUKSI & PENJUALAN */}

          <div className="mt-7">

            <p className="px-3 text-[11px] uppercase tracking-wider text-blue-200 font-bold mb-3">
              Laporan
            </p>

            <NavLink
              to="/admin/produksi-penjualan"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-sm
                font-semibold
                transition-all

                ${isActive
                  ? "bg-white text-[#062A55] shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
                }
              `}
            >

              <LineChart size={19} />

              <span>
                Produksi & Penjualan
              </span>

            </NavLink>

          </div>

          {/* KONTEN WEBSITE */}

          <div className="mt-7">

            <p className="px-3 text-[11px] uppercase tracking-wider text-blue-200 font-bold mb-3">
              Konten Website
            </p>

            <div className="space-y-1">

              <NavLink
                to="/admin/kegiatan"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  transition-all

                  ${
                    isActive
                      ? "bg-white text-[#062A55] shadow-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }
                `}
              >

                <Camera size={19} />

                <span>
                  Kelola Kegiatan
                </span>

              </NavLink>

              <NavLink
                to="/admin/galeri"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  transition-all

                  ${
                    isActive
                      ? "bg-white text-[#062A55] shadow-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }
                `}
              >

                <Images size={19} />

                <span>
                  Kelola Galeri
                </span>

              </NavLink>

            </div>

          </div>

          {/* WEBSITE */}

          <div className="mt-7">

            <p className="px-3 text-[11px] uppercase tracking-wider text-blue-200 font-bold mb-3">
              Website
            </p>


            <button
              onClick={() => navigate("/")}
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-sm
                font-medium
                text-white/80
                hover:bg-white/10
                hover:text-white
                transition-colors
              "
            >

              <ExternalLink size={19} />

              <span>
                Lihat Website
              </span>

            </button>

          </div>

        </div>


        {/* ================================================= */}
        {/* USER */}
        {/* ================================================= */}

        <div className="border-t border-white/10 p-4">


          <div className="
            bg-white/5
            rounded-xl
            p-4
            mb-3
          ">

            <div className="flex items-center gap-3">

              <div className="
                w-10
                h-10
                rounded-full
                bg-white
                flex
                items-center
                justify-center
              ">

                <UserCircle
                  size={25}
                  className="text-[#062A55]"
                />

              </div>


              <div className="min-w-0">

                <p className="text-sm font-bold truncate">

                  {user?.nama || "Admin"}

                </p>

                <p className="text-xs text-blue-200 truncate mt-0.5">

                  {user?.email || "admin@juragankambing.com"}

                </p>

              </div>

            </div>


            <div className="flex items-center gap-2 mt-3">

              <span className="w-2 h-2 rounded-full bg-green-400" />

              <span className="text-xs text-white/70">
                Admin aktif
              </span>

            </div>

          </div>


          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-3
              rounded-xl
              text-sm
              font-semibold
              text-red-300
              hover:bg-red-500/10
              hover:text-red-200
              transition-colors
            "
          >

            <LogOut size={18} />

            Keluar

          </button>


          <p className="text-[10px] text-center text-white/30 mt-3">
            PT Pertamina Patra Niaga
          </p>

        </div>


        {/* ================================================= */}
        {/* DECORATION */}
        {/* ================================================= */}

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500" />

      </aside>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="lg:ml-72 min-h-screen">


        {/* MOBILE HEADER */}

        <div className="
          lg:hidden
          sticky
          top-0
          z-30
          bg-white
          border-b
          border-slate-200
          px-5
          py-4
          flex
          items-center
          gap-4
        ">

          <button
            onClick={() => setSidebarOpen(true)}
            className="
              w-10
              h-10
              rounded-xl
              bg-slate-100
              flex
              items-center
              justify-center
            "
          >

            <Menu size={21} />

          </button>


          <div>

            <p className="text-sm font-bold text-slate-900">
              Admin Panel
            </p>

            <p className="text-[11px] text-slate-400">
              Fuel Terminal Sei Siak
            </p>

          </div>

        </div>


        {children}

      </main>

    </div>

  );
}