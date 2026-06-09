// Service-role Supabase client — BYPASSES RLS.
// USE WITH EXTREME CAUTION. Only for trusted server-side code paths:
//   - rate-limited API routes where RLS would conflict with the validation layer
//   - webhooks from external services
//   - server-side aggregations
// NEVER import this from a client component. NEVER expose to the browser.

import { createClient as createRawClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Database = any

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SERVICE) {
  console.warn('[supabase/service] SUPABASE_SERVICE_ROLE_KEY is not set — getServiceSupabase() will throw at call time.')
}

export function getServiceSupabase(): SupabaseClient<Database> {
  if (!SERVICE) {
    throw new Error('[supabase/service] SUPABASE_SERVICE_ROLE_KEY is required for service-role client')
  }
  return createRawClient<Database>(URL, SERVICE, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
