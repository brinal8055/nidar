# Context Snapshot

Updated: May 28, 2026

## Product Direction

- Product: Nidar Health consumer health platform
- Public launch wedge: adult hair-loss treatment first
- Annual Health Tracking Phase 1 direction: web MVP for lab reports, symptoms, goals, AI-assisted processing, doctor review, and manual lab/pharmacy fulfilment
- Long-term platform direction: personal health data layer across lab reports, symptoms, goals, manual lifestyle data, and later wearables/genetics
- Positioning: doctor-reviewed care and health tracking from home
- Product shape: web-first, mobile-optimized, static-export marketing pages plus workflow-heavy intake
- AI boundary: AI can assist ops and structuring, but cannot diagnose, counsel independently, or prescribe
- Phase 1 operating target: process the first 50-100 users manually but safely, then move to a 100-500 user controlled beta before heavy integrations
- Brand story: No fear. Get care.
- Tagline: Care without hesitation.

## Current Codebase State

- Stack: Next.js 16.2.4, React 19.2.5, TypeScript, App Router
- Styling: custom global CSS in `app/globals.css`
- Content/config: `lib/site-content.ts`
- Supabase is the intended v1 backend for cases, intakes, reviews, audit logs, and private media
- Event hooks: `lib/analytics.ts`
- Active Annual Health Tracking MVP plan: `project-hub/annual-health-phase-1.md`
- Health data layer reference: `project-hub/health-data-layer.md`
- MVP clinical/product boundary: support adult male pattern hair-loss review first; route female hair loss, minors, patchy sudden loss, severe scalp disease, PRP, and transplant needs away from the online prescription flow

## Implemented Frontend Areas

- Platform homepage with Hair Care, Annual Health Tracking, Weight Loss Care, Men's Health, and Women's Health verticals
- Hair Care remains the first live funnel
- Annual Health Tracking is the beta product surface, now evolving toward a broader personal health data layer
- Weight Loss Care, Men's Health, and Women's Health are coming-soon verticals
- Dedicated Health Tracking pages, plans, quiz, thank-you, and demo dashboard
- How it works page
- Pricing page
- FAQ page
- Legal pages
- Multi-step eligibility quiz with pattern, duration, family history, recent trigger, scalp symptom, counselling, red-flag, and photo-upload checks
- Checkout placeholder flow
- Thank-you page
- Account/status placeholder flow
- Admin workspace shell
- Admin queue overview with status and team filters
- Admin case detail pages with clinical, ops, support, and audit sections
- Shared header, footer, analytics hooks, and tracked CTA components

## What Is Still Mocked

- OTP authentication
- Database and API layer
- Secure patient photo upload backend
- Real payment gateway integration
- Real analytics destination
- Doctor/admin dashboard is present as a shell but not wired to real Health Tracking report review yet
- Messaging and order orchestration
- Real doctor identity, qualification, and registration details
- Final legal/compliance copy
- Admin actions and workflow persistence
- RBAC enforcement
- Support messaging actions
- Prescription workflow actions

## Product Constraints From The MVP Doc

- Adults only for launch
- Adult male pattern hair loss first, not multi-category
- One public funnel, one care workflow, one refill loop
- Strong consent and privacy visibility
- Doctor review required before prescription decisions
- Not for emergencies messaging must stay visible
- Avoid exaggerated medical claims or superiority claims
- Build public web before native apps
- Annual Health Tracking MVP must not include wearables, genetics, ABDM/ABHA, native mobile apps, external doctor marketplaces, or direct lab/pharmacy API dependencies
- MVP operations should use Nidar-owned doctor dashboard, local NABL lab/manual ops, and licensed local pharmacy fulfilment before scaling into partner APIs

## Best Next Engineering Slice

The most logical next implementation area is Health Tracking Phase 1 backend and ops wiring: report upload, lab booking request, OCR/biomarker extraction, doctor review queue, final report publishing, reminders, and manual partner fulfilment.
