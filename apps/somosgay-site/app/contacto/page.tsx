import type { Metadata } from "next";
import { content as c, SITE_URL } from "@/lib/content";
import Script from "next/script";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cómo contactar a SOMOSGAY en Asunción, Paraguay. WhatsApp, email, redes sociales.",
  alternates: { canonical: `${SITE_URL}/contacto` },
};


const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Contacto" },
];
export default function ContactoPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-contacto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />
            <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        
        <Breadcrumbs items={crumbs} className="mb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" /><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">Estamos en Asunción</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">{c.contacto.title}</h1>
          <p className="text-xl text-text-light">{c.contacto.subtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Dirección</h2>
            <p className="text-lg text-text-light">{c.contacto.address}</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Contacto directo</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-warm rounded-xl p-6 border border-[var(--color-warm-deep)]">
                <h3 className="text-sm uppercase tracking-wider text-text-muted mb-2">WhatsApp</h3>
                <a
                  href={`https://wa.me/${c.site.whatsappBase}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-mono font-bold text-[var(--color-primary)] hover:underline"
                >
                  {c.contacto.phone}
                </a>
              </div>
              <div className="bg-warm rounded-xl p-6 border border-[var(--color-warm-deep)]">
                <h3 className="text-sm uppercase tracking-wider text-text-muted mb-2">Email</h3>
                <a
                  href={`mailto:${c.contacto.email}`}
                  className="text-xl font-mono font-bold text-[var(--color-primary)] hover:underline break-all"
                >
                  {c.contacto.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Horarios</h2>
            <dl className="space-y-3">
              <div className="flex justify-between items-baseline border-b border-[var(--color-warm-deep)] pb-2">
                <dt className="text-text-light">Clínica Kunu&apos;u</dt>
                <dd className="font-mono text-sm text-[var(--color-primary)]">{c.contacto.schedule_clinica}</dd>
              </div>
              <div className="flex justify-between items-baseline border-b border-[var(--color-warm-deep)] pb-2">
                <dt className="text-text-light">Oficina</dt>
                <dd className="font-mono text-sm text-[var(--color-primary)]">{c.contacto.schedule_office}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Redes sociales</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(c.contacto.social).map(([k, href]) => (
                <a
                  key={k}
                  href={href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-warm border border-[var(--color-warm-deep)] rounded-full text-sm text-text-light hover:bg-warm-deep capitalize"
                >
                  {k}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}