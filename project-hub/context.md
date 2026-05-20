# Context Snapshot

Updated: April 21, 2026

## Product Direction

- Product: India D2C telehealth MVP
- Public launch wedge: adult hair-loss treatment only
- Positioning: doctor-reviewed treatment plans for adult male hair loss, from home
- Product shape: web-first, mobile-optimized, SSR marketing pages plus workflow-heavy intake
- AI boundary: AI can assist ops and structuring, but cannot diagnose, counsel independently, or prescribe

## Current Codebase State

- Stack: Next.js 16.2.4, React 19.2.5, TypeScript, App Router
- Styling: custom global CSS in `app/globals.css`
- Content/config: `lib/site-content.ts`
- Local-only persistence for MVP screens: `lib/storage.ts`
- Event hooks: `lib/analytics.ts`
- Internal workflow mock data: `lib/admin/mock-data.ts`
- Public site direction: `DESIGN.md` plus the pasted Medvi homepage HTML as the active reference for hero structure, filmstrip, tab bar, alternating collage sections, softer trust bar, and premium serif/sans hierarchy
- MVP clinical/product boundary: support adult male pattern hair-loss review first; route female hair loss, minors, patchy sudden loss, severe scalp disease, PRP, and transplant needs away from the online prescription flow

## Implemented Frontend Areas

- Home page
- Redesigned public homepage around the Medvi structural pattern
- Tightened the homepage to a cleaner Medvi-like sequence with simplified public nav, horizontal filmstrip, active category tabs, collage showcase sections, ecosystem app block, trust row, FAQ, and a final assessment CTA
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
- Doctor/admin dashboard
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

## Best Next Engineering Slice

The most logical next implementation area is replacing mock local and static admin state with a real backend/auth model so the public funnel and internal dashboard can operate on the same case records.
