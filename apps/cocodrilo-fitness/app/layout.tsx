import CookieConsent from "@/components/CookieConsent"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"

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
  metadataBase: new URL("https://cocodrilo-fitness.paragu-ai.com"),
  title: "Complejo Cocodrilo",
  description: "Gimnasio completo, pileta climatizada y las mejores instalaciones para tu entrenamiento",
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "https://cocodrilo-fitness.paragu-ai.com", languages: { "es": "https://cocodrilo-fitness.paragu-ai.com/" } },
  openGraph: {
    title: "Complejo Cocodrilo",
    description: "Gimnasio completo, pileta climatizada y las mejores instalaciones para tu entrenamiento",
    url: "https://cocodrilo-fitness.paragu-ai.com",
    siteName: "Complejo Cocodrilo",
    locale: "es_PY",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Complejo Cocodrilo",
    description: "Gimnasio completo, pileta climatizada y las mejores instalaciones para tu entrenamiento",
    url: "https://cocodrilo-fitness.paragu-ai.com",
    image: "https://cocodrilo-fitness.paragu-ai.com/images/og-default.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Asunción",
      addressRegion: "Central",
      addressCountry: "PY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -25.2637,
      longitude: -57.5759,
    },
  }

  return (
    <html lang="es" className={montserrat.variable + " " + playfair.variable}>
      <head>
        <meta property="og:image" content="https://cocodrilo-fitness.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://cocodrilo-fitness.paragu-ai.com" />
        <meta property="og:site_name" content="Cocodrilo Fitness" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://cocodrilo-fitness.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">{children}        <CookieConsent />
      </body>
    </html>
  )
}
