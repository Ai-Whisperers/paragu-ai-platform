"use client"

import { MessageCircle, X } from "lucide-react"
import { useEffect, useState } from "react"

// WhatsAppFloat — sticky bottom-right floating WhatsApp CTA button.
// Designed for mobile-first (90%+ of Paraguay enters from phone).
// Fixed positioning, never blocks major content, dismissable for 24h via sessionStorage.
// The link uses wa.me with a product-specific pre-filled message when configured.
//
// All copy uses Paraguayan voseante (in es locale).

export interface WhatsAppFloatProps {
  phone: string
  defaultMessage?: string
  label?: string
  productSlug?: string
}

export function WhatsAppFloat({
  phone,
  defaultMessage = "Hola, me interesa lo que hacen en Ai-Whisperers.",
  label = "Escribinos por WhatsApp",
  productSlug,
}: WhatsAppFloatProps) {
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem("aw-wa-dismissed") : null
      if (stored) {
        const ts = Number(stored)
        const elapsed = Date.now() - ts
        if (Number.isFinite(ts) && elapsed < 24 * 60 * 60 * 1000) setDismissed(true)
      }
    } catch {
      /* localStorage unavailable */
    }
  }, [])

  if (!mounted || dismissed) return null

  const text = defaultMessage || ""
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`

  if (open) {
    return (
      <div
        className="fixed bottom-4 right-4 z-50 max-w-xs w-[calc(100vw-2rem)] sm:w-80 rounded-2xl border border-green/40 bg-bg-elev shadow-2xl shadow-green/20 fade-in"
        role="dialog"
        aria-label="WhatsApp chat preview"
      >
        <div className="flex items-center justify-between p-3 border-b border-border bg-green/10 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">Ai-Whisperers</p>
              <p className="text-xs text-fg-muted">Respondemos al toque</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="text-fg-muted hover:text-fg p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-3">
          <div className="bg-bg-card rounded-xl p-3 mb-3 text-sm text-fg">
            {text}
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-green hover:bg-green/90 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Abrir WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              try {
                window.localStorage.setItem("aw-wa-dismissed", String(Date.now()))
              } catch {}
              setDismissed(true)
            }}
            className="block w-full text-center text-xs text-fg-muted hover:text-fg mt-2 py-1"
          >
            No mostrar por 24 horas
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={label}
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 bg-green hover:bg-green/90 text-white font-semibold pl-4 pr-5 py-3 rounded-full shadow-lg shadow-green/30 fade-in"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
