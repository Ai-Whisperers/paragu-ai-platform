# Content Index

This directory contains all site content organized by language.

## Structure

```
content/
├── es/              # Spanish content (primary)
├── en/              # English content
├── _shared/         # Cross-language shared content
├── tokens.json      # Design tokens
└── CONTENT_INDEX.md  # This file
```

## Language Directories

### `es/` (Spanish)
Spanish-language content for the primary site.

### `en/` (English)
English-language content for the alternate site.

### `_shared/`
Content shared between languages:
- `team.json` - Team member profiles
- `products.json` - Product catalog

## Content Files

| File/Directory | Purpose |
|----------------|---------|
| `site.json` | Site configuration, branding, business info, navigation |
| `hero.json` | Hero section slides and content |
| `stats.json` | Business statistics |
| `cta.json` | Call-to-action content |
| `services/` | Service categories and items |
| `gallery.json` | Gallery images |
| `testimonials.json` | Customer testimonials |
| `process.json` | Process/steps |
| `reasons.json` | Why-us reasons |
| `faqs.json` | FAQ |
| `promotions/` | Active promotions |
| `loyalty/` | Loyalty program |
| `gift-cards/` | Gift card configs |
| `before-after.json` | Before/after gallery |
| `ui.json` | UI strings |
| `blog/` | Blog posts |

## Adding New Content

1. Add content file to `es/` or `en/` directory
2. Update the language's `index.json` with the new file
3. Follow the schema defined in the content files