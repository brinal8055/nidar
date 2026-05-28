# Annual Health Tracking Phase 1

Updated: May 28, 2026

## Operating Goal

Phase 1 is a web-only MVP for the first 50-100 users, then a controlled 100-500 user beta.

The goal is to validate demand, package fit, operational workflow, doctor review quality, and user trust before building heavy integrations. Do not block launch on lab APIs, pharmacy APIs, external doctor networks, wearables, genetics, ABDM, or native mobile apps.

## Phase 1 Product Promise

Use this promise:

> Book tests from home. Understand your reports. Get doctor-reviewed guidance. Track your health over time.

This promise is launchable because it keeps the product focused on lab reports, symptoms, goals, AI-assisted processing, licensed doctor review, and manual partner fulfilment.

## MVP Flow

```text
User chooses health package
-> fills health questionnaire
-> books home sample collection or uploads existing report
-> lab report arrives
-> OCR extracts text and tables
-> AI extracts biomarkers
-> AI generates doctor-facing draft summary
-> doctor reviews and edits
-> AI rewrites approved content into user-friendly final report
-> doctor gives final approval
-> user sees dashboard and care plan
-> medicines or supplements are fulfilled manually through a licensed partner if needed
-> retest reminders are created
```

Do not shorten this into "AI writes and doctor approves once." The safer flow is structured extraction, doctor-facing draft, doctor edit, user-friendly rewrite, then final doctor approval.

## MVP Packages

Start with only three packages.

### Basic Annual Health

For general preventive users.

Markers:

- CBC
- HbA1c or fasting glucose
- Lipid profile
- Liver function
- Kidney function
- Thyroid
- Vitamin D optional
- B12 optional

### Vitamin & Fatigue

For fatigue, low energy, hair fall, and weakness.

Markers:

- Vitamin D
- Vitamin B12
- Ferritin or iron
- CBC
- Thyroid

### Diabetes / Metabolic Risk

For overweight users, family history, prediabetes, or lifestyle risk.

Markers:

- HbA1c
- Fasting glucose
- Lipid profile
- Kidney markers
- Liver markers
- BMI or waist

## What To Exclude From MVP

Do not build these in Phase 1:

- Wearables
- Genetics
- Native mobile app
- ABDM / ABHA
- Twenty health programs
- External doctor marketplace integration
- Direct pharmacy API dependency
- Direct lab API dependency
- Automated clinical decisions

These can return after the first manual beta proves demand and workflow.

## Doctor Review Strategy

Use Nidar's own doctor dashboard for MVP.

Reason:

- fastest for 50-500 users
- lowest cost
- highest product learning
- highest clinical protocol control
- compatible with the current staff/admin portal direction

MVP doctor dashboard should support:

```text
Doctor logs in
-> sees pending reports
-> sees questionnaire, raw report, extracted biomarkers, abnormal markers, AI draft summary
-> edits or rejects draft
-> requests more information if needed
-> adds notes, retest guidance, referral, supplement, or prescription decision where appropriate
-> previews final user report
-> approves
-> audit event is created
```

Use external doctor networks later only after volume grows.

Future options to evaluate:

- Tata 1mg
- Practo
- Apollo 24/7
- mfine
- Lybrate

## Lab Partner Strategy

For the first 30-60 days, use a local NABL-accredited lab plus manual ops in the first city or city cluster.

Reason:

- fastest launch
- no API dependency
- easier troubleshooting
- better pilot control
- good enough for 50-500 users

After traction, evaluate broader partners:

- Healthians
- Thyrocare
- Redcliffe Labs
- Tata 1mg Labs

## Pharmacy / Delivery Strategy

Do not operate a pharmacy inside Nidar.

For MVP, use a local licensed pharmacy and manual order placement after a licensed doctor prescription decision.

Scale options to evaluate later:

- Tata 1mg
- PharmEasy
- Netmeds
- MedPlus
- local pharmacy fallback

Prescription medicines must always go through licensed doctor review and licensed pharmacy fulfilment.

## AI Pipeline

Build small agents, not one large health agent.

### 1. Report Extraction Agent

Input:

- report PDF or image
- lab name if available
- report date if available
- page number

Output:

- raw extracted values
- confidence score
- unknown fields
- extraction warnings

Rules:

- extract only values present in the report
- do not infer missing values
- preserve units and reference ranges
- flag unreadable fields

### 2. Biomarker Normalization Agent

Maps synonyms into canonical markers.

Examples:

- Hb A1c, Glycosylated Hemoglobin, HBA1C -> HbA1c
- Vitamin B-12, B12, Cobalamin -> Vitamin B12

Categories:

- Vitamin profile
- Thyroid profile
- Diabetes profile
- Liver profile
- Kidney profile
- Lipid profile
- Blood profile

### 3. Risk Flag Agent

Classifies values into:

- normal
- borderline
- low
- high
- critical
- needs_doctor_attention
- needs_urgent_attention

Critical values must route to doctor escalation immediately, not normal report publishing.

### 4. Draft Insight Agent

Creates doctor-facing draft summaries. It may suggest areas for review, but must not prescribe dosage or treatment unless the doctor enters it.

### 5. Doctor Review Assistant

Helps the doctor edit faster by showing abnormal markers, missing tests, contraindication questions, and "ask user" prompts.

Doctor remains final authority.

### 6. User-Friendly Report Writer

After doctor edits and approves clinical content, rewrites it into plain language.

### 7. Compliance / Safety Checker

Checks before final publish:

- no cure or guarantee claims
- no AI diagnosis
- no AI prescribing
- no prescription without doctor approval
- no casual handling of emergency or critical cases
- no supplement overdose suggestion
- no unsupported certainty

## Data Sent To AI

Send to extraction model:

- report text or image/PDF content
- lab name
- report date
- page number

Send to insight model only when needed:

- age
- gender
- height, weight, BMI
- symptoms
- goals
- medical history
- current medicines
- allergies
- family history
- biomarker JSON
- reference ranges

Do not send unless necessary:

- phone number
- address
- payment details
- Aadhaar
- full identity documents

PHI minimization is a Phase 1 requirement, not a later cleanup.

## Doctor Dashboard Requirements

Queue statuses:

```text
pending_ai_extraction
pending_doctor_review
doctor_requested_info
doctor_edited
pending_final_approval
approved
published
referred
urgent
```

Case screen should show:

- patient summary
- questionnaire
- uploaded report
- extracted biomarkers
- abnormal markers
- AI draft summary
- doctor edit box
- recommendation builder
- medicine or supplement section
- final report preview
- approve button
- audit log

Doctor actions:

- approve insight
- edit insight
- request more info
- request consult
- recommend retest
- prescribe medicine
- recommend OTC supplement
- refer to specialist
- mark urgent

## User Dashboard Requirements

Keep it simple.

Top card:

```text
Your health snapshot

3 markers need attention
2 markers are borderline
18 markers are in range
Doctor reviewed on: date
```

Sections:

- Health Profiles: Vitamin, Thyroid, Diabetes Risk, Liver, Kidney, Lipid, Blood
- Biomarker Trends
- Doctor-Reviewed Guidance
- Care Plan
- Orders
- Reminders

## Backend Modules

Phase 1 backend modules:

- User Profile
- Health Questionnaire
- Lab Order
- Report Upload
- OCR Extraction
- Biomarker Parser
- AI Insight Engine
- Doctor Review
- Final Report
- Pharmacy Order
- Reminder Engine
- Audit Log

Core tables:

- health_profiles
- health_questionnaires
- lab_orders
- lab_reports
- biomarker_results
- ai_extractions
- ai_insights
- doctor_reviews
- final_health_reports
- care_plans
- recommendations
- medicine_orders
- supplement_orders
- tracking_reminders
- audit_events

Most important table:

```text
biomarker_results
user_id
report_id
marker_name
marker_category
value
unit
reference_min
reference_max
status
confidence_score
report_date
lab_name
source_page
```

## Compliance Rules

Product rules:

- AI never diagnoses
- AI never prescribes
- doctor review required before clinical guidance
- prescription only by licensed doctor
- medicine fulfilment only through licensed pharmacy
- critical values escalated
- every action audited
- consent captured separately for lab processing, AI analysis, doctor review, partner sharing, and pharmacy fulfilment

## Phase Plan

### Phase 1A: Web MVP, 3-4 weeks

Build:

- health questionnaire
- report upload
- lab package booking request
- OCR plus biomarker extraction
- doctor review dashboard
- final report dashboard
- manual medicine or supplement order flow

Goal:

```text
Process 50-100 real users manually but safely.
```

### Phase 1B: Controlled Beta, 4-8 weeks

Add:

- lab partner workflow
- doctor approval workflow
- final report PDF
- WhatsApp or email notifications
- retest reminders
- basic analytics

Goal:

```text
500 paid reports with a target review SLA under 24 hours.
```

### Phase 2: Automation, 2-3 months

Add:

- lab API or webhook
- pharmacy API or manual hybrid
- structured biomarker trends
- advanced dashboard
- subscription health plan

### Phase 3: Scale

Add:

- wearable integrations
- genetic reports
- ABDM / ABHA
- corporate wellness
- external doctor network

## Final Recommendation

For MVP, build:

```text
Nidar-owned app
+ local lab partner
+ Nidar doctor dashboard
+ AI extraction and draft insights
+ doctor approval
+ local pharmacy/manual medicine delivery
```

Do not over-integrate before the first 50-500 users prove the workflow.
