# Analysis N8N Workflow

**From PRD Section 3.2.1**

Analyze performance review bullet and return score + breakdown.

**N8N Webhook:** `POST /webhook/analyze`

---

## Workflow Steps

1. Webhook Node - Receive POST request
2. Code Node - Input validation (length check, max 200 words)
3. Code Node - Score calculation (XYZ framework)
4. Respond to Webhook Node - Return JSON response

---

## Files to Store Here

- N8N workflow JSON exports
- Code node scripts
- API documentation
- Test cases
- Error handling documentation

