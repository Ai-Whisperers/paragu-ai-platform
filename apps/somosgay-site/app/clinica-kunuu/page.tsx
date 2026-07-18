import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { content as c, SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { FaqAccordion } from "@/components/FaqAccordion";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Clínica Kunu'u — Salud comunitaria LGTBI+ en Asunción",
  description:
    "Primera clínica comunitaria dedicada a la salud LGTBI+ en Paraguay. Testeo gratuito de VIH, PrEP, sífilis y Hepatitis B. Atención psicológica y psiquiátrica confidencial. Sin documento de identidad.",
  alternates: { canonical: `${SITE_URL}/clinica-kunuu` },
};

const WA_BOOKING = `https://wa.me/${c.site.whatsappBase}?text=${encodeURIComponent(
  "Hola SOMOSGAY, quiero reservar un turno en Clínica Kunu'u."
)}`;

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Programas", href: "/programas" },
  { label: "Clínica Kunu'u" },
];

// FAQ data — verified against published SOMOSGAY materials in somosgay-context
const faq = [
  {
    q: "¿Cuánto cuesta el test de VIH en Clínica Kunu'u?",
    a: "El test rápido de VIH es completamente gratuito. No se requiere documento de identidad ni orden médica.",
  },
  {
    q: "¿Necesito turno para ir a la clínica?",
    a: "No es necesario turno para el testeo — la atención es por orden de llegada de lunes a viernes de 13:00 a 17:00. Para atención psicológica o psiquiátrica, recomendamos reservar por WhatsApp.",
  },
  {
    q: "¿Tienen que reportar mi información a algún registro?",
    a: "No. SOMOSGAY no comparte datos personales con ningún registro público ni entidad estatal. Toda la información es estrictamente confidencial.",
  },
  {
    q: "¿Qué es PrEP y cómo la consigo?",
    a: "PrEP (Profilaxis Pre-Exposición) es una pastilla diaria que reduce el riesgo de contraer VIH en 99%. Se consigue con consulta previa en Clínica Kunu'u — el tratamiento es gratuito.",
  },
  {
    q: "¿Puedo ir si no tengo documento paraguayo?",
    a: "Sí. Para el testeo de VIH no se requiere ningún documento de identidad. La atención es anónima y confidencial.",
  },
  {
    q: "¿La clínica atiende sábados?",
    a: "Los sábados de 10:00 a 15:00 funcionan como punto de retiro de autotest. Para otros servicios, atendemos lunes a viernes de 13:00 a 17:00.",
  },
  {
    q: "¿Brindan atención psicológica para personas trans?",
    a: "Sí. Contamos con atención psicológica y psiquiátrica con profesionales formados en diversidad sexual y de género. El espacio es afirmativo y libre de discriminación.",
  },
  {
    q: "¿Hacen pruebas de sífilis y hepatitis B?",
    a: "Sí. Testeo gratuito de sífilis y Hepatitis B, con derivación a tratamiento gratuito si da positivo.",
  },
];

// FAQPage JSON-LD — emitted in <head> via next/script for crawler ingestion
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ClinicaPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-clinica"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />
      <Script
        id="ld-faq-clinica"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">Programa</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4 tracking-tight">{c.clinica.title}</h1>
          <p className="text-xl text-text-light max-w-3xl mb-8">{c.clinica.subtitle}</p>
          <p className="text-base text-text-light max-w-3xl mb-8 leading-relaxed">{c.clinica.lead}</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href={WA_BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)]"
            >
              Reservar por WhatsApp
            </a>
            <a
              href={`tel:+${c.site.whatsappBase}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-warm-deep)] bg-warm text-text hover:bg-warm-deep"
            >
              {c.clinica.booking.whatsapp_cta.phone_display}
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md">
            <div className="bg-surface rounded-lg p-3 text-center border border-[var(--color-warm-deep)]">
              <div className="font-display text-2xl font-bold text-[var(--color-primary)]">99%</div>
              <div className="text-xs text-text-muted">eficacia PrEP</div>
            </div>
            <div className="bg-surface rounded-lg p-3 text-center border border-[var(--color-warm-deep)]">
              <div className="font-display text-2xl font-bold text-[var(--color-primary)]">Gratis</div>
              <div className="text-xs text-text-muted">para pacientes</div>
            </div>
            <div className="bg-surface rounded-lg p-3 text-center border border-[var(--color-warm-deep)]">
              <div className="font-display text-2xl font-bold text-[var(--color-primary)]">20min</div>
              <div className="text-xs text-text-muted">resultado VIH</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-12">Servicios</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.clinica.services.map((s, i) => (
              <div
                key={i}
                className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 hover:border-[var(--color-primary)] transition-colors"
              >
                <div className="text-xs uppercase tracking-wider text-[var(--color-primary)] mb-2 font-medium">
                  {s.category === "test" && "Testeo"}
                  {s.category === "prevention" && "Prevención"}
                  {s.category === "treatment" && "Tratamiento"}
                  {s.category === "mental" && "Salud mental"}
                  {s.category === "harm-reduction" && "Reducción de daños"}
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{s.name}</h3>
                <p className="text-sm text-text-light leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="py-16 bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">{c.clinica.schedule.title}</h2>
          <p className="text-sm text-text-muted mb-6">{c.clinica.schedule.note}</p>
          <div className="bg-surface rounded-xl border border-[var(--color-warm-deep)] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--color-warm-deep)]">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium">Día</th>
                  <th className="text-left px-4 py-3 text-sm font-medium">Horario</th>
                  <th className="text-left px-4 py-3 text-sm font-medium hidden sm:table-cell">Servicio</th>
                </tr>
              </thead>
              <tbody>
                {c.clinica.schedule.rows.map((row, i) => (
                  <tr key={i} className="border-t border-[var(--color-warm-deep)]">
                    <td className="px-4 py-3 text-sm font-medium">{row.day}</td>
                    <td className="px-4 py-3 text-sm text-[var(--color-primary)] font-mono">{row.hours}</td>
                    <td className="px-4 py-3 text-sm text-text-light hidden sm:table-cell">{row.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ — PrEP / clinic questions */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">Preguntas frecuentes</h2>
          <p className="text-text-light mb-8 max-w-2xl">
            Respuestas basadas en evidencia a las dudas más comunes sobre Clínica Kunu&apos;u.
            Si no encontrás lo que buscás, escribinos por WhatsApp.
          </p>
          <FaqAccordion items={faq} />
        </div>
      </section>

      {/* OPSEC / CONFIDENTIALITY */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-8">{c.clinica.opsec.title}</h2>
          <div className="bg-warm-deep rounded-xl p-8 border-l-4 border-[var(--color-primary)]">
            <ul className="space-y-3">
              {c.clinica.opsec.items.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-[var(--color-primary)] mt-1 flex-shrink-0" aria-hidden="true">
                    ●
                  </span>
                  <span className="text-text-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">O reservá por acá</h2>
          <p className="text-text-light mb-8">
            Si preferís no llamar, completá tus preferencias y te enviamos directo
            a WhatsApp con el mensaje listo para enviar.
          </p>
          <BookingForm />
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-20 bg-[var(--color-purple-deep)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3">{c.clinica.booking.title}</h2>
          <p className="text-white/80 mb-8">{c.clinica.booking.lead}</p>
          <a
            href={WA_BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white text-[var(--color-purple-deep)] font-medium hover:bg-warm"
          >
            {c.clinica.booking.whatsapp_cta.label}
          </a>
          <p className="text-sm text-white/60 mt-6">{c.clinica.booking.note}</p>
          <p className="text-xs text-white/40 mt-4">
            <Link href="/privacidad" className="hover:text-white underline">
              Política de privacidad
            </Link>
          </p>
        </div>
      </section>
    

      <ShareButtons
        title="Clínica Kunu'u — testeo gratuito de VIH, PrEP y atención LGTBI+ en Asunción"
        url={`${SITE_URL}/clinica-kunuu`}
        intro="Si te parece útil, compartilo — cada clic ayuda a que más personas conozcan los servicios."
      /></div>
  );
}