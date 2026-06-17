/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  safelist: [
    {
      pattern: /^(bg|text|border|from|via|to|shadow)-romance-(pink|lavender|peach|cream|purple|rose|dusk|ink)(\/\d+)?$/,
    },
    {
      pattern: /^shadow-romance-lavender\/\d+$/,
    },
  ],
  theme: {
    extend: {
      colors: {
        sam: {
          bg: "#0B0B0B",
          surface: "#141414",
          red: "#E50914",
          muted: "#B3B3B3",
        },
        romance: {
          pink: "#F8D4E8",
          lavender: "#E4D4F4",
          peach: "#FFDCC8",
          cream: "#FFF5EB",
          purple: "#D8C8F0",
          rose: "#FFB8D0",
          dusk: "#C8B8E8",
          ink: "#1F1528",
        },
        pastel: {
          yellow: "#FFF4B8",
          pink: "#FFD6E8",
          orange: "#FFD4A8",
          green: "#C8F0C8",
          blue: "#B8D4E8",
          lavender: "#D4C5E8",
          cream: "#FFF8F0",
          peach: "#FFD4C4",
          sky: "#FFE8A8",
          sunset: "#FFB8A8",
          text: "#5C4A42",
          heading: "#3D2E28",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        story: ['"Cormorant Garamond"', "Georgia", "serif"],
        storybook: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        "red-glow": "0 0 40px rgba(229, 9, 20, 0.35)",
        "red-glow-sm": "0 0 20px rgba(229, 9, 20, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
        },
      },
    },
  },
  plugins: [],
};
