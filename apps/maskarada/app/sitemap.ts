import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { activities } from "@/lib/activities";
import { events } from "@/lib/events-v2";
import { events as historyEvents } from "@/lib/events";

const BASE = "https://maskarada.paragu-ai.com";
const TODAY = new Date().toISOString();

/**
 * Dynamic sitemap. Generated from the actual data — guides, activities,
 * events, history, plus the static pages. If you add a page to one of
 * the data files, it shows up in the sitemap automatically.
 */

function makeEntry(url: string, priority: number): MetadataRoute.Sitemap[number] {
  return { url, lastModified: TODAY, changeFrequency: "monthly", priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    makeEntry(`${BASE}/`, 1.0),
    makeEntry(`${BASE}/eventos`, 0.9),
    makeEntry(`${BASE}/ritmo`, 0.8),
    makeEntry(`${BASE}/encuentros`, 0.8),
    makeEntry(`${BASE}/historia`, 0.8),
    makeEntry(`${BASE}/galeria`, 0.7),
    makeEntry(`${BASE}/aprender`, 0.9),
    makeEntry(`${BASE}/actividades`, 0.9),
    makeEntry(`${BASE}/tienda`, 0.8),
    makeEntry(`${BASE}/tienda/monai`, 0.7),
    makeEntry(`${BASE}/tienda/aplicar`, 0.6),
    makeEntry(`${BASE}/aliados`, 0.7),
    makeEntry(`${BASE}/colaborar`, 0.7),
    makeEntry(`${BASE}/cine`, 0.6),
    makeEntry(`${BASE}/musica`, 0.6),
    makeEntry(`${BASE}/foro`, 0.6),
    makeEntry(`${BASE}/testimonios`, 0.6),
    makeEntry(`${BASE}/testimonios/nuevo`, 0.3),
    makeEntry(`${BASE}/subir-fotos`, 0.5),
    makeEntry(`${BASE}/donar`, 0.7),
    makeEntry(`${BASE}/manifiesto`, 0.5),
    makeEntry(`${BASE}/reglas`, 0.6),
    makeEntry(`${BASE}/consentimiento`, 0.4),
    makeEntry(`${BASE}/contacto`, 0.5),
    makeEntry(`${BASE}/sobre`, 0.7),
    makeEntry(`${BASE}/comunidad`, 0.7),
    makeEntry(`${BASE}/staff`, 0.5),
    makeEntry(`${BASE}/faq`, 0.5),
    makeEntry(`${BASE}/entradas`, 0.6),
    makeEntry(`${BASE}/privacidad`, 0.3),
    makeEntry(`${BASE}/en`, 0.9),
    makeEntry(`${BASE}/en/eventos`, 0.8),
    makeEntry(`${BASE}/en/ritmo`, 0.7),
    makeEntry(`${BASE}/en/tienda`, 0.7),
    makeEntry(`${BASE}/en/aliados`, 0.6),
    makeEntry(`${BASE}/en/colaborar`, 0.6),
    makeEntry(`${BASE}/en/galeria`, 0.6),
    makeEntry(`${BASE}/en/subir-fotos`, 0.4),
    makeEntry(`${BASE}/en/donar`, 0.6),
  ];

  const guideEntries: MetadataRoute.Sitemap = guides.map((g) => makeEntry(`${BASE}/aprender/${g.slug}`, 0.7));
  const activityEntries: MetadataRoute.Sitemap = activities.map((a) => makeEntry(`${BASE}/actividades/${a.slug}`, 0.7));
  const eventEntries: MetadataRoute.Sitemap = events.map((e) => makeEntry(`${BASE}/eventos/${e.slug}`, 0.7));
  const encuentroEntries: MetadataRoute.Sitemap = events
    .filter((e) => e.kind === "encuentro")
    .map((e) => makeEntry(`${BASE}/encuentros/${e.slug}`, 0.5));
  const historyEntries: MetadataRoute.Sitemap = historyEvents.map((e) => makeEntry(`${BASE}/historia/${e.slug}`, 0.5));
  const galeriaEntries: MetadataRoute.Sitemap = historyEvents.map((e) => makeEntry(`${BASE}/galeria/${e.slug}`, 0.4));

  return [
    ...staticEntries,
    ...guideEntries,
    ...activityEntries,
    ...eventEntries,
    ...encuentroEntries,
    ...historyEntries,
    ...galeriaEntries,
  ];
}
