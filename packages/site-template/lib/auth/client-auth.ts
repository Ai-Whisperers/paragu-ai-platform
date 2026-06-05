import crypto from "crypto"

export const SESSION_COOKIE = "tu-emprendimiento_client_session"
export const SESSION_TTL = 60 * 60 * 24 * 30

function getSecret(): string {
  const secret = process.env.CLIENT_AUTH_SECRET
  if (!secret) {
    throw new Error("CLIENT_AUTH_SECRET environment variable must be set (minimum 24 characters)")
  }
  if (secret.length < 24) throw new Error("CLIENT_AUTH_SECRET must be >= 24 chars")
  return secret
}

function sign(payload: string): string {
  const hmac = crypto.createHmac("sha256", getSecret())
  hmac.update(payload)
  return hmac.digest("hex")
}

function hashPhone(phone: string): string {
  return crypto.createHash("sha256").update(phone).digest("hex").slice(0, 24)
}

export function createSessionToken(phone: string): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL
  const nonce = crypto.randomBytes(12).toString("hex")
  const phoneHash = hashPhone(phone)
  const payload = `${exp}.${nonce}.${phoneHash}`
  const signature = sign(payload)
  return `${payload}.${signature}`
}

export function verifySessionToken(token?: string | null): { phone: string; exp: number } | null {
  if (!token) return null
  const parts = token.split(".")
  if (parts.length !== 4) return null
  const [expRaw, nonce, phoneHash, signature] = parts
  if (!expRaw || !nonce || !phoneHash || !signature) return null

  const expected = sign(`${expRaw}.${nonce}.${phoneHash}`)
  const expectedBuf = Buffer.from(expected, "utf8")
  const providedBuf = Buffer.from(signature, "utf8")
  if (expectedBuf.length !== providedBuf.length) return null
  if (!crypto.timingSafeEqual(expectedBuf, providedBuf)) return null

  const exp = Number(expRaw)
  if (!Number.isFinite(exp)) return null
  if (exp <= Math.floor(Date.now() / 1000)) return null

  return { phone: phoneHash, exp }
}
