import Link from 'next/link'
import es from '@/content/es.json'
import Hero from '@/components/hero'
import FeaturedWorks from '@/components/featured-works'
import Testimonials from '@/components/testimonials'
import Partners from '@/components/partners'
import ProcessSection from '@/components/process-section'
import Reveal from '@/components/reveal'
import type { SiteContent } from '@/types/content'

const content = es as unknown as SiteContent

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <Testimonials />
      <Partners />

      {/* Process section */}
      <ProcessSection />

      {/* CTA section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950">
        <div className="container-art text-center px-4 sm:px-0">
          <Reveal variant="scale">
            <div className="max-w-2xl mx-auto">
              <h2 className="section-title mb-4">¿Querés un mural?</h2>
              <p className="section-subtitle mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
                Trabajemos juntos en tu próximo proyecto. Murales comerciales, institucionales o colaboraciones artísticas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/contacto" className="btn-primary text-sm sm:text-base justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {content.hero.cta_secondary}
                </Link>
                <Link href="/galeria" className="btn-outline text-sm sm:text-base justify-center">
                  {content.hero.cta_primary} →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
