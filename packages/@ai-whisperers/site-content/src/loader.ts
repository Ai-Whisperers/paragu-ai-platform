import { readFileSync } from "node:fs"

export class ContentLoadError extends Error {
  readonly filepath: string
  readonly cause?: unknown
  constructor(filepath: string, cause: unknown) {
    const causeMsg = cause instanceof Error ? cause.message : String(cause)
    super(`Failed to load content from ${filepath}: ${causeMsg}`)
    this.name = "ContentLoadError"
    this.filepath = filepath
    this.cause = cause
  }
}

export function loadContent<T = unknown>(filepath: string): T {
  let raw: string
  try {
    raw = readFileSync(filepath, "utf8")
  } catch (err) {
    throw new ContentLoadError(filepath, err)
  }
  try {
    return JSON.parse(raw) as T
  } catch (err) {
    throw new ContentLoadError(filepath, err)
  }
}

export function loadContentOptional<T>(filepath: string, fallback: T): T {
  try {
    return loadContent<T>(filepath)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn(`[site-content] optional load failed, using fallback: ${msg}`)
    return fallback
  }
}
