import type { Metadata } from "next";
import Script from "next/script";
import { content as c, SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Quiero ayudar sin donar · SOMOSGAY",
  description:
    "Otras formas de apoyar a SOMOSGAY además de donar: voluntariado, difundir, incidencia política, prensa, donaciones en especie.",
  alternates: { canonical: `${SITE_URL}/ayudar` },
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Quiero ayudar" },
];

const WAYS = [
  {
    icon: "📢",
    title: "Difundí",
    description:
      "Compartí nuestro Instagram, Facebook o WhatsApp con alguien que pueda necesitarnos. Cada vez que alguien conoce SOMOSGAY a través tuyo, esa persona tiene un lugar a donde ir en caso de emergencia.",
    cta: { label: "Ver noticias para compartir", href: "/noticias" },
  },
  {
    icon: "🤝",
    title: "Voluntariado",
    description:
      "SOMOSGAY trabaja con voluntarios/as puntuales y continuos. Si tenés habilidades en comunicación, salud, abogacía, traducción, diseño, programación, o simplemente energía, podemos encontrar un espacio.",
    cta: {
      label: "Inscribirme como voluntario",
      href: "https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20me%20interesa%20el%20voluntariado.",
    },
  },
  {
    icon: "🏛️",
    title: "Incidencia política",
    description:
      "Sumate a campañas de incidencia: ley integral trans, protocolos de salud diversa en el sistema público, presupuesto para la diversidad. Cada llamado al Congreso y al Ministerio de Salud suma.",
    cta: { label: "Ver campañas activas", href: "/memoria-108" },
  },
  {
    icon: "📰",
    title: "Hacé prensa",
    description:
      "Si sos periodista, documentalista o creador/a de contenido, tenemos material disponible, fuentes accesibles y un kit de prensa listo para descargar.",
    cta: { label: "Kit de prensa", href: "/prensa" },
  },
  {
    icon: "🛒",
    title: "Donación en especie",
    description:
      "Aceptamos donación de útiles de oficina, equipos tecnológicos, alimentos no perecederos, ropa interior nueva, libros para la biblioteca del Tekoharã. Consultá qué se necesita y cómo traerlo.",
    cta: {
      label: "Coordinar entrega",
      href: "https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20quiero%20donar%20en%20especie.",
    },
  },
  {
    icon: "📚",
    title: "Educá a tu entorno",
    description:
      "Compartí información verificada sobre PrEP, Memoria 108, los derechos LGTBI+ en Paraguay. Tu familia, tus compañeros de trabajo, tu comunidad — todos podemos sumar.",
    cta: { label: "Recursos para compartir", href: "/noticias" },
  },
];

export default function AyudarPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-ayudar"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            Maneras de apoyar
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
            Quiero ayudar sin donar
          </h1>
          <p className="text-lg text-text-light max-w-3xl">
            No todo el mundo puede donar dinero, y está bien. Hay otras formas — igual de valiosas — en las que podés sumar a SOMOSGAY.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WAYS.map((w, i) => (
              <article
                key={i}
                className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 flex flex-col"
              >
                <div className="text-4xl mb-3" aria-hidden="true">
                  {w.icon}
                </div>
                <h2 className="font-display text-xl font-bold mb-2">{w.title}</h2>
                <p className="text-sm text-text-light leading-relaxed mb-4 flex-1">
                  {w.description}
                </p>
                <a
                  href={w.cta.href}
                  target={w.cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={w.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                >
                  {w.cta.label} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            ¿Tenés algo distinto en mente?
          </h2>
          <p className="text-text-light mb-8">
            Si pensás que tenés algo para ofrecer y no está en esta lista, escribinos.
            Toda ayuda es bienvenida mientras no comprometa la confidencialidad de la comunidad.
          </p>
          <a
            href="https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20tengo%20una%20pregunta%20sobre%20c%C3%B3mo%20ayudar."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#25D366] hover:bg-[#1DA851] text-white font-medium"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
