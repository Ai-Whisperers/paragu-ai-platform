/**
 * Bookings domain store.
 * Supabase-first with JSON fallback.
 */

import * as fs from "fs"
import * as path from "path"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { siteConfig } from "@/lib/config/config"
import { flockSync, LOCK_EX, LOCK_UN } from "@/lib/file-lock"

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

function bookingsFile(): string {
  return path.join(process.cwd(), "data", "bookings.json")
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
  } catch (err) {
    console.error(`[readJson] Failed to read ${file}: ${err instanceof Error ? err.message : String(err)}`)
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

export async function getBookings(): Promise<Booking[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100)
      if (!error && data) return data as Booking[]
    } catch (err) {
      console.error(`[bookings] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }
  return readJson<Booking[]>(bookingsFile(), [])
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
      const { data: biz } = await supabaseAdmin
        .from("businesses")
        .select("id")
        .ilike("slug", `%${siteConfig.site?.slug || ""}%`)
        .limit(1)
        .maybeSingle()

      const businessId = biz?.id
      if (businessId) {
        const { error: insertError } = await supabaseAdmin.from("bookings").insert({
          business_id: businessId,
          customer_name: booking.client_name,
          customer_phone: booking.phone,
          service_id: null,
          booking_date: booking.preferred_date || null,
          booking_time: "00:00",
          duration_minutes: 60,
          customer_notes: [booking.service, booking.notes].filter(Boolean).join(" — "),
          source: booking.source || "website",
          status: "pending",
        })
        if (insertError) {
          throw insertError
        }

        const { error: upsertError } = await supabaseAdmin
          .from("clients")
          .upsert(
            { phone: booking.phone, name: booking.client_name, visits: 1 },
            { onConflict: "phone", ignoreDuplicates: false }
          )
        if (upsertError) {
          throw upsertError
        }

        return newBooking
      }
    } catch (err) {
      console.error(`[bookings] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const bookings = readJson<Booking[]>(bookingsFile(), [])
  bookings.unshift(newBooking)
  writeJson(bookingsFile(), bookings)
  return newBooking
}

export async function updateBookingStatus(id: string, status: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const allowed = ["pending", "confirmed", "cancelled", "completed"]
      if (!allowed.includes(status)) return false
      const { error } = await supabaseAdmin.from("bookings").update({ status }).eq("id", id)
      if (!error) {
        if (status === "completed") {
          const { data: booking } = await supabaseAdmin
            .from("bookings")
            .select("customer_phone, customer_name, customer_notes")
            .eq("id", id)
            .maybeSingle()
          if (booking?.customer_phone) {
            const { data: client } = await supabaseAdmin
              .from("clients")
              .select("id")
              .eq("phone", booking.customer_phone)
              .maybeSingle()
            if (client) {
              await supabaseAdmin.from("loyalty_transactions").insert({
                client_id: client.id,
                points: 10,
                reason: "Visita completada",
                booking_id: id,
              })
              const { data: totalPoints } = await supabaseAdmin
                .from("loyalty_transactions")
                .select("points")
                .eq("client_id", client.id)
              const sum = (totalPoints || []).reduce((acc, t) => acc + (t.points || 0), 0)
              let tier = "bronce"
              if (sum >= 200) tier = "oro"
              else if (sum >= 80) tier = "plata"
              await supabaseAdmin.from("clients").update({ tier }).eq("id", client.id)
            }
          }
        }
        return true
      }
    } catch (err) {
      console.error(`[bookings] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const bookings = readJson<Booking[]>(bookingsFile(), [])
  const idx = bookings.findIndex((b) => b.id === id)
  if (idx === -1) return false
  bookings[idx].status = status
  bookings[idx].updated_at = new Date().toISOString()
  writeJson(bookingsFile(), bookings)
  return true
}

export async function deleteBooking(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from("bookings").delete().eq("id", id)
      return !error
    } catch (err) {
      console.error(`[bookings] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const bookings = readJson<Booking[]>(bookingsFile(), [])
  const idx = bookings.findIndex((b) => b.id === id)
  if (idx === -1) return false
  bookings.splice(idx, 1)
  writeJson(bookingsFile(), bookings)
  return true
}