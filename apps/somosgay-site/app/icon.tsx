import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/svg+xml'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#7B2CBF',
          color: 'white',
          fontSize: 22,
          fontWeight: 700,
          fontFamily: 'serif',
        }}
      >
        S
      </div>
    ),
    { ...size }
  )
}
