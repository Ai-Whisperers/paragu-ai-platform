import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cuidado y seguridad · SOMOSGAY",
  description:
    "Si te sentís en peligro o necesitás ayuda urgente, esta página tiene los pasos concretos para resguardarte. Información sobre qué hacer, a quién llamar, y cómo ocultar tu rastro digital.",
  alternates: { canonical: `${SITE_URL}/cuidado` },
  robots: { index: false, follow: false }, // safety page not for indexing
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Cuidado y seguridad" },
];

const ESC_HINT = "💡 Tip: presioná ESC en cualquier momento para salir de este sitio instantáneamente.";

export default function CuidadoPage() {
  return (
    <div>
      <Script
        id="ld-breadcrumb-cuidado"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />

      <section className="bg-[var(--color-purple-deep)] text-white relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Breadcrumbs items={crumbs} className="mb-6 [&_*]:text-white/80" />
          <p className="text-xs uppercase tracking-[0.22em] text-white/70 mb-3 font-medium">
            Cuidado personal
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Si te sentís en peligro
          </h1>
          <p className="text-lg text-white/90 leading-relaxed mb-6">
            Esta página tiene pasos concretos para resguardarte. No se indexa en Google.
            Si alguien llegó aquí por casualidad, no hay nada que indique que viniste
            a vernos.
          </p>
          <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-sm">
            {ESC_HINT}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Lo primero: tu seguridad</h2>
            <ol className="space-y-3 list-decimal pl-5">
              <li className="text-text-light leading-relaxed">
                <strong>Pulsá el botón &ldquo;Salir&rdquo; arriba a la derecha</strong> o la tecla{" "}
                <kbd className="px-1.5 py-0.5 bg-warm border border-[var(--color-warm-deep)] rounded text-xs font-mono">ESC</kbd>
                . Esto cierra este sitio y abre Google en su lugar.
              </li>
              <li className="text-text-light leading-relaxed">
                Si no podés salir ahora mismo: dejá la página abierta en otra pestaña
                sin interactuar.
              </li>
              <li className="text-text-light leading-relaxed">
                Si estás en peligro inminente, llamá al{" "}
                <a href="tel:911" className="text-[var(--color-primary)] underline font-bold">
                  911
                </a>{" "}
                (emergencias Paraguay) o contactá a una persona de confianza.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Líneas de ayuda en Paraguay</h2>
            <div className="space-y-3">
              <div className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-5">
                <div className="font-bold mb-1">SOMOSGAY · WhatsApp directo</div>
                <div className="text-sm text-text-light mb-2">
                  Lunes a viernes, 13:00 – 17:00. Fuera de horario, escribinos y respondemos al día siguiente.
                </div>
                <a
                  href="https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20necesito%20ayuda%20urgente."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-primary)] underline"
                >
                  +595 986 173 200
                </a>
              </div>
              <div className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-5">
                <div className="font-bold mb-1">Defensoría del Pueblo · Línea Diversidad</div>
                <div className="text-sm text-text-light mb-2">
                  Atención a personas LGTBI+ que sufran discriminación o violencia.
                </div>
                <a href="tel:+595214156000" className="text-sm text-[var(--color-primary)] underline">
                  (021) 415-6000
                </a>
              </div>
              <div className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-5">
                <div className="font-bold mb-1">PANambi · Centro de Denuncias</div>
                <div className="text-sm text-text-light mb-2">
                  Apoyo a personas trans y LGBTTT en situación de violencia.
                </div>
                <a
                  href="https://www.instagram.com/panambipy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-primary)] underline"
                >
                  @panambipy
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">
              Pasos si crees que tu dispositivo está siendo vigilado
            </h2>
            <ul className="space-y-3">
              <li className="text-text-light leading-relaxed">
                <strong>Usá un dispositivo &ldquo;limpio&rdquo;</strong> para conversaciones sensibles:
                la computadora de un amigo, un cybercafé, una biblioteca, o un café con WiFi.
              </li>
              <li className="text-text-light leading-relaxed">
                <strong>Borrá el historial</strong> después de visitarnos. Usá modo
                incógnito/privado para que no quede registro.
              </li>
              <li className="text-text-light leading-relaxed">
                <strong>Cambiá tu número</strong> si recibís llamadas amenazantes vinculadas a tu contacto.
              </li>
              <li className="text-text-light leading-relaxed">
                <strong>No abras mensajes sospechosos</strong> con tu nombre del que no reconocés
                el remitente.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4">
              Cómo cuidamos tu información cuando nos contactás
            </h2>
            <p className="text-text-light leading-relaxed mb-3">
              En SOMOSGAY:
            </p>
            <ul className="space-y-3">
              <li className="text-text-light leading-relaxed">
                Nunca compartimos tu información personal con nadie — ni gobierno, ni
                medios, ni otras organizaciones.
              </li>
              <li className="text-text-light leading-relaxed">
                Clínica Kunu&apos;u no pide documento de identidad y no reporta pruebas de
                VIH a ningún registro público.
              </li>
              <li className="text-text-light leading-relaxed">
                Esta página tiene <code className="bg-warm px-1 rounded">noindex, nofollow</code>
                : los buscadores no la indexan, así que nadie llega aquí por Google.
              </li>
              <li className="text-text-light leading-relaxed">
                Nuestro servidor tiene HTTPS forzado, cabeceras de seguridad estrictas y
                no usamos cookies de rastreo.
              </li>
            </ul>
          </div>

          <div className="bg-warm border-l-4 border-[var(--color-primary)] rounded-r-xl p-6">
            <p className="text-text leading-relaxed">
              <strong>Recordá:</strong> no estás sola/o. Somos una organización de 20 años
              en Paraguay y seguimos siendo un espacio seguro para la comunidad LGTBI+.
              Si llegaste hasta acá, ya diste el paso más importante: buscar ayuda.{" "}
              <a
                href={`https://wa.me/595986173200?text=Hola%20SOMOSGAY%2C%20necesito%20hablar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] underline"
              >
                Escribinos cuando puedas
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
