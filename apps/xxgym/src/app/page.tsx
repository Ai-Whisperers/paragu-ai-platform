import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../components/SectionsRenderer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XXGym | Gimnasio de musculación y fitness en Fernando zona norte',
  description: 'Gimnasio de musculación y fitness en Fernando zona norte, a 1.6km de la Politécnica. 4.7⭐ 119 reseñas Google.',
  keywords: 'gimnasio Fernando de la Mora Paraguay, musculación, fitness',
  robots: 'index, follow',
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