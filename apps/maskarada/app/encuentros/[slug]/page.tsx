import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  events as upcomingEncuentros,
  getEventBySlug,
  FORMAT_LABEL,
  FORMAT_EMOJI,
  FORMAT_COLOR,
} from "@/lib/events-v2";
import { events as pastEdiciones, getEvent as getArchiveEvent } from "@/lib/events";
import { heroFor } from "@/lib/hero";

// Both sources of encuentro slugs: future/recurring (events-v2) and past ediciones (events archive).
// Past ediciones live canonically at /historia/[slug] — we 301 them there.
function resolveSlug(slug: string): "past" | "upcoming" | null {
  if (upcomingEncuentros.some((e) => e.slug === slug)) return "upcoming";
  if (pastEdiciones.some((e) => e.slug === slug)) return "past";
  return null;
}

export async function generateStaticParams() {
  const upcoming = upcomingEncuentros
    .filter((e) => e.kind === "encuentro")
    .map((e) => ({ slug: e.slug }));
  const past = pastEdiciones
    .filter((e) => e.status === "past")
    .map((e) => ({ slug: e.slug }));
  return [...upcoming, ...past];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kind = resolveSlug(slug);
  if (kind === "past") {
    const e = getArchiveEvent(slug);
    if (!e) return {};
    return {
      title: `${e.editionName} (${e.dateLabel}) — Club maškaráda`,
      description: e.body.split("\n\n")[0]?.slice(0, 200) || e.theme,
    };
  }
  if (kind === "upcoming") {
    const e = getEventBySlug(slug);
    if (!e) return {};
    return {
      title: `${e.title} — Club maškaráda`,
      description: e.description,
    };
  }
  return {};
}

export default async function EncuentroDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kind = resolveSlug(slug);

  // Past ediciones have their canonical home at /historia/[slug] (richer content: theme, body, photos, attendance).
  if (kind === "past") {
    redirect(`/historia/${slug}`);
  }

  if (kind === null || kind !== "upcoming") notFound();

  const e = getEventBySlug(slug);
  if (!e) notFound();

  const format = e.format || "social";

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/eventos#encuentros" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 mb-6 inline-block">
          ← Encuentros regulares
        </Link>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-3xl">{FORMAT_EMOJI[format]}</span>
          <span
            className={`text-xs px-3 py-1 border rounded-full uppercase tracking-widest ${FORMAT_COLOR[format]}`}
          >
            {FORMAT_LABEL[format]}
          </span>
          {e.rrule && (
            <span className="text-xs px-3 py-1 border border-gold-400/30 rounded-full text-gold-400 uppercase tracking-widest">
              Recurrente
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{e.title}</h1>
        <p className="text-gold-400 text-lg mb-2">
          {e.rrule ? `${e.weekday} ${e.startTime}` : `${e.dateLabel}${e.startTime ? " · " + e.startTime : ""}`}
        </p>
        <p className="text-gray-400 text-sm mb-8">📍 {e.location}</p>

        {e.description && (
          <p className="text-gray-300 leading-relaxed mb-8 text-lg">{e.description}</p>
        )}

        <div className="aspect-[21/9] overflow-hidden rounded-xl border border-white/5 mb-8">
          <img
            src={heroFor(e.slug)}
            alt={e.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4 text-gray-300 leading-relaxed">
          {e.body && <p>{e.body}</p>}
        </div>

        <div className="mt-10 p-6 border border-gold-400/20 rounded-xl bg-gold-400/5 text-center">
          <p className="text-gray-300 mb-3">
            ¿Te interesa este encuentro? Anotate por WhatsApp para recibir las coordenadas y los
            detalles de la próxima fecha.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-gold-400 hover:bg-gold-500 text-black px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-colors"
          >
            Anotarme
          </Link>
        </div>
      </div>
    </div>
  );
}
