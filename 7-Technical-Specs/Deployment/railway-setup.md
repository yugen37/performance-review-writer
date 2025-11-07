# Railway N8N Setup Guide

**Time:** 30 minutes  
**Status:** Ready to deploy

---

## Overview

Deploy N8N instance to Railway for hosting backend workflows. This instance will handle:
- Analysis workflow (`/webhook/analyze`)
- Rewrite workflow (`/webhook/rewrite`)

---

## Prerequisites

- ✅ Railway account (connected to GitHub)
- ✅ Railway token: `22b619dc-2da0-40f8-9f61-53e7e9d810d5`
- ✅ GitHub repository: `yugen37/performance-review-writer`

---

## Option 1: Railway Dashboard (Recommended)

### Step 1: Create New Project
1. Go to: https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose repository: `yugen37/performance-review-writer`
5. Name project: **"Performance Review Writer - N8N"**

### Step 2: Deploy N8N Service
1. Click **"New Service"** or **"Add Service"**
2. Select **"Deploy from GitHub"**
3. Choose **"n8n"** template or search for "n8n"
4. Or use **"Empty Service"** and configure manually

### Step 3: Configure N8N Service
If using Empty Service:
1. Click on the new service
2. Go to **"Settings"**
3. Set **"Build Command"**: (leave empty or use n8n docker image)
4. Set **"Start Command"**: Use n8n Docker image

**Recommended: Use Railway's N8N Template**
- Railway has a one-click N8N template
- Select "New" → "Template" → Search "n8n"
- Click "Deploy"

### Step 4: Configure Environment Variables
Go to **"Variables"** tab and add:
```bash
N8N_HOST=0.0.0.0
N8N_PORT=3000
N8N_PROTOCOL=https
WEBHOOK_URL=https://your-service-name.up.railway.app
```

### Step 5: Get Service URL
1. Go to **"Settings"** tab
2. Find **"Public Domain"** or **"Generate Domain"**
3. Copy the URL (e.g., `https://n8n-production-45b7.up.railway.app`)
4. Save to: `7-Technical-Specs/Deployment/n8n-url.txt`

### Step 6: Configure N8N
1. Access N8N dashboard at your Railway URL
2. First-time setup:
   - Create admin account
   - Email: `Yugen37@gmail.com`
   - Password: (choose secure password)
3. Test dashboard access
4. Verify webhook endpoint is accessible

---

## Option 2: Railway CLI

### Install Railway CLI
```bash
npm install -g @railway/cli
# or
brew install railway
```

### Login
```bash
railway login
```

### Create Project
```bash
railway init
railway link
```

### Deploy N8N
```bash
# Create railway.json or use Dockerfile
railway up
```

---

## Option 3: Use Existing Railway Instance

If you have an existing N8N instance on Railway:
- **Existing URL:** `https://n8n-production-45b7.up.railway.app`
- **Status:** ✅ Active

You can either:
1. **Use existing instance** (if it has capacity)
2. **Create new service** in existing project
3. **Create new project** for this specific app

---

## Configuration Files

### Dockerfile (if deploying manually)
```dockerfile
FROM n8nio/n8n:latest

ENV N8N_HOST=0.0.0.0
ENV N8N_PORT=3000
ENV N8N_PROTOCOL=https
```

### railway.json (optional)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "startCommand": "n8n start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## Verification Checklist

- [ ] Project created on Railway
- [ ] N8N service deployed
- [ ] Service URL obtained and documented
- [ ] N8N dashboard accessible
- [ ] Admin account created
- [ ] Webhook endpoint testable
- [ ] Environment variables configured

---

## Post-Deployment

After deployment:
1. ✅ Document service URL in `n8n-url.txt`
2. ⏭️ Configure Google Sheets credentials (Step 5)
3. ⏭️ Create Analysis workflow (Step 4)
4. ⏭️ Create Rewrite workflow (Step 6)

---

## Troubleshooting

### Service Won't Start
- Check Railway logs: **"Deployments"** → **"View Logs"**
- Verify environment variables
- Check N8N version compatibility

### Can't Access Dashboard
- Verify public domain is set
- Check Railway service status
- Verify N8N_HOST and N8N_PORT settings

### Webhook Not Working
- Verify WEBHOOK_URL environment variable
- Check N8N workflow is active
- Test webhook endpoint manually

---

## Next Steps

After completing Railway setup:
- **Step 4:** Analysis N8N Workflow (2-3 hours)
- **Step 5:** Google Sheets integration setup (30 min)
- **Step 6:** Rewrite N8N Workflow (4-5 hours)

---

**Last Updated:** 2024-11-04







