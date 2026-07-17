/**
 * Token-based admin auth compat stub.
 *
 * The real admin auth for this project is the Supabase-cookie flow in
 * `@/lib/auth/admin` (isAdminEmail / requireAdmin / checkAdmin). This module
 * only exists because `lib/universal/api/api-wrapper.ts::withApiAuth`
 * dynamically imports `verifyToken` from here — that wrapper is a leftover
 * from a token-cookie prototype that no route currently uses.
 *
 * Fail-closed contract: `verifyToken` returns `null` for every input, which
 * makes `withApiAuth` reject the request with 401. This keeps the wrapper
 * type-safe and satisfies the typecheck without opening a bypass route.
 *
 * When you want token-cookie auth, replace this file with a real HMAC/JWT
 * verifier — the call sites won't change.
 */

export interface AdminTokenPayload {
  sub: string
  email: string
  iat: number
  exp: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function verifyToken(_token: string): Promise<AdminTokenPayload | null> {
  return null
}
