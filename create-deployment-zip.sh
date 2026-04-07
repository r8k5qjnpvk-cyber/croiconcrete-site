#!/bin/bash
# Create clean deployment zip for Cloudflare Pages

cd /Users/cal/Documents/Projects/croiconcrete-site

echo "🎯 Creating Cloudflare Pages deployment package..."
echo ""

# Remove old zip if exists
rm -f croiconcrete-deploy.zip

# Create zip excluding unnecessary files
zip -r croiconcrete-deploy.zip . \
  -x "*.git*" \
  -x "*node_modules*" \
  -x "*.DS_Store" \
  -x "*.netlify*" \
  -x "*.wrangler*" \
  -x "*-backup-*" \
  -x "*.sh" \
  -x "*.md" \
  -x "COMPREHENSIVE_ANALYSIS.md" \
  -x "DEPLOYMENT_*.md" \
  -x "ETSY_API_FIX.md" \
  -x "EXECUTIVE_SUMMARY.md" \
  -x "FIX-*.md" \
  -x "IMPLEMENTATION_CHECKLIST.md" \
  -x "QUICK_FIX_GITHUB.md" \
  -x "Connect" \
  -x "Select"

echo "✅ Created: croiconcrete-deploy.zip"
echo ""
echo "📦 Package contents:"
unzip -l croiconcrete-deploy.zip | grep -E '\.(html|js|json|svg|png|jpg)$' | head -20
echo ""
echo "📊 Package size:"
ls -lh croiconcrete-deploy.zip
echo ""
echo "🚀 NEXT STEPS:"
echo ""
echo "1. Go to: https://dash.cloudflare.com"
echo "2. Navigate: Workers & Pages → croiconcrete"
echo "3. Click: 'Create deployment' button"
echo "4. Upload: croiconcrete-deploy.zip"
echo "5. Wait 1-2 minutes for deployment"
echo "6. Test: curl https://croiconcrete.co.uk/listings"
echo ""
echo "Your zip is ready at:"
echo "/Users/cal/Documents/Projects/croiconcrete-site/croiconcrete-deploy.zip"
