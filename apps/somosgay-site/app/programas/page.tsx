import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { content as c, SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Programas",
  description: "5 programas activos + red regional: Clínica Kunu'u, Tekoharã, Ñande Rekorã, Karu Porã, Programa Kunu'u.",
  alternates: { canonical: `${SITE_URL}/programas` },
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Programas" },
];

// Service JSON-LD — one Service per program + MedicalService for Clínica Kunu'u.
// Provides Google rich results for "SOMOSGAY services" + knowledge graph links.
const servicesJsonLd = [
  ...c.programas.items.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/programas/${p.id}/#service`,
    name: p.name,
    serviceType: p.tagline,
    description: p.description ?? p.tagline,
    url: `${SITE_URL}/programas/${p.id}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Paraguay" },
  })),
  {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    "@id": `${SITE_URL}/clinica-kunuu/#medical`,
    name: "Clínica Kunu'u",
    serviceType: "Salud comunitaria LGTBI+",
    description:
      "Testeo gratuito de VIH, PrEP, sífilis y Hepatitis B. Atención psicológica y psiquiátrica. Reducción de daños.",
    url: `${SITE_URL}/clinica-kunuu`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Paraguay" },
    isAccessibleForFree: true,
  },
];

const colorToVar: Record<string, string> = {
  purple: "var(--color-purple)",
  teal: "var(--color-teal)",
  rainbow2: "var(--color-rainbow-2)",
  rainbow3: "var(--color-rainbow-3)",
  rainbow4: "var(--color-rainbow-4)",
};

export default function ProgramasPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-programas"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />
      <Script
        id="ld-services-somosgay"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <Breadcrumbs items={crumbs} className="mb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            {c.programas.subtitle}
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">
            {c.programas.title}
          </h1>
          <p className="text-lg text-text-light max-w-3xl">{c.programas.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {c.programas.items.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className={[
                "block bg-surface border rounded-xl p-8 hover:shadow-lg transition-all group",
                p.flagship ? "border-[var(--color-primary)] border-2" : "border-[var(--color-warm-deep)]",
              ].join(" ")}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-2 h-16 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colorToVar[p.color] }}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="font-display text-2xl font-bold group-hover:text-[var(--color-primary)] transition-colors">
                      {p.name}
                    </h2>
                    {p.flagship && (
                      <span className="text-xs uppercase tracking-wider bg-[var(--color-primary)] text-white px-2 py-1 rounded">
                        Emblemático
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-primary)] font-medium mb-3">{p.tagline}</p>
                  <p className="text-text-light leading-relaxed">{p.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    

      <ShareButtons
        title="5 programas activos + red regional · SOMOSGAY"
        url={`${SITE_URL}/programas`}
        intro="Si te parece útil, compartilo — cada clic ayuda a que más personas conozcan los servicios."
      /></div>
  );
}