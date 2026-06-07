'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  variant?: 'up' | 'left' | 'right' | 'scale'
  delay?: number
  as?: 'div' | 'section' | 'article'
}

const variantClasses: Record<string, string> = {
  up: 'reveal',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
}

export default function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag
      ref={ref}
      className={`${variantClasses[variant] || variantClasses.up} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
