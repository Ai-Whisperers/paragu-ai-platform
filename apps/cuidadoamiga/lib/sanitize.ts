// Sanitization helpers — shared by API routes and (optionally) client forms.

/**
 * HTML-strip + length-cap. Strips all HTML tags (and the content of
 * script/style tags which are dangerous even if rendered). For richer
 * sanitization, server-side render with DOMPurify on the client.
 */

const HTML_TAG_AND_CONTENT = /<(\/)?(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1\2>|<[^>]*>/gi

export function sanitizeString(input: unknown, max = 500): string {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .replace(HTML_TAG_AND_CONTENT, '')
    .replace(/[<>]/g, '')
    .slice(0, max)
}

export function isValidHttpUrl(input: string): boolean {
  try {
    const u = new URL(input)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

export function sanitizeUrl(input: unknown, max = 500): string {
  const s = sanitizeString(input, max)
  return isValidHttpUrl(s) ? s : ''
}

export function sanitizeFuentes(input: unknown, max = 10): string[] {
  if (!Array.isArray(input)) return []
  return input
    .map((u) => sanitizeUrl(u))
    .filter((u): u is string => u.length > 0)
    .slice(0, max)
}
