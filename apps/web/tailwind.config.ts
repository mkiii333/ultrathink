import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"]
      },
      colors: {
        primary: {
          DEFAULT: "#FF6B35",
          dark: "#E55A2B",
          light: "#FF8A5B",
          glow: "rgba(255, 107, 53, 0.15)"
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          dark: "#7C3AED",
          light: "#A78BFA"
        },
        accent: {
          DEFAULT: "#EC4899",
          dark: "#DB2777"
        },
        dark: {
          DEFAULT: "#0A0E27",
          light: "#141829",
          surface: "#1A1F3A"
        },
        tier: {
          moneyPrinter: "#10B981",
          highPerformer: "#3B82F6",
          solidBet: "#F59E0B",
          testLearn: "#8B5CF6",
          skip: "#EF4444"
        }
      }
    }
  },
  plugins: []
};

export default config;
