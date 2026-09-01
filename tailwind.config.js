/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E4212A",
          dark: "#B91C22",
          light: "#FDE8E9",
        },

        secondary: {
          DEFAULT: "#0072BC",
          dark: "#005A94",
          light: "#E7F3FB",
        },

        accent: {
          DEFAULT: "#8DC63F",
          dark: "#6F9F2F",
          light: "#F0F8E3",
        },

        cream: "#F5F8FC",

        ink: "#172033",

        muted: "#667085",

        line: "#E4EAF0",
      },

      fontFamily: {
        heading: [
          "Poppins",
          "sans-serif",
        ],

        body: [
          "Inter",
          "sans-serif",
        ],
      },

      borderRadius: {
        card: "20px",
      },

      boxShadow: {
        soft: "0 10px 40px rgba(20, 50, 80, 0.08)",
        card: "0 8px 30px rgba(20, 50, 80, 0.08)",
      },

      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #0072BC 0%, #005A94 100%)",

        "hero-gradient":
          "linear-gradient(135deg, #F5F8FC 0%, #E7F3FB 100%)",
      },
    },
  },

  plugins: [],
};