'use client'

import { useState } from 'react'
import { SearchInput } from '@/components/ui/SearchInput'
import { FilterBar } from '@/components/ui/FilterBar'
import { Pagination } from '@/components/ui/Pagination'
import { CountryPicker } from '@/components/ui/CountryPicker'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { StatCard } from '@/components/ui/StatCard'
import { DonutChart } from '@/components/ui/DonutChart'
import { BarChart } from '@/components/ui/BarChart'
import { LineChart } from '@/components/ui/LineChart'
import { CSVExport } from '@/components/ui/CSVExport'
import { Tag } from '@/components/ui/Tag'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { CopyButton } from '@/components/ui/CopyButton'
import { Alert } from '@/components/ui/Alert'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { CountryCode } from '@/components/ui/CountryPicker'

const MOCK_UI = {
  search: {
    placeholder: 'Buscar casos…',
    clearButton: 'Limpiar',
    noResults: 'Sin resultados',
    resultsCount: '{count} resultados',
    searching: 'Buscando…',
  },
  filter: {
    label: 'Filtros',
    allCountries: 'Todos los países',
    allTypes: 'Todos los tipos',
    allYears: 'Todos los años',
    selectCountry: 'Seleccionar país',
    selectType: 'Seleccionar tipo',
    reset: 'Reiniciar',
    clearAll: 'Limpiar filtros',
  },
  pagination: {
    previous: 'Anterior',
    next: 'Siguiente',
    page: 'Página {page} de {total}',
    loading: 'Cargando…',
  },
  country: {
    placeholder: 'Seleccionar país…',
    noResults: 'Sin resultados',
    allCountries: 'Todos los países',
  },
  date: {
    from: 'Desde',
    to: 'Hasta',
    year: 'Año',
    allYears: 'Todos',
  },
  csv: {
    download: 'Exportar CSV',
    exporting: 'Exportando…',
    error: 'Error al exportar',
    success: 'Exportado',
  },
  copy: {
    copy: 'Copiar',
    copied: '¡Copiado!',
    copyLink: 'Copiar enlace',
  },
  share: {
    twitter: 'Twitter',
    whatsapp: 'WhatsApp',
    facebook: 'Facebook',
    copyLink: 'Copiar enlace',
    copied: '¡Copiado!',
    shareLink: 'Compartir',
  },
  alert: {
    dismiss: 'Cerrar',
    info: 'Información',
    success: 'Éxito',
    warning: 'Advertencia',
    danger: 'Peligro',
  },
  loading: {
    loading: 'Cargando…',
    saving: 'Guardando…',
    processing: 'Procesando…',
    error: 'Error',
  },
  statCards: {
    totalCases: 'Casos totales',
    totalCountries: 'Países',
    thisYear: 'Este año',
    thisMonth: 'Este mes',
    trendUp: '↑',
    trendDown: '↓',
    noChange: '—',
  },
}

const DONUT_DATA = [
  { label: 'Femicidio', value: 142, color: '#e11d48' },
  { label: 'Abuso', value: 89, color: '#f59e0b' },
  { label: 'Desaparición', value: 53, color: '#6366f1' },
  { label: 'Trata', value: 27, color: '#14b8a6' },
]

const BAR_DATA = [
  { label: '2020', value: 34 },
  { label: '2021', value: 42 },
  { label: '2022', value: 56 },
  { label: '2023', value: 61 },
  { label: '2024', value: 48 },
  { label: '2025', value: 39 },
]

const LINE_DATA = [
  { label: 'Ene', value: 12 },
  { label: 'Feb', value: 19 },
  { label: 'Mar', value: 15 },
  { label: 'Abr', value: 22 },
  { label: 'May', value: 28 },
  { label: 'Jun', value: 24 },
  { label: 'Jul', value: 31 },
  { label: 'Ago', value: 26 },
  { label: 'Sep', value: 20 },
  { label: 'Oct', value: 18 },
  { label: 'Nov', value: 14 },
  { label: 'Dic', value: 10 },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-rose-900 dark:text-rose-100 mb-4 pb-2 border-b border-rose-200 dark:border-rose-800">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4 items-start">{children}</div>
    </section>
  )
}

export function ComponentsPreview() {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState<string | undefined>(undefined)
  const [year, setYear] = useState<number | undefined>(undefined)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Alert variant="info" ui={MOCK_UI.alert}>
        Esta página muestra todos los componentes UI del sistema. Solo visible cuando
        <code className="mx-1 px-2 py-0.5 bg-rose-100 dark:bg-rose-900 rounded text-sm">
          NEXT_PUBLIC_DEV_COMPONENTS=true
        </code>
        está configurado.
      </Alert>

      <h1 className="text-3xl font-bold text-rose-900 dark:text-rose-100 mt-6 mb-2">Componentes UI</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Fase 5 — Primitivas compartidas</p>

      {/* ── Alert variants ── */}
      <Section title="Alert (variants)">
        <Alert variant="info" ui={MOCK_UI.alert}>Alerta informativa</Alert>
        <Alert variant="success" ui={MOCK_UI.alert}>Alerta de éxito</Alert>
        <Alert variant="warning" ui={MOCK_UI.alert}>Alerta de advertencia</Alert>
        <Alert variant="danger" ui={MOCK_UI.alert}>Alerta de peligro</Alert>
      </Section>

      {/* ── Búsqueda y filtros ── */}
      <Section title="SearchInput + CountryPicker + DateRangePicker + FilterBar + Pagination">
        <div className="w-full max-w-lg space-y-3">
          <SearchInput value={search} onChange={setSearch} ui={MOCK_UI.search} />
          <FilterBar ui={MOCK_UI.filter}>
            <CountryPicker value={country as CountryCode | undefined} onChange={(c) => setCountry(c as string)} ui={MOCK_UI.country} />
            <DateRangePicker year={year} onYearChange={setYear} ui={MOCK_UI.date} />
          </FilterBar>
          <Pagination page={1} totalPages={23} onPageChange={() => {}} ui={MOCK_UI.pagination} />
        </div>
      </Section>

      {/* ── Tags ── */}
      <Section title="Tag (variants)">
        <Tag variant="rose">Femicidio</Tag>
        <Tag variant="amber">Abuso</Tag>
        <Tag variant="green">Cerrado</Tag>
        <Tag variant="blue">En proceso</Tag>
        <Tag variant="neutral">Sin clasificar</Tag>
        <Tag variant="rose" onClose={() => {}}>Eliminable</Tag>
      </Section>

      {/* ── Botones de acción ── */}
      <Section title="CopyButton + ShareButtons + CSVExport">
        <CopyButton text="https://cuidadoamiga.org/es/caso/123" ui={MOCK_UI.copy} />
        <ShareButtons url="https://cuidadoamiga.org" text="Mirá este caso en Cuidado Amiga" ui={MOCK_UI.share} />
        <CSVExport url="/api/casos/exportar" ui={MOCK_UI.csv} filename="casos.csv" />
      </Section>

      {/* ── Loading ── */}
      <Section title="LoadingSpinner">
        <LoadingSpinner size="sm" ui={MOCK_UI.loading} />
        <LoadingSpinner size="md" ui={MOCK_UI.loading} />
        <LoadingSpinner size="lg" ui={MOCK_UI.loading} />
      </Section>

      {/* ── StatCards ── */}
      <Section title="StatCard">
        <StatCard value="311" label="Casos totales" trendDirection="up" trend="+12 %" ui={MOCK_UI.statCards} />
        <StatCard value="189" label="En proceso" />
        <StatCard value="95" label="Cerrados" />
        <StatCard value="27" label="Sin definir" />
      </Section>

      {/* ── Charts ── */}
      <Section title="DonutChart (300px)">
        <DonutChart data={DONUT_DATA} size={300} />
      </Section>

      <Section title="BarChart (500x250)">
        <BarChart data={BAR_DATA} height={250} />
      </Section>

      <Section title="LineChart (500x200)">
        <LineChart data={LINE_DATA} height={200} showDots />
      </Section>
    </div>
  )
}
