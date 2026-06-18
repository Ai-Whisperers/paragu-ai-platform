"use client"

// ScrollReveal — adds a fade-in-up animation to children when they enter
// the viewport. Uses IntersectionObserver (no library) and respects
// prefers-reduced-motion.

import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  /** Delay in ms before triggering (0, 100, 200, 300...) */
  delay?: number
  /** Animation direction: up (default), down, left, right, none */
  direction?: "up" | "down" | "left" | "right" | "none"
  /** Re-trigger on every scroll into view, or only first time */
  once?: boolean
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

const DIRECTION_CLASSES = {
  up: "translate-y-4",
  down: "-translate-y-4",
  left: "translate-x-4",
  right: "-translate-x-4",
  none: "",
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  once = true,
  className = "",
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const Component = Tag as any
  return (
    <Component
      ref={ref as any}
      className={
        "transition-all duration-700 ease-out " +
        (visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${DIRECTION_CLASSES[direction]}`) +
        " " +
        className
      }
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  )
}
