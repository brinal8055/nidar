# Personal Health Data Layer

Updated: May 28, 2026

## Direction

The active MVP execution plan for Annual Health Tracking is `project-hub/annual-health-phase-1.md`.

This file captures the longer-term data-layer direction after the web MVP validates demand and workflow.

Nidar Health is moving from "annual reports" to a personal health data layer.

The long-term platform should combine:

- Lab reports and biomarker data
- Wearable and daily habit data
- Symptoms, goals, and lifestyle questionnaire data
- Genetics data, optional and later

Together, these sources create a better longitudinal health picture than any one source alone.

## Product Positioning

Use this direction:

> Your body, tracked over time: reports, habits, symptoms, and doctor-reviewed guidance in one place.

Do not position the product as AI diagnosis or genetic prediction. AI organizes and extracts data; licensed clinicians review clinical guidance where needed.

## Phase 1: MVP Web Layer

Collect only the highest-value and fastest-to-launch data:

- Lab reports
- Biomarkers extracted from reports
- Questionnaire responses
- Symptoms
- Goals
- Manual lifestyle inputs

MVP collection paths:

- Local lab/manual ops first: booking request, manual confirmation, home collection, report receipt, and manual upload or user upload.
- PDF/image upload first: user uploads a lab report, then OCR and LLM extraction convert it into structured biomarkers.
- Partner lab API later: booking, collection, report ingestion through API, webhook, email, or SFTP after the manual workflow proves demand.
- ABDM / ABHA later: consent-based India health-record sharing, but not MVP scope.

Store lab values as structured biomarker records, including:

- marker name
- value
- unit
- reference min/max
- abnormal flag or status
- lab name
- report date
- source PDF

Important: lab reference ranges vary, so do not hardcode one global range per biomarker.

## Phase 2: Wearable And Daily Metrics Layer

Do not collect raw sensor data in MVP. Start later with clinically/product-relevant summary metrics:

- Activity: steps, active minutes, calories, workouts
- Sleep: total sleep, sleep efficiency, sleep stages
- Heart: resting heart rate, HRV
- Recovery: strain or recovery score if available
- Body: weight, BMI, body fat if user logs it
- Metabolic: glucose if CGM is added later
- Cycle data: optional for women's health later

Integration options:

- Apple HealthKit for iPhone users through a future iOS app.
- Google Health Connect for Android users through a future Android app.
- Direct APIs for Fitbit, Oura, Garmin, Whoop, and similar devices only when business value justifies approvals and maintenance.
- Aggregator APIs such as Terra, Validic, Human API, or Vital API if speed matters more than owning every integration.

Recommendation: do not build ten wearable integrations directly at launch. Use a single aggregator or add Apple HealthKit and Health Connect after web MVP validation.

## Phase 3: Genetics Layer

Genetics is powerful but not MVP.

Reasons to delay:

- It is highly sensitive.
- It is hard to interpret safely.
- It is weakly actionable for many wellness use cases.
- It has higher privacy, compliance, and liability risk.
- It is not needed for the first value proposition.

Future collection paths:

- Raw DNA upload from consumer genetics providers.
- Partner genetic testing lab.
- FHIR genomics integration later.

Use genetics only for:

- risk awareness
- nutrition sensitivity
- pharmacogenomics
- family-history-driven screening prompts

Do not use genetics for deterministic claims such as "you will get diabetes" or automated medication decisions. Genetic outputs should have separate consent and specialist review.

## Data Pipeline

Normalize every source into one health timeline:

```text
Sources
|-- Lab reports
|-- Wearables
|-- Symptoms
|-- Goals
|-- Medications
`-- Genetics

v normalize

Health Timeline
|-- Biomarkers
|-- Daily metrics
|-- Symptoms
|-- Risk flags
|-- Doctor notes
`-- Care plans
```

Suggested tables:

- user_health_profiles
- lab_reports
- biomarker_results
- wearable_connections
- daily_health_metrics
- symptom_logs
- goal_profiles
- genetic_reports
- genetic_variants
- health_insights
- doctor_reviews
- care_plans
- recommendations

Most important future table:

```text
daily_health_metrics
id
user_id
source
date
steps
sleep_minutes
sleep_score
resting_heart_rate
hrv
active_minutes
calories_burned
workout_minutes
weight
stress_score
recovery_score
created_at
```

## Recommendation Examples

Fatigue:

- Labs: low Vitamin D or B12
- Wearables: poor sleep or low activity
- Symptoms: tiredness and low energy
- Output: doctor-reviewed supplement plan, sunlight habit, sleep target, and 8-week retest

Diabetes risk:

- Labs: HbA1c 6.1, high triglycerides
- Wearables: low steps, poor sleep
- Symptoms: weight gain
- Output: doctor consult, walking target, diet plan, weight tracking, and 3-month HbA1c retest

Hair loss:

- Labs: low ferritin or Vitamin D
- Symptoms: hair fall
- Photos: thinning pattern
- Output: hair doctor review, deficiency correction, progress photos, and 8-12 week retest

## Consent And Safety Rules

Consent must be source-wise:

- I allow Nidar to process my lab reports.
- I allow Nidar to process wearable data.
- I allow Nidar to process symptom data.
- I allow Nidar to process genetic data.
- I allow doctor review.
- I allow pharmacy or lab partner sharing when required.

The data model should support access, correction, erasure, consent withdrawal, and grievance workflows from the start.

Genetics should be stored and governed separately:

- separate consent
- stricter access
- encryption
- no marketing use
- no sharing without explicit consent
- specialist review before clinical interpretation

## Implementation Default

Start with:

```text
Lab reports + symptoms + goals + Nidar-owned doctor review + manual partner fulfilment
```

Then add:

```text
Lab/pharmacy APIs and workflow automation
```

Then add:

```text
Wearables
```

Then add:

```text
Genetics and ABDM/ABHA
```

The first real value is:

> Your reports explained, your habits tracked, and your doctor-reviewed plan updated over time.
