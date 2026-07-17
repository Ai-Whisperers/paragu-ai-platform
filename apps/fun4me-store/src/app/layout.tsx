import { Analytics, TrackCtas } from "../../components/analytics"
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Fun4Me Store",
    url: "https://fun4me-store.paragu-ai.com",
    image: "https://fun4me-store.paragu-ai.com/og/og-image.png",
    telephone: "+595****0000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Asunción",
      addressRegion: "Central",
      addressCountry: "PY"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -25.2933,
      longitude: -57.5722
    },
    "sameAs": ["https://instagram.com/fun4me_py"]
  }
  
export const metadata = {
  title: 'Fun4Me Store',
  description: 'Tu tienda online en Paraguay',

  alternates: { canonical: "https://fun4me-store.paragu-ai.com", languages: { "es": "https://fun4me-store.paragu-ai.com/" } },};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta property="og:image" content="https://fun4me-store.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://fun4me-store.paragu-ai.com" />
        <meta property="og:site_name" content="Fun4me Store" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://fun4me-store.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </head>
      <body>
        <Analytics />
        <TrackCtas />
{children}</body>
    </html>
  );
}
