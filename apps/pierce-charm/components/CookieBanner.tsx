"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const accepted = localStorage.getItem("pc-cookies-accepted");
    if (!accepted) {
      // Show after 1.5s so it doesn't compete with hero
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem("pc-cookies-accepted", "true");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("pc-cookies-accepted", "rejected");
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-3 left-3 right-3 md:left-auto md:right-5 md:bottom-5 md:max-w-[400px] z-50 bg-[var(--color-surface)] border border-[var(--color-primary-light)] shadow-2xl p-4 md:p-5 animate-fade-in-up"
    >
      <p className="font-[var(--font-display)] text-[0.85rem] uppercase tracking-[0.18em] text-[var(--color-primary-light)] mb-2">
        Cookies
      </p>
      <p className="text-[var(--color-foreground)]/85 text-[0.88rem] leading-relaxed mb-3">
        Este sitio usa cookies técnicas mínimas (Google Fonts). No rastreamos tu actividad ni compartimos datos con terceros publicitarios.
        Conocé más en nuestra{" "}
        <Link href="/privacidad" className="text-[var(--color-gold)] underline">
          política de privacidad
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 tap px-3 py-2 bg-[var(--color-primary)] border border-[var(--color-primary-light)] text-[var(--color-foreground)] font-[var(--font-display)] text-[0.72rem] uppercase tracking-[0.22em]"
        >
          Aceptar
        </button>
        <button
          onClick={reject}
          className="flex-1 tap px-3 py-2 border border-[var(--color-border)] text-[var(--color-muted-foreground)] font-[var(--font-display)] text-[0.72rem] uppercase tracking-[0.22em]"
        >
          Solo necesarias
        </button>
      </div>
    </div>
  );
}
