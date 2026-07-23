# Nexa Paraguay — Recent Work Handoff (June–July 2026)

> **Prepared:** 2026-07-20
> **Evidence:** Git history, source inspection, GitHub PR state, Docker Swarm inspection, DNS and live HTTP probes.
> **Canonical research:** `Ai-Whisperers/nexa-paraguay` (private)

## Executive Summary

Nexa Paraguay is now a two-repository system:

- `Ai-Whisperers/nexa-paraguay` contains private client research, decisions, meetings, market intelligence and sales reference.
- `Ai-Whisperers/paragu-ai-platform/apps/nexa-paraguay` contains the deployable Next.js website, content JSON, tests, Docker and CI/CD.

Since the 2026-06-23 split, the Nexa app has received 85 commits. The work covered migration, Luana's client feedback, a full page/visual reconstruction, multilingual content correction, SEO package refactoring, and CI/deployment recovery.

## What Changed

### 1. Repository separation — 2026-06-23

Website code moved into this app directory. The private repo became research-only. This removed ambiguity about where production code lives while preserving client intelligence privately. The `docs/` directory here remains an operational mirror, not a second source of truth.

### 2. Client feedback and content — 2026-06-23 to 2026-06-24

Luana's feedback updated trust copy, services, process terminology, team data, FAQ content, contact information and blog visibility. Orphan FAQ/process data and the newsletter exit popup were removed or disabled.

### 3. Build and deployment recovery — 2026-06-23 to 2026-06-25

The migration exposed failures around private `@ai-whisperers/*` packages, pnpm workspace linking, Turbopack aliases, `.next` artifacts and Docker packaging. The working chain is now:

`workspace:* packages` -> `build required shared packages` -> `build app` -> `verify .next` -> `upload artifact` -> `Docker/GHCR` -> `stream image to VPS` -> `Swarm rolling update`.

### 4. Website reconstruction — 2026-06-25 to 2026-06-26

The home and detail pages were rebuilt around reusable sections. Work included Trust, Por qué Paraguay, Services, Process, Feedback, Contact, Testimonials and About/team sections, plus navigation, anchors, images and CTA repairs. The current `nexa-pages/` directory contains 31 page configurations.

### 5. Locale work — 2026-06-24 to 2026-07-01

Priority content was translated into EN/NL/DE and later filled through the translation pipeline. The four locale JSON files currently expose the same 41 functional top-level content blocks; German also contains `_meta`. Structural parity is not proof of perfect linguistic quality: future checks must render routes and detect wrong-language leakage.

### 6. Kiki content correction — 2026-07-16

Three commits changed the public story:

| Commit | Result |
|---|---|
| `dd80d901` | Tightened Spanish service copy and expanded rental geography beyond Asunción |
| `89413e01` | Removed inflated metrics, durations, unsupported credentials and anecdotal performance claims |
| `147b361f` | Synchronized the corrected founder/about narrative across EN/NL/DE and aligned Spanish copy |

The corrected facts are: Sonia is Paraguayan and married to a Dutch citizen; Luana is her daughter and coordinates cases end to end. Claims such as `80+`, `4.8/5`, `8–12 weeks`, `6x faster` and unsupported credentials were removed.

### 7. SEO and deployment repair — 2026-07-16 to 2026-07-17

Canonical/hreflang generation moved to `@ai-whisperers/site-seo`. A missing compiled package output and Turbopack alias initially blocked the build; PR #18 repaired that path. Subsequent merged PRs repaired GHCR permissions and image transfer to the VPS.

### 8. Runtime observability — 2026-07-17

Previously empty loader/storage catches now log context, making runtime fallback and data errors diagnosable without changing the page contract.

## Verified Current State

- Private research repo: `main`, synchronized with origin.
- Platform remote branches: `main` only; no open Nexa implementation branch.
- Working production hosts: `https://nexaparaguay.com.py` and `https://nexa.paragu-ai.com`.
- `https://nexaparaguay.com` still resolves to Shopify and returns HTTP 402 for app pages.
- Swarm service: `nexa-paraguay_web`, 2 replicas.
- Deployed image: `.../nexa-paraguay:4f700da0bb1397d66a6f4c3fa874c40b430a3b32`.
- Platform `main` is at `56b41680`, newer than the running image; post-image commits require an explicit production freshness check.
- Tested working routes: `/`, `/es`, `/en`, `/nl`, `/de`, `/es/servicios`, `/es/sobre`, `/es/contacto`, `/robots.txt`, `/sitemap.xml`, `/api/health`.

## Highest-Priority Improvements

### P0 — Align canonical domain

The app currently emits `https://nexaparaguay.com` in canonical and hreflang metadata, while DNS sends that host to Shopify. Choose the canonical host, then align DNS, Traefik, `NEXT_PUBLIC_APP_URL`, `src/lib/seo.ts`, `src/app/sitemap.ts`, `public/robots.txt`, `site.json`, compose labels, health-check defaults and Search Console.

Until the apex is moved away from Shopify, `https://nexaparaguay.com.py` is the technically honest working host.

### P1 — Remove configuration contradictions

`site.json` says the default locale is NL while shared runtime i18n defaults to ES. Git compose labels describe `.com` while live Swarm labels serve `.com.py` and ParaguAI aliases. Resolve these as one domain/locale configuration change.

### P1 — Restore Nexa quality gates

`next.config.js` ignores TypeScript build errors, app lint/typecheck scripts end with `|| true`, and central CI isolates fleet failures with `continue-on-error`. Establish and fix a Nexa baseline, then make Nexa's own build and Docker jobs blocking for its deploy.

### P1 — Govern docs mirror drift

Run `diff -qr` before any sync. Classify private-canonical files, platform-only runtime evidence and generated artifacts. Do not use blind `rsync --delete`.

### P2 — Improve linguistic and integration verification

Render all 31 page configs per locale, detect Spanish leakage on EN/NL/DE, and distinguish an integration link, implemented endpoint, configured credentials, verified request and retrievable persistence. Source code alone does not prove HubSpot, Mailchimp, Supabase or bot activation.

## Next-Session Reading Order

1. `CURRENT_STATE.md`
2. This file
3. `SOURCE_OF_TRUTH.md`
4. `NEXA_DECISIONS.md`
5. `../README.md`
6. `../src/lib/seo.ts`, `../src/proxy.ts`, `../site.json`, `../docker-compose.yml`
7. `../content/{es,en,nl,de}.json`
8. `../nexa-pages/*.json`
