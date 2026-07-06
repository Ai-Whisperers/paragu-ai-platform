"use client"

import { THEMES, type ThemeId } from "@/lib/themes"
import { useTheme } from "@/components/ThemeProvider"

type Locale = "en" | "es"

const COPY: Record<Locale, { title: string; subtitle: string; active: string; preview: string }> = {
  en: {
    title: "Theme",
    subtitle: "Pick a color palette. Your choice is saved on this device.",
    active: "Active",
    preview: "Preview",
  },
  es: {
    title: "Tema",
    subtitle: "Elige una paleta de colores. Tu elección se guarda en este dispositivo.",
    active: "Activo",
    preview: "Vista previa",
  },
}

export function ThemeSelector({ locale }: { locale: Locale }) {
  const { theme, setTheme } = useTheme()
  const copy = COPY[locale] ?? COPY.en

  return (
    <section aria-labelledby="theme-selector-title" className="space-y-4">
      <header>
        <h2
          id="theme-selector-title"
          className="text-2xl md:text-3xl font-heading"
          style={{ color: "var(--fg)" }}
        >
          {copy.title}
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
          {copy.subtitle}
        </p>
      </header>

      <ul
        role="radiogroup"
        aria-label={copy.title}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {THEMES.map((t) => {
          const active = t.id === theme
          return (
            <li key={t.id}>
              <button
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setTheme(t.id as ThemeId)}
                className="w-full text-left rounded-xl p-4 transition-all focus:outline-none focus-visible:ring-2"
                style={{
                  background: "var(--surface)",
                  border: `2px solid ${active ? "var(--accent)" : "var(--border-light)"}`,
                  boxShadow: active ? "var(--shadow-md)" : "var(--shadow-sm)",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="font-heading text-lg"
                    style={{ color: "var(--fg)" }}
                  >
                    {t.name[locale] ?? t.name.en}
                  </span>
                  {active && (
                    <span
                      className="text-xs uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{
                        background: "var(--accent)",
                        color: "var(--surface)",
                      }}
                    >
                      {copy.active}
                    </span>
                  )}
                </div>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {t.description[locale] ?? t.description.en}
                </p>
                <div
                  className="mt-3 flex gap-1.5"
                  aria-label={copy.preview}
                >
                  {t.swatches.map((c, i) => (
                    <span
                      key={`${t.id}-${i}`}
                      className="h-6 w-6 rounded-full border"
                      style={{
                        background: c,
                        borderColor: "rgba(0,0,0,0.08)",
                      }}
                      title={c}
                    />
                  ))}
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
