import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Analytics, TrackCtas } from "../../components/analytics"
import { SchemaMarkup } from "../components/SchemaMarkup"

export const metadata: Metadata = {
  metadataBase: new URL("https://arnos.paragu-ai.com"),
  title: "Arno's Barber Shop | Barbería en San Lorenzo",
  description: "Arno's Barber Shop en San Lorenzo, Paraguay. Cortes, barba y perfilado con reserva directa por WhatsApp.",
  applicationName: "Arno's Barber Shop",
  keywords: [
    "barbería San Lorenzo",
    "barber shop San Lorenzo",
    "corte de cabello San Lorenzo",
    "barbería zona Jacarandá",
    "barbería Paraguay",
    "reserva por WhatsApp",
    "fade San Lorenzo",
    "barba y bigote",
  ],
  authors: [{ name: "ParaguAI · Ai-Whisperers" }],
  alternates: {
    canonical: "https://arnos.paragu-ai.com",
    languages: { "es-PY": "https://arnos.paragu-ai.com" },
  },
  openGraph: {
    type: "website",
    locale: "es_PY",
    url: "https://arnos.paragu-ai.com",
    siteName: "Arno's Barber Shop",
    title: "Arno's Barber Shop | Barbería en San Lorenzo",
    description: "Cortes, barba y perfilado con reserva directa por WhatsApp.",
    images: [{ url: "/og/og-image.png", width: 1200, height: 630, alt: "Arno's Barber Shop — estilo y precisión" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arno's Barber Shop | Barbería en San Lorenzo",
    description: "Cortes, barba y perfilado con reserva directa por WhatsApp.",
    images: ["/og/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f0f" },
  ],
  colorScheme: "dark light",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PY">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="apple-touch-icon" href="/icons/icon-180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Arno's" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://arnos.paragu-ai.com" />
        <SchemaMarkup />
      </head>
      <body>
        <Analytics />
        <TrackCtas />
        {children}
      </body>
    </html>
  )
}
