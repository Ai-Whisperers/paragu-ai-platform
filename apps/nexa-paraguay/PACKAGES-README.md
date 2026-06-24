# `.packages/`

Local tarball packages that this app installs via `file:` references in
`package.json`. They are needed because some `@ai-whisperers/*` packages
ship via npm.pkg.github.com (the `^X.Y.Z` entries) while others are kept
as local tarballs for fast iteration or unpublished previews.

## Current contents

| File | Source | Used by |
|---|---|---|
| `ai-whisperers-i18n-0.2.0.tgz` | Local pre-publish of the i18n package (kept local for fast iteration) | `@ai-whisperers/i18n` in `package.json` |
| `ai-whisperers-sections-0.1.0.tgz` | Local pre-publish of the sections package | `@ai-whisperers/sections` in `package.json` |

## Unused / historical

See `_unused/` for tarballs that are no longer referenced by `package.json`.
They are kept temporarily for archaeology (in case we need to compare what
changed between an old `.tgz` and the published version). Review and delete
after one quarter.

## How to add a new local tarball

1. Drop the `.tgz` in this folder.
2. Reference it in `package.json`:
   ```json
   "@ai-whisperers/<name>": "file:.packages/ai-whisperers-<name>-<version>.tgz"
   ```
3. Add a row to the table above.
4. Commit.

## How to remove a local tarball (and switch to npm)

1. Confirm the package is published at `npm.pkg.github.com` (check
   https://github.com/orgs/Ai-Whisperers/packages).
2. Move the tarball to `_unused/`.
3. Update `package.json` to `"@ai-whisperers/<name>": "^X.Y.Z"`.
4. `rm package-lock.json && npm install` to regenerate the lock.
5. Commit.
