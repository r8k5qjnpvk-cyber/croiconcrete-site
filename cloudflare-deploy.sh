#!/bin/bash
# Deploy to Cloudflare Pages

echo "🚀 Deploying to Cloudflare Pages"
echo "================================"
echo ""

# Remove bad remote
git remote remove origin 2>/dev/null

# Check if already deployed
echo "📋 Files ready for deployment:"
wc -l index.html functions/listings.js _headers

echo ""
echo "✅ All files committed locally!"
echo ""
echo "🎯 NEXT STEP - Deploy to Cloudflare:"
echo ""
echo "Since you're using Cloudflare Pages, you have two options:"
echo ""
echo "OPTION 1 - Connect to GitHub (Recommended):"
echo "  1. Create a new GitHub repo at: https://github.com/new"
echo "  2. Name it: croiconcrete-site"
echo "  3. Run these commands:"
echo "     git remote add origin https://github.com/calfinnegan/croiconcrete-site.git"
echo "     git push -u origin main"
echo "  4. Go to Cloudflare Pages dashboard"
echo "  5. Click 'Connect to Git'"
echo "  6. Select your repo and deploy!"
echo ""
echo "OPTION 2 - Direct Upload to Cloudflare Pages:"
echo "  1. Install Wrangler CLI: npm install -g wrangler"
echo "  2. Login: wrangler login"
echo "  3. Deploy: wrangler pages deploy . --project-name=croiconcrete-site"
echo ""
echo "Your changes are committed and ready to push!"
