'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { TextField, TextAreaField, SelectField } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { getErrors, type Lang } from '@/lib/content'

interface ReportarFormProps {
  lang: Lang
  title: string
  subtitle: string
  fields: {
    nombre: string
    victima: string
    fecha: string
    tipo: string
    pais: string
    descripcion: string
    direccion: string
    calle: string
    numero: string
    barrio: string
    ciudad: string
    cp: string
    fotoUrl: string
    fuentes: string
    procesoJudicial: string
  }
  tipoOptions: Array<{ value: string; label: string }>
  procesoOptions: Array<{ value: string; label: string }>
  submitLabel: string
  successTitle: string
  successBody: string
  hints: {
    victima: string
    fotoUrl: string
    direccion: string
  }
  countries: Array<{ code: string; name: string }>
}

export function ReportarForm({
  title,
  subtitle,
  fields,
  tipoOptions,
  procesoOptions,
  submitLabel,
  successTitle,
  successBody,
  hints,
  countries,
}: ReportarFormProps) {
  const errs = getErrors('es')
  const [form, setForm] = useState({
    nombre: '',
    victima: '',
    fecha: '',
    tipo: 'femicidio',
    pais: '',
    descripcion: '',
    calle: '',
    numero: '',
    barrio: '',
    ciudad: '',
    cp: '',
    foto_url: '',
    fuentes: '',
    proceso_judicial: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [geoError, setGeoError] = useState('')

  function set(field: keyof typeof form, value: string) {
    setForm((p) => ({ ...p, [field]: value }))
    if (['calle', 'numero', 'barrio', 'ciudad', 'cp'].includes(field)) setGeoError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setGeoError('')

    const addressParts = [form.calle, form.numero, form.barrio, form.ciudad, form.pais].filter(Boolean).join(', ')
    const coords = await geocode(addressParts)
    if (!coords) {
      setGeoError(errs.geocodeFailed)
      setLoading(false)
      return
    }

    const payload = {
      nombre: form.nombre,
      victima: form.victima || null,
      fecha: form.fecha,
      tipo: form.tipo,
      pais: form.pais,
      ciudad: form.ciudad || null,
      descripcion: form.descripcion,
      foto_url: form.foto_url || null,
      fuentes: form.fuentes.split('\n').map((s) => s.trim()).filter(Boolean),
      proceso_judicial: form.proceso_judicial || null,
      lat: coords.lat,
      lng: coords.lng,
    }

    const res = await fetch('/api/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(res.status === 429 ? errs.rateLimit : (data.error ?? errs.caseSend))
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex items-center justify-center px-4 py-16">
        <Card padding="lg" className="max-w-md text-center">
          <div className="text-5xl mb-4" aria-hidden>✅</div>
          <h2 className="text-xl font-bold mb-2 text-foreground">{successTitle}</h2>
          <p className="text-sm text-foreground-muted mb-6">{successBody}</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2 text-foreground">{title}</h1>
      <p className="text-sm text-foreground-muted mb-8">{subtitle}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField label={fields.nombre} value={form.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Nombre y apellido" required fullWidth />
        <TextField label={fields.victima} value={form.victima} onChange={(e) => set('victima', e.target.value)} placeholder="Nombre y apellido" hint={hints.victima} fullWidth />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label={fields.fecha} type="date" value={form.fecha} onChange={(e) => set('fecha', e.target.value)} required fullWidth />
          <SelectField
            label={fields.tipo}
            value={form.tipo}
            onChange={(e) => set('tipo', e.target.value)}
            options={tipoOptions}
            fullWidth
          />
        </div>

        <SelectField
          label={fields.pais}
          value={form.pais}
          onChange={(e) => set('pais', e.target.value)}
          options={[{ value: '', label: 'Seleccioná un país' }, ...countries.map((c) => ({ value: c.name, label: c.name }))]}
          required
          fullWidth
        />

        <TextAreaField label={fields.descripcion} rows={4} value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)} fullWidth />

        <Card variant="inset" padding="md" className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-wider text-foreground-muted mb-2 m-0">
            {fields.direccion} *
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <TextField label={fields.calle} placeholder="Av. Corrientes" value={form.calle} onChange={(e) => set('calle', e.target.value)} fullWidth />
            </div>
            <TextField label={fields.numero} placeholder="1234" value={form.numero} onChange={(e) => set('numero', e.target.value)} fullWidth />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextField label={fields.barrio} placeholder="Palermo" value={form.barrio} onChange={(e) => set('barrio', e.target.value)} fullWidth />
            <TextField label={fields.ciudad} placeholder="Buenos Aires" value={form.ciudad} onChange={(e) => set('ciudad', e.target.value)} required fullWidth />
          </div>
          <TextField label={fields.cp} placeholder="1414" value={form.cp} onChange={(e) => set('cp', e.target.value)} fullWidth />
          {geoError ? (
            <p className="text-xs text-red-600 m-0">{geoError}</p>
          ) : (
            <p className="text-xs text-foreground-subtle m-0">{hints.direccion}</p>
          )}
        </Card>

        <TextField label={fields.fotoUrl} type="url" placeholder="https://..." value={form.foto_url} onChange={(e) => set('foto_url', e.target.value)} hint={hints.fotoUrl} fullWidth />
        <TextAreaField label={fields.fuentes} rows={3} placeholder="https://diario.com/noticia" value={form.fuentes} onChange={(e) => set('fuentes', e.target.value)} fullWidth />

        <Card variant="inset" padding="md" className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-foreground-muted mb-2 m-0">
            {fields.procesoJudicial}
          </p>
          {procesoOptions.map((opt) => (
            <label key={opt.value || 'none'} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="proceso_judicial"
                value={opt.value}
                checked={form.proceso_judicial === opt.value}
                onChange={() => set('proceso_judicial', opt.value)}
                className="w-4 h-4 accent-rose-700"
              />
              <span className="text-sm text-foreground">{opt.label}</span>
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

async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!address) return null
  try {
    const encoded = encodeURIComponent(address)
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`, {
      headers: { 'Accept-Language': 'es' },
    })
    const data = await res.json()
    if (data && data[0]) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
    }
    return null
  } catch {
    return null
  }
}
