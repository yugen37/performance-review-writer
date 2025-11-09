# GitHub Sync Setup for Windmill - Complete Guide

**Date:** 2025-01-09  
**Status:** ✅ Ready to Configure  
**Repository:** `yugen37/performance-review-writer`

---

## 🎯 Overview

This guide will help you set up **GitHub sync** for Windmill, enabling **fully automated deployments**. When you push scripts to GitHub, Windmill will automatically sync and deploy them.

---

## ✅ Prerequisites

- ✅ GitHub repository: `yugen37/performance-review-writer`
- ✅ Scripts in correct location: `windmill-scripts/f/webhook/`
- ✅ `wmill.yaml` configured (already done!)
- ✅ Windmill instance running: `https://windmill-production-9d80.up.railway.app`

---

## 📋 Step 1: Commit Scripts to GitHub

### 1.1 Add Scripts to Git

```bash
cd "/Users/yugenmohan/Desktop/Project 1k/LL Performance Review Writer"
git add windmill-scripts/f/webhook/
git add windmill-scripts/wmill.yaml
git commit -m "Add Windmill scripts for GitHub sync"
```

### 1.2 Push to GitHub

```bash
git push origin main
```

**Verify:** Check GitHub - scripts should appear in `windmill-scripts/f/webhook/`

---

## 🔧 Step 2: Generate GitHub Token

### 2.1 Create GitHub Personal Access Token

1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `Windmill Sync Token`
4. Select scopes:
   - ✅ **`repo`** (Full control of private repositories)
   - ✅ **`workflow`** (Update GitHub Action workflows)
5. Click **"Generate token"**
6. **Copy the token immediately** - you won't see it again!
7. Save it securely

---

## 🚀 Step 3: Configure Git Sync in Windmill

### 3.1 Access Windmill Dashboard

1. Go to: **https://windmill-production-9d80.up.railway.app**
2. Login with your credentials

### 3.2 Navigate to Git Sync Settings

1. Click your **profile icon** (top right)
2. Go to **"Settings"** → **"Git Sync"** (or **"Workspace Settings"** → **"Git Sync"**)
3. If you don't see Git Sync, check **"Workspace Settings"** → **"Integrations"**

### 3.3 Configure Git Repository

Fill in the form:

**Repository URL:**
```
https://github.com/yugen37/performance-review-writer.git
```

**Branch:**
```
main
```

**Git Token:**
```
[Paste your GitHub token from Step 2]
```

**Path (optional):**
```
windmill-scripts
```

**Sync Mode:**
- Select **"Pull from Git"** (Windmill pulls from GitHub)
- Or **"Push to Git"** (Windmill pushes to GitHub)
- Or **"Bidirectional"** (Both directions)

**Recommended:** Start with **"Pull from Git"** for now.

### 3.4 Enable Auto-Sync

- ✅ Enable **"Auto-sync on push"** (syncs automatically when you push to GitHub)
- ✅ Enable **"Create one branch per script"** (optional, for better organization)

### 3.5 Save Configuration

Click **"Save"** or **"Connect"**

---

## ✅ Step 4: Test Git Sync

### 4.1 Trigger Manual Sync

1. In Windmill Git Sync settings, click **"Sync Now"** or **"Pull from Git"**
2. Wait for sync to complete (check logs)
3. Verify scripts appear in Windmill dashboard

### 4.2 Verify Scripts

1. Go to **"Scripts"** in Windmill dashboard
2. You should see:
   - ✅ `webhook/analyze`
   - ✅ `webhook/rewrite`

### 4.3 Enable Webhooks

For each script:
1. Click on the script
2. Go to **"Settings"** tab
3. Enable **"Webhook"** trigger
4. Set webhook path:
   - `webhook/analyze` → `/webhook/analyze`
   - `webhook/rewrite` → `/webhook/rewrite`
5. Click **"Deploy"**

---

## 🔄 Step 5: Test Automated Sync

### 5.1 Make a Small Change

Edit a script locally:
```bash
# Add a comment to test sync
echo "// Test sync" >> windmill-scripts/f/webhook/analyze.ts
```

### 5.2 Commit and Push

```bash
git add windmill-scripts/f/webhook/analyze.ts
git commit -m "Test Git sync"
git push origin main
```

### 5.3 Verify Auto-Sync

1. Wait 1-2 minutes
2. Check Windmill dashboard
3. Script should update automatically (if auto-sync is enabled)
4. Or manually trigger sync in Git Sync settings

---

## 🎯 Step 6: Verify Deployment

### Test Analyze Endpoint

```bash
curl -X POST \
  https://windmill-production-9d80.up.railway.app/api/v1/webhooks/webhook/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Led team of 10 engineers to increase system performance by 40%"}'
```

### Test Rewrite Endpoint

```bash
curl -X POST \
  https://windmill-production-9d80.up.railway.app/api/v1/webhooks/webhook/rewrite \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "text": "Managed team of 5"}'
```

---

## 📝 Workflow After Setup

### Daily Workflow

1. **Edit scripts** locally in `windmill-scripts/f/webhook/`
2. **Test locally** (if possible)
3. **Commit changes:**
   ```bash
   git add windmill-scripts/f/webhook/
   git commit -m "Update script: [description]"
   git push origin main
   ```
4. **Windmill auto-syncs** (if auto-sync enabled)
5. **Or manually sync** in Windmill dashboard
6. **Scripts deploy automatically!**

---

## 🔧 Troubleshooting

### Issue: Git Sync Not Working

**Check:**
1. ✅ GitHub token is valid
2. ✅ Repository URL is correct
3. ✅ Branch name is correct (`main`)
4. ✅ Path is correct (`windmill-scripts` or leave empty)
5. ✅ Scripts are in `windmill-scripts/f/webhook/`

**Debug:**
- Check Windmill Git Sync logs
- Try manual sync first
- Verify GitHub token permissions

### Issue: Scripts Not Appearing

**Check:**
1. ✅ `wmill.yaml` is in `windmill-scripts/` directory
2. ✅ Scripts are in `f/webhook/` directory (matches `wmill.yaml` config)
3. ✅ Scripts are committed and pushed to GitHub
4. ✅ Git sync is enabled in Windmill

### Issue: Auto-Sync Not Working

**Solutions:**
1. Check if auto-sync is enabled in settings
2. Verify GitHub webhook is configured (if using webhooks)
3. Use manual sync for now
4. Check Windmill logs for errors

---

## 📚 Additional Resources

- **Windmill Git Sync Docs:** https://docs.windmill.dev/docs/core_concepts/git_sync
- **GitHub Token Guide:** https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- **Windmill Dashboard:** https://windmill-production-9d80.up.railway.app

---

## ✅ Checklist

- [ ] Scripts committed to GitHub
- [ ] GitHub token generated
- [ ] Git Sync configured in Windmill
- [ ] Manual sync tested
- [ ] Scripts appear in Windmill dashboard
- [ ] Webhooks enabled for both scripts
- [ ] Endpoints tested and working
- [ ] Auto-sync tested (optional)

---

## 🎉 Success!

Once Git Sync is configured:

✅ **Push to GitHub** → **Windmill auto-syncs** → **Scripts deploy automatically!**

**No more manual deployments needed!** 🚀

---

**Last Updated:** 2025-01-09  
**Status:** Ready to configure!

