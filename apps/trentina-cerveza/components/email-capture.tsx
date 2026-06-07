"use client";

import { useState, useEffect } from "react";
import content from "@/content/es.json";

export default function EmailCapture() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const popup = (content as any).emailCapture;

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("trentina_emailPopup_dismissed");
      if (!dismissed) setOpen(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sessionStorage.setItem("trentina_emailPopup_dismissed", "1");
    setSubmitted(true);
    setTimeout(() => setOpen(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setOpen(false); sessionStorage.setItem("trentina_emailPopup_dismissed", "1"); }} />
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-gold/30 shadow-2xl shadow-black/50">
        {submitted ? (
          <div className="p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-lg font-semibold text-[var(--color-text)]">{popup.thankYouTitle}</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">{popup.thankYouSubtitle}</p>
          </div>
        ) : (
          <div className="p-8">
            <button
              onClick={() => { setOpen(false); sessionStorage.setItem("trentina_emailPopup_dismissed", "1"); }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--color-background)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-lg"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="text-3xl mb-3">{popup.emoji}</div>
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">{popup.title}</h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{popup.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={popup.placeholder}
                required
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none text-center"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gold hover:bg-gold/90 text-[var(--color-background)] font-semibold cursor-pointer transition-all"
              >
                {popup.buttonText}
              </button>
            </form>

            <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">{popup.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
