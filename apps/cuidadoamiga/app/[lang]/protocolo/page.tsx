import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getProtocolo, isLang, type Lang } from '@/lib/content'

export default async function ProtocoloPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const protocolo = getProtocolo(lang)

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
      <Badge tone="violet" className="mb-4">Documento público</Badge>
      <h1 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-br from-pink-500 to-violet-600 bg-clip-text text-transparent">
        {protocolo.title}
      </h1>
      <p className="text-base text-foreground-muted leading-relaxed mb-8">
        {protocolo.subtitle}
      </p>

      <Card padding="lg">
        {protocolo.sections.map((section, i) => (
          <div key={i} className={i > 0 ? 'mt-8 pt-8 border-t border-border' : ''}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-4">
              {section.title}
            </h2>
            {section.items ? (
              <ul className="m-0 p-0 list-none flex flex-col gap-2">
                {section.items.map((item, j) => (
                  <li key={j} className="text-sm text-foreground leading-relaxed pl-5 relative">
                    <span className="absolute left-0 text-violet-600 font-bold" aria-hidden>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {section.body ? (
              <p className="text-sm text-foreground leading-relaxed m-0">{section.body}</p>
            ) : null}
          </div>
        ))}
      </Card>

      <div className="mt-10 text-center">
        <Link href={`/${lang}/unirse`}>
          <Button variant="primary" size="lg">Quiero ser moderadora →</Button>
        </Link>
      </div>
    </div>
  )
}
