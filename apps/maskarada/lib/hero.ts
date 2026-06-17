/**
 * Hero image picker for detail pages. Maps content slugs → best-fit photo.
 *
 * We have 9 curated photos from /images/event-2026-06-11/ + 7 originals
 * from /images/photos/. The mapping below picks a relevant hero for each
 * content type. Falls back to a generic dark hero if no match.
 *
 * If you want to remap: edit this file. The list is hand-curated.
 */

const HEROES: Record<string, string> = {
  // Guides
  "que-es-bdsm": "/images/event-2026-06-11/atmosphere-01.jpg",
  "palabras-seguridad": "/images/event-2026-06-11/atmosphere-04.jpg",
  "primera-fiesta": "/images/event-2026-06-11/hero.jpg",
  "negociacion": "/images/event-2026-06-11/atmosphere-02.jpg",
  "sub-drop": "/images/event-2026-06-11/atmosphere-05.jpg",
  "glosario": "/images/event-2026-06-11/crowd-02.jpg",

  // Activities
  "shibari-rope": "/images/event-2026-06-11/performance-01.jpg",
  "impact-play": "/images/event-2026-06-11/performance-02.jpg",
  "sensory-deprivation": "/images/event-2026-06-11/atmosphere-03.jpg",
  "role-play-scene": "/images/event-2026-06-11/crowd-02.jpg",
  "psychological-play": "/images/event-2026-06-11/atmosphere-04.jpg",
  "service-play": "/images/event-2026-06-11/atmosphere-05.jpg",
};

const FALLBACK = "/images/event-2026-06-11/hero.jpg";

export function heroFor(slug: string): string {
  return HEROES[slug] ?? FALLBACK;
}
