# Image Creation Guide for CroiConcrete

## og-image.jpg (Social Media Sharing)

### Specifications:
- Size: 1200px × 630px
- Format: JPG (optimized, ~200KB max)
- Aspect ratio: 1.91:1

### Content Suggestions:
1. **Hero Product Shot**
   - Show 2-3 of your best concrete products
   - Clean, minimal background (white or light grey)
   - Natural lighting
   - Include "Croi Concrete" text overlay

2. **Lifestyle Shot**
   - Products styled in a home setting
   - Warm, inviting atmosphere
   - Text: "Handcrafted Concrete Homeware | Newcastle upon Tyne"

3. **Brand Collage**
   - Multiple products arranged artistically
   - Include logo
   - Tagline: "Made by hand, built to last"

### Tools to Create:
- **Canva** (easiest): Use "Facebook Post" template (1200×630)
- **Photoshop**: Create new document with specs above
- **Figma**: Free design tool
- **Online**: Use Photopea (free Photoshop alternative)

### Quick Canva Template:
1. Go to canva.com
2. Create design → Custom size → 1200 × 630px
3. Add your product photos
4. Add text: "Croi Concrete" (Cormorant Garamond font)
5. Add subtle texture or concrete pattern as overlay
6. Download as JPG (optimized quality)

## logo.png (Brand Logo)

### Specifications:
- Size: 512px × 512px minimum (1024×1024 recommended)
- Format: PNG with transparency
- Content: Your brand mark/wordmark

### Design Tips:
- Keep it simple and recognizable at small sizes
- If text-based, use Cormorant Garamond font
- Concrete grey (#9e9589) or dark (#2a2520) colors
- Consider a minimal icon (abstract concrete texture, Irish heart symbol, etc.)

### DIY Options if No Designer:
1. **Simple Text Logo**:
   ```
   CROÍ
   CONCRETE
   ```
   - Use Cormorant Garamond Light
   - Stack vertically or horizontally
   - Dark grey on transparent background

2. **With Symbol**:
   - Find a simple geometric shape or Irish-inspired symbol
   - Place above or beside "Croí Concrete" text
   - Keep it minimal

### Free Logo Makers:
- Canva Logo Maker
- Hatchful by Shopify
- LogoMakr
- Tailor Brands (free export for small sizes)

## Temporary Placeholder Generation

If you need placeholders RIGHT NOW while you create proper images:

### Using Code (Node.js):
```bash
# Install canvas library
npm install canvas

# Create placeholder
node create-placeholder.js
```

### Using Online Tools:
- https://placeholder.com/
- https://via.placeholder.com/1200x630/c8bfb0/2a2520?text=Croi+Concrete
- https://dummyimage.com/1200x630/c8bfb0/2a2520&text=Croi+Concrete

### Quick Terminal Command (Mac/Linux):
```bash
# Create og-image placeholder
convert -size 1200x630 xc:'#c8bfb0' \
  -font Helvetica-Bold -pointsize 72 -fill '#2a2520' \
  -gravity center -annotate +0+0 'Croi Concrete' \
  og-image.jpg

# Create logo placeholder  
convert -size 512x512 xc:transparent \
  -font Helvetica-Bold -pointsize 48 -fill '#2a2520' \
  -gravity center -annotate +0+0 'CC' \
  logo.png
```

## Optimization Before Upload

### Compress Images:
- **TinyPNG**: https://tinypng.com/ (best for PNG)
- **Squoosh**: https://squoosh.app/ (best for JPG, by Google)
- **ImageOptim** (Mac app)
- **JPEG-Optimizer**: https://jpeg-optimizer.com/

### Target File Sizes:
- og-image.jpg: < 200KB
- logo.png: < 50KB

### Quality Settings:
- JPG: 80-85% quality (sweet spot)
- PNG: Use 8-bit if possible (vs 24-bit)

## Upload to Cloudflare Pages

Once images are ready:

1. Add to your project root directory:
   ```
   /croiconcrete-site/
   ├── og-image.jpg
   ├── logo.png
   └── index.html
   ```

2. Commit and push to Git:
   ```bash
   git add og-image.jpg logo.png
   git commit -m "Add social media and brand images"
   git push
   ```

3. Cloudflare Pages will auto-deploy

4. Verify images are accessible:
   - https://croiconcrete.co.uk/og-image.jpg
   - https://croiconcrete.co.uk/logo.png

## Testing Social Media Images

After upload, test how they look:

**Facebook Debugger:**
https://developers.facebook.com/tools/debug/
Enter: https://croiconcrete.co.uk

**Twitter Card Validator:**
https://cards-dev.twitter.com/validator
Enter: https://croiconcrete.co.uk

**LinkedIn Post Inspector:**
https://www.linkedin.com/post-inspector/
Enter: https://croiconcrete.co.uk

If images don't update, clear cache in each tool.

---

Need help with image creation? Message me and I can guide you through it step-by-step!
