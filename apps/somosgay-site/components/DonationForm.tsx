"use client";

import { useMemo, useState } from "react";
import Script from "next/script";

// Donation preset amounts in Guaraníes (primary), with USD approximate equivalents
// converted at typical 7000 Gs = 1 USD reference. Amounts chosen because:
//   - 100.000 Gs ≈ $14 → covers 1 HIV test kit + supplies
//   - 250.000 Gs ≈ $36 → covers 1 full PrEP consultation (medication + visit)
//   - 500.000 Gs ≈ $71 → 3+ PrEP consultations
//   - 1.000.000 Gs ≈ $143 → covers 1 month of anonymous HIV testing for the week
//   - 3.000.000 Gs ≈ $430 → ~1 month of a staff position
const PRESETS = [
  { gs: 100000, label: "1 test de VIH" },
  { gs: 250000, label: "1 consulta PrEP completa" },
  { gs: 500000, label: "3 consultas PrEP" },
  { gs: 1000000, label: "1 semana de testeo anónimo" },
  { gs: 3000000, label: "1 mes de personal" },
];

type Frequency = "unique" | "monthly";

/**
 * Donation form — presets + recurring + tribute + WhatsApp submit.
 *
 * Why WhatsApp for submit: SOP of SOMOSGAY — Paloma (the coordinator) confirms
 * donations via WhatsApp to give receipts and answer questions. No PII stored
 * in our infra.
 *
 * No Stripe integration yet — listed as a future enhancement. The form
 * generates a WhatsApp deep-link with all selection data pre-filled.
 */
export function DonationForm() {
  const [selected, setSelected] = useState<number>(500000);
  const [custom, setCustom] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("unique");
  const [tributeName, setTributeName] = useState<string>("");
  const [tributeNote, setTributeNote] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const amount = useMemo(() => {
    const n = parseInt(custom.replace(/\D/g, ""), 10);
    if (!isNaN(n) && n > 0) return n;
    return selected;
  }, [selected, custom]);

  const usd = useMemo(() => Math.round(amount / 7000), [amount]);

  function buildWaMessage() {
    const lines = [
      `Hola SOMOSGAY, quiero ${frequency === "monthly" ? "una donación MENSUAL" : "una donación única"}.`,
      ``,
      `• Monto: ${amount.toLocaleString("es-PY")} Gs (~USD $${usd})`,
      `• Modalidad: ${frequency === "monthly" ? "Mensual" : "Única"}`,
      tributeName ? `• En honor/memoria de: ${tributeName}` : null,
      tributeNote ? `• Nota del tributo: ${tributeNote}` : null,
      name ? `• Mi nombre: ${name}` : null,
      email ? `• Mi email (para recibo): ${email}` : null,
      ``,
      `Por favor confirmá los datos para finalizar.`,
    ].filter(Boolean);
    return lines.join("\n");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "595986173200";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(buildWaMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "block w-full rounded-md border border-[var(--color-warm-deep)] bg-surface px-3 py-2 text-sm text-text focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20";

  return (
    <form
      onSubmit={submit}
      className="bg-surface border-2 border-[var(--color-primary)] rounded-2xl p-6 lg:p-8 space-y-6"
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs uppercase tracking-wider text-text-muted font-medium">
            Elegí un monto
          </span>
          <span className="ml-auto inline-flex rounded-full bg-warm border border-[var(--color-warm-deep)] p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setFrequency("unique")}
              aria-pressed={frequency === "unique"}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                frequency === "unique"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-text-light"
              }`}
            >
              Única
            </button>
            <button
              type="button"
              onClick={() => setFrequency("monthly")}
              aria-pressed={frequency === "monthly"}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                frequency === "monthly"
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-text-light"
              }`}
            >
              Mensual
            </button>
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {PRESETS.map((p) => {
            const active = selected === p.gs && !custom;
            return (
              <button
                key={p.gs}
                type="button"
                onClick={() => {
                  setSelected(p.gs);
                  setCustom("");
                }}
                aria-pressed={active}
                aria-label={`Donar ${(p.gs / 1000).toLocaleString("es-PY")} mil guaraníes — ${p.label}`}
                className="preset-card"
              >
                <span className="preset-card__amount">{(p.gs / 1000).toLocaleString("es-PY")}k Gs</span>
                <span className="preset-card__label">{p.label}</span>
              </button>
            );
          })}
        </div>
        <label className="block">
          <span className="block text-xs font-medium text-text mb-1">
            O ingresá otro monto en Guaraníes
          </span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={inputClass}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Ej: 750.000"
            aria-label="Monto personalizado en Guaraníes"
          />
        </label>
        <div className="mt-3 bg-warm rounded-lg p-3 flex items-baseline justify-between">
          <span className="text-sm text-text-light">Donación total:</span>
          <span className="font-display text-2xl font-bold text-[var(--color-primary)]">
            {amount.toLocaleString("es-PY")} Gs
          </span>
          <span className="text-xs text-text-muted">~USD ${usd}</span>
        </div>
      </div>

      <details className="bg-warm border border-[var(--color-warm-deep)] rounded-xl p-4">
        <summary className="cursor-pointer text-sm font-medium text-text list-none [&::-webkit-details-marker]:hidden flex items-center justify-between">
          <span>🌹 Donar en honor o memoria de alguien</span>
          <span className="text-xs text-text-muted">opcional</span>
        </summary>
        <div className="mt-3 space-y-3">
          <label className="block">
            <span className="block text-xs font-medium text-text mb-1">Nombre de la persona</span>
            <input
              type="text"
              className={inputClass}
              value={tributeName}
              onChange={(e) => setTributeName(e.target.value)}
              placeholder="A quien querés honrar"
              maxLength={120}
            />
          </label>
          <label className="block">
            <span className="block text-xs font-medium text-text mb-1">
              Mensaje o dedicatoria{" "}
              <span className="text-text-muted font-normal">(opcional)</span>
            </span>
            <textarea
              className={inputClass + " min-h-[60px] resize-y"}
              value={tributeNote}
              onChange={(e) => setTributeNote(e.target.value)}
              maxLength={300}
              placeholder='Ej: "en memoria de mi amigo Juan, integrante de la comunidad"'
            />
          </label>
        </div>
      </details>

      <details className="bg-warm border border-[var(--color-warm-deep)] rounded-xl p-4">
        <summary className="cursor-pointer text-sm font-medium text-text list-none [&::-webkit-details-marker]:hidden flex items-center justify-between">
          <span>📨 Recibí un comprobante de la donación</span>
          <span className="text-xs text-text-muted">opcional pero recomendado</span>
        </summary>
        <div className="mt-3 space-y-3">
          <label className="block">
            <span className="block text-xs font-medium text-text mb-1">Tu nombre</span>
            <input
              type="text"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={120}
            />
          </label>
          <label className="block">
            <span className="block text-xs font-medium text-text mb-1">
              Tu email <span className="text-text-muted font-normal">(sólo para el recibo)</span>
            </span>
            <input
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
          </label>
          <p className="text-xs text-text-muted leading-relaxed">
            Tu email va directo al WhatsApp de SOMOSGAY — no se guarda en ningún servidor
            nuestro. Sólo lo usamos para enviarte un comprobante simple y agradecerte.
          </p>
        </div>
      </details>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#25D366] hover:bg-[#1DA851] text-white font-medium transition-colors"
      >
        <span>Enviar donación por WhatsApp</span>
        <span aria-hidden="true">→</span>
      </button>

      <p className="text-xs text-text-muted leading-relaxed text-center">
        Confirmás con Paloma y elegís cómo transferir (transferencia bancaria, Tigo Money,
        SIPAP o internacional). Verificá nuestros datos en{" "}
        <a href="/auditoria" className="text-[var(--color-primary)] underline">
          /auditoria
        </a>
        .
      </p>
    </form>
  );
}
