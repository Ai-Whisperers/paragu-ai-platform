import type { Metadata } from "next";
import Link from "next/link";
import { content as c, SITE_URL } from "@/lib/content";
import Script from "next/script";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { Memoria108Countdown } from "@/components/Memoria108Countdown";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Memoria 108 — El trauma fundacional del movimiento LGTBI+ paraguayo",
  description:
    "Septiembre, Mes de las Memorias 108. Bernardo Aranda Valdez (1959), las razias policiales, y la Carta de un Amoral — 10 años antes de Stonewall.",
  alternates: { canonical: `${SITE_URL}/memoria-108` },
};


const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Memoria 108" },
];

// Event JSON-LD for "Mes de las Memorias 108" — recurring annual event in September.
// Specific dates vary by year (events span ~30 days). Using Sept 1 + Sept 30 as
// startDate/endDate for the 2026 edition. status='EventScheduled' / 'EventPostponed'
// would be updated when the 2026 calendar is finalized.
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": `${SITE_URL}/memoria-108/#event-2026`,
  name: "Mes de las Memorias 108 — 2026",
  description:
    "Conmemoración anual del trauma fundacional del movimiento LGTBI+ paraguayo: las razias de septiembre 1959 contra 108 hombres gays en Asunción. Co-organizado por AIREANA y SOMOSGAY.",
  startDate: "2026-09-01",
  endDate: "2026-09-30",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Asunción, Paraguay",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Asunción",
      addressCountry: "PY",
    },
  },
  organizer: [
    { "@type": "Organization", name: "SOMOSGAY", "@id": `${SITE_URL}/#organization` },
    { "@type": "Organization", name: "AIREANA" },
  ],
  inLanguage: ["es-PY", "gn"],
  url: `${SITE_URL}/memoria-108#anual`,
};
export default function MemoriaPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-memoria-108"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />
      <Script
        id="ld-event-memoria-2026"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
            {/* HERO — somber */}
      <section className="bg-[var(--color-purple-deep)] text-white relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        
        <Breadcrumbs items={crumbs} className="mb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" /><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-white/60 mb-3 font-medium">
            Septiembre · Mes de las Memorias
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">
            {c.memoria108.title}
          </h1>
          <p className="text-xl text-white/80 mb-4">{c.memoria108.subtitle}</p>
          <p className="text-lg text-white/70 leading-relaxed">{c.memoria108.lead}</p>
        </div>
      </section>

      <section id="anual" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Memoria108Countdown />
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-text-light leading-relaxed mb-12">{c.memoria108.intro}</p>

          {/* Timeline */}
          <h2 className="font-display text-2xl font-bold mb-8">Cronología de los hechos</h2>
          <ol className="relative border-l-2 border-[var(--color-warm-deep)] pl-6 space-y-8">
            {c.memoria108.key_dates.map((d: any, i: number) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[var(--color-primary)] border-4 border-surface"
                  aria-hidden="true"
                />
                <div className="text-sm font-mono text-[var(--color-primary)] mb-1">{d.date}</div>
                <div className="text-text-light">{d.event}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CARTA DE UN AMORAL */}
      <section className="py-16 bg-warm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface border-l-4 border-[var(--color-accent)] p-8 rounded-r-xl">
            <h2 className="font-display text-3xl font-bold mb-4">{c.memoria108.carta.title}</h2>
            <p className="text-text-light leading-relaxed mb-4">{c.memoria108.carta.lead}</p>
            <p className="text-sm text-text-muted italic">{c.memoria108.carta.significance}</p>
          </div>
        </div>
      </section>

      {/* MEMORY WORK */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold mb-8">{c.memoria108.memory_work.title}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {c.memoria108.memory_work.items.map((m: any, i: number) => (
              <div key={i} className="bg-warm rounded-xl p-6 border border-[var(--color-warm-deep)]">
                <div className="font-display text-3xl font-bold text-[var(--color-primary)] mb-2">{m.year}</div>
                <h3 className="font-display text-lg font-bold mb-1">{m.title}</h3>
                <p className="text-xs text-[var(--color-primary)] mb-3 font-medium">{m.author}</p>
                <p className="text-sm text-text-light leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANNUAL */}
      <section id="anual" className="py-16 bg-[var(--color-secondary)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-3">{c.memoria108.annual.title}</h2>
          <p className="text-white/80 leading-relaxed mb-6 max-w-2xl mx-auto">
            {c.memoria108.annual.description}
          </p>
          <div className="font-display text-2xl font-bold text-[var(--color-rainbow-3)]">
            {c.memoria108.annual.next_event_date}
          </div>
          <p className="text-xs text-white/50 mt-8 max-w-2xl mx-auto">
            <strong>🚨 Nota de transparencia:</strong> Los datos históricos de este memorial están basados en investigación pública pero requieren revisión humana antes de uso en material impreso o educativo. Ver{" "}
            <Link
              href="https://github.com/Ai-Whisperers/somosgay-context/blob/main/docs/04_brand/memoria-108.md"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              memoria-108.md en el repo de contexto
            </Link>
            .
          </p>
        </div>
      </section>
    

      <ShareButtons
        title="Memoria 108 — caso Bernardo Aranda y Carta de un Amoral"
        url={`${SITE_URL}/memoria-108`}
        intro="Si te parece útil, compartilo — cada clic ayuda a que más personas conozcan los servicios."
      /></div>
  );
}