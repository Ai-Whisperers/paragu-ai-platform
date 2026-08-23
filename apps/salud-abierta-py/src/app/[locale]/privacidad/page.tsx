export default function PrivacidadPage() {
  return (
    <section className="py-10">
      <div className="container max-w-3xl space-y-8">
        <header>
          <h1>Privacidad y protección de datos</h1>
          <p className="text-lg text-[var(--color-text-muted)] mt-3 leading-relaxed">
            Paraguay no cuenta con ley de protección de datos equivalente a GDPR. Esto significa que aplicamos privacy-by-design desde el diseño del producto.
          </p>
        </header>

        <section>
          <h2>Lo que NO hacemos</h2>
          <ul className="space-y-2 text-sm list-disc pl-6 text-[var(--color-text-muted)]">
            <li><strong>No usamos cookies de terceros.</strong> Cero Meta Pixel, cero Google Analytics, cero tracking.</li>
            <li><strong>No recolectamos datos del usuario.</strong> El reporte que generás queda en tu navegador, no se envía a ningún servidor.</li>
            <li><strong>No mostramos publicidad.</strong> No vendemos atención a anunciantes.</li>
            <li><strong>No vendemos datos.</strong> No monetizamos tu información.</li>
            <li><strong>No tenemos login.</strong> No creamos perfiles de usuario.</li>
          </ul>
        </section>

        <section>
          <h2>Lo que SÍ hacemos</h2>
          <ul className="space-y-2 text-sm list-disc pl-6 text-[var(--color-text-muted)]">
            <li><strong>Mostramos el código fuente abierto.</strong> Cualquiera puede verificar qué hace el sitio.</li>
            <li><strong>Anonimato por defecto.</strong> Víctimas en casos publicados no son identificadas salvo sentencia firme.</li>
            <li><strong>Botón "Salir" siempre visible.</strong> Para víctimas en peligro, pueden irse del sitio con un click.</li>
            <li><strong>Sin formularios que envían a servidor.</strong> El reporte es 100% client-side (vive en tu navegador).</li>
          </ul>
        </section>

        <section>
          <h2>Sobre los datos publicados</h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Los 25 casos documentados en este sitio provienen de fuentes periodísticas públicas. Cada caso tiene al menos 1 fuente verificable (periódico + URL). Las víctimas no son identificadas por nombre salvo cuando la sentencia es firme y pública (caso Maylen Romero, único con condena penal ratificada por Corte Suprema).
          </p>
        </section>

        <section>
          <h2>Derechos del visitante</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-3">Aunque Paraguay no tenga ley GDPR, AIW se compromete a:</p>
          <ul className="space-y-2 text-sm list-disc pl-6 text-[var(--color-text-muted)]">
            <li>Si nos contactás pidiendo baja de un caso, evaluamos y respondemos en 7 días.</li>
            <li>Si sos una víctima y querés que actualicemos o corrijamos un caso, podés pedirlo.</li>
            <li>No tenemos base de datos de usuarios que borrar — porque nunca recolectamos datos.</li>
          </ul>
        </section>

        <section>
          <h2>Reportar un problema de privacidad</h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Si encontrás un problema de privacidad en este sitio, contactanos vía el <a href="https://github.com/Ai-Whisperers/agents-v2/issues/1" target="_blank" rel="noopener noreferrer">brief técnico</a> o la <a href="https://defensoriadelpueblo.gov.py/" target="_blank" rel="noopener noreferrer">Defensoría del Pueblo del Paraguay</a>.
          </p>
        </section>

        <section className="card bg-[var(--color-bg-alt)]">
          <p className="text-xs text-[var(--color-text-muted)] italic">
            Última actualización: 23 de agosto de 2026. Esta política puede actualizarse sin previo aviso, pero siempre será más protectora que la ley paraguaya actual.
          </p>
        </section>
      </div>
    </section>
  );
}
