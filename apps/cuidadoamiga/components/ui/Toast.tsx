'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { clsx } from 'clsx'

export type ToastTone = 'info' | 'success' | 'warning' | 'error'

export interface ToastItem {
  id: string
  tone: ToastTone
  title: string
  description?: string
  duration?: number
}

interface ToastContextValue {
  toast: (t: { tone?: ToastTone; title: string; description?: string; duration?: number }) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const toneStyles: Record<ToastTone, string> = {
  info: 'bg-blue-50 border-blue-200 text-blue-900',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  warning: 'bg-amber-50 border-amber-200 text-amber-900',
  error: 'bg-red-50 border-red-200 text-red-900',
}

const toneIcons: Record<ToastTone, string> = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
}

let toastCounter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const toast = useCallback(
    (t: { tone?: ToastTone; title: string; description?: string; duration?: number }) => {
      const id = `t${++toastCounter}`
      const item: ToastItem = { id, tone: t.tone ?? 'info', duration: 4500, ...t }
      setItems((prev) => [...prev, item])
      if (item.duration && item.duration > 0) {
        setTimeout(() => dismiss(id), item.duration)
      }
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
        role="region"
        aria-label="Notificaciones"
        aria-live="polite"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className={clsx(
              'pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg animate-fade-in-up',
              toneStyles[t.tone],
            )}
            role={t.tone === 'error' ? 'alert' : 'status'}
          >
            <span aria-hidden className="text-base flex-shrink-0">{toneIcons[t.tone]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold m-0">{t.title}</p>
              {t.description ? (
                <p className="text-xs mt-0.5 m-0 opacity-90">{t.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="text-current opacity-60 hover:opacity-100 text-sm flex-shrink-0"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
