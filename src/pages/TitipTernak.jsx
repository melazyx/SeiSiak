import { useState } from "react";
import {
  ClipboardList,
  CreditCard,
  Eye,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  ShieldCheck,
  User,
  Phone,
  PawPrint,
  Hash,
  CalendarDays,
  Pencil,
  ArrowRight,
  Info,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import kambingImage from "../assets/kambing-perah.jpeg";
import ayamImage from "../assets/hero-ayam.jpg";
import maggotImage from "../assets/maggot-fresh.webp";

const WA_NUMBER = "6281270958582";

const STEPS = [
  {
    number: "01",
    title: "Isi Formulir",
    description: "Daftar titip ternak",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Transfer",
    description: "Selesaikan pembayaran",
    icon: CreditCard,
  },
  {
    number: "03",
    title: "Pantau",
    description: "Lihat perkembangan ternak",
    icon: Eye,
  },
  {
    number: "04",
    title: "Panen",
    description: "Ambil hasil ternak",
    icon: CheckCircle2,
  },
];

const JENIS_TERNAK = [
  {
    value: "Kambing",
    title: "Kambing",
    description: "Pertumbuhan cepat & nilai jual tinggi",
    image: kambingImage,
  },
  {
    value: "Ayam",
    title: "Ayam",
    description: "Cocok untuk pedaging & petelur",
    image: ayamImage,
  },
  {
    value: "Maggot",
    title: "Maggot",
    description: "Organik & ramah lingkungan",
    image: maggotImage,
  },
];

const PERIODE_TITIP = [
  "1 Bulan",
  "3 Bulan",
  "6 Bulan",
  "12 Bulan",
];

export default function TitipTernak() {
  const [form, setForm] = useState({
    nama: "",
    noHp: "",
    jenis: "",
    jumlah: "",
    periode: "",
    catatan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJenisClick = (jenis) => {
    setForm((prev) => ({
      ...prev,
      jenis,
    }));
  };

  const scrollToForm = () => {
    document
      .getElementById("form-titip-ternak")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const handleReset = () => {
    setForm({
      nama: "",
      noHp: "",
      jenis: "",
      jumlah: "",
      periode: "",
      catatan: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nama ||
      !form.noHp ||
      !form.jenis ||
      !form.jumlah ||
      !form.periode
    ) {
      alert("Mohon lengkapi data yang wajib diisi.");
      return;
    }

    const message = `
Halo, saya ingin mendaftar layanan Titip Ternak di Juragan Kambing Sei Siak.

Nama Lengkap: ${form.nama}
No. HP: ${form.noHp}
Jenis Ternak: ${form.jenis}
Jumlah: ${form.jumlah}
Periode Titip: ${form.periode}
Catatan Tambahan: ${form.catatan || "-"}

Mohon informasi selanjutnya mengenai proses Titip Ternak. Terima kasih.
    `.trim();

    const whatsappUrl =
      `https://wa.me/${WA_NUMBER}?text=` +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF]">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative">
        <div className="relative h-[300px] sm:h-[350px] lg:h-[365px] overflow-hidden">
          <img
            src={kambingImage}
            alt="Titip Ternak Juragan Kambing Sei Siak"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-5 sm:px-8 lg:px-10 flex items-center">
            <div className="max-w-2xl text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#087F5B] rounded-full px-3.5 py-2 mb-4 shadow-sm">
                <ShieldCheck size={15} />

                <span className="text-[11px] sm:text-xs font-semibold">
                  Layanan Titip Ternak Sei Siak
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[52px] leading-tight font-extrabold tracking-tight">
                Titip Ternak
              </h1>

              {/* Description */}
              <p className="mt-3 text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-xl">
                Percayakan ternak Anda kepada kami, dengan
                perawatan terbaik dan pemantauan berkala.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* =====================================================
            STEP PROCESS
        ====================================================== */}
        <section className="relative z-20 -mt-8">
          <div className="bg-white rounded-[22px] border border-[#E4E7E5] shadow-lg px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className={`
                      relative flex items-center gap-3 sm:gap-4
                      px-2 sm:px-4 lg:px-3
                      py-3
                      ${
                        index !== STEPS.length - 1
                          ? "lg:border-r border-[#E4E7E5]"
                          : ""
                      }
                    `}
                  >
                    {/* icon */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#087F5B] text-white flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-[11px] font-bold text-[#087F5B]">
                        {step.number}
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-[#1F2933]">
                        {step.title}
                      </h3>

                      <p className="hidden sm:block text-[10px] sm:text-xs text-[#68737D] mt-0.5">
                        {step.description}
                      </p>
                    </div>

                    {/* arrow */}
                    {index !== STEPS.length - 1 && (
                      <ChevronRight
                        size={17}
                        className="hidden lg:block absolute -right-[9px] bg-white text-[#087F5B]"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA DAFTAR
        ====================================================== */}
        <div className="flex justify-center mt-5 sm:mt-6">
          <button
            type="button"
            onClick={scrollToForm}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              min-w-[190px]
              px-7
              py-3.5
              rounded-xl
              bg-[#087F5B]
              text-white
              text-sm
              font-bold
              shadow-sm
              hover:bg-[#056044]
              hover:shadow-md
              transition-all
              duration-200
            "
          >
            Daftar Titip Ternak

            <ArrowRight
              size={17}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>

        {/* =====================================================
            PILIHAN JENIS TERNAK
        ====================================================== */}
        <section className="mt-10 sm:mt-12">
          <div className="bg-white border border-[#E4E7E5] rounded-[18px] p-5 sm:p-7 lg:p-8">
            {/* heading */}
            <div className="mb-5">
              <p className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#087F5B]">
                Pilihan Jenis Ternak
              </p>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F2933] mt-1">
                Pilih Jenis Ternak
              </h2>

              <p className="text-sm text-[#68737D] mt-1.5">
                Pilih jenis ternak yang ingin Anda titipkan.
              </p>
            </div>

            {/* cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {JENIS_TERNAK.map((item) => {
                const isSelected = form.jenis === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      handleJenisClick(item.value)
                    }
                    className={`
                      group
                      text-left
                      overflow-hidden
                      rounded-xl
                      bg-white
                      border
                      transition-all
                      duration-200
                      ${
                        isSelected
                          ? "border-[#087F5B] ring-2 ring-[#087F5B]/10 shadow-md"
                          : "border-[#E4E7E5] shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                      }
                    `}
                  >
                    {/* image */}
                    <div className="relative h-40 sm:h-36 lg:h-40 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                      />

                      {/* selected */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#087F5B] text-white flex items-center justify-center shadow-md">
                          <CheckCircle2 size={17} />
                        </div>
                      )}
                    </div>

                    {/* text */}
                    <div className="p-3.5 sm:p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-heading text-base sm:text-lg font-bold text-[#087F5B]">
                            {item.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-[#68737D] mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <span
                          className={`
                            w-8 h-8 rounded-full border shrink-0
                            flex items-center justify-center
                            transition-colors
                            ${
                              isSelected
                                ? "border-[#087F5B] text-[#087F5B]"
                                : "border-[#D9DEDB] text-[#087F5B] group-hover:bg-[#E8F5EF]"
                            }
                          `}
                        >
                          <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            FORM TITIP TERNAK
        ====================================================== */}
        <section
          id="form-titip-ternak"
          className="mt-5 sm:mt-6 scroll-mt-24"
        >
          <div className="bg-white border border-[#E4E7E5] rounded-[18px] shadow-sm p-5 sm:p-7 lg:p-8">
            {/* heading */}
            <div className="mb-7">
              <p className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#087F5B]">
                Pendaftaran
              </p>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F2933] mt-1">
                Formulir Titip Ternak
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* =================================================
                    NAMA
                ================================================== */}
                <FormField label="Nama Lengkap" required>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#81909A]"
                    />

                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      required
                      className="form-input pl-10"
                    />
                  </div>
                </FormField>

                {/* =================================================
                    NO HP
                ================================================== */}
                <FormField label="No. HP" required>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#81909A]"
                    />

                    <input
                      type="tel"
                      name="noHp"
                      value={form.noHp}
                      onChange={handleChange}
                      placeholder="Masukkan nomor HP"
                      required
                      className="form-input pl-10"
                    />
                  </div>
                </FormField>

                {/* =================================================
                    JENIS TERNAK
                ================================================== */}
                <FormField label="Jenis Ternak" required>
                  <div className="relative">
                    <PawPrint
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#81909A]"
                    />

                    <select
                      name="jenis"
                      value={form.jenis}
                      onChange={handleChange}
                      required
                      className="form-input pl-10 pr-10 appearance-none cursor-pointer"
                    >
                      <option value="">
                        Pilih jenis ternak
                      </option>

                      {JENIS_TERNAK.map((item) => (
                        <option
                          key={item.value}
                          value={item.value}
                        >
                          {item.title}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={16}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#81909A] pointer-events-none"
                    />
                  </div>
                </FormField>

                {/* =================================================
                    JUMLAH
                ================================================== */}
                <FormField label="Jumlah" required>
                  <div className="relative">
                    <Hash
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#81909A]"
                    />

                    <input
                      type="number"
                      min="1"
                      name="jumlah"
                      value={form.jumlah}
                      onChange={handleChange}
                      placeholder="Masukkan jumlah"
                      required
                      className="form-input pl-10"
                    />
                  </div>
                </FormField>

                {/* =================================================
                    PERIODE
                ================================================== */}
                <FormField label="Periode Titip" required>
                  <div className="relative">
                    <CalendarDays
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#81909A]"
                    />

                    <select
                      name="periode"
                      value={form.periode}
                      onChange={handleChange}
                      required
                      className="form-input pl-10 pr-10 appearance-none cursor-pointer"
                    >
                      <option value="">
                        Pilih periode
                      </option>

                      {PERIODE_TITIP.map((periode) => (
                        <option
                          key={periode}
                          value={periode}
                        >
                          {periode}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={16}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#81909A] pointer-events-none"
                    />
                  </div>
                </FormField>

                {/* =================================================
                    CATATAN
                ================================================== */}
                <FormField label="Catatan Tambahan">
                  <div className="relative">
                    <Pencil
                      size={16}
                      className="absolute left-3.5 top-3.5 text-[#81909A]"
                    />

                    <textarea
                      name="catatan"
                      value={form.catatan}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tulis catatan (opsional)"
                      className="form-textarea pl-10"
                    />
                  </div>
                </FormField>
              </div>

              {/* =================================================
                  INFO WHATSAPP
              ================================================== */}
              <div className="mt-6 flex items-start gap-3 px-4 py-3.5 rounded-xl bg-[#F0F7F3] border border-[#E0ECE5]">
                <div className="w-7 h-7 rounded-full bg-[#087F5B] text-white flex items-center justify-center shrink-0">
                  <Info size={14} />
                </div>

                <p className="text-xs sm:text-sm text-[#52615B] leading-relaxed">
                  Setelah menekan tombol{" "}
                  <span className="font-bold text-[#1F2933]">
                    Kirim
                  </span>
                  , data pendaftaran akan diteruskan melalui
                  WhatsApp untuk proses konfirmasi lebih lanjut.
                </p>
              </div>

              {/* =================================================
                  BUTTONS
              ================================================== */}
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="
                    h-12
                    px-8
                    rounded-xl
                    border
                    border-[#D9DEDB]
                    bg-white
                    text-[#1F2933]
                    text-sm
                    font-bold
                    hover:bg-[#F7F5EF]
                    transition-colors
                    sm:min-w-[155px]
                  "
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="
                    h-12
                    px-8
                    rounded-xl
                    bg-[#087F5B]
                    text-white
                    text-sm
                    font-bold
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    hover:bg-[#056044]
                    shadow-sm
                    transition-all
                    sm:min-w-[175px]
                  "
                >
                  <MessageCircle size={17} />
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* =====================================================
            BOTTOM INFO
        ====================================================== */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#81909A]">
          <ShieldCheck size={14} className="text-[#087F5B]" />

          <span>
            Data pendaftaran digunakan untuk proses layanan
            Titip Ternak.
          </span>
        </div>
      </main>

      <Footer />

      {/* =====================================================
          LOCAL FORM STYLES
      ====================================================== */}
      <style>{`
        .form-input {
          width: 100%;
          height: 46px;
          border: 1px solid #D9DEDB;
          border-radius: 10px;
          background: #FFFFFF;
          color: #1F2933;
          font-size: 13px;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input::placeholder {
          color: #98A3AA;
        }

        .form-input:focus {
          border-color: #087F5B;
          box-shadow: 0 0 0 3px rgba(8, 127, 91, 0.08);
        }

        .form-textarea {
          width: 100%;
          min-height: 78px;
          border: 1px solid #D9DEDB;
          border-radius: 10px;
          background: #FFFFFF;
          color: #1F2933;
          font-size: 13px;
          padding-top: 12px;
          padding-right: 14px;
          padding-bottom: 12px;
          outline: none;
          resize: vertical;
          transition: all 0.2s ease;
        }

        .form-textarea::placeholder {
          color: #98A3AA;
        }

        .form-textarea:focus {
          border-color: #087F5B;
          box-shadow: 0 0 0 3px rgba(8, 127, 91, 0.08);
        }

        select.form-input {
          color: #1F2933;
        }

        select.form-input:invalid {
          color: #98A3AA;
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-[#1F2933] mb-2">
        {label}

        {required && (
          <span className="text-[#D71920] ml-1">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}