import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'bufete-mendez',
  description: 'Bufete de abogados en Asunción, Paraguay — derecho corporativo, civil, laboral y familiar.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
