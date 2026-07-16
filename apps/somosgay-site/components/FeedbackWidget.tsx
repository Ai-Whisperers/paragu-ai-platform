"use client";

import { useState } from "react";

/**
 * TalkBack widget — bottom-right floating button that opens a small
 * panel for "found a typo / broken link / idea" feedback.
 *
 * Submits via WhatsApp deep-link with the message + URL pre-filled.
 * No PII on infra (consistent with donation/newsletter widgets).
 */
export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"bug" | "typo" | "idea" | "other">("bug");

  function submit() {
    if (!message.trim()) return;
    const url = typeof window !== "undefined" ? window.location.href : "";
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "595986173200";
    const labels: Record<string, string> = {
      bug: "Algo no funciona",
      typo: "Encontré un error de tipo",
      idea: "Tengo una idea o sugerencia",
      other: "Otro",
    };
    const body = [
      `Hola SOMOSGAY, feedback de la página:`,
      ``,
      `Tipo: ${labels[type]}`,
      ``,
      `Mensaje: ${message}`,
      ``,
      `URL: ${url}`,
    ].join("\n");
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setMessage("");
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Dar feedback sobre esta página"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-32 lg:bottom-24 right-4 z-40 inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-surface border border-[var(--color-primary)] text-[var(--color-primary)] text-xs font-medium shadow-md hover:bg-warm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      >
        <span aria-hidden="true">💬</span>
        Feedback
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="feedback-title"
          className="fixed bottom-44 lg:bottom-36 right-4 z-40 w-80 bg-surface border-2 border-[var(--color-primary)] rounded-2xl shadow-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 id="feedback-title" className="font-bold text-text text-sm">
              Comentario anónimo
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-text-muted hover:text-text text-xs"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-wrap gap-1 mb-3" role="radiogroup">
            {(["bug", "typo", "idea", "other"] as const).map((k) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={type === k}
                onClick={() => setType(k)}
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  type === k
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-warm text-text-light hover:bg-warm-deep"
                }`}
              >
                {k === "bug" ? "Bug" : k === "typo" ? "Tipo" : k === "idea" ? "Idea" : "Otro"}
              </button>
            ))}
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Qué encontraste o qué cambiarias?"
            className="block w-full rounded-md border border-[var(--color-warm-deep)] bg-warm px-2 py-1.5 text-sm text-text placeholder:text-text-muted focus:border-[var(--color-primary)] focus:outline-none min-h-[80px] resize-y"
            maxLength={500}
          />

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 text-xs text-text-muted hover:text-text"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={!message.trim()}
              className="px-3 py-1.5 rounded-md bg-[var(--color-primary)] text-white text-xs font-medium hover:bg-[var(--color-purple-deep)] disabled:opacity-50"
            >
              Enviar
            </button>
          </div>
          <p className="text-[10px] text-text-muted mt-2 leading-relaxed">
            Tu mensaje va directo al WhatsApp de SOMOSGAY. No se guarda en ningún
            servidor nuestro.
          </p>
        </div>
      )}
    </>
  );
}
