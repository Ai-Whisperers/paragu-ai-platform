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
const dryRunReport = { skippedShapeMismatch: [] } // for diagnostic output
let totalChanges = 0
let totalIdentifiers = 0
let totalSkippedShape = 0

/** Get the parent path of a dotted path, stripping any [n] array index. */
function getParentPath(key) {
  const m = key.match(/^(.*)\.[^.[]]+(?:\[[0-9]+\])?$/)
  if (!m) return null
  const parent = m[1]
  return parent || null
}

/** Returns true if `target` has all of `source`'s top-level keys (i.e. the
 *  target is a superset of the source, or equal). Used by the sibling-shape
 *  guard to detect redesigned locales. */
function isSuperset(target, source) {
  if (!target || !source) return false
  if (typeof target !== "object" || typeof source !== "object") return false
  if (Array.isArray(target) !== Array.isArray(source)) return false
  if (Array.isArray(target)) {
    // For arrays, check the same length
    return target.length === source.length
  }
  // For objects, target must have every key that source has
  for (const k of Object.keys(source)) {
    if (!(k in target)) return false
  }
  return true
}

function getAtPathParts(obj, parts) {
  let cur = obj
  for (const p of parts) {
    if (cur == null) return undefined
    cur = cur[p]
  }
  return cur
}

/** Returns true if creating the leaf `key` in the target locale would
 *  introduce a shape mismatch with existing redesigned content.
 *
 *  Strategy: walk the path from the root toward the leaf. At each level,
 *  if the target has a different set of keys than the source (i.e. the
 *  target was redesigned), and the new leaf would extend a branch that
 *  the target doesn't have, skip.
 */
function wouldCreateShapeMismatch(key, lang) {
  const targetRoot = locales[lang]
  if (!targetRoot) return false
  const sourceRoot = locales.es
  if (!sourceRoot) return false

  // Array-length guard: don't extend arrays. If the key is array-indexed
  // (e.g. `blog.posts[23].author`), the autofill should only run if the
  // target locale has an entry at that index. Otherwise the autofill
  // would create new array entries (like adding 3 new blog posts to en)
  // that the source doesn't have.
  if (/\[\d+\]/.test(key)) {
    // Walk the path parts and find the deepest array index.
    const parts = []
    for (const x of key.replace(/\[(\d+)\]/g, ".$1").split(".")) {
      if (x === "") continue
      parts.push(/^\d+$/.test(x) ? Number(x) : x)
    }
    // Find the last array index in the path.
    let arrayParentParts = []
    let arrayIndex = -1
    for (let i = 0; i < parts.length; i++) {
      if (typeof parts[i] === "number") {
        arrayParentParts = parts.slice(0, i)
        arrayIndex = parts[i]
      }
    }
    if (arrayIndex >= 0) {
      const targetArray = getAtPathParts(targetRoot, arrayParentParts)
      const sourceArray = getAtPathParts(sourceRoot, arrayParentParts)
      if (Array.isArray(targetArray) && Array.isArray(sourceArray)) {
        if (arrayIndex >= sourceArray.length) {
          // Source doesn't have this index. Don't extend the array.
          return true
        }
        if (arrayIndex >= targetArray.length) {
          // Target doesn't have this index but source does. Adding
          // the leaf here would create a new array entry — the
          // target's author chose a different number of entries.
          return true
        }
      }
    }
  }

  // Walk up the key path. For each ancestor, check if the target has
  // real content that doesn't exist in the source — that signals a
  // redesign at that level.
  const parts = []
  for (const x of key.replace(/\[(\d+)\]/g, ".$1").split(".")) {
    if (x === "") continue
    parts.push(/^\d+$/.test(x) ? Number(x) : x)
  }

  if (parts.length === 0) return false

  // At each ancestor level, check if the target/source have different
  // shapes. If so, AND the new leaf would extend a branch that the
  // target doesn't have, skip.
  for (let depth = 0; depth < parts.length - 1; depth++) {
    const ancestorParts = parts.slice(0, depth + 1)
    const targetAncestor = getAtPathParts(targetRoot, ancestorParts)
    const sourceAncestor = getAtPathParts(sourceRoot, ancestorParts)

    // Case A: both exist. Check shape.
    if (
      targetAncestor !== undefined && sourceAncestor !== undefined &&
      typeof targetAncestor === "object" && !Array.isArray(targetAncestor) &&
      typeof sourceAncestor === "object" && !Array.isArray(sourceAncestor)
    ) {
      const targetKeys = new Set(Object.keys(targetAncestor))
      const sourceKeys = new Set(Object.keys(sourceAncestor))
      const onlyInSource = [...sourceKeys].filter((k) => !targetKeys.has(k))
      const onlyInTarget = [...targetKeys].filter((k) => !sourceKeys.has(k))

      // If the next part of the path (the part the new leaf descends
      // from) is in `onlyInSource` or `onlyInTarget`, the leaf would
      // extend a branch that doesn't exist in the OTHER locale. That's
      // a shape mismatch.
      const nextKey = parts[depth + 1]
      if (onlyInSource.length > 0 && onlyInSource.includes(String(nextKey))) {
        return true
      }
      if (onlyInTarget.length > 0 && onlyInTarget.includes(String(nextKey))) {
        return true
      }
      // If both have unique keys (genuine redesign), skip any leaf
      // under this ancestor.
      if (onlyInSource.length > 0 && onlyInTarget.length > 0) {
        return true
      }
    }

    // Case B: target doesn't have this path, but source does.
    // We're trying to add a key that source has but target doesn't.
    // Check whether the target already has a sibling key with different
    // content — that signals a redesigned locale where the missing key
    // is intentional, not a translation gap.
    if (targetAncestor === undefined && sourceAncestor !== undefined &&
        typeof sourceAncestor === "object" && !Array.isArray(sourceAncestor)) {
      // Look one level up: the parent of this ancestor. If the target's
      // parent has a different shape than the source's parent, this is
      // a redesign.
      if (depth > 0) {
        const parentParts2 = parts.slice(0, depth)
        const targetParent2 = getAtPathParts(targetRoot, parentParts2)
        const sourceParent2 = getAtPathParts(sourceRoot, parentParts2)
        if (
          targetParent2 && typeof targetParent2 === "object" && !Array.isArray(targetParent2) &&
          sourceParent2 && typeof sourceParent2 === "object" && !Array.isArray(sourceParent2)
        ) {
          const targetKeys2 = new Set(Object.keys(targetParent2))
          const sourceKeys2 = new Set(Object.keys(sourceParent2))
          const onlyInTarget2 = [...targetKeys2].filter((k) => !sourceKeys2.has(k))
          // If target's parent has a unique key the source doesn't,
          // and the key being added at this level is a source-only key,
          // then the target locale was redesigned and the new key
          // doesn't fit. Skip.
          if (onlyInTarget2.length > 0) {
            return true
          }
        }
      }
    }
  }

  // Sibling-occupation guard: if the immediate parent of the leaf
  // exists in the target with at least one real (non-empty, non-placeholder)
  // string value, the target's author has explicitly chosen which keys
  // to use. Don't add the source's sibling keys UNLESS the source has
  // the same leaf — in which case the missing leaf is a real translation
  // gap that the autofill should fill.
  //
  // This catches the case where the target uses `label/value` for costs
  // items and the source uses `category/amount` — both have the same
  // shape (object with 2 string keys) but they use different key names.
  // Adding the source's keys would create a malformed schema mixing
  // both conventions.
  const parentParts = parts.slice(0, -1)
  if (parentParts.length > 0) {
    const targetParent = getAtPathParts(targetRoot, parentParts)
    if (targetParent && typeof targetParent === "object" && !Array.isArray(targetParent)) {
      let hasRealValue = false
      for (const v of Object.values(targetParent)) {
        if (typeof v === "string" && v.trim() !== "" && !v.startsWith("[ES→")) {
          hasRealValue = true
          break
        }
      }
      if (hasRealValue) {
        const sourceParent = getAtPathParts(sourceRoot, parentParts)
        if (sourceParent && typeof sourceParent === "object" && !Array.isArray(sourceParent)) {
          // The leaf is a NEW key for the target. If the source ALSO
          // doesn't have it, the schemas are incompatible — the
          // target's author chose a different convention. Skip.
          // But if the source DOES have it, it's a translation gap —
          // let the autofill add a placeholder.
          const leafKey = parts[parts.length - 1]
          if (!(leafKey in sourceParent) && !(leafKey in targetParent)) {
            return true
          }
        }
      }
    }
  }

  return false
}

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
  // Hardcoded exclusions: redesigned sections where the source/target
  // schemas intentionally differ. The autofill cannot tell that
  // `targetClients.profiles` (Dutch redesign) is a different shape
  // from `targetClients.groups` (old Spanish/English/German shape)
  // and would happily write placeholder keys into the wrong locale.
  // The right answer for these sections is human translation; the
  // autofill should stay out of the way.
  //
  // See apps/nexa-paraguay/docs/02-site/audits/locale-qa-routing-findings-2026-08-28.md
  // for the full list of redesigned sections.
  if (
    key.startsWith("dutchLanding.") ||
    key.startsWith("comparisonPage.matrix.items[")
  ) {
    continue
  }
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

      // Sibling-shape guard: if the parent path already exists in the target
      // locale but with a DIFFERENT set of keys (i.e. a redesigned
      // structure), don't add the source's old-shape keys. This prevents
      // the autofill from creating e.g. `costs.items[*].label` next to the
      // redesigned Dutch's `costs.items[*].category`, or
      // `taxComparison.items[*]` next to the redesigned Dutch's
      // `taxComparison.comparisonTable[*]`.
      //
      // Two checks: (1) the immediate parent path doesn't have the right
      // shape, OR (2) any ancestor of the parent has real content with a
      // different shape, indicating the target locale was redesigned.
      if (wouldCreateShapeMismatch(key, lang)) {
        dryRunReport.skippedShapeMismatch.push({ lang, key, reason: "parent-shape-mismatch" })
        totalSkippedShape++
        continue
      }

      const source = pickSourceValue(key)

      // Length guard: never autofill long-form content (article bodies,
      // long paragraphs, etc.). Long content always needs human translation,
      // and the autofill would put Spanish source text into a Dutch/German
      // slot, which is worse than leaving the value empty.
      if (source.length > 500) {
        continue
      }
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
if (totalSkippedShape > 0) {
  console.log(`  Skipped ${totalSkippedShape} key(s) due to parent-shape-mismatch (redesigned locales)`)
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
