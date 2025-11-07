# Create Google Spreadsheet - Quick Guide

**Time:** 5 minutes  
**Status:** Ready to create

---

## Option 1: Manual Creation (Recommended)

### Step 1: Create Spreadsheet
1. Go to: https://sheets.google.com
2. Sign in with: `Yugen37@gmail.com`
3. Click **"Blank"** to create new spreadsheet
4. Name it: **"Performance Review Writer - User Tracking"**

### Step 2: Set Up Headers
Enter these headers in **Row 1**:

| A1 | B1 | C1 | D1 | E1 |
|----|----|----|----|----|
| **Email** | **Scans Remaining** | **Timestamp** | **Source** | **Upgrade Status** |

**Quick copy-paste:**
```
Email	Scans Remaining	Timestamp	Source	Upgrade Status
```

### Step 3: Format Headers
- Select Row 1 (click on "1" on the left)
- Make text **Bold** (Ctrl+B / Cmd+B)
- Optional: Freeze Row 1 (View → Freeze → 1 row)
- Optional: Add background color (Format → Alternating colors)

### Step 4: Get Spreadsheet ID
- Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
- Copy the `SPREADSHEET_ID_HERE` part (the long string between `/d/` and `/edit`)
- Paste it into: `5-Data-Storage/Google-Sheets/spreadsheet-id.txt`

### Step 5: Verify Schema
Check that your spreadsheet matches:
- Column A: Email (text)
- Column B: Scans Remaining (number)
- Column C: Timestamp (date/time)
- Column D: Source (text)
- Column E: Upgrade Status (text)

---

## Option 2: Use Google Sheets API (Advanced)

If you prefer to create it programmatically, you can use the Google Sheets API with OAuth2 credentials.

**Credentials available:**
- Client ID: `YOUR_CLIENT_ID_HERE`
- Client Secret: `YOUR_CLIENT_SECRET_HERE`
- Refresh Token: `YOUR_REFRESH_TOKEN_HERE

---

## ✅ Completion Checklist

- [ ] Spreadsheet created with name: "Performance Review Writer - User Tracking"
- [ ] Headers set in Row 1 (Email, Scans Remaining, Timestamp, Source, Upgrade Status)
- [ ] Headers formatted (bold, frozen row optional)
- [ ] Spreadsheet ID copied from URL
- [ ] Spreadsheet ID pasted into `spreadsheet-id.txt`
- [ ] Schema verified (see `schema.md` for details)

---

## Next Steps

After completing this:
- **Step 3:** N8N instance on Railway (30 min)
- **Step 5:** Google Sheets integration setup (will share spreadsheet with N8N service account)

**Note:** You don't need to add any data yet. The spreadsheet will be populated automatically when users submit their emails via the N8N workflow.







