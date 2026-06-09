// Browser/client-side Supabase client.
// Uses anon key, subject to RLS. Safe in client components.

import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Database = any

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder'

export function createBrowserSupabase(): SupabaseClient<Database> {
  return createBrowserClient<Database>(URL, ANON)
}
