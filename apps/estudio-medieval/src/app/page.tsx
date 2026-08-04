import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../components/SectionsRenderer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estudio Medieval | Tatuajes & Body Piercing en San Lorenzo, Paraguay',
  description: '8+ años de experiencia en tatuajes y body piercing. Ubicados en San Lorenzo, a 0.8km de la Facultad Politécnica.',
  keywords: ['PY', 'Paraguay', 'Asunción', 'estudio-medieval'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://estudio-medieval.paragu-ai.com',
  },
  openGraph: {
    title: 'Estudio Medieval | Tatuajes & Body Piercing en San Lorenzo, Paraguay',
    description: '8+ años de experiencia en tatuajes y body piercing. Ubicados en San Lorenzo, a 0.8km de la Facultad Politécnica.',
    url: 'https://estudio-medieval.paragu-ai.com',
    siteName: 'ParaguAI',
    locale: 'es_PY',
    type: 'website',
    images: [{
      url: 'https://estudio-medieval.paragu-ai.com/og/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Estudio Medieval | Tatuajes & Body Piercing en San Lorenzo, Paraguay',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estudio Medieval | Tatuajes & Body Piercing en San Lorenzo, Paraguay',
    description: '8+ años de experiencia en tatuajes y body piercing. Ubicados en San Lorenzo, a 0.8km de la Facultad Politécnica.',
    images: ['https://estudio-medieval.paragu-ai.com/og/og-image.png'],
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