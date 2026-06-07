import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const s = content.site

export const metadata: Metadata = {
  metadataBase: new URL("https://villamayor.paragu-ai.com"),
  title: "Villamayor & Asociados | Estudio Jurídico — Derecho Civil y Comercial",
  description: "Estudio jurídico en Paraguay especializado en derecho civil, comercial, corporativo, inmobiliario, laboral y de familia. Asesoría legal integral en Asunción.",
  keywords: "abogados Paraguay, estudio jurídico Asunción, derecho civil Paraguay, derecho comercial, abogado corporativo, contratos Paraguay, divorcio, inversiones Paraguay",
  alternates: { canonical: "https://villamayor.paragu-ai.com" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Villamayor & Asociados | Estudio Jurídico",
    description: "Asesoría legal integral en Paraguay. Derecho civil, comercial, corporativo, inmobiliario. Primera consulta sin costo.",
    url: "https://villamayor.paragu-ai.com",
    siteName: "Villamayor & Asociados",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    locale: "es_PY",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#1B2A4A" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KD29SX95E4" />
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-KD29SX95E4');`
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "Villamayor & Asociados",
            "description": s.description,
            "url": "https://villamayor.paragu-ai.com",
            "telephone": s.phone,
            "email": s.email,
            "image": "https://villamayor.paragu-ai.com/og-default.png",
            "address": { "@type": "PostalAddress", "addressLocality": s.city, "addressCountry": s.country },
            "founder": { "@type": "Person", "name": "Alejandro Villamayor" },
            "foundingDate": "2018",
            "priceRange": "Primera consulta sin costo",
            "sameAs": [
              `https://instagram.com/${s.instagram}`,
              `https://linkedin.com/in/${s.linkedin}`,
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Servicios Legales",
              "itemListElement": content.services.items.map((svc) => ({
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": svc.title, "description": svc.description },
              })),
            },
          })
        }} />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none">
          Ir al contenido principal
        </a>
        <div id="main-content">
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </div>
        <div className="h-20 md:h-0" />
      </body>
    </html>
  )
}
