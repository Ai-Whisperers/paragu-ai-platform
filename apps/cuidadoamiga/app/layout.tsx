import { Analytics, TrackCtas } from "../components/analytics"
// Root layout — bare minimum so the redirect-only root page has a valid
// layout context. Real layout lives in app/[lang]/layout.tsx.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: "Cuidado Amiga",
  url: "https://cuidadoamiga.paragu-ai.com",
  image: "https://cuidadoamiga.paragu-ai.com/og/og-image.png",
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
  "sameAs": ["https://instagram.com/cuidadoamiga"]
}

export const metadata = { title: 'Cuidado Amiga' ,
  alternates: { canonical: "https://cuidadoamiga.paragu-ai.com", languages: { "es": "https://cuidadoamiga.paragu-ai.com/" } },}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <body>
        <Analytics />
        <TrackCtas />
{children}</body>
    </html>
  )
}
