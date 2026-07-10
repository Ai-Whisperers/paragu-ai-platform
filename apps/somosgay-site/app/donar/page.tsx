import type { Metadata } from "next";
import { content as c, SITE_URL } from "@/lib/content";
import Script from "next/script";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Donar a SOMOSGAY",
  description:
    "Doná a SOMOSGAY y apoyá la salud comunitaria LGTBI+ en Paraguay. Cada aporte mantiene la Clínica Kunu'u gratuita y los programas comunitarios.",
  alternates: { canonical: `${SITE_URL}/donar` },
};


const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Donar" },
];
export default function DonarPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-donar"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />
      <Breadcrumbs items={crumbs} className="mb-4 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" />
      {/* HERO */}
      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            Apoyanos
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">{c.donar.title}</h1>
          <p className="text-xl text-text-light mb-6">{c.donar.subtitle}</p>
          <p className="text-base text-text-light leading-relaxed max-w-2xl">{c.donar.intro}</p>
        </div>
      </section>

      {/* OPTIONS */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {c.donar.options.map((opt: any) => (
              <a
                key={opt.id}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "block rounded-xl p-6 transition-all hover:shadow-lg",
                  opt.primary
                    ? "bg-primary text-white hover:bg-[var(--color-purple-deep)]"
                    : "bg-surface border border-[var(--color-warm-deep)] hover:border-[var(--color-primary)]",
                ].join(" ")}
              >
                <h3 className="font-display text-xl font-bold mb-3">{opt.name}</h3>
                <p className={opt.primary ? "text-white/90" : "text-text-light"}>{opt.description}</p>
                <div className={["mt-4 text-sm font-medium", opt.primary ? "text-white" : "text-[var(--color-primary)]"].join(" ")}>
                  Donar →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT EXPLANATION */}
      <section className="py-16 bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-8">{c.donar.impact_explanation.title}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.donar.impact_explanation.items.map((item: any, i: number) => (
              <div key={i} className="bg-surface rounded-xl p-6 border border-[var(--color-warm-deep)]">
                <div className="font-display text-3xl font-bold text-[var(--color-primary)] mb-2">{item.amount}</div>
                <p className="text-text-light">{item.impact}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-text-muted mt-6">{c.donar.impact_explanation.note}</p>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-6">{c.donar.transparency.title}</h2>
          <ul className="space-y-3">
            {c.donar.transparency.items.map((item: string, i: number) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-[var(--color-primary)] mt-1 flex-shrink-0" aria-hidden="true">●</span>
                <span className="text-text-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OTHER WAYS */}
      <section id="otras-formas" className="py-16 bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-8">{c.donar.other_ways.title}</h2>
          <div className="space-y-4">
            {c.donar.other_ways.items.map((item: any, i: number) => (
              <div key={i} className="bg-surface rounded-xl p-6 border border-[var(--color-warm-deep)]">
                <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-text-light mb-3">{item.description}</p>
                {item.cta && (
                  <a
                    href={item.cta.href}
                    className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                  >
                    {item.cta.label} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    

      <ShareButtons
        title="Doná a SOMOSGAY — apoya la salud comunitaria LGTBI+ en Paraguay"
        url={`${SITE_URL}/donar`}
        intro="Si te parece útil, compartilo — cada clic ayuda a que más personas conozcan los servicios."
      /></div>
  );
}