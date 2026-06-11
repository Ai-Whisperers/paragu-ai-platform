// Demo cases used when Supabase is not configured.
// Mirrors the structure of the production `cases` table so the same UI works for both.
export interface DemoCase {
  id: string
  nombre: string
  victima: string | null
  fecha: string
  tipo: 'femicidio' | 'abuso' | 'acoso'
  pais: string
  ciudad: string | null
  lat: number
  lng: number
  descripcion: string | null
  fuentes: string[]
}

export const DEMO_CASES: DemoCase[] = [
  { id: '1', nombre: 'Caso registrado — Buenos Aires', victima: null, fecha: '2024-03-15', tipo: 'femicidio', pais: 'Argentina', ciudad: 'Buenos Aires', lat: -34.6037, lng: -58.3816, descripcion: 'Caso verificado por tres moderadoras independientes. Fuente: nota periodística.', fuentes: ['https://ejemplo.com/nota-1'] },
  { id: '2', nombre: 'Caso registrado — São Paulo', victima: null, fecha: '2024-04-02', tipo: 'abuso', pais: 'Brasil', ciudad: 'São Paulo', lat: -23.5505, lng: -46.6333, descripcion: 'Caso verificado. Fuente: denuncia oficial.', fuentes: ['https://ejemplo.com/denuncia-2'] },
  { id: '3', nombre: 'Caso registrado — Ciudad de México', victima: null, fecha: '2024-05-10', tipo: 'acoso', pais: 'México', ciudad: 'Ciudad de México', lat: 19.4326, lng: -99.1332, descripcion: 'Caso verificado. Fuente: registro de organización reconocida.', fuentes: ['https://ejemplo.com/org-3'] },
  { id: '4', nombre: 'Caso registrado — Bogotá', victima: null, fecha: '2024-06-22', tipo: 'femicidio', pais: 'Colombia', ciudad: 'Bogotá', lat: 4.7110, lng: -74.0721, descripcion: 'Caso verificado. Fuente: nota periodística.', fuentes: ['https://ejemplo.com/nota-4'] },
  { id: '5', nombre: 'Caso registrado — Santiago', victima: null, fecha: '2024-07-08', tipo: 'abuso', pais: 'Chile', ciudad: 'Santiago', lat: -33.4489, lng: -70.6693, descripcion: 'Caso verificado. Fuente: denuncia oficial.', fuentes: ['https://ejemplo.com/denuncia-5'] },
  { id: '6', nombre: 'Caso registrado — Lima', victima: null, fecha: '2024-08-14', tipo: 'femicidio', pais: 'Perú', ciudad: 'Lima', lat: -12.0464, lng: -77.0428, descripcion: 'Caso verificado. Fuente: nota periodística.', fuentes: ['https://ejemplo.com/nota-6'] },
  { id: '7', nombre: 'Caso registrado — Montevideo', victima: null, fecha: '2024-09-03', tipo: 'acoso', pais: 'Uruguay', ciudad: 'Montevideo', lat: -34.9011, lng: -56.1645, descripcion: 'Caso verificado. Fuente: registro de organización reconocida.', fuentes: ['https://ejemplo.com/org-7'] },
  { id: '8', nombre: 'Caso registrado — Asunción', victima: null, fecha: '2024-09-19', tipo: 'femicidio', pais: 'Paraguay', ciudad: 'Asunción', lat: -25.2637, lng: -57.5759, descripcion: 'Caso verificado. Fuente: nota periodística.', fuentes: ['https://ejemplo.com/nota-8'] },
  { id: '9', nombre: 'Caso registrado — Quito', victima: null, fecha: '2024-10-05', tipo: 'abuso', pais: 'Ecuador', ciudad: 'Quito', lat: -0.1807, lng: -78.4678, descripcion: 'Caso verificado. Fuente: denuncia oficial.', fuentes: ['https://ejemplo.com/denuncia-9'] },
  { id: '10', nombre: 'Caso registrado — La Paz', victima: null, fecha: '2024-10-21', tipo: 'femicidio', pais: 'Bolivia', ciudad: 'La Paz', lat: -16.4897, lng: -68.1193, descripcion: 'Caso verificado. Fuente: nota periodística.', fuentes: ['https://ejemplo.com/nota-10'] },
  { id: '11', nombre: 'Caso registrado — Caracas', victima: null, fecha: '2024-11-09', tipo: 'acoso', pais: 'Venezuela', ciudad: 'Caracas', lat: 10.4806, lng: -66.9036, descripcion: 'Caso verificado. Fuente: registro de organización reconocida.', fuentes: ['https://ejemplo.com/org-11'] },
  { id: '12', nombre: 'Caso registrado — Córdoba', victima: null, fecha: '2024-11-25', tipo: 'femicidio', pais: 'Argentina', ciudad: 'Córdoba', lat: -31.4201, lng: -64.1888, descripcion: 'Caso verificado. Fuente: nota periodística.', fuentes: ['https://ejemplo.com/nota-12'] },
  { id: '13', nombre: 'Caso registrado — Ciudad de Guatemala', victima: null, fecha: '2024-12-07', tipo: 'abuso', pais: 'Guatemala', ciudad: 'Ciudad de Guatemala', lat: 14.6349, lng: -90.5069, descripcion: 'Caso verificado. Fuente: denuncia oficial.', fuentes: ['https://ejemplo.com/denuncia-13'] },
  { id: '14', nombre: 'Caso registrado — Tegucigalpa', victima: null, fecha: '2024-12-18', tipo: 'femicidio', pais: 'Honduras', ciudad: 'Tegucigalpa', lat: 14.0723, lng: -87.1921, descripcion: 'Caso verificado. Fuente: nota periodística.', fuentes: ['https://ejemplo.com/nota-14'] },
  { id: '15', nombre: 'Caso registrado — San José', victima: null, fecha: '2025-01-14', tipo: 'acoso', pais: 'Costa Rica', ciudad: 'San José', lat: 9.9281, lng: -84.0907, descripcion: 'Caso verificado. Fuente: registro de organización reconocida.', fuentes: ['https://ejemplo.com/org-15'] },
]

export function getDemoCase(id: string): DemoCase | undefined {
  return DEMO_CASES.find(c => c.id === id)
}
