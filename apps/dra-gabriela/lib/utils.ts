// Backwards-compatible utility exports. The merged-content loader lives in
// ./content.ts — this file stays for `import { cn } from "@/lib/utils"` style
// imports that the rest of the app uses.

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export {
  LOCALES,
  getContent,
  isLocale,
  isPlaceholder,
  whatsappLink,
  phoneDisplay,
  truncate,
} from "./content"
export type { Locale, SiteContent } from "./content"
