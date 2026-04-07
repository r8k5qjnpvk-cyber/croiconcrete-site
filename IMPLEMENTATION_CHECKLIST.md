# 📋 CROICONCRETE - IMPLEMENTATION CHECKLIST

## Phase 1: CRITICAL FIXES (30 minutes)

### 1. Fix Etsy API ⚠️ BLOCKING
**Status:** Not started  
**Time:** 5 minutes

**Steps:**
```bash
cd /Users/cal/Documents/Projects/croiconcrete-site
chmod +x quick-fix.sh
./quick-fix.sh
```

Or manually:
```bash
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name=croiconcrete
wrangler pages secret put ETSY_API_KEY --project-name=croiconcrete
wrangler pages secret put ETSY_SHARED_SECRET --project-name=croiconcrete
```

**Test:**
```bash
curl https://croiconcrete.co.uk/listings
```

**Done when:** Returns JSON array of products

---

### 2. Update Analytics Tokens
**Status:** Not started  
**Time:** 2 minutes

**Edit:** `index.html`
- Line 105: Replace `G-XXXXXXXXXX` with your Google Analytics 4 measurement ID
- Line 111: Replace `YOUR_CLOUDFLARE_BEACON_TOKEN` with your token

**Get tokens:**
- GA4: https://analytics.google.com/analytics/web/
- Cloudflare: Dashboard → Analytics → Web Analytics

---

### 3. Create Favicon Files
**Status:** Not started  
**Time:** 10 minutes

**Steps:**
1. Go to: https://realfavicongenerator.net/
2. Upload `favicon.svg` from your project
3. Download the generated package
4. Extract these files to project root:
   - `favicon-32x32.png`
   - `favicon-16x16.png`
   - `apple-touch-icon.png`
5. Commit and push

---

### 4. Create OG Image
**Status:** Not started  
**Time:** 5 minutes

**Option A - Screenshot:**
1. Open `og-image-template.html` in browser
2. Take screenshot at 1200x630px
3. Save as `og-image.jpg`

**Option B - Design:**
1. Create 1200x630px image in Canva/Figma
2. Include: Product photo + "Croi Concrete" + tagline
3. Save as `og-image.jpg`

---

### 5. Deploy Updates
**Status:** Not started  
**Time:** 2 minutes

```bash
git add .
git commit -m "Fix: API integration + analytics + favicons + OG image"
git push origin main
```

---

## Phase 2: HIGH PRIORITY (6 hours this week)

### 6. Mobile UX Improvements
**Time:** 1 hour

- [ ] Single column grid on <480px screens
- [ ] Better modal scrolling on mobile
- [ ] Horizontal scroll for filters
- [ ] Larger touch targets (min 44x44px)

---

### 7. Add Trust Signals
**Time:** 1 hour

- [ ] Trustpilot widget (or similar)
- [ ] Payment method icons
- [ ] Delivery guarantee badges
- [ ] SSL/Security badges

---

### 8. Enhanced Analytics Tracking
**Time:** 1 hour

- [ ] Filter usage tracking
- [ ] Sort usage tracking
- [ ] Product card click tracking
- [ ] Blog engagement tracking
- [ ] Newsletter signup tracking
- [ ] "Buy on Etsy" click tracking

---

### 9. Add Product Search
**Time:** 30 minutes

- [ ] Search input above filters
- [ ] Real-time search as you type
- [ ] Search across title, description, tags

---

### 10. Create FAQ Section
**Time:** 2 hours

- [ ] Write 10 common questions/answers
- [ ] Create expandable FAQ UI
- [ ] Add to footer or separate page
- [ ] Schema markup for FAQs

---

## Phase 3: MEDIUM PRIORITY (10 hours this month)

### 11. Image Optimization
- [ ] Compress all product images
- [ ] Use 570x570 instead of fullxfull from Etsy
- [ ] Add WebP format support
- [ ] Optimize hero image

### 12. Local SEO Setup
- [ ] Claim Google Business Profile
- [ ] Add to Yell.com
- [ ] Add to FreeIndex
- [ ] Add to local directories
- [ ] Encourage Etsy reviews

### 13. Email Marketing
- [ ] Set up Mailchimp/ConvertKit
- [ ] Create welcome email sequence
- [ ] Design monthly newsletter template
- [ ] Add signup form to checkout

### 14. CTA Optimization
- [ ] A/B test primary CTA color
- [ ] Improve button copy
- [ ] Add urgency for low stock
- [ ] Simplify checkout flow

### 15. Customer Reviews Integration
- [ ] Fetch reviews from Etsy API
- [ ] Display on homepage
- [ ] Add to product modals
- [ ] Schema markup for reviews

### 16. Monitoring & Alerts
- [ ] Set up UptimeRobot
- [ ] Configure Cloudflare Analytics
- [ ] Set up Sentry error tracking
- [ ] Create status page

### 17. Staging Environment
- [ ] Create croiconcrete-staging project
- [ ] Set up staging branch
- [ ] Configure deployment workflow

---

## Phase 4: ONGOING (Content & Marketing)

### 18. Blog Content (2 hours/post)
- [ ] "Best Handmade Gifts Newcastle 2026"
- [ ] "Concrete vs Ceramic Planters"
- [ ] "10 Ways to Style Concrete Homeware"
- [ ] "Behind the Scenes: Studio Tour"
- [ ] "Christmas Gift Guide"
- [ ] "Concrete Care Guide"

### 19. Social Media
- [ ] Instagram Shopping setup
- [ ] Pinterest Rich Pins
- [ ] Weekly Instagram posts
- [ ] Share customer photos
- [ ] Behind-the-scenes content

### 20. Email Campaigns
- [ ] Welcome series (4 emails)
- [ ] Monthly newsletter
- [ ] Abandoned cart emails
- [ ] Re-engagement campaigns

---

## Success Metrics

Track these weekly:

### Traffic
- [ ] Unique visitors
- [ ] Page views
- [ ] Bounce rate
- [ ] Average session duration

### Engagement
- [ ] Products viewed
- [ ] Filters used
- [ ] Blog posts read
- [ ] Newsletter signups

### Conversion
- [ ] Conversion rate
- [ ] Average order value
- [ ] Revenue
- [ ] Sales by source (Etsy vs Square)

### Technical
- [ ] Page load time
- [ ] API response time
- [ ] Error rate
- [ ] Uptime %

---

## Tools & Resources

### Required
- [ ] Wrangler CLI (for deployment)
- [ ] Google Analytics 4
- [ ] Cloudflare account

### Recommended
- [ ] Hotjar (heatmaps)
- [ ] UptimeRobot (monitoring)
- [ ] Mailchimp (email marketing)
- [ ] Canva (graphics)

### Optional
- [ ] Sentry (error tracking)
- [ ] Playwright (testing)
- [ ] Figma (design)

---

## Timeline

**Week 1:** Phase 1 (Critical fixes)
**Week 2-3:** Phase 2 (High priority)
**Month 2:** Phase 3 (Medium priority)
**Ongoing:** Phase 4 (Content & marketing)

---

## Quick Commands

```bash
# Deploy
cd /Users/cal/Documents/Projects/croiconcrete-site
git add .
git commit -m "Your message"
git push origin main

# Test API
curl https://croiconcrete.co.uk/listings | jq

# Check site status
curl -I https://croiconcrete.co.uk

# View logs (Wrangler)
wrangler pages deployment tail --project-name=croiconcrete
```

---

## Support Documents

- **ETSY_API_FIX.md** - Detailed API fix instructions
- **COMPREHENSIVE_ANALYSIS.md** - Full improvement analysis (36 recommendations)
- **quick-fix.sh** - Automated deployment script
- **DEPLOYMENT_STATUS.md** - Current deployment status

---

**Last Updated:** April 4, 2026  
**Priority:** Start with Phase 1 immediately (site currently non-functional)
