import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../components/SectionsRenderer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estudio Medieval | Tatuajes & Body Piercing en San Lorenzo, Paraguay',
  description: '8+ años de experiencia en tatuajes y body piercing. Ubicados en San Lorenzo, a 0.8km de la Facultad Politécnica.',
  keywords: 'tatuajes Paraguay, body piercing San Lorenzo',
  robots: 'index, follow',
};

async function loadContent(locale: string = 'es') {
  try {
    const contentPath = path.join(process.cwd(), 'content', `${locale}.json`);
    const contentRaw = await fs.readFile(contentPath, 'utf-8');
    return JSON.parse(contentRaw);
  } catch (e) {
    console.error('Failed to load content:', e);
    return null;
  }
}

export default async function HomePage() {
  const content = await loadContent('es');
  return <SectionsRenderer content={content} locale="es" />;
}