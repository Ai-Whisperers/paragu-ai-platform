import type { Metadata } from 'next';
import { Analytics, TrackCtas } from "../components/analytics"

// Type widened to `string` so the sentinel check below isn't reduced to a
// literal-vs-literal comparison (TS would prove it always-false and error out).
const TODO_PHONE: string = "TODO_PHONE";
const telephone = "+595986693259"; // SHINE Nails & Beauty — from content/es.json

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "SHINE Nails & Beauty",
    url: "https://shine-nails.paragu-ai.com",
    image: "https://shine-nails.paragu-ai.com/og/og-image.png",
    ...(telephone !== TODO_PHONE ? { telephone } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Lorenzo",
      addressRegion: "Central",
      addressCountry: "PY"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -25.3396,
      longitude: -57.5190
    },
    "sameAs": ["https://instagram.com/shinenails.py"]
  }

export const metadata: Metadata = {
  title: 'Shine Nails | Estudio de uñas en San Lorenzo, Paraguay',
  description: 'Uñas acrílicas, gel y esmaltado semipermanente. Manicure y pedicure profesional en San Lorenzo.',
  keywords: 'uñas San Lorenzo, manicure Paraguay, acrílicas gel, Shine Nails',
  robots: 'index, follow',

  alternates: { canonical: "https://shine-nails.paragu-ai.com", languages: { "es": "https://shine-nails.paragu-ai.com/" } },};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta property="og:image" content="https://shine-nails.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://shine-nails.paragu-ai.com" />
        <meta property="og:site_name" content="Shine Nails" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://shine-nails.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </head>
      <body style={{ margin: 0, fontFamily: "'Inter', -apple-system, sans-serif", background: '#ffffff', color: '#1a1a2e' }}>
        <Analytics />
        <TrackCtas />

        {children}
      </body>
    </html>
  );
}