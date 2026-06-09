/**
 * HMAC-based cookie signing and verification for "remember me" sessions.
 *
 * Usage:
 *   const token = signCookie(userId)
 *   const verified = verifyCookie(token)  // userId or null
 */

import { createHmac, timingSafeEqual } from 'crypto'

const SECRET = process.env.COOKIE_SECRET ?? 'change-me-to-a-random-20-char-string-min'
const TTL_DAYS = Number(process.env.SESSION_TTL_DAYS) || 30

function hmac(value: string): string {
  return createHmac('sha256', SECRET).update(value).digest('hex')
}

/**
 * Sign a value (e.g. user ID or email) into a tamper-proof cookie string.
 * Format: `value.timestamp.hmac`
 */
export function signCookie(value: string): string {
  const timestamp = Math.floor(Date.now() / 1000).toString(36)
  const payload = `${value}.${timestamp}`
  return `${payload}.${hmac(payload)}`
}

/**
 * Verify a signed cookie. Returns the original value if valid, or null if
 * tampered, expired, or malformed.
 */
export function verifyCookie(signed: string): string | null {
  try {
    const lastDot = signed.lastIndexOf('.')
    if (lastDot === -1) return null

    const payload = signed.slice(0, lastDot)
    const sig = signed.slice(lastDot + 1)

    // Verify HMAC using timing-safe comparison
    const expected = hmac(payload)
    if (expected.length !== sig.length) return null
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null

    // Extract and check expiry
    const secondDot = payload.lastIndexOf('.')
    if (secondDot === -1) return null

    const timestamp = parseInt(payload.slice(secondDot + 1), 36)
    if (isNaN(timestamp)) return null

    const ageDays = (Date.now() / 1000 - timestamp) / 86400
    if (ageDays > TTL_DAYS) return null

    return payload.slice(0, secondDot)
  } catch {
    return null
  }
}

/**
 * Generate a remember-me cookie value for a given identity string.
 * The identity should be stable (e.g. user email or ID).
 */
export function createRememberMeCookie(identity: string): string {
  return signCookie(identity)
}
