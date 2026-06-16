import Link from "next/link";
import { films, latamFilms, featuredFilms, type Film } from "@/lib/films";
import { content } from "@/lib/content";

export const metadata = {
  title: "Cine — Club maškaráda",
  description:
    "Archivo curado de cine, cortos y series con temas kink/BDSM/fetish. Documentales, ficción, cortometrajes. Notas de contenido y por qué los recomendamos.",
};

const TONE_LABEL: Record<string, string> = {
  docu: "Documental",
  fictional: "Ficción",
  poetic: "Poético",
  historic: "Histórico",
  explicit: "Explícito",
  romantic: "Romántico",
  transgressive: "Transgresor",
  dark: "Oscuro",
  comedic: "Cómico",
  educational: "Educativo",
};

const CATEGORY_LABEL: Record<Film["category"], string> = {
  feature: "Largometraje",
  documentary: "Documental",
  short: "Cortometraje",
  series: "Serie",
};

function FilmCard({ film }: { film: Film }) {
  return (
    <article className="border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:border-gold-400/30 transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="text-xl font-bold text-white">{film.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {film.year} · {film.director} · {film.country} · {film.duration}
          </p>
        </div>
        <span className="px-3 py-1 border border-gold-400/30 rounded-full text-xs uppercase tracking-widest text-gold-400 shrink-0">
          {CATEGORY_LABEL[film.category]}
        </span>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed mb-3">{film.description}</p>
      <p className="text-gold-400 text-sm italic mb-3">"{film.why}"</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {film.tone.map((t) => (
          <span key={t} className="text-xs border border-white/10 text-gray-400 px-2 py-0.5 rounded-full">
            {TONE_LABEL[t] || t}
          </span>
        ))}
        {film.region === "latin-america" && (
          <span className="text-xs border border-gold-400/30 text-gold-400 px-2 py-0.5 rounded-full">LATAM</span>
        )}
        {film.subtitled && (
          <span className="text-xs border border-green-500/30 text-green-400 px-2 py-0.5 rounded-full">Subs ES</span>
        )}
      </div>

      {film.contentWarnings.length > 0 && (
        <div className="text-xs text-gray-500 mb-3">
          <strong>Advertencias:</strong> {film.contentWarnings.join(" · ")}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {film.links.map((l, i) => (
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

export default function Cine() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🎬</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">Cine</h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Largometrajes, cortometrajes, documentales y series con temas
            kink/BDSM/fetish. Curado por la comunidad, con advertencias de
            contenido y por qué los recomendamos.
          </p>
        </div>

        <div className="border border-gold-400/20 rounded-xl p-4 bg-gold-400/5 text-sm text-gray-400 mb-12">
          <p>
            <strong className="text-gold-400">Sobre este archivo:</strong> No
            alojamos ni distribuimos contenido. Todos los enlaces van a
            servicios públicos (IMDb, Wikipedia, MUBI, JustWatch, sitios de
            festivales). Esta es una guía curada, no una videoteca.
          </p>
        </div>

        {latamFilms.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="px-3 py-1 border border-gold-400/30 rounded-full text-xs uppercase tracking-widest text-gold-400">
                LATAM
              </span>
              <span className="text-gray-500 text-sm">({latamFilms.length})</span>
            </h2>
            <p className="text-sm text-gray-500 mb-4 italic">
              Cine latinoamericano con temas de deseo, sensualidad, o kink.
            </p>
            <div className="space-y-4">
              {latamFilms.map((f) => (
                <FilmCard key={f.slug} film={f} />
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Todos los films</h2>
          <p className="text-sm text-gray-500 mb-4">
            {films.length} títulos. Empezá por los documentales si recién te acercás.
          </p>
          <div className="space-y-4">
            {films.map((f) => (
              <FilmCard key={f.slug} film={f} />
            ))}
          </div>
        </section>

        <div className="mt-12 p-8 border border-white/5 rounded-xl bg-white/[0.02] text-center">
          <p className="text-gray-300 mb-4">¿Tenés una recomendación para sumar?</p>
          <a
            href={`https://wa.me/${content.site.whatsappNumber}?text=Hola!%20Quiero%20sumar%20una%20pel%C3%ADcula%20al%20archivo%20de%20cine`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Recomendar una película
          </a>
        </div>
      </div>
    </div>
  );
}
