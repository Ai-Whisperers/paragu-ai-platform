import type { Config } from 'tailwindcss'

/**
 * ParaguAI landing theme — Cyberpunk / Techno / Retro-futurist palette
 * (Coolors: https://coolors.co/palette/7834c0-af7ac9-d2ae3f-4c2c73-7d60a4)
 *
 *  #7834C0  primary       — electric violet (titles, primary brand)
 *  #AF7AC9  brand         — soft orchid   (template showcase cards)
 *  #D2AE3F  accent        — gold          (light CTA buttons / accents)
 *  #4C2C73  deep          — deep violet   (template view options + FAQ bg)
 *  #7D60A4  bg            — muted purple  (page background)
 *
 * Headings use Press Start 2P (self-hosted, /fonts/press-start-2p.woff2).
 * Body keeps the existing Inter stack.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk palette — primary semantic tokens
        primary: {
          DEFAULT: '#7834C0',
          50: '#F4ECFB',
          100: '#E5D2F5',
          200: '#CFA5EC',
          300: '#B578E0',
          400: '#9A4FD3',
          500: '#7834C0',
          600: '#5F2A99',
          700: '#481E72',
          800: '#31144C',
          900: '#1B0A26',
          fg: '#FFFFFF',
        },
        brand: {
          DEFAULT: '#AF7AC9',
          50: '#F8F2FB',
          100: '#EFE0F4',
          200: '#DFC0E9',
          300: '#CFA0DD',
          400: '#BF81D2',
          500: '#AF7AC9',
          600: '#8C61A1',
          700: '#684979',
          800: '#463151',
          900: '#231828',
        },
        accent: {
          DEFAULT: '#D2AE3F',
          50: '#FAF5E2',
          100: '#F2E5B0',
          200: '#E8D27F',
          300: '#DEBF4F',
          400: '#D2AE3F',
          500: '#B09432',
          600: '#8E7626',
          700: '#6B5819',
          800: '#483A0D',
          900: '#261D00',
        },
        deep: {
          DEFAULT: '#4C2C73',
          50: '#EFE8F5',
          100: '#D5C3E2',
          200: '#B89DCC',
          300: '#9A77B5',
          400: '#7E519F',
          500: '#4C2C73',
          600: '#3D235E',
          700: '#2E1B48',
          800: '#1F1233',
          900: '#0F091A',
        },
        bg: {
          DEFAULT: '#7D60A4',
          light: '#A288C0',
          dark: '#5C4483',
        },
        // Semantic tokens (kept for backward compat with existing components)
        foreground: '#1B0A26',
        background: '#7D60A4',
        surface: '#FFFFFF',
        'surface-light': '#F4ECFB',
        border: '#CFA5EC',
        muted: '#F4ECFB',
        'muted-foreground': '#5F2A99',
        ring: '#7834C0',
        success: '#6ee7b7',
        error: '#fca5a5',
        warning: '#D2AE3F',
      },
      fontFamily: {
        // Headings — Press Start 2P (pixel/retro/cyberpunk), self-hosted
        heading: ['"Press Start 2P"', 'ui-monospace', 'monospace'],
        // Library reserve — Bitcount Grid Double (not loaded by default, swap-in candidate)
        cyber: ['"Bitcount Grid Double"', '"Press Start 2P"', 'monospace'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(76, 44, 115, 0.20)',
        'card-hover': '0 8px 24px rgba(120, 52, 192, 0.45)',
        button: '0 4px 12px rgba(120, 52, 192, 0.35)',
        nav: '0 2px 4px rgba(28, 11, 39, 0.30)',
        glow: '0 0 24px rgba(120, 52, 192, 0.55)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      backgroundImage: {
        // Solid-color SVG patterns (no gradients per canonical palette)
        'cyber-grid':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><path d='M0 0H32V1H0zM0 0V32H1V0z' fill='rgba(120,52,192,0.08)'/></svg>\")",
        // Replaced radial glow with a soft solid ellipse via SVG
        'cyber-radial':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'><ellipse cx='200' cy='0' rx='260' ry='120' fill='rgba(120,52,192,0.35)'/></svg>\")",
      },
      backgroundSize: {
        'cyber-grid': '32px 32px',
      },
    },
  },
  plugins: [],
}

export default config
