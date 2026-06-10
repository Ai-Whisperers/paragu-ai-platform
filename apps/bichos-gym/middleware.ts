// Locale detection middleware
// Redirects users from /path to /es/path (or detected locale) if no locale prefix
import { localeMiddleware } from '@ai-whisperers/i18n-paraguay/middleware';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return localeMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
