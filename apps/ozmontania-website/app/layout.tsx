import CookieConsent from "@/components/CookieConsent"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppFloat from '@/components/whatsapp-float'
import es from '@/content/es.json'
import type { SiteContent } from '@/types/content'

const content = es as unknown as SiteContent

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Oz Montaña",
  url: "https://ozmontania.paragu-ai.com",
  image: "https://ozmontania.paragu-ai.com/og/og-image.png",
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
  "sameAs": ["https://instagram.com/ozmontania"]
}

export const metadata: Metadata = {
  title: content.site.title + ' — ' + content.site.description,
  description: content.hero.description,
  openGraph: {
    title: content.site.title,
    description: content.site.description,
    url: content.site.url,
    siteName: content.site.title,
    locale: 'es_PY',
    type: 'website',
  },
  robots: { index: true, follow: true },

  alternates: { canonical: "https://ozmontania.paragu-ai.com", languages: { "es": "https://ozmontania.paragu-ai.com/" } },}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta property="og:image" content="https://ozmontania.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://ozmontania.paragu-ai.com" />
        <meta property="og:site_name" content="OzMontaña" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ozmontania.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloat />
              <CookieConsent />
      </body>
    </html>
  )
}
