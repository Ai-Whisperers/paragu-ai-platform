"use client"
import { useEffect } from "react"

declare global { interface Window { gtag?: any; dataLayer?: any[] } }

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
    window.gtag = function () { window.dataLayer!.push(arguments) }
    window.gtag("js", new Date())
    window.gtag("config", GA_ID, { send_page_view: true })
  }, [])
  return null
}

export function trackEvent(action: string, params?: Record<string, any>) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", action, params)
    }
  } catch {}
}

export function TrackCtas() {
  useEffect(() => {
    if (typeof document === "undefined") return
    const w = window as any
    if (w.__aiwaTracked) return
    w.__aiwaTracked = true
    document.addEventListener("click", (e) => {
      const t = e.target as HTMLElement
      if (!t) return
      const wa = t.closest('a[href*="wa.me"]') as HTMLAnchorElement | null
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
  return null
}
