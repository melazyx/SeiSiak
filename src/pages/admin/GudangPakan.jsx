import { useState } from "react";
import { Plus, Trash2, AlertTriangle, PackagePlus, PackageMinus } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { usePakan } from "../../context/PakanContext";

export default function GudangPakan() {
  const {
    jenisPakan,
    pakanMasuk,
    pakanKeluar,
    ringkasanStok,
    pakanKadaluarsaMendekat,
    addJenisPakan,
    deleteJenisPakan,
    addPakanMasuk,
    deletePakanMasuk,
    addPakanKeluar,
    deletePakanKeluar,
  } = usePakan();

  const [tab, setTab] = useState("stok");

  const [showJenisForm, setShowJenisForm] = useState(false);
  const [formJenis, setFormJenis] = useState({ nama: "", satuan: "", batas_minimum: "" });

  const [formMasuk, setFormMasuk] = useState({ jenis_pakan_id: "", jumlah: "", tanggal_masuk: "", tanggal_kadaluarsa: "", catatan: "" });
  const [formKeluar, setFormKeluar] = useState({ jenis_pakan_id: "", jumlah: "", tanggal: "", kandang: "kambing", catatan: "" });

  const stokList = ringkasanStok();
  const menipis = stokList.filter((s) => s.menipis);
  const kadaluarsa = pakanKadaluarsaMendekat(14);

  function namaJenis(id) {
    return jenisPakan.find((j) => j.id === id)?.nama || "-";
  }

  async function handleSubmitJenis(e) {
    e.preventDefault();
    if (!formJenis.nama || !formJenis.satuan) {
      alert("Nama dan satuan wajib diisi.");
      return;
    }
    const res = await addJenisPakan({
      nama: formJenis.nama,
      satuan: formJenis.satuan,
      batas_minimum: Number(formJenis.batas_minimum || 0),
    });
    if (res.ok) {
      setFormJenis({ nama: "", satuan: "", batas_minimum: "" });
      setShowJenisForm(false);
    }
  }

  async function handleSubmitMasuk(e) {
    e.preventDefault();
    if (!formMasuk.jenis_pakan_id || !formMasuk.jumlah || !formMasuk.tanggal_masuk) {
      alert("Jenis pakan, jumlah, dan tanggal masuk wajib diisi.");
      return;
    }
    const res = await addPakanMasuk({
      ...formMasuk,
      jenis_pakan_id: Number(formMasuk.jenis_pakan_id),
      jumlah: Number(formMasuk.jumlah),
      tanggal_kadaluarsa: formMasuk.tanggal_kadaluarsa || null,
    });
    if (res.ok) {
      setFormMasuk({ jenis_pakan_id: "", jumlah: "", tanggal_masuk: "", tanggal_kadaluarsa: "", catatan: "" });
    }
  }

  async function handleSubmitKeluar(e) {
    e.preventDefault();
    if (!formKeluar.jenis_pakan_id || !formKeluar.jumlah || !formKeluar.tanggal) {
      alert("Jenis pakan, jumlah, dan tanggal wajib diisi.");
      return;
    }
    const stokTersedia = stokList.find((s) => s.id === Number(formKeluar.jenis_pakan_id))?.stok ?? 0;
    if (Number(formKeluar.jumlah) > stokTersedia) {
      const lanjut = window.confirm(
        `Stok tersisa cuma ${stokTersedia}, tapi kamu input pemakaian ${formKeluar.jumlah}. Stok akan jadi minus. Lanjutkan?`
      );
      if (!lanjut) return;
    }
    const res = await addPakanKeluar({
      ...formKeluar,
      jenis_pakan_id: Number(formKeluar.jenis_pakan_id),
      jumlah: Number(formKeluar.jumlah),
    });
    if (res.ok) {
      setFormKeluar({ jenis_pakan_id: "", jumlah: "", tanggal: "", kandang: "kambing", catatan: "" });
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Admin Panel</p>
          <h1 className="text-2xl font-bold text-ink font-heading">Gudang Pakan</h1>
          <p className="text-sm text-muted mt-1">Kelola stok pakan, catat pemakaian harian per kandang.</p>
        </div>

        {(menipis.length > 0 || kadaluarsa.length > 0) && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
            {menipis.length > 0 && (
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-amber-700 mt-0.5 shrink-0" />
                <p className="text-sm text-amber-800">
                  <span className="font-semibold">Stok menipis:</span>{" "}
                  {menipis.map((s) => `${s.nama} (${s.stok} ${s.satuan})`).join(", ")}
                </p>
              </div>
            )}
            {kadaluarsa.length > 0 && (
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-amber-700 mt-0.5 shrink-0" />
                <p className="text-sm text-amber-800">
                  <span className="font-semibold">Mendekati kadaluarsa (14 hari):</span>{" "}
                  {kadaluarsa.map((k) => `${k.jenis} (exp. ${k.tanggal_kadaluarsa})`).join(", ")}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          {["stok", "masuk", "keluar", "jenis"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${tab === t ? "bg-primary text-white" : "bg-white border border-line text-muted"}`}
            >
              {t === "stok" && "Ringkasan Stok"}
              {t === "masuk" && "Catat Pakan Masuk"}
              {t === "keluar" && "Catat Pemakaian"}
              {t === "jenis" && "Kelola Jenis Pakan"}
            </button>
          ))}
        </div>

        {tab === "stok" && (
          <div className="bg-white border border-line rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-cream text-left">
                <tr>
                  <th className="px-4 py-3">Jenis Pakan</th>
                  <th className="px-4 py-3">Stok Saat Ini</th>
                  <th className="px-4 py-3">Batas Minimum</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {stokList.map((s) => (
                  <tr key={s.id} className="border-t border-line">
                    <td className="px-4 py-3 font-medium">{s.nama}</td>
                    <td className="px-4 py-3">{s.stok} {s.satuan}</td>
                    <td className="px-4 py-3 text-muted">{s.batas_minimum} {s.satuan}</td>
                    <td className="px-4 py-3">
                      {s.menipis ? (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-700">Menipis</span>
                      ) : (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Aman</span>
                      )}
                    </td>
                  </tr>
                ))}
                {stokList.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-muted">Belum ada jenis pakan. Tambah dulu di tab "Kelola Jenis Pakan".</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === "masuk" && (
          <div className="space-y-5">
            <form onSubmit={handleSubmitMasuk} className="bg-white border border-line rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Jenis pakan</label>
                <select value={formMasuk.jenis_pakan_id} onChange={(e) => setFormMasuk({ ...formMasuk, jenis_pakan_id: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm">
                  <option value="">Pilih jenis pakan</option>
                  {jenisPakan.map((j) => <option key={j.id} value={j.id}>{j.nama}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Jumlah masuk</label>
                <input type="number" value={formMasuk.jumlah} onChange={(e) => setFormMasuk({ ...formMasuk, jumlah: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Tanggal masuk</label>
                <input type="date" value={formMasuk.tanggal_masuk} onChange={(e) => setFormMasuk({ ...formMasuk, tanggal_masuk: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Tanggal kadaluarsa (opsional)</label>
                <input type="date" value={formMasuk.tanggal_kadaluarsa} onChange={(e) => setFormMasuk({ ...formMasuk, tanggal_kadaluarsa: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-ink mb-1">Catatan</label>
                <input type="text" value={formMasuk.catatan} onChange={(e) => setFormMasuk({ ...formMasuk, catatan: e.target.value })} placeholder="misal: dari supplier X" className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                  <PackagePlus size={16} /> Catat Pakan Masuk
                </button>
              </div>
            </form>

            <div className="bg-white border border-line rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-cream text-left">
                  <tr>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Jenis</th>
                    <th className="px-4 py-3">Jumlah</th>
                    <th className="px-4 py-3">Kadaluarsa</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {pakanMasuk.map((m) => (
                    <tr key={m.id} className="border-t border-line">
                      <td className="px-4 py-3">{m.tanggal_masuk}</td>
                      <td className="px-4 py-3">{namaJenis(m.jenis_pakan_id)}</td>
                      <td className="px-4 py-3">{m.jumlah}</td>
                      <td className="px-4 py-3 text-muted">{m.tanggal_kadaluarsa || "-"}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => deletePakanMasuk(m.id)} className="text-red-600"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                  {pakanMasuk.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-6 text-center text-muted">Belum ada data.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "keluar" && (
          <div className="space-y-5">
            <form onSubmit={handleSubmitKeluar} className="bg-white border border-line rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Jenis pakan</label>
                <select value={formKeluar.jenis_pakan_id} onChange={(e) => setFormKeluar({ ...formKeluar, jenis_pakan_id: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm">
                  <option value="">Pilih jenis pakan</option>
                  {jenisPakan.map((j) => <option key={j.id} value={j.id}>{j.nama}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Jumlah dipakai</label>
                <input type="number" value={formKeluar.jumlah} onChange={(e) => setFormKeluar({ ...formKeluar, jumlah: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Tanggal</label>
                <input type="date" value={formKeluar.tanggal} onChange={(e) => setFormKeluar({ ...formKeluar, tanggal: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-1">Kandang</label>
                <select value={formKeluar.kandang} onChange={(e) => setFormKeluar({ ...formKeluar, kandang: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm">
                  <option value="kambing">Kambing</option>
                  <option value="ayam">Ayam</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-ink mb-1">Catatan</label>
                <input type="text" value={formKeluar.catatan} onChange={(e) => setFormKeluar({ ...formKeluar, catatan: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                  <PackageMinus size={16} /> Catat Pemakaian
                </button>
              </div>
            </form>

            <div className="bg-white border border-line rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-cream text-left">
                  <tr>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Jenis</th>
                    <th className="px-4 py-3">Jumlah</th>
                    <th className="px-4 py-3">Kandang</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {pakanKeluar.map((k) => (
                    <tr key={k.id} className="border-t border-line">
                      <td className="px-4 py-3">{k.tanggal}</td>
                      <td className="px-4 py-3">{namaJenis(k.jenis_pakan_id)}</td>
                      <td className="px-4 py-3">{k.jumlah}</td>
                      <td className="px-4 py-3 capitalize">{k.kandang}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => deletePakanKeluar(k.id)} className="text-red-600"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                  {pakanKeluar.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-6 text-center text-muted">Belum ada data.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "jenis" && (
          <div className="space-y-5">
            <div className="flex justify-end">
              <button onClick={() => setShowJenisForm(true)} className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                <Plus size={16} /> Tambah Jenis Pakan
              </button>
            </div>

            {showJenisForm && (
              <form onSubmit={handleSubmitJenis} className="bg-white border border-line rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Nama pakan</label>
                  <input type="text" value={formJenis.nama} onChange={(e) => setFormJenis({ ...formJenis, nama: e.target.value })} placeholder="Rumput gajah, konsentrat, dll" className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Satuan</label>
                  <input type="text" value={formJenis.satuan} onChange={(e) => setFormJenis({ ...formJenis, satuan: e.target.value })} placeholder="kg/karung/ikat" className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1">Batas minimum (peringatan)</label>
                  <input type="number" value={formJenis.batas_minimum} onChange={(e) => setFormJenis({ ...formJenis, batas_minimum: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-line text-sm" />
                </div>
                <div className="sm:col-span-3 flex gap-3">
                  <button type="button" onClick={() => setShowJenisForm(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-line text-sm font-semibold text-muted">Batal</button>
                  <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold">Simpan</button>
                </div>
              </form>
            )}

            <div className="bg-white border border-line rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-cream text-left">
                  <tr>
                    <th className="px-4 py-3">Nama</th>
                    <th className="px-4 py-3">Satuan</th>
                    <th className="px-4 py-3">Batas Minimum</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {jenisPakan.map((j) => (
                    <tr key={j.id} className="border-t border-line">
                      <td className="px-4 py-3 font-medium">{j.nama}</td>
                      <td className="px-4 py-3">{j.satuan}</td>
                      <td className="px-4 py-3">{j.batas_minimum}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => deleteJenisPakan(j.id)} className="text-red-600"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                  {jenisPakan.length === 0 && (
                    <tr><td colSpan={4} className="px-4 py-6 text-center text-muted">Belum ada jenis pakan.</td></tr>
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