import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Cuidado Amiga — Mapa colaborativo de casos de violencia de género en América Latina'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #be123c 0%, #7c3aed 100%)',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: 28,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            opacity: 0.9,
          }}
        >
          <span>🌸</span>
          <span>América Latina</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            }}
          >
            Mapa colaborativo
            <br />
            de violencia de género
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              opacity: 0.95,
              maxWidth: '800px',
            }}
          >
            3 moderadoras independientes aprueban cada caso antes de publicarse.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          <span>cuidadoamiga.com</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
