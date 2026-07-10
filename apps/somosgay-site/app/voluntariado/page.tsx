import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Voluntariado · SOMOSGAY",
  description:
    "Sumate como voluntario o voluntaria a SOMOSGAY. Habilidades en comunicación, salud, abogacía, traducción, diseño, programación, energía — toda ayuda suma.",
  alternates: { canonical: `${SITE_URL}/voluntariado` },
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Voluntariado" },
];

const ROLES = [
  {
    icon: "🗣️",
    name: "Comunicación y prensa",
    description: "Redacción de comunicados, contacto con periodistas, redes sociales, monitoreo de medios.",
    commit: "5-10 horas/semana",
  },
  {
    icon: "⚕️",
    name: "Apoyo clínico",
    description: "Acompañamiento a pacientes en Clínica Kunu'u, traducción entre paciente y profesional, registro.",
    commit: "4 horas/visita (martes-viernes)",
  },
  {
    icon: "⚖️",
    name: "Asesoría legal",
    description: "Casos de discriminación, derechos trans, articulación con Defensoría del Pueblo, Ministerio Público.",
    commit: "Pro-bono, on-demand",
  },
  {
    icon: "🌐",
    name: "Traducción",
    description: "Español → Guaraní / Inglés → Español / Guaraní → Español. Materiales educativos y materiales de prensa.",
    commit: "Flexible",
  },
  {
    icon: "🎨",
    name: "Diseño y producción",
    description: "Piezas para redes sociales, brochures, material para eventos.",
    commit: "Por proyecto",
  },
  {
    icon: "💻",
    name: "Tecnología",
    description: "Mantenimiento del sitio, herramientas internas, soporte a equipos.",
    commit: "2-5 horas/mes",
  },
];

export default function VoluntariadoPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-voluntariado"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            Voluntariado
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">
            Sumate como voluntario
          </h1>
          <p className="text-lg text-text-light leading-relaxed max-w-3xl">
            SOMOSGAY trabaja con voluntarios puntuales y continuos. Si tenés alguna
            de las habilidades que listamos más abajo, podemos encontrar un espacio
            donde sumar. Si tenés algo distinto en mente, escribinos.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {ROLES.map((r, i) => (
              <article
                key={i}
                className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6"
              >
                <div className="text-4xl mb-3" aria-hidden="true">{r.icon}</div>
                <h2 className="font-display text-lg font-bold mb-2">{r.name}</h2>
                <p className="text-sm text-text-light leading-relaxed mb-3">{r.description}</p>
                <p className="text-xs text-[var(--color-primary)] font-medium">{r.commit}</p>
              </article>
            ))}
          </div>

          <div className="bg-warm rounded-2xl p-8 text-center">
            <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4">
              Quiero ser voluntaria o voluntario
            </h2>
            <p className="text-text-light mb-6 max-w-xl mx-auto">
              Escribinos por WhatsApp con: tu nombre, la habilidad que querés sumar,
              y un día/horario para una breve llamada de 15 minutos. La confidencialidad
              importa — no compartas nada que no te haga sentir segurx.
            </p>
            <a
              href="https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20quiero%20ser%20voluntaria%2Fo."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)]"
            >
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
