---
name: meta-stack
description: "Connect Hermes Agent to Facebook Pages, Instagram Business, Messenger/IG DMs, and Meta Ads via the 3-vendor stack (Composio + Pipeboard + Postiz). Class-level umbrella that consolidates orchestration, operator runbook, client-facing handbook, and validation. Activate when an operator or client asks how to connect Hermes to Meta, when onboarding a PYME, or when something in the social-media stack is failing."
version: 1.0.0
author: Ai-Whisperers
metadata:
  hermes:
    tags: [meta, facebook, instagram, ads, social-media, mcp, pyme, paraguay]
    category: social-media
    requires:
      env:
        - MCP_COMPOSIO_API_KEY
        - PIPEBOARD_API_TOKEN
        - POSTIZ_API_KEY
      mcp_servers:
        - composio
        - pipeboard
        - postiz
    related_skills:
      - meta-connector
      - meta-onboarding-guide
      - meta-client-handbook
    related_scripts:
      - ~/.hermes/scripts/validate-meta-stack.sh
      - ~/.hermes/scripts/scrub-dead-meta-mcp.sh
    references:
      - connector.md     # orchestration: which MCP for which intent
      - runbook.md       # operator onboarding: Meta prerequisites + vendor activation
      - client-handbook.md  # client-facing Spanish guide + filled template
    templates:
      - credentials.md   # fillable credentials form for new clients
---

# Meta Stack — Connecting Hermes Agent to Facebook, Instagram & Ads

**Class:** social media integration (Meta ecosystem)
**Vendors:** Composio (organic + DMs), Pipeboard (Ads), Postiz (cross-platform CLI)
**Audience:** Ai-Whisperers operator (technical) **and** Paraguayan PYME client (non-technical)

This umbrella owns the full surface area of "Hermes posting to Meta." Three sibling references cover each angle; one template covers credential capture; two scripts cover health and dead-config cleanup.

## Why this umbrella exists (one-liner per signal)

This umbrella was built after one session in which:
1. A broken MCP entry (`@horizondatawave/meta-mcp`) was found 404'd on npm — hence `scrub-dead-meta-mcp.sh`.
2. `hermes mcp add --auth header` produced a wrong default header (`Authorization: Bearer` instead of `x-consumer-api-key` for Composio) and silently dropped the header block when run with empty stdin — hence the connector doc's "fix the headers manually" pitfall.
3. The operator (Ivan) asked for "all the functions and abilities" upfront instead of waiting for each client — hence the 3-vendor layered stack (organic + ads + cross-platform) instead of one.

## The 3-vendor mental model (which vendor for which intent)

```
                  Intent → Vendor
                  ────────────────────────────
                  FB Page post        → composio
                  IG post / carousel  → composio
                  Reply comments      → composio
                  Messenger / IG DMs  → composio
                  Insights (organic)  → composio
                  Hashtag / mentions  → composio

                  Meta Ads            → pipeboard
                  Ads insights        → pipeboard

                  Cross-platform post → postiz
                  (X, LinkedIn, etc.)
                  Schedule once       → postiz
                  Multi-tenant        → postiz
```

Read `references/connector.md` for the routing table and the trigger-pattern → MCP map that tells the agent which tool to call without asking.

## Read order (for new operators / new sessions)

1. **`references/connector.md`** — internal routing logic, ~5 min. After this you know which MCP to call for any intent.
2. **`references/runbook.md`** — Meta Business prerequisites + vendor activation. This is what you (operator) do for yourself and for clients.
3. **`references/client-handbook.md`** — Spanish guide to send to clients. They follow it themselves; you validate their answers.
4. **`templates/credentials.md`** — fillable form. Copy to `~/.hermes/clients/<slug>/meta-credentials.md` per client.

## Hard rules (from session experience)

- ❌ **Never use `@horizondatawave/meta-mcp`** — npm 404. Use Composio / Pipeboard / Postiz instead. `scrub-dead-meta-mcp.sh` makes this safe to apply repeatedly.
- ⚠️ **`hermes mcp add --auth header` writes `Authorization: Bearer` by default.** Composio needs `x-consumer-api-key`. After adding via the wizard, grep config and add the correct header manually. Same gotcha for any vendor with a non-standard auth header.
- ⚠️ **Empty stdin to `hermes mcp add` → entry saved with NO headers block** even if you answered "yes" to "does it require auth". Don't trust the wizard — verify with `hermes mcp list` and inspect config.
- ⚠️ **Meta Business Verification takes 3–7 business days** in Paraguay. Don't promise faster. If the client needs RUC, it's not faster.
- ⚠️ **Instagram Personal accounts cannot use Graph API** (Basic Display API died Dec 2024). Client MUST convert to Business or Creator first.
- ⚠️ **Postiz media uploads MUST go through `postiz upload`** before `posts:create`. Raw paths and external URLs are silently rejected by IG/TT/YT.
- ⚠️ **IG publishing cap = 25 posts / 24h via API.** Check `INSTAGRAM_GET_IG_USER_CONTENT_PUBLISHING_LIMIT` before scheduling bursts.
- ⚠️ **Messenger 24h window**: DMs only respondable within 24h of user's last message. After that, need pre-approved message tag.

## Verify

```bash
~/.hermes/scripts/validate-meta-stack.sh           # human-readable
~/.hermes/scripts/validate-meta-stack.sh --json    # CI / monitoring
# exit 0 = all green; exit 1 = at least one vendor failing
```

If dead MCP config reappears:
```bash
~/.hermes/scripts/scrub-dead-meta-mcp.sh            # idempotent
```

## When something is broken

| Symptom | First move |
|---|---|
| 401 from any vendor | `validate-meta-stack.sh` → regenerate the token from that vendor's dashboard |
| `INVALID` token claim | Token revoked by Meta, or scope missing → reissue System User Token with all scopes from `references/runbook.md §2.6` |
| "Container expired" | Re-create container + publish immediately (IG containers live <24h) |
| "Publishing limit reached" | 25/day cap → wait or reduce frequency |
| `validate-meta-stack.sh` reports DISABLED | The env var is empty in `~/.hermes/.env` — edit, `chmod 600`, retest |
| Composio HTTP 410 | Wrong API key (Composio returns 410 not 401 on bad keys) |
| Postiz "Invalid media URL" | You passed raw path; upload via `postiz upload` first |

## Files in this umbrella

```
~/.hermes/skills/social-media/meta-stack/
├── SKILL.md                   # this file (umbrella entry point)
├── references/
│   ├── connector.md           # intent → MCP routing
│   ├── runbook.md             # operator onboarding (was meta-onboarding-guide)
│   └── client-handbook.md     # Spanish client guide (was meta-client-handbook)
└── templates/
    └── credentials.md         # fillable credentials form
```

## Consolidation note

This umbrella supersedes three sibling skills created in the same session:
- `meta-connector` → content moved to `references/connector.md`
- `meta-onboarding-guide` → content moved to `references/runbook.md`
- `meta-client-handbook` → content moved to `references/client-handbook.md`

The three siblings are still on disk for backward compatibility but should be archived by the curator. Use this umbrella as the single entry point.

---

**Version:** 1.0.0 · **Created:** 2026-07-13 (Meta stack implementation session)