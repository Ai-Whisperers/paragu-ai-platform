'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { StatCard, StatCardGrid } from '@/components/ui/StatCard'
import { FilterBar, FilterSelect } from '@/components/ui/FilterBar'
import { BarChart } from '@/components/ui/BarChart'
import { DonutChart } from '@/components/ui/DonutChart'
import { CSVExport } from '@/components/ui/CSVExport'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import type { DataContent, UiStatCards, UiChart, UiCsv, UiFilter } from '@/lib/content-types'

interface StatsData {
  total: number
  thisYear: number
  thisMonth: number
  countries: number
  byCountry: Array<{ pais: string; count: number }>
  byYear: Array<{ year: number; count: number }>
  byType: Array<{ tipo: string; count: number }>
  byJudicialState: Array<{ state: string; count: number }>
}

interface DataPageClientProps {
  lang: string
  data: DataContent
  ui: {
    stat: UiStatCards
    chart: UiChart
    csv: UiCsv
    filter: UiFilter
  }
  countries: Array<{ code: string; name: string }>
}

const TYPE_OPTIONS = [
  { value: 'femicidio', label: 'Femicidio' },
  { value: 'abuso', label: 'Abuso' },
  { value: 'acoso', label: 'Acoso' },
]

const TYPE_LABELS: Record<string, string> = {
  femicidio: 'Femicidio',
  abuso: 'Abuso',
  acoso: 'Acoso',
}

const JUDICIAL_LABELS: Record<string, string> = {
  en_proceso: 'En proceso',
  cerrado: 'Cerrado',
  sin_datos: 'Sin datos',
}

export function DataPageClient({ lang, data, ui, countries }: DataPageClientProps) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pais, setPais] = useState<string | undefined>()
  const [tipo, setTipo] = useState<string | undefined>()

  async function fetchStats(p?: string, t?: string) {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (p) params.set('pais', p)
      if (t) params.set('tipo', t)
      const res = await fetch(`/api/stats?${params}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar estadísticas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStats(pais, tipo) }, [pais, tipo])

  function clearFilters() { setPais(undefined); setTipo(undefined) }

  const csvUrl = `/api/cases/export?${new URLSearchParams(pais ? { pais } : {}).toString()}`
  const hasFilters = !!pais || !!tipo

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <Badge tone="rose" className="mb-4">{data.page.title}</Badge>
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-br from-pink-500 to-violet-600 bg-clip-text text-transparent">
            {data.page.title}
          </h1>
          <p className="text-base text-foreground-muted leading-relaxed mt-2">{data.page.subtitle}</p>
        </div>
        {stats && stats.total > 0 && (
          <CSVExport
            url={csvUrl}
            ui={ui.csv}
            filename={`casos-${pais || 'todos'}.csv`}
          />
        )}
      </div>

      <FilterBar
        ui={ui.filter}
        hasActiveFilters={hasFilters}
        onClearAll={clearFilters}
        className="mb-6"
      >
        <FilterSelect
          options={countries.map((c) => ({ value: c.name, label: c.name }))}
          value={pais}
          onChange={setPais}
          placeholder={data.page.filters.allCountries}
        />
        <FilterSelect
          options={TYPE_OPTIONS}
          value={tipo}
          onChange={setTipo}
          placeholder={data.page.filters.allTypes}
        />
      </FilterBar>

      {loading && (
        <div className="flex justify-center py-20">
          <LoadingSpinner ui={{ loading: 'Cargando...', saving: '', processing: '', error: '' }} size="lg" />
        </div>
      )}

      {error && !loading && (
        <EmptyState title="Error" description={error} />
      )}

      {stats && stats.total === 0 && !loading && !error && (
        <EmptyState title={data.page.noData} />
      )}

      {stats && stats.total > 0 && !loading && (
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">{data.sections.overview}</h2>
            <StatCardGrid>
              <StatCard value={stats.total.toLocaleString()} label={ui.stat.totalCases} />
              <StatCard value={stats.countries} label={ui.stat.totalCountries} />
              <StatCard value={stats.thisYear.toLocaleString()} label={ui.stat.thisYear} />
              <StatCard value={stats.thisMonth.toLocaleString()} label={ui.stat.thisMonth} />
            </StatCardGrid>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">{data.sections.byCountry}</h2>
              <Card padding="lg">
                <BarChart
                  data={stats.byCountry.slice(0, 10).map((d, i) => ({ label: d.pais, value: d.count, color: i === 0 ? '#be123c' : '#e11d48' }))}
                  height={250}
                />
              </Card>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">{data.sections.byYear}</h2>
              <Card padding="lg">
                <BarChart
                  data={stats.byYear.map((d) => ({ label: String(d.year), value: d.count }))}
                  height={250}
                />
              </Card>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">{data.sections.byType}</h2>
              <Card padding="lg">
                <DonutChart
                  data={stats.byType.map((d) => ({ label: TYPE_LABELS[d.tipo] || d.tipo, value: d.count }))}
                  size={200}
                />
              </Card>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">{data.sections.byJudicialState}</h2>
              <Card padding="lg">
                <DonutChart
                  data={stats.byJudicialState.map((d) => ({ label: JUDICIAL_LABELS[d.state] || d.state, value: d.count }))}
                  size={200}
                />
              </Card>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}
