"use client";

import { useEffect, useState } from "react";
import { ADMIN_PASSCODE } from "@/lib/supabase";
import {
  getPhotoSubmissions,
  updatePhotoStatus,
  type PhotoSubmission,
  type PhotoStatus,
} from "@/lib/photos";

const STATUS_LABELS: Record<PhotoStatus, { label: string; color: string; help: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", help: "Sin revisar" },
  downloading: { label: "Descargando", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", help: "El equipo está bajando las fotos" },
  curating: { label: "Curando", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", help: "Eligiendo cuáles publicar" },
  published: { label: "✓ Publicadas", color: "bg-green-500/20 text-green-400 border-green-500/30", help: "Las fotos están en la galería" },
  rejected: { label: "Rechazadas", color: "bg-red-500/20 text-red-400 border-red-500/30", help: "No se publicaron" },
  archived: { label: "Archivadas", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", help: "Cerrado sin acción" },
};

export default function AdminPhotos() {
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  const [items, setItems] = useState<PhotoSubmission[]>([]);
  const [filter, setFilter] = useState<PhotoStatus | "all">("pending");
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("mk_admin") === "true") {
      setAuthed(true);
      void loadData();
    }
  }, []);

  useEffect(() => {
    if (authed) void loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, authed]);

  async function loadData() {
    setLoading(true);
    const data = await getPhotoSubmissions(filter === "all" ? undefined : filter);
    setItems(data);
    setLoading(false);
  }

  function login() {
    if (passcode === ADMIN_PASSCODE) {
      setAuthed(true);
      setAuthError("");
      sessionStorage.setItem("mk_admin", "true");
    } else {
      setAuthError("Código incorrecto");
    }
  }

  async function setStatus(id: string, status: PhotoStatus) {
    setBusyId(id);
    await updatePhotoStatus(id, status);
    await loadData();
    setBusyId(null);
  }

  if (!authed) {
    return (
      <div className="min-h-screen py-24 px-4 flex items-center justify-center">
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">🔐 Admin · Fotos</h1>
          <p className="text-xs text-gray-500 mb-4 text-center">
            Mismo código que el admin principal.
          </p>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Código de acceso"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-gold-400/50 focus:outline-none mb-4"
          />
          {authError && <p className="text-red-400 text-sm mb-4">{authError}</p>}
          <button onClick={login} className="w-full bg-gold-400/90 hover:bg-gold-400 text-black font-bold py-3 rounded-lg transition-all">
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
          <h1 className="text-2xl font-bold text-white">📸 Submissions de fotos</h1>
          <div className="flex items-center gap-3">
            <a href="/admin" className="text-sm text-gray-400 hover:text-white transition-colors">← Admin principal</a>
            <a href="/subir-fotos" target="_blank" className="text-sm text-gold-400 hover:text-gold-300">Form público ↗</a>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {(["pending", "downloading", "curating", "published", "rejected", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-widest transition-all ${
                filter === f
                  ? "bg-blood-500 text-white"
                  : "border border-white/20 text-gray-400 hover:border-white/40"
              }`}
            >
              {f === "all" ? "Todos" : STATUS_LABELS[f].label}
            </button>
          ))}
          <button
            onClick={loadData}
            disabled={loading}
            className="ml-auto text-xs border border-white/20 text-gray-400 px-3 py-1.5 rounded hover:border-white/40"
          >
            {loading ? "..." : "Refrescar"}
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            {filter === "pending"
              ? "Sin submissions pendientes. Buen trabajo."
              : "Sin resultados para este filtro."}
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((s) => {
              const status = STATUS_LABELS[s.status];
              return (
                <div key={s.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="text-white font-medium">{s.submitter_name}</span>
                        <span className="text-gray-500 text-xs ml-2">
                          · {new Date(s.created_at).toLocaleString("es-PY")}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Evento: <code className="text-gold-400">{s.event_slug}</code>
                        {s.photo_count_estimate ? ` · ${s.photo_count_estimate} fotos` : ""}
                        {s.submitter_email ? ` · ${s.submitter_email}` : ""}
                        {s.submitter_whatsapp ? ` · ${s.submitter_whatsapp}` : ""}
                      </p>
                      <p className="text-xs text-blue-400 mt-1 break-all">
                        <a href={s.source_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {s.source_url}
                        </a>
                      </p>
                      {s.context && (
                        <p className="text-xs text-gray-400 mt-1 italic">"{s.context}"</p>
                      )}
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0 ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  {s.status === "pending" && (
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <button
                        onClick={() => setStatus(s.id, "downloading")}
                        disabled={busyId === s.id}
                        className="text-xs bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1.5 rounded"
                      >
                        Empezar a descargar
                      </button>
                      <button
                        onClick={() => setStatus(s.id, "rejected")}
                        disabled={busyId === s.id}
                        className="text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1.5 rounded"
                      >
                        Rechazar
                      </button>
                      <a
                        href={s.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 hover:text-white ml-auto"
                      >
                        Abrir link ↗
                      </a>
                    </div>
                  )}
                  {s.status === "downloading" && (
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <button
                        onClick={() => setStatus(s.id, "curating")}
                        disabled={busyId === s.id}
                        className="text-xs bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 px-3 py-1.5 rounded"
                      >
                        Empezar a curar
                      </button>
                      <button
                        onClick={() => setStatus(s.id, "rejected")}
                        disabled={busyId === s.id}
                        className="text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1.5 rounded"
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                  {s.status === "curating" && (
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <button
                        onClick={() => setStatus(s.id, "published")}
                        disabled={busyId === s.id}
                        className="text-xs bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1.5 rounded"
                      >
                        ✓ Marcar publicadas
                      </button>
                      <button
                        onClick={() => setStatus(s.id, "rejected")}
                        disabled={busyId === s.id}
                        className="text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1.5 rounded"
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                  {s.status === "published" && (
                    <div className="flex items-center gap-2 mt-2">
                      <a
                        href={`/galeria/${s.event_slug}`}
                        target="_blank"
                        className="text-xs text-gold-400 hover:text-gold-300"
                      >
                        Ver galería →
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
