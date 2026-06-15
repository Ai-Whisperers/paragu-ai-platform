// Supabase client for server-side / admin operations that need to bypass RLS.
// Uses the service_role key from environment — NEVER expose this to the client.
// In a Vercel/Docker deploy, NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
// would be set. For now, the monorepo doesn't have an .env, so this falls back to
// the public anon key (which means INSERTs to mk_vendors will need an RLS policy
// allowing anon inserts, OR the table needs to be created without RLS).

import { createClient } from "@supabase/supabase-js";

let cached: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm";
  if (!url) {
    console.warn("getSupabaseClient: no SUPABASE_URL configured, returning null");
    return null;
  }
  // Prefer service role for server-side writes; fall back to anon if not configured.
  cached = createClient(url, serviceKey || anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cached;
}
