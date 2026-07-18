"use client";

import { useState } from "react";
import { whatsappUrl } from "@/lib/site-config";

interface Props {
  phone?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  source?: string;
}

type Status = "idle" | "submitting" | "ok" | "error" | "whatsapp";

export function Newsletter({ phone = "595981324569", subtitle, ctaLabel, source = "site" }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!validEmail) return;
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          source,
          consent: true,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("ok");
        setEmail("");
        setName("");
      } else {
        setErrorMsg(json?.error || "No pudimos anotarte. Probá de nuevo.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error de red");
      setStatus("error");
    }
  }

  function submitWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    setStatus("whatsapp");
    const msg = `Hola! Quiero anotarme a la lista de novedades de Pierce Charm.${name ? `\nNombre: ${name}` : ""}${email ? `\nEmail: ${email}` : ""}\n\nManténganme al tanto de:\n- Nuevas piezas de joyería\n- Eventos próximos\n- Promociones especiales\n\nGracias!`;
    setTimeout(() => {
      window.open(whatsappUrl(phone, msg), "_blank", "noopener,noreferrer");
    }, 200);
  }

  // Success state — email
  if (status === "ok") {
    return (
      <div className="text-center max-w-md mx-auto p-6 border border-[var(--color-gold)] bg-[var(--color-surface)]">
        <p className="font-[var(--font-script)] text-[var(--color-gold)] text-[1.5rem] leading-none">
          ¡Anotada!
        </p>
        <p className="text-[var(--color-foreground)]/85 text-[0.92rem] mt-2">
          Te llega un mail de bienvenida y novedades una vez por mes. Sin spam, palabra de alternativa.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] underline mt-3"
        >
          Anotar otro email
        </button>
      </div>
    );
  }

  // Success state — WhatsApp
  if (status === "whatsapp") {
    return (
      <div className="text-center max-w-md mx-auto p-6 border border-[var(--color-gold)] bg-[var(--color-surface)]">
        <p className="font-[var(--font-script)] text-[var(--color-gold)] text-[1.5rem] leading-none">
          ¡Te llevamos a WhatsApp!
        </p>
        <p className="text-[var(--color-foreground)]/85 text-[0.92rem] mt-2">
          Luana te anota a la lista desde allá. Decile qué te interesa.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] underline mt-3"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={validEmail ? submitEmail : submitWhatsApp}
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
          autoComplete="name"
          className="px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gothic tap w-full justify-center"
      >
        {status === "submitting"
          ? "Enviando…"
          : validEmail
            ? ctaLabel || "Sumate por email"
            : "Sumate por WhatsApp"}
      </button>
      <p className="text-[0.7rem] text-[var(--color-muted-foreground)] text-center">
        Email → te llega un mail mensual. WhatsApp → Luana te anota a la lista. Nunca pasamos tus datos.
      </p>
      {status === "error" && errorMsg && (
        <p
          role="alert"
          className="text-[0.78rem] text-center border border-[var(--color-error,#c0392b)] text-[var(--color-error,#c0392b)] py-2"
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}