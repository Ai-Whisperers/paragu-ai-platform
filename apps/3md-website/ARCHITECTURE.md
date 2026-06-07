# 3MD Website — Technical Architecture

## Directory Structure

```
/root/3md-website/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, JSON-LD)
│   ├── globals.css             # @theme design system
│   ├── page.tsx                # Home (showreel hero + portfolio + clients)
│   ├── not-found.tsx           # Custom 404
│   ├── error.tsx               # Error boundary
│   ├── loading.tsx             # Global loading state
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # sitemap.xml
│   ├── [locale]/               # i18n routes (optional — or use /en/)
│   │   └── layout.tsx
│   ├── portfolio/
│   │   ├── page.tsx            # Filterable grid
│   │   └── [slug]/
│   │       └── page.tsx        # Individual case study
│   ├── servicios/
│   │   └── page.tsx
│   ├── nosotros/
│   │   └── page.tsx
│   ├── clientes/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contacto/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── privacidad/
│   │   └── page.tsx
│   ├── terminos/
│   │   └── page.tsx
│   └── api/
│       └── subscribe/
│           └── route.ts
├── components/
│   ├── header.tsx              # Sticky nav, transparent->solid on scroll
│   ├── footer.tsx              # 4-column dark footer
│   ├── hero.tsx                # Full-screen showreel hero
│   ├── portfolio-grid.tsx      # Filterable masonry grid
│   ├── portfolio-card.tsx      # Individual project card
│   ├── client-bar.tsx          # Scrolling client logo track
│   ├── stats-counter.tsx       # Animated number counters
│   ├── service-card.tsx        # Service offering card
│   ├── team-section.tsx        # Team grid
│   ├── contact-form.tsx        # Form + WhatsApp
│   ├── testimonial-card.tsx    # Client testimonial
│   ├── cta-banner.tsx          # CTA section
│   ├── cookie-consent.tsx      # GDPR banner
│   ├── whatsapp-float.tsx      # Floating WhatsApp button
│   ├── back-to-top.tsx         # Scroll-to-top button
│   ├── project-gallery.tsx     # Image gallery with lightbox
│   ├── video-embed.tsx         # YouTube/Vimeo embed
│   ├── language-toggle.tsx     # ES/EN switch
│   ├── loading-bar.tsx         # Top loading bar
│   ├── empty-state.tsx         # No results state
│   └── skeleton.tsx            # Loading skeleton
├── content/
│   ├── site.json               # Site-wide config
│   ├── es.json                 # Spanish copy
│   └── en.json                 # English copy
├── lib/
│   ├── utils/
│   │   ├── cn.ts               # clsx + tailwind-merge
│   │   ├── wa.ts               # WhatsApp URL builder
│   │   └── format.ts           # Formatting helpers
│   └── hooks/
│       ├── use-scroll-position.ts
│       ├── use-media-query.ts
│       └── use-local-storage.ts
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── logo-white.svg
│   │   ├── og-default.jpg
│   │   ├── clients/            # Client logos
│   │   └── team/               # Team photos
│   └── favicon.ico
├── content/
│   └── portfolio/              # JSON files for each project
│       ├── amarok-2025.json
│       ├── carmen-steffens.json
│       ├── lez-a-lez.json
│       └── ...
├── Dockerfile
├── docker-compose.yml
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── package.json
└── tsconfig.json
```

## Data Flow

```
content/portfolio/*.json
    ├── title, client, category, year
    ├── heroImage, gallery[]
    ├── description (ES + EN)
    ├── approach (ES + EN)
    └── results (ES + EN)
          │
          ▼
app/portfolio/[slug]/page.tsx
    ├── generateStaticParams() → reads all JSON files
    ├── generateMetadata() → SEO per project
    └── Page component → renders ProjectPage layout
          │
          ▼
components/project-gallery.tsx
    ├── Lightbox with keyboard nav
    ├── Image lazy loading
    └── Responsive grid
```

## State Management

- No Redux/Zustand needed — site is mostly static
- Portfolio filter state: URL search params (`?category=video`)
- Language toggle: localStorage + cookie
- Dark mode: prefers-color-scheme + manual toggle (optional for dark agency theme)
- Contact form: local state with fetch POST

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.0s |
| FID | < 100ms |
| CLS | < 0.05 |
| Lighthouse | 90+ all categories |
| Bundle size | < 200KB JS |

## Key Technical Decisions

1. **Static Generation (SSG)** for all portfolio pages — content from JSON files
2. **next/font** for zero-CLS font loading
3. **next/image** with WebP conversion for all portfolio images
4. **Tailwind v4 @theme** for design tokens
5. **Schema.org JSON-LD** in root layout for organization data
