import CookieConsent from "@/components/CookieConsent"
import type { Metadata } from "next"
import { Playfair_Display, Lora, Inter } from "next/font/google"
import "./globals.css"
import { Analytics, TrackCtas } from "../components/analytics"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://escribania.paragu-ai.com"),
  title: "Escribanía en Paraguay | Fe Pública y Seguridad Jurídica",
  description: "Servicios notariales en Paraguay. Escrituras públicas, poderes, contratos, legalizaciones, apostillas y más. Atención personalizada con la confianza de la fe pública.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Escribanía — Fe Pública y Seguridad Jurídica",
    description: "Servicios notariales en Paraguay. Atención personalizada con la confianza de la fe pública.",
    type: "website",
    locale: "es_PY",
  },

  alternates: { canonical: "https://escribania-paraguay.paragu-ai.com", languages: { "es": "https://escribania-paraguay.paragu-ai.com/" } },}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${lora.variable} ${inter.variable}`}>
      <head>
        <meta property="og:image" content="https://escribania-paraguay.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://escribania-paraguay.paragu-ai.com" />
        <meta property="og:site_name" content="Escribanía Paraguay" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://escribania-paraguay.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Escribanía",
              description: "Servicios notariales en Paraguay. Fe pública y seguridad jurídica.",
              url: "https://escribania.paragu-ai.com",
              areaServed: "PY",
              availableLanguage: ["es"],
            }),
          }}
        />   </head>
      <body className="min-h-screen flex flex-col">
        <Analytics />
        <TrackCtas />

        {children}
              <CookieConsent />
      </body>
    </html>
  )
}
