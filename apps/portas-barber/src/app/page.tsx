import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../components/SectionsRenderer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portas Barber Shop | Barbería clásica en Av. Santa Teresa',
  description: 'Barbería clásica en Av. Santa Teresa, Fernando de la Mora. Experiencia premium. 4.9⭐ 162 reseñas Google.',
  keywords: ['PY', 'Paraguay', 'Asunción', 'portas-barber'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://portas-barber.paragu-ai.com',
  },
  openGraph: {
    title: 'Portas Barber Shop | Barbería clásica en Av. Santa Teresa',
    description: 'Barbería clásica en Av. Santa Teresa, Fernando de la Mora. Experiencia premium. 4.9⭐ 162 reseñas Google.',
    url: 'https://portas-barber.paragu-ai.com',
    siteName: 'ParaguAI',
    locale: 'es_PY',
    type: 'website',
    images: [{
      url: 'https://portas-barber.paragu-ai.com/og/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Portas Barber Shop | Barbería clásica en Av. Santa Teresa',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portas Barber Shop | Barbería clásica en Av. Santa Teresa',
    description: 'Barbería clásica en Av. Santa Teresa, Fernando de la Mora. Experiencia premium. 4.9⭐ 162 reseñas Google.',
    images: ['https://portas-barber.paragu-ai.com/og/og-image.png'],
  },
};

async function loadContent(locale: string = 'es') {
  const contentPath = path.join(process.cwd(), 'content', `${locale}.json`);
  try {
    const contentRaw = await fs.readFile(contentPath, 'utf-8');
    return JSON.parse(contentRaw);
  } catch (e) {
    throw new Error(`Failed to load content at ${contentPath}: ${e instanceof Error ? e.message : String(e)}`);
  }
}

export default async function HomePage() {
  const content = await loadContent('es');
  return <SectionsRenderer content={content} locale="es" />;
}