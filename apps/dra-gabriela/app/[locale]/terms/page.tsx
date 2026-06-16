import { notFound } from "next/navigation"
import { isLocale } from "@/lib/content"
import data from "@/content/en/terminos.json"

export function generateStaticParams() {
  return [{ locale: "en" }]
}

export async function generateMetadata() {
  return { title: data?.title || "Terms" }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!['en'].includes(locale)) notFound()
  if (!data) notFound()
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {data.title && <h1 className="text-4xl md:text-5xl mb-3">{data.title}</h1>}
      {data.subtitle && <p className="text-lg text-[var(--fg-muted)] mb-12">{data.subtitle}</p>}
      {data.sections?.map((s: any, i: number) => (
        <section key={i} className="mb-10 last:mb-0">
          <h2 className="text-2xl mb-4">{s.heading}</h2>
          {s.body && <p className="text-[var(--fg-muted)] leading-relaxed mb-4">{s.body}</p>}
          {s.items?.length > 0 && (
            <ul className="space-y-2">
              {s.items.map((item: string, j: number) => (
                <li key={j} className="flex items-start gap-3 text-[var(--fg-muted)]"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" /><span>{item}</span></li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
