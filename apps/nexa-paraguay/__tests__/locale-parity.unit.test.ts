/**
 * Locale-parity unit tests — run against synthetic fixtures in
 * __tests__/fixtures/locale-parity/. Always green; the live content
 * parity check is in locale-parity.live.test.ts.
 *
 * The four fixture scenarios cover every code path in
 * scripts/lib/locale-parity.mjs:
 *   - clean/        : all 4 locales in perfect parity → all assertions pass
 *   - drift/        : 1 key present in es only → 1 drift, others clean
 *   - empty/        : en.headline="" and nl.headline="   " → 2 empties
 *   - placeholder/  : nl.headline starts with [ES→nl] → 1 placeholder
 */
import { describe, it, expect } from "vitest"
import { runParityCheck, formatReport, logicalKey, isMetaKey, LOCALES } from "../scripts/lib/locale-parity.mjs"

type Locale = (typeof LOCALES)[number]

interface ParityResult {
  drift: string[]
  empties: Record<Locale, string[]>
  placeholders: Record<Locale, string[]>
  allKeys: string[]
  locales: Record<Locale, { ok: boolean; data: unknown; error?: string }>
  spanishInNonEs: { path: string; locale: string; snippet: string; score: number }[]
}

const fixturesRoot = "__tests__/fixtures/locale-parity"
const check = (sub: string): ParityResult => runParityCheck({ contentDir: `${fixturesRoot}/${sub}` }) as unknown as ParityResult

describe("locale-parity (unit, synthetic fixtures)", () => {
  describe("clean baseline", () => {
    const r = check("clean")

    it("loads all 4 locales", () => {
      for (const l of LOCALES) {
        expect(r.locales[l].ok, `load ${l}: ${r.locales[l].error}`).toBe(true)
      }
    })

    it("has zero drift, empties, and placeholders", () => {
      expect(r.drift, formatReport(r as never)).toEqual([])
      for (const l of LOCALES) {
        expect(r.empties[l], `${l} empties: ${r.empties[l].join(", ")}`).toEqual([])
        expect(r.placeholders[l], `${l} placeholders: ${r.placeholders[l].join(", ")}`).toEqual([])
      }
    })

    it("enumerates the union of leaf-string key paths", () => {
      // siteName, home.hero.eyebrow, home.hero.headline,
      // faq.items[0].q, faq.items[0].a,
      // faq.items[1].q, faq.items[1].a
      expect(r.allKeys.length).toBe(7)
      expect(r.allKeys).toContain("siteName")
      expect(r.allKeys).toContain("home.hero.headline")
      expect(r.allKeys).toContain("faq.items[0].q")
      expect(r.allKeys).toContain("faq.items[1].a")
    })

    it("formatReport produces a human-readable string with all 4 locales", () => {
      const text = formatReport(r as never)
      expect(text).toContain("Nexa Paraguay locale parity")
      for (const l of LOCALES) expect(text).toContain(l)
    })
  })

  describe("drift detection", () => {
    const r = check("drift")

    it("flags the newCta key as missing in en/nl/de", () => {
      expect(r.drift).toContain("home.hero.newCta")
      expect(r.drift.length).toBe(1)
    })

    it("does not flag the keys that ARE in all 4 locales", () => {
      expect(r.drift).not.toContain("home.hero.headline")
      expect(r.drift).not.toContain("home.hero.eyebrow")
    })

    it("no empties or placeholders on a drift-only fixture", () => {
      for (const l of LOCALES) {
        expect(r.empties[l]).toEqual([])
        expect(r.placeholders[l]).toEqual([])
      }
    })
  })

  describe("empty-string detection", () => {
    const r = check("empty")

    it("flags the empty headline in en", () => {
      expect(r.empties.en).toContain("home.headline")
    })

    it("flags the whitespace-only headline in nl (treated as empty)", () => {
      expect(r.empties.nl).toContain("home.headline")
    })

    it("does not flag non-empty values", () => {
      expect(r.empties.es).toEqual([])
      expect(r.empties.de).toEqual([])
    })

    it("does not flag any drift on a fixture where structure is intact", () => {
      expect(r.drift).toEqual([])
    })
  })

  describe("placeholder detection (autofill residue)", () => {
    const r = check("placeholder")

    it("flags the [ES→nl] prefixed string in nl", () => {
      expect(r.placeholders.nl).toContain("home.headline")
    })

    it("does not flag the other 3 locales", () => {
      for (const l of ["es", "en", "de"] as const) {
        expect(r.placeholders[l], `${l} should have no placeholders`).toEqual([])
      }
    })
  })

  describe("per-locale sub-key collapsing", () => {
    // The app uses `localizeDeep` (src/lib/page-data.ts) to pick the right
    // translation out of a `{es, en, nl, de}` sub-object. The QA gate must
    // treat `aboutPage.specialist.bio.en` as the same logical key as
    // `aboutPage.specialist.bio.de`, not as 4 separate drift keys.
    const r = check("per-locale")

    it("collapses trailing .xx locale codes to a single logical key", () => {
      expect(logicalKey("aboutPage.specialist.bio.en")).toBe("aboutPage.specialist.bio")
      expect(logicalKey("aboutPage.specialist.bio")).toBe("aboutPage.specialist.bio")
      expect(logicalKey("aboutPage.specialist.bio.xx")).toBe("aboutPage.specialist.bio.xx") // unknown locale: unchanged
      expect(logicalKey("hero.headline")).toBe("hero.headline")
    })

    it("recognises _meta and its descendants as metadata", () => {
      expect(isMetaKey("_meta")).toBe(true)
      expect(isMetaKey("_meta.notes")).toBe(true)
      expect(isMetaKey("_meta.filledAt")).toBe(true)
      expect(isMetaKey("meta")).toBe(false)
      expect(isMetaKey("aboutPage._meta")).toBe(false)
    })

    it("a fixture with all 4 sub-keys present reports zero drift", () => {
      // 2 logical keys (specialist.bio, home.hero.headline) × 4 locales = 8
      // physical leaf paths, but only 2 logical keys. Both present in all
      // 4 locales. Result: 0 drift, 0 empties.
      expect(r.drift, formatReport(r as never)).toEqual([])
      for (const l of LOCALES) {
        expect(r.empties[l], `${l} empties`).toEqual([])
        expect(r.placeholders[l], `${l} placeholders`).toEqual([])
      }
    })

    it("does not count the 4 sub-key paths as 4 separate drift keys", () => {
      // Even with the physical paths, allKeys is the union of LOGICAL keys
      // — so `specialist.bio` appears once, not 4 times.
      const bioLogical = r.allKeys.find((k) => k === "specialist.bio")
      expect(bioLogical).toBe("specialist.bio")
    })
  })

  describe("_meta is skipped from drift and emptiness reports", () => {
    const r = check("meta")

    it("loads all 4 locales", () => {
      for (const l of LOCALES) expect(r.locales[l].ok).toBe(true)
    })

    it("does not flag _meta.notes even though only de.json has it", () => {
      // Without the skip, the gate would see 3 missing sub-keys under _meta.
      expect(r.drift).toEqual([])
    })

    it("does not report _meta.* as empty", () => {
      for (const l of LOCALES) {
        expect(r.empties[l].filter((k) => k.startsWith("_meta"))).toEqual([])
      }
    })

    it("still counts siteName as a real content key", () => {
      expect(r.allKeys).toContain("siteName")
    })
  })

  describe("intentionally-empty UI slots are NOT flagged", () => {
    // *.cta.eyebrow, home.hero.eyebrow, etc. are empty in all 4 locales
    // because the team deliberately omits the eyebrow line when the
    // section doesn't use one. Every component renders
    // `{eyebrow && <Eyebrow/>}` so an empty string is a valid state.
    // The parity gate must NOT report these as drift/empties.
    const r = check("intentional-empty")

    it("loads all 4 locales", () => {
      for (const l of LOCALES) expect(r.locales[l].ok).toBe(true)
    })

    it("does not flag cta.eyebrow as drift (it's empty everywhere)", () => {
      expect(r.drift).toEqual([])
    })

    it("does not flag cta.eyebrow or home.hero.eyebrow as empty", () => {
      for (const l of LOCALES) {
        expect(r.empties[l], `${l} empties`).toEqual([])
      }
    })

    it("still counts the non-empty keys (cta.title, etc.) as content", () => {
      expect(r.allKeys).toContain("cta.title")
      expect(r.allKeys).toContain("home.hero.headline")
    })
  })

  describe("real empty values ARE flagged (Spanish has content, others don't)", () => {
    // es.json has cta.eyebrow="Reserva" but en/nl/de have it empty.
    // This is a real translation gap, not an intentional empty.
    const r = check("real-empty")

    it("flags the empty cta.eyebrow in en/nl/de", () => {
      expect(r.empties.en).toContain("cta.eyebrow")
      expect(r.empties.nl).toContain("cta.eyebrow")
      expect(r.empties.de).toContain("cta.eyebrow")
    })

    it("does NOT flag cta.eyebrow as empty in es (it has content)", () => {
      expect(r.empties.es).toEqual([])
    })
  })

  describe("Spanish copy-paste in non-es locales", () => {
    // Fixture: en.json has 3 strings in Spanish (policy.intro, questions[0].q,
    // questions[0].a); nl.json and de.json have 1 each (questions[0].q).
    // The drift/empties/placeholders checks miss these because the keys
    // exist in all 4 locales — but the *content* is Spanish.
    const r = check("spanish-copy-paste")

    it("loads all 4 locales", () => {
      for (const l of LOCALES) {
        expect(r.locales[l].ok, `load ${l}: ${r.locales[l].error}`).toBe(true)
      }
    })

    it("does not flag drift, empties, or placeholders (the keys all exist)", () => {
      expect(r.drift, formatReport(r as never)).toEqual([])
      for (const l of LOCALES) {
        expect(r.empties[l]).toEqual([])
        expect(r.placeholders[l]).toEqual([])
      }
    })

    it("flags Spanish copy-paste in en (3 strings)", () => {
      const en = r.spanishInNonEs.filter((i) => i.locale === "en")
      const paths = en.map((i) => i.path).sort()
      expect(paths).toEqual(["policy.intro", "questions[0].a", "questions[0].q"])
    })

    it("flags Spanish copy-paste in nl (1 string)", () => {
      const nl = r.spanishInNonEs.filter((i) => i.locale === "nl")
      expect(nl.map((i) => i.path).sort()).toEqual(["questions[0].q"])
    })

    it("flags Spanish copy-paste in de (1 string)", () => {
      const de = r.spanishInNonEs.filter((i) => i.locale === "de")
      expect(de.map((i) => i.path).sort()).toEqual(["questions[0].q"])
    })

    it("does not scan es (no items reported for es locale)", () => {
      expect(r.spanishInNonEs.filter((i) => i.locale === "es")).toEqual([])
    })

    it("gives inverted-punctuation strings a strong score (weight 3+3=6 minimum)", () => {
      const inverted = r.spanishInNonEs.filter((i) => i.snippet.includes("¿"))
      for (const item of inverted) {
        expect(item.score).toBeGreaterThanOrEqual(6)
      }
    })
  })
})
