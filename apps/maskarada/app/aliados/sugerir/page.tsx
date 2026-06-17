"use client";

import { useState } from "react";
import Link from "next/link";

const SCOPES = [
  { v: "py", label: "🇵🇾 Paraguay" },
  { v: "latam", label: "🌎 LATAM" },
  { v: "international", label: "🌍 Internacional" },
] as const;

const CATEGORIES = [
  { v: "lgtbi_org", label: "🏳️‍🌈 LGTBI+ / Derechos" },
  { v: "sex_positive", label: "📚 Sexo-positivo / educación" },
  { v: "kink_org", label: "🎭 Kink / Leather" },
  { v: "wellness", label: "🌱 Bienestar / Salud" },
  { v: "craft", label: "🧵 Artesanía" },
  { v: "media", label: "📰 Medios / Prensa" },
  { v: "venue", label: "🏛️ Espacios / Sedes" },
  { v: "other", label: "✨ Otro" },
] as const;

export default function SugerirAliado() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<typeof CATEGORIES[number]["v"]>("lgtbi_org");
  const [scope, setScope] = useState<typeof SCOPES[number]["v"]>("py");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("PY");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [relationship, setRelationship] = useState("");
  const [yourName, setYourName] = useState("");
  const [yourContact, setYourContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!name.trim() || name.length < 2) {
      setErrorMsg("El nombre de la org/colectivo es requerido.");
      return;
    }
    if (description.length < 20) {
      setErrorMsg("La descripción debe tener al menos 20 caracteres.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/aliados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        category,
        scope,
        city: city.trim() || undefined,
        country: country.trim() || undefined,
        description: description.trim(),
        website: website.trim() || undefined,
        instagram: instagram.trim() || undefined,
        relationship: relationship.trim() || undefined,
        submitter_name: yourName.trim() || undefined,
        submitter_contact: yourContact.trim() || undefined,
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
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-white mb-3">Gracias</h1>
            <p className="text-gray-300 leading-relaxed mb-6">
              Sugeriste un aliado. El equipo lo revisa — normalmente en 1-2 días. Si tenés info adicional (links, contacto), podés mandarnosla por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/aliados" className="border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all">
                Ver aliados
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
          <div className="text-5xl mb-4">🤝</div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            Sumá un aliado
          </h1>
          <p className="text-gray-300 leading-relaxed">
            Conocés una organización, colectivo, profesional, o comunidad que debería estar en <Link href="/aliados" className="text-gold-400 hover:text-gold-300">/aliados</Link>? Sugerila. El equipo revisa y, si encaja, la agregamos con tu crédito como sugerente.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02] space-y-4">
            <h2 className="text-sm uppercase tracking-widest text-gold-400">El aliado</h2>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Nombre *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="ej. Fundación X, Colectivo Y, Persona Z"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Categoría</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                >
                  {CATEGORIES.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Alcance</label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value as any)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                >
                  {SCOPES.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Ciudad</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="ej. Asunción"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">País (código)</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value.toUpperCase().slice(0, 2))}
                  placeholder="PY"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Descripción (20-500 chars) *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                placeholder="¿Qué hacen? ¿Por qué son relevantes para maškaráda?"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60 resize-y"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">{description.length} / 500</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Instagram (sin @)</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="cuenta"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Relación con maškaráda (opcional)</label>
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="ej. cross-promotion, shared audience, kindred community"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
              />
            </div>
          </div>

          <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02] space-y-4">
            <h2 className="text-sm uppercase tracking-widest text-gold-400">Tu crédito (opcional)</h2>
            <p className="text-xs text-gray-400">Si querés que aparezca tu nombre como quien lo sugirió.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Tu nombre</label>
                <input
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Contacto (email/WhatsApp)</label>
                <input
                  type="text"
                  value={yourContact}
                  onChange={(e) => setYourContact(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
                />
              </div>
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
              {loading ? "Enviando..." : "Sugerir aliado"}
            </button>
            <Link href="/aliados" className="text-gray-500 hover:text-white text-sm uppercase tracking-widest">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
