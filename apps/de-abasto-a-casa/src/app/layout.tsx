import CookieConsent from './components/CookieConsent'
import JsonLd from './components/JsonLd'
import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable} scroll-smooth`}>
      <body className="min-h-screen bg-surface text-text font-sans">{children}<JsonLd /><CookieConsent /></body>
    </html>
  )
}
