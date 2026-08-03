# Pulse v2.5 — Release 5

**Release Date:** 2026-05-06
**Prototype Path:** `prototype-3-v2.0/`
**FSD Reference:** `FSD_BusinessMonitoringDashboard_v5.docx`
**Spec Reference:** `Dashboard_Spec_v5.xlsx`

## Overview

Pulse v2.5 (Release 5) represents a major visual and interaction refinement of the Business Monitoring Dashboard, with a focus on usability, consistency, and scalability across all department modules.

## Release Contents

### Pages (32 total)
- **Core Navigation:** index.html (login) → org-pulse.html (home)
- **Department Dashboards (6):** Engineering, Sales, HR, TA, PMO, Finance
- **Supporting Modules:** Mining, Delivery Manager (DM) home, Productivity
- **Drill-down Pages:** delivery-drill.html, finance-drill.html, hr-drill.html (detailed breakdowns)
- **Admin & Settings:** admin.html, settings.html, kpi-thresholds.html, help-center.html
- **Metadata:** bmd-meta.html (system metadata dashboard)
- **Alerts & Escalations:** alerts.html, escalations.html
- **Financial Views:** financials.html, action-items.html

### Metrics
- **36 active KPIs** across 6 departments (Engineering, Sales, HR, TA, PMO, Finance)
- **Department Banner Stats:** 6 headline metrics per dashboard (on-track count, YTD billing, engagement score, active projects)
- **Multi-level drill-downs:** L2 flyouts, L3 drill pages with departmental breakdowns
- **P360 (Performance 360) Integration:** Real-time engagement and performance scoring

### Key Features
- **Org Pulse Home:** Executive summary with Claude-powered daily brief capability
- **Role-based Dashboards:** Tailored KPIs and controls per department
- **Real-time RAG Status:** Red/Amber/Green indicators on all metrics
- **Avatar Dropdown Menus:** Profile access and sign-out (replaces top-strip links)
- **Consistent Footer:** Data freshness timestamp, system health, copyright
- **Theme Palette:** Unified Classic/Modern + Light/Dark mode toggles

## What Changed in v2.5 (vs v2.4 / v4 Spec)

### Visual & Layout Enhancements
- **Split-screen Login:** Dark hero panel (left) with brand narrative; white form panel (right)
- **Canonical Top Navigation:** Palette selector · Tickets icon · Help icon · Alert bell · Avatar dropdown (consistent across all 32 pages)
- **Banner Icon System:** White geometric icon + full-height left divider on all department dashboards and Org Pulse home
- **Footer Consolidation:** Data Freshness · System Health · Copyright notice (shared footer across all pages)

### Interaction & Theme Improvements
- **Theme Palette Unification:** Merged Appeal selector (Classic/Modern) + Mode selector (Light/Dark) into single unified menu
- **Avatar Dropdown:** Direct access to Profile and Sign Out (replaces scattered top-strip links)
- **System Health Relocation:** Moved from top strip to footer center to reduce top-level visual noise
- **Reduced Clutter:** Simplified header/footer structure for cleaner data focus

### Metrics & Spec Alignment
- **36 Prototype-Verified Metrics:** All active KPIs traced to prototype location and drill-down depth (L1-L4)
- **Deferred Metrics:** 84 v4 spec items moved to out-of-scope (awaiting future phases)
- **New Metrics:** 34 metrics added in v2.5 prototype (banner stats, dept-level breakdowns)
- **Prototype Trace:** Every kept metric includes page location and drill target for validation

## Metrics by Department

| Department | On-Track | YTD Billing | Avg P360 | Active Items | Status |
|---|---|---|---|---|---|
| Engineering | 42 | $11.0M | 7.1 | 12 | Amber |
| Sales | 38 | $13.5M | 7.8 | 15 | Green |
| HR | 85% | — | 7.4 | 8 | Amber |
| TA | 92 | 340 | 7.6 | 12 | Green |
| PMO | 31 | — | 7.2 | 9 | Amber |
| Finance | 45 | $87.2M | 7.5 | 18 | Amber |

## File Structure

```
Business Monitoring/
├── FSD_BusinessMonitoringDashboard_v5.docx     (Functional Spec Document)
├── Dashboard_Spec_v5.xlsx                       (Detailed metrics registry)
└── prototype-3-v2.0/
    ├── RELEASE.md                               (This file)
    ├── index.html                               (Login page)
    ├── org-pulse.html                           (Org Pulse home)
    ├── [dept].html                              (Department dashboards × 6)
    ├── [dept]-drill.html                        (Drill-down pages × 3)
    ├── admin.html, settings.html, help-center.html
    └── [other pages]
```

## Quality Assurance

- All 36 prototype metrics traced to Spec v5 KPI Registry
- Prototype Trace column added to Spec v5 for cross-reference validation
- Drill-down Depth taxonomy (L1-L4) documented for each metric
- v4→v5 Changes sheet tracks all kept, new, and deferred metrics
- FSD revised with Revision History section and UI improvements documentation
- No breaking changes to existing v4 functionality (surgical edits only)

## Known Limitations & Deferred Items

- **84 metrics deferred:** Out of scope for v2.5; see Dashboard_Spec_v5.xlsx "Deferred (Out of Scope)" sheet
- **Static drill-down:** Drill pages currently static mockups; live data binding planned for v3.0
- **Mock data only:** All KPI values are representative samples; integration with live data sources pending
- **No persistence:** Form submissions and settings changes not persisted (prototype only)

## Next Steps (v3.0 & Beyond)

1. **Live Data Integration:** Connect KPI tiles to real BI backends (Tableau, Looker, Power BI)
2. **Action Item Tracking:** Persist escalations and action items to a live backend
3. **User Settings:** Save theme, layout, and dashboard preferences
4. **Deferred Metrics:** Implement 84 out-of-scope metrics from v4 spec as time allows
5. **Alert Configuration:** User-configurable thresholds and notification rules
6. **Export & Reporting:** Dashboard snapshots, PDF reports, scheduled email briefs

## Release Sign-off

- **Prototype Verified:** All 32 pages tested for usability and visual consistency
- **Spec Aligned:** Dashboard_Spec_v5.xlsx reflects prototype state as of 2026-05-06
- **FSD Current:** FSD_BusinessMonitoringDashboard_v5.docx includes all updates and revision history

---

**Pulse v2.5 Release 5** — *Building the executive dashboard for real-time org health.*
