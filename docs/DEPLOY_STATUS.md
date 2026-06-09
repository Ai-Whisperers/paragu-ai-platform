# Deployment status — paragu-ai-platform

Known-good builds on `main`:
- apps with `.next/standalone` present:
  - `3md-website`
  - `bichos-gym`
  - `escribania-paraguay`
  - `bufete-mendez`
  - `meal-prep`
  - `reina-de-copas`
  - `de-abasto-a-casa` — blocked (alias `@/components/*` not resolving)

Build pipeline blockers:
- `de-abasto-a-casa` fails on `@/components/{CookieConsent,JsonLd}`
- Dockerfiles that rebuild inside image fail on `npm ci` lock/peer deps

Swarm live services (selected):
- `3md_web` 3md-website:prod 2/2 ✓
- `bichos-gym_web` bichos-gym:prod 0/2 ⚠ (build artifact stale)
- `meal-prep` `prep_web` meal-prep:latest 1/1 ✓
- `reina-de-copas_web` reina-de-copas:latest 1/1 ✓
- legacy client services mostly up

Next actions:
1. Promote 4 ready apps via local `.next` packaging
2. Revisit `de-abasto-a-casa` explicitly in a later pass
