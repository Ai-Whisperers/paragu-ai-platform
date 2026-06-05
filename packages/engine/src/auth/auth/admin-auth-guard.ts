import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth/admin-auth"

export interface AuthResult {
  phone: string
  authorized: true
}

export async function requireAdminAuth(request: Request): Promise<AuthResult | NextResponse> {
  const cookieHeader = request.headers?.get("cookie") || ""
  const cookies: Record<string, string> = {}
  for (const pair of cookieHeader.split(";")) {
    const [key, ...val] = pair.trim().split("=")
    if (key) cookies[key] = val.join("=")
  }

  const adminSession = cookies["admin_session"]
  if (!adminSession) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 })
  }

  const payload = await verifyToken(adminSession)
  if (!payload) {
    return NextResponse.json({ error: "Sesión inválida o expirada" }, { status: 401 })
  }

  return { phone: payload.phone, authorized: true }
}