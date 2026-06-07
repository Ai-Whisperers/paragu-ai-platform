"use client"
import { useState } from "react"

interface CookieConsentProps {
  lang?: "es" | "en"
}

export function CookieConsent({ lang = "es" }: CookieConsentProps) {
  const [visible, setVisible] = useState(false)

  useState(() => {
    const key = "magnolia_cookie_consent"
    const consent = localStorage.getItem(key)
    if (!consent) setVisible(true)
  })

  function accept() {
    localStorage.setItem("magnolia_cookie_consent", "accepted")
    setVisible(false)
    window.dispatchEvent(new CustomEvent("cookie-consent-accepted"))
  }

  function decline() {
    localStorage.setItem("magnolia_cookie_consent", "declined")
    setVisible(false)
    window.dispatchEvent(new CustomEvent("cookie-consent-declined"))
  }

  if (!visible) return null

  const message = lang === "es"
    ? "Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptás nuestra política de cookies."
    : "We use cookies to improve your experience. By continuing to browse, you accept our cookie policy."

  return (
    <div className="fixed bottom-0 inset-x-0 z-[9998] bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="container-page flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="text-sm text-foreground flex-1 leading-relaxed">
          🍪 {message}
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
          >
            {lang === "es" ? "Rechazar" : "Decline"}
          </button>
          <button
            onClick={accept}
            className="px-6 py-2 text-sm font-bold bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors"
          >
            {lang === "es" ? "Aceptar" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  )
}