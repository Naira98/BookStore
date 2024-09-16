/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: { primary: "#fb923c", secondary: "#ffa646" },
        cyan: { primary: "#0891b2", secondary: "#06b6d4" },
        gray: { primary: "#3c4245", secondary: "#c4c3bc", text: "#9ca3af" },
        amber: { primary: "#fffbeb", secondary: "#fffef5" },
        green: { primary: "#22c55e", secondary: "#059669" },
        slate: "#64748b",
        blue: "#eff6ff",
        grey: { primary: "#374151", secondary: "#f9fafb" },
        red: { primary: "#ef4444", secondary: "#dc2626" },
      },
    },
  },
  plugins: [],
};

// rgb(60, 66, 69)
