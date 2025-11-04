# Lessons Learned - Performance Review Writer

**Purpose:** Track troubleshooting, fixes, and lessons learned during development.  
**When to Update:** Every time you encounter an issue, fix it, or learn something important.

---

## Format Template

```
### [Date] - [Issue Title]
**Problem:** [What went wrong?]
**Root Cause:** [Why did it happen?]
**Solution:** [How did you fix it?]
**Lesson:** [What should we remember?]
**Prevention:** [How to avoid this in the future?]
```

---

## Entries

### [Example] - 2024-01-15 - N8N Webhook Not Responding
**Problem:** Frontend couldn't connect to N8N webhook endpoint. Getting CORS errors.

**Root Cause:** N8N webhook wasn't configured to allow CORS from Cloudflare Pages domain.

**Solution:** 
1. Added CORS headers in N8N webhook response
2. Configured N8N to allow requests from frontend domain
3. Updated environment variables in Cloudflare Pages

**Lesson:** Always configure CORS when frontend and backend are on different domains.

**Prevention:** 
- Add CORS configuration during initial N8N workflow setup
- Document allowed origins in environment variables
- Test API connections early in development

---

### [Add new entries above this line]

---

## Quick Reference

### Common Issues & Solutions

**Issue:** [Description]  
**Solution:** [Quick fix]

---

## N8N Workflow Tips

*Add tips and tricks for working with N8N workflows here*

---

## Google Sheets Integration Notes

*Add notes about Google Sheets API, permissions, and common issues*

---

## Frontend Deployment Notes

*Add notes about Cloudflare Pages deployment, environment variables, and common issues*

---

## OpenAI API Notes

*Add notes about prompt engineering, API usage, rate limits, and costs*

