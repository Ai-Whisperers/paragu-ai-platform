import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
      "primary": "#1a1a1a",
      "secondary": "#b76e79",
      "background": "#faf9f7",
      "surface": "#ffffff",
      "foreground": "#333333",
      "foreground-light": "#666666",
      "success": "#4a7c59",
      "error": "#c0392b",
      "accent": "#d4a574"
},
      fontFamily: { heading: ['Playfair Display', 'serif'], body: ['Montserrat', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config;
