"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SEARCH_INDEX, type SearchHit } from "@/lib/search";

/**
 * Cmd/Ctrl+K or "/" keyboard shortcut opens the search modal.
 * Fuse-style fuzzy matching done inline (no Fuse dep) for a smaller
 * client bundle. Searches title + description + keywords. Ranks
 * exact-prefix matches highest.
 */
function score(haystack: string, needle: string): number {
  if (!needle) return 0;
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();
  if (h === n) return 1000;
  if (h.startsWith(n)) return 500;
  if (h.includes(n)) return 100;
  // subsequence match
  let i = 0;
  for (const c of h) {
    if (c === n[i]) i++;
    if (i === n.length) return 10 + n.length;
  }
  return 0;
}

function bestScore(hit: SearchHit, q: string): number {
  const sTitle = score(hit.title, q) * 3;
  const sDesc = score(hit.description, q);
  return sTitle + sDesc;
}

export default function Search() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // keyboard shortcut: ⌘K, Ctrl+K, "/"
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !open && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // autofocus when opened
  useEffect(() => {
    if (open) {
      setQ("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const results = useMemo<SearchHit[]>(() => {
    if (!q.trim()) return SEARCH_INDEX.slice(0, 6); // popular shortcuts
    return SEARCH_INDEX
      .map((h) => ({ h, s: bestScore(h, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 10)
      .map((x) => x.h);
  }, [q]);

  function navigate(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIdx]) {
      e.preventDefault();
      navigate(results[activeIdx].href);
    }
  }

  return (
    <>
      {/* Trigger button in nav */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-gold-400/40 rounded-full text-xs text-gray-500 hover:text-gold-400 transition-all"
        aria-label="Buscar (Cmd+K)"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <span>Buscar…</span>
        <kbd className="ml-1 px-1.5 py-0.5 bg-white/5 rounded text-[10px]">⌘K</kbd>
      </button>

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-gray-400 hover:text-gold-400 transition-colors"
        aria-label="Buscar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <svg className="w-5 h-5 text-gold-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={q}
                onChange={(e) => { setQ(e.target.value); setActiveIdx(0); }}
                onKeyDown={onKeyDown}
                placeholder="Buscar en maškaráda…"
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base"
              />
              <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-gray-500">
                Esc
              </kbd>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length === 0 ? (
                <p className="px-4 py-12 text-center text-gray-500 text-sm">
                  Sin resultados para "<span className="text-gold-400">{q}</span>"
                </p>
              ) : (
                <ul>
                  {results.map((r, i) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        onClick={(e) => { e.preventDefault(); navigate(r.href); }}
                        onMouseEnter={() => setActiveIdx(i)}
                        className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                          i === activeIdx ? "bg-gold-400/10 border-l-2 border-gold-400" : "border-l-2 border-transparent hover:bg-white/[0.03]"
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-1 shrink-0 w-20">
                          {r.category}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{r.title}</p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">{r.description}</p>
                        </div>
                        <span className="text-gold-400 text-xs shrink-0 mt-1">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="px-4 py-2 border-t border-white/10 flex items-center gap-4 text-[10px] text-gray-500">
              <span>↑↓ navegar</span>
              <span>↵ abrir</span>
              <span>esc cerrar</span>
              <span className="ml-auto">{results.length} resultados</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
