import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mural de aliados · SOMOSGAY",
  description:
    "Personas, organizaciones y empresas que han apoyado el trabajo de SOMOSGAY. Un reconocimiento público a quienes han sostenido la organización.",
  alternates: { canonical: `${SITE_URL}/aliados` },
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Mural de aliados" },
];

// TODO: reemplace con la lista de aliados confirmados por Paloma. Por ahora, los
// fundadores históricos que podemos nombrar públicamente. Cuando Paloma entregue
// la lista oficial, estos se enriquecen. Cada nivel tiene un umbral económico:
// Bronce = <500 USD/año, Plata = 500-5.000, Oro = 5.000-20.000, Platino = >20.000.

const LEVELS = [
  {
    name: "Platino",
    color: "text-purple-deep border-purple-deep",
    note: "+20.000 USD / año",
    members: ["Account Control & Asociados", "—"],
  },
  {
    name: "Oro",
    color: "text-amber-700 border-amber-500",
    note: "5.000–20.000 USD / año",
    members: ["—", "—"],
  },
  {
    name: "Plata",
    color: "text-zinc-700 border-zinc-400",
    note: "500–5.000 USD / año",
    members: ["—", "—", "—"],
  },
  {
    name: "Bronce",
    color: "text-orange-700 border-orange-400",
    note: "< 500 USD / año",
    members: ["—", "—", "—", "—"],
  },
];

export default function AliadosPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-aliados"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            Quienes nos sostienen
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">
            Mural de aliados
          </h1>
          <p className="text-lg text-text-light leading-relaxed max-w-3xl mb-4">
            Cada donación — grande o pequeña — mantuvo Clínica Kunu'u abierta y los
            programas comunitarios. Esta página es el reconocimiento público a quienes
            nos acompañan.
          </p>
          <div className="bg-warm rounded-xl p-4 text-sm text-text-light max-w-3xl">
            <strong>Sobre los niveles:</strong> las cifras se publican en rangos, no en
            montos exactos, para respetar la privacidad de cada donante. Si pediste
            anonimato, no aparecés acá.
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {LEVELS.map((lv) => (
            <div key={lv.name}>
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className={`font-display text-2xl lg:text-3xl font-bold border-b-4 pb-1 ${lv.color}`}>
                  {lv.name}
                </h2>
                <span className="text-sm text-text-muted">{lv.note}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {lv.members.map((m, i) => (
                  <div
                    key={i}
                    className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-4"
                  >
                    <p className="text-xs text-text-muted italic">
                      [Plaza disponible]
                    </p>
                    <p className="text-text mt-1">{m}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-warm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            ¿Querés que tu nombre aparezca?
          </h2>
          <p className="text-text-light mb-6 max-w-xl mx-auto">
            Si donás y querés ser incluida/o en el mural, indicánoslo al enviar tu
            donación. Si preferís mantener el anonimato, no aparecerás en esta lista.
          </p>
          <a
            href="/donar"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)]"
          >
            Hacer una donación
          </a>
        </div>
      </section>
    </div>
  );
}
