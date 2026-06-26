'use client'

import { TiltCard } from './ui/TiltCard'
import { AnimatedSection } from './ui/AnimatedSection'

function resolveImage(images: any, ref: string | undefined): string {
  if (!ref || !images) return ''
  const key = ref.replace('@img:', '').replace('@src:', '')
  const parts = key.split('.')
  let obj: any = images
  for (const p of parts) {
    if (obj?.[p]) obj = obj[p]
    else return ''
  }
  return obj?.src || obj || ''
}

const TEAM_LAYOUTS = [
  { label: 'K', bg: 'bg-rose-100 text-rose-600', accent: 'bg-rose-500' },
  { label: 'L', bg: 'bg-amber-100 text-amber-600', accent: 'bg-amber-500' },
  { label: 'M', bg: 'bg-emerald-100 text-emerald-600', accent: 'bg-emerald-500' },
  { label: 'N', bg: 'bg-indigo-100 text-indigo-600', accent: 'bg-indigo-500' },
  { label: 'P', bg: 'bg-cyan-100 text-cyan-600', accent: 'bg-cyan-500' },
]

function pickLocale(value: any, locale: string) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[locale] || value.es || value.en || value.nl || value.de || ''
  }
  return value
}

export function TeamSection({ pageContent, data, images, locale = 'es' }: any) {
  const d = data || pageContent || {}
  const members = d.members || d.items || []
  if (!members.length) return null

  return (
    <section className="py-20 md:py-28 bg-surface-alt">
      <div className="max-w-6xl mx-auto px-4">
        {d.title && (
          <AnimatedSection animation="fade-up" className="text-center mb-4">
            <h2 className="text-[clamp(1.5rem_3vw_2.2rem)] font-bold text-primary mb-4">{pickLocale(d.title, locale)}</h2>
            <div className="w-12 h-0.5 bg-accent mx-auto" />
          </AnimatedSection>
        )}

        {/* HONEST_NOTICE removed — real team photos now in use */}

        <div className={`grid gap-6 ${
          members.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
          members.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' :
          members.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto' :
          members.length === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
        }`}>
          {members.map((m: any, i: number) => {
            const img = resolveImage(images, m.memberImage || m.image || m.imageUrl)
            const layout = TEAM_LAYOUTS[i % TEAM_LAYOUTS.length]

            return (
              <AnimatedSection
                key={i}
                animation="fade-up"
                delay={i * 70}
                className="[&>*:first-child]:h-full"
              >
                <TiltCard
                  tiltIntensity={3}
                  className="bg-white rounded-2xl shadow-sm border border-border/40 hover:shadow-lg transition-shadow duration-300 overflow-hidden group h-full"
                >
                  {/* Top accent bar */}
                  <div className={`h-1.5 w-full ${layout.accent} transition-all duration-300`} />


                  <div className="p-6 flex flex-col h-full">
                    {/* Avatar with hover scale */}
                    <div className="relative mx-auto mb-4 w-24 h-24 shrink-0">
                      {img ? (
                        <img
                          src={img}
                          alt={m.name}
                          width={96}
                          height={96}
                          loading="lazy"
                          className="w-24 h-24 object-cover rounded-full ring-2 ring-border/50 group-hover:ring-accent/40 transition-all duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`w-24 h-24 rounded-full ${layout.bg} flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-105 transition-transform duration-300`}>
                          {m.name?.[0] || '?'}
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="font-bold text-primary text-base leading-tight mb-1 text-center group-hover:text-accent transition-colors duration-200">{pickLocale(m.name, locale)}</h3>

                    {/* Role */}
                    {m.role && (
                      <p className="text-xs text-accent font-semibold mb-3 text-center">{pickLocale(m.role, locale)}</p>
                    )}

                    {/* Bio - primary content */}
                    {m.bio && (
                      <p className="text-sm text-text leading-relaxed mb-3 text-center flex-grow">{pickLocale(m.bio, locale)}</p>
                    )}
                    {/* Fallback description */}
                    {!m.bio && m.description && (
                      <p className="text-sm text-text leading-relaxed mb-3 text-center flex-grow">{pickLocale(m.description, locale)}</p>
                    )}

                    {/* Languages */}
                    {m.languages && m.languages.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-center mb-3">
                        {m.languages.map((lang: string, k: number) => (
                          <span key={k} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent/15 text-accent">
                            {lang}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Credentials */}
                    {m.credentials && m.credentials.length > 0 && (
                      <ul className="mt-auto space-y-1 border-t border-border/30 pt-3">
                        {m.credentials.slice(0, 3).map((cred: string, k: number) => (
                          <li key={k} className="text-[11px] text-text-muted flex gap-1.5 items-start leading-snug">
                            <span className="text-accent shrink-0">✓</span>
                            <span>{pickLocale(cred, locale)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </TiltCard>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}