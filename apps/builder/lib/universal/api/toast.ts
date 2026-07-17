/**
 * Toast helper — Spanish-first wrapper around a toast surface.
 *
 * Sonner-based version lives elsewhere in the workspace (fun4me / commerce
 * package). Builder never actually renders a `<Toaster />`, so wiring sonner
 * here would ship a dep for zero callers and still no-op at runtime.
 *
 * Instead: no-op stub with the same public API. The dev console gets a
 * `console.info` line so lost UX signals during migration are still visible,
 * and the shape is a straight swap-in for a real sonner wire-up (add
 * `sonner` to package.json + replace this file with the original impl).
 */

type ToastType = 'success' | 'error' | 'info' | 'warning'

const spanishDefaults: Record<ToastType, string> = {
  success: '¡Listo!',
  error: 'Algo salió mal',
  info: 'Información',
  warning: 'Atención',
}

type ToastFn = (message?: string) => void
interface ToastApi {
  (message: string, opts?: unknown): void
  success: ToastFn
  error: ToastFn
  info: ToastFn
  warning: ToastFn
}

function log(kind: ToastType, message: string) {
  if (typeof console !== 'undefined') {
    // eslint-disable-next-line no-console
    console.info(`[toast:${kind}]`, message)
  }
}

const toastImpl = ((message: string) => log('info', message)) as ToastApi
toastImpl.success = (m) => log('success', m ?? spanishDefaults.success)
toastImpl.error = (m) => log('error', m ?? spanishDefaults.error)
toastImpl.info = (m) => log('info', m ?? spanishDefaults.info)
toastImpl.warning = (m) => log('warning', m ?? spanishDefaults.warning)

export const toast = toastImpl

export function showToast(message: string, type: ToastType = 'info') {
  toast[type](message)
}

showToast.success = (message?: string) => {
  toast.success(message || spanishDefaults.success)
}

showToast.error = (message?: string) => {
  toast.error(message || spanishDefaults.error)
}

showToast.info = (message?: string) => {
  toast.info(message || spanishDefaults.info)
}

showToast.warning = (message?: string) => {
  toast.warning(message || spanishDefaults.warning)
}

export default showToast
