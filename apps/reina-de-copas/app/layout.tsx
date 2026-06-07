import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/CartContext'

export const metadata: Metadata = {
  title: 'Reina de Copas Paraguay — Copas y Discos Menstruales',
  description:
    'Copa y disco menstrual reutilizable. Ecológica, económica y segura. +1750 copas vendidas desde 2018. Envíos a todo Paraguay.',
  openGraph: {
    title: 'Reina de Copas Paraguay — Tu período, tu poder',
    description: 'Copas y discos menstruales ecológicos, económicos y seguros. Envíos a todo Paraguay.',
    images: ['/images/og-social.jpg'],
    type: 'website',
    locale: 'es_PY',
    siteName: 'Reina de Copas Paraguay',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reina de Copas Paraguay',
    description: 'Copas y discos menstruales. Ecológicos, económicos, seguros.',
    images: ['/images/og-social.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily:
            "'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
