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
  metadataBase: new URL("https://bichos-gym.paragu-ai.com"),
  title: {
    default: "Bicho's Gym | Gimnasio en Capiatá",
    template: "%s | Bicho's Gym",
  },
  description: "Gimnasio completo en Capiatá con entrenadores certificados. Pesas, cardio, funcional, crossfit, spinning y yoga. Sumate y transformá tu cuerpo.",
  keywords: ["gimnasio", "Capiatá", "entrenamiento", "pesas", "crossfit", "funcional", "spinning", "yoga", "fitness", "Paraguay"],
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "https://bichos-gym.paragu-ai.com" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Bicho's Gym | Gimnasio en Capiatá",
    description: "Gimnasio completo con entrenadores certificados. Pesas, cardio, funcional, crossfit, spinning y yoga.",
    url: "https://bichos-gym.paragu-ai.com",
    siteName: "Bicho's Gym",
    locale: "es_PY",
    type: "website",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bicho's Gym | Gimnasio en Capiatá",
    description: "Gimnasio completo con entrenadores certificados. Pesas, cardio, funcional, crossfit, spinning y yoga.",
    images: ["/images/og-default.jpg"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Bicho's Gym",
    description: "Gimnasio completo con entrenadores certificados y el mejor ambiente para alcanzar tus metas fitness",
    url: "https://bichos-gym.paragu-ai.com",
    image: "https://bichos-gym.paragu-ai.com/images/og-default.jpg",
    address: { "@type": "PostalAddress", addressLocality: "Capiatá", addressCountry: "PY" },
    telephone: "+595986106062",
    openingHours: "Mo-Sa 07:00-21:00, Su 09:00-13:00",
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
      <body className="font-body antialiased bg-[#f5f5f5] text-[#2d2d2d]">
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
