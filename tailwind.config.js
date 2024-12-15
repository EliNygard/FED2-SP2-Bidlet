/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        widest: ".1375rem",
      },
      fontSize: {
        "22px": "1.375rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },

      colors: {
        brand: {
          light: "#373737",
          default: "#F5F5F5",
          dark: "#1A1A18",
        },
        accent: {
          default: "#FFD274",
          dark: "#FFAD00",
        },
        alert: {
          light: "#FEE0E0",
          dark: "#C40000",
        },
      },
      maxWidth: {
        max70: "17rem",
        maxW52: "52rem",
      },
    },
  },
  plugins: [],
};
