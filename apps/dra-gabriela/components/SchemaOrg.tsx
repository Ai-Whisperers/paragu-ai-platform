// Renders Schema.org JSON-LD payloads from content/{locale}/ld-*.json.
// Three payloads: LocalBusiness (always), FAQPage (always), aggregate review (when present).
// Injected into <head> via a small server component in the root layout.

import ldEsBiz from "@/content/es/ld-localbusiness.json"
import ldEsFaq from "@/content/es/ld-faq.json"
import ldEsReviews from "@/content/es/ld-reviews.json"
import ldEnBiz from "@/content/en/ld-localbusiness.json"
import ldEnFaq from "@/content/en/ld-faq.json"
import ldEnReviews from "@/content/en/ld-reviews.json"

const PAYLOADS: Record<string, { biz: any; faq: any; reviews: any }> = {
  es: { biz: ldEsBiz, faq: ldEsFaq, reviews: ldEsReviews },
  en: { biz: ldEnBiz, faq: ldEnFaq, reviews: ldEnReviews },
}

// Strip our internal `_comment` field before serializing.
function clean(obj: any) {
  if (!obj) return obj
  if (Array.isArray(obj)) return obj.map(clean)
  if (typeof obj === "object") {
    const out: any = {}
    for (const [k, v] of Object.entries(obj)) {
      if (k === "_comment") continue
      out[k] = clean(v)
    }
    return out
  }
  return obj
}

export function SchemaOrg({ locale }: { locale: string }) {
  const data = PAYLOADS[locale]
  if (!data) return null
  const json = JSON.stringify([clean(data.biz), clean(data.faq), clean(data.reviews)].filter(Boolean))
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
