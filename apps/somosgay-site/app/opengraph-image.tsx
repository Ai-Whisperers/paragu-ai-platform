import { ImageResponse } from 'next/og'

export const alt = 'SOMOSGAY — Tekoporã para todes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFFCF7 0%, #FFE4D6 100%)',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 120, fontWeight: 900, color: '#1B1B1B', marginBottom: 20 }}>
          SOMOSGAY
        </div>
        <div style={{ display: 'flex', fontSize: 56, fontStyle: 'italic', color: '#7B2CBF', marginBottom: 40 }}>
          Tekoporã para todes
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#4A4A4A' }}>
          Derechos LGBTQ+ y salud comunitaria en Paraguay
        </div>
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, right: 0, height: 12, background: 'linear-gradient(to right, #E40303, #FF8C00, #FFED00, #008026, #004CFF, #732982)' }} />
        <div style={{ display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 0, height: 12, background: 'linear-gradient(to right, #E40303, #FF8C00, #FFED00, #008026, #004CFF, #732982)' }} />
      </div>
    ),
    { ...size }
  )
}
