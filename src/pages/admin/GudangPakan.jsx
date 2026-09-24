import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
  CalendarClock,
  X,
  Warehouse,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import AdminLayout from "../../components/AdminLayout";
import { usePakan } from "../../context/PakanContext";

const formatTanggal = (tanggal) => {
  if (!tanggal) return "-";

  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatAngka = (angka) => {
  return Number(angka || 0).toLocaleString("id-ID");
};

export default function GudangPakan() {
  const {
    jenisPakan,
    pakanMasuk,
    pakanKeluar,
    loading,
    ringkasanStok,
    pakanKadaluarsaMendekat,
    addJenisPakan,
    deleteJenisPakan,
    addPakanMasuk,
    deletePakanMasuk,
    addPakanKeluar,
    deletePakanKeluar,
  } = usePakan();

  const [showJenisForm, setShowJenisForm] = useState(false);
  const [showMasukForm, setShowMasukForm] = useState(false);
  const [showKeluarForm, setShowKeluarForm] = useState(false);

  const [expandedId, setExpandedId] = useState(null);

  const [jenisForm, setJenisForm] = useState({
    nama: "",
    satuan: "kg",
    batas_minimum: "",
  });

  const [masukForm, setMasukForm] = useState({
    jenis_pakan_id: "",
    jumlah: "",
    tanggal_masuk: "",
    tanggal_kadaluarsa: "",
    catatan: "",
  });

  const [keluarForm, setKeluarForm] = useState({
    jenis_pakan_id: "",
    jumlah: "",
    tanggal: "",
    kandang: "",
    catatan: "",
  });

  const stok = useMemo(
    () => ringkasanStok(),
    [jenisPakan, pakanMasuk, pakanKeluar]
  );

  const stokMenipis = stok.filter((item) => item.menipis);

  const kadaluarsa = pakanKadaluarsaMendekat(14);

  const totalJenis = jenisPakan.length;

  const totalStok = stok.reduce(
    (total, item) => total + Number(item.stok || 0),
    0
  );

  const totalMasuk = pakanMasuk.reduce(
    (total, item) => total + Number(item.jumlah || 0),
    0
  );

  const totalKeluar = pakanKeluar.reduce(
    (total, item) => total + Number(item.jumlah || 0),
    0
  );

  function resetJenisForm() {
    setJenisForm({
      nama: "",
      satuan: "kg",
      batas_minimum: "",
    });
  }

  function resetMasukForm() {
    setMasukForm({
      jenis_pakan_id: "",
      jumlah: "",
      tanggal_masuk: "",
      tanggal_kadaluarsa: "",
      catatan: "",
    });
  }

  function resetKeluarForm() {
    setKeluarForm({
      jenis_pakan_id: "",
      jumlah: "",
      tanggal: "",
      kandang: "",
      catatan: "",
    });
  }

  async function handleTambahJenis(e) {
    e.preventDefault();

    if (!jenisForm.nama || !jenisForm.satuan || !jenisForm.batas_minimum) {
      alert("Nama, satuan, dan batas minimum wajib diisi.");
      return;
    }

    const res = await addJenisPakan({
      nama: jenisForm.nama,
      satuan: jenisForm.satuan,
      batas_minimum: Number(jenisForm.batas_minimum),
    });

    if (res?.ok) {
      resetJenisForm();
      setShowJenisForm(false);
    }
  }

  async function handlePakanMasuk(e) {
    e.preventDefault();

    if (
      !masukForm.jenis_pakan_id ||
      !masukForm.jumlah ||
      !masukForm.tanggal_masuk
    ) {
      alert("Jenis pakan, jumlah, dan tanggal masuk wajib diisi.");
      return;
    }

    const jumlah = Number(masukForm.jumlah);

    if (Number.isNaN(jumlah) || jumlah <= 0) {
      alert("Jumlah pakan harus lebih dari 0.");
      return;
    }

    const res = await addPakanMasuk({
      jenis_pakan_id: masukForm.jenis_pakan_id,
      jumlah,
      tanggal_masuk: masukForm.tanggal_masuk,
      tanggal_kadaluarsa: masukForm.tanggal_kadaluarsa || null,
      catatan: masukForm.catatan || null,
    });

    if (res?.ok) {
      resetMasukForm();
      setShowMasukForm(false);
    }
  }

  async function handlePakanKeluar(e) {
    e.preventDefault();

    if (
      !keluarForm.jenis_pakan_id ||
      !keluarForm.jumlah ||
      !keluarForm.tanggal ||
      !keluarForm.kandang
    ) {
      alert("Jenis pakan, jumlah, tanggal, dan kandang wajib diisi.");
      return;
    }

    const jenis = stok.find(
      (item) => item.id === keluarForm.jenis_pakan_id
    );

    if (jenis && Number(keluarForm.jumlah) > Number(jenis.stok)) {
      alert(
        `Stok tidak mencukupi. Stok ${jenis.nama} saat ini hanya ${formatAngka(
          jenis.stok
        )} ${jenis.satuan}.`
      );
      return;
    }

    const res = await addPakanKeluar({
      jenis_pakan_id: keluarForm.jenis_pakan_id,
      jumlah: Number(keluarForm.jumlah),
      tanggal: keluarForm.tanggal,
      kandang: keluarForm.kandang,
      catatan: keluarForm.catatan || null,
    });

    if (res?.ok) {
      resetKeluarForm();
      setShowKeluarForm(false);
    }
  }

  function handleDeleteJenis(item) {
    const adaMasuk = pakanMasuk.some(
      (itemMasuk) => itemMasuk.jenis_pakan_id === item.id
    );

    const adaKeluar = pakanKeluar.some(
      (itemKeluar) => itemKeluar.jenis_pakan_id === item.id
    );

    if (adaMasuk || adaKeluar) {
      alert(
        `Jenis pakan "${item.nama}" masih memiliki riwayat stok masuk atau pemakaian. Hapus riwayat tersebut terlebih dahulu.`
      );
      return;
    }

    const ok = window.confirm(`Hapus jenis pakan "${item.nama}"?`);

    if (ok) {
      deleteJenisPakan(item.id);
    }
  }

  function getNamaPakan(id) {
    return jenisPakan.find((item) => item.id === id)?.nama || "-";
  }

  function getSatuanPakan(id) {
    return jenisPakan.find((item) => item.id === id)?.satuan || "";
  }

  function getRiwayat(item) {
    const masuk = pakanMasuk
      .filter((data) => data.jenis_pakan_id === item.id)
      .map((data) => ({
        ...data,
        tipe: "masuk",
      }));

    const keluar = pakanKeluar
      .filter((data) => data.jenis_pakan_id === item.id)
      .map((data) => ({
        ...data,
        tipe: "keluar",
      }));

    return [...masuk, ...keluar].sort((a, b) => {
      const tanggalA = a.tanggal_masuk || a.tanggal;
      const tanggalB = b.tanggal_masuk || b.tanggal;

      return new Date(tanggalB) - new Date(tanggalA);
    });
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-primary-light border-t-primary rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted">
              Memuat data gudang pakan...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
              <Warehouse size={24} className="text-primary" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Admin Panel
              </p>

              <h1 className="text-2xl font-bold text-ink font-heading">
                Gudang Pakan
              </h1>

              <p className="text-sm text-muted mt-1">
                Kelola stok, pemasukan, dan pemakaian pakan ternak.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setShowJenisForm(true);
                setShowMasukForm(false);
                setShowKeluarForm(false);
              }}
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
            >
              <Plus size={16} />
              Jenis Pakan
            </button>

            <button
              onClick={() => {
                setShowMasukForm(true);
                setShowJenisForm(false);
                setShowKeluarForm(false);
              }}
              className="inline-flex items-center gap-2 bg-white border border-line text-primary px-4 py-2.5 rounded-xl text-sm font-semibold"
            >
              <ArrowDownToLine size={16} />
              Pakan Masuk
            </button>

            <button
              onClick={() => {
                setShowKeluarForm(true);
                setShowJenisForm(false);
                setShowMasukForm(false);
              }}
              className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
            >
              <ArrowUpFromLine size={16} />
              Pakan Keluar
            </button>
          </div>
        </div>

        {/* STATISTIK */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-line rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <Package size={20} className="text-primary" />
              </div>

              <span className="text-xs font-semibold text-muted">
                Jenis
              </span>
            </div>

            <p className="text-2xl font-bold text-ink">
              {formatAngka(totalJenis)}
            </p>

            <p className="text-sm text-muted mt-1">
              Jenis pakan tersedia
            </p>
          </div>

          <div className="bg-white border border-line rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Warehouse size={20} className="text-green-700" />
              </div>

              <span className="text-xs font-semibold text-muted">
                Stok
              </span>
            </div>

            <p className="text-2xl font-bold text-ink">
              {formatAngka(totalStok)}
            </p>

            <p className="text-sm text-muted mt-1">
              Total stok semua pakan
            </p>
          </div>

          <div className="bg-white border border-line rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <ArrowDownToLine size={20} className="text-blue-600" />
              </div>

              <span className="text-xs font-semibold text-muted">
                Masuk
              </span>
            </div>

            <p className="text-2xl font-bold text-ink">
              {formatAngka(totalMasuk)}
            </p>

            <p className="text-sm text-muted mt-1">
              Total pakan masuk
            </p>
          </div>

          <div className="bg-white border border-line rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <ArrowUpFromLine size={20} className="text-secondary" />
              </div>

              <span className="text-xs font-semibold text-muted">
                Keluar
              </span>
            </div>

            <p className="text-2xl font-bold text-ink">
              {formatAngka(totalKeluar)}
            </p>

            <p className="text-sm text-muted mt-1">
              Total pemakaian pakan
            </p>
          </div>
        </div>

        {/* PERINGATAN */}
        {(stokMenipis.length > 0 || kadaluarsa.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {stokMenipis.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={18} className="text-amber-700" />

                  <h2 className="font-bold text-amber-800">
                    Stok Menipis
                  </h2>
                </div>

                <div className="space-y-2">
                  {stokMenipis.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-white/70 rounded-xl px-3 py-2"
                    >
                      <span className="text-sm font-semibold text-ink">
                        {item.nama}
                      </span>

                      <span className="text-sm font-bold text-amber-700">
                        {formatAngka(item.stok)} {item.satuan}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {kadaluarsa.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarClock
                    size={18}
                    className="text-secondary"
                  />

                  <h2 className="font-bold text-red-800">
                    Kadaluarsa Mendekat
                  </h2>
                </div>

                <div className="space-y-2">
                  {kadaluarsa.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-white/70 rounded-xl px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {item.jenis}
                        </p>

                        <p className="text-xs text-muted">
                          {formatAngka(item.jumlah)} • masuk{" "}
                          {formatTanggal(item.tanggal_masuk)}
                        </p>
                      </div>

                      <span className="text-xs font-bold text-secondary">
                        {formatTanggal(item.tanggal_kadaluarsa)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FORM JENIS PAKAN */}
        {showJenisForm && (
          <div className="bg-white border border-line rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-ink">
                  Tambah Jenis Pakan
                </h2>

                <p className="text-sm text-muted mt-1">
                  Tambahkan jenis pakan yang digunakan di gudang.
                </p>
              </div>

              <button
                onClick={() => setShowJenisForm(false)}
                className="w-9 h-9 rounded-lg border border-line flex items-center justify-center text-muted"
              >
                <X size={17} />
              </button>
            </div>

            <form
              onSubmit={handleTambahJenis}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">
                  Nama Pakan
                </label>

                <input
                  type="text"
                  value={jenisForm.nama}
                  onChange={(e) =>
                    setJenisForm({
                      ...jenisForm,
                      nama: e.target.value,
                    })
                  }
                  placeholder="Contoh: Konsentrat"
                  className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1">
                  Satuan
                </label>

                <select
                  value={jenisForm.satuan}
                  onChange={(e) =>
                    setJenisForm({
                      ...jenisForm,
                      satuan: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="sak">Sak</option>
                  <option value="liter">Liter</option>
                  <option value="karung">Karung</option>
                  <option value="bungkus">Bungkus</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1">
                  Batas Minimum
                </label>

                <input
                  type="number"
                  min="0"
                  value={jenisForm.batas_minimum}
                  onChange={(e) =>
                    setJenisForm({
                      ...jenisForm,
                      batas_minimum: e.target.value,
                    })
                  }
                  placeholder="Contoh: 25"
                  className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                />
              </div>

              <div className="md:col-span-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    resetJenisForm();
                    setShowJenisForm(false);
                  }}
                  className="px-4 py-2.5 rounded-lg border border-line text-sm font-semibold text-muted"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold"
                >
                  Simpan Jenis
                </button>
              </div>
            </form>
          </div>
        )}

        {/* FORM PAKAN MASUK */}
        {showMasukForm && (
          <div className="bg-white border border-line rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-ink">
                  Catat Pakan Masuk
                </h2>

                <p className="text-sm text-muted mt-1">
                  Tambahkan stok pakan yang baru masuk ke gudang.
                </p>
              </div>

              <button
                onClick={() => setShowMasukForm(false)}
                className="w-9 h-9 rounded-lg border border-line flex items-center justify-center text-muted"
              >
                <X size={17} />
              </button>
            </div>

            {jenisPakan.length === 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                Belum ada jenis pakan. Tambahkan jenis pakan terlebih dahulu.
              </div>
            ) : (
              <form
                onSubmit={handlePakanMasuk}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Jenis Pakan
                  </label>

                  <select
                    value={masukForm.jenis_pakan_id}
                    onChange={(e) =>
                      setMasukForm({
                        ...masukForm,
                        jenis_pakan_id: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                  >
                    <option value="">Pilih jenis pakan</option>

                    {jenisPakan.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Jumlah
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={masukForm.jumlah}
                    onChange={(e) =>
                      setMasukForm({
                        ...masukForm,
                        jumlah: e.target.value,
                      })
                    }
                    placeholder="Contoh: 100"
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Tanggal Masuk
                  </label>

                  <input
                    type="date"
                    value={masukForm.tanggal_masuk}
                    onChange={(e) =>
                      setMasukForm({
                        ...masukForm,
                        tanggal_masuk: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Tanggal Kadaluarsa
                  </label>

                  <input
                    type="date"
                    value={masukForm.tanggal_kadaluarsa}
                    onChange={(e) =>
                      setMasukForm({
                        ...masukForm,
                        tanggal_kadaluarsa: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Catatan
                  </label>

                  <input
                    type="text"
                    value={masukForm.catatan}
                    onChange={(e) =>
                      setMasukForm({
                        ...masukForm,
                        catatan: e.target.value,
                      })
                    }
                    placeholder="Catatan tambahan"
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetMasukForm();
                      setShowMasukForm(false);
                    }}
                    className="px-4 py-2.5 rounded-lg border border-line text-sm font-semibold text-muted"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold"
                  >
                    Simpan Pakan Masuk
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* FORM PAKAN KELUAR */}
        {showKeluarForm && (
          <div className="bg-white border border-line rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-ink">
                  Catat Pakan Keluar
                </h2>

                <p className="text-sm text-muted mt-1">
                  Catat pemakaian pakan untuk kandang atau ternak.
                </p>
              </div>

              <button
                onClick={() => setShowKeluarForm(false)}
                className="w-9 h-9 rounded-lg border border-line flex items-center justify-center text-muted"
              >
                <X size={17} />
              </button>
            </div>

            {jenisPakan.length === 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                Belum ada jenis pakan. Tambahkan jenis pakan terlebih dahulu.
              </div>
            ) : (
              <form
                onSubmit={handlePakanKeluar}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Jenis Pakan
                  </label>

                  <select
                    value={keluarForm.jenis_pakan_id}
                    onChange={(e) =>
                      setKeluarForm({
                        ...keluarForm,
                        jenis_pakan_id: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                  >
                    <option value="">Pilih jenis pakan</option>

                    {stok.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama} — stok {formatAngka(item.stok)}{" "}
                        {item.satuan}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Jumlah
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={keluarForm.jumlah}
                    onChange={(e) =>
                      setKeluarForm({
                        ...keluarForm,
                        jumlah: e.target.value,
                      })
                    }
                    placeholder="Contoh: 5"
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Tanggal
                  </label>

                  <input
                    type="date"
                    value={keluarForm.tanggal}
                    onChange={(e) =>
                      setKeluarForm({
                        ...keluarForm,
                        tanggal: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Kandang
                  </label>

                  <input
                    type="text"
                    value={keluarForm.kandang}
                    onChange={(e) =>
                      setKeluarForm({
                        ...keluarForm,
                        kandang: e.target.value,
                      })
                    }
                    placeholder="Contoh: Kandang A"
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Catatan
                  </label>

                  <input
                    type="text"
                    value={keluarForm.catatan}
                    onChange={(e) =>
                      setKeluarForm({
                        ...keluarForm,
                        catatan: e.target.value,
                      })
                    }
                    placeholder="Catatan pemakaian"
                    className="w-full px-3 py-2.5 rounded-lg border border-line text-sm"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetKeluarForm();
                      setShowKeluarForm(false);
                    }}
                    className="px-4 py-2.5 rounded-lg border border-line text-sm font-semibold text-muted"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-secondary text-white text-sm font-semibold"
                  >
                    Simpan Pemakaian
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* DAFTAR STOK */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold text-ink font-heading">
                Stok Pakan
              </h2>

              <p className="text-sm text-muted">
                Kondisi stok pakan yang tersedia saat ini.
              </p>
            </div>
          </div>

          {stok.length === 0 ? (
            <div className="bg-white border border-line rounded-2xl p-10 text-center">
              <Package
                size={40}
                className="mx-auto text-muted mb-3"
              />

              <p className="font-semibold text-ink">
                Belum ada jenis pakan
              </p>

              <p className="text-sm text-muted mt-1">
                Tambahkan jenis pakan terlebih dahulu.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stok.map((item) => {
                const isExpanded = expandedId === item.id;
                const riwayat = getRiwayat(item);

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-line rounded-2xl overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                            <Package
                              size={21}
                              className="text-primary"
                            />
                          </div>

                          <div>
                            <h3 className="font-bold text-ink">
                              {item.nama}
                            </h3>

                            <p className="text-xs text-muted mt-1">
                              Satuan: {item.satuan}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteJenis(item)}
                          className="w-8 h-8 rounded-lg border border-line flex items-center justify-center text-red-600"
                          title="Hapus jenis pakan"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="mt-5 flex items-end justify-between">
                        <div>
                          <p className="text-xs text-muted mb-1">
                            Stok saat ini
                          </p>

                          <p className="text-2xl font-bold text-ink">
                            {formatAngka(item.stok)}
                            <span className="text-sm font-semibold text-muted ml-1">
                              {item.satuan}
                            </span>
                          </p>
                        </div>

                        <div
                          className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                            item.menipis
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {item.menipis
                            ? "Stok Menipis"
                            : "Stok Aman"}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-muted mb-1">
                          <span>
                            Minimum: {formatAngka(item.batas_minimum)}{" "}
                            {item.satuan}
                          </span>

                          <span>
                            {item.stok < 0
                              ? "Stok minus"
                              : "Tersedia"}
                          </span>
                        </div>

                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.menipis
                                ? "bg-amber-500"
                                : "bg-primary"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  5,
                                  (Number(item.stok) /
                                    Math.max(
                                      Number(item.batas_minimum) * 2,
                                      1
                                    )) *
                                    100
                                )
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setExpandedId(
                            isExpanded ? null : item.id
                          )
                        }
                        className="w-full mt-4 pt-3 border-t border-line flex items-center justify-center gap-2 text-sm font-semibold text-primary"
                      >
                        <Eye size={15} />

                        {isExpanded
                          ? "Sembunyikan Riwayat"
                          : `Lihat Riwayat (${riwayat.length})`}

                        {isExpanded ? (
                          <ChevronUp size={15} />
                        ) : (
                          <ChevronDown size={15} />
                        )}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-line bg-cream/40 p-4">
                        {riwayat.length === 0 ? (
                          <p className="text-sm text-muted text-center py-3">
                            Belum ada riwayat stok.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {riwayat.map((data) => (
                              <div
                                key={`${data.tipe}-${data.id}`}
                                className="bg-white rounded-xl border border-line p-3"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2">
                                    <div
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                        data.tipe === "masuk"
                                          ? "bg-green-50"
                                          : "bg-red-50"
                                      }`}
                                    >
                                      {data.tipe === "masuk" ? (
                                        <ArrowDownToLine
                                          size={15}
                                          className="text-green-700"
                                        />
                                      ) : (
                                        <ArrowUpFromLine
                                          size={15}
                                          className="text-red-600"
                                        />
                                      )}
                                    </div>

                                    <div>
                                      <p className="text-sm font-semibold text-ink">
                                        {data.tipe === "masuk"
                                          ? "Pakan Masuk"
                                          : "Pakan Keluar"}
                                      </p>

                                      <p className="text-xs text-muted mt-0.5">
                                        {formatTanggal(
                                          data.tanggal_masuk ||
                                            data.tanggal
                                        )}
                                      </p>
                                    </div>
                                  </div>

                                  <p
                                    className={`font-bold text-sm ${
                                      data.tipe === "masuk"
                                        ? "text-green-700"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {data.tipe === "masuk"
                                      ? "+"
                                      : "-"}
                                    {formatAngka(data.jumlah)}{" "}
                                    {item.satuan}
                                  </p>
                                </div>

                                {data.tipe === "keluar" &&
                                  data.kandang && (
                                    <p className="text-xs text-muted mt-2">
                                      Kandang: {data.kandang}
                                    </p>
                                  )}

                                {data.catatan && (
                                  <p className="text-xs text-muted mt-1">
                                    Catatan: {data.catatan}
                                  </p>
                                )}

                                {data.tipe === "masuk" &&
                                  data.tanggal_kadaluarsa && (
                                    <p className="text-xs text-amber-700 mt-1">
                                      Kadaluarsa:{" "}
                                      {formatTanggal(
                                        data.tanggal_kadaluarsa
                                      )}
                                    </p>
                                  )}

                                <div className="flex justify-end mt-2">
                                  <button
                                    onClick={() => {
                                      const ok = window.confirm(
                                        "Hapus catatan ini?"
                                      );

                                      if (!ok) return;

                                      if (
                                        data.tipe === "masuk"
                                      ) {
                                        deletePakanMasuk(data.id);
                                      } else {
                                        deletePakanKeluar(data.id);
                                      }
                                    }}
                                    className="text-xs font-semibold text-red-600 inline-flex items-center gap-1"
                                  >
                                    <Trash2 size={12} />
                                    Hapus
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIWAYAT TERBARU */}
        <div className="bg-white border border-line rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-line">
            <h2 className="font-bold text-ink font-heading">
              Aktivitas Pakan Terbaru
            </h2>

            <p className="text-sm text-muted mt-1">
              Ringkasan pemasukan dan pemakaian pakan.
            </p>
          </div>

          <div className="divide-y divide-line">
            {[
              ...pakanMasuk.map((item) => ({
                ...item,
                tipe: "masuk",
                tanggalAktivitas: item.tanggal_masuk,
              })),
              ...pakanKeluar.map((item) => ({
                ...item,
                tipe: "keluar",
                tanggalAktivitas: item.tanggal,
              })),
            ]
              .sort(
                (a, b) =>
                  new Date(b.tanggalAktivitas) -
                  new Date(a.tanggalAktivitas)
              )
              .slice(0, 8)
              .map((item) => (
                <div
                  key={`${item.tipe}-${item.id}`}
                  className="p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        item.tipe === "masuk"
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >
                      {item.tipe === "masuk" ? (
                        <ArrowDownToLine
                          size={16}
                          className="text-green-700"
                        />
                      ) : (
                        <ArrowUpFromLine
                          size={16}
                          className="text-red-600"
                        />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {item.tipe === "masuk"
                          ? "Pakan masuk"
                          : "Pakan keluar"}
                      </p>

                      <p className="text-xs text-muted">
                        {getNamaPakan(item.jenis_pakan_id)} •{" "}
                        {formatTanggal(item.tanggalAktivitas)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-sm font-bold ${
                      item.tipe === "masuk"
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {item.tipe === "masuk" ? "+" : "-"}
                    {formatAngka(item.jumlah)}{" "}
                    {getSatuanPakan(item.jenis_pakan_id)}
                  </span>
                </div>
              ))}

            {pakanMasuk.length === 0 &&
              pakanKeluar.length === 0 && (
                <div className="p-8 text-center text-sm text-muted">
                  Belum ada aktivitas pakan.
                </div>
              )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}