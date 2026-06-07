"use client"
import { useEffect } from "react"

export function QuickExitButton() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.location.href = "https://www.clima.com.py"
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <button onClick={() => window.location.href = "https://www.clima.com.py"}
      className="fixed top-3 right-3 z-[99999] flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
      title="Salida rápida (ESC)">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>
      </svg>
      Salida rápida
    </button>
  )
}
