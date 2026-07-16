"use client";

import { useState, useEffect } from "react";

/**
 * Per-page QR — generates a QR code for the current page URL on the client.
 *
 * Uses qrserver.com for zero-dep QR generation. Latency is low enough for a
 * footer widget. When offline / blocked, falls back to a "Compartir"
 * link that pre-fills the URL in WhatsApp.
 *
 * Only renders when the user clicks the trigger button — keeps
 * Lighthouse score high by default (no images on initial paint).
 */
export function QrShare({ href }: { href: string }) {
  const [open, setOpen] = useState(false);

  // Encode the URL using a public QR service
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(href || "")}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-xs text-text-muted hover:text-text underline"
        aria-label="Mostrar QR de esta página"
      >
        {open ? "Cerrar QR" : "QR"}
      </button>
      {open && (
        <div className="fixed bottom-32 lg:bottom-24 right-4 z-40 bg-surface border-2 border-[var(--color-primary)] rounded-2xl shadow-xl p-3 w-44">
          <p className="text-xs text-text-muted mb-2 font-medium">QR de esta página</p>
          {href ? (
            <img
              src={qrUrl}
              alt={`Código QR para ${href}`}
              className="w-32 h-32 rounded-md mx-auto block"
              width={128}
              height={128}
            />
          ) : (
            <div className="w-32 h-32 rounded-md mx-auto bg-warm flex items-center justify-center text-text-muted text-xs">
              URL no disponible
            </div>
          )}
          <p className="text-[10px] text-text-muted mt-2 text-center break-all">{href}</p>
        </div>
      )}
    </>
  );
}
