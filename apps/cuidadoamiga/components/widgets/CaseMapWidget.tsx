'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

interface Case {
  id: string
  nombre: string
  fecha: string
  tipo: string
  pais: string
  ciudad: string
  lat?: number
  lng?: number
}

export function CaseMapWidget({ baseUrl, lang = 'es', height = 400 }: { baseUrl: string; lang?: string; height?: number }) {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/cases?limit=50`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setCases(data.data.filter((c: Case) => c.lat && c.lng))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar')
      } finally {
        setLoading(false)
      }
    }
    fetchCases()
  }, [baseUrl])

  if (loading) return <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>
  if (error) return <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>{error}</div>

  return (
    <div style={{ height, position: 'relative' }}>
      <MapContainer center={[-25.4, -57.6]} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cases.map((c) => (
          <Marker key={c.id} position={[c.lat!, c.lng!]}>
            <Popup>
              <a href={`${baseUrl}/${lang}/casos/${c.id}`} target="_blank" rel="noopener noreferrer">
                <strong>{c.nombre}</strong>
              </a>
              <br />
              {c.ciudad}, {c.pais}
              <br />
              <small>{c.fecha}</small>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}