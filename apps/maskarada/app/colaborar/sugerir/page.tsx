"use client";

import { useState } from "react";
import Link from "next/link";

const KINDS = [
  { v: "ally_missing", label: "🤝 Aliado que falta (org/colectivo/comunidad)" },
  { v: "vendor_missing", label: "🛍️ Vendedor que falta (categoría de producto/servicio)" },
  { v: "space_missing", label: "🏛️ Espacio que falta (venue, sede, sala)" },
  { v: "role_missing", label: "🧑‍🤝‍🧑 Rol que falta (función comunitaria)" },
  { v: "event_idea", label: "💡 Idea de evento por probar" },
] as const;

export default function SugerirColaborar() {
  const [kind, setKind] = useState<typeof KINDS[number]["v"]>("ally_missing");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!title.trim() || title.length < 5) {
      setErrorMsg("El título es requerido (mínimo 5 chars).");
      return;
    }
    if (description.length < 20) {
      setErrorMsg("La descripción debe tener al menos 20 caracteres.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/colaborar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind,
        title: title.trim(),
        description: description.trim(),
        contact_optional: contact.trim() || null,
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error || "Error. Intentá de nuevo.");
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="border border-gold-400/30 rounded-xl p-8 bg-gold-400/5 text-center">
            <div className="text-5xl mb-4">💡</div>
            <h1 className="text-3xl font-bold text-white mb-3">Anotado</h1>
            <p className="text-gray-300 leading-relaxed mb-6">
              Lo agregamos a <Link href="/colaborar" className="text-gold-400 hover:text-gold-300">/colaborar</Link>. Si alguien quiere tomarlo, te avisamos (o avísanos vos).
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/colaborar" className="border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all">
                Ver la lista
              </Link>
              <Link href="/" className="text-gray-500 hover:text-white text-sm uppercase tracking-widest">
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
          <div className="text-5xl mb-4">💡</div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            Sumá una necesidad
          </h1>
          <p className="text-gray-300 leading-relaxed">
            Falta algo que no está en <Link href="/colaborar" className="text-gold-400 hover:text-gold-300">/colaborar</Link>? Sumalo. Si te interesa cubrirlo, dejá tu contacto en la descripción — el equipo te contacta.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02] space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Tipo *</label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as any)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              >
                {KINDS.map((k) => <option key={k.v} value={k.v}>{k.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Título corto *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="ej. Leather crafter en Paraguay"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Descripción (20-1000 chars) *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder="¿Qué falta exactamente? ¿Por qué la comunidad lo necesita? Si te interesa tomarlo, dejá tu contacto acá mismo."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60 resize-y"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">{description.length} / 1000</div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Tu contacto (opcional)</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Si querés ser vos quien lo cubra — WhatsApp, email, o lo que sea"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="border border-red-500/30 rounded-lg p-3 bg-red-500/5 text-sm text-red-300">{errorMsg}</div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blood-500 hover:bg-blood-600 disabled:opacity-50 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
            >
              {loading ? "Enviando..." : "Sumar a la lista"}
            </button>
            <Link href="/colaborar" className="text-gray-500 hover:text-white text-sm uppercase tracking-widest">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
