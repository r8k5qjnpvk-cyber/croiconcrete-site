#!/bin/bash
# Final Index.html Deployment Script
# This completes the CroiConcrete website deployment

set -e

PROJECT_DIR="/Users/calfinnegan/Documents/Projects/croiconcrete-site"

echo "🎯 Final Deployment: index.html"
echo "==============================="
echo ""

# Check source file exists
if [ ! -f "/home/claude/index-improved.html" ]; then
    echo "❌ Source file not found on Claude's computer"
    echo "   Checking alternative locations..."
    
    # Try mnt location
    if [ -f "/mnt/user-data/outputs/index-improved.html" ]; then
        echo "✅ Found at /mnt/user-data/outputs/index-improved.html"
        SOURCE="/mnt/user-data/outputs/index-improved.html"
    else
        echo "❌ Cannot find index-improved.html"
        echo ""
        echo "MANUAL SOLUTION:"
        echo "1. Download 'index-improved.html' from Claude chat (click download button)"
        echo "2. Run: cp ~/Downloads/index-improved.html $PROJECT_DIR/index.html"
        echo "3. Run: cd $PROJECT_DIR && chmod +x deploy.sh && ./deploy.sh"
        exit 1
    fi
else
    SOURCE="/home/claude/index-improved.html"
fi

# Copy file
echo "📝 Copying improved index.html..."
cat "$SOURCE" > "$PROJECT_DIR/index.html"

# Verify
LINES=$(wc -l < "$PROJECT_DIR/index.html" | tr -d ' ')
echo "✅ Deployed: $LINES lines"

if [ "$LINES" -lt 1100 ]; then
    echo "⚠️  Warning: File seems incomplete (expected ~1144 lines)"
    echo "   This might be okay if it's a different version"
fi

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "📊 Status:"
wc -l "$PROJECT_DIR"/{index.html,functions/listings.js,_headers}
echo ""
echo "🚀 Next: Run ./deploy.sh to commit and push to Cloudflare"

