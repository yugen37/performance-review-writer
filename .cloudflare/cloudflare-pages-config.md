# Cloudflare Pages Deployment Configuration

## Build Settings

When setting up Cloudflare Pages, use these settings:

- **Framework preset:** Next.js (Static HTML Export)
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node version:** 18.x or higher

## Environment Variables

Add these environment variables in Cloudflare Pages dashboard:

```
NEXT_PUBLIC_N8N_ANALYZE_URL=https://n8n-production-45b7.up.railway.app/webhook/analyze
NEXT_PUBLIC_N8N_REWRITE_URL=https://n8n-production-45b7.up.railway.app/webhook/rewrite
```

## Deployment Steps

1. Push code to GitHub repository
2. Go to Cloudflare Dashboard → Pages
3. Connect repository
4. Configure build settings as above
5. Add environment variables
6. Deploy

## Notes

- The Next.js config is set to `output: 'export'` for static site generation
- Images are set to `unoptimized: true` for static export compatibility
- All API calls are made client-side using environment variables







