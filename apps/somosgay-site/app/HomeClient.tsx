import Link from "next/link";
import { getContent, type Locale } from "@/lib/content";

export default function HomeClient({ locale }: { locale: Locale }) {
  const c = getContent(locale);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-warm-deep overflow-hidden">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-4 font-medium">
              {c.home.hero.eyebrow}
            </p>
            <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-text mb-6">
              {c.home.hero.title}
              <span className="block rainbow-text text-4xl lg:text-5xl mt-2">{c.home.hero.subtitle}</span>
            </h1>
            <p className="text-lg lg:text-xl text-text-light leading-relaxed mb-8 max-w-2xl">
              {c.home.hero.lead}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {c.home.hero.ctas.map((cta: any) => (
                <a
                  key={cta.href}
                  href={cta.href}
                  target={cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={[
                    "inline-flex items-center justify-center px-6 py-3 rounded-md font-medium text-base transition-colors",
                    cta.style === "primary"
                      ? "bg-primary text-white hover:bg-[var(--color-purple-deep)]"
                      : "bg-warm text-text hover:bg-warm-deep border border-[var(--color-warm-deep)]",
                  ].join(" ")}
                >
                  {cta.label}
                </a>
              ))}
            </div>
            <div className="text-sm text-text-muted space-y-1">
              <div>{c.home.hero.founded}</div>
              <div>{c.home.hero.location}</div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-medium mb-3">
            {c.home.mission.eyebrow}
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mb-8">
            {c.home.mission.title}
          </h2>
          {c.home.mission.paragraphs.map((p: string, i: number) => (
            <p key={i} className="text-lg text-text-light leading-relaxed mb-6">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mb-3">
              {c.home.programs.title}
            </h2>
            <p className="text-text-light">{c.home.programs.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.home.programs.items.map((p: any) => (
              <Link
                key={p.id}
                href={locale === "gn" ? `/gn${p.href}` : p.href}
                className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-primary)] transition-all group"
              >
                <div className="w-10 h-1 rainbow-gradient rounded-full mb-4" aria-hidden="true" />
                <h3 className="font-display text-xl font-bold mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-[var(--color-primary)] font-medium mb-3">{p.tagline}</p>
                <p className="text-sm text-text-light leading-relaxed">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Verificado</p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mb-3">
              {c.home.impact.title}
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">{c.home.impact.subtitle}</p>
            {/* Audit-stamp row — "Account Control · Registro 295/2020" — small badge-style */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-surface border border-[var(--color-warm-deep)] rounded-full">
              <span aria-hidden="true" className="text-[var(--color-success)] text-base">✓</span>
              <span className="text-xs font-medium text-text">
                Auditado por Account Control & Asociados · Registro 295/2020
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.home.impact.items.map((item: any, i: number) => (
              <div key={i} className="text-center p-6 bg-warm rounded-xl">
                <div className="font-display text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-2">
                  {item.value}
                </div>
                <div className="text-sm text-text-light mb-1">{item.label}</div>
                <div className="text-xs text-text-muted">{item.detail}</div>
              </div>
            ))}
          </div>

          <p className="text-sm text-text-muted text-center mt-6 max-w-2xl mx-auto">
            {c.home.impact.note}
          </p>
        </div>
      </section>

      {/* FUNDERS */}
      <section className="py-16 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-6 font-medium">
            {c.home.funders.title}
          </p>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {c.home.funders.items.map((f: string) => (
              <span
                key={f}
                className="text-sm font-medium px-4 py-2 bg-surface rounded-full border border-[var(--color-warm-deep)] text-text-light"
              >
                {f}
              </span>
            ))}
          </div>
          <p className="text-xs text-text-muted mt-6 max-w-2xl mx-auto">{c.home.funders.note}</p>
        </div>
      </section>

      {/* CTA DONATE */}
      <section className="py-20 lg:py-24 bg-[var(--color-purple-deep)] text-white relative overflow-hidden">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4">{c.home.cta.title}</h2>
          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">{c.home.cta.lead}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={locale === "gn" ? `/gn${c.home.cta.primary_cta.href}` : c.home.cta.primary_cta.href}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-[var(--color-purple-deep)] font-medium hover:bg-warm"
            >
              {c.home.cta.primary_cta.label}
            </Link>
            <Link
              href={locale === "gn" ? `/gn${c.home.cta.secondary_cta.href}` : c.home.cta.secondary_cta.href}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-white/30 text-white font-medium hover:bg-white/10"
            >
              {c.home.cta.secondary_cta.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
