# Google Sheets N8N Credentials Setup Guide

**Date:** 2024-11-04  
**Purpose:** Configure Google Sheets OAuth2 credentials in N8N for Performance Review Writer project

---

## Prerequisites

- ✅ N8N instance accessible: `https://n8n-production-45b7.up.railway.app`
- ✅ Google Sheets spreadsheet created: `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c`
- ✅ OAuth2 credentials from `CREDENTIALS_MASTER.md`

---

## OAuth2 Credentials (from CREDENTIALS_MASTER.md)

```
Client ID: YOUR_CLIENT_ID_HERE
Client Secret: YOUR_CLIENT_SECRET_HERE
Refresh Token: YOUR_REFRESH_TOKEN_HERE

Status: ✅ Active and working
Connection: ✅ PERMANENT (refresh token doesn't expire unless revoked)
Scopes: spreadsheets, gmail.send, drive.file
```

---

## Setup Steps

### Step 1: Access N8N Dashboard

1. Navigate to: `https://n8n-production-45b7.up.railway.app`
2. Log in with credentials from `CREDENTIALS_MASTER.md`:
   - Email: `Yugen37@gmail.com`
   - Password: `Iamgood!1`

### Step 2: Access Credentials Management

1. Click on your profile/avatar (top right)
2. Select **"Credentials"** from the dropdown menu
3. Or navigate directly to: `https://n8n-production-45b7.up.railway.app/credentials`

### Step 3: Check for Existing Google Sheets Credential

1. In the credentials list, search for "Google Sheets" or "Google"
2. Check if a credential named "Google Sheets OAuth2" or similar exists
3. If exists and working: **Skip to Step 7 (Test Connection)**
4. If not exists or not working: **Continue to Step 4**

### Step 4: Create New Google Sheets OAuth2 Credential

1. Click **"Create New Credential"** button (top right)
2. In the credential type search, type: **"Google Sheets"**
3. Select: **"Google Sheets OAuth2 API"**
4. Click on the credential type to open configuration

### Step 5: Configure OAuth2 Credential

**Option A: Using OAuth2 Flow (Recommended)**
1. Credential Name: `Google Sheets - Performance Review Writer`
2. Click **"Connect my account"** or **"Sign in with Google"**
3. Select the Google account: `Yugen37@gmail.com`
4. Grant permissions for:
   - View and manage spreadsheets
   - See, edit, create, and delete files
5. Click **"Allow"**
6. N8N will automatically exchange the authorization code for tokens
7. Click **"Save"** to save the credential

**Option B: Using Refresh Token Directly (Advanced)**
1. Credential Name: `Google Sheets - Performance Review Writer`
2. Authentication Type: **OAuth2**
3. Client ID: `YOUR_CLIENT_ID_HERE`
4. Client Secret: `YOUR_CLIENT_SECRET_HERE`
5. Access Token: *Leave empty (will be generated)*
6. Refresh Token: `YOUR_REFRESH_TOKEN_HERE
7. OAuth Token URL: `https://oauth2.googleapis.com/token`
8. Click **"Save"**

### Step 6: Verify Credential

1. After saving, the credential should show as **"Connected"** or **"Active"**
2. If there's a "Test" button, click it to verify connection
3. If successful, you should see ✅ **"Connection successful"**

### Step 7: Test Connection with Workflow

**Test Workflow will be created in the next step (test-connection.md)**

---

## Spreadsheet Access Configuration

### Spreadsheet Details
- **Name:** Performance Review Writer - User Tracking
- **ID:** `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c`
- **URL:** https://docs.google.com/spreadsheets/d/1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c/edit
- **Sheet Name:** `Sheet1`
- **Columns:** Email, Scans Remaining, Timestamp, Source, Upgrade Status

### Service Account Sharing (If Applicable)

**Note:** If N8N uses a service account email (typically for self-hosted N8N):

1. In N8N, check if a service account email is displayed in the credential
2. Copy the service account email (format: `n8n-service@project-id.iam.gserviceaccount.com`)
3. Open the spreadsheet: https://docs.google.com/spreadsheets/d/1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c/edit
4. Click **"Share"** button (top right)
5. Paste the service account email
6. Set role: **"Editor"**
7. Uncheck "Notify people"
8. Click **"Share"**

**For OAuth2 Credentials (Our Case):**
- ✅ No service account sharing needed
- ✅ The OAuth2 user (`Yugen37@gmail.com`) already owns the spreadsheet
- ✅ Access is automatically granted

---

## Troubleshooting

### Issue: "Authentication failed"
**Solution:**
- Verify Client ID and Client Secret are correct
- Check if OAuth consent screen is configured in Google Cloud Console
- Re-authenticate using OAuth2 flow

### Issue: "Invalid refresh token"
**Solution:**
- Refresh token may have been revoked
- Re-authenticate to generate new refresh token
- Update `CREDENTIALS_MASTER.md` with new token

### Issue: "Insufficient permissions"
**Solution:**
- Verify OAuth scopes include: `spreadsheets`, `drive.file`
- Re-authorize with correct scopes
- Check spreadsheet sharing settings

### Issue: "Spreadsheet not found"
**Solution:**
- Verify spreadsheet ID is correct: `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c`
- Ensure OAuth2 user has access to the spreadsheet
- Check if spreadsheet was deleted or moved

---

## Verification Checklist

- [ ] N8N dashboard accessible
- [ ] Credentials page accessed
- [ ] Google Sheets OAuth2 credential created
- [ ] Credential name: "Google Sheets - Performance Review Writer"
- [ ] Credential status: Connected/Active
- [ ] Spreadsheet ID documented: `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c`
- [ ] Test connection successful (see `test-connection.md`)

---

## Next Steps

1. ✅ Credential configured
2. 📍 Test connection (see `test-connection.md`)
3. 📍 Verify read/write operations
4. 📍 Proceed to Step 6 (Rewrite Workflow)

---

## Security Notes

- ✅ OAuth2 credentials stored securely in `CREDENTIALS_MASTER.md`
- ✅ Refresh token is permanent (doesn't expire unless revoked)
- ✅ N8N credentials are encrypted in the database
- ⚠️ Never commit credentials to git
- ⚠️ Limit spreadsheet access to necessary users only

---

**Last Updated:** 2024-11-04  
**Status:** Ready for testing  
**Next Document:** `test-connection.md`







