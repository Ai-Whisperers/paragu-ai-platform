# Content Schema Documentation

## Overview

This project uses a **JSON-based content system** with full **i18n support** (Spanish `es/` and English `en/`), **feature-driven configuration**, and shared data across languages (`_shared/`).

### Architecture

- **`content/es/`** — Spanish (default, Paraguay market)
- **`content/en/`** — English (secondary market)
- **`content/_shared/`** — Cross-language shared data (team, products)
- **`content/tokens.json`** — Design tokens (palettes, typography, shadows, radii)
- **Feature flags** in `site.json` → `features` object control section visibility

### Content Update Strategy

| Source | Files | Description |
|--------|-------|-------------|
| **AI Populates** | Most content files | AI generates from business data, reviews, and service catalogs |
| **AI + Human** | `testimonials.json`, `team.json`, `blog/posts/*.json` | AI drafts, human approves/edits |
| **Human Only** | `navigation.main[]`, `business.*` | Business-provided facts |
| **Platform Auto** | `stats.json` | Platform-level statistics, not business-specific |

---

## Content Files

### `content/tokens.json`

**Purpose**: Design token definitions — color palettes, typography, border radii, shadows. Used by `@ai-whisperers/theme` to generate CSS custom properties.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| description | string | yes | Explains the file's purpose | "Design tokens defining the visual identity..." |
| palettes | object | yes | Named palette objects | See below |
| palettes.default | object | yes | Default palette with color roles | See below |
| palettes.default.primary | string | yes | Primary brand color (hex) | "#1a1a2e" |
| palettes.default.primaryForeground | string | yes | Text on primary (hex) | "#FFFFFF" |
| palettes.default.secondary | string | yes | Secondary brand color (hex) | "#e94560" |
| palettes.default.secondaryForeground | string | yes | Text on secondary | "#FFFFFF" |
| palettes.default.accent | string | yes | Accent color (hex) | "#7c3aed" |
| palettes.default.accentForeground | string | yes | Text on accent | "#FFFFFF" |
| palettes.default.background | string | yes | Page background | "#f8f9fa" |
| palettes.default.surface | string | yes | Card/surface background | "#ffffff" |
| palettes.default.surfaceMuted | string | yes | Muted surface | "#f1f3f5" |
| palettes.default.text | string | yes | Primary text color | "#1a1a1a" |
| palettes.default.textLight | string | yes | Light text | "#6b7280" |
| palettes.default.textMuted | string | yes | Muted text | "#9ca3af" |
| palettes.default.success | string | yes | Success state color | "#10B981" |
| palettes.default.error | string | yes | Error state color | "#EF4444" |
| palettes.default.warning | string | yes | Warning state color | "#F59E0B" |
| defaultPalette | string | yes | Which palette to use | "default" |
| theme | string | yes | "light" or "dark" | "light" |
| typography | object | yes | Font family and weight config | See below |
| typography.heading | string | yes | Heading font family name | "Inter" |
| typography.body | string | yes | Body font family name | "Inter" |
| typography.headingWeight | string | yes | Heading font weight | "700" |
| typography.bodyWeight | string | yes | Body font weight | "400" |
| googleFonts | array[string] | yes | Google Fonts URL for loading | ["Inter:wght@400;500;600;700"] |
| borderRadius | object | yes | Border radius tokens | See below |
| borderRadius.sm | string | yes | Small radius | "0.25rem" |
| borderRadius.md | string | yes | Medium radius | "0.5rem" |
| borderRadius.lg | string | yes | Large radius | "1rem" |
| borderRadius.xl | string | yes | Extra large radius | "1.5rem" |
| shadows | object | yes | Box shadow tokens | See below |
| shadows.sm | string | yes | Small shadow | "0 1px 2px rgba(0,0,0,0.05)" |
| shadows.md | string | yes | Medium shadow | "0 4px 6px rgba(0,0,0,0.07)" |
| shadows.lg | string | yes | Large shadow | "0 10px 15px rgba(0,0,0,0.1)" |

**Example**:
```json
{
  "palettes": {
    "default": {
      "primary": "#1a1a2e",
      "secondary": "#e94560"
    }
  },
  "defaultPalette": "default",
  "theme": "light",
  "typography": {
    "heading": "Inter",
    "body": "Inter",
    "headingWeight": "700",
    "bodyWeight": "400"
  },
  "googleFonts": ["Inter:wght@400;500;600;700"],
  "borderRadius": { "sm": "0.25rem", "md": "0.5rem", "lg": "1rem", "xl": "1.5rem" },
  "shadows": { "sm": "0 1px 2px rgba(0,0,0,0.05)", "md": "...", "lg": "..." }
}
```

**What updates this**: AI generates from brand guidelines provided by the entrepreneur. Human can override specific colors.

---

### `content/es/site.json` / `content/en/site.json`

**Purpose**: Primary business configuration — brand identity, business info, feature flags, navigation, and opening hours. The most critical content file.

#### `site` object

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| site.name | string | yes | Business display name | "ParaguAI Builder" |
| site.slug | string | yes | URL path segment | "paraguai-builder" |
| site.url | string | yes | Full website URL | "https://paragu-ai.com" |
| site.locale | string | yes | BCP47 locale tag | "es-PY" or "en-PY" |
| site.metaDescription | string | yes | SEO meta description | "Tu negocio merece estar en internet..." |

#### `business` object

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| business.phone | string | yes | Display phone number | "+595 981 000 000" |
| business.whatsapp | string | yes | WhatsApp number (digits only, no +) | "595981000000" |
| business.whatsappMessage | string | yes | Pre-filled WhatsApp message | "Hola! Quiero crear mi página web" |
| business.email | string | yes | Contact email | "hola@paragu-ai.com" |
| business.address | string | yes | Physical address | "Asunción, Paraguay" |
| business.coordinates | object | yes | Lat/lng for Google Maps | See below |
| business.coordinates.lat | number | yes | Latitude | -25.2637 |
| business.coordinates.lng | number | yes | Longitude | -57.5759 |
| business.instagram | string | no | Full Instagram URL | "https://instagram.com/paraguai" |
| business.instagramHandle | string | no | Instagram handle | "@paraguai" |
| business.currency | string | yes | ISO 4217 currency code | "PYG" |
| business.ruc | string | yes | Paraguayan tax ID | "8000000-1" |
| business.name | string | yes | Legal business name | "ParaguAI Builder" |

#### `features` object (all boolean)

Feature flags control section visibility across the site. All default to `false` unless listed.

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| features.exitIntentPopup | boolean | Exit-intent popup on first visit | false |
| features.cookieConsent | boolean | GDPR-style cookie consent banner | false |
| features.testimonialsCarousel | boolean | Animated testimonials carousel | false |
| features.promoBanner | boolean | Promotional banner | false |
| features.quickBooking | boolean | One-click booking widget | false |
| features.shareButtons | boolean | Social share buttons | false |
| features.bookingForm | boolean | Online booking form | false |
| features.gallery | boolean | Photo gallery section | false |
| features.testimonials | boolean | Testimonials section | false |
| features.team | boolean | Team members section | false |
| features.stats | boolean | Stats/metrics counter section | false |
| features.process | boolean | "How it works" process steps | false |
| features.beforeAfterSlider | boolean | Before/after transformation slider | false |
| features.ctaBanner | boolean | Call-to-action banners | false |
| features.blog | boolean | Blog section and listing | false |
| features.loyaltyProgram | boolean | Loyalty points program | false |
| features.giftCards | boolean | Gift card purchase flow | false |
| features.promotions | boolean | Promotions/offers section | false |
| features.referral | boolean | Referral "traé una amiga" system | false |
| features.clientPortal | boolean | Client dashboard / "Mi Cuenta" | false |
| features.whatsappAuth | boolean | WhatsApp OTP authentication | false |
| features.instagramLink | boolean | Instagram link in footer | false |
| features.instagramFeed | boolean | Embedded Instagram feed | false |
| features.newsletter | boolean | Newsletter subscription | false |
| features.googleMapsEmbed | boolean | Google Maps embed on contact | false |
| features.breadcrumbs | boolean | Breadcrumb navigation | false |
| features.scrollReveal | boolean | Scroll-reveal animations | false |
| features.errorBoundary | boolean | Error boundary component | false |
| features.darkMode | boolean | Dark mode toggle | false |
| features.ecommerce | boolean | Full e-commerce (products, cart, checkout) | false |
| features.products | boolean | Product catalog | false |
| features.cart | boolean | Shopping cart | false |
| features.checkout | boolean | Checkout flow | false |
| features.storeLocator | boolean | Store finder/map | false |
| features.guiaSection | boolean | Guide/similar content section | false |
| features.trabajaConNosotros | boolean | Careers/job listings section | false |

#### `navigation` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| navigation.main | array[NavItem] | yes | Primary top navigation |
| navigation.more | array[NavItem] | no | "More" dropdown items |

**NavItem shape**:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| label | string | yes | Display text | "Inicio" |
| href | string | yes | URL path | "/es" or "https://..." |
| external | boolean | no | Open in new tab | true |
| feature | string | no | Gate visibility to a feature flag | "blog" |

#### `openingHours` object

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| openingHours.mon | string | yes | Monday hours | "09:00-18:00" |
| openingHours.tue | string | yes | Tuesday hours | "09:00-18:00" |
| openingHours.wed | string | yes | Wednesday hours | "09:00-18:00" |
| openingHours.thu | string | yes | Thursday hours | "09:00-18:00" |
| openingHours.fri | string | yes | Friday hours | "09:00-18:00" |
| openingHours.sat | string | yes | Saturday hours | "09:00-13:00" |
| openingHours.sun | string | yes | Sunday hours or "closed" | "closed" |

**What updates this**: Human-provided business data. AI can suggest from a business category questionnaire.

---

### `content/es/ui.json` / `content/en/ui.json`

**Purpose**: All user-facing UI text strings — navigation labels, button text, form placeholders, error messages, section titles. Structured by component/section.

#### `nav` object

| Field | Type | Required | Description | Example (ES) | Example (EN) |
|-------|------|----------|-------------|--------------|--------------|
| nav.inicio | string | yes | Home nav label | "Inicio" | "Home" |
| nav.servicios | string | yes | Services nav label | "Servicios" | "Services" |
| nav.nosotros | string | yes | About us nav label | "Nosotros" | "About Us" |
| nav.reservar | string | yes | Book/Reserve nav label | "Reservar" | "Book Now" |
| nav.contacto | string | yes | Contact nav label | "Contacto" | "Contact" |
| nav.ofertas | string | yes | Offers nav label | "Ofertas" | "Offers" |
| nav.tarjetas | string | yes | Gift cards nav label | "Tarjetas de Regalo" | "Gift Cards" |
| nav.blog | string | yes | Blog nav label | "Blog" | "Blog" |
| nav.faq | string | yes | FAQ nav label | "FAQ" | "FAQ" |
| nav.tienda | string | yes | Store nav label | "Tienda" | "Store" |
| nav.miCuenta | string | yes | My Account nav label | "Mi Cuenta" | "My Account" |
| nav.mas | string | yes | "More" dropdown label | "Más" | "More" |

#### `hero` object

| Field | Type | Required | Description | Example (ES) | Example (EN) |
|-------|------|----------|-------------|--------------|--------------|
| hero.cta | string | yes | Primary CTA button | "Reservar Ahora" | "Book Now" |
| hero.ctaSecondary | string | yes | Secondary CTA button | "Ver Servicios" | "View Services" |

#### `booking` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| booking.title | string | yes | Booking section title |
| booking.name | string | yes | Name field placeholder |
| booking.phone | string | yes | Phone field placeholder |
| booking.service | string | yes | Service dropdown label |
| booking.date | string | yes | Date field label |
| booking.notes | string | yes | Notes textarea placeholder |
| booking.submit | string | yes | Submit button text |
| booking.success | string | yes | Success message after WhatsApp opens |
| booking.selectService | string | yes | Service dropdown placeholder |

#### `auth` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| auth.miCuentaTitle | string | yes | My Account page title |
| auth.phonePlaceholder | string | yes | Phone input placeholder |
| auth.sendCode | string | yes | Send OTP button |
| auth.enterCode | string | yes | Code entry prompt |
| auth.verify | string | yes | Verify button text |
| auth.resend | string | yes | Resend code link |
| auth.invalidCode | string | yes | Invalid code error message |
| auth.logout | string | yes | Logout button text |
| auth.loading | string | yes | Loading spinner text |
| auth.autoCreate | string | yes | Auto-account-creation notice |
| auth.openWa | string | yes | Prompt to open WhatsApp |
| auth.codeSent | string | yes | OTP sent confirmation message |

#### `loyalty` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| loyalty.title | string | yes | Program title |
| loyalty.subtitle | string | yes | Program subtitle |
| loyalty.howItWorks | string | yes | Section header |
| loyalty.earnPoints | string | yes | Points earning description |
| loyalty.redeem | string | yes | Redemption CTA |

#### `giftCards` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| giftCards.title | string | yes | Page title |
| giftCards.buy | string | yes | Buy button |
| giftCards.checkBalance | string | yes | Check balance CTA |
| giftCards.balance | string | yes | Balance label |
| giftCards.validUntil | string | yes | Expiry date label |
| giftCards.from | string | yes | "From" sender label |
| giftCards.to | string | yes | "To" recipient label |
| giftCards.message | string | yes | Message field label |
| giftCards.selectAmount | string | yes | Amount selector label |

#### `footer` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| footer.rights | string | yes | Copyright text |
| footer.privacy | string | yes | Privacy policy link text |
| footer.terms | string | yes | Terms link text |
| footer.followUs | string | yes | Social links header |

#### `errors` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| errors.required | string | yes | Field required validation |
| errors.invalidPhone | string | yes | Invalid phone number message |
| errors.serverError | string | yes | Server error message |
| errors.notFound | string | yes | 404 page message |

#### `cookies` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| cookies.message | string | yes | Cookie consent banner message |
| cookies.accept | string | yes | Accept button |
| cookies.learnMore | string | yes | Learn more link |

#### `exitIntent` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| exitIntent.title | string | yes | Popup headline |
| exitIntent.message | string | yes | Popup body text |
| exitIntent.cta | string | yes | CTA button text |
| exitIntent.dismiss | string | yes | Dismiss button text |

#### `promotions` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| promotions.title | string | yes | Section title |
| promotions.subtitle | string | yes | Section subtitle |
| promotions.validUntil | string | yes | Validity date label |
| promotions.originalPrice | string | yes | Original price label |
| promotions.shopNow | string | yes | CTA button text |

#### `gallery` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| gallery.title | string | yes | Section title |
| gallery.subtitle | string | yes | Section subtitle |

#### `testimonials` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| testimonials.title | string | yes | Section title |
| testimonials.subtitle | string | yes | Section subtitle |

#### `services` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| services.title | string | yes | Section title |
| services.subtitle | string | yes | Section subtitle |
| services.bookService | string | yes | Per-service booking button |

#### `blog` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| blog.title | string | yes | Section/page title |
| blog.subtitle | string | yes | Section subtitle |
| blog.readMore | string | yes | Read more link text |
| blog.by | string | yes | "By" author prefix |

#### `faqs` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| faqs.title | string | yes | Page title |
| faqs.subtitle | string | yes | Page subtitle |

#### `team` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| team.title | string | yes | Section title |
| team.subtitle | string | yes | Section subtitle |

#### `about` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| about.title | string | yes | Page title |
| about.subtitle | string | yes | Page subtitle |

#### `contact` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| contact.title | string | yes | Page title |
| contact.subtitle | string | yes | Page subtitle |
| contact.sendMessage | string | yes | Send message CTA |
| contact.name | string | yes | Name field label |
| contact.email | string | yes | Email field label |
| contact.subject | string | yes | Subject field label |
| contact.message | string | yes | Message textarea label |
| contact.send | string | yes | Submit button text |
| contact.success | string | yes | Success message |
| contact.address | string | yes | Address label |
| contact.hours | string | yes | Hours label |
| contact.callUs | string | yes | Phone/call label |

#### `cookieConsent` object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| cookieConsent.title | string | yes | Cookie consent dialog title |
| cookieConsent.description | string | yes | Cookie consent description |

**What updates this**: AI adapts automatically based on business type. Human can override specific strings.

---

### `content/es/hero.json` / `content/en/hero.json`

**Purpose**: Homepage hero banner with rotating slides. Each slide has a headline, subtitle, background image, CTA button, and optional badge.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| description | string | yes | File purpose description | "Slides del banner principal..." |
| title | string | yes | Fallback hero title | "Tu negocio merece estar en internet" |
| subtitle | string | yes | Fallback hero subtitle | "Páginas web profesionales..." |
| slides | array[Slide] | yes | Array of slide objects | See below |

**Slide object**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| slides[].id | string | yes | Unique slide ID | "1" |
| slides[].title | string | yes | Slide headline | "Tu negocio trabaja 24/7" |
| slides[].subtitle | string | yes | Slide sub-headline | "Mientras vos descansás..." |
| slides[].image | string | yes | Image URL (public path or absolute) | "/images-demo/hero/hero-your-business-online.png" |
| slides[].cta | string | yes | Button label | "Ver Demo" |
| slides[].badge | string | no | Optional badge text | "Para cualquier negocio" |

**What updates this**: AI generates from business value proposition and featured services.

---

### `content/es/stats.json`

**Purpose**: Animated counter statistics displayed on the homepage — businesses served, categories, cities, creation time. Platform-level metrics that build credibility.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| []._annotation | object | no | AI annotation metadata | See source |
| [].label | string | yes | Metric label | "Negocios identificados" |
| [].value | string | yes | Display value (with suffix) | "7,463+" |
| [].icon | string | yes | Lucide icon name | "building" |

**Example**:
```json
[
  { "label": "Negocios identificados", "value": "7,463+", "icon": "building" },
  { "label": "Sin presencia web", "value": "75%", "icon": "globe" }
]
```

**What updates this**: Platform-level stats auto-generated. Business can override with specific numbers.

---

### `content/es/testimonials.json` / `content/en/testimonials.json`

**Purpose**: Customer testimonials with ratings, photos, and service context. Displayed in a carousel on the homepage.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| []._annotation | object | no | AI annotation metadata | See source |
| [].id | string | yes | Unique testimonial ID | "1" |
| [].name | string | yes | Reviewer full name | "María González" |
| [].text | string | yes | Full testimonial text | "Pensaba que con WhatsApp alcanzaba..." |
| [].rating | number | yes | Star rating (1-5) | 5 |
| [].image | string | yes | Avatar image URL (Unsplash or uploaded) | "https://images.unsplash.com/..." |
| [].date | string | yes | Review date (ISO 8601) | "2026-05-20" |
| [].color | string | yes | Accent color for card | "blue" |
| [].initials | string | yes | Name initials for fallback avatar | "MG" |
| [].service | string | yes | Service type / business category | "Peluquería" |
| [].stars | number | yes | Number of filled stars | 5 |
| [].quote | string | yes | Short highlight quote | "De repente tenía clientas nuevas..." |

**What updates this**: AI generates first-pass from Google Business reviews and WhatsApp feedback. Human approves/edits.

---

### `content/es/gallery.json` / `content/en/gallery.json`

**Purpose**: Photo grid showcasing work. Tags enable filtering. Images display in a masonry or grid layout.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| []._annotation | object | no | AI annotation metadata | See source |
| [].id | string | yes | Unique image ID | "1" |
| [].src | string | yes | Image URL (public path) | "/images-demo/opportunity/opportunity-24-7.png" |
| [].alt | string | yes | Alt text for accessibility | "Negocio con reservas online..." |
| [].tags | array[string] | yes | Filter tags | ["reservas", "online"] |

**What updates this**: AI selects best images from provided photos. Tags auto-generated via image recognition.

---

### `content/es/reasons.json` / `content/en/reasons.json`

**Purpose**: "Why you need a website" benefit cards addressing the "I already have WhatsApp" objection. 6 cards with icons.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| []._annotation | object | no | AI annotation metadata | See source |
| [].title | string | yes | Card headline | "Tus clientes te buscan en Google" |
| [].desc | string | yes | Card body text | "El 70% de los paraguayos busca..." |
| [].icon | string | yes | Lucide icon name | "search" |

**What updates this**: Platform-level, applies to all businesses. Order optimized by business category.

---

### `content/es/faqs.json` / `content/en/faqs.json`

**Purpose**: Accordion-style FAQ entries on `/faq` page. Structured Q&A.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| []._annotation | object | no | AI annotation metadata | See source |
| [].id | string | yes | Unique FAQ ID | "1" |
| [].question | string | yes | Question text | "¿Cómo reservo una cita?" |
| [].answer | string | yes | Answer text | "Podés reservar por WhatsApp..." |

**What updates this**: AI generates from 5 most common WhatsApp questions provided by business.

---

### `content/es/cta.json` / `content/en/cta.json`

**Purpose**: Full-width CTA banners — 2 variants (primary brand, secondary demo) on homepage and service pages.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| []._annotation | object | no | AI annotation metadata | See source |
| [].id | string | yes | Unique CTA ID | "1" |
| [].title | string | yes | Banner headline | "Tu negocio merece estar online" |
| [].subtitle | string | yes | Banner sub-headline | "Creá tu página web profesional..." |
| [].buttonText | string | yes | CTA button label | "Empezar Gratis" |
| [].buttonLink | string | yes | CTA destination URL | "/es" or external URL |
| [].background | string | yes | Background style variant | "primary" or "secondary" |

**What updates this**: AI generates from primary conversion goal (bookings / enquiries / demo requests).

---

### `content/es/process.json` / `content/en/process.json`

**Purpose**: 3-step "how it works" process shown on homepage. Removes friction by making the signup feel effortless.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| []._annotation | object | no | AI annotation metadata | See source |
| [].id | string | yes | Step ID | "1" |
| [].title | string | yes | Step headline | "Elegí tu tipo de negocio" |
| [].desc | string | yes | Step description | "Pelquería, restaurante, taller..." |

**What updates this**: AI customizes step titles/descriptions per industry. Human confirms business type.

---

### `content/es/before-after.json` / `content/en/before-after.json`

**Purpose**: Side-by-side transformation cards — "before" (problem) and "after" (solution). Displayed on homepage to trigger emotional commitment.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| []._annotation | object | no | AI annotation metadata | See source |
| [].id | string | yes | Card ID | "1" |
| [].beforeTitle | string | yes | Problem headline | "WhatsApp saturado..." |
| [].beforeDesc | string | yes | Problem description | "Mensajes mezclados..." |
| [].afterTitle | string | yes | Solution headline | "Reservas organizadas..." |
| [].afterDesc | string | yes | Solution description | "Booking automático..." |
| [].image | string | yes | Image URL | "/images-demo/opportunity/opportunity-more-than-whatsapp.png" |

**What updates this**: AI generates "before" from common WhatsApp complaints. Human provides 2-3 scenarios.

---

### `content/_shared/team.json`

**Purpose**: Team members with names, roles, bios, photos, and social links. Shared across ES and EN sites (in `_shared/`).

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| description | string | yes | File purpose description | "Team members data..." |
| team | array[Member] | yes | Array of team members | See below |

**Member object**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| team[].id | string | yes | Unique member ID | "1" |
| team[].name | string | yes | Full name | "Tu Emprendedor" |
| team[].role | string | yes | Job title / role | "Fundador y Director" |
| team[].bio | string | yes | 1-2 sentence bio | "Más de 8 años ayudando..." |
| team[].image | string | yes | Photo URL | "https://images.unsplash.com/..." |
| team[].instagram | string | no | Instagram profile URL | "https://instagram.com/..." |
| team[].specialties | array[string] | yes | 2-4 specialty keywords | ["Consultoría", "Estrategia"] |

**What updates this**: Human provides names, roles, bios, photos. AI formats and optimizes images.

---

### `content/_shared/products.json`

**Purpose**: E-commerce product catalog with prices in PYG, images, categories. Drives online store functionality.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| description | string | yes | File purpose description | "E-commerce product catalog..." |
| products | array[Product] | yes | Array of products | See below |

**Product object**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| products[].id | string | yes | Unique product ID | "1" |
| products[].name | string | yes | Product name | "Kit de Emprendedor" |
| products[].description | string | yes | Full description | "Todo lo que necesitás para empezar..." |
| products[].price | number | yes | Price in PYG (integer, no decimals) | 150000 |
| products[].image | string | yes | Product image URL | "/images/products/kit.png" |
| products[].category | string | yes | Category slug | "recursos" |
| products[].featured | boolean | yes | Show on featured section | true |

**What updates this**: AI populates from entrepreneur's inventory or service catalog.

---

### `content/es/services/index.json` / `content/en/services/index.json`

**Purpose**: Services landing page with category cards — each card links to a service category and has an icon/color.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| description | string | yes | File purpose description | "Página principal de servicios..." |
| title | string | yes | Page title | "Funcionalidades que vienen con tu página" |
| subtitle | string | yes | Page subtitle | "Todo lo que tu negocio necesita..." |
| categories | array[Category] | yes | Service category cards | See below |

**Category object**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| categories[].id | string | yes | Category slug | "reservas" |
| categories[].title | string | yes | Category name | "Reservas Online" |
| categories[].description | string | yes | Category description | "Clientes reservan cuando quieren..." |
| categories[].icon | string | yes | Lucide icon name | "calendar" |
| categories[].color | string | yes | Tailwind color class | "blue" |

---

### `content/es/services/categories/*.json`

Service category detail files under `content/es/services/categories/`:

#### `asesoria.json` (Consulting Services)

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| description | string | yes | Category description | "Servicios de asesoría personalizada..." |
| id | string | yes | Category slug | "asesoria" |
| title | string | yes | Category title | "Asesorías" |
| description | string | yes | Category description | "Sesiones personalizadas para evaluar..." |
| icon | string | yes | Lucide icon name | "briefcase" |
| color | string | yes | Tailwind color class | "blue" |
| items | array[ServiceItem] | yes | Array of services | See below |

**ServiceItem object**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| items[].name | string | yes | Service name | "Consultoría Inicial" |
| items[].price | number | yes | Price in PYG | 150000 |
| items[].duration | number | yes | Duration in minutes | 60 |
| items[].popular | boolean | yes | Show "popular" badge | true |
| items[].desc | string | yes | Service description | "Primera sesión para evaluar..." |

#### `cursos.json` (Courses & Workshops)

Same structure as `asesoria.json` — `id: "cursos"`, `title: "Cursos y Talleres"`, `icon: "book"`, `color: "green"`.

#### `productos.json` (Digital Products)

Same structure as `asesoria.json` — `id: "productos"`, `title: "Productos Digitales"`, `icon: "download"`, `color: "purple"`.

Note: `productos.json` items have `duration: 0` (instant download, no session time).

---

### `content/es/promotions/index.json` / `content/en/promotions/index.json`

**Purpose**: Promotions listing page metadata.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| description | string | yes | File purpose description | "Sección principal de promociones..." |
| title | string | yes | Page title | "Ofertas" |
| subtitle | string | yes | Page subtitle | "Precios accesibles..." |

---

### `content/es/promotions/promo-*.json`

**Purpose**: Individual promotion cards with pricing, validity, and feature lists.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| _annotation | object | no | AI annotation metadata | See source |
| description | string | yes | File purpose description | "Promoción individual con título..." |
| id | string | yes | Promotion ID | "1" |
| title | string | yes | Promotion headline | "Coloración Completa + Tratamiento" |
| subtitle | string | yes | Promotion sub-headline | "Tinte + corte + hidratación..." |
| originalPrice | number | yes | Original price in PYG | 350000 |
| price | number | yes | Discounted price in PYG | 280000 |
| badge | string | yes | Savings badge text | "Ahorrá G. 70.000" |
| validUntil | string | yes | Expiry date (ISO 8601) | "2026-06-30" |
| image | string | yes | Promotion image URL | "https://images.unsplash.com/..." |
| cta | string | yes | CTA button text | "Reservar Ahora" |
| features | array[string] | yes | Included items list | ["Tinte profesional Wella", "Corte Incluido"] |

**What updates this**: Human tells AI the offer (package, discount %, validity). AI generates the full card.

---

### `content/es/gift-cards/index.json` / `content/en/gift-cards/index.json`

**Purpose**: Gift cards section metadata.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| description | string | yes | File purpose description | "Sección de tarjetas de regalo..." |
| title | string | yes | Page title | "Tarjetas de Regalo" |
| subtitle | string | yes | Page subtitle | "El regalo perfecto para alguien..." |

---

### `content/es/gift-cards/cards.json` / `content/en/gift-cards/cards.json`

**Purpose**: Gift card product offerings — 3 tiers (Basic, Professional, Premium) with PYG prices.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| []._annotation | object | no | AI annotation metadata | See source |
| [].id | string | yes | Card ID | "1" |
| [].title | string | yes | Display title | "Gift Card Básico" |
| [].name | string | yes | Full name | "Gift Card Básico" |
| [].price | number | yes | Price in PYG | 100000 |
| [].desc | string | yes | Description/scope | "Perfecto para una consulta inicial..." |
| [].image | string | yes | Card image URL | "/images/giftcards/giftcard-1.png" |
| [].icon | string | yes | Lucide icon name | "gift" |

**What updates this**: AI calculates card amounts from price range. Human confirms.

---

### `content/es/loyalty/index.json` / `content/en/loyalty/index.json`

**Purpose**: Loyalty program section metadata.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| description | string | yes | File purpose description | "Programa de lealtad con descripción..." |
| title | string | yes | Program title | "Programa de Lealtad" |
| subtitle | string | yes | Program subtitle | "Acumulá puntos con cada servicio..." |

---

### `content/es/loyalty/tiers.json` / `content/en/loyalty/tiers.json`

**Purpose**: Loyalty program tier definitions — Bronze/Silver/Gold with points thresholds and benefits.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| []._annotation | object | no | AI annotation metadata | See source |
| [].name | string | yes | Tier internal name (lowercase) | "bronce" |
| [].label | string | yes | Tier display name | "Bronce" |
| [].points | number | yes | Points threshold to reach tier | 0 |
| [].benefits | array[string] | yes | List of tier benefits | ["1 punto por cada G. 10.000..."] |

**Example** (es):
```json
[
  { "name": "bronce", "label": "Bronce", "points": 0, "benefits": ["1 punto por cada G. 10.000...", "5% off en tu tercera visita"] },
  { "name": "plata", "label": "Plata", "points": 80, "benefits": [...] },
  { "name": "oro", "label": "Oro", "points": 200, "benefits": [...] }
]
```

**What updates this**: AI calculates points thresholds from average transaction value. Human confirms.

---

### `content/es/blog/index.json` / `content/en/blog/index.json`

**Purpose**: Blog listing page metadata.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| description | string | yes | File purpose description | "Sección del blog con metadatos..." |
| title | string | yes | Page title | "Blog" |
| subtitle | string | yes | Page subtitle | "Consejos, estrategias y novedades..." |

---

### `content/es/blog/posts/*.json`

**Purpose**: Individual blog post articles with full content, metadata, and tags.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| id | string | yes | Post ID (numeric string) | "1" |
| title | string | yes | Post title | "5 Pasos para Comenzar tu Emprendimiento..." |
| slug | string | yes | URL slug (kebab-case) | "comenzar-emprendimiento" |
| excerpt | string | yes | Short excerpt for card/preview | "Todo lo que necesitás saber para formalizar..." |
| image | string | yes | Featured image URL | "/images/blog/emprendimiento.png" |
| date | string | yes | Publication date (ISO 8601) | "2026-03-01" |
| author | string | yes | Author display name | "Tu Emprendimiento" |
| category | string | yes | Post category | "Emprendimiento" |
| tags | array[string] | yes | Searchable/filterable tags | ["paraguay", "negocios", "inicio"] |
| content | string | yes | Full post body (markdown-ish) | "Emprender en Paraguay puede parecer..." |

**What updates this**: Human provides topic and source material. AI drafts the article. Human approves.

---

## Field Type Reference

| Type | Used In | Notes |
|------|---------|-------|
| `string` | All files | Text content, URLs, slugs, IDs |
| `number` | `products.json`, `services/categories/*.json`, `promotions/promo-*.json` | Prices in PYG (integer), duration in minutes, points thresholds |
| `boolean` | `site.json` → `features`, `products[].featured`, `services/categories/*[].popular` | Feature flags and boolean flags |
| `array[string]` | `navigation.more[]`, `reasons[].tags`, `testimonials[].specialties`, `loyalty/tiers[].benefits`, `blog/posts/*.tags` | Flat string arrays |
| `array[object]` | `hero.slides`, `stats[]`, `testimonials[]`, `gallery[]`, `reasons[]`, `faqs[]`, `cta[]`, `process[]`, `beforeAfter[]`, `team[]`, `products[]`, `gift-cards/cards[]`, `loyalty/tiers[]` | Array of structured objects |
| `object` | `site`, `business`, `business.coordinates`, `features`, `navigation` | Nested config objects |

---

## File Update Matrix

| File | AI Populates | Human Provides | Shared |
|------|-------------|----------------|--------|
| `tokens.json` | Yes (from brand guidelines) | Color overrides | N/A |
| `es/site.json` / `en/site.json` | Partial (features config) | Business facts, nav | No |
| `es/ui.json` / `en/ui.json` | Yes (auto-adapt) | String overrides | No |
| `es/hero.json` / `en/hero.json` | Yes (value prop) | Goal confirmation | No |
| `es/stats.json` | Yes (platform stats) | Override numbers | No |
| `es/testimonials.json` | Yes (draft) | Approve/edit | No |
| `es/gallery.json` | Yes (select + tag) | Photos | No |
| `es/reasons.json` | Yes (ordered) | No input needed | No |
| `es/faqs.json` | Yes (from top questions) | 5 common questions | No |
| `es/cta.json` | Yes (from goal) | Confirm conversion goal | No |
| `es/process.json` | Yes (customized) | Confirm business type | No |
| `es/before-after.json` | Yes (from complaints) | 2-3 scenarios | No |
| `_shared/team.json` | Partial (format, optimize) | Names, roles, bios, photos | Yes |
| `_shared/products.json` | Yes | Inventory list | Yes |
| `es/services/index.json` | Yes | Business type | No |
| `es/services/categories/*.json` | Yes | 4-6 services with prices | No |
| `es/promotions/index.json` | Yes | — | No |
| `es/promotions/promo-*.json` | Yes | Offer details, validity | No |
| `es/gift-cards/index.json` | Yes | — | No |
| `es/gift-cards/cards.json` | Yes | Price range confirmation | No |
| `es/loyalty/index.json` | Yes | — | No |
| `es/loyalty/tiers.json` | Yes | Average price, tier count | No |
| `es/blog/index.json` | Yes | — | No |
| `es/blog/posts/*.json` | Yes (draft) | Topic + source material | No |
