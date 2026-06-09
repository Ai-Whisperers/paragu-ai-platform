# Archived upstream repos (folded into paragu-ai-platform)

| Repo | Archived | Reason | New home |
|------|----------|--------|----------|
| `Ai-Whisperers/paragu-ai-builder` | 2026-06-08 | Fully migrated to `apps/builder/` (HEAD `4a82351b` matches Main branch tip) | `apps/builder/` |
| `Ai-Whisperers/paragu-ai-client-kit` | 2026-05-25 | Deprecated, replaced by `@ai-whisperers/client-kit` workspace pkg | `packages/@ai-whisperers/client-kit/` |

## Migration notes

- **paragu-ai-builder** → `apps/builder/`. Local git remote was removed; HEAD verified equivalent.
- **paragu-ai-client-kit** → `packages/@ai-whisperers/client-kit/`. Consumed via `workspace:*` protocol.

## Rollback

If a new home is broken and we need the archived repo back:

```bash
gh repo unarchive Ai-Whisperers/paragu-ai-builder
git remote add builder https://github.com/Ai-Whisperers/paragu-ai-builder.git
git fetch builder
```
