// HospitalGrade.tsx — scorecard A-F (estilo Leapfrog)
import type { Hospital } from '@/data/types';

interface Props {
  hospital: Hospital;
  showDetails?: boolean;
}

export default function HospitalGrade({ hospital, showDetails = true }: Props) {
  return (
    <article className="card">
      <header className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-lg font-bold leading-tight">{hospital.nombre}</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {hospital.ciudad}, {hospital.departamento} ·{' '}
            <span className="capitalize">{hospital.tipo}</span>
          </p>
        </div>
        <div
          className={`grade-${hospital.grade} flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center font-bold text-2xl`}
          aria-label={`Grade ${hospital.grade}`}
        >
          {hospital.grade}
        </div>
      </header>

      {showDetails && (
        <>
          <div className="grid grid-cols-3 gap-3 text-center text-sm my-4 pt-3 border-t border-[var(--color-border-light)]">
            <div>
              <div className="text-2xl font-bold text-[var(--color-primary)]">{hospital.scoreNumerico}</div>
              <div className="text-xs text-[var(--color-text-muted)]">Score total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--color-primary)]">{hospital.casosReportados}</div>
              <div className="text-xs text-[var(--color-text-muted)]">Casos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--color-error)]">{hospital.muertes}</div>
              <div className="text-xs text-[var(--color-text-muted)]">Muertes</div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[var(--color-text-muted)]">
            <p><strong>Process score:</strong> {hospital.processScore}/100</p>
            <p><strong>Outcome score:</strong> {hospital.outcomeScore}/100</p>
            <p><strong>Último incidente:</strong> {hospital.ultimaIncidente}</p>
          </div>

          {hospital.observaciones.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[var(--color-border-light)]">
              <p className="text-xs font-semibold mb-2 text-[var(--color-primary)]">Observaciones:</p>
              <ul className="text-xs text-[var(--color-text-muted)] space-y-1">
                {hospital.observaciones.map((obs, i) => (
                  <li key={i}>• {obs}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </article>
  );
}
