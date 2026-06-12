import "./globals.css";
import { CookieConsent } from "@ai-whisperers/seo";
import { WhatsAppFloat } from "@ai-whisperers/whatsapp";
import { Analytics, TrackCtas } from "../components/analytics"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Camilo Acosta & Asociados",
  url: "https://camilo-acosta.paragu-ai.com",
  image: "https://camilo-acosta.paragu-ai.com/og/og-image.png",
  telephone: "+595****0000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Asunción",
    addressRegion: "Central",
    addressCountry: "PY"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.2637,
    longitude: -57.5759
  },
  "sameAs": ["https://instagram.com/camiloacosta"]
}

export const metadata = {
  title: "Camilo Acosta - El Gato Siamés",
  description: "Stand up paraguayo: humor negro, one-liners",

  alternates: { canonical: "https://camilo-acosta.paragu-ai.com", languages: { "es": "https://camilo-acosta.paragu-ai.com/" } },};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta property="og:image" content="https://camilo-acosta.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://camilo-acosta.paragu-ai.com" />
        <meta property="og:site_name" content="Camilo Acosta" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://camilo-acosta.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </head>
      <body className="antialiased">
        <Analytics />
        <TrackCtas />

        {children}
        <WhatsAppFloat phone="+595981123456" />
        <CookieConsent />
      </body>
    </html>
  );
}
