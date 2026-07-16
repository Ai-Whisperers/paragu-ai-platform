import { isPlaceholder } from "./placeholder.js"

const PARAGUAY_COUNTRY_CODE = "595"

function normalizeDigits(raw: unknown): string {
  return String(raw ?? "").replace(/\D/g, "")
}

export interface PhoneOptions {
  defaultCountryCode?: string
}

export function toE164(raw: unknown, opts: PhoneOptions = {}): string | null {
  if (isPlaceholder(raw)) return null
  const digits = normalizeDigits(raw)
  if (!digits) return null
  const cc = opts.defaultCountryCode ?? PARAGUAY_COUNTRY_CODE
  if (digits.startsWith(cc)) return digits
  if (digits.startsWith("0")) return cc + digits.slice(1)
  if (digits.length <= 9) return cc + digits
  return digits
}

export function whatsappLink(
  raw: unknown,
  message?: string,
  opts: PhoneOptions = {}
): string | null {
  const e164 = toE164(raw, opts)
  if (!e164) return null
  const query = message ? `?text=${encodeURIComponent(message)}` : ""
  return `https://wa.me/${e164}${query}`
}

export function phoneDisplay(raw: unknown, opts: PhoneOptions = {}): string | null {
  const e164 = toE164(raw, opts)
  if (!e164) return null
  const cc = opts.defaultCountryCode ?? PARAGUAY_COUNTRY_CODE
  if (!e164.startsWith(cc)) return `+${e164}`
  const rest = e164.slice(cc.length)
  if (rest.length !== 9) return `+${e164}`
  const area = rest.slice(0, 3)
  const first = rest.slice(3, 6)
  const second = rest.slice(6, 9)
  return `+${cc} ${area} ${first}-${second}`
}
