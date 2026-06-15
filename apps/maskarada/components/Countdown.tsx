"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/content";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [eventPassed, setEventPassed] = useState(content.site.eventPassed);

  useEffect(() => {
    const eventDate = new Date(content.site.eventDate);
    function update() {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();
      if (diff <= 0) {
        setEventPassed(true);
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (eventPassed) {
    return (
      <div className="text-center">
        <p className="text-gold-400 text-xl font-semibold mb-3">
          🎉 ¡El evento ya pasó! La próxima edición está en preparación.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Enterate primero cuando estén las entradas disponibles:
        </p>
        <a
          href="https://wa.me/595981200255?text=Hola!%20Quiero%20enterarme%20cuando%20haya%20próximo%20evento%20maškaráda"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-gold-400/30 text-gold-400 hover:text-white hover:border-gold-400 px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
        >
          Notificarme cuando haya entradas
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {[
          { v: countdown.days, l: "días" },
          { v: countdown.hours, l: "horas" },
          { v: countdown.minutes, l: "min" },
          { v: countdown.seconds, l: "seg" },
        ].map((u, i) => (
          <div key={i} className="flex items-center gap-4 md:gap-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                {pad(u.v)}
              </span>
              <span className="text-xs uppercase tracking-widest text-gray-500 mt-1">{u.l}</span>
            </div>
            {i < 3 && <span className="text-3xl md:text-4xl font-bold text-blood-500">:</span>}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-3 tracking-wider uppercase">
        Hasta el próximo evento
      </p>
    </>
  );
}
