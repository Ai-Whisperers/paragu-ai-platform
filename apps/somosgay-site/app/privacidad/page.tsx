import type { Metadata } from "next";
import Link from "next/link";
import { content as c, SITE_URL } from "@/lib/content";
import Script from "next/script";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo manejamos tu información personal en somosgay.paragu-ai.com.",
  alternates: { canonical: `${SITE_URL}/privacidad` },
};


const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Política de privacidad" },
];
export default function PrivacidadPage() {
  return (
    <div className="py-16">
      <Script
        id="ld-breadcrumb-privacidad"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={crumbs} className="mb-4" />
        <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6">Política de privacidad</h1>
        <p className="text-sm text-text-muted mb-8">Última actualización: 2026-07-10</p>

        <div className="prose prose-lg max-w-none text-text-light space-y-6">
          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">1. Nuestro compromiso</h2>
            <p>
              SOMOSGAY se compromete a proteger la privacidad y confidencialidad de quienes visitan este
              sitio, especialmente considerando que servimos a una comunidad en un contexto político
              hostil. Este documento explica qué información recopilamos y cómo la manejamos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">2. Lo que NO hacemos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>No usamos cookies de rastreo ni de terceros.</li>
              <li>No usamos Google Analytics, Meta Pixel, ni herramientas similares.</li>
              <li>No vendemos, compartimos ni transferimos información personal.</li>
              <li>No registramos IPs más allá de lo necesario para servir el sitio (logs del servidor).</li>
              <li>No usamos remarketing ni publicidades conductuales.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">3. Lo que sí recopilamos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Logs del servidor</strong>: dirección IP, user-agent, ruta solicitada. Retención:
                7 días. Propósito: seguridad y debugging.
              </li>
              <li>
                <strong>Preferencia de cookies (local)</strong>: cuando aceptás el banner, guardamos
                esa preferencia en tu navegador. No la enviamos a ningún servidor.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">4. Datos clínicos</h2>
            <p>
              Toda la información clínica es manejada directamente por SOMOSGAY en su sede física
              (Independencia Nacional 1032, Asunción) y no pasa por este sitio web. Este sitio solo
              facilita el contacto (WhatsApp, email, redes sociales) — los datos clínicos nunca son
              almacenados ni transmitidos a través de somosgay.paragu-ai.com.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">5. Donaciones</h2>
            <p>
              Las donaciones se procesan a través de terceros (GlobalGiving, All Out, transferencias
              bancarias). Cada uno tiene su propia política de privacidad. Te recomendamos leerla
              antes de donar.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">6. Hosting</h2>
            <p>
              Este sitio está alojado en infraestructura gestionada por Ai-Whisperers. Por la
              naturaleza de Paraguay como contexto político sensible, hemos tomado medidas
              adicionales:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cabeceras de seguridad estrictas (CSP, HSTS, X-Frame-Options).</li>
              <li>Sin almacenamiento de datos de visitantes más allá de logs efímeros.</li>
              <li>Cumplimos con US CLOUD Act en cuanto a manejo de datos que pasen por US.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">7. Tus derechos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Podés contactarnos en cualquier momento para preguntar sobre tus datos.</li>
              <li>No almacenamos datos personales identificables, así que la mayoría de solicitudes GDPR/LGPD no aplican.</li>
              <li>Si tenés preocupaciones de seguridad, escribinos a <a href="mailto:hola@somosgay.org" className="text-[var(--color-primary)] underline">hola@somosgay.org</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">8. Cambios</h2>
            <p>
              Si modificamos esta política, lo indicaremos cambiando la fecha de "última actualización"
              al inicio. Para cambios materiales, agregaremos una nota en la página principal.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">9. Contacto</h2>
            <p>
              Para preguntas sobre privacidad:{" "}
              <a href="mailto:hola@somosgay.org" className="text-[var(--color-primary)] underline">
                hola@somosgay.org
              </a>
              . Ver también nuestra{" "}
              <Link href="/contacto" className="text-[var(--color-primary)] underline">
                página de contacto
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}