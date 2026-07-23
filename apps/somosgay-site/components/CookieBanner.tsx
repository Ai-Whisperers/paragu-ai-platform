"use client";
import { useEffect, useState } from "react";

// OPSEC-conscious preference banner.
//
// We don't use analytics, third-party cookies, or fingerprinting. This banner
// exists only to surface that fact (it would be misleading to NOT tell visitors
// that we're different from the average site). The localStorage key is purely
// a "don't show this hint again" toggle — no PII, no tracking.
//
// Rename to "PreferenciasBanner" if you want to be technical about it.
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed =
      typeof window !== "undefined" && window.localStorage.getItem("somosgay-pref-dismissed");
    if (dismissed) return;
    const t = setTimeout(() => setShow(true), 0);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("somosgay-pref-dismissed", "1");
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Aviso sobre privacidad"
      className="fixed bottom-20 lg:bottom-4 left-4 right-4 lg:left-auto lg:right-24 lg:max-w-md z-30 bg-[var(--color-surface)] border border-[var(--color-warm-deep)] rounded-lg shadow-xl p-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-warm-deep flex items-center justify-center text-[var(--color-primary)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-text mb-1">
            Tu privacidad, primero
          </p>
          <p className="text-sm text-text-light leading-relaxed mb-3">
            Este sitio no usa cookies de rastreo ni análisis de terceros. Tu visita
            no se registra en ningún servidor nuestro más allá de lo necesario para
            servir la página.{" "}
            <a href="/privacidad" className="text-[var(--color-primary)] underline">
              Leer la política completa
            </a>
            .
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="bg-primary text-white text-sm px-4 py-2 rounded-md hover:bg-[var(--color-purple-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
