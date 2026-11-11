# AIUB STUDENTS FINANCE CLUB — OFFICIAL DIGITAL PLATFORM (v2.0)

> **"EXCELLENCE IN FINANCE. LEADERSHIP IN ACTION."**  
> Official Website, Content Management System (CMS), SEO Engine &amp; Administrative Suite for AIUB Students Finance Club, American International University-Bangladesh.

---

## 1. Project Overview

This is the production-ready official website and CMS for the **AIUB Students Finance Club**. It unites fintech visual sophistication, academic excellence, competitive corporate pipelines, and dynamic administrative control into a single high-performance web platform.

### Core Highlights
- **13 Comprehensive Public Sections:**
  1. `/` (Cinematic financial hero slideshow, dynamic candlestick canvas, 3 pillars, live statistics, previews)
  2. `/about` (Heritage, vision, mission, official objectives, core values, advisory board)
  3. `/notices` & `/notices/[slug]` (Filterable official circular noticeboard with unique indexable URLs)
  4. `/events` & `/events/[slug]` (Upcoming & concluded national competitions, seminars, and workshops)
  5. `/executive-committee` (Full 15-member executive roster + Faculty Advisor Bohi Shajahan)
  6. `/collaborations` (BRAC Bank, IDLC Finance, CFA Society, LankaBangla, media partners)
  7. `/opportunities` & `/opportunities/[slug]` (Internship discovery portal with live application deadlines)
  8. `/achievements` & `/achievements/[slug]` (**The Wall of Excellence** — Prestigious member recognition gallery)
  9. `/journal` & `/journal/[slug]` (Monthly editorial publication platform with reading times & references)
  10. `/reports` (Annual audit reports, post-event whitepapers, empirical survey publications)
  11. `/gallery` (Responsive mosaic media photo archive with full-screen lightbox)
  12. `/recruitment` (Interactive online application form, 4 selection stages, FAQ accordion, confetti)
  13. `/contact` (Interactive transmission form, campus Google map, official contacts)
- **CMS Administration Suite (`/admin`):**
  - Full CRUD for Notices, Events, Executives, Collaborations, Opportunities, Achievements, Journal Articles, Reports, Gallery, Recruitment Applications, Leadership Statements, and Website Settings.
  - Multi-tiered Role-Based Access Control (Super Administrator, Administrator, Editor, Contributor).
  - 5-stage content workflow (Draft → Review → Approval → Published → Archived).
  - Real-time audit trail and inquiry logging.
- **Advanced Technical SEO (Google & Bing Ready):**
  - Dynamic XML Sitemap (`/sitemap.xml`) including all static pages and published notices, events, journal articles, and achievements.
  - Public `robots.txt` (`/robots.txt`) with proper disallows for `/admin/`, `/dashboard/`, `/api/`.
  - JSON-LD Structured Data: `Organization`, `WebSite`, `BreadcrumbList`, `Article`, `BusinessEvent`.
  - Configurable Google Search Console and Bing Webmaster Tools verification meta tags.
  - IndexNow submission pipeline (`/api/indexnow`).
  - OpenGraph 1200x630 social card images and Twitter/X summary cards.
- **Mandatory Developer Attribution (PART 6):**
  - Subtle, permanent footer attribution linking to `https://www.shishirsami.com/`:
    `Designed & Built by Shahriar Shishir Sami.`

---

## 2. Technology Architecture

- **Framework:** Next.js 15 (App Router, Server Components & Route Handlers)
- **Language:** TypeScript 5.7+ (Strictly typed)
- **Styling:** Tailwind CSS 3.4+ (Custom financial futurism dark palette & typography)
- **Typography:** Space Grotesk (Headings), Inter (Body), Sora (Editorial), IBM Plex Mono (Financial Indicators)
- **Visuals & Motion:** HTML5 Canvas Interactive Candlestick Engine, Framer Motion, Canvas Confetti
- **Storage & Database:**
  - Turnkey persistent JSON database (`data/store.json`) for instant zero-config deployments.
  - Direct Supabase client support (`@supabase/supabase-js`) via environment variables.

---

## 3. Installation & Local Development

### Prerequisites
- Node.js 18.x, 20.x, or 24.x
- npm 9+

### Setup Steps
```bash
# Clone the repository and navigate to root
cd "e:\finace club"

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Public domain for canonical URLs and sitemaps
NEXT_PUBLIC_SITE_URL=https://aiubfinanceclub.org

# Optional Supabase Integration
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Search Engine Verification (Can also be set in /admin/settings)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=

# IndexNow API Key
INDEXNOW_API_KEY=asfc-indexnow-key-2026
```

---

## 5. Administration & CMS Access

1. Navigate to `/admin/login`.
2. Select your role:
   - **Super Administrator:** Full access to content, settings, and user roles.
   - **Administrator:** Content publishing and event management.
   - **Editor:** Reviewing and authoring drafts.
   - **Contributor:** Drafting submissions.
3. Default credentials:
   - **Email:** `president@aiubfinanceclub.org`
   - **Password:** `asfc2026`
4. Access the module dashboards to add notices, modify committee members, update journal articles, or evaluate student recruitment applications.

---

## 6. Search Engine Optimization (SEO) & Verification Guide

### Google Search Console
1. Log in to [Google Search Console](https://search.google.com/search-console).
2. Add Property: Choose **URL prefix** with `https://aiubfinanceclub.org`.
3. Select **HTML tag** verification method.
4. Copy the verification string (e.g., `google-site-verification=abc...`).
5. Open `/admin/settings` on the website, paste it under **Google Search Console Verification Tag**, and click **Save**.
6. Return to Google Search Console and click **Verify**.
7. Navigate to **Sitemaps**, enter `sitemap.xml`, and click **Submit**.

### Bing Webmaster Tools
1. Log in to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Add your production domain.
3. Select **HTML Meta Tag** verification, copy the verification code (e.g., `msvalidate.01` token).
4. Paste it in `/admin/settings` under **Bing Webmaster Tools Verification Tag** and save.
5. In Bing Webmaster Tools, click **Verify** and submit `https://aiubfinanceclub.org/sitemap.xml`.

---

## 7. Mandatory Developer Attribution (PRD Part 6)

Every public page contains the permanent developer credit in the footer:
```html
Designed & Built by <a href="https://www.shishirsami.com/" target="_blank" rel="noopener noreferrer">Shahriar Shishir Sami</a>.
```
This credit is hardcoded into `src/components/Footer.tsx` and cannot be modified or removed via ordinary CMS editing.

---

## 8. License & Governance

© 2026 AIUB Students Finance Club. All Rights Reserved.  
Official Student Organization of **American International University-Bangladesh (AIUB)**.

