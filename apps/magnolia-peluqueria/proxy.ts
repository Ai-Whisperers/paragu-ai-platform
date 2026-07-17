import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_PREFIX = "/admin"
const PUBLIC_ADMIN_ROUTES = ["/admin/login", "/admin/api/"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip non-admin routes
  if (!pathname.startsWith(ADMIN_PREFIX)) {
    return NextResponse.next()
  }

  // Allow public admin routes
  if (PUBLIC_ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check session cookie
  const sessionCookie = request.cookies.get("admin_session")
  if (!sessionCookie?.value) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}