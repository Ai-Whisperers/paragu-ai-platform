import Link from "next/link";
import { music, podcasts, type MediaItem } from "@/lib/media";
import { content } from "@/lib/content";

export const metadata = {
  title: "Música y podcasts — Club maškaráda",
  description:
    "Música, DJ sets, podcasts y mixes curados para la comunidad maškaráda. Industrial, EBM, dark techno, dark ambient. Podcasts sobre kink, consentimiento, sexualidad.",
};

function MediaCard({ m }: { m: MediaItem }) {
  const isMusic = m.kind === "music";
  return (
    <article className="border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:border-gold-400/30 transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="text-lg font-bold text-white">{m.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {m.creator}
            {m.year ? ` · ${m.year}` : ""} · {m.duration}
          </p>
        </div>
        <span className={`px-3 py-1 border rounded-full text-xs uppercase tracking-widest shrink-0 ${
          isMusic ? "border-gold-400/30 text-gold-400" : "border-blood-500/30 text-blood-500"
        }`}>
          {isMusic ? "🎵 Música" : "🎙 Podcast"}
        </span>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed mb-2">{m.description}</p>
      <p className="text-gold-400 text-sm italic mb-3">"{m.why}"</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {m.tags.map((t) => (
          <span key={t} className="text-xs border border-white/10 text-gray-400 px-2 py-0.5 rounded-full">
            {t}
          </span>
        ))}
        {m.region && m.region !== "us-canada" && (
          <span className="text-xs border border-gold-400/30 text-gold-400 px-2 py-0.5 rounded-full">
            {m.region}
          </span>
        )}
      </div>

      {m.contextWarnings && m.contextWarnings.length > 0 && (
        <div className="text-xs text-gray-500 mb-3">
          <strong>Notas:</strong> {m.contextWarnings.join(" · ")}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {m.links.map((l, i) => (
          <a
            key={i}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gold-400 hover:text-white border border-gold-400/30 hover:border-gold-400 px-3 py-1 rounded-full transition-all"
          >
            {l.label} →
          </a>
        ))}
      </div>
    </article>
  );
}

export default function Musica() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🎵</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Música y podcasts
          </h1>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lo que suena en los eventos, lo que suena en el chill-out, y los
            podcasts que la comunidad escucha. Curado con la comunidad.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="px-3 py-1 border border-gold-400/30 rounded-full text-xs uppercase tracking-widest text-gold-400">
              🎵 Música
            </span>
            <span className="text-gray-500 text-sm">({music.length} sets/albums)</span>
          </h2>
          <p className="text-sm text-gray-500 mb-4 italic">
            DJ sets, mixtapes, y albums que funcionan en eventos. Industrial,
            EBM, dark techno, dark ambient. Para sets de pre/post-evento y
            ambientar sesiones.
          </p>
          <div className="space-y-4">
            {music.map((m) => (
              <MediaCard key={m.slug} m={m} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="px-3 py-1 border border-blood-500/30 rounded-full text-xs uppercase tracking-widest text-blood-500">
              🎙 Podcasts
            </span>
            <span className="text-gray-500 text-sm">({podcasts.length} shows)</span>
          </h2>
          <p className="text-sm text-gray-500 mb-4 italic">
            Podcasts sobre kink, sexualidad, y comunidad. Para el viaje, la
            semana, o cuando querés escuchar a personas reales hablando de su
            práctica.
          </p>
          <div className="space-y-4">
            {podcasts.map((m) => (
              <MediaCard key={m.slug} m={m} />
            ))}
          </div>
        </section>

        <div className="mt-12 p-8 border border-white/5 rounded-xl bg-white/[0.02] text-center">
          <p className="text-gray-300 mb-4">¿Tenés una recomendación para sumar?</p>
          <a
            href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20sumar%20música%20o%20podcast%20al%20archivo`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Recomendar
          </a>
        </div>
      </div>
    </div>
  );
}
