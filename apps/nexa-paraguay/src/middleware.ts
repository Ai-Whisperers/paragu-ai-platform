import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['es', 'en', 'nl', 'de'] as const

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, API routes, and Next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next()
  }

  // Extract locale from path: /es/.../... → 'es'
  const segments = pathname.split('/').filter(Boolean)
  const firstSeg = segments[0]
  const locale = (LOCALES as readonly string[]).includes(firstSeg) ? firstSeg : 'es'

  // Clone request headers and set x-next-locale so layouts can read it
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-next-locale', locale)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  // Run on every page request, but skip Next internals and static files
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
}