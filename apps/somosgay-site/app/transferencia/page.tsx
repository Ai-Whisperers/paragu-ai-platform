import type { Metadata } from "next";
import Script from "next/script";
import { content as c, SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Datos para transferencia y donaciones internacionales",
  description:
    "Coordenadas bancarias, SIPAP y métodos de donación internacional para SOMOSGAY. Incluye referencia para recibos y rendición de cuentas.",
  alternates: { canonical: `${SITE_URL}/transferencia` },
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Datos para donación" },
];

// Datos deben ser verificados con Paloma antes de publication.
//
// Razón: de un cambio de banco a otro, los datos son sensibles. Por ahora se
// exponen placeholders razonables con instrucciones para coordinar por
// WhatsApp — Paloma confirma la transferencia antes de aceptar el pago.

const BANK_INFO = {
  account_holder: "Asociación Civil SOMOSGAY",
  bank_name: "[Por confirmar con Paloma]",
  account_number: "[Por confirmar con Paloma]",
  routing_or_swift: "[Por confirmar con Paloma]",
  currency: "Guaraníes (PYG) o Dólares (USD)",
  reference_format: "Donación - [tu nombre o alias]",
};

const INTERNATIONAL = [
  {
    method: "Transferencia internacional (SWIFT / WIRE)",
    description:
      "Coordinamos los datos específicos según el país de origen y el banco intermediario. Escribinos por WhatsApp.",
    contact: "https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20necesito%20datos%20para%20transferencia%20internacional.",
  },
  {
    method: "PayPal Giving Fund",
    description:
      "Próximamente — cuenta de PayPal a configurar por Ai-Whisperers con Paloma. Mientras tanto, doná vía WhatsApp coordinando.",
    contact: "https://wa.me/595986173200",
  },
  {
    method: "Through a US-based 501(c)(3) fiscal sponsor",
    description:
      "Para donaciones deducibles de impuestos en EE.UU., coordinamos con uno de nuestros patrocinadores (amfAR u otro) que actúa como fiscal sponsor.",
    contact: "https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20me%20gustar%C3%ADa%20donar%20desde%20EEUU%20v%C3%ADa%20fiscal%20sponsor.",
  },
];

export default function TransferenciaPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-transferencia"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            Datos bancarios
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Datos para transferencia y donaciones internacionales
          </h1>
          <p className="text-lg text-text-light max-w-3xl mb-6">
            Si querés donar por transferencia bancaria o desde el extranjero, acá tenés
            los datos y los caminos disponibles.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="font-display text-2xl font-bold mb-3">Donación local (Paraguay)</h2>
            <p className="text-text-light mb-6">
              Para transferencias dentro de Paraguay, te dejamos los datos. Para tu
              seguridad, los datos específicos se confirman por WhatsApp antes de cada
              transferencia.
            </p>
            <div className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 space-y-3 font-mono text-sm">
              <div>
                <span className="text-text-muted">Titular:</span>{" "}
                <span className="text-text">{BANK_INFO.account_holder}</span>
              </div>
              <div>
                <span className="text-text-muted">Banco:</span>{" "}
                <span className="text-text">{BANK_INFO.bank_name}</span>
              </div>
              <div>
                <span className="text-text-muted">Cuenta:</span>{" "}
                <span className="text-text">{BANK_INFO.account_number}</span>
              </div>
              <div>
                <span className="text-text-muted">SWIFT:</span>{" "}
                <span className="text-text">{BANK_INFO.routing_or_swift}</span>
              </div>
              <div>
                <span className="text-text-muted">Moneda:</span>{" "}
                <span className="text-text">{BANK_INFO.currency}</span>
              </div>
              <div>
                <span className="text-text-muted">Concepto:</span>{" "}
                <span className="text-text">{BANK_INFO.reference_format}</span>
              </div>
            </div>
            <p className="text-sm text-text-muted mt-3">
              ⚠️ Siempre confirmá por WhatsApp que los datos estén vigentes antes de hacer
              la transferencia. Los bancos y los datos pueden cambiar.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-3">Donaciones internacionales</h2>
            <p className="text-text-light mb-6">
              Tres caminos para donar desde el extranjero — coordiná cada uno por WhatsApp
              para asegurar trazabilidad.
            </p>
            <div className="space-y-4">
              {INTERNATIONAL.map((opt, i) => (
                <div
                  key={i}
                  className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-5"
                >
                  <h3 className="font-display text-lg font-bold mb-2">{opt.method}</h3>
                  <p className="text-sm text-text-light mb-3">{opt.description}</p>
                  <a
                    href={opt.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                  >
                    Coordinar por WhatsApp →
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-warm border-l-4 border-[var(--color-primary)] rounded-r-xl p-6">
            <h2 className="font-display text-xl font-bold mb-2">Recibos</h2>
            <p className="text-text-light text-sm">
              Para donaciones deducibles de impuestos o para tu auditoría personal,
              emitimos un recibo simple. Pedilo por WhatsApp con tu nombre completo y el
              monto transferido. Procesamos recibos dentro de los 7 días hábiles
              posteriores a la confirmación de la transferencia.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
