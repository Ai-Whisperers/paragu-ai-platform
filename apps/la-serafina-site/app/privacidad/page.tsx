import type { Metadata } from "next";
import Link from "next/link";
import { content as c, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo manejamos tu información personal en laserafina.paragu-ai.com (demo interno).",
  alternates: { canonical: `${SITE_URL}/privacidad` },
};

export default function PrivacidadPage() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-text-muted mb-4">
          <Link href="/" className="hover:text-[var(--color-primary)]">
            Inicio
          </Link>{" "}
          / Política de privacidad
        </nav>

        <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6">
          Política de privacidad
        </h1>
        <p className="text-sm text-text-muted mb-8">
          Última actualización: 2026-07-11
        </p>

        <div className="prose prose-lg max-w-none text-text-light space-y-6">
          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">
              1. Nuestro compromiso
            </h2>
            <p>
              La Serafina — Espacio Cultural Feminista — se compromete a
              proteger la privacidad y confidencialidad de quienes visitan
              este sitio, especialmente considerando que servimos a una
              comunidad en un contexto político sensible. Este documento
              explica qué información recopilamos y cómo la manejamos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">
              2. Datos que NO recopilamos
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Direcciones IP completas (usamos Plausible Analytics).</li>
              <li>Cookies publicitarias.</li>
              <li>Datos personales identificables sin tu consentimiento explícito.</li>
              <li>Información de geolocalización precisa.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">
              3. Lo que SÍ usamos
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Plausible Analytics</strong>: agregados, sin cookies,
                no comparte datos con terceros.
              </li>
              <li>
                <strong>Formulario de contacto (futuro)</strong>: cifrado
                HTTPS, derivación a WhatsApp/email.
              </li>
              <li>
                <strong>Donaciones</strong>: a través de Mama Cash o Astraea
                (nunca manejamos dinero directo).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">
              4. No usamos
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Google Analytics</li>
              <li>Google Fonts (comparten IPs con Google)</li>
              <li>Google Maps (comparten IPs con Google)</li>
              <li>Facebook Pixel</li>
              <li>reCAPTCHA</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">
              5. Tus derechos
            </h2>
            <p>
              Bajo la Ley 6534/2020 de Protección de Datos Personales de
              Paraguay, tenés derecho a:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Solicitar acceso a cualquier dato que tengamos sobre vos.</li>
              <li>Pedir rectificación o eliminación.</li>
              <li>Oposición al procesamiento.</li>
              <li>Portabilidad de datos.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">
              6. Contacto
            </h2>
            <p>
              Para consultas de privacidad:{" "}
              <a
                href="mailto:aireana@aireana.org.py"
                className="text-[var(--color-primary)] underline"
              >
                aireana@aireana.org.py
              </a>
              . Responderemos en un plazo máximo de 30 días.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text mb-3">
              7. Nota de demo
            </h2>
            <p className="text-sm text-text-muted">
              Este sitio es una demo interna de portfolio construida sobre
              paragu-ai-platform. No está afiliada oficialmente a AIREANA ni
              a La Serafina. El contenido refleja investigación pública del
              repositorio{" "}
              <code className="text-xs bg-warm-deep px-1.5 py-0.5 rounded">
                Ai-Whisperers/la-serafina-context
              </code>
              .
            </p>
            <p className="text-sm text-text-muted mt-3">
              Sitio canónico real (no afiliado):{" "}
              <a
                href="https://www.aireana.org.py/la-serafina/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                aireana.org.py/la-serafina
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
