'use client'

import { useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
  /** How many px before the end to trigger the load callback. */
  threshold?: number
  /** Once `hasMore` is false, the observer disconnects. */
  hasMore: boolean
  /** Called when the user scrolls near the bottom. */
  onLoadMore: () => void
  /** Disable the observer (e.g., during loading). */
  disabled?: boolean
}

/**
 * Infinite scroll via IntersectionObserver. Renders a sentinel div at the
 * bottom of the container. When the sentinel enters the viewport, calls
 * `onLoadMore`. Best for case-list pages where cursor pagination is used.
 *
 * Usage:
 * ```tsx
 * const sentinelRef = useInfiniteScroll({ hasMore, onLoadMore })
 * return (
 *   <div>
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *     <div ref={sentinelRef} />
 *   </div>
 * )
 * ```
 */
export function useInfiniteScroll({ threshold = 200, hasMore, onLoadMore, disabled = false }: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const onLoadRef = useRef(onLoadMore)

  useEffect(() => {
    onLoadRef.current = onLoadMore
  })

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || !hasMore || disabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          onLoadRef.current()
        }
      },
      { rootMargin: `0px 0px ${threshold}px 0px` },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, disabled, threshold])

  return sentinelRef
}
