# CroiConcrete Website - Deployment Checklist

## Pre-Deployment

### 1. Images to Create & Upload
- [ ] **og-image.jpg** (1200x630px) - Social media sharing image
  - Should showcase 2-3 of your best products
  - Include "Croi Concrete" branding
  - Use warm, natural lighting
  
- [ ] **logo.png** (400x400px minimum) - Brand logo
  - Transparent background preferred
  - High resolution for various uses

### 2. Environment Variables (Cloudflare Dashboard)
Go to your Cloudflare Pages project → Settings → Environment Variables

**Production Environment:**
```
ETSY_API_KEY=your_actual_key_here
ETSY_SHARED_SECRET=your_actual_secret_here
SQUARE_ACCESS_TOKEN=your_actual_token_here
SQUARE_LOCATION_ID=your_actual_location_id_here
```

**Preview/Development Environment:**
Use sandbox/test credentials if available

### 3. Cloudflare Web Analytics Setup
1. Go to Cloudflare Dashboard → Analytics → Web Analytics
2. Add your site: croiconcrete.co.uk
3. Copy the Beacon Token
4. In index.html, replace `YOUR_CLOUDFLARE_BEACON_TOKEN` with actual token

### 4. Domain Configuration
- [ ] Verify DNS is pointing to Cloudflare Pages
- [ ] SSL/TLS is set to "Full (strict)" in Cloudflare
- [ ] Enable "Always Use HTTPS"
- [ ] Add www redirect if desired (www.croiconcrete.co.uk → croiconcrete.co.uk)

### 5. Files to Upload to Root Directory
- [ ] index.html (updated version)
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] _headers
- [ ] 404.html
- [ ] og-image.jpg (once created)
- [ ] logo.png (once created)
- [ ] functions/ directory (existing)

## Post-Deployment Testing

### Functionality Tests
- [ ] Homepage loads correctly
- [ ] Products load from Etsy API
- [ ] Hero image populates
- [ ] Mobile navigation works (hamburger menu)
- [ ] Product modals open correctly
- [ ] Square payment form loads (test with $0.01 payment)
- [ ] Blog posts open in modal
- [ ] All internal links work
- [ ] Etsy shop links work

### Performance Tests
- [ ] Run Lighthouse audit (target 90+ score)
- [ ] Check mobile performance
- [ ] Verify lazy loading works
- [ ] Test on slow 3G connection

### SEO Tests
- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags with Facebook Debugger
- [ ] Test Twitter card with Twitter Card Validator
- [ ] Check schema.org markup with Google Rich Results Test

### Cross-Browser Tests
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge

## Security Checklist
- [ ] No API keys in client-side code ✅
- [ ] HTTPS enforced ✅
- [ ] Security headers configured ✅
- [ ] CORS properly configured for API endpoints

## Analytics Setup
- [ ] Cloudflare Web Analytics enabled
- [ ] Set up goal tracking for:
  - Product modal opens
  - Buy button clicks
  - Payment completions
  - Etsy shop clicks

## Marketing Checklist
- [ ] Update Etsy shop to mention standalone website
- [ ] Add website link to social media profiles
- [ ] Submit to Google Business Profile (if applicable)
- [ ] Create initial social media posts announcing website
- [ ] Set up email signature with website link

## Ongoing Maintenance
- [ ] Set calendar reminder to update sitemap monthly
- [ ] Monitor Cloudflare Analytics weekly
- [ ] Check for 404 errors monthly
- [ ] Review and update blog content quarterly
- [ ] Test payment processing monthly

## Support & Resources
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages
- Etsy API Docs: https://developers.etsy.com
- Square Payments Docs: https://developer.squareup.com

## Emergency Rollback
If issues arise, revert to previous deployment:
1. Go to Cloudflare Pages → Deployments
2. Find last working deployment
3. Click "Rollback to this deployment"

---
Last updated: 2026-04-01
