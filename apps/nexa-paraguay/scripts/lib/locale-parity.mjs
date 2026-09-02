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

  // Spanish-in-non-es detection. This is a separate report from drift
  // because the gate's drift count is correct (all 4 locales have the
  // key) but the *content* in some non-es locales is in Spanish. The
  // team should treat this as a separate category of bug.
  const spanishInNonEs = findSpanishInNonEs(locales)

  return { locales, drift, empties, placeholders, allKeys, spanishInNonEs }
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

// ---- Spanish-in-non-es detector ---------------------------------------
//
// The parity gate counts key presence, not content language. So a non-es
// locale that has a real Spanish string at a path that exists in all 4
// locales slips through: the gate sees `all 4 locales have the key`,
// but a Dutch reader is actually shown Spanish text.
//
// This detector flags that class. It's intentionally conservative: false
// negatives are OK (a translator will still see the bug when they read
// the file), but false positives are bad (they add noise to the gate and
// make the team ignore it).
//
// High-confidence Spanish markers that don't appear in en/nl/de text:
//   - Inverted punctuation: ¿ ... ?
//   - Spanish-specific function words used in combinations that aren't
//     common in en/nl/de: "para qué", "qué es", "cómo ...", "escriba a",
//     "no hay", "sí," at sentence start, "tiempo total", "crónica"
//   - Per-character: ñ, accented vowels at non-trivial density
//
// We require multiple independent signals to fire, so "Guía" or "Paraguay"
// alone (proper nouns shared with English) doesn't trigger.

/** A piece of Spanish copy-paste text. The path is the dot/bracket path
 *  in the locale's JSON. The locale is en/nl/de (we don't scan es).
 *
 *  Each entry is a [regex, weight] pair. The detector fires when the sum
 *  of weights is >= 3 (tunable — see findSpanishInNonEs). Strong markers
 *  (inverted punctuation, ñ) get higher weight. */
const SPANISH_MARKERS = [
  // Inverted punctuation — only Spanish uses these (very strong signal)
  [/\B¿/, 3],
  [/^[¿¡]/, 3],
  // ñ — only Spanish uses this letter
  [/ñ/, 3],
  // Accented characters (á é í ó ú) that would be unusual in plain
  // EN/NL/DE text — appear in loanwords but accumulate quickly in Spanish
  [/[áéíóúüÁÉÍÓÚÜ]/, 1],
  // Spanish-only common words (function words and nouns that don't
  // appear in EN/NL/DE)
  [/\b(?:está|estás|aquí|allí|información|dirección|también|cómo|cuál|cuáles|dónde|cuándo|qué|quién|quiénes|para qué|por qué|sección|secciones|número|números|teléfono|teléfonos|informes|servicio|servicios|empresa|empresas|programa|programas|condiciones|condición|información|informaciones|cliente|clientes|persona|personas|familia|familias|hijo|hijos|hermano|hermanos|esposa|esposo|menor|menores)\b/i, 1],
  // Spanish-only phrase patterns
  [/\b(?:para qué|por qué|cómo (?:se|se puede|se hace)|escriba (?:a|al)|no hay (?:un|una|convención|convenio)|sí, (?:puede|hay|existe|el|la|los|las)|tiempo total|el programa|sujeto obligado|base legal|trato de forma)\b/i, 2],
  // Spanish-only verbs/nouns (no EN/NL/DE equivalent)
  [/\b(?:escriba|incluye|incluyen|incluir|recibe|reciben|recibir|cuentan|cuenta con|siguiente|siguientes|propiedades|extranjero|extranjera|extranjeros|extranjeras|sistema (?:territorial|tributario|fiscal)|sujeta a|sometido a|cuya|cuyos|cuyas|debidamente|también|asimismo|no obstante)\b/i, 1],
]

/** Returns a list of `{path, locale, snippet}` for strings in en/nl/de
 *  that look like Spanish copy-paste. `minLen` controls the minimum
 *  string length to consider (default 25 chars — short strings are too
 *  easy to mis-flag, but FAQ items are often 25-40 chars). The detection
 *  fires when the sum of marker weights is >= 3. */
export function findSpanishInNonEs(locales, minLen = 25) {
  const out = []
  for (const lang of LOCALES) {
    if (lang === "es") continue
    const loc = locales[lang]
    if (!loc?.ok) continue
    for (const path of leafStringPaths(loc.data)) {
      if (isMetaKey(path)) continue
      // Skip per-locale sub-keys (e.g. `aboutPage.specialist.bio.es`).
      // These are locale-switched values, not translations of each other.
      // The `.es` sub-key is *meant* to be Spanish, the `.en` is meant to be
      // English, etc. So a Spanish string at a `.es` path is not a bug.
      if (/\.[a-z]{2}(?:\[\d+\])?$/.test(path)) continue
      const v = getAtPath(loc.data, path)
      if (typeof v !== "string" || v.length < minLen) continue
      // Strip URLs and code identifiers (not translatable text)
      const stripped = v
        .replace(/https?:\/\/\S+/g, "")
        .replace(/@src:\w+/g, "")
        .replace(/\{\$img:\s*\w+\}/g, "")
        .replace(/\/sites\/[^\s]+/g, "")
        .trim()
      // Allow very short strings if they contain a strong signal
      // (inverted punctuation or ñ — both unique to Spanish)
      const isShortWithStrongSignal =
        stripped.length < minLen &&
        stripped.length >= 10 &&
        (/¿/.test(stripped) || /¡/.test(stripped) || /ñ/.test(stripped))
      if (stripped.length < minLen && !isShortWithStrongSignal) continue
      // Sum the weights of matching markers. Inverted-punctuation and ñ
      // count for 3 each (very strong signals); word/phrase markers count
      // for 1 or 2. Threshold of 3 means: either one very-strong signal,
      // or one phrase + one word, or three words.
      let score = 0
      for (const [re, weight] of SPANISH_MARKERS) {
        if (re.test(stripped)) score += weight
      }
      if (score >= 3) {
        out.push({ path, locale: lang, snippet: v.slice(0, 120), score })
      }
    }
  }
  return out
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

  if (r.spanishInNonEs && r.spanishInNonEs.length) {
    lines.push("")
    lines.push(
      `Spanish copy-paste in non-es locales (${r.spanishInNonEs.length} — the gate counts keys, not content language; this catches Spanish text appearing in en/nl/de):`
    )
    // Group by locale for readability
    const byLocale = { en: [], nl: [], de: [] }
    for (const item of r.spanishInNonEs) byLocale[item.locale]?.push(item)
    for (const l of LOCALES) {
      if (l === "es") continue
      const items = byLocale[l]
      if (!items?.length) continue
      lines.push(`  ${l} (${items.length}):`)
      for (const item of items.slice(0, 20)) {
        lines.push(`    - ${item.path}  [score=${item.score}]`)
        lines.push(`        ${item.snippet}`)
      }
      if (items.length > 20) lines.push(`    …and ${items.length - 20} more`)
    }
  }

  return lines.join("\n")
}

function keyExistsIn(r, locale, key) {
  const v = getAtPath(r.locales[locale].data ?? {}, key)
  return typeof v === "string" && v.trim() !== ""
}
