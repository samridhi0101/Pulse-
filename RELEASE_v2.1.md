# Pulse v2.1 — HR Module Iteration

**Release Date:** 2026-05-11
**Prototype Path:** `prototype-3-v2.1/`
**Base Version:** v2.0 (RELEASE.md retained for full base notes)
**Source of Changes:** HR review feedback — `New Microsoft Word Document 2.docx` (lines 45–56)

## Scope of v2.1

This iteration applies HR's first-pass feedback on the prototype. Scope deliberately limited to **structural, low-effort changes** that do not require new tabs or new entities. Larger HR asks (Engagement detail, L&D expansion, 1-on-1 split, in-office occupancy) are queued for v2.2+.

**Conventions applied:**
- Onboarding & Exit lifecycles use the **same milestone-circle pattern** — circles with hover tooltips show stage name + status.
- All status colors follow Nalashaa standard (green/amber/red + grey for "not yet due").
- Golden Ratio RAG re-graded to HR policy: **≤6 = Healthy · 7–9 = Watch · >9 = Critical**.

## Changes (file: `hr.html`)

| # | Section | Change | HR Doc Ref |
|---|---|---|---|
| 1 | Onboarding & Exits → Onboardings table | Dropped "KPIs Set" column. Added "BGV" + "Probation" columns. Reordered: Joiner, Day, Onboarding Plan, BGV, Probation, Progress, Score. Updated stage-circle tooltips with named stages. | L45 |
| 2 | Onboarding drill flyout (`openOnboardingDetail`) | Rebuilt with **5 stages**: Data Captured, Onboarding Plan Shared, HR Induction, BGV, KPIs Set. Each stage shows source system + detail + status pill. Added inner-tabs below: **Manager Feedback (30/60/90)** + **Joiner Survey (D1/30/60/90)**. | L45 |
| 3 | BGV Pending sub-tab | **Removed.** BGV is now a column inside Onboardings. A red action banner pinned at top of Onboardings: "X joiners awaiting BGV >14 days". BGV Pending KPI tile retained (top of section) — clicking it now scrolls to the Onboardings sub-tab. | L46 |
| 4 | Attrition Early Warning | Confirmed not present on Onboardings tab; remains in Workforce Health → Hiring & Attrition. No UI change. | L47 |
| 5 | Onboarding & Exits → Exits table | Replaced text-only table with **milestone-circle pattern** (mirrors Onboardings). 7 stages per row with hover tooltips: Resignation Submitted, KT Plan Defined, KT Sign-off, Exit Interview, Exit Survey, Asset/Access Revoked, Final Settlement (FnF). Renamed "KT Status" → "KT Sign-off" (Received / Not received). Added "Survey" column (Completed / Not completed). | L48 |
| 6 | Exit drill flyout (`openExitDetail`) | New flyout with 7-stage timeline. Each stage shows source system + detail + status pill. Late stages flagged in red note block. | L48 |
| 7 | Performance & Comp → KPI/OKR table | Added **PMS Review (Q1·Q2·Q3·Q4)** column. Each quarter shown as a colored pill (green=Done, amber=Partial, red=Delayed, grey=Not yet due). Source: PMS portal. | L52 |
| 8 | Workforce Health → Golden Ratio | Restructured to **3-tier drill**: (1) Landing table = Dept · Headcount · Managers · Avg Span · RAG (worst). (2) Click dept row → inline-expand to show all managers (Manager · Role · Reports · Span · RAG). (3) Click manager → flyout with team composition (Reportee · Role · Tenure). RAG re-graded to HR policy. | L55 |

## Held for v2.2 (per agreed phasing)

| HR Doc Ref | Section | Reason held |
|---|---|---|
| L49 | Engagement & Culture — split 1-on-1 into HR + Manager + Engagement (3 tiles) | New tile + new flyout + threshold logic split — meaningful UI surface change. |
| L50 | Engagement detail — table with Event/Scheduled/Completed/Participants/Survey/Insight | Insight column requires LLM auto-summary pattern; deserves its own design pass. |
| L51 | L&D — comprehensive training capture (Trainer, status, completed/cancelled reasons, participant + survey + insights) | Largest scope expansion; new entity "Training" with full lifecycle. Phase Phase 1 (master table + status) before Phase 2 (participant/survey/insights). |
| L56 | Workforce Health — Attendance dept × day in-office occupancy view | New visualization (heatmap or stacked bar); secondary view that should not replace existing flagged-individual table. |

## Hidden Bug Fixed

**Golden Ratio grading** in v2.0 violated the stated HR policy — e.g., 1:7.4 was tagged "Healthy" when policy says >6 = Watch. v2.1 codifies the policy in `_grRag()` and applies it consistently across dept-level (worst-span rollup) and manager-level rows.

## QC Results

- Test suite: **146 passed / 101 failed / 247 total** — **identical to v2.0 baseline**. Zero regressions.
- All v2.1 failures pre-existed in v2.0 (sidebar/breadcrumb gaps, dead `href='#'` links).
- hr.html-specific failures: **5 in v2.1, 5 in v2.0** — same set, no new ones.

## Files Changed

- `hr.html` — only file touched in v2.1.

## Open Questions for Next Iteration

1. Confirm exit milestone names (currently 7 stages — is that right, or trim to 5–6?). HR may have a documented exit SOP to align against.
2. Confirm PMS Review color semantics (currently g/a/r/x = Done/Partial/Delayed/Not yet) — does HR use different labels?
3. For Engagement Insight column (L50, held), should the LLM auto-summary draft be reviewed by HR before publish, or auto-published?
