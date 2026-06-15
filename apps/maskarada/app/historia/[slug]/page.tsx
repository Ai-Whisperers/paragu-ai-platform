import Link from "next/link";
import { notFound } from "next/navigation";
import { events, getEvent } from "@/lib/events";
import { content } from "@/lib/content";

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  return {
    title: `${e.editionName} (${e.dateLabel}) — Club maškaráda`,
    description: e.body.split("\n\n")[0]?.slice(0, 200) || e.theme,
  };
}

export default async function EventoDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/historia" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 mb-6 inline-block">
          ← Volver a Historia
        </Link>

        {e.featured && (
          <span className="inline-block px-3 py-1 bg-gold-400/20 text-gold-400 rounded-full text-xs uppercase tracking-widest border border-gold-400/30 mb-3">
            ★ Edición destacada
          </span>
        )}

        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{e.editionName}</h1>
        <p className="text-gold-400 text-lg mb-2">{e.dateLabel}</p>
        <p className="text-gray-500 text-sm mb-1">
          📍 {e.location}
          {e.attendance && <span className="ml-3">👥 ~{e.attendance} asistentes</span>}
        </p>
        <p className="text-gold-400/80 italic text-base mt-3 mb-8">"{e.theme}"</p>

        <div className="space-y-4 text-gray-300 leading-relaxed mb-10">
          {e.body.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {e.photos.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Galería de la edición</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {e.photos.map((p, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-lg border border-white/5"
                >
                  <img
                    src={p}
                    alt={`Foto ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="p-6 border border-white/5 rounded-xl bg-white/[0.02] text-center">
          <p className="text-gray-300 mb-4">
            {e.status === "upcoming"
              ? "Enterate cuando se confirme la fecha y preventa."
              : "¿Conocés a alguien que estuvo en esta edición? Invitala a firmar el consentimiento de imagen."}
          </p>
          {e.status === "upcoming" ? (
            <a
              href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20enterarme%20cuando%20haya%20próximo%20evento%20maškaráda`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-400/90 hover:bg-gold-400 text-black px-6 py-2.5 rounded-full uppercase tracking-widest font-semibold text-sm transition-all"
            >
              Notificarme por WhatsApp
            </a>
          ) : (
            <Link
              href="/consentimiento"
              className="inline-flex items-center gap-2 bg-gold-400/90 hover:bg-gold-400 text-black px-6 py-2.5 rounded-full uppercase tracking-widest font-semibold text-sm transition-all"
            >
              Firmar consentimiento
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
