# Pulse v2.2 — Multi-Module Expansion

**Release Date:** 2026-05-15
**Prototype Path:** `prototype-3-v2.2/`
**Base Version:** v2.1
**Documents Updated:** FSD v5.3 · Dashboard Spec v5.3

---

## New Modules

### Account Management Dashboard (`account-management.html`)
New department module for Account Managers. Three tabs:
- **Overview** — AM cards (Sarah M. / Priya K. / Ravi S.) with RAG + Mining/Esc/P360/Billing pills; Mining Threads swimlane (On Track / At Risk / Late); Account Escalations register table with flyout
- **Financials** — 4 KPI tiles (YTD Revenue / M+1 Forecast / Declining / Growing accounts); YTD Billing per Account bars; AM persona filter (All / Sarah M. / Priya K. / Ravi S.); M+1/M+2/M+3 forward outlook with color coding
- **P360** — Per-account P360 scores
- Added to all sidebars + Org Pulse dept card row

### Solutions Dashboard (`solutions.html` + `solutions-detail.html`)
New department module for the BA unit (Solutions Head: Nandita V.). Two-level:
- **`solutions.html`** — BA unit overview; BA cards with RAG + ribbon metrics (BRD/FSD coverage, sprint churn, missing ACs, YTD billing, kick-off days); click BA card → detail
- **`solutions-detail.html`** — Three tabs per BA:
  - *Artifact Health* — 4-col project tile grid; compact card (name+acct left / story+BRD+FSD counts + No-AC count right); alert tags; flyout
  - *Requirements Quality* — compact req card (name+acct / churn+No-AC | version); flyout
  - *Capacity & Presales* — BA utilization + presales pursuit table with flyout
- Added to all sidebars + Org Pulse dept card row

---

## Existing Module Changes

### Sales — Inside Sales tab (new first tab)
Old tab order: Meeting Readiness → Pipeline Activity → Deal Conversion
New tab order: **Inside Sales** → Meeting Readiness → Pipeline Activity
- Deal Conversion moved to Deferred (insufficient BOFU data)
- Inside Sales tab contains:
  - 5 KPI tiles: Calls This Week / Contact Rate / Conversion Rate / Meetings Scheduled / Opp Worthy Rate
  - BDE Performance overlapping bar chart (per-BDE: calls / interactions / meetings / opp-worthy)
  - Week-on-Week dual-axis trend (calls + meetings with opp-worthy overlay)
  - Meeting Outcome Distribution: 100% stacked chart (monthly)
  - Proposals Awaited table: Account / Opp / Rep / Stage / Value / Proposal Status / Awaited days / Action Required

### Org Pulse — dept card redesign
- Layout: icon-left / name+tag-right CSS grid (was stacked vertical)
- KPI line: 1-row pipe-separated strip (`label: val | label: val | label: val`)
- 8 dept cards now (Engineering / Sales / HR / TA / PMO / Account Mgmt / Finance / Solutions)
- Account Mgmt card: Open Esc / Mining Active / Portfolio
- Solutions card: BRD Coverage / Sprint Churn / Presales Covered

### PMO — Engagement Health tab
- Added YTD Billing per Account bar section (8 accounts, 2-col grid, click-to-flyout)
- Removed Portfolio Forecast table from this tab (canonical home = Financials tab)

### Finance — persona filter + M+1/2/3 color coding
- AM persona filter buttons on YTD Billing view: All / Sarah M. / Priya K. / Ravi S.
- M+1 / M+2 / M+3 revenue outlook cells color-coded green (growth) / amber (flat) / red (decline)

### Mining — flyout sprint panels
- Current sprint / Done / Next sprint panel tabs added to mining thread flyout
- Add Action Item form embedded in flyout

### Escalations — Add Action Item in flyout
- Escalation flyout now has + Add Action Item inline form at bottom

### Action Items master page — full redesign
- Single-level breadcrumb (removed parent nav link)
- 6-column table: Action Item / Owner / Due Date / Done Date / Status / Delay
- 5 filter tiles (Total Open / Overdue / Due This Week / In Progress / Done) — click to filter
- + New Item button → inline editable row at top of table
- Click any row to expand notes

### KPI Threshold Manager — owner field
- `owner` field changed from person names to department names (Engineering / HR / Sales / Talent Acquisition / PMO / Finance; CEO / CFO kept where appropriate)

### Alerts — notification bell click-through
- Each notif-panel item now navigates directly to `alerts.html#<anchor>` on click
- On load, target alert card highlights with orange glow + pulse animation and scrolls into view
- Notif → alert mapping: Escalation→MedTech UAT, Action Item→action-items.html, Attrition→Attrition Above Target, Pipeline→Battle Card Coverage, Finance→AR Overdue

---

## Bug Fixes

| Bug | Fix |
|---|---|
| Action Items master page blank | File was truncated — missing `</script>`, renderRows call, shared.js include. Added closing tags + `window.addEventListener('load', …)` |
| Top-nav action items icon missing on action-items.html | Same root cause — shared.js never loaded, installCanonicalTopNav() never ran |
| Solutions artifact health tile height | Alert strings shortened to ≤35 chars per tag |

---

## Held for v2.3

| Item | Reason |
|---|---|
| HR: Engagement & Culture 1-on-1 split (L49) | New tile + flyout + threshold logic |
| HR: L&D comprehensive training capture (L51) | New entity "Training" — phase separately |
| HR: Attendance occupancy heatmap (L56) | New visualization type |
| Sales: Deal Conversion tab | Insufficient BOFU historical data |

---

## Files Changed vs v2.1

`account-management.html` (new) · `solutions.html` (new) · `solutions-detail.html` (new) · `sales.html` · `org-pulse.html` · `pmo.html` · `finance.html` · `mining.html` · `escalations.html` · `action-items.html` · `kpi-thresholds.html` · `alerts.html` · `shared.js` · `shared.css`
