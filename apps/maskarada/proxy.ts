import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Locale routing (Next 16 proxy):
 *  - /en is a real route (the English home) — passes through.
 *  - /en/* (other English routes) are rewritten internally to /* so the
 *    underlying Spanish page renders. The `mk_locale=en` cookie is set so
 *    the Navbar/Footer render English. The browser URL stays /en/eventos.
 *  - /pt, /nl, etc. are 301'd to / (we don't ship those locales).
 *  - All other paths pass through.
 *
 * We also set the `x-pathname` header so the root layout can read the
 * current path server-side (Next doesn't expose this by default).
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const seg = pathname.split("/")[1];

  if (seg === "en") {
    if (pathname === "/en" || pathname === "/en/") {
      const res = NextResponse.next();
      setLocaleHeaders(res, req, "en");
      return res;
    }
    const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    const url = req.nextUrl.clone();
    url.pathname = bare;
    const res = NextResponse.rewrite(url);
    setLocaleHeaders(res, req, "en");
    return res;
  }

  if (seg === "pt" || seg === "nl") {
    return NextResponse.redirect(new URL("/", req.url), 301);
  }

  return NextResponse.next();
}

function setLocaleHeaders(res: NextResponse, req: NextRequest, locale: "es" | "en") {
  res.cookies.set("mk_locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  res.headers.set("x-pathname", req.nextUrl.pathname);
}

export const config = {
  // skip Next internals, API, and any path with a file extension
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
