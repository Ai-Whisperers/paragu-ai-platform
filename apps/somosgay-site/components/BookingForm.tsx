"use client";

import { useState } from "react";

/**
 * Booking form for Clínica Kunu'u.
 *
 * Submits via WhatsApp deep-link (wa.me) with the user's selected service,
 * preferred day, time, and a free-text note pre-filled into the message.
 *
 * This is intentionally a "lite" form:
 *   - No backend (we'd rather not store PHI ourselves).
 *   - All fields stay client-side until the WA deep-link opens.
 *   - Paloma sees the message in WhatsApp and replies to confirm.
 *
 * Trade-off: less polished than a Calendly embed, but:
 *   - No PHI on our infra
 *   - Reuses the WhatsApp channel Paloma already triages from
 *   - Works without auth, calendar sync, or external API keys
 */
export function BookingForm() {
  const [service, setService] = useState("Testeo de VIH");
  const [day, setDay] = useState("Lunes");
  const [time, setTime] = useState("13:00 – 14:00");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  function buildWaMessage() {
    const lines = [
      `Hola SOMOSGAY, quiero reservar un turno en Clínica Kunu'u.`,
      ``,
      `• Servicio: ${service}`,
      `• Día preferido: ${day}`,
      `• Horario preferido: ${time}`,
      name ? `• Nombre: ${name}` : null,
      note ? `• Nota: ${note}` : null,
      ``,
      `Gracias.`,
    ].filter(Boolean);
    return lines.join("\n");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Phone number is baked in at build time via NEXT_PUBLIC_WHATSAPP_NUMBER
    // (set in .env.local or CI env). Fallback to documented Paraguayan clinic line.
    const phone =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "595986173200";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(buildWaMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "block w-full rounded-md border border-[var(--color-warm-deep)] bg-surface px-3 py-2 text-sm text-text focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20";

  return (
    <form onSubmit={submit} className="bg-surface rounded-xl border border-[var(--color-warm-deep)] p-6 space-y-4 max-w-xl">
      <div className="text-xs uppercase tracking-wider text-text-muted">
        Reservá tu turno
      </div>
      <p className="text-sm text-text-light -mt-2">
        Completá tus preferencias. Al enviar, te llevamos a WhatsApp con todo
        pre-cargado para que Paloma (la coordinadora) confirme tu turno.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-xs font-medium text-text mb-1">Servicio</span>
          <select
            className={inputClass}
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option>Testeo de VIH</option>
            <option>Testeo de sífilis</option>
            <option>Testeo de Hepatitis B</option>
            <option>PrEP (consulta inicial)</option>
            <option>Atención psicológica</option>
            <option>Atención psiquiátrica</option>
            <option>Reducción de daños</option>
          </select>
        </label>

        <label className="block">
          <span className="block text-xs font-medium text-text mb-1">Día preferido</span>
          <select
            className={inputClass}
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option>Lunes</option>
            <option>Martes</option>
            <option>Miércoles</option>
            <option>Jueves</option>
            <option>Viernes</option>
            <option>Sábado (autotest)</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="block text-xs font-medium text-text mb-1">Horario preferido</span>
        <select
          className={inputClass}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option>13:00 – 14:00</option>
          <option>14:00 – 15:00</option>
          <option>15:00 – 16:00</option>
          <option>16:00 – 17:00</option>
          <option>Cualquier horario del día</option>
        </select>
      </label>

      <label className="block">
        <span className="block text-xs font-medium text-text mb-1">
          Cómo querés que te llamemos <span className="text-text-muted font-normal">(opcional)</span>
        </span>
        <input
          type="text"
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alias o nombre"
          maxLength={80}
        />
      </label>

      <label className="block">
        <span className="block text-xs font-medium text-text mb-1">
          Algo que quieras avisarnos <span className="text-text-muted font-normal">(opcional)</span>
        </span>
        <textarea
          className={inputClass + " min-h-[80px] resize-y"}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Por ejemplo: vengo por primera vez, tengo una pregunta sobre PrEP, etc."
          maxLength={500}
        />
      </label>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#25D366] hover:bg-[#1DA851] text-white font-medium transition-colors"
        >
          Enviar por WhatsApp
        </button>
        <a
          href="tel:+595986173200"
          className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-warm-deep)] bg-warm text-text hover:bg-warm-deep"
        >
          O llamanos: +595 986 173 200
        </a>
      </div>

      <p className="text-xs text-text-muted leading-relaxed">
        🔒 Tu información va directo al WhatsApp de SOMOSGAY — no se guarda en
        ningún servidor nuestro. Si preferís llamarnos directamente, hacelo con
        confianza.
      </p>
    </form>
  );
}