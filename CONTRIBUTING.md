# Contributing to ParaguAI Platform

## Setup

```bash
git clone https://github.com/Ai-Whisperers/paragu-ai-platform.git
cd paragu-ai-platform
npm install --legacy-peer-deps

# Build all packages
cd packages/ui && npx tsup && cd ../sections && npx tsup && cd ../engine && npx tsup
```

## Package Structure

| Package | Build | Published To |
|---------|-------|-------------|
| `packages/ui` | `npx tsup` | GitHub Packages `@ai-whisperers/ui` |
| `packages/sections` | `npx tsup` | GitHub Packages `@ai-whisperers/sections` |
| `packages/engine` | `npx tsup` | GitHub Packages `@ai-whisperers/engine` |

## Publishing

```bash
npm config set @ai-whisperers:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken $GH_TOKEN

# For each package:
npm publish
```

## Coding Standards

- TypeScript with strict mode (except where overridden for legacy)
- React components use named exports, not default exports
- Props follow `ComponentNameProps` naming convention
- CSS uses Tailwind v4 `@theme` for design tokens
- Colors use CSS custom properties, never hardcoded

## Adding a New Package

1. Create `packages/<name>/` with `package.json`, `tsconfig.json`, `tsup.config.ts`
2. Add `@ai-whisperers/<name>` to the workspace in root `package.json` (if using monorepo)
3. Add export to README
4. Publish with `npm publish`

## PR Process

1. Create feature branch
2. Build: `npm run build`
3. Open PR with description of changes
4. CI runs lint + build checks
5. Merge to main
