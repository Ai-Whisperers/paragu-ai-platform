import type { Metadata } from 'next';
import { Analytics, TrackCtas } from "../components/analytics"

// Type widened to `string` so the sentinel check below isn't reduced to a
// literal-vs-literal comparison (TS would prove it always-false and error out).
const TODO_PHONE: string = "TODO_PHONE";
const telephone = "+59521678171"; // XXGym — from content/es.json

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: "XXGym",
    url: "https://xxgym.paragu-ai.com",
    image: "https://xxgym.paragu-ai.com/og/og-image.png",
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
    "sameAs": ["https://instagram.com/xxgym.py"]
  }

export const metadata: Metadata = {
  title: 'XXGym | Gimnasio y entrenamiento personal Fernando de la Mora',
  description: 'Gimnasio de musculación y fitness en Fernando de la Mora zona norte. Equipamiento completo y clases dirigidas.',
  keywords: 'gimnasio Fernando de la Mora, musculación Paraguay, XXGym, fitness',
  robots: 'index, follow',

  alternates: { canonical: "https://xxgym.paragu-ai.com", languages: { "es": "https://xxgym.paragu-ai.com/" } },};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta property="og:image" content="https://xxgym.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://xxgym.paragu-ai.com" />
        <meta property="og:site_name" content="XX Gym" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://xxgym.paragu-ai.com/og/og-image.png" />
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