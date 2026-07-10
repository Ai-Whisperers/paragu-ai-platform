// Typed wrapper around the static es.json content.
// The whole site uses one locale for now (ES-only).
//
// When i18n is added later:
//   1. Make this return a generic Record<string, T>
//   2. Add `lib/content/en.ts`, `lib/content/gn.ts`
//   3. Wire [locale] segment in app/

import es from "@/content/es.json";

// Lightweight type — we don't generate types from JSON at build time
// (avoids extra dep). The shape is documented in `content/es.json` itself.
export type Content = typeof es;

let cached: Content | null = null;

export function getContent(): Content {
  if (cached) return cached;
  cached = es as Content;
  return cached;
}

// Convenience: cast to non-nullable for places where we know it's safe
export const content = getContent();

// Site URL — overridable via env for staging mirrors
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://somosgay.paragu-ai.com";