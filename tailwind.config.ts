import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        turquoise: "#00CED1",
        skyblue: "#87CEEB",
        golden: "#FFD700",
        navyblue: "#1E3A8A",
        silver: "#C0C0C0",
      },
    },
  },
  plugins: [],
} satisfies Config;
