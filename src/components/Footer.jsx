import { Link } from "react-router-dom";
import {
  Phone,
  MapPin,
  Mail,
  PawPrint,
} from "lucide-react";

import pertaminaLogo from "../assets/pertamina-logo.png";

const ADDRESS = "Jl. Sei Siak, Pekanbaru, Riau";
const PHONE = "0812 7095 8582";
const EMAIL = "juragankambing@seisiak.id";
const WA_NUMBER = "6281270958582";

const menu = [
  { to: "/", label: "Beranda" },
  { to: "/katalog", label: "Katalog" },
  { to: "/titip-ternak", label: "Titip Ternak" },
  { to: "/lacak-ternak", label: "Lacak Ternak" },
  { to: "/tentang", label: "Tentang Kami" },
];

export default function Footer() {
  const whatsappLink =
    `https://wa.me/${WA_NUMBER}?text=` +
    encodeURIComponent(
      "Halo, saya ingin bertanya tentang Juragan Kambing Sei Siak."
    );

  return (
    <footer className="bg-white border-t border-line mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 lg:gap-12">

          {/* BRAND */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <PawPrint size={19} className="text-white" />
              </div>

              <div className="leading-tight">
                <p className="font-heading text-sm font-extrabold text-ink">
                  JURAGAN KAMBING
                </p>

                <p className="text-xs font-bold text-primary">
                  SEI SIAK
                </p>
              </div>
            </Link>

            <p className="mt-4 text-[10px] sm:text-xs text-muted leading-relaxed max-w-[240px]">
              Peternakan lokal Sei Siak dengan produk berkualitas
              dan layanan titip ternak yang dikelola secara
              bertanggung jawab.
            </p>

            {/* STATUS */}
            <div className="mt-4 inline-flex items-center gap-2 bg-primary-tint px-3 py-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-primary" />

              <span className="text-[10px] font-semibold text-primary">
                Peternakan Lokal Sei Siak
              </span>
            </div>
          </div>

          {/* NAVIGASI */}
          <div>
            <h3 className="font-heading text-xs sm:text-sm font-bold text-ink mb-4">
              Navigasi
            </h3>

            <ul className="space-y-2.5">
              {menu.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[10px] sm:text-xs text-muted hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KONTAK */}
          <div>
            <h3 className="font-heading text-xs sm:text-sm font-bold text-ink mb-4">
              Kontak
            </h3>

            <div className="space-y-3">

              {/* ALAMAT */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-primary-tint flex items-center justify-center shrink-0">
                  <MapPin size={12} className="text-primary" />
                </div>

                <p className="text-[10px] sm:text-xs text-muted leading-relaxed">
                  {ADDRESS}
                </p>
              </div>

              {/* WHATSAPP */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 group"
              >
                <div className="w-6 h-6 rounded-full bg-primary-tint flex items-center justify-center shrink-0">
                  <Phone size={12} className="text-primary" />
                </div>

                <span className="text-[10px] sm:text-xs text-muted group-hover:text-primary transition-colors">
                  {PHONE}
                </span>
              </a>

              {/* EMAIL */}
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-2.5 group"
              >
                <div className="w-6 h-6 rounded-full bg-primary-tint flex items-center justify-center shrink-0">
                  <Mail size={12} className="text-primary" />
                </div>

                <span className="text-[10px] sm:text-xs text-muted group-hover:text-primary transition-colors break-all leading-relaxed">
                  {EMAIL}
                </span>
              </a>

            </div>
          </div>

          {/* PERTAMINA */}
          <div>
            <h3 className="font-heading text-xs sm:text-sm font-bold text-ink mb-4">
              Didukung Oleh
            </h3>

            <div className="inline-flex items-center gap-3 bg-cream border border-line rounded-xl px-4 py-3">

              <img
                src={pertaminaLogo}
                alt="Pertamina Patra Niaga"
                className="h-8 sm:h-9 w-auto"
              />

              <div className="leading-tight">
                <p className="text-[9px] text-muted">
                  UMKM Binaan
                </p>

                <p className="text-[10px] font-bold text-ink">
                  Pertamina Patra Niaga
                </p>

                <p className="text-[9px] text-muted">
                  Fuel Terminal Sei Siak
                </p>
              </div>

            </div>

            <p className="mt-3 text-[9px] sm:text-[10px] text-muted leading-relaxed max-w-[230px]">
              Mendukung pengembangan UMKM dan peternakan
              berkelanjutan di wilayah Sei Siak.
            </p>
          </div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">

            <p className="text-[9px] sm:text-[10px] text-muted text-center sm:text-left">
              © {new Date().getFullYear()} Juragan Kambing Sei Siak.
              Semua hak dilindungi.
            </p>

            <p className="text-[9px] sm:text-[10px] text-muted text-center">
              Mendukung peternakan lokal yang berkelanjutan.
            </p>

          </div>

        </div>
      </div>
    </footer>
  );
}