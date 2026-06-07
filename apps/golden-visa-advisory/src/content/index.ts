import data from './data.json'
import type { ContentData } from './types'

export type { ContentData, LocalizedContent } from './types'

const content = data as ContentData
export default content

export function getContent(locale: string) {
  return (content as any)[locale] || content.en
}

export function getPrograms() {
  return content.programs
}

export function getLanguages() {
  return content.languages
}

export function getSite() {
  return content.site
}
