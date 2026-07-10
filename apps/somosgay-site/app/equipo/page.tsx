import type { Metadata } from "next";
import Script from "next/script";
import { content as c, SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { TEAM } from "@/content/equipo";

export const metadata: Metadata = {
  title: "Equipo · SOMOSGAY",
  description:
    "Quiénes somos — los equipos de SOMOSGAY, Clínica Kunu'u, los programas comunitarios y la administración.",
  alternates: { canonical: `${SITE_URL}/equipo` },
  // Person JSON-LD on individual roles would be next step — for v1 we
  // emit one Organization schema that lists members as employees.
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Equipo" },
];

const AREA_COLORS: Record<string, string> = {
  Liderazgo: "bg-[var(--color-rainbow-2)] text-black",
  Clínica: "bg-[var(--color-primary)] text-white",
  Programas: "bg-[var(--color-rainbow-3)] text-black",
  Comunicaciones: "bg-[var(--color-rainbow-4)] text-white",
  Administración: "bg-warm text-text",
};

export default function EquipoPage() {
  // Group by area
  const byArea = TEAM.reduce<Record<string, typeof TEAM>>((acc, m) => {
    if (!acc[m.area]) acc[m.area] = [];
    acc[m.area].push(m);
    return acc;
  }, {});

  return (
    <div>
      <Script
        id="ld-breadcrumb-equipo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            Quiénes somos
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
            Nuestro equipo
          </h1>
          <p className="text-lg text-text-light max-w-3xl">
            SOMOSGAY está integrada por un equipo multidisciplinario de profesionales
            y voluntarios. Conocé a quienes ponen el cuerpo todos los días.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {Object.entries(byArea).map(([area, members]) => (
            <div key={area}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-display text-2xl lg:text-3xl font-bold">{area}</h2>
                <span
                  className={`text-xs uppercase tracking-wider px-2 py-1 rounded font-medium ${AREA_COLORS[area] || "bg-warm text-text"}`}
                >
                  {members.length}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {members.map((m, i) => (
                  <article
                    key={i}
                    className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 hover:border-[var(--color-primary)] transition-colors"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <div
                        className="w-12 h-12 rounded-full bg-warm-deep flex-shrink-0 flex items-center justify-center text-[var(--color-primary)] font-display font-bold text-lg"
                        aria-hidden="true"
                      >
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold leading-tight">{m.name}</h3>
                        <p className="text-sm text-[var(--color-primary)] font-medium mb-1">
                          {m.role}
                        </p>
                        <p className="text-xs text-text-muted">
                          En SOMOSGAY desde {m.since}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-text-light leading-relaxed">{m.bio}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-warm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Contactá al equipo</h2>
          <p className="text-text-light mb-8">
            Cada rol responde por un canal distinto. Elegí el más apropiado para tu
            consulta.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/595986173200"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#25D366] hover:bg-[#1DA851] text-white font-medium"
            >
              WhatsApp (general)
            </a>
            <a
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-warm-deep)] bg-surface text-text hover:bg-warm-deep"
            >
              Formulario de contacto
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
