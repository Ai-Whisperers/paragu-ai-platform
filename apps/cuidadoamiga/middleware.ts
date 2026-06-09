import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Rate limit in-memory map: max 5 POSTs per 10 minutes per IP.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const window = 10 * 60 * 1000
  const limit = 5

  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window })
    return false
  }
  if (entry.count >= limit) return true
  entry.count++
  return false
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request })

  // Rate limit on the public case-submission endpoint
  if (request.method === 'POST' && request.nextUrl.pathname === '/api/cases') {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'

    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({ error: 'Demasiados envíos. Esperá unos minutos.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } },
      )
    }
  }

  // Auth protection for /es/admin/*
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()

  const isAdminRoute = request.nextUrl.pathname.includes('/admin') && !request.nextUrl.pathname.endsWith('/login')
  const isLoginPage = request.nextUrl.pathname.endsWith('/admin/login')

  if (isAdminRoute && !user) {
    return NextResponse.redirect(new URL('/es/admin/login', request.url))
  }
  if (isLoginPage && user) {
    return NextResponse.redirect(new URL('/es/admin', request.url))
  }

  return response
}

export const config = {
  matcher: ['/es/admin/:path*', '/api/cases'],
}
