# Google Sheets Setup Guide - Step 2

**Time:** 10 minutes  
**Status:** Ready to create

---

## Quick Setup Steps

### 1. Create New Spreadsheet
- Go to: https://sheets.google.com
- Click **"Blank"** to create new spreadsheet
- Name it: **"Performance Review Writer - User Tracking"**

### 2. Set Up Headers (Row 1)
Enter these headers in Row 1:

| A1 | B1 | C1 | D1 | E1 |
|----|----|----|----|----|
| **Email** | **Scans Remaining** | **Timestamp** | **Source** | **Upgrade Status** |

**Quick copy-paste:**
```
Email	Scans Remaining	Timestamp	Source	Upgrade Status
```

### 3. Format Headers
- Select Row 1
- Make text **Bold**
- Optional: Freeze Row 1 (View → Freeze → 1 row)

### 4. Get Spreadsheet ID
- Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
- Copy the `SPREADSHEET_ID_HERE` part
- Paste it into: `5-Data-Storage/Google-Sheets/spreadsheet-id.txt`

### 5. Verify Schema
Check that your spreadsheet matches:
- Column A: Email
- Column B: Scans Remaining (Number format)
- Column C: Timestamp (Date/Time format)
- Column D: Source
- Column E: Upgrade Status

---

## ✅ Checklist

- [ ] Spreadsheet created
- [ ] Headers set in Row 1
- [ ] Spreadsheet ID copied to `spreadsheet-id.txt`
- [ ] Schema verified (see `schema.md` for details)

---

## Next Step

After completing this:
- **Step 3:** N8N instance on Railway (30 min)
- **Step 5:** Google Sheets integration setup (will share spreadsheet with N8N)

---

**Note:** You don't need to add any data yet. The spreadsheet will be populated automatically when users submit their emails via the N8N workflow.







