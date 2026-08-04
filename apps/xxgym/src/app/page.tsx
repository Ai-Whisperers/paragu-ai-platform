import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../components/SectionsRenderer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XXGym | Gimnasio de musculación y fitness en Fernando zona norte',
  description: 'Gimnasio de musculación y fitness en Fernando zona norte, a 1.6km de la Politécnica. 4.7⭐ 119 reseñas Google.',
  keywords: ['PY', 'Paraguay', 'Asunción', 'xxgym'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://xxgym.paragu-ai.com',
  },
  openGraph: {
    title: 'XXGym | Gimnasio de musculación y fitness en Fernando zona norte',
    description: 'Gimnasio de musculación y fitness en Fernando zona norte, a 1.6km de la Politécnica. 4.7⭐ 119 reseñas Google.',
    url: 'https://xxgym.paragu-ai.com',
    siteName: 'ParaguAI',
    locale: 'es_PY',
    type: 'website',
    images: [{
      url: 'https://xxgym.paragu-ai.com/og/og-image.png',
      width: 1200,
      height: 630,
      alt: 'XXGym | Gimnasio de musculación y fitness en Fernando zona norte',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XXGym | Gimnasio de musculación y fitness en Fernando zona norte',
    description: 'Gimnasio de musculación y fitness en Fernando zona norte, a 1.6km de la Politécnica. 4.7⭐ 119 reseñas Google.',
    images: ['https://xxgym.paragu-ai.com/og/og-image.png'],
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