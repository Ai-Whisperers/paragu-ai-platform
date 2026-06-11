import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from '@/lib/content'

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

  // --- Locale routing: redirect bare paths to the user's preferred locale ---
  const pathname = request.nextUrl.pathname
  const hasLangPrefix = SUPPORTED_LANGS.includes(
    pathname.split('/').filter(Boolean)[0] as Lang,
  )

  if (!hasLangPrefix) {
    // Skip Next.js internals and assets
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/static') ||
      pathname.includes('.')
    ) {
      return response
    }

    // Try to detect preferred language from Accept-Language
    const acceptLang = request.headers.get('accept-language') ?? ''
    let preferred: Lang = DEFAULT_LANG
    if (acceptLang.startsWith('pt')) preferred = 'pt'
    else if (acceptLang.startsWith('en')) preferred = 'en'

    const url = request.nextUrl.clone()
    url.pathname = `/${preferred}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  // --- Rate limit on the public case-submission endpoint ---
  if (request.method === 'POST' && pathname === '/api/cases') {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({ error: 'Demasiados envíos. Esperá unos minutos.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } },
      )
    }
  }

  // --- Auth protection for /xx/admin/* (any locale) ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  // Skip Supabase if not configured (demo mode)
  if (!supabaseUrl || supabaseUrl === 'your_supabase_url' || !supabaseUrl.startsWith('http')) {
    return response
  }
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey!,
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

  const pathSegs = pathname.split('/').filter(Boolean)
  const isAdminRoute = pathSegs[1] === 'admin' && pathSegs[2] !== 'login'
  const isLoginPage = pathSegs[1] === 'admin' && pathSegs[2] === 'login'

  if (isAdminRoute && !user) {
    return NextResponse.redirect(new URL(`/${pathSegs[0]}/admin/login`, request.url))
  }
  if (isLoginPage && user) {
    return NextResponse.redirect(new URL(`/${pathSegs[0]}/admin`, request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
