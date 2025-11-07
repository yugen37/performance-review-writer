# Cloudflare Pages Deployment Guide

**Step 13: Cloudflare Pages Deployment**  
**Status:** ⏳ Ready for Deployment  
**Last Updated:** 2025-01-05

---

## 📋 Prerequisites

- ✅ GitHub repository: `https://github.com/yugen37/performance-review-writer`
- ✅ Next.js project configured for static export
- ✅ Build test passed (`npm run build`)
- ✅ N8N workflows active and tested
- ✅ Cloudflare account (free tier works)

---

## 🚀 Deployment Steps

### Step 1: Connect GitHub Repository to Cloudflare Pages

1. **Log in to Cloudflare Dashboard**
   - Go to: https://dash.cloudflare.com/
   - Navigate to: **Pages** → **Create a project**

2. **Connect GitHub Repository**
   - Click **"Connect to Git"**
   - Authorize Cloudflare to access your GitHub account
   - Select repository: `yugen37/performance-review-writer`
   - Click **"Begin setup"**

3. **Configure Build Settings**
   - **Project name:** `performance-review-writer` (or your preferred name)
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Build output directory:** `.next` (Next.js default)
   - **Root directory:** `/` (root of repo)

   **Note:** For Next.js static export, the build output is in `.next` but Cloudflare Pages needs the `out` directory. We'll configure this correctly.

### Step 2: Configure Build Settings for Next.js Static Export

**Important:** Next.js static export creates an `out` directory, not `.next`.

1. **Update Build Settings:**
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `/`

2. **Verify package.json build script:**
   ```json
   {
     "scripts": {
       "build": "next build && next export"
     }
   }
   ```
   
   **Note:** Next.js 13+ with App Router uses `output: 'export'` in `next.config.js` instead of `next export`. Our config already has this.

### Step 3: Set Environment Variables

In Cloudflare Pages dashboard, go to **Settings** → **Environment Variables**:

**Production Environment Variables:**
```
NEXT_PUBLIC_N8N_ANALYZE_URL=https://n8n-production-45b7.up.railway.app/webhook/analyze
NEXT_PUBLIC_N8N_REWRITE_URL=https://n8n-production-45b7.up.railway.app/webhook/rewrite
```

**Preview Environment Variables (optional, same as production):**
```
NEXT_PUBLIC_N8N_ANALYZE_URL=https://n8n-production-45b7.up.railway.app/webhook/analyze
NEXT_PUBLIC_N8N_REWRITE_URL=https://n8n-production-45b7.up.railway.app/webhook/rewrite
```

### Step 4: Deploy

1. **Save Configuration**
   - Review all settings
   - Click **"Save and Deploy"**

2. **Monitor Deployment**
   - Watch build logs in Cloudflare dashboard
   - Build should complete in 2-5 minutes
   - Check for any errors

3. **Verify Deployment**
   - Deployment URL will be: `https://performance-review-writer.pages.dev` (or your custom domain)
   - Visit the URL to verify site loads

### Step 5: Test Live Site

1. **Test Landing Page**
   - ✅ Site loads correctly
   - ✅ Input field works
   - ✅ "Analyze" button works

2. **Test Analysis Flow**
   - ✅ Paste a performance review bullet
   - ✅ Click "Analyze"
   - ✅ Score displays correctly
   - ✅ Breakdown table shows

3. **Test Email Gate**
   - ✅ Click "See How This Could Be Better"
   - ✅ Email gate modal appears
   - ✅ Email validation works

4. **Test Rewrite Flow**
   - ✅ Submit valid email
   - ✅ Rewrite displays correctly
   - ✅ Copy button works
   - ✅ Scan counter updates

5. **Test Upgrade Prompt**
   - ✅ Use 3 scans (or test with remainingScans = 0)
   - ✅ Upgrade prompt appears
   - ✅ Pricing tiers display correctly

---

## 🔧 Build Configuration

### Current Next.js Configuration

**File:** `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  output: 'export', // Static export for Cloudflare Pages
}

module.exports = nextConfig
```

**Note:** `output: 'export'` is set in the build script, not in config file. Verify this is working.

### Package.json Build Script

**Current:**
```json
{
  "scripts": {
    "build": "next build"
  }
}
```

**For Cloudflare Pages, ensure:**
- Build creates `out` directory
- Static files are in `out` directory
- No server-side code (all client-side)

---

## 🌐 Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to: **Settings** → **Custom domains**
   - Click **"Set up a custom domain"**
   - Enter your domain (e.g., `performancereviewwriter.com`)
   - Follow DNS configuration instructions

2. **DNS Configuration**
   - Add CNAME record pointing to Cloudflare Pages
   - Cloudflare will provide exact DNS settings

---

## 🔍 Troubleshooting

### Build Fails

**Issue:** Build command fails
- **Solution:** Check build logs for errors
- **Common issues:**
  - Missing dependencies → Run `npm install` locally first
  - TypeScript errors → Fix before deploying
  - Environment variables missing → Add in Cloudflare dashboard

### Site Doesn't Load

**Issue:** 404 or blank page
- **Solution:** Check build output directory
- **Verify:** `out` directory exists after build
- **Check:** Build logs for warnings

### API Calls Fail

**Issue:** API endpoints return errors
- **Solution:** Verify environment variables are set
- **Check:** N8N workflows are active
- **Test:** N8N webhooks directly with curl

### Environment Variables Not Working

**Issue:** `process.env.NEXT_PUBLIC_*` is undefined
- **Solution:** 
  - Ensure variables start with `NEXT_PUBLIC_`
  - Rebuild after adding variables
  - Check variable names match code exactly

---

## 📊 Deployment Checklist

- [ ] Cloudflare account created
- [ ] GitHub repository connected
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Initial deployment successful
- [ ] Landing page loads correctly
- [ ] Analysis flow works
- [ ] Email gate works
- [ ] Rewrite flow works
- [ ] Upgrade prompt works
- [ ] Mobile responsive
- [ ] Custom domain configured (optional)

---

## 🔗 Useful Links

- **Cloudflare Pages Dashboard:** https://dash.cloudflare.com/
- **GitHub Repository:** https://github.com/yugen37/performance-review-writer
- **N8N Instance:** https://n8n-production-45b7.up.railway.app
- **Analysis Webhook:** https://n8n-production-45b7.up.railway.app/webhook/analyze
- **Rewrite Webhook:** https://n8n-production-45b7.up.railway.app/webhook/rewrite

---

## 📝 Notes

- **Free Tier:** Cloudflare Pages free tier includes:
  - Unlimited sites
  - 500 builds per month
  - Custom domains
  - Global CDN

- **Build Time:** Typically 2-5 minutes for Next.js static export

- **Auto-Deploy:** Every push to `main` branch triggers new deployment

- **Preview Deployments:** Every pull request gets a preview URL

---

**Status:** ⏳ Ready for manual deployment  
**Next Step:** Follow deployment steps above, then proceed to Step 14 (End-to-End Testing)

