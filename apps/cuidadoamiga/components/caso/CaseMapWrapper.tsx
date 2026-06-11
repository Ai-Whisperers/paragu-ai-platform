import { getServerSupabase } from '@/lib/supabase/server'
import type { Lang } from '@/lib/content'
import CaseMap from './CaseMap'
import { DEMO_CASES } from '@/lib/demo/cases'

interface CaseMapWrapperProps {
  lang: Lang
}

interface CaseRow {
  id: string
  nombre: string
  victima: string | null
  fecha: string
  tipo: 'femicidio' | 'abuso' | 'acoso'
  pais: string
  ciudad: string | null
  lat: number
  lng: number
}

export async function CaseMapWrapper({ lang }: CaseMapWrapperProps) {
  let cases: CaseRow[] = []
  let usingDemo = false
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!url || url === 'your_supabase_url') {
    usingDemo = true
    cases = DEMO_CASES
  } else {
    try {
      const supabase = await getServerSupabase()
      const { data, error } = await supabase
        .from('cases')
        .select('id, nombre, victima, fecha, tipo, pais, ciudad, lat, lng')
        .eq('estado', 'aprobado')
        .order('fecha', { ascending: false })

      if (error || !data) {
        usingDemo = true
        cases = DEMO_CASES
      } else {
        cases = data as CaseRow[]
      }
    } catch {
      usingDemo = true
      cases = DEMO_CASES
    }
  }

  return (
    <div className="relative">
      {usingDemo ? (
        <div
          role="status"
          className="bg-amber-50 border-b border-amber-200 text-amber-800 text-center text-xs py-2 px-4"
        >
          Base de datos en configuración — los casos mostrados son ejemplos del prototipo
        </div>
      ) : null}
      <div className="h-[500px] md:h-[600px] w-full px-4 md:px-6">
        <CaseMap cases={cases} lang={lang} />
      </div>
    </div>
  )
}

