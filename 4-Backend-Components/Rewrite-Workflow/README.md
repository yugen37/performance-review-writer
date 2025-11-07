# Rewrite N8N Workflow

**From PRD Section 3.2.2**

Generate enhanced version using OpenAI + track usage in Google Sheets.

**N8N Webhook:** `POST /webhook/rewrite`

---

## Workflow Steps

1. Webhook Node - Receive POST request
2. Code Node - Email validation
3. Google Sheets Node - Check if email exists
4. IF Node - Email exists check
5. IF Node - Scans remaining check
6. OpenAI Node - Generate rewrite
7. Google Sheets Node - Update scan count
8. Google Sheets Node - Save email (if new)
9. Code Node - Format response
10. Respond to Webhook Node

---

## Files to Store Here

- N8N workflow JSON exports
- Code node scripts
- OpenAI prompt configuration
- Google Sheets integration code
- API documentation
- Test cases
- Error handling documentation







