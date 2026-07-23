"use client";

import Link from "next/link";
import content from "@/content/es.json";
import type { SiteContent } from "@/lib/content-types";
import { DividerOrnament } from "@/components/ornaments";

const c = content as SiteContent;

export default function TerminosPage() {
  return (
    <div className="pt-24 md:pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <p className="eyebrow mb-2">Condiciones</p>
          <h1 className="mb-3 text-balance">Términos y Condiciones</h1>
          <p className="text-[var(--color-muted-foreground)] text-[0.92rem]">
            Última actualización: {new Date().toLocaleDateString("es-PY", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <DividerOrnament className="my-8" />

        <article className="space-y-7 text-[var(--color-foreground)]/90 text-[0.95rem] md:text-[1rem] leading-relaxed">
          <section>
            <h2 className="text-[1.3rem] mb-3">1. Aceptación</h2>
            <p>
              Al contratar cualquier servicio de perforación, venta de joyería o uso de este sitio web de {c.businessName} (&ldquo;Pierce Charm&rdquo;),
              aceptás estos términos y condiciones. Si no estás de acuerdo, no uses el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">2. Edad mínima</h2>
            <p>
              Atendemos a personas de 14 años en adelante con autorización firmada de un adulto responsable (padre, madre o tutor legal) y presencia física
              del adulto en el estudio. Menores de 14 años requieren evaluación particular caso a caso. En todos los casos, cumplimos con las
              recomendaciones de la Association of Professional Piercers (APP).
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">3. Salud y contraindicaciones</h2>
            <p>Es responsabilidad del cliente informar:</p>
            <ul className="list-none space-y-1.5 pl-5 mt-3">
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">Alergias conocidas (metales, látex, anestésicos).</li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">Embarazo o lactancia (algunas zonas se contraindican).</li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">Medicación anticoagulante.</li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">Condiciones dermatológicas activas en la zona a perforar.</li>
              <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-[var(--color-gold)]">Consumo de alcohol o sustancias en las 24h previas.</li>
            </ul>
            <p className="mt-3">
              Pierce Charm se reserva el derecho de no realizar el procedimiento si considera que existe un riesgo para la salud del cliente, con
              devolución íntegra de la seña.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">4. Reservas y seña</h2>
            <p>
              La seña de reserva es de <strong>Gs 50.000</strong>, se descuenta del precio final, y es transferible a una nueva fecha con al menos 24h de
              anticipación. Cancelaciones con menos de 24h pierden la seña. No-shows (ausencias sin aviso) pierden la seña.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">5. Cuidados post-perforación</h2>
            <p>
              Después de cada perforación entregamos un instructivo escrito y un kit de cuidados. La correcta cicatrización depende de que el cliente
              siga estas instrucciones. Pierce Charm no se hace responsable de complicaciones derivadas del incumplimiento de los cuidados indicados.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">6. Política de garantía</h2>
            <p>
              Si una perforación realizada en nuestro estudio no cicatriza correctamente por razones atribuibles al procedimiento o a la joyería inicial,
              ofrecemos una revisión y asesoramiento sin cargo. La garantía no cubre joyería traída por el cliente ni incumplimiento de cuidados.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">7. Devoluciones de joyería</h2>
            <p>
              Por razones de bioseguridad, la joyería que haya sido abierta de su empaque estéril no acepta devolución. Joyería no abierta puede devolverse
              dentro de los 7 días con empaque original, con un cargo de reposición del 10% del valor.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">8. Conducta y respeto</h2>
            <p>
              Pierce Charm es un espacio seguro, profesional y respetuoso. No toleramos acoso, discriminación ni conducta agresiva. Nos reservamos el
              derecho de rechazar el servicio y devolver la seña en esos casos.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">9. Limitación de responsabilidad</h2>
            <p>
              Pierce Charm no se hace responsable por daños derivados del mal uso de las instalaciones, incumplimiento de instrucciones post-servicio, o
              modificaciones realizadas por terceros sobre perforaciones realizadas por nosotros.
            </p>
          </section>

          <section>
            <h2 className="text-[1.3rem] mb-3">10. Ley aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República del Paraguay. Cualquier controversia se resolverá en los tribunales de Asunción,
              Paraguay.
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
