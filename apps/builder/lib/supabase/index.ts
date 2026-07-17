/**
 * Compat barrel — historical import path used by client-side marketing
 * components (e.g. DynamicPromotions.tsx).
 *
 * Canonical entry points:
 *  - Browser client: `@/lib/supabase/client`
 *  - Server client:  `@/lib/supabase/server`
 *  - Admin client:   `@/lib/supabase/admin` (service-role, server-only)
 *
 * `supabaseAdmin` is intentionally `null` in this shim — the service-role
 * client MUST NEVER be exposed to browser code. Callers using this barrel
 * should treat `supabaseAdmin` as an opt-out fallback and use the browser
 * `createClient` (from `./client`) for RLS-safe read queries.
 *
 * `isSupabaseConfigured` reflects whether the required public env vars are
 * present; callers use it to short-circuit UI rendering when Supabase is
 * not wired.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

/** True when the required public Supabase env vars are configured. */
export const isSupabaseConfigured: boolean = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
)

/**
 * Service-role admin client. Null on the client — service-role must never
 * leave the server. Server-side callers should import
 * `createAdminClient` directly from `@/lib/supabase/admin` instead.
 */
export const supabaseAdmin: SupabaseClient | null = null
