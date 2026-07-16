import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { TESTIMONIOS } from "@/content/testimonios";

export const metadata: Metadata = {
  title: "Testimonios de la comunidad · SOMOSGAY",
  description:
    "Voces de la comunidad LGTBI+ en Paraguay: personas que han pasado por Clínica Kunu'u, los programas comunitarios, o el acto de Memoria 108.",
  alternates: { canonical: `${SITE_URL}/testimonios` },
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Testimonios" },
];

const SCOPE_COLORS: Record<string, string> = {
  Clinica: "bg-[var(--color-primary)] text-white",
  "Programa Kunuu": "bg-[var(--color-rainbow-3)] text-black",
  "Memoria 108": "bg-[var(--color-purple-deep)] text-white",
  "Centro Tekohara": "bg-[var(--color-rainbow-4)] text-white",
};

export default function TestimoniosPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-testimonios"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            Voces de la comunidad
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
            Testimonios
          </h1>
          <p className="text-lg text-text-light max-w-3xl mb-4">
            Cuatro voces de personas que pasaron por Clínica Kunu'u, los programas comunitarios
            o el acto de Memoria 108. Identidades anonimizadas; los textos se publican con
            consentimiento.
          </p>
          <p className="text-sm text-text-muted leading-relaxed bg-warm p-4 rounded-xl">
            Si querés compartir tu historia con SOMOSGAY, escribinos por WhatsApp.
            Las entrevistas se hacen en persona o por mensaje, según te resulte más
            seguro. El equipo editorial edita por privacidad, no por contenido.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {TESTIMONIOS.map((t, i) => (
            <article
              key={t.id}
              className="bg-surface border border-[var(--color-warm-deep)] rounded-2xl p-6 lg:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full bg-warm-deep flex items-center justify-center text-2xl font-display font-bold text-[var(--color-primary)] flex-shrink-0"
                  aria-hidden="true"
                >
                  “
                </div>
                <div>
                  <span
                    className={`text-xs uppercase tracking-wider px-2 py-0.5 rounded font-medium ${SCOPE_COLORS[t.scope] || "bg-warm text-text"}`}
                  >
                    {t.scope}
                  </span>
                  <p className="text-xs text-text-muted mt-1 italic">{t.hint}</p>
                </div>
              </div>
              <blockquote className="text-text-light leading-relaxed italic mb-4 text-lg">
                {t.body}
              </blockquote>
              <p className="text-sm font-medium text-text italic border-l-2 border-[var(--color-primary)] pl-3">
                {t.excerpt}
              </p>
              <p className="text-xs text-text-muted mt-3">
                — {t.hint} · {t.scope}
              </p>
            </article>
          ))}

          <div className="text-center pt-8">
            <a
              href="https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20quiero%20compartir%20mi%20testimonio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)]"
            >
              Compartir tu historia
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
