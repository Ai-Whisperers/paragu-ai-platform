"use client";

/**
 * QuickExit — safety UI for users in risky environments.
 *
 * Two behaviors:
 *   1. Single click on the badge → opens a neutral page (Google) in a NEW
 *      tab and replaces the current tab with it. Works without JS.
 *   2. Esc key → see root layout's <head> script for the keyboard handler.
 *
 * Visual: prominent badge top-right. Bigger hit-target than the previous
 * micro-pill so users in panic mode can find it. Border + glow ring
 * make it stand out from any other content.
 */
export function QuickExit({ redirectTo = "https://www.google.com" }: { redirectTo?: string }) {
  return (
    <a
      href={redirectTo}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label="Salida rápida: abre una página neutra y oculta este sitio"
      title="Salida rápida — ocultá este sitio ahora"
      onClick={(e) => {
        if (typeof window !== "undefined") {
          e.preventDefault();
          window.open(redirectTo, "_blank", "noopener,noreferrer");
          window.location.replace(redirectTo);
        }
      }}
      className="fixed top-3 right-3 lg:top-4 lg:right-4 z-[100] group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold ring-2 ring-white/40 hover:bg-[var(--color-purple-deep)] hover:ring-white/70 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
      style={{ boxShadow: "0 4px 14px rgba(123, 44, 191, 0.4)" }}
    >
      <span aria-hidden="true" className="text-base leading-none">⚡</span>
      <span>Salir del sitio</span>
    </a>
  );
}
