'use client'

import { AnimatedSection } from './ui/AnimatedSection'
import { AnimatedCounter } from './ui/AnimatedCounter'

export function StorySection({ pageContent, data }: any) {
  const d = data || pageContent || {}
  const paragraphs = d.paragraphs || []
  const resultsParagraphs = d.resultsParagraphs || []
  if (!d.title && !paragraphs.length) return null

  return (
    <>
      {/* Main story */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          {d.eyebrow && (
            <AnimatedSection animation="fade-up" className="text-center mb-3">
              <p className="text-xs text-accent uppercase tracking-[3px] font-semibold">{d.eyebrow}</p>
            </AnimatedSection>
          )}
          {d.title && (
            <AnimatedSection animation="fade-up" className="text-center mb-6">
              <h2 className="text-[clamp(1.5rem_3vw_2.2rem)] font-bold text-primary mb-4">{d.title}</h2>
              <div className="w-12 h-0.5 bg-accent mx-auto" />
            </AnimatedSection>
          )}
          {d.subtitle && (
            <AnimatedSection animation="fade-up" className="text-center mb-12">
              <p className="text-text-muted max-w-2xl mx-auto leading-relaxed">{d.subtitle}</p>
            </AnimatedSection>
          )}

          <div className="space-y-5">
            {paragraphs.map((p: string, i: number) => (
              <AnimatedSection
                key={i}
                animation="fade-up"
                delay={i * 100}
              >
                <p className="text-text leading-relaxed text-[0.95rem]">{p}</p>
              </AnimatedSection>
            ))}
          </div>

          {/* Story highlights — visual stat callouts */}
          {d.highlights && d.highlights.length > 0 && (
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
              {d.highlights.map((h: any, i: number) => (
                <AnimatedSection
                  key={i}
                  animation="fade-up"
                  delay={i * 80}
                  className="text-center p-5 bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl border border-accent/20"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary leading-none mb-1 tabular-nums">
                    {h.value}{h.suffix || ''}
                  </div>
                  <div className="text-xs font-semibold text-primary mb-1.5">
                    {h.label}
                  </div>
                  {h.note && (
                    <div className="text-[11px] text-text-muted leading-tight">
                      {h.note}
                    </div>
                  )}
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Results section with animated counters */}
      {resultsParagraphs.length > 0 && (
        <section className="py-20 md:py-28 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4">
            {d.resultsTitle && (
              <AnimatedSection animation="fade-up" className="text-center mb-12">
                <h2 className="text-[clamp(1.5rem_3vw_2.2rem)] font-bold mb-4">{d.resultsTitle}</h2>
                <div className="w-12 h-0.5 bg-accent mx-auto" />
              </AnimatedSection>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resultsParagraphs.map((p: string, i: number) => {
                const icons = ['🎯', '❤️', '📈']
                const statNumbers = [10, 100, 5]
                return (
                  <AnimatedSection
                    key={i}
                    animation="fade-up"
                    delay={i * 120}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 group">
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{icons[i] || '✦'}</div>
                      {/* Animated stat number */}
                      <div className="text-2xl font-bold text-accent mb-2">
                        {statNumbers[i]}
                        <span className="text-accent/70 text-sm ml-1">+</span>
                      </div>
                      <p className="text-sm text-white/90 leading-relaxed">{p}</p>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}