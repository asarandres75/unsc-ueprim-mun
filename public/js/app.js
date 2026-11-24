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
    ['#/', 'Home'], ['#/handbook', 'Handbook'], ['#/documents', 'Documents'], ['#/procedure', 'Procedure'],
    ['#/sessions', 'PRE-MUN'], ['#/mock', 'Mock II'], ['#/dais', 'Dais'], ['#/notes', 'My Notes'],
  ];
  function shell(inner, route) {
    const u = session.user;
    const av = u.role === 'delegate' ? `<img src="https://flagcdn.com/w80/${country(u.id).iso}.png" alt="">` : `<span class="av">${esc(u.name[0])}</span>`;
    const nav = NAV.map(([h, t]) => `<a href="${h}" class="${route === h ? 'on' : ''}">${t}</a>`).join('') +
      (isAdmin() ? `<a href="#/presidency" class="admin ${route === '#/presidency' ? 'on' : ''}">Presidency</a>` : '');
    return `
      <header class="topbar"><div class="topbar-in">
        <a class="brand" href="#/"><img src="assets/unsc-logo.png" alt=""><div><div class="t1">UEPRIM-MUN IV Edition</div><div class="t2">Security Council</div></div></a>
        <button class="menu-btn" id="menuBtn" aria-label="Open menu">${I.menu}</button>
        <nav class="nav" id="nav">${nav}
          <div class="who"><span class="chip-user">${av}<span>${esc(u.role === 'delegate' ? u.short : u.name)}</span></span><button class="linkbtn" id="logoutBtn">Sign out</button></div>
        </nav>
      </div></header>
      <main>${!store.online() && isAdmin() ? `<div class="banner"><div><b>The online database is not connected yet.</b> Sanctions, internal notes and evaluations are being saved in this browser only, so other members of the dais will not see them. The README explains the two-minute setup in Vercel.</div></div>` : ''}${inner}</main>
      <footer class="site-foot"><img src="assets/ueprim-logos.png" alt="UEPRIM 50 years and UEPRIM MUN"><div>United Nations Security Council, UEPRIM-MUN ${esc(S.edition)}</div><div>${esc(S.institution)}</div></footer>`;
  }
  function paperFoot() {
    return `<div class="paper-foot"><img src="assets/unsc-logo.png" alt="">UEPRIM MUN IV EDITION</div>`;
  }
  const wm = '<img class="wm" src="assets/unsc-logo.png" alt="">';
  function pageHead(kicker, title, right = '') {
    return `<div class="page-head"><div><div class="k">${esc(kicker)}</div><h1>${esc(title)}</h1></div>${right}</div>`;
  }
  const fileType = (p) => (p.split('.').pop() || '').toUpperCase();

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
    const opts = ROSTER.map((c) => `<option value="${c.id}">${esc(c.short)}${c.p5 ? ' (P5)' : ''}</option>`).join('');
    app.innerHTML = `
      <section class="cover">
        <img class="cover-emblem-bg" src="assets/emblem-light.png" alt="">
        <div class="cover-inner">
          <div class="edition">${esc(S.edition)}</div>
          <div class="lockup"><img src="assets/unsc-logo.png" alt="United Nations emblem"><div class="rule"></div><div><h1>SECURITY<br>COUNCIL</h1><div class="un">United Nations</div></div></div>
          <div class="cover-title">DELEGATE HUB</div>
          <p class="cover-sub">Everything you need for the Council in one place, from the handbook and the rules of procedure to your own notebook. Sign in with the code your dais gave you.</p>
          <form class="login-card" id="loginForm" autocomplete="on">
            <div class="seg" role="group" aria-label="Who are you?">
              <button type="button" data-role="delegate" aria-pressed="true">Delegate</button>
              <button type="button" data-role="presidency" aria-pressed="false">UNSC Presidency</button>
            </div>
            <div id="roleFields"></div>
            <div class="err" id="loginErr"></div>
            <button class="btn btn-primary btn-block" type="submit" id="loginBtn">Enter the Council</button>
          </form>
        </div>
        <div class="skyline">${skyline()}</div>
        <div class="gold-rule"></div>
        <div class="cover-foot"><img src="assets/ueprim-logos.png" alt="UEPRIM 50 years and UEPRIM MUN"></div>
      </section>`;
    let role = 'delegate';
    const fields = () => {
      $('#roleFields').innerHTML = role === 'delegate' ? `
        <div class="field"><label class="f" for="country">Your delegation</label>
          <select class="input" id="country" required><option value="">Choose your country</option>${opts}</select></div>
        <div class="field"><label class="f" for="code">Delegate code</label>
          <input class="input" id="code" type="password" required autocomplete="off" placeholder="The code shared in class"></div>
        <div class="field"><label class="f" for="pin">Personal PIN</label>
          <input class="input" id="pin" type="password" required minlength="4" autocomplete="current-password" placeholder="At least 4 characters">
          <div class="hint">The first time you sign in, the PIN you type becomes yours, and it keeps your notes private from the other delegations.</div></div>` : `
        <div class="field"><label class="f" for="member">Member of the dais</label>
          <select class="input" id="member"><option>President</option><option selected>Vice-President</option><option>Secretary</option></select></div>
        <div class="field"><label class="f" for="code">Presidency code</label>
          <input class="input" id="code" type="password" required autocomplete="off" placeholder="Unlocks sanctions, internal notes and dais files"></div>`;
      const saved = ls.get('unsc.lastCountry', '');
      if (role === 'delegate' && saved) $('#country').value = saved;
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
      const body = { role, code: $('#code').value };
      if (role === 'delegate') { body.country = $('#country').value; body.pin = $('#pin').value; }
      else body.member = $('#member').value;
      try {
        const j = await api('/api/login', { method: 'POST', body: JSON.stringify(body) });
        session = { token: j.token, user: j.user, storage: j.storage };
        ls.set('unsc.session', session);
        if (role === 'delegate') ls.set('unsc.lastCountry', body.country);
        if (j.firstTime) toast('Welcome! Your PIN is now set, so keep it somewhere safe.');
        const target = role === 'presidency' ? '#/presidency' : '#/';
        if (location.hash === target) render(); else location.hash = target;
      } catch (err) {
        $('#loginErr').textContent = err.status ? err.message : 'Could not reach the server. Check your internet connection and try again.';
      } finally { btn.disabled = false; btn.textContent = 'Enter the Council'; }
    });
  }

  /* ---------------- HOME ---------------- */
  async function viewHome() {
    const u = session.user;
    const cards = [
      ['#/handbook', I.book, 'Official Handbook', 'The letter from the Presidency and the full background for Topics A and B.'],
      ['#/documents', I.files, 'Document Centre', 'Guides, templates and real examples for every paper you will write.'],
      ['#/procedure', I.scale, 'Committee Procedure', 'Points, motions, voting and the VETO, explained with the words to say.'],
      ['#/sessions', I.cal, 'PRE-MUN Sessions', 'What we covered each week and the materials that go with it.'],
      ['#/mock', I.flagship, 'Mock Simulation II', 'The briefing on maritime security in the Red Sea for Days 19 and 20.'],
      ['#/dais', I.mail, 'Contact the Dais', 'Who sits at the front of the room and how to reach them by email.'],
      ['#/notes', I.note, 'My Notes', 'Your private notebook for research, speeches and ideas for clauses.'],
    ];
    if (isAdmin()) cards.push(['#/presidency', I.lock, 'Presidency Desk', 'Sanctions, internal notes, evaluations and the dais-only files.', true]);
    const greet = u.role === 'delegate'
      ? `Welcome, delegation of ${esc(country(u.id).short)}`
      : `Welcome back, ${esc(u.name)}`;
    app.innerHTML = shell(`
      <section class="hub-head"><img class="bgem" src="assets/emblem-light.png" alt="">
        <div class="k">UEPRIM-MUN, ${esc(S.edition)}</div><h1>Security Council</h1>
        <p>${greet}. This is the Council’s academic hub, where the handbook, the rules and everything from PRE-MUN live together.</p><div class="gold-line"></div></section>
      <div id="notice"></div>
      <div class="grid-cards">${cards.map(([h, ic, t, d, adm]) => `
        <a class="card-link ${adm ? 'admin wide2' : ''} ${h === '#/notes' && !isAdmin() ? 'wide3' : ''}" href="${h}">${adm ? '<span class="tag-lock">Presidency</span>' : ''}<div class="ic">${ic}</div><h3>${t}</h3><p>${d}</p></a>`).join('')}
      </div>
      <div id="eventBox"></div>
      <div id="myRecord"></div>`, '#/');
    // notice + upcoming event can be edited by the Presidency
    let notice = null;
    try { notice = await store.get('notice', null); } catch {}
    if (!$('#eventBox')) return;
    const ev = { title: (notice && notice.eventTitle) || S.upcoming.title, when: (notice && notice.eventWhen) || S.upcoming.when, text: (notice && notice.eventText) || S.upcoming.text };
    if (notice && notice.announcement) $('#notice').innerHTML = `<div class="banner info"><div><b>From the dais.</b> ${esc(notice.announcement)}</div></div>`;
    $('#eventBox').innerHTML = `<div class="event"><div><div class="k">Upcoming event</div><h3>${esc(ev.title)}</h3><p>${esc(ev.text)}</p><p style="margin-top:6px;font-weight:600;color:var(--navy-700)">${esc(ev.when)}</p></div><a class="btn btn-primary" href="#/mock">Read the briefing</a></div>`;
    if (u.role === 'delegate') {
      let mine = [];
      try { mine = await store.get('mysanctions', []); } catch {}
      if (!$('#myRecord')) return;
      const w = mine.filter((s) => s.type === 'written').length; const f = mine.filter((s) => s.type === 'formal').length;
      $('#myRecord').innerHTML = `<div class="panel" style="margin-top:14px"><h2>Your conduct record</h2><p class="sub" style="margin:0">${mine.length === 0
        ? 'Your delegation has no warnings on record. Keep it that way by speaking in the third person, using the Pager for messages and respecting the floor.'
        : `Your delegation has ${w} written warning${w === 1 ? '' : 's'} and ${f} formal warning${f === 1 ? '' : 's'} on record. Remember that two written warnings add up to a formal one. If you think something is wrong, talk to the dais after the session.`}</p></div>`;
    }
  }

  /* ---------------- HANDBOOK ---------------- */
  function viewHandbook(sub) {
    const H = S.handbook;
    const tab = sub || 'letter';
    const tabs = [['letter', 'Letter from Presidency'], ['intro', 'Introduction'], ['A', 'Topic A'], ['B', 'Topic B']];
    let body = '';
    if (tab === 'letter') {
      body = `<div class="paper">${wm}<h2 style="font-style:italic;font-size:1.05em;border-bottom:1.5px solid #111;padding-bottom:.4em">Letter from Presidency</h2>
        <p><b>${esc(H.letter.greeting)}</b></p>${H.letter.paragraphs.map((p) => `<p class="indent">${esc(p)}</p>`).join('')}
        <p>${esc(H.letter.closing)}</p>
        <div class="signers">${H.letter.signers.map(([n, r]) => `<div><b>${esc(n)}</b>${esc(r)}</div>`).join('')}</div>${paperFoot()}</div>`;
    } else if (tab === 'intro') {
      body = `<div class="paper">${wm}<h2>Introduction to the Security Council</h2>${H.intro.map((s) => `<h3>${esc(s.h)}</h3>${s.p.map((p) => `<p class="indent">${esc(p)}</p>`).join('')}`).join('')}${paperFoot()}</div>`;
    } else {
      const T = H.topics.find((t) => t.letter === tab);
      body = `<div class="paper">${wm}<h2>TOPIC (${T.letter}): ${esc(T.title)}.</h2>
        <blockquote>${esc(T.quote)}<cite>(${esc(T.quoteBy)})</cite></blockquote>
        ${T.body.map((p) => `<p class="indent">${esc(p)}</p>`).join('')}${paperFoot()}</div>
        <div class="paper">${wm}<h2>Links of Interest</h2><div class="links">${T.links.map(([t, u]) => `<p><b>${esc(t)}.</b><br><a href="${u}" target="_blank" rel="noopener">${esc(u)}</a></p>`).join('')}</div>
        <h2 style="margin-top:1.4em">QARMAs</h2><p style="text-align:center;font-style:italic">Questions a resolution must answer. Your position paper and your clauses should respond to each of them.</p>
        <ol class="q">${T.quarmas.map((q) => `<li>${esc(q)}</li>`).join('')}</ol>${paperFoot()}</div>`;
    }
    app.innerHTML = shell(`${pageHead('Official Handbook', tab === 'A' || tab === 'B' ? 'Topic ' + tab : 'Security Council Handbook', `<a class="btn btn-ghost" href="${H.pdf}" target="_blank" rel="noopener">${I.dl} Download the PDF</a>`)}
      <div class="tabs">${tabs.map(([k, t]) => `<a href="#/handbook/${k}" class="${k === tab ? 'on' : ''}">${t}</a>`).join('')}</div>${body}`, '#/handbook');
    window.scrollTo(0, 0);
  }

  /* ---------------- DOCUMENTS ---------------- */
  function docCard([t, d, p], extraAttrs = '') {
    const ft = fileType(p);
    return `<a class="doc" href="${p}" target="_blank" rel="noopener" ${extraAttrs}><div class="thumb"><span class="ft ${ft.toLowerCase()}">${ft}</span><img src="assets/unsc-logo.png" alt=""></div><div class="body"><h3>${esc(t)}</h3><p>${esc(d)}</p></div></a>`;
  }
  function viewDocuments() {
    app.innerHTML = shell(`${pageHead('Document Centre', 'Templates, guides and examples')}
      <p style="max-width:820px;margin-top:-6px;color:var(--ink-soft)">Every official document the Council uses is here, grouped by what you are trying to do. Files open in a new tab, and the Word templates download so you can edit them straight away.</p>
      <div class="search" style="max-width:460px;margin:12px 0 22px">${I.search}<input id="docSearch" placeholder="Search documents, for example “veto” or “position paper”"></div>
      <div id="docList"></div>`, '#/documents');
    const draw = (q) => {
      q = (q || '').toLowerCase();
      $('#docList').innerHTML = S.documents.map((g) => {
        const items = g.items.filter((i) => !q || (i[0] + ' ' + i[1]).toLowerCase().includes(q));
        if (!items.length) return '';
        return `<section class="doc-group"><h2>${esc(g.group)}</h2>${q ? '' : `<p class="note">${esc(g.note)}</p>`}<div class="docs">${items.map((i) => docCard(i)).join('')}</div></section>`;
      }).join('') || '<div class="empty">Nothing matches that search. Try a shorter word.</div>';
    };
    draw(''); $('#docSearch').addEventListener('input', (e) => draw(e.target.value));
  }

  /* ---------------- PROCEDURE ---------------- */
  function viewProcedure() {
    const P = S.procedure;
    const rc = ([t, d, ex]) => `<div class="rule-card"><h4>${esc(t)}</h4><p>${esc(d)}</p>${ex ? `<div class="ex">${esc(ex)}</div>` : ''}</div>`;
    app.innerHTML = shell(`${pageHead('Committee Procedure', 'Rules, points and motions', `<a class="btn btn-ghost" href="docs/motions-and-points-full.pdf" target="_blank" rel="noopener">${I.dl} Full motions sheet</a>`)}
      <div class="toc"><a href="#/procedure" data-jump="flow">How a session flows</a><a href="#/procedure" data-jump="points">Points and replies</a><a href="#/procedure" data-jump="motions">Motions</a><a href="#/procedure" data-jump="docs">Resolutions and amendments</a><a href="#/procedure" data-jump="voting">Voting and the VETO</a><a href="#/procedure" data-jump="conduct">Conduct and sanctions</a></div>
      <div class="paper">${wm}<h2>Committee Procedure</h2><p class="indent">${esc(P.intro)}</p>
        <h3 id="flow">How a session flows</h3><ol class="flow">${P.flow.map(([t, d]) => `<li><div><b>${esc(t)}</b>${esc(d)}</div></li>`).join('')}</ol>
        <h3 id="points">Points and replies</h3>${P.points.map(rc).join('')}
        <h3 id="motions">Motions you will use most</h3>${P.motions.map(rc).join('')}
        <h3 id="docs">Resolutions, declarations and amendments</h3>${P.documents.map((p) => `<p class="indent">${esc(p)}</p>`).join('')}
        <h3 id="voting">Voting procedure and the VETO</h3>${P.voting.map((p) => `<p class="indent">${esc(p)}</p>`).join('')}
        <h3 id="conduct">Conduct, dress code and sanctions</h3>${P.conduct.map((p) => `<p class="indent">${esc(p)}</p>`).join('')}
        ${paperFoot()}</div>`, '#/procedure');
    $$('[data-jump]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); document.getElementById(a.dataset.jump).scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
  }

  /* ---------------- SESSIONS ---------------- */
  function viewSessions() {
    const docName = (p) => { for (const g of S.documents) for (const i of g.items) if (i[2] === p) return i[0]; return p.split('/').pop(); };
    app.innerHTML = shell(`${pageHead('PRE-MUN Sessions', 'Agendas and materials')}
      <p style="max-width:820px;margin-top:-6px;color:var(--ink-soft)">${esc(S.sessions.intro)}</p>
      <div class="timeline">${S.sessions.days.map((d) => `<div class="tl ${d.next ? 'next' : ''}"><div class="d">${d.next ? 'Coming up, ' : ''}Day ${esc(d.day)}</div><h3>${esc(d.title)}</h3><p>${esc(d.text)}</p>
        ${d.docs ? `<div class="docs-inline">${d.docs.map((p) => `<a class="pill" href="${p}" target="_blank" rel="noopener">${I.dl} ${esc(docName(p))}</a>`).join('')}</div>` : ''}
        ${d.next ? '<div class="docs-inline"><a class="pill" href="#/mock">Open the Mock II briefing</a></div>' : ''}</div>`).join('')}</div>`, '#/sessions');
  }

  /* ---------------- MOCK II ---------------- */
  function viewMock() {
    const M = S.mock;
    app.innerHTML = shell(`${pageHead('Mock Simulation II, ' + M.days, 'Red Sea security')}
      <div class="paper">${wm}<h2>${esc(M.title)}</h2>${M.body.map((p) => `<p class="indent">${esc(p)}</p>`).join('')}${paperFoot()}</div>
      <div class="paper">${wm}<h2>QARMAs</h2><p style="text-align:center;font-style:italic">The questions the Council should answer by the end of Day 20.</p><ol class="q">${M.quarmas.map((q) => `<li>${esc(q)}</li>`).join('')}</ol>
        <h2 style="margin-top:1.4em">How to prepare</h2>${M.prepare.map((p) => `<p class="indent">${esc(p)}</p>`).join('')}
        <h2 style="margin-top:1.4em">Links of Interest</h2><div class="links">${M.links.map(([t, u]) => `<p><b>${esc(t)}.</b><br><a href="${u}" target="_blank" rel="noopener">${esc(u)}</a></p>`).join('')}</div>
        <p style="font-style:italic;color:var(--ink-soft)">Facts move quickly in this crisis, so check every figure against a current source before you use it in a speech. The Fact-Checker will.</p>${paperFoot()}</div>
      <div class="docs">${docCard(['Resolution Guide (for the 2nd mock session)', 'Written for this simulation, read it before Day 20.', 'docs/resolution-guide.pdf'])}${docCard(['Opening Speech Writing Guide', 'The structure for your 1:30 opening speech.', 'docs/opening-speech-guide.pdf'])}${docCard(['Statement on the Exercise of the VETO', 'For P5 delegations, just in case.', 'docs/veto-statement-format.pdf'])}</div>`, '#/mock');
  }

  /* ---------------- DAIS ---------------- */
  function viewDais() {
    const initials = (n) => n.split(' ').filter(Boolean).slice(0, 2).map((x) => x[0]).join('');
    app.innerHTML = shell(`${pageHead('Contact the Dais', 'Your UNSC Presidency')}
      <p style="max-width:820px;margin-top:-6px;color:var(--ink-soft)">The dais runs the Council, answers your questions and evaluates your work. Use your school email, write a clear subject such as “UNSC, France, position paper question”, and give us a day to answer. During session, messages go through the Pager and never by email.</p>
      <div class="dais">${S.dais.map((d) => `<div class="person"><div class="top"><div class="mono">${esc(initials(d.name))}</div><div><h3>${esc(d.name)}</h3><span>${esc(d.role)}</span></div></div>
        <div class="bd"><p>${esc(d.blurb)}</p><div class="email"><code>${esc(d.email)}</code><a class="btn btn-primary btn-sm" href="mailto:${esc(d.email)}?subject=${encodeURIComponent('UNSC question')}">${I.mail} Email</a><button class="btn btn-ghost btn-sm" data-copy="${esc(d.email)}">Copy</button></div></div></div>`).join('')}</div>`, '#/dais');
    $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy); toast('Email copied'); } catch { toast(b.dataset.copy); }
    }));
  }

  /* ---------------- MY NOTES ---------------- */
  const FOLDERS = [['all', 'All notes'], ['general', 'General'], ['topicA', 'Topic A'], ['topicB', 'Topic B'], ['mock', 'Mock II'], ['speech', 'Speeches'], ['clauses', 'Clauses'], ['pinned', 'Pinned']];
  const folderName = (k) => (FOLDERS.find((f) => f[0] === k) || [k, 'General'])[1];
  async function viewNotes() {
    const u = session.user;
    let notes = [];
    app.innerHTML = shell('<p>Loading your notes...</p>', '#/notes');
    const myApp = app;
    try { notes = await store.get('notes', []); } catch (e) { toast(e.message); }
    if (app !== myApp) return;
    let folder = 'all', sort = 'recent', q = '', tagFilter = '';
    const firstName = u.role === 'delegate' ? 'delegate of ' + country(u.id).short : u.name;
    app.innerHTML = shell(`
      ${!store.online() ? '<div class="banner"><div><b>Notes are saved in this browser for now.</b> Until the online database is connected they will not follow you to another device, so use Export now and then to keep a copy.</div></div>' : ''}
      <div class="notes-wrap">
        <aside class="notes-side" id="side"></aside>
        <section class="notes-main">
          <div class="notes-top"><div class="search">${I.search}<input id="nq" placeholder="Search your notes"></div>
            <button class="btn btn-ghost" id="exportBtn">${I.dl} Export</button><button class="btn btn-primary" id="newBtn">${I.plus} New Note</button></div>
          <div class="welcome"><h1>Welcome back, ${esc(firstName)}!</h1><p>Your private notebook. Only you can see what you write here.</p></div>
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
      $('#ftabs').innerHTML = FOLDERS.slice(0, 7).map(([k, t]) => `<button data-f="${k}" class="${folder === k ? 'on' : ''}">${t}</button>`).join('');
      $$('.sorter button').forEach((b) => b.classList.toggle('on', b.dataset.s === sort));
      const list = filtered();
      $('#ncount').textContent = `${folder === 'all' ? 'All notes' : folderName(folder)} (${list.length})`;
      $('#ngrid').innerHTML = list.length ? list.map((n) => `
        <button class="ncard" data-id="${n.id}"><div class="prev"><b>${esc(n.title || 'Untitled note')}</b>${esc((n.body || '').slice(0, 420))}${n.pinned ? `<span class="badge" style="color:var(--gold)">${I.pin}</span>` : ''}</div>
          <div class="meta"><div class="row"><h3>${esc(n.title || 'Untitled note')}</h3><span class="ftag">${esc(folderName(n.folder))}</span></div>
          <div class="date"><span>${fmtDate(n.updated)}</span><span>${(n.body || '').trim() ? (n.body.trim().split(/\s+/).length + ' words') : 'Empty'}</span></div></div></button>`).join('')
        : `<div class="empty" style="grid-column:1/-1">${notes.length ? 'No notes match what you are looking for.' : 'You have no notes yet. Start one for your opening speech, your research on Topic A or the clauses you want in the next resolution.'}<div style="margin-top:12px"><button class="btn btn-primary" id="emptyNew">${I.plus} New Note</button></div></div>`;
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
    const tabs = [['sanctions', 'Sanctions'], ['internal', 'Internal notes'], ['evaluations', 'Evaluations'], ['notice', 'Notices and event'], ['delegations', 'Delegations'], ['files', 'Dais files']];
    app.innerHTML = shell(`
      <section class="hub-head admin-head"><img class="bgem" src="assets/emblem-light.png" alt=""><div class="k">Presidency only</div><h1>Presidency Desk</h1>
        <p>Signed in as ${esc(session.user.name)}. Nothing on this page is visible to delegates, except that each delegation can see its own warnings on its home page.</p><div class="gold-line"></div></section>
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
        box.innerHTML = `<div class="panel"><h2>Apply a sanction</h2><p class="sub">Following the Estatuto, a written warning is for repeated procedural faults or disturbing the room, and two written warnings count as one formal warning, which means the delegation leaves the session for a while. A formal warning can also be given directly for a serious lack of respect.</p>
          <form id="sf" class="form-grid">
            <div><label class="f">Delegation</label><select class="input" id="sc" required><option value="">Choose</option>${countryOpts}</select></div>
            <div><label class="f">Type</label><select class="input" id="st"><option value="written">Written warning</option><option value="formal">Formal warning</option></select></div>
            <div><label class="f">Session or day</label><input class="input" id="sd" placeholder="Day 19"></div>
            <div style="grid-column:1/-1"><label class="f">Reason</label><input class="input" id="sr" required placeholder="What happened, in one or two sentences"></div>
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
        box.innerHTML = `<div class="panel"><h2>Internal notes for the dais</h2><p class="sub">A shared board for the three of us. Use it for things to fix next session, who deserves a mention, crisis ideas or anything the delegates should not see.</p>
          <form id="inf"><textarea class="input" id="intext" rows="4" required placeholder="Write a note for the rest of the dais"></textarea><div style="margin-top:10px"><button class="btn btn-gold" type="submit">Post to the board</button></div></form></div>
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
        box.innerHTML = `<div class="panel"><h2>Evaluate a delegate</h2><p class="sub">The same rubric as the official UNSC Delegate Evaluation sheet, scored from 2 to 8 on each criterion for a total out of 40. Fill it in during or right after the session while it is fresh.</p>
          <form id="ef"><div class="form-grid"><div><label class="f">Delegation</label><select class="input" id="ec" required><option value="">Choose</option>${countryOpts}</select></div>
            <div><label class="f">Topic</label><input class="input" id="et" placeholder="Mock II, Red Sea"></div><div><label class="f">Day</label><input class="input" id="ed" placeholder="Day 19"></div></div>
            <div style="margin:12px 0">${CRITERIA.map(([k, t, d]) => `<div class="score-row"><div><b>${t}</b><small>${d}</small></div><select class="input" data-k="${k}">${[2, 3, 4, 5, 6, 7, 8].map((v) => `<option ${v === 6 ? 'selected' : ''}>${v}</option>`).join('')}</select></div>`).join('')}</div>
            <div class="form-grid"><div><label class="f">Voluntary initiative</label><select class="input" id="e1"><option value="I">I, independent</option><option value="P">P, prompted</option><option value="N/O">N/O, no observation</option></select></div>
            <div><label class="f">Procedural independence</label><select class="input" id="e2"><option value="I">I, independent</option><option value="P">P, prompted</option><option value="N/O">N/O, no observation</option></select></div></div>
            <div class="form-grid" style="margin-top:10px"><div><label class="f">Strengths</label><textarea class="input" id="es" rows="2"></textarea></div><div><label class="f">Weaknesses</label><textarea class="input" id="ew" rows="2"></textarea></div><div><label class="f">Action for next session</label><textarea class="input" id="ea" rows="2"></textarea></div></div>
            <div style="margin-top:12px"><button class="btn btn-gold" type="submit">Save evaluation</button></div></form></div>
          <div class="panel"><h2>Running averages</h2><p class="sub">Useful when the time comes to decide Best Delegate and the written and verbal mentions.</p>
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
      const n = (await store.get('notice', null)) || {};
      if (!box.isConnected) return;
      box.innerHTML = `<div class="panel"><h2>Announcement on the home page</h2><p class="sub">Shows as a banner at the top of every delegate’s home page. Leave it empty to hide it.</p>
        <textarea class="input" id="na" rows="3" placeholder="For example, remember to bring your printed opening speech on Tuesday.">${esc(n.announcement || '')}</textarea></div>
        <div class="panel"><h2>Upcoming event</h2><p class="sub">The highlighted event card on the home page. Empty fields fall back to the default text in content.js.</p>
        <div class="field"><label class="f">Title</label><input class="input" id="ne1" value="${esc(n.eventTitle || '')}" placeholder="${esc(S.upcoming.title)}"></div>
        <div class="field"><label class="f">When and where</label><input class="input" id="ne2" value="${esc(n.eventWhen || '')}" placeholder="${esc(S.upcoming.when)}"></div>
        <div class="field"><label class="f">Description</label><textarea class="input" id="ne3" rows="3" placeholder="${esc(S.upcoming.text)}">${esc(n.eventText || '')}</textarea></div>
        <button class="btn btn-gold" id="nsave">Publish changes</button>${n.updatedBy ? `<span class="hint" style="margin-left:10px">Last updated by ${esc(n.updatedBy)}, ${fmtTime(n.updatedAt)}</span>` : ''}</div>`;
      $('#nsave').onclick = async () => {
        await store.put('notice', { announcement: $('#na').value.trim(), eventTitle: $('#ne1').value.trim(), eventWhen: $('#ne2').value.trim(), eventText: $('#ne3').value.trim(), updatedBy: by, updatedAt: Date.now() });
        toast(store.online() ? 'Published for every delegate' : 'Saved in this browser only');
      };
      return;
    }

    if (tab === 'delegations') {
      box.innerHTML = `<div class="panel"><h2>Delegations and PINs</h2><p class="sub">Each delegation signs in with the shared delegate code and its own PIN. If a delegate forgets their PIN, reset it here and the next PIN they type becomes the new one. Their notes are kept.</p>
        <div class="table-wrap"><table class="t"><thead><tr><th>Delegation</th><th>Official name</th><th>Seat</th><th></th></tr></thead><tbody>
        ${ROSTER.map((c) => `<tr><td>${flag(c.iso)}<b>${esc(c.short)}</b></td><td>${esc(c.name)}</td><td>${c.p5 ? 'Permanent (P5)' : 'Non-permanent'}</td><td><button class="btn btn-ghost btn-sm" data-reset="${c.id}" ${store.online() ? '' : 'disabled title="Needs the online database"'}>Reset PIN</button></td></tr>`).join('')}</tbody></table></div></div>`;
      $$('[data-reset]', box).forEach((b) => b.onclick = async () => {
        if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Confirm reset'; return; }
        try { await api('/api/data?key=resetpin', { method: 'POST', body: JSON.stringify({ country: b.dataset.reset }) }); toast('PIN reset for ' + country(b.dataset.reset).short); b.textContent = 'Done'; }
        catch (e) { toast(e.message); }
      });
      return;
    }

    if (tab === 'files') {
      box.innerHTML = S.privateFiles.map((g) => `<section class="doc-group"><h2>${esc(g.group)}</h2><div class="docs">${g.items.map(([t, f]) =>
        `<a class="doc" target="_blank" rel="noopener" href="/api/private?file=${encodeURIComponent(f)}&t=${encodeURIComponent(session.token)}"><div class="thumb" style="background:linear-gradient(135deg,#4a3a12,#0c2a5b)"><span class="ft">${fileType(f)}</span><img src="assets/unsc-logo.png" alt=""></div><div class="body"><h3>${esc(t)}</h3><p>Only the dais can open this file.</p></div></a>`).join('')}</div></section>`).join('');
    }
  }

  /* ---------------- router ---------------- */
  async function render() {
    if (!ROSTER.length) { try { ROSTER = await (await fetch('js/roster.json')).json(); } catch { ROSTER = []; } }
    const fresh = app.cloneNode(false); app.replaceWith(fresh); app = fresh; // drop old listeners
    if (!session) return viewLogin();
    const [, route = '', sub] = (location.hash || '#/').split('/');
    const views = { '': viewHome, handbook: viewHandbook, documents: viewDocuments, procedure: viewProcedure, sessions: viewSessions, mock: viewMock, dais: viewDais, notes: viewNotes, presidency: viewPresidency };
    const fn = views[route] || viewHome;
    await fn(sub);
    $('#logoutBtn') && ($('#logoutBtn').onclick = () => logout(false));
    $('#menuBtn') && ($('#menuBtn').onclick = () => $('#nav').classList.toggle('open'));
    if (route !== 'procedure') window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render);
  render();
})();
