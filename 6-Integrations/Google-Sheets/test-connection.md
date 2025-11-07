# Google Sheets Connection Testing Guide

**Date:** 2024-11-04  
**Purpose:** Test Google Sheets integration in N8N for Performance Review Writer project

---

## Prerequisites

- ✅ N8N instance: `https://n8n-production-45b7.up.railway.app`
- ✅ Google Sheets OAuth2 credentials configured (see `n8n-credentials-setup.md`)
- ✅ Spreadsheet ID: `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c`

---

## Manual Setup Required

**Note:** Google Sheets credentials cannot be configured via API and require manual setup in the N8N dashboard.

### Setup Steps:

1. **Access N8N Dashboard:**
   - URL: `https://n8n-production-45b7.up.railway.app`
   - Login: `Yugen37@gmail.com` / `Iamgood!1`

2. **Navigate to Credentials:**
   - Click profile icon (top right)
   - Select "Credentials"
   - Or go to: `https://n8n-production-45b7.up.railway.app/credentials`

3. **Check Existing Credentials:**
   - Search for "Google Sheets" in the credentials list
   - If a Google Sheets OAuth2 credential exists: **Use it and skip to Testing**
   - If not: **Create new credential** (see `n8n-credentials-setup.md`)

4. **Create Google Sheets OAuth2 Credential:**
   - Click "+ Add Credential"
   - Select "Google Sheets OAuth2 API"
   - Name: `Google Sheets - Performance Review Writer`
   - Click "Connect my account"
   - Sign in with: `Yugen37@gmail.com`
   - Grant permissions
   - Click "Save"

---

## Testing Operations

### Test 1: Read Operation (Headers)

**Purpose:** Verify read access to spreadsheet

**Steps:**
1. Create a new workflow: "Test Google Sheets - Read"
2. Add nodes:
   - **Webhook** (GET `/test-sheets-read`)
   - **Google Sheets** node
   - **Respond to Webhook**

3. Configure Google Sheets node:
   - **Operation:** Read Rows
   - **Spreadsheet ID:** `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c`
   - **Sheet:** `Sheet1`
   - **Range:** `A1:E1`
   - **Credential:** Select "Google Sheets - Performance Review Writer"

4. Save and activate workflow

5. Test:
```bash
curl -X GET https://n8n-production-45b7.up.railway.app/webhook/test-sheets-read
```

**Expected Result:**
```json
[
  ["Email", "Scans Remaining", "Timestamp", "Source", "Upgrade Status"]
]
```

**Status:** [ ] Pass | [ ] Fail

---

### Test 2: Write Operation (Append Row)

**Purpose:** Verify write access to spreadsheet

**Steps:**
1. Add Google Sheets node to test workflow
2. Configure:
   - **Operation:** Append or Update Row
   - **Spreadsheet ID:** `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c`
   - **Sheet:** `Sheet1`
   - **Data Mode:** Define Below
   - **Values:**
     - Email: `test@example.com`
     - Scans Remaining: `3`
     - Timestamp: `={{ $now.toISO() }}`
     - Source: `test`
     - Upgrade Status: `free`

3. Execute workflow

**Expected Result:**
- New row added to spreadsheet
- No errors

**Cleanup:**
- Manually delete test row from spreadsheet

**Status:** [ ] Pass | [ ] Fail

---

### Test 3: Lookup Operation (Find Email)

**Purpose:** Verify lookup/search functionality

**Steps:**
1. First, manually add a test row:
   - Email: `lookup-test@example.com`
   - Scans Remaining: `3`
   - Timestamp: (current)
   - Source: `test`
   - Upgrade Status: `free`

2. Add Google Sheets node:
   - **Operation:** Lookup
   - **Spreadsheet ID:** `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c`
   - **Sheet:** `Sheet1`
   - **Lookup Column:** `Email`
   - **Lookup Value:** `lookup-test@example.com`

3. Execute workflow

**Expected Result:**
- Returns row data for `lookup-test@example.com`
- Shows Scans Remaining: 3

**Cleanup:**
- Delete test row

**Status:** [ ] Pass | [ ] Fail

---

### Test 4: Update Operation (Decrement Scans)

**Purpose:** Verify update functionality (critical for rewrite workflow)

**Steps:**
1. Ensure test row exists from Test 3
2. Add Google Sheets node:
   - **Operation:** Update
   - **Spreadsheet ID:** `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c`
   - **Sheet:** `Sheet1`
   - **Lookup Column:** `Email`
   - **Lookup Value:** `lookup-test@example.com`
   - **Update Fields:**
     - Scans Remaining: `2` (or `={{ $json["Scans Remaining"] - 1 }}`)

3. Execute workflow

**Expected Result:**
- Scans Remaining updated from 3 → 2
- Timestamp updated

**Cleanup:**
- Delete test row

**Status:** [ ] Pass | [ ] Fail

---

## Alternative: API-Based Testing

If N8N Google Sheets node doesn't work, use HTTP Request nodes with the same OAuth2 credentials used in Step 2:

### Read via API:
```
GET https://sheets.googleapis.com/v4/spreadsheets/1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c/values/Sheet1!A1:E1
Authorization: Bearer {access_token}
```

### Append via API:
```
POST https://sheets.googleapis.com/v4/spreadsheets/1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c/values/Sheet1!A:E:append?valueInputOption=RAW
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "values": [
    ["test@example.com", 3, "2024-11-04", "test", "free"]
  ]
}
```

**OAuth2 Token Generation:**
```
POST https://oauth2.googleapis.com/token
Content-Type: application/x-www-form-urlencoded

client_id=YOUR_CLIENT_ID_HERE&
client_secret=YOUR_CLIENT_SECRET_HERE&
refresh_token=YOUR_REFRESH_TOKEN_HERE
grant_type=refresh_token
```

---

## Test Results Summary

| Test | Operation | Status | Notes |
|------|-----------|--------|-------|
| 1 | Read Headers | [ ] | |
| 2 | Append Row | [ ] | |
| 3 | Lookup Email | [ ] | |
| 4 | Update Scans | [ ] | |

---

## Troubleshooting

### "Authentication failed"
- Verify credential is connected in N8N
- Re-authenticate if needed
- Check OAuth scopes include `spreadsheets`

### "Spreadsheet not found"
- Verify spreadsheet ID is correct
- Ensure authenticated user has access to spreadsheet
- Check spreadsheet URL: https://docs.google.com/spreadsheets/d/1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c/edit

### "Insufficient permissions"
- Re-authorize with correct scopes
- Ensure spreadsheet is shared with service account (if applicable)
- Check credential permissions in N8N

---

## Success Criteria

- ✅ Google Sheets credential configured in N8N
- ✅ All 4 tests pass
- ✅ No authentication errors
- ✅ Response time < 3 seconds per operation
- ✅ Data integrity maintained (no corruption)

---

**Status:** Manual configuration required  
**Next Steps:**
1. Complete manual credential setup in N8N dashboard
2. Run all 4 tests
3. Document results in this file
4. Proceed to Step 6 (Rewrite Workflow) once all tests pass

---

**Last Updated:** 2024-11-04  
**Credential Config:** Manual setup in N8N dashboard required  
**Testing Status:** Pending manual configuration







