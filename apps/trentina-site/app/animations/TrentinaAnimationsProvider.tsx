'use client'
import { useEffect } from 'react'
import './trentina-animations.css'

export function TrentinaAnimationsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Intersection Observer for section reveals (backup for SSR)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const selector = [
      '.animate-section-reveal',
      '.animate-stagger',
      '.gallery-item',
      '.process-step',
    ].join(', ')

    document.querySelectorAll(selector).forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return <>{children}</>
}
