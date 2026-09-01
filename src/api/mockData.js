// Data sementara. Setelah backend siap, ganti pemanggilan data ini
// dengan request axios ke endpoint API (lihat src/api/produk.js).

export const CATEGORY_META = {
  kambing: { label: "Kambing", emoji: "🐐", tagline: "Susu, pupuk, qurban & aqiqah, titip ternak" },
  ayam: { label: "Ayam", emoji: "🐔", tagline: "Ayam kampung & pupuk organik" },
  maggot: { label: "Maggot", emoji: "🪱", tagline: "Maggot basah & kering" },
};

export const initialProduk = {
  kambingSusuPupuk: [
    { id: 1, nama: "Susu Kambing Segar", harga: "Rp 25.000 / botol", deskripsi: "Diperah pagi hari, langsung dikemas." },
    { id: 2, nama: "Pupuk Kandang Kambing", harga: "Rp 10.000 / karung", deskripsi: "Pupuk organik siap tebar ke kebun." },
  ],
  kambingQurban: [
    { id: 1, nama: "Kambing Qurban Jantan", harga: "Rp 2.500.000", deskripsi: "Cukup umur, sehat, siap qurban." },
    { id: 2, nama: "Kambing Aqiqah", harga: "Rp 1.800.000", deskripsi: "Bisa sekalian dipotong & dimasak." },
  ],
  ayamJual: [
    { id: 1, nama: "Ayam Kampung Hidup", harga: "Rp 75.000 / ekor", deskripsi: "Umur potong, dipelihara umbaran." },
  ],
  ayamPupuk: [
    { id: 1, nama: "Pupuk Kotoran Ayam", harga: "Rp 8.000 / karung", deskripsi: "Dari kandang, sudah difermentasi." },
  ],
  maggotProduk: [
    { id: 1, nama: "Maggot Basah", harga: "Rp 12.000 / kg", deskripsi: "Pakan segar untuk ikan & unggas." },
    { id: 2, nama: "Maggot Kering", harga: "Rp 35.000 / kg", deskripsi: "Tahan lama, protein tinggi." },
  ],
};