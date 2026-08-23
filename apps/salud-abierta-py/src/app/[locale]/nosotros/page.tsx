import { Heart, Shield, Users, Mail } from 'lucide-react';

export default function NosotrosPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border-light)] py-10">
        <div className="container max-w-3xl">
          <h1 className="mb-3">Sobre SaludAbierta PY</h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Somos un proyecto de Ai-Whisperers Paraguay enfocado en seguridad del paciente y derechos del paciente. Trabajamos con víctimas, abogados, medios y gobierno para cambiar el sistema.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-3xl space-y-8">
          {/* Misión */}
          <div>
            <h2 className="mb-3">Nuestra misión</h2>
            <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
              Paraguay está 30 años atrás en seguridad del paciente comparado con sus vecinos regionales. No tiene registro nacional de incidentes médicos, no tiene ley de derechos del paciente, no tiene arbitraje médico especializado, y la pena máxima por negligencia médica que termina en muerte es de 5 años (Art. 107 del Código Penal) — igual que un conductor ebrio.
            </p>
            <p className="text-base leading-relaxed text-[var(--color-text-muted)] mt-3">
              Esto no puede seguir así. SaludAbierta PY existe para visibilizar el problema, documentar casos con fuentes verificables, y presionar por cambios sistémicos.
            </p>
          </div>

          {/* Visión */}
          <div>
            <h2 className="mb-3">Nuestra visión</h2>
            <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
              Un Paraguay donde cada paciente tiene derechos claros, donde cada hospital publica scorecard de seguridad, donde cada error médico se reporta y se aprende de él.
            </p>
          </div>

          {/* Coalición */}
          <div>
            <h2 className="mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--color-accent)]" />
              Coalición
            </h2>
            <p className="text-base leading-relaxed text-[var(--color-text-muted)] mb-4">
              Trabajamos con:
            </p>
            <ul className="space-y-3">
              <li className="card">
                <h3 className="font-bold">Asociación Honor y Vida</h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">Más de 50 familias víctimas de negligencia médica en Paraguay. Coalición principal.</p>
                <a href="https://www.facebook.com/asociacion.honor.y.vida/" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-accent-dark)] mt-2 inline-block">
                  Contacto vía Facebook →
                </a>
              </li>
              <li className="card">
                <h3 className="font-bold">Basta de Negligencia Médica Paraguay</h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">Organización activa desde 2021 con presencia multi-canal.</p>
                <a href="https://linktr.ee/Bastadenegligencia" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-accent-dark)] mt-2 inline-block">
                  Linktree →
                </a>
              </li>
              <li className="card">
                <h3 className="font-bold">Defensoría del Pueblo del Paraguay</h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">Activamente canalizando reclamos de pacientes (jul 2026).</p>
                <a href="https://defensoriadelpueblo.gov.py/" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-accent-dark)] mt-2 inline-block">
                  Sitio oficial →
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="card">
            <h2 className="mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[var(--color-accent)]" />
              Contacto
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-3">
              Para coalition, prensa, partnerships, o casos individuales graves:
            </p>
            <ul className="text-sm space-y-1">
              <li><strong>Brief técnico:</strong> <a href="https://github.com/Ai-Whisperers/agents-v2/issues/1" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-dark)]">github.com/Ai-Whisperers/agents-v2/issues/1</a></li>
              <li><strong>Investigación completa:</strong> <a href="https://gist.github.com/IvanWeissVanDerPol/174e660734db01a1a3ac427ec02b1ef8" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-dark)]">gist.github.com/.../salud-abierta</a></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="disclaimer-banner">
            <p className="text-xs">
              <Shield className="inline w-4 h-4 mr-1" />
              <strong>Lo que NO somos:</strong> No somos un servicio legal. No constituimos relación abogado-cliente. No damos diagnóstico médico. No reemplazamos denuncia formal ante SUPERSALUD o Defensoría. Somos una plataforma de transparencia y documentación.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
