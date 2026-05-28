# Task Board

Updated: May 28, 2026

## In Progress

- Build Annual Health Tracking Phase 1 as a web-only, manual-ops-friendly MVP for the first 50-100 users and then 100-500 controlled beta users

## Next Up

- Create the real Supabase project and apply `supabase/migrations/202605250001_backend_security.sql`
- Apply or update the Health Tracking migration for health profiles, questionnaires, lab orders, reports, biomarkers, biomarker results, AI extractions, AI insights, doctor reviews, final reports, care plans, recommendations, medicine orders, supplement orders, reminders, and audit events
- Deploy Supabase Edge Functions for case creation, assignment, review, media, fulfilment, and support notes
- Add Cloudflare Pages environment variables for Supabase public configuration
- Provision staff users and `profiles` / `doctor_profiles` rows
- Replace static internal fixture data with Supabase-backed case and Health Tracking report queries
- Wire secure patient photo upload flow to private Supabase Storage
- Add PDF/image lab report upload as the MVP ingestion path for Health Tracking
- Add lab package booking request workflow for local NABL lab/manual ops
- Add OCR plus biomarker extraction workflow that stores marker value, unit, reference range, lab name, report date, abnormal status, confidence score, and source page
- Add AI extraction, biomarker normalization, risk flag, draft insight, user-friendly rewrite, and compliance-check records
- Build doctor review queue statuses: pending_ai_extraction, pending_doctor_review, doctor_requested_info, doctor_edited, pending_final_approval, approved, published, referred, urgent
- Build doctor case screen for questionnaire, report, extracted biomarkers, abnormal markers, AI draft, doctor edits, recommendations, final report preview, approval, and audit log
- Add final report dashboard publishing flow after doctor approval
- Add manual medicine/supplement order workflow through licensed local pharmacy
- Add source-wise consent capture for lab processing, AI analysis, doctor review, partner sharing, and pharmacy fulfilment
- Add retest reminders and basic email/WhatsApp notification placeholders
- Integrate payment flow with a real gateway

## Planned After That

- Add real queue actions, patient profile persistence, and prescription workflow submission
- Add support messaging actions and fulfillment state updates
- Build the normalized health timeline across biomarkers, symptoms, goals, medications, doctor notes, and care plans
- Evaluate national lab partners after traction: Healthians, Thyrocare, Redcliffe Labs, Tata 1mg Labs
- Evaluate pharmacy scale partners after traction: Tata 1mg, PharmEasy, Netmeds, MedPlus
- Evaluate external doctor-network fallback after traction: Practo, Tata 1mg, Apollo 24/7, mfine, Lybrate
- Add lab API/webhook or email/SFTP ingestion after manual workflow proves demand
- Add pharmacy API/manual hybrid after manual pharmacy fulfilment proves demand
- Add final report PDF generation
- Add subscription health plan once repeat value is validated
- Add `daily_health_metrics` only after Phase 1 validation for steps, sleep, heart, recovery, activity, weight, and related wearable summaries
- Evaluate wearable integration strategy only in Phase 2: Apple HealthKit, Google Health Connect, direct APIs, or aggregator API
- Keep genetics as a Phase 3 track with separate consent, stricter access, and specialist review
- Keep ABDM/ABHA as a later consent-based health-record sharing track, not MVP
- Add analytics schema coverage for the full funnel
- Add tests for critical user flows
- Prepare Hinglish-ready content architecture without changing the English-first launch

## Completed

- Established `project-hub/` for persistent context, task tracking, decisions, and open questions
- Read and evaluated the MVP PDF
- Chose the frontend-first implementation path based on the doc
- Scaffolded a Next.js + TypeScript app from scratch
- Built marketing pages, legal pages, and shared layout
- Redesigned the public-facing site around the Medvi reference structure and visual language
- Tightened the public homepage against the pasted Medvi HTML reference and simplified the page sequence for readability
- Narrowed the public MVP promise to adult male pattern hair-loss review from home
- Expanded the eligibility quiz to include pattern, timeline, family history, recent triggers, scalp symptoms, safety history, counselling flags, and standard photo requirements
- Updated admin mock cases with AI pre-screen notes, doctor decision paths, triggers, scalp symptoms, prior treatments, and follow-up logic
- Removed all borrowed Medvi/Googleusercontent homepage images and replaced them with app-owned visual UI blocks to avoid missing media and alignment gaps
- Replaced failed external icon-font rendering with local SVG icons and fixed the mobile homepage category alignment
- Converted quiz safety-history text boxes into selectable None/Other checkbox groups and added a visual photo-angle guide
- Built the eligibility quiz with local saved progress
- Built checkout, thank-you, and account/status placeholder pages
- Built the internal doctor-and-ops admin shell in the same codebase
- Defined shared mock admin data models for intake, case review, fulfilment, support, and audit events
- Added a separate admin workspace chrome instead of reusing the public header/footer
- Added a Staff login entry and Supabase-ready internal auth gates for admin and doctor portals
- Added Supabase backend schema, RLS policies, private storage policy, and Edge Function scaffolding
- Added backend security runbook and environment example for Cloudflare Pages + Supabase
- Recorded the personal health data layer strategy in `project-hub/health-data-layer.md`
- Recorded the Annual Health Tracking Phase 1 operating plan in `project-hub/annual-health-phase-1.md`
- Added basic analytics event hooks
- Verified with `npm run typecheck`
- Verified with `npm run lint`
- Verified with `npm run build`

## External Dependencies / Potential Blockers

- Compliance memo and clinical protocol
- Final doctor profile and credentials
- First-city local NABL lab operating model
- Local licensed pharmacy operating model
- Doctor review protocol for Basic Annual Health, Vitamin & Fatigue, and Diabetes / Metabolic Risk
- Critical biomarker escalation policy
- AI/OCR provider decision for report extraction
- Payment gateway credentials
- Final legal text and policy review
- Backend hosting and infra decisions for production
