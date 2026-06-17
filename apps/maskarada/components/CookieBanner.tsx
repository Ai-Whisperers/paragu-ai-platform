"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mk_cookie_consent_v1";

/**
 * Simple cookie consent banner. Shows on first visit, persists choice in
 * localStorage. Not GDPR-perfect (we don't differentiate functional /
 * analytics / marketing cookies), but a real, dismissable banner is
 * better than none. The only persistent cookies we set are `mk_locale`
 * (locale preference) and `mk_admin` (admin session). No analytics, no
 * ad tracking.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function dismiss(choice: "accept" | "essential") {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, choice);
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 text-sm text-gray-300 leading-relaxed">
          <p>
            🍪 Usamos cookies para guardar tu preferencia de idioma y la sesión de
            admin. No rastreamos ni vendemos datos.{" "}
            <a href="/privacidad" className="text-gold-400 hover:text-gold-300 underline">
              Leer política de privacidad
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => dismiss("essential")}
            className="px-4 py-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-full transition-all"
          >
            Solo esenciales
          </button>
          <button
            onClick={() => dismiss("accept")}
            className="px-4 py-2 text-xs uppercase tracking-widest bg-gold-400/90 hover:bg-gold-400 text-black font-semibold rounded-full transition-all"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
