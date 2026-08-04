import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../components/SectionsRenderer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cronos Academy | Gimnasio & Fitness en Fernando de la Mora',
  description: 'Cronos Academy. Gym en Fernando de la Mora, Paraguay. Atención profesional y personalizada.',
  keywords: ['PY', 'Paraguay', 'Asunción', 'cronos-academy'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cronos-academy.paragu-ai.com',
  },
  openGraph: {
    title: 'Cronos Academy | Gimnasio & Fitness en Fernando de la Mora',
    description: 'Cronos Academy. Gym en Fernando de la Mora, Paraguay. Atención profesional y personalizada.',
    url: 'https://cronos-academy.paragu-ai.com',
    siteName: 'ParaguAI',
    locale: 'es_PY',
    type: 'website',
    images: [{
      url: 'https://cronos-academy.paragu-ai.com/og/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Cronos Academy | Gimnasio & Fitness en Fernando de la Mora',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cronos Academy | Gimnasio & Fitness en Fernando de la Mora',
    description: 'Cronos Academy. Gym en Fernando de la Mora, Paraguay. Atención profesional y personalizada.',
    images: ['https://cronos-academy.paragu-ai.com/og/og-image.png'],
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