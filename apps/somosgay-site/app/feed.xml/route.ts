import { content as c, SITE_URL } from "@/lib/content";

/**
 * RSS 2.0 feed for /noticias. Hand-built XML because Next.js doesn't ship a
 * feed primitive yet (Next 16 may add one — check on upgrade).
 *
 * This is a SEED feed with the 5 program announcements + Memoria 108 + clinic
 * facts. Once /noticias has real article objects, replace the items array
 * with a real source of news entries.
 *
 * Includes <author> tag with email + name for Google News eligibility.
 * <dc:creator> extends the spec for clients that surface author name only.
 */

interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string; // RFC 822
  category: string;
  authorName: string;
  authorEmail: string;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const items: FeedItem[] = [
  {
    title: "SOMOSGAY lanza el sitio oficial en somosgay.paragu-ai.com",
    link: `${SITE_URL}/`,
    description:
      "Nueva plataforma pública de SOMOSGAY, accesible, segura y sin rastreo. Información de Clínica Kunu'u, programas comunitarios y Memoria 108.",
    pubDate: new Date("2026-07-10T16:00:00Z").toUTCString(),
    category: "Comunicado",
    authorName: "Equipo de comunicación SOMOSGAY",
    authorEmail: "hola@somosgay.org",
  },
  {
    title:
      "Clínica Kunu'u atendió más de 1.300 tests de VIH en 2020 y mantiene atención gratuita en 2026",
    link: `${SITE_URL}/clinica-kunuu`,
    description:
      "El Informe Anual 2020 auditado confirma el alcance de la primera clínica comunitaria dedicada a la salud LGTBI+ en Paraguay. La atención se mantiene sin costo y sin requerimiento de documento.",
    pubDate: new Date("2026-02-13T13:00:00Z").toUTCString(),
    category: "Servicios",
    authorName: "Equipo de comunicación SOMOSGAY",
    authorEmail: "hola@somosgay.org",
  },
  {
    title: "Programa Kunu'u — 'Yo amo PrEP: Yo amo más seguro'",
    link: `${SITE_URL}/programas/programa-kunuu`,
    description:
      "Campaña de prevención combinada de SOMOSGAY. PrEP reduce el riesgo de VIH en 99%. Acceso gratuito a través de Clínica Kunu'u.",
    pubDate: new Date("2026-06-15T13:00:00Z").toUTCString(),
    category: "Campaña",
    authorName: "Equipo de comunicación SOMOSGAY",
    authorEmail: "hola@somosgay.org",
  },
  {
    title: "Memoria 108 — Convocatoria al Mes de las Memorias 2026",
    link: `${SITE_URL}/memoria-108#anual`,
    description:
      "Septiembre 2026: conmemoración anual del trauma fundacional del movimiento LGTBI+ paraguayo. Co-organizado por AIREANA y SOMOSGAY.",
    pubDate: new Date("2026-05-01T13:00:00Z").toUTCString(),
    category: "Memoria",
    authorName: "Equipo de comunicación SOMOSGAY",
    authorEmail: "hola@somosgay.org",
  },
  {
    title: "Ñande Rekorã — cuidado mutuo y acompañamiento comunitario",
    link: `${SITE_URL}/programas/nande-rekora`,
    description:
      "Sistema de cuidado comunitario para personas LGTBI+ en situación de vulnerabilidad, articulado con Clínica Kunu'u y centros comunitarios.",
    pubDate: new Date("2026-04-10T13:00:00Z").toUTCString(),
    category: "Programa",
    authorName: "Equipo de comunicación SOMOSGAY",
    authorEmail: "hola@somosgay.org",
  },
  {
    title: "Karu Porã — seguridad alimentaria para la comunidad LGTBI+",
    link: `${SITE_URL}/programas/karu-pora`,
    description:
      "Programa de alimentación nutritiva para personas LGTBI+ en situación de calle o vulnerabilidad.",
    pubDate: new Date("2026-03-20T13:00:00Z").toUTCString(),
    category: "Programa",
    authorName: "Equipo de comunicación SOMOSGAY",
    authorEmail: "hola@somosgay.org",
  },
  {
    title: "Centro Comunitario Tekoharã — espacio seguro",
    link: `${SITE_URL}/programas/centro-tekohara`,
    description:
      "Sede física de SOMOSGAY en Asunción. Punto de encuentro, formación y organización comunitaria.",
    pubDate: new Date("2026-02-15T13:00:00Z").toUTCString(),
    category: "Programa",
    authorName: "Equipo de comunicación SOMOSGAY",
    authorEmail: "hola@somosgay.org",
  },
];

function buildRssXml(): string {
  const lastBuild = new Date().toUTCString();
  const itemXml = items
    .map(
      (it) => `  <item>
    <title>${escapeXml(it.title)}</title>
    <link>${escapeXml(it.link)}</link>
    <guid isPermaLink="false">${escapeXml(it.link)}</guid>
    <description>${escapeXml(it.description)}</description>
    <category>${escapeXml(it.category)}</category>
    <pubDate>${it.pubDate}</pubDate>
    <author>${escapeXml(it.authorEmail)} (${escapeXml(it.authorName)})</author>
    <dc:creator>${escapeXml(it.authorName)}</dc:creator>
  </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(c.site.title)} — Noticias y comunicados</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(c.site.description)}</description>
    <language>es-PY</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <managingEditor>hola@somosgay.org (Equipo SOMOSGAY)</managingEditor>
    <webMaster>hola@somosgay.org (Equipo SOMOSGAY)</webMaster>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${itemXml}
  </channel>
</rss>`;
}

export function GET() {
  return new Response(buildRssXml(), {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
