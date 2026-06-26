'use client'

import React, { useState } from 'react'
import { SectionComponentProps } from '../types'
import { FEEDBACK_SECTION, t as localeT } from '@ai-whisperers/i18n'
import { trackFormStart, trackFormSubmit } from '@/lib/ga4'
import { resolveClientLocale } from '@/lib/resolve-client-locale'
import { Star } from 'lucide-react'

export function FeedbackSection({ data, locale }: SectionComponentProps) {
  const d = data || {}
  const lang = resolveClientLocale(locale)

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.slice(0, 3).map((t: any, i: number) => (
              <div key={i} className="group relative bg-white rounded-2xl p-7 shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                {/* Rating stars */}
                {t.rating && (
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
                <p className="italic text-text leading-relaxed mb-5 text-[0.95rem] line-clamp-5 group-hover:text-primary transition-colors">
                  "{t.quote || t.message || t.description}"
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
    return d[key] || localeT(FEEDBACK_SECTION, lang, key)
  }

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    trackFormStart('feedback-form', 'feedback')
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'feedback', locale: lang, name: name.trim() || 'Anónimo', message: message.trim(), timestamp: new Date().toISOString() }),
      })
      trackFormSubmit('feedback-form', 'feedback', true)
    } catch {
      trackFormSubmit('feedback-form', 'feedback', false)
    }
    setName('')
    setMessage('')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section className="py-16 md:py-24 bg-surface-alt">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">{tr('eyebrow')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">{d.title || tr('title')}</h2>
          {d.subtitle && <p className="text-text-muted mt-3 max-w-xl mx-auto">{d.subtitle}</p>}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-6 mb-10">
          <input
            type="text"
            placeholder={tr('namePlaceholder')}
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl mb-3 text-primary outline-none focus:ring-2 focus:ring-accent/50"
          />
          <textarea
            placeholder={tr('messagePlaceholder')}
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-xl mb-3 text-primary outline-none focus:ring-2 focus:ring-accent/50 resize-none"
          />
          <button type="submit"
            className="bg-accent hover:opacity-90 text-primary font-semibold px-8 py-3 rounded-xl transition-all cursor-pointer border-none">
            {d.buttonText || tr('button')}
          </button>
          {sent && <p className="text-success text-sm mt-2">{tr('thanks')}</p>}
        </form>
      </div>
    </section>
  )
}
