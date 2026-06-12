import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/CartContext'
import { Analytics, TrackCtas } from "../components/analytics"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Reina de Copas",
  url: "https://reina-de-copas.paragu-ai.com",
  image: "https://reina-de-copas.paragu-ai.com/og/og-image.png",
  telephone: "+595****0000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Asunción",
    addressRegion: "Central",
    addressCountry: "PY"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.2637,
    longitude: -57.5759
  },
  "sameAs": ["https://instagram.com/reinadecopas"]
}

export const metadata: Metadata = {
  title: 'Reina de Copas Paraguay — Copas y Discos Menstruales',
  description:
    'Copa y disco menstrual reutilizable. Ecológica, económica y segura. +1750 copas vendidas desde 2018. Envíos a todo Paraguay.',
  openGraph: {
    title: 'Reina de Copas Paraguay — Tu período, tu poder',
    description: 'Copas y discos menstruales ecológicos, económicos y seguros. Envíos a todo Paraguay.',
    images: ['/images/og-social.jpg'],
    type: 'website',
    locale: 'es_PY',
    siteName: 'Reina de Copas Paraguay',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reina de Copas Paraguay',
    description: 'Copas y discos menstruales. Ecológicos, económicos, seguros.',
    images: ['/images/og-social.jpg'],
  },

  alternates: { canonical: "https://reina-de-copas.paragu-ai.com", languages: { "es": "https://reina-de-copas.paragu-ai.com/" } },}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta property="og:image" content="https://reina-de-copas.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://reina-de-copas.paragu-ai.com" />
        <meta property="og:site_name" content="Reina de Copas" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://reina-de-copas.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </head>
      <body
        style={{
          fontFamily:
            "'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <Analytics />
        <TrackCtas />

        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
