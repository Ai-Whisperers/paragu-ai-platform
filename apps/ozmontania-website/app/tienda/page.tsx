'use client'

import es from '@/content/es.json'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { useState } from 'react'

export default function TiendaPage() {
  const items = es.tienda.items as any[]
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})

  const handleSize = (id: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [id]: size }))
  }

  const buyViaWhatsApp = (item: any) => {
    const size = selectedSizes[item.id] || item.sizes[0] || ''
    const msg = `Hola Oz! Quiero comprar "${item.name}"${size ? ` (${size})` : ''} — $${item.price} USD. ¿Está disponible?`
    window.open(getWhatsAppUrl(msg), '_blank')
  }

  return (
    <>
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16">
        <div className="container-art text-center">
          <h1 className="section-title mb-4">{es.tienda.title}</h1>
          <p className="section-subtitle mx-auto text-sm sm:text-base">{es.tienda.description}</p>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-art">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((item: any) => (
              <div key={item.id} className="glass-panel overflow-hidden group transition-all duration-300 hover:border-amber-500/30">
                <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                  <div className="text-center p-4 sm:p-6">
                    <span className="text-3xl sm:text-4xl mb-2 block">{item.type === 'print' ? '🖼️' : '👕'}</span>
                    <p className="text-zinc-600 text-[10px] sm:text-xs">{item.name}</p>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-zinc-100">{item.name}</h3>
                    <span className="text-amber-500 font-bold text-sm">${item.price}</span>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm mb-3 sm:mb-4">{item.description}</p>
                  {item.sizes && item.sizes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                      {item.sizes.map((size: string) => (
                        <button key={size} onClick={() => handleSize(item.id, size)}
                          className={`px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs rounded-md border transition-all ${
                            (selectedSizes[item.id] || item.sizes[0]) === size
                              ? 'bg-amber-500 text-zinc-950 border-amber-500'
                              : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                          }`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                  <button onClick={() => buyViaWhatsApp(item)}
                    className="w-full py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
                    Comprar por WhatsApp
                  </button>
                  <p className="text-center text-zinc-600 text-[10px] mt-2">Envíos a todo Paraguay. Prints: papel algodón fine art.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
