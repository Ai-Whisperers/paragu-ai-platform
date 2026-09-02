#!/usr/bin/env node
/**
 * Nexa Paraguay — locale parity preflight.
 *
 * Runs the same checks as __tests__/locale-parity.test.ts but as a CLI,
 * so it can be invoked from a pre-commit hook, pre-deploy, or any
 * automation that doesn't have vitest set up.
 *
 * Exit codes:
 *   0 — all 4 locales (es / en / nl / de) in full parity
 *   1 — drift detected; report printed to stderr
 *   2 — could not load one or more locale files
 *
 * Usage:
 *   node scripts/check-locale-parity.mjs
 *   pnpm i18n:check
 */
import { runParityCheck, formatReport, LOCALES } from "./lib/locale-parity.mjs"

const contentDir = process.env.I18N_CONTENT_DIR ?? "content"
const result = runParityCheck({ contentDir })

const allLoaded = LOCALES.every((l) => result.locales[l].ok)
const hasDrift = result.drift.length > 0
const hasEmpties = LOCALES.some((l) => result.empties[l].length > 0)
const hasPlaceholders = LOCALES.some((l) => result.placeholders[l].length > 0)
const hasSpanishCopyPaste = (result.spanishInNonEs?.length ?? 0) > 0
const hasSubKeyMismatches = (result.subKeyMismatches?.length ?? 0) > 0

const report = formatReport(result)

if (!allLoaded) {
  console.error(report)
  console.error("")
  console.error("FATAL: one or more locale files could not be loaded.")
  process.exit(2)
}

if (hasDrift || hasEmpties || hasPlaceholders || hasSpanishCopyPaste || hasSubKeyMismatches) {
  console.error(report)
  console.error("")
  console.error("FAILED: locale drift detected.")
  if (hasDrift) {
    console.error(`  - ${result.drift.length} key(s) missing in at least one locale`)
  }
  if (hasEmpties) {
    const total = LOCALES.reduce((n, l) => n + result.empties[l].length, 0)
    console.error(`  - ${total} empty string(s) across locales`)
  }
  if (hasPlaceholders) {
    const total = LOCALES.reduce((n, l) => n + result.placeholders[l].length, 0)
    console.error(`  - ${total} untranslated [ES→XX] placeholder(s) — translate and remove marker`)
  }
  if (hasSpanishCopyPaste) {
    console.error(
      `  - ${result.spanishInNonEs.length} Spanish copy-paste string(s) appearing in en/nl/de — translate and remove Spanish`
    )
  }
  if (hasSubKeyMismatches) {
    console.error(
      `  - ${result.subKeyMismatches.length} per-locale sub-key mismatch(es) — es.json's per-locale sub-object and en/nl/de.json's value at the same path have drifted`
    )
  }
  console.error("")
  console.error("To re-seed missing keys with placeholders (so the site stays up):")
  console.error("  pnpm --filter nexa-paraguay i18n:fill")
  process.exit(1)
}

console.log(report)
console.log("")
console.log("OK: all 4 locales in parity.")
process.exit(0)
