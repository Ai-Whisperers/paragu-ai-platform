"use client";

import { useState } from "react";

const EVENTS = [
  { value: "2026-06-11-simondice", label: "11 de junio, 2026 — Edición 'Simón Dice'" },
  { value: "2025-xx-xx-prior", label: "Edición anterior (antes de 2026)" },
  { value: "future", label: "Próxima edición (fecha a confirmar)" },
];

const SCOPES = [
  { value: "public_website", label: "Sitio web público (maskarada.paragu-ai.com)", default: true },
  { value: "social_media", label: "Redes sociales (Instagram, Facebook, etc.)" },
  { value: "internal_only", label: "Solo uso interno (no publicar)" },
] as const;

export default function ConsentPage() {
  const [eventId, setEventId] = useState(EVENTS[0].value);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [scopes, setScopes] = useState<Record<string, boolean>>({
    public_website: true,
    social_media: false,
    internal_only: false,
  });
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Tu nombre es obligatorio");
      return;
    }
    if (!acknowledged) {
      setErrorMsg("Necesitamos tu confirmación para continuar");
      return;
    }
    const selectedScopes = (Object.keys(scopes) as Array<keyof typeof scopes>).filter(
      (k) => scopes[k]
    );
    if (selectedScopes.length === 0) {
      setErrorMsg("Seleccioná al menos un alcance de uso");
      return;
    }

    setSubmitting(true);
    try {
      const { recordPhotoConsent } = await import("@/lib/photo-consent");
      // For simplicity, record one consent per scope. The admin can see
      // them grouped by event + signer. (Could also be one row with
      // scope[] — depends on the Supabase schema eventually used.)
      let allOk = true;
      let lastError: string | undefined;
      for (const scope of selectedScopes) {
        const res = await recordPhotoConsent({
          event_id: eventId,
          signer_name: name.trim(),
          signer_email: email.trim() || undefined,
          signer_phone: phone.trim() || undefined,
          scope: scope as "public_website" | "social_media" | "internal_only",
          notes: "Consent collected at event",
        });
        if (!res.ok) {
          allOk = false;
          lastError = res.error;
        }
      }
      if (!allOk) {
        setErrorMsg(`Error al guardar: ${lastError}`);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setErrorMsg(`Error inesperado: ${(err as Error).message}`);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-2xl mx-auto text-center bg-white/5 border border-white/10 rounded-xl p-8">
          <span className="text-5xl block mb-4">✅</span>
          <h1 className="text-2xl font-bold text-white mb-3">Consentimiento registrado</h1>
          <p className="text-gray-300 mb-2">Gracias, {name}.</p>
          <p className="text-gray-400 text-sm mb-6">
            Tu consentimiento fue guardado. Si en algún momento querés revocarlo, escribinos
            a{" "}
            <a href="mailto:privacidad@clubmaskarada.com" className="text-gold-400 hover:underline">
              privacidad@clubmaskarada.com
            </a>
            .
          </p>
          <a
            href="/"
            className="inline-block border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📷</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Consentimiento de uso de imagen
          </h1>
          <p className="text-gray-400">
            maškaráda toma fotos en sus eventos para documentar la comunidad y promover futuras
            ediciones. Este formulario registra tu consentimiento para el uso de imágenes donde
            aparecés.
          </p>
        </div>

        <div className="border border-gold-400/20 rounded-xl p-4 bg-gold-400/5 text-sm text-gray-400 mb-6">
          <p className="font-semibold text-gold-400 mb-1">Tu privacidad</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>Podés revocar este consentimiento en cualquier momento escribiéndonos.</li>
            <li>Las imágenes no se venden ni se usan para fines comerciales de terceros.</li>
            <li>Si elegís "no publicar", tus fotos no aparecerán en el sitio ni en redes.</li>
            <li>El equipo revisa y descarta fotos donde aparezcas en situaciones vulnerables.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white/[0.02] border border-white/5 rounded-xl p-6">
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">
              Evento
            </label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60"
            >
              {EVENTS.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">
              Tu nombre *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20"
              placeholder="Nombre completo"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60"
                placeholder="opcional"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">
                Teléfono
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60"
                placeholder="opcional"
              />
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
              Autorizo el uso de mi imagen en: *
            </p>
            <div className="space-y-2">
              {SCOPES.map((s) => (
                <label
                  key={s.value}
                  className="flex items-start gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:border-gold-400/30 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={scopes[s.value]}
                    onChange={(e) => setScopes({ ...scopes, [s.value]: e.target.checked })}
                    className="mt-0.5 accent-gold-400"
                  />
                  <span className="text-sm text-gray-300">{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-1 accent-gold-400"
              />
              <span className="text-sm text-gray-300 leading-relaxed">
                Confirmo que he leído esta autorización. Entiendo que puedo revocarla en
                cualquier momento. La revocación no afecta imágenes ya publicadas previamente
                a la solicitud.
              </span>
            </label>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-sm text-red-300">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-6 bg-blood-500 hover:bg-blood-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all text-sm uppercase tracking-wider"
          >
            {submitting ? "Registrando..." : "Firmar consentimiento"}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          ¿Dudas sobre el consentimiento? Escribinos a{" "}
          <a
            href="mailto:privacidad@clubmaskarada.com"
            className="text-gold-400 hover:text-white underline"
          >
            privacidad@clubmaskarada.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
