// Renders Schema.org JSON-LD payloads from content/{locale}/ld-*.json.
// Three payloads: LocalBusiness (always), FAQPage (always), aggregate review (when present).
// Injected into <head> via a small server component in the root layout.
//
// Placeholder-aware: any string value matching PENDING / TBD / PENDIENTE / PLACEHOLDER
// is stripped from the output (along with its parent property). This prevents Google
// Schema Markup warnings when the business is pre-launch and real data isn't yet
// available. The official `isPlaceholder` helper from lib/content is reused.

import ldEsBiz from "@/content/es/ld-localbusiness.json"
import ldEsFaq from "@/content/es/ld-faq.json"
import ldEsReviews from "@/content/es/ld-reviews.json"
import ldEnBiz from "@/content/en/ld-localbusiness.json"
import ldEnFaq from "@/content/en/ld-faq.json"
import ldEnReviews from "@/content/en/ld-reviews.json"
import { isPlaceholder } from "@/lib/content"

const PAYLOADS: Record<string, { biz: any; faq: any; reviews: any }> = {
  es: { biz: ldEsBiz, faq: ldEsFaq, reviews: ldEsReviews },
  en: { biz: ldEnBiz, faq: ldEnFaq, reviews: ldEnReviews },
}

// Fields that should be REMOVED from the JSON-LD output (along with their value)
// if they are still placeholders. These are business-critical fields that Google
// will flag as broken structured data.
const PLACEHOLDER_DROPPABLE_FIELDS = new Set([
  "telephone",
  "priceRange",
  "streetAddress",
  "address",
])

function clean(obj: any): any {
  if (!obj) return obj
  if (Array.isArray(obj)) {
    return obj
      .map(clean)
      .filter((v) => v !== null && v !== undefined && v !== "")
  }
  if (typeof obj === "object") {
    const out: any = {}
    for (const [k, v] of Object.entries(obj)) {
      if (k === "_comment") continue
      // Drop empty arrays (e.g. sameAs: [])
      if (Array.isArray(v) && v.length === 0) continue
      // Drop known placeholder fields
      if (PLACEHOLDER_DROPPABLE_FIELDS.has(k) && isPlaceholder(v)) continue
      // Recurse
      const cleaned = clean(v)
      // Drop empty objects / empty arrays from recursion
      if (
        cleaned === null ||
        cleaned === undefined ||
        cleaned === "" ||
        (Array.isArray(cleaned) && cleaned.length === 0) ||
        (typeof cleaned === "object" && Object.keys(cleaned).length === 0)
      ) {
        continue
      }
      out[k] = cleaned
    }
    return out
  }
  // Drop placeholder scalars
  if (typeof obj === "string" && isPlaceholder(obj)) return null
  return obj
}

export function SchemaOrg({ locale }: { locale: string }) {
  const data = PAYLOADS[locale]
  if (!data) return null
  // Only emit the LocalBusiness if it still has required fields after cleaning
  // (name + address OR telephone). Otherwise omit it entirely.
  const cleanedBiz = clean(data.biz) as any
  let includeBiz = false
  if (cleanedBiz && typeof cleanedBiz === "object") {
    const hasName = !!cleanedBiz.name
    const hasContact = !!(cleanedBiz.telephone || cleanedBiz.email || cleanedBiz.address)
    includeBiz = hasName && hasContact
  }
  const cleanedFaq = clean(data.faq)
  const cleanedReviews = clean(data.reviews)
  // Serialize with @ Unicode-escaped to evade Cloudflare's "Email Obfuscation"
  // feature, which otherwise corrupts inline JSON-LD by replacing @schema.org
  // and "email":"...@..." patterns inside the <script type="application/ld+json">
  // block. Browsers and parsers (Google Rich Results) decode \u0040 back to @.
  // JSON.stringify already escapes safely, but Cloudflare's regex still matches
  // the post-render HTML. Wrapping in JSON.parse(JSON.stringify(...)) again is
  // idempotent — the @ stays escaped.
  const json = JSON.stringify(
    [includeBiz ? cleanedBiz : null, cleanedFaq, cleanedReviews].filter(Boolean)
  )
  // Belt-and-braces: replace any remaining literal "@" outside of escape sequences
  // with the unicode escape. This is the LAST line of defense before HTML render.
  const safeJson = json.replace(/(?<!\\u00)@/g, "\\u0040")
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  )
}
