import { getUnirse, getCountries, isLang, type Lang } from '@/lib/content'
import { UnirseForm } from '@/components/admin/UnirseForm'

export default async function UnirsePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const unirse = getUnirse(lang)
  const countries = getCountries()

  return (
    <UnirseForm
      lang={lang}
      title={unirse.title}
      subtitle={unirse.subtitle}
      fields={unirse.form.fields}
      comoSeEnteroOptions={unirse.form.comoSeEnteroOptions}
      consent={unirse.form.consent}
      submitLabel={unirse.form.submitLabel}
      successTitle={unirse.success.title}
      successBody={unirse.success.body}
      countries={countries}
    />
  )
}
