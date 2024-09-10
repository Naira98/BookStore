/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neonWhite: "#F3FBFB",
        powderBlue: "#BAE8E8",
        gold: { primary: "#FFD803", secondary: "#F3CE02" },
        darkBlue: "#272343",
      },
    },
  },
  plugins: [],
};
