"use client";

import { useState } from "react";
import Link from "next/link";
import { content } from "@/lib/content";

const CONSENT_TEXT =
  "Acepto que mi testimonio sea publicado en el sitio web de Club maškaráda y en sus redes sociales. Puedo pedir su eliminación en cualquier momento escribiéndo a hola@maskarada.com.";

export default function TestimoniosNuevo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [body, setBody] = useState("");
  const [context, setContext] = useState("");
  const [role, setRole] = useState("");
  const [displayMode, setDisplayMode] = useState<"attributed" | "anonymous" | "first_name">("attributed");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!consent) {
      setErrorMsg("Necesitamos tu consentimiento para publicar el testimonio.");
      return;
    }
    if (body.trim().length < 20) {
      setErrorMsg("El testimonio debe tener al menos 20 caracteres.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submitter_name: name,
        submitter_email: email || undefined,
        submitter_phone: phone || undefined,
        display_mode: displayMode,
        body,
        context: context || undefined,
        role: role || undefined,
        consent_text: CONSENT_TEXT,
        consent_scope: "public_website",
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error || "No pudimos guardar. Intentá de nuevo.");
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="border border-gold-400/30 rounded-xl p-8 bg-gold-400/5 text-center">
            <div className="text-5xl mb-4">🎭</div>
            <h1 className="text-3xl font-bold text-white mb-3">Gracias</h1>
            <p className="text-gray-300 leading-relaxed mb-6">
              Tu testimonio quedó guardado. Lo revisa el equipo antes de publicarlo — normalmente en 1-2 días. Si en algún momento querés que lo retiremos, escribinos por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/testimonios"
                className="border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
              >
                Ver testimonios
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-white text-sm uppercase tracking-widest"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <div className="text-5xl mb-4">🪶</div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            Contanos tu experiencia
          </h1>
          <p className="text-gray-300 leading-relaxed">
            Si asististe a un evento, munch, o taller de maškaráda — y querés compartir cómo fue — este es el lugar. El equipo revisa cada testimonio antes de publicarlo. Puede ser con tu nombre, sólo tu primer nombre, o anónimo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name + contact */}
          <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02] space-y-4">
            <h2 className="text-sm uppercase tracking-widest text-gold-400">Tu nombre (cómo firmás)</h2>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="ej. Juan, María, o tu seudónimo de la comunidad"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Email (opcional, privado)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Para avisarte si publicamos"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">WhatsApp (opcional, privado)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+595 9XX XXXXXX"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
                />
              </div>
            </div>
          </div>

          {/* Display mode */}
          <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
            <h2 className="text-sm uppercase tracking-widest text-gold-400 mb-3">Cómo firmamos tu testimonio</h2>
            <div className="space-y-2">
              {[
                { v: "attributed", label: "Con tu nombre completo", desc: '"Lo que más me llevó fue... — Juan Pérez"' },
                { v: "first_name", label: "Sólo tu primer nombre", desc: '"Me fui sintiéndome en casa. — Juan"' },
                { v: "anonymous", label: "Anónimo", desc: '"Me fui sintiéndome en casa."' },
              ].map((opt) => (
                <label key={opt.v} className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  displayMode === opt.v ? "bg-gold-400/10 border border-gold-400/30" : "hover:bg-white/[0.02]"
                }`}>
                  <input
                    type="radio"
                    name="display_mode"
                    value={opt.v}
                    checked={displayMode === opt.v}
                    onChange={(e) => setDisplayMode(e.target.value as any)}
                    className="mt-1"
                  />
                  <div>
                    <div className="text-sm text-white font-medium">{opt.label}</div>
                    <div className="text-xs text-gray-500">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Testimonial body */}
          <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02] space-y-4">
            <h2 className="text-sm uppercase tracking-widest text-gold-400">Tu testimonio</h2>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Contexto (opcional)</label>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="ej. Simón Dice (junio 2026), Munch de octubre, mi primera vez"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Tu rol (opcional)</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="ej. Switch, 3 años en kink, primera vez en munch"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">El testimonio (20-2000 caracteres)</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={8}
                placeholder="¿Cómo fue? ¿Qué te llevaste? ¿Algo que cambió cómo pensabas el kink o la comunidad?"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60 resize-y"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {body.length} / 2000
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
              />
              <div>
                <div className="text-sm text-white font-medium mb-1">
                  Acepto que mi testimonio sea publicado
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {CONSENT_TEXT}
                </p>
              </div>
            </label>
          </div>

          {errorMsg && (
            <div className="border border-red-500/30 rounded-lg p-3 bg-red-500/5 text-sm text-red-300">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blood-500 hover:bg-blood-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
            >
              {loading ? "Enviando..." : "Enviar testimonio"}
            </button>
            <Link
              href="/"
              className="text-gray-500 hover:text-white text-sm uppercase tracking-widest"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
