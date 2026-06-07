'use client'

import { useState } from 'react'

interface GalleryImage {
  src: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  title?: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images.length) return null

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const goTo = (index: number) => {
    setCurrentIndex((index + images.length) % images.length)
  }

  return (
    <>
      {/* Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="group relative aspect-square rounded-xl overflow-hidden bg-zinc-800 hover:scale-[1.03] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-zinc-600 group-hover:text-amber-500/50 transition-colors mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-[10px] text-zinc-600">Imagen {i + 1}</p>
              </div>
            </div>
            <div className="absolute inset-0 border border-zinc-700/50 group-hover:border-amber-500/30 rounded-xl transition-all" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-zinc-400 hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image placeholder */}
            <div className="w-[80vw] max-w-3xl aspect-[4/3] rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-zinc-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-zinc-500 text-sm">{title ? `${title} — Imagen ${currentIndex + 1} de ${images.length}` : `Imagen ${currentIndex + 1} de ${images.length}`}</p>
              </div>
            </div>

            {/* Nav */}
            {images.length > 1 && (
              <div className="absolute bottom-4 sm:bottom-0 sm:-bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4">
                <button onClick={() => goTo(currentIndex - 1)} className="p-2 text-zinc-400 hover:text-white transition-colors" aria-label="Anterior">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-zinc-500 text-xs sm:text-sm">{currentIndex + 1}/{images.length}</span>
                <button onClick={() => goTo(currentIndex + 1)} className="p-2 text-zinc-400 hover:text-white transition-colors" aria-label="Siguiente">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
