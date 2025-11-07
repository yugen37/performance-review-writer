# Cloudflare Pages Deployment via MCP/Wrangler

**Last Updated:** 2025-01-05  
**Method:** Wrangler CLI (via npm/npx)

---

## 🔑 Prerequisites

1. **Cloudflare API Token**
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Click **"Create Token"**
   - Use **"Edit Cloudflare Workers"** template
   - Add permissions:
     - **Account** → **Cloudflare Pages** → **Edit**
     - **Zone** → **Zone** → **Read** (if using custom domain)
   - Copy the token

2. **Set Environment Variable**
   ```bash
   export CLOUDFLARE_API_TOKEN=your_token_here
   ```

---

## 🚀 Deployment Methods

### Method 1: Using Deployment Script (Recommended)

```bash
# Set your API token
export CLOUDFLARE_API_TOKEN=your_token_here

# Optional: Set project name (defaults to "performance-review-writer")
export CLOUDFLARE_PAGES_PROJECT_NAME=performance-review-writer

# Run deployment script
./7-Technical-Specs/Deployment/deploy-pages.sh
```

### Method 2: Manual Wrangler Commands

```bash
# 1. Build the project
npm run build

# 2. Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name=performance-review-writer
```

### Method 3: Using npm Script

Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "wrangler pages deploy out --project-name=performance-review-writer"
  }
}
```

Then run:
```bash
export CLOUDFLARE_API_TOKEN=your_token_here
npm run deploy
```

---

## 🔧 Setting Environment Variables

After deployment, set environment variables in Cloudflare Dashboard:

1. Go to: https://dash.cloudflare.com/pages
2. Select your project: `performance-review-writer`
3. Go to: **Settings** → **Environment Variables**
4. Add:
   - `NEXT_PUBLIC_N8N_ANALYZE_URL` = `https://n8n-production-45b7.up.railway.app/webhook/analyze`
   - `NEXT_PUBLIC_N8N_REWRITE_URL` = `https://n8n-production-45b7.up.railway.app/webhook/rewrite`
5. Redeploy (or wait for next build)

---

## 📋 Deployment Checklist

- [ ] Cloudflare API token created
- [ ] `CLOUDFLARE_API_TOKEN` environment variable set
- [ ] Project built successfully (`npm run build`)
- [ ] `out` directory exists
- [ ] Deployed to Cloudflare Pages
- [ ] Site accessible at `https://performance-review-writer.pages.dev`
- [ ] Environment variables set in Cloudflare dashboard
- [ ] Site tested and working

---

## 🐛 Troubleshooting

### Error: API Token Required
**Solution:** Set `CLOUDFLARE_API_TOKEN` environment variable

### Error: Project Not Found
**Solution:** First deployment creates the project automatically. If it fails, create project manually in dashboard.

### Error: Build Failed
**Solution:** 
- Check `npm run build` works locally
- Verify `out` directory is created
- Check for TypeScript/linting errors

### Environment Variables Not Working
**Solution:**
- Variables must be set in Cloudflare dashboard
- Must start with `NEXT_PUBLIC_` for Next.js
- Redeploy after adding variables

---

## 🔗 Useful Commands

```bash
# List all Pages projects
npx wrangler pages project list

# View project details
npx wrangler pages project get performance-review-writer

# List deployments
npx wrangler pages deployment list --project-name=performance-review-writer

# View deployment details
npx wrangler pages deployment get <deployment-id> --project-name=performance-review-writer
```

---

## 📝 Notes

- **First Deployment:** Creates the project automatically
- **Subsequent Deployments:** Updates existing project
- **Custom Domain:** Can be added in Cloudflare dashboard after deployment
- **Auto-Deploy:** GitHub integration can be set up for automatic deployments

---

**Status:** ✅ Ready for deployment  
**Next:** Set API token and run deployment script

