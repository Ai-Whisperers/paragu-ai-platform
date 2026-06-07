'use client'

import { useRef, useEffect, useState } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'a' | 'button'
  href?: string
}

export default function SpotlightCard({
  children,
  className = '',
  as: Tag = 'div',
  href,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: '50%', y: '50%' })

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--mouse-x', `${x}%`)
      el.style.setProperty('--mouse-y', `${y}%`)
    }

    el.addEventListener('mousemove', handleMouse)
    return () => el.removeEventListener('mousemove', handleMouse)
  }, [])

  const props = {
    ref: cardRef,
    className: `spotlight-card ${className}`,
    ...(Tag === 'a' ? { href, target: href?.startsWith('http') ? '_blank' : undefined, rel: href?.startsWith('http') ? 'noopener noreferrer' : undefined } : {}),
  }

  // @ts-ignore - dynamic tag
  return <Tag {...props}>{children}</Tag>
}
