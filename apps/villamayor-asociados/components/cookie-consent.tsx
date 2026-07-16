'use client'
import { useState, useEffect } from "react"

export function CookieConsent() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(!localStorage.getItem("cookie_consent"))
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_consent", "true")
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[99999] bg-text text-white py-3 px-6 flex items-center justify-between gap-4 flex-wrap text-sm shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
      <span>Este sitio usa cookies para mejorar tu experiencia.</span>
      <button onClick={accept} className="bg-blue-600 text-white border-none py-2 px-5 rounded-lg cursor-pointer font-semibold text-sm">Aceptar</button>
    </div>
  )
}
