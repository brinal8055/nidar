# Nidar

Web-first frontend for an India D2C telehealth launch, currently focused on an adult male hair-loss care flow.

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Project Notes

Persistent planning context lives in `project-hub/`.
Backend and security setup lives in `docs/backend-security.md`.

## Cloudflare Pages

Use the `Next.js (Static HTML Export)` preset.

```text
Production branch: main
Build command: npm run build
Build output directory: out
Deploy command: leave blank
```

## Supabase Backend

The static frontend is designed to use Supabase for staff auth, Postgres storage, private media, RLS, and Edge Functions.

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Apply `supabase/migrations/202605250001_backend_security.sql` and deploy the functions in `supabase/functions` before enabling real staff or patient data.
