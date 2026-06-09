'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TextField, TextAreaField, SelectField } from '@/components/ui/Field'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getErrors, type Lang } from '@/lib/content'

interface UnirseFormProps {
  lang: Lang
  title: string
  subtitle: string
  fields: {
    nombre: string
    mail: string
    pais: string
    organizacion: string
    motivo: string
    comoSeEntero: string
  }
  comoSeEnteroOptions: Array<{ value: string; label: string }>
  consent: string[]
  submitLabel: string
  successTitle: string
  successBody: string
  countries: Array<{ code: string; name: string }>
}

export function UnirseForm({
  lang,
  title,
  subtitle,
  fields,
  comoSeEnteroOptions,
  consent,
  submitLabel,
  successTitle,
  successBody,
  countries,
}: UnirseFormProps) {
  const [form, setForm] = useState({
    nombre: '',
    mail: '',
    pais: '',
    organizacion: '',
    motivo: '',
    como_se_entero: '',
  })
  const [checks, setChecks] = useState({ protocolo: false, sensible: false })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const errs = getErrors(lang)

  function setField(field: keyof typeof form, value: string) {
    setForm((p) => ({ ...p, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!checks.protocolo || !checks.sensible) {
      setError(errs.solicitudConsent)
      return
    }
    setLoading(true)
    setError('')
    const res = await fetch('/api/solicitud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      setError(errs.solicitudSend)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex items-center justify-center px-4 py-16">
        <Card padding="lg" className="max-w-md w-full text-center">
          <div className="text-5xl mb-4" aria-hidden>💜</div>
          <h2 className="text-xl font-bold mb-3 text-foreground">{successTitle}</h2>
          <p className="text-sm text-foreground-muted leading-relaxed mb-6">{successBody}</p>
          <Link href={`/${lang}`}>
            <Button variant="primary" size="md">Volver al mapa</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Badge tone="violet" className="mb-4">Acceso para moderadoras</Badge>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-br from-pink-500 to-violet-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-sm text-foreground-muted leading-relaxed mb-8">{subtitle}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField label={fields.nombre} placeholder="Puede ser un seudónimo" value={form.nombre} onChange={(e) => setField('nombre', e.target.value)} required fullWidth />
        <TextField label={fields.mail} type="email" placeholder="tu@mail.com" value={form.mail} onChange={(e) => setField('mail', e.target.value)} required fullWidth />
        <SelectField
          label={fields.pais}
          value={form.pais}
          onChange={(e) => setField('pais', e.target.value)}
          options={[{ value: '', label: 'Seleccioná tu país' }, ...countries.map((c) => ({ value: c.name, label: c.name }))]}
          required
          fullWidth
        />
        <TextField
          label={fields.organizacion}
          placeholder="Nombre de la organización, si aplica"
          value={form.organizacion}
          onChange={(e) => setField('organizacion', e.target.value)}
          fullWidth
        />
        <TextAreaField
          label={fields.motivo}
          rows={4}
          maxLength={300}
          value={form.motivo}
          onChange={(e) => setField('motivo', e.target.value)}
          hint={`${form.motivo.length}/300`}
          required
          fullWidth
        />
        <SelectField
          label={fields.comoSeEntero}
          value={form.como_se_entero}
          onChange={(e) => setField('como_se_entero', e.target.value)}
          options={[{ value: '', label: 'Seleccioná una opción' }, ...comoSeEnteroOptions]}
          required
          fullWidth
        />

        <Card variant="inset" padding="md" className="flex flex-col gap-3">
          {consent.map((line, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={i === 0 ? checks.protocolo : checks.sensible}
                onChange={(e) =>
                  setChecks((p) => ({ ...p, [i === 0 ? 'protocolo' : 'sensible']: e.target.checked }))
                }
                className="mt-1 w-4 h-4 accent-pink-500 flex-shrink-0"
              />
              <span className="text-sm text-foreground leading-relaxed">
                {i === 0 ? (
                  <>
                    Leí y acepto el{' '}
                    <Link href={`/${lang}/protocolo`} target="_blank" className="text-pink-600 underline hover:text-pink-700">
                      protocolo de moderación
                    </Link>
                  </>
                ) : (
                  line
                )}
              </span>
            </label>
          ))}
        </Card>

        {error ? <p className="text-sm text-red-600 m-0">{error}</p> : null}

        <div>
          <Button type="submit" variant="primary" size="lg" loading={loading}>
            {loading ? 'Enviando...' : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  )
}
