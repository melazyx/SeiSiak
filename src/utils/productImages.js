// ================================
// PRODUCT IMAGES
// ================================

// AYAM
import ayamImage from "../assets/ayam-kampung.webp";
import ayamPupukImage from "../assets/pupuk-ayam.jpeg";

// KAMBING
import susuKambingImage from "../assets/susu-kambing.jpeg";
import pupukKambingImage from "../assets/pupuk-kambing.jpg";
import kambingQurbanImage from "../assets/kambing-qurban.jpeg";
import kambingAqiqahImage from "../assets/kambing-qurban.jpeg";

// MAGGOT
import maggotFreshImage from "../assets/maggot-fresh.webp";
import maggotKeringImage from "../assets/maggot-kering.jpg";


// ======================================
// GAMBAR DEFAULT BERDASARKAN NAMA PRODUK
// ======================================

export function getProductImage(product) {
  if (!product || !product.nama) {
    return null;
  }

  const nama = product.nama.toLowerCase();


  // =========================
  // KAMBING
  // =========================

  if (nama.includes("susu") && nama.includes("kambing")) {
    return susuKambingImage;
  }

  if (
    nama.includes("pupuk") &&
    nama.includes("kambing")
  ) {
    return pupukKambingImage;
  }

  if (nama.includes("qurban")) {
    return kambingQurbanImage;
  }

  if (nama.includes("aqiqah")) {
    return kambingAqiqahImage;
  }


  // =========================
  // AYAM
  // =========================

  if (
    nama.includes("ayam") &&
    nama.includes("pupuk")
  ) {
    return ayamPupukImage;
  }

  if (nama.includes("ayam")) {
    return ayamImage;
  }


  // =========================
  // MAGGOT
  // =========================

  if (nama.includes("kering")) {
    return maggotKeringImage;
  }

  if (nama.includes("maggot")) {
    return maggotFreshImage;
  }


  return null;
}