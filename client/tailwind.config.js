/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neonWhite: "#F3FBFB",
        powderBlue: "#BAE8E8",
        darkBlue: "#272343",
        orange: { primary: "#fb923c", secondary: "#ffa646" },
        cyan: { primary: "#0891b2", secondary: "#06b6d4" },
        gray: { primary: "#3c4245", secondary: "#c4c3bc", text: "#9ca3af" },
        amber: { primary: "#fffbeb", secondary: "#fffef5" },
        green: "#22c55e",
        slate: "#64748b",
      },
    },
  },
  plugins: [],
};

// rgb(60, 66, 69)
