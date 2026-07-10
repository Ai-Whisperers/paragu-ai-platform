import type { Metadata } from "next";
import Link from "next/link";
import content from "@/content/es.json";

const c = content as any;

export const metadata: Metadata = {
  title: "Sobre SOMOSGAY",
  description:
    "Asociación Civil sin fines de lucro fundada en 2005. Liderazgo, auditoría y transparencia.",
  alternates: { canonical: `${c.site.url}/nosotros` },
};

export default function NosotrosPage() {
  return (
    <div>
      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            {c.nosotros.subtitle}
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">{c.nosotros.title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {c.nosotros.paragraphs.map((p: string, i: number) => (
            <p key={i} className="text-lg text-text-light leading-relaxed mb-6">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section id="liderazgo" className="py-16 bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-8">{c.nosotros.leadership.title}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface rounded-xl p-6 border border-[var(--color-warm-deep)]">
              <div className="font-display text-2xl font-bold">{c.nosotros.leadership.executive_director.name}</div>
              <p className="text-sm text-[var(--color-primary)] font-medium mb-1">{c.nosotros.leadership.executive_director.role}</p>
              <p className="text-xs text-text-muted">desde {c.nosotros.leadership.executive_director.since}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-[var(--color-warm-deep)]">
              <div className="font-display text-2xl font-bold">{c.nosotros.leadership.coordinator_kunuu.name}</div>
              <p className="text-sm text-[var(--color-primary)] font-medium">{c.nosotros.leadership.coordinator_kunuu.role}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-[var(--color-warm-deep)]">
              <div className="font-display text-2xl font-bold">{c.nosotros.leadership.family_md_kunuu.name}</div>
              <p className="text-sm text-[var(--color-primary)] font-medium">{c.nosotros.leadership.family_md_kunuu.role}</p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-[var(--color-warm-deep)]">
              <div className="font-display text-2xl font-bold">{c.nosotros.leadership.co_founder.name}</div>
              <p className="text-sm text-[var(--color-primary)] font-medium">{c.nosotros.leadership.co_founder.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-3">{c.nosotros.network.title}</h2>
          <p className="text-lg text-text-light leading-relaxed">{c.nosotros.network.lead}</p>
        </div>
      </section>

      <section id="auditoria" className="py-16 bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-6">{c.nosotros.auditoria.title}</h2>
          <dl className="grid sm:grid-cols-3 gap-4 mb-8">
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted mb-1">Auditor</dt>
              <dd className="text-base font-medium">{c.nosotros.auditoria.auditor}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted mb-1">Ubicación</dt>
              <dd className="text-base font-medium">{c.nosotros.auditoria.auditor_location}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-text-muted mb-1">Registro</dt>
              <dd className="text-base font-medium font-mono">{c.nosotros.auditoria.auditor_registration}</dd>
            </div>
          </dl>
          <h3 className="font-display text-lg font-bold mb-3">Informes públicos disponibles</h3>
          <ul className="space-y-2">
            {c.nosotros.auditoria.available_reports.map((r: string, i: number) => (
              <li key={i} className="bg-surface rounded-lg p-4 text-text-light border border-[var(--color-warm-deep)]">
                {r}
              </li>
            ))}
          </ul>
          <p className="text-sm text-text-muted mt-6">
            Informes disponibles en{" "}
            <a
              href="https://www.somosgay.org/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] underline"
            >
              somosgay.org/about
            </a>
            . Para contexto completo de auditoría, ver{" "}
            <a
              href="https://github.com/Ai-Whisperers/somosgay-context/tree/main/assets/financials"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] underline"
            >
              el repo de contexto
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}