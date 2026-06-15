"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "maskarada_age_confirmed_v1";

export default function AgeGate() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { expires } = JSON.parse(stored);
        if (expires > Date.now()) {
          setShow(false);
          return;
        }
      }
    } catch {
      // ignore
    }
    // Defer showing the gate so the page can paint first
    const t = setTimeout(() => setShow(true), 250);
    return () => clearTimeout(t);
  }, []);

  function confirm(ofAge: boolean) {
    if (ofAge) {
      const days = 30;
      const expires = Date.now() + days * 24 * 60 * 60 * 1000;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ confirmed: true, at: Date.now(), expires })
      );
    } else {
      // Remember they said "no" for 24h so we don't keep pestering
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ confirmed: false, at: Date.now(), expires: Date.now() + 24 * 60 * 60 * 1000 })
      );
    }
    setShow(false);
  }

  if (!mounted || !show) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-5xl mb-4 text-center">🎭</div>
        <h1 id="age-gate-title" className="text-2xl font-bold text-white text-center mb-2">
          +18 — Confirmá tu edad
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6 leading-relaxed">
          El contenido de <span className="text-gold-400 font-semibold">maškaráda</span> es
          estrictamente para personas mayores de 18 años. Eventos, recursos y comunidad se
          rigen por los principios SSC y RACK.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => confirm(true)}
            className="w-full bg-blood-500 hover:bg-blood-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Soy mayor de 18 — Entrar
          </button>
          <button
            onClick={() => confirm(false)}
            className="w-full text-sm text-gray-500 hover:text-gray-400 transition-colors"
          >
            Soy menor de 18 — Salir
          </button>
        </div>

        <p className="text-xs text-gray-600 text-center mt-6 leading-relaxed">
          Esta preferencia se guarda en este dispositivo por 30 días. Al entrar confirmás que
          has leído y aceptás nuestras{" "}
          <a href="/privacidad" className="text-gold-400 hover:underline">
            políticas de privacidad
          </a>
          .
        </p>
      </div>
    </div>
  );
}
