import type { Metadata } from 'next'
import './globals.css'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { Analytics, TrackCtas } from "../components/analytics"

const siteJsonPath = path.join(process.cwd(), 'site.json')
const siteJson = existsSync(siteJsonPath) ? JSON.parse(readFileSync(siteJsonPath, 'utf-8')) : {}

export const metadata: Metadata = {
  title: siteJson?.domain ?? 'nexa-paraguay',
  description: siteJson?.country ?? 'Nexa Paraguay',
  openGraph: {
    type: "website",
    url: "https://nexa.paragu-ai.com",
    title: "Nexa Paraguay",
    description: "Sitio oficial",
    images: [{ url: "https://nexa.paragu-ai.com/og/og-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://nexa.paragu-ai.com/og/og-image.png"]
  }

,
  alternates: { canonical: "https://nexa-paraguay.paragu-ai.com", languages: { "es": "https://nexa-paraguay.paragu-ai.com/" } },}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta property="og:image" content="https://nexa.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://nexa.paragu-ai.com" />
        <meta property="og:site_name" content="Nexa Paraguay" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://nexa.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
          </head>
      <body>
        <Analytics />
        <TrackCtas />
{children}</body>
    </html>
  )
}
