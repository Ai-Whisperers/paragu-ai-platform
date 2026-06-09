# Deployment

Cuidado Amiga is a Next.js 16 App Router app with i18n routing, Supabase, and
resend for transactional mail. This document covers production deployment.

## Vercel (recommended)

1. **Connect repo** — `Ai-Whisperers/paragu-ai-platform`
2. **Project settings**:
   - Root directory: `apps/cuidadoamiga`
   - Build command: `pnpm build`
   - Install command: `pnpm install --frozen-lockfile`
   - Node version: 22+
3. **Environment variables** (in Vercel dashboard):

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | service-role key (server-only) |
   | `RESEND_API_KEY` | Resend API key (optional, for application mail) |
   | `NEXT_PUBLIC_SITE_URL` | `https://cuidadoamiga.com` |
   | `NEXT_PUBLIC_OWNER_EMAILS` | CSV of owner emails for the moderation panel |

4. **Custom domain** — `cuidadoamiga.com` via Vercel Domains.

5. **Database** — Run `supabase/schema.sql` against your Supabase project
   (Supabase SQL editor or `psql -f`).

6. **Seed the first owner**:

   ```sql
   -- Run after the first user signs up via /admin/login
   insert into moderators (user_id, role, display_name)
   values ('<auth.uid>', 'owner', 'Sofía Juredare');
   ```

## Supabase setup

1. Create a new Supabase project
2. SQL editor → paste `supabase/schema.sql` → run
3. Auth → URL Configuration:
   - Site URL: `https://cuidadoamiga.com`
   - Redirect URLs: `https://cuidadoamiga.com/**`, `http://localhost:3000/**`
4. Storage (optional, for case photos): create a `case-photos` bucket with
   public read access

## Rate limits

The middleware includes a 5-per-10-minute in-memory rate limit on
`POST /api/cases`. For multi-instance deployments, replace with Upstash KV
(see `lib/ratelimit.ts` in Phase 4.2).

## Security headers

`next.config.ts` ships with:
- Content-Security-Policy (no inline scripts from non-trusted sources)
- HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff
- Referrer-Policy strict-origin-when-cross-origin
- Permissions-Policy (camera/microphone/geolocation disabled)

## Health check

```
GET /es  → 200
```

For a real health endpoint, see the platform template at
`packages/site-template/app/api/health/route.ts`.

## Rollback

Vercel keeps every deployment. To roll back:

```
Vercel dashboard → Deployments → select previous successful → Promote to Production
```

## Custom domain + HTTPS

Vercel auto-provisions Let's Encrypt certs. No action needed.

## Monitoring

- **Errors**: hook up Sentry via `@sentry/nextjs` (Phase 4.3)
- **Analytics**: Vercel Analytics (consent-gated) — see `app/layout.tsx`
- **Uptime**: UptimeRobot or Better Stack — point to `/es`

## Backup

Supabase runs daily logical backups (free tier: 7 days retention).
Pro tier: configure PITR. Exports: `supabase db dump --schema public`.
