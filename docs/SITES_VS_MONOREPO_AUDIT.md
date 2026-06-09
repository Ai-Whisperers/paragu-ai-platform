# /opt/sites vs monorepo apps/ — audit (2026-06-08)

Cross-reference of every directory in `/opt/sites/` against `apps/` in the monorepo.

## Decision table

| /opt/sites/ | In monorepo? | Last modified | Decision |
|---|---|---|---|
| Estudio-Medieval | yes → apps/estudio-medieval | 2026-06-08 | 🟢 Safe to retire — monorepo serves via Swarm |
| NDE-Barba | yes → apps/nde-barba | 2026-06-08 | 🟢 Safe to retire |
| Shine-Nails | yes → apps/shine-nails | 2026-06-08 | 🟢 Safe to retire |
| granja-cabral | yes → apps/granja-cabral | 2026-05-29 | 🟢 Safe to retire |
| nde-barba | yes (lowercase dup) → apps/nde-barba | 2026-05-29 | 🟢 Safe to retire (duplicate of NDE-Barba) |
| portas-barber | yes → apps/portas-barber | 2026-05-29 | 🟢 Safe to retire |
| shine-nails | yes (lowercase dup) → apps/shine-nails | 2026-05-29 | 🟢 Safe to retire (duplicate of Shine-Nails) |
| villamayor-asociados | yes → apps/villamayor-asociados | 2026-05-29 | 🟢 Safe to retire |
| xxgym | yes → apps/xxgym | 2026-05-29 | 🟢 Safe to retire |
| Arnos-Barber-Shop | **NO** | 2026-06-08 | 🟡 REVIEW — recently modified, possibly in flight; check with Kiki/Ivan |
| Avani-Belleza | no | 2026-05-29 | 🔵 External (Netlify/manual host) — leave alone |
| Barbye-Nails | no | 2026-05-29 | 🔵 External — leave alone |
| Clau-Bellino | no | 2026-05-29 | 🔵 External — leave alone |
| Cronos-Academy | no | 2026-06-08 | 🔵 External — leave alone |
| HidroBaby-Spa | no | 2026-06-08 | 🔵 External (Netlify) — leave alone (separate deploy path) |
| Lele-Ferreira | no | 2026-05-29 | 🔵 External — leave alone |
| Leticia-Carballo | no | 2026-05-29 | 🔵 External — leave alone |
| Nutrifit-Spa | no | 2026-05-29 | 🔵 External — leave alone |
| Peluqueria-Barbershop | no | 2026-05-29 | 🔵 External — leave alone |
| Scott-Tatuajes | no | 2026-06-08 | 🔵 External — leave alone |
| Viviesteticpy | no | 2026-05-29 | 🔵 External — leave alone |
| Woman-Cosmeticos | no | 2026-05-29 | 🔵 External — leave alone |
| estudio-contable | no | 2026-05-29 | 🔵 External — leave alone |
| golden-visa | no | 2026-05-29 | 🔵 External — leave alone |
| maskarada | no | 2026-05-29 | 🔵 External — leave alone |
| nudo | no | 2026-05-29 | 🔵 External — leave alone |
| ozz | no | 2026-06-08 | 🔵 External — leave alone |
| polki-squad | no | 2026-06-08 | 🔵 External — leave alone |
| stroopwafel-huis | no | 2026-05-29 | 🔵 External — leave alone |
| treinta-cerveza | no | 2026-06-08 | 🔵 External — leave alone |

## Summary

- **9 directories safe to retire** (duplicates of monorepo apps)
- **1 needs review** (Arnos-Barber-Shop — recently modified, could be active work)
- **20 external/Netlify** (do not touch — different deploy path)

## Action (manual, not done by automation)

For each of the 9 safe-to-retire sites, the action is:

```bash
# 1. Verify the Swarm service is healthy first
docker service ps <client>_web --format '{{.Name}} {{.Replicas}}'

# 2. Confirm external DNS resolves to the new path
curl -sI https://<client>.paragu-ai.com/ | head -2

# 3. Backup the local checkout
mv /opt/sites/<client> /opt/sites-archive/<client>-$(date +%F)

# 4. (Optional) Update Traefik dynamic config to remove the old path
```

**Do NOT bulk-rm.** Each site is owned by an active client. Confirm with Kiki/Ivan before retirement.

## Rollback

If a client complains about missing custom code:

```bash
mv /opt/sites-archive/<client>-<date> /opt/sites/<client>
# Then debug why Swarm version diverged
```
