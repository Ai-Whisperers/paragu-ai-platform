import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getServerSupabase } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { isLang, getCaseTypeLabels, getJudicialStateLabels, getCountries, type Lang } from '@/lib/content'

const CASE_TYPE_COLORS: Record<string, string> = {
  femicidio: '#be123c',
  abuso: '#7c3aed',
  acoso: '#db2777',
}

export default async function CasoDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang: langRaw, id } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'

  const supabase = await getServerSupabase()
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('id', id)
    .eq('estado', 'aprobado')
    .single()

  if (error || !data) notFound()

  const c = data as {
    id: string
    nombre: string
    victima: string | null
    fecha: string
    tipo: 'femicidio' | 'abuso' | 'acoso'
    pais: string
    ciudad: string | null
    descripcion: string | null
    foto_url: string | null
    fuentes: string[] | null
    proceso_judicial: 'en_proceso' | 'cerrado' | null
  }

  const typeLabels = getCaseTypeLabels(lang) as Record<typeof c.tipo, string>
  const judicialLabels = getJudicialStateLabels(lang) as Record<'en_proceso' | 'cerrado', string>
  const countries = getCountries()
  const country = countries.find((co) => co.name === c.pais)
  const countryName = country?.name ?? c.pais
  const color = CASE_TYPE_COLORS[c.tipo] ?? '#be123c'

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link href={`/${lang}`} className="text-sm text-foreground-muted hover:text-foreground inline-flex items-center gap-1 mb-6">
        ← Volver al mapa
      </Link>

      <Card padding="none" className="overflow-hidden">
        {c.foto_url ? (
          <div className="relative h-64 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.foto_url}
              alt={c.nombre}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
          </div>
        ) : null}

        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            {!c.foto_url ? (
              <div
                className="flex items-center justify-center rounded-full text-2xl flex-shrink-0"
                style={{ width: 64, height: 64, background: `${color}22`, border: `1px solid ${color}44` }}
                aria-hidden
              >
                🌸
              </div>
            ) : null}
            <div>
              <Badge tone={c.tipo === 'femicidio' ? 'rose' : c.tipo === 'abuso' ? 'violet' : 'pink'} size="md" className="mb-2">
                {typeLabels[c.tipo]}
              </Badge>
              <h1 className="text-2xl font-bold text-foreground m-0">{c.nombre}</h1>
              {c.victima ? (
                <p className="text-sm text-violet-700 mt-1 font-medium m-0">Víctima: {c.victima}</p>
              ) : null}
              <p className="text-sm text-foreground-muted mt-1 m-0">{c.fecha} · {countryName}</p>
            </div>
          </div>

          {c.proceso_judicial ? (
            <div className="mb-4">
              <Badge tone={c.proceso_judicial === 'cerrado' ? 'emerald' : 'orange'}>
                {judicialLabels[c.proceso_judicial]}
              </Badge>
            </div>
          ) : null}

          {c.descripcion ? (
            <div className="mb-6">
              <h2 className="text-xs uppercase tracking-wider text-foreground-muted mb-2 font-semibold">
                Descripción
              </h2>
              <p className="text-sm text-foreground leading-relaxed m-0">{c.descripcion}</p>
            </div>
          ) : null}

          {c.fuentes && c.fuentes.length > 0 ? (
            <div>
              <h2 className="text-xs uppercase tracking-wider text-foreground-muted mb-2 font-semibold">
                Fuentes
              </h2>
              <ul className="m-0 p-0 list-none flex flex-col gap-1">
                {c.fuentes.map((url, i) => (
                  <li key={i}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-pink-600 hover:underline break-all"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  )
}
