export function buildProductList(data) {
  if (!data) return [];
  const list = [];

  const push = (items, kategori, defaultTipe) => {
    (items || []).forEach((p) => {
      const n = p.nama.toLowerCase();
      let tipe = defaultTipe;
      if (n.includes("susu")) tipe = "Susu";
      else if (n.includes("pupuk")) tipe = "Pupuk";
      list.push({ ...p, kategori, tipe, link: `/${kategori.toLowerCase()}` });
    });
  };

  push(data.kambingSusuPupuk, "Kambing", "Kambing");
  push(data.kambingQurban, "Kambing", "Kambing");
  push(data.ayamJual, "Ayam", "Ayam");
  push(data.ayamPupuk, "Ayam", "Pupuk");
  push(data.maggotProduk, "Maggot", "Maggot");

  return list;
}

// Ambil angka harga dari teks seperti "Rp 25.000 / botol" -> 25000
export function parseHarga(harga) {
  if (!harga) return 0;
  const match = harga.match(/([\d.,]+)/);
  if (!match) return 0;
  return parseInt(match[1].replace(/[.,]/g, ""), 10) || 0;
}