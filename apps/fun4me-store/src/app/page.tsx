export const dynamic = 'force-static';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem', fontWeight: 700 }}>Fun4Me Store</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem' }}>
          Tu tienda online en Paraguay
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://wa.me/595981234567" style={{ padding: '0.75rem 1.5rem', background: '#22c55e', color: '#fff', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}>
            Contactar por WhatsApp
          </a>
          <a href="/api/admin/verify-ci" style={{ padding: '0.75rem 1.5rem', background: '#262626', color: '#fff', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}>
            Verificar CI (API)
          </a>
        </div>
        <p style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.5 }}>
          Próximamente: catálogo completo con pagos integrados
        </p>
      </section>
    </main>
  );
}
