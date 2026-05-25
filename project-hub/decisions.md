# Decision Log

## April 17, 2026

### Public wedge is adult hair loss first

Reason:
The MVP doc recommends hair loss as the safest and cleanest first acquisition wedge because it has simpler fulfillment, lower ad risk than ED or GLP-1, and a clearer repeatable workflow.

### Web-first before native apps

Reason:
The MVP doc explicitly recommends a web-first, mobile-optimized launch and delaying native apps until the funnel and care workflow are proven.

### Frontend foundation was built before internal ops tools

Reason:
The user asked to start with the frontend, and the public funnel is the first visible system needed for the acquisition and intake loop.

### Copy stays conservative and compliance-oriented

Reason:
The public product should avoid exaggerated claims, guaranteed outcomes, fake doctor identity, and any framing that suggests AI is diagnosing or prescribing.

### Shared codebase approach for public and internal surfaces

Reason:
The MVP doc suggests keeping the internal admin/dashboard in the same codebase if possible. Current implementation direction keeps that option open.

### Mocked client-side persistence is temporary

Reason:
Local storage is acceptable for a frontend-first prototype, but it is not a production model. It should be replaced by authenticated server-backed storage as the next major technical step.

### Admin workspace uses its own shell instead of public marketing chrome

Reason:
The internal doctor-and-ops surface should behave like an operational tool, not like a marketing site. The root shell now hides the public header/footer on `/admin`, and the admin routes render their own workspace layout.

### Admin shell was built with static shared mock case models first

Reason:
This makes it possible to shape the doctor, ops, support, fulfilment, and audit interfaces before backend persistence is wired, while keeping the next backend step clearly defined.

### Public design direction shifted toward a Medvi-style editorial healthcare feel

Reason:
The original public styling felt too muted and small. The revised direction uses a centered serif hero, tabbed category navigation, alternating pastel showcase blocks, larger typography, and calmer premium healthcare styling while keeping the same compliant hair-loss-first scope.

### `DESIGN.md` is the active public design-system reference

Reason:
The file in `/Users/brinalsavsaviya/Downloads/DESIGN.md` provides a more exact token set for colors, typography, rounding, spacing, and Medvi-style section patterns, so the public site should now align to that spec rather than ad hoc visual tweaks.

## April 21, 2026

### The pasted Medvi homepage HTML is the practical homepage layout reference

Reason:
The user supplied a concrete HTML sample after the broader Medvi comparison. The public homepage should now follow that structure more literally: simplified top nav, centered serif hero, horizontal image filmstrip, tabbed category bar, alternating collage sections, ecosystem/app block, muted trust row, and a cleaner closing CTA.

### MVP treatment scope narrowed to adult male pattern hair loss

Reason:
The user supplied a clinical-product playbook that makes the safest first wedge explicit: adult male pattern hair loss is most online-friendly and protocolizable. The app should screen for pattern, timeline, family history, triggers, scalp symptoms, safety history, photos, and counselling flags, while routing female hair loss, minors, patchy sudden loss, severe scalp disease, PRP, and transplant needs away from the simple online prescription path.

## May 25, 2026

### V1 backend uses Supabase while Cloudflare Pages stays static

Reason:
The current app is statically exported for Cloudflare Pages. For the first secure backend slice, Supabase Auth, Postgres, private Storage, RLS, and Edge Functions give Nidar a faster secure source of truth without moving the public marketing site to a full-stack host yet.

### Internal access is staff-role based, not hidden-route based

Reason:
Admin, ops, and doctor portals should never rely on obscure URLs or frontend-only visibility. Staff login routes users by role, while Supabase RLS and Edge Functions enforce access to cases, media, doctor decisions, and audit records.

### Redis is excluded from PHI storage in v1

Reason:
Auditability matters more than cache speed for early healthcare operations. Postgres remains the source of truth; Redis can be reconsidered later only for non-sensitive rate limits, locks, or short-lived job state.
