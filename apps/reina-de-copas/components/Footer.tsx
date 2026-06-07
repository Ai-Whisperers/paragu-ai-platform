'use client'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#1a1a2e',
        color: '#ccc',
        padding: '32px 0',
        marginTop: 64,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <p style={{ color: 'white', fontWeight: 700, marginBottom: 4 }}>
              Reina de Copas Paraguay
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              Copas y discos menstruales en Paraguay
            </p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
            <p>📱 @reinadecopaspy</p>
            <p>💚 Alternativa ecológica y segura</p>
          </div>
        </div>
        <div
          style={{
            borderTop: '1px solid #333',
            marginTop: 16,
            paddingTop: 16,
            textAlign: 'center',
            fontSize: '0.8rem',
            color: '#888',
          }}
        >
          © {new Date().getFullYear()} Reina de Copas Paraguay. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
