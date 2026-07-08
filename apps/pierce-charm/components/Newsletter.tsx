"use client";

import { useState } from "react";
import { whatsappUrl } from "@/lib/site-config";

interface Props {
  phone?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}

export function Newsletter({ phone = "595981324569", title, subtitle, ctaLabel }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !email.trim()) {
      // fallback to WhatsApp
      window.open(
        whatsappUrl(phone, "Hola! Quiero anotarme a la lista de novedades de Pierce Charm."),
        "_blank"
      );
      return;
    }
    setSubmitting(true);
    // No backend yet. Open WhatsApp with the data pre-filled
    const msg = `Hola! Quiero anotarme a la lista de novedades de Pierce Charm.

${name ? `Nombre: ${name}` : ""}
${email ? `Email: ${email}` : ""}

Manténganme al tanto de:
- Nuevas piezas de joyería
- Eventos próximos
- Promociones especiales

Gracias!`;

    setTimeout(() => {
      window.open(whatsappUrl(phone, msg), "_blank");
      setSubmitting(false);
      setDone(true);
      setName("");
      setEmail("");
    }, 400);
  };

  if (done) {
    return (
      <div className="text-center max-w-md mx-auto p-6 border border-[var(--color-gold)] bg-[var(--color-surface)]">
        <p className="font-[var(--font-script)] text-[var(--color-gold)] text-[1.5rem] leading-none">
          ¡Anotada!
        </p>
        <p className="text-[var(--color-foreground)]/85 text-[0.92rem] mt-2">
          Te avisamos por WhatsApp cuando haya novedades. Sin spam, palabra de alternativa.
        </p>
        <button
          onClick={() => setDone(false)}
          className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] underline mt-3"
        >
          Anotar a otra persona
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-3"
      aria-label="Suscripción a la lista de novedades"
    >
      <p className="text-[var(--color-foreground)]/85 text-[0.92rem]">
        {subtitle || "Una vez al mes: nuevas piezas, eventos próximos, historias del estudio. Sin spam, palabra de alternativa."}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Nombre (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
        <input
          type="email"
          placeholder="Email (opcional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn-gothic tap w-full justify-center"
      >
        {submitting ? "Enviando…" : ctaLabel || "Sumate por WhatsApp"}
      </button>
      <p className="text-[0.7rem] text-[var(--color-muted-foreground)] text-center">
        Te contactamos por WhatsApp o email según prefieras. Nunca pasamos tus datos a terceros.
      </p>
    </form>
  );
}
