/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#e13a3a",
        secondary: "#e96d4c",
        background: "#fdf5f2",
      },
      fontFamily: {
        poppins: "Poppins",
        oxanium: "Oxanium",
      },
    },
  },
  plugins: [require("daisyui")],
};
