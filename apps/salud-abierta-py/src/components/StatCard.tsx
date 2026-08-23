// StatCard.tsx — tarjeta de estadística cuantitativa
import type { Stat } from '@/data/types';

export default function StatCard({ stat }: { stat: Stat }) {
  const formattedValue =
    typeof stat.value === 'number' && stat.value >= 1000
      ? stat.value.toLocaleString('es-PY')
      : String(stat.value);

  return (
    <div className="card text-center">
      <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-1">
        {formattedValue}
        {stat.unidad && <span className="text-base text-[var(--color-text-muted)] font-normal ml-1">{stat.unidad}</span>}
      </div>
      <div className="text-sm font-semibold text-[var(--color-text)] mb-2">{stat.label}</div>
      {stat.contexto && (
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3">{stat.contexto}</p>
      )}
      <a
        href={stat.fuenteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-[var(--color-accent-dark)] hover:text-[var(--color-primary)] no-underline font-medium"
      >
        Fuente: {stat.fuente} ↗
      </a>
    </div>
  );
}
