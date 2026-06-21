/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#e13a3a",
        secondary: "#e96d4c",
        background: {
          DEFAULT: "#fdf5f2",
          dark: "#000",
        },
        foreground: {
          DEFAULT: "#171717",
          muted: "#6b7280",
          dark: "#f3f4f6",
          "muted-dark": "#9ca3af",
        },
        surface: {
          DEFAULT: "#ffffff",
          dark: "#111827",
          elevated: "#1f2937",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        oxanium: ["Oxanium", "sans-serif"],
      },
      boxShadow: {
        premium: "0 20px 50px -12px rgba(225, 58, 58, 0.15)",
        glow: "0 0 40px -10px rgba(233, 109, 76, 0.4)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
});
