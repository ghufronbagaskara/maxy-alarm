export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0d0d0d",
          card: "#1a1a1a",
          cardHover: "#252525",
          border: "#2a2a2a",
          text: "#e0e0e0",
          textSecondary: "#888888",
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-ring": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
        },
        glow: {
          "0%, 100%": { textShadow: "0 0 20px rgba(59, 130, 246, 0.5)" },
          "50%": { textShadow: "0 0 30px rgba(59, 130, 246, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
