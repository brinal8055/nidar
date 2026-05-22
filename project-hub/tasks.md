# Task Board

Updated: April 21, 2026

## In Progress

- No active implementation slice recorded yet

## Next Up

- Replace localStorage-based quiz and order state with server-backed persistence
- Connect the public intake and admin dashboard to the same case record model
- Add real OTP login flow for the account area
- Add admin RBAC and protected routes
- Wire secure file upload flow for patient photos
- Integrate payment flow with a real gateway

## Planned After That

- Add real queue actions, patient profile persistence, and prescription workflow submission
- Add support messaging actions and fulfillment state updates
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
- Added basic analytics event hooks
- Verified with `npm run typecheck`
- Verified with `npm run lint`
- Verified with `npm run build`

## External Dependencies / Potential Blockers

- Compliance memo and clinical protocol
- Final doctor profile and credentials
- Pharmacy operating model
- Payment gateway credentials
- Final legal text and policy review
- Backend hosting and infra decisions for production
