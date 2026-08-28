/**
 * Single source of truth for Nexa Paraguay's 4-locale content parity check.
 *
 * Imported by:
 *   - __tests__/locale-parity.test.ts  (vitest, runs on every test run)
 *   - scripts/check-locale-parity.mjs  (CLI, runs in pre-commit / pre-deploy)
 *   - scripts/fill-locales.mjs         (only to enumerate missing keys)
 *
 * Rule: every leaf-string key path present in any of es/en/nl/de must
 * exist (with a non-empty value) in all four. Array items are flattened
 * by index (e.g. `home.hero.slides[2].title`).
 */
import { readFileSync, existsSync } from "node:fs"
import { join, resolve, isAbsolute, basename, dirname } from "node:path"

export const LOCALES = ["es", "en", "nl", "de"]

/**
 * Walks a JSON value, yielding dot-separated key paths for every leaf
 * string. Object keys are joined with `.`; arrays are indexed with `[n]`.
 * Non-string leaves (numbers, booleans, null) are skipped — only
 * translatable strings are checked.
 */
export function* leafStringPaths(obj, prefix = "") {
  if (obj === null || obj === undefined) return
  if (typeof obj === "string") {
    yield prefix
    return
  }
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const child = obj[i]
      if (child && typeof child === "object") {
        yield* leafStringPaths(child, `${prefix}[${i}]`)
      }
    }
    return
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${k}` : k
      yield* leafStringPaths(v, path)
    }
  }
}

export function loadLocale(contentDir, locale, root) {
  // If `root` is given, treat `contentDir` as relative to it. If `contentDir`
  // is absolute, use it directly. Otherwise, fall back to the legacy
  // `resolve(contentDir, "..")` shape that the live content/ directory
  // depends on (so the CLI default `contentDir: "content"` still works
  // from the app root).
  const base = root
    ? resolve(root)
    : isAbsolute(contentDir)
      ? dirname(contentDir)
      : resolve(contentDir, "..")
  const file = join(base, basename(contentDir), `${locale}.json`)
  if (!existsSync(file)) {
    return { ok: false, data: {}, error: `missing file: ${file}` }
  }
  try {
    const data = JSON.parse(readFileSync(file, "utf-8"))
    return { ok: true, data }
  } catch (e) {
    return { ok: false, data: {}, error: `JSON parse error: ${e.message}` }
  }
}

export function runParityCheck(opts = {}) {
  const contentDir = opts.contentDir ?? "content"
  const root = opts.root

  const locales = {}
  for (const l of LOCALES) {
    locales[l] = loadLocale(contentDir, l, root)
  }

  // Build per-locale key sets. We use the LOGICAL key (collapsing trailing
  // .xx locale codes) so a key like `aboutPage.specialist.bio` is counted
  // as a single logical key even though each locale stores it under a
  // different sub-key (.es / .en / .nl / .de).
  const keysByLang = {}
  for (const l of LOCALES) {
    const allLeaf = locales[l].ok ? [...leafStringPaths(locales[l].data)] : []
    keysByLang[l] = new Set(allLeaf.map(logicalKey).filter((k) => !isMetaKey(k)))
  }

  // Union of all logical keys.
  const allSet = new Set()
  for (const s of Object.values(keysByLang)) for (const k of s) allSet.add(k)
  const allKeys = [...allSet].sort()

  // Drift = any logical key that is not present in all four locales.
  // We also re-check the actual per-locale paths for the empties /
  // placeholders report below, since those are reported with their real
  // paths (e.g. `aboutPage.specialist.bio.en` not `aboutPage.specialist.bio`).
  const drift = []
  for (const k of allKeys) {
    const missing = LOCALES.filter((l) => !keysByLang[l].has(k))
    if (missing.length > 0) drift.push(k)
  }
  drift.sort()

  // Empties + placeholder markers, per locale. These are reported with
  // their actual (un-collapsed) paths so the team can grep for them.
  //
  // An empty string in a non-ES locale is only a real problem if the
  // Spanish source has a non-empty value at the same path. An empty
  // value across all 4 locales (including ES) is usually an intentional
  // UI slot (e.g. `*.cta.eyebrow` when the section doesn't use an
  // eyebrow line) — every component renders `{eyebrow && <Eyebrow/>}`,
  // so empty is a valid state and not a translation gap.
  const esEmpties = new Set()
  if (locales.es?.ok) {
    for (const k of leafStringPaths(locales.es.data)) {
      if (isMetaKey(k)) continue
      const v = getAtPath(locales.es.data, k)
      if (typeof v === "string" && v.trim() === "") esEmpties.add(k)
    }
  }

  const empties = {}
  const placeholders = {}
  for (const l of LOCALES) {
    empties[l] = []
    placeholders[l] = []
    if (!locales[l].ok) continue
    for (const k of leafStringPaths(locales[l].data)) {
      if (isMetaKey(k)) continue
      const value = getAtPath(locales[l].data, k)
      if (typeof value !== "string") continue
      if (value.trim() === "" && !esEmpties.has(k)) empties[l].push(k)
      if (/^\[ES→[a-z]{2}\]/.test(value)) placeholders[l].push(k)
    }
  }

  return { locales, drift, empties, placeholders, allKeys }
}

/** Strip a trailing `.xx` locale code so per-locale sub-keys collapse
 *  to their logical parent. `aboutPage.specialist.bio.en` becomes
 *  `aboutPage.specialist.bio`. Returns the input unchanged if it
 *  doesn't end in a known locale code. */
export function logicalKey(key) {
  const m = key.match(/^(.*)\.([a-z]{2})$/)
  if (m && LOCALES.includes(m[2])) return m[1]
  return key
}

/** Internal metadata keys are not translatable content. Skip them
 *  in drift and emptiness reports. Currently only `_meta` is recognized. */
export function isMetaKey(key) {
  return key === "_meta" || key.startsWith("_meta.")
}

function getAtPath(obj, path) {
  // Path is dot-separated with [n] array indices.
  const tokens = []
  for (const part of path.split(".")) {
    const m = part.match(/^([^\[]+)(?:\[(\d+)\])?$/)
    if (m) {
      if (m[1]) tokens.push(m[1])
      if (m[2] !== undefined) tokens.push(Number(m[2]))
    }
  }
  let cur = obj
  for (const t of tokens) {
    if (cur == null) return undefined
    cur = cur[t]
  }
  return cur
}

/** Human-readable report used by both the test (on failure) and the CLI. */
export function formatReport(r) {
  const lines = []
  lines.push("=== Nexa Paraguay locale parity ===")

  const okCount = LOCALES.filter((l) => r.locales[l].ok).length
  lines.push(`Locales loaded: ${okCount}/${LOCALES.length}`)
  for (const l of LOCALES) {
    const s = r.locales[l]
    lines.push(`  ${l}: ${s.ok ? `OK (${r.allKeys.length} union keys)` : `FAIL — ${s.error}`}`)
  }

  if (r.empties && Object.values(r.empties).some((arr) => arr.length)) {
    lines.push("")
    lines.push("Empty / whitespace-only values:")
    for (const l of LOCALES) {
      if (r.empties[l].length) {
        lines.push(`  ${l} (${r.empties[l].length}):`)
        for (const k of r.empties[l].slice(0, 10)) lines.push(`    - ${k}`)
        if (r.empties[l].length > 10) lines.push(`    …and ${r.empties[l].length - 10} more`)
      }
    }
  }

  if (r.placeholders && Object.values(r.placeholders).some((arr) => arr.length)) {
    lines.push("")
    lines.push("Untranslated [ES→XX] placeholders (translate and remove marker):")
    for (const l of LOCALES) {
      if (r.placeholders[l].length) {
        lines.push(`  ${l} (${r.placeholders[l].length}):`)
        for (const k of r.placeholders[l].slice(0, 10)) lines.push(`    - ${k}`)
      }
    }
  }

  if (r.drift.length) {
    lines.push("")
    lines.push(`Key drift (${r.drift.length} keys present in some locales but not all):`)
    for (const k of r.drift.slice(0, 30)) {
      const missing = LOCALES.filter((l) => !keyExistsIn(r, l, k))
      lines.push(`  - ${k}  missing in: ${missing.join(", ")}`)
    }
    if (r.drift.length > 30) lines.push(`  …and ${r.drift.length - 30} more`)
  }

  return lines.join("\n")
}

function keyExistsIn(r, locale, key) {
  const v = getAtPath(r.locales[locale].data ?? {}, key)
  return typeof v === "string" && v.trim() !== ""
}
