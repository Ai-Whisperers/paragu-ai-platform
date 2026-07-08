'use client'

import { useEffect, useState } from "react"
import { X, Info } from "lucide-react"

const STORAGE_KEY = "demo_banner_dismissed_v1"

export default function DemoBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY)
      if (!dismissed) setShow(true)
    } catch {
      setShow(true)
    }
  }, [])

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true")
    } catch {
      /* ignore storage errors */
    }
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "relative",
        zIndex: 60,
        backgroundColor: "#FFF7E6",
        borderBottom: "1px solid #E8C97A",
        color: "#5A4500",
        padding: "0.625rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.625rem",
        fontSize: "0.8125rem",
        lineHeight: 1.4,
        textAlign: "center",
      }}
    >
      <Info size={15} style={{ flexShrink: 0, color: "#8B6A00" }} />
      <span style={{ fontWeight: 500 }}>
        <strong style={{ fontWeight: 700 }}>Sitio de demostración.</strong>{" "}
        Esta es una página de ejemplo de un estudio jurídico, creada para mostrar
        nuestro trabajo a posibles clientes. Los datos, nombres y servicios son
        ilustrativos.
      </span>
      <button
        onClick={dismiss}
        aria-label="Cerrar aviso"
        style={{
          position: "absolute",
          right: "0.75rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "0.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5A4500",
          borderRadius: "4px",
        }}
      >
        <X size={16} />
      </button>
    </div>
  )
}