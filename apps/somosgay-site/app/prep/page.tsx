import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { content as c, SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Yo amo PrEP · Yo amo más seguro · SOMOSGAY",
  description:
    "Campaña oficial de SOMOSGAY para desestigmatizar la Profilaxis Pre-Exposición (PrEP) en Paraguay. Datos verificables, clínicas donde conseguirla, y testimonios.",
  alternates: { canonical: `${SITE_URL}/prep` },
  openGraph: {
    title: "Yo amo PrEP · Yo amo más seguro",
    description: "Pastilla diaria · 99% efectiva · Sin documento de identidad",
    type: "website",
    url: `${SITE_URL}/prep`,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Yo amo PrEP" },
];

const KEY_FACTS = [
  { value: "99%", label: "Eficaz en prevenir VIH", detail: "Cuando se toma diariamente" },
  { value: "1", label: "Pastilla al día", detail: "Sin horarios complicados" },
  { value: "0", label: "Documentos", detail: "Sin CIF ni orden médica" },
  { value: "0", label: "Costo", detail: "100% gratuito en Clínica Kunu'u" },
];

const FAQS = [
  {
    q: "¿PrEP es igual a la profilaxis post-exposición (PEP)?",
    a: "No. PEP se toma después de una exposición riesgosa (dentro de 72h). PrEP es diaria y preventiva. No tienen la misma indicación médica: si tuviste una exposición reciente, pedí PEP.",
  },
  {
    q: "¿PrEP tiene efectos secundarios?",
    a: "Los efectos secundarios típicos son náusea leve durante las primeras semanas. La consulta inicial los cubre. Si tenés riñón comprometido, se ajusta la receta.",
  },
  {
    q: "¿Sirve para mujeres trans?",
    a: "Sí. PrEP es efectiva en hombres gays, mujeres trans, y otras poblaciones vulnerables al VIH. Clínica Kunu'u ajusta la atención a la identidad de cada persona.",
  },
  {
    q: "¿PrEP protege contra otras ITS?",
    a: "No. Para sífilis, gonorrea y hepatitis C hay otras medidas: preservativo, testeo cada 3 meses, y PEP para exposiciones recientes.",
  },
];

export default function PrepHub() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-prep"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />
      <Script
        id="ld-faq-prep"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] mb-3 font-bold">
            CAMPAÑA · 2026
          </p>
          <h1 className="font-display text-4xl lg:text-7xl font-bold tracking-tight mb-4 rainbow-text">
            Yo amo PrEP
          </h1>
          <p className="text-2xl lg:text-3xl text-text mb-6 font-display font-bold">
            Yo amo más seguro
          </p>
          <p className="text-lg text-text-light leading-relaxed max-w-3xl mb-8">
            PrEP (Profilaxis Pre-Exposición) es una pastilla diaria que reduce el riesgo
            de VIH en 99%. Es gratuita en Clínica Kunu'u. Sin documento de identidad.
            Si vivís fuera de Asunción, coordinamos envío y consulta.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20quiero%20informaci%C3%B3n%20sobre%20PrEP."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)]"
            >
              Quiero PrEP
            </a>
            <Link
              href="/noticias/guia-completa-prep-2026"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-warm-deep)] bg-surface text-text hover:bg-warm"
            >
              Guía completa 2026 →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-center mb-3">
            4 datos verificables
          </h2>
          <p className="text-center text-text-light mb-10 max-w-2xl mx-auto">
            Estos datos están auditados en el Informe Anual 2020 de SOMOSGAY.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KEY_FACTS.map((f, i) => (
              <div key={i} className="bg-warm rounded-xl p-6 text-center">
                <div className="font-display text-5xl font-bold text-[var(--color-primary)] mb-2">
                  {f.value}
                </div>
                <div className="text-sm font-bold text-text mb-1">{f.label}</div>
                <div className="text-xs text-text-muted">{f.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-center mb-10">
            FAQ sobre PrEP
          </h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details
                key={i}
                className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-5 group"
              >
                <summary className="cursor-pointer text-text font-bold flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span className="text-[var(--color-primary)] text-2xl transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-text-light leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-purple-deep)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Tu primera consulta es 30 minutos. No requiere turno previo.
            Escribinos cuando puedas.
          </p>
          <a
            href="https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20quiero%20iniciar%20PrEP."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white text-[var(--color-purple-deep)] font-bold hover:bg-warm"
          >
            Agendar primera consulta
          </a>
        </div>
      </section>

      <ShareButtons
        title="Yo amo PrEP · Yo amo más seguro"
        url={`${SITE_URL}/prep`}
        intro="Si te parece útil, compartilo — cada clic ayuda a desestigmatizar la PrEP."
      />
    </div>
  );
}
