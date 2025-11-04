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

### 2024-11-04 - Phase 0 Step 1: GitHub Repository Setup Complete
**Problem:** N/A - Initial setup step

**Root Cause:** N/A

**Solution:** 
1. Created new GitHub repository: `yugen37/performance-review-writer`
2. Initialized local git repository
3. Created `.gitignore` with standard exclusions (node_modules, .env, .DS_Store, etc.)
4. Committed all project files (32 files, 2470 lines)
5. Connected local repo to GitHub remote
6. Pushed code to main branch

**Lesson:** 
- GitHub repo must be created first before any deployment setup
- Use GitHub API with token for automated repo creation: `curl -X POST -H "Authorization: token TOKEN" https://api.github.com/user/repos`
- Remote URL can include token for authentication: `https://TOKEN@github.com/user/repo.git`
- Always verify with `git status` and `git remote -v` after setup

**Prevention:** 
- Document repo URL immediately after creation
- Verify all criteria from critical path before marking complete
- Keep repo URL in Project Status for easy reference

**Repository Details:**
- URL: https://github.com/yugen37/performance-review-writer
- Branch: main
- Status: Up to date with origin/main
- Files: 32 files committed
- Ready for: Cloudflare Pages deployment

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

