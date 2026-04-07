#!/bin/bash
# CROICONCRETE - Quick GitHub Deployment

set -e

echo "🚀 CROICONCRETE - GitHub Deployment"
echo "===================================="
echo ""

cd /Users/cal/Documents/Projects/croiconcrete-site

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USER

echo ""
echo "📡 Connecting to GitHub..."

# Remove old remote
git remote remove origin 2>/dev/null || true

# Add GitHub remote
git remote add origin "https://github.com/${GITHUB_USER}/croiconcrete-site.git"

echo ""
echo "📤 Pushing code to GitHub..."

git branch -M main
git push -u origin main --force

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. Connect Cloudflare Pages to GitHub:"
echo "   → Visit: https://dash.cloudflare.com"
echo "   → Go to: Workers & Pages → croiconcrete project"
echo "   → Settings → Builds & deployments → Connect to Git"
echo "   → Select: GitHub → croiconcrete-site repository"
echo ""
echo "2. Add Environment Variables:"
echo "   → Settings → Environment variables"
echo "   → Add: ETSY_API_KEY (your Etsy API keystring)"
echo "   → Add: ETSY_SHARED_SECRET (your Etsy shared secret)"
echo ""
echo "3. Trigger Deployment:"
echo "   → Deployments tab → Retry deployment"
echo "   OR run: git commit --allow-empty -m 'Deploy' && git push"
echo ""
echo "4. Test it works (wait 2 min for build):"
echo "   → curl https://croiconcrete.co.uk/listings"
echo ""
echo "📚 Full instructions: QUICK_FIX_GITHUB.md"
echo ""
echo "Your repo: https://github.com/${GITHUB_USER}/croiconcrete-site"
