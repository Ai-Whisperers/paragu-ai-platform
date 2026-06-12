"use client"
import { useEffect } from "react"

declare global { interface Window { gtag?: any; dataLayer?: any[] } }

/**
 * Analytics — single source of truth for GA4 across all Ai-Whisperers client sites.
 * Loaded by site-template's layout.tsx with a single <Analytics /> tag.
 *
 * ID:  G-X2XQZR3J6K  (ParaguAI org shared property — was hardcoded in 23 of 39
 *                    sites as of June 2026; centralized here for the rest)
 *
 * For per-client isolation, set NEXT_PUBLIC_GA_ID env to a different ID.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-X2XQZR3J6K"

export function Analytics() {
  useEffect(() => {
    if (typeof window === "undefined" || document.getElementById("ga-script")) return
    const s = document.createElement("script")
    s.id = "ga-script"
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function() { window.dataLayer!.push(arguments) }
    window.gtag("js", new Date())
    window.gtag("config", GA_ID, { send_page_view: true })
  }, [])
  return null
}

/**
 * Track a custom event. Safe to call on the server (no-op there).
 * Use for: WhatsApp button clicks, form submissions, scroll depth, etc.
 */
export function trackEvent(action: string, params?: Record<string, any>) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", action, params)
    }
  } catch {}
}

/**
 * Auto-attach click listeners for the standard ParaguAI CTA patterns.
 * Call once in the client layout. It scans the document for:
 *   - any <a href="https://wa.me/..."> → event "whatsapp_click"
 *   - any <form> submit → event "form_submit"
 *   - any <button> with data-track attribute → event with that name
 *
 * Idempotent (only attaches once even with React re-renders).
 */
export function trackCtas() {
  useEffect(() => {
    if (typeof document === "undefined") return
    const w = window as any
    if (w.__aiwaTracked) return
    w.__aiwaTracked = true
    document.addEventListener("click", (e) => {
      const t = e.target as HTMLElement
      if (!t) return
      const wa = t.closest("a[href*=\"wa.me\"]") as HTMLAnchorElement | null
      if (wa) {
        const label = wa.getAttribute("data-cta") || wa.textContent?.trim().slice(0, 60) || "whatsapp"
        trackEvent("whatsapp_click", { cta_label: label, href: wa.href })
        return
      }
      const btn = t.closest("[data-track]") as HTMLElement | null
      if (btn) {
        const name = btn.getAttribute("data-track") || "click"
        trackEvent(name, { label: btn.textContent?.trim().slice(0, 60) })
      }
    })
    document.addEventListener("submit", (e) => {
      const f = e.target as HTMLFormElement
      if (f?.tagName === "FORM") {
        trackEvent("form_submit", { id: f.id, action: f.action })
      }
    })
  }, [])
}
