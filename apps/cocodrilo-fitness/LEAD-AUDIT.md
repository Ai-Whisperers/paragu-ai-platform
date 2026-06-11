# LEAD-AUDIT: cocodrilo-fitness

## Business: Complejo Cocodrilo -- Gimnasio / Fitness Center
## Location: Asunción
## Live: https://cocodrilo-fitness.paragu-ai.com
## Score: 48/100
## Generated: 2026-05-01

---

## 1. EXECUTIVE SUMMARY

Complejo Cocodrilo is an auto-generated lead site for a gimnasio / fitness center in Asunción.
It needs significant investment to reach professional quality comparable to established
sites like superspuma.paragu-ai.com (score 92/100).

Notes: Gym facilities, pool, sauna, squash court -- needs equipment photos, class schedule, trainer bios

### What's Done (+)
- All 10 pages return 200
- next/font optimization (no render-blocking)
- CSS custom properties design system (15+ variables)
- Business-specific SVG logo
- CTA banner with WhatsApp button
- Schema.org LocalBusiness JSON-LD
- Open Graph + Twitter Card meta tags
- Canonical URLs on all pages
- Security headers (HSTS, XFO, nosniff)
- Docker healthchecks and non-root user
- Resource limits (512MB RAM / 0.5 CPU)
- traefik.docker.network=agent-net label
- robots.txt + sitemap.xml
- Custom 404 and error pages
- 7 content pages (home, services, contacto, about, FAQ, privacy, terms)

### What's Broken (-)
- Zero real images (no hero, no services, no team photos)
- Fake/placeholder phone number -- needs client verification
- Address too vague -- needs exact street address
- No Google Maps integration
- No cookie consent banner
- No testimonials or reviews section
- No trust badges / certifications
- No blog or articles
- No social media links
- No analytics tracking
- No dark mode
- No loading states / skeletons
- No PWA / manifest / service worker
- Generic CTA (all use same WhatsApp message)

---

## 2. CRITICAL BUGS (P0)

- [ ] (fixed) Services.tsx: cat.category -> cat.name
- [ ] Phone: 0986 106 062 -- verify this is real
- [ ] Address: Av. Santisima Trinidad, Asuncion -- verify exact
- [ ] Hours: Lun-Sab 9:00-20:00 -- verify
- [ ] No hero/equipment/facility photos

---

## 3. SITE-SPECIFIC TODO ITEMS

- [ ] Get real gym equipment photos (weights, machines, cardio area)
- [ ] Get pool photo (temperature, size dimensions)
- [ ] Get sauna and jacuzzi photos
- [ ] Get squash court photo
- [ ] Photograph trainer team with bios and certifications
- [ ] Write complete class schedule (days x times x instructor)
- [ ] Define membership tiers with real prices
- [ ] Add personal training add-on pricing
- [ ] Add nutrition consultation pricing and description
- [ ] Create before/after transformation gallery
- [ ] Add annual membership option with 2 months free
- [ ] Add student/senior discount programs
- [ ] Add guest pass / day pass pricing
- [ ] Add corporate membership program details
- [ ] Add referral bonus program (1 month free per referral)
- [ ] Add facility rules and etiquette guide
- [ ] Add locker room and shower amenities description
- [ ] Add parking and access information
- [ ] Create 5 blog posts: workout tips, nutrition, recovery
- [ ] Add social media links (Instagram for gym content)

---

## 4. COMPARISON vs ESTABLISHED SITES

| Feature | superspuma (ref) | cocodrilo-fitness | Gap |
|---------|-----------------|-----|-----|
| Pages | 14 | 10 | -4 |
| Images | 26 | 0 | -26 |
| Blog | Yes | No | -1 |
| Testimonials | Yes | No | -1 |
| Trust badges | 6 | 0 | -6 |
| Hero image | Yes | No | -1 |
| Service cards | 22 | 10 | -12 |
| Cookie consent | Yes | No | -1 |
| Scroll animations | Yes | No | -1 |
| Dark mode | No | No | 0 |
| Bundle size | 240KB | 48KB | Smaller (good) |

---

## 5. TODO BY CATEGORY

### Category A: INFRASTRUCTURE & DEPLOYMENT [P0]

| # | Item | Status |
|---|------|--------|
| A-001 | Fix services.tsx category name bug (cat.category -> cat.name) | DONE |
| A-002 | Add real business phone number (currently placeholder) | PENDING |
| A-003 | Add Google Maps embed to contacto page | PENDING |
| A-004 | Add real address with full street details | PENDING |
| A-005 | Add .dockerignore with node_modules excluded | PENDING |
| A-006 | Add deploy.sh script for stack deployment | PENDING |
| A-007 | Add rollback.sh script for stack rollback | PENDING |
| A-008 | Set up GitHub Actions auto-deploy on push to main | PENDING |
| A-009 | Add Docker layer caching to CI pipeline | PENDING |
| A-010 | Pin node:20-alpine base image digest for reproducibility | PENDING |
| A-011 | Add Traefik rate limiting middleware | PENDING |
| A-012 | Add Traefik circuit breaker middleware | PENDING |
| A-013 | Add Traefik retry middleware | PENDING |
| A-014 | Add container memory usage alerts | PENDING |
| A-015 | Set up uptime monitoring (UptimeRobot / Checkly) | PENDING |
| A-016 | Set up log aggregation (Loki + Grafana) | PENDING |
| A-017 | Add /api/health endpoint route | PENDING |
| A-018 | Add npm audit to CI pipeline | PENDING |
| A-019 | Add Dependabot for automated security updates | PENDING |
| A-020 | Add Docker socket proxy (security hardening) | PENDING |
| A-021 | Add resource limits for build stage Dockerfile | PENDING |
| A-022 | Set up staging environment for previews | PENDING |
| A-023 | Add blue/green deployment strategy | PENDING |
| A-024 | Set up environment variable documentation (.env.example) | PENDING |
| A-025 | Add automatic SSL certificate renewal monitoring | PENDING |
| A-026 | Add fail2ban for SSH access | PENDING |
| A-027 | Add WAF rules via Cloudflare | PENDING |
| A-028 | Set up automated backup strategy | PENDING |
| A-029 | Add disaster recovery plan docs | PENDING |
| A-030 | Scan for exposed secrets in .git history with gitleaks | PENDING |
| A-031 | Pin exact npm dependency versions (remove ^) | PENDING |

### Category B: CODE QUALITY & TYPESCRIPT [P1]

| # | Item | Status |
|---|------|--------|
| B-001 | Enable strict mode in tsconfig.json | PENDING |
| B-002 | Add proper TypeScript interfaces for all component props | PENDING |
| B-003 | Add interface for service category data type | PENDING |
| B-004 | Add interface for nav items type | PENDING |
| B-005 | Add interface for footer props type | PENDING |
| B-006 | Add interface for hero props type | PENDING |
| B-007 | Remove 'any' types from services.tsx | PENDING |
| B-008 | Add noUnusedLocals: true to tsconfig | PENDING |
| B-009 | Add noUnusedParameters: true to tsconfig | PENDING |
| B-010 | Add exactOptionalPropertyTypes to tsconfig | PENDING |
| B-011 | Extract service data from components to content/site.json | PENDING |
| B-012 | Add cn() utility (clsx + tailwind-merge) | PENDING |
| B-013 | Add wa() URL builder utility for WhatsApp links | PENDING |
| B-014 | Add formatCurrency utility for Gs. formatting | PENDING |
| B-015 | Add formatPhone utility for display formatting | PENDING |
| B-016 | Add slugify utility for URL generation | PENDING |
| B-017 | Add useMediaQuery custom hook | PENDING |
| B-018 | Add useScrollPosition custom hook | PENDING |
| B-019 | Add useLocalStorage custom hook | PENDING |
| B-020 | Add useDebounce custom hook | PENDING |
| B-021 | Add loading.tsx for each route (Suspense) | PENDING |
| B-022 | Verify error.tsx renders correctly on error | PENDING |
| B-023 | Add eslint-plugin-tailwindcss for class ordering | PENDING |
| B-024 | Add eslint-plugin-jsx-a11y for a11y rules | PENDING |
| B-025 | Add eslint-plugin-react for React best practices | PENDING |
| B-026 | Add import sorting rule (simple-import-sort) | PENDING |
| B-027 | Add Prettier config with consistent formatting | PENDING |
| B-028 | Set up Husky pre-commit hooks | PENDING |
| B-029 | Set up lint-staged for staged file linting | PENDING |
| B-030 | Add Vitest configuration | PENDING |
| B-031 | Add snapshot tests for all components | PENDING |
| B-032 | Add integration tests for contacto page | PENDING |
| B-033 | Add accessibility tests with axe-core | PENDING |
| B-034 | Add Lighthouse CI integration | PENDING |
| B-035 | Add @next/bundle-analyzer for bundle audit | PENDING |
| B-036 | Add Component snapshot tests with Storybook | PENDING |
| B-037 | Add e2e tests with Playwright (auth flows) | PENDING |
| B-038 | Add CONTRIBUTING.md with dev setup instructions | PENDING |
| B-039 | Add CHANGELOG.md with version history | PENDING |
| B-040 | Add CODEOWNERS file for review assignments | PENDING |
| B-041 | Add issue templates (bug, feature, question) | PENDING |
| B-042 | Add pull request template | PENDING |
| B-043 | Configure semantic-release for automated versioning | PENDING |
| B-044 | Set up changesets for monorepo-style versioning | PENDING |
| B-045 | Add Stale bot config to auto-close inactive issues | PENDING |

### Category C: DESIGN & USER EXPERIENCE [P0]

| # | Item | Status |
|---|------|--------|
| C-001 | Add hero background image (Unsplash photo per business) | PENDING |
| C-002 | Add 3-5 service photos (real or stock photography) | PENDING |
| C-003 | Add team/trainer photo section | PENDING |
| C-004 | Add proper card hover elevation effects | PENDING |
| C-005 | Add gradient backgrounds for pricing cards | PENDING |
| C-006 | Add testimonial carousel section with avatars | PENDING |
| C-007 | Add trust badges section (certified, awards, years) | PENDING |
| C-008 | Add Why Choose Us section with icon grid | PENDING |
| C-009 | Add class schedule visual timetable | PENDING |
| C-010 | Add pricing comparison table with highlights | PENDING |
| C-011 | Add number counter animation for stats | PENDING |
| C-012 | Add hover zoom effect on images | PENDING |
| C-013 | Add scroll-reveal animation on section entrance | PENDING |
| C-014 | Add staggered card entrance animation | PENDING |
| C-015 | Add sticky header with shadow on scroll | PENDING |
| C-016 | Add active page indicator in navigation | PENDING |
| C-017 | Add mobile menu slide animation | PENDING |
| C-018 | Add bottom navigation bar on mobile | PENDING |
| C-019 | Add secondary CTA button in header | PENDING |
| C-020 | Add back-to-top floating button | PENDING |
| C-021 | Add dark mode with theme toggle | PENDING |
| C-022 | Add loading skeleton components for suspense | PENDING |
| C-023 | Add page transition animation between routes | PENDING |
| C-024 | Add button micro-interactions (ripple, scale) | PENDING |
| C-025 | Add parallax effect on hero section | PENDING |
| C-026 | Add video background option for hero | PENDING |
| C-027 | Add before/after image slider widget | PENDING |
| C-028 | Add reading progress bar on scroll | PENDING |
| C-029 | Add cookie consent banner with accept/decline | PENDING |
| C-030 | Add announcement bar for promotions | PENDING |
| C-031 | Add floating phone number CTA on mobile | PENDING |
| C-032 | Add email capture modal on exit intent | PENDING |
| C-033 | Add pricing toggle (monthly/yearly) | PENDING |
| C-034 | Add countdown timer for limited offers | PENDING |
| C-035 | Add custom 404 page with search suggestions | PENDING |
| C-036 | Add image lightbox gallery component | PENDING |
| C-037 | Add live chat widget integration | PENDING |
| C-038 | Add social proof notification popups | PENDING |
| C-039 | Add confetti animation on CTA click | PENDING |
| C-040 | Add wishlist / favorites functionality | PENDING |
| C-041 | Add recently viewed section (localStorage) | PENDING |
| C-042 | Test on 320px width minimum (small mobile) | PENDING |
| C-043 | Test on tablet 768px breakpoint | PENDING |
| C-044 | Add safe-area-inset for notched mobile devices | PENDING |
| C-045 | Fix mobile menu hamburger positioning | PENDING |
| C-046 | Add touch-friendly target sizes (44px minimum) | PENDING |
| C-047 | Add prefers-reduced-motion media query | PENDING |
| C-048 | Add skip-to-content link for accessibility | PENDING |
| C-049 | Add focus-visible styles for keyboard nav | PENDING |
| C-050 | Ensure color contrast meets WCAG AA (4.5:1) | PENDING |
| C-051 | Add print-friendly CSS styles | PENDING |
| C-052 | Add prefers-color-scheme dark palette | PENDING |
| C-053 | Add reduced transparency for dark mode | PENDING |
| C-054 | Add smooth transition for dark/light mode switch | PENDING |
| C-055 | Add loading spinner for async operations | PENDING |
| C-056 | Add empty state component for missing data | PENDING |
| C-057 | Add skeleton placeholder for product cards | PENDING |
| C-058 | Add toast notification component for actions | PENDING |
| C-059 | Add confirmation dialog for destructive actions | PENDING |
| C-060 | Add modal component for overlays | PENDING |

### Category D: CONTENT & COPYWRITING [P0]

| # | Item | Status |
|---|------|--------|
| D-001 | Replace generic placeholder phone number with real client number | PENDING |
| D-002 | Replace generic address with full street address | PENDING |
| D-003 | Add real business hours of operation | PENDING |
| D-004 | Write business description with unique value proposition | PENDING |
| D-005 | Write About page with founding story and mission | PENDING |
| D-006 | Write FAQ with real client questions (10+ items) | PENDING |
| D-007 | Write service descriptions with benefits (not just features) | PENDING |
| D-008 | Write CTA text that creates urgency (not generic) | PENDING |
| D-009 | Add class schedule with days and times | PENDING |
| D-010 | Add trainer/team bios with photos and credentials | PENDING |
| D-011 | Add facility descriptions with specific details | PENDING |
| D-012 | Add membership benefits section (not just prices) | PENDING |
| D-013 | Add testimonials from real clients | PENDING |
| D-014 | Add before/after transformation stories | PENDING |
| D-015 | Add blog articles (weekly health/fitness tips) | PENDING |
| D-016 | Add equipment list with brand names | PENDING |
| D-017 | Add service-specific detail pages | PENDING |
| D-018 | Add nutrition guide content | PENDING |
| D-019 | Add personal training package descriptions | PENDING |
| D-020 | Add group class descriptions and benefits | PENDING |
| D-021 | Add corporate/team membership program | PENDING |
| D-022 | Add student discount information | PENDING |
| D-023 | Add referral program details and incentives | PENDING |
| D-024 | Add free trial pass / first class offer | PENDING |
| D-025 | Add new member onboarding guide | PENDING |
| D-026 | Add dress code / gym rules page | PENDING |
| D-027 | Add locker room and amenity information | PENDING |
| D-028 | Add parking and transport access info | PENDING |
| D-029 | Add nearby landmarks and directions | PENDING |
| D-030 | Add seasonal promotion descriptions | PENDING |
| D-031 | Add event calendar for special classes | PENDING |
| D-032 | Add competition/tournament information | PENDING |
| D-033 | Add kids/teens program descriptions | PENDING |
| D-034 | Add senior fitness program descriptions | PENDING |
| D-035 | Add rehab/post-injury program descriptions | PENDING |
| D-036 | Add online coaching option details | PENDING |
| D-037 | Add merchandise/product descriptions | PENDING |
| D-038 | Add partner discount programs | PENDING |
| D-039 | Add franchise information if applicable | PENDING |
| D-040 | Add careers/jobs page with open positions | PENDING |

### Category E: PAGES & FEATURES [P1]

| # | Item | Status |
|---|------|--------|
| E-001 | Home page (/) -- done | PENDING |
| E-002 | Servicios page (/servicios) -- done | PENDING |
| E-003 | Contacto page (/contacto) -- done | PENDING |
| E-004 | Nosotros page (/nosotros) -- done | PENDING |
| E-005 | FAQ page (/faq) -- done | PENDING |
| E-006 | Privacidad page (/privacidad) -- done | PENDING |
| E-007 | Terminos page (/terminos) -- done | PENDING |
| E-008 | 404 not found page -- done | PENDING |
| E-009 | robots.txt -- done | PENDING |
| E-010 | sitemap.xml -- done | PENDING |
| E-011 | Add /galeria page (photo gallery with lightbox) | PENDING |
| E-012 | Add /equipo page (trainer profiles grid) | PENDING |
| E-013 | Add /blog page (articles list with pagination) | PENDING |
| E-014 | Add /blog/[slug] page (individual article) | PENDING |
| E-015 | Add /promociones page (specials and discounts) | PENDING |
| E-016 | Add /testimonios page (client reviews wall) | PENDING |
| E-017 | Add /horarios page (class schedule calendar) | PENDING |
| E-018 | Add /api/subscribe route for newsletter | PENDING |
| E-019 | Add newsletter signup form in footer | PENDING |
| E-020 | Add Google Maps embed on contacto page | PENDING |
| E-021 | Add contact form (name, email, phone, message) | PENDING |
| E-022 | Add WhatsApp click-to-chat on all pages | PENDING |
| E-023 | Add social media share buttons on blog posts | PENDING |
| E-024 | Add RSS feed for blog content | PENDING |
| E-025 | Add site-wide search functionality | PENDING |
| E-026 | Add online booking / reservation system | PENDING |
| E-027 | Add online payment for memberships | PENDING |
| E-028 | Add member login portal | PENDING |
| E-029 | Add live class schedule with real-time availability | PENDING |
| E-030 | Add push notification for class reminders | PENDING |
| E-031 | Add WhatsApp chatbot integration | PENDING |
| E-032 | Add mobile app download links | PENDING |
| E-033 | Add QR code check-in system | PENDING |
| E-034 | Add loyalty program page | PENDING |
| E-035 | Add referral tracking dashboard | PENDING |
| E-036 | Add admin analytics dashboard | PENDING |
| E-037 | Add printing-friendly CSS | PENDING |
| E-038 | Add cookie consent banner | PENDING |
| E-039 | Add announcement bar for urgent promotions | PENDING |
| E-040 | Add live chat widget integration | PENDING |

### Category F: ASSETS & MEDIA [P0]

| # | Item | Status |
|---|------|--------|
| F-001 | Logo SVG -- done | PENDING |
| F-002 | Favicon -- done | PENDING |
| F-003 | OG default image -- done | PENDING |
| F-004 | Hero background photo (business-appropriate stock photo) | PENDING |
| F-005 | Service photos (3-5 per category, real or stock) | PENDING |
| F-006 | Facility/space photo gallery (10+ images) | PENDING |
| F-007 | Team photo (group shot + individual headshots) | PENDING |
| F-008 | Add image optimization (automatic WebP conversion) | PENDING |
| F-009 | Add lazy loading for all images | PENDING |
| F-010 | Add responsive image sizes (srcset + sizes attrs) | PENDING |
| F-011 | Add descriptive alt text for every image | PENDING |
| F-012 | Add gallery section with lightbox viewer | PENDING |
| F-013 | Add before/after transformation images | PENDING |
| F-014 | Add facility exterior photo for directions | PENDING |
| F-015 | Add class/treatment in-progress action photos | PENDING |
| F-016 | Add video tour of facility (YouTube/Vimeo embed) | PENDING |
| F-017 | Add training demonstration short videos | PENDING |
| F-018 | Add client testimonial video content | PENDING |
| F-019 | Add brand partner logo badges | PENDING |
| F-020 | Add certification badge images | PENDING |
| F-021 | Add award badge images | PENDING |
| F-022 | Add social media feed embed (Instagram) | PENDING |
| F-023 | Add custom animated SVG icons for features | PENDING |
| F-024 | Add custom illustrations for empty states | PENDING |
| F-025 | Add infographics for pricing and process | PENDING |
| F-026 | Add seasonal/holiday themed graphics | PENDING |
| F-027 | OG image with business branding (not generic) | PENDING |
| F-028 | Add favicon in all sizes (16, 32, 48, 192) | PENDING |
| F-029 | Add apple-touch-icon.png | PENDING |
| F-030 | Add manifest.json for PWA support | PENDING |

### Category G: SEO & STRUCTURED DATA [P1]

| # | Item | Status |
|---|------|--------|
| G-001 | Title tags -- done | PENDING |
| G-002 | Meta descriptions -- done | PENDING |
| G-003 | Open Graph tags -- done | PENDING |
| G-004 | Twitter card tags -- done | PENDING |
| G-005 | Canonical URLs -- done | PENDING |
| G-006 | LocalBusiness JSON-LD -- done | PENDING |
| G-007 | Fix heading hierarchy: contacto page missing h2 structure | PENDING |
| G-008 | Add Service schema for each service/item | PENDING |
| G-009 | Add FAQ schema to FAQ page | PENDING |
| G-010 | Add BreadcrumbList schema to all pages | PENDING |
| G-011 | Add OpeningHoursSpecification to LocalBusiness | PENDING |
| G-012 | Add GeoCoordinates to LocalBusiness | PENDING |
| G-013 | Add ImageObject schema for each photo | PENDING |
| G-014 | Add Review schema when testimonials exist | PENDING |
| G-015 | Add Product schema for memberships/packages | PENDING |
| G-016 | Add image sitemap extension | PENDING |
| G-017 | Add aria-labels to all interactive elements | PENDING |
| G-018 | Add skip-to-content link for screen readers | PENDING |
| G-019 | Ensure semantic HTML (header, nav, main, section, footer) | PENDING |
| G-020 | Ensure proper h1 to h6 hierarchy on every page | PENDING |
| G-021 | Add meta keywords tag | PENDING |
| G-022 | Add hreflang tag for multi-language (if needed) | PENDING |
| G-023 | Add Google Search Console verification meta tag | PENDING |
| G-024 | Add Bing Webmaster Tools verification | PENDING |
| G-025 | Add Google Analytics 4 (or privacy-friendly Plausible) | PENDING |

### Category H: PERFORMANCE [P2]

| # | Item | Status |
|---|------|--------|
| H-001 | Fonts via next/font with display=swap -- done | PENDING |
| H-002 | Security headers (HSTS, XFO, nosniff) -- done | PENDING |
| H-003 | Static asset caching headers -- done | PENDING |
| H-004 | Add image lazy loading with loading=lazy attr | PENDING |
| H-005 | Optimize images to WebP format | PENDING |
| H-006 | Add responsive srcset for all images | PENDING |
| H-007 | Add preload for hero image (highest priority) | PENDING |
| H-008 | Add prefetch for critical next pages | PENDING |
| H-009 | Add DNS prefetch for external domains | PENDING |
| H-010 | Add BundleAnalyzer for size auditing | PENDING |
| H-011 | Remove unused CSS classes | PENDING |
| H-012 | Add dynamic imports for heavy components | PENDING |
| H-013 | Add code splitting on route boundaries | PENDING |
| H-014 | Add service worker for offline support | PENDING |
| H-015 | Add PWA manifest for install prompt | PENDING |
| H-016 | Add CDN caching rules for static assets | PENDING |
| H-017 | Add Brotli compression at CDN level | PENDING |
| H-018 | Add HTTP/2 push for critical assets | PENDING |
| H-019 | Target LCP under 2.5 seconds | PENDING |
| H-020 | Target FID under 100ms | PENDING |
| H-021 | Target CLS under 0.1 | PENDING |
| H-022 | Run Lighthouse audit monthly | PENDING |
| H-023 | Add speed curve monitoring (SpeedCurve/RUM) | PENDING |
| H-024 | Add Core Web Vitals tracking via GA4 | PENDING |
| H-025 | Audit bundle with next/bundle-analyzer | PENDING |

### Category I: ANALYTICS & CONVERSION [P2]

| # | Item | Status |
|---|------|--------|
| I-001 | Add Google Analytics 4 property | PENDING |
| I-002 | Add privacy-friendly Plausible/Umami as alternative | PENDING |
| I-003 | Track WhatsApp CTA button clicks | PENDING |
| I-004 | Track phone number clicks (tel: links) | PENDING |
| I-005 | Track page views per route | PENDING |
| I-006 | Track CTA conversion rate | PENDING |
| I-007 | Track scroll depth percentage | PENDING |
| I-008 | Track time on page | PENDING |
| I-009 | Track outbound link clicks | PENDING |
| I-010 | Track form submissions (when form exists) | PENDING |
| I-011 | Set up conversion goals in analytics | PENDING |
| I-012 | Set up weekly analytics report email | PENDING |
| I-013 | Set up monthly SEO performance report | PENDING |
| I-014 | Add heatmap tracking (Hotjar or equivalent) | PENDING |
| I-015 | Add session recording for UX analysis | PENDING |
| I-016 | Set up A/B testing framework | PENDING |
| I-017 | Track email capture conversions | PENDING |
| I-018 | Track booking/reservation completions | PENDING |
| I-019 | Track member signup funnel | PENDING |
| I-020 | Track referral program conversions | PENDING |

### Category J: LEGAL & COMPLIANCE [P2]

| # | Item | Status |
|---|------|--------|
| J-001 | Privacy policy page -- done | PENDING |
| J-002 | Terms of service page -- done | PENDING |
| J-003 | Add cookie consent banner with granular controls | PENDING |
| J-004 | Add GDPR compliance notice | PENDING |
| J-005 | Add data processing disclosure text | PENDING |
| J-006 | Add cancellation and refund policy | PENDING |
| J-007 | Add membership/contract terms and conditions | PENDING |
| J-008 | Add liability waiver for physical activities | PENDING |
| J-009 | Add medical clearance notice for gym/spa services | PENDING |
| J-010 | Add accessibility statement (WCAG compliance) | PENDING |
| J-011 | Add WCAG 2.1 AA compliance verification | PENDING |
| J-012 | Add minors policy if offering services to under 18 | PENDING |
| J-013 | Add CCPA compliance for California users | PENDING |
| J-014 | Add LGPD compliance for Brazilian users | PENDING |
| J-015 | Enable automatic SSL certificate monitoring | PENDING |

---

## 6. EFFORT ESTIMATE

| Category | Items | Hours | Priority |
|----------|-------|-------|----------|
| A | 31 | 15h | P0 |
| B | 45 | 25h | P1 |
| C | 60 | 70h | P0 |
| D | 40 | 25h | P0 |
| E | 40 | 35h | P1 |
| F | 30 | 35h | P0 |
| G | 25 | 12h | P1 |
| H | 25 | 12h | P2 |
| I | 20 | 8h | P2 |
| J | 15 | 8h | P2 |
| **TOTAL** | **331** | **245h** | |

### Quick Wins (Do This Week)

1. Verify/fix phone number (15 min)
2. Verify/fix street address (15 min)
3. Get 5 high-quality stock photos (Unsplash) (15 min)
4. Add hero background image (10 min)
5. Verify business hours are correct (5 min)
6. Customize WhatsApp message per business (5 min)
7. Build + deploy (30 min)

**Total quick wins: ~1.5 hours**