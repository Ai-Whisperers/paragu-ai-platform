import type { Metadata } from 'next'
import content from '@/content/es.json'
import './globals.css'
import { Analytics, TrackCtas } from "../components/analytics"

const c = content as any
const home = c.home

export const metadata: Metadata = {
  title: home.seo.title,
  description: home.seo.description,
  openGraph: {
    title: home.seo.title,
    description: home.seo.description,
    url: 'https://superspuma.paragu-ai.com',
    siteName: c.siteName,
    images: [{ url: 'https://superspuma.paragu-ai.com/og/og-image.png', width: 1200, height: 630 }],
    locale: 'es_PY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: home.seo.title,
    description: home.seo.description,
    images: ['https://superspuma.paragu-ai.com/og/og-image.png'],
  },
  alternates: {
    canonical: 'https://superspuma.paragu-ai.com',
    languages: {
      'es': 'https://superspuma.paragu-ai.com/',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="robots" content="index,follow, max-image-preview:large" />
      </head>
      <body>
        <Analytics />
        <TrackCtas />
{children}</body>
    </html>
  )
}
