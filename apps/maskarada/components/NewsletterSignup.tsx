"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setErrorMsg("Email inválido");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), name: name.trim() || null }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setStatus("ok");
      setEmail("");
      setName("");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-gold-400/20 rounded-xl p-5 bg-gold-400/5">
        <p className="text-gold-400 text-sm font-medium">✅ Listo — te avisamos cuando haya algo nuevo.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <p className="text-xs uppercase tracking-widest text-gold-400 mb-2">Anotate para no perderte nada</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre (opcional)"
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60 sm:w-1/3"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold-400/60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gold-400/90 hover:bg-gold-400 disabled:opacity-50 text-black px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all"
        >
          {status === "loading" ? "..." : "Anotarme"}
        </button>
      </div>
      {status === "error" && errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
    </form>
  );
}
