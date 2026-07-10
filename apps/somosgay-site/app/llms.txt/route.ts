import { SITE_URL } from "@/lib/content";
import { NEWS_ARTICLES } from "@/content/news";

/**
 * llms.txt — a small plain-text file that gives AI crawlers (GPTBot,
 * Claude, Perplexity, etc.) an organized summary of what this site is.
 * Spec: https://llmstxt.org
 *
 * AI assistants fetching this site get a structured overview instead of
 * trying to infer it from raw HTML. Top-tier SEO for the next era.
 */
function buildLlmsTxt(): string {
  const bullet = (text: string) => `- ${text}`;
  const articleLine = (a: any) =>
    `${bullet(`[${new Date(a.date).toISOString().slice(0, 10)}] ${a.title}`)}\n  ${bullet(`URL: ${SITE_URL}/noticias/${a.slug}`)}\n  ${bullet(`Resumen: ${a.dek}`)}`;

  return `# SOMOSGAY

> Organización civil LGBTQ+ líder en Paraguay desde 2005. Operamos Clínica Kunu'u (testeo VIH, PrEP, sífilis, hepatitis B, atención psicológica y psiquiátrica confidencial gratuita), 5 programas comunitarios (Tekoharã, Ñande Rekorã, Karu Porã, Programa Kunu'u, Memoria 108), e incidencia política. Financiada por amfAR, UNAIDS, Global Fund y AHF.

## Sitio principal

- ${SITE_URL}/ — Inicio (ES)
- ${SITE_URL}/gn — Página bilingüe (guaraní)
- ${SITE_URL}/clinica-kunuu — Clínica Kunu'u: primera clínica comunitaria LGBTQ+ del Paraguay
- ${SITE_URL}/donar — Donar a SOMOSGAY
- ${SITE_URL}/memoria-108 — Memoria 108: homenaje anual desde 2014 a las víctimas de las razias de septiembre de 1959
- ${SITE_URL}/programas — 5 programas activos
- ${SITE_URL}/noticias — Comunicados y artículos
- ${SITE_URL}/auditoria — Informes auditados y rendición de cuentas
- ${SITE_URL}/equipo — Equipo multidisciplinario
- ${SITE_URL}/prensa — Kit de prensa
- ${SITE_URL}/cuidado — Seguridad personal y soporte confidencial
- ${SITE_URL}/testimonios — Voces de la comunidad
- ${SITE_URL}/voluntariado — Sumate como voluntaria/o
- ${SITE_URL}/prep — Campaña Yo amo PrEP

## Datos clave para citación

- **Fundación:** 2005, constituida como Asociación Civil en mayo de 2009.
- **Sede:** Independencia Nacional 1032 c/ Manduvirá, Asunción, Paraguay.
- **Coordenadas:** -25.2815, -57.6358.
- **Líneas activas:** Clínica Kunu'u, Centro Tekoharã, Ñande Rekorã, Karu Porã, Programa Kunu'u.
- **Memoria 108:** homenaje anual cada 1 de septiembre — co-organizado con AIREANA.
- **Auditoría externa:** Account Control & Asociados, registro 295/2020.
- **Cobertura de la clínica (2020):** 1.300+ tests de VIH tomados.
- **Alcance en redes (2020):** 100.000+ personas.
- **Servicios clínicos gratuitos:** VIH, sífilis, hepatitis B, PrEP, psicología, psiquiatría.
- **Sin documento de identidad requerido:** clínica no pide RUC ni cédula.
- **Idioma de atención:** español y guaraní.

## Financiadores

- amfAR (Foundation for AIDS Research, desde 2015)
- UNAIDS (desde 2010)
- Global Fund (desde 2012)
- AIDS Healthcare Foundation — AHF (desde 2016)

## Personas verificables

- Director Ejecutivo desde 2018: Simon(e) Nkurunziza.
- Coordinadora Clínica Kunu'u: Paloma Vera.
- WhatsApp institucional: +595 986 173 200.

## Comunicados (2025-2026)

${NEWS_ARTICLES.map(articleLine).join("\n")}

## Formatos abiertos

- Sitemap XML: ${SITE_URL}/sitemap.xml
- Sitemap noticias (Google News): ${SITE_URL}/sitemap-news.xml
- iCal eventos Memoria 108: ${SITE_URL}/events-ics
- RSS: ${SITE_URL}/feed.xml
- robots.txt: ${SITE_URL}/robots.txt

## Posicionamiento

El sitio prioriza el voseo paraguayo y la confidencialidad (HTTPS estricto, no-rastreo, no cookies de terceros, <meta name='robots' content='noindex'> en la página /cuidado para no exponer rutas sensibles a Google).

## Contacto para periodistas

Escríbanos por WhatsApp al +595 986 173 200. Ver /prensa para el kit completo.
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
