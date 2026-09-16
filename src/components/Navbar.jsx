import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Menu,
  X,
  MessageCircle,
  LayoutDashboard,
} from "lucide-react";

import pertaminaLogo from "../assets/pertamina-logo.png";
import { useAuth } from "../context/AuthContext";

const WA_NUMBER = "6281270958582";

const links = [
  {
    to: "/",
    label: "Beranda",
    end: true,
  },
  {
    to: "/kambing",
    label: "Kambing",
  },
  {
    to: "/ayam",
    label: "Ayam",
  },
  {
    to: "/maggot",
    label: "Maggot",
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
      "Halo, saya ingin bertanya tentang produk Juragan Kambing Sei Siak."
    );

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

        <div
          className="
            bg-white
            border border-line
            rounded-2xl
            shadow-soft
            px-4 sm:px-6
            py-3
          "
        >

          <div className="flex items-center justify-between">

            {/* ================= BRAND ================= */}
            <Link to="/" className="flex items-center gap-4">

              <img
                src={pertaminaLogo}
                alt="Pertamina Patra Niaga"
                className="h-10 sm:h-12 w-auto"
              />

              <div className="hidden sm:block w-px h-10 bg-line" />

              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-bold text-ink">JURAGAN KAMBING</p>
                <p className="text-xs font-semibold text-primary">SEI SIAK</p>
                <p className="text-[9px] text-muted uppercase tracking-wide">UMKM Binaan</p>
              </div>

            </Link>


            {/* ================= DESKTOP MENU ================= */}
            <nav className="hidden lg:flex items-center gap-7">

              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `
                    relative
                    text-sm
                    font-semibold
                    transition-colors
                    ${isActive
                      ? "text-primary"
                      : "text-ink hover:text-primary"
                    }
                    `
                  }
                >
                  {link.label}

                  <span
                    className="
                      absolute
                      left-0
                      right-0
                      -bottom-2
                      h-0.5
                      rounded-full
                      bg-primary
                      opacity-0
                    "
                  />
                </NavLink>
              ))}

            </nav>


            {/* ================= RIGHT BUTTONS ================= */}
            <div className="hidden sm:flex items-center gap-3">

              {/* KEMBALI KE ADMIN */}
              {user && (
                <Link
                  to="/admin/dashboard"
                  className="
                    flex
                    items-center
                    gap-2
                    bg-secondary-tint
                    hover:bg-secondary/20
                    text-secondary-dark
                    text-sm
                    font-semibold
                    px-4
                    py-2.5
                    rounded-full
                    transition-colors
                  "
                >
                  <LayoutDashboard size={16} />
                  <span>Kembali ke Admin</span>
                </Link>
              )}


              {/* WHATSAPP */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-center
                  gap-2
                  bg-primary
                  hover:bg-primary-dark
                  text-white
                  text-sm
                  font-semibold
                  px-5
                  py-2.5
                  rounded-full
                  transition-all
                  hover:-translate-y-0.5
                  shadow-md
                "
              >
                <MessageCircle size={16} />

                <span>
                  Hubungi Kami
                </span>

              </a>

            </div>


            {/* ================= MOBILE BUTTON ================= */}
            <button
              onClick={() => setOpen(!open)}
              className="
                lg:hidden
                w-10
                h-10
                rounded-xl
                bg-cream
                flex
                items-center
                justify-center
                text-ink
              "
            >
              {open ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>

          </div>


          {/* ================= MOBILE MENU ================= */}
          {open && (
            <div className="lg:hidden mt-4 pt-4 border-t border-line">

              <nav className="flex flex-col gap-2">

                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      font-semibold
                      ${isActive
                        ? "bg-primary-light text-primary"
                        : "text-ink hover:bg-cream"
                      }
                      `
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

              </nav>


              {/* KEMBALI KE ADMIN */}
              {user && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className="
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-secondary-tint
                    text-secondary-dark
                    font-semibold
                    py-3
                    rounded-xl
                  "
                >
                  <LayoutDashboard size={17} />
                  Kembali ke Admin
                </Link>
              )}


              {/* WHATSAPP */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="
                  mt-3
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-primary
                  text-white
                  font-semibold
                  py-3
                  rounded-xl
                "
              >
                <MessageCircle size={17} />
                Hubungi Kami
              </a>

            </div>
          )}

        </div>
      </div>
    </header>
  );
}