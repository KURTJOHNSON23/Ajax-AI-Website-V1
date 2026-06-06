import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0A0F1C",
          800: "#0D1526",
          700: "#111E35",
          600: "#162444",
        },
        cyan: {
          400: "#10B981",
          500: "#059669",
          600: "#047857",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
      keyframes: {
        barWave: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
        travelDot: {
          "0%": { left: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
      },
      animation: {
        "bar-wave": "barWave 1.2s ease-in-out infinite",
        "travel-dot": "travelDot 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
