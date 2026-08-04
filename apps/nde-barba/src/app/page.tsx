import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../components/SectionsRenderer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nde Barba | Barbería moderna en Fernando de la Mora',
  description: 'Barbería y peluquería masculina en Fernando de la Mora. Cortes modernos y clásicos. 4.8⭐ 118 reseñas Google.',
  keywords: ['PY', 'Paraguay', 'Asunción', 'nde-barba'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://nde-barba.paragu-ai.com',
  },
  openGraph: {
    title: 'Nde Barba | Barbería moderna en Fernando de la Mora',
    description: 'Barbería y peluquería masculina en Fernando de la Mora. Cortes modernos y clásicos. 4.8⭐ 118 reseñas Google.',
    url: 'https://nde-barba.paragu-ai.com',
    siteName: 'ParaguAI',
    locale: 'es_PY',
    type: 'website',
    images: [{
      url: 'https://nde-barba.paragu-ai.com/og/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Nde Barba | Barbería moderna en Fernando de la Mora',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nde Barba | Barbería moderna en Fernando de la Mora',
    description: 'Barbería y peluquería masculina en Fernando de la Mora. Cortes modernos y clásicos. 4.8⭐ 118 reseñas Google.',
    images: ['https://nde-barba.paragu-ai.com/og/og-image.png'],
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