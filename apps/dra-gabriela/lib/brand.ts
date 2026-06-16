// Centralised brand & spacing constants. Tied to content/tokens.json so that
// any palette/font changes in the JSON flow through CSS variables. Keep this
// file thin — the heavy lifting happens in app/globals.css and tailwind config.

export const BRAND = {
  // Teal/gold premium-conservative palette. Mirrors content/tokens.json.
  accent: "#0f4c4c",         // deep teal — primary CTA, headings
  accentHover: "#0a3a3a",    // hover state
  accentSoft: "#e6efef",     // tinted background
  gold: "#c9a84c",           // gold accent for highlights
  goldHover: "#b08f38",
  bg: "#fbf9f6",             // warm off-white background
  surface: "#ffffff",        // card / panel
  surfaceMuted: "#efede8",
  ink: "#1c1c1c",            // body text
  inkMuted: "#6b5e52",
  inkSubtle: "#9a8c7e",
  success: "#2d7a5f",
  error: "#c0392b",
  warning: "#b57f18",
  border: "#e7e2d8",
} as const

export const RADIUS = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  pill: "9999px",
} as const

export const SHADOW = {
  sm: "0 1px 2px rgba(15,76,76,0.04), 0 1px 3px rgba(15,76,76,0.06)",
  md: "0 4px 12px rgba(15,76,76,0.06), 0 2px 4px rgba(15,76,76,0.04)",
  lg: "0 12px 32px rgba(15,76,76,0.10), 0 4px 8px rgba(15,76,76,0.06)",
} as const

export const FONT = {
  heading: "var(--font-heading, 'DM Serif Display'), Georgia, serif",
  body: "var(--font-body, 'Inter'), system-ui, sans-serif",
} as const
