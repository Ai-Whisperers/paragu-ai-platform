import CookieConsent from "@/components/CookieConsent"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://luis-de-leon-concept.paragu-ai.com"),
  title: "Luis De León Concept",
  description: "Cortes de alta calidad, coloración experta y asesoría de imagen personalizada",
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "https://luis-de-leon-concept.paragu-ai.com", languages: { "es": "https://luis-de-leon-concept.paragu-ai.com/" } },
  openGraph: {
    title: "Luis De León Concept",
    description: "Cortes de alta calidad, coloración experta y asesoría de imagen personalizada",
    url: "https://luis-de-leon-concept.paragu-ai.com",
    siteName: "Luis De León Concept",
    locale: "es_PY",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Luis De León Concept",
    description: "Cortes de alta calidad, coloración experta y asesoría de imagen personalizada",
    url: "https://luis-de-leon-concept.paragu-ai.com",
    "email": "contacto@luisdeleonconcept.com",
    image: "https://luis-de-leon-concept.paragu-ai.com/images/og-default.jpg",
    address: { "@type": "PostalAddress", addressCountry: "PY" },
    geo: { "@type": "GeoCoordinates", latitude: -25.2637, longitude: -57.5759 },
    "sameAs": ["https://instagram.com/luisdeleonconcept"]
  }

  return (
    <html lang="es" className={montserrat.variable + " " + playfair.variable}>
      <head>
        <meta property="og:image" content="https://luis-de-leon-concept.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://luis-de-leon-concept.paragu-ai.com" />
        <meta property="og:site_name" content="Luis de León" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://luis-de-leon-concept.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Analytics />
        <SpeedInsights />
              <CookieConsent />
      </body>
    </html>
  )
}
