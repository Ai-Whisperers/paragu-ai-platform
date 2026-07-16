import CookieConsent from "@/components/CookieConsent"
import JsonLd from "@/components/JsonLd"
import type { Metadata } from "next"
import "./globals.css"
import { EntryModal } from "@/components/EntryModal"
import { LocaleProvider } from "@/lib/locale-context"
import { Analytics, TrackCtas } from "../../components/analytics"

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Golden Visa Advisory",
    url: "https://golden-visa-advisory.paragu-ai.com",
    image: "https://golden-visa-advisory.paragu-ai.com/og/og-image.png",
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
    "sameAs": ["https://instagram.com/goldenvisaadvisory"]
  }
  
export const metadata: Metadata = {
  title: "Golden Visa Advisory — Paraguai",
  description: "Market-building advisory firm helping Paraguayan businesses design investment products aligned with international Golden Visa demand. Direct advisory for foreign investors.",

  alternates: { canonical: "https://golden-visa-advisory.paragu-ai.com", languages: { "es": "https://golden-visa-advisory.paragu-ai.com/" } },}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:image" content="https://golden-visa-advisory.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://golden-visa-advisory.paragu-ai.com" />
        <meta property="og:site_name" content="Golden Visa Advisory" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://golden-visa-advisory.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap" rel="stylesheet" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </head>
      <body className="min-h-screen">
        <Analytics />
        <TrackCtas />

        <LocaleProvider>
          <EntryModal />
          {children}
        </LocaleProvider>
              <JsonLd />
              <CookieConsent />
      </body>
    </html>
  )
}
