# Critical Path - Performance Review Writer

**Purpose:** This document outlines the exact order of work to follow for fastest MVP delivery.

---

## 🎯 Critical Path Overview

**Key Principle:** Backend first, then frontend. APIs must exist before frontend can call them.

---

## 📍 Phase 0: Foundation (START HERE - Day 1)

### Step 1: GitHub Repository Setup
**Why First:** Needed for Cloudflare Pages deployment and code versioning.

**Tasks:**
- [ ] Initialize GitHub repository
- [ ] Create project structure
- [ ] Add .gitignore
- [ ] Commit initial files (PRD, README, folder structure)

**Time:** 15 minutes  
**Dependencies:** None  
**Blocks:** Everything else (code needs to be versioned)

---

### Step 2: Google Sheets Setup
**Why Early:** Needed by Rewrite workflow, simple to set up.

**Tasks:**
- [ ] Create Google Spreadsheet
- [ ] Add columns: Email, Scans Remaining, Timestamp, Source, Upgrade Status
- [ ] Document spreadsheet ID
- [ ] Note: Will share with N8N service account later

**Time:** 10 minutes  
**Dependencies:** None  
**Blocks:** Rewrite workflow

**Files to Create:**
- `5-Data-Storage/Google-Sheets/spreadsheet-id.txt`
- `5-Data-Storage/Google-Sheets/schema.md`

---

### Step 3: N8N Instance on Railway
**Why Critical:** All backend APIs run here. Must be live before frontend development.

**Tasks:**
- [ ] Deploy N8N instance to Railway
- [ ] Get N8N instance URL (e.g., `https://your-n8n.railway.app`)
- [ ] Configure basic settings
- [ ] Test N8N dashboard access
- [ ] Document webhook base URL

**Time:** 30 minutes  
**Dependencies:** None  
**Blocks:** All backend workflows

**Files to Create:**
- `7-Technical-Specs/Deployment/n8n-url.txt`
- `7-Technical-Specs/Deployment/railway-setup.md`

---

## 📍 Phase 1: Backend APIs (Day 1-2)

### Step 4: Analysis N8N Workflow (START WITH THIS)
**Why First:** Simplest workflow, no external dependencies. Can test immediately.

**Tasks:**
- [ ] Create new workflow: "Performance Review Analyzer"
- [ ] Add Webhook node: `/webhook/analyze` (POST)
- [ ] Add Code node: Input validation (empty, 200 word limit)
- [ ] Add Code node: Score calculation (XYZ framework)
- [ ] Add Respond to Webhook node
- [ ] Test with sample input: "Managed team of 5"
- [ ] Document webhook URL

**Time:** 2-3 hours  
**Dependencies:** N8N instance (Step 3)  
**Blocks:** Frontend Score Display component

**Files to Create:**
- `4-Backend-Components/Analysis-Workflow/workflow.json` (export from N8N)
- `4-Backend-Components/Analysis-Workflow/score-calculation.js`
- `7-Technical-Specs/API-Endpoints/analyze-endpoint.md`

**Test Command:**
```bash
curl -X POST https://your-n8n.railway.app/webhook/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Managed team of 5"}'
```

---

### Step 5: Google Sheets Integration Setup
**Why Before Rewrite:** Rewrite workflow needs Google Sheets access.

**Tasks:**
- [ ] Configure Google Sheets OAuth2 credentials in N8N
- [ ] Share spreadsheet with N8N service account
- [ ] Test Google Sheets node connection
- [ ] Verify read/write permissions

**Time:** 30 minutes  
**Dependencies:** Google Sheets (Step 2), N8N (Step 3)  
**Blocks:** Rewrite workflow

**Files to Create:**
- `6-Integrations/Google-Sheets/n8n-credentials-setup.md`
- `6-Integrations/Google-Sheets/test-connection.md`

---

### Step 6: Rewrite N8N Workflow
**Why After Analysis:** More complex, needs Google Sheets and OpenAI.

**Tasks:**
- [ ] Create new workflow: "Performance Review Rewriter"
- [ ] Add Webhook node: `/webhook/rewrite` (POST)
- [ ] Add Code node: Email validation
- [ ] Add Google Sheets node: Check if email exists
- [ ] Add IF node: Create new row if email doesn't exist
- [ ] Add IF node: Check scans_remaining > 0
- [ ] Configure OpenAI node (need API key from user)
- [ ] Add Google Sheets node: Update scans_remaining
- [ ] Add Code node: Format response
- [ ] Add Respond to Webhook node
- [ ] Test end-to-end

**Time:** 4-5 hours  
**Dependencies:** Analysis workflow (Step 4), Google Sheets (Step 5), OpenAI API key  
**Blocks:** Frontend Email Gate and Before/After components

**Files to Create:**
- `4-Backend-Components/Rewrite-Workflow/workflow.json`
- `4-Backend-Components/Rewrite-Workflow/email-validation.js`
- `4-Backend-Components/Rewrite-Workflow/response-format.js`
- `6-Integrations/OpenAI/prompt-config.md`
- `7-Technical-Specs/API-Endpoints/rewrite-endpoint.md`

**Note:** Need OpenAI API key from user. Can build workflow structure first, then add API key.

---

## 📍 Phase 2: Frontend Foundation (Day 2-3)

### Step 7: React/Next.js Project Setup
**Why Now:** Backend APIs are ready, can start building frontend.

**Tasks:**
- [ ] Create React or Next.js project
- [ ] Set up project structure
- [ ] Install dependencies (Tailwind CSS, etc.)
- [ ] Configure build settings
- [ ] Set up environment variables file
- [ ] Create basic routing structure

**Time:** 1 hour  
**Dependencies:** GitHub repo (Step 1)  
**Blocks:** All frontend components

**Files to Create:**
- Frontend project files in repo
- `7-Technical-Specs/Tech-Stack/frontend-setup.md`
- `.env.example` with N8N URLs

---

### Step 8: Landing Page Component
**Why First Frontend Component:** Entry point, user sees this first.

**Tasks:**
- [ ] Create Landing Page component
- [ ] Add header with logo/branding
- [ ] Add hero section with headline
- [ ] Add input field with validation
- [ ] Add "Analyze" button
- [ ] Connect to Analysis N8N workflow (Step 4)
- [ ] Add loading/error states

**Time:** 3-4 hours  
**Dependencies:** Frontend setup (Step 7), Analysis API (Step 4)  
**Blocks:** Score Display component

**Files to Create:**
- `3-Frontend-Components/Landing-Page/LandingPage.jsx`
- `3-Frontend-Components/Landing-Page/LandingPage.css`
- `3-Frontend-Components/Landing-Page/validation.js`

---

### Step 9: Score Display Component
**Why Next:** User flow - score shows immediately after analyze.

**Tasks:**
- [ ] Create Score Display component
- [ ] Display overall score (0-100) with color
- [ ] Display breakdown table (Outcome, Metrics, Method)
- [ ] Display pain point message
- [ ] Add "See How This Could Be Better" button
- [ ] Connect to Analysis API response

**Time:** 2-3 hours  
**Dependencies:** Landing Page (Step 8), Analysis API (Step 4)  
**Blocks:** Email Gate component

**Files to Create:**
- `3-Frontend-Components/Score-Display/ScoreDisplay.jsx`
- `3-Frontend-Components/Score-Display/ScoreDisplay.css`
- `3-Frontend-Components/Score-Display/score-utils.js`

---

### Step 10: Email Gate Component
**Why Next:** User flow - appears after score display.

**Tasks:**
- [ ] Create Email Gate modal component
- [ ] Add email input with validation
- [ ] Add submit button
- [ ] Add loading/error states
- [ ] Connect to Rewrite API (Step 6)
- [ ] Handle response (show rewrite or error)

**Time:** 2-3 hours  
**Dependencies:** Score Display (Step 9), Rewrite API (Step 6)  
**Blocks:** Before/After Rewrite component

**Files to Create:**
- `3-Frontend-Components/Email-Gate/EmailGate.jsx`
- `3-Frontend-Components/Email-Gate/EmailGate.css`
- `3-Frontend-Components/Email-Gate/email-validation.js`

---

### Step 11: Before/After Rewrite Component
**Why Next:** User flow - shows after email submission.

**Tasks:**
- [ ] Create Before/After component
- [ ] Side-by-side layout (original | enhanced)
- [ ] Add copy button for enhanced version
- [ ] Display scan counter from API response
- [ ] Add loading state during rewrite
- [ ] Handle error states

**Time:** 2-3 hours  
**Dependencies:** Email Gate (Step 10), Rewrite API (Step 6)  
**Blocks:** Upgrade Prompt component

**Files to Create:**
- `3-Frontend-Components/Before-After-Rewrite/BeforeAfter.jsx`
- `3-Frontend-Components/Before-After-Rewrite/BeforeAfter.css`
- `3-Frontend-Components/Before-After-Rewrite/copy-utils.js`

---

### Step 12: Upgrade Prompt Component
**Why Last Frontend Component:** Only shows after 3 scans used.

**Tasks:**
- [ ] Create Upgrade Prompt modal
- [ ] Add "You've used all 3 free scans" message
- [ ] Add pricing tiers (Annual, 6-Month, 1-Month)
- [ ] Add upgrade buttons (Stripe placeholder)
- [ ] Show when scans_remaining = 0

**Time:** 2 hours  
**Dependencies:** Before/After Rewrite (Step 11)  
**Blocks:** None (MVP complete)

**Files to Create:**
- `3-Frontend-Components/Upgrade-Prompt/UpgradePrompt.jsx`
- `3-Frontend-Components/Upgrade-Prompt/UpgradePrompt.css`

---

## 📍 Phase 3: Integration & Deployment (Day 3-4)

### Step 13: Cloudflare Pages Deployment
**Why Now:** Frontend is complete, needs to be deployed.

**Tasks:**
- [ ] Connect GitHub repo to Cloudflare Pages
- [ ] Configure build settings
- [ ] Set environment variables (N8N URLs)
- [ ] Deploy and test
- [ ] Verify all components work on live site

**Time:** 1 hour  
**Dependencies:** All frontend components (Steps 8-12), GitHub repo (Step 1)  
**Blocks:** End-to-end testing

**Files to Create:**
- `7-Technical-Specs/Deployment/cloudflare-setup.md`
- `7-Technical-Specs/Deployment/environment-variables.md`

---

### Step 14: End-to-End Testing
**Why Last:** Everything must be connected and tested together.

**Tasks:**
- [ ] Test: Landing → Paste → Score display
- [ ] Test: Score → Email gate → Rewrite display
- [ ] Test: Copy enhanced version
- [ ] Test: Scan counter updates
- [ ] Test: 3 scans limit
- [ ] Test: Upgrade prompt appears
- [ ] Test: Error handling
- [ ] Test: Mobile responsiveness

**Time:** 2-3 hours  
**Dependencies:** All components, Cloudflare deployment (Step 13)  
**Blocks:** MVP Launch

**Files to Create:**
- `10-Testing/E2E-Tests/test-results.md`
- `10-Testing/E2E-Tests/test-checklist.md`

---

## 🎯 Critical Path Summary

**Day 1:**
1. GitHub repo (15 min)
2. Google Sheets (10 min)
3. N8N on Railway (30 min)
4. Analysis workflow (2-3 hours)
5. Google Sheets integration (30 min)
6. Start Rewrite workflow (2-3 hours)

**Day 2:**
7. Complete Rewrite workflow (2-3 hours)
8. Frontend setup (1 hour)
9. Landing Page (3-4 hours)
10. Score Display (2-3 hours)

**Day 3:**
11. Email Gate (2-3 hours)
12. Before/After Rewrite (2-3 hours)
13. Upgrade Prompt (2 hours)
14. Cloudflare deployment (1 hour)

**Day 4:**
15. E2E Testing (2-3 hours)
16. Bug fixes and polish

---

## ⚠️ Critical Dependencies

**Must Complete in Order:**
1. **Infrastructure** → Backend APIs → Frontend Components → Deployment → Testing

**Can Parallelize:**
- Frontend components can be built in parallel after APIs are ready
- Testing can start on individual components as they're built

**Blockers:**
- OpenAI API key needed for Rewrite workflow (Step 6)
- N8N instance must be live before any API testing
- Google Sheets must be configured before Rewrite workflow

---

## 🚀 Quick Start (Today)

**Start with these 3 steps (in order):**
1. ✅ GitHub repository setup
2. ✅ Google Sheets creation
3. ✅ N8N instance on Railway

**Then immediately:**
4. ✅ Build Analysis workflow (simple, can test right away)
5. ✅ Get OpenAI API key from user
6. ✅ Build Rewrite workflow

**Once backend is ready:**
7. ✅ Frontend can be built in parallel

---

## 📝 Notes

- **Backend First:** APIs must exist before frontend can call them
- **Test Early:** Test each workflow as you build it
- **Document URLs:** Keep track of all webhook URLs and endpoints
- **Environment Variables:** Document all needed env vars early

---

**Last Updated:** [Update as you progress]

