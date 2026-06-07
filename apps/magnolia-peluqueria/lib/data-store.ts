/**
 * Universal data store — tries Supabase first, falls back to JSON files.
 * Allows the site to work fully without configured Supabase tables.
 */

import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import * as fs from "fs"
import * as path from "path"

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data")
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json")
const PROMOTIONS_FILE = path.join(DATA_DIR, "promotions.json")
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json")
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json")
const CONTENT_FILE = path.join(DATA_DIR, "content.json")

// ── File helpers ──────────────────────────────────────────────────────────────

function ensureDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readJson<T>(file: string, fallback: T): T {
  try {
    ensureDir()
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
  ensureDir()
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8")
}

// ── Bookings ──────────────────────────────────────────────────────────────────

export interface Booking {
  id: string
  client_name: string
  phone: string
  service: string
  preferred_date?: string | null
  notes?: string | null
  source?: string
  status?: string
  created_at?: string
  updated_at?: string
  metadata?: Record<string, unknown>
}

export async function getBookings(): Promise<Booking[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100)
      if (!error && data) return data as Booking[]
    } catch { /* fallback */ }
  }
  return readJson<Booking[]>(BOOKINGS_FILE, [])
}

export async function createBooking(booking: Omit<Booking, "id" | "created_at" | "updated_at">): Promise<Booking> {
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: booking.status || "pending",
  }

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from("bookings").insert({
        client_name: booking.client_name,
        phone: booking.phone,
        service: booking.service,
        preferred_date: booking.preferred_date || null,
        notes: booking.notes || null,
        source: booking.source || "website",
        status: "pending",
      })
      if (!error) return newBooking
    } catch { /* fallback */ }
  }

  const bookings = readJson<Booking[]>(BOOKINGS_FILE, [])
  bookings.unshift(newBooking)
  writeJson(BOOKINGS_FILE, bookings)
  return newBooking
}

export async function updateBookingStatus(id: string, status: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const allowed = ["pending", "confirmed", "cancelled", "completed"]
      if (!allowed.includes(status)) return false
      const { error } = await supabaseAdmin.from("bookings").update({ status }).eq("id", id)
      if (!error) return true
    } catch { /* fallback */ }
  }

  const bookings = readJson<Booking[]>(BOOKINGS_FILE, [])
  const idx = bookings.findIndex((b) => b.id === id)
  if (idx === -1) return false
  bookings[idx].status = status
  bookings[idx].updated_at = new Date().toISOString()
  writeJson(BOOKINGS_FILE, bookings)
  return true
}

// ── Promotions ────────────────────────────────────────────────────────────────

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

export async function getPromotions(): Promise<Promotion[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("promotions")
        .select("*")
        .order("sort_order")
      if (!error && data) return data as Promotion[]
    } catch { /* fallback */ }
  }
  return readJson<Promotion[]>(PROMOTIONS_FILE, [])
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
    } catch { /* fallback */ }
  }

  const promotions = readJson<Promotion[]>(PROMOTIONS_FILE, [])
  promotions.push(newPromo)
  writeJson(PROMOTIONS_FILE, promotions)
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
    } catch { /* fallback */ }
  }

  const promotions = readJson<Promotion[]>(PROMOTIONS_FILE, [])
  const idx = promotions.findIndex((p) => p.id === id)
  if (idx === -1) return null
  promotions[idx] = { ...promotions[idx], ...updates, updated_at: new Date().toISOString() }
  writeJson(PROMOTIONS_FILE, promotions)
  return promotions[idx]
}

export async function deletePromotion(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from("promotions").delete().eq("id", id)
      if (!error) return true
    } catch { /* fallback */ }
  }

  const promotions = readJson<Promotion[]>(PROMOTIONS_FILE, [])
  const filtered = promotions.filter((p) => p.id !== id)
  if (filtered.length === promotions.length) return false
  writeJson(PROMOTIONS_FILE, filtered)
  return true
}

// ── Newsletter Subscribers ────────────────────────────────────────────────────

export interface Subscriber {
  email: string
  name?: string | null
  lang?: string
  created_at?: string
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
    } catch { /* fallback */ }
  }

  const subscribers = readJson<Subscriber[]>(SUBSCRIBERS_FILE, [])
  const existing = subscribers.findIndex((s) => s.email === sub.email)
  if (existing >= 0) {
    subscribers[existing] = subscriber
  } else {
    subscribers.push(subscriber)
  }
  writeJson(SUBSCRIBERS_FILE, subscribers)
  return true
}

// ── Contacts ──────────────────────────────────────────────────────────────────

export interface Contact {
  email: string
  name?: string | null
  message?: string | null
  source?: string
  created_at?: string
}

export async function addContact(contact: Omit<Contact, "created_at">): Promise<boolean> {
  const newContact: Contact = {
    ...contact,
    created_at: new Date().toISOString(),
  }

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from("contacts")
        .upsert(
          { email: contact.email, name: contact.name || null, message: contact.message || null, source: contact.source || "exit-popup" },
          { onConflict: "email" }
        )
      if (!error) return true
    } catch { /* fallback */ }
  }

  const contacts = readJson<Contact[]>(CONTACTS_FILE, [])
  const existing = contacts.findIndex((c) => c.email === contact.email)
  if (existing >= 0) {
    contacts[existing] = newContact
  } else {
    contacts.push(newContact)
  }
  writeJson(CONTACTS_FILE, contacts)
  return true
}

// ── Site Content ──────────────────────────────────────────────────────────────

export async function getSiteContent(siteId = "default"): Promise<Record<string, unknown>> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("site_content")
        .select("content")
        .eq("site_id", siteId)
        .single()
      if (!error && data?.content) return data.content as Record<string, unknown>
    } catch { /* fallback */ }
  }

  const all = readJson<Record<string, Record<string, unknown>>>(CONTENT_FILE, {})
  return all[siteId] || {}
}

export async function setSiteContent(siteId: string, content: Record<string, unknown>): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from("site_content")
        .upsert({ site_id: siteId, content }, { onConflict: "site_id" })
      if (!error) return true
    } catch { /* fallback */ }
  }

  const all = readJson<Record<string, Record<string, unknown>>>(CONTENT_FILE, {})
  all[siteId] = content
  writeJson(CONTENT_FILE, all)
  return true
}
