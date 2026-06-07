'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9998,
      background: 'hsl(var(--card, 0 0% 100%))',
      borderTop: '1px solid hsl(var(--border, 220 13% 91%))',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flexWrap: 'wrap',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.08)',
    }}>
      <p style={{
        fontSize: '14px',
        color: 'hsl(var(--muted-foreground, 220 9% 46%))',
        margin: 0,
        flex: '1 1 300px',
      }}>
        Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra politica de cookies.
      </p>
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            border: '1px solid hsl(var(--border, 220 13% 91%))',
            borderRadius: '6px',
            background: 'transparent',
            cursor: 'pointer',
            color: 'hsl(var(--foreground, 0 0% 9%))',
          }}
        >
          Rechazar
        </button>
        <button
          onClick={accept}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            border: 'none',
            borderRadius: '6px',
            background: 'hsl(var(--primary, 220 90% 56%))',
            color: 'hsl(var(--primary-foreground, 0 0% 100%))',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  )
}
