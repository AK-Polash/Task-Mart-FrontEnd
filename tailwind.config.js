/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1500px",
      },
      fontFamily: {
        mons: ["Montserrat", "sans-serif"],
        nuni: ["Nunito", "sans-serif"],
        curs: ["Courgette", "cursive"],
      },
      colors: {
        primary: "#00ABE1",
        secondary: "#161F6D",
        dark: "#111",
        pure: "#fff",
        flat: "#ecf0f1",
        dope: "#111827",
        smoke: "#bdc3c7",
        valin: "#9ca3af",
        danger: "#F70000",
        success: "#0be881",
        zinc: "#3F3F46",
        mix: "#0F1544",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
