// Direct PostgreSQL client for self-hosted Postgres (no Supabase dependency)
// Falls back to Supabase client if DATABASE_URL is not set

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.SUPABASE_URL || 'http://10.0.2.3:5432'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || ''

// For self-hosted Postgres, we create a Supabase-compatible client
// but direct SQL access happens via the server API routes
export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export function createBrowserClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://10.0.2.3:5432',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  )
}
