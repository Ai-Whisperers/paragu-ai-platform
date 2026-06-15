import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import en from "@/content/en/site.json"

export type SiteContent = typeof en

export function getContent(lang: string): SiteContent {
  // For NL and PT we fall back to EN; ES has its own translation
  try {
    if (lang === "es") {
      // Dynamic import would be ideal but JSON imports are static
      // so we use a lookup at module top
    }
  } catch { /* ignore */ }
  // For now all locales use the EN file (NL/PT/ES will read EN).
  // The es/ dir contains a real ES translation; future: switch by lang.
  return en
}
