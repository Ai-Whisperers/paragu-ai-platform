import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://3mind.paragu-ai.com"),
  title: {
    default: "3 MIND — Agencia Creativa | Marketing, Video, Fotografía",
    template: "%s | 3 MIND",
  },
  description: "Transformamos ideas en experiencias visuales impactantes. Marketing digital, producción audiovisual, fotografía y publicidad en Paraguay.",
  keywords: ["agencia creativa", "marketing digital", "producción audiovisual", "fotografía", "publicidad", "Paraguay", "Asunción"],
  authors: [{ name: "3 MIND" }],
  creator: "3 MIND",
  publisher: "3 MIND",
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "https://3mind.paragu-ai.com", languages: { "es": "https://3mind.paragu-ai.com/" } },
  openGraph: {
    title: "3 MIND — Agencia Creativa",
    description: "Marketing digital, producción audiovisual, fotografía y publicidad en Paraguay.",
    url: "https://3mind.paragu-ai.com",
    siteName: "3 MIND",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "3 MIND — Agencia Creativa en Paraguay",
        type: "image/png",
      },
    ],
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3 MIND — Agencia Creativa",
    description: "Marketing digital, producción audiovisual y publicidad en Paraguay.",
    images: ["/og/og-image.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "3 MIND",
    description: "Agencia creativa de marketing digital, producción audiovisual, fotografía y publicidad",
    url: "https://3mind.paragu-ai.com",
    logo: "https://3mind.paragu-ai.com/images/logo.svg",
    address: { "@type": "PostalAddress", streetAddress: "Fray Luis de Leon C/Venezuela", addressLocality: "Asuncion", addressCountry: "PY" },
    telephone: "+595991691501",
    email: "3mindpy@gmail.com",
    sameAs: ["https://instagram.com/somos3md", "https://facebook.com/p/3-MIND-61565791512167"],
  }

  return (
    <html lang="es" className={inter.variable + " " + playfair.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
