#!/usr/bin/env node
/**
 * Nexa Paraguay — auto-fill missing locale keys with placeholders.
 *
 * Walks the union of all leaf-string key paths across the 4 locale files.
 * For any key that is missing (or empty) in a non-ES locale, it writes
 * a placeholder of the form:
 *
 *   "[ES→XX] <original Spanish text>"
 *
 * This is intentional:
 *   1. The site stays up — no silent fallback to ES that hides the bug
 *      from users.
 *   2. The gate test (`locale-parity.test.ts`) flags these placeholders
 *      so they show up in every PR / pre-commit.
 *   3. Translators can grep for `[ES→` to find what needs work.
 *
 * Usage:
 *   node scripts/fill-locales.mjs             # dry-run, prints plan
 *   node scripts/fill-locales.mjs --write     # actually update the JSONs
 *   node scripts/fill-locales.mjs --locale=en # only fill one locale
 *
 * Safety:
 *   - Never overwrites an existing non-empty, non-placeholder value.
 *   - Updates _meta.filledAt timestamp on each touched locale so you can
 *     see when the last autofill ran.
 *   - Pretty-prints with 2-space indent to match the rest of the project.
 */
import { readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { LOCALES, leafStringPaths, isMetaKey } from "./lib/locale-parity.mjs"

const args = process.argv.slice(2)
const write = args.includes("--write")
const localeFlag = args.indexOf("--locale")
const onlyLocale = localeFlag !== -1 ? args[localeFlag + 1] : null

if (onlyLocale && !LOCALES.includes(onlyLocale)) {
  console.error(`Unknown locale: ${onlyLocale}. Expected one of: ${LOCALES.join(", ")}`)
  process.exit(2)
}

const contentDir = process.env.I18N_CONTENT_DIR ?? "content"
const appRoot = resolve(contentDir, "..")

const locales = {}
for (const l of LOCALES) {
  locales[l] = JSON.parse(readFileSync(join(appRoot, contentDir, `${l}.json`), "utf-8"))
}

// Build the union of all key paths.
const allKeys = new Set()
for (const l of LOCALES) for (const k of leafStringPaths(locales[l])) allKeys.add(k)

// For each key, decide which locales need filling and what the placeholder
// value should be (taken from the ES source if available, else the first
// non-empty value across any locale, else an empty placeholder).
function getAtPath(obj, path) {
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

function setAtPath(obj, path, value) {
  const tokens = []
  for (const part of path.split(".")) {
    const m = part.match(/^([^\[]+)(?:\[(\d+)\])?$/)
    if (m) {
      if (m[1]) tokens.push(m[1])
      if (m[2] !== undefined) tokens.push(Number(m[2]))
    }
  }
  let cur = obj
  for (let i = 0; i < tokens.length - 1; i++) {
    const t = tokens[i]
    if (cur[t] == null) {
      const next = tokens[i + 1]
      cur[t] = typeof next === "number" ? [] : {}
    } else if (typeof cur[t] !== "object") {
      // Structural conflict: the parent path already holds a string (or
      // other non-object) but a child key needs an object. This is the
      // "bio.en holds Spanish text" class of bug. We can't autofill it
      // without losing data, so we record the conflict and skip.
      const reason = `cannot set ${path}: parent ${tokens.slice(0, i + 1).join(".")} is a ${typeof cur[t]}`
      throw new StructuralConflict(reason)
    }
    cur = cur[t]
  }
  const leaf = tokens[tokens.length - 1]
  if (typeof cur === "object" && cur !== null && !Array.isArray(cur) && typeof cur[leaf] === "string" && cur[leaf] !== value) {
    // Same leaf, different value — fine, we're overwriting with a placeholder.
  }
  cur[leaf] = value
}

class StructuralConflict extends Error {
  constructor(msg) {
    super(msg)
    this.name = "StructuralConflict"
  }
}

function pickSourceValue(key) {
  // ONLY use the Spanish source-of-truth as the source. The fallback to
  // other locales was producing nonsense: a key that was empty in Spanish
  // but had Dutch text would get `[ES→en] <Dutch text>` written into
  // en.json, which is both untranslated AND garbled.
  const esVal = getAtPath(locales.es, key)
  if (typeof esVal === "string" && esVal.trim() !== "" && !/^\[ES→[a-z]{2}\]/.test(esVal)) {
    return esVal
  }
  return ""
}

/** For a per-locale sub-key (e.g. `contactPage.contact.hours.de`), look
 *  at the parent path (`contactPage.contact.hours`) in the source-of-truth
 *  locale (Spanish). If the parent's `.{targetLocale}` sub-key has a real
 *  value, return it. This is the correct way to fill per-locale sub-objects
 *  managed by `localizeDeep` — we don't need a placeholder, we just need
 *  the translation that's already in the source. */
function pickSubKeyValue(parentKey, targetLocale) {
  // parentKey is the logical parent, targetLocale is the locale we want
  // the sub-key value for. We look in the Spanish source first.
  for (const sourceLang of ["es", ...LOCALES.filter((l) => l !== "es" && l !== targetLocale)]) {
    const parent = getAtPath(locales[sourceLang], parentKey)
    if (parent && typeof parent === "object" && !Array.isArray(parent)) {
      // Check if the parent's keys are exactly the locale codes — that
      // marks it as a per-locale sub-object managed by localizeDeep.
      const keys = Object.keys(parent)
      if (keys.length > 0 && keys.every((k) => LOCALES.includes(k))) {
        const subVal = parent[targetLocale]
        if (typeof subVal === "string" && subVal.trim() !== "" && !/^\[ES→[a-z]{2}\]/.test(subVal)) {
          return subVal
        }
      }
    }
  }
  return null
}

/** Returns true if the value looks like a code-level identifier that
 *  should NOT be translated (Lucide icon names, file paths, URLs, route
 *  hrefs, image keys, asset references, etc.). The autofill should copy
 *  these verbatim across locales instead of writing a placeholder.
 *
 *  Heuristic: PascalCase identifier, kebab-case identifier, or any
 *  value that contains `/`, `@`, `:`, `~`, `+`, `#` (typical of paths
 *  and URLs). */
function looksLikeCodeIdentifier(value) {
  if (typeof value !== "string") return false
  if (value.length === 0) return false
  // URL, file path, asset reference, route
  if (/[/:@~+#]/.test(value)) return true
  // Lucide icon: "ClipboardCheck", "ArrowRight", etc. — PascalCase, no
  // spaces, all letters.
  if (/^[A-Z][a-zA-Z0-9]*$/.test(value)) return true
  // kebab-case or camelCase identifier with no whitespace
  if (/^[a-z][a-zA-Z0-9-]*$/.test(value) && !/\s/.test(value)) {
    // But not a real word — real Spanish/English/Dutch/German content
    // has spaces or punctuation. Pure-identifier strings are code.
    return true
  }
  return false
}

const plan = {}
const planIdentifiers = {} // { lang: [{key, value}, ...] } — code identifiers copied verbatim
const conflicts = []
let totalChanges = 0
let totalIdentifiers = 0

// Pre-compute the set of keys that are content-empty across ALL 4 locales
// (missing in some, or empty/placeholder everywhere). These are usually
// intentionally-blank UI slots (e.g. `*.cta.eyebrow` when the section
// doesn't use an eyebrow line) and should NOT be autofilled — writing a
// bare `[ES→en]` placeholder there is worse than leaving the value empty,
// because empty is hidden by `{eyebrow && <Eyebrow/>}` in every component.
function allLocalesEmptyOrPlaceholder(key) {
  for (const l of LOCALES) {
    const v = getAtPath(locales[l], key)
    if (typeof v === "string" && v.trim() !== "" && !/^\[ES→[a-z]{2}\]/.test(v)) {
      return false
    }
  }
  return true
}

for (const key of [...allKeys].sort()) {
  if (isMetaKey(key)) continue
  if (allLocalesEmptyOrPlaceholder(key)) continue
  for (const lang of LOCALES) {
    if (onlyLocale && lang !== onlyLocale) continue
    if (lang === "es") continue // ES is the source of truth
    const existing = getAtPath(locales[lang], key)
    const isPlaceholder = typeof existing === "string" && /^\[ES→[a-z]{2}\]/.test(existing)
    const isEmpty = existing == null || (typeof existing === "string" && existing.trim() === "")
    if (isEmpty || isPlaceholder) {
      // If this is a per-locale sub-key (e.g. `contactPage.contact.hours.de`),
      // the parent is managed by `localizeDeep`. Check the source's parent
      // for the matching sub-key — if it has a real value, copy it verbatim
      // (no `[ES→XX]` prefix) because the value IS already in the right
      // language. This is how `hours.de` gets filled with the German text
      // that's already in es.json's `hours.de`.
      const subKeyMatch = key.match(/^(.*)\.([a-z]{2})$/)
      if (subKeyMatch && LOCALES.includes(subKeyMatch[2])) {
        const parentLogical = subKeyMatch[1]
        const sourceSubLocale = subKeyMatch[2] // the sub-key being filled, e.g. "de"
        const subValue = pickSubKeyValue(parentLogical, sourceSubLocale)
        if (subValue !== null) {
          if (!planIdentifiers[lang]) planIdentifiers[lang] = []
          planIdentifiers[lang].push({ key, value: subValue })
          if (write) {
            try {
              setAtPath(locales[lang], key, subValue)
            } catch (e) {
              if (e instanceof StructuralConflict) {
                conflicts.push({ lang, key, reason: e.message })
                planIdentifiers[lang].pop()
                if (planIdentifiers[lang].length === 0) delete planIdentifiers[lang]
              } else {
                throw e
              }
            }
          }
          totalIdentifiers++
          continue
        }
      }

      const source = pickSourceValue(key)
      // If the source is a code-level identifier (icon name, file path,
      // URL, route, asset key), copy it verbatim instead of writing a
      // `[ES→XX] <source>` placeholder. The placeholder would break
      // rendering (e.g. Lucide icon name = "[ES→en] ClipboardCheck"
      // would crash) and is noise — there's nothing to translate.
      if (looksLikeCodeIdentifier(source)) {
        if (!planIdentifiers[lang]) planIdentifiers[lang] = []
        planIdentifiers[lang].push({ key, value: source })
        if (write) {
          try {
            setAtPath(locales[lang], key, source)
          } catch (e) {
            if (e instanceof StructuralConflict) {
              conflicts.push({ lang, key, reason: e.message })
              planIdentifiers[lang].pop()
              if (planIdentifiers[lang].length === 0) delete planIdentifiers[lang]
            } else {
              throw e
            }
          }
        }
        totalIdentifiers++
        continue
      }
      const placeholder = source ? `[ES→${lang}] ${source}` : `[ES→${lang}]`
      if (!plan[lang]) plan[lang] = []
      plan[lang].push({ key, placeholder })
      if (write) {
        try {
          setAtPath(locales[lang], key, placeholder)
        } catch (e) {
          if (e instanceof StructuralConflict) {
            conflicts.push({ lang, key, reason: e.message })
            // Don't count this as a successful change.
            plan[lang].pop()
            if (plan[lang].length === 0) delete plan[lang]
          } else {
            throw e
          }
        }
      } else {
        totalChanges++
      }
    }
  }
}

if (write) {
  for (const lang of Object.keys(plan)) {
    const file = join(appRoot, contentDir, `${lang}.json`)
    // Stamp _meta.filledAt so the team can see when the last autofill ran.
    if (!locales[lang]._meta) locales[lang]._meta = {}
    locales[lang]._meta.filledAt = new Date().toISOString()
    locales[lang]._meta.filledBy = "scripts/fill-locales.mjs"
    writeFileSync(file, JSON.stringify(locales[lang], null, 2) + "\n", "utf-8")
  }
}

console.log("=== Nexa Paraguay — fill plan ===")
console.log(`Mode: ${write ? "WRITE (will modify files)" : "DRY-RUN (no changes)"}`)
if (onlyLocale) console.log(`Only: ${onlyLocale}`)
console.log("")
for (const lang of LOCALES) {
  const changes = plan[lang] ?? []
  console.log(`${lang}: ${changes.length} key(s) to fill`)
  for (const c of changes.slice(0, 5)) {
    console.log(`  ${c.key}`)
    console.log(`    → ${c.placeholder.slice(0, 80)}${c.placeholder.length > 80 ? "…" : ""}`)
  }
  if (changes.length > 5) console.log(`  …and ${changes.length - 5} more`)
}
console.log("")
console.log(`Total: ${totalChanges} translation placeholder(s) + ${totalIdentifiers} code-identifier copy(ies)`)
if (totalIdentifiers > 0) {
  console.log(`  (code identifiers = icon names, URLs, route hrefs, asset keys — same in all locales)`)
}
if (conflicts.length) {
  console.log("")
  console.log(`Structural conflicts (${conflicts.length}): cannot autofill because a parent path`)
  console.log(`holds a string where an object is needed. Fix these manually:`)
  // Group by language for readability.
  const byLang = {}
  for (const c of conflicts) {
    if (!byLang[c.lang]) byLang[c.lang] = []
    byLang[c.lang].push(c)
  }
  for (const [lang, items] of Object.entries(byLang)) {
    console.log(`  ${lang}: ${items.length}`)
    for (const it of items.slice(0, 5)) console.log(`    - ${it.key}  (${it.reason})`)
    if (items.length > 5) console.log(`    …and ${items.length - 5} more`)
  }
}
if (!write) {
  console.log("")
  console.log("Re-run with --write to apply.")
}
