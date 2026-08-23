import type { Metadata } from 'next';
import { DEFAULT_METADATA } from '@/lib/seo';

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PY">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://ivanweissvanderpol.github.io/salud-abierta-py/" />
      </head>
      <body>{children}</body>
    </html>
  );
}
