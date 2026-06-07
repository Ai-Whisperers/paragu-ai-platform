import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { AnalyticsProvider } from "@ai-whisperers/seo/analytics"
import { CookieConsent } from "@ai-whisperers/seo/cookie-consent"
import { WhatsAppFloat } from "@ai-whisperers/whatsapp/whatsapp-float"
import { LoadingBar, DarkModeToggle, BottomNav, PromoCarousel } from "@ai-whisperers/ui-extras"
import content from "@/content/es.json"

const c = content as any
const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(c.site?.url || "https://example.com"),
  title: { default: c.site?.title || "Mi Sitio", template: `%s | ${c.site?.title || "Mi Sitio"}` },
  description: c.site?.description || "",
  openGraph: { title: c.site?.title, description: c.site?.description, locale: "es_PY", type: "website" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content={c.theme?.color || "#1B5E20"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <LoadingBar />
        <DarkModeToggle storageKey="theme" />
        <AnalyticsProvider ga4={c.analytics?.ga4}>{children}</AnalyticsProvider>
        <WhatsAppFloat phone={c.contact?.whatsapp || ""} message={c.whatsapp?.defaultMessage} />
        <CookieConsent config={c.cookieConsent} />
        <BottomNav
          lang="es"
          items={[
            { label: "Inicio", href: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" },
            { label: "Tienda", href: "/tienda", icon: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" },
            { label: "Promociones", href: "/promociones", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
            { label: "Contacto", href: "/contacto", icon: "M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" },
            { label: "WhatsApp", href: `https://wa.me/${c.contact?.whatsapp || ""}?text=${encodeURIComponent("Hola! Quiero información")}`, icon: "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21", isExternal: true },
          ]}
        />
      </body>
    </html>
  )
}
