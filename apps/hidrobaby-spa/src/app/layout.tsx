import type { Metadata } from 'next';
import '@/app/globals.css';
import { Analytics, TrackCtas } from "../../components/analytics"

const siteUrl = 'https://hidrobaby-spa.paragu-ai.com';

export const metadata: Metadata = {
  title: 'HidroBaby Spa | Baby Spa en Fernando de la Mora · Ozono único en Paraguay',
  description: 'HidroBaby Spa: hidroterapia, masajes pediátricos, spa anticólicos y natación temprana para bebés. Staff de obstetras y enfermeras. Agua 100% filtrada y desinfección por ozono. 3 sucursales.',
  keywords: 'baby spa Paraguay, hidroterapia bebés Fernando de la Mora, spa para bebés San Lorenzo, masajes infantiles, spa anticólicos, natación temprana Paraguay',
  authors: [{ name: 'HidroBaby Spa' }],
  metadataBase: new URL(siteUrl),
  creator: 'HidroBaby Spa',
  publisher: 'HidroBaby Spa',
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  alternates: { canonical: 'https://hidrobaby-spa.paragu-ai.com', languages: { 'es': 'https://hidrobaby-spa.paragu-ai.com/' } },
  openGraph: {
    title: 'HidroBaby Spa | Bienestar para bebés',
    description: 'Primer baby spa con desinfección por ozono. Hidroterapia, masajes pediátricos, spa anticólicos y natación temprana. 3 sucursales. Reservá por WhatsApp.',
    url: 'https://hidrobaby-spa.paragu-ai.com',
    siteName: 'HidroBaby Spa',
    images: [
      {
        url: 'https://hidrobaby-spa.paragu-ai.com/og/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HidroBaby Spa — Baby Spa en Paraguay',
        type: 'image/png',
      },
    ],
    locale: 'es_PY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HidroBaby Spa | Baby Spa en Paraguay',
    description: 'Primer baby spa con desinfección por ozono. 3 sucursales. Reservá por WhatsApp.',
    images: ['https://hidrobaby-spa.paragu-ai.com/og/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta property="og:image" content="https://hidrobaby-spa.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="HidroBaby Spa — Baby Spa en Paraguay" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, fontFamily: "Inter, -apple-system, sans-serif", background: '#ffffff', color: '#1a1a2e' }}>
        <Analytics />
        <TrackCtas />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "HidroBaby Spa",
              "description": "Primer baby spa en Paraguay con sistema de desinfección por ozono. Hidroterapia, masajes pediátricos y natación temprana para bebés.",
              "url": "https://hidrobaby-spa.paragu-ai.com",
              "image": "https://hidrobaby-spa.paragu-ai.com/og/og-image.png",
              "telephone": "+595 991 691 501",
              "priceRange": "₲₲",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Fernando de la Mora",
                "addressCountry": "PY"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -25.3306,
                "longitude": -57.5424
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "377"
              },
              "openingHours": "Mo-Su 09:00-19:00"
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
