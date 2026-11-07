import { render as inputs, describe } from './notation.js';
import { MOVES, CATEGORIES, safety, LEVEL_NAMES } from './moves.js';
import * as G from './guide.js';

/* ---------- State ---------- */

const KEY = 'peekaboo-v1';
const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
};
const saved = load();
const state = {
  tab: saved.tab || 'learn',
  path: saved.path || {},
  learned: saved.learned || {},
  combos: saved.combos || {},
  filter: 'key',
  query: '',
  open: null,
};
const persist = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify({ tab: state.tab, path: state.path, learned: state.learned, combos: state.combos }));
  } catch { /* private mode: progress just isn't kept */ }
};

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const cite = (keys) => (keys && keys.length
  ? `<p class="cite">Source: ${keys.map((k) => G.SOURCES[k]).filter(Boolean).map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join(' · ')}</p>`
  : '');

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ---------- Pieces ---------- */

const levelChip = (lvl) => String(lvl).split(',').map((l) => {
  const k = l.trim();
  return `<span class="lvl lvl-${esc(k)}" title="${esc(LEVEL_NAMES[k] || k)}">${esc(k === 'stance' ? 'stance' : k)}</span>`;
}).join('');

function frameCell(label, v, cls = '') {
  return `<div class="fc ${cls}"><span>${label}</span><b>${esc(v)}</b></div>`;
}

function moveCard(m, idx) {
  const open = state.open === idx;
  const learned = state.learned[m.c];
  const s = safety(m.blk);
  return `
  <article class="move ${open ? 'open' : ''}" data-safety="${s}">
    <button type="button" class="move-head" data-action="open" data-v="${idx}" aria-expanded="${open}">
      <div class="move-in">${inputs(m.c)}<code>${esc(m.c)}</code></div>
      <div class="move-meta">
        <span class="lvls">${levelChip(m.lvl)}</span>
        ${m.i !== '-' ? `<span class="startup">i${esc(m.i)}</span>` : ''}
        ${m.blk !== '-' ? `<span class="blk blk-${s}">${esc(m.blk)}</span>` : ''}
        ${learned ? '<span class="tick" title="Learned">✓</span>' : ''}
      </div>
    </button>
    ${open ? `
    <div class="move-body">
      ${m.tip ? `<p class="tip">${esc(m.tip)}</p>` : ''}
      ${m.note ? `<p class="note">${esc(m.note)}</p>` : ''}
      <p class="say"><span>How to press it:</span> ${esc(describe(m.c))}</p>
      <div class="frames">
        ${frameCell('Startup', m.i === '-' ? '–' : `i${m.i}`)}
        ${frameCell('Damage', m.dmg)}
        ${frameCell('On block', m.blk, `blk-${s}`)}
        ${frameCell('On hit', m.hit)}
        ${frameCell('Counter hit', m.ch)}
      </div>
      <button type="button" class="btn ${learned ? 'ghost' : ''}" data-action="learn" data-v="${esc(m.c)}">${learned ? 'Mark as not learned' : 'I can do this'}</button>
    </div>` : ''}
  </article>`;
}

function section(id, title, inner, kicker = '') {
  return `<section class="panel" id="${id}">${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}<h2>${esc(title)}</h2>${inner}</section>`;
}

/* ---------- Tabs ---------- */

function viewLearn() {
  const done = G.PATH.filter((p) => state.path[p.id]).length;
  const pct = Math.round((done / G.PATH.length) * 100);
  const next = G.PATH.find((p) => !state.path[p.id]);
  const keyMoves = MOVES.filter((m) => m.key);
  const learnedKeys = keyMoves.filter((m) => state.learned[m.c]).length;

  const hero = `
  <header class="hero">
    <div class="hero-text">
      <p class="kicker">Tekken 7 · Steve Fox</p>
      <h1>Learn Steve from zero</h1>
      <p>A boxer who wins by poking safely and catching you pressing buttons. Follow the steps below in order.</p>
      ${next ? `<button type="button" class="btn light" data-action="go" data-tab="${next.tab}" data-anchor="${next.anchor || ''}" data-filter="${next.filter || ''}">Next: ${esc(next.title)}</button>` : '<p class="done-all">All steps done. Now go play ranked and come back to the combos.</p>'}
    </div>
    <div class="ring" style="--p:${pct}" role="img" aria-label="${done} of ${G.PATH.length} steps done">
      <span><b>${done}</b>/${G.PATH.length}</span>
    </div>
  </header>`;

  const path = `<ol class="path">${G.PATH.map((p, i) => `
    <li class="${state.path[p.id] ? 'done' : ''}">
      <button type="button" class="check" data-action="path" data-v="${p.id}" aria-pressed="${!!state.path[p.id]}" aria-label="Mark “${esc(p.title)}” as done">${state.path[p.id] ? '✓' : i + 1}</button>
      <div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.body)}</p>
        <button type="button" class="link" data-action="go" data-tab="${p.tab}" data-anchor="${p.anchor || ''}" data-filter="${p.filter || ''}">Open →</button>
      </div>
    </li>`).join('')}</ol>`;

  const notation = `
    <p>Read inputs from left to right. The arrow is the direction, the pad shows which of the four buttons to press.</p>
    <div class="legend">
      <div>${inputs('d/f+1')}<span>down-forward and 1</span></div>
      <div>${inputs('b+1~B')}<span>back and 1, then hold back</span></div>
      <div>${inputs('f+1+2,2')}<span>forward with 1 and 2, then 2</span></div>
    </div>
    <dl class="defs">${G.NOTATION.map(([k, v]) => `<dt><code>${esc(k)}</code></dt><dd>${esc(v)}</dd>`).join('')}</dl>
    <h3>Frame data in one minute</h3>
    <dl class="defs">${G.FRAMES.map(([k, v]) => `<dt><code>${esc(k)}</code></dt><dd>${esc(v)}</dd>`).join('')}</dl>
    <p class="hint">In the move list, the block number is coloured: <span class="blk blk-plus">plus</span> <span class="blk blk-safe">safe</span> <span class="blk blk-unsafe">punishable</span>.</p>`;

  const who = `
    <div class="two">
      <div><h3 class="good">Strengths</h3><ul>${G.WHO.strengths.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
      <div><h3 class="bad">Weaknesses</h3><ul>${G.WHO.weaknesses.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
    </div>
    <p class="progress-line">Key moves learned: <b>${learnedKeys} of ${keyMoves.length}</b></p>
    ${cite(G.WHO.sources)}`;

  const plan = `
    <p>Everything Steve does fits in this loop. Learn it as five habits.</p>
    <ol class="plan">${G.PLAN.map((p) => `
      <li><h3>${esc(p.step)}</h3><div class="chips">${p.inputs.map((x) => `<span class="chip">${inputs(x)}</span>`).join('')}</div><p>${esc(p.body)}</p></li>`).join('')}
    </ol>
    <h3>Common beginner mistakes</h3>
    <dl class="defs mistakes">${G.MISTAKES.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
    ${cite(['kage', 'wavu', 'steam', 'salty'])}`;

  return hero
    + section('path', 'Your beginner path', path, 'Start here')
    + section('notation', 'How to read inputs', notation, 'Step 1')
    + section('who', 'Who is Steve?', who, 'Step 2')
    + section('plan', 'The game plan', plan, 'Step 6');
}

function viewMoves() {
  const q = state.query.trim().toLowerCase();
  let list = MOVES.map((m, i) => [m, i]);
  if (q) {
    list = list.filter(([m]) => `${m.c} ${m.note || ''} ${m.tip || ''} ${describe(m.c)}`.toLowerCase().includes(q));
  } else if (state.filter === 'key') {
    list = list.filter(([m]) => m.key).sort((a, b) => a[0].key - b[0].key);
  } else {
    list = list.filter(([m]) => m.cat === state.filter);
  }
  const chips = CATEGORIES.map(([k, label]) => `<button type="button" class="fchip ${!q && state.filter === k ? 'on' : ''}" data-action="filter" data-v="${k}">${esc(label)}</button>`).join('');
  const intro = !q && state.filter === 'key'
    ? '<p class="hint">The 14 moves to learn first, in order. Tap one for what it does and how to press it.</p>'
    : '';
  return `
    <header class="page-head">
      <p class="kicker">Move list</p>
      <h1>Moves</h1>
      <label class="search"><span class="sr">Search moves</span>
        <input id="q" type="search" placeholder="Search, e.g. b+1, low, tailspin" value="${esc(state.query)}" autocomplete="off">
      </label>
      <div class="fchips" role="group" aria-label="Categories">${chips}</div>
    </header>
    ${intro}
    <div class="moves">${list.map(([m, i]) => moveCard(m, i)).join('') || '<p class="empty">No moves match.</p>'}</div>
    ${cite(['rbn'])}
    <p class="cite">Frame data from RBNorway (Season 4 snapshot). Check exact numbers with the in-game Frame Data Display.</p>`;
}

function comboCard(c) {
  const got = state.combos[c.id];
  return `
  <article class="combo ${got ? 'got' : ''}">
    <div class="combo-top">
      <span class="badge b-${c.level.toLowerCase()}">${esc(c.level)}</span>
      ${c.dmg ? `<span class="dmg">${esc(c.dmg)} dmg</span>` : ''}
    </div>
    <h3>${esc(c.name)}</h3>
    <p class="starter">Starts from: <b>${esc(c.starter)}</b></p>
    <ol class="route">${c.route.map((r) => `<li>${inputs(r)}<code>${esc(r)}</code></li>`).join('')}</ol>
    <p>${esc(c.how)}</p>
    <button type="button" class="btn ${got ? 'ghost' : ''}" data-action="combo" data-v="${c.id}">${got ? 'Landed it ✓' : 'I landed this in Practice'}</button>
    ${cite(c.src)}
  </article>`;
}

function viewCombos() {
  const punish = `
    <p>Block their move, then hit back before they recover. The number on the left is how negative their move was.</p>
    <div class="punish">${G.PUNISH.map((p) => `
      <div class="prow">
        <span class="pf">${esc(p.f)}</span>
        <div><div class="pin">${inputs(p.input)}<code>${esc(p.input)}</code></div><p>${esc(p.note)}</p></div>
        <span class="pd">${p.dmg}</span>
      </div>`).join('')}</div>
    <p class="hint">Steve can’t launch-punish until about -17, so f+1+2,2 is your go-to for -15 and -16.</p>
    ${cite(['docs', 'salty', 'steam', 'rbn'])}`;

  const practice = `
    <ol class="steps">
      <li>Practice mode → Dummy settings → set <b>Counter Hit</b> on, so b+1 and d/f+2 always counter hit.</li>
      <li>Do each combo slowly. Say the inputs out loud. Speed comes later.</li>
      <li>Land it 5 times in a row on both sides of the screen before using it in a match.</li>
      <li>If a link fails, watch the Combo Guide video in the Videos tab and match the timing.</li>
    </ol>`;

  return `
    <header class="page-head">
      <p class="kicker">Damage</p>
      <h1>Punish &amp; combos</h1>
    </header>
    ${section('punish', 'Punishers', punish, 'Learn these first')}
    <section class="panel" id="combos"><p class="kicker">Combos</p><h2>Combos</h2>
      <p>Learn them top to bottom. The first two are all you need for your first weeks.</p>
    </section>
    <div class="combos">${G.COMBOS.map(comboCard).join('')}</div>
    ${section('practice', 'How to practise a combo', practice)}`;
}

function viewTech() {
  return `
    <header class="page-head">
      <p class="kicker">Tech</p>
      <h1>Tech &amp; stances</h1>
      <p class="sub">Steve’s kick buttons are movement. These are the habits that make him work.</p>
    </header>
    ${G.TECH.map((g) => `
      <h2 class="group">${esc(g.group)}</h2>
      ${g.items.map((t) => `
        <section class="panel tech">
          <h3>${esc(t.name)}</h3>
          ${t.inputs.length ? `<div class="chips">${t.inputs.map((x) => `<span class="chip">${inputs(x)}</span>`).join('')}</div>` : ''}
          <p>${esc(t.body)}</p>
          ${t.table ? `<table class="ftable"><thead><tr><th>Move</th><th>On its own</th><th>Into Flicker</th></tr></thead><tbody>${t.table.map(([a, b, c]) => `<tr><td><code>${esc(a)}</code></td><td class="blk-${safety(b)}">${esc(b)}</td><td class="blk-${safety(c)}">${esc(c)}</td></tr>`).join('')}</tbody></table>` : ''}
          ${cite(t.src)}
        </section>`).join('')}`).join('')}`;
}

const EMBED = !window.PEEKABOO_NO_EMBED;

function videoCard(v) {
  if (!EMBED) {
    return `
  <article class="video">
    <a class="play poster" href="${v.url}" target="_blank" rel="noopener" aria-label="Watch ${esc(v.title)} on YouTube">
      <span class="pbtn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z"/></svg></span>
      <span class="ptitle">${esc(v.title)}</span>
    </a>
    <div class="vbody">
      <span class="badge b-${v.level.toLowerCase().replace(/\s/g, '')}">${esc(v.level)}</span>
      <h3>${esc(v.title)}</h3>
      <p>${esc(v.why)}</p>
      ${v.chapters ? `<div class="chapters">${v.chapters.map(([s, n]) => `<a class="fchip" href="${v.url}&t=${s}s" target="_blank" rel="noopener">${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} ${esc(n)}</a>`).join('')}</div>` : ''}
      <a class="link" href="${v.url}" target="_blank" rel="noopener">Open on YouTube ↗</a>
    </div>
  </article>`;
  }
  return `
  <article class="video">
    <div class="frame" data-id="${v.id}">
      <button type="button" class="play" data-action="play" data-v="${v.id}" data-start="0" aria-label="Play ${esc(v.title)}">
        <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">
        <span class="pbtn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z"/></svg></span>
      </button>
    </div>
    <div class="vbody">
      <span class="badge b-${v.level.toLowerCase().replace(/\s/g, '')}">${esc(v.level)}</span>
      <h3>${esc(v.title)}</h3>
      <p>${esc(v.why)}</p>
      ${v.chapters ? `<div class="chapters">${v.chapters.map(([s, n]) => `<button type="button" class="fchip" data-action="play" data-v="${v.id}" data-start="${s}">${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} ${esc(n)}</button>`).join('')}</div>` : ''}
      <a class="link" href="${v.url}" target="_blank" rel="noopener">Open on YouTube ↗</a>
    </div>
  </article>`;
}

function viewVideos() {
  return `
    <header class="page-head">
      <p class="kicker">Watch</p>
      <h1>Video guides</h1>
      <p class="sub">Tekken 7 Steve guides from the community, ordered from beginner up. Videos load only when you tap play.</p>
    </header>
    <div class="videos">${G.VIDEOS.map(videoCard).join('')}</div>
    <section class="panel">
      <h2>Read more</h2>
      <ul class="links">${Object.values(G.SOURCES).map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join('')}</ul>
      <p class="cite">Peekaboo is an unofficial fan guide. Tekken and Steve Fox belong to Bandai Namco Entertainment.</p>
    </section>`;
}

const VIEWS = { learn: viewLearn, moves: viewMoves, combos: viewCombos, tech: viewTech, videos: viewVideos };

/* ---------- Render & events ---------- */

function draw({ keepScroll = false, focusSearch = false } = {}) {
  const y = window.scrollY;
  const view = $('#view');
  view.innerHTML = VIEWS[state.tab]();
  document.querySelectorAll('.tabs button').forEach((b) => b.setAttribute('aria-current', b.dataset.v === state.tab ? 'page' : 'false'));
  if (keepScroll) window.scrollTo(0, y);
  if (focusSearch) {
    const q = $('#q');
    q.focus();
    q.setSelectionRange(q.value.length, q.value.length);
  }
}

function go(tab, anchor, filter) {
  state.tab = tab;
  if (filter) { state.filter = filter; state.query = ''; }
  persist();
  draw();
  const el = anchor && document.getElementById(anchor);
  if (el) el.scrollIntoView({ block: 'start' });
  else window.scrollTo(0, 0);
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const { action, v } = el.dataset;
  if (action === 'tab') go(v);
  if (action === 'go') go(el.dataset.tab, el.dataset.anchor, el.dataset.filter);
  if (action === 'path') {
    state.path[v] = !state.path[v];
    persist();
    draw({ keepScroll: true });
    if (state.path[v]) toast('Step done');
  }
  if (action === 'filter') {
    state.filter = v;
    state.query = '';
    state.open = null;
    draw({ keepScroll: true });
  }
  if (action === 'open') {
    const i = Number(v);
    state.open = state.open === i ? null : i;
    draw({ keepScroll: true });
  }
  if (action === 'learn') {
    state.learned[v] = !state.learned[v];
    persist();
    draw({ keepScroll: true });
    if (state.learned[v]) toast(`Nice. ${v} learned.`);
  }
  if (action === 'combo') {
    state.combos[v] = !state.combos[v];
    persist();
    draw({ keepScroll: true });
    if (state.combos[v]) toast('Combo landed. Now do it on the other side.');
  }
  if (action === 'play') {
    const frame = document.querySelector(`.frame[data-id="${v}"]`);
    const start = Number(el.dataset.start) || 0;
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v}?autoplay=1&rel=0&start=${start}" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    if (el.closest('.chapters')) frame.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
});

document.addEventListener('input', (e) => {
  if (e.target.id === 'q') {
    state.query = e.target.value;
    state.open = null;
    draw({ keepScroll: true, focusSearch: true });
  }
});

draw();

try {
  if (EMBED && 'serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
} catch { /* no service worker here */ }
