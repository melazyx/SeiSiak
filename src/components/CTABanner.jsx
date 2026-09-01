import { ArrowRight, Leaf } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="
      relative
      overflow-hidden
      rounded-[28px]
      bg-gradient-to-r
      from-secondary
      to-secondary-dark
      px-6
      sm:px-10
      py-9
      sm:py-11
      shadow-card
    ">

      {/* dekorasi merah */}
      <div className="
        absolute
        -right-16
        -top-16
        w-48
        h-48
        rounded-full
        bg-primary/80
      " />

      {/* dekorasi hijau */}
      <div className="
        absolute
        right-20
        -bottom-20
        w-40
        h-40
        rounded-full
        bg-accent/70
      " />

      <div className="
        relative
        z-10
        flex
        flex-col
        lg:flex-row
        items-start
        lg:items-center
        justify-between
        gap-7
      ">

        <div>

          <div className="
            flex
            items-center
            gap-2
            mb-4
          ">
            <Leaf
              size={17}
              className="text-accent"
            />

            <span className="
              text-xs
              font-semibold
              text-white/80
              uppercase
              tracking-wider
            ">
              Pertamina Patra Niaga
            </span>
          </div>

          <h3 className="
            text-2xl
            sm:text-3xl
            font-heading
            font-extrabold
            text-white
            max-w-2xl
            leading-tight
          ">
            Bersama Pertamina Patra Niaga
            <span className="text-accent">
              {" "}untuk Lingkungan yang Lebih Baik
            </span>
          </h3>

          <p className="
            mt-3
            text-sm
            text-white/75
            max-w-xl
          ">
            Dari usaha kecil, tumbuh menjadi
            kegiatan yang memberikan dampak
            bagi masyarakat dan lingkungan.
          </p>

        </div>

        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noreferrer"
          className="
            shrink-0
            inline-flex
            items-center
            gap-2
            bg-white
            text-secondary
            hover:bg-secondary-light
            px-5
            py-3
            rounded-full
            font-bold
            text-sm
            transition-colors
          "
        >
          Hubungi Kami
          <ArrowRight size={16} />
        </a>

      </div>

    </section>
  );
}