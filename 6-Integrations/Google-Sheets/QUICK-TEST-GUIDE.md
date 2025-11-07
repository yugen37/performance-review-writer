# Quick Test Guide - Google Sheets Connection

**Status:** ✅ Credentials already exist in N8N  
**Time Required:** 5 minutes  
**Purpose:** Verify Google Sheets integration works

---

## ✅ Credentials Status

Google Sheets OAuth2 credentials **already exist** in your N8N instance!

**Next Step:** Run quick connection test to verify it works.

---

## 🚀 Quick Test (Option 1: Simple Test Workflow)

### Create Test Workflow in N8N

1. **Go to N8N Dashboard:**
   - `https://n8n-production-45b7.up.railway.app`

2. **Create New Workflow:**
   - Click "+ New Workflow"
   - Name: "Test Google Sheets Connection"

3. **Add Nodes:**

**Node 1: Webhook**
- Trigger: Webhook
- Method: GET
- Path: `test-sheets-quick`
- Response Mode: "Using 'Respond to Webhook' Node"

**Node 2: Google Sheets**
- Operation: **Read Rows**
- Credential: Select existing "Google Sheets OAuth2" credential
- Spreadsheet: By ID
- Spreadsheet ID: `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c`
- Sheet: `Sheet1`
- Range: `A1:E1`

**Node 3: Respond to Webhook**
- Response: `={{ $json }}`

4. **Save and Activate Workflow**

5. **Test:**
```bash
curl https://n8n-production-45b7.up.railway.app/webhook/test-sheets-quick
```

**Expected Result:**
```json
{
  "Email": "Email",
  "Scans Remaining": "Scans Remaining",
  "Timestamp": "Timestamp",
  "Source": "Source",
  "Upgrade Status": "Upgrade Status"
}
```

(Or array format with header row values)

---

## ✅ If Test Passes

**You're done!** Google Sheets integration is working.

Update status:
- [x] Google Sheets credentials verified
- [x] Connection test passed
- [x] Ready for Step 6 (Rewrite Workflow)

---

## ❌ If Test Fails

Check these:
1. **Credential Status:** In N8N Credentials, is the Google Sheets credential "Connected"?
2. **Spreadsheet Access:** Does the authenticated Google account have access to the spreadsheet?
3. **Spreadsheet ID:** Verify `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c` is correct
4. **Sheet Name:** Verify sheet is named "Sheet1"

If still failing, see detailed troubleshooting in `test-connection.md`

---

## 🚀 Alternative: Direct API Test (Option 2)

If you want to test without creating a workflow:

1. Get the credential name from N8N dashboard
2. Use it in the Rewrite Workflow (Step 6)
3. Test during Step 6 implementation

---

## Next Steps

Once test passes:
1. ✅ Mark Step 5 as complete
2. 🚀 Proceed to Step 6: Rewrite N8N Workflow
3. Use the existing Google Sheets credential in the workflow

---

**Credential Name in N8N:** [Check dashboard - likely "Google Sheets OAuth2" or similar]  
**Spreadsheet ID:** `1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c`  
**Sheet Name:** `Sheet1`  
**Status:** ✅ Ready to use in Step 6

---

*Created: 2024-11-04*  
*Quick test for existing credentials*







