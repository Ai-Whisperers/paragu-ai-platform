# Site Template Organization Plan

**Status:** PROPOSED
**Author:** Ivan
**Date:** 2026-06-02

---

## 1. Problem Statement

The `components/` (57 files) and `lib/` (41 files) directories have grown into flat, unmanageable structures. No meaningful grouping exists, making navigation, onboarding, and maintenance difficult. Duplicate components further confuse the codebase.

### Current State

| Directory | Files | Assessment |
|-----------|-------|------------|
| `components/` | 57 flat | CRITICAL — needs sub-grouping |
| `lib/` | 41 flat | HIGH — needs sub-grouping |
| `public/images/` | 200+ | MEDIUM — subdirs exist but overloaded |
| `docs/` | 27 | MEDIUM — needs index/TOC |
| `.swarm/` | massive | LOW — operational debris, not production concern |
| `tests/` | well-organized | GOOD |

### Duplicate/Conflicting Files Found

| Duplicate A | Duplicate B | Resolution Needed |
|-------------|-------------|-------------------|
| `CookieConsent.tsx` | `cookie-consent.tsx` | Delete one, keep consistent casing |
| `ErrorBoundary.tsx` | `error-boundary.tsx` | Delete one, keep consistent casing |
| `GA4Loader.tsx` | `ga4-loader.tsx` | Delete one, keep consistent casing |
| `components/admin/content-editor.tsx` | `components/content-editor.tsx` | Consolidate into single location |

---

## 2. Max Files Policy

### Threshold Limits

| Tier | Directory Scope | Hard Max | Review Trigger |
|------|----------------|----------|----------------|
| TIER 1 | Root app dirs (`app/`) | 20 | 15 |
| TIER 2 | `components/`, `lib/` | 50 | 30 |
| TIER 3 | Subdirectories | 30 | 20 |
| TIER 4 | Leaf dirs (`tests/`, `content/`, `public/`) | 40 | 25 |

### Enforcement Rules

1. Before adding a new file, check if its directory is at threshold
2. If at 50%+ of limit, propose grouping with existing files
3. No flat directories with 40+ files allowed
4. Duplicate components must be resolved before merge
5. All new files must follow the [Naming Conventions](#3-naming-conventions)

---

## 3. Naming Conventions

### 3.1 File Naming

| Type | Convention | Examples |
|------|------------|----------|
| React Components | `PascalCase.tsx` | `HeroSection.tsx`, `BookingForm.tsx` |
| Utilities/Hooks | `camelCase.ts` | `useAuth.ts`, `formatCurrency.ts` |
| Configuration | `camelCase.ts` | `config.ts`, `siteConfig.ts` |
| Types/Interfaces | `camelCase.types.ts` | `user.types.ts`, `booking.types.ts` |
| Constants | `UPPER_SNAKE_CASE.ts` | `ROUTES.ts`, `API_ENDPOINTS.ts` |
| Test Files | `name.spec.ts` or `name.test.ts` | `auth.spec.ts`, `booking.test.ts` |
| JSON Content | `kebab-case.json` | `site-content.json`, `es.json` |

### 3.2 Directory Naming

| Type | Convention | Examples |
|------|------------|----------|
| Component Groups | `kebab-case/` | `ui/`, `layout/`, `sections/` |
| Feature Folders | `kebab-case/` | `client-auth/`, `content-loading/` |
| Named Directories | `kebab-case/` | `content-editor/`, `booking-form/` |

### 3.3 Component Naming Patterns

```
// Page Sections — {Feature}Section
HeroSection.tsx
ServicesSection.tsx
TestimonialsSection.tsx
GallerySection.tsx
TeamSection.tsx
ProcessSection.tsx
WhyUsSection.tsx
CTASection.tsx
BookingSection.tsx
ContactSection.tsx
AnimatedStatsSection.tsx
LoyaltySection.tsx
BeforeAfterSection.tsx

// UI Primitives — {Name}
Button.tsx
Badge.tsx
Card.tsx
Input.tsx
Modal.tsx
Toast.tsx
Spinner.tsx
Avatar.tsx
Chip.tsx
Skeleton.tsx

// Layout Components — {Name}
Header.tsx
Footer.tsx
BottomNav.tsx
Breadcrumb.tsx
ScrollToTop.tsx
LoadingBar.tsx
PageWrapper.tsx
Container.tsx

// Marketing/Conversion — {Name}
CTABanner.tsx
PromoCarousel.tsx
Newsletter.tsx
ExitIntentPopup.tsx
QuickBook.tsx
WhatsappFloat.tsx
ShareWhatsapp.tsx

// Admin Components — {Name}
ContentEditor.tsx
Dashboard.tsx
AnalyticsView.tsx
SettingsPanel.tsx

// Forms — {Feature}Form
BookingForm.tsx
ContactForm.tsx
NewsletterForm.tsx
ReviewForm.tsx
```

---

## 4. Proposed Structure

### 4.1 `components/` — Split into 6 Groups (Target: ≤20 each)

```
components/
├── ui/                          # Reusable UI primitives (Target: ~20)
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Toast.tsx
│   ├── Spinner.tsx
│   ├── Avatar.tsx
│   ├── Chip.tsx
│   ├── Skeleton.tsx
│   ├── Tooltip.tsx
│   ├── Dropdown.tsx
│   ├── Checkbox.tsx
│   ├── Radio.tsx
│   ├── Select.tsx
│   ├── Textarea.tsx
│   ├── Label.tsx
│   ├── Alert.tsx
│   ├── Accordion.tsx
│   ├── Tabs.tsx
│   └── index.ts                 # Barrel export
│
├── layout/                      # Layout components (Target: ~15)
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BottomNav.tsx
│   ├── Breadcrumb.tsx
│   ├── ScrollToTop.tsx
│   ├── LoadingBar.tsx
│   ├── PageWrapper.tsx
│   ├── Container.tsx
│   ├── Section.tsx
│   └── index.ts
│
├── sections/                    # Page sections (Target: ~25)
│   ├── hero/
│   │   ├── HeroSection.tsx
│   │   ├── HeroContent.tsx
│   │   └── HeroImage.tsx
│   ├── services/
│   │   ├── ServicesSection.tsx
│   │   ├── ServiceCard.tsx
│   │   └── ServiceItem.tsx
│   ├── testimonials/
│   │   ├── TestimonialsSection.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── TestimonialList.tsx
│   ├── gallery/
│   │   ├── GallerySection.tsx
│   │   ├── GalleryGrid.tsx
│   │   └── GalleryItem.tsx
│   ├── team/
│   │   ├── TeamSection.tsx
│   │   └── TeamMemberCard.tsx
│   ├── process/
│   │   ├── ProcessSection.tsx
│   │   └── ProcessStep.tsx
│   ├── cta/
│   │   ├── CTASection.tsx
│   │   └── CTABanner.tsx
│   ├── booking/
│   │   ├── BookingSection.tsx
│   │   └── BookingForm.tsx
│   ├── contact/
│   │   ├── ContactSection.tsx
│   │   └── ContactForm.tsx
│   ├── marketing/
│   │   ├── PromoCarousel.tsx
│   │   ├── Newsletter.tsx
│   │   ├── ExitIntentPopup.tsx
│   │   ├── QuickBook.tsx
│   │   ├── LoyaltySection.tsx
│   │   └── AnimatedStatsSection.tsx
│   ├── social/
│   │   ├── ShareWhatsapp.tsx
│   │   └── ShareButtons.tsx
│   ├── BeforeAfterSection.tsx
│   ├── WhyUsSection.tsx
│   └── index.ts
│
├── marketing/                   # Conversion & promotional (Target: ~15)
│   ├── CTABanner.tsx
│   ├── PromoCarousel.tsx
│   ├── Newsletter.tsx
│   ├── ExitIntentPopup.tsx
│   ├── QuickBook.tsx
│   ├── WhatsAppFloat.tsx
│   ├── WhatsAppShare.tsx
│   └── index.ts
│
├── admin/                      # Admin-specific (Target: ~20)
│   ├── ContentEditor.tsx       # CONSOLIDATED — was in two places
│   ├── Dashboard.tsx
│   ├── ContentManager.tsx
│   ├── MediaLibrary.tsx
│   ├── SettingsPanel.tsx
│   ├── UserManagement.tsx
│   └── index.ts
│
└── shared/                     # Shared/hybrid components (Target: ~15)
    ├── ErrorBoundary.tsx       # CONSOLIDATED
    ├── CookieConsent.tsx       # CONSOLIDATED
    ├── GA4Loader.tsx            # CONSOLIDATED
    ├── SEOHead.tsx
    ├── StructuredData.tsx
    ├── PageTransition.tsx
    └── index.ts
```

### 4.2 `lib/` — Split into 4 Groups (Target: ≤20 each)

```
lib/
├── config/                     # Configuration loading (Target: ~8)
│   ├── config.ts
│   ├── config.server.ts
│   ├── content-loader.ts
│   ├── feature-flags.ts
│   └── index.ts
│
├── auth/                       # Authentication (Target: ~10)
│   ├── client-auth.ts
│   ├── admin-auth.ts
│   ├── admin-auth-guard.ts
│   ├── otp-service.ts
│   ├── session-manager.ts
│   └── index.ts
│
├── stores/                     # Data layer (Target: ~15)
│   ├── data-store.ts
│   ├── supabase-query.ts
│   ├── supabase.ts
│   ├── file-lock.ts
│   ├── bookings-store.ts
│   ├── contacts-store.ts
│   ├── content-store.ts
│   ├── gift-cards-store.ts
│   ├── promotions-store.ts
│   ├── subscribers-store.ts
│   └── index.ts
│
├── api/                        # API utilities (Target: ~12)
│   ├── api-wrapper.ts
│   ├── seo.ts
│   ├── errors.ts
│   ├── logger.ts
│   ├── toast.ts
│   ├── blog-api.ts
│   ├── analytics.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   └── index.ts
│
├── content/                    # Content system (Target: ~15)
│   ├── content.ts              # Main content loader
│   ├── content.server.ts
│   ├── en.ts                   # English strings
│   ├── es.ts                   # Spanish strings
│   ├── tokens.ts               # Design tokens
│   ├── site.ts                 # Site config
│   ├── get-content.ts
│   ├── validate-content.ts
│   └── index.ts
│
├── hooks/                      # React hooks (Target: ~20)
│   ├── use-auth.ts
│   ├── use-booking.ts
│   ├── use-content.ts
│   ├── use-toast.ts
│   ├── use-media-query.ts
│   ├── use-local-storage.ts
│   ├── use-scroll-position.ts
│   ├── use Intersection observer variants
│   └── index.ts
│
├── payments/                    # Payment integration (Target: ~10)
│   ├── payments.ts
│   ├── pagopar.ts
│   ├── bancard.ts
│   ├── tigo-money.ts
│   └── index.ts
│
├── types/                      # Type definitions (Target: ~15)
│   ├── user.types.ts
│   ├── booking.types.ts
│   ├── content.types.ts
│   ├── payment.types.ts
│   ├── api.types.ts
│   ├── index.ts
│
├── utils/                      # Utilities (Target: ~20)
│   ├── format-currency.ts
│   ├── format-date.ts
│   ├── validate-phone.ts
│   ├── generate-slug.ts
│   ├── cn.ts                   # classname utility
│   └── index.ts
│
└── client-kit/                 # ARCHIVE — dead code, remove
```

### 4.3 `public/images/` — Ensure No Flat Overflow

```
public/images/
├── content/                    # Business content (hero, services, gallery)
├── branding/                   # Logo, watermarks, overlays
├── testimonials/               # Customer photos
├── team/                      # Staff photos
├── blog/                      # Blog post images
├── promotions/                # Promo banners
├── stats/                     # Stats icons
├── process/                   # Process step icons
├── services/                  # Service category images
│   ├── color/
│   ├── corte/
│   └── tratamiento/
├── decorative/                # Decorative elements
├── dark/                      # Dark mode variants
└── utility/                   # Placeholders, errors, loading
```

### 4.4 `content/` — Add Index Files

```
content/
├── en/
│   ├── index.json             # Enumeration of all en content files
│   └── [existing files]
├── es/
│   ├── index.json             # Enumeration of all es content files
│   └── [existing files]
├── _shared/
│   └── [existing]
├── tokens.json
├── site.json
└── CONTENT_INDEX.md          # Human-readable inventory
```

### 4.5 `docs/` — Add Master Index

```
docs/
├── index.md                   # NEW: Master TOC
├── ARCHITECTURE.md
├── API_DOC.md
├── FEATURES.md
├── TESTING_PLAN.md            # Renamed: TESTING-PLAN.md → TESTING_PLAN.md
├── TEST_COVERAGE_MATRIX.md    # Renamed: TEST-COVERAGE-MATRIX.md → TEST_COVERAGE_MATRIX.md
├── IMAGE_GUIDE.md             # Renamed: IMAGE-GUIDE.md → IMAGE_GUIDE.md
├── BRANDING_GUIDE.md          # Renamed: BRANDING-GUIDE.md → BRANDING_GUIDE.md
├── CONTENT_SCHEMA.md
├── CONTENT_TEMPLATES.md
├── CLAUDE.md                  # NEW: Agent-specific guidelines
└── [remaining docs with consistent naming]
```

---

## 5. Duplicate Resolution

| File A | File B | Resolution |
|--------|--------|------------|
| `CookieConsent.tsx` | `cookie-consent.tsx` | Delete `cookie-consent.tsx`, rename `CookieConsent.tsx` → `CookieConsent.tsx` (already correct) |
| `ErrorBoundary.tsx` | `error-boundary.tsx` | Delete `error-boundary.tsx`, use `ErrorBoundary.tsx` |
| `GA4Loader.tsx` | `ga4-loader.tsx` | Delete `ga4-loader.tsx`, use `GA4Loader.tsx` |
| `components/admin/content-editor.tsx` | `components/content-editor.tsx` | Consolidate into `components/admin/ContentEditor.tsx` |

---

## 6. Dead Code Archive

### `lib/client-kit/` — TO BE REMOVED

```
lib/client-kit/
├── db/
│   ├── index.ts               # DEAD — lint warning: unused _searchFields
│   ├── schema.ts
│   └── queries.ts
├── ui/                        # DEAD — superseded by components/ui/
├── auth/                      # DEAD — superseded by lib/auth/
├── store/                     # DEAD — superseded by lib/stores/
└── README.md                  # DEAD — outdated
```

**Action:** Archive entire `lib/client-kit/` directory to a `/_archive/` location before deletion.

---

## 7. Implementation Phases

### Phase 1: Documentation & Planning (This Document)
- [x] Write `ORGANIZATION_PLAN.md`
- [x] Define naming conventions
- [x] Map old names to new names

### Phase 2: Duplicates Resolution
- [ ] Delete resolved duplicates
- [ ] Verify build passes after each deletion
- [ ] Update all imports referencing deleted files

### Phase 3: `components/` Reorganization
- [ ] Create directory structure
- [ ] Move files to new locations with renamed files
- [ ] Update all imports
- [ ] Verify build passes

### Phase 4: `lib/` Reorganization
- [ ] Create directory structure
- [ ] Move files to new locations with renamed files
- [ ] Update all imports
- [ ] Verify build passes

### Phase 5: `content/` & `docs/` Indexes
- [ ] Create `content/en/index.json` and `content/es/index.json`
- [ ] Create `docs/index.md` master TOC
- [ ] Rename docs files to follow `SNAKE_CASE.md`

### Phase 6: Dead Code Cleanup
- [ ] Archive `lib/client-kit/` to `/_archive/lib-client-kit/`
- [ ] Verify no references to archived code

---

## 8. Naming Reference Map

### Old → New Component Names

| Old Name | New Name | New Location |
|----------|----------|--------------|
| `CookieConsent.tsx` | `CookieConsent.tsx` | `components/shared/` |
| `cookie-consent.tsx` | DELETE | — |
| `ErrorBoundary.tsx` | `ErrorBoundary.tsx` | `components/shared/` |
| `error-boundary.tsx` | DELETE | — |
| `GA4Loader.tsx` | `GA4Loader.tsx` | `components/shared/` |
| `ga4-loader.tsx` | DELETE | — |
| `content-editor.tsx` (admin) | `ContentEditor.tsx` | `components/admin/` |
| `content-editor.tsx` (root) | DELETE | — |

### Rename Candidates (Meaningfulness)

| Current Name | Suggested Name | Reason |
|--------------|----------------|--------|
| `Hero.tsx` | `HeroSection.tsx` | More descriptive, consistent with other sections |
| `Services.tsx` | `ServicesSection.tsx` | Consistent naming |
| `Testimonials.tsx` | `TestimonialsSection.tsx` | Consistent naming |
| `Gallery.tsx` | `GallerySection.tsx` | Consistent naming |
| `Contact.tsx` | `ContactSection.tsx` | Consistent naming |
| `Booking.tsx` | `BookingSection.tsx` | Consistent naming |
| `WhyUs.tsx` | `WhyUsSection.tsx` | Consistent naming |
| `Process.tsx` | `ProcessSection.tsx` | Consistent naming |
| `CTASection.tsx` | Already correct | — |
| `Loyalty.tsx` | `LoyaltySection.tsx` | Consistent naming |
| `AnimatedStats.tsx` | `AnimatedStatsSection.tsx` | Consistent naming |
| `BeforeAfter.tsx` | `BeforeAfterSection.tsx` | Consistent naming |
| `WhatsappFloat.tsx` | `WhatsAppFloat.tsx` | Proper casing |
| `ShareWhatsapp.tsx` | `ShareWhatsApp.tsx` | Proper casing |
| `GA4Loader.tsx` | `GA4Loader.tsx` | Already correct |

---

## 9. Enforcement

Add to `AGENTS.md`:

```markdown
## File Organization Rules

### Max Files Per Directory
- `components/ui/`: 25 files max
- `components/layout/`: 20 files max
- `components/sections/`: 30 files max
- `components/marketing/`: 20 files max
- `components/admin/`: 25 files max
- `lib/config/`: 15 files max
- `lib/auth/`: 15 files max
- `lib/stores/`: 20 files max
- `lib/api/`: 20 files max
- `content/`, `public/images/`, `tests/`: 40 files max

### Naming
- React components: `PascalCase.tsx`
- Utilities/hooks: `camelCase.ts`
- Test files: `name.spec.ts`
- All files: lowercase with hyphens for multi-word names

### Before Adding Files
1. Check if directory is at 50%+ of limit
2. If yes, propose grouping with existing files
3. Resolve any duplicate names before merge
```

---

## 10. Rollback Plan

If reorganization causes issues:
1. Revert git to pre-reorganization commit
2. All changes are reversible since files are moved, not modified
3. Run `npm run build` to verify
