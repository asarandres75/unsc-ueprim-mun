/* UNSC Delegate Hub, UEPRIM-MUN IV Edition.
   Single-page app with hash routes. Content lives in content.js. */
(function () {
  'use strict';
  const S = window.SITE;
  let app = document.getElementById('app');
  let ROSTER = [];

  /* ---------------- helpers ---------------- */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const fmtDate = (t) => new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const fmtTime = (t) => new Date(t).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const flag = (iso) => `<img class="flag" src="https://flagcdn.com/w40/${iso}.png" alt="" loading="lazy">`;
  const country = (id) => ROSTER.find((c) => c.id === id) || { short: id, name: id, iso: 'un' };
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2600);
  }
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem(k); } catch {} },
  };

  const I = {
    book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/></svg>',
    files: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="13" height="13" rx="3"/><path d="M16 8V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h2"/></svg>',
    scale: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 21h14M4 7h16M7 7l-3 7a3.5 3.5 0 0 0 6 0zM17 7l-3 7a3.5 3.5 0 0 0 6 0z"/></svg>',
    cal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
    clip: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 2h6v4H9zM9 11h6M9 15h6M9 19h3"/></svg>',
    mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    note: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    lock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    flagship: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20c2 1 4 1 6 0s4-1 6 0 4 1 6 0"/><path d="M4 17 3 12h18l-2 5"/><path d="M12 12V4l5 3-5 3"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3H8v2l1 1v5l-3 3v2h5v5l1 1 1-1v-5h5v-2l-3-3V6l1-1z"/></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    paperclip: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 11-8.5 8.5a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 7"/></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    dl: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12M6 10l6 6 6-6M4 20h16"/></svg>',
  };

  /* ---------------- session & storage ---------------- */
  let session = ls.get('unsc.session', null);
  if (session && session.user && session.user.exp && Date.now() > session.user.exp) session = null;
  const isAdmin = () => session && session.user.role === 'presidency';

  async function api(path, opts = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (session) headers.Authorization = 'Bearer ' + session.token;
    const r = await fetch(path, { ...opts, headers: { ...headers, ...(opts.headers || {}) } });
    let j = {};
    try { j = await r.json(); } catch {}
    if (!r.ok) { const e = new Error(j.error || ('HTTP ' + r.status)); e.status = r.status; throw e; }
    return j;
  }

  // Data store: uses the online database when it is connected, and this browser otherwise.
  const localKey = (key) => 'unsc.local.' + (key === 'notes' ? session.user.id + '.' : 'shared.') + key;
  const store = {
    online() { return Boolean(session && session.storage); },
    async get(key, fallback) {
      if (this.online()) {
        try { const j = await api('/api/data?key=' + key); return j.value == null ? fallback : j.value; }
        catch (e) { if (e.status === 401) return logout(true); if (e.status !== 503) throw e; session.storage = false; }
      }
      if (key === 'mysanctions') return (ls.get(localKey('sanctions'), []) || []).filter((s) => s.country === session.user.id);
      return ls.get(localKey(key), fallback);
    },
    async put(key, value) {
      if (this.online()) {
        try { await api('/api/data?key=' + key, { method: 'PUT', body: JSON.stringify({ value }) }); return true; }
        catch (e) { if (e.status === 401) return logout(true); if (e.status !== 503) throw e; session.storage = false; }
      }
      ls.set(localKey(key), value); return true;
    },
  };

  function logout(expired) {
    session = null; ls.del('unsc.session');
    if (expired) toast('Your session ended, please sign in again.');
    if (location.hash && location.hash !== '#/') location.hash = '#/'; else render();
  }

  /* ---------------- shared pieces ---------------- */
  const NAV = [
    ['#/', 'Home'], ['#/documents', 'Documents'], ['#/procedure', 'Procedure'],
    ['#/sessions', 'PRE-MUN'], ['#/contacts', 'Contacts'], ['#/notes', 'My Notes'],
  ];
  function shell(inner, route) {
    const u = session.user;
    const av = u.role === 'delegate' ? `<img src="https://flagcdn.com/w80/${country(u.id).iso}.png" alt="">` : `<span class="av">${esc(u.name[0])}</span>`;
    const nav = NAV.filter(([h]) => !(isAdmin() && h === '#/notes')).map(([h, t]) => `<a href="${h}" class="${route === h ? 'on' : ''}">${t}</a>`).join('') +
      (isAdmin() ? `<a href="#/presidency" class="admin ${route === '#/presidency' ? 'on' : ''}">Presidency</a>` : '');
    return `
      <header class="topbar"><div class="topbar-in">
        <a class="brand" href="#/"><img src="assets/unsc-logo.png" alt=""><div><div class="t2">Security Council</div></div></a>
        <button class="menu-btn" id="menuBtn" aria-label="Open menu">${I.menu}</button>
        <nav class="nav" id="nav">${nav}
          <div class="who"><span class="chip-user">${av}<span>${esc(u.role === 'delegate' ? u.short : u.name)}</span></span><button class="linkbtn" id="logoutBtn">Sign out</button></div>
        </nav>
      </div></header>
      <main>${!store.online() && isAdmin() ? `<div class="banner"><div><b>The online database is not connected.</b> Changes are being saved in this browser only.</div></div>` : ''}${inner}</main>
      <footer class="site-foot"><img src="assets/ueprim-logos.png" alt="UEPRIM 50 years and UEPRIM MUN"><div>United Nations Security Council, UEPRIM-MUN ${esc(S.edition)}</div></footer>`;
  }
  function pageHead(kicker, title, right = '') {
    return `<div class="page-head"><div>${kicker ? `<div class="k">${esc(kicker)}</div>` : ''}<h1>${esc(title)}</h1></div>${right}</div>`;
  }
  const fileType = (p) => (p.split('.').pop() || '').toUpperCase();
  const fmtSize = (b) => b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';

  /* ---------------- COVER / LOGIN ---------------- */
  function skyline() {
    let flags = '';
    for (let i = 0; i < 34; i++) {
      const x = 20 + i * 41; const h = 70 + ((i * 37) % 30);
      flags += `<line x1="${x}" y1="${150 - h}" x2="${x}" y2="150" stroke="rgba(255,255,255,.45)" stroke-width="2"/>` +
        `<path d="M${x} ${150 - h} l22 6 l-22 6z" fill="rgba(255,255,255,.38)"/>`;
    }
    return `<svg viewBox="0 0 1400 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <rect x="860" y="-40" width="150" height="190" fill="rgba(255,255,255,.07)"/>
      ${Array.from({ length: 14 }, (_, i) => `<line x1="860" x2="1010" y1="${-30 + i * 13}" y2="${-30 + i * 13}" stroke="rgba(255,255,255,.05)"/>`).join('')}
      <path d="M520 150 v-38 a40 40 0 0 1 80 0 v38z" fill="rgba(255,255,255,.08)"/>
      <rect x="120" y="105" width="300" height="45" fill="rgba(255,255,255,.05)"/>
      <rect x="1000" y="95" width="300" height="55" fill="rgba(255,255,255,.05)"/>
      ${flags}</svg>`;
  }
  function viewLogin() {
    const opts = ROSTER.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join('');
    app.innerHTML = `
      <section class="cover">
        <div class="cover-glow" aria-hidden="true"><img src="assets/emblem-light.png" alt=""></div>
        <div class="cover-inner">
          <div class="cover-left">
            <div class="edition">${esc(S.edition)}</div>
            <div class="lockup"><img src="assets/unsc-logo.png" alt="United Nations emblem"><div class="rule"></div><div><h1>SECURITY<br>COUNCIL</h1><div class="un">United Nations</div></div></div>
          </div>
          <form class="login-card" id="loginForm" autocomplete="on">
            <div class="seg" role="group" aria-label="Sign in as">
              <button type="button" data-role="delegate" aria-pressed="true">Delegate</button>
              <button type="button" data-role="presidency" aria-pressed="false">Presidency</button>
            </div>
            <div id="roleFields"></div>
            <div class="err" id="loginErr"></div>
            <button class="btn btn-primary btn-block" type="submit" id="loginBtn">Enter</button>
          </form>
        </div>
        <div class="skyline">${skyline()}</div>
        <div class="gold-rule"></div>
        <div class="cover-foot"><img src="assets/ueprim-logos.png" alt="UEPRIM 50 years and UEPRIM MUN"></div>
      </section>`;
    let role = 'delegate';
    const fields = () => {
      $('#roleFields').innerHTML = role === 'delegate' ? `
        <div class="field"><label class="f" for="country">Delegation</label>
          <select class="input" id="country" required><option value="">Choose your delegation</option>${opts}</select></div>
        <div class="field"><label class="f" for="pin">PIN</label>
          <input class="input" id="pin" type="password" required minlength="4" autocomplete="current-password" placeholder="Enter PIN"></div>` : `
        <div class="field"><label class="f" for="code">Code</label>
          <input class="input" id="code" type="password" required autocomplete="off" placeholder="Enter code"></div>`;
      const saved = ls.get('unsc.lastCountry', '');
      if (role === 'delegate' && saved && ROSTER.some((c) => c.id === saved)) $('#country').value = saved;
    };
    fields();
    $$('.seg button').forEach((b) => b.addEventListener('click', () => {
      role = b.dataset.role;
      $$('.seg button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      $('#loginErr').textContent = ''; fields();
    }));
    $('#loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = $('#loginBtn'); btn.disabled = true; btn.textContent = 'Checking...';
      const body = { role };
      if (role === 'delegate') { body.country = $('#country').value; body.pin = $('#pin').value; }
      else { body.code = $('#code').value; }
      try {
        const j = await api('/api/login', { method: 'POST', body: JSON.stringify(body) });
        session = { token: j.token, user: j.user, storage: j.storage };
        ls.set('unsc.session', session);
        if (role === 'delegate') ls.set('unsc.lastCountry', body.country);
        const target = role === 'presidency' ? '#/presidency' : '#/';
        if (location.hash === target) render(); else location.hash = target;
      } catch (err) {
        $('#loginErr').textContent = err.status ? err.message : 'Could not reach the server. Check your connection and try again.';
      } finally { btn.disabled = false; btn.textContent = 'Enter'; }
    });
  }

  /* ---------------- HOME: events + public notes ---------------- */
  async function viewHome() {
    const u = session.user;
    const myApp = app;
    app.innerHTML = shell(`
      <section class="hub-head"><img class="bgem" src="assets/emblem-light.png" alt="">
        <div class="k">UEPRIM-MUN ${esc(S.edition)}</div><h1>Security Council</h1><div class="gold-line"></div></section>
      <div id="notice"></div>
      <h2 class="sec-t">Events</h2>
      <div id="events" class="events"><p class="muted">Loading...</p></div>
      ${u.role === 'delegate' ? '<div id="myRecord"></div>' : ''}
      <h2 class="sec-t">Public notes</h2>
      <form class="panel post-form" id="postForm">
        <input class="input" id="pTitle" maxlength="140" placeholder="Title">
        <textarea class="input" id="pText" rows="3" maxlength="8000" placeholder="Write a note for the whole Council"></textarea>
        <div class="post-actions">
          <label class="btn btn-ghost btn-sm file-btn">${I.paperclip} <span id="fileLbl">Attach PDF or Word</span><input type="file" id="pFile" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden></label>
          <button class="btn btn-primary btn-sm" type="submit" id="postBtn">Post</button>
        </div>
      </form>
      <div id="board" class="board-pub"><p class="muted">Loading...</p></div>`, '#/');

    // notice, events, record and board load in parallel
    const [notice, events, mine, board] = await Promise.all([
      store.get('notice', null).catch(() => null),
      store.get('events', null).catch(() => null),
      u.role === 'delegate' ? store.get('mysanctions', []).catch(() => []) : Promise.resolve([]),
      loadBoard(),
    ]);
    if (app !== myApp) return;
    if (notice && notice.announcement) $('#notice').innerHTML = `<div class="banner info"><div><b>From the Presidency.</b> ${esc(notice.announcement)}</div></div>`;
    const evs = Array.isArray(events) ? events : S.events;
    $('#events').innerHTML = evs.length ? evs.map((e) => `<div class="event"><div><div class="k">${esc(e.when || '')}</div><h3>${esc(e.title)}</h3>${e.text ? `<p>${esc(e.text)}</p>` : ''}</div></div>`).join('') : '<div class="empty">No upcoming events.</div>';
    if (u.role === 'delegate') {
      const w = mine.filter((s) => s.type === 'written').length; const f = mine.filter((s) => s.type === 'formal').length;
      $('#myRecord').innerHTML = `<div class="panel" style="margin-top:14px"><h2>Your conduct record</h2><p class="sub" style="margin:0">${mine.length === 0
        ? 'The delegation has no warnings on record.'
        : `The delegation has ${w} written warning${w === 1 ? '' : 's'} and ${f} formal warning${f === 1 ? '' : 's'} on record. Two written warnings add up to a formal one. If you think something is wrong, talk to UNSC Presidency after sessions or internally.`}</p></div>`;
    }
    drawBoard(board);

    const fileIn = $('#pFile');
    fileIn.addEventListener('change', () => { $('#fileLbl').textContent = fileIn.files[0] ? fileIn.files[0].name : 'Attach PDF or Word'; });
    $('#postForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = $('#postBtn'); btn.disabled = true;
      try {
        let file = null;
        const f = fileIn.files[0];
        if (f) {
          if (f.size > 4 * 1024 * 1024) throw new Error('That file is larger than 4 MB. Try compressing it first.');
          btn.textContent = 'Uploading...';
          const r = await fetch('/api/board?action=upload&name=' + encodeURIComponent(f.name), { method: 'POST', headers: { Authorization: 'Bearer ' + session.token, 'Content-Type': 'application/octet-stream' }, body: f });
          const j = await r.json().catch(() => ({}));
          if (!r.ok) throw new Error(j.error || 'Upload failed.');
          file = j.file;
        }
        btn.textContent = 'Posting...';
        await api('/api/board', { method: 'POST', body: JSON.stringify({ title: $('#pTitle').value, text: $('#pText').value, file }) });
        $('#pTitle').value = ''; $('#pText').value = ''; fileIn.value = ''; $('#fileLbl').textContent = 'Attach PDF or Word';
        drawBoard(await loadBoard());
        toast('Posted');
      } catch (err) { toast(err.message === 'storage-not-configured' ? 'Public notes need the online database.' : err.message); }
      finally { btn.disabled = false; btn.textContent = 'Post'; }
    });
  }
  async function loadBoard() {
    try { const j = await api('/api/board'); return j.value || []; } catch (e) { return null; }
  }
  function drawBoard(list) {
    const box = $('#board'); if (!box) return;
    if (list == null) { box.innerHTML = '<div class="empty">Public notes are not available right now.</div>'; return; }
    const u = session.user;
    box.innerHTML = list.length ? list.map((n) => `
      <article class="pnote ${n.role === 'presidency' ? 'pres' : ''}">
        <div class="m"><span>${n.role === 'delegate' ? flag(country(n.authorId).iso) : ''}<b>${esc(n.role === 'delegate' ? country(n.authorId).short : n.by)}</b>, ${fmtTime(n.at)}</span>
          ${isAdmin() || n.authorId === u.id ? `<button class="linkbtn danger" data-delpost="${n.id}">Delete</button>` : ''}</div>
        ${n.title ? `<h3>${esc(n.title)}</h3>` : ''}${n.text ? `<p>${esc(n.text)}</p>` : ''}
        ${n.file ? `<a class="attach" href="${esc(n.file.url)}" target="_blank" rel="noopener"><span class="ft ${esc(n.file.ext)}">${esc((n.file.ext || '').toUpperCase())}</span><span>${esc(n.file.name)}</span><small>${fmtSize(n.file.size || 0)}</small></a>` : ''}
      </article>`).join('') : '<div class="empty">No public notes yet.</div>';
    $$('[data-delpost]', box).forEach((b) => b.onclick = async () => {
      if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Confirm delete'; return; }
      try { await api('/api/board?id=' + encodeURIComponent(b.dataset.delpost), { method: 'DELETE' }); drawBoard(await loadBoard()); }
      catch (e) { toast(e.message); }
    });
  }

  /* ---------------- DOCUMENTS ---------------- */
  function docCard([t, p]) {
    const ft = fileType(p);
    const thumb = 'thumbs/' + p.split('/').pop().replace(/\.[^.]+$/, '') + '.jpg';
    return `<a class="doc" href="${p}" target="_blank" rel="noopener"><div class="cover-thumb"><img src="${thumb}" alt="" loading="lazy" onerror="this.remove()"><span class="ft ${ft.toLowerCase()}">${ft}</span></div><div class="body"><h3>${esc(t)}</h3></div></a>`;
  }
  function viewDocuments() {
    app.innerHTML = shell(`${pageHead('', 'Documents')}
      <div class="search" style="max-width:460px;margin:0 0 22px">${I.search}<input id="docSearch" placeholder="Search documents"></div>
      <div id="docList"></div>`, '#/documents');
    const draw = (q) => {
      q = (q || '').toLowerCase();
      $('#docList').innerHTML = S.documents.map((g) => {
        const items = g.items.filter((i) => !q || i[0].toLowerCase().includes(q));
        if (!g.items.length) return q ? '' : `<section class="doc-group"><h2>${esc(g.group)}</h2></section>`;
        if (!items.length) return '';
        return `<section class="doc-group"><h2>${esc(g.group)}</h2><div class="docs">${items.map(docCard).join('')}</div></section>`;
      }).join('') || '<div class="empty">Nothing matches that search.</div>';
    };
    draw(''); $('#docSearch').addEventListener('input', (e) => draw(e.target.value));
  }

  /* ---------------- PROCEDURE ---------------- */
  const wm = '<img class="wm" src="assets/unsc-logo.png" alt="">';
  const paperFoot = () => `<div class="paper-foot"><img src="assets/unsc-logo.png" alt="">UEPRIM MUN IV EDITION</div>`;
  function viewProcedure() {
    app.innerHTML = shell(`${pageHead('', 'Rules of Procedure')}
      <div class="panel soon"><h2>Coming soon!</h2></div>
      <section class="doc-group"><h2>Motions and points</h2><div class="docs">${docCard(['Full Motions and Points sheet', 'docs/motions-and-points-full.pdf'])}</div></section>`, '#/procedure');
  }

  /* ---------------- SESSIONS ---------------- */
  function viewSessions() {
    const docName = (p) => { for (const g of S.documents) for (const i of g.items) if (i[1] === p) return i[0]; return p.split('/').pop(); };
    app.innerHTML = shell(`${pageHead('', 'PRE-MUN Sessions')}
      <div class="timeline">${S.sessions.days.map((d) => `<div class="tl${d.upcoming ? ' upcoming' : ''}"><div class="d">Day ${esc(d.day)}</div><h3>${esc(d.title)}</h3><p>${esc(d.text)}</p>
        ${d.docs ? `<div class="docs-inline">${d.docs.map((p) => `<a class="pill" href="${p}" target="_blank" rel="noopener">${I.dl} ${esc(docName(p))}</a>`).join('')}</div>` : ''}</div>`).join('')}</div>`, '#/sessions');
  }

  /* ---------------- CONTACTS ---------------- */
  function viewContacts() {
    app.innerHTML = shell(`${pageHead('', 'Contacts')}
      <div class="contacts">${S.contacts.map((d) => `<div class="contact">
        <div class="row"><span class="role">${esc(d.role)}</span></div>
        <div class="cname">${esc(d.name)}</div>
        <div class="cmail">${esc(d.email)}</div>
        <div class="cbtns"><button class="btn btn-primary" data-copy="${esc(d.email)}">Copy email</button></div>
      </div>`).join('')}</div>`, '#/contacts');
    $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy); toast('Email copied'); } catch { toast(b.dataset.copy); }
    }));
  }

  /* ---------------- MY NOTES ---------------- */
  const FOLDERS = [['all', 'All notes'], ['general', 'General'], ['topicA', 'Topic A'], ['topicB', 'Topic B'], ['speech', 'Speeches'], ['clauses', 'Clauses'], ['pinned', 'Pinned']];
  const folderName = (k) => (FOLDERS.find((f) => f[0] === k) || [k, 'General'])[1];
  async function viewNotes() {
    if (isAdmin()) { location.hash = '#/presidency'; return; }
    const u = session.user;
    let notes = [];
    app.innerHTML = shell('<p>Loading your notes...</p>', '#/notes');
    const myApp = app;
    try { notes = await store.get('notes', []); } catch (e) { toast(e.message); }
    if (app !== myApp) return;
    let folder = 'all', sort = 'recent', q = '', tagFilter = '';
    const firstName = u.role === 'delegate' ? 'delegate of ' + country(u.id).short : u.name;
    app.innerHTML = shell(`
      ${!store.online() ? '<div class="banner"><div><b>Notes are saved in this browser only right now.</b></div></div>' : ''}
      <div class="notes-wrap">
        <aside class="notes-side" id="side"></aside>
        <section class="notes-main">
          <div class="notes-top"><div class="search">${I.search}<input id="nq" placeholder="Search your notes"></div>
            <button class="btn btn-ghost" id="exportBtn">${I.dl} Export</button><button class="btn btn-primary" id="newBtn">${I.plus} New Note</button></div>
          <div class="welcome"><h1>Welcome back, ${esc(firstName)}!</h1></div>
          <div class="tabs" id="ftabs"></div>
          <div class="notes-bar"><h2 id="ncount"></h2><div class="sorter"><button data-s="recent">Most recent</button><button data-s="az">A to Z</button></div></div>
          <div class="ngrid" id="ngrid"></div>
        </section>
      </div>`, '#/notes');

    const save = async () => { try { await store.put('notes', notes); return true; } catch (e) { toast('Could not save: ' + e.message); return false; } };
    const allTags = () => [...new Set(notes.flatMap((n) => n.tags || []))].slice(0, 16);
    const filtered = () => {
      let list = notes.filter((n) => folder === 'all' || (folder === 'pinned' ? n.pinned : n.folder === folder));
      if (tagFilter) list = list.filter((n) => (n.tags || []).includes(tagFilter));
      if (q) list = list.filter((n) => (n.title + ' ' + n.body + ' ' + (n.tags || []).join(' ')).toLowerCase().includes(q));
      list.sort(sort === 'az' ? (a, b) => (a.title || '').localeCompare(b.title || '') : (a, b) => b.updated - a.updated);
      return list.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    };
    const draw = () => {
      const counts = (k) => k === 'all' ? notes.length : k === 'pinned' ? notes.filter((n) => n.pinned).length : notes.filter((n) => n.folder === k).length;
      $('#side').innerHTML = `<div class="sb-t" style="margin-top:0">Notebook</div>${FOLDERS.map(([k, t]) => `<button data-f="${k}" class="${folder === k ? 'on' : ''}">${t}<span class="count">${counts(k)}</span></button>`).join('')}
        ${allTags().length ? `<div class="sb-t">Your tags</div><div class="tagchips">${allTags().map((t) => `<button data-t="${esc(t)}" class="${tagFilter === t ? 'on' : ''}">#${esc(t)}</button>`).join('')}</div>` : ''}`;
      $('#ftabs').innerHTML = FOLDERS.slice(0, 6).map(([k, t]) => `<button data-f="${k}" class="${folder === k ? 'on' : ''}">${t}</button>`).join('');
      $$('.sorter button').forEach((b) => b.classList.toggle('on', b.dataset.s === sort));
      const list = filtered();
      $('#ncount').textContent = `${folder === 'all' ? 'All notes' : folderName(folder)} (${list.length})`;
      $('#ngrid').innerHTML = list.length ? list.map((n) => `
        <button class="ncard" data-id="${n.id}"><div class="prev"><b>${esc(n.title || 'Untitled note')}</b>${esc((n.body || '').slice(0, 420))}${n.pinned ? `<span class="badge" style="color:var(--gold)">${I.pin}</span>` : ''}</div>
          <div class="meta"><div class="row"><h3>${esc(n.title || 'Untitled note')}</h3><span class="ftag">${esc(folderName(n.folder))}</span></div>
          <div class="date"><span>${fmtDate(n.updated)}</span><span>${(n.body || '').trim() ? (n.body.trim().split(/\s+/).length + ' words') : 'Empty'}</span></div></div></button>`).join('')
        : `<div class="empty" style="grid-column:1/-1">${notes.length ? 'No notes match what you are looking for.' : 'You have no notes yet.'}<div style="margin-top:12px"><button class="btn btn-primary" id="emptyNew">${I.plus} New Note</button></div></div>`;
      const en = $('#emptyNew'); if (en) en.onclick = () => openEditor(null);
    };
    const openEditor = (id) => {
      let n = notes.find((x) => x.id === id);
      const isNew = !n;
      if (!n) n = { id: uid(), title: '', body: '', folder: folder !== 'all' && folder !== 'pinned' ? folder : 'general', tags: [], pinned: false, created: Date.now(), updated: Date.now() };
      const ov = document.createElement('div'); ov.className = 'overlay';
      ov.innerHTML = `<div class="drawer" role="dialog" aria-label="Edit note">
        <div class="drawer-head"><span class="saved" id="savedLbl">${isNew ? 'New note' : 'Last edited ' + fmtTime(n.updated)}</span>
          <button class="btn btn-ghost btn-sm" id="pinBtn">${n.pinned ? 'Unpin' : 'Pin'}</button>
          <button class="btn btn-danger btn-sm" id="delBtn">Delete</button>
          <button class="btn btn-primary btn-sm" id="doneBtn">Done</button></div>
        <div class="drawer-body">
          <input class="title-input" id="nt" placeholder="Note title" value="${esc(n.title)}">
          <div class="row-inline"><select class="input" id="nf" style="width:auto">${FOLDERS.filter((f) => !['all', 'pinned'].includes(f[0])).map(([k, t]) => `<option value="${k}" ${n.folder === k ? 'selected' : ''}>${t}</option>`).join('')}</select>
            <input class="input" id="ntags" style="flex:1;min-width:180px" placeholder="Tags separated by commas, for example sources, bloc, rebuttal" value="${esc((n.tags || []).join(', '))}"></div>
          <textarea class="note-body" id="nb" placeholder="Start writing...">${esc(n.body)}</textarea>
        </div></div>`;
      document.body.appendChild(ov);
      const nt = $('#nt', ov), nb = $('#nb', ov), nf = $('#nf', ov), ntags = $('#ntags', ov);
      (isNew ? nt : nb).focus();
      let timer = null, dirty = false;
      const commit = async () => {
        n.title = nt.value.trim(); n.body = nb.value; n.folder = nf.value;
        n.tags = ntags.value.split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean).slice(0, 8);
        n.updated = Date.now();
        if (!notes.includes(n)) { if (!n.title && !n.body.trim()) return; notes.unshift(n); }
        $('#savedLbl', ov).textContent = 'Saving...';
        const ok = await save(); dirty = false;
        $('#savedLbl', ov).textContent = ok ? 'Saved ' + fmtTime(n.updated) : 'Not saved';
      };
      const schedule = () => { dirty = true; clearTimeout(timer); timer = setTimeout(commit, 900); };
      [nt, nb, ntags].forEach((el) => el.addEventListener('input', schedule)); nf.addEventListener('change', schedule);
      const close = async () => { clearTimeout(timer); if (dirty) await commit(); ov.remove(); draw(); };
      $('#doneBtn', ov).onclick = close;
      ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
      ov.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
      $('#pinBtn', ov).onclick = async () => { n.pinned = !n.pinned; $('#pinBtn', ov).textContent = n.pinned ? 'Unpin' : 'Pin'; await commit(); };
      $('#delBtn', ov).onclick = async () => {
        if ($('#delBtn', ov).dataset.sure !== '1') { $('#delBtn', ov).dataset.sure = '1'; $('#delBtn', ov).textContent = 'Click again to delete'; return; }
        clearTimeout(timer); notes = notes.filter((x) => x.id !== n.id); await save(); ov.remove(); draw(); toast('Note deleted');
      };
    };
    // events
    app.addEventListener('click', (e) => {
      const f = e.target.closest('[data-f]'); if (f) { folder = f.dataset.f; tagFilter = ''; draw(); return; }
      const t = e.target.closest('[data-t]'); if (t) { tagFilter = tagFilter === t.dataset.t ? '' : t.dataset.t; draw(); return; }
      const s = e.target.closest('[data-s]'); if (s) { sort = s.dataset.s; draw(); return; }
      const c = e.target.closest('.ncard'); if (c) openEditor(c.dataset.id);
    });
    $('#nq').addEventListener('input', (e) => { q = e.target.value.toLowerCase(); draw(); });
    $('#newBtn').onclick = () => openEditor(null);
    $('#exportBtn').onclick = () => {
      const txt = notes.map((n) => `${n.title || 'Untitled note'}\n[${folderName(n.folder)}] ${fmtTime(n.updated)}${n.tags && n.tags.length ? '  #' + n.tags.join(' #') : ''}\n\n${n.body}\n\n${'='.repeat(40)}\n`).join('\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain' }));
      a.download = 'my-unsc-notes.txt'; a.click();
    };
    draw();
  }

  /* ---------------- PRESIDENCY ---------------- */
  const CRITERIA = [
    ['diplomacy', 'Diplomacy', 'Clear, diplomatic and strategic delivery'],
    ['mastery', 'Mastery', 'Command of the facts and correct use of the rules'],
    ['participation', 'Participation', 'Active, appropriate and persuasive input'],
    ['presence', 'Presence', 'Posture, eye contact and purposeful body language'],
    ['negotiation', 'Negotiation', 'Builds agreement and consensus across positions'],
  ];
  async function viewPresidency(sub) {
    if (!isAdmin()) { location.hash = '#/'; return; }
    const tab = sub || 'sanctions';
    const tabs = [['sanctions', 'Sanctions'], ['internal', 'Internal notes'], ['evaluations', 'Evaluations'], ['notice', 'Events and announcement'], ['delegations', 'Delegations']];
    app.innerHTML = shell(`
      <section class="hub-head admin-head"><img class="bgem" src="assets/emblem-light.png" alt=""><div class="k">${esc(session.user.name)}</div><h1>Presidency Only</h1><div class="gold-line"></div><a class="btn btn-gold btn-sm head-link" href="https://gavelling.com/create/sessions" target="_blank" rel="noopener">Open Gavelling</a></section>
      <div class="tabs">${tabs.map(([k, t]) => `<a href="#/presidency/${k}" class="${k === tab ? 'on' : ''}">${t}</a>`).join('')}</div>
      <div id="adm"><p>Loading...</p></div>`, '#/presidency');
    const box = $('#adm');
    const countryOpts = ROSTER.map((c) => `<option value="${c.id}">${esc(c.short)}</option>`).join('');
    const by = session.user.name;

    if (tab === 'sanctions') {
      const drawS = async () => {
        const list = await store.get('sanctions', []);
        if (!box.isConnected) return;
        const tally = ROSTER.map((c) => {
          const mine = list.filter((s) => s.country === c.id);
          const w = mine.filter((s) => s.type === 'written').length; const f = mine.filter((s) => s.type === 'formal').length;
          const effF = f + Math.floor(w / 2);
          return `<div><span>${flag(c.iso)}${esc(c.short)}</span>${effF ? `<span class="status f">${effF} formal</span>` : w ? `<span class="status w">${w} written</span>` : '<span class="status ok">Clean</span>'}</div>`;
        }).join('');
        box.innerHTML = `<div class="panel"><h2>Apply a sanction</h2><p class="sub">Two written warnings count as one formal warning (Estatuto, Art. 56 and 57).</p>
          <form id="sf" class="form-grid">
            <div><label class="f">Delegation</label><select class="input" id="sc" required><option value="">Choose</option>${countryOpts}</select></div>
            <div><label class="f">Type</label><select class="input" id="st"><option value="written">Written warning</option><option value="formal">Formal warning</option></select></div>
            <div><label class="f">Session or day</label><input class="input" id="sd" placeholder="Write..."></div>
            <div style="grid-column:1/-1"><label class="f">Reason</label><input class="input" id="sr" required placeholder="Write..."></div>
            <div><button class="btn btn-gold" type="submit">Record sanction</button></div></form></div>
          <div class="panel"><h2>Where every delegation stands</h2><p class="sub">Formal counts include every pair of written warnings.</p><div class="tally">${tally}</div>
          <div class="table-wrap"><table class="t"><thead><tr><th>Delegation</th><th>Type</th><th>Reason</th><th>Day</th><th>By</th><th></th></tr></thead><tbody>
          ${list.length ? list.slice().sort((a, b) => b.at - a.at).map((s) => `<tr><td>${flag(country(s.country).iso)}${esc(country(s.country).short)}</td><td><span class="status ${s.type === 'formal' ? 'f' : 'w'}">${s.type === 'formal' ? 'Formal' : 'Written'}</span></td><td>${esc(s.reason)}</td><td>${esc(s.day || '')}</td><td>${esc(s.by)}<br><small style="color:var(--ink-soft)">${fmtTime(s.at)}</small></td><td><button class="btn btn-danger btn-sm" data-del="${s.id}">Remove</button></td></tr>`).join('')
            : '<tr><td colspan="6" style="color:var(--ink-soft)">No sanctions recorded yet, which is a good sign.</td></tr>'}</tbody></table></div></div>`;
        $('#sf').onsubmit = async (e) => {
          e.preventDefault();
          const fresh = await store.get('sanctions', []);
          fresh.push({ id: uid(), country: $('#sc').value, type: $('#st').value, day: $('#sd').value.trim(), reason: $('#sr').value.trim(), by, at: Date.now() });
          await store.put('sanctions', fresh); toast('Sanction recorded'); drawS();
        };
        $$('[data-del]', box).forEach((b) => b.onclick = async () => {
          if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Confirm'; return; }
          const fresh = (await store.get('sanctions', [])).filter((s) => s.id !== b.dataset.del);
          await store.put('sanctions', fresh); toast('Sanction removed'); drawS();
        });
      };
      return drawS();
    }

    if (tab === 'internal') {
      const drawI = async () => {
        const list = await store.get('internal', []);
        if (!box.isConnected) return;
        box.innerHTML = `<div class="panel"><h2>Internal notes</h2><p class="sub">Only the Presidency can see this board.</p>
          <form id="inf"><textarea class="input" id="intext" rows="4" required placeholder="Write a note for the Presidency"></textarea><div style="margin-top:10px"><button class="btn btn-gold" type="submit">Post to the board</button></div></form></div>
          <div class="board">${list.length ? list.slice().sort((a, b) => (b.pinned - a.pinned) || (b.at - a.at)).map((n) => `<div class="item"><div class="m"><span><b>${esc(n.by)}</b>, ${fmtTime(n.at)}${n.pinned ? ' (pinned)' : ''}</span><span><button class="linkbtn" style="color:var(--navy-600)" data-pin="${n.id}">${n.pinned ? 'Unpin' : 'Pin'}</button> &nbsp; <button class="linkbtn" style="color:var(--danger)" data-del="${n.id}">Delete</button></span></div><p>${esc(n.text)}</p></div>`).join('') : '<div class="empty">The board is empty for now.</div>'}</div>`;
        $('#inf').onsubmit = async (e) => {
          e.preventDefault();
          const fresh = await store.get('internal', []);
          fresh.push({ id: uid(), text: $('#intext').value.trim(), by, at: Date.now(), pinned: false });
          await store.put('internal', fresh); drawI();
        };
        $$('[data-pin]', box).forEach((b) => b.onclick = async () => { const fresh = await store.get('internal', []); const it = fresh.find((x) => x.id === b.dataset.pin); if (it) it.pinned = !it.pinned; await store.put('internal', fresh); drawI(); });
        $$('[data-del]', box).forEach((b) => b.onclick = async () => {
          if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Confirm delete'; return; }
          await store.put('internal', (await store.get('internal', [])).filter((x) => x.id !== b.dataset.del)); drawI();
        });
      };
      return drawI();
    }

    if (tab === 'evaluations') {
      const drawE = async () => {
        const list = await store.get('evaluations', []);
        if (!box.isConnected) return;
        const avg = (c) => { const m = list.filter((e) => e.country === c); if (!m.length) return null; return (m.reduce((s, e) => s + e.total, 0) / m.length).toFixed(1); };
        const ranking = ROSTER.map((c) => ({ c, a: avg(c.id), n: list.filter((e) => e.country === c.id).length })).filter((x) => x.a != null).sort((a, b) => b.a - a.a);
        box.innerHTML = `<div class="panel"><h2>Evaluate a delegate</h2><p class="sub">Official UNSC Delegate Evaluation rubric, 2 to 8 per criterion, total out of 40.</p>
          <form id="ef"><div class="form-grid"><div><label class="f">Delegation</label><select class="input" id="ec" required><option value="">Choose</option>${countryOpts}</select></div>
            <div><label class="f">Topic</label><input class="input" id="et" placeholder="Write..."></div><div><label class="f">Day</label><input class="input" id="ed" placeholder="Write..."></div></div>
            <div style="margin:12px 0">${CRITERIA.map(([k, t, d]) => `<div class="score-row"><div><b>${t}</b><small>${d}</small></div><select class="input" data-k="${k}">${[2, 3, 4, 5, 6, 7, 8].map((v) => `<option ${v === 6 ? 'selected' : ''}>${v}</option>`).join('')}</select></div>`).join('')}</div>
            <div class="form-grid"><div><label class="f">Voluntary initiative</label><select class="input" id="e1"><option value="I">I, independent</option><option value="P">P, prompted</option><option value="N/O">N/O, no observation</option></select></div>
            <div><label class="f">Procedural independence</label><select class="input" id="e2"><option value="I">I, independent</option><option value="P">P, prompted</option><option value="N/O">N/O, no observation</option></select></div></div>
            <div class="form-grid" style="margin-top:10px"><div><label class="f">Strengths</label><textarea class="input" id="es" rows="2"></textarea></div><div><label class="f">Weaknesses</label><textarea class="input" id="ew" rows="2"></textarea></div><div><label class="f">Action for next session</label><textarea class="input" id="ea" rows="2"></textarea></div></div>
            <div style="margin-top:12px"><button class="btn btn-gold" type="submit">Save evaluation</button></div></form></div>
          <div class="panel"><h2>Running averages</h2>
            ${ranking.length ? `<div class="table-wrap"><table class="t"><thead><tr><th>#</th><th>Delegation</th><th>Average out of 40</th><th>Evaluations</th></tr></thead><tbody>${ranking.map((r, i) => `<tr><td>${i + 1}</td><td>${flag(r.c.iso)}${esc(r.c.short)}</td><td><b>${r.a}</b></td><td>${r.n}</td></tr>`).join('')}</tbody></table></div>` : '<p style="color:var(--ink-soft)">No evaluations yet.</p>'}</div>
          <div class="panel"><h2>All evaluations</h2><div class="table-wrap"><table class="t"><thead><tr><th>Delegation</th><th>Day and topic</th><th>Scores</th><th>Total</th><th>Notes</th><th></th></tr></thead><tbody>
            ${list.length ? list.slice().sort((a, b) => b.at - a.at).map((e) => `<tr><td>${flag(country(e.country).iso)}${esc(country(e.country).short)}</td><td>${esc(e.day)}<br><small>${esc(e.topic)}</small></td><td><small>${CRITERIA.map(([k, t]) => t + ' ' + e.scores[k]).join(', ')}<br>Initiative ${esc(e.initiative)}, independence ${esc(e.independence)}</small></td><td><b>${e.total}</b>/40</td><td><small>${e.strengths ? '<b>Strengths.</b> ' + esc(e.strengths) + '<br>' : ''}${e.weaknesses ? '<b>Weaknesses.</b> ' + esc(e.weaknesses) + '<br>' : ''}${e.action ? '<b>Next.</b> ' + esc(e.action) : ''}<br>By ${esc(e.by)}</small></td><td><button class="btn btn-danger btn-sm" data-del="${e.id}">Remove</button></td></tr>`).join('') : '<tr><td colspan="6" style="color:var(--ink-soft)">Nothing here yet.</td></tr>'}</tbody></table></div></div>`;
        $('#ef').onsubmit = async (ev) => {
          ev.preventDefault();
          const scores = {}; $$('[data-k]', box).forEach((s) => scores[s.dataset.k] = Number(s.value));
          const total = Object.values(scores).reduce((a, b) => a + b, 0);
          const fresh = await store.get('evaluations', []);
          fresh.push({ id: uid(), country: $('#ec').value, topic: $('#et').value.trim(), day: $('#ed').value.trim(), scores, total, initiative: $('#e1').value, independence: $('#e2').value, strengths: $('#es').value.trim(), weaknesses: $('#ew').value.trim(), action: $('#ea').value.trim(), by, at: Date.now() });
          await store.put('evaluations', fresh); toast('Evaluation saved'); drawE();
        };
        $$('[data-del]', box).forEach((b) => b.onclick = async () => {
          if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Confirm'; return; }
          await store.put('evaluations', (await store.get('evaluations', [])).filter((x) => x.id !== b.dataset.del)); drawE();
        });
      };
      return drawE();
    }

    if (tab === 'notice') {
      const drawN = async () => {
        const [n, evRaw] = await Promise.all([store.get('notice', null), store.get('events', null)]);
        if (!box.isConnected) return;
        const evs = Array.isArray(evRaw) ? evRaw : S.events.map((e) => ({ ...e, id: uid() }));
        box.innerHTML = `<div class="panel"><h2>Events on Home</h2>
          <form id="evf"><div class="form-grid"><div><label class="f">Title</label><input class="input" id="et1" required placeholder="Write..."></div>
            <div><label class="f">When and where</label><input class="input" id="et2" placeholder="Write..."></div></div>
            <div class="field" style="margin-top:10px"><label class="f">Description</label><textarea class="input" id="et3" rows="3"></textarea></div>
            <button class="btn btn-gold" type="submit">Add event</button></form>
          <div class="table-wrap" style="margin-top:14px"><table class="t"><thead><tr><th>Event</th><th>When</th><th></th></tr></thead><tbody>
          ${evs.length ? evs.map((e, i) => `<tr><td><b>${esc(e.title)}</b><br><small>${esc(e.text || '')}</small></td><td>${esc(e.when || '')}</td><td style="white-space:nowrap">${i > 0 ? `<button class="btn btn-ghost btn-sm" data-up="${i}">Move up</button> ` : ''}<button class="btn btn-danger btn-sm" data-delev="${i}">Remove</button></td></tr>`).join('') : '<tr><td colspan="3" style="color:var(--ink-soft)">No events.</td></tr>'}</tbody></table></div></div>
          <div class="panel"><h2>Announcement</h2><p class="sub">Banner at the top of Home. Leave it empty to hide it.</p>
          <textarea class="input" id="na" rows="3">${esc((n && n.announcement) || '')}</textarea>
          <div style="margin-top:10px"><button class="btn btn-gold" id="nsave">Publish announcement</button>${n && n.updatedBy ? `<span class="hint" style="margin-left:10px">Last updated by ${esc(n.updatedBy)}, ${fmtTime(n.updatedAt)}</span>` : ''}</div></div>`;
        const saveEv = async (list) => { await store.put('events', list); drawN(); };
        $('#evf').onsubmit = async (e) => { e.preventDefault(); evs.push({ id: uid(), title: $('#et1').value.trim(), when: $('#et2').value.trim(), text: $('#et3').value.trim() }); await saveEv(evs); toast('Event added'); };
        $$('[data-delev]', box).forEach((b) => b.onclick = async () => {
          if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Confirm'; return; }
          const idx = Number(b.dataset.delev);
          await saveEv(evs.filter((_, j) => j !== idx));
        });
        $$('[data-up]', box).forEach((b) => b.onclick = async () => { const i = Number(b.dataset.up); [evs[i - 1], evs[i]] = [evs[i], evs[i - 1]]; await saveEv(evs); });
        $('#nsave').onclick = async () => {
          await store.put('notice', { announcement: $('#na').value.trim(), updatedBy: by, updatedAt: Date.now() });
          toast(store.online() ? 'Published' : 'Saved in this browser only');
        };
      };
      return drawN();
    }

    if (tab === 'delegations') {
      let has = {};
      if (store.online()) { try { has = (await api('/api/data?key=pins')).value || {}; } catch {} }
      let names = {};
      try { names = await fetch('/api/private?file=delegates.json&t=' + encodeURIComponent(session.token)).then((r) => r.ok ? r.json() : {}); } catch {}
      if (!box.isConnected) return;
      const off = store.online() ? '' : 'disabled title="Needs the online database"';
      box.innerHTML = `<div class="panel"><h2>Delegations and PINs</h2><p class="sub">Type a PIN and press Set PIN to give it to a delegation. A new PIN replaces the old one, and their notes are kept.</p>
        <div class="table-wrap"><table class="t"><thead><tr><th>Delegation</th><th>Delegate</th><th>Seat</th><th>PIN</th></tr></thead><tbody>
        ${ROSTER.map((c) => `<tr><td>${flag(c.iso)}<b>${esc(c.short)}</b><br><small>${esc(c.name)}</small></td><td>${esc(names[c.id] || '')}</td><td>${['china','france','russia','uk','usa'].includes(c.id) ? 'Permanent' : 'Non-permanent'}</td>
          <td style="white-space:nowrap"><span class="hint" data-state="${c.id}" style="display:inline-block;min-width:56px">${has[c.id] ? 'Set' : 'Not set'}</span><input class="input" style="width:120px;display:inline-block" data-pin="${c.id}" placeholder="New PIN" autocomplete="off" ${off}> <button class="btn btn-gold btn-sm" data-setpin="${c.id}" ${off}>Set PIN</button></td></tr>`).join('')}</tbody></table></div></div>
        <div class="panel"><div class="sheet-head"><h2>Attendance</h2><a class="btn btn-ghost btn-sm" href="https://docs.google.com/spreadsheets/d/1uV5_3CABXLpHdNI2BQOSk_IAU-q03yCcTJkTxOF7iuk/edit?usp=sharing" target="_blank" rel="noopener">Open in Google Sheets</a></div>
          <div class="sheet-frame"><iframe src="https://docs.google.com/spreadsheets/d/1uV5_3CABXLpHdNI2BQOSk_IAU-q03yCcTJkTxOF7iuk/edit?usp=sharing&rm=minimal" title="Attendance sheet" loading="lazy"></iframe></div></div>`;
      $$('[data-setpin]', box).forEach((b) => b.onclick = async () => {
        const id = b.dataset.setpin;
        const inp = $(`[data-pin="${id}"]`, box);
        const pin = inp.value.trim();
        if (pin.length < 4) { toast('A PIN needs at least 4 characters.'); return; }
        try {
          await api('/api/data?key=setpin', { method: 'POST', body: JSON.stringify({ country: id, pin }) });
          toast('PIN set for ' + country(id).short);
          inp.value = '';
          $(`[data-state="${id}"]`, box).textContent = 'Set';
        } catch (e) { toast(e.message); }
      });
      return;
    }

    if (tab === 'files') {
      box.innerHTML = S.privateFiles.map((g) => `<section class="doc-group"><h2>${esc(g.group)}</h2><div class="docs">${g.items.map(([t, f]) =>
        `<a class="doc" target="_blank" rel="noopener" href="/api/private?file=${encodeURIComponent(f)}&t=${encodeURIComponent(session.token)}"><div class="thumb" style="background:linear-gradient(135deg,#4a3a12,#0c2a5b)"><span class="ft">${fileType(f)}</span><img src="assets/unsc-logo.png" alt=""></div><div class="body"><h3>${esc(t)}</h3><p>Presidency only</p></div></a>`).join('')}</div></section>`).join('');
    }
  }

  /* ---------------- router ---------------- */
  async function render() {
    if (!ROSTER.length) { try { ROSTER = await (await fetch('js/roster.json')).json(); } catch { ROSTER = []; } }
    const fresh = app.cloneNode(false); app.replaceWith(fresh); app = fresh; // drop old listeners
    if (!session) return viewLogin();
    const [, route = '', sub] = (location.hash || '#/').split('/');
    const views = { '': viewHome, documents: viewDocuments, procedure: viewProcedure, sessions: viewSessions, contacts: viewContacts, notes: viewNotes, presidency: viewPresidency };
    const fn = views[route] || viewHome;
    await fn(sub);
    $('#logoutBtn') && ($('#logoutBtn').onclick = () => logout(false));
    $('#menuBtn') && ($('#menuBtn').onclick = () => $('#nav').classList.toggle('open'));
    if (route !== 'procedure') window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render);
  render();
})();
