'use client'

import Link from 'next/link'
import es from '@/content/es.json'
import { useParams } from 'next/navigation'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import type { SiteContent, ObraItem } from '@/types/content'
import ImageGallery from '@/components/image-gallery'
import SpotlightCard from '@/components/spotlight-card'
import Reveal from '@/components/reveal'

const content = es as unknown as SiteContent

export default function ObraDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const items = content.obra.items as ObraItem[]
  const obra = items.find((i: ObraItem) => i.id === slug)

  if (!obra) {
    return (
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 text-center">
        <div className="container-art">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Obra no encontrada</h1>
          <Link href="/obra" className="btn-outline">Volver a obras</Link>
        </div>
      </section>
    )
  }

  const waMessage = obra.has_print
    ? `Hola Oz! Me interesa "${obra.title}" — ¿tenés prints disponibles?`
    : `Hola Oz! Me interesa "${obra.title}" — ¿me podés contar más?`
  const whatsappUrl = getWhatsAppUrl(waMessage)

  const galleryImages = obra.images.map((src, i) => ({
    src,
    alt: `${obra.title} — imagen ${i + 1}`,
  }))

  // Similar works (same category, excluding current)
  const similarWorks = items
    .filter((i: ObraItem) => i.category === obra.category && i.id !== slug)
    .slice(0, 3)

  return (
    <>
      {/* Back link */}
      <section className="pt-20 sm:pt-28 pb-6 sm:pb-8">
        <div className="container-art">
          <Link href="/obra" className="inline-flex items-center gap-1 text-xs sm:text-sm text-zinc-500 hover:text-amber-400 transition-colors">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a obras
          </Link>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-art">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Gallery + Before/After */}
            <Reveal variant="left">
              {/* Before/After comparison */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-3 px-4 sm:px-0">
                  <span className="pill text-[10px] sm:text-xs">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Galería
                  </span>
                  <span className="text-zinc-600 text-[10px] sm:text-xs">{obra.images.length} imágenes</span>
                </div>
              </div>
              <ImageGallery images={galleryImages} title={obra.title} />
            </Reveal>

            {/* Info */}
            <Reveal variant="right" delay={150}>
              <div className="px-4 sm:px-0">
                {/* Category + year tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="tag">{obra.category}</span>
                  <span className="pill text-[10px] sm:text-xs">{obra.year}</span>
                  {obra.dimensions && (
                    <span className="pill text-[10px] sm:text-xs">{obra.dimensions}</span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6">{obra.title}</h1>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {obra.location && (
                    <div className="p-3 sm:p-4 rounded-xl bg-zinc-900 border border-zinc-800/50">
                      <p className="text-[9px] sm:text-xs text-zinc-500 mb-0.5 sm:mb-1">Ubicación</p>
                      <p className="text-xs sm:text-sm text-zinc-200">{obra.location}</p>
                    </div>
                  )}
                  {obra.technique && (
                    <div className="p-3 sm:p-4 rounded-xl bg-zinc-900 border border-zinc-800/50">
                      <p className="text-[9px] sm:text-xs text-zinc-500 mb-0.5 sm:mb-1">Técnica</p>
                      <p className="text-xs sm:text-sm text-zinc-200">{obra.technique}</p>
                    </div>
                  )}
                </div>

                <p className="text-zinc-300 leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base">
                  {obra.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  {obra.has_print && (
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm sm:text-base justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Comprar print — ${obra.print_price} USD
                    </a>
                  )}
                  <Link href="/contacto" className="btn-outline text-sm sm:text-base justify-center">
                    Solicitar obra similar
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Similar works */}
          {similarWorks.length > 0 && (
            <section className="mt-16 sm:mt-24 border-t border-zinc-800/30 pt-12 sm:pt-16">
              <div className="px-4 sm:px-0">
                <Reveal>
                  <h2 className="section-title mb-6 sm:mb-8">Obras similares</h2>
                </Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {similarWorks.map((item: ObraItem, i: number) => (
                    <Reveal key={item.id} variant="up" delay={i * 100}>
                      <SpotlightCard as="a" href={`/obra/${item.id}`} className="block">
                        <div className="aspect-[4/3] rounded-xl bg-zinc-900 border border-zinc-800/40 hover:border-amber-500/30 transition-all duration-500 overflow-hidden group relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                            <p className="text-[10px] sm:text-xs text-amber-500 mb-0.5">{item.category} · {item.year}</p>
                            <h3 className="text-sm sm:text-lg font-serif font-semibold text-white">{item.title}</h3>
                          </div>
                        </div>
                      </SpotlightCard>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  )
}
