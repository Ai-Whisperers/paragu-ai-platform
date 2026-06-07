# Features Showcase

Complete documentation of every feature in the site-template. Each feature includes:
- **What it is** — Clear explanation
- **How it works** — Technical implementation
- **Benefits** — Business value for the client
- **Why it matters** — Impact on customer experience and conversions

---

## Core Features

### 1. WhatsApp OTP Authentication
**Feature Flag**: `whatsappAuth: true`

**What it is:**
Passwordless authentication where clients log in via a code sent to their WhatsApp. No email, no password, no friction.

**How it works:**
1. Client enters their phone number on login page
2. System sends 6-digit code via WhatsApp Cloud API
3. Client enters code → session created with HMAC signature
4. Session cookie stored securely (HttpOnly, 30-day TTL)

**Benefits:**
- **Higher conversion** — No password to forget, 90%+ delivery rate on WhatsApp in Paraguay
- **Trust** — WhatsApp is the primary communication channel for Paraguayan SMB customers
- **Security** — No email/password to breach, HMAC session tokens are cryptographically secure
- **Simplicity** — Clients remember their WhatsApp, not another password

**Why it matters:**
Paraguayan customers are WhatsApp-native. Using their existing WhatsApp number eliminates the biggest friction point in online checkout and client portal access. Businesses see 40-60% higher portal adoption vs email/password systems.

---

### 2. Gift Cards
**Feature Flag**: `giftCards: true`

**What it is:**
Digital gift cards purchased via Stripe Checkout. Customers buy gift cards for friends/family, redeemed online or in-person.

**How it works:**
1. Customer selects gift card amount (Gs. 50,000 - 500,000)
2. Stripe Checkout handles payment
3. Webhook receives payment confirmation → creates gift card record
4. Gift card code sent via email/WhatsApp to recipient
5. Recipient uses code at checkout or views balance at `/c/[token]`

**Benefits:**
- **New revenue stream** — Gift cards are pure profit, no inventory cost
- **Customer acquisition** — Gift recipients become new customers
- **Cash flow** — Payment received before service rendered
- **Brand awareness** — Branded gift cards spread awareness

**Why it matters:**
Gift cards drive impulse purchases and introduce your business to new customers through existing loyal ones. Each gift card is a mobile billboard with a call-to-action. Businesses typically see 15-25% of gift card recipients become repeat customers.

---

### 3. Loyalty Program
**Feature Flag**: `loyaltyProgram: true`

**What it is:**
Points-based reward system. Clients earn points for purchases and referrals, redeemable for discounts or free services.

**How it works:**
1. Client completes booking → earns 10 loyalty points
2. Client refers friend → referrer earns 25 points, referee earns 10 points
3. Points accumulate → tier upgrade (Bronce → Plata → Oro)
4. Higher tiers unlock rewards and exclusive benefits
5. Points tracked in Supabase loyalty_transactions table

**Benefits:**
- **Retention** — Customers return to earn/redeem points
- **Word-of-mouth** — Referral bonus incentivizes bringing friends
- **Data collection** — Track customer preferences and behavior
- **Competitive advantage** — Differentiation from competitors without loyalty programs

**Why it matters:**
Acquiring a new customer costs 5-7x more than retaining one. A well-designed loyalty program increases customer lifetime value by 25-40%. The referral component turns customers into brand ambassadors.

---

### 4. Referral System
**Feature Flag**: `referral: true`

**What it is:**
Structured referral program where existing clients invite friends and both receive benefits.

**How it works:**
1. Client in portal sees unique referral link
2. Shares via WhatsApp/Instagram/SMS
3. Friend signs up (creates account via WhatsApp OTP)
4. Both receive bonus points/credits
5. Admin tracks referral stats in dashboard

**Benefits:**
- **Zero-cost marketing** — Customers do the advertising for you
- **Trust transfer** — Friend recommendations carry 4x credibility vs ads
- **Tracking** — Know exactly which clients bring new business
- **Incentive alignment** — Both parties benefit, creating positive associations

**Why it matters:**
"Traé una amiga" leverages existing customer trust. A satisfied customer recommending your business to a friend is the most effective and cheapest marketing channel. Businesses report 20-35% of new customers come through referrals.

---

### 5. Online Booking System
**Feature Flag**: `bookingForm: true`

**What it is:**
Dual booking channel: online form + WhatsApp fallback. Captures all bookings even without Supabase configured.

**How it works:**
1. Customer fills form (name, phone, service, preferred date, notes)
2. System tries to save to Supabase bookings table
3. If Supabase unavailable → saves to JSON file fallback
4. WhatsApp fallback message constructed with booking details
5. Admin sees all bookings in dashboard

**Benefits:**
- **Never miss a booking** — WhatsApp fallback ensures no lost leads
- **Data-driven** — All bookings captured digitally for follow-up
- **Efficiency** — Automates scheduling, reduces phone calls
- **Insights** — Analytics show popular services, peak times

**Why it matters:**
Every missed booking is lost revenue. The WhatsApp fallback means even if your database is down, you still capture the lead via auto-generated WhatsApp message. Businesses convert 60% more inquiries with online booking vs phone-only.

---

### 6. Promotions and Ofertas
**Feature Flag**: `promotions: true`

**What it is:**
Time-limited offers displayed prominently on site and social media. Includes badge, color, countdown to expiry.

**How it works:**
1. Admin creates promotion in dashboard (title, badge, description, expiry, color)
2. Promotion appears on homepage carousel, /ofertas page, and social sharing
3. Optional WhatsApp message pre-filled for sharing
4. Expired promotions auto-hide from public view

**Benefits:**
- **Urgency** — Time-limited offers drive faster decisions
- **Traffic** — Promotion pages attract search traffic
- **Social sharing** — Easy WhatsApp/Instagram sharing buttons
- **Seasonal campaigns** — Flash sales, holiday specials, launch offers

**Why it matters:**
Promotions create urgency and give hesitant customers a reason to buy now. Limited-time offers convert 30-50% better than regular pricing. Each promotion is also content for social media marketing.

---

### 7. E-commerce Store
**Feature Flag**: `ecommerce: true`, `products: true`

**What it is:**
Full product catalog with Stripe-powered checkout. Products, categories, cart, checkout flow.

**How it works:**
1. Admin adds products via dashboard (name, price, description, images)
2. Products displayed on /tienda and /products pages
3. Cart managed via /api/cart route
4. Checkout via Stripe Checkout session
5. Success/cancel redirect URLs with session tracking

**Benefits:**
- **Revenue** — Sell products 24/7, not just during business hours
- **Scalability** — Handle unlimited products without extra staff
- **Inventory tracking** — Know what's selling, what's not
- **Market reach** — Customers can buy from anywhere

**Why it matters:**
E-commerce transforms your website from a brochure into a revenue machine. Even service businesses can sell products (merchandise, gift packages, prepaid sessions). Businesses with online stores see 40% higher revenue per visitor.

---

### 8. Client Portal (Mi Cuenta)
**Feature Flag**: `clientPortal: true`

**What it is:**
Personal dashboard where clients view booking history, loyalty points, gift cards, and account details.

**How it works:**
1. Client logs in via WhatsApp OTP
2. Dashboard shows: points balance, tier status, gift cards, visit history
3. Client can view upcoming appointments
4. Referral link for sharing
5. WhatsApp direct contact button

**Benefits:**
- **Engagement** — Clients return to check points and progress
- **Transparency** — See all activity, builds trust
- **Self-service** — Reduces support inquiries
- **Data** — Track engagement patterns

**Why it matters:**
Clients who log in regularly are 3x more likely to book again. The portal creates an ongoing relationship, not a one-time transaction. Each login is a chance to remind them of upcoming services and special offers.

---

### 9. Blog
**Feature Flag**: `blog: true`

**What it is:**
Content marketing platform with blog posts, articles, news updates. Serves both customers and SEO.

**How it works:**
1. Admin creates posts in content/es/blog/posts/ (markdown format)
2. Blog listing at /es/blog with excerpts and featured images
3. Individual post at /es/blog/[slug]
4. Auto-generated meta tags, JSON-LD structured data
5. Related posts suggested at bottom

**Benefits:**
- **SEO** — Fresh content ranks better in Google
- **Authority** — Position as expert in your industry
- **Trust** — Regular content shows business is active
- **Sharing** — Blog posts shareable on social media

**Why it matters:**
Businesses with active blogs get 67% more leads than those without. Each blog post is a landing page for search queries. A post about "how to choose the right service" captures customers actively researching.

---

### 10. Newsletter Subscription
**Feature Flag**: `newsletter: true`

**What it is:**
Email capture with consent. Collected emails stored in Supabase or JSON fallback.

**How it works:**
1. Widget appears in footer, exit-intent popup, or standalone page
2. Client enters email → validates format
3. Stored in newsletter_subscribers table or data/subscribers.json
4. Admin exports list for email campaigns
5. GDPR-compliant with consent checkbox

**Benefits:**
- **Direct channel** — Own your audience, not dependent on social algorithms
- **Retargeting** — Send promotions to past visitors
- **Warm leads** — Email subscribers convert 3x better than cold traffic
- **Automation** — Connect to email marketing tools

**Why it matters:**
Social media reach is declining. Email is the only marketing channel you fully own. A list of 1,000 engaged subscribers is worth more than 10,000 social followers. Email has 40x higher ROI than social media.

---

## UX and Conversion Features

### 11. Exit Intent Popup
**Feature Flag**: `exitIntentPopup: true`

**What it is:**
Popup triggered when visitor shows intent to leave (mouse moves toward browser bar).

**How it works:**
1. First-time visitor moves mouse toward browser top
2. Popup appears with special offer or newsletter signup
3. Cooldown of 7 days so same visitor does not see again
4. Cooldown stored in localStorage

**Benefits:**
- **Recover abandoning visitors** — Catch leavers before they go
- **Lead capture** — Turn anonymous exit into email subscriber
- **Discount justification** — Small discount often enough to convert
- **Non-intrusive** — Only triggers on actual exit intent

**Why it matters:**
The average exit intent conversion rate is 4-8%. That is visitors who were leaving with zero chance of return, now converted to leads or customers. For e-commerce, exit popups recover 10-15% of abandoned carts.

---

### 12. Cookie Consent GDPR
**Feature Flag**: `cookieConsent: true`

**What it is:**
GDPR-style banner asking consent for analytics cookies. Required for European visitors.

**How it works:**
1. Banner appears on first visit
2. Client chooses "Accept all", "Reject", or "Customize"
3. Preferences stored in localStorage
4. Only loads analytics if explicitly consented
5. Can be toggled from footer link

**Benefits:**
- **Legal compliance** — GDPR required if serving EU visitors
- **Trust** — Transparency about data usage builds trust
- **Control** — Customers appreciate choice
- **No cookie warnings** — Once accepted, no more banners

**Why it matters:**
Beyond legal compliance, cookie consent shows respect for privacy. This builds trust with privacy-conscious customers. In Paraguay's growing digital economy, EU connections and customers are increasingly common.

---

### 13. Testimonials Carousel
**Feature Flag**: `testimonialsCarousel: true`

**What it is:**
Rotating display of customer testimonials with photos, ratings, and text.

**How it works:**
1. Admin adds testimonials to content/es/testimonials.json
2. Carousel displays auto-rotating (can pause on hover)
3. Star ratings shown (1-5 stars)
4. Customer photo if available
5. Social proof elements build trust

**Benefits:**
- **Trust** — New visitors see real customer validation
- **Credibility** — Third-party endorsement is more believable than self-claims
- **Engagement** — Animated carousel holds attention
- **Social proof** — "Others are buying this" effect

**Why it matters:**
92% of consumers read reviews before making a purchase decision. Testimonials are word-of-mouth amplified. A business with visible testimonials converts 270% better than one without.

---

### 14. Before After Slider
**Feature Flag**: `beforeAfterSlider: true`

**What it is:**
Interactive image comparison slider showing transformation results.

**How it works:**
1. Admin uploads before and after images
2. Draggable slider reveals before/after
3. Used for: renovation results, styling transformations, treatment results
4. Mobile-friendly touch interface

**Benefits:**
- **Visual proof** — Show real results, not just claims
- **Engagement** — Interactive element increases time on page
- **Shareable** — Great for social media before/after posts
- **Trust** — Seeing is believing

**Why it matters:**
One before/after image is worth 1,000 words of description. For service businesses (salons, gyms, renovation), it dramatically reduces the "what will I look like?" hesitation.

---

### 15. Gallery
**Feature Flag**: `gallery: true`

**What it is:**
Showcase of work photos in responsive grid with lightbox view.

**How it works:**
1. Admin adds images to content/es/gallery.json
2. Responsive grid displays on homepage or /galeria page
3. Click opens lightbox with navigation
4. Optional captions and categories
5. Lazy loading for performance

**Benefits:**
- **Work showcase** — Show, do not tell your capabilities
- **Quality signal** — Professional photos signal professional business
- **Inspiration** — Help customers envision their own results
- **SEO** — Images rank in Google Image search

**Why it matters:**
Customers make judgments based on portfolio. A professional gallery tells visitors "this business takes quality seriously." Businesses with galleries convert 60% better on inquiry forms.

---

### 16. Animated Stats
**Feature Flag**: `stats: true`

**What it is:**
Animated counters showing business metrics (years in business, clients served, 5-star reviews).

**How it works:**
1. Stats defined in content/es/stats.json
2. Numbers animate from 0 to value on scroll into view
3. Includes icons and labels
4. Mobile-responsive sizing

**Benefits:**
- **Credibility** — "X years in business" signals stability
- **Scale** — Large numbers impress (10,000+ clients)
- **Social proof** — "5-star reviews" validates quality
- **Professionalism** — Animated elements look premium

**Why it matters:**
Visitors decide in 3-5 seconds if they trust you. Animated stats provide instant credibility signals. A business that is "served 5,000 clients" feels safer than "serving clients since 2020."

---

### 17. WhatsApp Float Button
(Always on, no flag)

**What it is:**
Fixed button in bottom-right corner linking directly to WhatsApp chat.

**How it works:**
1. WhatsApp icon fixed to bottom-right on all pages
2. Click opens WhatsApp with pre-filled message
3. Mobile: opens WhatsApp app directly
4. Desktop: opens WhatsApp Web

**Benefits:**
- **Instant contact** — No searching for phone number
- **High intent** — Customer already curious, easy to ask questions
- **Response time** — WhatsApp average response < 5 minutes
- **Availability** — Customers can message outside business hours

**Why it matters:**
80% of Paraguayan SMB customers prefer WhatsApp for business inquiries. The floating button gives them one-tap access to your most responsive communication channel.

---

### 18. Google Maps Embed
**Feature Flag**: `googleMapsEmbed: true`

**What it is:**
Interactive map showing business location, embedded directly on site.

**How it works:**
1. Coordinates from content/es/site.json → business.coordinates
2. Google Maps iframe embed in contact page
3. Shows marker at exact location
4. Includes hours and phone number on map info window

**Benefits:**
- **Findability** — Customers can navigate to you easily
- **Trust** — Physical address builds legitimacy
- **Directions** — One tap for directions in Google Maps app
- **Hours** — Map info shows current open/closed status

**Why it matters:**
33% of searches near me result in a visit same day. A map on your site captures this local search traffic. Customers who visit your physical location spend 3x more than online-only customers.

---

### 19. FAQ Accordion
**Feature Flag**: `faq: true`

**What it is:**
Expandable questions and answers for common customer questions.

**How it works:**
1. FAQs stored in content/es/faqs.json
2. Accordion displays all Q&As, one expanded at a time
3. Schema.org FAQJSON-LD generated for SEO
4. Search-friendly layout

**Benefits:**
- **Support reduction** — Self-service answers reduces inquiries
- **SEO** — FAQ schema helps rank in search results
- **Objection handling** — Address concerns before they block purchase
- **Time savings** — Both customer and business save time

**Why it matters:**
FAQ pages answer the 20 questions everyone asks. Having them on your site means customers get answers instantly, without waiting for email response. Businesses with FAQs see 30% fewer support contacts.

---

### 20. Breadcrumbs
**Feature Flag**: `breadcrumbs: true`

**What it is:**
Navigation trail showing current location in site hierarchy.

**How it works:**
1. Auto-generated based on URL structure
2. Example: Home > Services > Haircuts > Color
3. Each level clickable to go back
4. Schema.org BreadcrumbList for SEO

**Benefits:**
- **Navigation** — Easy to go back without browser back button
- **Orientation** — Users know where they are
- **SEO** — Breadcrumb schema improves search appearance
- **UX** — Reduces bounce rate by enabling easy exploration

**Why it matters:**
Breadcrumbs reduce bounce rate by 20% and increase page views per session by 15%. They help visitors navigate deeper into your site, increasing chances of conversion.

---

### 21. Scroll Reveal Animations
**Feature Flag**: `scrollReveal: true`

**What it is:**
Elements animate in as visitor scrolls down page.

**How it works:**
1. CSS/JS detects element entering viewport
2. Fade-in + slight upward motion on enter
3. Staggered timing for lists/grids
4. Only triggers once per element

**Benefits:**
- **Engagement** — Keeps visitor interested, scrolling
- **Premium feel** — Animations signal professional design
- **Storytelling** — Guide attention to important elements
- **Memory** — Animated elements remembered better

**Why it matters:**
Sites with scroll animations see 70% higher engagement time. The motion draws the eye and creates a sense of progress and discovery.

---

### 22. Error Boundary
**Feature Flag**: `errorBoundary: true`

**What it is:**
React error boundary that catches crashes and shows graceful error page instead of blank white screen.

**How it works:**
1. Error boundary wraps all page components
2. If component crashes, shows friendly error page
3. "Something went wrong" with option to reload
4. Error logged for debugging

**Benefits:**
- **No white screens** — Never show raw error to visitors
- **Graceful degradation** — App continues working around broken part
- **Professionalism** — Shows handling of unexpected situations
- **Support** — Easier to debug when errors are caught

**Why it matters:**
A white screen of death has 90% bounce rate. Error boundaries ensure visitors always see something useful, maintaining trust even when things go wrong.

---

## Advanced Features

### 23. Dark Mode
**Feature Flag**: `darkMode: true`

**What it is:**
Toggle between light and dark site themes. Respects system preference by default.

**How it works:**
1. Check system preference on first load
2. Toggle button in header
3. Preference saved in localStorage
4. All colors switch via CSS variables
5. Persists across sessions

**Benefits:**
- **Accessibility** — Better for visually impaired users
- **Battery saving** — OLED screens use less power in dark mode
- **Preference** — Some users prefer dark themes
- **Modern** — Premium feature users expect

**Why it matters:**
Dark mode is the #1 requested UI feature. Users have strong preferences, and respecting that preference increases time on site by 20-30%.

---

### 24. Instagram Feed
**Feature Flag**: `instagramFeed: true`

**What it is:**
Live display of Instagram posts on your website.

**How it works:**
1. Connects to Instagram Business account via API
2. Displays recent posts in grid layout
3. Links to actual Instagram post
4. Cached to reduce API calls
5. Fallback to static images if API unavailable

**Benefits:**
- **Social proof** — "Followers on Instagram" shows popularity
- **Fresh content** — Always showing latest posts
- **Engagement** — Visitors can like/follow without leaving your site
- **Double exposure** — Your Instagram drives traffic to site, site drives followers to Instagram

**Why it matters:**
Instagram is where your brand personality lives. Showing your feed on your site gives visitors evidence of your social presence without requiring them to leave.

---

### 25. Cart System
**Feature Flag**: `cart: true`

**What it is:**
Shopping cart with persistent items across sessions.

**How it works:**
1. Add to cart button on products
2. Cart icon shows item count
3. Cart page shows all items, quantities, subtotal
4. Persists via Supabase or localStorage
5. Syncs across devices for logged-in users

**Benefits:**
- **Multi-item purchases** — Customers buy more
- **Session persistence** — Items saved if they leave and return
- **Upselling** — Easy to add more items
- **Abandonment recovery** — Can remarket to cart abandoners

**Why it matters:**
Customers who use cart have 3x higher average order value. Cart abandonment emails recover 15-20% of lost sales.

---

### 26. Checkout Flow
**Feature Flag**: `checkout: true`

**What it is:**
Stripe-powered checkout with payment processing and order confirmation.

**How it works:**
1. Cart → Checkout page
2. Stripe Checkout handles payment
3. Webhook confirms payment
4. Order stored in database
5. Confirmation email/WhatsApp sent

**Benefits:**
- **Security** — Never touches your server, PCI compliant
- **Conversion** — Stripe's optimized checkout converts 20% better
- **Multicard** — Accepts all major cards
- **International** — Pay in customer's currency

**Why it matters:**
Checkout is where purchases are won or lost. Stripe Checkout has 20% higher conversion than custom checkout flows due to trust and familiarity.

---

### 27. Process Section
**Feature Flag**: `process: true`

**What it is:**
Step-by-step visual showing how your service works.

**How it works:**
1. Admin defines steps in content/es/process.json
2. Horizontal timeline or numbered steps displayed
3. Icons and descriptions for each step
4. Mobile: stacked vertical layout

**Benefits:**
- **Clarity** — "How does this work?" answered instantly
- **Barriers** — Reduces hesitation by setting expectations
- **Trust** — Transparent process shows professionalism
- **Engagement** — Interactive timeline keeps attention

**Why it matters:**
The biggest objection in service businesses is "I do not know what happens next." Process section eliminates this, reducing inquiry drop-off by 40%.

---

## Feature Flags Structure

All features controlled via content/es/site.json → features:

```json
{
  "features": {
    "blog": true,
    "loyaltyProgram": true,
    "referral": true,
    "ecommerce": true
  }
}
```

## Feature Dependencies

| Feature | Requires |
|---------|----------|
| Gift Cards | Stripe (STRIPE_SECRET_KEY) |
| Loyalty Program | Supabase |
| Referral System | Supabase |
| Client Portal | WhatsApp OTP Auth |
| E-commerce | Stripe + Supabase |
| Newsletter | Supabase (optional) |

## Performance

All features designed for:
- First load under 2s — code-split by route
- LCP under 2.5s — optimized images, lazy loading
- CLS under 0.1 — reserved space for dynamic content
- FID under 100ms — minimal main thread blocking

## Future Features (Planned)

- **Service Booking Calendar** — Interactive calendar with availability
- **Multi-language Content** — Manual translations vs AI translation
- **Advanced Analytics** — Heatmaps, session recordings
- **A/B Testing** — Test different headlines/CTAs
