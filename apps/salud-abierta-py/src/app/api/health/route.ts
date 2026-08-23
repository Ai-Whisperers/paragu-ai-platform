// /api/health — health check endpoint
// Only active in standalone/Docker Swarm mode. Static export (GitHub Pages)
// doesn't serve API routes, so this is harmless there.

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  // In static export, this route shouldn't even be reachable.
  // But if somehow accessed, return 503.
  if (process.env.NEXT_RUNTIME === 'edge' || typeof process === 'undefined') {
    return new Response('Not available in static export', { status: 503 });
  }
  return Response.json({
    status: 'ok',
    service: 'salud-abierta-py',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    locale: ['es', 'en', 'guarani'],
    features: {
      casos: 25,
      hospitales: 15,
      sitemap: '/sitemap.xml',
      robots: '/robots.txt',
    },
    uptime_seconds: Math.floor(process.uptime()),
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Content-Type': 'application/json',
    },
  });
}
