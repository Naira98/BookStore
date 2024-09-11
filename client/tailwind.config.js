/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neonWhite: "#F3FBFB",
        powderBlue: "#BAE8E8",
        darkBlue: "#272343",
        orange: "#fb923c",
        cyan: { primary: "#0891b2", secondary: "#06b6d4" },
        gray: "#f3f4f6",
        amber: { primary: "#fffbeb", secondary: "#fffef5" },
      },
    },
  },
  plugins: [],
};
