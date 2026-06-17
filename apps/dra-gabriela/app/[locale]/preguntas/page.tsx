// Cross-locale slug alias: /[locale]/preguntas → /[locale]/faq
// (the ES FAQ page lives at /es/faq, no separate preguntas route)
import { notFound, redirect } from "next/navigation"

const LOCALES = ["en", "es"] as const

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export default function PreguntasRedirect({ params }: { params: Promise<{ locale: string }> }) {
  return params.then(({ locale }) => {
    if (locale !== "en" && locale !== "es") notFound()
    redirect(`/${locale}/faq`)
  })
}
