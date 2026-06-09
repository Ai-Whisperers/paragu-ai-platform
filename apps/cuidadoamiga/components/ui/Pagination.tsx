'use client'

import type { UiPagination } from '@/lib/content-types'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  ui: UiPagination
  className?: string
}

/**
 * Page-based pagination. For cursor-based pagination, use useInfiniteScroll
 * instead. This is for admin panels and standalone list pages.
 */
export function Pagination({ page, totalPages, onPageChange, ui, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label={ui.page.replace('{page}', String(page)).replace('{total}', String(totalPages))} className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1.5 text-sm rounded-lg border border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        aria-label={ui.previous}
      >
        {ui.previous}
      </button>

      <span className="text-sm text-neutral-600 dark:text-neutral-400">
        {ui.page.replace('{page}', String(page)).replace('{total}', String(totalPages))}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1.5 text-sm rounded-lg border border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        aria-label={ui.next}
      >
        {ui.next}
      </button>
    </nav>
  )
}
