import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@magnolia.com"

  // Read the admin_session cookie set by /api/auth/login
  const cookieHeader = request.headers.get("cookie") || ""
  const cookies: Record<string, string> = {}
  for (const pair of cookieHeader.split(";")) {
    const [key, ...val] = pair.trim().split("=")
    if (key) cookies[key] = val.join("=")
  }

  const adminSession = cookies["admin_session"]

  if (adminSession && adminSession === adminEmail) {
    return NextResponse.json({ ok: true, authenticated: true })
  }

  return NextResponse.json({ ok: true, authenticated: false }, { status: 401 })
}