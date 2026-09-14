import { useState } from "react";
import { Leaf } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";
import SectionHeading from "../components/SectionHeading";
import ActivityCard from "../components/ActivityCard";
import ActivityDetailModal from "../components/ActivityDetailModal";
import { useKegiatan } from "../context/KegiatanContext";
import { useGaleri } from "../context/GaleriContext";

export default function TentangKami() {
  const { kegiatan, loading } = useKegiatan();
  const { galeri } = useGaleri();
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-10 pb-14 flex flex-col gap-10">
        <SectionHeading
          blueWord="Tentang"
          redWord="Kami"
          subtitle="Juragan Kambing Sei Siak — usaha ternak keluarga yang menjadi bagian dari program UMKM binaan Pertamina Patra Niaga Fuel Terminal Sei Siak."
        />

        <div className="bg-white rounded-card border border-line p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
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

          {galeri.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {galeri.map((item) => (
                <div key={item.id} className="relative rounded-lg overflow-hidden aspect-square">
                  <img src={item.image_url} alt={item.keterangan || "Galeri"} className="w-full h-full object-cover" />
                  {item.keterangan && (
                    <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-1.5 py-1 truncate">
                      {item.keterangan}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <SectionHeading
            blueWord="Kegiatan"
            redWord="Kami"
            subtitle="Dokumentasi kegiatan bersama Pertamina Patra Niaga Fuel Terminal Sei Siak. Klik untuk lihat selengkapnya."
          />

          {loading ? (
            <p className="text-sm text-muted mt-6">Memuat kegiatan...</p>
          ) : kegiatan.length === 0 ? (
            <p className="text-sm text-muted mt-6">Belum ada kegiatan yang ditambahkan.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              {kegiatan.map((item) => (
                <ActivityCard
                  key={item.id}
                  image={item.image_url ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" /> : null}
                  category={item.category}
                  categoryColor={item.category_color}
                  title={item.title}
                  date={item.activity_date}
                  large={item.is_large}
                  onClick={() => setSelected(item)}
                />
              ))}
            </div>
          )}
        </div>

        <CTABanner />
      </div>

      <Footer />

      <ActivityDetailModal
        activity={
          selected && {
            ...selected,
            date: selected.activity_date,
            image: selected.image_url ? (
              <img src={selected.image_url} alt={selected.title} className="w-full h-full object-cover" />
            ) : null,
          }
        }
        onClose={() => setSelected(null)}
      />
    </div>
  );
}