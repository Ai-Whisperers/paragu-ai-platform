import type { Metadata } from 'next';
import { Analytics, TrackCtas } from "../../components/analytics"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: "Scott Tatuajes",
  url: "https://scott-tatuajes.paragu-ai.com",
  image: "https://scott-tatuajes.paragu-ai.com/og/og-image.png",
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
  "sameAs": ["https://instagram.com/scotttatuajes"]
}

export const metadata: Metadata = {
  title: 'Scott Tatuajes | Tatuajes & Body Piercing en Fernando de la Mora',
  description: 'Scott Tatuajes. Tattoo Studio en Fernando de la Mora, Paraguay. Atención profesional y personalizada.',
  keywords: 'tatuajes Paraguay, body piercing San Lorenzo',
  robots: 'index, follow',
  openGraph: {
    type: "website",
    url: "https://scott-tatuajes.paragu-ai.com",
    title: "Scott Tatuajes",
    description: "Sitio oficial",
    images: [{ url: "https://scott-tatuajes.paragu-ai.com/og/og-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://scott-tatuajes.paragu-ai.com/og/og-image.png"]
  }

,
  alternates: { canonical: "https://scott-tatuajes.paragu-ai.com", languages: { "es": "https://scott-tatuajes.paragu-ai.com/" } },};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta property="og:image" content="https://scott-tatuajes.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://scott-tatuajes.paragu-ai.com" />
        <meta property="og:site_name" content="Scott Tatuajes" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://scott-tatuajes.paragu-ai.com/og/og-image.png" />
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