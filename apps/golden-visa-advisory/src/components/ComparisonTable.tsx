'use client'

import { useLocale } from '@/lib/locale-context'
import content from '@/content'

const programs = content.programs

export function ComparisonTable() {
  const { locale, t } = useLocale()
  const isEs = locale === 'es'
  const isPt = locale === 'pt'

  const rows = [
    { label: t.investor.comparisonTable?.residencyType || 'Residency Type', fields: ['type', 'type', 'type'] },
    { label: t.investor.comparisonTable?.investment || 'Investment', fields: ['investment', 'investment', 'investment'] },
    { label: t.investor.comparisonTable?.jobCreation || 'Job Creation', fields: ['jobCreation', 'jobCreation', '-'] },
    { label: t.investor.comparisonTable?.presence || 'Presence', fields: ['presence', 'presence', 'presence'] },
    { label: t.investor.comparisonTable?.citizenship || 'Citizenship Path', fields: ['citizenship', 'citizenship', 'citizenship'] },
    { label: t.investor.comparisonTable?.processing || 'Processing', fields: ['processing', 'processing', 'processing'] },
    { label: t.investor.comparisonTable?.bestFor || 'Best For', fields: ['bestFor', 'bestFor', 'bestFor'] },
  ]

  const suffix = isEs ? 'Es' : isPt ? 'Pt' : ''
  const keys = ['temporaryResidency', 'suace', 'investorPass']

  return (
    <div>
      <h2 className="section-title gradient-gold">{t.investor.comparisonTable?.title || 'Choose Your Program'}</h2>
      <p className="section-subtitle">{t.investor.comparisonTable?.subtitle || ''}</p>
      <div className="overflow-x-auto mt-10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-sm font-medium text-muted w-36">{t.investor.comparisonTable?.feature || 'Feature'}</th>
              {keys.map(k => (
                <th key={k} className="py-4 px-3 text-sm font-semibold">
                  {k === 'investorPass' && '✨ '}{(programs as any)[k][`name${suffix}`] || (programs as any)[k].name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                <td className="py-4 pr-4 text-sm font-medium text-muted">{row.label}</td>
                {keys.map((k, j) => {
                  const p = (programs as any)[k]
                  const val = p[`${row.fields[j]}${suffix}`] || p[row.fields[j]]
                  const isNew = k === 'investorPass'
                  return (
                    <td key={j} className={`py-4 px-3 text-sm ${isNew ? 'text-primary' : 'text-foreground'}`}>
                      {val === '-' ? <span className="text-muted">—</span> : val}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
