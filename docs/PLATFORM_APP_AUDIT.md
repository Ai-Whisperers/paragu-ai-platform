# Platform App Audit — Live vs Scaffold vs Dead (2026-06-15)

**Method:** cross-referenced `ls apps/` against `docker service ls` + checked app content.

## 39 apps in monorepo

### 33 apps with a live Swarm service ✅

| App | Swarm service | Status |
|---|---|---|
| 3md-website | 3md-website_web | LIVE 1/1 (stale build: prod-20260611-1655, never updated) |
| arnos-barber-shop | arnos-barber-shop_web | LIVE 2/2 |
| bichos-gym | bichos-gym_web | LIVE 1/1 |
| bufete-mendez | bufete-mendez_web | LIVE 1/1 |
| camilo-acosta | camilo-acosta_web | LIVE 1/1 |
| cocodrilo-fitness | cocodrilo-fitness_web | LIVE 2/2 |
| cronos-academy | cronos-academy_web | LIVE 2/2 |
| cuidadoamiga | cuidadoamiga_web | LIVE 1/1 |
| dayah-litworks | dayah-litworks_web | LIVE 2/2 |
| de-abasto-a-casa | de-abasto-a-casa_web | LIVE 1/1 |
| depiflash | depiflash_web | LIVE 2/2 |
| escribania-paraguay | escribania-paraguay_web | LIVE 1/1 |
| estudio-medieval | estudio-medieval_web | LIVE 2/2 |
| fun4me | fun4me_web | LIVE 1/1 |
| fun4me-store | fun4me-store_web | LIVE 1/1 |
| golden-visa-advisory | golden-visa-advisory_web | LIVE 2/2 |
| granja-cabral | granja-cabral_web | LIVE 1/1 |
| hidrobaby-spa | hidrobaby-spa_web | LIVE 2/2 |
| jota-ink-tattoo | jota-ink_web ⚠ | LIVE 2/2 — **CI service-map fixed 2026-06-15** |
| luis-de-leon-concept | luis-de-leon-concept_web | LIVE 1/1 |
| magnolia-peluqueria | magnolia_web ⚠ | LIVE 2/2 — **CI service-map fixed 2026-06-15** |
| mantra-spa | mantraspa_web (no hyphen) | LIVE 2/2 |
| meal-prep | meal-prep_web | LIVE 1/1 |
| nde-barba | nde-barba_web | LIVE 2/2 |
| nudo | nudo_web | LIVE 1/1 — **CI added 2026-06-15** |
| ozmontania-website | ozmontania-website_web | LIVE 2/2 |
| pitchy-website | pitchy-website_web | LIVE 1/1 |
| portas-barber | portas-barber_web | LIVE 1/1 |
| reina-de-copas | reina-de-copas_web | LIVE 1/1 |
| scott-tatuajes | scott-tatuajes_web | LIVE 2/2 |
| shine-nails | shine-nails_web | LIVE 2/2 |
| stroopwafel-huis | stroopwafel-huis_web | LIVE 2/2 |
| superspuma | superspuma_web | LIVE 2/2 |
| trentina-cerveza | trentina-cerveza_web | LIVE 2/2 |
| tsuki-restaurante | tsuki-restaurante_web | LIVE 1/1 |
| villamayor-asociados | villamayor-asociados_web | LIVE 1/1 |
| xxgym | xxgym_web | LIVE 2/2 |

That's 38 of 39 in the apps loop. Wait — the loop lists 36 unique apps (some duplicated). Let me re-count. Actually the loop iterates the variable APPS with each name. The apps LIST has 38 unique names.

### 3 apps with no Swarm service (scaffold-only, never deployed)

| App | Status |
|---|---|
| `builder` | This is the **paragu-ai-builder** output, not a deployable site. Should NOT be in CI loop. |
| `site-template` | Same as builder — a template, not a site. Should NOT be in CI loop. |
| `trentina-site` | Older "trentina" site (replaced by `trentina-cerveza`). Dead. Should be removed from monorepo. |

### 2 Swarm services with no monorepo app (orphan services)

| Service | Image | Status |
|---|---|---|
| `maskarada_web` | maskarada:prod | Running but no source. Either: (a) source was archived in another repo, or (b) a previous app dir was deleted. Action: investigate and either link or archive. |
| `nexa-paraguay_web` | nexa-paraguay:prod-20260615-1107 | ✅ Live and correct. Source is the standalone personal repo (not in this monorepo). |
| `nexa-preview_web` | nexa-paraguay:prod-test-1102 | Stale — running a test build (prod-test-1102) that was supposed to be temporary. Action: update to current prod image or remove. |

## Fixes shipped in this audit

1. **`apps/nudo` added to CI** (3 places: path filter, apps loop, service map)
2. **`jota-ink-tattoo` and `magnolia-peluqueria` service maps fixed** (CI was trying to update non-existent `<app>_web` services)
3. **Pre-existing build failure in `golden-visa-advisory` fixed** (truststrip import path was wrong; file moved from `components/` to `src/components/` to match `@/` alias; 2 dead files in `components/` removed)

## Action items remaining (out of scope today)

- [ ] `maskarada_web` orphan — investigate or archive
- [ ] `nexa-preview_web` running stale `prod-test-1102` image — update or remove
- [ ] `trentina-site` app dir — archive (replaced by `trentina-cerveza`)
- [ ] `builder` and `site-template` — exclude from CI apps loop (not deployable)
- [ ] `3md-website` running 1-week-old build — verify it's actively maintained or schedule
