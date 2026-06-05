/**
 * Promotions domain store.
 * Supabase-first with JSON fallback.
 */

import * as fs from "fs"
import * as path from "path"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { flockSync, LOCK_EX, LOCK_UN } from "@/lib/file-lock"

export interface Promotion {
  id: string
  title: string
  subtitle?: string | null
  badge?: string | null
  description?: string | null
  wa_message?: string | null
  is_active?: boolean
  expires_at?: string | null
  color?: string
  sort_order?: number
  created_at?: string
  updated_at?: string
}

function promotionsFile(): string {
  return path.join(process.cwd(), "data", "promotions.json")
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

export async function getPromotions(): Promise<Promotion[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("promotions")
        .select("*")
        .order("sort_order")
      if (!error && data) return data as Promotion[]
    } catch (err) {
      console.error(`[promotions] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }
  return readJson<Promotion[]>(promotionsFile(), [])
}

export async function createPromotion(promo: Omit<Promotion, "id" | "created_at" | "updated_at">): Promise<Promotion> {
  const newPromo: Promotion = {
    ...promo,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: promo.is_active ?? true,
  }

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("promotions")
        .insert({
          title: promo.title,
          subtitle: promo.subtitle,
          badge: promo.badge,
          wa_message: promo.wa_message,
          color: promo.color || "secondary",
          expires_at: promo.expires_at,
          is_active: promo.is_active ?? true,
          sort_order: promo.sort_order || 0,
        })
        .select()
        .single()
      if (!error && data) return data as Promotion
    } catch (err) {
      console.error(`[promotions] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const promotions = readJson<Promotion[]>(promotionsFile(), [])
  promotions.push(newPromo)
  writeJson(promotionsFile(), promotions)
  return newPromo
}

export async function updatePromotion(id: string, updates: Partial<Promotion>): Promise<Promotion | null> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { ...rest } = updates
      const { data, error } = await supabaseAdmin
        .from("promotions")
        .update(rest)
        .eq("id", id)
        .select()
        .single()
      if (!error && data) return data as Promotion
    } catch (err) {
      console.error(`[promotions] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const promotions = readJson<Promotion[]>(promotionsFile(), [])
  const idx = promotions.findIndex((p) => p.id === id)
  if (idx === -1) return null
  promotions[idx] = { ...promotions[idx], ...updates, updated_at: new Date().toISOString() }
  writeJson(promotionsFile(), promotions)
  return promotions[idx]
}

export async function deletePromotion(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from("promotions").delete().eq("id", id)
      if (!error) return true
    } catch (err) {
      console.error(`[promotions] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const promotions = readJson<Promotion[]>(promotionsFile(), [])
  const filtered = promotions.filter((p) => p.id !== id)
  if (filtered.length === promotions.length) return false
  writeJson(promotionsFile(), filtered)
  return true
}