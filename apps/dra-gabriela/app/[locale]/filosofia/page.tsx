import { notFound } from "next/navigation"
import { getContent, isLocale } from "@/lib/content"
import { renderContentPage as ContentPage } from "@/components/ContentPage"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = getContent(locale)
  const data = c.filosofia || c.philosophy
  return { title: data?.title || "Philosophy" }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const key = locale === "es" ? "filosofia" : "philosophy"
  return ContentPage({ locale, contentKey: key })
}
