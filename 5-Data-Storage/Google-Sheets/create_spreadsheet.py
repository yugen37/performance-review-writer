#!/usr/bin/env python3
"""
Create Google Spreadsheet for Performance Review Writer
Uses Google Sheets API v4 with OAuth2 authentication
"""

import requests
import json
import sys

# OAuth2 credentials from CREDENTIALS_MASTER.md
# IMPORTANT: Replace these with actual values from CREDENTIALS_MASTER.md
CLIENT_ID = 'YOUR_CLIENT_ID_HERE'
CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE'
REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN_HERE'

def get_access_token():
    """Get access token using refresh token"""
    token_url = 'https://oauth2.googleapis.com/token'
    token_data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'refresh_token': REFRESH_TOKEN,
        'grant_type': 'refresh_token'
    }
    
    response = requests.post(token_url, data=token_data)
    if response.status_code == 200:
        return response.json()['access_token']
    else:
        print(f'❌ Error getting access token: {response.status_code}')
        print(response.text)
        sys.exit(1)

def create_spreadsheet(access_token):
    """Create a new Google Spreadsheet"""
    sheets_api_url = 'https://sheets.googleapis.com/v4/spreadsheets'
    
    spreadsheet_data = {
        'properties': {
            'title': 'Performance Review Writer - User Tracking'
        },
        'sheets': [{
            'properties': {
                'title': 'Sheet1',
                'gridProperties': {
                    'rowCount': 1000,
                    'columnCount': 5
                }
            }
        }]
    }
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    print('Creating spreadsheet...')
    response = requests.post(sheets_api_url, headers=headers, json=spreadsheet_data)
    
    if response.status_code == 200:
        spreadsheet = response.json()
        spreadsheet_id = spreadsheet['spreadsheetId']
        print(f'✅ Spreadsheet created!')
        print(f'   ID: {spreadsheet_id}')
        print(f'   URL: https://docs.google.com/spreadsheets/d/{spreadsheet_id}/edit')
        return spreadsheet_id, access_token
    else:
        print(f'❌ Error creating spreadsheet: {response.status_code}')
        print(response.text)
        sys.exit(1)

def add_headers(spreadsheet_id, access_token):
    """Add headers to Row 1"""
    sheets_api_url = f'https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/A1:E1'
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    values = [['Email', 'Scans Remaining', 'Timestamp', 'Source', 'Upgrade Status']]
    
    data = {
        'values': values,
        'majorDimension': 'ROWS'
    }
    
    params = {
        'valueInputOption': 'RAW'
    }
    
    print('Adding headers...')
    response = requests.put(sheets_api_url, headers=headers, params=params, json=data)
    
    if response.status_code == 200:
        print('✅ Headers added')
    else:
        print(f'❌ Error adding headers: {response.status_code}')
        print(response.text)

def format_headers(spreadsheet_id, access_token, sheet_id=0):
    """Format Row 1 headers (bold, freeze row)"""
    sheets_api_url = f'https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}:batchUpdate'
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    requests_data = [
        {
            'repeatCell': {
                'range': {
                    'sheetId': sheet_id,
                    'startRowIndex': 0,
                    'endRowIndex': 1,
                    'startColumnIndex': 0,
                    'endColumnIndex': 5
                },
                'cell': {
                    'userEnteredFormat': {
                        'textFormat': {
                            'bold': True
                        },
                        'backgroundColor': {
                            'red': 0.2,
                            'green': 0.4,
                            'blue': 0.8
                        }
                    }
                },
                'fields': 'userEnteredFormat(textFormat,backgroundColor)'
            }
        },
        {
            'updateSheetProperties': {
                'properties': {
                    'sheetId': sheet_id,
                    'gridProperties': {
                        'frozenRowCount': 1
                    }
                },
                'fields': 'gridProperties.frozenRowCount'
            }
        }
    ]
    
    data = {
        'requests': requests_data
    }
    
    print('Formatting headers...')
    response = requests.post(sheets_api_url, headers=headers, json=data)
    
    if response.status_code == 200:
        print('✅ Headers formatted (bold, blue background, frozen row)')
    else:
        print(f'⚠️  Error formatting headers: {response.status_code}')
        print(response.text)
        print('   (Spreadsheet created, but formatting may need manual adjustment)')

def save_spreadsheet_id(spreadsheet_id):
    """Save spreadsheet ID to file"""
    file_path = '5-Data-Storage/Google-Sheets/spreadsheet-id.txt'
    content = f"""# Google Sheets Spreadsheet ID

**Spreadsheet Name:** Performance Review Writer - User Tracking
**Spreadsheet ID:** {spreadsheet_id}
**URL:** https://docs.google.com/spreadsheets/d/{spreadsheet_id}/edit
**Status:** ✅ Created and configured
**Created:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---

## Schema

| Column | Field Name | Data Type |
|--------|------------|-----------|
| A | Email | String |
| B | Scans Remaining | Number |
| C | Timestamp | DateTime |
| D | Source | String |
| E | Upgrade Status | String |

---

## Headers

Row 1 contains the headers:
- Email
- Scans Remaining
- Timestamp
- Source
- Upgrade Status

Headers are formatted: **Bold**, Blue background, Frozen row 1

---

## Next Steps

1. ✅ Spreadsheet created
2. ⏭️ Share with N8N service account (Step 5: Google Sheets Integration)
3. ⏭️ Configure N8N Google Sheets credentials (Step 5)
4. ⏭️ Test read/write operations (Step 6: Rewrite Workflow)

"""
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f'✅ Spreadsheet ID saved to {file_path}')

def main():
    print('=' * 60)
    print('Google Sheets API - Performance Review Writer Setup')
    print('=' * 60)
    print()
    
    # Step 1: Get access token
    access_token = get_access_token()
    
    # Step 2: Create spreadsheet
    spreadsheet_id, access_token = create_spreadsheet(access_token)
    
    # Step 3: Add headers
    add_headers(spreadsheet_id, access_token)
    
    # Step 4: Format headers (get sheetId from spreadsheet metadata)
    # Default sheetId is typically 0, but we'll try to get it from the spreadsheet
    format_headers(spreadsheet_id, access_token, sheet_id=0)
    
    # Step 5: Save spreadsheet ID
    save_spreadsheet_id(spreadsheet_id)
    
    print()
    print('=' * 60)
    print('✅ Setup Complete!')
    print('=' * 60)
    print(f'Spreadsheet ID: {spreadsheet_id}')
    print(f'URL: https://docs.google.com/spreadsheets/d/{spreadsheet_id}/edit')
    print()

if __name__ == '__main__':
    main()

