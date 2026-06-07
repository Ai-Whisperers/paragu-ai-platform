"use client"
import { useEffect } from "react"

export function GA4Loader({ gaId }: { gaId: string }) {
  useEffect(() => {
    if (!gaId || gaId === "G-XXXXXXXXXX") return

    const gtagScript = document.createElement("script")
    gtagScript.async = true
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(gtagScript)

    const inlineScript = document.createElement("script")
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `
    document.head.appendChild(inlineScript)
  }, [gaId])

  return null
}