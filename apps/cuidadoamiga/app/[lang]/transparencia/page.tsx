import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { getTransparencia, getSite, isLang, type Lang } from '@/lib/content'
import type { TransparencyContent } from '@/lib/content-types'

export default async function TransparenciaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const t = getTransparencia(lang)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <Badge tone="rose" className="mb-4">
        {t.page.title}
      </Badge>
      <h1 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-br from-pink-500 to-violet-600 bg-clip-text text-transparent">
        {t.page.title}
      </h1>
      <p className="text-base text-foreground-muted leading-relaxed mb-10">
        {t.page.subtitle}
      </p>

      <div className="flex flex-col gap-6">
        <SectionCard title={t.sections.sources.title} body={t.sections.sources.body} />
        <SectionCard title={t.sections.moderation.title} body={t.sections.moderation.body} />
        <SectionCard title={t.sections.bias.title} body={t.sections.bias.body} />
        <SectionCard title={t.sections.report.title} body={t.sections.report.body} />
      </div>
    </div>
  )
}

function SectionCard({ title, body }: { title: string; body: string }) {
  return (
    <Card padding="lg">
      <h2 className="text-lg font-bold text-foreground mb-2 m-0">{title}</h2>
      <p className="text-sm text-foreground-muted leading-relaxed m-0">{body}</p>
    </Card>
  )
}
