import { isLang, type Lang } from '@/lib/content'
import { getData, getSite, getCountries } from '@/lib/content'
import { DataPageClient } from '@/components/data/DataPageClient'

export default async function DataPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const data = getData(lang)
  const site = getSite(lang)
  const countries = getCountries()

  return (
    <DataPageClient
      lang={lang}
      data={data}
      ui={{
        stat: site.ui.stat,
        chart: site.ui.chart,
        csv: site.ui.csv,
        filter: site.ui.filter,
      }}
      countries={countries}
    />
  )
}
