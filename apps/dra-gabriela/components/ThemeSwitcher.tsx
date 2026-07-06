"use client";

import { useEffect, useState } from "react";
import { Palette, Check } from "lucide-react";

export const THEMES = [
  { id: "warm-classic", name: "Warm Classic", desc: "Verde teal + gold — actual" },
  { id: "warm-colorful", name: "Warm Colorful", desc: "Coral + gold vibrante — onda scrubs" },
  { id: "serio-elegante", name: "Serio Elegante", desc: "Navy + champagne — premium clásico" },
  { id: "minimal-white", name: "Minimal White", desc: "Negro + gris — Apple-style" },
  { id: "discreet", name: "Discreet", desc: "Lavanda pastel + crema" },
  { id: "friend", name: "Friend", desc: "Purple + teal vibrante" },
  { id: "pin", name: "Pin", desc: "Purple profundo + cream + teal" },
  { id: "shades", name: "Shades", desc: "Gradiente purple claro → oscuro" },
  { id: "random-shades", name: "Random Shades", desc: "Purple gradient + bright" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "ometz-theme";

export function ThemeSwitcher({ variant = "floating" }: { variant?: "floating" | "inline" }) {
  const [current, setCurrent] = useState<ThemeId>("warm-classic");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as ThemeId | null;
    if (saved && THEMES.some((t) => t.id === saved)) {
      setCurrent(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  function applyTheme(id: ThemeId) {
    setCurrent(id);
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // localStorage might be blocked
    }
  }

  if (variant === "inline") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => applyTheme(t.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              current === t.id
                ? "border-accent bg-accent-soft"
                : "border-border hover:border-accent-light"
            }`}
            data-theme-example={t.id}
          >
            <ThemeSwatches id={t.id} />
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-fg">{t.name}</div>
                <div className="text-xs text-fg-muted">{t.desc}</div>
              </div>
              {current === t.id && <Check className="w-4 h-4 text-accent" />}
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-border p-3 flex flex-col gap-2 w-64">
          <div className="text-xs font-bold text-fg-muted uppercase tracking-wider px-2 pb-1">Elegí tema</div>
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                applyTheme(t.id);
                setOpen(false);
              }}
              className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                current === t.id ? "bg-accent-soft" : "hover:bg-surface-muted"
              }`}
            >
              <div className="flex items-center gap-2">
                <ThemeSwatches id={t.id} compact />
                <div>
                  <div className="text-sm font-semibold text-fg">{t.name}</div>
                  <div className="text-[10px] text-fg-muted">{t.desc}</div>
                </div>
              </div>
              {current === t.id && <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-accent text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        aria-label="Cambiar tema"
      >
        <Palette className="w-5 h-5" />
      </button>
    </div>
  );
}

function ThemeSwatches({ id, compact = false }: { id: ThemeId; compact?: boolean }) {
  const colors = getSwatchColors(id);
  const size = compact ? "w-8 h-8" : "w-full h-12";
  return (
    <div className={`${compact ? "" : "rounded-lg overflow-hidden flex"} ${size}`}>
      {Object.entries(colors).map(([k, c]) => (
        <div
          key={k}
          className={`${compact ? "w-2 h-full" : "flex-1 h-full"}`}
          style={{ background: c }}
          title={k}
        />
      ))}
    </div>
  );
}

function getSwatchColors(id: ThemeId): Record<string, string> {
  switch (id) {
    case "warm-classic":
      return { bg: "#fbf9f6", accent: "#0f4c4c", gold: "#c9a84c", fg: "#1c1c1c" };
    case "warm-colorful":
      return { bg: "#fffaf0", accent: "#e07856", gold: "#f4b860", fg: "#2d3142" };
    case "serio-elegante":
      return { bg: "#ffffff", accent: "#1b2845", gold: "#b8956a", fg: "#1a1a1a" };
    case "minimal-white":
      return { bg: "#ffffff", accent: "#000000", gold: "#6b6b6b", fg: "#1a1a1a" };
    case "discreet":
      return { bg: "#fff6ff", accent: "#e4a5ff", gold: "#fff7d0", fg: "#2a1f30" };
    case "friend":
      return { bg: "#fff6ff", accent: "#642e7f", gold: "#00c9b6", fg: "#2a0e3f" };
    case "pin":
      return { bg: "#fffade", accent: "#6c1f92", gold: "#005b50", fg: "#2a0e3f" };
    case "shades":
      return { bg: "#fff6ff", accent: "#3f085a", gold: "#b87cd3", fg: "#3f085a" };
    case "random-shades":
      return { bg: "#fff6ff", accent: "#440e5f", gold: "#eaaaff", fg: "#440e5f" };
  }
}