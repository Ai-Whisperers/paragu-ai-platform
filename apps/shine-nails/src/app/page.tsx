import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../components/SectionsRenderer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SHINE Nails & Beauty | Uñas profesionales en San Lorenzo',
  description: 'Uñas acrílicas, gel y esmaltado semipermanente en San Lorenzo. Celeste Villalba. 4.9⭐ 287 reseñas Google.',
  keywords: 'uñas San Lorenzo Paraguay, manicure, pedicure, nail art',
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