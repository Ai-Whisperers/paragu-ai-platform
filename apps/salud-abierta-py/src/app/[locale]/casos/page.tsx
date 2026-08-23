import CasosExplorer from './CasosExplorer';

export default async function CasosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CasosExplorer locale={locale} />;
}
