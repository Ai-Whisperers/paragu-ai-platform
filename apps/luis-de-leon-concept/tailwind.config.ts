import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
      "primary": "#000000",
      "secondary": "#b87333",
      "background": "#f5f5f5",
      "surface": "#ffffff",
      "foreground": "#1a1a1a",
      "foreground-light": "#555555",
      "success": "#4a7c59",
      "error": "#c0392b",
      "accent": "#d4a574"
},
      fontFamily: { heading: ['Playfair Display', 'serif'], body: ['Montserrat', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config;
