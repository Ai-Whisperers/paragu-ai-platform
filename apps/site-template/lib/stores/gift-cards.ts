/**
 * Gift Cards domain store.
 * Supabase-first with JSON fallback.
 */

import * as fs from "fs"
import * as path from "path"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { flockSync, LOCK_EX, LOCK_UN } from "@/lib/file-lock"

export interface GiftCard {
  id: string
  token: string
  code?: string
  amount: number
  balance: number
  recipient_name?: string | null
  recipient_email?: string | null
  recipient_phone?: string | null
  purchaser_phone?: string | null
  status: "active" | "redeemed" | "cancelled"
  valid_from?: string
  valid_until?: string
  version?: number
  created_at: string
  updated_at: string
}

function giftCardsFile(): string {
  return path.join(process.cwd(), "data", "gift-cards.json")
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

export async function getGiftCards(): Promise<GiftCard[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("gift_cards")
        .select("*")
        .order("created_at", { ascending: false })
      if (!error && data) return data as GiftCard[]
    } catch (err) {
      console.error(`[gift-cards] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }
  return readJson<GiftCard[]>(giftCardsFile(), [])
}

export async function getGiftCard(token: string): Promise<GiftCard | null> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("gift_cards")
        .select("*")
        .eq("token", token)
        .single()
      if (!error && data) return data as GiftCard
    } catch (err) {
      console.error(`[gift-cards] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }
  const cards = readJson<GiftCard[]>(giftCardsFile(), [])
  return cards.find((c) => c.token === token) || null
}

export async function createGiftCard(card: Omit<GiftCard, "id" | "token" | "balance" | "status" | "created_at" | "updated_at"> & { valid_months?: number }): Promise<GiftCard> {
  const code = crypto.randomUUID().slice(0, 8).toUpperCase()
  const newCard: GiftCard = {
    ...card,
    id: crypto.randomUUID(),
    token: crypto.randomUUID(),
    balance: card.amount,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const validUntil = new Date()
      validUntil.setMonth(validUntil.getMonth() + (card.valid_months || 6))
      const { error } = await supabaseAdmin.from("gift_cards").insert({
        code,
        token: newCard.token,
        amount: newCard.amount,
        balance: newCard.balance,
        recipient_name: newCard.recipient_name,
        recipient_email: newCard.recipient_email,
        recipient_phone: newCard.recipient_phone || null,
        purchaser_phone: newCard.purchaser_phone || null,
        status: newCard.status,
        valid_from: new Date().toISOString(),
        valid_until: validUntil.toISOString(),
      })
      if (!error) return { ...newCard, code }
    } catch (err) {
      console.error(`[gift-cards] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const validUntil = new Date()
  validUntil.setMonth(validUntil.getMonth() + (card.valid_months || 6))
  ;(newCard as GiftCard).code = code
  ;(newCard as GiftCard).valid_until = validUntil.toISOString()
  const cards = readJson<GiftCard[]>(giftCardsFile(), [])
  cards.unshift(newCard)
  writeJson(giftCardsFile(), cards)
  return { ...newCard, code }
}

export async function updateGiftCardBalance(token: string, amount: number, currentBalance: number): Promise<{ success: boolean; conflict: boolean }> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data: card } = await supabaseAdmin
        .from("gift_cards")
        .select("id, balance, version")
        .eq("token", token)
        .single()

      if (!card || card.balance !== currentBalance) {
        return { success: false, conflict: true }
      }

      const { error } = await supabaseAdmin
        .from("gift_cards")
        .update({
          balance: amount,
          status: amount <= 0 ? "redeemed" : "active",
          version: (card.version || 0) + 1
        })
        .eq("token", token)
        .eq("balance", currentBalance)
        .eq("version", card.version || 0)

      if (error) return { success: false, conflict: true }
      return { success: true, conflict: false }
    } catch (err) {
      console.error(`[gift-cards] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const cards = readJson<GiftCard[]>(giftCardsFile(), [])
  const idx = cards.findIndex((c) => c.token === token)
  if (idx === -1) return { success: false, conflict: false }
  if (cards[idx].balance !== currentBalance) return { success: false, conflict: true }
  cards[idx].balance = amount
  cards[idx].status = amount <= 0 ? "redeemed" : "active"
  cards[idx].updated_at = new Date().toISOString()
  cards[idx].version = (cards[idx].version || 0) + 1
  writeJson(giftCardsFile(), cards)
  return { success: true, conflict: false }
}