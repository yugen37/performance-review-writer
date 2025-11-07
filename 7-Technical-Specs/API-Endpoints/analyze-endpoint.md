# Analysis API Endpoint - Performance Review Analyzer

**Created:** 2024-11-04  
**Status:** ✅ Active and tested  
**Workflow ID:** `5uYz4TSeCAx1zjoR`

---

## Endpoint Details

**URL:** `https://n8n-production-45b7.up.railway.app/webhook/analyze`  
**Method:** `POST`  
**Content-Type:** `application/json`  
**Authentication:** None (public endpoint)

---

## Request Format

### Headers
```http
POST /webhook/analyze HTTP/1.1
Host: n8n-production-45b7.up.railway.app
Content-Type: application/json
```

### Body
```json
{
  "text": "User's performance review bullet"
}
```

### Request Parameters

| Parameter | Type | Required | Max Length | Description |
|-----------|------|----------|------------|-------------|
| `text` | string | Yes | 200 words | Performance review bullet to analyze |

---

## Response Format

### Success Response (200 OK)

```json
{
  "score": 100,
  "breakdown": {
    "outcome": {
      "found": true,
      "reason": "Contains achievement indicator"
    },
    "metrics": {
      "found": true,
      "reason": "Contains quantifiable metrics"
    },
    "method": {
      "found": true,
      "reason": "Contains method indicator"
    }
  },
  "painPoint": "Excellent! Your review demonstrates clear impact with measurable results.",
  "originalText": "Led team of 10 engineers to increase system performance by 40% through architecture redesign"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | Overall score (0-100) based on XYZ framework |
| `breakdown` | object | Detailed breakdown of XYZ components |
| `breakdown.outcome` | object | Outcome (X) analysis - Achievement/impact |
| `breakdown.metrics` | object | Metrics (Y) analysis - Quantifiable numbers |
| `breakdown.method` | object | Method (Z) analysis - How it was done |
| `painPoint` | string | User-friendly message based on score |
| `originalText` | string | Echo of the input text |

### Score Breakdown

**Scoring System:**
- **Outcome (X):** 40 points - Contains achievement/impact indicators
- **Metrics (Y):** 40 points - Contains quantifiable numbers
- **Method (Z):** 20 points - Contains method/process indicators
- **Total:** 100 points maximum

**Score Ranges:**
- `0-39`: Weak - Missing impact and measurable results
- `40-69`: Generic - Needs improvement, add metrics or method
- `70-89`: Good - Could be stronger with more detail
- `90-100`: Excellent - Clear impact with measurable results

---

## Error Responses

### Error Response (400 Bad Request)

**Empty Text:**
```json
{
  "error": "Text cannot be empty",
  "statusCode": 400
}
```

**Text Too Long:**
```json
{
  "error": "Text exceeds 200 words. Please enter a single bullet point.",
  "statusCode": 400
}
```

### Error Response (500 Internal Server Error)

**Workflow Error:**
```json
{
  "message": "Error in workflow"
}
```

---

## Code Examples

### JavaScript (Fetch API)
```javascript
const response = await fetch('https://n8n-production-45b7.up.railway.app/webhook/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Led team of 10 to increase sales by 30% through process optimization'
  })
});

const result = await response.json();
console.log('Score:', result.score);
console.log('Pain Point:', result.painPoint);
```

### Python (Requests)
```python
import requests

url = 'https://n8n-production-45b7.up.railway.app/webhook/analyze'
payload = {
    'text': 'Managed team of 5 engineers'
}

response = requests.post(url, json=payload)
result = response.json()

print(f"Score: {result['score']}")
print(f"Breakdown: {result['breakdown']}")
```

### cURL
```bash
curl -X POST https://n8n-production-45b7.up.railway.app/webhook/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Increased system performance by 40% through architecture redesign"}'
```

---

## XYZ Framework

### Outcome (X) - 40 points
**What to look for:**
- Achievement verbs: achieved, delivered, improved, increased, decreased, reduced
- Leadership verbs: led, drove, established, created, launched, implemented
- Impact statements showing results

**Examples:**
- ✅ "Increased sales..."
- ✅ "Led team to achieve..."
- ❌ "Responsible for sales..."

### Metrics (Y) - 40 points
**What to look for:**
- Numbers: 5, 10, 100
- Percentages: 30%, 50%
- Quantities: million, thousand
- Time periods: weeks, months, years

**Examples:**
- ✅ "by 30%"
- ✅ "team of 10"
- ✅ "saved $100K"
- ❌ "significant improvement"

### Method (Z) - 20 points
**What to look for:**
- Process indicators: by, through, via, using, with
- Action verbs: implementing, executing, managing, leading
- How the work was accomplished

**Examples:**
- ✅ "through architecture redesign"
- ✅ "by implementing new process"
- ✅ "using data-driven approach"
- ❌ Just stating what was done

---

## Testing & Validation

### Test Cases

All test cases pass with 100% success rate:

1. **Empty text** - Returns 400 error ✅
2. **Text > 200 words** - Returns 400 error ✅
3. **Weak bullet** (no XYZ) - Returns low score (0-39) ✅
4. **Medium bullet** (partial XYZ) - Returns medium score (40-89) ✅
5. **Strong bullet** (complete XYZ) - Returns high score (90-100) ✅

### Performance

- **Response Time:** < 2 seconds (average: 0.5-1s)
- **Availability:** 99.9% (Railway hosted)
- **Rate Limiting:** None currently configured

---

## Integration Notes

### Frontend Integration
1. Call API when user submits performance review bullet
2. Display score visually (0-100 with color coding)
3. Show breakdown table (Outcome, Metrics, Method checkmarks)
4. Display pain point message to user
5. Add "See How This Could Be Better" button

### Environment Variables
```bash
# For frontend (Cloudflare Pages)
VITE_N8N_ANALYZE_URL=https://n8n-production-45b7.up.railway.app/webhook/analyze
```

### Error Handling
```javascript
try {
  const response = await fetch(ANALYZE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: userInput })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message);
  }
  
  const result = await response.json();
  // Handle success
  
} catch (error) {
  // Handle error (show user-friendly message)
  console.error('Analysis failed:', error.message);
}
```

---

## Workflow Architecture

### N8N Nodes
1. **Webhook Node** - Receives POST request
2. **Input Validation Code Node** - Validates text (empty, word count)
3. **Has Error? IF Node** - Checks for validation errors
4. **Score Calculation Code Node** - Analyzes text using XYZ framework
5. **Respond Success Node** - Returns score and breakdown (200)
6. **Respond Error Node** - Returns error message (400/500)

### Workflow Flow
```
Webhook → Input Validation → Has Error?
                                 ├─ Yes → Respond Error (400)
                                 └─ No → Score Calculation → Respond Success (200)
```

---

## Changelog

### v1.0.0 (2024-11-04)
- ✅ Initial release
- ✅ XYZ framework implementation
- ✅ Input validation (empty, 200 word limit)
- ✅ Error handling (400, 500 status codes)
- ✅ All test cases passing

---

## Support & Troubleshooting

### Common Issues

**Issue:** "Text cannot be empty"
- **Solution:** Ensure `text` field is included in request body and is not empty

**Issue:** "Text exceeds 200 words"
- **Solution:** Limit input to single performance review bullet (max 200 words)

**Issue:** Response time > 2 seconds
- **Solution:** Check N8N instance health, verify Railway service status

### Monitoring
- Check workflow executions in N8N dashboard
- View logs: `https://n8n-production-45b7.up.railway.app`
- Workflow ID: `5uYz4TSeCAx1zjoR`

---

**Last Updated:** 2024-11-04  
**Maintained By:** Performance Review Writer Project  
**Version:** 1.0.0







