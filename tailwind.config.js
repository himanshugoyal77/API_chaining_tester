/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1c1e27",
        bgSoft: "#262730",
        bgDark: "#15171e",
        Black: "#08030b",
        textColor: "white",
        primaryColor: "#f04c96",
        primaryColorSoft: "#f06fa2",
      },
    },
  },
  plugins: [require("daisyui")],
};

// --bg: #1c1e27;
// --bgSoft: #262730;
// --bgDark: #15171e;
// --Black: #08030b;
// --textColor: white;
// --primaryColor: #f04c96;
// --primaryColorSoft: #f06fa2;
