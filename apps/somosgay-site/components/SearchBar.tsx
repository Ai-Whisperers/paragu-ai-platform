"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import type { SearchDoc } from "@/content/search-index";

/**
 * Client-side search bar.
 *
 * Lightweight fuzzy match using substring + word-prefix scoring.
 * No external dep — Fuse.js is 12KB minified and our dataset is
 * ~16 documents, so a JS-native scorer is plenty fast and ships
 * no third-party code.
 *
 * Autocomplete:
 * - Shows the top 5 matches in a dropdown below the input.
 * - Arrow keys + Enter navigate, Esc closes.
 * - Empty input hides dropdown.
 *
 * No analytics, no telemetry, no PII: searches stay on-device.
 */
function score(doc: SearchDoc, q: string): number {
  const query = q.toLowerCase().trim();
  if (!query) return 0;

  // Title match: heavy weight.
  if (doc.title.toLowerCase().includes(query)) return 100;
  // Tag match: medium.
  if (doc.tags?.some((t) => t.toLowerCase().includes(query))) return 50;
  // Excerpt match: light.
  if (doc.excerpt.toLowerCase().includes(query)) return 20;

  // Word-by-word fuzzy match on title only
  const words = query.split(/\s+/);
  for (const w of words) {
    if (doc.title.toLowerCase().includes(w)) return Math.max(80, 80 + (w === query ? 10 : 0));
  }
  return 0;
}

export function SearchBar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy-load the index from the public folder once.
  const [index, setIndex] = useState<SearchDoc[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setIndex(d as SearchDoc[]);
      })
      .catch(() => {
        // Fallback: keep empty. The bar will simply say "no results".
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return index
      .map((d) => ({ doc: d, s: score(d, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 6)
      .map((r) => r.doc);
  }, [q, index]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[highlight];
      if (r) window.location.href = r.href;
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div className="relative w-full">
      <label className="sr-only" htmlFor="site-search">
        Buscar en el sitio
      </label>
      <input
        ref={inputRef}
        id="site-search"
        type="search"
        placeholder="Buscar — clínica, PrEP, donar, equipo…"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
          setHighlight(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
        className="w-full rounded-md border border-[var(--color-warm-deep)] bg-surface px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-expanded={open && !!results.length}
      />

      {open && results.length > 0 && (
        <ul
          id="search-results"
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-surface border border-[var(--color-warm-deep)] rounded-md shadow-lg max-h-96 overflow-y-auto"
        >
          {results.map((r, i) => (
            <li
              key={r.href}
              role="option"
              aria-selected={highlight === i}
              className={`${
                highlight === i ? "bg-warm" : ""
              } hover:bg-warm`}
            >
              <Link
                href={r.href}
                className="block px-3 py-2 text-sm"
                onMouseEnter={() => setHighlight(i)}
                onClick={() => {
                  setOpen(false);
                  setQ("");
                }}
              >
                <div className="font-bold text-text truncate">{r.title}</div>
                <div className="text-xs text-text-muted truncate">{r.excerpt}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {open && q.trim() !== "" && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-surface border border-[var(--color-warm-deep)] rounded-md shadow-lg px-3 py-2 text-sm text-text-muted">
          Sin resultados para «{q}».
        </div>
      )}
    </div>
  );
}
