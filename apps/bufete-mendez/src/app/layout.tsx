import type { Metadata } from 'next'
import content from '@/content/es.json'
import './globals.css'
import { Analytics, TrackCtas } from "../../components/analytics"
import { SITE_URL, buildAlternates, absoluteUrl } from '@/lib/seo'

const c = content as any
const home = c.home

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: home.seo.title,
  description: home.seo.description,
  openGraph: {
    title: home.seo.title,
    description: home.seo.description,
    url: SITE_URL,
    siteName: c.siteName,
    images: [{ url: absoluteUrl('/og/og-image.png'), width: 1200, height: 630 }],
    locale: 'es_PY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: home.seo.title,
    description: home.seo.description,
    images: [absoluteUrl('/og/og-image.png')],
  },
  alternates: buildAlternates(''),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta property="og:image" content="https://bufete-mendez.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://bufete-mendez.paragu-ai.com" />
        <meta property="og:site_name" content="Bufete Mendez" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://bufete-mendez.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
          </head>
      <body>
        <Analytics />
        <TrackCtas />
{children}</body>
    </html>
  )
}
