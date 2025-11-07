# Google Sheets Credentials Reference

**Source:** `/Users/yugenmohan/Desktop/Project 1k/shared-resources/credentials/CREDENTIALS_MASTER.md`

---

## Available Credentials

### Google OAuth2 (For Spreadsheet Access)
- **Client ID**: `YOUR_CLIENT_ID_HERE` (Get from CREDENTIALS_MASTER.md)
- **Client Secret**: `YOUR_CLIENT_SECRET_HERE` (Get from CREDENTIALS_MASTER.md)
- **Refresh Token**: `YOUR_REFRESH_TOKEN_HERE` (Get from CREDENTIALS_MASTER.md)
- **Status**: ✅ Active and working
- **Connection**: ✅ PERMANENT (refresh token doesn't expire unless revoked)
- **Scopes**: `spreadsheets`, `gmail.send`, `drive.file`

### Google API Key
- **API Key**: `AIzaSyAQnxHjbdVOpiL8BlKthi_Ft-Qmcx1Eg3E`
- **Status**: ✅ Active and configured
- **Purpose**: Direct API access to Google Sheets (formatting, reading, writing)
- **Note**: API keys work for read operations, but OAuth is required for write/format operations

---

## N8N Configuration

When setting up Google Sheets in N8N (Step 5), use these OAuth2 credentials:
- **Client ID**: `YOUR_CLIENT_ID_HERE`
- **Client Secret**: `YOUR_CLIENT_SECRET_HERE`
- **OAuth Redirect URI**: `https://n8n-production-45b7.up.railway.app/rest/oauth2-credential/callback`

---

## Next Steps

1. Create new spreadsheet manually via Google Sheets UI (or use API)
2. Set up headers as per `schema.md`
3. Document spreadsheet ID in `spreadsheet-id.txt`
4. Share spreadsheet with N8N service account (Step 5)







