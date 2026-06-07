# IMAGE GUIDE — Belleza Studio

## Table of Contents
1. [Image Strategy Overview](#1-image-strategy-overview)
2. [Unified Prompt Architecture](#2-unified-prompt-architecture)
3. [Brand Photography Standards](#3-brand-photography-standards)
4. [Image Inventory & Specifications](#4-image-inventory--specifications)
5. [Image Prompt Library](#5-image-prompt-library)
6. [Technical Specifications](#6-technical-specifications)
7. [Usage Guidelines](#7-usage-guidelines)

---

## 1. Image Strategy Overview

### Photography Approach
**"Warm Editorial Beauty"** — Professional beauty editorial photography with a Latin American warmth. Think Vogue Beauty/Allure editorial quality but accessible and authentic to Asunción.

### Key Principles
1. **Transformation is the hero** — Before/after imagery central to brand
2. **Real women, not models** — Authentic Paraguayan/Latin American faces and hair types
3. **Warmth over clinical** — Soft, welcoming, aspirational but not cold or unattainable
4. **Service showcase** — Each image clearly communicates a service or benefit
5. **Text-friendly** — Negative space for overlay text on hero images

### Image Categories by Function

| Category | Purpose | Style | Count |
|----------|---------|-------|-------|
| **Hero** | First impression, emotional hook | Full-bleed, aspirational, text-friendly | 3 |
| **Services** | Showcase each service type | Product-focused, warm lighting | 12 |
| **Process** | How the booking/treatment works | Documentary, friendly | 4 |
| **Gallery** | Portfolio of work | Best-of showcase, varied | 12 |
| **Before/After** | Transformation proof | Split or paired, dramatic | 8 |
| **Testimonials** | Social proof | Portrait, warm, trusting | 10 |
| **Team** | Human connection | Professional but warm | 5 |
| **Stats** | Credibility via numbers | Clean, iconic | 5 |
| **Reasons** | Why choose us | Varied, benefit-focused | 6 |
| **Blog** | Article thumbnails | Thematic, readable at small sizes | 10 |
| **Promotions** | Offer communication | Urgency, clear, branded | 9 |
| **CTA/Banners** | Conversion prompts | Bold, action-oriented | 5 |
| **Contact** | Location & trust | Welcoming, professional | 4 |
| **Branding** | Logo-area visuals | Cohesive, branded | 8 |
| **Decorative** | Backgrounds & fills | Subtle, non-distracting | 10 |
| **Utility** | UI elements & placeholders | Clean, functional | 10 |
| **Dark Mode** | Dark theme variants | Same content, darker treatment | 8 |

**TOTAL: 143 images** (consolidated from original 200 — removes duplicates and non-essential)

---

## 2. Unified Prompt Architecture

### Prompt Structure

```
[SUBJECT] + [ACTION/STATE] + [SETTING/BACKGROUND] + [LIGHTING] + [STYLE] + [TECHNICAL]
```

### Prompt Components

**SUBJECT** (choose one primary focus):
- Woman receiving hair service (coloring, cutting, treatment)
- Close-up of hair (color, shine, texture, style)
- Hands working on hair
- Salon interior/equipment
- Transformation (before states, after results)
- Portrait of team member
- Happy client with result

**ACTION/STATE** (be specific):
- Sitting in salon chair getting color applied
- Looking at camera with beautiful hair result
- Receiving a consultation
- Enjoying the transformation reveal
- Working/helping client

**SETTING**:
- Modern Asunción beauty studio with warm lighting
- Neutral warm background (no stark white)
- Editorial beauty shoot setup
- Clean but warm interior

**LIGHTING** (critical for beauty):
- "Soft diffused professional beauty lighting, warm tone"
- "Flattering, even lighting with subtle warmth"
- "Key light with fill, no harsh shadows"
- "Beauty editorial softbox setup"

**STYLE**:
- "Professional beauty editorial photography"
- "Warm color grade, rich contrast"
- "Shallow depth of field, subject sharp"
- "Vogue Beauty/Allure aesthetic"
- "Paraguayan/Latin American beauty, medium warm skin tones"

**TECHNICAL** (for AI generation):
- "Photorealistic, 8K quality"
- "No anime, no illustration, no stock photo feel"
- "Subject centered, clean negative space for text"
- "Aspect ratio 16:9 for hero, 1:1 for portraits, 4:3 for gallery"

### Lighting Formulas by Use Case

| Use Case | Lighting Prompt Addition |
|----------|--------------------------|
| Hero images | "Soft window light with warm fill, no harsh shadows, subject well-lit" |
| Close-up hair | "Ring light setup, maximum hair shine, even exposure" |
| Portraits | "Butterfly lighting or beauty dish, soft shadows, flattering" |
| Interior | "Ambient with accent lights, warm overall temperature" |
| Before/After | "Consistent lighting between pairs, slight side angle for dimension" |

### Composition Formulas

**HERO (text overlay):**
```
Wide shot, subject in lower 2/3, upper 1/3 negative space for text
Camera: 35mm equivalent, f/2.8
Negative space: 40% of frame for text overlay
```

**SERVICE (product focus):**
```
Medium shot, hair/service centered, subtle background
Camera: 85mm equivalent, f/1.8-2.8
Headroom: minimal, hair fills frame
```

**PORTRAIT (testimonial/team):**
```
Headshot to 3/4 body, eye-level camera
Camera: 50-85mm equivalent, f/1.8-2.0
Background: warm neutral gradient, not distracting
Eyes: Catchlights essential
```

**GALLERY (portfolio):**
```
Full shot or full body for transformations
Camera: 35-50mm equivalent, f/2.8-4.0
Include environment context
```

---

## 3. Brand Photography Standards

### What WE Shoot (In-Scope)

✅ **Services:**
- Hair coloring (balayage, highlights, tinte, ombré)
- Haircuts (all genders, all ages)
- Treatments (keratina, botox, hidratación)
- Nails (esculpidas, semipermanent, designs)
- Eyebrows (russian design, shaping)
- Bridal (updos, makeup, trials)

✅ **Transformations:**
- Before/after color
- Before/after cut
- Before/after treatment
- Makeover reveals

✅ **Studio/atmosphere:**
- Salon interior
- Product shots (Wella, Schwarzkopf, Olaplex)
- Equipment (scissors, brushes, dryers)
- Client experience moments

✅ **Portraits:**
- Team professional portraits
- Happy client portraits with results
- Stylist in action

✅ **Lifestyle:**
- Woman enjoying her beauty moment
- Confidence transformation
- Self-care moments

### What We DON'T Shoot (Out-of-Scope)

❌ **Not appropriate:**
- Revealing or sexualized imagery
- Underage subjects
- Stock photo "posed" looks
- Overly filtered/edited appearances
- Clinical/medical procedures
- Generic "beauty stock" with no personality

### Color Grading Standards

**Light Mode Images:**
- Base: Natural exposure, accurate colors
- Warm shift: +10-15 warmth in highlights
- Skin tones: Warm, healthy, natural (not orange/gray)
- Contrast: Rich but not crushed (shadows visible, not black)
- Saturation: Natural, slight boost on hair color vibrancy

**Dark Mode Images:**
- Same composition, darker background
- Adjusted exposure: -1 to -1.5 stops
- Shadow detail preserved (not pure black)
- Accent lighting more prominent
- Color: Same warmth, slightly more saturation to compensate for darker frame

**Brand Color Overlay Treatment:**
- When used as hero with text overlay:
  - Subtle gradient overlay: `rgba(26, 26, 46, 0.3)` to transparent (for navy brand)
  - OR subtle warm vignette: `rgba(233, 69, 96, 0.1)` in corners

---

## 4. Image Inventory & Specifications

### HERO IMAGES (3)

| # | Image Name | Purpose | Aspect | Mood | Key Elements |
|---|------------|---------|--------|------|---------------|
| H1 | `hero-color-expertise.png` | Color leadership | 16:9 | Warm, aspirational | Woman with beautiful balayage result, warm studio lighting, upper negative space |
| H2 | `hero-transformation.png` | Transformation proof | 16:9 | Dramatic, confident | Before/after composite OR stunning after shot with client confidence |
| H3 | `hero-studio-experience.png` | Studio atmosphere | 16:9 | Inviting, premium | Salon interior with stylist working, client relaxed, warm lighting |

### SERVICE IMAGES (12)

#### Corte / Haircuts (4)
| # | Filename | Subject | Composition |
|---|----------|---------|-------------|
| S1 | `service-corte-dama.png` | Woman with fresh haircut, styled | Medium close-up, hair fills frame, warm background |
| S2 | `service-corte-caballero.png` | Man getting haircut | Side angle, scissors in hand, professional setting |
| S3 | `service-corte-nina.png` | Child getting first haircut | Friendly, colorful, parent present |
| S4 | `service-corte-senior.png` | Senior with elegant cut | Warm, dignified, natural setting |

#### Color / Coloring (4)
| # | Filename | Subject | Composition |
|---|----------|---------|-------------|
| S5 | `service-color-balayage.png` | Fresh balayage result | Full hair shot, dimension visible, warm lighting |
| S6 | `service-color-tinte.png` | Tinte application | In-action shot, foil highlights, professional |
| S7 | `service-color-mechas.png` | Highlights result | Close-up of dimension, shine visible |
| S8 | `service-color-ombre.png` | Ombré result | Gradient visible, styled, movement in hair |

#### Tratamiento / Treatments (4)
| # | Filename | Subject | Composition |
|---|----------|---------|-------------|
| S9 | `service-keratina-result.png` | Silky smooth hair after keratina | Close-up of shine and texture, product visible |
| S10 | `service-botox-result.png` | Hair after botox treatment | Smooth, hydrated look, healthy shine |
| S11 | `service-hidratacion.png` | Deep hydration treatment | Damaged to restored composite OR single after |
| S12 | `service-tratamiento-general.png` | Treatment products + process | Wella/Olaplex products, professional context |

### PROCESS IMAGES (4)
| # | Filename | Step | Composition |
|---|----------|------|-------------|
| P1 | `process-reserva.png` | Reservation/Booking | Phone with WhatsApp open OR calendar interface |
| P2 | `process-consulta.png` | Consultation | Stylist consulting with client, mirror/visual aids |
| P3 | `process-servicio.png` | Service in progress | Stylist working, client comfortable, action shot |
| P4 | `process-resultado.png` | Enjoying result | Client with final look, satisfaction, mirror moment |

### GALLERY IMAGES (12)
| # | Filename | Category | Subject |
|---|----------|----------|---------|
| G1 | `gallery-color-1.png` | Color | Balayage portfolio shot |
| G2 | `gallery-color-2.png` | Color | Bold color transformation |
| G3 | `gallery-corte-1.png` | Corte | Modern haircut result |
| G4 | `gallery-corte-2.png` | Corte | Textured layers result |
| G5 | `gallery-tratamiento-1.png` | Treatment | Keratina before/after |
| G6 | `gallery-tratamiento-2.png` | Treatment | Restoration result |
| G7 | `gallery-uñas-1.png` | Nails | Nail art/design showcase |
| G8 | `gallery-uñas-2.png` | Nails | French tip/semipermanent |
| G9 | `gallery-cejas-1.png` | Cejas | Russian brow design |
| G10 | `gallery-cejas-2.png` | Cejas | Brow shaping result |
| G11 | `gallery-novias-1.png` | Novias | Bridal updo |
| G12 | `gallery-novias-2.png` | Novias | Bridal makeup |

### BEFORE/AFTER IMAGES (8)
| # | Filename | Transformation | Treatment |
|---|----------|---------------|-----------|
| BA1 | `beforeafter-color-1.png` | Faded to vibrant color | Color correction |
| BA2 | `beforeafter-color-2.png` | Gray coverage to unified tone | Full color |
| BA3 | `beforeafter-corte-1.png` | Uneven to precise cut | Layered haircut |
| BA4 | `beforeafter-corte-2.png` | No shape to modern style | Textured cut |
| BA5 | `beforeafter-keratina-1.png` | Frizzy to smooth | Keratina treatment |
| BA6 | `beforeafter-keratina-2.png` | Damaged to silky | Keratina |
| BA7 | `beforeafter-uñas-1.png` | Broken to beautiful nails | Nail sculpt |
| BA8 | `beforeafter-general-1.png` | Complete makeover | Multiple services |

### TESTIMONIAL PORTRAITS (10)
| # | Filename | Persona | Style |
|---|----------|---------|-------|
| T1 | `testimonial-portrait-1.png` | Woman 30s, professional | Warm smile, rose background tint |
| T2 | `testimonial-portrait-2.png` | Woman 40s, executive | Confident, violet tint |
| T3 | `testimonial-portrait-3.png` | Young woman 20s, student | Fresh, natural, sky blue tint |
| T4 | `testimonial-portrait-4.png` | Mother of bride | Elegant, amber tint |
| T5 | `testimonial-portrait-5.png` | Business woman | Professional, rose tint |
| T6 | `testimonial-portrait-6.png` | Creative professional | Artistic vibe, violet tint |
| T7 | `testimonial-portrait-7.png` | Regular client | Loyal client warmth |
| T8 | `testimonial-portrait-8.png` | First-time visitor | Excited newcomer |
| T9 | `testimonial-group-1.png` | Group of friends | Social proof, multiple faces |
| T10 | `testimonial-transformation-1.png` | Client with result | Full shot with hair result |

### TEAM IMAGES (5)
| # | Filename | Role | Style |
|---|----------|------|-------|
| TM1 | `team-group-photo.png` | Full team | Group shot, studio background, warm lighting |
| TM2 | `team-lead-stylist.png` | Lead colorist | Executive portrait, professional |
| TM3 | `team-stylist-corte.png` | Cut specialist | Action shot working |
| TM4 | `team-stylist-color.png` | Colorist | Portrait with color tools |
| TM5 | `team-nail-tech.png` | Nail technician | Portrait with nail work |

### STATS ICONS (5)
| # | Filename | Stat | Visual |
|---|----------|------|--------|
| ST1 | `stats-anos.png` | 10+ years | Calendar icon with star |
| ST2 | `stats-clientes.png` | 3,500+ clients | People group icon |
| ST3 | `stats-servicios.png` | 12,000+ services | Star/burst icon |
| ST4 | `stats-rating.png` | 4.9 stars | Star rating visual |
| ST5 | `stats-location.png` | Asunción | Map pin icon |

### REASONS/BENEFITS (6)
| # | Filename | Benefit | Visual |
|---|----------|---------|--------|
| R1 | `reasons-productos.png` | Professional products | Wella/Schwarzkopf products with stylist |
| R2 | `reasons-atencion.png` | Personalized attention | Consultant with client, listening |
| R3 | `reasons-ambiente.png` | Premium environment | Salon interior, comfortable setting |
| R4 | `reasons-precios.png` | Fair pricing | Transparent pricing visual, no hidden |
| R5 | `reasons-pago.png` | Easy payment | Multiple payment options shown |
| R6 | `reasons-garantia.png` | Satisfaction guarantee | Happy client with result, confidence |

### BLOG THUMBNAILS (10)
| # | Filename | Topic | Visual Concept |
|---|----------|-------|---------------|
| B1 | `blog-color-trends-2026.png` | Color trends 2026 | Hair color swatches/ Inspiration board |
| B2 | `blog-balayage-guide.png` | Balayage guide | Before/after balayage |
| B3 | `blog-keratina-care.png` | Keratina aftercare | Silky hair with products |
| B4 | `blog-bridal-prep.png` | Bridal preparation | Bridal hair trial |
| B5 | `blog-nail-art-ideas.png` | Nail art ideas | Nail designs grid |
| B6 | `blog-brow-shaping.png` | Brow shaping | Before/after brows |
| B7 | `blog-summer-hair.png` | Summer hair care | Beach/lifestyle hair |
| B8 | `blog-color-maintenance.png` | Color maintenance | Vibrant color maintenance tips |
| B9 | `blog-first-visit.png` | First-time guide | New client welcome visual |
| B10 | `blog-seasonal-looks.png` | Seasonal looks | Fashion-forward hair |

### PROMOTIONS (9)
| # | Filename | Offer | Composition |
|---|----------|-------|-------------|
| PR1 | `promo-color-package.png` | Color + treatment package | Before/after with price overlay |
| PR2 | `promo-bridal-package.png` | Bridal package | Bridal look with pricing |
| PR3 | `promo-referral.png` | Refer a friend | Two women, gift card visual |
| PR4 | `promo-seasonal.png` | Seasonal special | Limited time offer visual |
| PR5 | `promo-first-visit.png` | First visit discount | New client welcome visual |
| PR6 | `promo-package-3.png` | 3-service package | Service combination visual |
| PR7 | `promo-membership.png` | Monthly membership | Loyalty program visual |
| PR8 | `promo-gift-card-holiday.png` | Gift card | Elegant gift card design |
| PR9 | `promo-reveal.png` | Surprise offer | Mystery/reveal visual |

### CTA BANNERS (5)
| # | Filename | Action | Style |
|---|----------|--------|-------|
| CT1 | `cta-book-now.png` | Book appointment | Bold, WhatsApp green |
| CT2 | `cta-view-services.png` | View services | Navy + coral accent |
| CT3 | `cta-special-offer.png` | View offers | Urgency, countdown |
| CT4 | `cta-before-after.png` | See transformations | Before/after preview |
| CT5 | `cta-branded-general.png` | General brand | Clean, all services |

### CONTACT/LOCATION (4)
| # | Filename | Purpose | Visual |
|---|----------|---------|--------|
| C1 | `contact-exterior.png` | Studio exterior | Clean storefront, welcoming |
| C2 | `contact-interior.png` | Studio interior | Warm, professional atmosphere |
| C3 | `contact-parking.png` | Parking info | Parking lot entrance |
| C4 | `contact-team-greeting.png` | Friendly welcome | Team greeting client |

### BRANDING ELEMENTS (8)
| # | Filename | Purpose | Style |
|---|----------|---------|-------|
| BR1 | `brand-hero-bg-1.png` | Hero background | Gradient/textured |
| BR2 | `brand-hero-bg-2.png` | Hero background | Subtle pattern |
| BR3 | `brand-overlay-dark.png` | Dark overlay | For text over images |
| BR4 | `brand-overlay-light.png` | Light overlay | For dark backgrounds |
| BR5 | `brand-texture-1.png` | Texture | Subtle fabric/grain |
| BR6 | `brand-divider-floral.png` | Decorative divider | Floral accent |
| BR7 | `brand-logo-area.png` | Logo placement | Clean area with logo |
| BR8 | `brand-watermark.png` | Watermark | Subtle brand stamp |

### DECORATIVE IMAGES (10)
| # | Filename | Purpose | Visual |
|---|----------|---------|--------|
| D1 | `decorative-hair-swave.png` | Background element | Beautiful hair wave |
| D2 | `decorative-color-splash.png` | Abstract color | Hair color abstract art |
| D3 | `decorative-salon-equipment.png` | Equipment | Scissors, brushes, styling |
| D4 | `decorative-product-flat.png` | Products flatlay | Wella/Olaplex flatlay |
| D5 | `decorative-light-kit.png` | Lighting setup | Softbox/lighting visual |
| D6 | `decorative-mirror-style.png` | Salon mirror | Mirror with vanity |
| D7 | `decorative-flower-accent.png` | Accent | Flowers, beauty botanical |
| D8 | `decorative-texture-gold.png` | Gold accent texture | Rose gold accents |
| D9 | `decorative-abstract-warm.png` | Abstract warm | Warm gradient abstract |
| D10 | `decorative-sparkle.png` | Sparkle accents | Glitter/sparkle elements |

### UTILITY/UI IMAGES (10)
| # | Filename | Purpose | Style |
|---|----------|---------|-------|
| U1 | `utility-placeholder-portrait.png` | Portrait placeholder | Silhouette placeholder |
| U2 | `utility-placeholder-landscape.png` | Landscape placeholder | Abstract placeholder |
| U3 | `utility-empty-gallery.png` | Empty state | "No images yet" placeholder |
| U4 | `utility-error-404.png` | 404 illustration | Friendly error page |
| U5 | `utility-error-maintenance.png` | Maintenance | "Coming soon" visual |
| U6 | `utility-loading-spinner.png` | Loading state | Branded spinner |
| U7 | `utility-confirmation.png` | Success confirmation | Checkmark celebration |
| U8 | `utility-newsletter-success.png` | Newsletter success | Welcome confirmation |
| U9 | `utility-social-preview.png` | OG image | Social share preview |
| U10 | `utility-favicon-icon.png` | Favicon | B icon/favicon |

### DARK MODE VARIANTS (8)
| # | Filename | Source | Treatment |
|---|----------|---------|-----------|
| DM1 | `dark-hero-color.png` | H1 | Darker background, preserved warm tones |
| DM2 | `dark-hero-studio.png` | H3 | Darker interior, accent lighting more visible |
| DM3 | `dark-service-balayage.png` | S5 | Dark moody edit, dramatic lighting |
| DM4 | `dark-gallery-color.png` | G1 | Dark, rich color |
| DM5 | `dark-cta-book.png` | CT1 | Dark CTA design |
| DM6 | `dark-contact-interior.png` | C2 | Dark moody interior |
| DM7 | `dark-beforeafter-keratina.png` | BA5 | Dramatic before/after |
| DM8 | `dark-error-404.png` | U4 | Dark mode error page |

---

## 5. Image Prompt Library

### HERO PROMPTS

**H1 — Hero Color Expertise:**
```
Professional beauty photography of a woman with freshly done balayage hair,
warm brown tones with blonde highlights, beautiful shine and movement,
slight head tilt looking at camera with confident smile, wearing elegant
top, soft diffused professional beauty lighting with warm fill, Asunción
beauty studio background with subtle warm tones, upper 40% of frame
negative space for text overlay, Vogue Beauty editorial aesthetic,
Latin American woman with medium warm skin tone, photorealistic 8K,
shallow depth of field, subject sharp, 16:9 aspect ratio
```

**H2 — Hero Transformation:**
```
Split composition or single powerful image of woman revealing her
beautiful hair transformation, before showing faded color on left side,
after showing vibrant rich balayage on right side, subject in lower 2/3
looking at camera with joyful expression, professional beauty editorial
lighting, warm studio in Asunción Paraguay, clean negative space upper
1:3 for text, Latin American woman 30s, photorealistic, rich contrast,
warm color grade, 16:9 aspect ratio
```

**H3 — Hero Studio Experience:**
```
Wide shot of modern Asunción beauty studio interior, stylist applying
color to client's hair at styling station, client relaxed reading
magazine, warm ambient lighting with accent spots, air conditioned
premium feel, other stations visible in background with soft blur,
warm welcoming atmosphere, plants and modern décor visible, upper
40% negative space for text overlay, photorealistic 8K, 16:9 aspect ratio
```

### SERVICE PROMPTS

**S5 — Balayage Service:**
```
Close-up professional beauty photography of woman's hair showing
fresh balayage result, warm brunette base transitioning to blonde
highlights around face, natural-looking dimension and movement,
soft professional beauty lighting from key light with fill, even
exposure showing hair shine and color depth, warm neutral background,
Latin American woman with medium skin tone, shallow depth of field
focused on hair, subject centered, no text overlay, photorealistic 8K,
85mm equivalent, f/1.8, 4:3 aspect ratio
```

**S9 — Keratina Result:**
```
Ultra close-up beauty photography focusing on hair texture after
keratina treatment, silky smooth shiny hair strands reflecting light,
healthy appearance with natural movement, professional beauty
editorial lighting emphasizing shine, warm studio background,
Latin American woman hair, slight motion blur in strands for
movement feel, subject centered, no text, photorealistic 8K,
macro lens feel, even lighting, 4:3 aspect ratio
```

### PORTRAIT PROMPTS (Testimonials)

**T1 — Testimonial Portrait 1:**
```
Professional portrait photography of woman in her 30s, warm friendly
smile, sitting at vanity mirror in Asunción beauty studio, wearing
elegant casual top, soft butterfly beauty lighting with catchlights
in eyes, warm rose color tint in background gradient, hands folded
or relaxed, direct eye contact with camera, Latin American woman
with medium warm skin tone, natural makeup, healthy hair styled,
shallow depth of field, professional but approachable feel,
photorealistic 8K, 50mm equivalent, f/1.8, 4:5 aspect ratio
```

### BEFORE/AFTER PROMPTS

**BA1 — Color Transformation:**
```
Professional before and after beauty photography of woman's hair
color transformation, left side showing faded oxidized orange-brown
hair with visible roots and dullness, right side showing rich
warm brown base with subtle highlights, both sides identical
lighting conditions for fair comparison, slight angle view showing
dimension, clean neutral background, before label and after label
visible or implied by direction, photorealistic 8K, even lighting,
4:5 aspect ratio, can be split composition or paired vertical
```

### PROCESS PROMPTS

**P1 — Reservation Process:**
```
Over shoulder shot of woman's hands holding smartphone with
WhatsApp open showing Belleza Studio contact, being typed on,
warm relaxed setting Asunción Paraguay, natural lighting from
window, the moment of connection and booking, authentic lifestyle
feel not staged, slight blur on person, phone clearly visible,
professional but warm, photorealistic, 16:9 aspect ratio
```

### TEAM PROMPTS

**TM1 — Team Group Photo:**
```
Professional group portrait of all team members of Belleza Studio
Asunción, 4-5 stylists in professional black work attire, standing
together in front of their stylish salon interior, warm welcoming
expressions, arms relaxed or crossed confidently, soft beauty
lighting all faces even, warm background gradient, Latin American
team with diverse skin tones, clean professional look, photorealistic
8K, 50mm equivalent, f/2.8, full team visible, 16:9 aspect ratio
```

### DECORATIVE PROMPTS

**D1 — Hair Swave Decorative:**
```
Beautiful abstract beauty photography of flowing hair strands
with natural wave movement, single strand focus showing healthy
cuticle and shine, dark brown hair against warm cream gradient
background, professional macro beauty shot, artistic and elegant,
used as decorative or background element, minimal composition,
warm color grade, soft diffused lighting, photorealistic 8K,
1:1 aspect ratio
```

---

## 6. Technical Specifications

### Image Formats & Sizes

| Use | Format | Aspect Ratio | Min Resolution | Max File Size |
|-----|--------|--------------|----------------|---------------|
| Hero | PNG/JPG | 16:9 | 1920×1080 | 500KB |
| Service | PNG/JPG | 4:3 | 800×600 | 200KB |
| Portrait | PNG/JPG | 4:5 | 800×1000 | 200KB |
| Gallery | PNG/JPG | 4:3 or 1:1 | 800×600 | 200KB |
| Before/After | PNG/JPG | 4:5 | 800×1000 | 300KB |
| Icons/Stats | PNG/SVG | 1:1 | 256×256 | 50KB |
| Blog thumb | PNG/JPG | 16:9 | 640×360 | 100KB |
| OG Image | PNG/JPG | 1.91:1 | 1200×630 | 200KB |

### Naming Convention
```
{category}-{subcategory}-{number}.{ext}

Examples:
hero-color-expertise.png
service-corte-dama.png
testimonial-portrait-1.png
beforeafter-color-1.png
```

### Directory Structure
```
public/images/
├── hero/
│   ├── hero-color-expertise.png
│   ├── hero-transformation.png
│   └── hero-studio-experience.png
├── services/
│   ├── corte/
│   ├── color/
│   └── tratamiento/
├── gallery/
├── beforeafter/
├── testimonials/
├── team/
├── stats/
├── reasons/
├── blog/
├── promotions/
├── cta/
├── contact/
├── branding/
├── decorative/
├── utility/
└── dark/
```

### Compression Guidelines
- **Hero images:** Optimize to <500KB, use progressive JPG
- **Gallery:** WebP if supported, fallback JPG at 80% quality
- **Portraits:** Keep quality high, background can be compressed more
- **Icons/Decorative:** SVG preferred where possible

### Accessibility
- All images must have descriptive `alt` text
- Decorative images: `alt=""` with empty string
- Complex images (before/after): detailed description in alt

### Performance
- Lazy load all images below the fold
- Hero images: preload LCP image
- Use `srcset` for responsive images
- AVIF/WebP with JPG fallback

---

## 7. Usage Guidelines

### Image Selection by Context

| Context | Image Type | Style Notes |
|---------|-----------|------------|
| Homepage Hero | H1, H2, H3 | Full-bleed, text overlay, aspirational |
| Services Page | Service images per category | Product-focused, warm lighting |
| Gallery Page | Gallery images grid | Best quality, varied angles |
| Before/After | BA1-BA8 | Transformation clearly visible |
| Testimonials | T1-T10 + carousel | Warm, trustworthy, real faces |
| Team Page | TM1-TM5 | Professional, approachable |
| Blog | B1-B10 | Thematic, readable at small sizes |
| Promotions | PR1-PR9 | Clear offer, branded overlay |
| CTA Banners | CT1-CT5 | Bold, action-oriented, brand colors |
| Footer/Contact | C1-C4, BR1-BR8 | Branded, professional |

### Image Compositing Rules

**Text Overlay on Hero:**
- Use image with upper 35-40% negative space
- Apply subtle gradient overlay for text contrast
- Dark text on light images, light text on dark images
- Never obscure the subject's face

**Before/After Display:**
- Use split view or side-by-side (never stacked vertically in carousel)
- Label clearly "Antes" / "Después" or "Before" / "After"
- Maintain identical lighting between pairs
- Crop to identical frames for fair comparison

**Testimonial Carousel:**
- Portrait format (4:5)
- Face should be in upper 2/3
- Background doesn't need to match (varied is fine)
- Quote overlay should be minimal, not obscure face

### Dark Mode Image Rules
- Same base image as light mode
- Apply darker background treatment
- Ensure subject still visible and properly lit
- May need slight exposure adjustment to compensate
- Accent colors should pop more (coral/violet more saturated)

### What NOT to Do
- ❌ Don't use harsh shadows on faces
- ❌ Don't use stark white backgrounds (clinical)
- ❌ Don't use blue/cold color grading
- ❌ Don't use generic "beauty stock" look
- ❌ Don't use low-res or compressed images
- ❌ Don't use images with visible watermarks
- ❌ Don't use misleading before/after (must be same person, same service)

---

*Document version: 1.0 — Belleza Studio Image Guide*
*Last updated: May 30, 2026*