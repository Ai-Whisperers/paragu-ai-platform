import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cronos Academy | Gimnasio & Fitness en Fernando de la Mora',
  description: 'Cronos Academy. Gym en Fernando de la Mora, Paraguay. Atención profesional y personalizada.',
  keywords: 'gimnasio Paraguay, entrenamiento San Lorenzo',
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