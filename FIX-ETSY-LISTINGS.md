# 🔧 FIX: Etsy Listings Not Loading

## Problem
The site is deployed but Etsy products aren't loading because Cloudflare Pages doesn't have your API credentials.

## Solution: Add Environment Variables

### Step 1: Go to Cloudflare Pages Dashboard
1. Visit: https://dash.cloudflare.com
2. Navigate to: **Workers & Pages** → **croiconcrete-site** (or your project name)
3. Click: **Settings** tab
4. Scroll to: **Environment variables**

### Step 2: Add These Variables

Click **"Add variable"** and enter:

**Variable 1:**
- Name: `ETSY_API_KEY`
- Value: `[Your Etsy API keystring]`
- Environment: Production ✓

**Variable 2:**
- Name: `ETSY_SHARED_SECRET`
- Value: `[Your Etsy shared secret]`
- Environment: Production ✓

### Step 3: Redeploy
After adding variables:
1. Go to **Deployments** tab
2. Click **"⋮"** (three dots) on latest deployment
3. Click **"Retry deployment"**

OR just push a new commit:
```bash
cd /Users/cal/Documents/Projects/croiconcrete-site
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

### Step 4: Test
Wait 30 seconds, then visit: https://croiconcrete.co.uk

Your products should load! 🎉

---

## Where to Find Your Etsy API Credentials

1. Go to: https://www.etsy.com/developers/your-apps
2. Click your app
3. Copy:
   - **Keystring** → Use as `ETSY_API_KEY`
   - **Shared Secret** → Use as `ETSY_SHARED_SECRET`

---

## Quick Check

Test if the API is working:
```bash
curl https://croiconcrete.co.uk/listings
```

Should return JSON with your products (not an error).

If you see `{"error": "..."}`, the environment variables aren't set correctly.
