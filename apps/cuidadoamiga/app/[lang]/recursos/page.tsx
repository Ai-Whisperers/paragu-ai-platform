import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { getRecursos, getRecursosLatam, getSite, isLang, type Lang } from '@/lib/content'

export default async function RecursosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const recursos = getRecursos(lang)
  const site = getSite(lang)
  const paises = getRecursosLatam()

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <Badge tone="rose" className="mb-4">Recursos</Badge>
      <h1 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-br from-pink-500 to-violet-600 bg-clip-text text-transparent">
        {recursos.title}
      </h1>
      <p className="text-base text-foreground-muted leading-relaxed mb-8">
        {recursos.subtitle}
      </p>

      {/* Emergency alert */}
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 mb-8 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0" aria-hidden>🚨</span>
        <p className="text-sm text-rose-800 leading-relaxed m-0">
          <strong className="text-rose-900">{recursos.emergencyBanner.title}</strong>, {recursos.emergencyBanner.body}
        </p>
      </div>

      {/* Country list */}
      <div className="flex flex-col gap-6">
        {paises.map((pais) => (
          <Card key={pais.codigo} padding="none" className="overflow-hidden">
            <div className="px-5 py-4 bg-surface-2 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>{pais.emoji}</span>
                <h2 className="text-base font-bold text-foreground m-0">{pais.nombre}</h2>
              </div>
              {pais.emergencia ? (
                <div className="bg-rose-50 border border-rose-200 rounded-md px-3 py-1 flex items-center gap-2">
                  <span aria-hidden>📞</span>
                  <span className="text-sm font-extrabold text-rose-700">{pais.emergencia}</span>
                </div>
              ) : null}
            </div>
            <ul className="divide-y divide-border m-0 p-0 list-none">
              {pais.recursos.map((r, i) => (
                <li key={i} className="px-5 py-3 flex items-start gap-3">
                  <span className="bg-surface-3 text-foreground-muted border border-border text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 uppercase tracking-wider">
                    {recursos.recursoTypes[r.tipo] ?? r.tipo}
                  </span>
                  <div className="flex-1 min-w-0">
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground hover:text-pink-600 no-underline transition-colors">
                        {r.nombre} →
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-foreground">{r.nombre}</span>
                    )}
                    <p className="text-xs text-foreground-muted mt-0.5 m-0 leading-relaxed">{r.detalle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 mt-10 text-center">
        <p className="text-sm text-violet-800 m-0 leading-relaxed">
          {recursos.missingBanner.replace('{email}', footerEmail(lang))}
        </p>
      </div>
    </div>
  )
}

function footerEmail(lang: Lang) {
  return getSite(lang)._meta.email
}
