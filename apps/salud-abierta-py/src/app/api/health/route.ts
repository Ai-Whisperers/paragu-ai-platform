// /api/health — endpoint for Traefik + Docker healthcheck
// Returns 200 with service info. No sensitive data, no DB calls.
// Used by:
//   - Docker HEALTHCHECK (Dockerfile.standalone)
//   - Traefik loadbalancer healthcheck (docker-compose.yml)
//   - Manual uptime monitoring

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
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
