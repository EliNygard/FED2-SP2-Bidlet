/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        TwoRem: "2rem",
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
    },
  },
  plugins: [],
};
