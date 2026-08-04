import type { Metadata } from 'next';
import { Analytics, TrackCtas } from "../components/analytics"

// Type widened to `string` so the sentinel check below isn't reduced to a
// literal-vs-literal comparison (TS would prove it always-false and error out).
const TODO_PHONE: string = "TODO_PHONE";
const telephone = "+595994215627"; // Portas Barber — from content/es.json

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: "Portas Barber Shop",
  url: "https://portas-barber.paragu-ai.com",
  image: "https://portas-barber.paragu-ai.com/og/og-image.png",
  ...(telephone !== TODO_PHONE ? { telephone } : {}),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fernando de la Mora",
    addressRegion: "Central",
    addressCountry: "PY"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.3187,
    longitude: -57.5410
  },
  "sameAs": ["https://instagram.com/portasbarber"]
}

export const metadata: Metadata = {
  title: 'Portas Barber | Barbería tradicional en Fernando de la Mora',
  description: 'Barbería clásica en Av. Santa Teresa, Fernando de la Mora. Experiencia premium en corte y afeitado.',
  keywords: 'barbería Fernando de la Mora, Portas Barber, corte clásico Paraguay',
  robots: 'index, follow',
  openGraph: {
    type: "website",
    url: "https://portas-barber.paragu-ai.com",
    title: "Portas Barber Shop",
    description: "Barbería clásica en Fernando de la Mora",
    images: [{ url: "https://portas-barber.paragu-ai.com/og/og-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://portas-barber.paragu-ai.com/og/og-image.png"]
  }

,
  alternates: { canonical: "https://portas-barber.paragu-ai.com", languages: { "es": "https://portas-barber.paragu-ai.com/" } },};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta property="og:image" content="https://portas-barber.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://portas-barber.paragu-ai.com" />
        <meta property="og:site_name" content="Portas Barber" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://portas-barber.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </head>
      <body style={{ margin: 0, fontFamily: "'Inter', -apple-system, sans-serif", background: '#ffffff', color: '#1a1a2e' }}>
        <TrackCtas />

        {children}
      </body>
    </html>
  );
}