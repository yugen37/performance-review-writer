# Frontend - Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_N8N_ANALYZE_URL=https://n8n-production-45b7.up.railway.app/webhook/analyze
NEXT_PUBLIC_N8N_REWRITE_URL=https://n8n-production-45b7.up.railway.app/webhook/rewrite
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
```

The static files will be in the `out/` directory, ready for Cloudflare Pages deployment.

---

## 📁 Project Structure

```
app/
  ├── layout.tsx          # Root layout
  ├── page.tsx            # Main page (state management)
  └── globals.css         # Global styles

components/
  ├── LandingPage.tsx     # Hero & input form
  ├── ScoreDisplay.tsx    # Score results
  ├── EmailGate.tsx       # Email capture modal
  ├── BeforeAfterRewrite.tsx # Comparison view
  └── UpgradePrompt.tsx   # Upgrade modal
```

---

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.ts` to change the primary color scheme:

```typescript
colors: {
  primary: {
    // Your brand colors here
  }
}
```

### Logo

Replace the logo placeholder in `components/LandingPage.tsx` (line ~40):

```tsx
{/* Replace this with your logo */}
<div className="w-10 h-10 bg-primary-600 rounded-lg">
  <img src="/your-logo.png" alt="Logo" />
</div>
```

### Cartoon Assets

Add your cartoon images to the `public/` folder and reference them in components.

---

## 🔧 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Static Export** - Optimized for Cloudflare Pages

---

## 📦 Deployment

### Cloudflare Pages

1. Push code to GitHub
2. Connect repository in Cloudflare Dashboard
3. Build settings:
   - Framework: Next.js (Static HTML Export)
   - Build command: `npm run build`
   - Build output: `out`
   - Node version: 18.x
4. Add environment variables:
   - `NEXT_PUBLIC_N8N_ANALYZE_URL`
   - `NEXT_PUBLIC_N8N_REWRITE_URL`
5. Deploy!

---

## ✅ Features

- ✅ Responsive design (mobile-first)
- ✅ Real-time validation
- ✅ Loading states
- ✅ Error handling
- ✅ Copy to clipboard
- ✅ Scan counter tracking
- ✅ Upgrade prompt after 3 scans

---

## 🐛 Troubleshooting

### Build Errors

Make sure you have Node.js 18+ installed:
```bash
node --version
```

### API Errors

Check that environment variables are set correctly and N8N workflows are active.

### Styling Issues

Run `npm run dev` to see Tailwind CSS in action. Make sure PostCSS is configured.

---

**Ready to test!** 🎉







