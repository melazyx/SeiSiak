import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Recycle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";
import SectionHeading from "../components/SectionHeading";

import pertaminaLogo from "../assets/pertamina-logo.png";
import heroImage from "../assets/hero-kambing.jpeg";
import pertaminaBackground from "../assets/fuel-terminal.jpeg";

const WA_NUMBER = "6281234567890";

const categories = [
  {
    title: "Kambing",
    description:
      "Kambing perah dan kambing gemuk untuk kebutuhan harian, qurban, aqiqah, dan titip ternak.",
    emoji: "🐐",
    link: "/kambing",
    color: "secondary",
  },
  {
    title: "Ayam",
    description:
      "Ayam kampung yang dipelihara dengan baik serta produk pupuk organik dari kandang.",
    emoji: "🐔",
    link: "/ayam",
    color: "primary",
  },
  {
    title: "Maggot",
    description:
      "Maggot sebagai alternatif pakan ternak yang ekonomis dan mendukung ekonomi sirkular.",
    emoji: "🪱",
    link: "/maggot",
    color: "accent",
  },
];

export default function Beranda() {
  const whatsappLink =
    `https://wa.me/${WA_NUMBER}?text=` +
    encodeURIComponent(
      "Halo, saya ingin bertanya tentang produk Juragan Kambing Sei Siak."
    );

  return (
    <div className="min-h-screen bg-cream">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">

        {/* =========================================
            BACKGROUND FOTO PERTAMINA
        ========================================= */}
        <div className="absolute inset-0 overflow-hidden">

          <img
            src={pertaminaBackground}
            alt=""
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              opacity-[0.10]
              blur-[1px]
              scale-105
            "
          />

          {/* Lapisan putih supaya foto lebih samar */}
          <div
            className="
              absolute
              inset-0
              bg-white/70
            "
          />

          {/* Gradient biru Pertamina */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-white/95
              via-secondary-light/80
              to-white/95
            "
          />

        </div>


        {/* ================= DEKORASI ================= */}

        {/* Lingkaran kanan atas */}
        <div
          className="
            absolute
            -right-40
            -top-40
            w-96
            h-96
            rounded-full
            bg-secondary/10
          "
        />

        {/* Lingkaran kiri bawah */}
        <div
          className="
            absolute
            -left-32
            bottom-0
            w-80
            h-80
            rounded-full
            bg-accent/10
          "
        />


        {/* ================= CONTENT ================= */}
        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            py-12
            sm:py-20
            relative
            z-10
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-12
              items-center
            "
          >

            {/* =====================================
                LEFT CONTENT
            ====================================== */}
            <div>

              {/* Badge */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-white/95
                  border
                  border-line
                  shadow-sm
                  px-4
                  py-2
                  rounded-full
                  backdrop-blur-sm
                "
              >
                <Leaf
                  size={15}
                  className="text-accent-dark"
                />

                <span
                  className="
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-ink
                  "
                >
                  UMKM Binaan Fuel Terminal Sei Siak
                </span>
              </div>


              {/* Judul */}
              <h1
                className="
                  mt-6
                  font-heading
                  font-extrabold
                  text-5xl
                  sm:text-6xl
                  lg:text-7xl
                  leading-[0.95]
                  tracking-tight
                "
              >

                <span className="text-secondary">
                  Ternak
                </span>

                <br />

                <span className="text-ink">
                  Berkualitas,
                </span>

                <br />

                <span className="text-primary">
                  Berkelanjutan.
                </span>

              </h1>


              {/* Deskripsi */}
              <p
                className="
                  mt-6
                  text-base
                  sm:text-lg
                  text-muted
                  max-w-xl
                  leading-relaxed
                "
              >
                Juragan Kambing Sei Siak menghadirkan
                kambing, ayam kampung, dan maggot
                berkualitas sebagai bagian dari
                pengembangan UMKM bersama Pertamina
                Patra Niaga Fuel Terminal Sei Siak.
              </p>


              {/* Tombol */}
              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                  mt-8
                "
              >

                <Link
                  to="/kambing"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    bg-primary
                    hover:bg-primary-dark
                    text-white
                    px-6
                    py-3.5
                    rounded-full
                    font-bold
                    text-sm
                    transition-all
                    hover:-translate-y-0.5
                    shadow-md
                  "
                >
                  Jelajahi Produk
                  <ArrowRight size={17} />
                </Link>


                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    bg-white
                    hover:bg-secondary-light
                    text-secondary
                    border
                    border-secondary/20
                    px-6
                    py-3.5
                    rounded-full
                    font-bold
                    text-sm
                    transition-all
                    hover:-translate-y-0.5
                    shadow-sm
                  "
                >
                  Hubungi Kami
                </a>

              </div>


              {/* ================= BRAND ================= */}
              <div
                className="
                  mt-8
                  flex
                  items-center
                  gap-4
                "
              >

                <img
                  src={pertaminaLogo}
                  alt="Pertamina Patra Niaga"
                  className="h-10 w-auto"
                />


                <div
                  className="
                    h-8
                    w-px
                    bg-line
                  "
                />


                <div>

                  <p
                    className="
                      text-xs
                      font-bold
                      text-ink
                    "
                  >
                    Energizing Sustainable Future
                  </p>

                  <p
                    className="
                      text-[10px]
                      text-muted
                    "
                  >
                    Fuel Terminal Sei Siak
                  </p>

                </div>

              </div>

            </div>


            {/* =====================================
                RIGHT - FOTO KAMBING
            ====================================== */}
            <div className="relative">

              <div
                className="
                  relative
                  rounded-[32px]
                  overflow-hidden
                  bg-white
                  shadow-card
                  border
                  border-white
                  min-h-[420px]
                "
              >

                {/* ===============================
                    STRIPE PERTAMINA
                ================================ */}
                <div
                  className="
                    absolute
                    top-0
                    left-0
                    right-0
                    h-2
                    flex
                    z-20
                  "
                >

                  <div className="flex-1 bg-primary" />

                  <div className="flex-1 bg-secondary" />

                  <div className="flex-1 bg-accent" />

                </div>


                {/* ===============================
                    FOTO KAMBING
                ================================ */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-secondary-light
                  "
                >

                  <img
                    src={heroImage}
                    alt="Juragan Kambing Sei Siak"
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      hover:scale-105
                    "
                  />

                </div>


                {/* Overlay foto */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-ink/70
                    via-transparent
                    to-transparent
                  "
                />


                {/* ===============================
                    BADGE FOTO
                ================================ */}
                <div
                  className="
                    absolute
                    top-7
                    left-7
                    bg-white/95
                    backdrop-blur-sm
                    rounded-2xl
                    px-4
                    py-3
                    shadow-lg
                  "
                >

                  <p
                    className="
                      text-xs
                      font-bold
                      text-secondary
                    "
                  >
                    JURAGAN KAMBING
                  </p>

                  <p
                    className="
                      text-[10px]
                      text-muted
                    "
                  >
                    SEI SIAK
                  </p>

                </div>


                {/* ===============================
                    TEXT FOTO
                ================================ */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-7
                  "
                >

                  <p
                    className="
                      text-white
                      text-2xl
                      font-heading
                      font-extrabold
                    "
                  >
                    Dari kandang,
                    <br />
                    untuk masa depan.
                  </p>

                </div>

              </div>

              {/* 
                KARTU "EKONOMI SIRKULAR"
                SUDAH DIHAPUS
              */}

            </div>

          </div>

        </div>

      </section>


      {/* ================= BENEFITS ================= */}
      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          -mt-1
          relative
          z-10
        "
      >

        <div
          className="
            bg-white
            rounded-3xl
            border
            border-line
            shadow-card
            p-5
            sm:p-6
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
          "
        >

          <Benefit
            icon={ShieldCheck}
            title="Kualitas Terjaga"
            text="Produk dirawat dan diproses dengan baik."
            color="primary"
          />

          <Benefit
            icon={Leaf}
            title="Ramah Lingkungan"
            text="Mendukung praktik usaha yang berkelanjutan."
            color="accent"
          />

          <Benefit
            icon={Recycle}
            title="Ekonomi Sirkular"
            text="Mengolah potensi lokal menjadi bernilai."
            color="secondary"
          />

          <Benefit
            icon={ArrowRight}
            title="Mudah Dipesan"
            text="Konsultasi dan pemesanan melalui WhatsApp."
            color="primary"
          />

        </div>

      </section>


      {/* ================= PRODUK ================= */}
      <section
        id="produk"
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          py-20
        "
      >

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            justify-between
            gap-5
            mb-8
          "
        >

          <SectionHeading
            blueWord="Produk"
            redWord="Unggulan"
            subtitle="Beragam produk dari Juragan Kambing Sei Siak untuk kebutuhan Anda."
          />

          <Link
            to="/kambing"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-secondary
              hover:text-primary
            "
          >
            Lihat semua produk
            <ArrowRight size={16} />
          </Link>

        </div>


        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          {categories.map((item) => (
            <CategoryCard
              key={item.title}
              item={item}
            />
          ))}

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          pb-20
        "
      >

        <CTABanner />

      </section>


      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  );
}


/* =========================================
   BENEFIT COMPONENT
========================================= */

function Benefit({
  icon: Icon,
  title,
  text,
  color,
}) {

  const colors = {
    primary:
      "bg-primary-light text-primary",

    secondary:
      "bg-secondary-light text-secondary",

    accent:
      "bg-accent-light text-accent-dark",
  };

  return (
    <div
      className="
        flex
        items-center
        gap-3
        p-3
        rounded-2xl
      "
    >

      <div
        className={`
          w-11
          h-11
          rounded-full
          flex
          items-center
          justify-center
          shrink-0
          ${colors[color]}
        `}
      >

        <Icon size={19} />

      </div>


      <div>

        <p
          className="
            text-sm
            font-bold
            text-ink
          "
        >
          {title}
        </p>

        <p
          className="
            text-xs
            text-muted
            mt-0.5
          "
        >
          {text}
        </p>

      </div>

    </div>
  );
}


/* =========================================
   CATEGORY CARD
========================================= */

function CategoryCard({ item }) {

  const colorMap = {
    primary:
      "bg-primary-light text-primary",

    secondary:
      "bg-secondary-light text-secondary",

    accent:
      "bg-accent-light text-accent-dark",
  };

  return (
    <Link
      to={item.link}
      className="
        group
        bg-white
        rounded-3xl
        border
        border-line
        shadow-card
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            text-4xl
            ${colorMap[item.color]}
          `}
        >
          {item.emoji}
        </div>


        <ArrowRight
          size={20}
          className="
            text-muted
            group-hover:text-primary
            group-hover:translate-x-1
            transition-all
          "
        />

      </div>


      <h3
        className="
          mt-6
          text-xl
          font-heading
          font-extrabold
          text-ink
        "
      >
        {item.title}
      </h3>


      <p
        className="
          mt-2
          text-sm
          text-muted
          leading-relaxed
        "
      >
        {item.description}
      </p>


      <div
        className="
          mt-5
          text-sm
          font-bold
          text-secondary
        "
      >
        Lihat produk →
      </div>

    </Link>
  );
}