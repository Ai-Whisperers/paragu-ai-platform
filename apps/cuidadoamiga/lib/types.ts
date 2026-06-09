// Shared types for the Cuidado Amiga codebase.
// These mirror the Supabase schema and are extended by the Zod validators
// in the admin panel. Keep the Zod schemas as the source of truth for
// input validation; these are the runtime JS types.

export interface Case {
  id: string
  nombre: string
  victima: string
  tipo: 'femicidio' | 'abuso' | 'acoso'
  pais: string
  ciudad: string | null
  fecha: string
  foto_url: string | null
  fuentes: string // JSON string of Source[]
  proceso_judicial: string | null
  estado: string
  visible: boolean
  // fulltext_search is a generated column, not returned by default
}

export interface Source {
  url: string
  title: string
  tipo: string
}
