#!/usr/bin/env node
/**
 * Diagnostic: dump the FULL drift sorted by which locales are missing,
 * and break down by section. Lets us see whether 374 drift keys is
 * 374 unique missing leaves, or 374 inflated by the per-locale nested
 * sub-keys.
 */
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { runParityCheck, LOCALES } from "./lib/locale-parity.mjs"

const r = runParityCheck({ contentDir: "content" })

console.log("=== DRIFT KEY BREAKDOWN ===\n")

// Group by section (first path segment).
const bySection = {}
for (const k of r.drift) {
  const section = k.split(".")[0].split("[")[0]
  if (!bySection[section]) bySection[section] = []
  bySection[section].push(k)
}

const sections = Object.keys(bySection).sort()
for (const s of sections) {
  console.log(`${s}  (${bySection[s].length} keys)`)
}

// Special: count the per-locale nested sub-keys pattern
// (e.g. aboutPage.specialist.bio.{es,en,nl,de} counts as 4 but is really
// 1 logical key with 4 missing siblings).
const perLocaleNested = r.drift.filter((k) => /\.[a-z]{2}$/.test(k))
console.log(`\nKeys ending in .{{es,en,nl,de}} (per-locale nested sub-keys): ${perLocaleNested.length}`)
const logical = new Set()
for (const k of r.drift) {
  // Strip trailing .{xx} to find the logical key.
  logical.add(k.replace(/\.[a-z]{2}$/, ""))
}
console.log(`Logical unique keys (after collapsing per-locale siblings): ${logical.size}`)

// Distribution of "missing in":
const byMissingIn = { 1: 0, 2: 0, 3: 0, all4: 0 }
for (const k of r.drift) {
  const missing = LOCALES.filter((l) => {
    const v = (() => {
      function get(o, p) {
        const tokens = []
        for (const part of p.split(".")) {
          const m = part.match(/^([^\[]+)(?:\[(\d+)\])?$/)
          if (m) { if (m[1]) tokens.push(m[1]); if (m[2] !== undefined) tokens.push(Number(m[2])) }
        }
        let c = o
        for (const t of tokens) { if (c == null) return undefined; c = c[t] }
        return c
      }
      // The drift list comes from the lib's path-format; rebuild it
      // exactly: for a key like "aboutPage.specialist.bio.es", the value
      // is at exactly that path.
      return get(r.locales[l].data, k)
    })()
    return typeof v !== "string" || v.trim() === ""
  })
  if (missing.length === LOCALES.length) byMissingIn.all4++
  else byMissingIn[missing.length]++
}
console.log(`\nMissing-in distribution:`)
console.log(`  missing in all 4 locales: ${byMissingIn.all4}`)
console.log(`  missing in 1 locale:      ${byMissingIn[1]}`)
console.log(`  missing in 2 locales:     ${byMissingIn[2]}`)
console.log(`  missing in 3 locales:     ${byMissingIn[3]}`)

// Empty values per locale.
console.log(`\nEmpty / whitespace values per locale:`)
for (const l of LOCALES) console.log(`  ${l}: ${r.empties[l].length}`)
