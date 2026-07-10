"use client";

import { SITE_URL } from "@/lib/content";

/**
 * QuickExit — server component.
 *
 * Two behaviors:
 *   1. Single click on the badge → opens Google in a NEW tab and replaces
 *      the current tab with Google. This works on any browser without JS.
 *   2. Esc key → see root layout's <head> script for the keyboard handler.
 *
 * Why server-only: no JS means no "did it hydrate? did my click register?"
 * uncertainty when the user's safety is on the line. Pure HTML <a> with the
 * right href does the right thing every time.
 *
 * Visual: small badge tucked in the top-right corner of <body>. Always
 * visible, never inline within any other component.
 */
export function QuickExit({ redirectTo = "https://www.google.com" }: { redirectTo?: string }) {
  // Use rel="nofollow noreferrer" so we don't leak link equity, but the
  // important thing here is behavior, not SEO.
  return (
    <a
      href={redirectTo}
      target="_blank"
      rel="noopener noreferrer nofollow"
      title="Salida rápida — abre una página neutra y oculta este sitio"
      aria-label="Salida rápida: abre una página neutra y oculta este sitio"
      onClick={(e) => {
        // The new tab already opens via target=_blank. Now replace this tab.
        // We do it client-side because document.referrer replacement needs
        // window.location, but the click is still functional if JS is off
        // (the new tab still opens, even if the current tab stays).
        if (typeof window !== "undefined") {
          e.preventDefault();
          window.open(redirectTo, "_blank", "noopener,noreferrer");
          window.location.replace(redirectTo);
        }
      }}
      className="fixed top-3 right-3 z-[100] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold shadow-lg hover:bg-[var(--color-purple-deep)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary)]"
    >
      <span aria-hidden="true">⚡</span>
      <span>Salir</span>
    </a>
  );
}
