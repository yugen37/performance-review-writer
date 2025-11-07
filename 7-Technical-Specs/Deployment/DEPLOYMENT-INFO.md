# Cloudflare Pages Deployment Information

**Date Deployed:** 2025-01-05  
**Status:** ✅ Live

---

## 🌐 Site Information

**Deployment URL:** https://186f2f5a.performance-review-writer.pages.dev  
**Project Name:** `performance-review-writer`  
**Project ID:** `081c23c4-ed1d-4f49-8d98-cbf645003b1f`  
**Latest Deployment ID:** `186f2f5a`

**Main Project URL:** https://performance-review-writer.pages.dev

---

## 🔧 Deployment Configuration

### Build Settings
- **Build Command:** `npm run build`
- **Output Directory:** `out`
- **Framework:** Next.js (Static HTML Export)
- **Node Version:** 18.x+

### Environment Variables (Production)
- `NEXT_PUBLIC_N8N_ANALYZE_URL` = `https://n8n-production-45b7.up.railway.app/webhook/analyze`
- `NEXT_PUBLIC_N8N_REWRITE_URL` = `https://n8n-production-45b7.up.railway.app/webhook/rewrite`

---

## 📊 Deployment Details

- **Files Deployed:** 31 static files
- **Deployment Method:** Cloudflare API + Wrangler CLI
- **Deployment Time:** ~3 seconds
- **Status:** ✅ Success

---

## 🔒 Security

✅ **No secrets exposed:**
- All secrets replaced with placeholders before Git push
- API token used from credentials file (outside repository)
- Environment variables set via secure API

---

## 🔗 Useful Links

- **Cloudflare Dashboard:** https://dash.cloudflare.com/pages/view/performance-review-writer
- **GitHub Repository:** https://github.com/yugen37/performance-review-writer
- **N8N Instance:** https://n8n-production-45b7.up.railway.app

---

## 📝 Notes

- Deployment was done via Cloudflare API (not GitHub integration)
- Environment variables are set at project level
- Future deployments can be done via `npm run deploy` or Cloudflare Dashboard
- Auto-deploy from GitHub can be configured later if needed

---

**Last Updated:** 2025-01-05

