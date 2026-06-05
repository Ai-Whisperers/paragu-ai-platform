# Phase 0 — Implementation checklist

Use this checklist to launch a new client site from `site-template`.

## Pre-flight
- [ ] Clone `site-template` and create client repo
- [ ] Rename package / update branding tokens
- [ ] Add `content/es/site.json` business data
- [ ] Add `content/en/site.json` business data
- [ ] Upload logo and brand colors
- [ ] Configure domain in `proxy.ts` / Traefik

## Content phase
- [ ] Services (`content/es/services/index.json`, `content/en/services/index.json`)
- [ ] Hero (`content/es/hero.json`, `content/en/hero.json`)
- [ ] Testimonials (`content/es/testimonials.json`, `content/en/testimonials.json`)
- [ ] FAQ (`content/es/faqs.json`, `content/en/faqs.json`)
- [ ] Team (`content/_shared/team.json`)
- [ ] Gallery (`content/es/gallery.json`, `content/en/gallery.json`)
- [ ] Pricing enabled + tiers in `content/_shared/pricing.json`
- [ ] Promotions if active (`content/es/promotions/`, `content/en/promotions/`)

## QA
- [ ] `python3 tools/validate-refs.py --all`
- [ ] `python3 tools/repo-audit.py`
- [ ] Mobile and desktop smoke test
- [ ] WhatsApp / booking flow end-to-end
- [ ] Admin login and basic CRUD flows

## Go-live
- [ ] DNS and SSL verified
- [ ] robots/sitemap OK
- [ ] Analytics tags installed
- [ ] Training with client scheduled
