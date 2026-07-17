// Stub toast lib. `sonner` was originally used here but is not in this
// template's deps. No consumers currently exist — kept as a hook for clients
// that wire up a real toast library later.

type ToastType = 'success' | 'error' | 'info' | 'warning'

const spanishDefaults: Record<ToastType, string> = {
  success: '¡Listo!',
  error: 'Algo salió mal',
  info: 'Información',
  warning: 'Atención',
}

function log(prefix: ToastType, message: string) {
  if (typeof console !== 'undefined') {
    console.info(`[toast:${prefix}] ${message}`)
  }
}

export const toast = {
  success: (message?: string) => log('success', message || spanishDefaults.success),
  error: (message?: string) => log('error', message || spanishDefaults.error),
  info: (message?: string) => log('info', message || spanishDefaults.info),
  warning: (message?: string) => log('warning', message || spanishDefaults.warning),
}

export function showToast(message: string, type: ToastType = 'info') {
  toast[type](message)
}

showToast.success = (message?: string) => toast.success(message)
showToast.error = (message?: string) => toast.error(message)
showToast.info = (message?: string) => toast.info(message)
showToast.warning = (message?: string) => toast.warning(message)

export default showToast
