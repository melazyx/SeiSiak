import { useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  Scale,
  HeartPulse,
  Utensils,
  Activity,
  Syringe,
  QrCode,
  CheckCircle2,
  MessageCircle,
  ClipboardList,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTernak } from "../context/TernakContext";

import kambingImage from "../assets/kambing-perah.jpeg";

const WA_ADMIN = "6281270958582";

/* =========================================================
   HELPER
========================================================= */

function formatTanggal(tanggal) {
  if (!tanggal) return "-";

  const date = new Date(tanggal);

  if (Number.isNaN(date.getTime())) {
    return tanggal;
  }

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTanggalLengkap(tanggal) {
  if (!tanggal) return "-";

  const date = new Date(tanggal);

  if (Number.isNaN(date.getTime())) {
    return tanggal;
  }

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatAngka(value) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const angka = Number(value);

  if (Number.isNaN(angka)) {
    return value;
  }

  return angka.toLocaleString("id-ID", {
    maximumFractionDigits: 2,
  });
}

function getBobotTerakhir(ternak) {
  if (
    ternak.bobot_akhir !== null &&
    ternak.bobot_akhir !== undefined &&
    ternak.bobot_akhir !== ""
  ) {
    return Number(ternak.bobot_akhir);
  }

  if (
    ternak.bobot_awal !== null &&
    ternak.bobot_awal !== undefined &&
    ternak.bobot_awal !== ""
  ) {
    return Number(ternak.bobot_awal);
  }

  return null;
}

function getPertumbuhan(ternak) {
  if (
    ternak.bobot_awal === null ||
    ternak.bobot_awal === undefined ||
    ternak.bobot_awal === "" ||
    ternak.bobot_akhir === null ||
    ternak.bobot_akhir === undefined ||
    ternak.bobot_akhir === ""
  ) {
    return null;
  }

  return Number(ternak.bobot_akhir) - Number(ternak.bobot_awal);
}

function getKondisiTerakhir(riwayatKesehatan) {
  if (!riwayatKesehatan || riwayatKesehatan.length === 0) {
    return "Belum ada data";
  }

  const terbaru = [...riwayatKesehatan].sort((a, b) => {
    return new Date(b.tanggal) - new Date(a.tanggal);
  })[0];

  if (!terbaru) {
    return "Belum ada data";
  }

  if (terbaru.tipe === "sakit") {
    return "Perlu perhatian";
  }

  if (terbaru.tipe === "periksa") {
    return "Dalam pemantauan";
  }

  if (terbaru.tipe === "obat") {
    return "Dalam perawatan";
  }

  if (terbaru.tipe === "vaksin") {
    return "Sehat";
  }

  return "Tercatat";
}

/* =========================================================
   MAIN
========================================================= */

export default function LacakTernak() {
  const { ternak, kesehatan, loading } = useTernak();

  const [kode, setKode] = useState("");
  const [ternakDitemukan, setTernakDitemukan] = useState(null);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("aktivitas");

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = (e) => {
    e.preventDefault();

    const keyword = kode.trim().toLowerCase();

    if (!keyword) {
      setTernakDitemukan(null);
      setSearched(true);
      return;
    }

    const hasil = (ternak || []).find((item) => {
      const kodeLacak = String(item.kode_lacak || "").toLowerCase();
      const kodeTernak = String(item.kode || "").toLowerCase();

      return (
        kodeLacak === keyword ||
        kodeTernak === keyword
      );
    });

    setTernakDitemukan(hasil || null);
    setSearched(true);
    setActiveTab("aktivitas");
  };

  /* =======================================================
     HEALTH HISTORY
  ======================================================= */

  const riwayatKesehatan = ternakDitemukan
    ? (kesehatan || [])
        .filter(
          (item) => item.ternak_id === ternakDitemukan.id
        )
        .sort(
          (a, b) =>
            new Date(b.tanggal) - new Date(a.tanggal)
        )
    : [];

  /* =======================================================
     ACTIVITY
  ======================================================= */

  const buatAktivitas = () => {
    if (!ternakDitemukan) {
      return [];
    }

    const aktivitas = [];

    /* Ternak masuk */
    if (ternakDitemukan.tanggal_masuk) {
      aktivitas.push({
        id: `masuk-${ternakDitemukan.id}`,
        tanggal: ternakDitemukan.tanggal_masuk,
        title: "Ternak masuk",
        description:
          "Ternak tercatat masuk ke dalam sistem.",
        icon: Activity,
      });
    }

    /* Riwayat kesehatan */
    riwayatKesehatan.forEach((item) => {
      let title = "Pemeriksaan kesehatan";
      let description =
        item.catatan || "Catatan kesehatan ternak.";

      if (item.tipe === "vaksin") {
        title = "Vaksinasi";
        description =
          item.catatan || "Vaksinasi ternak tercatat.";
      }

      if (item.tipe === "sakit") {
        title = "Catatan sakit";
        description =
          item.catatan || "Terdapat catatan kondisi sakit.";
      }

      if (item.tipe === "obat") {
        title = "Pemberian obat";
        description =
          item.catatan || "Pemberian obat tercatat.";
      }

      if (item.tipe === "periksa") {
        title = "Pemeriksaan kesehatan";
        description =
          item.catatan ||
          "Pemeriksaan kesehatan rutin.";
      }

      aktivitas.push({
        id: `kesehatan-${item.id}`,
        tanggal: item.tanggal,
        title,
        description,
        icon:
          item.tipe === "vaksin"
            ? Syringe
            : HeartPulse,
      });
    });

    return aktivitas.sort(
      (a, b) =>
        new Date(b.tanggal) -
        new Date(a.tanggal)
    );
  };

  const aktivitas = buatAktivitas();

  /* =======================================================
     WHATSAPP REQUEST CODE
  ======================================================= */

  const handleMintaKodeLacak = () => {
    const pesan = `Halo Admin Juragan Kambing Sei Siak, saya ingin meminta kembali kode lacak ternak saya.

Nama:
Nomor WhatsApp:
Jenis ternak:

Mohon bantuannya untuk mendapatkan kembali kode lacak saya. Terima kasih.`;

    const url =
      `https://wa.me/${WA_ADMIN}?text=` +
      encodeURIComponent(pesan);

    window.open(url, "_blank");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative">
        <div className="relative h-[300px] sm:h-[350px] overflow-hidden">
          <img
            src={kambingImage}
            alt="Lacak Ternak"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-5 sm:px-8 lg:px-10 flex items-center">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm mb-4">
                <Activity size={14} />

                <span className="text-[10px] sm:text-xs font-semibold">
                  Monitoring Ternak
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                Lacak Ternak
              </h1>

              <p className="mt-3 text-sm sm:text-base text-white/90 max-w-xl">
                Pantau perkembangan dan kondisi ternak
                Anda dengan mudah menggunakan kode ternak.
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH BOX */}

        <div className="relative z-20 max-w-3xl mx-auto px-5 sm:px-8 -mt-7">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-card border border-line p-2"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 flex-1 px-3">
                <Search
                  size={19}
                  className="text-muted shrink-0"
                />

                <input
                  type="text"
                  value={kode}
                  onChange={(e) =>
                    setKode(e.target.value)
                  }
                  placeholder="Masukkan kode ternak..."
                  className="w-full h-12 outline-none text-sm text-ink placeholder:text-muted bg-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-12 px-5 sm:px-7 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-60"
              >
                {loading ? "Memuat..." : "Lacak"}
              </button>
            </div>
          </form>

          <p className="text-[11px] text-white/80 text-center mt-2">
            Masukkan kode lacak yang diberikan oleh admin.
          </p>
        </div>
      </section>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-12 pb-16">

        {/* =================================================
            INITIAL STATE
        ================================================= */}

        {!searched && (
          <section className="max-w-2xl mx-auto text-center py-10">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-tint flex items-center justify-center">
              <Search
                size={27}
                className="text-primary"
              />
            </div>

            <h2 className="font-heading text-xl sm:text-2xl font-bold text-ink mt-5">
              Masukkan Kode Ternak
            </h2>

            <p className="text-sm text-muted mt-2 leading-relaxed">
              Gunakan kode lacak yang diberikan untuk
              melihat informasi dan perkembangan ternak.
            </p>
          </section>
        )}

        {/* =================================================
            NOT FOUND
        ================================================= */}

        {searched && !ternakDitemukan && (
          <section className="max-w-2xl mx-auto py-8">
            <div className="bg-white border border-line rounded-2xl p-8 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center">
                <Search
                  size={22}
                  className="text-secondary"
                />
              </div>

              <h2 className="font-heading text-lg font-bold text-ink mt-4">
                Ternak Tidak Ditemukan
              </h2>

              <p className="text-sm text-muted mt-2">
                Kode ternak{" "}
                <span className="font-bold text-ink">
                  {kode.toUpperCase()}
                </span>{" "}
                belum ditemukan.
              </p>

              <p className="text-xs text-muted mt-1">
                Periksa kembali kode lacak yang Anda
                masukkan.
              </p>
            </div>

            {/* REQUEST CODE */}

            <div className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-tint text-primary">
                    <MessageCircle size={20} />
                  </div>

                  <div>
                    <h3 className="font-heading text-sm font-semibold text-ink">
                      Lupa Kode Lacak?
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-muted">
                      Hubungi admin melalui WhatsApp
                      untuk meminta kembali kode lacak
                      ternak Anda.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleMintaKodeLacak}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  <MessageCircle size={17} />
                  Minta Kode via WhatsApp
                </button>
              </div>
            </div>
          </section>
        )}

        {/* =================================================
            RESULT
        ================================================= */}

        {ternakDitemukan && (
          <section>

            {/* TITLE */}

            <div className="mb-6">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                Hasil Pelacakan
              </p>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink mt-1">
                Informasi Ternak
              </h2>
            </div>

            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <div className="bg-white border border-line rounded-2xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">

                {/* IMAGE */}

                <div className="relative h-56 md:h-full min-h-[250px]">
                  <img
                    src={
                      ternakDitemukan.image ||
                      kambingImage
                    }
                    alt={
                      ternakDitemukan.jenis ||
                      "Ternak"
                    }
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* INFO */}

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-primary">
                          {ternakDitemukan.kode_lacak ||
                            ternakDitemukan.kode ||
                            "-"}
                        </span>

                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold">
                          <CheckCircle2 size={11} />
                          Aktif
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-ink mt-2">
                        {ternakDitemukan.nama ||
                          ternakDitemukan.jenis ||
                          "Ternak"}
                      </h3>

                    </div>
                  </div>

                  {/* INFO GRID */}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-7">

                    <InfoItem
                      icon={Activity}
                      label="Jenis"
                      value={
                        ternakDitemukan.jenis || "-"
                      }
                    />

                    <InfoItem
                      icon={HeartPulse}
                      label="Ras"
                      value={
                        ternakDitemukan.ras || "-"
                      }
                    />

                    <InfoItem
                      icon={CalendarDays}
                      label="Tanggal Masuk"
                      value={formatTanggalLengkap(
                        ternakDitemukan.tanggal_masuk
                      )}
                    />

                    <InfoItem
                      icon={Scale}
                      label="Bobot Awal"
                      value={
                        ternakDitemukan.bobot_awal !==
                          null &&
                        ternakDitemukan.bobot_awal !==
                          undefined &&
                        ternakDitemukan.bobot_awal !==
                          ""
                          ? `${formatAngka(
                              ternakDitemukan.bobot_awal
                            )} kg`
                          : "-"
                      }
                    />

                  </div>

                  {/* OWNER INFO */}

                  {ternakDitemukan.tipe_titip && (
                    <div className="mt-6 pt-5 border-t border-line">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                        <div>
                          <span className="text-muted">
                            Status Kepemilikan
                          </span>

                          <p className="font-bold text-ink mt-1 capitalize">
                            {ternakDitemukan.tipe_titip ===
                            "fattening"
                              ? "Titip Fattening"
                              : ternakDitemukan.tipe_titip ===
                                "perah"
                              ? "Titip Perah"
                              : ternakDitemukan.tipe_titip}
                          </p>
                        </div>

                        {ternakDitemukan.pemilik_nama && (
                          <div>
                            <span className="text-muted">
                              Pemilik
                            </span>

                            <p className="font-bold text-ink mt-1">
                              {ternakDitemukan.pemilik_nama}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* =================================================
                STATUS + TABS
            ================================================= */}

            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 mt-6">

              {/* STATUS */}

              <aside className="bg-white border border-line rounded-2xl p-6">

                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Status Saat Ini
                </p>

                <div className="mt-5 p-4 rounded-xl bg-primary-tint">
                  <div className="flex items-center gap-2">

                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      <HeartPulse size={16} />
                    </div>

                    <div>
                      <p className="text-[10px] text-muted">
                        Kondisi
                      </p>

                      <p className="text-sm font-bold text-primary">
                        {getKondisiTerakhir(
                          riwayatKesehatan
                        )}
                      </p>
                    </div>

                  </div>
                </div>

                {/* BOBOT TERAKHIR */}

                <div className="mt-5">
                  <p className="text-xs text-muted">
                    Bobot Terakhir
                  </p>

                  <p className="font-heading text-2xl font-bold text-ink mt-1">
                    {getBobotTerakhir(
                      ternakDitemukan
                    ) !== null
                      ? `${formatAngka(
                          getBobotTerakhir(
                            ternakDitemukan
                          )
                        )} kg`
                      : "-"}
                  </p>
                </div>

                {/* PERTUMBUHAN */}

                <div className="mt-4">
                  <p className="text-xs text-muted">
                    Pertumbuhan
                  </p>

                  {getPertumbuhan(
                    ternakDitemukan
                  ) !== null ? (
                    <p
                      className={`text-sm font-bold mt-1 ${
                        getPertumbuhan(
                          ternakDitemukan
                        ) >= 0
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                    >
                      {getPertumbuhan(
                        ternakDitemukan
                      ) > 0
                        ? "+"
                        : ""}
                      {formatAngka(
                        getPertumbuhan(
                          ternakDitemukan
                        )
                      )}{" "}
                      kg
                    </p>
                  ) : (
                    <p className="text-sm font-bold text-muted mt-1">
                      -
                    </p>
                  )}
                </div>

              </aside>

              {/* TABS */}

              <section className="bg-white border border-line rounded-2xl overflow-hidden">

                {/* TAB HEADER */}

                <div className="px-6 pt-6">
                  <div className="flex gap-1 overflow-x-auto">

                    <TabButton
                      active={activeTab === "aktivitas"}
                      onClick={() =>
                        setActiveTab("aktivitas")
                      }
                      icon={Activity}
                      label="Riwayat Aktivitas"
                    />

                    <TabButton
                      active={activeTab === "kesehatan"}
                      onClick={() =>
                        setActiveTab("kesehatan")
                      }
                      icon={HeartPulse}
                      label="Kesehatan"
                    />

                    <TabButton
                      active={activeTab === "pakan"}
                      onClick={() =>
                        setActiveTab("pakan")
                      }
                      icon={Utensils}
                      label="Pakan"
                    />

                  </div>
                </div>

                <div className="border-t border-line p-6">

                  {/* =================================================
                      AKTIVITAS
                  ================================================= */}

                  {activeTab === "aktivitas" && (
                    <div className="space-y-5">

                      {aktivitas.length === 0 ? (
                        <EmptyState
                          icon={ClipboardList}
                          title="Belum ada aktivitas"
                          description="Belum ada riwayat aktivitas untuk ternak ini."
                        />
                      ) : (
                        aktivitas.map(
                          (item, index) => {
                            const Icon =
                              item.icon;

                            return (
                              <div
                                key={item.id}
                                className="flex gap-4"
                              >

                                <div className="flex flex-col items-center">

                                  <div className="w-9 h-9 rounded-full bg-primary-tint text-primary flex items-center justify-center shrink-0">
                                    <Icon size={16} />
                                  </div>

                                  {index !==
                                    aktivitas.length -
                                      1 && (
                                    <div className="w-px flex-1 bg-line mt-2" />
                                  )}

                                </div>

                                <div className="pb-2">

                                  <p className="text-[10px] font-semibold text-primary">
                                    {formatTanggal(
                                      item.tanggal
                                    )}
                                  </p>

                                  <h4 className="text-sm font-bold text-ink mt-1">
                                    {item.title}
                                  </h4>

                                  <p className="text-xs text-muted mt-1">
                                    {item.description}
                                  </p>

                                </div>

                              </div>
                            );
                          }
                        )
                      )}

                    </div>
                  )}

                  {/* =================================================
                      KESEHATAN
                  ================================================= */}

                  {activeTab === "kesehatan" && (
                    <div>

                      {riwayatKesehatan.length ===
                      0 ? (
                        <EmptyState
                          icon={HeartPulse}
                          title="Belum ada data kesehatan"
                          description="Belum ada catatan pemeriksaan kesehatan untuk ternak ini."
                        />
                      ) : (
                        <div className="space-y-3">

                          {riwayatKesehatan.map(
                            (item) => (
                              <div
                                key={item.id}
                                className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-line"
                              >

                                <div className="w-9 h-9 rounded-full bg-primary-tint text-primary flex items-center justify-center shrink-0">
                                  {item.tipe ===
                                  "vaksin" ? (
                                    <Syringe
                                      size={16}
                                    />
                                  ) : (
                                    <HeartPulse
                                      size={16}
                                    />
                                  )}
                                </div>

                                <div className="flex-1">

                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">

                                    <h4 className="text-sm font-bold text-ink capitalize">
                                      {item.tipe ===
                                      "periksa"
                                        ? "Pemeriksaan Rutin"
                                        : item.tipe}
                                    </h4>

                                    <span className="text-[10px] text-primary font-semibold">
                                      {formatTanggal(
                                        item.tanggal
                                      )}
                                    </span>

                                  </div>

                                  {item.catatan && (
                                    <p className="text-xs text-muted mt-1">
                                      {item.catatan}
                                    </p>
                                  )}

                                  {item.tanggal_berikutnya && (
                                    <p className="text-[11px] text-amber-700 mt-2">
                                      Jadwal berikutnya:{" "}
                                      {formatTanggal(
                                        item.tanggal_berikutnya
                                      )}
                                    </p>
                                  )}

                                </div>

                              </div>
                            )
                          )}

                        </div>
                      )}

                    </div>
                  )}

                  {/* =================================================
                      PAKAN
                  ================================================= */}

                  {activeTab === "pakan" && (
                    <EmptyState
                      icon={Utensils}
                      title="Belum ada data pakan"
                      description="Riwayat pakan untuk ternak ini belum tersedia pada sistem."
                    />
                  )}

                </div>
              </section>
            </div>

            {/* =================================================
                LOCATION
            ================================================= */}

            <section className="mt-6">

              <div className="bg-white border border-line rounded-2xl p-6">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-primary-tint text-primary flex items-center justify-center">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-xs text-muted">
                        Lokasi Kandang
                      </p>

                      <h3 className="text-sm font-bold text-ink mt-0.5">
                        Kandang Utama
                      </h3>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="hidden sm:flex w-12 h-12 rounded-lg border border-line items-center justify-center">
                      <QrCode
                        size={27}
                        className="text-ink"
                      />
                    </div>

                    <span className="text-xs text-muted">
                      Scan QR untuk detail ternak
                    </span>

                  </div>

                </div>

                <div className="mt-5 h-40 rounded-xl bg-[#EEF2EF] border border-line flex items-center justify-center">

                  <div className="text-center">

                    <MapPin
                      size={27}
                      className="mx-auto text-primary"
                    />

                    <p className="text-xs font-bold text-ink mt-2">
                      Kandang Utama
                    </p>

                    <p className="text-[10px] text-muted mt-1">
                      Fuel Terminal Sei Siak
                    </p>

                  </div>

                </div>

              </div>

            </section>

          </section>
        )}

        {/* =================================================
            WHATSAPP REQUEST CODE
            TAMPIL JUGA SAAT BELUM SEARCH
        ================================================= */}

        {!searched && (
          <div className="max-w-3xl mx-auto mt-4 rounded-2xl border border-line bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-tint text-primary">
                  <MessageCircle size={20} />
                </div>

                <div>

                  <h3 className="font-heading text-sm font-semibold text-ink">
                    Lupa Kode Lacak?
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted">
                    Hubungi admin melalui WhatsApp
                    untuk meminta kembali kode lacak
                    ternak Anda.
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={handleMintaKodeLacak}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                <MessageCircle size={17} />
                Minta Kode via WhatsApp
              </button>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

/* =========================================================
   COMPONENT: INFO ITEM
========================================================= */

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div>

      <div className="flex items-center gap-1.5 text-muted">
        {Icon && <Icon size={15} />}

        <p className="text-[10px] sm:text-xs">
          {label}
        </p>
      </div>

      <p className="text-xs sm:text-sm font-bold text-ink mt-1">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   COMPONENT: TAB BUTTON
========================================================= */

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-colors ${
        active
          ? "bg-primary text-white"
          : "text-muted hover:text-primary hover:bg-primary-tint"
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

/* =========================================================
   COMPONENT: EMPTY STATE
========================================================= */

function EmptyState({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="py-8 text-center">

      <div className="w-12 h-12 mx-auto rounded-xl bg-primary-tint text-primary flex items-center justify-center">
        <Icon size={23} />
      </div>

      <h3 className="font-heading text-sm font-bold text-ink mt-3">
        {title}
      </h3>

      <p className="text-xs text-muted mt-1 max-w-md mx-auto">
        {description}
      </p>

    </div>
  );
}