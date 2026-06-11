import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stroopwafelhuis.paragu-ai.com'),
  title: 'Stroopwafel Huis — Verse Stroopwafels & Specialty Coffee · Asunción',
  description: 'La primera cafetería holandesa del Paraguay. Stroopwafels frescos hechos frente a vos, café de especialidad y un pedacito de Holanda en Asunción.',
  alternates: { canonical: 'https://stroopwafelhuis.paragu-ai.com' },
  icons: [{ rel: 'icon', url: '/favicon.ico', sizes: '32x32' }],
  openGraph: {
    title: 'Stroopwafel Huis — La primera cafetería holandesa del Paraguay',
    description: 'Stroopwafels frescos & specialty coffee. Hechos con amor holandés en Asunción.',
    url: 'https://stroopwafelhuis.paragu-ai.com',
    siteName: 'Stroopwafel Huis',
    locale: 'es_PY',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es' className={playfair.variable + ' ' + inter.variable}>
      <head>
        <meta name='theme-color' content='#FF6B00' />
        <meta name='mobile-web-app-capable' content='yes' />
        <script type='application/ld+json' dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CafeOrCoffeeShop',
            name: 'Stroopwafel Huis',
            description: 'La primera cafetería holandesa del Paraguay. Stroopwafels frescos & specialty coffee.',
            url: 'https://stroopwafelhuis.paragu-ai.com',
            telephone: '+595XXX XXX XXX',
            email: 'hola@stroopwafelhuis.com',
            address: { '@type': 'PostalAddress', addressLocality: 'Asunción', addressCountry: 'PY' },
            servesCuisine: 'Dutch',
            priceRange: 'Gs. 8.000 - 50.000',
            sameAs: ['https://instagram.com/stroopwafelhuis', 'https://facebook.com/stroopwafelhuis'],
          })
        }} />
      </head>
      <body className='antialiased font-sans'>
        {children}
      </body>
    </html>
  )
}
