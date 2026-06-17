// Cross-locale slug alias: /[locale]/nosotros → /[locale]/about
// Locale-aware so /en/nosotros → /en/about (not /es/about).
import { notFound, redirect } from "next/navigation"

const LOCALES = ["en", "es"] as const

export function generateStaticParams() {
  // Both locales can hit this alias
  return LOCALES.map((l) => ({ locale: l }))
}

export default function NosotrosRedirect({ params }: { params: Promise<{ locale: string }> }) {
  return params.then(({ locale }) => {
    if (locale !== "en" && locale !== "es") notFound()
    redirect(`/${locale}/about`)
  })
}
