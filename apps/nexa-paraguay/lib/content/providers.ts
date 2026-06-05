import { readFileSync, existsSync } from 'fs'
import path from 'path'

export type JsonLoader = {
  get(lang: 'es' | 'en' | 'de' | 'nl'): Promise<Record<string, unknown>>
}

export type LangToPath = Record<'en' | 'es' | 'de' | 'nl', string>

export function createJsonLoader(route: string, langPaths: LangToPath): JsonLoader {
  return {
    async get(lang) {
      const file = path.join(process.cwd(), 'content', langPaths[lang] ?? langPaths.es)
      if (!existsSync(file)) return {} as Record<string, unknown>
      return JSON.parse(readFileSync(file, 'utf-8'))
    },
  }
}

export function createDynamicJsonLoader(route: string): JsonLoader {
  return {
    async get(lang) {
      const base = path.join(process.cwd(), 'content', lang)
      if (!existsSync(base)) return {} as Record<string, unknown>
      const file = path.join(base, `${route}.json`)
      if (!existsSync(file)) return {} as Record<string, unknown>
      return JSON.parse(readFileSync(file, 'utf-8'))
    },
  }
}
