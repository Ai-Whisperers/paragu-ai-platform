# Superseded scripts

These one-off scripts are **no longer maintained**. The functionality they
provided is now part of the live locale-parity pipeline:

| Archived script | Replaced by |
|---|---|
| `compare-locale-keys.py` (Aug 2026) | `scripts/check-locale-parity.mjs` + `__tests__/locale-parity.test.ts` |
| `fill-locale-keys.py` (Aug 2026) | `scripts/fill-locales.mjs` |

The new pipeline runs on every `pnpm test`, `pnpm build`, and pre-commit.
It uses the same key-walking logic but is a single source of truth shared
between the vitest test, the CLI, and the autofill helper — so they can
never disagree.

Kept here for archaeology only. **Do not run them in production** — they
will overwrite the `_meta` block, lack the placeholder-as-todo-list
feature, and don't catch empty strings.
