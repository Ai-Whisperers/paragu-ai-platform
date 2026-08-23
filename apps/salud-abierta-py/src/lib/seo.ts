import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-whisperers.github.io/salud-abierta-py';

export function buildAlternates(path: string, locale: string = 'es') {
  const baseUrl = SITE_URL;
  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages: {
      es: `${baseUrl}/es${path}`,
      en: `${baseUrl}/en${path}`,
      guarani: `${baseUrl}/guarani${path}`,
      'x-default': `${baseUrl}/es${path}`,
    },
  };
}

export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SaludAbierta PY — Negligencia médica en Paraguay',
    template: '%s | SaludAbierta PY',
  },
  description:
    'Primer observatorio ciudadano de negligencia médica en Paraguay. 25 casos verificados, 15 hospitales con scorecard, datos cuantitativos oficiales.',
  keywords: [
    'negligencia médica Paraguay',
    'salud Paraguay',
    'derechos del paciente',
    'Asociación Honor y Vida',
    'SUPERSALUD',
    'mala praxis',
    'seguridad del paciente',
  ],
  openGraph: {
    title: 'SaludAbierta PY — Negligencia médica en Paraguay',
    description: '25 casos verificados, 15 hospitales con scorecard, datos oficiales.',
    url: SITE_URL,
    siteName: 'SaludAbierta PY',
    locale: 'es_PY',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};
