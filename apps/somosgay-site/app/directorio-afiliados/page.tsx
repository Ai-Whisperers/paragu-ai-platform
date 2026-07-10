import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { ALLY_ORGS } from "@/content/aliados-directorio";

export const metadata: Metadata = {
  title: "Directorio de aliados · SOMOSGAY",
  description:
    "Profesionales y empresas LGBT+ friendly en Asunción. Clínicas, psicología, asesoría legal, estética — negocios afirmativos verificados.",
  alternates: { canonical: `${SITE_URL}/directorio-afiliados` },
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Directorio de aliados" },
];

const CAT_ICONS: Record<string, string> = {
  Clinica: "⚕️",
  Psicologia: "🧠",
  Legal: "⚖️",
  Estetica: "✂️",
  Comida: "🍽️",
  Hospedaje: "🏨",
  Educacion: "🎓",
};

const CATEGORIES = ["Clinica", "Psicologia", "Legal", "Estetica", "Comida", "Hospedaje", "Educacion"];

export default function DirectorioPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-directorio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            Asunción · Paraguay
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">
            Directorio de aliados
          </h1>
          <p className="text-lg text-text-light leading-relaxed max-w-3xl">
            Profesionales, clínicas, peluquerías y bufetes que han confirmado su
            compromiso con el trato afirmativo de personas LGTBI+. Verificamos cada
            entrada con el equipo antes de publicarla.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {CATEGORIES.map((cat) => {
            const items = ALLY_ORGS.filter((o) => o.category === cat);
            if (items.length === 0) {
              return (
                <div key={cat} className="mb-10">
                  <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                    <span aria-hidden="true">{CAT_ICONS[cat]}</span>
                    {cat}
                  </h2>
                  <div className="bg-warm rounded-xl p-6 text-center text-text-muted text-sm">
                    Aún no tenemos aliados verificados en esta categoría.
                    <br />
                    <a href="/contacto" className="underline">Sumá tu negocio</a>.
                  </div>
                </div>
              );
            }
            return (
              <div key={cat} className="mb-10">
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                  <span aria-hidden="true">{CAT_ICONS[cat]}</span>
                  {cat}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((o, i) => (
                    <article
                      key={i}
                      className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-5"
                    >
                      <h3 className="font-display text-lg font-bold mb-2">{o.name}</h3>
                      <p className="text-sm text-text-light leading-relaxed mb-2">{o.notes}</p>
                      <p className="text-xs text-text-muted mb-1">📍 {o.address}</p>
                      {o.contact && (
                        <p className="text-xs text-[var(--color-primary)]">
                          {o.contact.includes("@") ? (
                            <a href={`mailto:${o.contact}`}>{o.contact}</a>
                          ) : (
                            <a href={`tel:${o.contact.replace(/\s/g, "")}`}>{o.contact}</a>
                          )}
                        </p>
                      )}
                      <p className="text-xs text-text-muted mt-2 italic">
                        ✓ Verificado por SOMOSGAY
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mt-16 bg-warm rounded-2xl p-8 text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              ¿Querés sumarte al directorio?
            </h2>
            <p className="text-text-light mb-6 max-w-xl mx-auto">
              Si tenés un negocio en Asunción y querés ser incluido como espacio
              LGBT+ friendly, escribinos. Verificamos la información por WhatsApp
              antes de publicar.
            </p>
            <a
              href="https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20quiero%20sumar%20mi%20negocio%20al%20directorio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)]"
            >
              Sumá tu negocio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
