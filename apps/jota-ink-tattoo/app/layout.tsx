import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CookieConsent } from "@/components/cookie-consent"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import content from "@/content/es.json"

const c = content as Record<string, unknown>
const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(c.site?.url || "https://jottaink.paragu-ai.com"),
  title: { default: c.site?.title || "Jota Ink", template: `%s | ${c.site?.title || "Jota Ink"}` },
  description: c.site?.description || "",
  openGraph: { title: c.site?.title, description: c.site?.description, locale: "es_PY", type: "website" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💉</text></svg>" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: c.site?.title || "Jota Ink Tattoo",
              description: c.site?.description || "Tatuajes profesionales en Asunción",
              url: c.site?.url || "https://jottaink.paragu-ai.com",
              telephone: c.contact?.whatsapp || "",
              image: c.site?.ogImage || "",
              address: { "@type": "PostalAddress", addressLocality: "Asunción", addressCountry: "PY" },
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat phone={c.contact?.whatsapp || ""} message={c.whatsapp?.defaultMessage} />
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
