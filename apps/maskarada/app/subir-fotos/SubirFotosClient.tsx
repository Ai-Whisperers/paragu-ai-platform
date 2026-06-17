"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface EventOption {
  slug: string;
  label: string;
}

const COPY = {
  es: {
    title: "Subí tus fotos del evento",
    intro: "Compartinos las fotos que sacaste en un evento de maškaráda. Las revisamos y, si están buenas, las publicamos en la galería del evento (sin mostrar tu cara si la foto no es de paisaje).",
    eventLabel: "¿De qué evento? *",
    eventHelp: "Elegí el evento. Si no está en la lista, escribinos por WhatsApp.",
    nameLabel: "Tu nombre *",
    emailLabel: "Email (opcional, privado)",
    whatsappLabel: "WhatsApp (opcional, privado)",
    sourceLabel: "Link a la carpeta con las fotos *",
    sourceHelp: "Tiene que ser público. Cómo hacerlo: abrí la carpeta en Google Drive / Dropbox / OneDrive, click en \"Compartir\", \"Cualquier persona con el link\". Pegá el link acá.",
    photoCountLabel: "Aprox. cuántas fotos",
    contextLabel: "Contexto (opcional)",
    contextPlaceholder: "ej. fotos de la zona de cuerdas, del patio, performance principal, aftercare…",
    consentText: "Confirmo que las fotos son mías o tengo permiso para compartirlas. Acepto que el equipo las revise y publique las que considere, sin obligación de publicar todas.",
    submit: "Enviar fotos",
    success: "Recibimos el link. El equipo descarga, revisa, y publica las fotos en los próximos días. Si te contactamos por WhatsApp es porque necesitamos datos de alguna foto.",
    eventOptions: [
      { slug: "2026-06-11-simondice", label: "Simón Dice (junio 2026)" },
      { slug: "2025-12-12-mascaranegra", label: "Máscara Negra (diciembre 2025)" },
      { slug: "2025-09-06-nocheoscura", label: "Noche Oscura (septiembre 2025)" },
      { slug: "2025-06-14-inauguracion", label: "Inauguración (junio 2025)" },
      { slug: "2026-09-19-maskarada", label: "edición septiembre 2026 (próxima)" },
      { slug: "other", label: "Otro evento / no estoy seguro" },
    ] as EventOption[],
  },
};

export default function SubirFotosClient({ eventSlug: forcedSlug }: { eventSlug?: string }) {
  const c = COPY.es;
  const [eventSlug, setEventSlug] = useState(forcedSlug || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [photoCount, setPhotoCount] = useState("");
  const [context, setContext] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (forcedSlug) setEventSlug(forcedSlug);
  }, [forcedSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!consent) {
      setErrorMsg("Necesitamos tu consentimiento para revisar las fotos.");
      return;
    }
    if (!sourceUrl.match(/^https?:\/\//i)) {
      setErrorMsg("El link tiene que empezar con http:// o https://");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/photos/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_slug: eventSlug,
        submitter_name: name,
        submitter_email: email || undefined,
        submitter_whatsapp: whatsapp || undefined,
        source_url: sourceUrl,
        photo_count_estimate: photoCount ? parseInt(photoCount, 10) : undefined,
        context: context || undefined,
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
            <div className="text-5xl mb-4">📸</div>
            <h1 className="text-3xl font-bold text-white mb-3">Recibido</h1>
            <p className="text-gray-300 leading-relaxed mb-6">{c.success}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={eventSlug ? `/galeria/${eventSlug}` : "/galeria"}
                className="border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all"
              >
                Ver galería
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
          <div className="text-5xl mb-4">📸</div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            {c.title}
          </h1>
          <p className="text-gray-300 leading-relaxed">{c.intro}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02] space-y-4">
            <h2 className="text-sm uppercase tracking-widest text-gold-400">Sobre las fotos</h2>
            <div>
              <label className="block text-xs text-gray-400 mb-1">{c.eventLabel}</label>
              {!forcedSlug ? (
                <select
                  value={eventSlug}
                  onChange={(e) => setEventSlug(e.target.value)}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="">Elegí…</option>
                  {c.eventOptions.map((o) => (
                    <option key={o.slug} value={o.slug}>{o.label}</option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-white">
                  {c.eventOptions.find((o) => o.slug === forcedSlug)?.label ?? forcedSlug}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">{c.eventHelp}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">{c.sourceLabel}</label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                required
                placeholder="https://drive.google.com/drive/folders/..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
              />
              <p className="text-xs text-gray-500 mt-1">{c.sourceHelp}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">{c.photoCountLabel}</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={photoCount}
                onChange={(e) => setPhotoCount(e.target.value)}
                placeholder="ej. 25"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">{c.contextLabel}</label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={3}
                placeholder={c.contextPlaceholder}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60 resize-y"
              />
            </div>
          </div>

          <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02] space-y-4">
            <h2 className="text-sm uppercase tracking-widest text-gold-400">Sobre vos</h2>
            <div>
              <label className="block text-xs text-gray-400 mb-1">{c.nameLabel}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">{c.emailLabel}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{c.whatsappLabel}</label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+595 9XX XXXXXX"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
                />
              </div>
            </div>
          </div>

          <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
              <div>
                <div className="text-sm text-white font-medium mb-1">Confirmo que las fotos son mías o tengo permiso para compartirlas</div>
                <p className="text-xs text-gray-400 leading-relaxed">{c.consentText}</p>
              </div>
            </label>
          </div>

          {errorMsg && (
            <div className="border border-red-500/30 rounded-lg p-3 bg-red-500/5 text-sm text-red-300">{errorMsg}</div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blood-500 hover:bg-blood-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
            >
              {loading ? "Enviando..." : c.submit}
            </button>
            <Link href="/" className="text-gray-500 hover:text-white text-sm uppercase tracking-widest">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
