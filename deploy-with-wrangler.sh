#!/bin/bash
# One-command fix: Deploy with Wrangler (no install needed)

cd /Users/cal/Documents/Projects/croiconcrete-site

echo "🚀 Deploying to Cloudflare Pages with Functions"
echo "================================================"
echo ""

# Use npx to run wrangler without installing globally (bypasses permission issues)
npx wrangler@latest pages deploy . --project-name=croiconcrete-site

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Test: curl https://croiconcrete.co.uk/listings"
