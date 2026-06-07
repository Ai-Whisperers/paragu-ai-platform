# SOCIAL MEDIA INTEGRATION
## How the Website Connects to Instagram, Facebook, and WhatsApp

**Purpose:** Document how the website template integrates with social media platforms and how to configure each integration for maximum business value.

---

## INTEGRATION OVERVIEW

| Platform | Integration Type | What's Included | Configuration Required |
|----------|----------------|-----------------|----------------------|
| WhatsApp | Click-to-chat | Floating button, pre-filled message | Business phone number |
| WhatsApp Business | OTP login | Passwordless auth for clients | WhatsApp Business API |
| Instagram | Profile link | Footer icon, feed embed (optional) | Instagram URL |
| Instagram | Feed embed | Recent posts grid on website | API access token |
| Facebook | Page link | Footer icon | Facebook Page URL |
| Facebook Pixel | Analytics | Conversion tracking | Pixel ID |

---

## WHATSAPP INTEGRATION

### 1. Floating WhatsApp Button

**What it is:** Fixed button in bottom-right corner that opens WhatsApp chat.

**Configuration:**
```json
// content/es/site.json
{
  "business": {
    "whatsapp": "595981000000",
    "whatsappMessage": "Hola! Quiero información sobre sus servicios"
  }
}
```

**How it works:**
- Button is always visible on all pages
- Click opens `wa.me/595981000000?text=Hola!%20Quiero%20información`
- Pre-filled message helps start the conversation

**Customization options:**
- Button position (default: bottom-right)
- Button color (default: WhatsApp green)
- Message template (change per campaign)

### 2. WhatsApp OTP Login

**What it is:** Clients log in using WhatsApp verification code instead of password.

**Flow:**
1. Client enters phone number
2. System sends 6-digit code via WhatsApp
3. Client enters code → session created
4. No password needed

**Configuration:**
```json
// content/es/site.json
{
  "features": {
    "whatsappAuth": true
  }
}
```

**Requirements:**
- WhatsApp Business API OR
- Twilio WhatsApp (requires Twilio account)

**Benefits:**
- Paraguayans already on WhatsApp — no new app
- 90%+ message delivery rate
- Passwordless = higher login conversion

### 3. WhatsApp Booking Notifications

**What it is:** Automatic WhatsApp messages when bookings are made.

**Message types:**

| Trigger | Message |
|---------|---------|
| New booking | "¡Nueva reserva! [Service] para [Date] [Time]. Cliente: [Name]. [Phone]" |
| Booking confirmed | "Tu turno está confirmado: [Date] [Time]. [Business Name]" |
| Reminder (24h) | "Recordatorio: Tenés turno mañana [Date] [Time]. ¿Vas a poder?" |
| Reminder (2h) | "¡Te esperamos en 2 horas! [Business Name]. [Address]" |

**Configuration:**
```json
// .env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

### 4. WhatsApp Share Button

**What it is:** Share buttons on promotions and offers that open WhatsApp with pre-filled message.

**Use case:**
- Share a promotion with friends
- Send booking confirmation to group
- "Tell a friend" referral

**Implementation:**
```html
<a href="whatsapp://send?text=Mirá esta promoción en [URL]" data-action="share/whatsapp/share">
```

---

## INSTAGRAM INTEGRATION

### 1. Instagram Link (Simple)

**What it is:** Link to Instagram profile in footer and contact section.

**Configuration:**
```json
// content/es/site.json
{
  "business": {
    "instagram": "https://instagram.com/yourbusiness",
    "instagramHandle": "@yourbusiness"
  }
}
```

**Display locations:**
- Footer social icons
- Contact section
- Business info card

### 2. Instagram Feed Embed (Optional)

**What it is:** Grid of recent Instagram posts embedded on the website.

**Configuration:**
```json
// content/es/site.json
{
  "features": {
    "instagramFeed": true
  }
}
```

**Requirements:**
- Instagram Business Account
- Facebook Page connected to Instagram
- Instagram API access token (via Facebook Developers)

**How to get the token:**
1. Create Facebook App at developers.facebook.com
2. Add Instagram Graph API product
3. Connect your Instagram Business account
4. Generate long-lived access token
5. Set in environment variable

```env
INSTAGRAM_ACCESS_TOKEN=IGQVJ...
INSTAGRAM_BUSINESS_ACCOUNT_ID=1784140...
```

**Display options:**
- 6-9 recent posts
- Grid layout (3×3 or carousel)
- Click to view on Instagram
- Cached — updates every hour

**Fallback:**
If Instagram API unavailable, display static images or disable feature.

### 3. Instagram Shop/Products

**Future enhancement:**
Sync Instagram Shopping products to website e-commerce.

---

## FACEBOOK INTEGRATION

### 1. Facebook Page Link

**What it is:** Link to Facebook Page in footer.

**Configuration:**
```json
// Already in site.json
{
  "features": {
    "facebookLink": true
  }
}
```

**Display:**
- Footer social icons
- Open in new tab

### 2. Facebook Pixel

**What it is:** Analytics tracking for conversions and remarketing.

**Configuration:**
```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789
```

**Events tracked:**

| Event | Trigger | Data |
|-------|---------|------|
| PageView | All pages | URL, referrer |
| ViewContent | Service/product pages | Content name, ID |
| Lead | Newsletter signup | — |
| Book | Booking submitted | Service, date |
| Purchase | Gift card purchased | Amount, currency |
| InitiateCheckout | Checkout started | — |
| AddToCart | Add to cart | Product, price |

**How to set up:**
1. Create Pixel at business.facebook.com/events
2. Copy Pixel ID
3. Add to environment
4. Verify with Facebook Pixel Helper Chrome extension

### 3. Facebook Messenger Widget (Optional)

**What it is:** Live chat via Facebook Messenger on website.

**Alternative to WhatsApp:**
Some businesses prefer Messenger for business inquiries.

**Configuration:**
```html
<!-- Add to layout -->
<script>
  window.fbAsyncInit = function() {
    FB.init({
      xfbml: true,
      version: 'v18.0'
    });
  };
</script>
<div fb-xfbml-policy="enterprise" fb-page-id="YOUR_PAGE_ID" 
     fb-version="v18.0" fb-ref="default" fb-send="true"></div>
```

---

## SOCIAL SHARE BUTTONS

### Share on Social Media

**What it is:** Buttons to share specific pages/content on social platforms.

**Implementation:**
```json
// content/es/site.json
{
  "features": {
    "shareButtons": true
  }
}
```

**Share buttons on:**

| Page/Section | WhatsApp | Facebook | Instagram | Twitter |
|--------------|----------|----------|-----------|---------|
| Promotions | ✓ | ✓ | ✓ | — |
| Blog posts | ✓ | ✓ | ✓ | ✓ |
| Gift cards | ✓ | ✓ | — | — |
| Homepage | ✓ | ✓ | ✓ | ✓ |

**Share message templates:**

| Content | WhatsApp | Facebook |
|---------|----------|----------|
| Promotion | "¡Mira esta oferta de [Business]! [URL]" | "Check out this deal from [Business]! [URL]" |
| Blog post | "Lei esto sobre [topic] y pensé en vos. [URL]" | "Interesting read about [topic]! [URL]" |
| Gift card | "Regalé una gift card de [Business] 🎁 [URL]" | "Gave a gift from [Business] 🎁 [URL]" |

---

## SOCIAL PROOF DISPLAY

### Instagram Feed on Website

**Layout options:**

```
┌─────────────────────────────────────┐
│  @yourbusiness                      │
│  [Image 1] [Image 2] [Image 3]    │
│  [Image 4] [Image 5] [Image 6]    │
│  [Follow us on Instagram →]        │
└─────────────────────────────────────┘
```

**Styling:**
- 3×3 grid (desktop), 2×3 (tablet), 2×2 (mobile)
- Square images (1:1 aspect ratio)
- Hover: Show likes/comments count
- Click: Open on Instagram

### Instagram Stories Integration

**Display recent stories:**
- If active stories exist, show ring around profile picture
- Click opens Instagram app directly

---

## GOOGLE MY BUSINESS INTEGRATION

### Why It Matters

Google My Business (now "Google Business Profile") is critical for local SEO.

### Setup Checklist

| Task | Status | Notes |
|------|--------|-------|
| Create/claim Business Profile | ⬜ | business.google.com |
| Verify business address | ⬜ | Postcard or phone |
| Add complete business info | ⬜ | Hours, phone, website |
| Add photos | ⬜ | Interior, exterior, products |
| Get reviews | ⬜ | Ask satisfied customers |
| Respond to reviews | ⬜ | All positive and negative |
| Add website URL to profile | ⬜ | Your new website! |

### What to Sync

**Website displays:**
- Business address (linked to Google Maps)
- Phone number (click-to-call)
- Hours (with "Open now" indicator)
- Photos (if GMB API available)

### Schema Markup

The website generates LocalBusiness schema:
```json
{
  "@type": "LocalBusiness",
  "name": "[Business Name]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Address]",
    "addressLocality": "Asunción",
    "addressCountry": "PY"
  },
  "telephone": "[Phone]",
  "openingHours": "Mo-Fr 09:00-18:00",
  "url": "[Website URL]",
  "image": "[Logo URL]",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[Lat]",
    "longitude": "[Lng]"
  }
}
```

---

## SOCIAL MEDIA STRATEGY TEMPLATE

### Content Mix Recommendations

| Content Type | Frequency | Purpose |
|--------------|-----------|---------|
| Service highlights | 2-3/week | Show what you offer |
| Behind the scenes | 1-2/week | Humanize your brand |
| Customer testimonials | 1-2/week | Social proof |
| Educational/tips | 1/week | Value, SEO |
| Promotions/offers | 1-2/week | Drive traffic |
| User-generated content | 1/week | Build community |

### Call-to-Action Strategy

| Platform | CTA | Where |
|----------|-----|-------|
| Instagram | "Link in bio" | Bio link → website |
| Instagram Stories | Swipe up | → Website/booking |
| Facebook | "Send message" | → WhatsApp |
| WhatsApp Status | Share promo image | → Website link |
| All | "Book now" | → Online booking |

---

## CROSS-PROMOTION FLOW

```
┌──────────────────────────────────────────────────────────┐
│                      WEBSITE                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  WhatsApp  │  │   Instagram │  │   Facebook   │  │
│  │   Button   │  │     Feed    │  │    Page      │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
└─────────┼────────────────┼────────────────┼──────────┘
          │                │                │
          ▼                ▼                ▼
    ┌───────────┐   ┌───────────┐    ┌───────────┐
    │  WhatsApp │   │ Instagram │    │  Facebook  │
    │  Group/   │   │  Stories │    │  Page/    │
    │  Broadcast│   │  Reels   │    │  Groups   │
    └───────────┘   └───────────┘    └───────────┘
          │                │                │
          ▼                ▼                ▼
    ┌─────────────────────────────────────────────────┐
    │              CONTENT FOLLOWS                    │
    │  • Service posts     • Behind scenes           │
    │  • Testimonials     • Tips & education        │
    │  • Promotions       • User-generated          │
    └─────────────────────────────────────────────────┘
          │                │                │
          ▼                ▼                ▼
    ┌─────────────────────────────────────────────────┐
    │           BACK TO WEBSITE                       │
    │  • Link in bio     • Story link       • Bio    │
    │  • Share buttons   • Share buttons    • Link   │
    └─────────────────────────────────────────────────┘
```

---

## INTEGRATION CHECKLIST

### WhatsApp

- [ ] Business phone number configured in site.json
- [ ] Pre-filled message template set
- [ ] Floating button visible on all pages
- [ ] OTP login configured (if enabled)
- [ ] Booking notifications set up (if Twilio configured)

### Instagram

- [ ] Instagram URL added to site.json
- [ ] Instagram handle displayed in footer
- [ ] Access token obtained (if feed enabled)
- [ ] Feed displays correctly (if enabled)
- [ ] Link in bio points to website

### Facebook

- [ ] Facebook Page URL added
- [ ] Facebook Pixel ID configured
- [ ] Pixel verified working (use Pixel Helper)
- [ ] Messenger widget configured (if enabled)

### Google Business

- [ ] Business Profile claimed
- [ ] Website URL added to profile
- [ ] Business info complete
- [ ] Photos added
- [ ] Strategy for reviews in place

---

## COMMON ISSUES

| Issue | Cause | Solution |
|-------|-------|----------|
| WhatsApp button not opening | Wrong phone format | Use 595 + area code, no + or spaces |
| Instagram feed not loading | Token expired | Refresh token (lasts 60 days) |
| Instagram feed shows old posts | Cache not refreshed | Refresh every hour |
| Facebook Pixel not firing | ID incorrect or blocked | Verify with Pixel Helper extension |
| Share buttons not working | JavaScript error | Check browser console |
| Google Maps wrong location | Coordinates incorrect | Update in site.json |
| "Open now" wrong | Business hours not set | Set in site.json |

---

## THIRD-PARTY TOOLS

| Tool | Purpose | Cost |
|------|---------|------|
| Buffer | Social media scheduling | Free/Premium |
| Later | Instagram scheduling + analytics | Free/Premium |
| Meta Business Suite | Instagram + Facebook management | Free |
| WhatsApp Business | Business messaging | Free |
| Hootsuite | All social in one place | Premium |

---

*Document version: 1.0*
*Use: Social media integration, marketing setup*
*Last updated: June 2, 2026*