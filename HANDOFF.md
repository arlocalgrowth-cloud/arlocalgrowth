# Handoff: A.R. Local Growth — Website + GBP Strategy

**Generated**: 2026-06-29
**Branch**: main (up to date with origin/main)
**Status**: In Progress — website deployed, GBP optimization in progress

## Goal

Build and optimize a premium multilingual (DE/EN/RU) Next.js website for **A.R. Local Growth** (Roman Andreiev, Berlin), a local SEO specialist targeting German, Russian, Ukrainian and English-speaking small businesses in Germany. Primary conversion flow: visitor writes via form → Roman qualifies via text → phone call → paid engagement.

## Completed

- [x] Next.js 15 App Router + TypeScript + Tailwind + shadcn/ui + Framer Motion
- [x] next-intl i18n: DE (default `/`), EN (`/en`), RU (`/ru`)
- [x] All page sections: Hero, Problem, Services, Industries, CaseStudies, Process, About, Audit/Inquiry, FAQ, Contact, Footer
- [x] Mobile menu: fixed full-screen overlay (replaced broken height-animation)
- [x] Hero metric cards: grid layout (replaced broken overflow-x-auto)
- [x] SEO: hreflang, canonical, OG image (dynamic ImageResponse), sitemap, robots.txt
- [x] Schema markup: LocalBusiness, FAQPage, Service (JSON-LD)
- [x] Cloudflare Turnstile invisible CAPTCHA on forms
- [x] Resend email API for form submissions
- [x] Domain: arlocalgrowth.de → Vercel (DNS fixed, SSL issued)
- [x] ContactSection: simplified to 3 contact cards (WhatsApp/Phone/Email) — no duplicate form
- [x] AuditSection: rebranded from "Kostenloses Audit" to text-first inquiry form
- [x] GBP: 7 services added with multilingual descriptions and prices
- [x] Installed `/handoff` skill from willseltzer/claude-handoff

## Not Yet Done

- [ ] Update `CLAUDE.md` — still says primary CTA is "Kostenloses Google Maps Audit" (outdated)
- [ ] GBP: Add Product Cards (4 visual cards with photos and CTA links)
- [ ] GBP: Add business description (multilingual text, ~750 chars)
- [ ] GBP: Collect 15–20 reviews (only 1 currently — critical weakness)
- [ ] GBP: Add photos (Roman's headshot, analytics screenshots, before/after)
- [ ] GBP: Weekly posts in DE/RU/EN rotation
- [ ] Instagram strategy: study @tknpdt (Даниил Клинчук) and replicate approach
- [ ] Resend: change `from` to `noreply@arlocalgrowth.de` (domain verified in Resend)
- [ ] Cloudflare Turnstile: replace test keys with real production keys
- [ ] Website: verify AuditSection form renders correctly after CTA rebrand

## Failed Approaches (Don't Repeat These)

**Mobile menu — Framer Motion height animation:**
Tried `height: 0 → auto` with `overflow-hidden`. This blocked pointer events on all links inside. Fixed by replacing with fixed full-screen overlay (`fixed inset-0 top-16 z-40`) using only `opacity + y` animation. No height animation, no overflow clipping.

**Hero metric cards — negative margin trick:**
Tried `-mx-6 px-6` for horizontal scroll on mobile. Created 4px horizontal bleed because container uses `px-5`. Fixed with `grid grid-cols-3` and compact card prop — no negative margins.

**ContactSection edit via sed:**
External tool modified the file before Edit tool could run — caused wrong search string. Always read file first, then edit.

**Free audit CTA (20-30€ filter idea):**
User considered charging 20-30€ as competitor filter. Rejected — too cheap to filter competitors, adds friction for real clients. Real filter = qualifying form fields (GBP URL, city, main problem).

**"Kostenloses Audit" as primary CTA:**
Cheapens premium positioning. Replaced with text-first inquiry flow: form → Roman responds in text → qualifying questions → phone call.

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| No free audit as CTA | Devalues expertise; replaced with "Schreiben Sie mir" inquiry form |
| Text-first lead flow | Roman's German is not C1/C2 — text first allows preparation before calls |
| GBP services in German only | English service names hurt local DE ranking; multilingual goes in description text |
| 7 GBP services (not 12) | Prevents keyword dilution; removed overlapping Local SEO variants |
| SEO Analyse & Bericht ab 149€ | Positions as premium; real filter vs tire-kickers |
| "Ich" not "Wir" in GBP | Solo specialist — personal tone builds more trust with small businesses |

## Current State

**Working**:
- Site live at https://arlocalgrowth.de
- All 3 languages functional
- Forms submit via Resend (from: onboarding@resend.dev)
- Turnstile CAPTCHA active (test keys — works but should be replaced)
- GBP profile: 7 services configured with DE descriptions + prices

**Broken / Pending**:
- Resend still uses `onboarding@resend.dev` — should be `noreply@arlocalgrowth.de`
- Turnstile test keys in Vercel env vars — replace with production keys

**Uncommitted Changes**:
- `.claude/commands/` (handoff skill commands) — not committed to git

## Files to Know

| File | Why It Matters |
|------|----------------|
| `src/components/sections/AuditSection.tsx` | Main inquiry form — recently rebranded from "audit" to inquiry |
| `src/components/sections/ContactSection.tsx` | 3 contact cards only — no form, links to #audit |
| `src/components/layout/Navbar.tsx` | Mobile menu logic — fixed overlay approach, don't change to height animation |
| `src/components/seo/SchemaMarkup.tsx` | JSON-LD: LocalBusiness, FAQPage, Service |
| `src/app/[locale]/layout.tsx` | generateMetadata with hreflang, OG image, canonical |
| `src/app/[locale]/opengraph-image.tsx` | Dynamic OG image (edge runtime, ImageResponse) |
| `src/app/api/audit/route.ts` | Form submission handler — sends email via Resend |
| `messages/de.json` | Source of truth for German (default language) |
| `.claude/CLAUDE.md` | Project instructions — needs update (still mentions "Kostenloses Audit" as CTA) |

## Code Context

**i18n routing** (`src/i18n/routing.ts`):
```typescript
// DE = "/" (no prefix), EN = "/en", RU = "/ru"
localePrefix: "as-needed"
defaultLocale: "de"
locales: ["de", "en", "ru"]
```

**Form fields** (AuditSection — after rebrand):
- `name` (required), `company` (required), `email` (required)
- `phone` (optional), `gbpUrl` (optional — Google Business Profile link)
- `city` (required), `problem` (required — replaces generic "message")

**GBP Services configured (7)**:
1. SEO Analyse & Bericht — ab 149 €
2. Google Maps Optimierung — ab 179 €/Monat
3. Local SEO — ab 299 €/Monat
4. Google Bewertungsmanagement — ab 89 €/Monat
5. Google Ads Einrichtung & Betreuung — ab 199 € + 15% Budget
6. Website für lokale Unternehmen — ab 799 €
7. Google Unternehmensprofil erstellen — ab 129 €

**Env vars needed**:
```
RESEND_API_KEY=re_Jh8puXuG_...  (in .env.local + Vercel)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
```

## Resume Instructions

1. Check site is live: https://arlocalgrowth.de
2. Update `CLAUDE.md` — change primary CTA from "Kostenloses Google Maps Audit" to "Jetzt anfragen / Schreiben Sie mir"
3. For Resend domain email: go to resend.com → Domains → verify arlocalgrowth.de → update `from` in `src/app/api/audit/route.ts`
4. For Turnstile production keys: go to dash.cloudflare.com → Turnstile → create site for arlocalgrowth.de → update Vercel env vars
5. GBP Product Cards: add 4 visual cards in GBP → Produkte section
   - "Schreiben Sie mir" (free, links to #audit)
   - "Google Maps Optimierung Starter" (ab 179€/Monat)
   - "Local SEO Komplett" (ab 299€/Monat)
   - "Website für lokale Unternehmen" (ab 799€)

## Setup Required

- `.env.local` must exist with RESEND_API_KEY, NEXT_PUBLIC_TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY
- Never commit `.env.local` (already in .gitignore)
- Deploy: `git push` → Vercel auto-deploys from main branch
- Team: `arlocal-growth`, project: `arlocalgrowth`

## Edge Cases & Error Handling

- Form error fallback shows `a.r.localgrowth@gmail.com` — this is intentional
- Language switcher uses `window.location.href` (full reload) — intentional, avoids next-intl hydration issues on mobile
- `overflow-x: hidden` on `html` and `body` in globals.css — intentional, prevents mobile bleed

## Warnings

- **DO NOT** switch mobile menu back to Framer Motion `height` animation — breaks click events
- **DO NOT** use `-mx-6` negative margins on hero cards — causes horizontal overflow on mobile
- **DO NOT** commit `.env.local`
- CLAUDE.md still says "Kostenloses Google Maps Audit" as primary objective — this is outdated, actual CTA is now "Schreiben Sie mir / Jetzt anfragen"
- GBP profile currently has only 1 review — most critical weakness, should be addressed before any advertising
- Target audience is multilingual: DE + RU + UA + EN speaking local businesses in Germany — NOT only German
