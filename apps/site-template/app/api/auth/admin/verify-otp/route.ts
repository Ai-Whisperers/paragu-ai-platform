import { NextResponse } from "next/server"
import { verifyOTP } from "@/lib/auth/otp-service"
import { signToken } from "@/lib/auth/admin-auth"
import { apiError } from "@/lib/api/errors"

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS_PER_WINDOW = 5
const rateLimitMap = new Map<string, { count: number; windowStart: number }>()

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(key)
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(key, { count: 1, windowStart: now })
    return { allowed: true, remaining: MAX_ATTEMPTS_PER_WINDOW - 1 }
  }
  if (entry.count >= MAX_ATTEMPTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 }
  }
  entry.count++
  return { allowed: true, remaining: MAX_ATTEMPTS_PER_WINDOW - entry.count }
}

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") || "unknown"
}

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json()

    if (!phone || !otp) {
      return NextResponse.json(apiError("BAD_REQUEST", "Phone and OTP required"), { status: 400 })
    }

    const normalizedPhone = phone.startsWith("+") ? phone : `+${phone}`
    const ipKey = `admin_otp_verify:ip:${getClientIP(request)}`
    const ipCheck = checkRateLimit(ipKey)

    if (!ipCheck.allowed) {
      return NextResponse.json(
        apiError("RATE_LIMITED", "Demasiados intentos. Intenta nuevamente en 15 minutos."),
        { status: 429 }
      )
    }

    const valid = await verifyOTP(normalizedPhone, otp)

    if (!valid) {
      return NextResponse.json(apiError("INVALID_SIGNATURE", "Invalid or expired OTP"), { status: 400 })
    }

    rateLimitMap.delete(ipKey)

    const token = await signToken(normalizedPhone)

    const response = NextResponse.json({ success: true })
    response.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })

    return response
  } catch (err) {
    console.error("[verify-otp]", err)
    return NextResponse.json(apiError("INTERNAL_ERROR", "Verification failed"), { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(apiError("NOT_FOUND", "Method not allowed"), { status: 405 })
}