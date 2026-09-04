import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        surface: "#1E293B",
        "surface-light": "#334155",
        primary: "#F97316",
        "primary-light": "#FB923C",
        "primary-dark": "#EA580C",
        secondary: "#06B6D4",
        "secondary-light": "#22D3EE",
        "secondary-dark": "#0891B2",
        accent: "#8B5CF6",
        text: {
          primary: "#F8FAFC",
          secondary: "#CBD5E1",
          muted: "#94A3B8",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        border: "#334155",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
        "gradient-secondary": "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
        "gradient-accent": "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-primary": "0 0 30px rgba(249, 115, 22, 0.3)",
        "glow-secondary": "0 0 30px rgba(6, 182, 212, 0.3)",
        soft: "0 2px 8px rgba(0, 0, 0, 0.12)",
        medium: "0 4px 16px rgba(0, 0, 0, 0.16)",
        hard: "0 8px 32px rgba(0, 0, 0, 0.24)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
