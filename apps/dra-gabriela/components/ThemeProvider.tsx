"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  isThemeId,
  type ThemeId,
} from "@/lib/themes"

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (id: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readInitialTheme(): ThemeId {
  if (typeof document === "undefined") return DEFAULT_THEME
  const attr = document.documentElement.getAttribute("data-theme")
  if (isThemeId(attr)) return attr
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (isThemeId(stored)) return stored
  } catch {
    // localStorage blocked (private mode / SSR) — fall through
  }
  return DEFAULT_THEME
}

function applyTheme(id: ThemeId) {
  if (typeof document === "undefined") return
  if (id === "default") {
    document.documentElement.removeAttribute("data-theme")
  } else {
    document.documentElement.setAttribute("data-theme", id)
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME)

  useEffect(() => {
    const initial = readInitialTheme()
    setThemeState(initial)
    applyTheme(initial)
  }, [])

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id)
    applyTheme(id)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, id)
    } catch (err) {
      console.warn("ThemeProvider: unable to persist theme", err)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>")
  return ctx
}
