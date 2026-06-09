import { getServerSupabase } from '@/lib/supabase/server'
import type { Lang } from '@/lib/content'
import CaseMap from './CaseMap'

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

export async function CaseMapWrapper({ lang: _lang }: CaseMapWrapperProps) {
  let cases: CaseRow[] = []
  let usingDemo = false
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!url || url === 'your_supabase_url') {
    usingDemo = true
    cases = getDemoCases()
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
        cases = getDemoCases()
      } else {
        cases = data as CaseRow[]
      }
    } catch {
      usingDemo = true
      cases = getDemoCases()
    }
  }

  return (
    <div className="relative">
      {usingDemo ? (
        <div
          role="status"
          className="bg-amber-50 border-b border-amber-200 text-amber-800 text-center text-xs py-2 px-4"
        >
          Mostrando datos de demo — configurá <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> para conectar
        </div>
      ) : null}
      <div className="h-[500px] md:h-[600px] w-full px-4 md:px-6">
        <CaseMap cases={cases} />
      </div>
    </div>
  )
}

function getDemoCases(): CaseRow[] {
  return [
    { id: '1', nombre: 'Caso Demo — Argentina', victima: null, fecha: '2024-03-15', tipo: 'femicidio', pais: 'Argentina', ciudad: 'Buenos Aires', lat: -34.6037, lng: -58.3816 },
    { id: '2', nombre: 'Caso Demo — Brasil', victima: null, fecha: '2024-04-02', tipo: 'abuso', pais: 'Brasil', ciudad: 'São Paulo', lat: -23.5505, lng: -46.6333 },
    { id: '3', nombre: 'Caso Demo — México', victima: null, fecha: '2024-05-10', tipo: 'acoso', pais: 'México', ciudad: 'Ciudad de México', lat: 19.4326, lng: -99.1332 },
  ]
}
