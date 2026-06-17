import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = new Set(["es", "en"]);

/**
 * Locale routing:
 *  - Default locale (es) is served at the bare path: /, /eventos, etc.
 *  - English is served at the prefixed path: /en, /en/eventos, etc.
 *  - On the first visit, the visitor's preference is taken from
 *    Accept-Language and stored in the `mk_locale` cookie.
 *  - The cookie is also set when the visitor clicks the language switcher
 *    (handled by /api/locale).
 *  - Bare paths always serve Spanish. /en/* always serves English.
 *  - Other locale prefixes (/pt, /nl) are 301'd to / so we don't have
 *    dead wrappers sitting around.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const seg = pathname.split("/")[1];
  if (seg === "en") {
    const res = NextResponse.next();
    res.cookies.set("mk_locale", "en", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }
  if (LOCALES.has(seg) && seg !== "es") {
    // any other (non-shipped) locale → home
    return NextResponse.redirect(new URL("/", req.url), 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
