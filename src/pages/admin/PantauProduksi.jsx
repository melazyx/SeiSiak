import { useMemo, useState } from "react";
import { Plus, Trash2, Download } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import TrendChart from "../../components/TrendChart";
import { useLaporan } from "../../context/LaporanContext";
import { exportToCsv } from "../../utils/exportCsv";

const KATEGORI_OPTIONS = ["kambing", "ayam", "maggot"];

function aggregateByDate(rows, valueKey) {
  const map = {};
  rows.forEach((r) => {
    map[r.tanggal] = (map[r.tanggal] || 0) + Number(r[valueKey] || 0);
  });
  return Object.entries(map)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([tanggal, value]) => ({ tanggal, value }));
}

export default function PantauProduksi() {
  const {
    produksi,
    penjualan,
    addProduksi,
    deleteProduksi,
    addPenjualan,
    deletePenjualan,
  } = useLaporan();

  const [tab, setTab] = useState("produksi");

  const [formProduksi, setFormProduksi] = useState({
    tanggal: "",
    kategori: "kambing",
    jenis: "",
    jumlah: "",
    satuan: "",
    catatan: "",
  });

  const [formPenjualan, setFormPenjualan] = useState({
    tanggal: "",
    kategori: "kambing",
    jenis: "",
    jumlah: "",
    satuan: "",
    harga_satuan: "",
    catatan: "",
  });

  const [dariTanggal, setDariTanggal] = useState("");
  const [sampaiTanggal, setSampaiTanggal] = useState("");

  const produksiChart = useMemo(() => aggregateByDate(produksi, "jumlah"), [produksi]);
  const penjualanChart = useMemo(() => aggregateByDate(penjualan, "total"), [penjualan]);

  async function handleSubmitProduksi(e) {
    e.preventDefault();
    if (!formProduksi.tanggal || !formProduksi.jenis || !formProduksi.jumlah) {
      alert("Tanggal, jenis, dan jumlah wajib diisi.");
      return;
    }
    const res = await addProduksi({
      ...formProduksi,
      jumlah: Number(formProduksi.jumlah),
    });
    if (res.ok) {
      setFormProduksi({ tanggal: "", kategori: "kambing", jenis: "", jumlah: "", satuan: "", catatan: "" });
    }
  }

  async function handleSubmitPenjualan(e) {
    e.preventDefault();
    if (!formPenjualan.tanggal || !formPenjualan.jenis || !formPenjualan.jumlah || !formPenjualan.harga_satuan) {
      alert("Tanggal, jenis, jumlah, dan harga satuan wajib diisi.");
      return;
    }
    const res = await addPenjualan({
      ...formPenjualan,
      jumlah: Number(formPenjualan.jumlah),
      harga_satuan: Number(formPenjualan.harga_satuan),
    });
    if (res.ok) {
      setFormPenjualan({ tanggal: "", kategori: "kambing", jenis: "", jumlah: "", satuan: "", harga_satuan: "", catatan: "" });
    }
  }

  function filterByDate(rows) {
    return rows.filter((r) => {
      if (dariTanggal && r.tanggal < dariTanggal) return false;
      if (sampaiTanggal && r.tanggal > sampaiTanggal) return false;
      return true;
    });
  }

  function handleExport(jenisData) {
    const rows = jenisData === "produksi" ? filterByDate(produksi) : filterByDate(penjualan);
    const filename = `${jenisData}-${dariTanggal || "semua"}-sampai-${sampaiTanggal || "semua"}.csv`;
    exportToCsv(filename, rows);
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8">

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Admin Panel</p>
          <h1 className="text-2xl font-bold text-ink font-heading">Produksi & Penjualan</h1>
          <p className="text-sm text-muted mt-1">Catat dan pantau hasil produksi serta penjualan harian.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TrendChart data={produksiChart} label="Tren produksi (jumlah per hari)" color="#0072BC" />
          <TrendChart data={penjualanChart} label="Tren penjualan (total Rp per hari)" color="#E4032E" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab("produksi")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${tab === "produksi" ? "bg-primary text-white" : "bg-white border border-line text-muted"}`}
          >
            Produksi
          </button>
          <button
            onClick={() => setTab("penjualan")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${tab === "penjualan" ? "bg-primary text-white" : "bg-white border border-line text-muted"}`}
          >
            Penjualan
          </button>
        </div>

        <div className="bg-white border border-line rounded-2xl p-5 flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Dari tanggal</label>
            <input type="date" value={dariTanggal} onChange={(e) => setDariTanggal(e.target.value)} className="px-3 py-2 rounded-lg border border-line text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Sampai tanggal</label>
            <input type="date" value={sampaiTanggal} onChange={(e) => setSampaiTanggal(e.target.value)} className="px-3 py-2 rounded-lg border border-line text-sm" />
          </div>
          <button
            onClick={() => handleExport(tab)}
            className="inline-flex items-center gap-2 bg-secondary-tint text-secondary-dark px-4 py-2.5 rounded-xl text-sm font-semibold"
          >
            <Download size={16} />
            Export {tab === "produksi" ? "Produksi" : "Penjualan"} ke Excel (CSV)
          </button>
        </div>

        {tab === "produksi" && (
          <div className="space-y-5">
            <form onSubmit={handleSubmitProduksi} className="bg-white border border-line rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Tanggal</label>
                <input type="date" value={formProduksi.tanggal} onChange={(e) => setFormProduksi({ ...formProduksi, tanggal: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Kategori</label>
                <select value={formProduksi.kategori} onChange={(e) => setFormProduksi({ ...formProduksi, kategori: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm">
                  {KATEGORI_OPTIONS.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Jenis (misal: Susu, Pupuk)</label>
                <input type="text" value={formProduksi.jenis} onChange={(e) => setFormProduksi({ ...formProduksi, jenis: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Jumlah</label>
                  <input type="number" value={formProduksi.jumlah} onChange={(e) => setFormProduksi({ ...formProduksi, jumlah: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Satuan</label>
                  <input type="text" value={formProduksi.satuan} onChange={(e) => setFormProduksi({ ...formProduksi, satuan: e.target.value })} placeholder="liter/kg/ekor" className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-ink mb-1">Catatan (opsional)</label>
                <input type="text" value={formProduksi.catatan} onChange={(e) => setFormProduksi({ ...formProduksi, catatan: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                  <Plus size={16} /> Catat Produksi
                </button>
              </div>
            </form>

            <div className="bg-white border border-line rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-cream text-left">
                  <tr>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Jenis</th>
                    <th className="px-4 py-3">Jumlah</th>
                    <th className="px-4 py-3">Catatan</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filterByDate(produksi).map((r) => (
                    <tr key={r.id} className="border-t border-line">
                      <td className="px-4 py-3">{r.tanggal}</td>
                      <td className="px-4 py-3 capitalize">{r.kategori}</td>
                      <td className="px-4 py-3">{r.jenis}</td>
                      <td className="px-4 py-3">{r.jumlah} {r.satuan}</td>
                      <td className="px-4 py-3 text-muted">{r.catatan}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => deleteProduksi(r.id)} className="text-red-600">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filterByDate(produksi).length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-6 text-center text-muted">Belum ada data.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "penjualan" && (
          <div className="space-y-5">
            <form onSubmit={handleSubmitPenjualan} className="bg-white border border-line rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Tanggal</label>
                <input type="date" value={formPenjualan.tanggal} onChange={(e) => setFormPenjualan({ ...formPenjualan, tanggal: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Kategori</label>
                <select value={formPenjualan.kategori} onChange={(e) => setFormPenjualan({ ...formPenjualan, kategori: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm">
                  {KATEGORI_OPTIONS.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Jenis (misal: Susu, Kambing Qurban)</label>
                <input type="text" value={formPenjualan.jenis} onChange={(e) => setFormPenjualan({ ...formPenjualan, jenis: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Jumlah</label>
                  <input type="number" value={formPenjualan.jumlah} onChange={(e) => setFormPenjualan({ ...formPenjualan, jumlah: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Satuan</label>
                  <input type="text" value={formPenjualan.satuan} onChange={(e) => setFormPenjualan({ ...formPenjualan, satuan: e.target.value })} placeholder="liter/kg/ekor" className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Harga satuan (Rp)</label>
                  <input type="number" value={formPenjualan.harga_satuan} onChange={(e) => setFormPenjualan({ ...formPenjualan, harga_satuan: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-ink mb-1">Catatan (opsional)</label>
                <input type="text" value={formPenjualan.catatan} onChange={(e) => setFormPenjualan({ ...formPenjualan, catatan: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                  <Plus size={16} /> Catat Penjualan
                </button>
              </div>
            </form>

            <div className="bg-white border border-line rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-cream text-left">
                  <tr>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Jenis</th>
                    <th className="px-4 py-3">Jumlah</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filterByDate(penjualan).map((r) => (
                    <tr key={r.id} className="border-t border-line">
                      <td className="px-4 py-3">{r.tanggal}</td>
                      <td className="px-4 py-3 capitalize">{r.kategori}</td>
                      <td className="px-4 py-3">{r.jenis}</td>
                      <td className="px-4 py-3">{r.jumlah} {r.satuan}</td>
                      <td className="px-4 py-3 font-semibold text-primary">Rp {Number(r.total).toLocaleString("id-ID")}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => deletePenjualan(r.id)} className="text-red-600">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filterByDate(penjualan).length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-6 text-center text-muted">Belum ada data.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}