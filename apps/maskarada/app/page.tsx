import Link from "next/link";
import UpcomingEventsWidget from "@/components/UpcomingEventsWidget";
import { activities } from "@/lib/activities";
import { guides } from "@/lib/guides";
import { events } from "@/lib/events-v2";
import { events as historyEvents } from "@/lib/events";
import { content, whatsappLink } from "@/lib/content";

// Slimmed home: 6 sections. Each section has 1 clear purpose + 1 CTA.
// Removed: "La Experiencia" (vestigial), "Lo Que Dicen" (fake testimonios),
// "El Evento" (duplicated /eventos), "Tienda de la comunidad" (duplicated
// /tienda), Instagram (already in footer). Added: stats + community pulse,
// Historia featured event teaser.

const STATS = [
  { value: "4", label: "ediciones", note: "Desde junio 2025" },
  { value: "475+", label: "asistentes", note: "acumulado" },
  { value: "6", label: "actividades", note: "en el catálogo" },
  { value: "6", label: "guías", note: "para la comunidad" },
];

const featuredActivitySlugs = ["shibari-rope", "impact-play", "sensory-deprivation", "role-play-scene"];
const featuredActivities = activities.filter((a) => featuredActivitySlugs.includes(a.slug));

// Find the featured past event (Simón Dice) for the history teaser
const simondice = historyEvents.find((e) => e.slug === "2026-06-11-simondice");

export default function Home() {
  const hasUpcomingEventos = events.some(
    (e) => e.kind === "evento" && new Date(e.date) >= new Date()
  );

  return (
    <>
      {/* 1. HERO — what is maškaráda in 5 seconds */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/event-2026-06-11/hero.jpg"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-[#0a0a0a] z-10" />

        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <div className="text-5xl mb-4 animate-pulse">🎭</div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3">
            <span className="bg-gradient-to-r from-gray-100 via-gold-400 to-gray-100 bg-clip-text text-transparent">
              {content.hero.title}
            </span>
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">
            {content.hero.subtitle}
          </p>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            {content.site.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/eventos"
              className="bg-blood-500 hover:bg-blood-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105 glow-red"
            >
              Ver próximos eventos
            </Link>
            <a
              href={whatsappLink("Hola! Quiero sumarme a la comunidad maškaráda")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 2. UPCOMING EVENTS — what's coming next */}
      <UpcomingEventsWidget />

      {/* 3. WHAT IS MAŠKARÁDA — the elevator pitch + 4 entry points */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Qué es maškaráda?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Una comunidad de personas que exploran el kink y el BDSM de forma
                consensuada en Asunción, Paraguay. Cuatro ediciones de evento
                grande, un encuentro mensual, y un archivo abierto de guías y
                aprendizajes.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Si es tu primera vez, lo más amable es venir a un encuentro (un
                munch mensual, sin play, público) antes que a un evento formal.
                Si ya tenés experiencia, sabés dónde encontrar el calendario.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="border border-white/5 rounded-xl p-4 bg-white/[0.02]"
                >
                  <p className="text-3xl font-bold text-gold-400">{s.value}</p>
                  <p className="text-sm text-white mt-1">{s.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
            {[
              { emoji: "📅", label: "Eventos", href: "/eventos", desc: "Próximos, pasados" },
              { emoji: "☕", label: "Encuentros", href: "/encuentros", desc: "Munches, jams" },
              { emoji: "📚", label: "Aprender", href: "/aprender", desc: "Guías, glosario" },
              { emoji: "🏪", label: "Tienda", href: "/tienda", desc: "Productos de la comunidad" },
            ].map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                className="block border border-white/5 rounded-xl p-4 bg-white/[0.02] hover:border-gold-400/30 transition-all text-center"
              >
                <div className="text-3xl mb-2">{entry.emoji}</div>
                <p className="text-sm text-white font-medium">{entry.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{entry.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED ACTIVITIES — 4 of 6, "ver todas" */}
      <section className="py-20 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Actividades</h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Las prácticas que la comunidad enseña, hospeda y acompaña. Cada una
              con protocolos de seguridad y descripción detallada.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {featuredActivities.map((a) => (
              <Link
                key={a.slug}
                href={`/actividades/${a.slug}`}
                className="group block border border-white/5 rounded-xl p-4 bg-white/[0.02] hover:border-gold-400/30 transition-all text-center"
              >
                <div className="text-3xl mb-2">{a.emoji}</div>
                <p className="text-sm text-white font-medium group-hover:text-gold-400 transition-colors">
                  {a.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{a.tagline}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/actividades"
              className="inline-block border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
            >
              Ver las 6 actividades →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED HISTORY — Simón Dice teaser */}
      {simondice && (
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-[5/4] overflow-hidden rounded-xl border border-white/5">
                <img
                  src="/images/event-2026-06-11/hero.jpg"
                  alt={simondice.editionName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold-400 mb-2">
                  ★ Edición destacada
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {simondice.editionName}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {simondice.dateLabel} · 📍 {simondice.location}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6 line-clamp-4">
                  {simondice.body?.split("\n\n")[0] || simondice.theme}
                </p>
                <Link
                  href={`/historia/${simondice.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-white uppercase tracking-widest"
                >
                  Ver galería completa →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. CLOSING CTA — conditional on upcoming eventos */}
      {hasUpcomingEventos && (
        <section className="py-20 px-4 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-4 opacity-60">🎭</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para sumarte?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Hay un evento próximo. Anotate por WhatsApp o elegí un encuentro
              para empezar más tranquilo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/entradas"
                className="bg-blood-500 hover:bg-blood-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105 glow-red"
              >
                Comprar entradas
              </Link>
              <Link
                href="/encuentros"
                className="border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
              >
                Ver encuentros
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
