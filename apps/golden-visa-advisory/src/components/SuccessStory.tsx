'use client'

import { useLocale } from '@/lib/locale-context'

export function SuccessStory() {
  const { t } = useLocale()

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              {t.investor.successStory ? 'Success Story' : 'Caso de Éxito'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 gradient-gold">
              {t.investor.successStory?.title || 'Historia de Éxito'}
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              {t.investor.successStory?.subtitle || ''}
            </p>
            <p className="text-foreground/80 leading-relaxed mb-8">
              {t.investor.successStory?.description || ''}
            </p>
            <a href="#contact" className="btn-primary">
              {t.investor.successStory?.cta || 'Contact Us'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
