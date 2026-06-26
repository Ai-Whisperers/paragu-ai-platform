'use client'

import React, { useState } from 'react'
import { SectionComponentProps } from './types'
import { Star } from 'lucide-react'

export function FeedbackSection({ data, locale }: SectionComponentProps) {
  const d = data || {}
  const lang = locale || 'es'

  // If testimonials are provided, render them as a display section
  const testimonials = d.testimonials || []
  if (testimonials.length > 0) {
    return (
      <section className="py-20 md:py-28 bg-surface-alt">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            {d.eyebrow && (
              <p className="text-xs text-text-muted uppercase tracking-[3px] mb-3">{d.eyebrow}</p>
            )}
            {d.title && (
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-primary mb-3 leading-tight">
                {d.title}
              </h2>
            )}
            <div className="w-[60px] h-[3px] bg-accent mx-auto mb-5" />
            {d.subtitle && (
              <p className="text-text-muted max-w-2xl mx-auto">{d.subtitle}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.slice(0, 3).map((t: any, i: number) => (
              <div key={i} className="group relative bg-white rounded-2xl p-7 shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                {/* Rating stars */}
                {t.rating !== undefined && (
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= (t.rating || 5) ? 'fill-accent text-accent' : 'text-border'}`}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                )}
                <p className="italic text-text leading-relaxed mb-5 text-[0.95rem] group-hover:text-primary transition-colors">
                  &ldquo;{t.quote || t.message || t.description}&rdquo;
                </p>
                <div className="border-t border-border/40 pt-4">
                  <div className="font-bold text-primary text-sm">{t.name || 'Anónimo'}</div>
                  <div className="text-xs text-text-muted mt-0.5">
                    {t.country || t.role}
                    {t.program && ` · ${t.program}`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {d.ctaText && d.ctaHref && (
            <div className="text-center mt-12">
              <a
                href={(() => {
                  if (d.ctaHref.startsWith('http') || d.ctaHref.startsWith('mailto:')) return d.ctaHref
                  const path = d.ctaHref.startsWith('/') ? d.ctaHref : `/${d.ctaHref}`
                  const parts = path.split('/').filter(Boolean)
                  if (parts.length > 0 && ['es','en','nl','de'].includes(parts[0])) return path
                  return `/${lang}${path}`
                })()}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 hover:shadow-xl hover:scale-[1.03] transition-all duration-200 no-underline"
              >
                {d.ctaText} <span>→</span>
              </a>
            </div>
          )}
        </div>
      </section>
    )
  }

  // Otherwise fall back to the original feedback form
  const tr = (key: string): string => {
    const texts: any = {
      es: { eyebrow: 'TU OPINIÓN', title: 'Compartí tu experiencia', namePlaceholder: 'Tu nombre (opcional)', messagePlaceholder: 'Escribí tu comentario o pregunta...', button: 'Enviar', thanks: '¡Gracias por tu mensaje!', recent: 'Comentarios recientes' },
      en: { eyebrow: 'YOUR FEEDBACK', title: 'Share your experience', namePlaceholder: 'Your name (optional)', messagePlaceholder: 'Write your comment or question...', button: 'Submit', thanks: 'Thanks for your message!', recent: 'Recent comments' },
      nl: { eyebrow: 'UW FEEDBACK', title: 'Deel uw ervaring', namePlaceholder: 'Uw naam (optioneel)', messagePlaceholder: 'Schrijf uw opmerking of vraag...', button: 'Verzenden', thanks: 'Bedankt voor uw bericht!', recent: 'Recente reacties' },
      de: { eyebrow: 'IHR FEEDBACK', title: 'Teilen Sie Ihre Erfahrung', namePlaceholder: 'Ihr Name (optional)', messagePlaceholder: 'Schreiben Sie Ihren Kommentar oder Ihre Frage...', button: 'Senden', thanks: 'Danke für Ihre Nachricht!', recent: 'Aktuelle Kommentare' },
    }
    return (d[key] || (texts as any)[lang]?.[key] || (texts as any).es[key] || '') as string
  }

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, locale: lang, source: 'feedback-section' }),
      })
      setSent(true)
    } catch { setSent(true) }
  }

  if (sent) return (
    <section className="py-20 text-center">
      <div className="max-w-[500px] mx-auto px-4">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-lg font-bold text-primary mb-2">{tr('thanks')}</p>
      </div>
    </section>
  )

  return (
    <section className="py-20 bg-surface-alt">
      <div className="max-w-[600px] mx-auto px-4">
        <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2 text-center">{tr('eyebrow')}</p>
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">{tr('title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder={tr('namePlaceholder')} value={name} onChange={e => setName(e.target.value)}
            className="w-full p-4 border border-border rounded-lg text-sm outline-none bg-white" />
          <textarea placeholder={tr('messagePlaceholder')} value={message} onChange={e => setMessage(e.target.value)} rows={4} required
            className="w-full p-4 border border-border rounded-lg text-sm outline-none bg-white resize-none" />
          <button type="submit" className="w-full py-3 bg-accent text-primary rounded-full font-bold text-sm cursor-pointer hover:opacity-90 disabled:opacity-50" disabled={!message.trim()}>
            {tr('button')}
          </button>
        </form>
      </div>
    </section>
  )
}
