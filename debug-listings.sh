#!/bin/bash
# Debug Etsy Listings Issue

echo "🔍 CroiConcrete Listings Debug"
echo "=============================="
echo ""

# Test 1: Check if function endpoint responds
echo "Test 1: Checking /listings endpoint..."
echo ""
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" https://croiconcrete.co.uk/listings 2>&1)
HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE/d')

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Endpoint responds with 200 OK"
    echo ""
    echo "Response preview:"
    echo "$BODY" | head -c 500
    echo ""
    echo ""
    # Check if it's actually JSON with products
    if echo "$BODY" | grep -q "listing_id"; then
        echo "✅ Response contains product data!"
        PRODUCT_COUNT=$(echo "$BODY" | grep -o "listing_id" | wc -l | tr -d ' ')
        echo "   Found $PRODUCT_COUNT products"
    else
        echo "⚠️  Response doesn't contain product data"
        echo "   This might be an error response"
    fi
elif [ "$HTTP_CODE" = "500" ]; then
    echo "❌ Server Error (500)"
    echo ""
    echo "Error response:"
    echo "$BODY"
    echo ""
    echo "Possible causes:"
    echo "  - Environment variables not set correctly"
    echo "  - Etsy API credentials invalid"
    echo "  - Rate limiting from Etsy"
else
    echo "❌ Unexpected response code: $HTTP_CODE"
    echo ""
    echo "Response:"
    echo "$BODY"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Test 2: Check browser console..."
echo ""
echo "Visit https://croiconcrete.co.uk and open DevTools (F12)"
echo "Look for errors in the Console tab"
echo ""
echo "Common error patterns:"
echo "  - CORS error → Check _headers file"
echo "  - 404 error → Function not deployed"
echo "  - 500 error → Check Cloudflare Pages logs"
echo "  - Network error → Check internet connection"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Test 3: Cloudflare Pages Logs"
echo ""
echo "1. Go to: https://dash.cloudflare.com"
echo "2. Navigate: Workers & Pages → croiconcrete-site"
echo "3. Click: 'View details' on latest deployment"
echo "4. Look for function logs or errors"
echo ""
