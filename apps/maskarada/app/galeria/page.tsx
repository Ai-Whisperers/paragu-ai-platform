import Link from "next/link";
import { events } from "@/lib/events-v2";
import { content } from "@/lib/content";

export const metadata = {
  title: "Galería — Club maškaráda",
  description:
    "Fotos y material de cada edición de maškaráda. Simón Dice, Máscara Negra, Noche Oscura, Inauguración y más.",
};

export default function Galeria() {
  const c = content;
  // List of past + upcoming ediciones that have (or will have) photos
  const galeria = [
    {
      slug: "2026-06-11-simondice",
      title: "Simón Dice",
      date: "Jueves 11 de junio, 2026",
      count: 9,
      emoji: "🎭",
      description: "La edición de máscaras. 180 asistentes, dresscode dark/fetish/masquerade, Zona Cuerdas con Moñai.",
      accent: "border-gold-400/30 bg-gold-400/5",
    },
    {
      slug: "2025-12-12-mascaranegra",
      title: "Máscara Negra",
      date: "Viernes 12 de diciembre, 2025",
      count: 3,
      emoji: "🌑",
      description: "Edición de fin de año. Dresscode máscara negra formal, abriendo espacio para primerizos.",
      accent: "border-white/10 bg-white/[0.02]",
    },
    {
      slug: "2025-09-06-nocheoscura",
      title: "Noche Oscura",
      date: "Sábado 6 de septiembre, 2025",
      count: 3,
      emoji: "🌑",
      description: "Sensory play e iluminación mínima. Zona de principiantes supervisados.",
      accent: "border-white/10 bg-white/[0.02]",
    },
    {
      slug: "2025-06-14-inauguracion",
      title: "Inauguración",
      date: "Sábado 14 de junio, 2025",
      count: 1,
      emoji: "🎉",
      description: "La primera. 68 asistentes. La máscara del logo se usó esa noche.",
      accent: "border-white/10 bg-white/[0.02]",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">📷</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Galería
          </h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Las imágenes de nuestras noches. Cada edición tiene su página con fotos curadas, contexto y, eventualmente, fotos subidas por la comunidad.
          </p>
        </div>

        {/* Upload your photos CTA */}
        <div className="mb-12 border border-gold-400/20 rounded-xl p-6 bg-gold-400/5 text-center">
          <p className="text-gray-300 mb-3">
            ¿Sacas fotos en los eventos? Compartí las tuyas — el equipo las revisa y publica las mejores.
          </p>
          <Link
            href="/subir-fotos"
            className="inline-block bg-blood-500 hover:bg-blood-600 text-white px-6 py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
          >
            📸 Subir fotos
          </Link>
        </div>

        {/* Per-event grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {galeria.map((e) => (
            <Link
              key={e.slug}
              href={`/galeria/${e.slug}`}
              className={`block border ${e.accent} rounded-xl p-6 hover:border-gold-400/40 transition-all group`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl shrink-0">{e.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                    <h2 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                      {e.title}
                    </h2>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">
                      {e.count} fotos
                    </span>
                  </div>
                  <p className="text-xs text-gold-400 mb-2">{e.date}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{e.description}</p>
                  <p className="text-xs text-gold-400 mt-3 group-hover:underline">Ver galería →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pre-event — next edition */}
        <section className="mb-12 border-t border-white/5 pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Próxima edición</h2>
          <p className="text-gray-400 mb-4">Las fotos de la edición del 19 de septiembre, 2026 se subirán acá después del evento.</p>
          <Link
            href="/eventos"
            className="inline-block border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Ver eventos próximos
          </Link>
        </section>
      </div>
    </div>
  );
}
