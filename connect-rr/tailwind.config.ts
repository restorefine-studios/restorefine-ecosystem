import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  // Follow the visitor's system light/dark setting
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        brand: "#ef4444",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        page: "rgb(var(--page) / <alpha-value>)",
      },
      fontFamily: {
        // SF Pro on Apple devices, Inter elsewhere
        sans: ["-apple-system", "BlinkMacSystemFont", "var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
