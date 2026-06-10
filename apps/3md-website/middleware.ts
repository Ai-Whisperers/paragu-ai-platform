// Locale detection middleware — redirects to locale prefix if none present
import { localeMiddleware } from '@ai-whisperers/i18n-paraguay/middleware';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return localeMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};