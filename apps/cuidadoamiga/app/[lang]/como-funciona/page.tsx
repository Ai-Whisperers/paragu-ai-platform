import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getComoFunciona, isLang, type Lang } from '@/lib/content'

export default async function ComoFuncionaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const como = getComoFunciona(lang)

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
      <Badge tone="violet" className="mb-4">Transparencia</Badge>
      <h1 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-br from-pink-500 to-violet-600 bg-clip-text text-transparent">
        {como.title}
      </h1>
      <p className="text-base text-foreground-muted leading-relaxed mb-8">
        {como.subtitle}
      </p>

      <div className="flex flex-col gap-6">
        {como.sections.map((section, i) => (
          <Card key={i} padding="lg">
            <h2 className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-4">
              {section.title}
            </h2>
            {section.items ? (
              <ol className="m-0 p-0 list-none flex flex-col gap-3">
                {section.items.map((item, j) => (
                  <li key={j} className="text-sm text-foreground leading-relaxed flex gap-3">
                    <span
                      className="bg-gradient-to-br from-rose-700 to-pink-500 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      aria-hidden
                    >
                      {j + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            ) : null}
            {section.body ? (
              <p className="text-sm text-foreground leading-relaxed m-0">
                {section.body}{' '}
                {i === 3 ? (
                  <Link href={`/${lang}/unirse`} className="text-pink-600 underline hover:text-pink-700">
                    Para ser moderadora podés enviar tu solicitud desde /unirse.
                  </Link>
                ) : null}
              </p>
            ) : null}
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href={`/${lang}/reportar`}>
          <Button variant="primary" size="lg">+ Reportar caso</Button>
        </Link>
      </div>
    </div>
  )
}
