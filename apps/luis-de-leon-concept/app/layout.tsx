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
  alternates: { canonical: "https://luis-de-leon-concept.paragu-ai.com" },
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
    image: "https://luis-de-leon-concept.paragu-ai.com/images/og-default.jpg",
  }

  return (
    <html lang="es" className={montserrat.variable + " " + playfair.variable}>
      <head>
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
