/**
 * Content domain store.
 * Supabase-first with JSON fallback.
 */

import * as fs from "fs"
import * as path from "path"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { flockSync, LOCK_EX, LOCK_UN } from "@/lib/file-lock"

function contentFile(): string {
  return path.join(process.cwd(), "data", "content.json")
}

function readJson<T>(file: string, fallback: T): T {
  try {
    const dir = file.substring(0, file.lastIndexOf("/"))
    if (dir && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf-8")
      return JSON.parse(raw) as T
    }
  } catch {
    // silent
  }
  return fallback
}

function writeJson<T>(file: string, data: T): void {
  const dir = file.substring(0, file.lastIndexOf("/"))
  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  const exists = fs.existsSync(file)
  const fd = exists ? fs.openSync(file, "r+") : fs.openSync(file, "w")
  flockSync(fd, LOCK_EX)
  try {
    const tmp = file + ".tmp"
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8")
    fs.renameSync(tmp, file)
  } finally {
    flockSync(fd, LOCK_UN)
    fs.closeSync(fd)
  }
}

export async function getSiteContent(siteId = "default"): Promise<Record<string, unknown>> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("site_content")
        .select("content")
        .eq("site_id", siteId)
        .single()
      if (!error && data?.content) return data.content as Record<string, unknown>
    } catch (err) {
      console.error(`[content] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const all = readJson<Record<string, Record<string, unknown>>>(contentFile(), {})
  return all[siteId] || {}
}

export async function setSiteContent(siteId: string, content: Record<string, unknown>): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from("site_content")
        .upsert({ site_id: siteId, content }, { onConflict: "site_id" })
      if (!error) return true
    } catch (err) {
      console.error(`[content] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const all = readJson<Record<string, Record<string, unknown>>>(contentFile(), {})
  all[siteId] = content
  writeJson(contentFile(), all)
  return true
}