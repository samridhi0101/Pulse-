/* ═════ DM Home flyouts — v2.2 enhanced ═════ */

// === SDLC vertical tracker (project name + alert + dots+bars) ===
function sdlcVertical(stages) {
  return `<div class="sdlc-track">${stages.map(s => `
    <div class="sdlc-step">
      <div class="sdlc-spine">
        <div class="sdlc-dot ${s.status}"></div>
        <div class="sdlc-marker-line"></div>
        <div class="sdlc-line"></div>
      </div>
      <div class="sdlc-content">
        <div class="sdlc-row">
          <div class="sdlc-text">
            <div class="sdlc-stage-name">${s.name}</div>
            <div class="sdlc-dates">${s.dates}</div>
          </div>
          ${s.salient ? `<div class="sdlc-salient">${s.salient}</div>` : ''}
        </div>
        ${s.note ? `<div class="sdlc-note ${s.noteCls || ''}">${s.note}</div>` : ''}
      </div>
    </div>`).join('')}</div>`;
}

// === Project sprint flyout ===
const SPRINTS = {
  'MedTech Corp': {
    sprint: 18, day: 6, total: 10, pct: 78, committed: 24, done: 19, blockers: 2,
    alert: { kind:'amber', html: '<strong>Watch:</strong> UAT window slipped 2 weeks · client VP escalated · scope cut Apr 14. Recovery: Phase 2 SOW signed.' },
    stages: [
      { name:'Discovery', dates:'S14 · Mar 4-15 · Done', status:'done', salient:'8 user stories scoped · 4 SMEs interviewed' },
      { name:'Design',    dates:'S15 · Mar 16-29 · Done', status:'done', salient:'12 wireframes · 4 architecture docs · approved by client' },
      { name:'Dev',       dates:'S16-S18 · Apr 6 - May 12 · 78%', status:'active', salient:'16 stories delivered · 24 bugs logged · 8 PRs merged', note:'Behind by 4 stories due to API spec delay', noteCls:'warn-note' },
      { name:'QA',        dates:'Planned May 14-21', status:'todo', salient:'32 test cases · target 95% pass rate', note:'Awaiting Dev close-out' },
      { name:'UAT',       dates:'Plan May 5-16 → Slip May 19-30', status:'late', salient:'24 UAT scenarios · 4 stakeholders', note:'+2 weeks · client UAT window needs reschedule. John to align with MedTech VP by May 8.', noteCls:'late-note' },
      { name:'Deploy',    dates:'Plan May 26 → Fcst Jun 9', status:'todo', salient:'Blue-green deployment · 12 services to migrate', note:'Cumulative delay = ~2 weeks. John flagged to client on May 5.', noteCls:'warn-note' }
    ],
    stories: [
      { id:'NLS-1812', title:'Patient lookup search optimization', status:'Done', owner:'Kavya S.' },
      { id:'NLS-1813', title:'Add multi-factor auth on admin portal', status:'Done', owner:'Priya M.' },
      { id:'NLS-1814', title:'Bulk export module — CSV, Excel', status:'Done', owner:'A. Rao' },
      { id:'NLS-1815', title:'Audit log viewer redesign', status:'Done', owner:'B. Kumar' },
      { id:'NLS-1816', title:'API rate-limit middleware', status:'Done', owner:'Priya M.' },
      { id:'NLS-1817', title:'Dashboard KPI tile component', status:'In progress', owner:'C. Iyer' },
      { id:'NLS-1818', title:'Patient timeline view', status:'In progress', owner:'Kavya S.' },
      { id:'NLS-1819', title:'OAuth integration with EHR', status:'Blocked', owner:'A. Rao' }
    ],
    blockers: [
      { name:'Client API spec pending', owner:'MedTech CTO', age:'4d', priority:'P1' },
      { name:'Test data load delayed', owner:'QA Pod', age:'2d', priority:'P2' }
    ]
  },
  'BioGen Labs': {
    sprint: 12, day: 7, total: 10, pct: 52, committed: 28, done: 14, blockers: 5,
    alert: { kind:'red', html: '<strong>Critical:</strong> 5 active blockers · Phase 1/2 scope conflict · stakeholder turnover. UAT data missing from Phase 1 (9 days unupdated).' },
    stages: [
      { name:'Discovery', dates:'Done · Feb', status:'done', salient:'6 user stories scoped' },
      { name:'Design',    dates:'Done · Mar', status:'done', salient:'8 wireframes · data model approved' },
      { name:'Dev',       dates:'52%', status:'late', salient:'14 stories · 18 bugs · 5 blocked', note:'5 stories blocked. Behind schedule.', noteCls:'late-note' },
      { name:'QA',        dates:'Pending', status:'todo', salient:'24 test cases planned' },
      { name:'UAT',       dates:'Slipped — Phase 2 conflict', status:'late', salient:'Phase 1 UAT data missing', noteCls:'late-note', note:'CIO alignment meeting needed' },
      { name:'Deploy',    dates:'TBD', status:'todo' }
    ],
    stories: [
      { id:'NLS-1201', title:'Sample manifest API', status:'Done', owner:'D. Patel' },
      { id:'NLS-1202', title:'Batch upload validation', status:'Done', owner:'D. Patel' },
      { id:'NLS-1203', title:'Reports — sample type filter', status:'In progress', owner:'E. Singh' },
      { id:'NLS-1204', title:'Audit log queue worker', status:'In progress', owner:'F. Nair' },
      { id:'NLS-1205', title:'PII redaction module', status:'Blocked', owner:'G. Sen' },
      { id:'NLS-1206', title:'Phase 2 data model', status:'Blocked', owner:'D. Patel' },
      { id:'NLS-1207', title:'Test env capacity scale', status:'Blocked', owner:'DevOps' },
      { id:'NLS-1208', title:'Stakeholder dashboard alpha', status:'Blocked', owner:'F. Nair' }
    ],
    blockers: [
      { name:'UAT data missing from Phase 1', owner:'BioGen Data Team', age:'9d', priority:'P1' },
      { name:'API contract change unannounced', owner:'BioGen CTO', age:'6d', priority:'P1' },
      { name:'Test env at capacity', owner:'DevOps', age:'4d', priority:'P2' },
      { name:'Backlog grooming pending', owner:'PM', age:'5d', priority:'P2' },
      { name:'Spec ambiguity (3 stories)', owner:'BA', age:'2d', priority:'P2' }
    ]
  },
  'HealthFirst Inc': {
    sprint: 24, day: 5, total: 10, pct: 92, committed: 22, done: 20, blockers: 0,
    alert: { kind:'green', html: '<strong>On Track:</strong> Sprint at 92% completion. Zero active blockers. UAT window confirmed for May 18-25.' },
    stages: [
      { name:'Discovery', dates:'Done', status:'done', salient:'10 user stories · 6 SMEs' },
      { name:'Design',    dates:'Done', status:'done', salient:'14 wireframes · UX review passed' },
      { name:'Dev',       dates:'92%', status:'active', salient:'20 stories delivered · 9 bugs · 6 PRs' },
      { name:'QA',        dates:'In progress · Started May 4', status:'active', salient:'22 cases · 18 passed · 0 critical defects' },
      { name:'UAT',       dates:'Planned May 18-25', status:'todo', salient:'18 UAT scenarios' },
      { name:'Deploy',    dates:'Planned Jun 1', status:'todo', salient:'Rolling deployment · 6 services' }
    ],
    stories: [
      { id:'NLS-2401', title:'Provider search rebuild', status:'Done', owner:'Vikram J.' },
      { id:'NLS-2402', title:'Insurance claim form v2', status:'Done', owner:'Maya R.' },
      { id:'NLS-2403', title:'Doc upload — chunked', status:'Done', owner:'Vikram J.' },
      { id:'NLS-2404', title:'Patient portal redesign', status:'In progress', owner:'Maya R.' }
    ],
    blockers: []
  },
  'PharmCare': {
    sprint: 9, day: 8, total: 10, pct: 70, committed: 26, done: 18, blockers: 3,
    alert: { kind:'amber', html: '<strong>Watch:</strong> Sprint at 70% · UI design review pending · code review backlog.' },
    stages: [
      { name:'Discovery', dates:'Done', status:'done' },
      { name:'Design',    dates:'Done', status:'done' },
      { name:'Dev',       dates:'70%', status:'active', note:'Watch — 3 blockers' },
      { name:'QA',        dates:'Pending May 10', status:'todo' },
      { name:'UAT',       dates:'Planned May 18-22', status:'todo' },
      { name:'Deploy',    dates:'Planned May 30', status:'todo' }
    ],
    stories: [
      { id:'NLS-0901', title:'Inventory tracker', status:'Done', owner:'Arjun N.' },
      { id:'NLS-0902', title:'Prescription validator', status:'Done', owner:'Suresh K.' },
      { id:'NLS-0903', title:'Vendor sync API', status:'In progress', owner:'Arjun N.' },
      { id:'NLS-0904', title:'QA backlog cleanup', status:'In progress', owner:'Divya L.' }
    ],
    blockers: [
      { name:'UI design review pending', owner:'UX Team', age:'3d', priority:'P2' },
      { name:'Code review backlog', owner:'Tech Lead', age:'2d', priority:'P2' },
      { name:'Analytics setup', owner:'Data Eng', age:'1d', priority:'P3' }
    ]
  }
};

function openProjectSprint(name) {
  const d = SPRINTS[name];
  if (!d) return;
  window._sprintActive = { name, tab: 'committed' };
  const headerHtml = `
    <div class="fly-alert ${d.alert.kind}">${d.alert.html}</div>
    ${sdlcVertical(d.stages)}
    <div class="fly-tabs">
      <div class="fly-tab tab-committed active" onclick="filterSprintTab('committed', this)">Committed (${d.committed})</div>
      <div class="fly-tab tab-completed" onclick="filterSprintTab('completed', this)">Completed (${d.done})</div>
      <div class="fly-tab tab-blockers" onclick="filterSprintTab('blockers', this)">Blockers (${d.blockers.length})</div>
    </div>
  `;
  openFlyoutPinned({
    title: name,
    sub: `Sprint ${d.sprint} · Day ${d.day} of ${d.total} · ${d.pct}% complete`,
    pinned: headerHtml,
    body: renderSprintBody('committed')
  });
}
function renderSprintBody(tab) {
  const cur = window._sprintActive; if (!cur) return '';
  const d = SPRINTS[cur.name];
  if (tab === 'blockers') {
    if (!d.blockers.length) return '<div class="fly-insight"><strong>Clean sprint:</strong> No active blockers.</div>';
    return `<table class="g-tbl"><thead><tr><th>Blocker</th><th>Owner</th><th>Priority</th><th>Age</th></tr></thead><tbody>
    ${d.blockers.map(b => `<tr><td>${b.name}</td><td>${b.owner}</td><td><span class="g-tag ${b.priority==='P1'?'red':(b.priority==='P2'?'amber':'green')}">${b.priority}</span></td><td>${b.age}</td></tr>`).join('')}
    </tbody></table>`;
  }
  let stories = d.stories;
  if (tab === 'completed') stories = stories.filter(s => s.status === 'Done');
  return `<table class="g-tbl"><thead><tr><th>ID</th><th>Title</th><th>Status</th><th>Owner</th></tr></thead><tbody>
  ${stories.map(s => `<tr><td>${s.id}</td><td style="text-align:left;">${s.title}</td><td><span class="g-tag ${s.status==='Done'?'green':(s.status==='Blocked'?'red':'amber')}">${s.status}</span></td><td>${s.owner}</td></tr>`).join('')}
  </tbody></table>`;
}
window.filterSprintTab = function(tab, el) {
  if (window._sprintActive) window._sprintActive.tab = tab;
  document.querySelectorAll('.fly-tab').forEach(x => x.classList.remove('active'));
  el.classList.add('active');
  swapFlyoutBody(renderSprintBody(tab));
};

// === Sprint Health top-level flyout ===
function openSprintHealthFlyout() {
  openFlyoutPinned({
    title: 'Sprint Health · DM Unit',
    sub: 'Avg 78% · 4 active sprints',
    pinned: `<div class="fly-alert amber"><strong>Watch:</strong> BioGen at 52% pulling unit average down. MedTech blockers also impacting velocity.</div>
    <div class="fly-tabs">
      <div class="fly-tab active">All Sprints</div>
    </div>`,
    body: `<table class="g-tbl"><thead><tr><th>Project</th><th>Sprint</th><th>%</th><th>Committed</th><th>Done</th><th>Blockers</th></tr></thead><tbody>
    <tr onclick="closeFlyout(); openProjectSprint('MedTech Corp');"><td>MedTech Corp</td><td>S18</td><td><span class="g-tag amber">78%</span></td><td>24</td><td>19</td><td>2</td></tr>
    <tr onclick="closeFlyout(); openProjectSprint('BioGen Labs');"><td>BioGen Labs</td><td>S12</td><td><span class="g-tag red">52%</span></td><td>28</td><td>14</td><td>5</td></tr>
    <tr onclick="closeFlyout(); openProjectSprint('HealthFirst Inc');"><td>HealthFirst Inc</td><td>S24</td><td><span class="g-tag green">92%</span></td><td>22</td><td>20</td><td>0</td></tr>
    <tr onclick="closeFlyout(); openProjectSprint('PharmCare');"><td>PharmCare</td><td>S09</td><td><span class="g-tag amber">70%</span></td><td>26</td><td>18</td><td>3</td></tr>
    </tbody></table>`
  });
}

// === Active Blockers — grouped by project, expandable ===
function openBlockersList() {
  openFlyoutPinned({
    title: 'Active Blockers · DM Unit',
    sub: '12 across 4 projects · grouped by project',
    pinned: `<div class="fly-alert red"><strong>3 critical blockers</strong> need immediate attention. BioGen has 2 — escalate to client CTO today.</div>`,
    body: renderBlockerBody('all')
  });
}
function renderBlockerBody(filter) {
  // Flat: project · count of blockers · top blockers as comma list
  const groups = [
    { proj:'BioGen Labs', items:5, list:'UAT data missing · API contract change · Test env capacity · Backlog grooming · Spec ambiguity' },
    { proj:'MedTech Corp', items:4, list:'Perf regression · Spec ambiguity · Client API spec · KT slot' },
    { proj:'PharmCare', items:3, list:'UI design review · Code review backlog · Analytics setup' },
    { proj:'HealthFirst Inc', items:1, list:'Doc translation' }
  ];
  let html = '<table class="g-tbl"><thead><tr><th>Project</th><th>Blockers</th><th>Top Items</th></tr></thead><tbody>';
  groups.forEach(g => {
    html += `<tr><td><strong>${g.proj}</strong></td><td><span class="g-tag ${g.items >= 4 ? 'red' : (g.items >= 2 ? 'amber' : 'green')}">${g.items}</span></td><td style="text-align:left;font-size:11px;">${g.list}</td></tr>`;
  });
  html += '</tbody></table>';
  return html;
}

// === Velocity — line chart ===
function openVelocityFlyout() {
  openFlyoutPinned({
    title: 'Velocity per Account · Past 3 + Current',
    sub: 'Story points: committed / completed · Current sprint highlighted',
    pinned: `<div class="fly-insight"><strong>Summary:</strong> Unit avg 82 SP/sprint stable through N-1. Current sprint dipped: BioGen velocity collapsed due to blockers.</div>`,
    body: `<table class="g-tbl"><thead><tr><th>Account</th><th>N-3 (S15)</th><th>N-2 (S16)</th><th>N-1 (S17)</th><th style="background:var(--orange);color:#fff !important;">Current (S18)</th><th>Trend</th></tr></thead><tbody>
    <tr><td><strong>MedTech Corp</strong></td><td>22 / 20</td><td>24 / 22</td><td>24 / 22</td><td style="background:rgba(255,153,51,0.10);font-weight:700;">24 / 19</td><td><span class="g-tag amber">↓</span></td></tr>
    <tr><td><strong>HealthFirst Inc</strong></td><td>20 / 19</td><td>22 / 21</td><td>22 / 22</td><td style="background:rgba(255,153,51,0.10);font-weight:700;">22 / 20</td><td><span class="g-tag green">=</span></td></tr>
    <tr><td><strong>BioGen Labs</strong></td><td>26 / 22</td><td>28 / 24</td><td>28 / 22</td><td style="background:rgba(255,153,51,0.10);font-weight:700;">28 / 14</td><td><span class="g-tag red">↓</span></td></tr>
    <tr><td><strong>PharmCare</strong></td><td>22 / 20</td><td>24 / 22</td><td>26 / 22</td><td style="background:rgba(255,153,51,0.10);font-weight:700;">26 / 18</td><td><span class="g-tag amber">↓</span></td></tr>
    <tr style="background:var(--bg);font-weight:700;"><td>Unit Total</td><td>90 / 81</td><td>98 / 89</td><td>100 / 88</td><td style="background:rgba(255,153,51,0.18);font-weight:800;">100 / 71</td><td><span class="g-tag amber">↓</span></td></tr>
    </tbody></table>
    <div class="fly-insight" style="margin-top:14px;"><strong>Insight:</strong> Current sprint dip largely from BioGen (-8 SP). Unit aggregate chart on the home page shows the trend.</div>`
  });
}

// === Story Carryover — historical sprint x account ===
function openCarryoverFlyout() {
  openFlyoutPinned({
    title: 'Story Carryover · 18% · Last 4 Sprints',
    sub: 'Per-account · sprint-on-sprint',
    pinned: `<div class="fly-alert amber"><strong>Watch:</strong> Carryover trending up — driver: BioGen 2x in last 2 sprints.</div>
    <div id="carrChart" style="height:200px;"></div>`,
    body: `<table class="g-tbl"><thead><tr><th>Account</th><th>S15</th><th>S16</th><th>S17</th><th>S18</th><th>Trend</th></tr></thead><tbody>
    <tr><td>BioGen Labs</td><td>4</td><td>5</td><td>6</td><td>6</td><td><span class="g-tag red">↑</span></td></tr>
    <tr><td>MedTech Corp</td><td>2</td><td>3</td><td>3</td><td>4</td><td><span class="g-tag amber">↑</span></td></tr>
    <tr><td>PharmCare</td><td>1</td><td>2</td><td>3</td><td>3</td><td><span class="g-tag amber">=</span></td></tr>
    <tr><td>HealthFirst Inc</td><td>2</td><td>1</td><td>1</td><td>1</td><td><span class="g-tag green">↓</span></td></tr>
    </tbody></table>
    <div class="fly-insight"><strong>Insight:</strong> BioGen consistently drags carryover up due to scope ambiguity. Recommend backlog grooming session and stakeholder alignment.</div>`
  });
  setTimeout(() => {
    const el = document.getElementById('carrChart'); if (!el) return;
    echarts.init(el).setOption({
      grid: { left: 40, right: 20, top: 20, bottom: 30 },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['S15','S16','S17','S18'] },
      yAxis: { type: 'value', name: 'Stories carried' },
      series: [
        { name: 'BioGen', type: 'line', data: [4,5,6,6], lineStyle: { color: '#DC2626', width: 2 }, symbol: 'circle' },
        { name: 'MedTech', type: 'line', data: [2,3,3,4], lineStyle: { color: '#FF9933', width: 2 }, symbol: 'circle' },
        { name: 'PharmCare', type: 'line', data: [1,2,3,3], lineStyle: { color: '#F59E0B', width: 2 }, symbol: 'circle' },
        { name: 'HealthFirst', type: 'line', data: [2,1,1,1], lineStyle: { color: '#16A34A', width: 2 }, symbol: 'circle' }
      ],
      legend: { top: 6, right: 10, textStyle: { fontSize: 9 } }
    });
  }, 80);
}

// === FINANCIALS ===
function openYTDBilling() {
  openFlyoutPinned({
    title: 'YTD Billing · DM Unit',
    sub: '$5.0M · 96% of plan',
    pinned: `<div class="fly-alert amber"><strong>Watch:</strong> Unit tracking 96% of plan. Driver: BioGen scope cut Apr 14 ($0.22M shortfall).</div>
    <div class="dm-ribbon-stats-rich" style="background:#0F2449;color:#fff;padding:14px;border-radius:8px;justify-content:center;margin-bottom:14px;">
      <div class="dm-ribbon-stat"><div class="dm-ribbon-stat-val">$5.2M</div><div class="dm-ribbon-stat-lbl">YTD Plan</div></div>
      <div class="dm-ribbon-pipe"></div>
      <div class="dm-ribbon-stat"><div class="dm-ribbon-stat-val amber">$5.0M</div><div class="dm-ribbon-stat-lbl">YTD Actual</div></div>
      <div class="dm-ribbon-pipe"></div>
      <div class="dm-ribbon-stat"><div class="dm-ribbon-stat-val red">-$0.2M</div><div class="dm-ribbon-stat-lbl">Variance</div></div>
    </div>`,
    body: `<table class="g-tbl"><thead><tr><th>Account</th><th>YTD Plan</th><th>YTD Actual</th><th>%</th><th>Full-year Δ</th></tr></thead><tbody>
    <tr><td>MedTech Corp</td><td>$1.56M</td><td>$1.44M</td><td><span class="g-tag amber">92%</span></td><td>-$0.12M</td></tr>
    <tr><td>HealthFirst Inc</td><td>$1.20M</td><td>$1.25M</td><td><span class="g-tag green">104%</span></td><td>+$0.05M</td></tr>
    <tr><td>BioGen Labs</td><td>$1.20M</td><td>$0.98M</td><td><span class="g-tag red">82%</span></td><td>-$0.22M</td></tr>
    <tr><td>PharmCare</td><td>$1.32M</td><td>$1.37M</td><td><span class="g-tag green">104%</span></td><td>+$0.05M</td></tr>
    </tbody></table>`
  });
}
function openMOutlook(m) {
  const data = { 'M+1': '$0.50M', 'M+2': '$0.55M', 'M+3': '$0.58M' };
  openFlyout({title: m + ' Forecast', sub: data[m] + ' across 4 accounts', body: `<table class="g-tbl"><thead><tr><th>Account</th><th>${m}</th><th>Confidence</th></tr></thead><tbody><tr><td>MedTech Corp</td><td>$0.14M</td><td><span class="g-tag green">95%</span></td></tr><tr><td>HealthFirst Inc</td><td>$0.12M</td><td><span class="g-tag green">92%</span></td></tr><tr><td>BioGen Labs</td><td>$0.10M</td><td><span class="g-tag amber">68%</span></td></tr><tr><td>PharmCare</td><td>$0.14M</td><td><span class="g-tag green">88%</span></td></tr></tbody></table>`});
}
function openAccountBilling(acct) {
  const data = {
    'MedTech Corp':    { plan:'$1.56M', actual:'$1.44M', varDollar:'-$0.12M', varClass:'red', m1:'$0.14M', m2:'$0.16M', m3:'$0.16M', risk:'Scope reduction Apr 14', months:[
      ['Dec','$0.13M','$0.13M','+$0.00M','green'],['Jan','$0.14M','$0.14M','+$0.00M','green'],['Feb','$0.14M','$0.13M','-$0.01M','amber'],['Mar','$0.13M','$0.13M','+$0.00M','green'],['Apr','$0.13M','$0.12M','-$0.01M','amber'],['May (MTD)','$0.13M','$0.04M','—','grey']
    ]},
    'HealthFirst Inc': { plan:'$1.20M', actual:'$1.25M', varDollar:'+$0.05M', varClass:'green', m1:'$0.12M', m2:'$0.13M', m3:'$0.13M', risk:'Healthy · slight overshoot', months:[
      ['Dec','$0.10M','$0.11M','+$0.01M','green'],['Jan','$0.10M','$0.10M','+$0.00M','green'],['Feb','$0.10M','$0.11M','+$0.01M','green'],['Mar','$0.10M','$0.10M','+$0.00M','green'],['Apr','$0.10M','$0.10M','+$0.00M','green'],['May (MTD)','$0.10M','$0.03M','—','grey']
    ]},
    'BioGen Labs':     { plan:'$1.20M', actual:'$0.98M', varDollar:'-$0.22M', varClass:'red', m1:'$0.10M', m2:'$0.12M', m3:'$0.13M', risk:'Phase 2 stuck · key risk', months:[
      ['Dec','$0.10M','$0.10M','+$0.00M','green'],['Jan','$0.10M','$0.10M','+$0.00M','green'],['Feb','$0.10M','$0.09M','-$0.01M','amber'],['Mar','$0.10M','$0.09M','-$0.01M','amber'],['Apr','$0.10M','$0.07M','-$0.03M','red'],['May (MTD)','$0.10M','$0.02M','—','grey']
    ]},
    'PharmCare':       { plan:'$1.32M', actual:'$1.37M', varDollar:'+$0.05M', varClass:'green', m1:'$0.14M', m2:'$0.14M', m3:'$0.15M', risk:'Add-on hires drove overrun', months:[
      ['Dec','$0.11M','$0.12M','+$0.01M','green'],['Jan','$0.11M','$0.11M','+$0.00M','green'],['Feb','$0.11M','$0.12M','+$0.01M','green'],['Mar','$0.11M','$0.12M','+$0.01M','green'],['Apr','$0.11M','$0.11M','+$0.00M','green'],['May (MTD)','$0.11M','$0.03M','—','grey']
    ]}
  };
  const d = data[acct];
  openFlyoutPinned({
    title: acct + ' · Billing',
    sub: 'YTD + 3-month forward outlook',
    pinned: `<div class="fly-alert ${d.varClass==='red'?'red':(d.varClass==='amber'?'amber':'green')}">${d.risk}</div>
    <div class="g-stat-row" style="margin-bottom:6px;">
      <div class="g-stat"><div class="g-stat-label">YTD Plan</div><div class="g-stat-val">${d.plan}</div></div>
      <div class="g-stat"><div class="g-stat-label">YTD Actual</div><div class="g-stat-val">${d.actual}</div></div>
      <div class="g-stat"><div class="g-stat-label">Variance</div><div class="g-stat-val ${d.varClass}">${d.varDollar}</div></div>
    </div>
    <div class="combined-tile" style="margin-bottom:14px;">
      <div class="combined-tile-cell"><div class="combined-tile-lbl">M+1</div><div class="combined-tile-val">${d.m1}</div></div>
      <div class="combined-tile-cell"><div class="combined-tile-lbl">M+2</div><div class="combined-tile-val">${d.m2}</div></div>
      <div class="combined-tile-cell"><div class="combined-tile-lbl">M+3</div><div class="combined-tile-val">${d.m3}</div></div>
    </div>`,
    body: `<table class="g-tbl"><thead><tr><th>Month</th><th>Target</th><th>Actual</th><th>Variance</th></tr></thead><tbody>
    ${d.months.map(m => `<tr><td>${m[0]}</td><td>${m[1]}</td><td>${m[2]}</td><td><span style="color:${m[4]==='red'?'#DC2626':(m[4]==='amber'?'#F59E0B':(m[4]==='green'?'#16A34A':'#94A3B8'))};font-weight:700;">${m[3]}</span></td></tr>`).join('')}
    </tbody></table>`
  });
}

// === MINING & ESCALATIONS — v1 escalation flyout ===
const MINING_DETAIL = {
  'MedTech Corp · Module Demo':     { value:'$0.25M', stage:'Demo Scheduled', acct:'MedTech Corp', mgr:'Vikram S.', stakeholder:'VP Engineering', status:'on track', delays:'None — on schedule', whatDone:['Apr 15 · Initial scope confirmed','Apr 22 · Architecture review with CTO','Apr 28 · Demo conducted with VP Eng','May 5 · Procurement looped in'], next:'Send Phase 2 proposal by May 12 · Loop in client procurement' },
  'HealthFirst · DR Setup':         { value:'$0.10M', stage:'SOW Review', acct:'HealthFirst', mgr:'Anita M.', stakeholder:'CIO', status:'on track', delays:'None', whatDone:['Apr 18 · Discovery call','Apr 25 · Architecture proposed','May 2 · SOW draft sent'], next:'SOW review with InfoSec · May 10' },
  'BioGen · Phase 2':               { value:'$0.17M', stage:'Stalled', acct:'BioGen Labs', mgr:'Karthik R.', stakeholder:'CIO (replaced)', status:'at risk', delays:'2 weeks · stakeholder turnover', whatDone:['Mar 28 · Phase 2 scope agreed','Apr 12 · CIO transition announced','Apr 26 · CIO sync canceled'], next:'CIO alignment meeting · push to Q3' },
  'HealthFirst · Mobile App':       { value:'$0.12M', stage:'Roadmap conflict', acct:'HealthFirst', mgr:'Anita M.', stakeholder:'Product Head', status:'at risk', delays:'1 week · roadmap conflict', whatDone:['Apr 8 · Initial scope','Apr 22 · Roadmap conflict surfaced'], next:'Alignment meeting with Product Head' },
  'PharmCare · Analytics POC':      { value:'$0.07M', stage:'Late', acct:'PharmCare', mgr:'Vikram S.', stakeholder:'Data Lead', status:'late', delays:'3 weeks · POC reset', whatDone:['Mar 14 · POC scoped','Apr 5 · Data access pending'], next:'POC reset for May 20' },
  'BioGen · BI Dashboard':          { value:'$0.06M', stage:'Spec stalled', acct:'BioGen Labs', mgr:'Karthik R.', stakeholder:'BI Manager', status:'late', delays:'2 weeks · spec stalled', whatDone:['Apr 2 · Initial requirement gathering','Apr 18 · Spec questions raised'], next:'Spec resolution by May 14' },
  'PharmCare · UAT Phase 2':        { value:'$0.06M', stage:'On Track', acct:'PharmCare', mgr:'Vikram S.', stakeholder:'QA Head', status:'on track', delays:'None', whatDone:['Apr 28 · UAT scope confirmed'], next:'UAT kickoff May 18' },
  'MedTech · DevOps add-on':        { value:'$0.04M', stage:'On Track', acct:'MedTech Corp', mgr:'Vikram S.', stakeholder:'DevOps Lead', status:'on track', delays:'None', whatDone:['May 1 · Add-on SOW drafted'], next:'SOW signature by May 9' }
};
function openMiningThread(t) {
  const d = MINING_DETAIL[t] || {};
  const statusClr = d.status === 'on track' ? 'green' : (d.status === 'at risk' ? 'amber' : 'red');
  openFlyoutPinned({
    title: t,
    sub: (d.acct || '') + ' · ' + (d.value || '') + ' · ' + (d.stage || ''),
    pinned: `<div class="fly-alert ${statusClr}">${d.delays || 'No delays'}</div>
    <div class="g-stat-row">
      <div class="g-stat"><div class="g-stat-label">Value</div><div class="g-stat-val">${d.value || '—'}</div></div>
      <div class="g-stat"><div class="g-stat-label">Manager</div><div class="g-stat-val" style="font-size:13px;">${d.mgr || '—'}</div></div>
      <div class="g-stat"><div class="g-stat-label">Stakeholder</div><div class="g-stat-val" style="font-size:13px;">${d.stakeholder || '—'}</div></div>
    </div>`,
    body: `
    <div class="fly-section"><div class="fly-section-head"><span>What got done</span><span class="count">${(d.whatDone||[]).length}</span></div>
    ${(d.whatDone||[]).map(w => `<div style="padding:6px 8px;background:var(--bg);border-left:3px solid var(--green);border-radius:4px;margin-bottom:5px;font-size:11px;color:var(--text);">${w}</div>`).join('')}
    </div>
    <div class="fly-section"><div class="fly-section-head">Next Action</div>
    <div style="padding:10px 12px;background:rgba(255,153,51,0.08);border-left:3px solid var(--orange);border-radius:4px;font-size:12px;color:var(--text);">${d.next || '—'}</div>
    </div>`
  });
}
const ESC = {
  'MedTech UAT Slip': { sev: 'Critical', age:'14d unupdated', driver:'UAT window slipped 2 weeks', last:'Apr 22 — Steering call with VP', action:'Align UAT window by May 8', owner:'John Doe', timeline:[
    'Apr 8 — UAT scheduled May 5-16',
    'Apr 14 — Scope reduction agreed (-15% effort)',
    'Apr 22 — Client raised concern via VP',
    'Apr 28 — Steering call held, no resolution',
    'May 5 — Today · escalation overdue'
  ]},
  'BioGen Scope Conflict': { sev:'Critical', age:'9d', driver:'Phase 1/2 scope conflict', last:'Apr 26 — CIO sync canceled', action:'CIO alignment meeting', owner:'John Doe', timeline:[
    'Apr 12 — Phase 2 spec received',
    'Apr 18 — Conflicts identified',
    'Apr 26 — CIO sync canceled by client',
    'May 5 — No resolution path yet'
  ]},
  'PharmCare QA': { sev:'High', age:'5d', driver:'3 regressions in UAT', last:'May 2 — Fix sprint planned', action:'Run regression suite May 9', owner:'John Doe', timeline:['Apr 28 — Regressions surfaced','May 2 — Fix sprint scoped','May 5 — In progress'] },
  'HealthFirst Capacity': { sev:'High', age:'11d', driver:'2 senior exits · capacity gap', last:'Apr 24 — Backfill plan', action:'Onboard 2 senior hires by May 20', owner:'John Doe', timeline:['Apr 14 — Two senior exits notified','Apr 24 — Backfill plan signed','May 5 — 1 hire onboarded'] },
  'MedTech Perf': { sev:'High', age:'3d', driver:'18% latency increase post-deploy', last:'May 2 — Monitoring configured', action:'Hotfix deploy May 7', owner:'John Doe', timeline:['May 1 — Latency spike noticed','May 2 — Monitoring set up','May 5 — Root cause analysis ongoing'] },
  'BioGen Test Env': { sev:'High', age:'4d', driver:'Test env at capacity', last:'May 1 — DevOps capacity request', action:'Scale env by May 6', owner:'John Doe', timeline:['Apr 28 — Capacity hit','May 1 — Request raised','May 5 — Scaling in progress'] },
  'PharmCare Backlog': { sev:'High', age:'5d', driver:'PM bandwidth · backlog grooming', last:'May 3 — Replan with client PM', action:'Weekly grooming session', owner:'John Doe', timeline:['Apr 25 — Backlog overflow','May 3 — Replan scheduled','May 5 — Weekly cadence pending'] }
};
function openEscalation(t) {
  const d = ESC[t] || {};
  const sevClr = d.sev === 'Critical' ? 'red' : 'amber';
  openFlyoutPinned({
    title: t,
    sub: (d.sev || 'Escalation') + ' · ' + (d.age || '') + ' · Owner: ' + (d.owner || 'DM'),
    pinned: `<div class="fly-alert ${sevClr}"><strong>${d.sev}:</strong> ${d.driver}</div>
    <div class="g-stat-row">
      <div class="g-stat"><div class="g-stat-label">Severity</div><div class="g-stat-val ${sevClr}">${d.sev || '—'}</div></div>
      <div class="g-stat"><div class="g-stat-label">Age</div><div class="g-stat-val">${d.age || '—'}</div></div>
      <div class="g-stat"><div class="g-stat-label">Owner</div><div class="g-stat-val" style="font-size:13px;">${d.owner || '—'}</div></div>
    </div>`,
    body: `
    <div class="fly-section"><div class="fly-section-head">Last Update</div>
    <div style="padding:10px 12px;background:var(--bg);border-left:3px solid var(--blue);border-radius:4px;font-size:12px;color:var(--text);">${d.last || '—'}</div>
    </div>
    <div class="fly-section"><div class="fly-section-head">Next Action</div>
    <div style="padding:10px 12px;background:rgba(255,153,51,0.08);border-left:3px solid var(--orange);border-radius:4px;font-size:12px;color:var(--text);">${d.action || '—'}</div>
    </div>
    <div class="fly-section"><div class="fly-section-head"><span>Timeline</span><span class="count">${(d.timeline||[]).length}</span></div>
    ${(d.timeline||[]).map((l,i) => {
      const isLast = i === (d.timeline.length - 1);
      const clr = isLast ? 'var(--red)' : (i === 0 ? 'var(--green)' : 'var(--text-muted)');
      return `<div style="padding:8px 10px;background:var(--bg);border-left:3px solid ${clr};border-radius:4px;margin-bottom:5px;font-size:11px;color:var(--text);">${l}</div>`;
    }).join('')}
    </div>`
  });
}

function openCriticalEscal() {
  openFlyoutPinned({title:'Critical Escalations · 2 open',sub:'Both > 7 days unupdated',
    pinned:`<div class="fly-alert red"><strong>Action overdue:</strong> 2 critical escalations need immediate update.</div>`,
    body:`<table class="g-tbl"><thead><tr><th>Escalation</th><th>Account</th><th>Age</th><th>Status</th></tr></thead><tbody>
    <tr onclick="closeFlyout(); openEscalation('MedTech UAT Slip');"><td style="text-align:left;">UAT Window Slip</td><td>MedTech</td><td>14d</td><td><span class="g-tag red">Action overdue</span></td></tr>
    <tr onclick="closeFlyout(); openEscalation('BioGen Scope Conflict');"><td style="text-align:left;">Phase 2 Scope Conflict</td><td>BioGen</td><td>9d</td><td><span class="g-tag red">CIO alignment</span></td></tr>
    </tbody></table>`});
}
function openHighEscal() {
  openFlyout({title:'High-severity Escalations · 5 open',sub:'3 accounts impacted',
    body:`<table class="g-tbl"><thead><tr><th>Escalation</th><th>Account</th><th>Age</th></tr></thead><tbody>
    <tr onclick="closeFlyout(); openEscalation('PharmCare QA');"><td style="text-align:left;">QA Regression</td><td>PharmCare</td><td>5d</td></tr>
    <tr onclick="closeFlyout(); openEscalation('HealthFirst Capacity');"><td style="text-align:left;">Capacity Gap</td><td>HealthFirst</td><td>11d</td></tr>
    <tr onclick="closeFlyout(); openEscalation('MedTech Perf');"><td style="text-align:left;">Perf Regression</td><td>MedTech</td><td>3d</td></tr>
    <tr onclick="closeFlyout(); openEscalation('BioGen Test Env');"><td style="text-align:left;">Test Env Capacity</td><td>BioGen</td><td>4d</td></tr>
    <tr onclick="closeFlyout(); openEscalation('PharmCare Backlog');"><td style="text-align:left;">Backlog Grooming</td><td>PharmCare</td><td>5d</td></tr>
    </tbody></table>`});
}
function openMiningValue() {
  openFlyout({title:'Mining Pipeline Value · $0.74M', sub:'8 active expansion threads',
    body:`<table class="g-tbl"><thead><tr><th>Account</th><th>Thread</th><th>Value</th><th>Status</th></tr></thead><tbody>
    <tr><td>MedTech Corp</td><td>Module Demo</td><td>$0.25M</td><td><span class="g-tag green">On Track</span></td></tr>
    <tr><td>BioGen Labs</td><td>Phase 2</td><td>$0.17M</td><td><span class="g-tag amber">At Risk</span></td></tr>
    <tr><td>HealthFirst</td><td>DR Setup</td><td>$0.10M</td><td><span class="g-tag green">On Track</span></td></tr>
    <tr><td>HealthFirst</td><td>Mobile App</td><td>$0.12M</td><td><span class="g-tag amber">At Risk</span></td></tr>
    <tr><td>PharmCare</td><td>Analytics POC</td><td>$0.07M</td><td><span class="g-tag red">Late</span></td></tr>
    <tr><td>BioGen</td><td>BI Dashboard</td><td>$0.06M</td><td><span class="g-tag red">Late</span></td></tr>
    </tbody></table>`});
}

// === P360 ===
function openP360Avg() {
  openFlyoutPinned({title:'P360 Average · DM Unit',sub:'7.1 / 10 · ↓0.3 MoM',
    pinned:`<div class="fly-insight"><strong>Trend:</strong> Unit avg declined 0.3 from Apr to May. Driver: BioGen scope slip + MedTech UAT delay.</div>`,
    body:`<table class="g-tbl"><thead><tr><th>Project</th><th>M-3</th><th>M-2</th><th>M-1</th><th>Current</th><th>Trend</th></tr></thead><tbody>
    <tr><td>HealthFirst</td><td>8.2</td><td>8.4</td><td>8.5</td><td><strong>8.7</strong></td><td><span class="g-tag green">↑</span></td></tr>
    <tr><td>WellnessOne</td><td>7.8</td><td>8.0</td><td>8.1</td><td><strong>8.2</strong></td><td><span class="g-tag green">↑</span></td></tr>
    <tr><td>PharmCare</td><td>7.2</td><td>7.3</td><td>7.4</td><td><strong>7.4</strong></td><td><span class="g-tag amber">=</span></td></tr>
    <tr><td>NeuroLab</td><td>6.8</td><td>6.9</td><td>7.0</td><td><strong>7.0</strong></td><td><span class="g-tag amber">=</span></td></tr>
    <tr><td>MedTech</td><td>7.4</td><td>7.2</td><td>7.0</td><td><strong>6.8</strong></td><td><span class="g-tag amber">↓</span></td></tr>
    <tr><td>BioGen</td><td>6.4</td><td>6.0</td><td>5.8</td><td><strong>5.4</strong></td><td><span class="g-tag red">↓</span></td></tr>
    </tbody></table>`}); }
function openP360Reds() { openFlyout({title:'P360 Red Projects · 1 of 6',sub:'BioGen at 5.4',body:`
    <div class="fly-alert red"><strong>BioGen Labs:</strong> Communication 4.8 + Risk 5.0 driving low composite.</div>
    <div class="fly-section"><div class="fly-section-head">Action plan</div>
    <p style="font-size:12px;line-height:1.7;color:var(--text);">· Restore weekly cadence with stakeholders<br>· Reset risk register · weekly review<br>· CIO alignment on Phase 2 conflict</p></div>
    <div class="fly-section"><div class="fly-section-head">Team structure</div>
    <table class="g-tbl"><thead><tr><th>Role</th><th>Name</th><th>Allocation</th></tr></thead><tbody>
    <tr><td>Tech Lead</td><td>D. Patel</td><td>100%</td></tr>
    <tr><td>QA Lead</td><td>E. Singh</td><td>100%</td></tr>
    <tr><td>Devs (4)</td><td>F. Nair · G. Sen · H. Gupta · I. Reddy</td><td>100%</td></tr>
    <tr><td>BA</td><td>J. Khan</td><td>50%</td></tr>
    </tbody></table></div>
    <div class="fly-section"><div class="fly-section-head">Last sprint snapshot (S12)</div>
    <div class="g-stat-row"><div class="g-stat"><div class="g-stat-label">Committed</div><div class="g-stat-val">28 SP</div></div><div class="g-stat"><div class="g-stat-label">Delivered</div><div class="g-stat-val red">14 SP</div></div><div class="g-stat"><div class="g-stat-label">Blockers</div><div class="g-stat-val red">5</div></div></div>
    </div>`}); }
function openP360Best() { openFlyout({title:'Best Performing · HealthFirst at 8.7',sub:'Strengths',body:`
    <div class="fly-section"><div class="fly-section-head">Strengths</div>
    <p style="font-size:12px;color:var(--text);">Discipline 9.0 · Trust 9.2 · Communication 8.8</p></div>
    <div class="fly-section"><div class="fly-section-head">What works</div>
    <p style="font-size:12px;line-height:1.7;color:var(--text);">· Daily standups attended by client PM<br>· Code review SLA &lt; 12 hours<br>· Sprint demo every Wednesday with stakeholders</p></div>
    <div class="fly-section"><div class="fly-section-head">Team structure</div>
    <table class="g-tbl"><thead><tr><th>Role</th><th>Name</th><th>Allocation</th></tr></thead><tbody>
    <tr><td>Tech Lead</td><td>Vikram J.</td><td>100%</td></tr>
    <tr><td>Mobile Lead</td><td>Maya R.</td><td>100%</td></tr>
    <tr><td>Devs (5)</td><td>K. Rao · L. Mehta · M. Singh · N. Iyer · O. Pillai</td><td>100%</td></tr>
    <tr><td>QA</td><td>P. Banerjee</td><td>100%</td></tr>
    </tbody></table></div>
    <div class="fly-section"><div class="fly-section-head">Last sprint snapshot (S24)</div>
    <div class="g-stat-row"><div class="g-stat"><div class="g-stat-label">Committed</div><div class="g-stat-val">22 SP</div></div><div class="g-stat"><div class="g-stat-label">Delivered</div><div class="g-stat-val green">20 SP</div></div><div class="g-stat"><div class="g-stat-label">Blockers</div><div class="g-stat-val green">0</div></div></div>
    </div>`}); }
function openP360Trend() { openFlyout({title:'Trend Direction · Mixed',sub:'Across 6 projects',body:`
    <div class="fly-section"><div class="fly-section-head">Improving</div>
    <div class="fly-insight"><strong>HealthFirst Inc · ↑ +0.4</strong><br>Driver: Code review SLA tightened to 12h · Daily standup attendance by client PM · Wednesday demo cadence sticking</div>
    <div class="fly-insight"><strong>WellnessOne · ↑ +0.2</strong><br>Driver: Recent UAT clean pass · Stakeholder confidence rebuilt after Q1 issues</div>
    </div>
    <div class="fly-section"><div class="fly-section-head">Declining</div>
    <div class="fly-insight" style="background:rgba(220,38,38,0.06);border-left-color:#DC2626;"><strong>BioGen Labs · ↓ -0.6</strong><br>Driver: Stakeholder turnover (CIO replaced Apr 12) · Phase 2 scope conflict unresolved 9 days · 5 active blockers</div>
    <div class="fly-insight" style="background:rgba(220,38,38,0.06);border-left-color:#DC2626;"><strong>MedTech Corp · ↓ -0.3</strong><br>Driver: UAT slipped 2 weeks · Client VP escalated · Sprint velocity dipped to 78%</div>
    </div>
    <div class="fly-section"><div class="fly-section-head">Stable</div>
    <div style="font-size:12px;color:var(--text);padding:8px 12px;background:var(--bg);border-radius:6px;">PharmCare 7.4 · NeuroLab 7.0 — both stable around current values</div>
    </div>`}); }
function openP360(name, score, dims) {
  // Input dims order: [Competence, Discipline, Quality, Budget, Visibility]
  // Display order on chip row (per screenshot): Discipline, Quality, Budget, Visibility, Competence
  const dIn = (dims || []).slice(0, 5);
  while (dIn.length < 5) dIn.push(score);
  const [vC, vD, vQ, vB, vV] = dIn;

  function rag(v) { return v < 6 ? 'red' : (v < 7.5 ? 'amber' : 'green'); }
  function fmt(v) { return Number.isInteger(v) ? v.toString() : v.toFixed(1); }

  // Per-dimension breakdown — Jira/source metrics
  const DIM = {
    discipline: {
      label:'DISCIPLINE', val:vD, source:'Sprint velocity, ceremony adherence, story completion rate — Jira',
      metrics:[
        {label:'Sprint Velocity',       target:'>80%',  actual:'62%',  wt:'30%', state:'miss'},
        {label:'Story Completion Rate', target:'>85%',  actual:'58%',  wt:'25%', state:'miss'},
        {label:'Ceremony Adherence',    target:'>90%',  actual:'82%',  wt:'20%', state:'warn'},
        {label:'Story Point Accuracy',  target:'±15%',  actual:'±28%', wt:'25%', state:'miss'}
      ],
      trend:[6.1, 5.5, 4.8, vD], axis:['S14','S15','S16','S17']
    },
    quality: {
      label:'QUALITY', val:vQ, source:'Defect density, code review SLA, test coverage — Jira / Sonar',
      metrics:[
        {label:'Defect Density',  target:'<2/spr',  actual:'2.4',  wt:'30%', state:'miss'},
        {label:'Code Review SLA', target:'<12h',    actual:'18h',  wt:'25%', state:'miss'},
        {label:'Test Coverage',   target:'>80%',    actual:'72%',  wt:'25%', state:'warn'},
        {label:'Escaped Defects', target:'<1',      actual:'2',    wt:'20%', state:'miss'}
      ],
      trend:[6.4, 6.0, 5.8, vQ], axis:['S14','S15','S16','S17']
    },
    budget: {
      label:'BUDGET', val:vB, source:'CSV and COD — Billing + Jira → P360',
      metrics:[
        {label:'Cost-to-Schedule (CSV)', target:'<5%',  actual:'8%',  wt:'50%', state:'warn'},
        {label:'Cost of Delay (COD)',    target:'<10%', actual:'12%', wt:'50%', state:'warn'}
      ],
      trend:[7.2, 6.8, 6.4, vB], axis:['S14','S15','S16','S17']
    },
    visibility: {
      label:'VISIBILITY', val:vV, source:'Pitches, status cadence, NPS — AM input in P360',
      metrics:[
        {label:'Pitch Cadence',    target:'1/qtr',  actual:'1',     wt:'30%', state:'ok'},
        {label:'Status Reports',   target:'Weekly', actual:'Weekly', wt:'30%', state:'ok'},
        {label:'Stakeholder NPS',  target:'>7',     actual:'7.2',   wt:'40%', state:'ok'}
      ],
      trend:[6.0, 6.4, 6.2, vV], axis:['S14','S15','S16','S17']
    },
    competence: {
      label:'COMPETENCE', val:vC, source:'TSS scores and cert compliance — DM manual entry',
      metrics:[
        {label:'TSS Score',        target:'>7',   actual:'7.2', wt:'60%', state:'ok'},
        {label:'Cert Compliance',  target:'>80%', actual:'85%', wt:'40%', state:'ok'}
      ],
      trend:[6.6, 6.8, 7.0, vC], axis:['S14','S15','S16','S17']
    }
  };

  const order = ['discipline','quality','budget','visibility','competence'];

  // Chip row
  const chipsHtml = order.map((k, i) => {
    const dim = DIM[k];
    const r = rag(dim.val);
    return `<div class="p360-dim-chip ${r}${i===0?' active':''}" onclick="selectP360Dim('${k}', this)">
      <div class="p360-dim-chip-name">${dim.label}</div>
      <div class="p360-dim-chip-val">${fmt(dim.val)}</div>
    </div>`;
  }).join('');

  // Render breakdown for a dim
  function renderBreakdown(k) {
    const dim = DIM[k];
    const r = rag(dim.val);
    const metricRows = dim.metrics.map(m => {
      const actualCls = m.state==='miss'?'miss':(m.state==='warn'?'warn':'ok');
      return `<tr>
        <td><span class="row-dot ${m.state}"></span>${m.label}</td>
        <td>${m.target}</td>
        <td class="actual-cell ${actualCls}">${m.actual}</td>
        <td>${m.wt}</td>
      </tr>`;
    }).join('');
    const trendKind = (window._p360 && window._p360.trendKind) || 'bar';
    return `<div class="p360-bd-card">
      <div class="p360-bd-title">${dim.label} — Score Breakdown</div>
      <table class="p360-bd-tbl">
        <thead><tr><th>Metric (source)</th><th>Target</th><th>Actual</th><th>Wt.</th></tr></thead>
        <tbody>
          ${metricRows}
          <tr class="composite-row"><td>Composite Score</td><td></td><td class="actual-cell ${r==='red'?'miss':(r==='amber'?'warn':'ok')}">${fmt(dim.val)}</td><td></td></tr>
        </tbody>
      </table>
    </div>
    <div class="p360-trend">
      <div class="p360-trend-head">
        <div class="p360-trend-title">Score Trend — Last 4 Sprints</div>
        <div class="p360-trend-toggle">
          <button class="${trendKind==='bar'?'active':''}" onclick="setP360TrendKind('bar')" title="Bar chart"><i class="bi bi-bar-chart-fill"></i></button>
          <button class="${trendKind==='line'?'active':''}" onclick="setP360TrendKind('line')" title="Line chart"><i class="bi bi-graph-up"></i></button>
          <button class="${trendKind==='table'?'active':''}" onclick="setP360TrendKind('table')" title="Table view"><i class="bi bi-table"></i></button>
        </div>
      </div>
      ${renderTrend(dim, trendKind)}
      <div class="p360-trend-source">Source: ${dim.source}</div>
    </div>
    <div class="p360-hint">Click any dimension chip above for metric breakdown &amp; trend.</div>`;
  }

  function renderTrend(dim, kind) {
    if (kind === 'table') {
      const rows = dim.trend.map((v, i) => {
        const r2 = rag(v);
        return `<tr><td>${dim.axis[i]}</td><td class="actual-cell ${r2==='red'?'miss':(r2==='amber'?'warn':'ok')}">${fmt(v)}</td><td><span class="g-tag ${r2}">${r2.toUpperCase()}</span></td></tr>`;
      }).join('');
      return `<table class="p360-trend-table"><thead><tr><th>Sprint</th><th>Score</th><th>RAG</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
    if (kind === 'line') {
      const W = 460, H = 110, PAD_L = 30, PAD_R = 8, PAD_T = 14, PAD_B = 22;
      const innerW = W - PAD_L - PAD_R, innerH = H - PAD_T - PAD_B;
      const yFor = v => PAD_T + (1 - v/10) * innerH;
      const xFor = i => PAD_L + (i / (dim.trend.length - 1)) * innerW;
      const pts = dim.trend.map((v, i) => `${xFor(i)},${yFor(v)}`).join(' ');
      const dots = dim.trend.map((v, i) => `<circle cx="${xFor(i)}" cy="${yFor(v)}" r="3.5" fill="var(--blue)" /><text x="${xFor(i)}" y="${yFor(v)-8}" font-size="9" text-anchor="middle" fill="var(--text)">${fmt(v)}</text>`).join('');
      const xLabels = dim.axis.map((a, i) => `<text x="${xFor(i)}" y="${H-6}" font-size="9" text-anchor="middle" fill="var(--text-muted)">${a}</text>`).join('');
      const yLines = [0, 2.5, 5, 7.5, 10].map(v => `<line x1="${PAD_L}" y1="${yFor(v)}" x2="${W-PAD_R}" y2="${yFor(v)}" stroke="var(--border)" stroke-width="1" stroke-dasharray="2,3"/><text x="${PAD_L-4}" y="${yFor(v)+3}" font-size="9" text-anchor="end" fill="var(--text-muted)">${v}</text>`).join('');
      return `<svg class="p360-trend-svg" viewBox="0 0 ${W} ${H}">
        ${yLines}
        <polyline points="${pts}" fill="none" stroke="var(--blue)" stroke-width="2" stroke-linejoin="round"/>
        ${dots}
        ${xLabels}
      </svg>`;
    }
    // bar (default)
    const tMax = Math.max(...dim.trend, 10);
    const bars = dim.trend.map(v => {
      const r2 = rag(v);
      const h = Math.max(8, (v / tMax) * 100);
      return `<div class="p360-trend-bar ${r2}" style="height:${h}%;"><span class="p360-trend-val">${fmt(v)}</span></div>`;
    }).join('');
    const axis = dim.axis.map(a => `<div class="p360-trend-axis-tick">${a}</div>`).join('');
    return `<div class="p360-trend-chart">${bars}</div><div class="p360-trend-axis">${axis}</div>`;
  }

  // Observations (cards style — pre-table revert)
  const obsList = order.map(k => {
    const dim = DIM[k];
    const r = rag(dim.val);
    const note = r === 'red'
      ? `Below threshold (${fmt(dim.val)}). Targeted recovery needed in ${dim.metrics.filter(m=>m.state==='miss').length} metric(s).`
      : (r === 'amber' ? `Watch — score ${fmt(dim.val)}, drifting toward threshold.` : `Healthy — score ${fmt(dim.val)}.`);
    return `<div class="p360-tab-card obs"><strong>${dim.label}:</strong> ${note}</div>`;
  }).join('');
  const obsHtml = obsList;

  // Action Items (cards style — orange)
  const lowDim = order.reduce((a,b) => DIM[b].val < DIM[a].val ? b : a);
  const lowLabel = DIM[lowDim].label;
  const actions = [
    { id:'P360-001', desc:`Improve ${lowLabel} score: targeted recovery plan for next sprint`, owner:'John Doe', due:'Apr 21' },
    { id:'P360-002', desc:`DM to update ${lowLabel} score in P360 SharePoint after review`, owner:'John Doe', due:'Apr 28' },
    { id:'P360-003', desc:'Quality: tighten code review SLA to under 12 hours', owner:'Tech Lead', due:'May 5' }
  ];
  const actionsHtml = actions.map(a =>
    `<div class="p360-tab-card act"><strong>${a.id}:</strong> ${a.desc} · Owner: ${a.owner} · Due: ${a.due}</div>`
  ).join('');

  // Save tab + dim data
  window._p360 = { DIM, order, renderBreakdown, obsHtml, actionsHtml, currentDim: 'discipline', currentTab: 'score', accountName: name, nextReleasesSprints: 2 };

  const ragWord = score < 6 ? 'Red' : (score < 7.5 ? 'Amber' : 'Green');

  openFlyoutPinned({
    title: name,
    sub: `Score: ${score} · ${ragWord}`,
    pinned: `<div class="fly-tabs">
      <div class="fly-tab active" onclick="selectP360Tab('score', this)">Scorecard</div>
      <div class="fly-tab" onclick="selectP360Tab('act', this)">Action Items</div>
      <div class="fly-tab" onclick="selectP360Tab('obs', this)">Observations</div>
      <div class="fly-tab" onclick="selectP360Tab('next', this)">Next Releases</div>
    </div>`,
    body: `<div class="p360-chip-row">${chipsHtml}</div>${renderBreakdown('discipline')}`
  });
}
// Next Releases — sprint cards generator (deterministic per account+sprint)
window._renderNextReleasesImpl = function(account, n) {
  function _gen(account, sprintIdx) {
    let h = 0; const seed = account + ':' + sprintIdx;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
    const rand = () => { h = (h * 1103515245 + 12345) | 0; return ((h >>> 16) & 0x7fff) / 32768; };
    const pool = [['Patient onboarding revamp','Backend'],['Reporting dashboard v2','Full-stack'],['HL7 integration','Backend'],['Mobile push notifications','Mobile'],['SSO migration','Platform'],['Audit log enhancement','Backend'],['Claims auto-route','AI/ML'],['Provider portal redesign','Frontend'],['Billing reconciliation','Backend'],['EHR adapter','Integration'],['Compliance pack 26.2','Compliance'],['Performance hotpath','Backend']];
    const owners = ['Kavya S.','Priya M.','Rajesh K.','Vikram J.','Maya R.','D. Patel'];
    const c = 2 + Math.floor(rand() * 3); const out = [];
    for (let i = 0; i < c; i++) { const e = pool[Math.floor(rand() * pool.length)]; const st = ['planned','in-progress','at-risk','blocked'][Math.floor(rand() * 4)]; out.push({id:'EPIC-' + (1000 + Math.floor(rand() * 9000)), title:e[0], track:e[1], owner:owners[Math.floor(rand() * owners.length)], status:st, points:5 + Math.floor(rand() * 25)}); }
    return out;
  }
  const baseSprint = 18; const cards = [];
  for (let s = 1; s <= n; s++) {
    const sprintNum = baseSprint + s;
    const epics = _gen(account, sprintNum);
    const epicCards = epics.map(e => {
      const cls = e.status === 'planned' ? 'green' : (e.status === 'in-progress' || e.status === 'at-risk' ? 'amber' : 'red');
      const lbl = e.status === 'planned' ? 'Planned' : (e.status === 'in-progress' ? 'In progress' : (e.status === 'at-risk' ? 'At risk' : 'Blocked'));
      return `<div style="background:var(--card);border:1px solid var(--border);border-left:3px solid var(--${cls});border-radius:8px;padding:10px 12px;margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;">
          <div style="flex:1;min-width:0;">
            <div style="font-size:10px;font-family:monospace;color:var(--text-muted);">${e.id} · ${e.track}</div>
            <div style="font-size:12px;font-weight:700;color:var(--navy);margin-top:2px;">${e.title}</div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:3px;">Owner: ${e.owner} · ${e.points} pts</div>
          </div>
          <span class="g-tag ${cls}" style="flex-shrink:0;">${lbl}</span>
        </div>
      </div>`;
    }).join('');
    cards.push(`<div style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:700;color:var(--navy);text-transform:uppercase;letter-spacing:0.4px;padding-bottom:6px;border-bottom:2px solid var(--border);margin-bottom:8px;">
        <span>Sprint ${sprintNum} · ${epics.length} epic${epics.length === 1 ? '' : 's'}</span>
        <span style="font-size:10px;color:var(--text-muted);font-weight:600;text-transform:none;letter-spacing:0;">${epics.reduce((sum,e)=>sum+e.points,0)} pts</span>
      </div>
      ${epicCards}
    </div>`);
  }
  return `<div>${cards.join('')}</div>
    <div style="text-align:center;padding-top:8px;border-top:1px solid var(--border);margin-top:6px;">
      <button onclick="loadNextP360Sprints()" style="font-size:11px;font-weight:600;color:var(--blue);background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:6px 16px;cursor:pointer;">Load Next 2 Sprints</button>
    </div>`;
};
window.loadNextP360Sprints = function() {
  const d = window._p360; if (!d) return;
  d.nextReleasesSprints += 2;
  swapFlyoutBody(window._renderNextReleasesImpl(d.accountName, d.nextReleasesSprints));
};
window.selectP360Tab = function(tab, el) {
  document.querySelectorAll('.fly-tab').forEach(x => x.classList.remove('active'));
  el.classList.add('active');
  const d = window._p360; if (!d) return;
  d.currentTab = tab;
  if (tab === 'score') {
    const chipsHtml = d.order.map((k, i) => {
      const dim = d.DIM[k];
      const v = dim.val;
      const r = v < 6 ? 'red' : (v < 7.5 ? 'amber' : 'green');
      const fmt = (x) => Number.isInteger(x) ? x.toString() : x.toFixed(1);
      return `<div class="p360-dim-chip ${r}${k===d.currentDim?' active':''}" onclick="selectP360Dim('${k}', this)">
        <div class="p360-dim-chip-name">${dim.label}</div>
        <div class="p360-dim-chip-val">${fmt(v)}</div>
      </div>`;
    }).join('');
    swapFlyoutBody(`<div class="p360-chip-row">${chipsHtml}</div>${d.renderBreakdown(d.currentDim)}`);
  } else if (tab === 'act') {
    swapFlyoutBody(d.actionsHtml);
  } else if (tab === 'next') {
    d.nextReleasesSprints = 2;
    swapFlyoutBody(window._renderNextReleasesImpl(d.accountName, d.nextReleasesSprints));
  } else {
    swapFlyoutBody(d.obsHtml);
  }
};
window.selectP360Dim = function(k, el) {
  const d = window._p360; if (!d) return;
  d.currentDim = k;
  document.querySelectorAll('.p360-dim-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const chipsHtml = d.order.map((kk, i) => {
    const dim = d.DIM[kk];
    const v = dim.val;
    const r = v < 6 ? 'red' : (v < 7.5 ? 'amber' : 'green');
    const fmt = (x) => Number.isInteger(x) ? x.toString() : x.toFixed(1);
    return `<div class="p360-dim-chip ${r}${kk===k?' active':''}" onclick="selectP360Dim('${kk}', this)">
      <div class="p360-dim-chip-name">${dim.label}</div>
      <div class="p360-dim-chip-val">${fmt(v)}</div>
    </div>`;
  }).join('');
  swapFlyoutBody(`<div class="p360-chip-row">${chipsHtml}</div>${d.renderBreakdown(k)}`);
};
window.setP360TrendKind = function(kind) {
  const d = window._p360; if (!d) return;
  d.trendKind = kind;
  // Re-render the scorecard tab body
  const chipsHtml = d.order.map((kk, i) => {
    const dim = d.DIM[kk];
    const v = dim.val;
    const r = v < 6 ? 'red' : (v < 7.5 ? 'amber' : 'green');
    const fmt = (x) => Number.isInteger(x) ? x.toString() : x.toFixed(1);
    return `<div class="p360-dim-chip ${r}${kk===d.currentDim?' active':''}" onclick="selectP360Dim('${kk}', this)">
      <div class="p360-dim-chip-name">${dim.label}</div>
      <div class="p360-dim-chip-val">${fmt(v)}</div>
    </div>`;
  }).join('');
  swapFlyoutBody(`<div class="p360-chip-row">${chipsHtml}</div>${d.renderBreakdown(d.currentDim)}`);
};

// === PEOPLE ===
const PPL_TREE = {
  name: 'John Doe (HLS · 84 engineers)', ratio: '1:7.2', rag: 'green', kids: [
    { name: 'Kavya Sharma (Sprint Pod · 18)', ratio: '1:6.8', rag: 'amber', kids: [
      { name: 'A. Rao', ratio: 'IC', rag: 'green' },{ name: 'B. Kumar', ratio: 'IC', rag: 'green' },{ name: 'C. Iyer', ratio: 'IC', rag: 'green' } ] },
    { name: 'Rajesh K. (QA Pod · 14)', ratio: '1:7.0', rag: 'amber', kids: [
      { name: 'D. Patel', ratio: 'IC', rag: 'green' },{ name: 'E. Singh', ratio: 'IC', rag: 'green' } ] },
    { name: 'Priya M. (Platform · 22)', ratio: '1:7.5', rag: 'green', kids: [
      { name: 'F. Nair', ratio: 'IC', rag: 'green' },{ name: 'G. Sen', ratio: 'IC', rag: 'green' } ] },
    { name: 'Vikram J. (Web · 18)', ratio: '1:7.9', rag: 'green' },
    { name: 'Maya R. (Mobile · 12)', ratio: '1:6.2', rag: 'amber' }
  ]
};
function renderTree(node) {
  const hasKids = node.kids && node.kids.length;
  const ragTag = `<span class="g-tag ${node.rag}">${node.rag.toUpperCase()}</span>`;
  let html = `<div class="g-tree-row" onclick="this.classList.toggle('expanded')">
    <div class="toggle">${hasKids ? '+' : ''}</div>
    <div class="name">${node.name}</div>
    <div class="ratio">${node.ratio}</div>
    <div>${ragTag}</div>
  </div>`;
  if (hasKids) html += `<div class="g-tree-children">${node.kids.map(renderTree).join('')}</div>`;
  return html;
}
function openGoldenRatio() {
  openFlyoutPinned({
    title: 'Golden Ratio · DM Unit · 1:7.2',
    sub: 'Reporting managers · click + to expand',
    pinned: `<div class="fly-insight"><strong>Summary:</strong> Unit avg 1:7.2 (healthy). Watch: Mobile pod (Maya R.) at 1:6.2 — single non-billable absorbed.</div>`,
    body: `<div class="fly-section"><div class="fly-section-head">Reporting managers · click + to expand</div></div>` + PPL_TREE.kids.map(renderTree).join('')
  });
}
function openBenchUtilization() {
  const onBench = 4, ok = 78, over = 2;
  openFlyoutPinned({
    title: 'Bench & Utilization · DM Unit',
    sub: '84 engineers · click a tab',
    pinned: `<div class="fly-insight"><strong>Summary:</strong> 4 on bench (avg 12d) · 78 utilized · 2 over-allocated. Watch: 1 long-bench engineer >30d (F. Nair, Data Eng — specialty mismatch).</div>
    <div class="fly-tabs">
      <div class="fly-tab bench-bench active" onclick="renderBenchTab('bench', this)">On Bench (${onBench})</div>
      <div class="fly-tab bench-ok" onclick="renderBenchTab('ok', this)">Utilized (${ok})</div>
      <div class="fly-tab bench-over" onclick="renderBenchTab('over', this)">Over-utilized (${over})</div>
    </div>`,
    body: renderBenchSegBody('bench')
  });
}
window.renderBenchTab = function(t, el) {
  document.querySelectorAll('.fly-tab').forEach(x => x.classList.remove('active'));
  if (el) el.classList.add('active');
  swapFlyoutBody(renderBenchSegBody(t));
};
function renderBenchSegBody(type) {
  const data = {
    bench: [
      { n:'A. Rao', skill:'Java', dur:'14d', notes:'Awaiting MedTech ramp' },
      { n:'C. Iyer', skill:'React', dur:'8d', notes:'Coming off PharmCare' },
      { n:'F. Nair', skill:'Data Eng', dur:'22d', notes:'Specialty mismatch — long bench' },
      { n:'G. Sen', skill:'UX', dur:'5d', notes:'Awaiting BioGen Phase 2' }
    ],
    ok: [
      { n:'Kavya Sharma', skill:'Tech Lead', dur:'92%', notes:'MedTech sprint pod' },
      { n:'B. Kumar', skill:'Java Sr.', dur:'95%', notes:'MedTech' },
      { n:'D. Patel', skill:'QA Lead', dur:'88%', notes:'BioGen' },
      { n:'E. Singh', skill:'QA', dur:'90%', notes:'BioGen' },
      { n:'Priya M.', skill:'Platform Lead', dur:'94%', notes:'Cross-account' },
      { n:'Vikram J.', skill:'Web Lead', dur:'92%', notes:'HealthFirst' },
      { n:'Maya R.', skill:'Mobile Lead', dur:'90%', notes:'HealthFirst' }
    ],
    over: [
      { n:'Rajesh K.', skill:'QA Pod Mgr', dur:'118%', notes:'Covering 2 projects · burnout risk' },
      { n:'H. Sharma', skill:'DevOps Sr.', dur:'124%', notes:'Sole DevOps · backfill needed' }
    ]
  }[type];
  const title = type === 'bench' ? 'On Bench' : (type === 'ok' ? 'Utilized' : 'Over-allocated');
  const dlbl = type === 'bench' ? 'Days on bench' : 'Utilization';
  return `<div class="fly-section"><div class="fly-section-head"><span>${title}</span><span class="count">${data.length}</span></div>
  <table class="g-tbl"><thead><tr><th>Engineer</th><th>Skill</th><th>${dlbl}</th><th>Notes</th></tr></thead><tbody>
  ${data.map(d => `<tr><td>${d.n}</td><td>${d.skill}</td><td>${d.dur}</td><td style="text-align:left;">${d.notes}</td></tr>`).join('')}
  </tbody></table></div>`;
}
window.renderBenchSeg = function(t) { swapFlyoutBody(renderBenchSegBody(t)); };

// Hiring & Attrition — 4 sections stacked
function openHiringAttritionFlyout() {
  openFlyoutPinned({
    title: 'Hiring & Attrition · DM Unit',
    sub: 'Click a tab',
    pinned: `<div class="fly-insight"><strong>Summary:</strong> 3 hires + 1 open + 2 exits + 2 at-risk · Net +1 this month.</div>
    <div class="fly-tabs">
      <div class="fly-tab active" onclick="renderHATab('hires', this)">Hires (3)</div>
      <div class="fly-tab" onclick="renderHATab('exits', this)">Exits (2)</div>
      <div class="fly-tab" onclick="renderHATab('open', this)">Open Positions (3)</div>
      <div class="fly-tab" onclick="renderHATab('risk', this)">At Risk (2)</div>
    </div>`,
    body: renderHABody('hires')
  });
}
function renderHABody(t) {
  if (t === 'hires') return `<table class="g-tbl"><thead><tr><th>Name</th><th>Role</th><th>Start Date</th><th>Source</th></tr></thead><tbody>
    <tr><td>L. Krishnan</td><td>Senior Java</td><td>Apr 22</td><td>Referral</td></tr>
    <tr><td>M. Joshi</td><td>QA Engineer</td><td>Apr 28</td><td>Inbound</td></tr>
    <tr><td>N. Pillai</td><td>DevOps</td><td>May 4</td><td>Outbound</td></tr>
    </tbody></table>`;
  if (t === 'exits') return `<table class="g-tbl"><thead><tr><th>Name</th><th>Role</th><th>Last Day</th><th>Reason</th></tr></thead><tbody>
    <tr><td>O. Khan</td><td>Senior React</td><td>Apr 18</td><td>Comp · accepted higher offer</td></tr>
    <tr><td>P. Naidu</td><td>Platform Eng</td><td>Apr 30</td><td>Career growth · joined product co</td></tr>
    </tbody></table>`;
  if (t === 'open') return `<table class="g-tbl"><thead><tr><th>Role</th><th>Days Open</th><th>Pipeline</th><th>Hiring Manager</th></tr></thead><tbody>
    <tr><td>Senior Java Engineer</td><td>9d</td><td>12 in funnel</td><td>John Doe</td></tr>
    <tr><td>Data Engineer</td><td>22d</td><td>8 in funnel · 3 stuck</td><td>John Doe</td></tr>
    <tr><td>QA Lead</td><td>8d</td><td>6 in funnel</td><td>Sarah Patel</td></tr>
    </tbody></table>`;
  // risk
  return `<table class="g-tbl"><thead><tr><th>Name</th><th>Role</th><th>Risk Score</th><th>Driver</th></tr></thead><tbody>
    <tr onclick="openReasonDetail('K. Sharma','Comp gap detected')"><td>K. Sharma</td><td>Tech Lead</td><td><span class="g-tag red">8.2/10</span></td><td>Comp gap · last 1:1 23d ago</td></tr>
    <tr onclick="openReasonDetail('M. Verma','Engagement drop')"><td>M. Verma</td><td>Senior Java</td><td><span class="g-tag amber">7.6/10</span></td><td>Engagement drop · skipped 1:1s</td></tr>
    </tbody></table>`;
}
window.renderHATab = function(t, el) {
  document.querySelectorAll('.fly-tab').forEach(x => x.classList.remove('active'));
  el.classList.add('active');
  swapFlyoutBody(renderHABody(t));
};
function _legacyHA() {
  /* kept-for-reference */
}
window.openReasonDetail = function(name, driver) {
  openFlyout({title: name + ' · Risk Detail', sub: driver, body: `
  <div class="fly-alert red"><strong>Action needed:</strong> Manager 1:1 within 7 days · Comp review next cycle.</div>
  <div class="fly-section"><div class="fly-section-head">Drivers</div><p style="font-size:12px;line-height:1.7;color:var(--text);">· ${driver}<br>· Comp band gap 12% below market<br>· No promotion in 18 months<br>· LinkedIn activity spike noted</p></div>
  <div class="fly-section"><div class="fly-section-head">Recommended action</div><p style="font-size:12px;line-height:1.7;color:var(--text);">· Manager 1:1 within 7 days<br>· Skip-level with HR Head<br>· Comp review next cycle</p></div>`});
};

// Attendance
function openAttendanceHeatmap() {
  const flagged = [
    { n:'K. Sharma', sub:'Tech Lead · 18d WFH ratio', anom:'Pattern: late logins 4x in 30d' },
    { n:'M. Verma', sub:'Senior Java · 12 leaves', anom:'Pattern: short Fridays' },
    { n:'R. Pillai', sub:'Mobile Eng · attendance 86%', anom:'Pattern: 6 absences unplanned' }
  ];
  let cal = '';
  flagged.forEach(p => {
    cal += `<div class="g-cal-row-label">${p.n}</div>`;
    for (let d = 0; d < 30; d++) {
      let cls;
      const r = Math.random();
      if (d % 7 === 5 || d % 7 === 6) cls = 'weekend';
      else if (r < 0.55) cls = 'present';
      else if (r < 0.75) cls = 'wfh';
      else if (r < 0.82) cls = 'leave';
      else if (r < 0.92) cls = 'absent';
      else cls = 'exception';
      cal += `<div class="g-cal-cell ${cls}" title="${p.n} · Day ${d+1}: ${cls}" onclick="openAttendanceDay('${p.n}', ${d+1}, '${cls}')"></div>`;
    }
  });
  openFlyoutPinned({
    title: 'Attendance · DM Unit',
    sub: '3 employees flagged',
    pinned: `<div class="fly-insight"><strong>Summary:</strong> Avg 93.4% · WFH 42% · 6 exceptions in last 30 days.</div>
    <div class="g-bar-legend">
      <span><span class="dot" style="background:#16A34A;"></span> Present</span>
      <span><span class="dot" style="background:#3B82F6;"></span> WFH</span>
      <span><span class="dot" style="background:#F59E0B;"></span> Absent</span>
      <span><span class="dot" style="background:#94A3B8;"></span> Leave</span>
      <span><span class="dot" style="background:#DC2626;"></span> Exception</span>
    </div>
    <div class="g-cal">${cal}</div>`,
    body: `<table class="g-tbl"><thead><tr><th>Name</th><th>Attendance %</th><th>WFH %</th><th>Exceptions</th><th>Why flagged</th></tr></thead><tbody>
    ${flagged.map(r => `<tr><td>${r.n}</td><td>${r.sub.match(/\\d+%/) ? r.sub.match(/\\d+%/)[0] : '92%'}</td><td>${Math.floor(Math.random()*30+30)}%</td><td>${Math.floor(Math.random()*5+1)}</td><td style="text-align:left;">${r.anom}</td></tr>`).join('')}
    </tbody></table>`
  });
}
window.openAttendanceDay = function(name, d, state) {
  openFlyout({title: name + ' · Day ' + d, sub: state.toUpperCase(), body: `<div class="fly-section"><div class="fly-section-head">Detail</div><p style="color:var(--text);font-size:12px;">Login: 09:42 · Logout: 18:14 · Hours: 8h 32m · IP: corporate VPN · Status: ${state}</p></div>`});
};

// Appraisals — tabs + simple table + blue insight
function openAppraisalDrill() {
  window._apprTab = 'done';
  openFlyoutPinned({
    title: 'Appraisals · DM Unit · Q1 Cycle',
    sub: 'Done · Upcoming · Delayed',
    pinned: `<div class="fly-insight"><strong>Summary:</strong> 62 done · 14 upcoming · 8 delayed. Watch: 8 delayed are mostly tech leads (action: prioritize this week).</div>
    <div class="fly-tabs">
      <div class="fly-tab active" onclick="renderApprTab('done', this)">Done (62)</div>
      <div class="fly-tab" onclick="renderApprTab('upcoming', this)">Upcoming (14)</div>
      <div class="fly-tab" onclick="renderApprTab('delayed', this)">Delayed (8)</div>
    </div>`,
    body: renderApprBody('done')
  });
}
function renderApprBody(t) {
  const groups = {
    done: [{n:'A. Rao',role:'Java Eng',rating:'4 of 5',date:'Apr 22'},{n:'B. Kumar',role:'Senior Java',rating:'5 of 5',date:'Apr 28'},{n:'C. Iyer',role:'React',rating:'3 of 5',date:'Apr 30'},{n:'D. Patel',role:'QA',rating:'4 of 5',date:'May 2'},{n:'E. Singh',role:'QA',rating:'4 of 5',date:'May 3'}],
    upcoming: [{n:'F. Nair',role:'Data Eng',rating:'-',date:'May 8'},{n:'G. Sen',role:'UX',rating:'-',date:'May 10'},{n:'H. Sharma',role:'DevOps',rating:'-',date:'May 12'},{n:'I. Joshi',role:'Mobile',rating:'-',date:'May 14'}],
    delayed: [{n:'J. Khan',role:'Tech Lead',rating:'-',date:'12d late'},{n:'K. Verma',role:'Senior QA',rating:'-',date:'8d late'},{n:'L. Pillai',role:'DevOps',rating:'-',date:'5d late'}]
  };
  const rows = groups[t];
  return `<table class="g-tbl"><thead><tr><th>Name</th><th>Role</th><th>Rating</th><th>${t === 'done' ? 'Completed' : 'Status'}</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r.n}</td><td>${r.role}</td><td>${r.rating}</td><td>${r.date}</td></tr>`).join('')}</tbody></table>`;
}
window.renderApprTab = function(t, el) {
  document.querySelectorAll('.fly-tab').forEach(x => x.classList.remove('active'));
  if (el) el.classList.add('active');
  swapFlyoutBody(renderApprBody(t));
};

// Succession — tabs
function openSuccession() {
  openFlyoutPinned({
    title: 'Succession · DM Unit',
    sub: '2 critical roles · 2 covered',
    pinned: `<div class="fly-insight"><strong>Summary:</strong> All 2 critical roles have named successors. Avg readiness 76%. Prioritize: QA Pod Mgr successor (currently 68%).</div>
    <div class="fly-tabs">
      <div class="fly-tab active" onclick="renderSuccTab('critical', this)">Critical Roles (2)</div>
      <div class="fly-tab" onclick="renderSuccTab('readiness', this)">Successor Readiness</div>
    </div>`,
    body: renderSuccBody('critical')
  });
}
function renderSuccBody(t) {
  if (t === 'critical') {
    return `<table class="g-tbl"><thead><tr><th>Role</th><th>Incumbent</th><th>Successor</th><th>Readiness</th></tr></thead><tbody>
    <tr><td>Tech Lead · Sprint Pod</td><td>Kavya Sharma</td><td>Priya M.</td><td><span class="g-tag amber">82%</span></td></tr>
    <tr><td>QA Pod Mgr</td><td>Rajesh K.</td><td>D. Patel</td><td><span class="g-tag amber">68%</span></td></tr>
    </tbody></table>`;
  }
  return `<table class="g-tbl"><thead><tr><th>Successor</th><th>Target Role</th><th>Readiness</th><th>Gap</th></tr></thead><tbody>
  <tr><td>Priya M.</td><td>Tech Lead · Sprint Pod</td><td><span class="g-tag amber">82%</span></td><td>Strategic planning</td></tr>
  <tr><td>D. Patel</td><td>QA Pod Mgr</td><td><span class="g-tag amber">68%</span></td><td>People mgmt + budgeting</td></tr>
  </tbody></table>`;
}
window.renderSuccTab = function(t, el) {
  document.querySelectorAll('.fly-tab').forEach(x => x.classList.remove('active'));
  if (el) el.classList.add('active');
  swapFlyoutBody(renderSuccBody(t));
};
