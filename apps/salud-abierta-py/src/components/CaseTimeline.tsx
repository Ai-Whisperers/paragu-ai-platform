// CaseTimeline.tsx — visualización timeline del caso
import type { TimelineEvent } from '@/data/types';

export default function CaseTimeline({ events }: { events: TimelineEvent[] }) {
  if (!events || events.length === 0) {
    return (
      <p className="text-sm text-[var(--color-text-muted)] italic">Sin línea de tiempo detallada disponible.</p>
    );
  }

  return (
    <ol className="relative border-l-2 border-[var(--color-accent)] pl-6 space-y-6">
      {events.map((ev, i) => (
        <li key={i} className="relative">
          {/* Dot */}
          <span
            className="absolute -left-[33px] w-4 h-4 rounded-full bg-[var(--color-accent)] border-4 border-[var(--color-bg)]"
            aria-hidden="true"
          />
          <time className="text-xs font-semibold text-[var(--color-accent-dark)] uppercase tracking-wider">
            {ev.fecha}
          </time>
          <h4 className="text-base font-bold mt-1">{ev.titulo}</h4>
          <p className="text-sm text-[var(--color-text-muted)] mt-1 leading-relaxed">{ev.descripcion}</p>
          {ev.fuente && (
            <a
              href={ev.fuente}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-accent-dark)] mt-1 inline-block no-underline"
            >
              Fuente ↗
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}
