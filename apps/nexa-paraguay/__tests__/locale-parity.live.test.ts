/**
 * Locale parity gate — Nexa Paraguay (es / en / nl / de).
 *
 * Catches the kind of drift the team has been seeing manually:
 *  - A key added to es.json that was never translated into en/nl/de.
 *  - A string emptied to "" in one locale (silent fallback to the next one
 *    produces a mixed-language UI that no human reviewing screenshots
 *    would notice).
 *  - A structural change (renamed section) in one locale that the others
 *    didn't follow.
 *
 * Runs on every `pnpm test` and `pnpm i18n:check`. Exits non-zero on any
 * drift, so a missing translation blocks the PR.
 *
 * NOTE: this is the *live* integration test. It will fail until the
 * committed content is brought to parity. The unit test in
 * `locale-parity.unit.test.ts` exercises the same library against
 * synthetic fixtures and is always green — use that to verify the gate
 * itself is correct.
 *
 * To recover a green state on live content, run:
 *   pnpm i18n:fill           # seed missing keys with [ES→XX] placeholders
 *   # …then translate each placeholder in en.json / nl.json / de.json…
 *   pnpm i18n:check          # should now exit 0
 */
import { describe, it, expect } from "vitest"
import { runParityCheck, formatReport, LOCALES } from "../scripts/lib/locale-parity.mjs"

type Locale = (typeof LOCALES)[number]

interface ParityResult {
  drift: string[]
  empties: Record<Locale, string[]>
  placeholders: Record<Locale, string[]>
  allKeys: string[]
  locales: Record<Locale, { ok: boolean; data: any; error?: string }>
}

const result = runParityCheck({ contentDir: "content" }) as unknown as ParityResult
const report = formatReport(result as never)

describe("locale parity: es / en / nl / de", () => {
  it("all 4 locales load and parse as JSON", () => {
    for (const [lang, status] of Object.entries(result.locales)) {
      expect(status.ok, `${lang} failed to load: ${status.error}\n${report}`).toBe(true)
    }
  })

  it("every locale has the same set of top-level section keys", () => {
    const byLang = result.locales as Record<string, { ok: boolean; data: any; error?: string }>
    const ref = "es" in byLang ? "es" : Object.keys(byLang)[0]
    const refTop = new Set(Object.keys(byLang[ref].data ?? {}))
    for (const [lang, status] of Object.entries(byLang)) {
      if (!status.ok) continue
      const top = new Set(Object.keys(status.data))
      const missing = [...refTop].filter((k) => !top.has(k))
      const extra = [...top].filter((k) => !refTop.has(k))
      expect(
        missing,
        `${lang} is missing top-level keys: ${missing.join(", ")}\n${report}`,
      ).toEqual([])
      expect(
        extra,
        `${lang} has extra top-level keys not in ${ref}: ${extra.join(", ")}\n${report}`,
      ).toEqual([])
    }
  })

  it("no locale has empty or whitespace-only string values", () => {
    for (const [lang, empties] of Object.entries(result.empties)) {
      expect(
        empties,
        `${lang} has ${empties.length} empty strings (first 5: ${empties
          .slice(0, 5)
          .join(", ")})\n${report}`,
      ).toEqual([])
    }
  })

  it("no locale contains an untranslated placeholder marker from autofill", () => {
    // scripts/fill-locales.mjs writes "[ES→XX] original text" so we can
    // find unfilled seeds. None should remain in committed content.
    for (const [lang, placeholders] of Object.entries(result.placeholders)) {
      expect(
        placeholders,
        `${lang} still has ${placeholders.length} untranslated placeholders. ` +
          `Run: pnpm --filter nexa-paraguay i18n:fill\n${report}`,
      ).toEqual([])
    }
  })

  it("no locale is missing keys that exist in any other locale", () => {
    // The hard check: any key path present in at least one locale must be
    // present (with a non-empty value) in all four. This is what catches
    // the real "I added a hero CTA in Spanish and forgot the other three"
    // bug.
    expect(
      result.drift.length,
      `${result.drift.length} key(s) out of parity across locales.\n${report}`,
    ).toBe(0)
  })
})
