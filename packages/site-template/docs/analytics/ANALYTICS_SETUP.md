# ANALYTICS SETUP
## What to Track and How to Read the Data

**Purpose:** Guide for setting up and interpreting analytics for the website. Helps clients understand their traffic, conversions, and opportunities.

---

## ANALYTICS OVERVIEW

The website template includes multiple analytics tools:

| Tool | What It Tracks | Setup Required |
|------|----------------|----------------|
| Google Analytics 4 | Traffic, page views, user behavior | Measurement ID |
| Facebook Pixel | Conversions, remarketing | Pixel ID |
| Google Search Console | Search rankings, impressions | Google account |
| Supabase Analytics | Booking data, user actions | Included |
| Hotjar (optional) | Heatmaps, session recordings | Script injection |

---

## GOOGLE ANALYTICS 4 (GA4)

### Setup

**1. Create GA4 Property:**
1. Go to analytics.google.com
2. Create account → Create property
3. Select "Web" platform
4. Enter website URL
5. Get Measurement ID (G-XXXXXXXXXX)

**2. Add to Environment:**
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**3. Verify Installation:**
- Use GA4 DebugView or
- Google Tag Assistant Chrome extension
- Check Real-time report for your visit

### Events Tracked Automatically

| Event | When It Fires | Data Available |
|-------|---------------|---------------|
| page_view | Every page load | Page path, title, referrer |
| first_visit | First session | Source/medium |
| session_start | New session | — |
| user_engagement | Ongoing engagement | — |

### Custom Events to Track

**Booking Flow:**
```javascript
// When booking form submitted
gtag('event', 'booking_initiated', {
  service_type: 'haircut',
  booking_method: 'online_form'
});

// When booking confirmed
gtag('event', 'booking_confirmed', {
  service: 'coloration',
  date: '2026-06-15',
  booking_source: 'website'
});
```

**Gift Card Purchase:**
```javascript
gtag('event', 'gift_card_purchase', {
  tier: 'professional',
  amount: 250000,
  currency: 'PYG'
});
```

**Newsletter Signup:**
```javascript
gtag('event', 'generate_lead', {
  method: 'newsletter_popup'
});
```

**Search:**
```javascript
gtag('event', 'search', {
  search_term: 'booking'
});
```

**CTA Clicks:**
```javascript
gtag('event', 'cta_click', {
  cta_location: 'hero_primary',
  cta_text: 'Empezar Ahora'
});
```

### Key Reports to Review

#### 1. Real-Time Report
**Location:** Reports → Realtime
**What it shows:** Who's on your site right now
**Use:** Is the site getting traffic? (Should be 0-5 for small business typically)

#### 2. Traffic Acquisition
**Location:** Reports → Acquisition → Traffic acquisition
**What it shows:** Where visitors come from
**Metrics to watch:**
- Organic search (Google finds you)
- Direct (people type your URL)
- Referral (links from other sites)
- Social (Instagram, Facebook, WhatsApp)
**Use:** Is Google finding you? Are people sharing your link?

#### 3. Engagement Overview
**Location:** Reports → Engagement
**What it shows:** What people do on your site
**Metrics to watch:**
- Event count (total interactions)
- Views per session (depth of visit)
- Average engagement time (interest level)
**Use:** Are people exploring or leaving immediately?

#### 4. Conversions
**Location:** Reports → Monetization → Conversions
**What it shows:** Goal completions
**Goals to set:**
- Booking submitted
- Gift card purchased
- Newsletter signup
- Contact form submitted
**Use:** Is the website generating leads?

#### 5. Demographics
**Location:** Reports → Demographics → Overview
**What it shows:** Who your visitors are
**Metrics:**
- Age group
- Gender
- Country/City
**Use:** Is this who you expected?

---

## GOOGLE SEARCH CONSOLE

### Setup

**1. Verify Ownership:**
1. Go to search.google.com/search-console
2. Add property (URL prefix)
3. Choose verification method (HTML file, DNS, or Google Analytics)
4. Complete verification

**2. Connect to GA4 (optional):**
Link Search Console to GA4 for unified reporting

### Key Reports

#### 1. Performance Report
**Location:** Performance → Overview
**What it shows:** How you appear in Google search

**Metrics:**

| Metric | What It Means |
|--------|---------------|
| Clics | Times people clicked to your site |
| Impresiones | Times your site appeared in results |
| CTR | Click-through rate (Clics/Impresiones) |
| Posición | Average ranking position |

**Good benchmarks:**
- CTR > 5% for position 1-3
- CTR > 2% for position 4-10
- CTR > 0.5% for position 11-20

#### 2. Queries Report
**Location:** Performance → Queries
**What it shows:** What people search for to find you

**Questions to answer:**
- Which queries bring traffic?
- Which queries have high impressions but low clicks?
- Which queries show your business for competitors?

**Action:** Identify queries where you rank 4-10 — improve those pages to move up

#### 3. Pages Report
**Location:** Performance → Pages
**What it shows:** Which pages get the most traffic

**Questions to answer:**
- Which service pages are popular?
- Which blog posts get traffic?
- Which pages have high impressions but low clicks?

#### 4. Coverage Report
**Location:** Index → Coverage
**What it shows:** Google indexing status

**Status meanings:**

| Status | Meaning | Action |
|--------|---------|--------|
| Valid | Indexed correctly | Good |
| Valid with warnings | Indexed but some issues | Review warnings |
| Excluded | Not indexed | Check if intentional |
| Error | indexing failed | Fix immediately |

**Common errors:**
- 404 pages (page removed)
- Server errors (site down)
- Robots.txt blocked (intentional or mistake)

### SEO Improvements from Search Console

| Finding | Action |
|---------|--------|
| Low CTR on brand queries | Add schema markup, improve meta description |
| Missing queries for your services | Add service pages, optimize content |
| High position but low clicks | Improve title tags, add rich snippets |
| Errors in coverage | Fix broken links, resubmit sitemaps |

---

## SUPABASE ANALYTICS

### Built-in Reports

The admin dashboard includes:

| Report | Location | What It Shows |
|--------|----------|---------------|
| Booking stats | /admin | Total bookings, by service, trends |
| Revenue (if e-commerce) | /admin | Gift cards, products sold |
| Subscriber growth | /admin | Newsletter signups |
| Client loyalty | /admin | Points earned, tiers |

### Database Tables to Query

```sql
-- Bookings over time
SELECT DATE(created_at) as date, COUNT(*) as bookings
FROM bookings
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Popular services
SELECT service, COUNT(*) as count
FROM bookings
GROUP BY service
ORDER BY count DESC;

-- New vs returning clients
SELECT 
  CASE WHEN visit_count = 1 THEN 'new' ELSE 'returning' END as type,
  COUNT(*) as clients
FROM clients
GROUP BY type;

-- Gift card sales by month
SELECT 
  DATE_TRUNC('month', created_at) as month,
  SUM(amount) as total
FROM gift_cards
GROUP BY DATE_TRUNC('month', created_at);
```

---

## FACEBOOK PIXEL

### Key Events to Track

| Event | When to Fire | Data to Send |
|-------|-------------|--------------|
| PageView | Every page | — |
| Lead | Newsletter/contact form | — |
| Book | Booking form | Service, date |
| Purchase | Gift card bought | Amount, currency |
| InitiateCheckout | Checkout started | — |
| AddToCart | Add to cart | Product, price |

### How to Test

1. Install Facebook Pixel Helper Chrome extension
2. Visit your website
3. Perform the action (submit form, book, etc.)
4. Check Pixel Helper popup for event confirmation

---

## GOOGLE TAG MANAGER (Alternative)

For more advanced tag management without code changes:

**Setup:**
1. Create GTM account at tagmanager.google.com
2. Add GTM container code to site
3. Create tags for GA4, Facebook Pixel, etc.

**Benefits:**
- Add/edit tags without deploying code
- Preview mode before publishing
- Built-in triggers for common actions

---

## KEY METRICS TO TRACK WEEKLY

### Traffic Metrics

| Metric | How to Find | Good/Bad |
|--------|-----------|----------|
| Total visitors | GA4 → Reports → Overview | Compare week-over-week |
| Traffic sources | GA4 → Acquisition | More organic = better |
| Page views per session | GA4 → Engagement | > 3 = engaged |
| Bounce rate | GA4 → Engagement | < 60% = engaged |

### Conversion Metrics

| Metric | How to Find | Good/Bad |
|--------|-----------|----------|
| Booking submissions | GA4 → Conversions | More = better |
| Booking conversion rate | Bookings / Visitors | > 2% = good |
| Newsletter signups | GA4 → Conversions | Growing = good |
| Gift cards sold | Supabase | More = more revenue |

### SEO Metrics

| Metric | How to Find | Good/Bad |
|--------|-----------|----------|
| Total clicks from Google | Search Console | Growing = good |
| Average position | Search Console | Lower = better |
| Pages in top 10 | Search Console | More = better |
| Impressions | Search Console | Growing = more visibility |

---

## MONTHLY ANALYTICS REPORT TEMPLATE

### Template Structure

```
# Analytics Report — [Month Year]

## Executive Summary

- Total visitors: [X] (+/-% vs last month)
- Total bookings: [X] (+/-% vs last month)
- Booking conversion rate: [X]%
- Top traffic source: [Source]

## Traffic Analysis

### Sources
| Source | Visitors | % of Total |
|--------|----------|------------|
| Organic Search | X | X% |
| Direct | X | X% |
| Social | X | X% |
| Referral | X | X% |

### Top Pages
| Page | Views | Avg. Time |
|------|-------|-----------|
| Homepage | X | X:XX |
| Services | X | X:XX |
| Booking | X | X:XX |

## Conversion Analysis

### Goals
| Goal | Completions | Conversion Rate |
|------|-------------|-----------------|
| Booking | X | X% |
| Newsletter | X | X% |
| Gift Card | X | X% |

### Funnel Drop-off
| Step | Visitors | Drop-off |
|------|----------|----------|
| Homepage | X | — |
| Booking page | X | X% |
| Form submitted | X | X% |

## SEO Performance

| Metric | This Month | Last Month | Change |
|--------|-----------|------------|--------|
| Google clicks | X | X | +/-X% |
| Average position | X | X | +/-X |
| Impressions | X | X | +/-X% |

### Top Search Queries
| Query | Clicks | Position |
|-------|--------|----------|
| [Query 1] | X | X |
| [Query 2] | X | X |
| [Query 3] | X | X |

## Recommendations

### What's Working
- [Observation 1]
- [Observation 2]

### Opportunities for Improvement
- [Opportunity 1]
- [Opportunity 2]

### Next Month's Goals
- [Goal 1]
- [Goal 2]
```

---

## DASHBOARD RECOMMENDATIONS

### For Business Owners (Simple)

Set up a simple dashboard with:

| Widget | Source | Why |
|--------|--------|-----|
| Today's visitors | GA4 Real-time | Is anyone there? |
| Bookings this week | Supabase | Is it working? |
| Top traffic source | GA4 | Where do people come from? |
| Google position for brand | Search Console | Am I found? |

### For Marketers (Detailed)

Add more widgets:

| Widget | Source | Frequency |
|--------|--------|-----------|
| Week-over-week traffic | GA4 | Weekly |
| Conversion funnel | GA4 | Weekly |
| Top keywords | Search Console | Monthly |
| Content performance | GA4 | Monthly |
| Competitor mentions | (Manual) | Monthly |
| Social engagement | Platform | Weekly |

---

## GOOGLE ANALYTICS 4 ECOMMERCE EVENTS

For e-commerce enabled sites:

```javascript
// View item
gtag('event', 'view_item', {
  items: [{
    item_id: 'gift_card_pro',
    item_name: 'Gift Card Profesional',
    item_category: 'Gift Cards',
    price: 250000,
    currency: 'PYG'
  }]
});

// Add to cart
gtag('event', 'add_to_cart', {
  items: [{
    item_id: 'gift_card_pro',
    item_name: 'Gift Card Profesional',
    price: 250000,
    quantity: 1
  }]
});

// Purchase
gtag('event', 'purchase', {
  transaction_id: 'order_123',
  value: 250000,
  currency: 'PYG',
  items: [{
    item_id: 'gift_card_pro',
    item_name: 'Gift Card Profesional',
    price: 250000,
    quantity: 1
  }]
});
```

---

## PRIVACY & COMPLIANCE

### Cookie Consent

The template includes a GDPR-style cookie consent banner:

- First-time visitors see consent banner
- Options: "Accept all", "Reject", "Customize"
- Preferences stored in localStorage
- Analytics only loads with consent

### Data Retention

| Data Type | Retention | Notes |
|-----------|-----------|-------|
| GA4 data | 14 months | Configurable |
| Search Console | Indefinite | Historical |
| Supabase bookings | Indefinite | Until deleted |
| Supabase sessions | 30 days | Auto-cleanup |

### Privacy Policy Updates

Clients should update privacy policy to include:
- Google Analytics usage
- Facebook Pixel usage
- Data retention periods
- User rights (access, deletion)

---

## COMMON ISSUES

| Issue | Cause | Solution |
|-------|-------|----------|
| No data in GA4 | Wrong Measurement ID | Verify ID in env |
| GA4 shows 0 traffic | Ad blocker | Check with extension disabled |
| Search Console no data | Not verified | Complete verification |
| Facebook Pixel not firing | Browser extension | Check with Pixel Helper |
| Supabase reports empty | No bookings yet | Normal for new sites |

---

## TOOLS RECOMMENDED

### Free Tools
- Google Analytics 4
- Google Search Console
- GA4 DebugView Chrome extension
- Facebook Pixel Helper Chrome extension

### Paid Tools (Optional)
- Hotjar (heatmaps, recordings)
- Semrush/Ahrefs (keyword research)
- Buffer/Later (social scheduling)
- Supermetrics (connect data sources)

---

*Document version: 1.0*
*Use: Analytics setup, performance tracking*
*Last updated: June 2, 2026*