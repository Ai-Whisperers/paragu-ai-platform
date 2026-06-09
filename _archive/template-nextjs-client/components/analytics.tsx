"use client"
import content from "@/content/es.json"

export function Analytics() {
  return (
    <>
      {/* GA4 */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"}`} />
      <script dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"}');`
      }} />
    </>
  )
}
