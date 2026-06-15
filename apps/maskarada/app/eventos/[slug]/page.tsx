import Link from "next/link";
import { notFound } from "next/navigation";
import { events, getEventBySlug } from "@/lib/events-v2";
import { content } from "@/lib/content";

export async function generateStaticParams() {
  return events
    .filter((e) => e.kind === "evento")
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

export default async function EventoDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEventBySlug(slug);
  if (!e) notFound();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/eventos" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 mb-6 inline-block">
          ← Calendario de eventos
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-blood-500/20 text-blood-500 rounded-full text-xs uppercase tracking-widest border border-blood-500/30">
            Evento formal
          </span>
          {e.status === "upcoming" && (
            <span className="px-3 py-1 bg-gold-400/20 text-gold-400 rounded-full text-xs uppercase tracking-widest border border-gold-400/30">
              Próximo
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{e.title}</h1>
        <p className="text-gold-400 text-lg mb-2">
          📅 {e.dateLabel} · {e.startTime}
          {e.duration && <span className="text-gray-500"> · {e.duration}</span>}
        </p>
        <p className="text-gray-400 text-sm mb-6">📍 {e.location}</p>

        {e.description && (
          <p className="text-lg text-gray-300 leading-relaxed mb-8">{e.description}</p>
        )}

        {e.body && (
          <div className="prose-content text-gray-300 leading-relaxed mb-8 space-y-4">
            {e.body.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {e.price && (
            <div className="border border-white/10 rounded-lg p-3 bg-white/[0.02]">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Precio</p>
              <p className="text-sm text-gold-400">{e.price}</p>
            </div>
          )}
          {e.dresscode && (
            <div className="border border-white/10 rounded-lg p-3 bg-white/[0.02]">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dresscode</p>
              <p className="text-sm text-white">{e.dresscode}</p>
            </div>
          )}
          {e.capacity && (
            <div className="border border-white/10 rounded-lg p-3 bg-white/[0.02]">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Capacidad</p>
              <p className="text-sm text-white">{e.capacity} personas</p>
            </div>
          )}
        </div>

        {e.status === "upcoming" && (
          <div className="p-6 border border-gold-400/20 rounded-xl bg-gold-400/5 text-center">
            <p className="text-gray-300 mb-4">Anotate para recibir el anuncio de preventa y line-up.</p>
            <a
              href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20anotarme%20para%20${encodeURIComponent(e.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-400/90 hover:bg-gold-400 text-black px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
            >
              Anotarme por WhatsApp
            </a>
          </div>
        )}

        {e.status === "past" && (
          <div className="p-6 border border-white/5 rounded-xl bg-white/[0.02] text-center">
            <p className="text-gray-400 mb-4">Las fotos y el recap de este evento están en:</p>
            <Link
              href="/historia"
              className="inline-block text-gold-400 hover:text-white text-sm uppercase tracking-widest"
            >
              Ver archivo histórico →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
