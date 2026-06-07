import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// In-memory rate limiting (per-instance, use Supabase/Redis in production for multi-instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60 * 1000
const MAX_REQUESTS = 30

const PUBLIC_AUTH_ROUTES = ["/api/auth/otp/", "/api/auth/logout", "/api/auth/login"]
const RATE_LIMITED_PATHS = ["/api/booking", "/api/contact", "/api/subscribe", "/api/auth/otp/send", "/api/auth/otp/verify", "/api/cart", "/api/gift-card", "/api/stripe", "/api/client", "/api/promo", "/api/referral"]

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  if (record.count >= MAX_REQUESTS) {
    return true
  }

  record.count++
  return false
}

const ADMIN_PREFIX = "/admin"
const PUBLIC_ADMIN_ROUTES = ["/admin/login", "/admin/api/"]
const CLIENT_PREFIX = "/mi-cuenta"
const SITE_SLUG = process.env.SITE_SLUG || "tu-emprendimiento"

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_AUTH_SECRET || process.env.ADMIN_JWT_SECRET || process.env.CLIENT_AUTH_SECRET
  if (!secret) {
    throw new Error("ADMIN_AUTH_SECRET environment variable is required")
  }
  return new TextEncoder().encode(secret)
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload))
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("")
}

async function verifyClientSession(token: string): Promise<string | null> {
  const parts = token.split(".")
  if (parts.length !== 4) return null
  const [expRaw, nonce, phoneHash, signature] = parts
  if (!expRaw || !nonce || !phoneHash || !signature) return null

  const secret = process.env.CLIENT_AUTH_SECRET || process.env.ADMIN_AUTH_SECRET
  if (!secret) {
    throw new Error("CLIENT_AUTH_SECRET or ADMIN_AUTH_SECRET environment variable is required")
  }
  const expected = await hmacSign(`${expRaw}.${nonce}.${phoneHash}`, secret)
  if (expected !== signature) return null

  const exp = Number(expRaw)
  if (!Number.isFinite(exp)) return null
  if (exp <= Math.floor(Date.now() / 1000)) return null

  return phoneHash
}

async function verifyAdminSession(token: string): Promise<string | null> {
  try {
    const secret = getSecret()
    const { payload } = await jwtVerify(token, secret)
    if (!payload.phone || typeof payload.phone !== "string") return null
    return payload.phone as string
  } catch {
    return null
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const userAgent = request.headers.get("user-agent")
  if (!userAgent || userAgent.length < 5) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const ip = request.headers.get("x-forwarded-for") ||
             request.headers.get("x-real-ip") ||
             "unknown"

  const response = NextResponse.next()
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  if (request.method === "POST" && RATE_LIMITED_PATHS.some(p => pathname.startsWith(p))) {
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." },
        { status: 429 }
      )
    }
  }

  if (PUBLIC_AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return response
  }

  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (PUBLIC_ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
      return response
    }
    const sessionCookie = request.cookies.get("admin_session")
    if (!sessionCookie?.value) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
    const phone = await verifyAdminSession(sessionCookie.value)
    if (!phone) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      const redirectResponse = NextResponse.redirect(loginUrl)
      redirectResponse.cookies.set("admin_session", "", { maxAge: 0, path: "/" })
      return redirectResponse
    }
    return response
  }

  if (pathname.startsWith(CLIENT_PREFIX)) {
    const sessionCookie = request.cookies.get(`${SITE_SLUG}_client_session`)
    if (!sessionCookie?.value) {
      const lang = pathname.startsWith("/es/mi-cuenta") ? "es" : pathname.startsWith("/en/mi-cuenta") ? "en" : "es"
      const loginUrl = new URL(`/${lang}/mi-cuenta`, request.url)
      loginUrl.searchParams.set("login", "1")
      return NextResponse.redirect(loginUrl)
    }

    const phoneHash = await verifyClientSession(sessionCookie.value)
    if (!phoneHash) {
      const loginUrl = new URL("/es/mi-cuenta", request.url)
      loginUrl.searchParams.set("login", "1")
      const redirectResponse = NextResponse.redirect(loginUrl)
      redirectResponse.cookies.set(`${SITE_SLUG}_client_session`, "", { maxAge: 0, path: "/" })
      return redirectResponse
    }

    response.headers.set("x-client-phone", phoneHash)
    return response
  }

  return response
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/mi-cuenta/:path*",
    "/es/mi-cuenta/:path*",
    "/en/mi-cuenta/:path*",
    "/api/booking/:path*",
    "/api/contact/:path*",
    "/api/subscribe/:path*",
    "/api/auth/otp/send/:path*",
    "/api/cart/:path*",
    "/api/gift-card/:path*",
    "/api/stripe/:path*",
    "/api/client/:path*",
    "/api/promo/:path*",
    "/api/referral/:path*",
  ],
}