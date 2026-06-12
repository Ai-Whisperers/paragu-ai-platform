import CookieConsent from './components/CookieConsent'
import JsonLd from './components/JsonLd'
import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import { Analytics, TrackCtas } from "../components/analytics"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-heading',
})

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://deabastoacasa.paragu-ai.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: 'De Abasto a Casa — Mercado, prep y comidas listas. Puerta a puerta, en San Lorenzo.',
  description: 'Convertimos el caos del mercado en comida lista. Compras, mise-en-place y freezer meals. San Lorenzo, Paraguay.',
  openGraph: {
    title: 'De Abasto a Casa',
    description: 'Mercado, prep y comidas listas. Puerta a puerta.',
    url: BASE,
    siteName: 'De Abasto a Casa',
    locale: 'es_PY',
    type: 'website',
  },
  icons: {
    icon: '/images/brand/favicon.png',
    apple: '/images/brand/apple-touch-icon.png',
  },

  alternates: { canonical: "https://de-abasto-a-casa.paragu-ai.com", languages: { "es": "https://de-abasto-a-casa.paragu-ai.com/" } },}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable} scroll-smooth`}>
      <head>
        <meta property="og:image" content="https://de-abasto-a-casa.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://de-abasto-a-casa.paragu-ai.com" />
        <meta property="og:site_name" content="De Abasto a Casa" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://de-abasto-a-casa.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
          </head>
        <TrackCtas /><body className="min-h-screen bg-surface text-text font-sans">
        <Analytics />
        <TrackCtas />
{children}<JsonLd /><CookieConsent /></body>
    </html>
  )
}
