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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-warm border border-[var(--color-warm-deep)] rounded-[var(--radius-lg)] p-8 text-center">
            <div className="text-4xl mb-3" aria-hidden="true">🌈</div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">
              Pronto
            </h2>
            <p className="text-text-light leading-relaxed mb-6 max-w-xl mx-auto">
              El mural de aliados se publica cada año junto al Informe Anual
              auditado. Por ahora, los números verificados están en
              <a href="/auditoria" className="text-[var(--color-primary)] underline font-medium"> /auditoria</a>;
              queremos que esta página refleje fielmente lo que cada donante
              aceptó publicar.
            </p>
            <a
              href="/donar"
              className="btn-primary"
            >
              Hacer una donación
            </a>
            <p className="text-xs text-text-muted mt-6 italic">
              Si querés que tu nombre figure, indicánoslo al enviar tu donación.
              Si preferís mantener el anonimato, no aparecerás en esta lista.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
