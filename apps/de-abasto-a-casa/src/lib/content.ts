import { readFileSync, existsSync } from 'fs'
import path from 'path'

export interface ContentData {
  [key: string]: any
}

let cachedContent: ContentData | null = null

export function getContent(): ContentData {
  if (cachedContent) return cachedContent
  const contentPath = path.join(process.cwd(), 'content', 'es.json')
  if (existsSync(contentPath)) {
    cachedContent = JSON.parse(readFileSync(contentPath, 'utf-8'))
    return cachedContent!
  }
  return {}
}

export function getNested(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) return acc[key]
    return undefined
  }, obj)
}
