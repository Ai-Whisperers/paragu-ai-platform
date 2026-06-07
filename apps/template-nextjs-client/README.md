# Client Site Template — Next.js 15 + Tailwind CSS 4

Template for AI Whisperers client websites. Built with Next.js 15, React 19, Tailwind CSS 4, and shared `@ai-whisperers/*` packages.

## Quick Start

```bash
# 1. Clone this template
git clone <your-repo-url> my-client-site
cd my-client-site

# 2. Install dependencies
npm install

# 3. Edit client content
vim content/es.json  # products, prices, FAQ, blog, etc.

# 4. Customize theme
vim app/globals.css  # change --color-* variables

# 5. Set your WhatsApp number
# Edit WA_PHONE in the components that use it (search for "595981234567")

# 6. Build
npm run build

# 7. Deploy
docker build -t my-client:prod .
docker stack deploy -c docker-compose.yml my-client
```

## Pages (15)
- `/` — Home (hero, stats, products, categories, features, testimonials, newsletter, CTA)
- `/tienda` — Store with search, filters, sort, grid/list, pagination
- `/producto/[slug]` — Product detail with specs, FAQ, reviews, shipping calculator
- `/blog` — Blog index with category filters
- `/blog/[slug]` — Blog post with full content
- `/blog/categoria/[category]` — Blog category page
- `/contacto` — WhatsApp-first contact with quick topics
- `/faq` — FAQ accordion
- `/nosotros` — About page
- `/promociones` — Promotions
- `/envio` — Shipping info
- `/privacidad` — Privacy policy
- `/terminos` — Terms & conditions
- `/robots.txt`, `/sitemap.xml` — SEO
- `/rss.xml` — Blog RSS feed

## Stack
- Next.js 15 (standalone output)
- React 19
- Tailwind CSS 4
- `@ai-whisperers/ui` — Shared UI components
- `@ai-whisperers/content` — Hooks & utilities
- `@ai-whisperers/seo` — Structured data & analytics
- `@ai-whisperers/whatsapp` — WhatsApp integrations
- `@ai-whisperers/theme` — Theme tokens

## Features (80+)
- WhatsApp-first ordering with prefilled messages
- Age gate (for adult stores)
- Quick exit button (ESC key)
- Privacy mode (blur images)
- Dark/light mode toggle
- Search with autocomplete
- Product filtering: category, price, level, new/featured
- Sort: price, name, rating
- Grid/list view toggle
- Pagination
- Wishlist (localStorage)
- Recently viewed
- Product comparison
- Product quiz → WhatsApp recommendation
- Anonymous reviews
- Safety badges (body safe, waterproof, rechargeable)
- Level badges (beginner, intermediate, advanced)
- Sound level indicator
- Shipping calculator
- Price anchoring
- Social proof popup
- Exit intent popup
- Newsletter subscription
- Cookie consent (GDPR)
- Promo carousel
- Hero carousel
- PWA (manifest + service worker)
- GA4 + Meta Pixel (via env vars)
- JSON-LD structured data (Store, FAQ, Article, Breadcrumb)
- RSS feed
- Accessibility (skip-to-content link)
- Dynamic page titles

## Deploy
The Dockerfile outputs a standalone Next.js build (~100MB image).
Traefik + agent-net required on the VPS.

## Client Migration Checklist
- [ ] Update `content/es.json` with client products, pricing, content
- [ ] Change colors in `app/globals.css`
- [ ] Set WhatsApp number in all components (search: 595981234567)
- [ ] Update logo/favicon in `public/`
- [ ] Update OpenGraph images
- [ ] Set domains in `docker-compose.yml`
- [ ] Add VPS secrets to GitHub repo
- [ ] Remove age gate if not an adult store
- [ ] Test build: `npm run build`
- [ ] Deploy: `docker build -t client:prod . && docker stack deploy -c docker-compose.yml client`
