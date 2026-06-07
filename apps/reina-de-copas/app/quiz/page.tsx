'use client'

import { useState } from 'react'
import Link from 'next/link'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || '595982774456'

// ── Quiz logic ────────────────────────────────────────────
type Answer = { next: number | 'XS' | 'S' | 'L' | 'XL' | 'RTC'; label: string }

const questions = [
  {
    id: 'edad',
    pregunta: '¿Cuántos años tenés?',
    opciones: [
      { label: 'Menos de 20', next: 2 },
      { label: '20 a 30', next: 2 },
      { label: '31 a 40', next: 3 },
      { label: 'Más de 40', next: 4 },
    ],
  },
  {
    id: 'partos',
    pregunta: '¿Has tenido partos vaginales?',
    opciones: [
      { label: 'No', next: 5 },
      { label: 'Sí, uno', next: 6 },
      { label: 'Sí, dos o más', next: 7 },
    ],
  },
  {
    id: 'flujo',
    pregunta: '¿Cómo describirías tu flujo menstrual?',
    opciones: [
      { label: 'Ligero — apenas manchado', next: 'XS' },
      { label: 'Normal — cambio cada 3-4h', next: 'S' },
      { label: 'Abundante — cambio cada 2-3h', next: 'L' },
      { label: 'Muy abundante — cambio cada 1-2h', next: 'XL' },
    ],
  },
  {
    id: 'flujo40',
    pregunta: '¿Cómo describirías tu flujo menstrual?',
    opciones: [
      { label: 'Normal', next: 'L' },
      { label: 'Abundante', next: 'XL' },
      { label: 'Muy abundante', next: 'XL' },
    ],
  },
  {
    id: 'flujoPartos',
    pregunta: '¿Cómo describirías tu flujo menstrual?',
    opciones: [
      { label: 'Ligero', next: 'L' },
      { label: 'Normal a abundante', next: 'XL' },
      { label: 'Muy abundante', next: 'XL' },
    ],
  },
  {
    id: 'cervix',
    pregunta: '¿ sabés qué tipo de cérvix tenés? (opcional)',
    opciones: [
      { label: 'Alto — cuesta alcanzarlo con el dedo', next: 'S' },
      { label: 'Medio — lo alcanzás sin problema', next: 'S' },
      { label: 'Bajo — queda muy cerca de la entrada', next: 'L' },
      { label: 'No sé / prefiero no arriesgar', next: 'RTC' },
    ],
  },
  {
    id: 'cervixPartos',
    pregunta: '¿ sabés qué tipo de cérvix tenés? (opcional)',
    opciones: [
      { label: 'Alto', next: 'L' },
      { label: 'Medio', next: 'XL' },
      { label: 'Bajo', next: 'XL' },
      { label: 'No sé', next: 'XL' },
    ],
  },
]

// Maps result to page/product slug
const resultMap: Record<string, { label: string; sku: string; desc: string }> = {
  XS: {
    label: 'Copa Signature XS',
    sku: 'COPA-001',
    desc: 'Ideal para flujo ligero, adolescentes y mujeres jóvenes sin partos vaginales.',
  },
  S: {
    label: 'Copa Signature S',
    sku: 'COPA-002',
    desc: 'Perfecta para flujo ligero a normal en mujeres menores de 30 años.',
  },
  L: {
    label: 'Copa Signature L',
    sku: 'COPA-003',
    desc: 'Para flujo normal a abundante. Recomendada para mujeres de 25-40 años.',
  },
  XL: {
    label: 'Copa Signature XL',
    sku: 'COPA-004',
    desc: 'Máxima capacidad para flujo abundante. Ideal si has tenido partos vaginales.',
  },
  RTC: {
    label: 'Reina The Cup — Unitalla',
    sku: 'COPA-005',
    desc: 'Se adapta a cualquier cérvix (alto, medio o bajo). La más versátil. Si no estás segura, esta es tu mejor opción.',
  },
}

const productImages: Record<string, string> = {
  'COPA-001': '/images/productos/copa-signature-xs-1.jpg',
  'COPA-002': '/images/productos/copa-signature-s-1.jpg',
  'COPA-003': '/images/productos/copa-signature-l-1.jpg',
  'COPA-004': '/images/productos/copa-signature-xl-1.jpg',
  'COPA-005': '/images/productos/reina-the-cup-1.png',
}

export default function QuizPage() {
  const [step, setStep] = useState(0)
  // step 0 = intro, 1-7 = questions, 8 = result
  const [history, setHistory] = useState<(number | string)[]>([])

  const currentQ = questions[step - 1]

  function handleIntro() {
    setStep(1)
    setHistory([1])
  }

  function handleAnswer(next: number | 'XS' | 'S' | 'L' | 'XL' | 'RTC') {
    if (typeof next === 'string') {
      setResultCode(next)
      setHistory([...history, step, next])
      setStep(8)
    } else {
      const newHistory = [...history, step, next]
      setHistory(newHistory)
      setStep(next)
    }
  }

  // result code stored separately
  const [resultCode, setResultCode] = useState<string>('RTC')
  const resultData = resultMap[resultCode] || resultMap['RTC']

  function handleRestart() {
    setStep(0)
    setHistory([])
  }

  // ── Intro ─────────────────────────────────────────────
  if (step === 0) {
    return (
      <div className="container" style={{ maxWidth: 700, margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--heading)', marginBottom: 16 }}>
            🔍 Encontrá tu copa perfecta
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Responde 3 preguntas y te recomendamos la talla ideal según tu cuerpo y tu flujo.
            <br />Solo toma 30 segundos.
          </p>
        </div>

        <div style={{
          background: 'var(--banner)',
          borderRadius: 16,
          padding: '32px 28px',
          marginBottom: 32,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '1rem', color: 'var(--heading)', marginBottom: 24, fontWeight: 600 }}>
            Las copas vienen en 5 tallas: XS, S, L, XL y unitalla
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['XS — 20ml', 'S — 24ml', 'L — 29ml', 'XL — 34ml', 'RTC — 38ml'].map((t) => (
              <span key={t} style={{
                background: 'rgba(255,255,255,0.7)',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}>{t}</span>
            ))}
          </div>
        </div>

        <button
          onClick={handleIntro}
          className="btn-primary"
          style={{ width: '100%', fontSize: '1.1rem', padding: '16px 0' }}
        >
          Comenzar el quiz →
        </button>

        <p style={{ textAlign: 'center', marginTop: 16, color: 'var(--text-light)', fontSize: '0.9rem' }}>
          ¿Ya conocés tu talla?{' '}
          <Link href="/tienda" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Ver tienda completa →
          </Link>
        </p>
      </div>
    )
  }

  // ── Result ─────────────────────────────────────────────
  if (step === 8) {
    return (
      <div className="container" style={{ maxWidth: 700, margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ fontSize: '3rem' }}>🎉</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--heading)', marginTop: 16, marginBottom: 8 }}>
            Tu talla recomendada
          </h1>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          marginBottom: 28,
        }}>
          <img
            src={productImages[resultData.sku]}
            alt={resultData.label}
            style={{ width: '100%', maxHeight: 280, objectFit: 'cover' }}
          />
          <div style={{ padding: 28 }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
              {resultData.label}
            </h2>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 20 }}>
              {resultData.desc}
            </p>
            <div style={{ background: 'var(--banner)', borderRadius: 10, padding: '14px 18px', marginBottom: 20 }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text)', margin: 0 }}>
                <strong>Importante:</strong> Esta es una recomendación basada en tus respuestas.
                Si tenés dudas o un caso especial (por ejemplo, matriz contraída),
                escribinos por WhatsApp y te asesoramos gratis.
              </p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hola%2C%20hice%20el%20quiz%20y%20me%20recomendaron%20${encodeURIComponent(resultData.label)}.%20Quiero%20confirmar%20que%20es%20la%20talla%20correcta.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'block', textAlign: 'center', marginBottom: 12 }}
            >
              Consultar por WhatsApp
            </a>
            <Link
              href={`/producto/${resultData.sku}`}
              className="btn-secondary"
              style={{ display: 'block', textAlign: 'center' }}
            >
              Ver producto en tienda
            </Link>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={handleRestart} style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem',
          }}>
            ← Reiniciar quiz
          </button>
        </div>
      </div>
    )
  }

  // ── Question ──────────────────────────────────────────
  return (
    <div className="container" style={{ maxWidth: 640, margin: '0 auto', padding: '60px 20px' }}>
      {/* Progress */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
          fontSize: '0.85rem',
          color: 'var(--text-light)',
        }}>
          <span>Pregunta {step} de 3</span>
          <span>{Math.round((step / 3) * 100)}%</span>
        </div>
        <div style={{ background: '#eee', borderRadius: 99, height: 6 }}>
          <div style={{
            background: 'var(--primary)',
            height: '100%',
            borderRadius: 99,
            width: `${(step / 3) * 100}%`,
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Question */}
      <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--heading)', marginBottom: 28 }}>
        {currentQ.pregunta}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {currentQ.opciones.map((opcion, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opcion.next as number | 'XS' | 'S' | 'L' | 'XL' | 'RTC')}
            style={{
              background: '#fff',
              border: '2px solid var(--primary)',
              borderRadius: 12,
              padding: '16px 20px',
              textAlign: 'left',
              fontSize: '1.05rem',
              fontWeight: 500,
              color: 'var(--heading)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--banner)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {opcion.label}
          </button>
        ))}
      </div>
    </div>
  )
}