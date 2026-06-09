/**
 * Environment variable validation using Zod.
 * Fail-fast in production, warn-only in dev.
 * Import `env` instead of reading `process.env` directly.
 */

import { z } from 'zod'

const envSchema = z.object({
  // Supabase — required
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  // Admin — renameable path (defaults to 'admin')
  ADMIN_PATH: z.string().min(1).default('admin'),

  // Owner emails (comma-separated, used for owner permissions in admin)
  OWNER_EMAILS: z.string().default(''),

  // Session — used by lib/auth.ts for remember-me cookie
  COOKIE_SECRET: z.string().min(20).default('change-me-to-a-random-20-char-string-min'),
  SESSION_TTL_DAYS: z.coerce.number().int().positive().default(30),

  // Optional services
  RESEND_API_KEY: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),

  // Dev flags
  NEXT_PUBLIC_DEV_COMPONENTS: z.coerce.boolean().default(false),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Invalid environment configuration — server cannot start.')
  }
}

export const env = parsed.data ?? envSchema.parse({})

export type Env = z.infer<typeof envSchema>
