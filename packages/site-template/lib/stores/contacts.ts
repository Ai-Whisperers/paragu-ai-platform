/**
 * Contacts domain store.
 * Supabase-first with JSON fallback.
 */

import * as fs from "fs"
import * as path from "path"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { flockSync, LOCK_EX, LOCK_UN } from "@/lib/file-lock"

export interface Contact {
  email: string
  name?: string | null
  message?: string | null
  source?: string
  created_at?: string
}

function contactsFile(): string {
  return path.join(process.cwd(), "data", "contacts.json")
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
    } catch (err) {
      console.error(`[contacts] Supabase error: ${err instanceof Error ? err.message : String(err)}. Falling back to JSON.`)
    }
  }

  const contacts = readJson<Contact[]>(contactsFile(), [])
  const existing = contacts.findIndex((c) => c.email === contact.email)
  if (existing >= 0) {
    contacts[existing] = newContact
  } else {
    contacts.push(newContact)
  }
  writeJson(contactsFile(), contacts)
  return true
}