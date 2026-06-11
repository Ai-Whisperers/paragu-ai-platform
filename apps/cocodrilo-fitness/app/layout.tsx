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
  alternates: { canonical: "https://cocodrilo-fitness.paragu-ai.com" },
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
  }

  return (
    <html lang="es" className={montserrat.variable + " " + playfair.variable}>
      <head>
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
