'use client'

import es from '@/content/es.json'
import { useState } from 'react'

export default function PrensaPage() {
  const items = es.prensa.items as any[]
  const types = [...new Set(items.map((i: any) => i.type))]
  const [activeType, setActiveType] = useState('Todas')
  const filtered = activeType === 'Todas' ? items : items.filter((i: any) => i.type === activeType)

  return (
    <>
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16">
        <div className="container-art text-center">
          <h1 className="section-title mb-4">{es.prensa.title}</h1>
          <p className="section-subtitle mx-auto text-sm sm:text-base">{es.prensa.description}</p>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-art">
          <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-4 sm:px-0">
            <button onClick={() => setActiveType('Todas')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium transition-all ${
                activeType === 'Todas' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400 hover:text-amber-400 border border-zinc-800'
              }`}>
              Todas
            </button>
            {types.map((type: string) => (
              <button key={type} onClick={() => setActiveType(type)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium transition-all ${
                  activeType === type ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400 hover:text-amber-400 border border-zinc-800'
                }`}>
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-4 sm:px-0">
            {filtered.map((item: any, i: number) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                className={`glass-panel p-5 sm:p-6 transition-all duration-300 hover:border-amber-500/30 hover:scale-[1.02] group ${
                  item.featured ? 'md:col-span-2' : ''
                }`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] sm:text-xs font-semibold text-amber-500 uppercase tracking-wider">{item.media}</span>
                  <span className="text-zinc-600 text-[10px]">·</span>
                  <span className="text-zinc-500 text-[10px]">{item.date}</span>
                  <span className="ml-auto px-2 py-0.5 bg-zinc-800 rounded text-[10px] text-zinc-400 uppercase">{item.type}</span>
                </div>
                <h3 className="font-serif font-bold text-sm sm:text-lg text-zinc-100 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">{item.excerpt}</p>
                <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-amber-500/70 group-hover:text-amber-400 transition-colors">Leer artículo →</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
