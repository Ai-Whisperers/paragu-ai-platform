/**
 * Subscribers domain store.
 * Supabase-first with JSON fallback.
 */

import * as fs from "fs"
import * as path from "path"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { flockSync, LOCK_EX, LOCK_UN } from "@/lib/file-lock"

export interface Subscriber {
  email: string
  name?: string | null
  lang?: string
  created_at?: string
}

function subscribersFile(): string {
  return path.join(process.cwd(), "data", "subscribers.json")
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

export async function addSubscriber(sub: Omit<Subscriber, "created_at">): Promise<boolean> {
  const subscriber: Subscriber = {
    ...sub,
    created_at: new Date().toISOString(),
  }

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      await supabaseAdmin
        .from("newsletter_subscribers")
        .upsert(
          { email: sub.email, name: sub.name || null, lang: sub.lang || "es", created_at: new Date().toISOString() },
          { onConflict: "email" }
        )
    } catch (err) {
      console.error(`[subscribers] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const subscribers = readJson<Subscriber[]>(subscribersFile(), [])
  const existing = subscribers.findIndex((s) => s.email === sub.email)
  if (existing >= 0) {
    subscribers[existing] = subscriber
  } else {
    subscribers.push(subscriber)
  }
  writeJson(subscribersFile(), subscribers)
  return true
}