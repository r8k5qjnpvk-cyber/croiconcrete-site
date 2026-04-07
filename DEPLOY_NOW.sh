#!/bin/bash
# Deploy CroiConcrete to GitHub - Ready to Run!

set -e

echo "🚀 Deploying CroiConcrete to GitHub"
echo "===================================="
echo ""

cd /Users/cal/Documents/Projects/croiconcrete-site

# Remove old remote
git remote remove origin 2>/dev/null || true

# Add GitHub remote with your username
git remote add origin https://github.com/r8k5qjnpvk-cyber/croiconcrete-site.git

# Push code
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main --force

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "🌐 Your repo: https://github.com/r8k5qjnpvk-cyber/croiconcrete-site"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 NEXT: Connect Cloudflare Pages to GitHub"
echo ""
echo "1. Visit: https://dash.cloudflare.com"
echo "   → Workers & Pages"
echo "   → Find your 'croiconcrete' project (or create new)"
echo ""
echo "2. Connect to Git:"
echo "   → Settings → Builds & deployments"
echo "   → Click 'Connect to Git'"
echo "   → Select GitHub → Authorize"
echo "   → Select repository: croiconcrete-site"
echo "   → Framework preset: None"
echo "   → Build command: (leave empty)"
echo "   → Build output directory: /"
echo "   → Save"
echo ""
echo "3. Add Environment Variables:"
echo "   → Settings → Environment variables"
echo "   → Add variable:"
echo "     Name: ETSY_API_KEY"
echo "     Value: [your Etsy API keystring]"
echo "     Environment: Production ✓"
echo "   → Add variable:"
echo "     Name: ETSY_SHARED_SECRET"
echo "     Value: [your Etsy shared secret]"
echo "     Environment: Production ✓"
echo ""
echo "4. Deploy:"
echo "   → Deployments tab → Retry deployment"
echo "   OR run: git commit --allow-empty -m 'Deploy' && git push"
echo ""
echo "5. Test (wait 2 minutes for build):"
echo "   → curl https://croiconcrete.co.uk/listings"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Get your Etsy API credentials:"
echo "   https://www.etsy.com/developers/your-apps"
echo ""
echo "🎉 That's it! Your site will be live in ~3 minutes!"
