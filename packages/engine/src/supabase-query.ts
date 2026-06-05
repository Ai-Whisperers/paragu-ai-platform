/**
 * Slow query tracking wrapper for Supabase queries.
 * Enable with LOG_SLOW_QUERIES=true env var.
 * Threshold: 500ms by default (configurable via SLOW_QUERY_THRESHOLD_MS).
 */

const LOG_SLOW = process.env.LOG_SLOW_QUERIES === 'true'
const SLOW_THRESHOLD = Number(process.env.SLOW_QUERY_THRESHOLD_MS) || 500

export async function withSlowQueryTracking<T>(
  table: string,
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  if (!LOG_SLOW) return fn()

  const start = performance.now()
  try {
    const result = await fn()
    const duration = performance.now() - start
    if (duration > SLOW_THRESHOLD) {
      console.warn(
        `[slow-query] ${table}.${operation} took ${duration.toFixed(1)}ms`
      )
    }
    return result
  } catch (err) {
    const duration = performance.now() - start
    console.error(
      `[slow-query] ${table}.${operation} failed after ${duration.toFixed(1)}ms: ${err instanceof Error ? err.message : String(err)}`
    )
    throw err
  }
}

export function trackQuery(
  table: string,
  operation: string,
  duration: number,
  rowCount?: number
): void {
  if (!LOG_SLOW) return
  if (duration > SLOW_THRESHOLD) {
    console.warn(
      `[slow-query] ${table}.${operation} ${rowCount !== undefined ? `[${rowCount} rows]` : ''} ${duration.toFixed(1)}ms`
    )
  }
}