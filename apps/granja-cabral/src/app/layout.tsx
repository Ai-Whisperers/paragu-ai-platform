import CookieConsent from "@/components/CookieConsent"
import WhatsAppButton from "@/components/WhatsAppButton"
import JsonLd from "@/components/JsonLd"
import type { Metadata } from 'next'
import './globals.css'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { Analytics, TrackCtas } from "../../components/analytics"

function getSeo() {
  const p = path.join(process.cwd(), 'content', 'es.json')
  if (!existsSync(p)) return null
  try { return JSON.parse(readFileSync(p, 'utf-8')) } catch { return null }
}

const seo = getSeo()
const seoTitle = seo?.home?.seo?.title || 'Granja Cabral — Huevos frescos en Coronel Oviedo'
const seoDesc = seo?.home?.seo?.description || 'Huevos frescos recolectados diariamente. Delivery en Coronel Oviedo y Ruta 2. Del nido a tu mesa.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDesc,
  openGraph: {
    title: seoTitle,
    description: seoDesc,
    url: 'https://cabral.paragu-ai.com',
    siteName: 'Granja Cabral',
    images: [{ url: 'https://cabral.paragu-ai.com/og/og-image.png', width: 1200, height: 630 }],
    locale: 'es_PY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDesc,
    images: ['https://cabral.paragu-ai.com/og/og-image.png'],
  },
  alternates: {
    canonical: 'https://cabral.paragu-ai.com',
    languages: {
      'es': 'https://cabral.paragu-ai.com/',
    },
  },
  icons: '/images/icons/favicon.png',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta property="og:image" content="https://granja-cabral.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://granja-cabral.paragu-ai.com" />
        <meta property="og:site_name" content="Granja Cabral" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://granja-cabral.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
          </head>
      <body>
        <Analytics />
        <TrackCtas />
{children}        <JsonLd />
        <WhatsAppButton phone="+595982911935" />
              <CookieConsent />
      </body>
    </html>
  )
}
