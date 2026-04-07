#!/bin/bash
set -e

echo "🚀 GitHub Setup & Cloudflare Connection"
echo "========================================"
echo ""

cd /Users/cal/Documents/Projects/croiconcrete-site

# Step 1: Create GitHub repo via gh CLI
echo "Step 1: Creating GitHub repository..."
if command -v gh &> /dev/null; then
    gh repo create croiconcrete-site --public --source=. --remote=origin --push
    echo "✅ Repository created and pushed!"
else
    echo "⚠️  GitHub CLI not installed. Manual steps needed:"
    echo ""
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: croiconcrete-site"
    echo "3. Make it Public"
    echo "4. Click 'Create repository'"
    echo "5. Copy the URL shown"
    echo ""
    read -p "Paste your GitHub repo URL here: " REPO_URL
    git remote add origin "$REPO_URL"
    git push -u origin main
    echo "✅ Code pushed to GitHub!"
fi

echo ""
echo "✅ GitHub repository ready!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Connect Cloudflare Pages to GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Go to: https://dash.cloudflare.com"
echo "2. Navigate: Workers & Pages"
echo "3. Find your current 'croiconcrete-site' project"
echo "4. Click the ⋮ menu → Delete project"
echo "5. Click: Create application → Pages → Connect to Git"
echo "6. Select: croiconcrete-site repository"
echo "7. Build settings:"
echo "   - Framework: None"
echo "   - Build command: (leave empty)"
echo "   - Output directory: /"
echo "8. Click: Save and Deploy"
echo ""
echo "✅ After deployment, /listings will work!"
echo ""
