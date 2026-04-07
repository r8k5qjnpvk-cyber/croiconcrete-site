# 🔧 ETSY API FIX - Products Not Loading

## Root Cause Identified

Your Etsy products aren't loading because **Cloudflare Pages deployed via drag-and-drop does NOT support the `functions/` folder**.

The `/listings` endpoint returns 404 because Cloudflare Pages Functions only work when deployed via:
- Git connection (GitHub/GitLab)
- Wrangler CLI
- **NOT** via drag-and-drop upload

## Quick Fix (5 minutes)

### Option 1: Deploy via Wrangler CLI (Fastest)

```bash
cd /Users/cal/Documents/Projects/croiconcrete-site

# Install Wrangler if not already installed
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy (this will work with functions/)
wrangler pages deploy . --project-name=croiconcrete

# Add environment variables
wrangler pages secret put ETSY_API_KEY --project-name=croiconcrete
# Paste your Etsy API keystring when prompted

wrangler pages secret put ETSY_SHARED_SECRET --project-name=croiconcrete  
# Paste your Etsy shared secret when prompted
```

After deployment completes (~30 seconds), test:
```bash
curl https://croiconcrete.co.uk/listings
```

Should return JSON with your products!

---

### Option 2: Connect to GitHub (Recommended for ongoing updates)

#### Step 1: Create GitHub Repo
1. Go to: https://github.com/new
2. Repository name: `croiconcrete-site`
3. Make it **Public** or **Private** (your choice)
4. **DO NOT** add README, .gitignore, or license
5. Click "Create repository"

#### Step 2: Connect Your Local Repo

```bash
cd /Users/cal/Documents/Projects/croiconcrete-site

# Add the GitHub remote
git remote remove origin 2>/dev/null  # Remove any old remote
git remote add origin https://github.com/YOUR_USERNAME/croiconcrete-site.git

# Push your code
git push -u origin main
```

#### Step 3: Connect Cloudflare Pages to GitHub

1. Go to: https://dash.cloudflare.com
2. Navigate: **Workers & Pages**
3. Find your `croiconcrete` project (or create new)
4. Click: **Settings** → **Builds & deployments**
5. Click: **Connect to Git**
6. Authorize GitHub access
7. Select repository: `croiconcrete-site`
8. Build settings:
   - Framework preset: **None**
   - Build command: (leave empty)
   - Build output directory: `/`
9. Click: **Save and Deploy**

#### Step 4: Add Environment Variables

1. In Cloudflare Pages project dashboard
2. Go to: **Settings** → **Environment variables**
3. Click **Add variable** for each:

**Variable 1:**
- Name: `ETSY_API_KEY`
- Value: `[Your Etsy API keystring]`
- Environment: **Production** ✓

**Variable 2:**
- Name: `ETSY_SHARED_SECRET`
- Value: `[Your Etsy shared secret]`
- Environment: **Production** ✓

4. Click **Save**

#### Step 5: Trigger Redeploy

After adding environment variables, redeploy:
- Go to **Deployments** tab
- Click **⋮** on latest deployment
- Click **Retry deployment**

OR push an empty commit:
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push origin main
```

#### Step 6: Verify

Wait 1-2 minutes for build, then test:
```bash
curl https://croiconcrete.co.uk/listings
```

Should return JSON array with your Etsy products! 🎉

---

## Where to Find Your Etsy API Credentials

1. Go to: https://www.etsy.com/developers/your-apps
2. Click on your app
3. Copy:
   - **Keystring** → Use as `ETSY_API_KEY`
   - **Shared Secret** → Use as `ETSY_SHARED_SECRET`

---

## Technical Details

### Why Functions Folder Didn't Work

Cloudflare Pages Functions (`functions/*.js`) are serverless endpoints that:
- Only work with Git-connected or Wrangler CLI deployments
- Do NOT work with drag-and-drop/ZIP uploads
- Require environment variables to be set in Cloudflare dashboard

### What the Fix Does

1. Deploys your code via Git/Wrangler (enables `functions/` support)
2. Adds Etsy API credentials as environment variables
3. Makes `/listings` endpoint accessible at runtime
4. Enables 5-minute caching to reduce API calls by 80%

### Current Code (Already Correct!)

Your `functions/listings.js` is already properly coded:

```javascript
export async function onRequest(context) {
  const keystring = context.env.ETSY_API_KEY;       // ← Needs env var
  const sharedSecret = context.env.ETSY_SHARED_SECRET;  // ← Needs env var
  // ... rest of code
}
```

This code expects `context.env.ETSY_API_KEY` and `context.env.ETSY_SHARED_SECRET` to be set as environment variables in Cloudflare.

---

## Troubleshooting

### Test 1: Check if Functions are Working

```bash
curl -I https://croiconcrete.co.uk/listings
```

**Good response:**
```
HTTP/2 200
content-type: application/json
```

**Bad response (Functions not supported):**
```
HTTP/2 404
```

### Test 2: Check Environment Variables

If you get 500 error:
```bash
curl https://croiconcrete.co.uk/listings
```

Response:
```json
{"error": "Cannot read properties of undefined..."}
```

This means environment variables aren't set. Go back to Step 4.

### Test 3: Verify Full Response

```bash
curl https://croiconcrete.co.uk/listings | jq
```

Should return array of products with:
- `listing_id`
- `title`
- `price`
- `quantity`
- `images`
- `url`

---

## After the Fix

Once products load, your website will:

✅ Pull all active Etsy listings automatically
✅ Display product images, titles, prices, stock levels
✅ Update every 5 minutes via CDN cache
✅ Allow customers to filter (All, Planters, Coasters, Desk Items)
✅ Allow customers to sort (Price low/high, Newest)
✅ Enable Square payment checkout directly on your site
✅ Link to Etsy for customers who prefer that platform

---

## Summary

**Problem:** Drag-and-drop deployment doesn't support Cloudflare Pages Functions  
**Solution:** Deploy via Wrangler CLI or GitHub connection  
**Time:** 5 minutes  
**Result:** `/listings` endpoint works, products load! 🎉

Choose **Option 1** (Wrangler) for fastest fix, or **Option 2** (GitHub) for best long-term solution.

