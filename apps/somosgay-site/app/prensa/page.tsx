import type { Metadata } from "next";
import Script from "next/script";
import { content as c, SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kit de prensa · SOMOSGAY",
  description:
    "Recursos para periodistas y creadores de contenido. Logos, datos clave, fuentes, referencias y contactos verificados.",
  alternates: { canonical: `${SITE_URL}/prensa` },
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Kit de prensa" },
];

const KEY_FACTS = [
  { label: "Fundada en", value: "2005 (Asociación Civil)" },
  { label: "Primera Clínica LGTBI+", value: "2014 — Clínica Kunu'u, Asunción" },
  { label: "Memoria 108", value: "Septiembre 1959 — homenaje anual desde 2014" },
  { label: "Programas activos", value: "5 (Clínica + 4 comunitarios)" },
  { label: "Financiadores", value: "amfAR · UNAIDS · Global Fund · AHF" },
  { label: "Auditoría", value: "Account Control & Asociados (Registro 295/2020)" },
  { label: "Idioma oficial", value: "Español · materiales también en guaraní" },
  { label: "Operativos", value: "Paloma Vera (Coordinadora, +595 986 173 200)" },
];

export default function PrensaPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-prensa"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            Para periodistas
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
            Kit de prensa
          </h1>
          <p className="text-lg text-text-light max-w-3xl">
            Todo lo que necesitás para reportear sobre SOMOSGAY: datos verificados,
            contactos directos, y referencias para no reproducir errores comunes.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold mb-6">Datos clave</h2>
          <dl className="grid sm:grid-cols-2 gap-3 mb-12">
            {KEY_FACTS.map((f, i) => (
              <div key={i} className="bg-surface border border-[var(--color-warm-deep)] rounded-lg p-4">
                <dt className="text-xs uppercase tracking-wider text-text-muted font-medium mb-1">
                  {f.label}
                </dt>
                <dd className="text-text font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="font-display text-2xl font-bold mb-4">Notas para periodistas</h2>
          <div className="space-y-3 mb-12 text-text-light leading-relaxed">
            <p>
              <strong>¿Quiénes hablan?</strong> SOMOSGAY prefiere que la voz pública
              la lleve el Director Ejecutivo o Paloma Vera (Coordinadora Clínica). Para
              fuentes testimoniales, hablamos con la persona directamente para garantizar
              seguridad y voluntad.
            </p>
            <p>
              <strong>Privacidad de las fuentes</strong> nunca publicamos
              datos de salud individuales (resultados de testeos, expedientes) ni
              nombres reales sin consentimiento. Lo mismo aplica para menores y
              personas en situación vulnerable.
            </p>
            <p>
              <strong>Terminología</strong> preferida por la comunidad y la organización:
              "LGTBI+" (no LGBT, GLBT, LGBT+). Persona trans (no "travesti"). Hombre
              gay, mujer lesbiana, bisexual cuando aplica.
            </p>
            <p>
              <strong>Memoria 108</strong> no es "la historia de SOMOSGAY". Es un hecho
              anterior a la fundación de la organización; SOMOSGAY lo honra pero no
              lo inventó. La organización con más autoridad sobre Memoria 108 es AIREANA.
            </p>
            <p>
              <strong>Clínica Kunu'u</strong> no es "el hospital gay" — es una clínica
              comunitaria centrada en salud sexual y salud mental, abierta a la
              población general.
            </p>
            <p>
              <strong>PrEP</strong> no es una cura, no es una vacuna, no es "la droga
              gay". Es una pastilla preventiva. Explicación detallada en nuestra{" "}
              <a href="/noticias/guia-completa-prep-2026" className="text-[var(--color-primary)] underline">
                guía PrEP 2026
              </a>
              .
            </p>
          </div>

          <h2 className="font-display text-2xl font-bold mb-4">Recursos descargables</h2>
          <ul className="space-y-2 mb-12">
            {[
              { label: "SOMOSGAY logo PNG (alta resolución)", size: "0.4MB" },
              { label: "SOMOSGAY logo SVG (vector)", size: "0.01MB" },
              { label: "Foto portada principal", size: "1.2MB" },
              { label: "Dossier de prensa", size: "0.6MB · 6 páginas" },
            ].map((r, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="flex items-center justify-between bg-surface border border-[var(--color-warm-deep)] rounded-lg p-4 hover:border-[var(--color-primary)] transition-colors"
                >
                  <span className="font-medium text-text">{r.label}</span>
                  <span className="text-xs text-text-muted">{r.size} →</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="bg-warm rounded-xl p-6">
            <h2 className="font-display text-2xl font-bold mb-4">Contacto de prensa</h2>
            <p className="text-text-light mb-3">
              Para entrevistas, declaraciones o verificación de datos, escribinos por
              WhatsApp o email.
            </p>
            <div className="space-y-2">
              <a
                href="https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20soy%20periodista%20y%20me%20gustar%C3%ADa%20una%20entrevista."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#25D366] hover:bg-[#1DA851] text-white font-medium"
              >
                WhatsApp de prensa
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
