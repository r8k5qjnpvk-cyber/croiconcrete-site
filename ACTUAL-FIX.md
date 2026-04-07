# THE ACTUAL FIX - One Working Solution

## The Problem
Cloudflare Pages deployed via drag-and-drop does NOT support the `functions/` folder.
That's why `/listings` returns 404.

## The Solution (5 minutes)

### Step 1: Create GitHub Repo
1. Go to: https://github.com/new
2. Repository name: `croiconcrete-site`
3. Make it **Public** or **Private** (your choice)
4. **DO NOT** add README, .gitignore, or license
5. Click "Create repository"

### Step 2: Connect Your Local Git
Copy your **actual GitHub URL** from the page (it shows after you create the repo)

Then run:
```bash
cd /Users/cal/Documents/Projects/croiconcrete-site
git remote add origin https://github.com/calfinnegan/croiconcrete-site.git
git push -u origin main
```

### Step 3: Connect Cloudflare to GitHub
1. Go to: https://dash.cloudflare.com
2. Navigate: **Workers & Pages**
3. Click: **Create application**
4. Click: **Pages** → **Connect to Git**
5. Authorize GitHub access
6. Select: `croiconcrete-site` repo
7. Build settings:
   - Framework preset: **None**
   - Build command: (leave empty)
   - Build output directory: `/`
8. Click: **Save and Deploy**

### Step 4: Verify Environment Variables
1. In your Cloudflare Pages project
2. Go to: **Settings** → **Environment variables**
3. Confirm these exist:
   - `ETSY_API_KEY`
   - `ETSY_SHARED_SECRET`

### Step 5: Test
After deployment completes (~1 minute):
```bash
curl https://croiconcrete.co.uk/listings
```

Should return JSON with your products!

---

## Why This Works
- Git-connected deployments support `functions/` folder
- Drag-and-drop deployments do NOT
- That's the entire issue

## Custom Domain (if needed)
If your custom domain isn't connected:
1. Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `croiconcrete.co.uk`
4. Follow DNS instructions
