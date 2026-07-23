export type ThemeId =
  | "default"
  | "lilac"
  | "discreet"
  | "friend"
  | "pin"
  | "shades"
  | "random"

export interface ThemeInfo {
  id: ThemeId
  name: { en: string; es: string }
  description: { en: string; es: string }
  swatches: string[]
}

export const THEMES: ThemeInfo[] = [
  {
    id: "default",
    name: { en: "Ocean (Default)", es: "Océano (Predeterminado)" },
    description: {
      en: "Original navy & cyan brand palette",
      es: "Paleta original azul marino y cian",
    },
    swatches: ["#caf0f8", "#ade8f4", "#023e8a", "#03045e", "#FFEF00"],
  },
  {
    id: "lilac",
    name: { en: "Lilac", es: "Lila" },
    description: {
      en: "Thistle → Deep Lilac 10-shade purple scale",
      es: "Escala de 10 tonos púrpura: Cardo → Lila profundo",
    },
    swatches: [
      "#dec9e9",
      "#c19ee0",
      "#a06cd5",
      "#7251b5",
      "#6247aa",
    ],
  },
  {
    id: "discreet",
    name: { en: "Discreet", es: "Discreta" },
    description: {
      en: "Soft rose-cream, low contrast, quiet accent",
      es: "Rosa cremoso suave, bajo contraste, acento tranquilo",
    },
    swatches: ["#fff6ff", "#fff7d0", "#e4a5ff", "#a387af"],
  },
  {
    id: "friend",
    name: { en: "Friend", es: "Amiga" },
    description: {
      en: "Welcoming purple with teal duotone accent",
      es: "Púrpura acogedora con acento verde azulado",
    },
    swatches: ["#e4a5ff", "#642e7f", "#007668", "#00c9b6"],
  },
  {
    id: "pin",
    name: { en: "Pin", es: "Alfiler" },
    description: {
      en: "Cream field, plum ink, teal accent",
      es: "Campo crema, tinta ciruela, acento verde azulado",
    },
    swatches: ["#e4a5ff", "#6c1f92", "#fffade", "#005b50"],
  },
  {
    id: "shades",
    name: { en: "Shades", es: "Matices" },
    description: {
      en: "Deep purple monochrome ladder",
      es: "Escala monocromática púrpura profunda",
    },
    swatches: ["#e4a5ff", "#b87cd3", "#8e55a9", "#663080", "#3f085a"],
  },
  {
    id: "random",
    name: { en: "Random Shades", es: "Matices Aleatorios" },
    description: {
      en: "High-contrast neon violet mix",
      es: "Mezcla violeta neón de alto contraste",
    },
    swatches: ["#e4a5ff", "#440e5f", "#eaaaff", "#b175cc", "#b67ad1"],
  },
]

export const DEFAULT_THEME: ThemeId = "lilac"
export const THEME_STORAGE_KEY = "dra-gabriela-theme"

export function isThemeId(value: unknown): value is ThemeId {
  return (
    typeof value === "string" &&
    THEMES.some((t) => t.id === value)
  )
}
