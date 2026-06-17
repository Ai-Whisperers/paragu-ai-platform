import Link from "next/link";
import { notFound } from "next/navigation";
import {
  events,
  getEventBySlug,
  FORMAT_LABEL,
  FORMAT_EMOJI,
  FORMAT_COLOR,
} from "@/lib/events-v2";
import { heroFor } from "@/lib/hero";

export async function generateStaticParams() {
  return events
    .filter((e) => e.kind === "encuentro")
    .map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEventBySlug(slug);
  if (!e) return {};
  return {
    title: `${e.title} — Club maškaráda`,
    description: e.description,
  };
}

export default async function EncuentroDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEventBySlug(slug);
  if (!e) notFound();

  const format = e.format || "social";

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/encuentros" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 mb-6 inline-block">
          ← Todos los encuentros
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <span className={`px-3 py-1 border rounded-full text-xs uppercase tracking-widest ${FORMAT_COLOR[format]}`}>
            {FORMAT_EMOJI[format]} {FORMAT_LABEL[format]}
          </span>
        </div>

        $1

        <div className="aspect-[21/9] overflow-hidden rounded-xl border border-white/5 mb-8 relative">
          <img
            src={heroFor(e.slug)}
            alt={e.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent pointer-events-none" />
        </div>

        <div className="space-y-1 mb-6 text-sm">
          {e.rrule && (
            <p className="text-gold-400">📅 Recurrente: {e.weekday} {e.startTime} {e.duration && `(${e.duration})`}</p>
          )}
          {!e.rrule && e.dateLabel && (
            <p className="text-gold-400">📅 {e.dateLabel} {e.startTime && `· ${e.startTime}`}</p>
          )}
          <p className="text-gray-400">📍 {e.location}</p>
          {e.address && <p className="text-gray-500 text-xs italic">{e.address}</p>}
        </div>

        {e.description && (
          <p className="text-lg text-gray-300 leading-relaxed mb-6">{e.description}</p>
        )}

        {e.body && (
          <article className="prose-content mb-8 text-gray-300 leading-relaxed space-y-4">
            {e.body.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {e.price && (
            <div className="border border-white/10 rounded-lg p-3 bg-white/[0.02]">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Precio</p>
              <p className="text-sm text-gold-400">{e.price}</p>
            </div>
          )}
          {e.signupNote && (
            <div className="border border-white/10 rounded-lg p-3 bg-white/[0.02]">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Anotación</p>
              <p className="text-sm text-white">{e.signupNote}</p>
            </div>
          )}
        </div>

        {e.signupUrl && (
          <div className="p-6 border border-gold-400/20 rounded-xl bg-gold-400/5 text-center">
            <p className="text-gray-300 mb-4">Anotate por WhatsApp para confirmar lugar y cupo.</p>
            <a
              href={e.signupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-400/90 hover:bg-gold-400 text-black px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
            >
              Anotarme por WhatsApp
            </a>
          </div>
        )}

        {e.tags && e.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {e.tags.map((t) => (
                <span key={t} className="text-xs border border-white/10 text-gray-400 px-3 py-1 rounded-full">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
