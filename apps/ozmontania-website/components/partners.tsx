'use client'

import es from '@/content/es.json'
import SpotlightCard from '@/components/spotlight-card'
import Reveal from '@/components/reveal'
import type { SiteContent } from '@/types/content'

const content = es as unknown as SiteContent

const partners = [
  {
    name: 'Nescafé',
    description: 'Limited edition cans design, 2024',
    url: '/obra/nescafe',
    color: 'from-red-800/20 to-amber-800/20',
    icon: '☕',
  },
  {
    name: 'Estudio 8',
    description: 'Design & production studio founded by Oz, 2010',
    url: '#',
    color: 'from-zinc-800/30 to-zinc-900/30',
    icon: '🎨',
  },
  {
    name: 'Powerline Shop',
    description: 'Paraguay\'s first graffiti supply store, 2014',
    url: '#',
    color: 'from-amber-900/20 to-orange-900/20',
    icon: '🖍️',
  },
  {
    name: 'Artists 4 Israel',
    description: 'Dead Sea mural collaboration, 2023',
    url: '/obra/mar-muerto',
    color: 'from-blue-800/20 to-cyan-800/20',
    icon: '🌍',
  },
  {
    name: 'Arte Actual Gallery',
    description: 'Ghost Organ solo exhibition, 2024',
    url: '/obra/organo-fantasma',
    color: 'from-purple-800/20 to-pink-800/20',
    icon: '🏛️',
  },
]

export default function Partners() {
  return (
    <section className="py-16 sm:py-24 border-t border-zinc-800/30">
      <div className="container-art">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14 px-4 sm:px-0">
            <h2 className="section-title mb-4">Colaboraciones</h2>
            <p className="section-subtitle mx-auto text-sm sm:text-base">
              Marcas, galerías y organizaciones con las que he trabajado
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 px-4 sm:px-0">
          {partners.map((partner, i) => (
            <Reveal key={partner.name} variant="up" delay={i * 100}>
              <SpotlightCard
                as="a"
                href={partner.url}
                className="block h-full"
              >
                <div className={`h-full rounded-2xl border border-zinc-800/50 bg-gradient-to-br ${partner.color} p-5 sm:p-6 hover:border-amber-500/20 transition-all duration-500 text-center`}>
                  <div className="text-2xl sm:text-3xl mb-3">{partner.icon}</div>
                  <h3 className="text-sm sm:text-base font-semibold text-zinc-100 mb-1">{partner.name}</h3>
                  <p className="text-[10px] sm:text-xs text-zinc-500">{partner.description}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
