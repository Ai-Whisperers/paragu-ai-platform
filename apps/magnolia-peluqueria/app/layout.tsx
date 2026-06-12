import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Magnolia Peluquería",
  url: "https://magnolia-peluqueria.paragu-ai.com",
  image: "https://magnolia-peluqueria.paragu-ai.com/og/og-image.png",
  telephone: "+595****0000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Lorenzo",
    addressRegion: "Central",
    addressCountry: "PY"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.3396,
    longitude: -57.5190
  },
  "sameAs": ["https://instagram.com/magnolia.peluqueria"]
}

export const metadata: Metadata = {
  title: 'Magnolia Peluquería',
  description: 'Salón de belleza en San Lorenzo, Paraguay',

  alternates: { canonical: "https://magnolia-peluqueria.paragu-ai.com", languages: { "es": "https://magnolia-peluqueria.paragu-ai.com/" } },}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}