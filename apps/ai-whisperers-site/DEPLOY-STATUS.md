# ai-whisperers.org — DNS Cutover Runbook (2026-06-16)

## TL;DR

The new VPS site is **built, deployed, and verified clean** (no Jonathan, Ivan + Kyrian only, 4 locales). The blocker is **DNS**: the registrar (Squarespace Domains) is still delegating `ai-whisperers.org` to an old Cloudflare account's nameservers (`perla.ns.cloudflare.com`, `skip.ns.cloudflare.com`). Those serve the **legacy Vercel site** with the old Jonathan-era content.

**5-minute fix:** switch the registrar's nameservers to the new Cloudflare account's NS, where the correct records are already configured.

## Current State (verified 2026-06-16 01:15 UTC)

| Component | Status |
|-----------|--------|
| New VPS build | ✅ Live, 1/1 replicas, image `prod-b8ec913-20260616-0110` |
| New build content (Ivan + Kyrian, no Jonathan) | ✅ Verified at `en/about` |
| Traefik config (apex serves, www → 301 apex) | ✅ Wired, apex/www routers split cleanly (commit `b8ec913`) |
| LE cert for `ai-whisperers.org` | ⏳ Will be issued on first HTTPS hit once DNS resolves |
| Cloudflare zone (new account) | ⚠️ `status=pending`, `ns_mismatch` — needs NS swap at registrar |
| Apex A record (new account) | ✅ 72.61.44.159 (VPS) |
| www A record (new account) | ✅ 72.61.44.159 (VPS) |
| Apex A record (live, old account) | ❌ 216.150.1.1 (Vercel) |
| www A record (live, old account) | ❌ 104.21.56.190 + 172.67.155.205 (Cloudflare anycast → GitHub Pages 404) |

## Why this happened

The Cloudflare zone for `ai-whisperers.org` was created today on a new account
(`Weissvanderpol.ivan@gmail.com` / account ID `9eb1832f3e42a1dbd6ba854f8d6a1cb2`).
The zone has all the correct A records but the registrar's NS records still
point at the previous account's nameservers. The world's DNS queries go to
the **old** nameservers, which serve the **old** records (Vercel IP for apex,
Cloudflare → GitHub Pages 404 for www).

The new zone shows up as `status=pending` with `activation_failure_reason: ns_mismatch` — Cloudflare won't activate the zone until the registrar delegates to it.

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

## What to monitor after cutover

- `https://ai-whisperers.org/{en,es,nl,pt}/` — all 4 locales should be 200
- `https://ai-whisperers.org/{en,es,nl,pt}/about` — should mention "Ivan" and "Kyrian", not "Jonathan" or "Kiryan"
- `https://www.ai-whisperers.org/...` — should 301 to apex (with HTTPS)
- `/sitemap.xml`, `/robots.txt` — should be present
- `Content-Security-Policy`, `Strict-Transport-Security` headers — should be set (security-headers@file middleware)
