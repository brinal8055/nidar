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
