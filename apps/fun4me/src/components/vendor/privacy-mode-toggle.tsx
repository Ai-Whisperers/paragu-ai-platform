"use client"
import { useState, useEffect } from "react"

export function PrivacyModeToggle() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fun4me_privacy_mode")
      if (saved === "true") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActive(true)
        document.documentElement.classList.add("privacy-mode")
      }
    } catch (err) {
      console.debug("[fun4me/privacy-mode-toggle] read failed — storage unavailable", err)
    }
  }, [])

  const toggle = () => {
    const next = !active
    setActive(next)
    try { localStorage.setItem("fun4me_privacy_mode", next ? "true" : "false") } catch (err) {
      console.debug("[fun4me/privacy-mode-toggle] write failed — likely quota exceeded or private mode", err)
    }
    document.documentElement.classList.toggle("privacy-mode", next)
  }

  return (
    <button onClick={toggle}
      className={`flex h-9 w-9 items-center justify-center rounded-md transition-all hover:bg-surface-light ${
        active ? "text-accent" : "text-muted-foreground"
      }`}
      title={active ? "Modo privado activo" : "Activar modo privado"}>
      {active ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>
        </svg>
      )}
    </button>
  )
}
