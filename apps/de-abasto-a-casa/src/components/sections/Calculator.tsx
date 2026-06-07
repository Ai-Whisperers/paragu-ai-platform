'use client'

import { useState, useMemo } from 'react'
import { Calculator as CalculatorIcon, TrendingDown, Clock, Percent } from 'lucide-react'
import content from '@/content/es.json'

interface FieldConfig {
  label: string
  default: number
}

const fields: Record<string, FieldConfig> = content.home.calculator.fields
const { positiveCopy, negativeCopy, cta } = content.home.calculator

function formatGs(value: number): string {
  return new Intl.NumberFormat('es-PY').format(Math.round(value))
}

function formatGsInput(value: number): string {
  // Remove decimals, format with thousand separators
  return new Intl.NumberFormat('es-PY', { maximumFractionDigits: 0 }).format(value)
}

function parseGsInput(raw: string): number {
  // Remove any non-digit characters except comma/dot
  const cleaned = raw.replace(/[^\d,.]/g, '').replace(/,/g, '')
  const num = Number(cleaned)
  return isNaN(num) ? 0 : num
}

type InputKey = 'gastoSuper' | 'gastoDelivery' | 'comidaTirada' | 'gasLuz' | 'personas' | 'valorHora' | 'horasCocina'

export default function Calculator() {
  const initialValues: Record<InputKey, number> = {
    gastoSuper: fields.gastoSuper.default,
    gastoDelivery: fields.gastoDelivery.default,
    comidaTirada: fields.comidaTirada.default,
    gasLuz: fields.gasLuz.default,
    personas: fields.personas.default,
    valorHora: fields.valorHora.default,
    horasCocina: fields.horasCocina.default,
  }

  const [values, setValues] = useState<Record<InputKey, string>>(() => {
    const initial: Record<string, string> = {}
    for (const key of Object.keys(initialValues) as InputKey[]) {
      initial[key] = formatGsInput(initialValues[key])
    }
    return initial as Record<InputKey, string>
  })

  const handleChange = (key: InputKey, raw: string) => {
    setValues((prev) => ({ ...prev, [key]: raw }))
  }

  const handleBlur = (key: InputKey) => {
    setValues((prev) => {
      const num = parseGsInput(prev[key])
      return { ...prev, [key]: formatGsInput(num) }
    })
  }

  const nums = useMemo(() => {
    const parsed: Record<string, number> = {}
    for (const key of Object.keys(values) as InputKey[]) {
      parsed[key] = parseGsInput(values[key])
    }
    return parsed as Record<InputKey, number>
  }, [values])

  // Calculations
  const totalGasto = nums.gastoSuper + nums.gastoDelivery + nums.comidaTirada + nums.gasLuz
  const valorTiempo = nums.valorHora * nums.horasCocina
  const costoTotalReal = totalGasto + valorTiempo

  let precioServicio = 0
  if (nums.personas <= 1) {
    precioServicio = 400000
  } else if (nums.personas === 2) {
    precioServicio = 650000
  } else {
    precioServicio = 900000
  }

  const ahorro = costoTotalReal - precioServicio
  const horasRecuperadas = nums.horasCocina
  const isPositive = ahorro > 0

  // WhatsApp text
  const waText = useMemo(() => {
    const lines = [
      'Hola! Quiero pedir mi propuesta personalizada 🙌',
      '',
      '📊 *Mis números de la calculadora:*',
      `• Gasto supermercado: Gs. ${formatGs(nums.gastoSuper)}/sem`,
      `• Delivery / afuera: Gs. ${formatGs(nums.gastoDelivery)}/sem`,
      `• Comida tirada: Gs. ${formatGs(nums.comidaTirada)}/sem`,
      `• Gas/luz/agua: Gs. ${formatGs(nums.gasLuz)}/sem`,
      `• Personas en hogar: ${nums.personas}`,
      `• Valor hora libre: Gs. ${formatGs(nums.valorHora)}`,
      `• Horas cocina/sem: ${nums.horasCocina}`,
      '',
      `💰 *Resultado:* Gasto total real: Gs. ${formatGs(costoTotalReal)}/sem`,
      `   Precio servicio: Gs. ${formatGs(precioServicio)}/sem`,
      isPositive
        ? `   ✅ Ahorro estimado: Gs. ${formatGs(ahorro)}/sem`
        : `   ℹ️ Costo comparable`,
    ]
    return encodeURIComponent(lines.join('\n'))
  }, [nums, costoTotalReal, precioServicio, ahorro, isPositive])

  const waHref = `https://wa.me/595981324569?text=${waText}`

  return (
    <section id="calculadora" className="section-padding bg-[var(--color-surface)]">
      <div className="container-max">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
            {content.home.calculator.title}
          </h2>
          <p className="font-[var(--font-body)] text-lg text-[var(--color-text-muted)] max-w-xl mx-auto">
            {content.home.calculator.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form inputs */}
          <div className="space-y-5">
            {/* Gasto supermercado */}
            <div>
              <label className="block font-[var(--font-body)] text-sm font-medium text-[var(--color-text)] mb-1.5">
                {fields.gastoSuper.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-[var(--font-body)] text-sm text-[var(--color-text-muted)] font-semibold pointer-events-none">
                  Gs.
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={values.gastoSuper}
                  onChange={(e) => handleChange('gastoSuper', e.target.value)}
                  onBlur={() => handleBlur('gastoSuper')}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--color-crema-dark)] bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-mercado)]/30 focus:border-[var(--color-mercado)] transition-colors"
                />
              </div>
            </div>

            {/* Delivery / comer afuera */}
            <div>
              <label className="block font-[var(--font-body)] text-sm font-medium text-[var(--color-text)] mb-1.5">
                {fields.gastoDelivery.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-[var(--font-body)] text-sm text-[var(--color-text-muted)] font-semibold pointer-events-none">
                  Gs.
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={values.gastoDelivery}
                  onChange={(e) => handleChange('gastoDelivery', e.target.value)}
                  onBlur={() => handleBlur('gastoDelivery')}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--color-crema-dark)] bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-mercado)]/30 focus:border-[var(--color-mercado)] transition-colors"
                />
              </div>
            </div>

            {/* Comida tirada */}
            <div>
              <label className="block font-[var(--font-body)] text-sm font-medium text-[var(--color-text)] mb-1.5">
                {fields.comidaTirada.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-[var(--font-body)] text-sm text-[var(--color-text-muted)] font-semibold pointer-events-none">
                  Gs.
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={values.comidaTirada}
                  onChange={(e) => handleChange('comidaTirada', e.target.value)}
                  onBlur={() => handleBlur('comidaTirada')}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--color-crema-dark)] bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-mercado)]/30 focus:border-[var(--color-mercado)] transition-colors"
                />
              </div>
            </div>

            {/* Gas + luz + agua cocina */}
            <div>
              <label className="block font-[var(--font-body)] text-sm font-medium text-[var(--color-text)] mb-1.5">
                {fields.gasLuz.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-[var(--font-body)] text-sm text-[var(--color-text-muted)] font-semibold pointer-events-none">
                  Gs.
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={values.gasLuz}
                  onChange={(e) => handleChange('gasLuz', e.target.value)}
                  onBlur={() => handleBlur('gasLuz')}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--color-crema-dark)] bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-mercado)]/30 focus:border-[var(--color-mercado)] transition-colors"
                />
              </div>
            </div>

            {/* Personas en hogar */}
            <div>
              <label className="block font-[var(--font-body)] text-sm font-medium text-[var(--color-text)] mb-1.5">
                {fields.personas.label}
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={parseGsInput(values.personas)}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === '' || /^\d+$/.test(v)) {
                    handleChange('personas', v || '0')
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-crema-dark)] bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-mercado)]/30 focus:border-[var(--color-mercado)] transition-colors"
              />
            </div>

            {/* Valor hora libre */}
            <div>
              <label className="block font-[var(--font-body)] text-sm font-medium text-[var(--color-text)] mb-1.5">
                {fields.valorHora.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-[var(--font-body)] text-sm text-[var(--color-text-muted)] font-semibold pointer-events-none">
                  Gs.
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={values.valorHora}
                  onChange={(e) => handleChange('valorHora', e.target.value)}
                  onBlur={() => handleBlur('valorHora')}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--color-crema-dark)] bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-mercado)]/30 focus:border-[var(--color-mercado)] transition-colors"
                />
              </div>
            </div>

            {/* Horas/semana comprando+cocinando */}
            <div>
              <label className="block font-[var(--font-body)] text-sm font-medium text-[var(--color-text)] mb-1.5">
                {fields.horasCocina.label}
              </label>
              <input
                type="number"
                min={0}
                max={168}
                step={0.5}
                value={parseGsInput(values.horasCocina)}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === '' || /^\d*\.?\d*$/.test(v)) {
                    handleChange('horasCocina', v || '0')
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-crema-dark)] bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-body)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-mercado)]/30 focus:border-[var(--color-mercado)] transition-colors"
              />
            </div>
          </div>

          {/* Results panel */}
          <div className="bg-[var(--color-surface-alt)] border border-[var(--color-crema-dark)] rounded-2xl p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-mercado)]/10 flex items-center justify-center text-[var(--color-mercado)]">
                <CalculatorIcon className="w-5 h-5" />
              </div>
              <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text)]">
                Resultado
              </h3>
            </div>

            <div className="space-y-4 mb-6">
              {/* Total gasto directo */}
              <div className="flex items-center justify-between py-2 border-b border-[var(--color-crema-dark)]">
                <span className="font-[var(--font-body)] text-sm text-[var(--color-text-muted)]">
                  Gasto directo (super + delivery + tirada + servicios)
                </span>
                <span className="font-[var(--font-body)] text-sm font-semibold text-[var(--color-text)]">
                  Gs. {formatGs(totalGasto)}
                  <span className="text-xs text-[var(--color-text-muted)] ml-1">/sem</span>
                </span>
              </div>

              {/* Valor del tiempo */}
              <div className="flex items-center justify-between py-2 border-b border-[var(--color-crema-dark)]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--color-terracota)]" />
                  <span className="font-[var(--font-body)] text-sm text-[var(--color-text-muted)]">
                    Valor de tu tiempo
                  </span>
                </div>
                <span className="font-[var(--font-body)] text-sm font-semibold text-[var(--color-text)]">
                  Gs. {formatGs(valorTiempo)}
                  <span className="text-xs text-[var(--color-text-muted)] ml-1">/sem</span>
                </span>
              </div>

              {/* Costo total real */}
              <div className="flex items-center justify-between py-3">
                <span className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-text)]">
                  Costo total real
                </span>
                <span className="font-[var(--font-heading)] text-lg font-bold text-[var(--color-text)]">
                  Gs. {formatGs(costoTotalReal)}
                  <span className="text-xs text-[var(--color-text-muted)] ml-1">/sem</span>
                </span>
              </div>

              {/* Precio del servicio */}
              <div className="flex items-center justify-between py-2 border-t border-[var(--color-crema-dark)] bg-[var(--color-surface)]/50 rounded-xl px-3">
                <span className="font-[var(--font-body)] text-sm text-[var(--color-text-muted)]">
                  Precio del servicio ({nums.personas} {nums.personas === 1 ? 'persona' : 'personas'})
                </span>
                <span className="font-[var(--font-body)] text-sm font-bold text-[var(--color-mercado)]">
                  − Gs. {formatGs(precioServicio)}
                  <span className="text-xs text-[var(--color-text-muted)] ml-1">/sem</span>
                </span>
              </div>

              {/* Divider */}
              <hr className="border-[var(--color-crema-dark)]" />

              {/* Ahorro or negative copy */}
              {isPositive ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-emerald-600" />
                    <span className="font-[var(--font-heading)] text-base font-semibold text-emerald-800">
                      Ahorrás Gs. {formatGs(ahorro)}/semana
                    </span>
                  </div>
                  <p className="font-[var(--font-body)] text-sm text-emerald-700 leading-relaxed">
                    {positiveCopy}
                  </p>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent className="w-5 h-5 text-amber-600" />
                    <span className="font-[var(--font-heading)] text-base font-semibold text-amber-800">
                      Diferencia: Gs. {formatGs(Math.abs(ahorro))}/semana
                    </span>
                  </div>
                  <p className="font-[var(--font-body)] text-sm text-amber-700 leading-relaxed">
                    {negativeCopy}
                  </p>
                </div>
              )}

              {/* Horas recuperadas */}
              <div className="flex items-center gap-3 py-2">
                <Clock className="w-5 h-5 text-[var(--color-mercado)]" />
                <div>
                  <span className="font-[var(--font-body)] text-sm font-semibold text-[var(--color-text)]">
                    {horasRecuperadas} horas/semana recuperadas
                  </span>
                  <p className="font-[var(--font-body)] text-xs text-[var(--color-text-muted)]">
                    Dejás de comprar, cocinar y limpiar
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-4 border-t border-[var(--color-crema-dark)]">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3.5 rounded-xl bg-[var(--color-mercado)] text-white font-[var(--font-body)] font-semibold text-sm hover:bg-[var(--color-mercado-dark)] transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                {cta}
              </a>
              <p className="mt-2 text-center font-[var(--font-body)] text-xs text-[var(--color-text-muted)]">
                {content.home.calculator.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
