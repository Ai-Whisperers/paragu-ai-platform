import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C8A951",
        "primary-dark": "#A8882E",
        "primary-light": "#D4BC6A",
        secondary: "#1A1A2E",
        "secondary-light": "#2A2A4E",
        background: "#0D0D1A",
        surface: "#16162A",
        foreground: "#E8E8F0",
        muted: "#8888A0",
        border: "#2A2A4E",
      },
    },
  },
  plugins: [],
};

export default config;
