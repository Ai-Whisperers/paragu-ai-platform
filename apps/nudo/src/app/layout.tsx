import CookieConsent from "@/components/CookieConsent"
import JsonLd from "@/components/JsonLd"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nüdo — Hardcore Metal desde Capiatá, Paraguay',
  description: 'Hardcore Metal / Metalcore desde Capiatá, Paraguay. Fundada en 2017. DESAHOGO EP (2025) — Bad Vibes Records.',
  openGraph: {
    title: 'Nüdo — Hardcore Metal',
    description: 'Hardcore Metal desde Capiatá, Paraguay. Fundada en 2017.',
    siteName: 'Nüdo',
    type: 'website',
  },

  alternates: { canonical: "https://nudo.paragu-ai.com", languages: { "es": "https://nudo.paragu-ai.com/" } },}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta property="og:image" content="https://nudo.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://nudo.paragu-ai.com" />
        <meta property="og:site_name" content="Nudo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://nudo.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
          </head>
      <body>{children}        <JsonLd />
              <CookieConsent />
      </body>
    </html>
  )
}
