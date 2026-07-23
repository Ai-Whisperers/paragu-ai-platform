"use client";

import Link from "next/link";
import content from "@/content/es.json";
import type { SiteContent } from "@/lib/content-types";
import { DividerOrnament } from "@/components/ornaments";

const c = content as SiteContent;

export default function PrivacidadPage() {
  return (
    <div className="pt-24 md:pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <p className="eyebrow mb-2">{c.contacto?.whatsappDisplay || "WhatsApp"}</p>
          <h1 className="mb-3 text-balance">Política de Privacidad</h1>
          <p className="text-[var(--color-muted-foreground)] text-[0.92rem]">
            Última actualización: {new Date().toLocaleDateString("es-PY", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <DividerOrnament className="my-8" />

        <article className="prose-section space-y-7 text-[var(--color-foreground)]/90 text-[0.95rem] md:text-[1rem] leading-relaxed">
          <section>
            <h2 className="text-[1.3rem] mb-3">1. Datos que recopilamos</h2>
            <p>
              Pierce Charm ({c.businessName}) es un estudio de piercings con local comercial en Asunción, Paraguay. Para coordinar citas, procesar pagos y
              garantizar la trazabilidad de cada procedimiento, tratamos los siguientes datos personales:
            </p>
            <ul className="list-none space-y-1.5 pl-5 mt-3">
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                <strong>Identificación:</strong> nombre completo, documento de identidad (para consentimiento informado y trazabilidad legal).
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                <strong>Contacto:</strong> número de WhatsApp, email opcional.
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                <strong>Salud:</strong> alergias conocidas, medicación, condiciones dermatológicas — únicamente lo necesario para la seguridad del procedimiento.
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                <strong>Historial de servicios:</strong> fecha, tipo de piercing, joyería utilizada, notas del piercer.
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                <strong>Imágenes:</strong> fotos del piercing finalizado, solo si el cliente firma consentimiento expreso de uso.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">2. Finalidad del tratamiento</h2>
            <p>Los datos se utilizan exclusivamente para:</p>
            <ul className="list-none space-y-1.5 pl-5 mt-3">
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                Agendar y ejecutar el servicio de perforación y venta de joyería.
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                Seguimiento post-piercing para garantizar cicatrización correcta.
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                Cumplimiento de obligaciones legales y contables (Ley 125/91 y normas tributarias de Paraguay).
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                Marketing directo (Instagram, email) solo si diste consentimiento explícito. Podés retirarlo cuando quieras.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">3. Base legal</h2>
            <p>
              Cumplimos con la Ley 6534/2020 de Protección de Datos Personales y la Ley 1682/01 que regula la información de carácter personal en Paraguay.
              La base legal para el tratamiento es la ejecución del contrato de servicio y el consentimiento expreso del titular para finalidades
              secundarias (marketing, fotos con fines de portfolio).
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">4. Conservación de los datos</h2>
            <p>
              Mantenemos los datos mientras exista relación comercial activa y, una vez finalizada, durante el plazo legal aplicable (10 años para registros
              contables según la legislación paraguaya). Las fotos con consentimiento para portfolio se conservan mientras el cliente no retire el
              consentimiento.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">5. Compartimos datos con terceros?</h2>
            <p>
              No vendemos ni compartimos datos personales con terceros, salvo:
            </p>
            <ul className="list-none space-y-1.5 pl-5 mt-3">
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                Derivación médica (dermatólogo) si surge una complicación, con tu autorización.
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                Obligaciones legales o requerimientos de autoridad competente.
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                Proveedores de tecnología (hosting, email) que cumplen estándares de protección adecuados.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">6. Tus derechos (ARCO)</h2>
            <p>Como titular de los datos, tenés derecho a:</p>
            <ul className="list-none space-y-1.5 pl-5 mt-3">
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                <strong>Acceso:</strong> saber qué datos tuyos tenemos y para qué los usamos.
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                <strong>Rectificación:</strong> corregir datos inexactos.
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                <strong>Cancelación:</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios.
              </li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">
                <strong>Oposición:</strong> oponerte al tratamiento de tus datos para marketing directo.
              </li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, escribinos a <a href={`mailto:${c.contacto?.email}`} className="text-[var(--color-primary-light)] underline">{c.contacto?.email}</a> o
              escribinos por WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">7. Cookies y analíticas</h2>
            <p>
              Este sitio web utiliza Google Fonts (Cinzel, Tangerine, Inter) que pueden establecer cookies de sesión en algunos navegadores. No usamos
              analytics ni cookies de seguimiento publicitario. Tu visita es privada.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">8. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta política para reflejar cambios legales o mejoras operativas. Indicaremos la fecha de última revisión en la parte
              superior de este documento.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">9. Contacto del responsable</h2>
            <p>
              <strong>{c.businessName}</strong><br />
              Asunción, Paraguay<br />
              WhatsApp: <a href={`https://wa.me/${c.contacto?.whatsapp}`} className="text-[var(--color-primary-light)] underline">{c.contacto?.whatsappDisplay}</a><br />
              Email: <a href={`mailto:${c.contacto?.email}`} className="text-[var(--color-primary-light)] underline">{c.contacto?.email}</a>
            </p>
          </section>
        </article>

        <DividerOrnament className="mt-12" />

        <div className="text-center">
          <Link href="/" className="btn-gothic-outline tap">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
