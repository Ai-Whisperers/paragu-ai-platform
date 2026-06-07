"use client"
import { useState, useEffect } from "react"

const STORAGE_KEY = "pitchy_cookie_prefs"

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      const pref = localStorage.getItem(STORAGE_KEY)
      if (!pref) setShow(true)
    } catch { setShow(true) }
  }, [])

  const accept = (analytics: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics, essential: true }))
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[99999] bg-white border-t border-gray-200 p-4 md:p-5 shadow-xl">
      <div className="mx-auto max-w-3xl flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-[#1A1A2E] font-medium mb-1">Este sitio usa cookies</p>
          <p className="text-xs text-[#6B7280]">Usamos cookies esenciales y de análisis para mejorar tu experiencia.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => accept(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
            Solo necesarias
          </button>
          <button onClick={() => accept(true)}
            className="px-4 py-2 rounded-lg bg-[#0F62FE] text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}
