// Next.js middleware helpers for locale detection and routing
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isLocale } from './index';

export function localeMiddleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Skip non-page paths (API, static files, etc.)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // files with extensions (images, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if path already has a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  let detectedLocale = defaultLocale;

  if (acceptLanguage.includes('pt')) detectedLocale = 'pt';
  else if (acceptLanguage.includes('en')) detectedLocale = 'en';
  else if (acceptLanguage.includes('guarani') || acceptLanguage.includes('gn')) detectedLocale = 'guarani';

  // Redirect to locale-prefixed URL
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}${pathname.endsWith('/') ? '' : '/'}`;
  return NextResponse.redirect(newUrl);
}
