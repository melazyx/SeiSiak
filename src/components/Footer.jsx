import { Link } from "react-router-dom";
import {
  Phone,
  MapPin,
  Mail,
  MessageCircle,
} from "lucide-react";

import pertaminaLogo from "../assets/pertamina-logo.png";
import { ShieldCheck } from "lucide-react";

const WA_NUMBER = "6281270958582";

const ADDRESS =
  "Fuel Terminal Sei Siak, Kota Pekanbaru, Riau";

const EMAIL =
  "juragankambing@pertamina.com";

const menu = [
  {
    to: "/",
    label: "Beranda",
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

export default function Footer() {
  const whatsappLink =
    `https://wa.me/${WA_NUMBER}?text=` +
    encodeURIComponent(
      "Halo, saya ingin bertanya tentang produk Juragan Kambing Sei Siak."
    );

  return (
    <footer className="bg-white">

      {/* BRAND STRIPE */}
      <div className="flex h-1.5">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-secondary" />
        <div className="flex-1 bg-accent" />
      </div>

      <div className="
        max-w-7xl
        mx-auto
        px-5
        sm:px-8
        py-12
      ">

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-10
        ">

          {/* BRAND */}
          <div>

            <img
              src={pertaminaLogo}
              alt="Pertamina Patra Niaga"
              className="h-12 w-auto"
            />

            <p className="
              mt-3
              text-xs
              font-semibold
              text-muted
              uppercase
              tracking-wider
            ">
              Fuel Terminal Sei Siak
            </p>

            <p className="
              mt-4
              text-sm
              text-muted
              leading-relaxed
              max-w-xs
            ">
              Juragan Kambing Sei Siak merupakan
              bagian dari pengembangan UMKM yang
              didukung oleh Pertamina Patra Niaga.
            </p>

          </div>

          {/* MENU */}
          <div>

            <h3 className="
              font-heading
              font-bold
              text-ink
              mb-4
            ">
              Menu
            </h3>

            <div className="
              flex
              flex-col
              gap-3
            ">

              {menu.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="
                    text-sm
                    text-muted
                    hover:text-primary
                    transition-colors
                  "
                >
                  {item.label}
                </Link>
              ))}

            </div>

          </div>

          {/* KONTAK */}
          <div>

            <h3 className="
              font-heading
              font-bold
              text-ink
              mb-4
            ">
              Kontak Kami
            </h3>

            <div className="
              flex
              flex-col
              gap-4
            ">

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-start
                  gap-3
                  text-sm
                  text-muted
                  hover:text-primary
                "
              >
                <MessageCircle
                  size={17}
                  className="text-primary mt-0.5"
                />

                <span>
                  +62 812 3456 7890
                </span>
              </a>

              <div className="
                flex
                items-start
                gap-3
                text-sm
                text-muted
              ">
                <MapPin
                  size={17}
                  className="text-secondary mt-0.5"
                />

                <span>
                  {ADDRESS}
                </span>
              </div>

              <div className="
                flex
                items-start
                gap-3
                text-sm
                text-muted
              ">
                <Mail
                  size={17}
                  className="text-accent-dark mt-0.5"
                />

                <span>
                  {EMAIL}
                </span>
              </div>

            </div>

          </div>

          {/* BRAND MESSAGE */}
          <div>

            <h3 className="
              font-heading
              font-bold
              text-ink
              mb-4
            ">
              Bersama untuk Berkelanjutan
            </h3>

            <p className="
              text-sm
              text-muted
              leading-relaxed
            ">
              Dari yang kecil, untuk dampak
              yang besar bagi masyarakat
              dan lingkungan.
            </p>

            <div className="
              mt-5
              p-4
              rounded-2xl
              bg-secondary-light
              border
              border-secondary/10
            ">

              <p className="
                text-xs
                font-bold
                text-secondary
              ">
                Energizing Sustainable Future
              </p>

              <p className="
                text-[10px]
                text-muted
                mt-1
              ">
                Pertamina Patra Niaga
              </p>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="
          mt-10
          pt-6
          border-t
          border-line
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-3
        ">

          <p className="
            text-xs
            text-muted
          ">
            © 2026 Juragan Kambing Sei Siak
          </p>

          <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">

  

            <Link
              to="/login"
              className="
      flex
      items-center
      gap-2
      text-xs
      text-muted
      hover:text-primary
      transition-colors
    "
            >
              <ShieldCheck size={14} />
              Login Admin
            </Link>

          </div>

          <p className="
            text-xs
            text-muted
            text-center
          ">
            Pertamina Patra Niaga • Fuel Terminal Sei Siak
          </p>

        </div>

      </div>

    </footer>
  );
}