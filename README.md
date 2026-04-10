# CroiConcrete Website - Environment Setup

## Required Environment Variables

Set these in your Cloudflare dashboard (Settings > Environment Variables):

### Etsy API
```
ETSY_API_KEY=your_etsy_api_key_here
ETSY_SHARED_SECRET=your_etsy_shared_secret_here
```

### Square Payment
```
SQUARE_ACCESS_TOKEN=your_square_access_token_here
SQUARE_LOCATION_ID=your_square_location_id_here
```

### Cloudflare Web Analytics
Replace `YOUR_CLOUDFLARE_BEACON_TOKEN` in index.html with your actual beacon token from Cloudflare Analytics.

## Recent Improvements

### Performance
- ✅ Font preloading and optimization
- ✅ Lazy loading of Square.js SDK (only loads when needed)
- ✅ Image lazy loading
- ✅ Improved caching headers

### Mobile Experience
- ✅ Added hamburger navigation menu
- ✅ Fully responsive design
- ✅ Touch-friendly tap targets

### SEO
- ✅ Enhanced product schema with availability
- ✅ Twitter Card meta tags
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Proper canonical URLs

### User Experience
- ✅ Better error handling with retry button
- ✅ Improved loading states
- ✅ Privacy policy and terms links
- ✅ Cloudflare Web Analytics ready

### Security
- ✅ API keys moved to environment variables (not hardcoded)
- ✅ Proper CORS headers
- ✅ Secure payment processing

## Next Steps

1. **Upload og-image.jpg** - Create a 1200x630px image showcasing your products
2. **Upload logo.png** - Your brand logo for schema markup
3. **Enable Cloudflare Web Analytics** - Get your beacon token and add to index.html
4. **Test Square payments** - Ensure environment variables are set correctly
5. **Submit sitemap** - Add to Google Search Console

## File Structure

```
/
├── index.html          # Main website file (optimized)
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine instructions
├── og-image.jpg        # Social sharing image (you need to create)
├── logo.png            # Brand logo (you need to create)
└── functions/
    ├── listings.js     # Etsy API integration
    └── square-payment.js # Payment processing
```

## Deployment

This site is deployed via Cloudflare Pages. Any push to main branch will auto-deploy.

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Lighthouse Score: > 90

## Support

For issues or questions, contact: [your-email]



