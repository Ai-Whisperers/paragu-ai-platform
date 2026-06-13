import { promises as fs } from 'fs';
import path from 'path';
import { SectionsRenderer } from '../components/SectionsRenderer';
import type { Metadata } from 'next';
import { TrustStrip, TRUST_ITEMS_VISUAL } from "@/components/truststrip"

export const metadata: Metadata = {
  title: 'Scott Tatuajes | Tatuajes & Body Piercing en Fernando de la Mora',
  description: 'Scott Tatuajes. Tattoo Studio en Fernando de la Mora, Paraguay. Atención profesional y personalizada.',
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