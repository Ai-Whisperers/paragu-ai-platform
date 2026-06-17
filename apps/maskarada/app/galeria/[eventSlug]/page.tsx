import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/lib/events-v2";
import { events as historyEvents } from "@/lib/events";
import { content } from "@/lib/content";

export const metadata = {
  title: "Galería — Club maškaráda",
  description: "Fotos de cada edición de maškaráda.",
};

interface EventPhoto {
  src: string;
  caption?: string;
}

// Curated photo manifests per event. Pulls from the 9 curated photos
// in /public/images/event-2026-06-11/ + the original 7 in /public/images/photos/.
// When mk_photos table is populated, read from there instead.

const PHOTOS_BY_SLUG: Record<string, EventPhoto[]> = {
  "2026-06-11-simondice": [
    { src: "/images/event-2026-06-11/hero.jpg", caption: "Hero · entrada de la noche" },
    { src: "/images/event-2026-06-11/atmosphere-01.jpg" },
    { src: "/images/event-2026-06-11/atmosphere-02.jpg" },
    { src: "/images/event-2026-06-11/atmosphere-03.jpg" },
    { src: "/images/event-2026-06-11/atmosphere-04.jpg" },
    { src: "/images/event-2026-06-11/atmosphere-05.jpg" },
    { src: "/images/event-2026-06-11/crowd-02.jpg", caption: "Crowd · pista principal" },
    { src: "/images/event-2026-06-11/performance-01.jpg", caption: "Performance · body painting" },
    { src: "/images/event-2026-06-11/performance-02.jpg", caption: "Performance · role play" },
  ],
  "2025-12-12-mascaranegra": [
    { src: "/images/photos/event_508986.jpg", caption: "Edición principal" },
    { src: "/images/photos/instagram_475433.jpg" },
    { src: "/images/photos/instagram_474917.jpg" },
  ],
  "2025-09-06-nocheoscura": [
    { src: "/images/photos/event_508619.jpg", caption: "Edición principal" },
    { src: "/images/photos/instagram_476627.jpg" },
    { src: "/images/photos/instagram_474979.jpg" },
  ],
  "2025-06-14-inauguracion": [
    { src: "/images/photos/instagram_503576.jpg", caption: "La primera noche" },
  ],
};

function findEventMeta(slug: string) {
  // search both events-v2 (formal) and events (archive)
  const formal = events.find((e) => e.slug === slug);
  if (formal) return formal;
  return historyEvents.find((e) => e.slug === slug);
}

export default async function GaleriaEvento({ params }: { params: Promise<{ eventSlug: string }> }) {
  const { eventSlug } = await params;
  const meta = findEventMeta(eventSlug);
  const photos = PHOTOS_BY_SLUG[eventSlug];

  if (!meta || !photos) {
    notFound();
  }

  const formalMeta = "kind" in meta ? meta : null;
  const historyMeta = !formalMeta ? meta : null;
  const title = formalMeta
    ? formalMeta.title
    : (historyMeta as { editionName: string } | null)?.editionName ?? eventSlug;
  const date = formalMeta ? formalMeta.dateLabel : (historyMeta as { dateLabel: string } | null)?.dateLabel ?? "";
  const location = formalMeta ? formalMeta.location : (historyMeta as { location: string } | null)?.location ?? "";
  const theme = formalMeta
    ? (formalMeta.tags?.join(" · ") ?? "")
    : ((historyMeta as { theme?: string } | null)?.theme ?? "");
  const isFormal = formalMeta?.kind === "evento";

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/galeria" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 mb-6 inline-block">
          ← Galería
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${
              isFormal
                ? "border-blood-500/40 bg-blood-500/10 text-blood-500"
                : "border-gold-400/40 bg-gold-400/10 text-gold-400"
            }`}>
              {isFormal ? "Edición formal" : "Edición pasada"}
            </span>
            {theme && (
              <span className="text-xs text-gray-500 italic">"{theme}"</span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
            {title}
          </h1>
          <p className="text-gold-400 text-lg">{date} · 📍 {location}</p>
        </header>

        {/* Photo grid */}
        {photos.length === 1 ? (
          <div className="mb-10">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
              <img
                src={photos[0].src}
                alt={photos[0].caption || title}
                className="w-full h-full object-cover"
              />
            </div>
            {photos[0].caption && (
              <p className="text-sm text-gray-400 text-center mt-3 italic">{photos[0].caption}</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {photos.map((p, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden border border-white/10 ${
                  i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"
                }`}
              >
                <img
                  src={p.src}
                  alt={p.caption || `${title} foto ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading={i < 4 ? "eager" : "lazy"}
                />
                {p.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white italic">{p.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Upload your photos CTA */}
        <div className="mt-12 border-t border-white/5 pt-8 text-center">
          <p className="text-gray-300 mb-3">¿Sacaste fotos en {title}? Sumalas a la galería.</p>
          <Link
            href={`/subir-fotos/${eventSlug}`}
            className="inline-block bg-blood-500 hover:bg-blood-600 text-white px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
          >
            📸 Subir fotos de {title}
          </Link>
        </div>

        {/* Cross-link to /historia if past event with more context */}
        {historyMeta && (
          <div className="mt-8 text-center">
            <Link
              href={`/historia/${eventSlug}`}
              className="text-gold-400 hover:text-gold-300 text-sm"
            >
              Ver el recap completo de {title} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
