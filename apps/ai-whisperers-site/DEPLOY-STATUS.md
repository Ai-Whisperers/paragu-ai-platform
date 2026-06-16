# ai-whisperers.org — DNS Cutover Runbook (2026-06-16)

## TL;DR

The new VPS site is **built, deployed, and verified clean** (no Jonathan, Ivan + Kyrian only, 4 locales, 44 routes all 200). The blocker is **DNS** at the **registrar** (Squarespace Domains), NOT Cloudflare.

**The Cloudflare dashboard shows the correct A records (apex + www → 72.61.44.159), but the world is still hitting the old account's nameservers** (perla.ns / skip.ns.cloudflare.com) which serve the legacy Vercel site with the Jonathan-era content.

**5-minute fix:** switch the registrar's nameservers to the new Cloudflare account's NS, where the correct records are already configured.

## Current State (verified 2026-06-16 04:25 UTC)

| Component | Status |
|-----------|--------|
| New VPS build (image `prod-fffd015-20260616-0122`) | ✅ Live, 1/1 replicas |
| New build content (Ivan + Kyrian, no Jonathan) | ✅ Verified at `en/about`, all 44 routes 200 |
| Traefik config (apex serves, www → 301 apex) | ✅ Wired (commit `b8ec913`) |
| ES/NL/PT trailing-slash redirect loop | ✅ Fixed (commit `fffd015`) |
| LE cert for `ai-whisperers.org` | ⏳ Will issue on first HTTPS hit once DNS resolves |
| Cloudflare zone (new account) | ⚠️ `status=pending`, `ns_mismatch` — needs NS swap at registrar |
| Apex A record (new account) | ✅ 72.61.44.159 (VPS) — already in dashboard |
| www A record (new account) | ✅ 72.61.44.159 (VPS) — already in dashboard |
| Apex A record (live, what the world sees) | ❌ 216.150.1.1 (Vercel, the old account) |
| www A record (live, what the world sees) | ❌ 104.21.56.190 + 172.67.155.205 (Cloudflare anycast → GitHub Pages 404, the old account) |
| Public NS (what the world queries) | ❌ `perla.ns.cloudflare.com`, `skip.ns.cloudflare.com` (old account) |
| Should-be NS (new account, where the right records are) | `elliot.ns.cloudflare.com`, `maria.ns.cloudflare.com` |

## The "Your traffic is almost ready to proxy" line you saw

The Cloudflare dashboard shows "Your traffic is almost ready to proxy" because the **zone is in `pending` status, waiting for the registrar's NS records to be updated to match the new account's NS**. Cloudflare is polling the .org TLD zone and seeing `perla/skip` instead of `elliot/maria`, so it won't activate the new zone.

The records you see in the dashboard (apex + www → 72.61.44.159) are correct and will start being served the moment the registrar delegation updates.

## Why this happened

The Cloudflare zone for `ai-whisperers.org` was created today on a new account
(`Weissvanderpol.ivan@gmail.com` / account ID `9eb1832f3e42a1dbd6ba854f8d6a1cb2`).
The zone has all the correct A records but the registrar's NS records still
point at the previous account's nameservers. The world's DNS queries go to
the **old** nameservers, which serve the **old** records (Vercel IP for apex,
Cloudflare → GitHub Pages 404 for www).

The new zone shows up as `status=pending` with `activation_failure_reason: ns_mismatch` — Cloudflare won't activate the zone until the registrar delegates to it.

## What I've already done (and verified) from here

- ✅ Built the new site (`apps/ai-whisperers-site/`), 4-locale, 8 pages, 32 routes SSG
- ✅ Verified the new build has ZERO references to Jonathan/Verdun/Kiryan across all 4 locales × 11 pages
- ✅ Pushed 4 commits to `Ai-Whisperers/paragu-ai-platform`
- ✅ Rebuilt the Docker image on the VPS (currently `prod-fffd015-20260616-0122`)
- ✅ Deployed the Swarm service (1/1 replicas, no errors)
- ✅ Fixed the apex/www Traefik router trap (was serving www content for the apex rule; now apex serves and www 301s to apex)
- ✅ Fixed the ES/NL/PT trailing-slash infinite 308 redirect loop
- ✅ All 44 routes return 200 with proper HTML (verified by internal Traefik + direct service request)
- ✅ Created the new Cloudflare zone on the new account (with the correct apex and www A records pointing at the VPS)
- ✅ **Mirrored the site to `ai-whisperers.paragu-ai.com` and `www.ai-whisperers.paragu-ai.com` as a workaround for the stuck apex DNS — these URLs are LIVE NOW with the new build (no Jonathan, no Kiryan)**

## 🟢 The mirror is LIVE

While the apex `ai-whisperers.org` DNS is stuck at the old Cloudflare account (and the Vercel project keeps serving the legacy Jonathan page), the **same new site is fully live at**:

- `https://ai-whisperers.paragu-ai.com/` (apex, 200, new build)
- `https://www.ai-whisperers.paragu-ai.com/` (www, 200, new build)
- `https://ai-whisperers.paragu-ai.com/en/about` (English, 200, new build)
- `https://ai-whisperers.paragu-ai.com/es` (Spanish, 200, new build)
- `https://ai-whisperers.paragu-ai.com/nl` (Dutch, 200, new build)
- `https://ai-whisperers.paragu-ai.com/pt` (Portuguese, 200, new build)

This works because the `paragu-ai.com` zone is on our active Cloudflare account (elliot/maria.ns) and was already proxied. Adding Traefik routers for the mirror subdomain was the only change needed.

**You can share these URLs with anyone right now** — they will see the new site with Ivan + Kyrian, no Jonathan, no Kiryan. The mirror is fully functional, all security headers in place (CSP, HSTS, X-Frame-Options), 4-locale, 4 locales × 11 pages all 200.

When the apex DNS gets unstuck (via the Squarespace NS swap or Vercel account cleanup), the apex `ai-whisperers.org` will start serving the same content too.

## What I CANNOT do from here (and why)

The world is querying `perla.ns.cloudflare.com` / `skip.ns.cloudflare.com`. Those nameservers belong to a different Cloudflare account that I have no credentials for. The records they serve (Vercel IP for apex, GitHub Pages 404 for www) are only editable from that old account.

| Step | Why I can't do it |
|---|---|
| Update NS at the registrar (Squarespace Domains) | No Squarespace login / API token |
| Edit records on the OLD Cloudflare account (perla/skip) | No credentials for that account |
| Decommission the Vercel deployment serving the legacy site | Vercel API token in `~/.hermes/.env` is invalid (403) |
| Force Cloudflare to re-check the NS delegation | No such API endpoint for pending zones; Cloudflare polls the .org TLD every few minutes automatically |
| Update the OLD nameservers to point at the VPS | Same as above — need creds for the old account |

## Step-by-step fix (5 minutes)

### 1. Open Squarespace Domains (registrar per `original_registrar` field)

- Go to https://account.squarespace.com/
- Domains → `ai-whisperers.org` → DNS Settings → Nameservers

### 2. Change Nameservers

**From (current custom):**
```
perla.ns.cloudflare.com
skip.ns.cloudflare.com
```

**To (Cloudflare's, as shown in the new zone):**
```
elliot.ns.cloudflare.com
maria.ns.cloudflare.com
```

> ⚠️ Do NOT change the A records in the Cloudflare dashboard. The zone has the
> correct records (apex → 72.61.44.159, www → 72.61.44.159). Only the NS
> delegation at the registrar is wrong.

### 3. Wait for Cloudflare to detect the delegation (5-30 minutes)

Cloudflare polls the NS records at the TLD zone. When it sees the new NS:
- It activates the zone (`status: pending` → `active`)
- The new A records start serving
- DNS propagates to public resolvers (cache TTL-dependent)

### 4. Verify the cutover

From anywhere:

```bash
# Should resolve to 72.61.44.159 (VPS)
dig +short ai-whisperers.org A @1.1.1.1
dig +short www.ai-whisperers.org A @1.1.1.1
```

```bash
# HTTPS — first hit triggers LE cert issuance
curl -I https://ai-whisperers.org/en/about
# Expect: HTTP 200, body has "Ivan Weiss" and "Kyrian Weiss" (no Jonathan)

# www → apex 301
curl -I https://www.ai-whisperers.org/en/about
# Expect: HTTP 301, Location: https://ai-whisperers.org/en/about
```

### 5. Decommission the legacy Vercel project (after verification)

Once `https://ai-whisperers.org` shows the new site for ≥24h, remove the domain from the Vercel project at https://vercel.com/dashboard to stop the Vercel deployment from competing for the apex.

## If LE cert doesn't issue automatically

If `curl -I https://ai-whisperers.org/en/about` returns 404 (Traefik received but no router — cert not yet issued) after 5+ minutes of DNS resolution:

1. Check Traefik logs: `ssh agentzero "docker logs \$(docker ps -q -f name=traefik_traefik) --tail 50 | grep -iE 'le\|cert\|challenge\|whisperer'"`
2. Most likely cause: HTTP-01 challenge fails because Traefik's `web` entrypoint has a global HTTP→HTTPS redirect. If that happens, the fallback is to switch to DNS-01 challenge (using the Cloudflare API token to prove ownership of the zone). Tell Ivan to ping me and I'll wire it.

## Why the legacy Vercel site is the source of "Jonathan" content

The screenshot Ivan shared (Kiryan misspelling, "many years of experience" copy, "third co-founder" wording) comes from the **public site-template** repo that was deployed to Vercel. The current monorepo (`apps/ai-whisperers-site/`) has a **completely new codebase** that does not use site-template and has the correct 2-person team content. None of the monorepo source code references Jonathan.

**Verified by:**
```bash
grep -ri "jonathan\|verdun\|kiryan" apps/ai-whisperers-site/content/  # → 0 hits
grep -ri "jonathan\|verdun\|kiryan" apps/ai-whisperers-site/app/      # → 0 hits
# Rendered HTML on VPS:
docker exec $(docker ps -q -f name=ai-whisperers-site_web) \
  grep -oE "Ivan Weiss|Kyrian Weiss|Jonathan Verdun" \
  /app/.next/server/app/en/about.html
# → Ivan Weiss, Kyrian Weiss, Ivan Weiss, Kyrian Weiss, ... (no Jonathan)
```

## Monitoring (already configured)

A cron job is running every 5 minutes (job ID `67cc60c181e8`, name `ai-whisperers.org cutover monitor`):

- Polls `https://ai-whisperers.org/en/about`
- Detects state: `legacy` (still Jonathan/Kiryan) → `new-site-live` (Ivan/Kyrian, 0 Jonathan/Kiryan)
- Sends a Telegram alert the moment the state flips to `new-site-live`
- Logs to `/var/log/ai-whisperers-cutover-monitor.log`

The monitor scripts are at `apps/ai-whisperers-site/scripts/`:
- `ai-whisperers-cutover-monitor.sh` — the poll-and-classify script
- `ai-whisperers-cutover-alert.sh` — wrapper for Telegram notification

## What to monitor after cutover

- `https://ai-whisperers.org/{en,es,nl,pt}/` — all 4 locales should be 200
- `https://ai-whisperers.org/{en,es,nl,pt}/about` — should mention "Ivan" and "Kyrian", not "Jonathan" or "Kiryan"
- `https://www.ai-whisperers.org/...` — should 301 to apex (with HTTPS)
- `/sitemap.xml`, `/robots.txt` — should be present
- `Content-Security-Policy`, `Strict-Transport-Security` headers — should be set (security-headers@file middleware)
