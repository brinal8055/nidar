# Nidar Backend Security Runbook

## Current Production Shape

The public app remains a static Cloudflare Pages deployment. Cloudflare is responsible for DNS, CDN, static hosting, security headers, and optional Turnstile/rate limiting. It is not the source of truth for patient, doctor, prescription, report, or audit data.

Supabase is the v1 backend:

- Supabase Auth manages staff credentials.
- Supabase Postgres stores cases, intake payloads, reviews, fulfilment, support notes, and audit events.
- Supabase Storage stores private case media such as photos and reports.
- Supabase Row Level Security controls who can read data.
- Supabase Edge Functions handle privileged writes and audit events.

## Security Defaults

- The frontend only uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Never put `SUPABASE_SERVICE_ROLE_KEY` in Cloudflare Pages frontend variables.
- Service role access is only used inside Supabase Edge Functions.
- Internal pages render no case data until Supabase Auth and role checks pass.
- Admin/ops can access operational queues.
- Doctors can access assigned cases only.
- Public users can submit intake through `create_case`, but cannot query case records.
- Redis is not used for PHI. If introduced later, use it only for non-sensitive rate limits, locks, or short-lived job state.

## Supabase Setup

1. Create the Supabase project in the selected Asia region.
2. Run `supabase/migrations/202605250001_backend_security.sql`.
3. Deploy the Edge Functions in `supabase/functions`.
4. Create staff users in Supabase Auth.
5. Insert matching `profiles` records with roles:
   - `admin`
   - `ops`
   - `doctor`
   - `support`
6. For each doctor, insert a `doctor_profiles` row with registration details and supported verticals.
7. Add these Cloudflare Pages environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Edge Functions

- `create_case`: public intake submission with consent validation and audit event creation.
- `assign_case`: admin/ops assignment or reassignment of a doctor.
- `doctor_decision`: doctor-only decision submission for assigned cases.
- `upload_case_media`: signed private upload URL creation and media audit logging.
- `update_fulfilment`: admin/ops fulfilment or partner-order status updates.
- `support_note`: admin/ops/support case note creation.

## Cloudflare Vs Alternatives

Keep Cloudflare Pages while the app is mostly static and marketing-led. If we need server-rendered auth, middleware route protection, or heavy backend logic inside Next.js, prefer either:

- Vercel + Supabase for the simplest full-stack Next.js path.
- Cloudflare Workers/OpenNext if we want to keep Cloudflare but need server execution.

For a later enterprise healthcare platform, revisit a dedicated backend on AWS/GCP/Azure with managed Postgres, object storage, queues, WAF, full audit logging, and formal compliance review.

## Verification Checklist

- Unauthenticated `/admin` and `/doctor` users do not see case data.
- Staff login redirects users by role.
- Admin/ops can assign doctors and create audit events.
- Doctors cannot fetch unassigned cases.
- Private media URLs are short-lived and role-checked.
- Build output does not contain service keys or real patient data.
- Every clinical/admin/ops action creates an audit event.
