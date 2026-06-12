import type { Metadata } from 'next';
import { Analytics, TrackCtas } from "../components/analytics"

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Shine Nails & Beauty",
    url: "https://shine-nails.paragu-ai.com",
    image: "https://shine-nails.paragu-ai.com/og/og-image.png",
    telephone: "+595****0000",
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
  title: 'Estudio Medieval | Tatuajes & Body Piercing en San Lorenzo, Paraguay',
  description: '8+ años de experiencia en tatuajes y body piercing. Ubicados en San Lorenzo, a 0.8km de la Facultad Politécnica.',
  keywords: 'tatuajes Paraguay, body piercing San Lorenzo',
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