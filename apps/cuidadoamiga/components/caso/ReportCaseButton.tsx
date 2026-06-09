'use client'

import { useState } from 'react'
import { getSite, type Lang } from '@/lib/content'

interface ReportCaseButtonProps {
  caseId: string
  lang: Lang
}

const MOTIVOS = [
  { value: 'factual_error', label: 'Error factual' },
  { value: 'wrong_photo', label: 'Foto incorrecta' },
  { value: 'wrong_person', label: 'Persona equivocada' },
  { value: 'fabricated', label: 'Caso falso' },
  { value: 'duplicate', label: 'Duplicado' },
  { value: 'other', label: 'Otro' },
]

export function ReportCaseButton({ caseId, lang }: ReportCaseButtonProps) {
  const [open, setOpen] = useState(false)
  const [motivo, setMotivo] = useState('')
  const [detalle, setDetalle] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!motivo) return
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/case-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_id: caseId, motivo, detalle }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Error al enviar')
      }
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-8 pt-6 border-t border-border">
      {!open && !done && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-sm text-foreground-muted hover:text-red-600 underline cursor-pointer bg-transparent border-0 transition-colors"
        >
          Reportar error en este caso
        </button>
      )}

      {open && !done && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-foreground m-0">¿Qué encontraste?</p>
          <div className="flex flex-wrap gap-2">
            {MOTIVOS.map((m) => (
              <label key={m.value} className="flex items-center gap-1.5 text-sm text-foreground-muted cursor-pointer">
                <input
                  type="radio"
                  name="motivo"
                  value={m.value}
                  checked={motivo === m.value}
                  onChange={() => setMotivo(m.value)}
                  className="accent-pink-600"
                />
                {m.label}
              </label>
            ))}
          </div>
          <textarea
            placeholder="Contanos más (opcional)"
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-surface resize-none h-20"
            maxLength={1000}
          />
          {error ? <p className="text-sm text-red-600 m-0">{error}</p> : null}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!motivo || submitting}
              className="text-sm bg-red-600 hover:bg-red-700 disabled:bg-surface-3 disabled:text-foreground-muted text-white px-4 py-1.5 rounded-lg font-medium border-0 cursor-pointer transition-colors"
            >
              {submitting ? 'Enviando...' : 'Enviar reporte'}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm text-foreground-muted hover:text-foreground bg-transparent border-0 cursor-pointer transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {done && (
        <p className="text-sm text-emerald-700 m-0 font-medium">
          Gracias por tu reporte. Nuestro equipo de moderación lo revisará.
        </p>
      )}
    </div>
  )
}
