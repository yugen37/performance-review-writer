# Google Sheets Schema - Performance Review Writer

**Spreadsheet Name:** Performance Review Writer - User Tracking  
**Purpose:** Track email addresses and free scan usage per user

---

## Schema Structure

### Column Definitions

| Column | Letter | Field Name | Data Type | Description | Example |
|--------|--------|------------|-----------|-------------|---------|
| **Email** | A | `email` | String | Primary identifier (user's email address) | `user@example.com` |
| **Scans Remaining** | B | `scans_remaining` | Number | Free scans left (starts at 3, decrements) | `3`, `2`, `1`, `0` |
| **Timestamp** | C | `timestamp` | DateTime | Last activity date/time (ISO format) | `2024-11-04 10:30:00` |
| **Source** | D | `source` | String | Origin identifier (always "performance-review-writer") | `performance-review-writer` |
| **Upgrade Status** | E | `upgrade_status` | String | User subscription tier | `free` or `premium` |

---

## Spreadsheet Setup Instructions

### Step 1: Create Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Name it: **"Performance Review Writer - User Tracking"**

### Step 2: Set Up Headers (Row 1)
Enter these exact column headers in Row 1:

| A1 | B1 | C1 | D1 | E1 |
|----|----|----|----|----|
| Email | Scans Remaining | Timestamp | Source | Upgrade Status |

**Format Row 1:**
- Make headers **bold**
- Optional: Freeze Row 1 (View → Freeze → 1 row)

### Step 3: Configure Column Formats
- **Column A (Email):** Plain text
- **Column B (Scans Remaining):** Number format
- **Column C (Timestamp):** Date/Time format
- **Column D (Source):** Plain text (will always be "performance-review-writer")
- **Column E (Upgrade Status):** Plain text (default: "free")

---

## Data Flow

### New User Flow
1. User submits email for first time
2. N8N checks if email exists in Column A
3. If not found → Create new row:
   - Email: `user@example.com`
   - Scans Remaining: `3`
   - Timestamp: Current date/time
   - Source: `performance-review-writer`
   - Upgrade Status: `free`

### Existing User Flow
1. User submits email (already exists)
2. N8N reads current `scans_remaining` from Column B
3. If `scans_remaining > 0`:
   - Generate rewrite via OpenAI
   - Decrement `scans_remaining` by 1
   - Update `timestamp` to current date/time
4. If `scans_remaining = 0`:
   - Return error: "You've used all 3 free scans"
   - Show upgrade prompt

---

## N8N Operations

### Read Operation
- **Query:** Check if email exists in Column A
- **Range:** `A:A` (all emails)
- **Filter:** Match email exactly

### Create Operation
- **Operation:** Append row
- **When:** New email detected
- **Default values:**
  - Scans Remaining: `3`
  - Source: `performance-review-writer`
  - Upgrade Status: `free`

### Update Operation
- **Operation:** Update specific row
- **When:** After rewrite generated
- **Updates:**
  - Scans Remaining: `scans_remaining - 1`
  - Timestamp: Current date/time

---

## Example Data

| Email | Scans Remaining | Timestamp | Source | Upgrade Status |
|-------|----------------|-----------|--------|----------------|
| user1@example.com | 2 | 2024-11-04 10:30:00 | performance-review-writer | free |
| user2@example.com | 1 | 2024-11-04 11:15:00 | performance-review-writer | free |
| user3@example.com | 0 | 2024-11-04 09:45:00 | performance-review-writer | premium |

---

## Security & Permissions

### N8N Service Account Access
1. **Share spreadsheet with N8N service account:**
   - Click "Share" button in Google Sheets
   - Enter N8N service account email (from N8N Google Sheets credentials)
   - Grant **"Editor"** permissions
   - Allow N8N to read/write data

### Privacy Considerations
- All user data stored in Google Sheets
- GDPR compliance: User data is email-based only
- No sensitive information stored
- Upgrade status tracked for monetization

---

## Next Steps (After Schema Setup)

1. ✅ Create spreadsheet with this schema
2. ✅ Document spreadsheet ID in `spreadsheet-id.txt`
3. ⏭️ Share with N8N service account (Step 5: Google Sheets Integration)
4. ⏭️ Configure N8N Google Sheets credentials (Step 5)
5. ⏭️ Test read/write operations (Step 6: Rewrite Workflow)

---

**Last Updated:** 2024-11-04  
**Status:** Schema defined, ready for spreadsheet creation







