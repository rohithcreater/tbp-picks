import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#F6F4EF",
        sand: "#EFEBE1",
        ink: "#1B1A17",
        "ink-soft": "#57544B",
        gold: "#A8763E",
        "gold-deep": "#8A5F2E",
        line: "#DED8C9",
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(27, 26, 23, 0.04), 0 8px 24px -12px rgba(27, 26, 23, 0.14)",
        lift: "0 20px 60px -20px rgba(27, 26, 23, 0.35)",
      },
      borderRadius: {
        card: "14px",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
