import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estudio Medieval | Tatuajes & Body Piercing en San Lorenzo, Paraguay',
  description: '8+ años de experiencia en tatuajes y body piercing. Ubicados en San Lorenzo, a 0.8km de la Facultad Politécnica.',
  keywords: 'tatuajes Paraguay, body piercing San Lorenzo',
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, fontFamily: "'Inter', -apple-system, sans-serif", background: '#ffffff', color: '#1a1a2e' }}>
        {children}
      </body>
    </html>
  );
}