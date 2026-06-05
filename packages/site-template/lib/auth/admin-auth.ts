import { SignJWT, jwtVerify } from "jose"

const ADMIN_SESSION_TTL = 60 * 60 * 24 * 30

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.CLIENT_AUTH_SECRET
  if (!secret) {
    throw new Error("ADMIN_JWT_SECRET or CLIENT_AUTH_SECRET environment variable is required")
  }
  return new TextEncoder().encode(secret)
}

export async function signToken(phone: string): Promise<string> {
  const secret = getSecret()
  const token = await new SignJWT({ phone })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${ADMIN_SESSION_TTL}s`)
    .setIssuedAt()
    .sign(secret)
  return token
}

export async function verifyToken(token: string): Promise<{ phone: string } | null> {
  try {
    const secret = getSecret()
    const { payload } = await jwtVerify(token, secret)
    if (!payload.phone || typeof payload.phone !== "string") return null
    return { phone: payload.phone as string }
  } catch {
    return null
  }
}

export function createAdminSessionCookie(token: string): string {
  const maxAge = ADMIN_SESSION_TTL
  return `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`
}

export function clearAdminSessionCookie(): string {
  return `admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
}
