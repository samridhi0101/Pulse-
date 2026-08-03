console.log('Pulse shared.js v2.1.r3 loaded · ' + new Date().toISOString());
/* Pulse BMD — Global Shared Behaviors */
(function () {

  /* ── Bootstrap Icon mapping (emoji text → BI class) ─────────── */
  var ICON_MAP = {
    '🏠':'bi-house-fill','🔔':'bi-bell-fill','📊':'bi-bar-chart-fill',
    '👥':'bi-people-fill','🏗️':'bi-building','🏗':'bi-building',
    '💰':'bi-cash-coin','⚙️':'bi-gear-fill','🎚️':'bi-sliders',
    '✓':'bi-check-lg','🎫':'bi-ticket','←':'bi-arrow-left',
    '🕐':'bi-clock','📁':'bi-folder','🔍':'bi-search',
    '💼':'bi-briefcase','🔗':'bi-link-45deg','📱':'bi-phone',
    '📣':'bi-megaphone','🤝':'bi-people','📐':'bi-rulers',
    '🧲':'bi-magnet','📈':'bi-graph-up-arrow','🏛️':'bi-bank2',
    '🔒':'bi-lock-fill','⚠':'bi-exclamation-triangle','📉':'bi-graph-down-arrow',
    '🖥️':'bi-display','🏆':'bi-trophy','💡':'bi-lightbulb',
    '✈️':'bi-send','📋':'bi-clipboard','🗓️':'bi-calendar3'
  };

  function replaceIcons() {
    document.querySelectorAll('.sidebar .icon').forEach(function(el) {
      var txt = el.textContent.trim();
      var cls = ICON_MAP[txt];
      if (cls) el.innerHTML = '<i class="bi ' + cls + '"></i>';
    });
  }

  /* ── Hamburger sidebar toggle ──────────────────────────────────── */
  window.toggleSidebar = function () {
    var sb = document.querySelector('.sidebar');
    if (sb) sb.classList.toggle('collapsed');
    document.body.classList.toggle('sidebar-collapsed');
  };

  /* ── Theme system ──────────────────────────────────────────────── */
  var _theme = 'blue', _mode = 'light';

  window.applyTheme = function (theme, mode) {
    _theme = theme; _mode = mode;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);
    /* update active swatch */
    document.querySelectorAll('.theme-swatch').forEach(function(s) {
      s.classList.toggle('active', s.dataset.theme === theme);
    });
    var tog = document.getElementById('modeToggle');
    if (tog) tog.classList.toggle('dark', mode === 'dark');
    document.querySelectorAll('.mode-label').forEach(function(l){ l.textContent = mode === 'dark' ? 'Dark' : 'Light'; });
  };

  window.toggleThemePicker = function () {
    var p = document.getElementById('themePicker');
    if (p) p.classList.toggle('open');
  };

  window.setTheme = function(t){ window.applyTheme(t, _mode); };
  window.toggleDarkMode = function(){
    window.applyTheme(_theme, _mode === 'dark' ? 'light' : 'dark');
  };

  /* ── Feature Tickets panel ─────────────────────────────────────── */
  window.toggleTickets = function () {
    var panel = document.getElementById('ticketsPanel');
    var overlay = document.getElementById('ticketsOverlay');
    if (panel) panel.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
  };
  window.closeTickets = function () {
    var panel = document.getElementById('ticketsPanel');
    var overlay = document.getElementById('ticketsOverlay');
    if (panel) panel.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  };

  /* ── Notifications pin ─────────────────────────────────────────── */
  window.toggleNotif = function () {
    var p = document.getElementById('notifPanel');
    if (p && !p.classList.contains('pinned')) p.classList.toggle('open');
  };
  window.pinNotif = function () {
    var p = document.getElementById('notifPanel');
    var btn = document.getElementById('notifPinBtn');
    if (!p) return;
    p.classList.toggle('pinned');
    if (p.classList.contains('pinned')) {
      p.classList.add('open');
      document.body.classList.add('notif-pinned');
      if (btn) { btn.classList.add('pinned'); btn.title = 'Unpin'; }
    } else {
      document.body.classList.remove('notif-pinned');
      if (btn) { btn.classList.remove('pinned'); btn.title = 'Pin panel'; }
    }
  };

  /* ── P360 flyout pin ─────────────────────────────────────────── */
  window.pinP360Flyout = function () {
    var flyout = document.getElementById('p360flyout');
    var btn = document.getElementById('p360PinBtn');
    if (!flyout) return;
    flyout.classList.toggle('pinned');
    var area = document.getElementById('p360ListArea');
    if (flyout.classList.contains('pinned')) {
      if (area) area.classList.add('flyout-active');
      if (btn) { btn.classList.add('pinned'); btn.title = 'Unpin'; }
      window._p360Pinned = true;
    } else {
      if (area) area.classList.remove('flyout-active');
      if (btn) { btn.classList.remove('pinned'); btn.title = 'Pin panel'; }
      window._p360Pinned = false;
    }
  };

  /* ── Close theme picker on outside click ──────────────────────── */
  document.addEventListener('click', function (e) {
    var picker = document.getElementById('themePicker');
    if (picker && !e.target.closest('.theme-btn') && !picker.contains(e.target)) {
      picker.classList.remove('open');
    }
    var np = document.getElementById('notifPanel');
    if (np && !np.classList.contains('pinned') &&
        !e.target.closest('.alert-bell') && !np.contains(e.target)) {
      np.classList.remove('open');
    }
  });

  /* ── Init ──────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    replaceIcons();
    /* Inject Bootstrap Icons CDN if not already loaded */
    if (!document.querySelector('link[href*="bootstrap-icons"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
      document.head.appendChild(link);
    }
    /* Inject Fredoka font if not already loaded */
    if (!document.querySelector('link[href*="Fredoka"]')) {
      var flink = document.createElement('link');
      flink.rel = 'stylesheet';
      flink.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap';
      document.head.appendChild(flink);
    }
    window.applyTheme('blue', 'light');
  });

})();

/* ═══════════════════════════════════════════════════════════════════
   PULSE v2.0 — GLOBAL ENHANCEMENTS
   Theme toggle, Cmd+K palette, info tooltips, help center, footer
   ═══════════════════════════════════════════════════════════════════ */

(function() {
  // ─── THEME PERSISTENCE ───
  const root = document.documentElement;
  const savedLook = localStorage.getItem('pulse.look') || 'classic';
  const savedMode = localStorage.getItem('pulse.mode') || 'light';
  root.setAttribute('data-look', savedLook);
  root.setAttribute('data-mode', savedMode);

  window.setLook = function(look) {
    root.setAttribute('data-look', look);
    localStorage.setItem('pulse.look', look);
    document.querySelectorAll('.theme-pill button[data-look]').forEach(b => {
      b.classList.toggle('active', b.dataset.look === look);
    });
  };
  window.setMode = function(mode) {
    root.setAttribute('data-mode', mode);
    localStorage.setItem('pulse.mode', mode);
    document.querySelectorAll('.mode-pill button[data-mode]').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });
  };

  // ─── (v3.0) Top-nav theme pills removed.
  //          Appeal (Classic/Modern) is now inside the theme-picker palette,
  //          right below Mode (Light/Dark). See installAppealToggle().
  function installThemePill() { return; }

  // ─── (v3.1) Canonical top-nav-right — overrides per-page drift ───
  //          Every page gets the same 5 controls: palette · tickets · help · bell · avatar
  function installCanonicalTopNav() {
    const navRight = document.querySelector('.top-nav-right');
    if (!navRight) return;
    navRight.innerHTML =
      '<button class="theme-btn" onclick="toggleThemePicker()" title="Theme">' +
        '<i class="bi bi-palette2"></i>' +
      '</button>' +
      '<button class="tickets-btn" onclick="toggleTickets()" title="Feature Tickets">' +
        '<i class="bi bi-ticket"></i>' +
      '</button>' +
      '<button class="help-btn" onclick="toggleHelpFly()" title="Help">?</button>' +
      '<button class="ai-toolbar-btn" onclick="openActionItemsFlyout()" title="Action Items" style="background:none;border:none;color:#fff;font-size:18px;cursor:pointer;padding:6px 10px;position:relative;">' +
        '<i class="bi bi-list-check"></i>' +
        '<div class="badge" id="aiToolbarBadge" style="position:absolute;top:2px;right:2px;background:var(--red);color:#fff;font-size:9px;font-weight:700;padding:1px 5px;border-radius:8px;line-height:1.2;">3</div>' +
      '</button>' +
      '<div class="alert-bell" onclick="toggleNotif()">' +
        '<i class="bi bi-bell-fill" style="font-size:16px;"></i>' +
        '<div class="badge">5</div>' +
      '</div>' +
      '<div class="avatar" id="avatarBadge">JD</div>';
  }

  // ─── (v3.1) Auto-inject theme-picker palette if missing ───
  function installThemePicker() {
    if (document.getElementById('themePicker')) return;
    const p = document.createElement('div');
    p.className = 'theme-picker';
    p.id = 'themePicker';
    p.innerHTML =
      '<div class="theme-picker-title">Colour Theme</div>' +
      '<div class="theme-swatches">' +
        '<div class="theme-swatch blue-swatch active" data-theme="blue" onclick="setTheme(\'blue\')" title="Blue (Default)"></div>' +
        '<div class="theme-swatch teal-swatch" data-theme="teal" onclick="setTheme(\'teal\')" title="Teal"></div>' +
        '<div class="theme-swatch violet-swatch" data-theme="violet" onclick="setTheme(\'violet\')" title="Violet"></div>' +
      '</div>' +
      '<div class="theme-mode-row">' +
        '<span class="theme-mode-label">Mode: <span class="mode-label">Light</span></span>' +
        '<button class="theme-toggle" id="modeToggle" onclick="toggleDarkMode()"></button>' +
      '</div>';
    document.body.appendChild(p);
  }

  // ─── (v3.1) Auto-inject notification panel if missing ───
  function installNotifPanel() {
    if (document.getElementById('notifPanel')) return;
    const p = document.createElement('div');
    p.className = 'notif-panel';
    p.id = 'notifPanel';
    p.innerHTML =
      '<div class="notif-header">' +
        '<span>Notifications</span>' +
        '<div style="display:flex;align-items:center;gap:8px;">' +
          '<button class="notif-pin-btn" id="notifPinBtn" onclick="pinNotif()" title="Pin panel"><i class="bi bi-pin-angle"></i></button>' +
          '<span style="opacity:0.5;cursor:pointer;" onclick="toggleNotif()">✕</span>' +
        '</div>' +
      '</div>' +
      '<div class="notif-body">' +
        '<div class="notif-item" style="cursor:pointer;" onclick="window.location=\'alerts.html#alert-medtech-uat\'"><div class="notif-type" style="color:var(--red);">Escalation</div><div class="notif-text">New escalation — MedTech Corp (Quality)</div><div class="notif-time">2 hours ago</div></div>' +
        '<div class="notif-item" style="cursor:pointer;" onclick="window.location=\'action-items.html\'"><div class="notif-type" style="color:var(--red);">Action Item Overdue</div><div class="notif-text">Action overdue — BioSync commercial response</div><div class="notif-time">Yesterday</div></div>' +
        '<div class="notif-item" style="cursor:pointer;" onclick="window.location=\'alerts.html#alert-attrition\'"><div class="notif-type" style="color:var(--amber);">Attrition</div><div class="notif-text">Resignation — HLS Unit (Nisha Rao)</div><div class="notif-time">3 days ago</div></div>' +
        '<div class="notif-item" style="cursor:pointer;" onclick="window.location=\'alerts.html#alert-bc-coverage\'"><div class="notif-type" style="color:var(--amber);">Pipeline</div><div class="notif-text">Sales pipeline coverage below target (1.8×)</div><div class="notif-time">4 days ago</div></div>' +
        '<div class="notif-item" style="cursor:pointer;" onclick="window.location=\'alerts.html#alert-ar-overdue\'"><div class="notif-type" style="color:var(--amber);">Finance</div><div class="notif-text">₹8.4L overdue invoices aging past 60 days</div><div class="notif-time">5 days ago</div></div>' +
      '</div>';
    document.body.appendChild(p);
  }

  // ─── (v3.1) Auto-inject feature tickets panel if missing ───
  function installTicketsPanel() {
    if (document.getElementById('ticketsPanel')) return;
    const ov = document.createElement('div');
    ov.className = 'tickets-overlay';
    ov.id = 'ticketsOverlay';
    ov.onclick = function(){ window.closeTickets && window.closeTickets(); };
    document.body.appendChild(ov);
    const p = document.createElement('div');
    p.className = 'tickets-panel';
    p.id = 'ticketsPanel';
    p.innerHTML =
      '<div class="tickets-panel-header">' +
        '<div><div style="font-size:13px;font-weight:700;">Feature Tickets</div>' +
          '<div style="font-size:11px;opacity:0.65;margin-top:2px;">Open requests &amp; change log</div></div>' +
        '<button class="flyout-close" onclick="closeTickets()">✕</button>' +
      '</div>' +
      '<div class="tickets-panel-body">' +
        '<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);margin-bottom:10px;">Open Tickets</div>' +
        '<table style="width:100%;font-size:11px;">' +
          '<thead><tr><th style="text-align:left;">Ticket</th><th>Priority</th><th>Status</th></tr></thead>' +
          '<tbody>' +
            '<tr><td><a href="feature-tickets.html" style="color:var(--blue);">BMD-411 — Add forecast confidence band to Projections</a></td><td><span class="badge badge-amber">High</span></td><td><span class="badge badge-muted">Open</span></td></tr>' +
            '<tr><td><a href="feature-tickets.html" style="color:var(--blue);">BMD-408 — P360 export to PDF</a></td><td><span class="badge badge-navy">Medium</span></td><td><span class="badge badge-green">In Progress</span></td></tr>' +
            '<tr><td><a href="feature-tickets.html" style="color:var(--blue);">BMD-402 — Historical session comparison</a></td><td><span class="badge badge-navy">Medium</span></td><td><span class="badge badge-muted">Open</span></td></tr>' +
          '</tbody>' +
        '</table>' +
        '<div style="margin-top:14px;"><a href="feature-tickets.html" class="btn btn-secondary" style="font-size:11px;">View all tickets →</a></div>' +
      '</div>';
    document.body.appendChild(p);
  }

  // ─── Inject "Appeal: Classic/Modern" row into theme-picker palette ───
  function installAppealToggle() {
    const picker = document.getElementById('themePicker');
    if (!picker || picker.querySelector('.theme-appeal-row')) return;
    const cur = document.documentElement.getAttribute('data-look') || 'classic';
    const row = document.createElement('div');
    row.className = 'theme-appeal-row';
    row.innerHTML =
      '<span class="theme-mode-label">Appeal: <span class="appeal-label">' +
      (cur === 'modern' ? 'Modern' : 'Classic') + '</span></span>' +
      '<button class="theme-appeal-toggle' + (cur === 'modern' ? ' modern' : '') +
      '" id="appealToggle" onclick="toggleAppeal()"></button>';
    picker.appendChild(row);
  }
  window.toggleAppeal = function() {
    const cur = document.documentElement.getAttribute('data-look') || 'classic';
    const next = cur === 'modern' ? 'classic' : 'modern';
    setLook(next);
    const btn = document.getElementById('appealToggle');
    if (btn) btn.classList.toggle('modern', next === 'modern');
    const lbl = document.querySelector('.appeal-label');
    if (lbl) lbl.textContent = next === 'modern' ? 'Modern' : 'Classic';
  };

  // ─── Avatar dropdown menu (Profile / Sign out) ───
  function installAvatarMenu() {
    const av = document.getElementById('avatarBadge');
    if (!av || document.getElementById('avatarMenu')) return;
    av.style.cursor = 'pointer';
    const menu = document.createElement('div');
    menu.id = 'avatarMenu';
    menu.className = 'avatar-menu';
    menu.innerHTML =
      '<div class="avatar-menu-header">' +
        '<div class="avatar-menu-name">John Doe</div>' +
        '<div class="avatar-menu-email">john.doe@nalashaa.com</div>' +
      '</div>' +
      '<div class="avatar-menu-item" onclick="window.location.href=\'settings.html#profile\'">' +
        '<i class="bi bi-person-fill"></i> Profile' +
      '</div>' +
      '<div class="avatar-menu-divider"></div>' +
      '<div class="avatar-menu-item" onclick="window.location.href=\'index.html\'">' +
        '<i class="bi bi-box-arrow-right"></i> Sign out' +
      '</div>';
    document.body.appendChild(menu);
    av.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && e.target !== av) menu.classList.remove('open');
    });
  }

  // ─── Department banner icon + divider (auto on dept pages) ───
  const DEPT_ICON_MAP = {
    'org-pulse.html':   'bi-house-heart-fill',
    'engineering.html': 'bi-building',
    'sales.html':       'bi-bar-chart-fill',
    'hr.html':          'bi-people-fill',
    'ta.html':          'bi-person-plus-fill',
    'pmo.html':         'bi-clipboard-data-fill',
    'finance.html':     'bi-cash-coin',
    'mining.html':      'bi-bullseye',
    'p360.html':        'bi-bar-chart-line-fill',
    'productivity.html':'bi-graph-up',
    'financials.html':  'bi-cash-stack'
  };
  function installDeptBannerIcon() {
    const path = location.pathname.split('/').pop().toLowerCase();
    const icon = DEPT_ICON_MAP[path];
    if (!icon) return;
    // Dept pages: .dept-banner > .dept-banner-top > .dept-banner-titleblock
    document.querySelectorAll('.dept-banner').forEach(banner => {
      if (banner.querySelector('.dept-banner-icon')) return;
      const top = banner.querySelector('.dept-banner-top');
      const titleblock = banner.querySelector('.dept-banner-titleblock');
      if (!top || !titleblock) return;
      const iconEl = document.createElement('div');
      iconEl.className = 'dept-banner-icon';
      iconEl.innerHTML = '<i class="bi ' + icon + '"></i>';
      const divEl = document.createElement('div');
      divEl.className = 'dept-banner-divider';
      top.insertBefore(divEl, titleblock);
      top.insertBefore(iconEl, divEl);
    });
    // Org Pulse: .summary-banner — prepend icon + divider before its first child
    document.querySelectorAll('.summary-banner').forEach(banner => {
      if (banner.querySelector('.dept-banner-icon')) return;
      const first = banner.firstElementChild;
      if (!first) return;
      // Make the title block hug the left (like dept-banner-titleblock with flex:1)
      const titleBlock = banner.querySelector('.sb-title')
        ? banner.querySelector('.sb-title').parentElement
        : first;
      if (titleBlock) titleBlock.style.marginRight = 'auto';
      const iconEl = document.createElement('div');
      iconEl.className = 'dept-banner-icon';
      iconEl.innerHTML = '<i class="bi ' + icon + '"></i>';
      const divEl = document.createElement('div');
      divEl.className = 'dept-banner-divider';
      banner.insertBefore(divEl, first);
      banner.insertBefore(iconEl, divEl);
    });
  }

  // ─── INFO TOOLTIPS ───
  const tip = document.createElement('div');
  tip.className = 'info-tip';
  document.body.appendChild(tip);
  function showTip(el) {
    const title = el.dataset.tipTitle || 'Info';
    const body = el.dataset.tip || '';
    tip.innerHTML = `<div class="info-tip-title">${title}</div>${body}`;
    const r = el.getBoundingClientRect();
    tip.style.left = Math.min(window.innerWidth - 300, r.left) + 'px';
    tip.style.top = (r.bottom + 6) + 'px';
    tip.classList.add('show');
  }
  function hideTip() { tip.classList.remove('show'); }
  document.addEventListener('mouseover', e => { if (e.target.classList && e.target.classList.contains('info-i')) showTip(e.target); });
  document.addEventListener('mouseout',  e => { if (e.target.classList && e.target.classList.contains('info-i')) hideTip(); });

  // ─── CMD+K COMMAND PALETTE ───
  const PAGES = [
    { name: 'Org Pulse', sub: 'Leadership home', url: 'org-pulse.html', icon: 'bi-house-heart-fill', group: 'Pages' },
    { name: 'Engineering', sub: 'Department + DMs', url: 'engineering.html', icon: 'bi-building', group: 'Pages' },
    { name: 'DM Dashboard (John Doe)', sub: 'Per-DM view', url: 'dm-home.html?dm=john', icon: 'bi-grid-3x3-gap-fill', group: 'Pages' },
    { name: 'Sales', sub: 'Pipeline & deals', url: 'sales.html', icon: 'bi-cash-stack', group: 'Pages' },
    { name: 'Talent Acquisition', sub: 'JR · Funnel · Offers', url: 'ta.html', icon: 'bi-person-plus-fill', group: 'Pages' },
    { name: 'HR', sub: 'People & engagement', url: 'hr.html', icon: 'bi-people-fill', group: 'Pages' },
    { name: 'PMO', sub: 'Portfolio command', url: 'pmo.html', icon: 'bi-clipboard-data-fill', group: 'Pages' },
    { name: 'Finance', sub: 'Revenue · Cost · AR', url: 'finance.html', icon: 'bi-graph-up', group: 'Pages' },
    { name: 'Mining & Escalations', sub: 'Account growth + risk', url: 'mining.html', icon: 'bi-bullseye', group: 'Pages' },
    { name: 'P360 Performance', sub: 'Project scorecards', url: 'p360.html', icon: 'bi-bar-chart-line-fill', group: 'Pages' },
    { name: 'Action Items', sub: 'Open follow-ups', url: 'action-items.html', icon: 'bi-list-check', group: 'Pages' },
    { name: 'Alerts', sub: 'Threshold breaches', url: 'alerts.html', icon: 'bi-bell-fill', group: 'Pages' },
    { name: 'Settings', sub: 'Preferences & endpoints', url: 'settings.html', icon: 'bi-gear-fill', group: 'Admin' },
    { name: 'KPI Thresholds', sub: 'Manage RAG bands', url: 'kpi-thresholds.html', icon: 'bi-sliders', group: 'Admin' },
    { name: 'Admin Console', sub: 'Users · Roles · Audit', url: 'admin.html', icon: 'bi-shield-lock-fill', group: 'Admin' },
    { name: 'Help Center', sub: 'Glossary · Tour · Ask Pulse', url: 'help-center.html', icon: 'bi-question-circle-fill', group: 'Help' }
  ];
  const VERBS = [
    { name: 'Toggle Modern theme', sub: 'set theme', icon: 'bi-palette-fill', action: () => setLook(root.getAttribute('data-look')==='modern' ? 'classic' : 'modern'), group: 'Commands' },
    { name: 'Toggle Dark mode', sub: 'set mode', icon: 'bi-moon-stars-fill', action: () => setMode(root.getAttribute('data-mode')==='dark' ? 'light' : 'dark'), group: 'Commands' },
    { name: 'Export current page (PDF)', sub: 'window.print()', icon: 'bi-file-earmark-pdf-fill', action: () => window.print(), group: 'Commands' },
    { name: 'Open Help Center', sub: 'help fly-out', icon: 'bi-question-circle-fill', action: () => toggleHelpFly(), group: 'Commands' },
    { name: 'Ask Pulse', sub: 'ask the AI', icon: 'bi-stars', action: () => { toggleHelpFly(); setTimeout(()=>document.querySelector('.ask-pulse-input')?.focus(),200); }, group: 'Commands' }
  ];

  function buildCmdK() {
    if (document.getElementById('cmdkOverlay')) return;
    const ov = document.createElement('div');
    ov.className = 'cmdk-overlay';
    ov.id = 'cmdkOverlay';
    ov.innerHTML = `
      <div class="cmdk-panel" onclick="event.stopPropagation()">
        <div class="cmdk-input-wrap">
          <i class="bi bi-search"></i>
          <input class="cmdk-input" id="cmdkInput" placeholder="Search pages, metrics, commands… (Esc to close)" />
        </div>
        <div class="cmdk-results" id="cmdkResults"></div>
        <div class="cmdk-footer">
          <span><span class="cmdk-kbd">↑↓</span> navigate</span>
          <span><span class="cmdk-kbd">⏎</span> select</span>
          <span><span class="cmdk-kbd">esc</span> close</span>
          <span style="margin-left:auto;">Pulse v2.0</span>
        </div>
      </div>`;
    ov.onclick = () => closeCmdK();
    document.body.appendChild(ov);
    document.getElementById('cmdkInput').addEventListener('input', renderResults);
    document.getElementById('cmdkInput').addEventListener('keydown', cmdkKey);
    renderResults();
  }
  let cmdkSelIdx = 0;
  let cmdkFlat = [];
  function renderResults() {
    const q = (document.getElementById('cmdkInput').value || '').toLowerCase().trim();
    const all = [...PAGES, ...VERBS];
    const matches = q ? all.filter(p => (p.name + ' ' + p.sub).toLowerCase().includes(q)) : all;
    const groups = {};
    matches.forEach(m => { (groups[m.group] = groups[m.group] || []).push(m); });
    const out = document.getElementById('cmdkResults');
    out.innerHTML = '';
    cmdkFlat = [];
    Object.keys(groups).forEach(g => {
      out.insertAdjacentHTML('beforeend', `<div class="cmdk-group-label">${g}</div>`);
      groups[g].forEach(item => {
        cmdkFlat.push(item);
        const idx = cmdkFlat.length - 1;
        const div = document.createElement('div');
        div.className = 'cmdk-item' + (idx === cmdkSelIdx ? ' selected' : '');
        div.innerHTML = `<div class="cmdk-item-icon"><i class="bi ${item.icon}"></i></div><div class="cmdk-item-name">${item.name}<div class="cmdk-item-sub">${item.sub}</div></div>`;
        div.onclick = () => activateItem(item);
        out.appendChild(div);
      });
    });
    if (!cmdkFlat.length) out.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:11px;">No matches.</div>';
  }
  function activateItem(item) {
    closeCmdK();
    if (item.url) window.location.href = item.url;
    else if (item.action) item.action();
  }
  function cmdkKey(e) {
    if (e.key === 'Escape') { closeCmdK(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); cmdkSelIdx = Math.min(cmdkSelIdx + 1, cmdkFlat.length - 1); renderResults(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); cmdkSelIdx = Math.max(cmdkSelIdx - 1, 0); renderResults(); }
    if (e.key === 'Enter')     { e.preventDefault(); if (cmdkFlat[cmdkSelIdx]) activateItem(cmdkFlat[cmdkSelIdx]); }
  }
  window.openCmdK = function() { buildCmdK(); cmdkSelIdx = 0; document.getElementById('cmdkOverlay').classList.add('open'); setTimeout(()=>document.getElementById('cmdkInput').focus(),50); renderResults(); };
  window.closeCmdK = function() { const o = document.getElementById('cmdkOverlay'); if (o) o.classList.remove('open'); };
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openCmdK(); }
  });

  // ─── HELP CENTER FLYOUT ───
  function buildHelpFly() {
    if (document.getElementById('helpFly')) return;
    const fly = document.createElement('div');
    fly.className = 'help-fly';
    fly.id = 'helpFly';
    fly.innerHTML = `
      <div class="help-fly-header">
        <div class="help-fly-title"><i class="bi bi-question-circle-fill"></i> Help Center</div>
        <button class="help-fly-close" onclick="toggleHelpFly()">×</button>
      </div>
      <div class="help-fly-body">
        <div class="ask-pulse-card">
          <div class="ask-pulse-label"><i class="bi bi-stars"></i> Ask Pulse</div>
          <input class="ask-pulse-input" placeholder="Ask anything about your dashboards…" onkeydown="if(event.key==='Enter') askPulse(this.value)">
          <div id="askPulseAnswer" style="font-size:11px;margin-top:8px;color:var(--text);line-height:1.5;"></div>
        </div>
        <input class="help-search" placeholder="Search help articles…" />
        <div class="cmdk-group-label" style="padding-left:0;">Categories</div>
        <div class="help-cat" onclick="askPulse('How do I read the Org Pulse home?')"><div class="help-cat-name">Getting Started</div><div class="help-cat-desc">Tour the Pulse interface, drill-downs, and alerts.</div></div>
        <div class="help-cat" onclick="askPulse('What is P360?')"><div class="help-cat-name">Glossary</div><div class="help-cat-desc">Definitions for every KPI and metric.</div></div>
        <div class="help-cat" onclick="askPulse('Why is my dashboard slow?')"><div class="help-cat-name">Troubleshooting</div><div class="help-cat-desc">Common issues and resolutions.</div></div>
        <div class="help-cat"><div class="help-cat-name">Release Notes</div><div class="help-cat-desc">v2.0 — Modern theme, Admin Console, KPI Threshold Manager UI, Cmd+K, Help System.</div></div>
        <div style="margin-top:14px;font-size:10px;color:var(--text-muted);">Need more? <a href="mailto:support@nalashaa.com" style="color:var(--blue);">support@nalashaa.com</a></div>
      </div>`;
    document.body.appendChild(fly);
  }
  window.toggleHelpFly = function() { buildHelpFly(); document.getElementById('helpFly').classList.toggle('open'); };
  window.askPulse = function(q) {
    if (!q) return;
    document.querySelector('.ask-pulse-input').value = q;
    // Simulate AI response — in production, this hits the Claude endpoint configured in Settings
    const answers = {
      'p360': 'P360 is a 6-dimension composite project health score: Discipline, Quality, Communication, Risk, Stakeholder Trust, and Delivery Velocity. Each dimension is rated 0-10. Composite under 6.0 triggers Red.',
      'org pulse': 'Org Pulse is the leadership home — one card per department with RAG status, plus the Claude Daily Brief and a weekly trend strip. Click any dept card to drill into its dashboard.',
      'slow': 'Pulse loads in <2s on corporate LAN. If slow: check Settings → Data & Refresh for auto-refresh interval; check Admin → Integrations for failed source syncs; clear browser cache.'
    };
    const lc = q.toLowerCase();
    let ans = 'Pulse can help with that. (Configure your Claude endpoint in Settings → AI &amp; Endpoints to get live AI answers. This is a sample response.)';
    for (const k in answers) { if (lc.includes(k)) { ans = answers[k]; break; } }
    document.getElementById('askPulseAnswer').innerHTML = '<div style="background:var(--bg);padding:10px;border-radius:6px;border-left:3px solid var(--blue);">' + ans + '</div>';
  };

  // Wire global "?" help button to flyout
  function rewireHelp() {
    const helpBtn = document.querySelector('.help-btn');
    if (helpBtn) helpBtn.onclick = toggleHelpFly;
  }

  // ─── FOOTER ───
  // (v3.1) Disabled. Canonical .global-footer is rebuilt on every page —
  //        see the "Global footer + Sys Health migration" handler at file end.
  function installFooter() { return; }

  // ─── ADMIN BADGE (avatar reads "Admin" when on admin page) ───
  function maybeAdminBadge() {
    if (location.pathname.toLowerCase().endsWith('admin.html')) {
      const a = document.getElementById('avatarBadge');
      if (a) { a.textContent = 'Admin'; a.style.fontSize = '9px'; a.style.background = '#DC2626'; }
    }
  }

  // ─── BOOT ───
  document.addEventListener('DOMContentLoaded', () => {
    installCanonicalTopNav();  // (v3.1) uniform top-nav-right on every page
    installThemePicker();      // (v3.1) auto-inject palette if missing
    installNotifPanel();       // (v3.1) auto-inject notifications panel
    installTicketsPanel();     // (v3.1) auto-inject tickets panel
    installThemePill();        // no-op: pills removed from top nav
    installAppealToggle();     // adds Appeal toggle into theme-picker
    installAvatarMenu();       // JD avatar → Profile / Sign out
    installDeptBannerIcon();   // icon + white divider on dept banners
    rewireHelp();
    installFooter();
    maybeAdminBadge();
  });
})();

/* ═══════════════════════════════════════════════════════════════════
   GLOBAL FLYOUT COMPONENT — used by every dashboard for drill-downs
   Usage: openFlyout({title, sub, body, footer, width})
   ═══════════════════════════════════════════════════════════════════ */
(function() {
  function buildGlobalFlyout() {
    if (document.getElementById('gFly')) return;
    const fly = document.createElement('div');
    fly.id = 'gFly';
    fly.className = 'g-flyout';
    fly.innerHTML = `
      <div class="g-fly-header">
        <div>
          <div class="g-fly-title" id="gFlyTitle">Detail</div>
          <div class="g-fly-sub" id="gFlySub"></div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;">
          <button class="g-fly-btn" onclick="exportFlyout()" title="Export"><i class="bi bi-download"></i></button>
          <button class="g-fly-close" onclick="closeFlyout()">×</button>
        </div>
      </div>
      <div class="g-fly-body" id="gFlyBody"></div>
      <div class="g-fly-foot" id="gFlyFoot"></div>`;
    document.body.appendChild(fly);
  }
  window.openFlyout = function(opts) {
    buildGlobalFlyout();
    const f = document.getElementById('gFly');
    document.getElementById('gFlyTitle').textContent = opts.title || 'Detail';
    document.getElementById('gFlySub').textContent = opts.sub || '';
    document.getElementById('gFlyBody').innerHTML = opts.body || '';
    document.getElementById('gFlyFoot').innerHTML = opts.footer || '';
    if (opts.width) f.style.width = opts.width;
    f.classList.add('open');
    document.body.classList.add('flyout-open');
    setTimeout(function(){ window.dispatchEvent(new Event('resize')); }, 240);
    document.addEventListener('keydown', escClose);
  };
  window.closeFlyout = function() {
    const f = document.getElementById('gFly');
    if (f) f.classList.remove('open');
    document.body.classList.remove('flyout-open');
    setTimeout(function(){ window.dispatchEvent(new Event('resize')); }, 240);
    document.removeEventListener('keydown', escClose);
  };
  window.exportFlyout = function() {
    const title = document.getElementById('gFlyTitle')?.textContent || 'Detail';
    alert('Export: ' + title + '\n\nIn production: PDF / PNG / Excel options.');
  };
  function escClose(e) { if (e.key === 'Escape') closeFlyout(); }
})();

/* ═══ v2.1 helpers ═══ */
window.usd = function(amountInCr) {
  // Convert from INR Cr (used in v2.0) to USD millions (1 Cr ≈ $0.12M)
  const m = (amountInCr * 0.12);
  return '$' + (m >= 1 ? m.toFixed(1) + 'M' : (m * 1000).toFixed(0) + 'K');
};

// Re-render flyout with persistent header and switchable body
window.openFlyoutPinned = function(opts) {
  // Same as openFlyout but the `pinned` HTML stays at top, `body` swaps out
  const fullBody = `<div class="g-fly-pinned" id="gFlyPinned">${opts.pinned || ''}</div><div id="gFlyDynamic">${opts.body || ''}</div>`;
  openFlyout({ title: opts.title, sub: opts.sub, body: fullBody, footer: opts.footer });
};
window.swapFlyoutBody = function(html) {
  const el = document.getElementById('gFlyDynamic');
  if (el) el.innerHTML = html;
};


/* ═══ v6.1 Action Items: planned date / status / delay + inline add + show more ═══ */
window._aiState = { items: [], shown: 5 };

function _aiDelayBadge(planned, status) {
  if (status === 'done') return '<span class="badge-mini badge green">On time</span>';
  if (!planned) return '—';
  const today = new Date(); today.setHours(0,0,0,0);
  const p = new Date(planned + 'T00:00:00');
  const days = Math.floor((today - p) / 86400000);
  if (days <= 0) return '<span class="badge-mini badge green">On track</span>';
  if (days <= 3) return `<span class="badge-mini badge amber">${days}d late</span>`;
  return `<span class="badge-mini badge red">${days}d late</span>`;
}
function _aiStatusBadge(s) {
  if (s === 'done') return '<span class="badge-mini badge green">Done</span>';
  if (s === 'wip')  return '<span class="badge-mini badge amber">WIP</span>';
  return '<span class="badge-mini badge grey">Yet to start</span>';
}
function _aiActualFinish(i) {
  if (i.actualFinish) return i.actualFinish;
  if ((i.status || 'todo') === 'done') {
    if (i.planned) { const d = new Date(i.planned + 'T00:00:00'); d.setDate(d.getDate() + ((i.ts || 0) % 3 - 1)); return d.toISOString().slice(5,10); }
    return 'Apr 21';
  }
  return '—';
}
function _aiRowHtml(i) {
  const initials = (i.owner||'JD').split(/\s+/).map(p=>p[0]).slice(0,2).join('').toUpperCase();
  return `<div class="action-row" data-ts="${i.ts || 0}">
    <div class="av" style="background:${i.bg||'#FF9933'};">${i.av || initials}</div>
    <div class="text">${i.text}</div>
    <div class="owner">${i.owner || 'John Doe'}</div>
    <div class="planned">${i.planned || '—'}</div>
    <div class="actual-finish">${_aiActualFinish(i)}</div>
    <div class="status">${_aiStatusBadge(i.status || 'todo')}</div>
    <div class="delay">${_aiDelayBadge(i.planned, i.status || 'todo')}</div>
  </div>`;
}
window.installActionsSection = function(items) {
  if (document.querySelector('.actions-section')) return;
  const main = document.querySelector('.main');
  if (!main) return;
  // Seed each item with a synthetic planned date if missing
  const today = new Date();
  const seeded = (items || []).map((i, idx) => {
    if (i.planned) return i;
    const p = new Date(today); p.setDate(p.getDate() - (idx * 3 + 5));
    return Object.assign({}, i, {
      planned: p.toISOString().slice(0,10),
      status: i.status || (idx === 0 ? 'wip' : (idx === 1 ? 'wip' : 'todo')),
      ts: Date.now() - idx * 86400000
    });
  });
  // Sort newest first
  seeded.sort((a, b) => (b.ts || 0) - (a.ts || 0));
  window._aiState.items = seeded;
  const today2 = new Date().toISOString().slice(0,10);
  const html = `
    <div class="actions-section">
      <div class="actions-head">
        <div class="actions-title"><i class="bi bi-list-check"></i> Action Items · Review</div>
      </div>
      <div class="actions-row-head">
        <div class="av-spacer"></div>
        <div class="text">Description</div>
        <div class="owner">Owner</div>
        <div class="planned">Planned Date</div>
        <div class="actual-finish">Actual Finish</div>
        <div class="status">Status</div>
        <div class="delay">Delay</div>
      </div>
      <div class="actions-add-row" id="actionAddRow">
        <div class="av" style="background:#94A3B8;">+</div>
        <input class="text" id="aiNewText" type="text" placeholder="Action description...">
        <input class="owner" id="aiNewOwner" type="text" placeholder="Owner" value="John Doe">
        <input class="planned" id="aiNewPlanned" type="date" value="${today2}">
        <select class="status" id="aiNewStatus">
          <option value="todo" selected>Yet to start</option>
          <option value="wip">WIP</option>
          <option value="done">Done</option>
        </select>
        <button class="actions-save" onclick="saveActionItem()">Save</button>
      </div>
      <div class="actions-list" id="actionList"></div>
      <div class="actions-show-more" id="aiShowMore"></div>
    </div>`;
  main.insertAdjacentHTML('beforeend', html);
  _aiRender();
};
function _aiRender() {
  const s = window._aiState;
  const list = document.getElementById('actionList'); if (!list) return;
  const visible = s.items.slice(0, s.shown);
  list.innerHTML = visible.map(_aiRowHtml).join('');
  const more = document.getElementById('aiShowMore');
  if (more) {
    if (s.items.length > s.shown) {
      more.innerHTML = `<button onclick="aiShowMore()">Show ${Math.min(5, s.items.length - s.shown)} more (${s.items.length - s.shown} hidden)</button>`;
    } else {
      more.innerHTML = '';
    }
  }
}
window.aiShowMore = function() {
  window._aiState.shown += 5;
  _aiRender();
};
window.saveActionItem = function() {
  const t = document.getElementById('aiNewText');
  const o = document.getElementById('aiNewOwner');
  const p = document.getElementById('aiNewPlanned');
  const st = document.getElementById('aiNewStatus');
  if (!t || !t.value.trim()) { t && t.focus(); return; }
  const item = {
    text: t.value.trim(),
    owner: (o && o.value.trim()) || 'John Doe',
    planned: p ? p.value : '',
    status: st ? st.value : 'todo',
    bg: '#FF9933',
    ts: Date.now()
  };
  window._aiState.items.unshift(item);
  // Reset form
  t.value = '';
  if (st) st.value = 'todo';
  _aiRender();
};
// Legacy compatibility — old addActionItem now opens focus on description
window.addActionItem = function() {
  const t = document.getElementById('aiNewText');
  if (t) t.focus();
};


/* v3.3 — close flyout when clicking on any .kc that does not open a flyout */
document.addEventListener('click', function(e) {
  const tile = e.target.closest('.kc');
  if (!tile) return;
  // If tile has no onclick handler (display-only) OR tile has class static-tile, close any open flyout
  if (tile.classList.contains('static-tile') || !tile.getAttribute('onclick')) {
    if (document.body.classList.contains('flyout-open')) {
      window.closeFlyout && window.closeFlyout();
    }
  }
});


/* v5.5 — auto-close flyout on ANY context change (tab / tile / sidebar / dashboard card) */
document.addEventListener('click', function(e) {
  if (!document.body.classList.contains('flyout-open')) return;
  // Ignore clicks INSIDE the flyout itself
  if (e.target.closest('.g-flyout, #gFly, .g-flyout-pinned')) return;
  // Close on any navigation/selection target outside the flyout
  const ctx = e.target.closest('.tab, .ta-tab, .pmo-tab, .admin-tab, .set-rail-item, .help-rail-item, .sidebar a, .kc, .p360-tile, .sprint-tile, .pp-tile, .kpi-card, .dm-card-h, .billing-row, [class*="-tab"]:not(.fly-tab):not(.pill-tab):not(.theme-tab):not(.tt-tab)');
  if (ctx) {
    window.closeFlyout && window.closeFlyout();
  }
}, true);


/* v4.0 — auto-inject info button on every tile (top-right) with hover description */
const TILE_INFO_DESCRIPTIONS = {
  // Engineering
  'Sprint Health (Avg)': 'Sprint completion rate. Avg of (committed SP / completed SP) across active sprints.',
  'Active Blockers': 'Total open blockers across active sprints, by priority.',
  'Velocity (4-sprint avg)': 'Average story points completed per sprint over last 4 sprints.',
  'Story Carryover': 'Stories not completed in sprint, carried to next. Lower is better.',
  'YTD Billing': 'Year-to-date billed revenue vs plan. Target ≥ 95%.',
  'P360 Avg': '6-dimension composite project health. Lower than 6.0 = Red.',
  // Sales
  'Open Pipeline Value': 'Total value of all deals in stages Discovery through Verbal Yes.',
  'Battle Cards Ready': '% of upcoming meetings with prepared briefing documents.',
  'BOFU Stage Duration': 'Avg days a deal spends in Negotiation + Verbal Yes.',
  'Win Rate (Last Q)': 'Closed-won / (Closed-won + Closed-lost) last quarter.',
  // HR
  'Total Headcount': 'Active employees across all BUs. Synced nightly from HRMS.',
  'Attrition (12m)': '12-month rolling attrition rate. Voluntary + involuntary exits / avg headcount.',
  '1-on-1 Adherence': '% of managers who held bi-weekly 1-on-1s with all reports.',
  'Engagement Score': 'Composite of pulse surveys + event scores. 0-10 scale.',
  // TA
  'Open JRs': 'Job requisitions currently open. Includes pending approval + active sourcing.',
  'JR Approval TAT': 'Avg days from JR raised to JR approved. Target ≤ 3d.',
  'Applications (MTD)': 'Total applications received this month.',
  'Stuck Candidates': 'Candidates with no movement in pipeline > 7 days.',
  'Slip Through Rate': '% of new hires who exit within 90 days. Lower is better.',
  // PMO
  'P360 Portfolio Avg': 'Portfolio-wide P360 score across all 23 accounts.',
  'CSAT Overdue Nudges': 'Accounts where CSAT survey not collected past target window.',
  'Portfolio Health Index': 'Composite of P360 + delivery health across portfolio.'
};

/* v5.5 — auto-close flyout on ANY context change */
document.addEventListener('click', function(e) {
  if (!document.body.classList.contains('flyout-open')) return;
  if (e.target.closest('.g-flyout, #gFly, .g-flyout-pinned')) return;
  const ctx = e.target.closest('.tab, .ta-tab, .pmo-tab, .admin-tab, .set-rail-item, .help-rail-item, .sidebar a, .kc, .p360-tile, .sprint-tile, .pp-tile, .kpi-card, .dm-card-h, .billing-row, [class*="-tab"]:not(.fly-tab):not(.pill-tab):not(.theme-tab):not(.tt-tab)');
  if (ctx) { window.closeFlyout && window.closeFlyout(); }
}, true);

/* Breadcrumb auto-injector */
const BREADCRUMB_MAP = {
  'org-pulse.html':    [['Home','#']],
  'engineering.html':  [['Home','org-pulse.html'],['Engineering','#']],
  'dm-home.html':      [['Home','org-pulse.html'],['Engineering','engineering.html'],['DM Dashboard','#']],
  'sales.html':        [['Home','org-pulse.html'],['Sales','#']],
  'hr.html':           [['Home','org-pulse.html'],['HR','#']],
  'ta.html':           [['Home','org-pulse.html'],['Talent Acquisition','#']],
  'pmo.html':          [['Home','org-pulse.html'],['PMO','#']],
  'finance.html':      [['Home','org-pulse.html'],['Finance','#']],
  'admin.html':        [['Home','org-pulse.html'],['Admin Console','#']],
  'settings.html':     [['Home','org-pulse.html'],['Settings','#']],
  'kpi-thresholds.html':[['Home','org-pulse.html'],['KPI Thresholds','#']],
  'help-center.html':  [['Home','org-pulse.html'],['Help Center','#']],
  'alerts.html':       [['Home','org-pulse.html'],['Alerts','#']],
  'action-items.html': [['Home','org-pulse.html'],['Action Items','#']]
};
document.addEventListener('DOMContentLoaded', function() {
  const path = location.pathname.split('/').pop().toLowerCase();
  const crumbs = BREADCRUMB_MAP[path];
  if (!crumbs) return;
  if (document.querySelector('.global-breadcrumb')) return;
  const main = document.querySelector('.main');
  if (!main) return;
  const html = '<div class="global-breadcrumb">' + crumbs.map((c, i) => {
    if (i === crumbs.length - 1) return '<span class="bc-current">' + c[0] + '</span>';
    return '<a href="' + c[1] + '" class="bc-link">' + c[0] + '</a><span class="bc-sep">›</span>';
  }).join('') + '</div>';
  main.insertAdjacentHTML('afterbegin', html);
});

/* Canonical Global Footer (reused from Org Pulse layout) + Sys Health migration
   v3.1 — Force-rebuilds the .global-footer on every page so all pages share
          the exact same footer (left: data freshness · center: sys health · right: copyright). */
document.addEventListener('DOMContentLoaded', function() {
  // 1. Extract sys-health strip content (if present) and hide the strip
  let sysHealthHtml = '';
  const strip = document.querySelector('.sys-health-strip');
  if (strip) {
    const items = strip.querySelectorAll('.sh-item');
    if (items.length) {
      const itemsHtml = Array.from(items).map(i => i.outerHTML).join('');
      sysHealthHtml = '<span class="global-footer-sys-health">' +
                      '<span class="sh-label-foot">Sys Health</span>' +
                      itemsHtml + '</span>';
    }
    strip.style.display = 'none';
    const main = document.querySelector('.main');
    if (main && main.style.paddingTop) main.style.paddingTop = '';
  }
  // (v3.3) Default sys-health when no strip present (dept pages, drill pages, etc.)
  if (!sysHealthHtml) {
    sysHealthHtml =
      '<span class="global-footer-sys-health">' +
        '<span class="sh-label-foot">Sys Health</span>' +
        '<span class="sh-item"><span class="sh-dot green"></span>Uptime 99.94%</span>' +
        '<span class="sh-item"><span class="sh-dot green"></span>P1 Incidents: 0</span>' +
        '<span class="sh-item"><span class="sh-dot green"></span>Deploy Success 98.1%</span>' +
      '</span>';
  }

  // 2. Build canonical footer (mirrors Org Pulse: data freshness · sys health · copyright)
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const canonicalHtml =
    '<span class="data-freshness"><span class="dot"></span>' +
      'Pulse v2.0 &middot; Data as of ' + dateStr + ' 07:00 IST</span>' +
    (sysHealthHtml || '<span></span>') +
    '<span>&copy; 2026 Nalashaa. All rights reserved.</span>';

  // 3. Force-replace any existing .global-footer with the canonical one
  let footer = document.querySelector('.global-footer');
  if (!footer) {
    footer = document.createElement('div');
    footer.className = 'global-footer';
    (document.querySelector('.main') || document.body).appendChild(footer);
  }
  footer.innerHTML = canonicalHtml;

  // 4. Strip any stale .app-footer that older pages may have hardcoded
  document.querySelectorAll('.app-footer').forEach(f => f.remove());
});


/* ═══════════════════════════════════════════════════════════════════
   ACTION ITEMS FLYOUT v2 (toolbar icon · context-filtered · full schema · minimize-to-strip)
   ═══════════════════════════════════════════════════════════════════ */
(function() {
  const AI_DATA = {
    pmo: [
      { id:'2026-15-PMO-002', text:'Resolve MedTech UAT slip · steering call follow-up', account:'MedTech Corp', section:'ESC', owner:'Karthik R.', type:'D+AM', origDue:'Apr 22', revDue:'—', rev:0, actual:null, status:'overdue', tag:'critical' },
      { id:'2026-15-PMO-005', text:'BioGen Phase 2 CIO alignment meeting', account:'BioGen Labs', section:'ESC', owner:'Karthik R.', type:'D+AM', origDue:'May 14', revDue:'—', rev:0, actual:null, status:'wip', tag:'high' },
      { id:'2026-15-PMO-007', text:'CSAT chase MedTech Corp (62 days overdue)', account:'MedTech Corp', section:'CSAT', owner:'Karthik R.', type:'AM', origDue:'May 8', revDue:'—', rev:0, actual:null, status:'overdue', tag:'critical' },
      { id:'2026-15-PMO-009', text:'14 roll-offs next 30d · plan reallocation', account:'—', section:'KPI', owner:'Karthik R.', type:'D', origDue:'May 22', revDue:'—', rev:0, actual:null, status:'wip', tag:'high' },
      { id:'2026-15-PMO-011', text:'PharmCare QA hire · close requisition', account:'PharmCare', section:'PROJ', owner:'Vikram S.', type:'D', origDue:'May 9', revDue:'May 14', rev:1, actual:null, status:'wip', tag:'high' },
      { id:'2026-14-PMO-022', text:'OncoSys SOW final draft', account:'OncoSys', section:'MINE', owner:'Karthik R.', type:'AM', origDue:'Apr 28', revDue:'May 2', rev:1, actual:'May 2', status:'done', tag:'medium' },
      { id:'2026-14-PMO-019', text:'Q1 portfolio retrospective writeup', account:'—', section:'KPI', owner:'Karthik R.', type:'D', origDue:'Apr 18', revDue:'—', rev:0, actual:'Apr 17', status:'done', tag:'medium' }
    ],
    sales: [
      { id:'2026-15-SAL-003', text:'Close MedTech Phase 2 demo follow-up', account:'MedTech Corp', section:'PROJ', owner:'Vikram S.', type:'AM', origDue:'May 9', revDue:'—', rev:0, actual:null, status:'wip', tag:'high' },
      { id:'2026-15-SAL-005', text:'BioGen stakeholder alignment', account:'BioGen Labs', section:'MINE', owner:'Kiran R.', type:'AM', origDue:'May 12', revDue:'—', rev:0, actual:null, status:'wip', tag:'high' }
    ],
    finance: [{ id:'2026-15-FIN-001', text:'AR chase MedTech invoice INV-0142', account:'MedTech Corp', section:'PROD', owner:'Vinay K.', type:'D', origDue:'Apr 30', revDue:'—', rev:0, actual:null, status:'overdue', tag:'critical' }],
    hr: [{ id:'2026-15-HR-001', text:'Q1 appraisal cycle close-out · 5 delayed', account:'—', section:'KPI', owner:'Anita Mehta', type:'D', origDue:'Apr 25', revDue:'—', rev:0, actual:null, status:'overdue', tag:'critical' }],
    ta: [{ id:'2026-15-TA-001', text:'JR-2026-0142 Senior Java approval', account:'—', section:'PROJ', owner:'Karthik R.', type:'D', origDue:'May 8', revDue:'—', rev:0, actual:null, status:'overdue', tag:'critical' }],
    ops: [{ id:'2026-15-OPS-001', text:'CapEx hardware refresh · Q2', account:'—', section:'PROJ', owner:'Ops Lead', type:'D', origDue:'Jun 30', revDue:'—', rev:0, actual:null, status:'wip', tag:'medium' }],
    engineering: [{ id:'2026-15-ENG-001', text:'BioGen Phase 2 scope review', account:'BioGen Labs', section:'PROD', owner:'D. Patel', type:'D', origDue:'May 15', revDue:'—', rev:0, actual:null, status:'wip', tag:'high' }]
  };
  function _aiPageContext() {
    const path = (location.pathname.split('/').pop() || '').toLowerCase();
    if (path.startsWith('pmo')) return { key:'pmo', label:'PMO' };
    if (path.startsWith('sales')) return { key:'sales', label:'Sales' };
    if (path.startsWith('finance')) return { key:'finance', label:'Finance' };
    if (path.startsWith('hr')) return { key:'hr', label:'HR' };
    if (path.startsWith('ta')) return { key:'ta', label:'TA' };
    if (path.startsWith('ops')) return { key:'ops', label:'Ops' };
    if (path.startsWith('engineering') || path.startsWith('dm-')) return { key:'engineering', label:'Engineering' };
    return { key:null, label:'Org-wide' };
  }
  function _aiAllItems() { const out = []; Object.keys(AI_DATA).forEach(k => AI_DATA[k].forEach(i => out.push(Object.assign({_dept:k}, i)))); return out; }
  function _aiFilteredItems(filter) {
    const ctx = _aiPageContext();
    let items = ctx.key ? (AI_DATA[ctx.key] || []) : _aiAllItems();
    if (filter === 'overdue') items = items.filter(i => i.status === 'overdue');
    else if (filter === 'open') items = items.filter(i => i.status === 'wip' || i.status === 'overdue');
    else if (filter === 'done') items = items.filter(i => i.status === 'done');
    else if (filter === 'mine') items = items.filter(i => (i.owner || '').includes('Karthik') || (i.owner || '').includes('Vikram') || (i.owner || '').includes('Anita'));
    return items;
  }
  // Convert "May 8" / "Apr 22" / "2026-05-08" → ISO YYYY-MM-DD for <input type=date>
  function _aiToISO(v) {
    if (!v || v === '—') return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
    const months = { Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12 };
    const m = v.match(/(\w{3})\s+(\d{1,2})/);
    if (!m || !months[m[1]]) return '';
    const y = 2026; const mo = String(months[m[1]]).padStart(2,'0'); const d = String(m[2]).padStart(2,'0');
    return y + '-' + mo + '-' + d;
  }
  function _aiCard(i) {
    const cls = i.status === 'overdue' ? 'overdue' : (i.status === 'wip' ? 'due-soon' : 'done');
    const statusCls = i.status === 'overdue' ? 'red' : (i.status === 'wip' ? 'amber' : 'green');
    const acct = i.account && i.account !== '—' ? '<span class="ai-acct">' + i.account + '</span>' : '';
    const planDisp = i.revDue && i.revDue !== '—' ? i.revDue : i.origDue;
    const planISO = _aiToISO(planDisp);
    const actualISO = _aiToISO(i.actual);
    const isOpen = i.status !== 'done';
    // Plan date: label for open (not editable), editable for done (backdating allowed)
    const planField = isOpen
      ? '<div class="ai-date-field"><span class="ai-date-lbl">Plan</span><span class="ai-date-static">' + planDisp + '</span></div>'
      : '<label class="ai-date-field"><span class="ai-date-lbl">Plan</span><input type="date" value="' + planISO + '" onchange="aiUpdateDate(\'' + i.id + '\',\'plan\',this.value)"></label>';
    return '<div class="ai-fly-item ' + cls + '" data-aid="' + i.id + '">' +
      '<div class="ai-card-top">' +
        '<span class="ai-card-id">' + i.id + '</span>' +
        '<select class="ai-status-select ' + statusCls + '" onchange="aiUpdateStatus(\'' + i.id + '\', this.value)" title="Change status">' +
          '<option value="overdue"' + (i.status==='overdue'?' selected':'') + '>Overdue</option>' +
          '<option value="wip"' + (i.status==='wip'?' selected':'') + '>In Progress</option>' +
          '<option value="done"' + (i.status==='done'?' selected':'') + '>Done</option>' +
        '</select>' +
      '</div>' +
      '<div class="ai-card-desc">' + i.text + '</div>' +
      '<div class="ai-card-meta">' +
        acct +
        '<span class="ai-owner"><i class="bi bi-person-circle"></i> ' + i.owner + '</span>' +
        '<span class="ai-section">' + i.section + (i.type ? '·' + i.type : '') + '</span>' +
      '</div>' +
      '<div class="ai-card-dates">' +
        planField +
        '<label class="ai-date-field"><span class="ai-date-lbl">Actual</span><input type="date" value="' + actualISO + '" onchange="aiUpdateDate(\'' + i.id + '\',\'actual\',this.value)"></label>' +
      '</div>' +
    '</div>';
  }
  function _aiActiveCard(i) { return _aiCard(i); }
  function _aiPastCard(i) { return _aiCard(i); }
  // ISO → "Mon DD" for display
  function _aiFromISO(iso) {
    if (!iso) return '—';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
  }
  // Find item across all dept buckets
  function _aiFindItem(id) {
    for (const k of Object.keys(AI_DATA)) {
      const it = AI_DATA[k].find(x => x.id === id);
      if (it) return it;
    }
    return null;
  }
  window.aiUpdateStatus = function(id, status) {
    const it = _aiFindItem(id); if (!it) return;
    it.status = status;
    if (status === 'done' && !it.actual) it.actual = new Date().toISOString().slice(0,10).replace(/-/g,'-');
    if (status !== 'done') it.actual = null;
    _aiRender();
  };
  window.aiUpdateDate = function(id, kind, isoVal) {
    const it = _aiFindItem(id); if (!it) return;
    if (kind === 'plan') {
      it.origDue = _aiFromISO(isoVal);
      it.revDue = '—';
    } else if (kind === 'actual') {
      it.actual = isoVal;
      if (isoVal) it.status = 'done';
    }
    _aiRender();
  };
  function _aiBuildFlyout() {
    if (document.getElementById('gAIFly')) return;
    const f = document.createElement('div');
    f.id = 'gAIFly'; f.className = 'g-ai-flyout';
    f.innerHTML = '<button class="ai-side-toggle ai-side-toggle-min" onclick="pushSideAIFlyout()" title="Minimize to side"><i class="bi bi-chevron-double-right"></i></button>' +
      '<div class="g-fly-header"><div><div class="g-fly-title" id="gAIFlyTitle">Action Items</div><div class="g-fly-sub" id="gAIFlySub"></div></div><div style="display:flex;gap:6px;align-items:center;"><button class="g-fly-pin-btn" id="gAIFlyPinBtn" onclick="pinAIFlyout()" title="Pin"><i class="bi bi-pin-angle"></i></button><button class="g-fly-close" onclick="closeActionItemsFlyout()">×</button></div></div><div class="g-fly-body" id="gAIFlyBody"></div>';
    document.body.appendChild(f);
    if (!document.getElementById('flyMinDock')) {
      const dock = document.createElement('div');
      dock.id = 'flyMinDock';
      dock.className = 'fly-min-dock';
      document.body.appendChild(dock);
    }
  }
  function _aiAddRow() {
    const today = new Date().toISOString().slice(0,10);
    return '<div class="ai-add-card">' +
      '<textarea id="aiAddText" placeholder="What needs to be done?" rows="2"></textarea>' +
      '<div class="ai-add-fields">' +
        '<input id="aiAddOwner" type="text" placeholder="Owner (e.g. Karthik R.)" />' +
        '<input id="aiAddDate" type="date" value="' + today + '" title="Plan date" />' +
        '<button class="ai-add-btn" onclick="aiAddItem()"><i class="bi bi-plus-lg"></i> Add</button>' +
      '</div>' +
    '</div>';
  }
  function _aiRender() {
    const filter = window._aiFilter || 'open';
    const all = _aiFilteredItems('all');
    const counts = { all: all.length, overdue: _aiFilteredItems('overdue').length, open: _aiFilteredItems('open').length, done: _aiFilteredItems('done').length };
    const ctx = _aiPageContext();
    document.getElementById('gAIFlyTitle').textContent = 'Action Items · ' + ctx.label;
    document.getElementById('gAIFlySub').textContent = counts.overdue + ' overdue · ' + counts.open + ' open · ' + counts.done + ' done';
    const items = _aiFilteredItems(filter);
    const chips = '<div class="ai-fly-filters">' +
      '<span class="ai-fly-chip ' + (filter==='open'?'active':'') + '" onclick="setAIFilter(\'open\')">Open (' + counts.open + ')</span>' +
      '<span class="ai-fly-chip overdue ' + (filter==='overdue'?'active':'') + '" onclick="setAIFilter(\'overdue\')">Overdue (' + counts.overdue + ')</span>' +
      '<span class="ai-fly-chip ' + (filter==='done'?'active':'') + '" onclick="setAIFilter(\'done\')">Done (' + counts.done + ')</span>' +
      '<span class="ai-fly-chip ' + (filter==='all'?'active':'') + '" onclick="setAIFilter(\'all\')">All (' + counts.all + ')</span>' +
      '<span class="ai-fly-chip ' + (filter==='mine'?'active':'') + '" onclick="setAIFilter(\'mine\')">Mine</span>' +
      '</div>';
    let body = '';
    if (filter === 'done') {
      body = items.length ? '<div class="ai-past-list">' + items.map(_aiPastCard).join('') + '</div>' : '<div class="ai-fly-empty">No completed items.</div>';
    } else {
      const active = items.filter(i => i.status !== 'done');
      const past = items.filter(i => i.status === 'done');
      body = (active.length ? '<div class="ai-fly-list">' + active.map(_aiActiveCard).join('') + '</div>' : '<div class="ai-fly-empty">No open items match this filter.</div>') +
             (past.length ? '<div class="ai-past-section"><div class="ai-past-head">Past (' + past.length + ')</div><div class="ai-past-list">' + past.map(_aiPastCard).join('') + '</div></div>' : '');
    }
    const footer = '<div style="margin-top:14px;padding-top:10px;border-top:1px solid var(--border);text-align:center;"><a href="action-items.html" style="font-size:11px;font-weight:600;color:var(--blue);text-decoration:none;">View all action items →</a></div>';
    document.getElementById('gAIFlyBody').innerHTML = _aiAddRow() + chips + body + footer;
  }
  window.aiAddItem = function() {
    const t = document.getElementById('aiAddText'); if (!t || !t.value.trim()) { t && t.focus(); return; }
    const o = document.getElementById('aiAddOwner'); const d = document.getElementById('aiAddDate');
    const ctx = _aiPageContext();
    const key = ctx.key || 'pmo';
    const today = new Date(); const dueISO = d && d.value ? d.value : today.toISOString().slice(0,10);
    const item = { id:'NEW-' + Date.now().toString().slice(-6), text:t.value.trim(), account:'—', section:'NEW', owner:(o&&o.value.trim())||'Me', type:'D', origDue: _aiFromISO(dueISO), revDue:'—', rev:0, actual:null, status:'wip' };
    AI_DATA[key].unshift(item);
    t.value = ''; if (o) o.value = '';
    _aiRender();
  };
  window.openActionItemsFlyout = function() {
    _aiBuildFlyout();
    if (!window._aiFilter) window._aiFilter = _aiFilteredItems('overdue').length > 0 ? 'open' : 'open';
    _aiRender();
    document.getElementById('gAIFly').classList.add('open');
    const primary = document.getElementById('gFly');
    if (primary && primary.classList.contains('open')) primary.classList.add('shifted-left');
    const min = document.getElementById('aiMinStrip'); if (min) min.remove();
  };
  window.closeActionItemsFlyout = function() {
    if (window._aiPinned) return;
    const f = document.getElementById('gAIFly'); if (f) f.classList.remove('open');
    const primary = document.getElementById('gFly'); if (primary) primary.classList.remove('shifted-left');
  };
  window.setAIFilter = function(f) { window._aiFilter = f; _aiRender(); };
  window.pinAIFlyout = function() {
    window._aiPinned = !window._aiPinned;
    const btn = document.getElementById('gAIFlyPinBtn'); if (btn) btn.classList.toggle('pinned', window._aiPinned);
  };
  // Minimize collapses gAIFly to a thin vertical strip on the right edge (in place of full flyout)
  window.pushSideAIFlyout = function() {
    const f = document.getElementById('gAIFly'); if (!f) return;
    f.classList.add('collapsed');
    const primary = document.getElementById('gFly');
    if (primary) primary.classList.remove('shifted-left');
    // Replace body content with collapsed strip view
    const counts = _aiFilteredItems('overdue').length;
    const ctx = _aiPageContext();
    f.querySelector('.g-fly-header').style.display = 'none';
    f.querySelector('#gAIFlyBody').style.display = 'none';
    let strip = f.querySelector('.ai-collapsed-strip');
    if (!strip) {
      strip = document.createElement('div');
      strip.className = 'ai-collapsed-strip';
      strip.onclick = function() { window.expandAIFlyout(); };
      f.appendChild(strip);
    }
    strip.innerHTML = '<button class="ai-side-toggle ai-side-toggle-max" onclick="event.stopPropagation();window.expandAIFlyout();" title="Expand"><i class="bi bi-chevron-double-left"></i></button>' +
      '<div class="ai-collapsed-icon"><i class="bi bi-list-check"></i></div>' +
      '<div class="ai-collapsed-title">Action Items</div>' +
      '<div class="ai-collapsed-ctx">' + ctx.label + '</div>' +
      (counts ? '<div class="ai-collapsed-badge">' + counts + ' overdue</div>' : '');
    strip.style.display = 'flex';
  };
  window.expandAIFlyout = function() {
    const f = document.getElementById('gAIFly'); if (!f) return;
    f.classList.remove('collapsed');
    const hdr = f.querySelector('.g-fly-header'); if (hdr) hdr.style.display = '';
    const body = f.querySelector('#gAIFlyBody'); if (body) body.style.display = '';
    const strip = f.querySelector('.ai-collapsed-strip'); if (strip) strip.style.display = 'none';
    if (!f.classList.contains('open')) {
      f.classList.add('open');
      const primary = document.getElementById('gFly');
      if (primary && primary.classList.contains('open')) primary.classList.add('shifted-left');
    }
    _aiRender();
  };
  // Override openActionItemsFlyout to call expand if collapsed
  const _origOpenAI = window.openActionItemsFlyout;
  window.openActionItemsFlyout = function() {
    const f = document.getElementById('gAIFly');
    if (f && f.classList.contains('collapsed')) { window.expandAIFlyout(); return; }
    _origOpenAI();
  };
})();