# Environment Variables - Performance Review Writer

**Last Updated:** 2025-01-05  
**Platform:** Cloudflare Pages (Frontend)

---

## 📋 Required Environment Variables

### Frontend (Cloudflare Pages)

These environment variables must be set in Cloudflare Pages dashboard:

| Variable Name | Value | Description | Required |
|--------------|-------|-------------|----------|
| `NEXT_PUBLIC_N8N_ANALYZE_URL` | `https://n8n-production-45b7.up.railway.app/webhook/analyze` | Analysis API endpoint | ✅ Yes |
| `NEXT_PUBLIC_N8N_REWRITE_URL` | `https://n8n-production-45b7.up.railway.app/webhook/rewrite` | Rewrite API endpoint | ✅ Yes |

---

## 🔧 Setting Environment Variables in Cloudflare Pages

### Step 1: Access Environment Variables

1. Go to Cloudflare Pages dashboard
2. Select your project: `performance-review-writer`
3. Navigate to: **Settings** → **Environment Variables**

### Step 2: Add Variables

**For Production:**
1. Click **"Add variable"**
2. Enter variable name: `NEXT_PUBLIC_N8N_ANALYZE_URL`
3. Enter value: `https://n8n-production-45b7.up.railway.app/webhook/analyze`
4. Click **"Save"**

5. Click **"Add variable"** again
6. Enter variable name: `NEXT_PUBLIC_N8N_REWRITE_URL`
7. Enter value: `https://n8n-production-45b7.up.railway.app/webhook/rewrite`
8. Click **"Save"**

**For Preview (optional, same values):**
- Repeat above steps for Preview environment
- Use same values as Production

---

## 📝 Environment Variable Format

### Next.js Public Variables

In Next.js, environment variables that should be exposed to the browser must be prefixed with `NEXT_PUBLIC_`.

**Format:**
```
NEXT_PUBLIC_<VARIABLE_NAME>=<value>
```

**Example:**
```
NEXT_PUBLIC_N8N_ANALYZE_URL=https://n8n-production-45b7.up.railway.app/webhook/analyze
```

### Usage in Code

**File:** `app/page.tsx`
```typescript
const response = await fetch(process.env.NEXT_PUBLIC_N8N_ANALYZE_URL || '', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text }),
})
```

---

## 🔍 Verification

### Check Environment Variables Are Set

1. **In Cloudflare Dashboard:**
   - Go to: **Settings** → **Environment Variables**
   - Verify both variables are listed
   - Check values are correct

2. **After Deployment:**
   - Visit deployed site
   - Open browser console
   - Check network tab for API calls
   - Verify API URLs are correct

### Test API Endpoints

**Test Analysis Endpoint:**
```bash
curl -X POST https://n8n-production-45b7.up.railway.app/webhook/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Managed team of 5"}'
```

**Test Rewrite Endpoint:**
```bash
curl -X POST https://n8n-production-45b7.up.railway.app/webhook/rewrite \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "text": "Managed team of 5"}'
```

---

## 🚨 Common Issues

### Issue: Environment Variables Not Available

**Symptoms:**
- API calls fail
- `process.env.NEXT_PUBLIC_*` is `undefined`
- Network errors in browser console

**Solutions:**
1. ✅ Verify variable names start with `NEXT_PUBLIC_`
2. ✅ Rebuild after adding variables
3. ✅ Check variable names match code exactly
4. ✅ Ensure variables are set for correct environment (Production/Preview)

### Issue: Wrong API URLs

**Symptoms:**
- 404 errors
- CORS errors
- Connection refused

**Solutions:**
1. ✅ Verify N8N instance is running
2. ✅ Check webhook paths are correct
3. ✅ Test webhooks directly with curl
4. ✅ Verify N8N workflows are active

---

## 📊 Environment Variable Checklist

- [ ] `NEXT_PUBLIC_N8N_ANALYZE_URL` set in Cloudflare Pages
- [ ] `NEXT_PUBLIC_N8N_REWRITE_URL` set in Cloudflare Pages
- [ ] Values are correct (no typos)
- [ ] Variables set for Production environment
- [ ] Variables set for Preview environment (optional)
- [ ] Site rebuilt after adding variables
- [ ] API calls work on deployed site

---

## 🔗 Related Documentation

- **Cloudflare Setup:** `cloudflare-setup.md`
- **N8N Configuration:** `n8n-url.txt`
- **Analysis API:** `../API-Endpoints/analyze-endpoint.md`
- **Rewrite API:** `../API-Endpoints/rewrite-endpoint.md`

---

## 📝 Notes

- **Security:** These are public endpoints, so exposing URLs is safe
- **No Secrets:** No API keys or secrets needed in frontend
- **Build Time:** Variables are injected at build time
- **Runtime:** Variables are available at runtime via `process.env.NEXT_PUBLIC_*`

---

**Status:** ✅ Ready for deployment  
**Next:** Follow `cloudflare-setup.md` for deployment steps

