export default function MetodologiaPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border-light)] py-10">
        <div className="container max-w-3xl">
          <h1 className="mb-3">Metodología y fuentes</h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Cada caso, número y afirmación en este sitio tiene una fuente verificable. Esta página explica cómo se hizo el análisis y de dónde vienen los datos.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-3xl space-y-8">
          {/* Fuentes primarias */}
          <div>
            <h2 className="mb-3">Fuentes primarias utilizadas</h2>
            <div className="space-y-3">
              <div className="card">
                <h3 className="font-bold text-base mb-2">Medios paraguayos (cobertura diaria del tema)</h3>
                <ul className="text-sm space-y-1">
                  <li><a href="https://www.abc.com.py/tag/negligencia-medica/" target="_blank" rel="noopener noreferrer">ABC Color — tag negligencia-medica</a> (100+ notas)</li>
                  <li><a href="https://www.ultimahora.com/negligencia-medica" target="_blank" rel="noopener noreferrer">Última Hora — tag</a> (50+ notas)</li>
                  <li><a href="https://www.hoy.com.py/tag/negligencia" target="_blank" rel="noopener noreferrer">Hoy</a> (30+ notas)</li>
                  <li><a href="https://elnacional.com.py/tag/negligencia-medica/" target="_blank" rel="noopener noreferrer">El Nacional</a> (20+ notas)</li>
                  <li><a href="https://trece.com.py/actualidad/familias-paraguayas-rompen-el-silencio-por-la-muerte-por-negligencia/" target="_blank" rel="noopener noreferrer">Trece</a></li>
                  <li>Medios alternativos: RDN, Central Noticias, OviedoPress, Diario Paraguayo, Asunción Actual</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="font-bold text-base mb-2">Instituciones oficiales</h3>
                <ul className="text-sm space-y-1">
                  <li><a href="https://superintendenciadesalud.gov.py/" target="_blank" rel="noopener noreferrer">Superintendencia de Salud (SUPERSALUD)</a></li>
                  <li><a href="https://www.mspbs.gov.py/seguridad-paciente.html" target="_blank" rel="noopener noreferrer">MSPBS — Programa Seguridad del Paciente</a></li>
                  <li><a href="https://portal.ips.gov.py/" target="_blank" rel="noopener noreferrer">IPS (Instituto de Previsión Social)</a></li>
                  <li><a href="https://defensoriadelpueblo.gov.py/" target="_blank" rel="noopener noreferrer">Defensoría del Pueblo</a></li>
                  <li><a href="https://www.pj.gov.py/contenido/162-direccion-de-estadisticas/162" target="_blank" rel="noopener noreferrer">Poder Judicial — Estadísticas</a></li>
                </ul>
              </div>

              <div className="card">
                <h3 className="font-bold text-base mb-2">Datos cuantitativos oficiales</h3>
                <ul className="text-sm space-y-1">
                  <li><a href="https://superintendenciadesalud.gov.py/wp-content/uploads/2026/02/informe-de-gestio-superintendencia-de-salud-2025.pdf" target="_blank" rel="noopener noreferrer">SUPERSALUD Informe Gestión 2025 (PDF)</a> — 548 fiscalizaciones, 660 resoluciones, 12 sumarios</li>
                  <li><a href="https://www.pj.gov.py/images/contenido/oqyd/2024-informe-anual-quejasydenuncias.pdf" target="_blank" rel="noopener noreferrer">Poder Judicial Informe Denuncias 2024 (PDF)</a> — 3,473 denuncias ingresadas</li>
                  <li><a href="https://ministeriopublico.gov.py/nota/datos-abiertos-de-enero-a-diciembre-de-2024-el-ministerio-publico-registra-mas-de-283600-denuncias-ingresadas-y-atendio-a-cerca-de-275000-victimas-en-todo-el-pais-12096" target="_blank" rel="noopener noreferrer">Ministerio Público Datos 2024</a> — 283,600 denuncias, 275,000 víctimas</li>
                  <li><a href="https://www.paho.org/es/publicaciones/paraguay-informe-anual-pais-2024" target="_blank" rel="noopener noreferrer">OPS Paraguay 2024</a></li>
                  <li><a href="https://www.who.int/publications/i/item/9789240095458" target="_blank" rel="noopener noreferrer">WHO Global Patient Safety Report 2024</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Metodología */}
          <div>
            <h2 className="mb-3">Metodología del análisis</h2>
            <ol className="space-y-3 list-decimal pl-6">
              <li><strong>Barrido de fuentes:</strong> 5 rondas de scraping de medios paraguayos + documentos oficiales (132 archivos descargados)</li>
              <li><strong>Filtrado:</strong> Solo casos con al menos 1 fuente periodística verificable</li>
              <li><strong>Categorización:</strong> Tipo de negligencia, gravedad (1-5), estado legal, hospital</li>
              <li><strong>Verificación cruzada:</strong> Para casos emblemáticos, mínimo 2 fuentes</li>
              <li><strong>Anonimato por defecto:</strong> Víctimas no identificadas por nombre salvo sentencia firme</li>
            </ol>
          </div>

          {/* Limitaciones */}
          <div>
            <h2 className="mb-3">Limitaciones conocidas</h2>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)] list-disc pl-6">
              <li>Subreporte masivo: estimamos 800-1,600 casos/año reales vs. ~80-100 reportados en medios</li>
              <li>Sesgo geográfico: Asunción / Central sobre-representados</li>
              <li>Sesgo temporal: solo casos con cobertura reciente (2024-2026)</li>
              <li>Hospitales privados: muy subreportados por acuerdos de confidencialidad</li>
              <li>Scorecard hospitalario es preliminar — próxima versión integrará datos oficiales SUPERSALUD</li>
            </ul>
          </div>

          {/* Repositorio */}
          <div className="card">
            <h2 className="text-base mb-3">Investigación completa + código fuente</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-3">
              Toda la investigación (4,675 líneas de análisis, 16 documentos, 132 archivos descargados) está disponible públicamente:
            </p>
            <ul className="text-sm space-y-1">
              <li><strong>Gist:</strong> <a href="https://gist.github.com/IvanWeissVanDerPol/174e660734db01a1a3ac427ec02b1ef8" target="_blank" rel="noopener noreferrer">gist.github.com/.../salud-abierta</a></li>
              <li><strong>Brief AIW interno:</strong> <a href="https://github.com/Ai-Whisperers/agents-v2/issues/1" target="_blank" rel="noopener noreferrer">github.com/Ai-Whisperers/agents-v2/issues/1</a></li>
              <li><strong>Código del sitio:</strong> (próximamente en repo AIW)</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
