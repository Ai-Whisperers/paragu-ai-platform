// CaseCard.tsx — tarjeta de caso individual
import Link from 'next/link';
import type { Caso } from '@/data/types';

interface Props {
  caso: Caso;
  locale: string;
}

const gravedadLabel: Record<number, string> = {
  1: 'Leve',
  2: 'Moderado',
  3: 'Severo',
  4: 'Muy severo',
  5: 'Muerte',
};

const gravedadColor: Record<number, string> = {
  1: 'var(--color-success)',
  2: 'var(--color-info)',
  3: 'var(--color-warning)',
  4: 'var(--color-warning)',
  5: 'var(--color-error)',
};

const estadoLabel: Record<string, string> = {
  denunciado: 'Reportado',
  'investigacion-fiscal': 'Investigación fiscal',
  juicio: 'Juicio oral',
  sentencia: 'Sentencia firme',
  absuelto: 'Absuelto',
  archivado: 'Archivado',
  'cerrado-indemnizacion': 'Cerrado c/ indemnización',
};

export default function CaseCard({ caso, locale }: Props) {
  return (
    <article className="card flex flex-col h-full">
      {/* Header con gravedad + estado */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{ background: 'var(--color-bg-alt)', color: gravedadColor[caso.gravedad] }}
        >
          {gravedadLabel[caso.gravedad]}
        </span>
        <span className="text-xs text-[var(--color-text-light)]">
          {estadoLabel[caso.estado] || caso.estado}
        </span>
      </div>

      <h3 className="text-base font-bold mb-2 leading-snug">
        <Link href={`/${locale}/casos/${caso.id}`} className="text-[var(--color-primary)] no-underline hover:text-[var(--color-accent-dark)]">
          {caso.titulo}
        </Link>
      </h3>

      <p className="text-sm text-[var(--color-text-muted)] mb-3 leading-relaxed line-clamp-3">
        {caso.resumen}
      </p>

      {/* Meta */}
      <div className="mt-auto space-y-1 text-xs text-[var(--color-text-light)]">
        <p><strong>Lugar:</strong> {caso.hospital} · {caso.ciudad}, {caso.departamento}</p>
        <p><strong>Fecha:</strong> {caso.fechaIncidente}</p>
        {caso.victima && <p><strong>Víctima:</strong> {caso.victima}{caso.victimaEdad ? ` · ${caso.victimaEdad}` : ''}</p>}
      </div>

      {/* Tags */}
      {caso.tags && caso.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {caso.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-[var(--color-bg-alt)] text-[var(--color-text-muted)] rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/${locale}/casos/${caso.id}`}
        className="mt-4 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent-dark)] no-underline"
      >
        Leer caso completo →
      </Link>
    </article>
  );
}
