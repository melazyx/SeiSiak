const ATURAN_TAHAP = {
  kambing: [
    { maxHari: 90, label: "Anak", warna: "amber" },
    { maxHari: 240, label: "Remaja", warna: "blue" },
    { maxHari: Infinity, label: "Siap Jual", warna: "green" },
  ],
  ayam: [
    { maxHari: 30, label: "DOC (Anakan)", warna: "amber" },
    { maxHari: 60, label: "Remaja", warna: "blue" },
    { maxHari: Infinity, label: "Siap Panen", warna: "green" },
  ],
};

export function hitungUmurHari(tanggalMasuk) {
  const masuk = new Date(tanggalMasuk);
  const now = new Date();
  const selisihMs = now - masuk;
  return Math.max(0, Math.floor(selisihMs / (1000 * 60 * 60 * 24)));
}

export function formatUmur(hari) {
  if (hari < 30) return `${hari} hari`;
  const bulan = Math.floor(hari / 30);
  const sisaHari = hari % 30;
  return sisaHari > 0 ? `${bulan} bulan ${sisaHari} hari` : `${bulan} bulan`;
}

export function tentukanTahap(kategori, tanggalMasuk) {
  const hari = hitungUmurHari(tanggalMasuk);
  const aturan = ATURAN_TAHAP[kategori] || ATURAN_TAHAP.kambing;
  const tahap = aturan.find((a) => hari <= a.maxHari) || aturan[aturan.length - 1];
  return { ...tahap, umurHari: hari };
}