import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../components/SectionsRenderer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Peluquería Barbershop | Servicios profesionales en Asunción',
  description: 'Peluquería Barbershop — Local business in Asunción, Paraguay.',
  keywords: ['PY', 'Paraguay', 'Asunción', 'barbershop-peluqueria'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://barbershop-peluqueria.paragu-ai.com',
  },
  openGraph: {
    title: 'Peluquería Barbershop | Servicios profesionales en Asunción',
    description: 'Peluquería Barbershop — Local business in Asunción, Paraguay.',
    url: 'https://barbershop-peluqueria.paragu-ai.com',
    siteName: 'ParaguAI',
    locale: 'es_PY',
    type: 'website',
    images: [{
      url: 'https://barbershop-peluqueria.paragu-ai.com/og/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Peluquería Barbershop | Servicios profesionales en Asunción',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peluquería Barbershop | Servicios profesionales en Asunción',
    description: 'Peluquería Barbershop — Local business in Asunción, Paraguay.',
    images: ['https://barbershop-peluqueria.paragu-ai.com/og/og-image.png'],
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