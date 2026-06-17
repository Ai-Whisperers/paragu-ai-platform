import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/content";

/**
 * POST /api/locale  body: { locale: "es" | "en" }
 * Sets the `mk_locale` cookie so subsequent server-rendered pages can
 * pick the right translation. Used by the language switcher in the footer.
 */
export async function POST(req: Request) {
  let body: { locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const l = body.locale;
  if (!l || !LOCALES.includes(l as Locale)) {
    return NextResponse.json({ error: `Locale must be one of: ${LOCALES.join(", ")}` }, { status: 400 });
  }
  const jar = await cookies();
  jar.set("mk_locale", l, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return NextResponse.json({ ok: true, locale: l });
}

export async function GET() {
  const jar = await cookies();
  return NextResponse.json({ locale: jar.get("mk_locale")?.value ?? DEFAULT_LOCALE });
}
