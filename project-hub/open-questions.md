# Open Questions

Updated: May 28, 2026

## Product / Brand

- Is `Nidar Health` the final brand name or just a working placeholder?
- Does the current visual direction match the intended brand tone?
- What geography cluster should the launch prioritize first?
- Which city or city cluster is Phase 1A: Surat, Ahmedabad, both, or another starting market?
- Which of the three MVP Health Tracking packages should be promoted first: Basic Annual Health, Vitamin & Fatigue, or Diabetes / Metabolic Risk?

## Clinical / Compliance

- Who is the launch doctor / medical director?
- Which MBBS/MD doctors are available for the first 50-500 Annual Health Tracking reviews?
- What are the approved package-specific protocols and red-flag rules?
- What exact consent language should be used at launch?
- What is the final grievance and privacy-request process?
- What source-wise consent copy is approved for lab processing, AI analysis, doctor review, partner sharing, and pharmacy fulfilment?
- What critical lab values require urgent escalation versus normal doctor review queueing?
- What supplement and medicine recommendation boundaries are approved for doctor review?
- Who will review genetics if that phase is ever activated: genetic counselor, specialist doctor, or partner lab clinician?

## Operations

- Which local NABL-accredited lab should support the first 30-60 days?
- Which local licensed pharmacy should handle manual fulfilment first?
- Will MVP lab report ingestion be user PDF/image upload, lab email, manual dashboard upload, or a hybrid?
- What is the target doctor review SLA in actual operations: same day, under 24h, or longer during beta?
- How should refunds, cancellations, and delivery delays be handled end to end?
- What manual ops checklist is required from lab booking to report publishing?
- Who handles WhatsApp/email communication before automation?

## Technical

- What is the final Supabase project region after legal/compliance review?
- Which OTP or MFA policy should staff accounts use after the first password-based rollout?
- What analytics destination should receive the event schema?
- What payment provider should be wired first: Razorpay, Cashfree, or both?
- Which OCR extraction approach should power first biomarker parsing: Google Document AI, AWS Textract, Azure Document Intelligence, LLM vision, or hybrid?
- Which LLM/model stack should power extraction, normalization, insight drafting, rewriting, and safety checks?
- What confidence threshold should force human/manual extraction review?
- Should Phase 2 wearables use Apple HealthKit and Google Health Connect directly, or an aggregator such as Terra/Vital/Validic?
- What is the canonical schema boundary between `biomarker_results`, `daily_health_metrics`, `symptom_logs`, and `goal_profiles`?
