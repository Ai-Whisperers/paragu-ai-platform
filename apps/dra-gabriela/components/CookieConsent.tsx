"use client"
// Cookie consent banner — minimal, localStorage-based. No third-party tracker
// is loaded until the user opts in. We default-deny and store the user's choice
// in a single localStorage key so it survives page reloads.
//
// Three actions:
//   - Accept  → opt in to analytics
//   - Decline → opt out (still uses localStorage for preferences only)
//   - X       → dismiss without choosing (treated as Decline, but not stored
//               — banner reappears next visit)
//
// Users can re-open the consent prompt from the footer link "Cookie settings".

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

const STORAGE_KEY = "dra-gp-cookie-consent"
type Choice = "accepted" | "rejected"

export function CookieConsent({ locale }: { locale: string }) {
  const [show, setShow] = useState(false)
  const isEs = locale === "es"

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY) as Choice | null
      // Show if no decision yet
      if (!v) setShow(true)
    } catch {
      // private mode or storage disabled — fail silent, don't show banner
    }
    // Listen for the "re-open" event from the footer
    function onReopen() {
      setShow(true)
    }
    window.addEventListener("dra-gp:reopen-cookie-consent", onReopen)
    return () => window.removeEventListener("dra-gp:reopen-cookie-consent", onReopen)
  }, [])

  function decide(value: Choice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {}
    setShow(false)
  }

  function dismiss() {
    // Dismiss without storing — banner will reappear on next visit
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label={isEs ? "Aviso de cookies" : "Cookie notice"}
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 card p-4 md:p-5 shadow-2xl"
      style={{ boxShadow: "0 20px 60px rgba(15,76,76,0.25)" }}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl leading-none flex-shrink-0" aria-hidden="true">🍪</span>
        <div id="cookie-consent-desc" className="flex-1 text-sm text-fg-muted leading-relaxed text-left">
          {isEs ? (
            <>
              Usamos cookies solo si aceptás, para entender qué páginas funcionan.{" "}
              <Link href={`/${locale}/privacy`} className="underline hover:text-accent">
                <span className="sr-only">{isEs ? "sobre cookies y privacidad" : "about cookies and privacy"}</span>
                {isEs ? "Más info" : "Learn more"}
              </Link>
              .
            </>
          ) : (
            <>
              We use cookies only if you accept, to understand which pages work.{" "}
              <Link href={`/${locale}/privacy`} className="underline hover:text-accent">
                <span className="sr-only">about cookies and privacy</span>
                Learn more
              </Link>
              .
            </>
          )}
        </div>
        <button
          onClick={dismiss}
          className="p-1 -mt-1 -mr-1 text-fg-subtle hover:text-fg rounded transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
          aria-label={isEs ? "Cerrar aviso" : "Close notice"}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => decide("accepted")}
          className="btn btn-primary !py-2 !px-3 !text-sm flex-1 min-h-[40px]"
        >
          {isEs ? "Aceptar" : "Accept"}
        </button>
        <button
          onClick={() => decide("rejected")}
          className="btn btn-outline !py-2 !px-3 !text-sm flex-1 min-h-[40px]"
        >
          {isEs ? "Rechazar" : "Decline"}
        </button>
      </div>
    </div>
  )
}
