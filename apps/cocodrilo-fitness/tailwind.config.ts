import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
      "primary": "#0d2137",
      "secondary": "#2ecc71",
      "background": "#f8f9fa",
      "surface": "#ffffff",
      "foreground": "#2d2d2d",
      "foreground-light": "#6b6b6b",
      "success": "#4a7c59",
      "error": "#c0392b",
      "accent": "#3498db"
},
      fontFamily: { heading: ['Playfair Display', 'serif'], body: ['Montserrat', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config;
