import { Leaf } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";
import SectionHeading from "../components/SectionHeading";

export default function TentangKami() {
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-10 pb-14 flex flex-col gap-10">
        <SectionHeading
          blueWord="Tentang"
          redWord="Kami"
          subtitle="Juragan Kambing Sei Siak — usaha ternak keluarga yang menjadi bagian dari program UMKM binaan Pertamina Patra Niaga Fuel Terminal Sei Siak."
        />

        <div className="bg-white rounded-card border border-line p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-full bg-primary-tint flex items-center justify-center shrink-0">
            <Leaf size={22} className="text-primary" />
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Berawal dari usaha ternak kecil di tepi Sungai Siak, Juragan
            Kambing kini berkembang dengan dukungan program tanggung jawab
            sosial (CSR) Pertamina Patra Niaga Fuel Terminal Sei Siak. Melalui
            pendampingan ini, kami terus meningkatkan kualitas produk —
            mulai dari kambing, ayam kampung, hingga maggot sebagai solusi
            pakan ternak yang ramah lingkungan — demi ekonomi keluarga yang
            lebih baik dan berkelanjutan.
          </p>
        </div>

        <CTABanner />
      </div>

      <Footer />
    </div>
  );
}