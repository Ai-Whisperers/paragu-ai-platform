import { loadPageData } from '@/lib/page-data'
import SectionsRenderer from '@/components/SectionsRenderer'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LOCALES } from '@/lib/locales'

interface Props { params: Promise<{ locale: string; path: string[] }> }

// Generate static params from the directory structure
function getStaticPaths(): { locale: string; path: string[] }[] {
  const pagesDir = 'nexa-pages'
  const params: { locale: string; path: string[] }[] = []
  
  // Walk nexa-pages/ directory looking for subdirectory paths
  // Example: nexa-pages/sobre/equipo.json → path: ['sobre', 'equipo']
  // But we use underscore convention: nexa-pages/sobre_equipo.json → path: ['sobre', 'equipo']
  // Or with subdirectories: nexa-pages/sobre/equipo.json → path: ['sobre', 'equipo']
  
  // For simplicity, look for files with underscore pattern: sobre_equipo.json
  // Or files in subdirectories: sobre/equipo.json
  
  const fs = require('fs')
  const path = require('path')
  
  if (!fs.existsSync(pagesDir)) return params
  
  // Recursive walk
  function walk(dir: string, prefix: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath, [...prefix, entry.name])
      } else if (entry.name.endsWith('.json')) {
        const slugParts = [...prefix, entry.name.replace('.json', '')]
        for (const locale of LOCALES) {
          params.push({ locale, path: slugParts })
        }
      }
    }
  }
  
  walk(pagesDir)
  return params
}

export function generateStaticParams() {
  return getStaticPaths()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, path } = await params
  const slug = path.join('_')
  const data = await loadPageData(locale, slug)
  if (!data) return { title: 'Not Found' }
  return {
    title: data.pageConfig?.title || data.content?.siteName || 'Nexa Paraguay',
    description: data.pageConfig?.description || data.content?.description || '',
  }
}

export default async function CatchallPage({ params }: Props) {
  const { locale, path } = await params
  const slug = path.join('_')
  const data = await loadPageData(locale, slug)
  if (!data) notFound()
  return <SectionsRenderer content={data.content} pageConfig={data.pageConfig} images={data.images?.images || {}} locale={data.locale} />
}
