#!/bin/bash
# CROICONCRETE - QUICK FIX SCRIPT
# Fixes Etsy API integration in 5 minutes

set -e

echo "🔧 CROICONCRETE QUICK FIX"
echo "========================"
echo ""
echo "This script will:"
echo "  1. Deploy via Wrangler CLI (enables functions/)"
echo "  2. Add Etsy API credentials"
echo "  3. Test the /listings endpoint"
echo ""

cd /Users/cal/Documents/Projects/croiconcrete-site

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
else
    echo "✅ Wrangler already installed"
fi

echo ""
echo "🔐 Logging in to Cloudflare..."
wrangler login

echo ""
echo "🚀 Deploying to Cloudflare Pages..."
wrangler pages deploy . --project-name=croiconcrete

echo ""
echo "🔑 Adding Etsy API credentials..."
echo ""
echo "You'll be prompted to paste your Etsy API credentials."
echo "Get them from: https://www.etsy.com/developers/your-apps"
echo ""
read -p "Press ENTER to continue..."

echo ""
echo "Adding ETSY_API_KEY..."
wrangler pages secret put ETSY_API_KEY --project-name=croiconcrete

echo ""
echo "Adding ETSY_SHARED_SECRET..."
wrangler pages secret put ETSY_SHARED_SECRET --project-name=croiconcrete

echo ""
echo "⏳ Waiting 10 seconds for deployment to complete..."
sleep 10

echo ""
echo "🧪 Testing /listings endpoint..."
echo ""

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://croiconcrete.co.uk/listings)

if [ "$RESPONSE" -eq 200 ]; then
    echo "✅ SUCCESS! Products are loading!"
    echo ""
    echo "Test it yourself:"
    echo "  curl https://croiconcrete.co.uk/listings | jq"
    echo ""
    echo "Visit your site:"
    echo "  https://croiconcrete.co.uk"
    echo ""
else
    echo "❌ Error: Endpoint returned status $RESPONSE"
    echo ""
    echo "Troubleshooting:"
    echo "  1. Wait another minute and try: curl https://croiconcrete.co.uk/listings"
    echo "  2. Check environment variables in Cloudflare dashboard"
    echo "  3. Verify Etsy API credentials are correct"
    echo ""
fi

echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. Update analytics tokens in index.html:"
echo "   - Line 105: Replace G-XXXXXXXXXX with your GA4 ID"
echo "   - Line 111: Replace YOUR_CLOUDFLARE_BEACON_TOKEN"
echo ""
echo "2. Create favicon files:"
echo "   - Visit: https://realfavicongenerator.net/"
echo "   - Upload favicon.svg and generate files"
echo ""
echo "3. Read full improvement guide:"
echo "   - cat COMPREHENSIVE_ANALYSIS.md"
echo ""
echo "🎉 Your website is now functional!"
