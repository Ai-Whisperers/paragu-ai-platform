"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface GA4LoaderProps {
  measurementId?: string | null
}

export function GA4Loader({ measurementId }: GA4LoaderProps) {
  if (!measurementId) return null

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', { page_path: window.location.pathname });
          `,
        }}
      />
    </>
  )
}

// Page view event helper
export function trackPageView(url: string, title?: string) {
  if (typeof window === "undefined") return
  const gtag = (window as any).gtag
  if (typeof gtag === "function") {
    gtag("event", "page_view", { page_location: url, page_title: title })
  }
}