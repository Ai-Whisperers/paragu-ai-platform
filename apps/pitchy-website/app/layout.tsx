import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { WhatsAppFloat } from "@ai-whisperers/whatsapp"
import { MobileCta } from "@/components/mobile-cta"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import content from "@/content/es.json"

const c = content as Record<string, any>
const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(c.site?.url || "https://pitchy.paragu-ai.com"),
  title: { default: c.site?.title || "Pitchy Blindex", template: `%s | ${c.site?.title || "Pitchy Blindex"}` },
  description: c.site?.description || "Vidrio Blindex para construcción en Paraguay. Templado, laminado, DVH y muro cortina.",
  openGraph: { title: c.site?.title, description: c.site?.description, locale: "es_PY", type: "website" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content={c.theme?.color || "#0F62FE"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: c.site?.title || "Pitchy Blindex",
              description: c.site?.description || "Vidrio Blindex para construcción en Paraguay",
              url: c.site?.url || "https://pitchy.paragu-ai.com",
              telephone: c.contact?.whatsapp || "",
              image: c.site?.ogImage || "",
              address: { "@type": "PostalAddress", addressLocality: "Asunción", addressCountry: "PY" },
              priceRange: "$$$",
            }),
          }}
        />
      </head>
      <body className="antialiased pb-20 md:pb-0 min-h-screen flex flex-col bg-white text-[#1A1A2E]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat phone={c.contact?.whatsapp || ""} message={c.whatsapp?.defaultMessage} />
        <MobileCta />
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
