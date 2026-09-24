import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  Package,
  Eye,
  X,
  Syringe,
  AlertTriangle,
  MessageCircle,
  Copy,
  CalendarDays,
  UserRound,
  ClipboardCheck,
  Activity,
  Scale,
} from "lucide-react";

import AdminLayout from "../../components/AdminLayout";
import { useTernak } from "../../context/TernakContext";
import { tentukanTahap, formatUmur } from "../../utils/siklusTernak";

const BADGE_WARNA = {
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
};

const PAGE_INFO = {
  kambing: {
    title: "Ternak Kambing",
    subtitle: "Kelola data ternak kambing Juragan Kambing Sei Siak.",
    icon: "🐐",
  },

  ayam: {
    title: "Ternak Ayam",
    subtitle: "Kelola data ternak ayam Juragan Kambing Sei Siak.",
    icon: "🐔",
  },
};

const EMPTY_FORM = {
  jenis: "",
  ras: "",
  kode: "",
  tanggal_masuk: "",
  bobot_awal: "",
  bobot_akhir: "",
  catatan: "",
  tipe_titip: "",
  pemilik_nama: "",
  pemilik_wa: "",
};

const EMPTY_KESEHATAN = {
  tanggal: "",
  tipe: "vaksin",
  catatan: "",
  tanggal_berikutnya: "",
};

export default function KelolaTernak() {
  const { kategori } = useParams();

  const {
    getByKategori,
    getKesehatanByTernak,
    addTernak,
    editTernak,
    deleteTernak,
    addKesehatan,
    deleteKesehatan,
  } = useTernak();

  const list = getByKategori(kategori);

  const pageInfo =
    PAGE_INFO[kategori] || {
      title: "Kelola Ternak",
      subtitle: "Kelola data ternak Juragan Kambing Sei Siak.",
      icon: "📦",
    };

  // =========================================================
  // STATE
  // =========================================================

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTernak, setEditingTernak] = useState(null);

  const [detailTernak, setDetailTernak] = useState(null);

  const [expandedId, setExpandedId] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);

  const [formKesehatan, setFormKesehatan] =
    useState(EMPTY_KESEHATAN);

  // =========================================================
  // TANGGAL
  // =========================================================

  const hariIni = new Date().toISOString().slice(0, 10);

  // =========================================================
  // BOBOT
  // =========================================================

  function hitungPertumbuhan(t) {
    const awal = Number(t.bobot_awal);
    const akhir = Number(t.bobot_akhir);

    if (
      !Number.isFinite(awal) ||
      !Number.isFinite(akhir)
    ) {
      return null;
    }

    return akhir - awal;
  }

  function formatBobot(value) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "-";
    }

    return `${Number(value).toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    })} kg`;
  }

  function formatPertumbuhan(t) {
    const pertumbuhan = hitungPertumbuhan(t);

    if (pertumbuhan === null) {
      return "-";
    }

    if (pertumbuhan > 0) {
      return `+${pertumbuhan.toLocaleString("id-ID", {
        maximumFractionDigits: 2,
      })} kg`;
    }

    return `${pertumbuhan.toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    })} kg`;
  }

  // =========================================================
  // JATUH TEMPO KESEHATAN
  // =========================================================

  function addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);

    return d.toISOString().slice(0, 10);
  }

  function kesehatanJatuhTempo() {
    const batasTanggal = addDays(hariIni, 7);

    const semua = list.flatMap((t) =>
      getKesehatanByTernak(t.id).map((k) => ({
        ...k,
        ternak: t,
      }))
    );

    return semua.filter(
      (k) =>
        k.tanggal_berikutnya &&
        k.tanggal_berikutnya <= batasTanggal
    );
  }

  const jatuhTempo = kesehatanJatuhTempo();

  // =========================================================
  // STATISTIK
  // =========================================================

  const totalTernak = list.length;

  const totalTitipan = list.filter(
    (t) => t.tipe_titip
  ).length;

  const totalMilikSendiri = list.filter(
    (t) => !t.tipe_titip
  ).length;

  const totalKesehatan = list.reduce(
    (total, t) =>
      total + getKesehatanByTernak(t.id).length,
    0
  );

  // =========================================================
  // TAMBAH
  // =========================================================

  function handleAdd() {
    setEditingTernak(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  // =========================================================
  // EDIT
  // =========================================================

  function handleEdit(ternak) {
    setEditingTernak(ternak);

    setForm({
      jenis: ternak.jenis || "",
      ras: ternak.ras || "",
      kode: ternak.kode || "",
      tanggal_masuk: ternak.tanggal_masuk || "",
      bobot_awal: ternak.bobot_awal ?? "",
      bobot_akhir: ternak.bobot_akhir ?? "",
      catatan: ternak.catatan || "",
      tipe_titip: ternak.tipe_titip || "",
      pemilik_nama: ternak.pemilik_nama || "",
      pemilik_wa: ternak.pemilik_wa || "",
    });

    setModalOpen(true);
  }

  // =========================================================
  // SIMPAN TAMBAH / EDIT
  // =========================================================

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.jenis ||
      !form.kode ||
      !form.tanggal_masuk
    ) {
      alert(
        "Jenis, kode, dan tanggal masuk wajib diisi."
      );
      return;
    }

    if (
      form.tipe_titip &&
      (!form.pemilik_nama || !form.pemilik_wa)
    ) {
      alert(
        "Nama dan nomor WA pemilik wajib diisi kalau ini ternak titipan."
      );
      return;
    }

    const payload = {
      kategori,
      jenis: form.jenis,
      ras: form.ras || null,
      kode: form.kode,
      tanggal_masuk: form.tanggal_masuk,

      bobot_awal: form.bobot_awal
        ? Number(form.bobot_awal)
        : null,

      bobot_akhir: form.bobot_akhir
        ? Number(form.bobot_akhir)
        : null,

      catatan: form.catatan,

      tipe_titip: form.tipe_titip || null,

      pemilik_nama: form.tipe_titip
        ? form.pemilik_nama
        : null,

      pemilik_wa: form.tipe_titip
        ? form.pemilik_wa
        : null,
    };

    let res;

    if (editingTernak) {
      res = await editTernak(
        editingTernak.id,
        payload
      );
    } else {
      res = await addTernak(payload);
    }

    if (res?.ok) {
      closeModal();
    }
  }

  // =========================================================
  // HAPUS
  // =========================================================

  function handleDelete(t) {
    const ok = window.confirm(
      `Apakah kamu yakin ingin menghapus data ternak "${t.kode}"?\n\nRiwayat kesehatan ternak ini juga akan ikut terhapus jika database menggunakan relasi cascade.`
    );

    if (!ok) return;

    deleteTernak(t.id);

    if (detailTernak?.id === t.id) {
      setDetailTernak(null);
    }

    if (expandedId === t.id) {
      setExpandedId(null);
    }
  }

  // =========================================================
  // TUTUP MODAL
  // =========================================================

  function closeModal() {
    setModalOpen(false);
    setEditingTernak(null);
    setForm(EMPTY_FORM);
  }

  // =========================================================
  // DETAIL
  // =========================================================

  function openDetail(t) {
    setDetailTernak(t);
  }

  function closeDetail() {
    setDetailTernak(null);
  }

  // =========================================================
  // KESEHATAN
  // =========================================================

  async function handleSubmitKesehatan(
    e,
    ternakId
  ) {
    e.preventDefault();

    if (
      !formKesehatan.tanggal ||
      !formKesehatan.tipe
    ) {
      alert("Tanggal dan tipe wajib diisi.");
      return;
    }

    const res = await addKesehatan({
      ternak_id: ternakId,
      tanggal: formKesehatan.tanggal,
      tipe: formKesehatan.tipe,
      catatan: formKesehatan.catatan,
      tanggal_berikutnya:
        formKesehatan.tanggal_berikutnya || null,
    });

    if (res?.ok) {
      setFormKesehatan(EMPTY_KESEHATAN);
    }
  }

  function toggleKesehatan(id) {
    setExpandedId(
      expandedId === id ? null : id
    );

    setFormKesehatan(EMPTY_KESEHATAN);
  }

  // =========================================================
  // WHATSAPP
  // =========================================================

  function waLinkKirimKode(t) {
    const nomor =
      t.pemilik_wa?.replace(/\D/g, "") || "";

    const pesan = `Halo ${t.pemilik_nama}, terima kasih sudah menitipkan ${t.kode} di Juragan Kambing Sei Siak. Kode lacak Anda: ${t.kode_lacak}. Simpan kode ini untuk memantau perkembangan ternak Anda kapan saja lewat website kami di halaman "Lacak Ternak".`;

    return `https://wa.me/${nomor}?text=${encodeURIComponent(
      pesan
    )}`;
  }

  // =========================================================
  // COPY KODE
  // =========================================================

  function copyKode(kode) {
    if (!kode) return;

    navigator.clipboard
      .writeText(kode)
      .then(() => {
        alert("Kode lacak disalin: " + kode);
      })
      .catch(() => {
        alert("Gagal menyalin kode lacak.");
      });
  }

  // =========================================================
  // LABEL TIPE TITIP
  // =========================================================

  function formatTipeTitip(tipe) {
    if (tipe === "fattening") {
      return "Titip Fattening";
    }

    if (tipe === "perah") {
      return "Titip Perah";
    }

    return tipe || "-";
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

            <div>

              <div className="flex items-center gap-3 mb-3">

                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl">
                  {pageInfo.icon}
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Admin Panel
                  </p>

                  <h1 className="text-2xl sm:text-3xl font-bold text-ink font-heading">
                    {pageInfo.title}
                  </h1>

                </div>

              </div>

              <p className="text-sm text-muted">
                {pageInfo.subtitle}
              </p>

            </div>

            <button
              onClick={handleAdd}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-primary
                hover:bg-primary-dark
                text-white
                px-5
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                shadow-sm
                transition-all
                hover:-translate-y-0.5
              "
            >
              <Plus size={17} />
              Tambah Ternak
            </button>

          </div>

        </div>


        {/* =====================================================
            STATISTIK
        ====================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

          {/* TOTAL */}

          <div className="bg-white border border-line rounded-2xl p-5 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center">
                <Package
                  size={21}
                  className="text-primary"
                />
              </div>

              <div>

                <p className="text-xs text-muted uppercase tracking-wide">
                  Total Ternak
                </p>

                <p className="text-2xl font-bold text-ink">
                  {totalTernak}
                </p>

              </div>

            </div>

          </div>


          {/* TITIPAN */}

          <div className="bg-white border border-line rounded-2xl p-5 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-secondary-tint flex items-center justify-center">
                <UserRound
                  size={21}
                  className="text-secondary-dark"
                />
              </div>

              <div>

                <p className="text-xs text-muted uppercase tracking-wide">
                  Ternak Titipan
                </p>

                <p className="text-2xl font-bold text-ink">
                  {totalTitipan}
                </p>

              </div>

            </div>

          </div>


          {/* MILIK SENDIRI */}

          <div className="bg-white border border-line rounded-2xl p-5 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <ClipboardCheck
                  size={21}
                  className="text-blue-600"
                />
              </div>

              <div>

                <p className="text-xs text-muted uppercase tracking-wide">
                  Milik Sendiri
                </p>

                <p className="text-2xl font-bold text-ink">
                  {totalMilikSendiri}
                </p>

              </div>

            </div>

          </div>


          {/* KESEHATAN */}

          <div className="bg-white border border-line rounded-2xl p-5 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <Activity
                  size={21}
                  className="text-amber-600"
                />
              </div>

              <div>

                <p className="text-xs text-muted uppercase tracking-wide">
                  Catatan Kesehatan
                </p>

                <p className="text-2xl font-bold text-ink">
                  {totalKesehatan}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            PERINGATAN KESEHATAN
        ====================================================== */}

        {jatuhTempo.length > 0 && (

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">

            <div className="flex items-start gap-3">

              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">

                <AlertTriangle
                  size={18}
                  className="text-amber-700"
                />

              </div>

              <div className="flex-1">

                <p className="text-sm font-bold text-amber-800">
                  {jatuhTempo.length} jadwal vaksin/periksa mendekat atau terlewat
                </p>

                <p className="text-xs text-amber-700 mt-1 mb-3">
                  Periksa kembali jadwal kesehatan ternak berikut.
                </p>

                <div className="space-y-2">

                  {jatuhTempo.map((k) => (

                    <div
                      key={k.id}
                      className="bg-white/70 border border-amber-200 rounded-lg px-3 py-2 text-sm text-amber-800"
                    >

                      <span className="font-semibold">
                        {k.ternak.kode}
                      </span>

                      {" — "}

                      jatuh tempo {k.tanggal_berikutnya}

                      {k.tanggal_berikutnya < hariIni && (

                        <span className="font-semibold">
                          {" "}
                          (terlewat)
                        </span>

                      )}

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        )}


        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-white border border-line flex items-center justify-center">

                <Package
                  size={19}
                  className="text-primary"
                />

              </div>

              <div>

                <h2 className="text-lg font-bold text-ink">
                  Daftar Ternak
                </h2>

                <p className="text-xs text-muted">
                  {list.length} data ternak
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {list.length === 0 ? (

          <div className="bg-white border border-line rounded-2xl p-12 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-cream flex items-center justify-center mb-4">

              <Package
                size={28}
                className="text-muted"
              />

            </div>

            <h3 className="font-bold text-ink text-lg">
              Belum ada data ternak
            </h3>

            <p className="text-sm text-muted mt-1 mb-5">
              Tambahkan data ternak pertama untuk kategori ini.
            </p>

            <button
              onClick={handleAdd}
              className="
                inline-flex
                items-center
                gap-2
                bg-primary
                hover:bg-primary-dark
                text-white
                px-5
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                transition-colors
              "
            >
              <Plus size={16} />
              Tambah Ternak
            </button>

          </div>

        ) : (

          /* =====================================================
             LIST TERNAK
          ====================================================== */

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {list.map((t) => {

              const tahap = tentukanTahap(
                t.kategori,
                t.tanggal_masuk
              );

              const riwayat =
                getKesehatanByTernak(t.id);

              const isExpanded =
                expandedId === t.id;

              return (

                <div
                  key={t.id}
                  className="
                    bg-white
                    border
                    border-line
                    rounded-2xl
                    overflow-hidden
                    shadow-sm
                    hover:shadow-md
                    transition-shadow
                  "
                >

                  {/* =================================================
                      CARD HEADER
                  ================================================== */}

                  <div className="p-5">

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <div className="flex items-center gap-2 flex-wrap">

                          <h3 className="font-bold text-ink text-lg">
                            {t.kode || "Tanpa kode"}
                          </h3>

                          {tahap?.label && (

                            <span
                              className={`
                                text-xs
                                font-semibold
                                px-2.5
                                py-1
                                rounded-full
                                ${
                                  BADGE_WARNA[
                                    tahap.warna
                                  ] ||
                                  "bg-gray-100 text-gray-700"
                                }
                              `}
                            >
                              {tahap.label}
                            </span>

                          )}

                          {t.tipe_titip && (

                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary-tint text-secondary-dark">
                              {formatTipeTitip(
                                t.tipe_titip
                              )}
                            </span>

                          )}

                        </div>

                        <p className="text-sm text-muted mt-1">
                          {t.jenis || "-"}
                        </p>

                      </div>

                    </div>


                    {/* =================================================
                        INFORMASI UTAMA
                    ================================================== */}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">

                      {/* RAS */}

                      <div className="border border-line rounded-xl p-3">

                        <div className="flex items-center gap-2 mb-1">

                          <ClipboardCheck
                            size={14}
                            className="text-primary"
                          />

                          <span className="text-[11px] uppercase tracking-wide font-semibold text-muted">
                            Ras
                          </span>

                        </div>

                        <p className="text-sm font-semibold text-ink">
                          {t.ras || "-"}
                        </p>

                      </div>


                      {/* BOBOT AWAL */}

                      <div className="border border-line rounded-xl p-3">

                        <div className="flex items-center gap-2 mb-1">

                          <Scale
                            size={14}
                            className="text-primary"
                          />

                          <span className="text-[11px] uppercase tracking-wide font-semibold text-muted">
                            Bobot Awal
                          </span>

                        </div>

                        <p className="text-sm font-semibold text-ink">
                          {formatBobot(
                            t.bobot_awal
                          )}
                        </p>

                      </div>


                      {/* BOBOT AKHIR */}

                      <div className="border border-line rounded-xl p-3">

                        <div className="flex items-center gap-2 mb-1">

                          <Scale
                            size={14}
                            className="text-primary"
                          />

                          <span className="text-[11px] uppercase tracking-wide font-semibold text-muted">
                            Bobot Akhir
                          </span>

                        </div>

                        <p className="text-sm font-semibold text-ink">
                          {formatBobot(
                            t.bobot_akhir
                          )}
                        </p>

                      </div>


                      {/* PERTUMBUHAN */}

                      <div className="border border-line rounded-xl p-3">

                        <div className="flex items-center gap-2 mb-1">

                          <Activity
                            size={14}
                            className="text-primary"
                          />

                          <span className="text-[11px] uppercase tracking-wide font-semibold text-muted">
                            Pertumbuhan
                          </span>

                        </div>

                        <p
                          className={`text-sm font-semibold ${
                            hitungPertumbuhan(t) > 0
                              ? "text-primary"
                              : "text-ink"
                          }`}
                        >
                          {formatPertumbuhan(t)}
                        </p>

                      </div>

                    </div>


                    {/* =================================================
                        UMUR + TANGGAL MASUK
                    ================================================== */}

                    <div className="grid grid-cols-2 gap-3 mt-3">

                      {/* UMUR */}

                      <div className="border border-line rounded-xl p-3">

                        <div className="flex items-center gap-2 mb-1">

                          <Activity
                            size={14}
                            className="text-primary"
                          />

                          <span className="text-[11px] uppercase tracking-wide font-semibold text-muted">
                            Umur
                          </span>

                        </div>

                        <p className="text-sm font-semibold text-ink">
                          {tahap?.umurHari !==
                          undefined
                            ? formatUmur(
                                tahap.umurHari
                              )
                            : "-"}
                        </p>

                      </div>


                      {/* TANGGAL MASUK */}

                      <div className="border border-line rounded-xl p-3">

                        <div className="flex items-center gap-2 mb-1">

                          <CalendarDays
                            size={14}
                            className="text-primary"
                          />

                          <span className="text-[11px] uppercase tracking-wide font-semibold text-muted">
                            Tanggal Masuk
                          </span>

                        </div>

                        <p className="text-sm font-semibold text-ink">
                          {t.tanggal_masuk ||
                            "-"}
                        </p>

                      </div>

                    </div>


                    {/* =================================================
                        TITIPAN
                    ================================================== */}

                    {t.tipe_titip && (

                      <div className="mt-4 p-3 bg-cream rounded-xl">

                        <div className="flex items-center justify-between gap-3">

                          <div className="min-w-0">

                            <p className="text-[11px] uppercase tracking-wide font-semibold text-muted">
                              Pemilik
                            </p>

                            <p className="text-sm font-semibold text-ink truncate">
                              {t.pemilik_nama ||
                                "-"}
                            </p>

                          </div>

                          {t.pemilik_wa && (

                            <a
                              href={waLinkKirimKode(
                                t
                              )}
                              target="_blank"
                              rel="noreferrer"
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                text-xs
                                font-semibold
                                text-green-700
                                hover:text-green-800
                                shrink-0
                              "
                            >
                              <MessageCircle
                                size={14}
                              />
                              WhatsApp
                            </a>

                          )}

                        </div>


                        {t.kode_lacak && (

                          <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-line">

                            <div>

                              <p className="text-[11px] uppercase tracking-wide font-semibold text-muted">
                                Kode Lacak
                              </p>

                              <p className="text-sm font-mono font-bold text-ink">
                                {t.kode_lacak}
                              </p>

                            </div>

                            <button
                              onClick={() =>
                                copyKode(
                                  t.kode_lacak
                                )
                              }
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                px-3
                                py-2
                                rounded-lg
                                bg-white
                                border
                                border-line
                                text-xs
                                font-semibold
                                text-ink
                                hover:bg-gray-50
                              "
                            >
                              <Copy
                                size={13}
                              />
                              Salin
                            </button>

                          </div>

                        )}

                      </div>

                    )}


                    {/* =================================================
                        ACTION
                    ================================================== */}

                    <div className="grid grid-cols-4 gap-2 mt-5">

                      {/* DETAIL */}

                      <button
                        onClick={() =>
                          openDetail(t)
                        }
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-1.5
                          border
                          border-line
                          text-ink
                          hover:bg-gray-50
                          px-2
                          py-2.5
                          rounded-lg
                          text-xs
                          font-semibold
                          transition-colors
                        "
                      >
                        <Eye size={14} />
                        <span>Detail</span>
                      </button>


                      {/* KESEHATAN */}

                      <button
                        onClick={() =>
                          toggleKesehatan(t.id)
                        }
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-1.5
                          bg-blue-50
                          text-blue-700
                          hover:bg-blue-600
                          hover:text-white
                          px-2
                          py-2.5
                          rounded-lg
                          text-xs
                          font-semibold
                          transition-colors
                        "
                      >
                        <Syringe size={14} />
                        <span>
                          {riwayat.length}
                        </span>
                      </button>


                      {/* EDIT */}

                      <button
                        onClick={() =>
                          handleEdit(t)
                        }
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-1.5
                          bg-primary-light
                          text-primary
                          hover:bg-primary
                          hover:text-white
                          px-2
                          py-2.5
                          rounded-lg
                          text-xs
                          font-semibold
                          transition-colors
                        "
                      >
                        <Pencil size={14} />
                        <span>Edit</span>
                      </button>


                      {/* HAPUS */}

                      <button
                        onClick={() =>
                          handleDelete(t)
                        }
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-1.5
                          bg-red-50
                          text-red-600
                          hover:bg-red-600
                          hover:text-white
                          px-2
                          py-2.5
                          rounded-lg
                          text-xs
                          font-semibold
                          transition-colors
                        "
                      >
                        <Trash2 size={14} />
                        <span>Hapus</span>
                      </button>

                    </div>

                  </div>


                  {/* =================================================
                      RIWAYAT KESEHATAN
                  ================================================== */}

                  {isExpanded && (

                    <div className="border-t border-line bg-cream/50 p-5 space-y-4">

                      <div>

                        <p className="text-sm font-bold text-ink">
                          Riwayat Kesehatan
                        </p>

                        <p className="text-xs text-muted mt-1">
                          Tambahkan vaksin, pemeriksaan, penyakit, atau obat.
                        </p>

                      </div>


                      {/* FORM KESEHATAN */}

                      <form
                        onSubmit={(e) =>
                          handleSubmitKesehatan(
                            e,
                            t.id
                          )
                        }
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >

                        <div>

                          <label className="block text-xs font-semibold text-muted mb-1">
                            Tanggal
                          </label>

                          <input
                            type="date"
                            value={
                              formKesehatan.tanggal
                            }
                            onChange={(e) =>
                              setFormKesehatan({
                                ...formKesehatan,
                                tanggal:
                                  e.target.value,
                              })
                            }
                            className="w-full px-3 py-2.5 rounded-lg border border-line bg-white text-sm"
                          />

                        </div>


                        <div>

                          <label className="block text-xs font-semibold text-muted mb-1">
                            Jenis
                          </label>

                          <select
                            value={
                              formKesehatan.tipe
                            }
                            onChange={(e) =>
                              setFormKesehatan({
                                ...formKesehatan,
                                tipe: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2.5 rounded-lg border border-line bg-white text-sm"
                          >

                            <option value="vaksin">
                              Vaksin
                            </option>

                            <option value="sakit">
                              Sakit
                            </option>

                            <option value="obat">
                              Obat
                            </option>

                            <option value="periksa">
                              Periksa rutin
                            </option>

                          </select>

                        </div>


                        <div>

                          <label className="block text-xs font-semibold text-muted mb-1">
                            Catatan
                          </label>

                          <input
                            type="text"
                            value={
                              formKesehatan.catatan
                            }
                            onChange={(e) =>
                              setFormKesehatan({
                                ...formKesehatan,
                                catatan:
                                  e.target.value,
                              })
                            }
                            placeholder="Contoh: vaksin PMK"
                            className="w-full px-3 py-2.5 rounded-lg border border-line bg-white text-sm"
                          />

                        </div>


                        <div>

                          <label className="block text-xs font-semibold text-muted mb-1">
                            Jadwal Berikutnya
                          </label>

                          <input
                            type="date"
                            value={
                              formKesehatan.tanggal_berikutnya
                            }
                            onChange={(e) =>
                              setFormKesehatan({
                                ...formKesehatan,
                                tanggal_berikutnya:
                                  e.target.value,
                              })
                            }
                            className="w-full px-3 py-2.5 rounded-lg border border-line bg-white text-sm"
                          />

                        </div>


                        <button
                          type="submit"
                          className="
                            sm:col-span-2
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            bg-primary
                            hover:bg-primary-dark
                            text-white
                            px-4
                            py-2.5
                            rounded-lg
                            text-sm
                            font-semibold
                            transition-colors
                          "
                        >
                          <Plus size={15} />
                          Tambah Catatan Kesehatan
                        </button>

                      </form>


                      {/* RIWAYAT */}

                      <div className="space-y-2">

                        {riwayat.map((k) => (

                          <div
                            key={k.id}
                            className="
                              flex
                              items-start
                              justify-between
                              gap-3
                              bg-white
                              border
                              border-line
                              rounded-xl
                              p-3
                            "
                          >

                            <div className="min-w-0">

                              <div className="flex items-center gap-2 flex-wrap">

                                <span className="text-xs font-bold uppercase tracking-wide text-primary">
                                  {k.tipe}
                                </span>

                                <span className="text-xs text-muted">
                                  {k.tanggal}
                                </span>

                              </div>

                              {k.catatan && (

                                <p className="text-sm text-ink mt-1">
                                  {k.catatan}
                                </p>

                              )}

                              {k.tanggal_berikutnya && (

                                <p className="text-xs text-amber-700 mt-1">
                                  Jadwal berikutnya:{" "}
                                  {k.tanggal_berikutnya}
                                </p>

                              )}

                            </div>

                            <button
                              onClick={() =>
                                deleteKesehatan(
                                  k.id
                                )
                              }
                              className="
                                w-8
                                h-8
                                shrink-0
                                flex
                                items-center
                                justify-center
                                rounded-lg
                                text-red-600
                                hover:bg-red-50
                              "
                              title="Hapus catatan"
                            >
                              <Trash2 size={14} />
                            </button>

                          </div>

                        ))}

                        {riwayat.length === 0 && (

                          <div className="bg-white border border-line rounded-xl p-5 text-center">

                            <p className="text-sm text-muted">
                              Belum ada riwayat kesehatan.
                            </p>

                          </div>

                        )}

                      </div>

                    </div>

                  )}

                </div>

              );

            })}

          </div>

        )}


      </div>


      {/* =========================================================
          MODAL TAMBAH / EDIT TERNAK
      ========================================================== */}

      {modalOpen && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-sm
            p-4
          "
          onClick={closeModal}
        >

          <div
            className="
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              bg-white
              rounded-2xl
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="flex items-center justify-between p-5 border-b border-line">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  {editingTernak
                    ? "Edit Data"
                    : "Tambah Data"}
                </p>

                <h2 className="text-xl font-bold text-ink font-heading mt-1">
                  {editingTernak
                    ? "Edit Ternak"
                    : "Tambah Ternak"}
                </h2>

              </div>

              <button
                onClick={closeModal}
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-muted
                  hover:bg-gray-100
                  hover:text-ink
                "
              >
                <X size={20} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-5 space-y-5"
            >

              {/* =================================================
                  DATA DASAR
              ================================================== */}

              <div>

                <p className="text-sm font-bold text-ink mb-3">
                  Data Dasar Ternak
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* JENIS */}

                  <div>

                    <label className="block text-sm font-semibold text-ink mb-1">
                      Jenis Ternak
                    </label>

                    <input
                      type="text"
                      value={form.jenis}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          jenis: e.target.value,
                        })
                      }
                      placeholder={
                        kategori === "kambing"
                          ? "Contoh: Kambing Perah"
                          : "Contoh: Ayam Pedaging"
                      }
                      className="
                        w-full
                        px-3
                        py-2.5
                        rounded-lg
                        border
                        border-line
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-primary/20
                        focus:border-primary
                      "
                    />

                  </div>


                  {/* RAS */}

                  <div>

                    <label className="block text-sm font-semibold text-ink mb-1">
                      Ras
                    </label>

                    <input
                      type="text"
                      value={form.ras}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          ras: e.target.value,
                        })
                      }
                      placeholder={
                        kategori === "kambing"
                          ? "Contoh: Etawa"
                          : "Contoh: Kampung"
                      }
                      className="
                        w-full
                        px-3
                        py-2.5
                        rounded-lg
                        border
                        border-line
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-primary/20
                        focus:border-primary
                      "
                    />

                  </div>


                  {/* KODE */}

                  <div>

                    <label className="block text-sm font-semibold text-ink mb-1">
                      Kode / Nama
                    </label>

                    <input
                      type="text"
                      value={form.kode}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          kode: e.target.value,
                        })
                      }
                      placeholder={
                        kategori === "kambing"
                          ? "Contoh: K-001"
                          : "Contoh: A-001"
                      }
                      className="
                        w-full
                        px-3
                        py-2.5
                        rounded-lg
                        border
                        border-line
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-primary/20
                        focus:border-primary
                      "
                    />

                  </div>


                  {/* TANGGAL */}

                  <div>

                    <label className="block text-sm font-semibold text-ink mb-1">
                      Tanggal Masuk
                    </label>

                    <input
                      type="date"
                      value={form.tanggal_masuk}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          tanggal_masuk:
                            e.target.value,
                        })
                      }
                      className="
                        w-full
                        px-3
                        py-2.5
                        rounded-lg
                        border
                        border-line
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-primary/20
                        focus:border-primary
                      "
                    />

                  </div>

                </div>

              </div>


              {/* =================================================
                  DATA BOBOT
              ================================================== */}

              <div className="pt-4 border-t border-line">

                <div className="flex items-center gap-2 mb-1">

                  <Scale
                    size={17}
                    className="text-primary"
                  />

                  <p className="text-sm font-bold text-ink">
                    Data Bobot
                  </p>

                </div>

                <p className="text-xs text-muted mb-3">
                  Bobot bersifat opsional. Pertumbuhan dihitung otomatis dari bobot awal dan bobot akhir.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* BOBOT AWAL */}

                  <div>

                    <label className="block text-sm font-semibold text-ink mb-1">
                      Bobot Awal (kg)
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={form.bobot_awal}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          bobot_awal:
                            e.target.value,
                        })
                      }
                      placeholder="Contoh: 31.5"
                      className="
                        w-full
                        px-3
                        py-2.5
                        rounded-lg
                        border
                        border-line
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-primary/20
                        focus:border-primary
                      "
                    />

                  </div>


                  {/* BOBOT AKHIR */}

                  <div>

                    <label className="block text-sm font-semibold text-ink mb-1">
                      Bobot Akhir (kg)
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={form.bobot_akhir}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          bobot_akhir:
                            e.target.value,
                        })
                      }
                      placeholder="Contoh: 34.2"
                      className="
                        w-full
                        px-3
                        py-2.5
                        rounded-lg
                        border
                        border-line
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-primary/20
                        focus:border-primary
                      "
                    />

                  </div>

                </div>

              </div>


              {/* =================================================
                  CATATAN
              ================================================== */}

              <div>

                <label className="block text-sm font-semibold text-ink mb-1">
                  Catatan
                </label>

                <input
                  type="text"
                  value={form.catatan}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      catatan: e.target.value,
                    })
                  }
                  placeholder="Catatan tambahan"
                  className="
                    w-full
                    px-3
                    py-2.5
                    rounded-lg
                    border
                    border-line
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-primary/20
                    focus:border-primary
                  "
                />

              </div>


              {/* =================================================
                  KEPEMILIKAN
              ================================================== */}

              <div className="pt-4 border-t border-line">

                <label className="block text-sm font-semibold text-ink mb-2">
                  Status Kepemilikan
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        tipe_titip: "",
                        pemilik_nama: "",
                        pemilik_wa: "",
                      })
                    }
                    className={`
                      px-4
                      py-2.5
                      rounded-lg
                      text-sm
                      font-semibold
                      border
                      transition-colors
                      ${
                        !form.tipe_titip
                          ? "bg-primary text-white border-primary"
                          : "border-line text-muted hover:bg-gray-50"
                      }
                    `}
                  >
                    Milik Sendiri
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        tipe_titip: "fattening",
                      })
                    }
                    className={`
                      px-4
                      py-2.5
                      rounded-lg
                      text-sm
                      font-semibold
                      border
                      transition-colors
                      ${
                        form.tipe_titip ===
                        "fattening"
                          ? "bg-primary text-white border-primary"
                          : "border-line text-muted hover:bg-gray-50"
                      }
                    `}
                  >
                    Titip Fattening
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        tipe_titip: "perah",
                      })
                    }
                    className={`
                      px-4
                      py-2.5
                      rounded-lg
                      text-sm
                      font-semibold
                      border
                      transition-colors
                      ${
                        form.tipe_titip === "perah"
                          ? "bg-primary text-white border-primary"
                          : "border-line text-muted hover:bg-gray-50"
                      }
                    `}
                  >
                    Titip Perah
                  </button>

                </div>

              </div>


              {/* =================================================
                  DATA PEMILIK
              ================================================== */}

              {form.tipe_titip && (

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-line">

                  {/* NAMA PEMILIK */}

                  <div>

                    <label className="block text-sm font-semibold text-ink mb-1">
                      Nama Pemilik
                    </label>

                    <input
                      type="text"
                      value={form.pemilik_nama}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          pemilik_nama:
                            e.target.value,
                        })
                      }
                      placeholder="Nama pemilik"
                      className="
                        w-full
                        px-3
                        py-2.5
                        rounded-lg
                        border
                        border-line
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-primary/20
                        focus:border-primary
                      "
                    />

                  </div>


                  {/* WHATSAPP */}

                  <div>

                    <label className="block text-sm font-semibold text-ink mb-1">
                      Nomor WhatsApp
                    </label>

                    <input
                      type="text"
                      value={form.pemilik_wa}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          pemilik_wa:
                            e.target.value,
                        })
                      }
                      placeholder="08xxxxxxxxxx"
                      className="
                        w-full
                        px-3
                        py-2.5
                        rounded-lg
                        border
                        border-line
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-primary/20
                        focus:border-primary
                      "
                    />

                  </div>

                </div>

              )}


              {/* =================================================
                  FOOTER
              ================================================== */}

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-line">

                <button
                  type="button"
                  onClick={closeModal}
                  className="
                    px-5
                    py-2.5
                    rounded-lg
                    border
                    border-line
                    text-sm
                    font-semibold
                    text-muted
                    hover:bg-gray-50
                  "
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-lg
                    bg-primary
                    hover:bg-primary-dark
                    text-white
                    text-sm
                    font-semibold
                  "
                >
                  {editingTernak ? (
                    <>
                      <Pencil size={15} />
                      Simpan Perubahan
                    </>
                  ) : (
                    <>
                      <Plus size={15} />
                      Simpan Ternak
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =========================================================
          MODAL DETAIL TERNAK
      ========================================================== */}

      {detailTernak && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-sm
            p-4
          "
          onClick={closeDetail}
        >

          <div
            className="
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              bg-white
              rounded-2xl
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="flex items-center justify-between p-5 border-b border-line">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Detail Ternak
                </p>

                <h2 className="text-xl font-bold text-ink font-heading mt-1">
                  {detailTernak.kode ||
                    "Data Ternak"}
                </h2>

              </div>

              <button
                onClick={closeDetail}
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-muted
                  hover:bg-gray-100
                  hover:text-ink
                "
              >
                <X size={20} />
              </button>

            </div>


            {/* CONTENT */}

            <div className="p-5 space-y-5">

              {/* STATUS */}

              <div className="flex flex-wrap items-center gap-2">

                <span className="px-3 py-1.5 rounded-full bg-primary-light text-primary text-xs font-semibold">
                  {detailTernak.kategori ===
                  "kambing"
                    ? "Kambing"
                    : "Ayam"}
                </span>

                {detailTernak.tipe_titip && (

                  <span className="px-3 py-1.5 rounded-full bg-secondary-tint text-secondary-dark text-xs font-semibold">
                    {formatTipeTitip(
                      detailTernak.tipe_titip
                    )}
                  </span>

                )}

              </div>


              {/* =================================================
                  INFORMASI UTAMA
              ================================================== */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* JENIS */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Package
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Jenis
                    </p>

                  </div>

                  <p className="font-bold text-ink">
                    {detailTernak.jenis ||
                      "-"}
                  </p>

                </div>


                {/* RAS */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <ClipboardCheck
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Ras
                    </p>

                  </div>

                  <p className="font-bold text-ink">
                    {detailTernak.ras || "-"}
                  </p>

                </div>


                {/* TAHAP */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <ClipboardCheck
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Tahap
                    </p>

                  </div>

                  <p className="font-bold text-ink">

                    {(() => {
                      const tahap =
                        tentukanTahap(
                          detailTernak.kategori,
                          detailTernak.tanggal_masuk
                        );

                      return (
                        tahap?.label || "-"
                      );
                    })()}

                  </p>

                </div>


                {/* UMUR */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Activity
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Umur
                    </p>

                  </div>

                  <p className="font-bold text-ink">

                    {(() => {
                      const tahap =
                        tentukanTahap(
                          detailTernak.kategori,
                          detailTernak.tanggal_masuk
                        );

                      return tahap?.umurHari !==
                        undefined
                        ? formatUmur(
                            tahap.umurHari
                          )
                        : "-";
                    })()}

                  </p>

                </div>


                {/* TANGGAL MASUK */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <CalendarDays
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Tanggal Masuk
                    </p>

                  </div>

                  <p className="font-bold text-ink">
                    {detailTernak.tanggal_masuk ||
                      "-"}
                  </p>

                </div>


                {/* BOBOT AWAL */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Scale
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Bobot Awal
                    </p>

                  </div>

                  <p className="font-bold text-ink">
                    {formatBobot(
                      detailTernak.bobot_awal
                    )}
                  </p>

                </div>


                {/* BOBOT AKHIR */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Scale
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Bobot Akhir
                    </p>

                  </div>

                  <p className="font-bold text-ink">
                    {formatBobot(
                      detailTernak.bobot_akhir
                    )}
                  </p>

                </div>


                {/* PERTUMBUHAN */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Activity
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Pertumbuhan
                    </p>

                  </div>

                  <p
                    className={`font-bold ${
                      hitungPertumbuhan(
                        detailTernak
                      ) > 0
                        ? "text-primary"
                        : "text-ink"
                    }`}
                  >
                    {formatPertumbuhan(
                      detailTernak
                    )}
                  </p>

                </div>

              </div>


              {/* =================================================
                  PEMILIK
              ================================================== */}

              {detailTernak.tipe_titip && (

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-3">

                    <UserRound
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Informasi Pemilik
                    </p>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>

                      <p className="text-xs text-muted">
                        Nama
                      </p>

                      <p className="text-sm font-bold text-ink mt-1">
                        {detailTernak.pemilik_nama ||
                          "-"}
                      </p>

                    </div>

                    <div>

                      <p className="text-xs text-muted">
                        WhatsApp
                      </p>

                      <p className="text-sm font-bold text-ink mt-1">
                        {detailTernak.pemilik_wa ||
                          "-"}
                      </p>

                    </div>

                  </div>

                </div>

              )}


              {/* =================================================
                  KODE LACAK
              ================================================== */}

              {detailTernak.kode_lacak && (

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                        Kode Lacak
                      </p>

                      <p className="font-mono font-bold text-ink mt-1">
                        {detailTernak.kode_lacak}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        copyKode(
                          detailTernak.kode_lacak
                        )
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        rounded-lg
                        border
                        border-line
                        text-xs
                        font-semibold
                        hover:bg-gray-50
                      "
                    >
                      <Copy size={14} />
                      Salin
                    </button>

                  </div>

                </div>

              )}


              {/* =================================================
                  CATATAN
              ================================================== */}

              {detailTernak.catatan && (

                <div className="border border-line rounded-xl p-4">

                  <p className="text-xs uppercase tracking-wide font-semibold text-muted mb-2">
                    Catatan
                  </p>

                  <p className="text-sm text-ink leading-relaxed whitespace-pre-line">
                    {detailTernak.catatan}
                  </p>

                </div>

              )}


              {/* =================================================
                  KESEHATAN
              ================================================== */}

              <div className="border border-line rounded-xl p-4">

                <div className="flex items-center justify-between gap-3 mb-3">

                  <div className="flex items-center gap-2">

                    <Syringe
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Riwayat Kesehatan
                    </p>

                  </div>

                  <span className="text-xs font-semibold bg-primary-light text-primary px-2.5 py-1 rounded-full">

                    {
                      getKesehatanByTernak(
                        detailTernak.id
                      ).length
                    }{" "}
                    catatan

                  </span>

                </div>

                <div className="space-y-2">

                  {getKesehatanByTernak(
                    detailTernak.id
                  ).map((k) => (

                    <div
                      key={k.id}
                      className="bg-cream rounded-lg p-3"
                    >

                      <div className="flex items-center gap-2">

                        <span className="text-xs font-bold uppercase text-primary">
                          {k.tipe}
                        </span>

                        <span className="text-xs text-muted">
                          {k.tanggal}
                        </span>

                      </div>

                      {k.catatan && (

                        <p className="text-sm text-ink mt-1">
                          {k.catatan}
                        </p>

                      )}

                      {k.tanggal_berikutnya && (

                        <p className="text-xs text-amber-700 mt-1">
                          Berikutnya:{" "}
                          {k.tanggal_berikutnya}
                        </p>

                      )}

                    </div>

                  ))}

                  {getKesehatanByTernak(
                    detailTernak.id
                  ).length === 0 && (

                    <p className="text-sm text-muted text-center py-3">
                      Belum ada riwayat kesehatan.
                    </p>

                  )}

                </div>

              </div>

            </div>


            {/* =================================================
                FOOTER
            ================================================== */}

            <div className="flex flex-col sm:flex-row justify-end gap-2 p-5 border-t border-line">

              {detailTernak.tipe_titip &&
                detailTernak.pemilik_wa && (

                  <a
                    href={waLinkKirimKode(
                      detailTernak
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-lg
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      text-sm
                      font-semibold
                    "
                  >
                    <MessageCircle
                      size={15}
                    />
                    Kirim Kode via WhatsApp
                  </a>

                )}

              <button
                onClick={closeDetail}
                className="
                  px-4
                  py-2.5
                  rounded-lg
                  border
                  border-line
                  text-sm
                  font-semibold
                  text-ink
                  hover:bg-gray-50
                "
              >
                Tutup
              </button>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>
  );
}