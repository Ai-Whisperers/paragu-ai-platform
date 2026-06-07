"use client"
import { useState, useEffect } from "react"

export function CookieConsent({ config }: { config?: any }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent")
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-surface border-t border-border">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm text-foreground/60">Usamos cookies para mejorar tu experiencia en el sitio.</p>
        <button onClick={accept}
          className="shrink-0 rounded-lg bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold hover:bg-accent/90 transition-colors">
          Aceptar
        </button>
      </div>
    </div>
  )
}
