import type { Metadata } from "next";
import Script from "next/script";
import { content as c, SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Transparencia y auditoría · SOMOSGAY",
  description:
    "Cómo se usa cada guaraní donado a SOMOSGAY. Informes auditados, financiadores, asignación de fondos, rendición anual.",
  alternates: { canonical: `${SITE_URL}/auditoria` },
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Transparencia" },
];

export default function AuditoriaPage() {
  const data = (c as any).auditoria;

  return (
    <div>
      <Script
        id="ld-breadcrumb-auditoria"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            {data.subtitle}
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
            {data.title}
          </h1>
          <p className="text-lg text-text-light max-w-3xl">{data.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {data.values.map((v: string, i: number) => (
              <div
                key={i}
                className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] flex-shrink-0 text-xl" aria-hidden="true">
                    ✓
                  </span>
                  <p className="text-sm font-medium text-text">{v}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-display text-3xl font-bold mb-6">Quiénes nos financian</h2>
          <p className="text-text-light mb-8">
            Estas organizaciones otorgan grants a SOMOSGAY para programas específicos. Ninguna
            determina la agenda política ni la línea editorial.
          </p>
          <div className="space-y-3 mb-12">
            {data.funders.map((f: any, i: number) => (
              <div
                key={i}
                className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="font-display text-xl font-bold mb-1">{f.name}</div>
                    <div className="text-sm text-text-light">{f.type}</div>
                  </div>
                  <div className="text-right text-xs text-text-muted">
                    <div>Desde {f.since}</div>
                    <div className="italic mt-1">{f.scope}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-display text-3xl font-bold mb-6">Auditoría externa</h2>
          <p className="text-text-light mb-6">
            Cada año, una firma independiente audita los estados financieros. Las copias de los
            informes firmados están disponibles abajo.
          </p>
          <div className="bg-warm rounded-xl p-6 mb-12">
            {data.audit_firms.map((af: any, i: number) => (
              <div key={i}>
                <div className="font-bold mb-1">{af.name}</div>
                <div className="text-sm text-text-light">
                  {af.registration} · ejercicio {af.year}
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-display text-3xl font-bold mb-6">¿A dónde va cada guaraní?</h2>
          <p className="text-text-light mb-6">{data.allocation_intro}</p>
          <div className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 mb-12">
            {data.allocations.map((a: any, i: number) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-text">{a.label}</span>
                  <span className="font-mono font-bold text-[var(--color-primary)]">
                    {a.percent}%
                  </span>
                </div>
                <div className="bg-warm rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-[var(--color-primary)] rounded-full"
                    style={{ width: `${a.percent}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-display text-3xl font-bold mb-6">Documentos</h2>
          <ul className="space-y-2 mb-12">
            {data.documents.map((d: any, i: number) => (
              <li key={i}>
                <a
                  href={d.url}
                  className="flex items-center justify-between bg-surface border border-[var(--color-warm-deep)] rounded-lg p-4 hover:border-[var(--color-primary)] transition-colors"
                >
                  <span className="font-medium text-text">{d.label}</span>
                  <span className="text-xs text-text-muted">{d.size} →</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="bg-[var(--color-purple-deep)] text-white rounded-xl p-8 text-center">
            <h2 className="font-display text-2xl font-bold mb-3">{data.request_data}</h2>
            <a
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-[var(--color-purple-deep)] font-medium hover:bg-warm"
            >
              Ir a contacto
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
