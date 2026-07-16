const PLACEHOLDER_PREFIXES = [
  "PENDIENTE",
  "PENDING",
  "TBD",
  "TODO",
  "[PLACEHOLDER",
  "LOREM",
]

const PLACEHOLDER_EXACT = new Set([
  "PENDING",
  "PENDIENTE",
  "TBD",
  "TODO",
  "N/A",
  "NA",
  "-",
])

const PLACEHOLDER_INCLUDES = [
  "PENDIENTE | TBD",
  "PENDING | TBD",
  "PENDIENTE | NOT",
  "PENDING | NOT",
  "TODO_PHONE",
  "000 000",
  "000-000",
  "+595****",
]

export function isPlaceholder(value: unknown): boolean {
  if (value == null) return true
  const raw = String(value).trim()
  if (raw === "") return true
  const upper = raw.toUpperCase()
  if (PLACEHOLDER_EXACT.has(upper)) return true
  for (const prefix of PLACEHOLDER_PREFIXES) {
    if (upper.startsWith(prefix)) return true
  }
  for (const needle of PLACEHOLDER_INCLUDES) {
    if (upper.includes(needle)) return true
  }
  return false
}

export function truncate(s: string, n = 160): string {
  if (!s) return ""
  if (s.length <= n) return s
  const cutIdx = n - 1
  const slice = s.slice(0, cutIdx)
  const lastSpace = slice.lastIndexOf(" ")
  if (lastSpace > n * 0.6) {
    return slice.slice(0, lastSpace) + "…"
  }
  return slice + "…"
}
