import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'HidroBaby Spa | Baby Spa en Fernando de la Mora · Ozono único en Paraguay',
  description: 'HidroBaby Spa: hidroterapia, masajes pediátricos, spa anticólicos y natación temprana para bebés. Staff de obstetras y enfermeras. Agua 100% filtrada y desinfección por ozono. 3 sucursales.',
  keywords: 'baby spa Paraguay, hidroterapia bebés Fernando de la Mora, spa para bebés San Lorenzo, masajes infantiles, spa anticólicos, natación temprana Paraguay',
  robots: 'index, follow',
  openGraph: {
    title: 'HidroBaby Spa | Bienestar para bebés',
    description: 'Primer baby spa con desinfección por ozono. Reservá por WhatsApp.',
    url: 'https://hidrobaby-spa.paragu-ai.com',
    siteName: 'HidroBaby Spa',
    locale: 'es_PY',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, fontFamily: "Inter, -apple-system, sans-serif", background: '#ffffff', color: '#1a1a2e' }}>
        {children}
      </body>
    </html>
  );
}
