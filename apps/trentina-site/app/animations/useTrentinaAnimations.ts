'use client'
import { useEffect, useRef } from 'react'

export function useTrentinaAnimations() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Intersection Observer for scroll-triggered animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Observe all animatable elements
    const selector = [
      '.animate-section-reveal',
      '.animate-stagger',
      '.gallery-item',
      '.process-step',
    ].join(', ')

    document.querySelectorAll(selector).forEach(el => {
      observerRef.current!.observe(el as Element)
    })

    // Header scroll behavior
    let lastScroll = 0
    const header = document.querySelector('header')

    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (header) {
        if (currentScroll > 100) {
          header.classList.add('header-scrolled')
          if (currentScroll > lastScroll) {
            header.classList.add('header-scrolled-out')
          } else {
            header.classList.remove('header-scrolled-out')
          }
        } else {
          header.classList.remove('header-scrolled', 'header-scrolled-out')
        }
      }

      // Back to top button
      const btn = document.querySelector('.back-to-top')
      if (btn) {
        if (currentScroll > 500) btn.classList.add('visible')
        else btn.classList.remove('visible')
      }

      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Run once on mount

    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
