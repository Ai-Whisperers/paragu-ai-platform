import { AdminPanelClient } from '@/components/admin/AdminPanelClient'
import type { Lang } from '@/lib/content'
import { isLang } from '@/lib/content'

export default async function AdminIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  return <AdminPanelClient lang={lang} />
}
