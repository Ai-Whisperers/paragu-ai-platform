"use client"
// Cookie consent banner — minimal, localStorage-based. No third-party tracker
// is loaded until the user opts in. We default-deny and store the user's choice
// in a single localStorage key so it survives page reloads.

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

const STORAGE_KEY = "dra-gp-cookie-consent"

export function CookieConsent({ locale }: { locale: string }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY)
      if (!v) setShow(true)
    } catch {
      // private mode or storage disabled — fail silent, don't show banner
    }
  }, [])

  function decide(value: "accepted" | "rejected") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {}
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label={locale === "es" ? "Aviso de cookies" : "Cookie notice"}
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 card p-4 md:p-5 shadow-2xl"
      style={{ boxShadow: "0 20px 60px rgba(15,76,76,0.25)" }}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl leading-none" aria-hidden>🍪</span>
        <div className="flex-1 text-sm text-[var(--fg-muted)] leading-relaxed">
          {locale === "es" ? (
            <>
              Usamos cookies solo si aceptás, para entender qué páginas funcionan.{" "}
              <Link href={`/${locale}/privacy`} className="underline">
                Más info
              </Link>
            </>
          ) : (
            <>
              We use cookies only if you accept, to understand which pages work.{" "}
              <Link href={`/${locale}/privacy`} className="underline">
                Learn more
              </Link>
            </>
          )}
        </div>
        <button
          onClick={() => decide("rejected")}
          className="p-1 -mt-1 -mr-1 text-[var(--fg-subtle)] hover:text-[var(--fg)]"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={() => decide("accepted")} className="btn btn-primary !py-2 !px-3 !text-sm flex-1">
          {locale === "es" ? "Aceptar" : "Accept"}
        </button>
        <button onClick={() => decide("rejected")} className="btn btn-outline !py-2 !px-3 !text-sm flex-1">
          {locale === "es" ? "Rechazar" : "Decline"}
        </button>
      </div>
    </div>
  )
}
