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
  metadataBase: new URL("https://mantraspa.paragu-ai.com"),
  title: {
    default: "Mantra Spa | Masajes y Tratamientos en Concepción",
    template: "%s | Mantra Spa",
  },
  description: "Masajes relajantes, descontracturantes, tratamientos faciales y corporales en Concepción. Bienestar y relax con profesionales.",
  keywords: ["spa", "masajes", "Concepción", "tratamientos faciales", "bienestar", "relax", "Paraguay"],
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "https://mantraspa.paragu-ai.com" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Mantra Spa | Masajes y Tratamientos en Concepción",
    description: "Masajes relajantes, descontracturantes, tratamientos faciales y corporales en Concepción.",
    url: "https://mantraspa.paragu-ai.com",
    siteName: "Mantra Spa",
    locale: "es_PY",
    type: "website",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mantra Spa | Masajes y Tratamientos en Concepción",
    description: "Masajes relajantes, descontracturantes, tratamientos faciales y corporales en Concepción.",
    images: ["/images/og-default.jpg"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Mantra Spa",
    description: "Masajes relajantes, tratamientos corporales y experiencias de bienestar únicas",
    url: "https://mantraspa.paragu-ai.com",
    image: "https://mantraspa.paragu-ai.com/images/og-default.jpg",
    address: { "@type": "PostalAddress", addressLocality: "Concepción", addressCountry: "PY" },
    telephone: "+595986106062",
    openingHours: "Mo-Sa 10:00-20:00",
    priceRange: "$$",
  }

  return (
    <html lang="es" className={montserrat.variable + " " + playfair.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-[#f8f7f4] text-[#2d2d2d]">
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
