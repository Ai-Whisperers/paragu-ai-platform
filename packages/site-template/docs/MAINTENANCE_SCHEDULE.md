# MAINTENANCE SCHEDULE
## Keeping the Website Healthy, Secure, and Performing

**Purpose:** Define regular maintenance tasks, frequency, and ownership to ensure the website remains functional and competitive.

---

## MAINTENANCE PHILOSOPHY

> "A website that's not maintained is a website that slowly dies. Updates prevent problems; maintenance sustains growth."

**Principle:** Monthly investment in maintenance prevents costly emergency repairs.

---

## TASK FREQUENCY OVERVIEW

| Task | Daily | Weekly | Monthly | Quarterly | Annually |
|------|-------|--------|---------|-----------|----------|
| Monitor uptime | ✅ | | | | |
| Check bookings | ✅ | | | | |
| Review errors | | ✅ | | | |
| Update plugins/packages | | ✅ | | | |
| Check analytics | | | ✅ | | |
| Review content freshness | | | ✅ | | |
| Test all forms | | | ✅ | | |
| Backup verification | | | ✅ | | |
| SEO review | | | | ✅ | |
| Security audit | | | | ✅ | |
| Performance audit | | | | ✅ | |
| Full content review | | | | | ✅ |
| SSL certificate check | | | | | ✅ |
| Design refresh | | | | | ✅ |

---

## DAILY TASKS (5 minutes)

### Uptime Monitoring

**What:** Verify website loads for visitors

**How:**
- Check GA4 real-time (any active users?)
- Visit the site yourself on mobile
- Automated uptime monitoring (UptimeRobot, Pingdom)

**If down:**
1. Check hosting status (Hostinger/Vercel/Supabase)
2. Restart server if applicable
3. Contact support if persistent

### Booking Inbox Check

**What:** Review new bookings and respond appropriately

**How:**
- Check admin dashboard /bookings
- Check WhatsApp for booking notifications
- Confirm bookings within 2 hours

**Response template:**
> "¡Hola [Name]! Confirmado tu turno para [Date] [Time]. Te esperamos! 💇‍♀️"

---

## WEEKLY TASKS (30-60 minutes)

### 1. Review Error Logs

**What:** Check for PHP errors, JavaScript errors, API failures

**Where to check:**
- Supabase logs: `supabase_get_logs`
- Hosting error logs: Hosting dashboard
- Browser console: Developer tools

**Common errors to watch:**
| Error Type | Cause | Fix |
|------------|-------|-----|
| 500 errors | Server issue | Restart/redeploy |
| 404 errors | Broken links | Fix or redirect |
| Form submission failures | API issue | Check data store |
| Payment failures | Stripe misconfigured | Verify keys |

### 2. Update Dependencies

**What:** Keep packages current

**Commands:**
```bash
npm update
npm audit fix
```

**Check after update:**
- Run `npm run build` — verify no errors
- Test key flows: booking, purchase, login

**When to update:**
- Security patches: Immediately
- Minor features: Monthly batch
- Major version changes: Quarterly review

### 3. Check Analytics

**What:** Review week's performance

**Metrics to check:**
| Metric | Tool | What to Look For |
|--------|------|------------------|
| Traffic | GA4 | Significant drops (>20%) |
| Top pages | GA4 | Expected pages getting traffic |
| Conversions | GA4 | Booking forms working |
| Errors | Search Console | Coverage errors |
| Keywords | Search Console | Ranking changes |

### 4. Social Media Sync

**What:** Ensure social links work

**Check:**
- Instagram link goes to correct profile
- Facebook link works
- WhatsApp button opens WhatsApp
- Share buttons function

---

## MONTHLY TASKS (1-2 hours)

### 1. Content Freshness Review

**What:** Ensure content is current

**Checklist:**
| Item | Status | Action |
|------|--------|--------|
| Prices current | ⬜ | Update if changed |
| Hours correct | ⬜ | Update holiday hours |
| Services list accurate | ⬜ | Add/remove as needed |
| Team info current | ⬜ | Update if staff changed |
| Photos current | ⬜ | Add new work samples |
| Blog posts recent | ⬜ | Publish if none in 30 days |

### 2. Test All Interactive Elements

**Test every form and flow:**

| Element | Test Action | Expected Result |
|---------|-------------|-----------------|
| Booking form | Submit test booking | Confirmation shown |
| Contact form | Send test message | Message in inbox |
| Newsletter signup | Enter test email | Success confirmation |
| Gift card purchase | Complete test checkout | Stripe redirect |
| Loyalty sign-in | OTP flow | Session created |
| WhatsApp button | Click button | WhatsApp opens |

### 3. Backup Verification

**What:** Confirm backups are working

**Check:**
- Supabase: Last backup timestamp
- JSON fallback files: Recent modifications
- Any manual backups: Stored correctly

**Test restore (quarterly):**
- Restore to test environment
- Verify data integrity

### 4. Plugin/Integration Health

| Integration | Check | If Broken |
|-------------|-------|-----------|
| Stripe | Test payment | Check keys, webhook |
| WhatsApp | Send test message | Check API status |
| Google Analytics | Verify tracking | Check GA4 ID |
| Facebook Pixel | Check events | Verify Pixel ID |
| Instagram Feed | Load feed | Refresh token if needed |

### 5. Review New Reviews

**What:** Respond to Google and social reviews

**Template responses:**

*Positive:*
> "¡Gracias [Name]! Nos alegra mucho saber eso. ¡Te esperamos pronto! 🙌"

*Negative:*
> "Hola [Name], gracias por tu opinión. Lamentamos que no fue la experiencia esperada. Contactanos directamente para resolverlo: [WhatsApp]. — El equipo"

---

## QUARTERLY TASKS (Half-day)

### 1. SEO Audit

**What:** Full search visibility review

**Checklist:**
| Item | Tool | Status |
|------|------|--------|
| Sitemap accessible | /sitemap.xml | ⬜ |
| Robots.txt correct | /robots.txt | ⬜ |
| Core Web Vitals pass | PageSpeed Insights | ⬜ |
| Mobile friendly | Google Mobile Test | ⬜ |
| Keywords ranked | Search Console | Review |
| No manual actions | Search Console | ⬜ |
| Backlinks stable | External tool | ⬜ |

### 2. Performance Audit

**What:** Ensure site loads fast

**Target metrics:**

| Metric | Target | If Worse |
|--------|--------|----------|
| LCP (Largest Contentful Paint) | < 2.5s | Optimize images |
| FID (First Input Delay) | < 100ms | Reduce JS |
| CLS (Cumulative Layout Shift) | < 0.1 | Reserve image space |
| Full page load | < 3s | CDN, compress |
| Time to Interactive | < 3.5s | Code-split |

**Optimization actions:**
- Compress images (TinyPNG, Squoosh)
- Enable gzip/brotli compression
- Review JavaScript bundle size
- Check hosting CDN configuration

### 3. Security Audit

**What:** Ensure no vulnerabilities

**Checklist:**
| Item | Action |
|------|--------|
| SSL certificate | Verify valid and not expiring |
| Admin sessions | Review active sessions |
| Passwords | Ensure strong admin passwords |
| API keys | Verify not exposed in code |
| Form security | Check for SQL injection / XSS |
| Payment security | Verify Stripe webhook signature |

### 4. Competitor Review

**What:** See what competitors are doing

**Review:**
- 3-5 competitor websites
- New features they added
- New content they're publishing
- Pricing changes
- Design updates

**Takeaways:**
- What's working for them?
- What should we add/do differently?
- Any gaps we can fill?

---

## ANNUALLY TASKS (Full day)

### 1. Full Content Review

**What:** Complete content audit

**Audit every page:**

| Page | Content Review | SEO Review | Design Review |
|------|---------------|------------|---------------|
| Homepage | Accurate, fresh | Keywords | Layout OK |
| Services | Prices, descriptions | Meta tags | Images OK |
| About | Team, story current | H1/H2 | No outdated info |
| Contact | Phone, hours, map | Schema | Links work |
| Blog | All posts relevant | Old posts updated | — |
| FAQ | Questions current | Schema | — |

### 2. Design Refresh

**What:** Keep site looking modern

**Consider updating:**
- New hero images
- Updated color accents
- Fresh testimonial photos
- Recent work samples
- New team member photos

**When to redesign:**
- Site is > 3 years old
- Design looks dated
- Major brand changes
- Conversion rates declining

### 3. Technology Stack Review

**What:** Evaluate if current tech is optimal

**Questions:**
- Is Next.js version current?
- Are packages up to date?
- Is hosting performing well?
- Should we upgrade any integrations?
- Any deprecated APIs?

### 4. Strategy Review

**What:** Align website with business goals

**Questions:**
- Are business goals reflected on site?
- Is the messaging still relevant?
- Should we add new features?
- Are pricing tiers still appropriate?
- What's the competition doing differently?

---

## MAINTENANCE CALENDAR

### January
- [ ] New Year content refresh
- [ ] Holiday hours update (if applicable)
- [ ] Yearly analytics review

### February
- [ ] Q1 SEO audit
- [ ] Performance review

### March
- [ ] Easter/promised content updates
- [ ] Backup verification test

### April
- [ ] Mid-year content refresh
- [ ] Review H1 metrics vs goals

### May
- [ ] Q2 SEO audit
- [ ] Competitor review

### June
- [ ] Mid-year check-in
- [ ] SSL certificate check (if annual)

### July
- [ ] Holiday content prep (if seasonal)
- [ ] Backup verification test

### August
- [ ] Q3 SEO audit

### September
- [ ] Design refresh (if planned)
- [ ] Technology stack review

### October
- [ ] Holiday preparation
- [ ] Promotional content ready

### November
- [ ] Black Friday / holiday promotions
- [ ] Final year push

### December
- [ ] Holiday hours update
- [ ] Year in review content
- [ ] Plan for next year

---

## MAINTENANCE PRICING Tiers

### Basic Maintenance (G. 50k/month)
- Weekly dependency updates
- Monthly backups verification
- Uptime monitoring
- Error log review
- SSL certificate check

### Standard Maintenance (G. 100k/month)
- Everything in Basic
- Monthly performance audit
- Quarterly SEO audit
- Content freshness review
- Security audit

### Premium Maintenance (G. 200k/month)
- Everything in Standard
- Monthly content updates (up to 2 pages)
- Weekly analytics review
- Priority support
- Quarterly design refresh

---

## EMERGENCY PROTOCOL

### When Something Breaks

| Severity | Examples | Response Time | Contact |
|----------|----------|---------------|---------|
| Critical | Site down, payment broken | 1 hour | Emergency line |
| High | Booking form broken, forms not working | 4 hours | Priority support |
| Medium | Minor display issue, outdated content | 24 hours | Regular support |
| Low | Typo, cosmetic issue | 72 hours | Regular support |

### Emergency Contacts

| Service | Contact | Hours |
|---------|---------|-------|
| Hosting (Hostinger) | h责任制@hostinger.com | 24/7 |
| Supabase | support@supabase.io | Business hours |
| Stripe | support@stripe.com | Business hours |
| WhatsApp Business | business.whatsapp.com | Self-service |

---

*Document version: 1.0*
*Use: Website maintenance planning*
*Last updated: June 2, 2026*