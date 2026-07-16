"use client";

import { useState } from "react";

/**
 * RSVP widget for Memoria 108.
 *
 * Captures intent (yes/maybe) and opens WhatsApp with a pre-filled message.
 * No PII on infra; Paloma receives each RSVP via WhatsApp.
 */
export function Rsvp108() {
  const [name, setName] = useState("");
  const [intent, setIntent] = useState<"yes" | "maybe">("yes");
  const [attendees, setAttendees] = useState(1);

  function submit() {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "595986173200";
    const body = [
      `Hola SOMOSGAY, RSVP para Memoria 108:`,
      ``,
      name ? `• Nombre: ${name}` : null,
      `• Asistencia: ${intent === "yes" ? "Sí, confirmo" : "Tal vez"}`,
      `• Asistentes: ${attendees}`,
      ``,
      `Nos vemos en septiembre.`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const inputClass =
    "block w-full rounded-md border border-[var(--color-warm-deep)] bg-surface px-3 py-2 text-sm text-text focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="bg-surface border-2 border-[var(--color-purple-deep)] rounded-2xl p-6 space-y-4"
    >
      <div>
        <h3 className="font-display text-xl font-bold mb-1">
          Confirmo mi asistencia
        </h3>
        <p className="text-sm text-text-light">
          Memoria 108 — Mes de las Memorias, 1 de septiembre.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIntent("yes")}
          aria-pressed={intent === "yes"}
          className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium ${
            intent === "yes"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-warm text-text-light"
          }`}
        >
          Confirmo
        </button>
        <button
          type="button"
          onClick={() => setIntent("maybe")}
          aria-pressed={intent === "maybe"}
          className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium ${
            intent === "maybe"
              ? "bg-[var(--color-purple-deep)] text-white"
              : "bg-warm text-text-light"
          }`}
        >
          Tal vez
        </button>
      </div>

      <input
        type="text"
        className={inputClass}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre (opcional)"
        maxLength={120}
        aria-label="Tu nombre"
      />

      <label className="block">
        <span className="block text-xs font-medium text-text mb-1">
          Cantidad de personas
        </span>
        <input
          type="number"
          min="1"
          max="20"
          className={inputClass}
          value={attendees}
          onChange={(e) => setAttendees(parseInt(e.target.value, 10) || 1)}
          aria-label="Cantidad de personas"
        />
      </label>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-md bg-[var(--color-purple-deep)] text-white font-medium hover:opacity-90"
      >
        Enviar por WhatsApp
      </button>
    </form>
  );
}
