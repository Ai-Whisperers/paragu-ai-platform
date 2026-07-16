import { promises as fs } from 'fs';
import path from 'path';
import SectionsRenderer from '../components/SectionsRenderer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HidroBaby Spa | Baby Spa en Fernando de la Mora · Ozono único en Paraguay',
  description: 'HidroBaby Spa: hidroterapia, masajes pediátricos, spa anticólicos y natación temprana para bebés. Staff de obstetras y enfermeras. Agua 100% filtrada y desinfección por ozono. 3 sucursales.',
  keywords: 'baby spa Paraguay, hidroterapia bebés Fernando de la Mora, spa para bebés San Lorenzo, masajes infantiles, spa anticólicos, natación temprana Paraguay',
  robots: 'index, follow',
  openGraph: {
    title: 'HidroBaby Spa | Bienestar para bebés',
    description: 'Primer baby spa con desinfección por ozono. Reservá por WhatsApp.',
    url: 'https://hidrobaby-spa.paragu-ai.com',
    siteName: 'HidroBaby Spa',
    locale: 'es_PY',
    type: 'website',
  },
};

type SectionContent = Record<string, unknown>;

function getHomepageMetadata(source: SectionContent): Metadata {
  const hero = (source.hero || {}) as Record<string, unknown>;
  const site = (source.site || {}) as Record<string, unknown>;
  const title = String(hero.headline || site.businessName || site.name || 'HidroBaby Spa');
  const description = String(site.description || hero.subheadline || title);
  return {
    title,
    description,
    keywords: 'baby spa Paraguay, hidroterapia bebés, spa anticólicos, masajes infantiles, natación temprana',
    robots: 'index, follow',
    openGraph: {
      title,
      description,
      url: 'https://hidrobaby-spa.paragu-ai.com',
      siteName: String(site.name || 'HidroBaby Spa'),
      locale: 'es_PY',
      type: 'website',
    },
  };
}

async function loadContent(locale: string = 'es') {
  const contentPath = path.join(process.cwd(), 'content', `${locale}.json`);
  try {
    const contentRaw = await fs.readFile(contentPath, 'utf-8');
    const source = JSON.parse(contentRaw) as SectionContent;
    const metadata = getHomepageMetadata(source);
    return { source, metadata };
  } catch (e) {
    throw new Error(`Failed to load content at ${contentPath}: ${e instanceof Error ? e.message : String(e)}`);
  }
}

export default async function HomePage() {
  const loaded = await loadContent('es');

  if (!loaded) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.5rem', marginBottom: '1rem', color: '#1a1a2e' }}>HidroBaby Spa</h1>
          <p style={{ color: '#6b7280' }}>Cargando contenido...</p>
        </div>
      </div>
    );
  }

  return <SectionsRenderer source={loaded.source} />;
}
