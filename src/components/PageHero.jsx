import CategorySwitcher from "./CategorySwitcher";

export default function PageHero({
  category,
  titleBlue,
  titleRed,
  subtitle,
  description,
  badgeText,
  image,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blush via-cream to-white">

      {/* Dekorasi background — 1 lingkaran saja, konsisten sama Beranda */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-secondary/10" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* =========================
              BAGIAN KIRI
          ========================== */}
          <div>

            {/* Saklar cepat antar-kategori */}
            <CategorySwitcher active={category} />

            {/* Badge */}
            {badgeText && (
              <div className="inline-flex items-center gap-2 bg-white border border-line rounded-full px-4 py-2 shadow-soft mb-7">
                <span className="text-primary text-sm">🌿</span>
                <span className="text-sm font-semibold text-ink">
                  {badgeText}
                </span>
              </div>
            )}

            {/* Judul */}
            <h1 className="font-heading font-extrabold leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl whitespace-nowrap">

              {titleBlue && (
                <span className="text-ink">
                  {titleBlue}
                </span>
              )}

              {titleRed && (
                <span className="text-primary">
                  {titleRed}
                </span>
              )}

            </h1>

            {/* Subtitle */}
            {subtitle && (
              <h2 className="mt-7 text-xl sm:text-2xl font-bold text-ink leading-snug max-w-xl">
                {subtitle}
              </h2>
            )}

            {/* Description */}
            {description && (
              <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-xl">
                {description}
              </p>
            )}

          </div>


          {/* =========================
              BAGIAN KANAN
          ========================== */}
          <div className="relative">

            {/* Card gambar */}
            <div className="relative rounded-[2rem] overflow-hidden bg-white border border-line shadow-card">

              {/* Garis Pertamina — satu-satunya tempat 3 warna Pertamina masih dipakai */}
              <div className="h-1.5 flex">
                <div className="w-1/3 bg-secondary" />
                <div className="w-1/3 bg-sky" />
                <div className="w-1/3 bg-accent" />
              </div>

              {/* Area gambar */}
              <div className="relative h-[360px] sm:h-[430px] overflow-hidden">

                <img
                  src={image}
                  alt={category}
                  className="w-full h-full object-cover"
                />

                {/* Overlay gelap tipis biar teks bawah kebaca */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

                {/* Label */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                  <p className="text-sm font-bold text-primary uppercase">
                    Juragan Kambing
                  </p>
                  <p className="text-xs text-muted">
                    Sei Siak
                  </p>
                </div>

                {/* Teks bawah */}
                <div className="absolute bottom-7 left-7 right-7">
                  <p className="text-white text-2xl sm:text-3xl font-bold drop-shadow-lg">
                    Berkualitas untuk
                    <br />
                    masa depan.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}