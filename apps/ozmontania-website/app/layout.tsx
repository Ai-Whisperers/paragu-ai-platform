import CookieConsent from "@/components/CookieConsent"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppFloat from '@/components/whatsapp-float'
import es from '@/content/es.json'
import type { SiteContent } from '@/types/content'

const content = es as unknown as SiteContent

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: content.site.title + ' — ' + content.site.description,
  description: content.hero.description,
  openGraph: {
    title: content.site.title,
    description: content.site.description,
    url: content.site.url,
    siteName: content.site.title,
    locale: 'es_PY',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloat />
              <CookieConsent />
      </body>
    </html>
  )
}
