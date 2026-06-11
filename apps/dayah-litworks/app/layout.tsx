import CookieConsent from "@/components/CookieConsent"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { WhatsAppFloat } from "@/components/whatsapp-float"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://dayah.paragu-ai.com"),
  title: "Dayah LitWorks — Diseño de Portadas · Autora Amazon Prime Reading · Paraguay",
  description: "400+ portadas diseñadas. Autora seleccionada por Amazon Prime Reading. Portadas personalizadas, premades, maquetación y mockups 3D. Desde Paraguay para el mundo.",
  alternates: { canonical: "https://dayah.paragu-ai.com" },
  icons: [
    { rel: "icon", url: "/favicon.ico", sizes: "32x32" },
    { rel: "icon", url: "/favicon.png", sizes: "256x256" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  openGraph: {
    title: "Dayah LitWorks — Diseño de Portadas · Autora Amazon Prime Reading",
    description: "400+ portadas. Autora Prime Reading. Bestsellers en Amazon. Portadas personalizadas, premades, maquetación y mockups 3D.",
    url: "https://dayah.paragu-ai.com",
    siteName: "Dayah LitWorks",
    images: [{ url: "/dayah/cover-extreme.png", width: 1200, height: 1800 }],
    locale: "es_PY",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preload" href="/dayah/hero-new.webp" as="image" />
        <link rel="preload" href="/dayah/logo-color.png" as="image" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}" />
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',process.env.NEXT_PUBLIC_GA_ID);gtag('config',process.env.NEXT_PUBLIC_GA_ID,{send_page_view:true});`
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Dayah LitWorks",
            "description": "Diseño de portadas de libros. Portadas personalizadas, premades, maquetación interior y mockups 3D.",
            "url": "https://dayah.paragu-ai.com",
            "telephone": "+595986868241",
            "email": "dayahlitworks@gmail.com",
            "image": "https://dayah.paragu-ai.com/dayah/logo-color.png",
            "address": { "@type": "PostalAddress", "addressLocality": "Asunción", "addressCountry": "PY" },
            "founder": { "@type": "Person", "name": "Daihana Araujo" },
            "foundingDate": "2019-11-20",
            "priceRange": "Gs. 160.000 - 800.000",
            "sameAs": ["https://instagram.com/dayah.litworks", "https://www.facebook.com/bookc0verdesign/", "https://www.linkedin.com/in/daihana-araujo/"]
          })
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "¿Cuánto tarda una portada personalizada?", "acceptedAnswer": { "@type": "Answer", "text": "Depende del proyecto. Una portada ebook suele estar lista en 1 a 2 semanas." } },
              { "@type": "Question", "name": "¿Cómo es el proceso de pago?", "acceptedAnswer": { "@type": "Answer", "text": "Trabajo con 50% de anticipo para arrancar el proyecto y 50% contra entrega." } },
              { "@type": "Question", "name": "¿Puedo usar la portada en Amazon KDP?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, todos los archivos se entregan listos para subir a Amazon KDP, Google Play Books y más." } }
            ]
          })
        }} />
      </head>
      <body className="antialiased font-sans">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none">
          Ir al contenido principal
        </a>
        <div id="main-content">
          {children}
        </div>
        <div className="h-20 md:h-0" />
        <Analytics />
        <SpeedInsights />
        <WhatsAppFloat phone="595986868241" message="Hola! Quiero consultar sobre una portada de libro 📚" />
              <CookieConsent />
      </body>
    </html>
  )
}
