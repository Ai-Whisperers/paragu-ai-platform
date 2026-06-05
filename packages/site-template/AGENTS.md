<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Architecture

- **Next.js 16** with App Router, standalone output, Docker deployment
- **Tailwind v4** — `@theme` directive in `app/globals.css`, NO tailwind.config.ts
- **Content-driven** — all site data comes from `content/` JSON files
- **@ai-whisperers/\*** monorepo packages — shared UI, auth, commerce, etc.

## Content System

| File | Purpose |
|------|---------|
| `content/site.json` | Branding, theme colors, fonts, features, navigation, business info |
| `content/content.json` | Page content: hero, services, testimonials, team, gallery, promotions, blog, FAQs |
| `content/tokens.json` | Design tokens: palettes, typography (used by @ai-whisperers/theme) |
| `content/es.json` | Spanish UI strings |
| `content/en.json` | English UI strings |

## Feature Flags

Controlled in `content/site.json` → `features` object. Components check these flags to show/hide sections.

## Key Files

- `lib/config.ts` — Exports `siteConfig`, `business`, `getContent()`, etc.
- `lib/data-store.ts` — Universal data layer: Supabase first, JSON fallback
- `lib/client-auth.ts` — WhatsApp OTP session management (HMAC tokens)
- `proxy.ts` — Admin + client auth protection (Next.js 16 convention, formerly middleware.ts)
- `supabase/migrations/` — Database schema

## Conventions

- All amounts in **PYG (Guaraníes)**, integer, no decimals
- All UI labels in **Spanish** by default (Paraguay context)
- Root `app/layout.tsx` owns `<html>/<body>` — nested layouts are plain wrappers
- Client identity = **phone number** (no email/password for clients)
- Gift card access via UUID token in URL (`/c/[token]`)
