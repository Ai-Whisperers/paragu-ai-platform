import { JsonLd } from "@/components/vendor/json-ld"
import type { Metadata } from "next"
import "./globals.css"
import "./privacy-mode.css"
import { Inter } from "next/font/google"
import { AgeGate } from "@/components/vendor/age-gate"
import { Header } from "@/components/store/header"
import { Footer } from "@/components/store/footer"
import { WhatsAppFloat } from "@/components/store/whatsapp-float"
import { CookieConsent } from "@/components/vendor/cookie-consent"
import { BottomNav } from "@/components/vendor/bottom-nav"
import { ExitIntentPopup } from "@/components/vendor/exit-intent"
import { Analytics } from "@/components/vendor/analytics"
import { LoadingBar } from "@/components/vendor/loading-bar"
import { PromoCarousel } from "@/components/vendor/promo-carousel"
import { QuickExitButton } from "@/components/vendor/quick-exit"
import { SocialProof } from "@/components/vendor/social-proof"
import { GuestModeBanner } from "@/components/vendor/guest-mode"
import content from "@/content/es.json"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"], display: "swap" })

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Fun4Me Store",
  "description": "Tienda de bienestar y productos para adultos en Paraguay. Envío discreto, calidad garantizada.",
  "url": "https://fun4me.paragu-ai.com",
  "telephone": "+595****4567",
  "address": { "@type": "PostalAddress", "addressLocality": "Asunción", "addressRegion": "Central", "addressCountry": "PY" },
  "geo": { "@type": "GeoCoordinates", "latitude": -25.2933, "longitude": -57.5722 },
  "priceRange": "Gs. 45.000 - Gs. 250.000",
  "currenciesAccepted": "PYG",
  "paymentAccepted": "Transferencia, Efectivo, Contra Entrega",
  "sameAs": ["https://instagram.com/fun4me_py"],
}

const c = content as any

export const metadata: Metadata = {
  metadataBase: new URL("https://fun4me.paragu-ai.com"),
  title: { default: "Fun4Me Store — Bienestar y Placer", template: "%s | Fun4Me Store" },
  description: "Tienda de bienestar y productos para adultos en Paraguay. Envío discreto, calidad garantizada.",
  icons: { icon: "/favicon.ico" },
  manifest: "/manifest.json",
  openGraph: {
    title: "Fun4Me Store — Bienestar y Placer",
    description: "Productos de calidad para tu bienestar íntimo. Envío discreto a todo Paraguay.",
    locale: "es_PY",
    type: "website",
    images: [
      { url: "https://fun4me.paragu-ai.com/og/og-image.png",
    width: 1200, height: 630, alt: "Fun4Me Store - Bienestar y Placer" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fun4Me Store — Bienestar y Placer",
    description: "Productos de calidad para tu bienestar íntimo. Envío discreto a todo Paraguay.",
    images: ["https://fun4me.paragu-ai.com/og/og-image.png"]
  },
  other: { "apple-mobile-web-app-capable": "yes", "apple-mobile-web-app-status-bar-style": "black-translucent" },

  alternates: { canonical: "https://fun4me.paragu-ai.com", languages: { "es": "https://fun4me.paragu-ai.com/" } },}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const social = c.socialProof || {}
  return (
    <html lang="es" className={inter.className}>
      <head>
        <meta property="og:image" content="https://fun4me.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://fun4me.paragu-ai.com" />
        <meta property="og:site_name" content="Fun4me" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://fun4me.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        <meta name="theme-color" content="#7C3AED" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased" style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold">
          Saltar al contenido principal
        </a>
        <AgeGate>
          <Toaster position="top-right" richColors />
          <QuickExitButton />
          <GuestModeBanner />
          <LoadingBar />
          <Header />
          <PromoCarousel />
          <main id="main-content" className="min-h-[80vh] pb-16 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <WhatsAppFloat />
          <ExitIntentPopup />
          <SocialProof orders={social.recentOrders || []} total={social.totalCustomers || 0} />
          <CookieConsent />
        </AgeGate>
              <JsonLd data={{}} />
      </body>
    </html>
  )
}
