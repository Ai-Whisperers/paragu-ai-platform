#!/usr/bin/env node
/**
 * Clean up autofill-introduced damage in the Nexa Paraguay content files.
 * Removes leaves that are bare [ES→XX] placeholders AND that don't exist
 * in the 2540916 baseline (the commit before any autofill work). Also
 * cleans up empty containers left behind.
 *
 * This is a one-shot migration script — the autofill script has been
 * fixed in commit 2e07b8a so it won't produce this damage going forward.
 */
import { execSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const ROOT = "/opt/data/work/research-repos/paragu-ai-platform"
const APP = "apps/nexa-paraguay"
const BASELINE = "2540916" // commit before any autofill work
const ARROW = "→"
const LOCALES = ["es", "en", "nl", "de"]

function getOriginal(lang) {
  const out = execSync(
    `git show ${BASELINE}:${APP}/content/${lang}.json`,
    { cwd: ROOT, encoding: "utf-8" }
  )
  return JSON.parse(out)
}

function* walk(o, prefix = "") {
  if (typeof o === "string") {
    yield [prefix, o]
    return
  }
  if (Array.isArray(o)) {
    for (let i = 0; i < o.length; i++) {
      yield* walk(o[i], `${prefix}[${i}]`)
    }
    return
  }
  if (o && typeof o === "object") {
    for (const [k, v] of Object.entries(o)) {
      yield* walk(v, prefix ? `${prefix}.${k}` : k)
    }
  }
}

function allPaths(o) {
  const out = new Set()
  for (const [p] of walk(o)) out.add(p)
  return out
}

function deleteAt(obj, path) {
  // Path uses dot + bracket syntax: blog.posts[23].author
  // Tokenize.
  const tokens = []
  for (const x of path.split(".")) {
    if (x === "") continue
    const m = x.match(/^([^\[]+)(?:\[(\d+)\])?$/)
    if (!m) return false
    if (m[1]) tokens.push(m[1])
    if (m[2] !== undefined) tokens.push(Number(m[2]))
  }
  if (tokens.length < 1) return false

  let cur = obj
  for (let i = 0; i < tokens.length - 1; i++) {
    const t = tokens[i]
    const next = tokens[i + 1]
    if (cur == null) return false
    if (typeof cur !== "object") return false
    if (Array.isArray(cur)) {
      if (typeof t !== "number" || t < 0 || t >= cur.length) return false
      cur = cur[t]
    } else {
      if (!(t in cur)) return false
      cur = cur[t]
    }
  }
  const leaf = tokens[tokens.length - 1]
  if (Array.isArray(cur)) {
    if (typeof leaf === "number" && leaf >= 0 && leaf < cur.length) {
      cur.splice(leaf, 1)
      return true
    }
    return false
  }
  if (cur && typeof cur === "object" && leaf in cur) {
    delete cur[leaf]
    return true
  }
  return false
}

function isPlaceholder(str, lang) {
  return typeof str === "string" && str.startsWith(`[ES${ARROW}${lang}]`)
}

function removeEmptyContainers(o) {
  // Recursively walk and remove empty dicts, empty arrays, and arrays
  // containing only empty dicts. Returns true if `o` should be removed
  // by its parent.
  if (Array.isArray(o)) {
    // Recurse into each item first
    for (const item of o) {
      if (item && typeof item === "object") removeEmptyContainers(item)
    }
    // Now filter out empty items
    const newArr = o.filter((v) => {
      if (v == null) return false
      if (Array.isArray(v) && v.length === 0) return false
      if (typeof v === "object" && Object.keys(v).length === 0) return false
      return true
    })
    o.length = 0
    o.push(...newArr)
    return false
  }
  if (o && typeof o === "object") {
    // Recurse first
    for (const [k, v] of Object.entries(o)) {
      if (v && typeof v === "object") removeEmptyContainers(v)
    }
    // Remove empty children
    for (const k of Object.keys(o)) {
      const v = o[k]
      if (v == null) {
        delete o[k]
      } else if (Array.isArray(v) && v.length === 0) {
        delete o[k]
      } else if (typeof v === "object" && Object.keys(v).length === 0) {
        delete o[k]
      }
    }
    return false
  }
  return false
}

for (const lang of LOCALES) {
  if (lang === "es") continue
  const origKeys = allPaths(getOriginal(lang))
  const path = join(ROOT, APP, "content", `${lang}.json`)
  const cur = JSON.parse(readFileSync(path, "utf-8"))

  // Find all placeholders not in original
  const toRemove = []
  for (const [p, v] of walk(cur)) {
    if (isPlaceholder(v, lang) && !origKeys.has(p)) {
      toRemove.push(p)
    }
  }

  // Sort deepest-first
  toRemove.sort((a, b) => b.split(".").length - a.split(".").length)
  let removed = 0
  for (const p of toRemove) {
    if (deleteAt(cur, p)) removed++
  }

  removeEmptyContainers(cur)

  writeFileSync(path, JSON.stringify(cur, null, 2) + "\n", "utf-8")
  console.log(`${lang}: removed ${removed} leaves (of ${toRemove.length} identified)`)
}

// Verify all 3
let allMatch = true
for (const lang of ["en", "nl", "de"]) {
  const orig = getOriginal(lang)
  const cur = JSON.parse(readFileSync(join(ROOT, APP, "content", `${lang}.json`), "utf-8"))

  const origSet = allPaths(orig)
  const curSet = allPaths(cur)
  const added = [...curSet].filter((p) => !origSet.has(p))
  const removed = [...origSet].filter((p) => !curSet.has(p))

  if (added.length === 0 && removed.length === 0) {
    console.log(`${lang}: MATCHES 2540916`)
  } else {
    allMatch = false
    console.log(`${lang}: added=${added.length}, removed=${removed.length}`)
    if (added.length < 20) added.slice(0, 10).forEach((p) => console.log(`  +${p}`))
    if (removed.length < 20) removed.slice(0, 10).forEach((p) => console.log(`  -${p}`))
  }
}

if (allMatch) {
  console.log("\nAll 3 locales match 2540916 baseline.")
} else {
  console.log("\nDifferences remain.")
}
