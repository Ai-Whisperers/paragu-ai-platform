'use client'
import { useState } from 'react'
import { merch, categories } from '@/data/merch'

const WA_NUMBER = '595991000000'

export default function MerchSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({})

  const filtered = activeCategory === 'all' ? merch : merch.filter(m => m.category === activeCategory)

  return (
    <section id="merch" className="py-[clamp(3rem,6vw,6rem)] px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,3rem)] text-[#f0f0f0] mb-2">
          Merch
        </h2>
        <p className="text-[#888] text-sm mb-6 font-[family-name:var(--font-accent)] italic">
          Apoyá a Nüdo — llevate algo
        </p>

        {/* Category Filter */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all
                ${activeCategory === cat.id ? 'bg-[#8B0000] text-white' : 'bg-[#1a1a1a] text-[#888] hover:text-[#f0f0f0] border border-[#2a2a2a]'}`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Merch Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(item => (
            <div key={item.id} className="bg-[#111] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#8B0000]/50 transition-all">
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-[#8B0000] font-semibold mb-2">
                {item.price.pyg} Gs <span className="text-[#666] text-xs">(${item.price.usd})</span>
              </p>
              <p className="text-sm text-[#888] mb-4">{item.description}</p>

              {/* Size selector */}
              {item.sizes.length > 0 && (
                <div className="flex gap-1.5 mb-4 flex-wrap">
                  {item.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize({...selectedSize, [item.id]: size})}
                      className={`px-3 py-1.5 rounded text-xs font-semibold border transition-all
                        ${selectedSize[item.id] === size
                          ? 'bg-[#8B0000] text-white border-[#8B0000]'
                          : 'bg-transparent text-[#888] border-[#2a2a2a] hover:border-[#8B0000]'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              )}

              {/* WhatsApp Order */}
              <a href={`https://wa.me/${WA_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
                selectedSize[item.id] ? item.waTemplate.replace('[SIZE]', selectedSize[item.id]) : item.waTemplate
              )}`} target="_blank" rel="noopener noreferrer"
                className="block text-center bg-[#25D366] text-white text-xs px-4 py-2.5 rounded-lg font-semibold no-underline hover:bg-[#20BD5A] transition-all">
                Order via WhatsApp
              </a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[#888] py-12">No hay productos en esta categoría todavía.</p>
        )}
      </div>
    </section>
  )
}
