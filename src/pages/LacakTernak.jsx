import { useState } from "react";
import { Search, Syringe, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";
import { tentukanTahap, formatUmur } from "../utils/siklusTernak";

const TAHAP_WARNA = {
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
};

export default function LacakTernak() {
  const [kode, setKode] = useState("");
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!kode.trim()) return;

    setLoading(true);
    setNotFound(false);
    setHasil(null);

    const { data, error } = await supabase.rpc("cari_ternak_by_kode", {
      p_kode: kode.trim(),
    });

    setLoading(false);

    if (error || !data || data.length === 0) {
      setNotFound(true);
      return;
    }

    setHasil(data[0]);
  }

  const tahap = hasil ? tentukanTahap(hasil.kategori, hasil.tanggal_masuk) : null;

  return (
    <div>
      <Navbar />

      <div className="max-w-md mx-auto px-5 sm:px-0 py-10">
        <h1 className="text-2xl font-bold text-ink font-heading text-center mb-1">
          Lacak Ternak Titipan
        </h1>
        <p className="text-sm text-muted text-center mb-6">
          Masukkan kode lacak yang dikirimkan admin lewat WhatsApp.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={kode}
            onChange={(e) => setKode(e.target.value.toUpperCase())}
            placeholder="TTP-XXXX"
            className="flex-1 px-4 py-3 rounded-xl border border-line text-sm uppercase font-medium outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-sm font-semibold disabled:opacity-60"
          >
            <Search size={16} />
            {loading ? "Mencari..." : "Cari"}
          </button>
        </form>

        {notFound && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 text-center">
            Kode tidak ditemukan. Periksa kembali kode yang dikirimkan admin.
          </div>
        )}

        {hasil && (
          <div className="bg-white border border-line rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-muted uppercase tracking-wide mb-1 capitalize">
                  {hasil.kategori} {hasil.tipe_titip}
                </p>
                <p className="text-lg font-bold text-ink">{hasil.kode}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${TAHAP_WARNA[tahap.warna]}`}>
                {tahap.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 border-y border-line mb-4">
              <div>
                <p className="text-xs text-muted mb-0.5">Umur</p>
                <p className="text-sm font-semibold text-ink">{formatUmur(tahap.umurHari)}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-0.5">Masuk kandang</p>
                <p className="text-sm font-semibold text-ink">{hasil.tanggal_masuk}</p>
              </div>
            </div>

            <p className="text-sm font-semibold text-ink mb-2 flex items-center gap-2">
              <Syringe size={15} className="text-muted" />
              Riwayat kesehatan
            </p>

            <div className="space-y-2">
              {hasil.kesehatan.length === 0 && (
                <p className="text-sm text-muted">Belum ada catatan kesehatan.</p>
              )}
              {hasil.kesehatan.map((k, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold capitalize">{k.tipe}</span> · {k.tanggal}
                    </p>
                    {k.catatan && <p className="text-xs text-muted">{k.catatan}</p>}
                    {k.tanggal_berikutnya && (
                      <p className="text-xs text-amber-700">Berikutnya: {k.tanggal_berikutnya}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted text-center mt-5">
              Ada pertanyaan soal ternak titipan Anda?{" "}
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="text-primary font-semibold">
                Hubungi kami di WhatsApp
              </a>
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}