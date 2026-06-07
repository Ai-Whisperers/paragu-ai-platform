# SUPPORT PLAYBOOK
## What to Do When Things Break

**Purpose:** Step-by-step guides for diagnosing and resolving common website issues. For support staff and troubleshooting.

---

## HOW TO USE THIS PLAYBOOK

1. **Identify the symptom** — What is the user seeing?
2. **Find the issue category** — Use the table of contents
3. **Follow the diagnostic steps** — In order
4. **Apply the fix** — Follow the resolution steps
5. **Verify** — Confirm the fix worked
6. **Document** — Note if recurring issue

---

## ISSUE CATEGORIES

| Category | Symptoms | Priority |
|----------|----------|----------|
| Site Down | White screen, 500 error, can't load | 🔴 Critical |
| Forms Not Working | Can't submit booking, contact, etc. | 🔴 Critical |
| Payments Failing | Stripe errors, can't purchase | 🔴 Critical |
| WhatsApp Issues | Button doesn't work, messages not sending | 🟡 High |
| Display Issues | Images missing, layout broken | 🟡 High |
| Login Problems | Can't log in, session expired | 🟡 High |
| Slow Performance | Pages take >5s to load | 🟡 Medium |
| Booking Issues | Double bookings, calendar wrong | 🟡 Medium |
| Email Issues | Not receiving notifications | 🟡 Medium |
| SEO Issues | Site not appearing in Google | 🟢 Low |

---

## 🔴 CRITICAL ISSUES

---

### SITE DOWN / WHITE SCREEN

**Symptoms:**
- Site returns blank white page
- "500 Internal Server Error"
- "This site can't be reached"
- Cloudflare/hosting error page

**Diagnostic Steps:**

**Step 1: Check if it's just you**
- Ask: "Can you access from a different browser/device?"
- Ask: "Can you access from mobile using data (not WiFi)?"

**Step 2: Check hosting status**
1. Check hosting dashboard (Hostinger/Vercel)
2. Look for: Server status, outages, quota exceeded

**Step 3: Check error logs**
```bash
# SSH into server
cd /var/log
tail -100 error.log

# Or check Supabase
supabase_get_logs(service: "postgres")
```

**Step 4: Common causes**

| Cause | How to Identify | Fix |
|-------|-----------------|-----|
| Out of memory | Hosting dashboard shows OOM | Restart server, upgrade plan |
| Database down | Supabase shows unavailable | Check Supabase status |
| Build failed | Recent deploy failed | Revert to previous deploy |
| DNS issues | Can't resolve domain | Check DNS settings |

**Resolution:**

1. **Restart services:**
```bash
sudo systemctl restart nginx
sudo systemctl restart node
```

2. **If build failed:**
```bash
npm run build
# Fix any errors shown
git push
```

3. **If database issues:**
```bash
supabase db restart
# or
supabase_get_logs(service: "postgres")
```

4. **If all else fails:**
- Restore from last working backup
- Contact hosting support

**Verification:**
- Ask user to clear browser cache
- Visit site from incognito window
- Confirm page loads correctly

---

### FORM SUBMISSION FAILING

**Symptoms:**
- Booking form says "Error" after submit
- Contact form not sending
- Form spins forever (loading)
- "Something went wrong" message

**Diagnostic Steps:**

**Step 1: Test the form yourself**
1. Go to the form URL
2. Fill with test data
3. Submit and observe

**Step 2: Check the API endpoint**
```bash
# Check if API is responding
curl -X POST https://yoursite.com/api/booking \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# Expected: JSON response (even if error)
```

**Step 3: Check Supabase/data store**

If using JSON fallback:
```bash
# Check if bookings.json is writable
cat data/bookings.json
```

If using Supabase:
```bash
supabase_execute_sql(query: "SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5;")
```

**Step 4: Common causes**

| Cause | Symptom | Fix |
|-------|---------|-----|
| Missing fields | Validation error | Check required fields |
| API route broken | 500 error | Redeploy |
| Supabase down | Connection error | Check Supabase status |
| Rate limiting | "Too many requests" | Wait, retry |
| CORS issue | Console error | Check API headers |

**Resolution:**

1. **If Supabase issue:**
```bash
# Test Supabase connection
supabase_execute_sql(query: "SELECT 1;")
# If fails: Supabase is down, use JSON fallback
```

2. **If validation issue:**
- Check the form payload
- Ensure all required fields present
- Validate data format

3. **If API route issue:**
```typescript
// Check the API route handler
// app/api/booking/route.ts
// Look for: missing imports, syntax errors, wrong method
```

4. **If JSON fallback needed:**
```bash
# Manually add booking to JSON
cat data/bookings.json
# Add new entry, save
```

**Verification:**
- Submit test booking
- Confirm redirect/success message
- Check data in admin panel

---

### PAYMENT FAILING (Stripe)

**Symptoms:**
- "Stripe not configured" error
- Card declined message
- Checkout redirect fails
- Gift card purchase not completing

**Diagnostic Steps:**

**Step 1: Identify error type**
Common Stripe errors:
| Error Code | Meaning | Fix |
|------------|---------|-----|
| `card_declined` | Card was declined | Try different card |
| `expired_card` | Card expired | Update card |
| `processing_error` | Temporary error | Retry |
| `invalid_card` | Card details wrong | Re-enter |
| `stripe_not_configured` | Keys missing | Set env vars |

**Step 2: Check Stripe logs**
1. Log into Stripe Dashboard
2. Go to Developers → Logs
3. Find the failing payment
4. Check error details

**Step 3: Check environment variables**
```bash
# Check if Stripe keys are set
echo $STRIPE_SECRET_KEY
echo $STRIPE_WEBHOOK_SECRET
echo $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# All should be present and start with sk_ or pk_
```

**Step 4: Verify webhook**
```bash
# Check webhook is configured
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Or check in Stripe Dashboard
# Developers → Webhooks → Check endpoint
```

**Resolution:**

1. **If keys missing:**
```bash
# Add to .env
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

2. **If webhook not configured:**
```bash
# Set webhook endpoint in Stripe
stripe listen --forward-to yoursite.com/api/stripe/webhook
```

3. **If card declined (not our issue):**
- Explain to customer: "Your bank declined the card"
- Suggest: Try different card, contact bank

4. **If test mode accidentally on:**
```bash
# Switch to live keys in .env
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

**Verification:**
- Complete test purchase with Stripe test card
- Check Stripe Dashboard for successful payment
- Confirm gift card code generated

---

## 🟡 HIGH PRIORITY ISSUES

---

### WHATSAPP BUTTON NOT WORKING

**Symptoms:**
- WhatsApp button doesn't open chat
- Opens wrong number
- Message not pre-filled

**Diagnostic Steps:**

**Step 1: Check the phone number format**
```javascript
// In site.json, must be digits only, no +
// Correct: "595981000000"
// Wrong: "+595 981 000 000"
```

**Step 2: Test the link format**
Direct WhatsApp link should be:
```
https://wa.me/595981000000?text=Hola%21%20Quiero%20info
```

**Step 3: Check WhatsApp Web**
- Can they open WhatsApp Web manually?
- Is WhatsApp logged in on the device?

**Resolution:**

1. **Fix phone format in site.json:**
```json
{
  "business": {
    "whatsapp": "595981000000",
    "whatsappMessage": "Hola! Quiero información"
  }
}
```

2. **If link format wrong, check component:**
```typescript
// whatsapp-float.tsx should generate:
// https://wa.me/${whatsapp}?text=${encodedMessage}
```

3. **If working on desktop but not mobile:**
- Verify HTTPS (required for mobile)
- Check if app is installed

**Verification:**
- Click button yourself
- Test on mobile device
- Confirm pre-filled message appears

---

### WHATSAPP OTP NOT SENDING

**Symptoms:**
- User enters phone, gets "Code not sent"
- OTP code never arrives
- User waits >5 minutes

**Diagnostic Steps:**

**Step 1: Check Twilio configuration**
```bash
echo $TWILIO_ACCOUNT_SID
echo $TWILIO_AUTH_TOKEN
echo $TWILIO_WHATSAPP_FROM
# Must all be set for OTP to work
```

**Step 2: Check Twilio console**
1. Log into Twilio Console
2. Check: Programmable SMS → Logs → MMS
3. Look for failed sends

**Step 3: Verify WhatsApp approved**
- Twilio WhatsApp sandbox must be activated
- Business account must be verified

**Resolution:**

1. **If Twilio not configured:**
- Guide client through Twilio setup
- Or: Disable WhatsApp OTP, use fallback auth

2. **If sandbox mode:**
```bash
# Set to production in .env
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
# Must be a WhatsApp Business approved number
```

3. **If OTP service overwhelmed:**
- Rate limiting kicks in after 3 attempts
- Wait 5 minutes, retry

**Verification:**
- Send test OTP to your own number
- Confirm code received in WhatsApp

---

### IMAGES NOT LOADING

**Symptoms:**
- Broken image icons
- "Image not found"
- Images on some pages but not others

**Diagnostic Steps:**

**Step 1: Check image URL**
1. Right-click broken image
2. "Open image in new tab"
3. See actual error

**Step 2: Common causes**

| Cause | Error Shown | Fix |
|-------|-------------|-----|
| Wrong path | 404 Not Found | Fix path in JSON |
| File not uploaded | 404 Not Found | Upload to /public |
| Wrong format | Unsupported | Convert to WebP/JPEG |
| Too large | Timeout/blank | Compress image |
| CORS blocked | Blank | Check source |

**Resolution:**

1. **For demo images:**
```json
// In content JSON, use correct path
"image": "/images-demo/hero/hero-name.png"
// NOT: "./images/hero-name.png"
```

2. **For user uploads:**
- Ensure in /public/images/
- Check filename matches case exactly

3. **For external images:**
```typescript
// next.config.js should allow external images
images: {
  domains: ['images.unsplash.com', 'via.placeholder.com']
}
```

4. **For missing images:**
- Replace with placeholder
- Or remove reference from JSON

**Verification:**
- All images load in browser
- Test on mobile
- Check console for 404s

---

### LOGIN / SESSION ISSUES

**Symptoms:**
- "Session expired" repeatedly
- Can't log in to admin
- "Invalid credentials" error
- Logged out immediately

**Diagnostic Steps:**

**Step 1: Check cookies**
1. Open browser DevTools → Application → Cookies
2. Check for: `admin_session`, `client_session`
3. Verify: HttpOnly, Secure flags

**Step 2: Check token validity**
```bash
# Admin session is JWT, check expiry
# Client session is HMAC, check format

# Verify AUTH_SECRET is set
echo $CLIENT_AUTH_SECRET
# Should be 24+ characters
```

**Step 3: Check session store**
```bash
# If using Supabase sessions
supabase_execute_sql(query: "SELECT * FROM sessions ORDER BY created_at DESC LIMIT 5;")

# If JSON fallback, check sessions are being created
cat data/sessions.json
```

**Resolution:**

1. **Cookie blocked:**
- Check third-party cookies settings
- Add site to allowed list
- Ensure HTTPS

2. **Session expired:**
- Session TTL is 30 days
- User needs to log in again
- Clear cookies, log in fresh

3. **Auth secret wrong/missing:**
```bash
# Regenerate secrets
openssl rand -base64 32

# Update .env
CLIENT_AUTH_SECRET=new-secret-here
ADMIN_AUTH_SECRET=new-secret-here
```

**Verification:**
- Log in fresh
- Stay logged in across pages
- Test session persists after 24 hours

---

## 🟡 MEDIUM PRIORITY ISSUES

---

### BOOKING CALENDAR WRONG

**Symptoms:**
- Available times show as booked
- Bookings don't appear on calendar
- Double bookings

**Diagnostic Steps:**

**Step 1: Check Supabase bookings table**
```sql
SELECT * FROM bookings WHERE preferred_date = '2026-06-15';
```

**Step 2: Check calendar component**
- Is it reading from correct source?
- Is timezone correct?

**Resolution:**

1. **Data mismatch:**
```sql
-- Delete duplicate if double booking
DELETE FROM bookings WHERE id = 'duplicate-id';

-- Update if status wrong
UPDATE bookings SET status = 'confirmed' WHERE id = 'booking-id';
```

2. **Calendar display issue:**
- Hard refresh browser (Cmd+Shift+R)
- Check timezone settings

3. **Availability not updating:**
- Trigger availability recalculation
- Check if new bookings update available slots

---

### SLOW PERFORMANCE

**Symptoms:**
- Pages take >5 seconds to load
- Images load slowly
- Forms timeout

**Diagnostic Steps:**

**Step 1: Check with PageSpeed Insights**
- pagespeed.web.dev
- Enter URL
- Note Core Web Vitals

**Step 2: Check image sizes**
```bash
# Find large images
find public -name "*.jpg" -o -name "*.png" | xargs ls -lh

# Images should be < 200KB
```

**Step 3: Check hosting**
- Is server resources normal?
- Any rate limiting?

**Resolution:**

1. **Compress images:**
```bash
# Use squoosh or tinypng
# Target: < 100KB per image
# Format: WebP where supported
```

2. **Enable caching:**
```javascript
// next.config.js
headers: [
  {
    source: '/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000' }
    ]
  }
]
```

3. **Upgrade hosting if needed:**
- Shared hosting → VPS
- Increase RAM/CPU

---

### NOT RECEIVING EMAILS

**Symptoms:**
- Booking notifications not arriving
- Contact form emails not sent
- User not getting confirmation

**Diagnostic Steps:**

**Step 1: Check if sending**
- Supabase Edge Function logs
- Check if email was triggered

**Step 2: Check spam folder**

**Step 3: Common causes**

| Cause | Fix |
|-------|-----|
| Email provider blocking | Whitelist sender |
| Supabase email not configured | Set up SMTP |
| Wrong email in form | User error |
| Notifications disabled | Enable in settings |

**Resolution:**

1. **If using SendGrid/Resend via Edge Functions:**
```typescript
// Check Edge Function logs
supabase_get_logs(service: "edge-function")
```

2. **If Supabase email:**
- Requires SMTP configuration
- Not included in free tier

3. **Workaround:**
- Ensure WhatsApp notification as primary
- Email is secondary notification

---

## 🟢 LOW PRIORITY ISSUES

---

### SEO / GOOGLE NOT FINDING SITE

**Symptoms:**
- Site doesn't appear in Google
- Wrong information in search results
- Old content showing

**Diagnostic Steps:**

**Step 1: Check if indexed**
```
site:yoursite.com in Google
```

**Step 2: Check Search Console**
- Verify ownership
- Check Coverage report
- Look for errors

**Step 3: Common causes**

| Cause | Fix |
|-------|-----|
| Not submitted to Google | Submit sitemap |
| New site, not indexed yet | Wait 1-2 weeks |
| Blocked in robots.txt | Fix robots.txt |
| Schema errors | Validate schema |
| Content thin | Add more content |

**Resolution:**

1. **Submit sitemap:**
- Go to Google Search Console
- Add property → Verify
- Submit sitemap at /sitemap.xml

2. **Fix robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

3. **If outdated content:**
- Update content
- Submit for re-crawl in Search Console

---

## ESCALATION PATH

| Issue Level | Can Resolve | Escalate To |
|-------------|------------|------------|
| Self-service | Clear instructions in docs | Tier 1 support |
| Tier 1 | Can follow diagnostic steps | Tier 2 support |
| Tier 2 | Requires code fix | Developer |
| Critical | Site down, payment broken | Emergency (24/7) |

---

## DOCUMENTATION FOR RECURRING ISSUES

For each issue resolved, document:

```markdown
## Issue: [Name]

**Symptoms:** [What users report]

**Root Cause:** [What actually caused it]

**Resolution:** [Steps to fix]

**Prevention:** [How to prevent recurrence]

**Date Resolved:** [Date]
**Resolved By:** [Name]
```

---

*Document version: 1.0*
*Use: Support troubleshooting*
*Last updated: June 2, 2026*