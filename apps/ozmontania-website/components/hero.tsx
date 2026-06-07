'use client'

import Link from 'next/link'
import es from '@/content/es.json'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import type { SiteContent } from '@/types/content'

const content = es as unknown as SiteContent

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background with animated gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950" />

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-amber-500/5 blur-[100px] animate-pulse" style={{animationDuration: '8s'}} />
        <div className="absolute bottom-1/4 -right-32 w-72 h-72 sm:w-[30rem] sm:h-[30rem] rounded-full bg-amber-500/10 blur-[120px] animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[40rem] sm:h-[40rem] rounded-full bg-amber-400/3 blur-[150px]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(217, 119, 6, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217, 119, 6, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
      </div>

      <div className="relative z-10 container-art w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          {/* Label */}
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/10 text-amber-500 text-xs sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Artista visual paraguayo
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.95] mb-4 sm:mb-6">
            <span className="text-white">{content.hero.headline.split(' ')[0]}</span>{' '}
            <span className="text-gradient">{content.hero.headline.split(' ').slice(1).join(' ')}</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-zinc-300 max-w-xl mb-2 sm:mb-3 leading-relaxed">
            {content.hero.subheadline}
          </p>
          <p className="text-sm sm:text-base text-zinc-500 max-w-lg mb-8 sm:mb-10">
            {content.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/obra" className="btn-primary text-sm sm:text-base justify-center sm:justify-start">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
              </svg>
              {content.hero.cta_primary}
            </Link>
            <Link href="/contacto" className="btn-outline text-sm sm:text-base justify-center sm:justify-start">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {content.hero.cta_secondary}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-zinc-800/30 max-w-md">
            {content.stats.map((stat, i) => (
              <div key={i}>
                <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-amber-500">
                  {stat.number}
                </div>
                <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-[2]" />
    </section>
  )
}
