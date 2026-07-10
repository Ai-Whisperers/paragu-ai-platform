"use client";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = typeof window !== "undefined" && window.localStorage.getItem("somosgay-cookies-ok");
    if (!accepted) setShow(true);
  }, []);

  function accept() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("somosgay-cookies-ok", "1");
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-20 lg:bottom-4 left-4 right-4 lg:left-auto lg:right-24 lg:max-w-md z-30 bg-[var(--color-surface)] border border-[var(--color-warm-deep)] rounded-lg shadow-xl p-4"
    >
      <p className="text-sm text-text-light leading-relaxed mb-3">
        Este sitio no utiliza cookies de rastreo ni terceros. Solo guardamos tu preferencia
        de aceptación localmente. Ver nuestra{" "}
        <a href="/privacidad" className="text-[var(--color-primary)] underline">
          política de privacidad
        </a>
        .
      </p>
      <button
        onClick={accept}
        className="bg-primary text-white text-sm px-4 py-2 rounded-md hover:bg-[var(--color-purple-deep)]"
      >
        Entendido
      </button>
    </div>
  );
}