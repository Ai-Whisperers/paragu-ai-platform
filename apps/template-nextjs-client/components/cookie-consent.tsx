"use client"
import { useState, useEffect } from "react"

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      const pref = localStorage.getItem("fun4me_cookie_prefs")
      if (!pref) setShow(true)
    } catch { setShow(true) }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("fun4me_cookie_prefs", JSON.stringify({ analytics: true, essential: true }))
    setShow(false)
  }

  const acceptEssential = () => {
    localStorage.setItem("fun4me_cookie_prefs", JSON.stringify({ analytics: false, essential: true }))
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[99999] bg-surface border-t border-border p-4 md:p-5 shadow-xl">
      <div className="mx-auto max-w-3xl flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-foreground font-medium mb-1">🍪 Este sitio usa cookies</p>
          <p className="text-xs text-muted-foreground">Usamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para mejorar tu experiencia.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={acceptEssential}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Solo necesarias
          </button>
          <button onClick={acceptAll}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}
