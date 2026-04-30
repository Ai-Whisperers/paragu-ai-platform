# ParaguAI Platform

Multi-tenant website generation platform for Paraguayan businesses.
Each client gets a standalone Next.js app, Docker service, and subdomain.

## Packages

| Package | GitHub Packages | Description |
|---------|----------------|-------------|
| `@ai-whisperers/ui` | [View](https://github.com/Ai-Whisperers/paragu-ai-platform/pkgs/npm/ui) | Button, Card, Dialog, Input, Label, Popover |
| `@ai-whisperers/sections` | [View](https://github.com/Ai-Whisperers/paragu-ai-platform/pkgs/npm/sections) | Header, Footer, WhatsAppFloat, Hero, ServicesSection |
| `@ai-whisperers/engine` | [View](https://github.com/Ai-Whisperers/paragu-ai-platform/pkgs/npm/engine) | Content resolution and composition utilities |

## Live Clients

| Client | URL | Status |
|--------|-----|--------|
| Dayah LitWorks | dayah.paragu-ai.com | ✅ Book cover design studio |
| El Viajero | el-viajero.paragu-ai.com | ✅ Outdoor/camping store |
| Nexa Paraguay | nexa-paraguay.paragu-ai.com | ✅ Relocation & investment |
| Fun4Me | fun4me.paragu-ai.com | ⚡ Erotic products (landing page) |
| Alejandro Villamayor | alejandro-villamayor.paragu-ai.com | ⚡ Lawyer (landing page) |

## Quick Start

```bash
# Install packages
npm install @ai-whisperers/ui @ai-whisperers/sections

# Use in your Next.js app
import { Header } from "@ai-whisperers/sections"
import { Button } from "@ai-whisperers/ui"
```

## Structure

```
paragu-ai-platform/
├── packages/
│   ├── ui/          # UI primitives (shadcn-based)
│   ├── sections/    # Reusable sections (header, footer, hero, etc.)
│   └── engine/      # Content composition utilities
└── apps/
    ├── admin/       # vercel/platforms-based admin
    └── client-template/  # Scaffolding CLI
```
