// Photo consent model release — digital record of consent for use of
// event photos on the public maškaráda website.
//
// Storage: localStorage queue + Supabase mk_photo_consents table.
// The localStorage queue is the source of truth when offline; the
// Supabase table is what the admin views.
//
// Schema for mk_photo_consents (created manually in Supabase):
//   id uuid primary key default gen_random_uuid(),
//   event_id text,                  -- which event this consent is for
//   signer_name text not null,
//   signer_email text,
//   signer_phone text,
//   scope text not null check (scope in ('public_website', 'social_media', 'internal_only')),
//   signed_at timestamptz default now(),
//   ip_address text,
//   notes text
//
// RLS: anon can insert (for door QR codes), only admin can read.

import { createClient } from "@supabase/supabase-js";

export interface PhotoConsent {
  event_id: string;
  signer_name: string;
  signer_email?: string;
  signer_phone?: string;
  scope: "public_website" | "social_media" | "internal_only";
  ip_address?: string;
  notes?: string;
}

const STORAGE_KEY = "maskarada_photo_consents_v1";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function recordPhotoConsent(consent: PhotoConsent): Promise<{ ok: boolean; error?: string }> {
  // Persist to localStorage first (always)
  if (typeof window !== "undefined") {
    try {
      const queue: PhotoConsent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      queue.push({ ...consent, ip_address: consent.ip_address || "client-reported" });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    } catch {
      // ignore
    }
  }

  // Try Supabase
  const supabase = getSupabase();
  if (!supabase) {
    return { ok: true }; // local saved, will retry on next sync
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from("mk_photo_consents" as any).insert(consent as any);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export function getPendingConsents(): PhotoConsent[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
