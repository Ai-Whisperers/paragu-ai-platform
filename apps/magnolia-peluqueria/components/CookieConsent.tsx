"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface CookieConsentProps {
  lang?: "es" | "en"
}

export function CookieConsent({ lang = "es" }: CookieConsentProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("magnolia-cookie-consent")
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem("magnolia-cookie-consent", "accepted")
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem("magnolia-cookie-consent", "declined")
    setShow(false)
  }

  if (!show) return null

  const message = lang === "es"
    ? "Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptás nuestra política de cookies."
    : "We use cookies to improve your experience. By continuing to browse, you accept our cookie policy."

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        background: "hsl(var(--card, 0 0% 100%))",
        borderTop: "1px solid hsl(var(--border, 220 13% 91%))",
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.08)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          color: "hsl(var(--muted-foreground, 220 9% 46%))",
          margin: 0,
          flex: "1 1 300px",
        }}
      >
        {message}
      </p>
      <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: "8px 16px",
            fontSize: "13px",
            border: "1px solid hsl(var(--border, 220 13% 91%))",
            borderRadius: "6px",
            background: "transparent",
            cursor: "pointer",
            color: "hsl(var(--foreground, 0 0% 9%))",
            fontWeight: 500,
          }}
        >
          {lang === "es" ? "Rechazar" : "Decline"}
        </button>
        <button
          onClick={accept}
          style={{
            padding: "8px 16px",
            fontSize: "13px",
            border: "none",
            borderRadius: "6px",
            background: "hsl(var(--primary, 330 80% 50%))",
            color: "hsl(var(--primary-foreground, 0 0% 100%))",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {lang === "es" ? "Aceptar" : "Accept"}
        </button>
      </div>
    </div>
  )
}