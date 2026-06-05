import path from 'path'
import { readFileSync, existsSync } from 'fs'

export type LoadFromAppOptions = {
  contentDir?: string
}

export function resolveContentFile(
  lang: string,
  file: string,
  contentDir: string,
) {
  const candidate = path.join(contentDir, lang, file)
  if (existsSync(candidate)) return candidate
  const fallback = path.join(contentDir, 'es', file)
  if (existsSync(fallback)) return fallback
  return null
}

export function loadJson<T = unknown>(filePath: string): T | null {
  if (!existsSync(filePath)) return null
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

export function resolveAppContentDir(override?: string) {
  if (override) return override
  return process.cwd()
}
