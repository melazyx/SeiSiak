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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f5faff] via-[#eef8ff] to-[#ffffff]">

      {/* Dekorasi background */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#0072bc]/10" />
      <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-[#a6ce39]/10" />

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
              <div className="inline-flex items-center gap-2 bg-white border border-[#dce8f2] rounded-full px-4 py-2 shadow-sm mb-7">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#a6ce39]/15">
                  <span className="text-[#6fae1d] text-sm">
                    🌿
                  </span>
                </span>

                <span className="text-sm font-semibold text-[#24344d]">
                  {badgeText}
                </span>
              </div>
            )}

            {/* Judul */}
            <h1 className="font-heading font-extrabold leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl">

              {titleBlue && (
                <span className="text-[#0072bc]">
                  {titleBlue}
                </span>
              )}

              {titleRed && (
                <span className="text-[#ed1c24]">
                  {titleRed}
                </span>
              )}

            </h1>

            {/* Subtitle */}
            {subtitle && (
              <h2 className="mt-7 text-xl sm:text-2xl font-bold text-[#18243a] leading-snug max-w-xl">
                {subtitle}
              </h2>
            )}

            {/* Description */}
            {description && (
              <p className="mt-5 text-base sm:text-lg text-[#62738a] leading-relaxed max-w-xl">
                {description}
              </p>
            )}

          </div>


          {/* =========================
              BAGIAN KANAN
          ========================== */}
          <div className="relative">

            {/* Lingkaran dekorasi */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#0072bc]/10" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#a6ce39]/15" />

            {/* Card gambar */}
            <div className="relative rounded-[2rem] overflow-hidden bg-white border border-[#dce8f2] shadow-xl">

              {/* Garis Pertamina */}
              <div className="h-1.5 flex">
                <div className="w-1/3 bg-[#ed1c24]" />
                <div className="w-1/3 bg-[#0072bc]" />
                <div className="w-1/3 bg-[#a6ce39]" />
              </div>

              {/* Area gambar sementara */}
              <div className="relative h-[360px] sm:h-[430px] overflow-hidden">

                {/* Emoji */}
                <img
                  src={image}
                  alt={category}
                  className="w-full h-full object-cover"
                />

                {/* Label */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                  <p className="text-sm font-bold text-[#0072bc] uppercase">
                    Juragan Kambing
                  </p>

                  <p className="text-xs text-[#64748b]">
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