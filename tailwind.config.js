/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Hijau — warna utama brand Juragan Kambing (baru, ganti dari merah)
        primary: {
          DEFAULT: "#1E7A54",
          dark: "#145C3F",
          tint: "#DCF2E6",
          light: "#DCF2E6",
        },
        // Merah — sekarang jadi aksen sekunder (CTA "Titip Ternak", partner badge)
        secondary: {
          DEFAULT: "#E4212A",
          dark: "#B8151A",
          tint: "#FBE1E2",
          light: "#FBE1E2",
        },
        // Hijau muda — aksen tersier, dipakai di ikon/chip
        accent: {
          DEFAULT: "#8DC63F",
          dark: "#6EA82B",
          tint: "#F0F8E3",
          light: "#F0F8E3",
        },
        // Biru — dipakai terbatas, cuma untuk chip ikon variatif
        sky: {
          DEFAULT: "#0072BC",
          tint: "#DCEEFA",
          light: "#DCEEFA",
        },
        cream: "#FAF7F5",
        blush: "#FDF1EF",
        ink: "#18243A",
        muted: "#62738A",
        line: "#E4E7EC",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 8px 24px -8px rgba(24,36,58,0.12)",
        soft: "0 2px 10px -2px rgba(24,36,58,0.06)",
      },
    },
  },
  plugins: [],
}