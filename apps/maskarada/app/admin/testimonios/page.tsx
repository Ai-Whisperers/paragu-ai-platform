"use client";

import { useEffect, useState } from "react";
import { ADMIN_PASSCODE } from "@/lib/supabase";
import {
  getTestimonials,
  updateTestimonialStatus,
  type TestimonialRow,
  type TestimonialStatus,
} from "@/lib/testimonials";

export default function AdminTestimonios() {
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [filter, setFilter] = useState<TestimonialStatus | "all">("pending");
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("mk_admin") === "true") {
      setAuthed(true);
      void loadData();
    }
  }, []);

  async function loadData() {
    setLoading(true);
    const data = await getTestimonials(filter === "all" ? undefined : filter);
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    if (authed) void loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, authed]);

  function login() {
    if (passcode === ADMIN_PASSCODE) {
      setAuthed(true);
      setAuthError("");
      sessionStorage.setItem("mk_admin", "true");
    } else {
      setAuthError("Código incorrecto");
    }
  }

  async function approve(id: string) {
    setBusyId(id);
    await updateTestimonialStatus(id, "approved");
    await loadData();
    setBusyId(null);
  }
  async function reject(id: string) {
    setBusyId(id);
    await updateTestimonialStatus(id, "rejected");
    await loadData();
    setBusyId(null);
  }
  async function archive(id: string) {
    setBusyId(id);
    await updateTestimonialStatus(id, "archived");
    await loadData();
    setBusyId(null);
  }

  if (!authed) {
    return (
      <div className="min-h-screen py-24 px-4 flex items-center justify-center">
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">🔐 Admin · Testimonios</h1>
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">🪶 Testimonios</h1>
          <a href="/admin" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Volver al admin principal
          </a>
        </div>

        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {(["pending", "approved", "rejected", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest transition-all ${
                filter === f
                  ? "bg-blood-500 text-white"
                  : "border border-white/20 text-gray-400 hover:border-white/40"
              }`}
            >
              {f === "all" ? "Todos" : f}
            </button>
          ))}
          <button
            onClick={loadData}
            disabled={loading}
            className="ml-auto text-xs border border-white/20 text-gray-400 px-4 py-2 rounded hover:border-white/40"
          >
            {loading ? "..." : "Refrescar"}
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            {filter === "pending" ? "No hay testimonios pendientes. Buen trabajo." : "Sin resultados para este filtro."}
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((t) => (
              <div
                key={t.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="text-white font-medium">{t.submitter_name}</span>
                      <span className="text-gray-500 text-xs ml-2">({t.display_mode})</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(t.created_at).toLocaleString("es-PY")}
                      {t.context ? ` · ${t.context}` : ""}
                      {t.role ? ` · ${t.role}` : ""}
                      {t.submitter_email ? ` · ${t.submitter_email}` : ""}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      t.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : t.status === "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : t.status === "archived"
                            ? "bg-gray-500/20 text-gray-400"
                            : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <blockquote className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap mb-3 pl-3 border-l-2 border-white/10">
                  {t.body}
                </blockquote>
                <div className="flex items-center gap-2">
                  {t.status !== "approved" && (
                    <button
                      onClick={() => approve(t.id)}
                      disabled={busyId === t.id}
                      className="text-xs bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1.5 rounded"
                    >
                      Aprobar
                    </button>
                  )}
                  {t.status !== "rejected" && (
                    <button
                      onClick={() => reject(t.id)}
                      disabled={busyId === t.id}
                      className="text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1.5 rounded"
                    >
                      Rechazar
                    </button>
                  )}
                  {t.status !== "archived" && t.status === "rejected" && (
                    <button
                      onClick={() => archive(t.id)}
                      disabled={busyId === t.id}
                      className="text-xs bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 px-3 py-1.5 rounded"
                    >
                      Archivar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
