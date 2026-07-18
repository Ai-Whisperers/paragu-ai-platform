"use client"
import { useEffect } from "react"

type GtagFn = (...args: unknown[]) => void
declare global { interface Window { gtag?: GtagFn; dataLayer?: unknown[] } }

const GA_ID = "G-X2XQZR3J6K"

export function Analytics() {
  useEffect(() => {
    if (typeof window === "undefined" || document.getElementById("ga-script")) return
    const s = document.createElement("script")
    s.id = "ga-script"
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function(...args: unknown[]) { window.dataLayer!.push(args) }
    window.gtag("js", new Date())
    window.gtag("config", GA_ID)
  }, [])
  return null
}

export function trackEvent(action: string, params?: Record<string, unknown>) {
  try { if (typeof window !== "undefined" && window.gtag) window.gtag("event", action, params) } catch (err) { console.debug("[analytics] gtag event failed", err) }
}
