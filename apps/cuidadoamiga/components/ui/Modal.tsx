'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { clsx } from 'clsx'
import { Card } from './Card'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
}

const sizeStyles: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // a11y: focus trap + ESC close + restore focus on close
  useEffect(() => {
    if (!open) return

    previousFocusRef.current = document.activeElement as HTMLElement | null

    const dialog = dialogRef.current
    if (!dialog) return

    // Move focus to the dialog
    const firstFocusable = dialog.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    firstFocusable?.focus()

    // ESC closes
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
      if (e.key === 'Tab') {
        // Focus trap
        const focusables = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]!
        const last = focusables[focusables.length - 1]!
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    // Lock body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = originalOverflow
      previousFocusRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up"
      role="presentation"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden
      />
      {/* Dialog */}
      <Card
        ref={dialogRef}
        padding="none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
        className={clsx(
          'relative z-10 w-full max-h-[90vh] flex flex-col shadow-2xl',
          sizeStyles[size],
        )}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-foreground m-0">
              {title}
            </h2>
            {description ? (
              <p id="modal-description" className="text-sm text-foreground-muted mt-1 m-0">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Cerrar"
            className="!h-8 !w-8 !p-0 flex-shrink-0"
          >
            ✕
          </Button>
        </div>
        <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>
        {footer ? (
          <div className="px-6 py-4 border-t border-border bg-surface-2 flex items-center justify-end gap-2">
            {footer}
          </div>
        ) : null}
      </Card>
    </div>
  )
}
