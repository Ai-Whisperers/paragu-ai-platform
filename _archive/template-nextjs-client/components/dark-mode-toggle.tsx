"use client"
import { useState, useEffect } from "react"

const STORAGE_KEY = "fun4me_theme"

export function DarkModeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === "light") {
        setDark(false)
        document.documentElement.classList.add("light")
      }
    } catch {}
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("light", !next)
    try { localStorage.setItem(STORAGE_KEY, next ? "dark" : "light") } catch {}
  }

  return (
    <button onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-all hover:bg-surface-light"
      aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}>
      {dark ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}
