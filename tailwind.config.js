/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        qb: "#e6194B",
        rb: "#3cb44b",
        wr: "#4363d8",
        te: "#f58231",
        k: "#911eb4",
        def: "#9A6324",
        dl: "#bfef45",
        lb: "#42d4f4",
        db: "#f032e6",
      },
    },
  },
  plugins: [],
};
