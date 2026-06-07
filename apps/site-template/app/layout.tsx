import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { siteConfig } from '@/lib/config/config'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const cfg = siteConfig

export const metadata: Metadata = {
  metadataBase: new URL(cfg.site.url || "https://tu-emprendimiento.com"),
  title: {
    default: cfg.site.name,
    template: `%s — ${cfg.site.name}`,
  },
  description: cfg.site.metaDescription,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headingFont = cfg.site.fonts?.heading || "Inter"
  const bodyFont = cfg.site.fonts?.body || "Inter"

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href={`https://fonts.googleapis.com/css2?family=${headingFont}:wght@400;500;600;700&family=${bodyFont}:wght@300;400;500;600;700&display=swap`}
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
