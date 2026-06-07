import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
      "primary": "#1a1a2e",
      "secondary": "#e94560",
      "background": "#f5f5f5",
      "surface": "#ffffff",
      "foreground": "#2d2d2d",
      "foreground-light": "#6b6b6b",
      "success": "#4a7c59",
      "error": "#c0392b",
      "accent": "#16213e"
},
      fontFamily: { heading: ['Playfair Display', 'serif'], body: ['Montserrat', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config;
