/**
 * ANNOTATION: RootRedirect
 *
 * What it is: The root landing page that immediately redirects visitors
 * to /es/ or /en/ based on their Accept-Language header. Falls back to Spanish.
 *
 * Why your business needs it: Every website needs a root URL that directs
 * visitors to the appropriate language version. Without this, users see a 404.
 *
 * What AI populates from your data: Nothing — this is a static redirect.
 *
 * Your input: No input needed. Default language is Spanish (es).
 */

import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default async function RootPage() {
  const headersList = await headers()
  const acceptLanguage = headersList.get("accept-language") || ""
  const preferredLang = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase()
  const lang = preferredLang === "en" ? "en" : "es"
  redirect(`/${lang}/`)
}