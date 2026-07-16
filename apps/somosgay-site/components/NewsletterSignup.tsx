"use client";

import { useState } from "react";

/**
 * Newsletter signup — UI-only, finishes via WhatsApp deep-link.
 *
 * Why no Resend/Brevo integration yet: Paloma runs the org from WhatsApp,
 * not a CRM. Connecting Resend requires API keys + DNS that the org may
 * not own. Until Resend is set up, the form opens WhatsApp with the
 * subscription request pre-filled. When Resend is ready, replace the
 * `submit()` body — the rest of the UI stays.
 *
 * OPSEC-conscious: no analytics, no third-party scripts, state stays
 * client-side.
 */
export function NewsletterSignup({
  title = "Suscribite a las noticias de SOMOSGAY",
  description,
}: {
  title?: string;
  description?: string;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !consent) return;
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "595986173200";
    const msg = [
      "Hola SOMOSGAY, quiero suscribirme a sus noticias/comunicados.",
      ``,
      email ? `• Email: ${email}` : null,
      name ? `• Nombre: ${name}` : null,
      ``,
      "Enviaré información importante sin spam. Gracias.",
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "block w-full rounded-md border border-[var(--color-warm-deep)] bg-surface px-3 py-2 text-sm text-text focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20";

  return (
    <form
      onSubmit={submit}
      className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 space-y-4"
    >
      <div>
        <h3 className="font-display text-lg font-bold mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-text-light mb-4">{description}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="text"
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre (opcional)"
          maxLength={120}
          aria-label="Tu nombre"
        />
        <input
          type="email"
          required
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          aria-label="Tu email"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 accent-[var(--color-primary)]"
        />
        <span className="text-xs text-text-light">
          Acepto recibir comunicados de SOMOSGAY. No usamos esta información
          para nada más. Podemos darte de baja cuando lo pedás.
        </span>
      </label>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
      >
        Suscribirme
      </button>

      <p className="text-xs text-text-muted leading-relaxed">
        Tu email va directo a WhatsApp de SOMOSGAY — no pasa por ningún servidor de
        terceros, ni Mailchimp, ni Google Forms. Si Resend se conecta más adelante,
        este flujo se conecta automáticamente.
      </p>
    </form>
  );
}
