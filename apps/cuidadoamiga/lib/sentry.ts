// Sentry error tracking — enabled when SENTRY_DSN env var is set AND
// @sentry/nextjs is installed (it's an optional peer dep).
//
// To enable: `pnpm add @sentry/nextjs` and set SENTRY_DSN.
//
// Configuration:
//   SENTRY_DSN — DSN from sentry.io project settings
//
// We use dynamic import + try/catch so the SDK is only loaded when
// configured. If @sentry/nextjs is not installed, we silently fall back
// to console.error.

interface SentryLike {
  captureException(error: unknown, context?: { extra?: Record<string, unknown> }): void
  captureMessage(message: string, level?: 'info' | 'warning' | 'error'): void
}

let sentryModule: SentryLike | null = null
let loaded = false
let loadAttempted = false

async function loadSentry(): Promise<SentryLike | null> {
  if (loadAttempted) return sentryModule
  loadAttempted = true
  const dsn = process.env.SENTRY_DSN
  if (!dsn) return null
  try {
    // Dynamic import — the module is resolved at runtime. If it's not
    // installed, the catch block fires and we silently fall back.
    const Sentry = (await import('@sentry/nextjs')) as unknown as {
      init: (opts: Record<string, unknown>) => void
      captureException: SentryLike['captureException']
      captureMessage: SentryLike['captureMessage']
    }
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      beforeSend(event: any) {
        if (event?.user) delete event.user.email
        return event
      },
    })
    sentryModule = Sentry as unknown as SentryLike
    loaded = true
    return sentryModule
  } catch {
    return null
  }
}

export async function captureError(error: unknown, context?: Record<string, unknown>): Promise<void> {
  const Sentry = await loadSentry()
  if (Sentry) {
    if (context) Sentry.captureException(error, { extra: context })
    else Sentry.captureException(error)
  } else {
    console.error('[error]', error, context)
  }
}

export async function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): Promise<void> {
  const Sentry = await loadSentry()
  if (Sentry) {
    Sentry.captureMessage(message, level)
  } else {
    console.log(`[${level}] ${message}`)
  }
}

export { loaded as sentryReady }
