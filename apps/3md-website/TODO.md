# 3MD Website — Complete Build TODO List

## Total: 250+ items across 11 categories
## Estimated: 60-80 hours

---

## A. FOUNDATION & CONFIG (25 items)

```
P0 — MUST HAVE
──────‐───────
[ ] A-001 Remove template-specific files (carrito, wishlist, recently-viewed, etc.)
[ ] A-002 Update package.json (name, version, description for 3md-website)
[ ] A-003 Set up Dockerfile with healthcheck + non-root user
[ ] A-004 Set up docker-compose.yml with Traefik labels for 3md.paragu-ai.com
[ ] A-005 Add traefik.docker.network=agent-net label
[ ] A-006 Update next.config.ts (remove template redirects, add security headers)
[ ] A-007 Add image caching headers for /images/(.*)
[ ] A-008 Add content/ directory with site.json
[ ] A-009 Add robots.ts with proper sitemap URL
[ ] A-010 Add sitemap.ts with all 15+ pages
[ ] A-011 Add not-found.tsx (custom 404)
[ ] A-012 Add error.tsx (error boundary)
[ ] A-013 Add loading.tsx (global loading)
[ ] A-014 Set up TypeScript strict mode in tsconfig.json
[ ] A-015 Add cn() utility (clsx + tailwind-merge)
[ ] A-016 Add wa() utility for WhatsApp links
[ ] A-017 Set up ESLint with tailwindcss plugin
[ ] A-018 Add .env.example with NEXT_PUBLIC vars
[ ] A-019 Add README.md with setup instructions
[ ] A-020 Initialize git and push to Ai-Whisperers/3md-website
[ ] A-021 Remove template Next.js default SVGs from public/
[ ] A-22 Generate favicon.ico + favicon.svg
[ ] A-23 Add apple-touch-icon.png
[ ] A-24 Add Cloudflare DNS record (3md.paragu-ai.com → VPS IP)
[ ] A-25 Build + deploy initial scaffold
```

## B. DESIGN SYSTEM (20 items)

```
P0 — MUST HAVE
──────‐───────
[ ] B-001 Configure globals.css with @theme tokens:
        --color-primary: #0F0F0F
        --color-secondary: #FF6B35
        --color-accent: #FFFFFF
        --color-surface: #1A1A1A
        --color-surface-light: #2A2A2A
        --color-surface-muted: #333333
        --color-foreground: #F5F5F5
        --color-foreground-light: #9CA3AF
        --color-foreground-muted: #6B7280
        --color-border: #2A2A2A
        --color-background: #0A0A0A
        --color-success: #10B981
        --color-error: #EF4444
        --color-warning: #F59E0B
[ ] B-002 Add font variables in layout.tsx:
        --font-heading: Playfair Display (next/font)
        --font-body: Inter (next/font)
[ ] B-003 Add body defaults (bg-background, text-foreground)
[ ] B-004 Add h1-h6 heading styles (font-heading, font-bold)
[ ] B-005 Add container-page utility class
[ ] B-006 Add smooth scroll on html
[ ] B-007 Add selection color (bg-secondary/20)
[ ] B-008 Add focus-visible ring styles
[ ] B-009 Add scrollbar styling (dark theme)
[ ] B-010 Test contrast ratios (WCAG AA minimum 4.5:1)
[ ] B-011 Add prefers-reduced-motion media query
[ ] B-012 Add print styles
[ ] B-013 Define border-radius scale (DEFAULT: 0.5rem)
[ ] B-014 Define shadow tokens (sm, md, lg, xl)
[ ] B-015 Define animation tokens (fade-in, slide-up)
[ ] B-016 Test dark theme on actual screen
[ ] B-017 Verify all CSS variables work in all components
[ ] B-018 Add Inter font weights (300, 400, 500, 600, 700)
[ ] B-019 Add Playfair Display font weights (400, 500, 600, 700)
[ ] B-020 Document design system in README
```

## C. COMPONENTS (35 items)

```
P0 — CORE COMPONENTS
──────‐──────────────
[ ] C-001 Header
        - Transparent on hero, solid bg-surface on scroll
        - Logo left, nav center, CTA right
        - Nav items: Inicio, Portfolio, Servicios, Nosotros, Contacto
        - Mobile hamburger with slide animation
        - Language toggle (ES/EN)
        - Active page indicator
        - Backdrop-blur-sm on solid state

[ ] C-002 Footer
        - 4 columns: Brand, Enlaces, Servicios, Contacto
        - Social links (Instagram, Facebook, YouTube)
        - Legal pages (Privacidad, Terminos)
        - Copyright with dynamic year
        - Dark background (bg-primary)

[ ] C-003 Hero (full-screen)
        - 100vh height
        - Video background (showreel, muted, loop, playsinline)
        - Gradient overlay (black 60% → transparent)
        - Headline h1 (Playfair Display, 5xl)
        - Subtitle p (Inter, lg, text-foreground-light)
        - Two CTAs: "Ver Portfolio" + "Contactanos"
        - Scroll-down indicator (animated arrow)
        - Reduced motion fallback: static image

[ ] C-004 Portfolio Grid
        - Masonry or 3-column grid
        - Filter bar (Todo, Video, Foto, Marca, Eventos)
        - URL-based filter state (?categoria=video)
        - Animated filter transitions
        - Load more button (or infinite scroll)

[ ] C-005 Portfolio Card
        - Image with hover zoom (scale-105)
        - Category badge (top-left)
        - Title overlay on hover (bottom)
        - Client name
        - Year
        - Link to /portfolio/[slug]

[ ] C-006 Client Bar
        - Horizontal scrolling track (CSS animation)
        - Client logos in grayscale, color on hover
        - Auto-scroll with pause on hover
        - Companies: VW, Carmen Steffens, SIT EVENTOS, Lez a Lez,
          Aurelia Brew Pub, Estacion Los Jardines, Reciclarte

[ ] C-007 Stats Counter
        - Animated count-up on scroll (IntersectionObserver)
        - Format: +50 Proyectos, +20 Clientes, 7+ Anos
        - Duration: 1.5s ease-out

[ ] C-008 Service Card
        - Icon (lucide-react, custom per service)
        - Title h3
        - Description p
        - List of sub-services
        - "Saber mas" link to /servicios

[ ] C-009 CTA Banner
        - Gradient background (secondary to primary)
        - Bold headline
        - Subtitle text
        - WhatsApp CTA button
        - Optional secondary CTA

[ ] C-010 WhatsApp Float
        - Fixed bottom-right
        - Green background (#25d366)
        - Pulsing animation
        - Tooltip on hover
        - Message with business context

[ ] C-011 Back to Top
        - Appears after 300px scroll
        - Smooth scroll to top
        - Secondary color

P1 — SECONDARY COMPONENTS
──────‐───────────────────
[ ] C-012 Contact Form (name, email, phone, service type, message)
[ ] C-013 Testimonial Card (quote, author, client logo, rating)
[ ] C-014 Team Member Card (photo, name, role, bio)
[ ] C-015 Project Gallery (lightbox with keyboard nav)
[ ] C-016 Video Embed (responsive YouTube/Vimeo wrapper)
[ ] C-017 Cookie Consent Banner
[ ] C-018 Language Toggle (ES/EN switch)
[ ] C-019 Loading Bar (top-of-page progress)
[ ] C-020 Skeleton Loader (card placeholder)
[ ] C-021 Empty State (no results)
[ ] C-022 Breadcrumb (for portfolio + blog pages)
[ ] C-023 Share Button (WhatsApp share per project)
[ ] C-024 Tag Badge (category labels)
[ ] C-025 Section Title (reusable h2 + subtitle pattern)
```

## D. PAGES (25 items)

```
P0 — CORE PAGES
────‐──────────
[ ] D-001 Home (/)
        - Hero with showreel video
        - Client logo bar
        - Featured work (4 cards)
        - Stats counter
        - Services overview (3 cards)
        - CTA banner
        - Footer

[ ] D-002 Portfolio Grid (/portfolio)
        - Filter bar
        - Project cards (masonry grid)
        - No results state
        - Load more functionality
        - SEO meta

[ ] D-003 Case Study (/portfolio/[slug])
        - Hero image/video
        - Client name + category + year
        - Overview section
        - Approach section
        - Results section
        - Gallery (images + optional video)
        - CTA to contact
        - Related projects (bottom)
        - Breadcrumb
        - Schema.org CreativeWork

[ ] D-004 Services (/servicios)
        - Intro paragraph
        - 4 service cards (Marketing Digital, Produccion, Fotografia, Publicidad)
        - Each expandable with detail list
        - CTA section
        - Process/how-we-work section (timeline)

[ ] D-005 About (/nosotros)
        - Brand story / manifesto
        - Team grid
        - Values (3-4 cards with icons)
        - Timeline (history)
        - CTA to contact

[ ] D-006 Clients (/clientes)
        - Logo wall (all clients)
        - Testimonial carousel
        - Stats counter
        - CTA: "Se el proximo"

[ ] D-007 Blog (/blog)
        - Article list with thumbnails
        - Category filter
        - Pagination
        - RSS feed link

[ ] D-008 Blog Post (/blog/[slug])
        - Featured image
        - Title + date + category
        - Content (prose)
        - Share buttons
        - Related posts

[ ] D-009 Contact (/contacto)
        - Contact form (left)
        - Contact info (right)
        - Google Maps embed
        - WhatsApp CTA
        - Business hours
        - Social links

[ ] D-010 FAQ (/faq)
        - Accordion items (10+ questions)
        - Search/filter
        - Schema.org FAQ

P1 — LEGAL PAGES
────‐───────────
[ ] D-011 Privacy Policy (/privacidad)
[ ] D-012 Terms (/terminos)
[ ] D-013 404 (/not-found)
[ ] D-014 Error (/error)
[ ] D-015 robots.txt
[ ] D-016 sitemap.xml

P2 — API ROUTES
────‐──────────
[ ] D-017 /api/subscribe (newsletter)
```

## E. CONTENT & COPY (30 items)

```
P0 — SPANISH CONTENT
────‐───────────────
[ ] E-001 Write hero headline + subtitle (ES)
[ ] E-002 Write service descriptions (4 services, 200 words each)
[ ] E-003 Write about page (brand story, 300 words)
[ ] E-004 Write team bios (founder + collaborators)
[ ] E-005 Write 10 FAQ questions with answers
[ ] E-006 Write CTA variations for each page
[ ] E-007 Write privacy policy (ES)
[ ] E-008 Write terms of service (ES)

P1 — PORTFOLIO CONTENT
────‐──────────────────
[ ] E-009 Write Amarok 2025 case study (250 words)
[ ] E-010 Write Carmen Steffens case study (250 words)
[ ] E-011 Write SIT EVENTOS case study (250 words)
[ ] E-012 Write Lez a Lez case study (250 words)
[ ] E-013 Write Aurelia Brew Pub case study (250 words)
[ ] E-014 Write Estacion Los Jardines case study (250 words)
[ ] E-015 Write Reciclarte case study (250 words)
[ ] E-016 Write Nico Garcia case study (250 words)
[ ] E-017 Collect 30+ portfolio images from client
[ ] E-018 Optimize all images to WebP (next/image)

P2 — ENGLISH CONTENT
────‐────────────────
[ ] E-019 Translate hero + home to English
[ ] E-020 Translate services to English
[ ] E-021 Translate about page to English
[ ] E-022 Translate portfolio items to English
[ ] E-023 Translate FAQ to English
[ ] E-024 Translate privacy + terms to English
[ ] E-025 Write content/es.json (all Spanish copy)
[ ] E-026 Write content/en.json (all English copy)

P3 — SEO CONTENT
────‐───────────
[ ] E-027 Write meta titles + descriptions per page
[ ] E-028 Write Open Graph titles + descriptions
[ ] E-029 Research keywords (ES + EN)
[ ] E-030 Add alt text to all images
```

## F. PORTFOLIO DATA (20 items)

```
P0 — PROJECT FILES
────‐─────────────
[ ] F-001 Create content/portfolio/ directory
[ ] F-002 Create amarok-2025.json with:
        - title, client, category, year
        - heroImage, gallery[]
        - description (ES + EN)
        - approach (ES + EN)
        - results (ES + EN)
        - tags[]
[ ] F-003 Create carmen-steffens.json
[ ] F-004 Create sit-eventos.json
[ ] F-005 Create lez-a-lez.json
[ ] F-006 Create aurelia-brew-pub.json
[ ] F-007 Create estacion-jardines.json
[ ] F-008 Create reciclarte.json
[ ] F-009 Create nico-garcia.json
[ ] F-010 Create 2-3 placeholder projects for future

P1 — ASSETS
────‐──────
[ ] F-011 Get client logos (SVG or PNG)
[ ] F-012 Get hero images for each project
[ ] F-013 Get gallery images for each project
[ ] F-014 Get showreel video from client
[ ] F-015 Optimize all images (resize, WebP)
[ ] F-016 Upload images to public/images/portfolio/
[ ] F-017 Add image alt texts in JSON
[ ] F-018 Create placeholder images for missing ones
[ ] F-019 Add OG image per project
[ ] F-020 Verify all images load on deployed site
```

## G. FEATURES (25 items)

```
P0 — CORE FEATURES
────‐─────────────
[ ] G-001 Video showreel hero (muted, loop, playsinline)
[ ] G-002 Portfolio filter (URL-based state)
[ ] G-003 Lightbox gallery (keyboard nav, swipe)
[ ] G-004 Scroll animations (IntersectionObserver, fade-in)
[ ] G-005 Smooth scroll on navigation clicks
[ ] G-006 Stats counter animation on viewport enter
[ ] G-007 Client bar auto-scroll (CSS animation)
[ ] G-008 Dark theme (default — site is dark)
[ ] G-009 Loading skeleton on portfolio grid
[ ] G-010 Back to top button

P1 — ENHANCEMENTS
────‐────────────
[ ] G-011 Language toggle (ES ↔ EN) with localStorage
[ ] G-012 Contact form validation + submission
[ ] G-013 Google Maps embed on contacto
[ ] G-014 Cookie consent banner with GDPR compliance
[ ] G-015 WhatsApp pre-filled message per project
[ ] G-016 Share buttons on portfolio pages
[ ] G-017 Breadcrumb navigation
[ ] G-018 Pagination or load-more on portfolio
[ ] G-019 Image lazy loading with blur placeholder
[ ] G-020 Video lazy load (poster image)

P2 — NICE TO HAVE
────‐─────────────
[ ] G-021 Parallax scroll on hero
[ ] G-022 Mouse cursor follower (custom cursor)
[ ] G-023 Page transition animations
[ ] G-024 3D tilt on project cards
[ ] G-025 Audio toggle for showreel video
```

## H. SEO & STRUCTURED DATA (20 items)

```
P0 — ESSENTIAL
────‐─────────
[ ] H-001 Schema.org Organization JSON-LD in root layout
         name: "3 MIND"
         description: "Agencia creativa de marketing digital, produccion audiovisual y publicidad"
         url: "https://3md.paragu-ai.com"
         logo: "https://3md.paragu-ai.com/images/logo.svg"
         address: Fray Luis de Leon C/Venezuela, Asuncion
         telephone: "+595991691501"
         email: "3mindpy@gmail.com"
         sameAs: ["https://instagram.com/somos3md", "https://facebook.com/p/3-MIND-61565791512167"]
[ ] H-002 BreadcrumbList schema on all subpages
[ ] H-003 CreativeWork schema on each portfolio page
[ ] H-004 FAQ schema on /faq page
[ ] H-005 Article schema on blog posts
[ ] H-006 Review schema for testimonials
[ ] H-007 Open Graph tags on every page (title, desc, image, url)
[ ] H-008 Twitter Card tags (summary_large_image)
[ ] H-009 Canonical URLs on every page
[ ] H-010 Meta descriptions (unique per page)
[ ] H-011 robots.txt with sitemap reference
[ ] H-012 sitemap.xml with all pages + images

P1 — ADVANCED
────‐────────
[ ] H-013 hreflang tags (es for /, en for /en/)
[ ] H-014 Image sitemap extension
[ ] H-015 Google Search Console verification
[ ] H-016 Bing Webmaster Tools verification
[ ] H-017 Structured data testing (Google Rich Results)
[ ] H-018 Heading hierarchy check (h1 → h2 → h3 → h4)
[ ] H-019 aria-labels on all interactive elements
[ ] H-020 Skip-to-content link
```

## I. PERFORMANCE (15 items)

```
P0 — CRITICAL
────‐────────
[ ] I-001 Fonts via next/font (zero CLS)
[ ] I-002 Images via next/image (WebP, lazy, responsive)
[ ] I-003 Security headers (HSTS, XFO, nosniff)
[ ] I-004 Static asset caching (Cache-Control: immutable)
[ ] I-005 Bundle analysis (remove unused deps)

P1 — OPTIMIZATION
────‐─────────────
[ ] I-006 Preload hero video poster image
[ ] I-007 Prefetch critical routes (/, /portfolio, /servicios)
[ ] I-008 DNS prefetch for external origins
[ ] I-009 Dynamic import for heavy components (lightbox, map)
[ ] I-010 Code splitting on route boundaries
[ ] I-011 Tree-shake lucide-react imports
[ ] I-012 Remove unused CSS with Tailwind

P2 — MONITORING
────‐───────────
[ ] I-013 Run Lighthouse audit (target 90+)
[ ] I-014 Set up Core Web Vitals tracking
[ ] I-015 Set up Plausible or Umami analytics
```

## J. DEPLOYMENT & LAUNCH (15 items)

```
P0 — LAUNCH
────‐─────
[ ] J-001 Build Docker image
[ ] J-002 Deploy to Docker Swarm
[ ] J-003 Configure Cloudflare DNS (3md.paragu-ai.com)
[ ] J-004 Configure Traefik routing
[ ] J-005 Verify HTTPS certificate (LetsEncrypt)
[ ] J-006 Test all 15+ pages return 200
[ ] J-007 Test all portfolio links work
[ ] J-008 Test contact form submission
[ ] J-009 Test WhatsApp links
[ ] J-010 Test on mobile (320px, 768px)
[ ] J-011 Test on tablet + desktop
[ ] J-012 Test language toggle

P1 — POST-LAUNCH
────‐───────────
[ ] J-013 Register 3mindpy.com domain
[ ] J-014 Set up email forwarding (hello@3mindpy.com)
[ ] J-015 Set up analytics dashboard
```

## K. POST-LAUNCH (15 items)

```
P1 — FIRST WEEK
────‐───────────
[ ] K-001 Monitor error logs
[ ] K-002 Fix any 404s from broken links
[ ] K-003 Add Google Analytics / Plausible
[ ] K-004 Submit sitemap to Google Search Console
[ ] K-005 Add Instagram feed embed

P2 — FIRST MONTH
────‐────────────
[ ] K-006 Add 3 more portfolio projects
[ ] K-007 Write 2 blog posts (case studies)
[ ] K-008 Add client testimonials
[ ] K-09 Set up Google Business Profile
[ ] K-010 Set up monthly analytics report

P3 — ROADMAP
────‐────────
[ ] K-011 Migrate from 3md.paragu-ai.com to 3mindpy.com
[ ] K-012 Add WhatsApp chatbot integration
[ ] K-013 Add online booking calendar
[ ] K-014 Add client portal
[ ] K-015 Add Portuguese language option
```

---

## EFFORT SUMMARY

| Category | Items | Hours | Priority |
|----------|-------|-------|----------|
| A. Foundation & Config | 25 | 8h | P0 |
| B. Design System | 20 | 6h | P0 |
| C. Components | 35 | 20h | P0 |
| D. Pages | 25 | 15h | P0 |
| E. Content & Copy | 30 | 10h | P0 |
| F. Portfolio Data | 20 | 8h | P0 |
| G. Features | 25 | 10h | P1 |
| H. SEO & Data | 20 | 6h | P1 |
| I. Performance | 15 | 5h | P2 |
| J. Deployment | 15 | 4h | P0 |
| K. Post-Launch | 15 | 8h | P2 |
| **TOTAL** | **245** | **~100h** | |

---

## PHASED BUILD PLAN

### Phase 1 (Week 1, ~30h) — Foundation + Core Pages
- A: All foundation items (8h)
- B: Design system (6h)
- C: Header, Footer, Hero, CTA Banner, WhatsApp Float (8h)
- D: Home, Portfolio grid, Contacto (8h)

### Phase 2 (Week 2, ~30h) — Portfolio + Content
- C: Portfolio Card, Project Gallery, Service Cards (8h)
- D: Services, About, Clients, FAQ (8h)
- E: All copy + translations (10h)
- F: Portfolio JSON data files (4h)

### Phase 3 (Week 3, ~25h) — Features + Polish
- C: Remaining components (lightbox, form, toggle, etc.) (6h)
- G: Video hero, animations, dark mode, i18n (10h)
- H: SEO + structured data (6h)
- I: Performance optimization (3h)

### Phase 4 (Week 4, ~15h) — Launch
- J: Deploy + test + DNS + certs (8h)
- D: Legal pages, blog scaffold (4h)
- K: Post-launch monitoring, GA, Search Console (3h)
