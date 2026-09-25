import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Menu,
  X,
  MessageCircle,
  LayoutDashboard,
  PawPrint,
} from "lucide-react";

import pertaminaLogo from "../assets/pertamina-logo.png";
import { useAuth } from "../context/AuthContext";

const WA_NUMBER = "6281270958582";

const NAV_LINKS = [
  {
    to: "/",
    label: "Beranda",
    end: true,
  },
  {
    to: "/katalog",
    label: "Katalog",
  },
  {
    to: "/titip-ternak",
    label: "Titip Ternak",
  },
  {
    to: "/lacak-ternak",
    label: "Lacak Ternak",
  },
  {
    to: "/tentang",
    label: "Tentang Kami",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const whatsappLink =
    `https://wa.me/${WA_NUMBER}?text=` +
    encodeURIComponent(
      "Halo, saya ingin bertanya tentang Juragan Kambing Sei Siak."
    );

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-white border border-line rounded-2xl shadow-soft overflow-hidden">

          {/* =====================================================
              HEADER / BRAND
          ====================================================== */}
          <div
            className="
              min-h-[72px]
              px-5
              sm:px-6
              lg:px-7
              flex
              items-center
              justify-between
              gap-4
            "
          >
            {/* BRAND */}
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-3 shrink-0"
            >
              {/* LOGO */}
              <div
                className="
                  w-12
                  h-12
                  sm:w-13
                  sm:h-13
                  rounded-full
                  bg-primary
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <PawPrint
                  size={24}
                  strokeWidth={2.4}
                  className="text-white"
                />
              </div>

              {/* NAMA BRAND */}
              <div className="leading-none">
                <p
                  className="
                    text-[17px]
                    sm:text-[18px]
                    font-extrabold
                    tracking-tight
                    text-ink
                  "
                >
                  JURAGAN KAMBING
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    sm:text-[12px]
                    font-bold
                    tracking-[0.14em]
                    text-primary
                  "
                >
                  SEI SIAK
                </p>
              </div>

              {/* PERTAMINA DESKTOP BESAR */}
              <div
                className="
                  hidden
                  2xl:flex
                  items-center
                  gap-2
                  ml-3
                  pl-3
                  border-l
                  border-line
                "
              >
                <img
                  src={pertaminaLogo}
                  alt="Pertamina Patra Niaga"
                  className="h-6 w-auto"
                />

                <div className="leading-tight">
                  <p className="text-[8px] font-semibold text-muted">
                    UMKM Binaan
                  </p>

                  <p className="text-[8px] text-muted">
                    Fuel Terminal Sei Siak
                  </p>
                </div>
              </div>
            </Link>

            {/* =====================================================
                DESKTOP NAVIGATION
            ====================================================== */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 ml-auto">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `
                    relative
                    py-2
                    text-[11px]
                    xl:text-[12px]
                    font-semibold
                    whitespace-nowrap
                    transition-colors
                    ${
                      isActive
                        ? "text-primary"
                        : "text-ink hover:text-primary"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}

                      <span
                        className={`
                          absolute
                          left-0
                          right-0
                          -bottom-0.5
                          h-[2px]
                          rounded-full
                          bg-primary
                          transition-transform
                          origin-center
                          ${
                            isActive
                              ? "scale-x-100"
                              : "scale-x-0"
                          }
                        `}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* =====================================================
                DESKTOP ACTION
            ====================================================== */}
            <div className="hidden lg:flex items-center gap-2.5 ml-3">

              {/* ADMIN */}
              {user ? (
                <Link
                  to="/admin/dashboard"
                  className="
                    hidden
                    xl:flex
                    items-center
                    gap-1.5
                    px-3
                    py-2
                    rounded-full
                    border
                    border-line
                    text-muted
                    hover:text-primary
                    hover:border-primary
                    text-xs
                    font-semibold
                    transition-colors
                  "
                >
                  <LayoutDashboard size={14} />
                  Admin
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="
                    hidden
                    xl:flex
                    items-center
                    gap-1.5
                    px-3
                    py-2
                    rounded-full
                    border
                    border-line
                    text-muted
                    hover:text-primary
                    hover:border-primary
                    text-xs
                    font-semibold
                    transition-colors
                  "
                >
                  <LayoutDashboard size={14} />
                  Login Admin
                </Link>
              )}

              {/* WHATSAPP */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  bg-secondary
                  hover:bg-secondary-dark
                  text-white
                  text-xs
                  xl:text-sm
                  font-bold
                  px-4
                  xl:px-5
                  py-2.5
                  rounded-full
                  transition-all
                  hover:-translate-y-0.5
                  shadow-sm
                  whitespace-nowrap
                "
              >
                <MessageCircle size={15} />
                <span>Hubungi Kami</span>
              </a>
            </div>

            {/* =====================================================
                MOBILE BUTTON
            ====================================================== */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              className="
                lg:hidden
                w-12
                h-12
                rounded-2xl
                border
                border-line
                flex
                items-center
                justify-center
                text-ink
                hover:bg-cream
                transition-colors
                shrink-0
              "
            >
              {open ? (
                <X size={27} strokeWidth={2} />
              ) : (
                <Menu size={27} strokeWidth={2} />
              )}
            </button>
          </div>

          {/* =====================================================
              MOBILE MENU
          ====================================================== */}
          {open && (
            <div
              className="
                lg:hidden
                border-t
                border-line
                px-5
                pb-5
                bg-white
              "
            >
              {/* NAVIGATION */}
              <nav className="flex flex-col pt-4 gap-1">

                {NAV_LINKS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `
                      flex
                      items-center
                      px-6
                      py-4
                      rounded-2xl
                      text-[20px]
                      leading-none
                      font-semibold
                      transition-colors
                      ${
                        isActive
                          ? "bg-primary-tint text-primary"
                          : "text-ink hover:bg-cream"
                      }
                      `
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {/* =================================================
                  MOBILE ADMIN
              ================================================== */}
              {user ? (
                <Link
                  to="/admin/dashboard"
                  onClick={closeMenu}
                  className="
                    mt-4
                    w-full
                    min-h-[66px]
                    flex
                    items-center
                    justify-center
                    gap-3
                    border
                    border-line
                    bg-white
                    text-ink
                    font-semibold
                    text-[20px]
                    rounded-2xl
                    hover:border-primary
                    hover:text-primary
                    transition-colors
                  "
                >
                  <LayoutDashboard size={22} />
                  Dashboard Admin
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="
                    mt-4
                    w-full
                    min-h-[66px]
                    flex
                    items-center
                    justify-center
                    gap-3
                    border
                    border-line
                    bg-white
                    text-ink
                    font-semibold
                    text-[20px]
                    rounded-2xl
                    hover:border-primary
                    hover:text-primary
                    transition-colors
                  "
                >
                  <LayoutDashboard size={22} />
                  Login Admin
                </Link>
              )}

              {/* =================================================
                  MOBILE WHATSAPP
              ================================================== */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="
                  mt-3
                  w-full
                  min-h-[66px]
                  flex
                  items-center
                  justify-center
                  gap-3
                  bg-secondary
                  hover:bg-secondary-dark
                  text-white
                  font-bold
                  text-[20px]
                  rounded-2xl
                  transition-all
                "
              >
                <MessageCircle size={24} />
                Hubungi Kami
              </a>

              {/* =================================================
                  MOBILE PERTAMINA
              ================================================== */}
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  mt-5
                  pt-5
                  border-t
                  border-line
                "
              >
                <img
                  src={pertaminaLogo}
                  alt="Pertamina Patra Niaga"
                  className="
                    h-7
                    sm:h-8
                    w-auto
                    opacity-80
                  "
                />

                <p
                  className="
                    text-[10px]
                    sm:text-[11px]
                    text-muted
                    uppercase
                    tracking-wide
                  "
                >
                  UMKM Binaan Fuel Terminal Sei Siak
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}