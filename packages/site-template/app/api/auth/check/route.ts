import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth/admin-auth"

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || ""
  const cookies: Record<string, string> = {}
  for (const pair of cookieHeader.split(";")) {
    const [key, ...val] = pair.trim().split("=")
    if (key) cookies[key] = val.join("=")
  }

  const adminSession = cookies["admin_session"]

  if (!adminSession) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 })
  }

  const payload = await verifyToken(adminSession)
  if (!payload) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ ok: true, authenticated: true })
}