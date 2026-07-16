"use client";

import { useEffect, useState } from "react";

/**
 * Memoria 108 countdown — live countdown to the next year's aniversario.
 *
 * Renders only on the client (uses Date()). On the server we emit a static
 * placeholder ("Septiembre 2026") so the page is useful to crawlers.
 *
 * Triggers to "today" state when 0 days remain.
 */
export function Memoria108Countdown({
  targetYear = new Date().getFullYear() + 1,
}: {
  targetYear?: number;
}) {
  const target = new Date(Date.UTC(targetYear, 8, 1, 0, 0, 0)); // Sept 1
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  if (!now) {
    return (
      <div className="bg-[var(--color-purple-deep)] text-white rounded-2xl p-6 lg:p-8 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-white/70 mb-2">
          Próxima edición
        </p>
        <p className="font-display text-3xl lg:text-5xl font-bold mb-2">
          Septiembre {targetYear}
        </p>
        <p className="text-white/80 text-sm">Suscribite al calendario para enterarte.</p>
        <a
          href="/events.ics"
          className="inline-block mt-4 px-5 py-2 rounded-md bg-white text-[var(--color-purple-deep)] font-medium hover:bg-warm"
        >
          Suscribirme al calendario
        </a>
      </div>
    );
  }

  const diffMs = target.getTime() - now.getTime();
  const d = Math.max(0, Math.floor(diffMs / 86_400_000));
  const h = Math.max(0, Math.floor((diffMs % 86_400_000) / 3_600_000));
  const m = Math.max(0, Math.floor((diffMs % 3_600_000) / 60_000));
  const s = Math.max(0, Math.floor((diffMs % 60_000) / 1000));

  const isToday = d === 0 && h === 0 && m === 0;

  return (
    <div className="bg-[var(--color-purple-deep)] text-white rounded-2xl p-6 lg:p-8 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-white/70 mb-2">
        {isToday ? "¡Es hoy!" : `Cuenta regresiva al 1 de septiembre ${targetYear}`}
      </p>
      <p className="font-display text-3xl lg:text-5xl font-bold mb-3">
        {isToday ? "Mes de las Memorias 108" : `${d} días`}
      </p>
      {!isToday && (
        <p className="font-mono text-sm text-white/90 mb-4">
          {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:
          {String(s).padStart(2, "0")}
        </p>
      )}
      <a
        href="/events.ics"
        className="inline-block px-5 py-2 rounded-md bg-white text-[var(--color-purple-deep)] font-medium hover:bg-warm"
      >
        Suscribirme al calendario
      </a>
    </div>
  );
}
