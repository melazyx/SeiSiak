import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Trash2, Syringe, AlertTriangle, MessageCircle, Copy } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { useTernak } from "../../context/TernakContext";
import { tentukanTahap, formatUmur } from "../../utils/siklusTernak";

const BADGE_WARNA = {
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
};

const PAGE_INFO = {
  kambing: { title: "Ternak Kambing", icon: "🐐" },
  ayam: { title: "Ternak Ayam", icon: "🐔" },
};

export default function KelolaTernak() {
  const { kategori } = useParams();
  const {
    getByKategori,
    getKesehatanByTernak,
    addTernak,
    deleteTernak,
    addKesehatan,
    deleteKesehatan,
  } = useTernak();

  const list = getByKategori(kategori);
  const pageInfo = PAGE_INFO[kategori] || { title: "Ternak", icon: "📦" };

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    jenis: "",
    kode: "",
    tanggal_masuk: "",
    catatan: "",
    tipe_titip: "",
    pemilik_nama: "",
    pemilik_wa: "",
  });

  const [expandedId, setExpandedId] = useState(null);
  const [formKesehatan, setFormKesehatan] = useState({ tanggal: "", tipe: "vaksin", catatan: "", tanggal_berikutnya: "" });

  const hariIni = new Date().toISOString().slice(0, 10);
  const jatuhTempo = kesehatanJatuhTempo();

  function kesehatanJatuhTempo() {
    const semua = list.flatMap((t) => getKesehatanByTernak(t.id).map((k) => ({ ...k, ternak: t })));
    return semua.filter((k) => k.tanggal_berikutnya && k.tanggal_berikutnya <= addDays(hariIni, 7));
  }

  function addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.jenis || !form.kode || !form.tanggal_masuk) {
      alert("Jenis, kode, dan tanggal masuk wajib diisi.");
      return;
    }
    if (form.tipe_titip && (!form.pemilik_nama || !form.pemilik_wa)) {
      alert("Nama dan nomor WA pemilik wajib diisi kalau ini ternak titipan.");
      return;
    }

    const payload = {
      kategori,
      jenis: form.jenis,
      kode: form.kode,
      tanggal_masuk: form.tanggal_masuk,
      catatan: form.catatan,
      tipe_titip: form.tipe_titip || null,
      pemilik_nama: form.tipe_titip ? form.pemilik_nama : null,
      pemilik_wa: form.tipe_titip ? form.pemilik_wa : null,
    };

    const res = await addTernak(payload);
    if (res.ok) {
      setForm({ jenis: "", kode: "", tanggal_masuk: "", catatan: "", tipe_titip: "", pemilik_nama: "", pemilik_wa: "" });
      setShowForm(false);
    }
  }

  function handleDelete(t) {
    const ok = window.confirm(`Hapus data ternak "${t.kode}"? Riwayat kesehatannya ikut terhapus.`);
    if (ok) deleteTernak(t.id);
  }

  async function handleSubmitKesehatan(e, ternakId) {
    e.preventDefault();
    if (!formKesehatan.tanggal || !formKesehatan.tipe) {
      alert("Tanggal dan tipe wajib diisi.");
      return;
    }
    const res = await addKesehatan({
      ternak_id: ternakId,
      tanggal: formKesehatan.tanggal,
      tipe: formKesehatan.tipe,
      catatan: formKesehatan.catatan,
      tanggal_berikutnya: formKesehatan.tanggal_berikutnya || null,
    });
    if (res.ok) {
      setFormKesehatan({ tanggal: "", tipe: "vaksin", catatan: "", tanggal_berikutnya: "" });
    }
  }

  function waLinkKirimKode(t) {
    const pesan = `Halo ${t.pemilik_nama}, terima kasih sudah menitipkan ${t.kode} di Juragan Kambing Sei Siak. Kode lacak Anda: ${t.kode_lacak}. Simpan kode ini untuk memantau perkembangan ternak Anda kapan saja lewat website kami di halaman "Lacak Ternak".`;
    return `https://wa.me/${t.pemilik_wa.replace(/\D/g, "")}?text=${encodeURIComponent(pesan)}`;
  }

  function copyKode(kode) {
    navigator.clipboard.writeText(kode);
    alert("Kode lacak disalin: " + kode);
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-2xl">
              {pageInfo.icon}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Admin Panel</p>
              <h1 className="text-2xl font-bold text-ink font-heading">{pageInfo.title}</h1>
            </div>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            <Plus size={16} /> Tambah Ternak
          </button>
        </div>

        {jatuhTempo.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-amber-700" />
              <p className="text-sm font-semibold text-amber-800">
                {jatuhTempo.length} jadwal vaksin/periksa mendekat atau terlewat
              </p>
            </div>
            <ul className="text-sm text-amber-700 space-y-1">
              {jatuhTempo.map((k) => (
                <li key={k.id}>
                  {k.ternak.kode} — jatuh tempo {k.tanggal_berikutnya}
                  {k.tanggal_berikutnya < hariIni && <span className="font-semibold"> (terlewat)</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-1">Jenis</label>
              <input type="text" value={form.jenis} onChange={(e) => setForm({ ...form, jenis: e.target.value })} placeholder="perah/gemuk/pedaging" className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1">Kode/nama</label>
              <input type="text" value={form.kode} onChange={(e) => setForm({ ...form, kode: e.target.value })} placeholder="K-001" className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1">Tanggal masuk</label>
              <input type="date" value={form.tanggal_masuk} onChange={(e) => setForm({ ...form, tanggal_masuk: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1">Catatan</label>
              <input type="text" value={form.catatan} onChange={(e) => setForm({ ...form, catatan: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-line">
              <label className="block text-sm font-semibold text-ink mb-2">Status kepemilikan</label>
              <div className="flex gap-2 mb-3">
                <button type="button" onClick={() => setForm({ ...form, tipe_titip: "" })} className={`px-4 py-2 rounded-lg text-sm font-medium border ${!form.tipe_titip ? "bg-primary text-white border-primary" : "border-line text-muted"}`}>Milik usaha sendiri</button>
                <button type="button" onClick={() => setForm({ ...form, tipe_titip: "fattening" })} className={`px-4 py-2 rounded-lg text-sm font-medium border ${form.tipe_titip === "fattening" ? "bg-primary text-white border-primary" : "border-line text-muted"}`}>Titip fattening</button>
                <button type="button" onClick={() => setForm({ ...form, tipe_titip: "perah" })} className={`px-4 py-2 rounded-lg text-sm font-medium border ${form.tipe_titip === "perah" ? "bg-primary text-white border-primary" : "border-line text-muted"}`}>Titip perah</button>
              </div>
            </div>

            {form.tipe_titip && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Nama pemilik</label>
                  <input type="text" value={form.pemilik_nama} onChange={(e) => setForm({ ...form, pemilik_nama: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Nomor WhatsApp pemilik</label>
                  <input type="text" value={form.pemilik_wa} onChange={(e) => setForm({ ...form, pemilik_wa: e.target.value })} placeholder="08xxxxxxxxxx" className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
                </div>
              </>
            )}

            <div className="sm:col-span-2 flex gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-line text-sm font-semibold text-muted">Batal</button>
              <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold">Simpan</button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {list.map((t) => {
            const tahap = tentukanTahap(t.kategori, t.tanggal_masuk);
            const riwayat = getKesehatanByTernak(t.id);
            const isExpanded = expandedId === t.id;

            return (
              <div key={t.id} className="bg-white border border-line rounded-2xl overflow-hidden">
                <div className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-ink">{t.kode}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${BADGE_WARNA[tahap.warna]}`}>
                        {tahap.label}
                      </span>
                      {t.tipe_titip && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary-tint text-secondary-dark">
                          Titip {t.tipe_titip}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted mt-1">
                      {t.jenis} • Umur {formatUmur(tahap.umurHari)} • Masuk {t.tanggal_masuk}
                    </p>
                    {t.tipe_titip && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-xs text-muted">Pemilik: {t.pemilik_nama}</span>
                        <button
                          onClick={() => copyKode(t.kode_lacak)}
                          className="inline-flex items-center gap-1 text-xs font-mono font-semibold bg-cream px-2 py-1 rounded"
                        >
                          <Copy size={11} /> {t.kode_lacak}
                        </button>
                        <a
                          href={waLinkKirimKode(t)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-green-700"
                        >
                          <MessageCircle size={12} /> Kirim kode via WA
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : t.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-line text-sm font-medium text-secondary-dark"
                    >
                      <Syringe size={14} /> Kesehatan ({riwayat.length})
                    </button>
                    <button onClick={() => handleDelete(t)} className="w-9 h-9 flex items-center justify-center rounded-lg border border-line text-red-600">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-line bg-cream/50 p-5 space-y-4">
                    <form onSubmit={(e) => handleSubmitKesehatan(e, t.id)} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <input type="date" value={formKesehatan.tanggal} onChange={(e) => setFormKesehatan({ ...formKesehatan, tanggal: e.target.value })} className="px-3 py-2 rounded-lg border border-line text-sm" />
                      <select value={formKesehatan.tipe} onChange={(e) => setFormKesehatan({ ...formKesehatan, tipe: e.target.value })} className="px-3 py-2 rounded-lg border border-line text-sm">
                        <option value="vaksin">Vaksin</option>
                        <option value="sakit">Sakit</option>
                        <option value="obat">Obat</option>
                        <option value="periksa">Periksa rutin</option>
                      </select>
                      <input type="text" value={formKesehatan.catatan} onChange={(e) => setFormKesehatan({ ...formKesehatan, catatan: e.target.value })} placeholder="Catatan" className="px-3 py-2 rounded-lg border border-line text-sm" />
                      <input type="date" value={formKesehatan.tanggal_berikutnya} onChange={(e) => setFormKesehatan({ ...formKesehatan, tanggal_berikutnya: e.target.value })} placeholder="Jadwal berikutnya" className="px-3 py-2 rounded-lg border border-line text-sm" />
                      <button type="submit" className="sm:col-span-4 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">Tambah Catatan</button>
                    </form>

                    <div className="space-y-2">
                      {riwayat.map((k) => (
                        <div key={k.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 text-sm">
                          <span>
                            <span className="font-semibold capitalize">{k.tipe}</span> — {k.tanggal}
                            {k.catatan && <span className="text-muted"> · {k.catatan}</span>}
                            {k.tanggal_berikutnya && <span className="text-amber-700"> · Berikutnya: {k.tanggal_berikutnya}</span>}
                          </span>
                          <button onClick={() => deleteKesehatan(k.id)} className="text-red-600">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      {riwayat.length === 0 && (
                        <p className="text-sm text-muted text-center py-3">Belum ada riwayat kesehatan.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {list.length === 0 && (
            <div className="text-center py-10 text-muted text-sm">Belum ada data ternak.</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}