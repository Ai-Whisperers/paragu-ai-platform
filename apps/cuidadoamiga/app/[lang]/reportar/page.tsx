import { getReportar, getCountries, isLang, type Lang } from '@/lib/content'
import { ReportarForm } from '@/components/caso/ReportarForm'

export default async function ReportarPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const reportar = getReportar(lang)
  const countries = getCountries()

  return (
    <ReportarForm
      lang={lang}
      title={reportar.title}
      subtitle={reportar.subtitle}
      fields={reportar.form.fields}
      tipoOptions={reportar.form.tipoOptions}
      procesoOptions={reportar.form.procesoOptions}
      submitLabel={reportar.form.submitLabel}
      successTitle={reportar.success.title}
      successBody={reportar.success.body}
      hints={reportar.hints}
      countries={countries}
    />
  )
}
