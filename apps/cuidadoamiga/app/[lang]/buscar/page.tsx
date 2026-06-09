import { isLang, type Lang, getSite } from '@/lib/content'
import { SearchClient } from '@/components/search/SearchClient'

export default async function SearchPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const site = getSite(lang)

  return <SearchClient lang={lang} ui={site.ui.search} />
}
