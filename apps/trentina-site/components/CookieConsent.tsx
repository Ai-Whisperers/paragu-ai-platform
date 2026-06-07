"use client"

import { useState, useEffect } from "react"

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        background: "var(--color-surface, #1A1A1A)",
        borderTop: "1px solid var(--color-border, #333333)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          color: "var(--color-text-light, #D0C8B8)",
          margin: 0,
          flex: "1 1 300px",
        }}
      >
        Usamos cookies para mejorar tu experiencia en&nbsp;
        <strong style={{ color: "var(--color-accent, #D4)" }}>Trentina</strong>.
        Al continuar navegando, aceptás nuestra política de cookies.
      </p>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: "8px 16px",
            fontSize: "13px",
            border: "1px solid var(--color-border, #333333)",
            borderRadius: "6px",
            background: "transparent",
            cursor: "pointer",
            color: "var(--color-text-light, #D0C8B8)",
          }}
        >
          Rechazar
        </button>
        <button
          onClick={accept}
          style={{
            padding: "8px 16px",
            fontSize: "13px",
            border: "none",
            borderRadius: "6px",
            background: "var(--color-accent, #D4A44C)",
            color: "var(--color-background, #0D0D0D)",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
