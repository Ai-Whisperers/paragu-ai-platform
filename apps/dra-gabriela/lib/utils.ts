import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const CONTENT = { en, es }

export type SiteContent = typeof en

export function getContent(locale: string): SiteContent {
  return CONTENT[locale as keyof typeof CONTENT] || en
}

export function getLocaleFromPath(path: string): string {
  const match = path.match(/^\/(en|es)\b/)
  return match ? match[1] : "en"
}
