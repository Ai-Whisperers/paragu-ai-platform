import { readFileSync, existsSync } from 'fs'
import path from 'path'

const manifestPath = path.join(process.cwd(), 'images.json')
const publicDir = path.join(process.cwd(), 'public')
const fallback = '/images/brand/placeholder.png'

let imagesJson: Record<string, unknown> | null = null
function loadManifest() {
  if (imagesJson) return imagesJson
  if (existsSync(manifestPath)) {
    imagesJson = JSON.parse(readFileSync(manifestPath, 'utf-8'))
  }
  return imagesJson ?? {}
}

export function resolveImageUrl(raw?: string) {
  if (!raw || typeof raw !== 'string') return fallback
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  if (raw.startsWith('/')) return raw
  return fallback
}

export function getImageByKey(key?: string) {
  if (!key) return fallback
  const manifest = loadManifest() as any
  const image = manifest?.images

  const find = (obj: any, segments: string[]) => {
    let cur = obj
    for (const seg of segments) {
      if (!cur || typeof cur !== 'object') return null
      cur = cur[seg]
    }
    return cur ?? null
  }

  const entry = find(image, key.split('.'))
  if (!entry) return fallback

  const src = entry?.src ?? entry?.fallbackSrc
  if (typeof src === 'string') return resolveImageUrl(src)
  return fallback
}

export function getImageAlt(key?: string) {
  if (!key) return ''
  const manifest = loadManifest() as any
  const image = manifest?.images
  const find = (obj: any, segments: string[]) => {
    let cur = obj
    for (const seg of segments) {
      if (!cur || typeof cur !== 'object') return null
      cur = cur[seg]
    }
    return cur ?? null
  }
  const entry = find(image, key.split('.'))
  return typeof entry?.alt === 'string' ? entry.alt : ''
}
