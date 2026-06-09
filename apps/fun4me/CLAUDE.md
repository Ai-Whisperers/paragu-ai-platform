# Fun4Me Store — AI Agent Guide

## Quick Links
- **Live:** https://fun4me.paragu-ai.com
- **Repo:** github.com/Ai-Whisperers/paragu-ai-platform/tree/main/apps/fun4me
- **Docker service:** fun4me_web (Swarm, 2 replicas)
- **Traefik:** Host(`fun4me.paragu-ai.com`)
- **Supabase:** jrekgsnflnugqpsyhnxh.supabase.co

## Architecture
Cloudflare (DNS, SSL) → VPS → Traefik → fun4me_web:3000

## Pages (27 routes)
Home, Categorías/[slug], Producto/[slug], Carrito, Checkout, Confirmación, Buscar, Cuenta, Eventos, Kink/[slug], Ofertas, Envíos, Devoluciones, Privacidad, FAQ, Blog (listing + [slug] + category), Nosotros, Términos, Verificar-edad, Login, Registro, Recuperar contraseña, Admin (dashboard + CRUD: productos, categorías, pedidos, cupones, kinks, anuncios, eventos, lista-negra, verificaciones)

## Design System
Purple (#7C3AED) + magenta (#EC4899) on dark (#0F0F1A). Dark/light mode toggle. Fonts: Inter.

## Content
Products, categories, FAQ, blog, promos, testimonials live in Supabase (54 products seeded across 8 categories). Fallback content in `content/es.json` and `content/tokens.json`.

## Key Features
- Auth: Supabase Auth (email/password), middleware guards `/admin`
- Cart: Zustand (persisted), coupons, shipping zones (Asunción/Gran Asunción/Interior)
- Checkout: Full form + payment receipt upload + WhatsApp confirmation
- Admin: Full CRUD, CI verification queue, blacklist management, event management
- Events: Ticketing with QR codes, capacity management, CI validation at entry
- Privacy: Age gate, quick exit button, guest mode, privacy mode toggle, cookie consent, discreet packaging badges
- Blog: 6 posts with categories, SEO JSON-LD
- SEO: Full JSON-LD (Store, Article, FAQ, Breadcrumb), RSS, sitemap, security headers, redirects
- 45 UX components in `src/components/vendor/`: hero carousel, bottom nav, dark mode, scroll animations, product quiz, social proof, recently viewed, wishlist, exit intent, promo carousel, shipping calculator, and more

## Components
- `src/components/store/` — core store components (header, footer, product-card, etc.)
- `src/components/vendor/` — 45 UX components from live site
- `src/components/ui/` — 16 shadcn/ui primitives
- `src/components/admin/` — admin panel components

## Build & Deploy
```bash
pnpm install --frozen-lockfile
NEXT_PUBLIC_SUPABASE_URL=xxx NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx pnpm build
docker build --build-arg NEXT_PUBLIC_SUPABASE_URL=xxx --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx -t fun4me:prod .
docker stack deploy -c docker-compose.yml fun4me --detach=false
```

## Supabase
- Auth enabled (email/password), session cookies via @supabase/ssr
- Tables: products, categories, kink_categories, orders, order_items, customers, customer_addresses, ci_documents, events, ticket_types, tickets, blacklist, blacklist_attempts, newsletter_subscribers, shipping_zones, coupons, site_settings, product_kinks
- Storage: `ci-documents` bucket (private, RLS-protected)
- RLS: Public read on active products/categories/events, user-only on own data, service_role for admin

## Critical Patterns
- All prices in Guaraníes (PYG), stored as bigint (no decimals)
- WhatsApp ordering via prefilled templates (generateOrderWhatsAppLink)
- Discreet shipping guarantee
- Age-gated content (localStorage, 18+)
- CI number verification for high-value items and events
- Blacklist check via RPC before completing orders
