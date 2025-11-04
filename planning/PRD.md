# Product Requirements Document (PRD)
## Performance Review Writer

**Version:** 1.0  
**Date:** 2024  
**Status:** Draft

---

## 1. Product Overview

### 1.1 Purpose
A web-based tool that analyzes performance review bullets, shows instant scores, and provides AI-enhanced rewrites after email capture. Users get 3 free scans, then are prompted to upgrade for unlimited access.

### 1.2 Core Value Proposition
"Write jaw-dropping performance reviews even if you're not a writer and feel weird bragging."

### 1.3 Success Metrics
- Email capture conversion rate (target: 40%+)
- Free scan completion rate (target: 60%+)
- Upgrade conversion rate (target: 5-10%)
- Average score improvement (baseline to track)

---

## 2. User Flows

### 2.1 Happy Path Flow
```
1. User lands on homepage
2. User pastes performance review bullet
3. User clicks "Analyze"
4. Score displays immediately (no gate)
5. User sees breakdown: Outcome ✓/✗, Metrics ✓/✗, Method ✓/✗
6. User clicks "See How This Could Be Better"
7. Email gate modal/form appears
8. User enters email and submits
9. Before/After rewrite displays side-by-side
10. Counter shows: "X free scans remaining"
11. User can copy enhanced version
12. Repeat steps 2-11 until 3 scans used
13. After 3rd scan, upgrade prompt appears
```

### 2.2 Edge Cases
- User pastes empty text → Show error
- User pastes text > 200 words → Show error: "Please enter a single bullet point. Your entry is too long."
- User has used 3 scans → Show upgrade prompt, block further scans
- API fails → Show error message, allow retry
- Invalid email format → Show validation error
- User closes email gate → Can reopen by clicking button again

---

## 3. Component Breakdown

### 3.1 Frontend Components

#### 3.1.1 Landing Page Component
**Purpose:** Main entry point with pain point messaging

**Sub-components:**
- **Header**
  - Logo/branding
  - Optional: "Log In" / "Sign Up" (if accounts needed later)
  
- **Hero Section**
  - Headline: "Write jaw-dropping performance reviews even if you're not a writer and feel weird bragging"
  - Subheadline: Pain point messaging (e.g., "Getting stuck? Generic reviews hold you back. Show your impact.")
  - Input field: "Paste your performance review bullet"
    - Placeholder text
    - Character counter (optional, max 200 words visible)
    - Validation: Real-time length check
  - "Analyze" button
    - Disabled state when empty
    - Loading state during API call
    - Error state if validation fails

- **Features/Benefits Section** (optional)
  - Quick bullets on why this works
  - Social proof (if available)

- **Footer**
  - Links: Privacy, Terms, Contact
  - Copyright

**States:**
- Initial (empty form)
- Loading (analyzing)
- Error (validation failed)
- Results (score displayed)

**Dependencies:**
- Input validation utility
- N8N webhook API client (analyze endpoint)
- State management (React/Next.js)

---

#### 3.1.2 Score Display Component
**Purpose:** Show immediate score and breakdown (no gate)

**Sub-components:**
- **Overall Score Display**
  - Large number (0-100)
  - Visual indicator (color: red/yellow/green)
  - Label: "Your Score"
  
- **Score Breakdown Table**
  - Outcome (X): ✓ or ✗ indicator
  - Metrics (Y): ✓ or ✗ indicator
  - Method (Z): ✓ or ✗ indicator
  - Simple labels explaining each dimension
  
- **Pain Point Message**
  - Dynamic text based on score:
    - Low (0-40): "Your review is weak and missing impact"
    - Medium (41-70): "Your review is generic and needs improvement"
    - High (71-100): "Your review is good but could be stronger"
  
- **CTA Button**
  - "See How This Could Be Better"
  - Triggers email gate modal

**States:**
- Loading (calculating score)
- Displaying (score shown)
- Error (calculation failed)

**Data Requirements:**
- Score from N8N analyze workflow response
- Breakdown from N8N analyze workflow response
- Pain point message from N8N response

---

#### 3.1.3 Email Gate Component
**Purpose:** Capture email before showing rewrite

**Sub-components:**
- **Modal/Overlay**
  - Backdrop (semi-transparent)
  - Close button (X)
  - Responsive design (mobile-friendly)
  
- **Form**
  - Heading: "Enter your email to see your enhanced version"
  - Email input field
    - Type: email
    - Validation: Real-time format check
    - Placeholder: "your@email.com"
  - Submit button
    - "Get My Enhanced Review"
    - Disabled until valid email
    - Loading state during submission
  
- **Error Handling**
  - Invalid email format message
  - API error message
  - Retry option

**States:**
- Closed (hidden)
- Open (visible)
- Submitting (loading)
- Error (validation/API failed)
- Success (closes, shows rewrite)

**Dependencies:**
- Email validation utility
- N8N rewrite webhook API client
- State management (modal visibility)

---

#### 3.1.4 Before/After Rewrite Component
**Purpose:** Display original vs enhanced version side-by-side

**Sub-components:**
- **Container**
  - Two-column layout (desktop)
  - Stacked layout (mobile)
  
- **Original Panel (Left)**
  - Label: "Your Original"
  - Text display: User's input (read-only)
  - Background: Light gray/white
  
- **Enhanced Panel (Right)**
  - Label: "Enhanced Version"
  - Text display: AI-generated rewrite
  - Copy button
    - Icon + "Copy" text
    - Success feedback (toast/notification)
    - Copied state (brief visual confirmation)
  
- **Scan Counter**
  - Display: "X free scans remaining"
  - Value from N8N API response (remainingScans)
  - Updates after each rewrite
  - Styling: Subtle, non-intrusive

**States:**
- Loading (generating rewrite via N8N)
- Displaying (both panels visible)
- Copying (copy action in progress)
- Error (rewrite generation failed)

**Data Requirements:**
- Original text (from user input)
- Enhanced text (from N8N rewrite workflow response)
- Remaining scans count (from N8N API response: `remainingScans`)

**Dependencies:**
- Clipboard API
- Copy utility function
- N8N rewrite webhook response

---

#### 3.1.5 Upgrade Prompt Component
**Purpose:** Show upgrade options after 3 free scans

**Sub-components:**
- **Modal/Overlay**
  - Backdrop
  - Close button (optional)
  
- **Heading**
  - "You've used all 3 free scans"
  - Subheading: "Get unlimited performance review enhancements"
  
- **Pricing Tiers**
  - **Annual Plan**
    - Price display
    - "Best Value" badge (optional)
    - "Unlimited scans" feature
  - **6-Month Plan**
    - Price display
    - "Unlimited scans" feature
  - **1-Month Plan**
    - Price display
    - "Unlimited scans" feature
  
- **CTA Buttons**
  - "Upgrade to [Plan]" for each tier
  - Links to payment/checkout
  
- **Features List** (optional)
  - Bullet points of premium benefits

**States:**
- Hidden (free scans remaining)
- Visible (after 3 scans used)
- Processing (payment flow)

**Dependencies:**
- Payment integration (Stripe, etc.)
- Pricing configuration
- Checkout flow

---

### 3.2 Backend/API Components (N8N Workflows)

#### 3.2.1 Analysis N8N Workflow
**Purpose:** Analyze performance review bullet and return score + breakdown

**N8N Webhook URL:** `POST https://your-n8n-instance.railway.app/webhook/analyze`

**Request:**
```json
{
  "text": "User's performance review bullet"
}
```

**Response:**
```json
{
  "score": 45,
  "breakdown": {
    "outcome": {
      "found": false,
      "reason": "Missing clear achievement statement"
    },
    "metrics": {
      "found": false,
      "reason": "No quantifiable metrics detected"
    },
    "method": {
      "found": true,
      "reason": "Action identified"
    }
  },
  "painPoint": "Your review is weak and missing impact"
}
```

**N8N Workflow Steps:**
1. **Webhook Node** - Receive POST request
2. **Code Node** - Input validation (length check, max 200 words)
3. **Code Node** - Score calculation logic
   - Parse text using XYZ framework
   - Check for Outcome (X), Metrics (Y), Method (Z)
   - Calculate overall score (0-100)
   - Determine pain point message
4. **Respond to Webhook Node** - Return JSON response

**Error Handling:**
- Invalid input → Return 400 with error message
- Workflow errors → Return 500 with generic message

**Dependencies:**
- N8N instance on Railway
- Webhook configuration
- Code nodes for validation/scoring

---

#### 3.2.2 Rewrite N8N Workflow
**Purpose:** Generate enhanced version using OpenAI + track usage in Google Sheets

**N8N Webhook URL:** `POST https://your-n8n-instance.railway.app/webhook/rewrite`

**Request:**
```json
{
  "text": "User's original performance review bullet",
  "email": "user@email.com"
}
```

**Response:**
```json
{
  "enhanced": "Enhanced version of the bullet point",
  "remainingScans": 2
}
```

**N8N Workflow Steps:**
1. **Webhook Node** - Receive POST request
2. **Code Node** - Email validation (format check)
3. **Google Sheets Node** - Check if email exists
   - Query: Check if email is in spreadsheet
   - If not found: Create new row with email, scans_remaining = 3, timestamp
   - If found: Read current scans_remaining
4. **IF Node** - Check if scans_remaining > 0
   - If 0: Return error "You've used all 3 free scans"
   - If > 0: Continue
5. **OpenAI Node** - Call OpenAI API
   - Use trained prompt (provided by user)
   - Model: GPT-4 or GPT-3.5
   - Temperature: 0.7
   - Max tokens: 300
6. **Google Sheets Node** - Update scan count
   - Decrement scans_remaining by 1
   - Update timestamp
7. **Google Sheets Node** - Save email to spreadsheet (if first time)
   - Email, timestamp, source = "performance-review-writer"
8. **Respond to Webhook Node** - Return enhanced text + remaining scans

**Error Handling:**
- Invalid email → Return 400
- No scans remaining → Return 403 with message
- OpenAI API error → Retry logic (3 attempts) or return 500
- Google Sheets error → Log and return 500

**Dependencies:**
- N8N instance on Railway
- OpenAI API key (environment variable in N8N)
- Google Sheets API credentials
- Trained prompt (provided by user)

---

#### 3.2.3 Usage Tracking (Google Sheets via N8N)
**Purpose:** Track free scans per email address

**Storage:** Google Spreadsheet

**Spreadsheet Structure:**
| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| Email | Scans Remaining | Timestamp | Source | Upgrade Status |
| user@email.com | 2 | 2024-01-15 | performance-review-writer | free |

**N8N Operations:**
- **Read:** Query by email to get remaining scans
- **Create:** Add new row when email first provided
- **Update:** Decrement scans_remaining after each rewrite
- **Check:** Verify scans_remaining before allowing rewrite

**Sub-components:**
- **Initialization Logic**
  - New email → Create row with scans_remaining = 3
  - Existing email → Read current count
  
- **Decrement Logic**
  - After rewrite → Update scans_remaining = scans_remaining - 1
  - Update timestamp
  
- **Check Logic**
  - Before rewrite → Read scans_remaining
  - If 0 → Return error, show upgrade prompt
  - If > 0 → Proceed with rewrite

**Dependencies:**
- Google Sheets API credentials in N8N
- Spreadsheet created and shared with N8N service account
- N8N Google Sheets nodes configured

---

### 3.3 Data & Storage Components

#### 3.3.1 Email Storage (Google Sheets via N8N)
**Purpose:** Store email addresses and track scan usage

**Storage:** Google Spreadsheet

**Data Structure (Spreadsheet Columns):**
- **Email** (Column A): Primary identifier
- **Scans Remaining** (Column B): Current free scans (3, 2, 1, or 0)
- **Timestamp** (Column C): Last activity date/time
- **Source** (Column D): "performance-review-writer"
- **Upgrade Status** (Column E): "free" or "premium"
- **First Seen** (Column F): First time email was captured (optional)

**N8N Automation:**
- When email is submitted → Check if exists in spreadsheet
- If new → Create row with email, scans_remaining = 3, timestamp, source
- If existing → Read current scans_remaining
- After rewrite → Update scans_remaining (decrement by 1), update timestamp

**Requirements:**
- Google Sheets API credentials configured in N8N
- Spreadsheet created and shared with N8N service account
- N8N workflow handles all read/write operations
- GDPR/privacy compliance (user data in spreadsheet)

**Note:** Email storage happens automatically via N8N workflow when rewrite is requested. No separate email collection service needed.

---

### 3.4 Integration Components

#### 3.4.1 OpenAI API Integration (via N8N)
**Purpose:** Generate enhanced rewrite using trained prompt

**Implementation:** N8N OpenAI Node

**Configuration:**
- **API Key:** Stored as environment variable in N8N (Railway)
- **Model:** GPT-4 or GPT-3.5 (as configured)
- **Temperature:** 0.7
- **Max Tokens:** 300
- **Prompt:** Trained prompt provided by user (ready to use)

**N8N OpenAI Node Setup:**
- Operation: "Create Chat Message"
- Model: Select from dropdown (GPT-4/GPT-3.5)
- Messages: Use expression to inject trained prompt + user input
- Temperature: 0.7
- Max Tokens: 300

**Prompt Structure:**
- User provides trained prompt (already configured)
- N8N will inject user's performance review bullet into prompt
- Format: `{trainedPrompt} + "User's input: " + {userText}`

**Error Handling:**
- OpenAI API errors → Retry logic (3 attempts in N8N)
- Rate limiting → Return 429 status
- Timeout → Return 500 with error message

**Dependencies:**
- N8N OpenAI node
- OpenAI API key in N8N environment variables
- Trained prompt (provided by user, ready to use)

---

#### 3.4.2 Payment Integration (Stripe)
**Purpose:** Process premium upgrades

**Status:** User will connect Stripe API separately

**Note:** Stripe integration will be handled by user. Frontend will need to:
- Display upgrade modal with pricing tiers (Annual, 6-Month, 1-Month)
- Connect to Stripe Checkout or Stripe Elements
- Handle success/error callbacks
- Update user status in Google Sheets (via N8N webhook or direct update)

**Future N8N Workflow (Optional):**
- Stripe webhook → Update Google Sheets (upgrade_status = "premium")
- Track subscription status
- Handle cancellations

**Dependencies:**
- Stripe account (user will connect)
- Stripe API keys (frontend environment variables)
- Optional: N8N webhook for Stripe events

---

### 3.5 Utility Components

#### 3.5.1 Input Validation
**Purpose:** Validate user input before processing

**Functions:**
- `validateLength(text, maxWords)`: Check word count
- `validateEmail(email)`: Check email format
- `sanitizeInput(text)`: Clean input (optional)
- `isEmpty(text)`: Check if empty

**Dependencies:**
- None (pure functions)

---

#### 3.5.2 Score Calculation Logic
**Purpose:** Calculate score and breakdown from text

**Functions:**
- `analyzeText(text)`: Parse text for XYZ components
- `calculateScore(breakdown)`: Generate 0-100 score
- `getPainPoint(score)`: Return appropriate message
- `checkOutcome(text)`: Detect achievement/impact
- `checkMetrics(text)`: Detect quantifiable metrics
- `checkMethod(text)`: Detect action/method

**Algorithm:**
```
Score = (outcome * 0.4) + (metrics * 0.4) + (method * 0.2)
- outcome: 0 or 1 (found or not)
- metrics: 0 or 1 (found or not)
- method: 0 or 1 (found or not)
- Convert to 0-100 scale
```

**Dependencies:**
- Text parsing utilities
- Pattern matching (regex or NLP)

---

#### 3.5.3 Copy to Clipboard
**Purpose:** Copy enhanced text to user's clipboard

**Functions:**
- `copyToClipboard(text)`: Use Clipboard API
- `showCopyFeedback()`: Display success message
- Fallback for older browsers

**Dependencies:**
- Clipboard API (browser)

---

## 4. Technical Specifications

### 4.1 Technology Stack

**Frontend:**
- **Framework:** React or Next.js (deployed to Cloudflare Pages)
- **Styling:** Tailwind CSS or CSS modules
- **State:** React Context/State or vanilla JS
- **Build:** Vite, Create React App, or Next.js
- **Hosting:** Cloudflare Pages (via GitHub integration)
- **Deployment:** Push to GitHub → Auto-deploy to Cloudflare

**Backend:**
- **Platform:** N8N (self-hosted on Railway)
- **Workflows:** Webhook-based API endpoints
- **Hosting:** Railway (N8N instance)
- **Storage:** Google Sheets (via N8N Google Sheets nodes)

**Services & Integrations:**
- **OpenAI API:** GPT-4 or GPT-3.5 (via N8N OpenAI node)
- **Email Storage:** Google Sheets (via N8N automation)
- **Payment:** Stripe (user will connect separately)
- **No Analytics:** Not required for MVP

**Storage:**
- **Email + Usage Tracking:** Google Spreadsheet (via N8N)
- **No Client-Side Storage:** All tracking via email only

---

### 4.2 API Endpoints (N8N Webhooks)

#### POST https://your-n8n-instance.railway.app/webhook/analyze
- **Purpose:** Analyze text and return score
- **Auth:** None (public webhook)
- **Rate Limit:** Optional (N8N rate limiting)
- **Response Time:** < 2 seconds
- **Implementation:** N8N workflow with Code nodes

#### POST https://your-n8n-instance.railway.app/webhook/rewrite
- **Purpose:** Generate enhanced version + track usage
- **Auth:** None (but tracks usage by email)
- **Rate Limit:** Based on scan count (checked in Google Sheets)
- **Response Time:** < 10 seconds (OpenAI API call)
- **Implementation:** N8N workflow with OpenAI + Google Sheets nodes

---

### 4.3 Environment Variables

**Frontend (Cloudflare Pages):**
```bash
VITE_N8N_ANALYZE_URL=https://your-n8n-instance.railway.app/webhook/analyze
VITE_N8N_REWRITE_URL=https://your-n8n-instance.railway.app/webhook/rewrite
VITE_STRIPE_PUBLIC_KEY=pk_... (when Stripe is connected)
```

**Backend (N8N on Railway):**
```bash
OPENAI_API_KEY=sk-... (stored in N8N environment variables)
GOOGLE_SHEETS_CREDENTIALS=... (N8N credential configuration)
WEBHOOK_URL=https://your-n8n-instance.railway.app
```

---

### 4.4 Error Handling

**Frontend (Cloudflare Pages):**
- Network errors → Show retry option
- Validation errors → Show inline messages
- API errors → Show user-friendly message
- N8N webhook errors → Display error from response

**Backend (N8N Workflows):**
- OpenAI API failures → Retry logic (3 attempts in N8N)
- Google Sheets errors → Return 500 with error message
- Invalid input → Return 400 status with message
- Rate limiting → Return 429 status (if configured)
- No scans remaining → Return 403 with "upgrade required" message

---

### 4.5 Deployment Architecture

**Frontend Flow:**
```
GitHub Repository
    ↓ (push)
Cloudflare Pages (auto-deploy)
    ↓ (serves static files)
User Browser
```

**Backend Flow:**
```
Frontend (Cloudflare Pages)
    ↓ (API calls)
N8N Webhooks (Railway)
    ↓ (workflow execution)
OpenAI API / Google Sheets
    ↓ (responses)
N8N Workflows
    ↓ (JSON response)
Frontend
```

**Data Flow:**
```
User submits email
    ↓
N8N Rewrite Workflow
    ↓
Google Sheets (read/write)
    ↓
Email stored + Scan count updated
```

---

## 5. Implementation Phases

### Phase 1: MVP (Minimum Viable Product)
**Goal:** Core flow working end-to-end

**Components:**
1. Landing page with input (React/Next.js)
2. N8N Analysis workflow (score calculation)
3. Email gate modal
4. N8N Rewrite workflow (OpenAI + Google Sheets)
5. Before/after display
6. Scan counter (from N8N response)
7. Deploy to Cloudflare Pages
8. Set up N8N workflows on Railway

**Timeline:** 1-2 weeks

---

### Phase 2: Polish & Optimization
**Goal:** Improve UX and reliability

**Components:**
1. Better score calculation algorithm (refine N8N Code nodes)
2. Improved error handling (frontend + N8N)
3. Loading states and animations
4. Mobile responsiveness
5. Google Sheets integration testing
6. N8N workflow optimization

**Timeline:** 1 week

---

### Phase 3: Monetization
**Goal:** Add payment and upgrade flow

**Components:**
1. Stripe integration (user connects)
2. Upgrade modal with pricing tiers
3. N8N workflow for Stripe webhooks (optional)
4. Update Google Sheets upgrade_status
5. Test upgrade flow end-to-end

**Timeline:** 1 week

---

## 6. Implementation Decisions (Completed)

1. **Tech Stack:** React/Next.js → Cloudflare Pages ✅
2. **Storage:** Google Sheets via N8N (email-based tracking only) ✅
3. **Email Service:** N8N automation → Google Sheets ✅
4. **Payment:** Stripe (user will connect) ✅
5. **OpenAI Prompt:** Trained prompt ready, user will provide API ✅
6. **Scoring Algorithm:** Simple XYZ framework (implemented in N8N Code nodes) ✅
7. **Analytics:** Not required for MVP ✅
8. **Hosting:** Cloudflare Pages (frontend) + Railway (N8N backend) ✅

---

## 7. N8N Workflow Setup Details

### 7.1 Analysis Workflow Setup

**Workflow Name:** "Performance Review Analyzer"

**Nodes:**
1. **Webhook Node** (POST)
   - Path: `/webhook/analyze`
   - Method: POST
   - Response Mode: "Using 'Respond to Webhook' Node"

2. **Code Node** - Input Validation
   ```javascript
   const text = $input.first().json.text;
   
   if (!text || text.trim() === '') {
     return [{ json: { error: 'Text cannot be empty' } }];
   }
   
   const wordCount = text.trim().split(/\s+/).length;
   if (wordCount > 200) {
     return [{ json: { error: 'Text exceeds 200 words' } }];
   }
   
   return [{ json: { text, valid: true } }];
   ```

3. **Code Node** - Score Calculation
   ```javascript
   // XYZ framework analysis
   // Check for Outcome (X), Metrics (Y), Method (Z)
   // Calculate score 0-100
   // Return breakdown + painPoint
   ```

4. **Respond to Webhook Node**
   - Return JSON response with score, breakdown, painPoint

**Error Handling:**
- IF node after validation → Check if error exists
- Return error response if validation fails

---

### 7.2 Rewrite Workflow Setup

**Workflow Name:** "Performance Review Rewriter"

**Nodes:**
1. **Webhook Node** (POST)
   - Path: `/webhook/rewrite`
   - Method: POST
   - Response Mode: "Using 'Respond to Webhook' Node"

2. **Code Node** - Email Validation
   ```javascript
   const email = $input.first().json.email;
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
   if (!email || !emailRegex.test(email)) {
     return [{ json: { error: 'Invalid email format' } }];
   }
   
   return [{ json: { email, text: $input.first().json.text } }];
   ```

3. **Google Sheets Node** - Read/Check Email
   - Operation: "Read"
   - Spreadsheet: Select your spreadsheet
   - Range: "A:A" (Email column)
   - Filter: Check if email exists

4. **IF Node** - Email Exists Check
   - If exists: Read scans_remaining from row
   - If not exists: Create new row with email, scans_remaining = 3

5. **IF Node** - Scans Remaining Check
   - If scans_remaining = 0: Return error "No scans remaining"
   - If scans_remaining > 0: Continue to OpenAI

6. **OpenAI Node**
   - Operation: "Create Chat Message"
   - Model: GPT-4 or GPT-3.5
   - Messages: 
     ```
     [{
       "role": "user",
       "content": "{trainedPrompt}\n\nUser's performance review bullet: {text}"
     }]
     ```
   - Temperature: 0.7
   - Max Tokens: 300

7. **Google Sheets Node** - Update Scans
   - Operation: "Update"
   - Update scans_remaining: `scans_remaining - 1`
   - Update timestamp: Current date/time

8. **Google Sheets Node** - Save Email (if new)
   - Operation: "Append"
   - Only if email is new (first time)

9. **Code Node** - Format Response
   ```javascript
   const enhanced = $input.first().json.choices[0].message.content;
   const remainingScans = $('Google Sheets').item.json.scans_remaining - 1;
   
   return [{ 
     json: { 
       enhanced, 
       remainingScans 
     } 
   }];
   ```

10. **Respond to Webhook Node**
    - Return JSON with enhanced text + remainingScans

**Error Handling:**
- IF nodes at each critical step
- Return appropriate error codes (400, 403, 500)

---

### 7.3 Google Sheets Setup

**Spreadsheet Structure:**

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| **Email** | **Scans Remaining** | **Timestamp** | **Source** | **Upgrade Status** |
| user@example.com | 3 | 2024-01-15 10:30:00 | performance-review-writer | free |

**Setup Steps:**
1. Create new Google Spreadsheet
2. Name columns (Row 1): Email, Scans Remaining, Timestamp, Source, Upgrade Status
3. Share spreadsheet with N8N service account email
4. Grant "Editor" permissions
5. Copy spreadsheet ID for N8N configuration

**N8N Credentials:**
- Create Google Sheets OAuth2 credentials in N8N
- Authorize access to the spreadsheet
- Test connection

---

## 8. Success Criteria

### MVP Launch Criteria:
- [ ] User can paste bullet and see score
- [ ] Email gate works and captures emails
- [ ] Rewrite generates and displays correctly
- [ ] Scan counter tracks usage (3 free scans)
- [ ] Upgrade prompt appears after 3 scans
- [ ] Mobile responsive
- [ ] Error handling works

### Performance Targets:
- Score calculation: < 2 seconds
- Rewrite generation: < 10 seconds
- Page load: < 3 seconds
- Email capture rate: 40%+
- Upgrade conversion: 5%+

---

## 9. Future Enhancements (Post-MVP)

- User accounts/login
- Save drafts
- Multiple versions comparison
- Export to PDF/Word
- Industry-specific templates
- Bulk analysis (multiple bullets)
- Email notifications with tips (via N8N)
- Admin dashboard (view Google Sheets data)
- A/B testing for prompts

---

## Appendix

### A. Sample API Responses

**Analyze Response:**
```json
{
  "score": 45,
  "breakdown": {
    "outcome": { "found": false },
    "metrics": { "found": false },
    "method": { "found": true }
  },
  "painPoint": "Your review is weak and missing impact"
}
```

**Rewrite Response:**
```json
{
  "enhanced": "Reduced operational costs by 18% ($450K annual savings) by implementing cloud-based tracking system across 12 warehouse locations in 6-month timeline (30% faster than previous rollout)",
  "remainingScans": 2
}
```

### B. User Stories

**As a user, I want to:**
- Paste my performance review bullet and see how strong it is
- Get an enhanced version that shows impact
- Use this tool 3 times for free
- Upgrade for unlimited access
- Copy the enhanced version easily

---

**End of PRD**

