import Link from "next/link";
import Countdown from "@/components/Countdown";
import RevealOnScroll from "@/components/RevealOnScroll";
import { activities } from "@/lib/activities";
import { guides } from "@/lib/guides";
import { content, whatsappLink } from "@/lib/content";

const EXPERIENCE_CARDS = [
  {
    icon: "🎭",
    title: "Misterio",
    description: "El anonimato libera. Con o sin máscara, explorá tus deseos en un espacio seguro y sin juicios.",
  },
  {
    icon: "⛓️",
    title: "Kink & BDSM",
    description: "Espacios de juego, shibari, disciplinas, y exploración sensorial con protocolo SSC/RACK.",
  },
  {
    icon: "🎶",
    title: "Música y Performances",
    description: "DJ sets, body painting en vivo, performances eróticas y un ambiente cuidado hasta el último detalle.",
  },
];

const TESTIMONIALS = [
  { rating: "★★★★★", author: "Invitada", text: "Un espacio único en Asunción. La atención al detalle, la iluminación, la música... todo está cuidado con un nivel que no esperaba. Me sentí libre y segura." },
  { rating: "★★★★★", author: "Invitado", text: "Finalmente un espacio para la exploración kink con seriedad y respeto. Las reglas están claras, el ambiente es seguro, y la gente es increíble." },
  { rating: "★★★★★", author: "Invitada", text: "El dresscode, la energía, las performances en vivo... es una experiencia que tenés que vivir al menos una vez. Ya quiero que llegue la próxima." },
  { rating: "★★★★★", author: "Invitado", text: "El concepto de 'máscara' como liberación es poderoso. Conocés gente increíble, explorás sin prejuicios. Una experiencia transformadora." },
];

const EVENT_DETAILS = [
  { icon: "📅", title: "Cuándo", description: "Jueves 11 de junio, 2026 — 19:00 hs" },
  { icon: "📍", title: "Dónde", description: "Eligio Ayala 1073, Asunción — Ver en Google Maps", link: content.site.addressMaps },
  { icon: "🎟️", title: "Entradas", description: "Pre-venta: 40.000 Gs. Cupos limitados — entrada solo con reserva previa." },
  { icon: "🔞", title: "Edad mínima", description: "+18. Se requerirá documento de identidad." },
  { icon: "👗", title: "Dresscode sugerido", description: "Sexy, dark, leather, lace, latex, fetish, fantasía, o simplemente vos. Máscaras bienvenidas." },
];

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
            <source srcSet="/images/event-2026-06-11/hero.jpg" type="image/jpeg" />
            <img
              src="/images/event-2026-06-11/hero.jpg"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-[#0a0a0a] z-10" />

        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <div className="text-6xl mb-6 animate-pulse">🎭</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
            <span className="reveal-text inline-block bg-gradient-to-r from-gray-100 via-gold-400 to-gray-100 bg-clip-text text-transparent">
              {content.hero.title}
            </span>
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-8">
            {content.hero.subtitle}
          </p>
          <p className="reveal-text-delayed text-xl md:text-2xl text-gray-300 italic font-light mb-12">
            &ldquo;{content.hero.tagline}&rdquo;
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-3 text-gray-400">
              <svg className="w-6 h-6 text-blood-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-lg">{content.site.eventDateLabel}</span>
            </div>
            <a
              href={content.site.addressMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors group"
            >
              <svg className="w-6 h-6 text-blood-500 group-hover:text-gold-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-lg">{content.site.address}</span>
            </a>
          </div>

          <div className="mb-10">
            <Countdown />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/entradas"
              className="bg-blood-500 hover:bg-blood-600 text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105 glow-red"
            >
              Comprar entradas
            </Link>
            <Link
              href="/actividades"
              className="border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-10 py-4 rounded-full text-sm uppercase tracking-widest transition-all"
            >
              Qué hacemos
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About / Vibe Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">La Experiencia</h2>
            <div className="w-16 h-0.5 bg-blood-500 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXPERIENCE_CARDS.map((it, i) => (
              <div
                key={i}
                className="text-center p-8 border border-white/5 rounded-xl hover:border-blood-500/30 transition-colors bg-white/[0.02] reveal"
              >
                <div className="text-4xl mb-4">{it.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{it.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{it.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Lo Que Dicen</h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
            <p className="text-gray-400 mt-4 text-sm max-w-lg mx-auto">
              Voces de la comunidad que ya vivió la experiencia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-6 border border-white/5 rounded-xl bg-white/[0.02] text-left reveal">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gold-400 text-lg">{t.rating}</span>
                  <span className="text-xs text-gray-600">— {t.author}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">El Evento</h2>
            <div className="w-16 h-0.5 bg-blood-500 mx-auto" />
          </div>
          <div className="space-y-6 max-w-2xl mx-auto">
            {EVENT_DETAILS.map((d, i) => (
              <div key={i} className="flex items-start gap-4 p-4 reveal">
                <span className="text-2xl text-blood-500 shrink-0">{d.icon}</span>
                <div>
                  <h3 className="font-semibold text-white">{d.title}</h3>
                  {d.link ? (
                    <a href={d.link} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gold-400 transition-colors underline underline-offset-2">
                      {d.description}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-400">{d.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities teaser */}
      <section className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Actividades</h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              La comunidad enseña, hospeda y acompaña un catálogo de prácticas kink. Cada una con
              protocolos de seguridad y descripción detallada.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {activities.slice(0, 6).map((a) => (
              <Link
                key={a.slug}
                href={`/actividades/${a.slug}`}
                className="border border-white/5 rounded-xl p-4 bg-white/[0.02] hover:border-gold-400/30 transition-all text-center"
              >
                <div className="text-3xl mb-2">{a.emoji}</div>
                <p className="text-sm text-white font-medium">{a.name}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/actividades"
              className="inline-block border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
            >
              Ver todas las actividades
            </Link>
          </div>
        </div>
      </section>

      {/* Aprende teaser */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Aprender</h2>
            <div className="w-16 h-0.5 bg-blood-500 mx-auto" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Guías, protocolos y aprendizajes para la comunidad kink. Seguridad, comunicación,
              vocabulario, logística de eventos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {guides.slice(0, 3).map((g) => (
              <Link
                key={g.slug}
                href={`/aprender/${g.slug}`}
                className="border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:border-gold-400/30 transition-all"
              >
                <h3 className="text-base font-semibold text-white mb-1">{g.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-2">{g.excerpt.slice(0, 100)}…</p>
                <p className="text-xs text-gray-500">{g.readMinutes} min</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/aprender"
              className="inline-block border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
            >
              Ir a la sección Aprender
            </Link>
          </div>
        </div>
      </section>

      {/* Tienda teaser */}
      <section className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center reveal">
          <div className="text-6xl mb-6 opacity-60">🏪</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tienda de la comunidad</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Marketplace de productos y servicios de la comunidad: cuerdas shobari, leather, latex,
            workshops. Hecho en Paraguay.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tienda"
              className="bg-gold-400/90 hover:bg-gold-400 text-black px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
            >
              Ver tienda
            </Link>
            <Link
              href="/tienda/aplicar"
              className="border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
            >
              Vender en la tienda
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="text-6xl mb-6 opacity-60">🎭</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para la experiencia?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Cupos limitados. Reservá tu entrada antes de que se agoten. La noche donde el deseo
            usa máscara te espera.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/entradas"
              className="bg-blood-500 hover:bg-blood-600 text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105 glow-red"
            >
              Reservar ahora
            </Link>
            <a
              href={whatsappLink("Quiero info sobre Club maškaráda")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-10 py-4 rounded-full text-sm uppercase tracking-widest transition-all"
            >
              Consultar por WhatsApp
            </a>
          </div>
          <p className="text-xs text-gray-600 mt-6">
            📍 {content.site.address} — {content.site.eventDateLabel}
          </p>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Seguinos en Instagram
          </h2>
          <p className="text-gray-400 mb-8">
            Enterate de todas las novedades, próximas fechas y contenido exclusivo.
          </p>
          <a
            href={content.site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            @{content.site.instagramHandle}
          </a>
        </div>
      </section>
    </>
  );
}
