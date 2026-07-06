// Centralised brand tokens. Mirrored by app/globals.css @theme block —
// keep this file in sync with the CSS custom properties.
//
// Palette: ocean blues #03045e → #caf0f8 (9-step scale),
// deep-blue accent, yellow for CTAs, pink for decor only.

export const BRAND = {
  navy: "#03045e",           // primary heading / trust anchor
  ink: "#03045e",            // body text
  inkMuted: "#023e8a",       // de-emphasised body
  inkSubtle: "#0353a4",      // meta lines — WCAG AA on pale-blue surfaces

  bg: "#caf0f8",             // pale-blue page background
  surface: "#ffffff",        // card / panel
  surfaceMuted: "#e4f6fb",

  accent: "#023e8a",         // deep blue — primary accent
  accentHover: "#03045e",
  accentSoft: "#ade8f4",

  yellow: "#FFEF00",         // bright yellow — CTAs
  yellowHover: "#E6D700",

  pink: "#FF69B4",           // hot pink — decorative flourishes only

  success: "#2d7a5f",
  error: "#c0392b",
  warning: "#b57f18",
  border: "#8ccbde",
  borderLight: "#b3dfeb",
} as const

export const RADIUS = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  pill: "9999px",
} as const

export const SHADOW = {
  sm: "0 1px 2px rgba(3,4,94,0.04), 0 1px 3px rgba(3,4,94,0.06)",
  md: "0 4px 12px rgba(3,4,94,0.06), 0 2px 4px rgba(3,4,94,0.04)",
  lg: "0 12px 32px rgba(3,4,94,0.10), 0 4px 8px rgba(3,4,94,0.06)",
} as const

export const FONT = {
  heading: "var(--font-heading, 'DM Serif Display'), Georgia, serif",
  body: "var(--font-body, 'Inter'), system-ui, sans-serif",
} as const
