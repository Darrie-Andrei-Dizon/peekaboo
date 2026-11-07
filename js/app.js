import { render as inputs, describe } from './notation.js';
import { MOVES, CATEGORIES, safety, worstFrame, LEVEL_NAMES } from './moves.js';
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
  drills: saved.drills || {},
  stance: 'FLK',
  filter: 'key',
  query: '',
  open: null,
};
const persist = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify({ tab: state.tab, path: state.path, learned: state.learned, combos: state.combos, drills: state.drills }));
  } catch { /* private mode: progress just isn't kept */ }
};

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const cite = (keys) => (keys && keys.length
  ? `<p class="cite"><span>Sources</span> ${keys.map((k) => G.SOURCES[k]).filter(Boolean).map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join('<i>/</i>')}</p>`
  : '');
const move = (c) => MOVES.find((m) => m.c === c);
const EMBED = !window.PEEKABOO_NO_EMBED;
const TOP_MOVES = 'https://www.youtube.com/watch?v=hH8w3mLAFfw&t=2584s';

function toast(msg, big = false) {
  const t = $('#toast');
  t.innerHTML = `<span>${esc(msg)}</span>`;
  t.classList.toggle('big', big);
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('show'), big ? 1500 : 1900);
}

/* ---------- Pieces ---------- */

const tag = (text, cls = '') => `<span class="tag ${cls}">${esc(text)}</span>`;
const shareBtn = () => '<button type="button" class="share" data-action="share" aria-label="Copy a link to this tab"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg><span>Copy link</span></button>';
const chips = (list) => `<div class="chips">${list.map((x) => `<span class="chip">${inputs(x)}</span>`).join('')}</div>`;

const levelChip = (lvl) => String(lvl).split(',').map((l) => {
  const k = l.trim();
  return `<span class="lvl lvl-${esc(k)}" title="${esc(LEVEL_NAMES[k] || k)}">${esc(k === 'stance' ? 'stance' : k)}</span>`;
}).join('');

// Frame meter: where a move's block frames sit between punishable and plus.
const LO = -20;
const HI = 12;
const pos = (n) => ((Math.max(LO, Math.min(HI, n)) - LO) / (HI - LO)) * 100;
function meter(v, big = false) {
  const n = worstFrame(v);
  if (n === null) return '';
  const s = safety(v);
  return `
  <div class="meter ${big ? 'big' : ''} m-${s}" role="img" aria-label="${esc(v)} on block: ${s === 'unsafe' ? 'punishable' : s}">
    <div class="m-track">
      <span class="z z-unsafe" style="width:${pos(-9.5)}%"></span>
      <span class="z z-safe" style="left:${pos(-9.5)}%;width:${pos(0.5) - pos(-9.5)}%"></span>
      <span class="z z-plus" style="left:${pos(0.5)}%;right:0"></span>
      <span class="m-mark" style="left:${pos(n)}%"></span>
    </div>
    ${big ? `<div class="m-scale"><span style="left:${pos(-10)}%">-10</span><span style="left:${pos(0)}%">0</span></div>
    <div class="m-legend"><span>Punishable</span><span>Safe</span><span>Plus</span></div>` : ''}
  </div>`;
}

function head(kicker, title, sub = '') {
  return `
  <header class="page-head">
    <div class="ph-top">${tag(kicker, 'red')}${shareBtn()}</div>
    <h1>${title}</h1>
    ${sub ? `<p class="sub">${sub}</p>` : ''}
  </header>`;
}

function section(id, title, inner, kicker = '') {
  return `<section class="panel" id="${id}">${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}<h2>${esc(title)}</h2>${inner}</section>`;
}

function moveRow(m, idx) {
  const open = state.open === idx;
  const learned = state.learned[m.c];
  const s = safety(m.blk);
  return `
  <article class="move ${open ? 'open' : ''} s-${s}">
    <button type="button" class="move-head" data-action="open" data-v="${idx}" aria-expanded="${open}">
      <span class="mh-in" data-replay="${idx}">${inputs(m.c)}</span>
      <span class="mh-code"><code>${esc(m.c)}</code>${m.key ? `<span class="keyno" title="Learn order">#${m.key}</span>` : ''}${learned ? '<span class="tick" title="Learned">✓</span>' : ''}</span>
      <span class="mh-stats">
        <span class="lvls">${levelChip(m.lvl)}</span>
        <span class="st"><small>i</small>${m.i === '-' ? '–' : esc(String(m.i).split('~')[0])}</span>
        <span class="st blk blk-${s}">${m.blk === '-' ? '–' : esc(m.blk)}</span>
      </span>
      ${m.blk !== '-' ? meter(m.blk) : '<span class="meter-gap"></span>'}
    </button>
    ${open ? `
    <div class="move-body">
      ${m.tip ? `<p class="tip"><span class="tip-k">Why it matters</span>${esc(m.tip)}</p>` : ''}
      ${m.note ? `<p class="note">${esc(m.note)}</p>` : ''}
      <p class="say"><span>Say it</span>${esc(describe(m.c))}</p>
      <dl class="frames">
        <div><dt>Startup</dt><dd>${m.i === '-' ? '–' : `i${esc(m.i)}`}</dd></div>
        <div><dt>Damage</dt><dd>${esc(m.dmg)}</dd></div>
        <div><dt>On hit</dt><dd>${esc(m.hit)}</dd></div>
        <div><dt>Counter hit</dt><dd>${esc(m.ch)}</dd></div>
        <div class="wide blk-${s}"><dt>On block</dt><dd>${esc(m.blk)}</dd>${meter(m.blk, true)}</div>
      </dl>
      <div class="row">
        <button type="button" class="btn ${learned ? 'ghost' : 'primary'}" data-action="learn" data-v="${esc(m.c)}">${learned ? 'Learned ✓' : 'I can do this'}</button>
        <button type="button" class="btn ghost" data-action="replay" data-v="${idx}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l12 7-12 7z"/></svg>Replay inputs</button>
      </div>
      <p class="clips"><span>Watch it</span>
        ${m.clip ? `<a href="https://www.youtube.com/watch?v=${m.clip.id}&t=${m.clip.t}s" target="_blank" rel="noopener">Clip ↗</a>` : ''}
        ${m.key ? `<a href="${TOP_MOVES}" target="_blank" rel="noopener">Top moves, 43:04 ↗</a>` : ''}
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(`tekken 7 steve fox ${m.c}`)}" target="_blank" rel="noopener">Search YouTube ↗</a>
      </p>
    </div>` : ''}
  </article>`;
}

/* ---------- Learn ---------- */

function viewLearn() {
  const done = G.PATH.filter((p) => state.path[p.id]).length;
  const next = G.PATH.find((p) => !state.path[p.id]);
  const keyMoves = MOVES.filter((m) => m.key);
  const learnedKeys = keyMoves.filter((m) => state.learned[m.c]).length;
  const jab = move('1');
  const hook = move('b+1');
  const rd = move('Rage d/f+2+3');

  const hero = `
  <header class="hero">
    <div class="ropes" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="hero-top">${tag('Tekken 7', 'gold')}${tag('Beginner guide', 'line')}${shareBtn()}</div>
    <p class="hero-pre">Character guide</p>
    <h1 class="hero-name"><span>Steve</span><span>Fox</span></h1>
    <p class="hero-style">Boxer <i>·</i> Counter-hit specialist <i>·</i> No kicks</p>
    <dl class="hero-stats">
      <div><dt>Jab</dt><dd>i${jab.i}</dd><span>${jab.blk} on block</span></div>
      <div><dt>b+1 hook</dt><dd>i${hook.i}</dd><span>CH launcher</span></div>
      <div><dt>Rage Drive</dt><dd>${rd.blk}</dd><span>on block</span></div>
    </dl>
    <div class="hud">
      <div class="hud-top"><span>Training</span><b>${done}<small>/${G.PATH.length}</small></b></div>
      <div class="hud-bar" role="img" aria-label="${done} of ${G.PATH.length} steps done">${G.PATH.map((p) => `<i class="${state.path[p.id] ? 'on' : ''}"></i>`).join('')}</div>
    </div>
    ${next
    ? `<button type="button" class="btn cta" data-action="go" data-tab="${next.tab}" data-anchor="${next.anchor || ''}" data-filter="${next.filter || ''}"><span>Next up</span>${esc(next.title)}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>`
    : '<p class="done-all">All steps done. Go play ranked, then come back for the combos.</p>'}
  </header>`;

  const path = `
    <ol class="ladder">${G.PATH.map((p, i) => `
      <li class="${state.path[p.id] ? 'done' : ''} ${next && next.id === p.id ? 'now' : ''}">
        <button type="button" class="node" data-action="path" data-v="${p.id}" aria-pressed="${!!state.path[p.id]}" aria-label="Mark “${esc(p.title)}” as ${state.path[p.id] ? 'not done' : 'done'}">${state.path[p.id] ? '✓' : i + 1}</button>
        <div class="ld">
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.body)}</p>
          <button type="button" class="link" data-action="go" data-tab="${p.tab}" data-anchor="${p.anchor || ''}" data-filter="${p.filter || ''}">Open<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </div>
      </li>`).join('')}
    </ol>`;

  const notation = `
    <p class="lead">Read left to right. Arrows are directions, the 2×2 pad is your four buttons: punches on top, kicks below.</p>
    <div class="legend">
      <div>${inputs('d/f+1')}<span>Tap down-forward and press 1</span></div>
      <div>${inputs('b+1~B')}<span>Back and 1, then hold back (solid arrow = hold)</span></div>
      <div>${inputs('f+1+2,2')}<span>Forward with 1 and 2 together, then 2</span></div>
      <div>${inputs('FLK 1,d+1')}<span>From Flicker stance: 1, then down and 1</span></div>
    </div>
    <h3>Notation</h3>
    <dl class="defs">${G.NOTATION.map(([k, v]) => `<div><dt><code>${esc(k)}</code></dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    <h3>Frame data in one minute</h3>
    <dl class="defs">${G.FRAMES.map(([k, v]) => `<div><dt><code>${esc(k)}</code></dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    <div class="meter-demo">
      <p>Every move has a frame meter. The marker shows where its block frames land:</p>
      <div class="md-row"><code>b+1</code>${meter('-14')}<b class="blk-unsafe">-14</b></div>
      <div class="md-row"><code>b+1~B</code>${meter('-1')}<b class="blk-safe">-1</b></div>
      <div class="md-row"><code>2,1~B</code>${meter('+3')}<b class="blk-plus">+3</b></div>
    </div>`;

  const who = `
    <div class="two">
      <div class="col good"><h3>Strengths</h3><ul>${G.WHO.strengths.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
      <div class="col bad"><h3>Weaknesses</h3><ul>${G.WHO.weaknesses.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
    </div>
    <div class="progress-line"><span>Key moves learned</span><b>${learnedKeys}<small>/${keyMoves.length}</small></b><div class="pl-bar"><i style="width:${(learnedKeys / keyMoves.length) * 100}%"></i></div></div>
    ${cite(G.WHO.sources)}`;

  const plan = `
    <p class="lead">Everything Steve does fits in this loop. Learn it as five habits.</p>
    <ol class="plan">${G.PLAN.map((p, i) => `
      <li><span class="pn">${i + 1}</span><div><h3>${esc(p.step)}</h3>${chips(p.inputs)}<p>${esc(p.body)}</p></div></li>`).join('')}
    </ol>
    <h3>Common beginner mistakes</h3>
    <div class="mistakes">${G.MISTAKES.map(([k, v]) => `<div><b>${esc(k)}</b><p>${esc(v)}</p></div>`).join('')}</div>
    ${cite(['kage', 'wavu', 'steam', 'salty'])}`;

  return hero
    + section('path', 'Your beginner path', path, 'Start here')
    + section('notation', 'How to read inputs', notation, 'Step 1')
    + section('who', 'Who is Steve?', who, 'Step 2')
    + section('plan', 'The game plan', plan, 'Step 6');
}

/* ---------- Moves ---------- */

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
  const fchips = CATEGORIES.map(([k, label]) => `<button type="button" class="fchip ${!q && state.filter === k ? 'on' : ''}" data-action="filter" data-v="${k}">${esc(label)}</button>`).join('');
  const label = q ? `${list.length} result${list.length === 1 ? '' : 's'} for “${esc(state.query.trim())}”`
    : state.filter === 'key' ? 'The 14 moves to learn first, in order. Tap one to open it.'
      : `${list.length} moves`;
  return `
    ${head('Move list', 'Moves', `${MOVES.length} moves and strings with frame data.`)}
    <div class="toolbar">
      <label class="search"><span class="sr">Search moves</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/></svg>
        <input id="q" type="search" placeholder="Search b+1, low, tailspin…" value="${esc(state.query)}" autocomplete="off">
      </label>
      <div class="fchips" role="group" aria-label="Categories">${fchips}</div>
    </div>
    <div class="list-head"><span>${label}</span><span class="lh-cols" aria-hidden="true"><span>Level</span><span>Start</span><span>Block</span></span></div>
    <div class="moves">${list.map(([m, i]) => moveRow(m, i)).join('') || '<p class="empty">No moves match. Try “hook”, “low” or a command like d/f+2.</p>'}</div>
    <p class="cite"><span>Frame data</span> RBNorway, Season 4 snapshot. Check exact numbers with the in-game Frame Data Display.</p>`;
}

/* ---------- Combos ---------- */

function comboCard(c) {
  const got = state.combos[c.id];
  return `
  <article class="combo ${got ? 'got' : ''}">
    <div class="combo-top">${tag(c.level, `lv-${c.level.toLowerCase()}`)}${c.dmg ? `<span class="dmg">${esc(c.dmg)} <small>dmg</small></span>` : ''}</div>
    <h3>${esc(c.name)}</h3>
    <p class="starter"><span>Starter</span>${esc(c.starter)}</p>
    <ol class="route">${c.route.map((r, i) => `<li><span class="hit">${i + 1}<small>hit</small></span><div>${inputs(r)}<code>${esc(r)}</code></div></li>`).join('')}</ol>
    <p class="how">${esc(c.how)}</p>
    <div class="combo-foot">
      <button type="button" class="btn ${got ? 'ghost' : 'primary'}" data-action="combo" data-v="${c.id}">${got ? 'Landed ✓' : 'I landed this'}</button>
      ${cite(c.src)}
    </div>
  </article>`;
}

function viewCombos() {
  const punish = `
    <p class="lead">Block their move, then hit back before they recover. The left column is how negative their move was.</p>
    <div class="punish">${G.PUNISH.map((p) => `
      <div class="prow">
        <span class="pf">${esc(p.f)}</span>
        <div class="pin">${inputs(p.input)}<code>${esc(p.input)}</code><p>${esc(p.note)}</p></div>
        <span class="pd">${p.dmg}<small>dmg</small></span>
      </div>`).join('')}</div>
    <p class="hint">Steve can’t launch-punish until about -17, so f+1+2,2 is your go-to for -15 and -16.</p>
    ${cite(['docs', 'salty', 'steam', 'rbn'])}`;

  const practice = `
    <ol class="steps">
      <li>Practice mode → Dummy settings → turn <b>Counter Hit</b> on, so b+1 and d/f+2 always counter hit.</li>
      <li>Do each combo slowly. Say the inputs out loud. Speed comes later.</li>
      <li>Land it 5 times in a row on both sides of the screen before you use it in a match.</li>
      <li>If a link keeps failing, watch the Combo Guide video and copy the timing.</li>
    </ol>`;

  const landed = G.COMBOS.filter((c) => state.combos[c.id]).length;
  return `
    ${head('Damage', 'Punish &amp; combos', `Punish first, combos second. ${landed} of ${G.COMBOS.length} combos landed.`)}
    ${section('punish', 'Punishers', punish, 'Learn these first')}
    <div class="group-head" id="combos"><h2>Combos</h2><p>Top to bottom. The first two carry you through your first weeks.</p></div>
    <div class="combos">${G.COMBOS.map(comboCard).join('')}</div>
    ${section('practice', 'How to practise a combo', practice, 'Practice mode')}`;
}

/* ---------- Tech ---------- */

function stanceMap() {
  const W = 104;
  const H = 46;
  const node = (id) => G.STANCE_NODES.find((n) => n.id === id);
  const sel = state.stance;
  const clip = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const t = Math.min(dx ? (W / 2 + 5) / Math.abs(dx) : 1, dy ? (H / 2 + 5) / Math.abs(dy) : 1);
    return [a.x + dx * t, a.y + dy * t, b.x - dx * t, b.y - dy * t];
  };
  const edges = G.STANCE_EDGES.map((e) => {
    const [x1, y1, x2, y2] = clip(node(e.from), node(e.to));
    const on = e.from === sel || e.to === sel;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="edge ${on ? 'on' : ''}" marker-end="url(#${on ? 'ah-on' : 'ah'})"/>`;
  }).join('');
  const nodes = G.STANCE_NODES.map((n) => `
    <g class="snode ${n.id === sel ? 'on' : ''}" data-action="stance" data-v="${n.id}" tabindex="0" role="button" aria-pressed="${n.id === sel}" aria-label="${esc(n.label)}">
      <rect x="${n.x - W / 2}" y="${n.y - H / 2}" width="${W}" height="${H}" rx="8"/>
      <text x="${n.x}" y="${n.y - 2}" class="nl">${esc(n.label)}</text>
      <text x="${n.x}" y="${n.y + 14}" class="ns">${esc(n.short)}</text>
    </g>`).join('');
  const s = node(sel);
  const out = G.STANCE_EDGES.filter((e) => e.from === sel);
  const into = G.STANCE_EDGES.filter((e) => e.to === sel);
  const row = (e, dir) => `<li>${tag(dir === 'in' ? `From ${node(e.from).label}` : `To ${node(e.to).label}`, dir === 'in' ? 'line' : 'red')}${chips(e.inputs)}<p>${esc(e.note)}</p></li>`;
  return `
  <section class="panel map-panel" id="map">
    <p class="kicker">Stance map</p>
    <h2>How Steve moves</h2>
    <p class="lead">Tap a stance to see how to get in, how to get out, and what to press from it.</p>
    <div class="map-grid">
      <div class="map-wrap">
        <svg viewBox="0 0 400 350" class="map" role="group" aria-label="Steve's stances and how they connect">
          <defs>
            <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ahead"/></marker>
            <marker id="ah-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ahead on"/></marker>
          </defs>
          ${edges}${nodes}
        </svg>
      </div>
      <div class="map-detail">
        <h3 class="md-name">${esc(s.label)} <small>${esc(s.short)}</small></h3>
        ${G.STANCE_MOVES[sel] ? `<p class="lbl">Best moves here</p>${chips(G.STANCE_MOVES[sel])}` : ''}
        <ul class="trans">${into.map((e) => row(e, 'in')).join('')}${out.map((e) => row(e, 'out')).join('')}</ul>
      </div>
    </div>
    ${cite(['rbn', 'steam', 'salty'])}
  </section>`;
}

function viewTech() {
  return `
    ${head('Tech', 'Tech &amp; stances', 'Steve’s kick buttons are movement. These are the habits that make him work.')}
    ${stanceMap()}
    ${G.TECH.map((g) => `
      <div class="group-head"><h2>${esc(g.group)}</h2></div>
      <div class="tech-grid">${g.items.map((t) => `
        <section class="panel tech">
          <h3>${esc(t.name)}</h3>
          ${t.inputs.length ? chips(t.inputs) : ''}
          <p>${esc(t.body)}</p>
          ${t.table ? `<div class="tscroll"><table class="ftable"><thead><tr><th>Move</th><th>On its own</th><th>Into Flicker</th></tr></thead><tbody>${t.table.map(([a, b, c]) => `<tr><td><code>${esc(a)}</code></td><td class="blk-${safety(b)}">${esc(b)}</td><td class="blk-${safety(c)}">${esc(c)} ${meter(c)}</td></tr>`).join('')}</tbody></table></div>` : ''}
          ${cite(t.src)}
        </section>`).join('')}</div>`).join('')}`;
}

/* ---------- Train ---------- */

function viewTrain() {
  const done = G.DRILLS.filter((d) => state.drills[d.id]).length;
  return `
    ${head('Practice mode', 'Train', `Drills with the exact Practice-mode setup, and how to fight each type of character. ${done} of ${G.DRILLS.length} drills done.`)}
    <div class="group-head"><h2>Drills</h2></div>
    <div class="drills">${G.DRILLS.map((d, i) => `
      <article class="panel drill ${state.drills[d.id] ? 'got' : ''}">
        <div class="drill-top"><span class="dn">Drill ${i + 1}</span>${state.drills[d.id] ? tag('Done', 'plus') : ''}</div>
        <h3>${esc(d.title)}</h3>
        <p class="goal">${esc(d.goal)}</p>
        ${chips(d.inputs)}
        <p class="lbl">Setup</p>
        <ol class="steps">${d.setup.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
        <p class="lbl">Reps</p>
        <p>${esc(d.reps)}</p>
        <button type="button" class="btn ${state.drills[d.id] ? 'ghost' : 'primary'}" data-action="drill" data-v="${d.id}">${state.drills[d.id] ? 'Done ✓' : 'Mark drill done'}</button>
      </article>`).join('')}</div>
    <div class="group-head" id="matchups"><h2>Matchups</h2><p>General Tekken 7 knowledge applied to Steve’s tools. The Videos tab has a full single-character example.</p></div>
    <div class="mu-grid">${G.MATCHUPS.map((m) => `
      <section class="panel mu">
        <h3>${esc(m.type)}</h3>
        <p class="who">${esc(m.who)}</p>
        <p>${esc(m.plan)}</p>
        ${chips(m.tools)}
      </section>`).join('')}</div>`;
}

/* ---------- Videos ---------- */

const time = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

function videoCard(v, i) {
  const lv = v.level.toLowerCase().replace(/\s/g, '');
  const chapters = v.chapters ? `<div class="chapters">${v.chapters.map(([s, n]) => (EMBED
    ? `<button type="button" class="fchip" data-action="play" data-v="${v.id}" data-start="${s}">${time(s)} ${esc(n)}</button>`
    : `<a class="fchip" href="${v.url}&t=${s}s" target="_blank" rel="noopener">${time(s)} ${esc(n)}</a>`)).join('')}</div>` : '';
  const screen = EMBED
    ? `<div class="frame" data-id="${v.id}">
        <button type="button" class="play" data-action="play" data-v="${v.id}" data-start="0" aria-label="Play ${esc(v.title)}">
          <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">
          <span class="ptitle">${esc(v.title)}</span>
          <span class="pbtn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z"/></svg></span>
        </button>
      </div>`
    : `<a class="frame poster" href="${v.url}" target="_blank" rel="noopener" aria-label="Watch ${esc(v.title)} on YouTube">
        <span class="pnum">${String(i + 1).padStart(2, '0')}</span>
        <span class="ptitle">${esc(v.title)}</span>
        <span class="pbtn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z"/></svg></span>
      </a>`;
  return `
  <article class="video">
    ${screen}
    <div class="vbody">
      ${tag(v.level, `lv-${lv}`)}
      <h3>${esc(v.title)}</h3>
      <p>${esc(v.why)}</p>
      ${chapters}
      <a class="link" href="${v.url}" target="_blank" rel="noopener">Open on YouTube<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a>
    </div>
  </article>`;
}

function viewVideos() {
  return `
    ${head('Watch', 'Video guides', `Tekken 7 Steve guides from the community, beginner first.${EMBED ? ' Videos load only when you tap play.' : ' Each one opens on YouTube.'}`)}
    <div class="videos">${G.VIDEOS.map(videoCard).join('')}</div>
    <section class="panel">
      <p class="kicker">Further reading</p>
      <h2>Sources</h2>
      <ul class="links">${Object.values(G.SOURCES).map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a></li>`).join('')}</ul>
      <p class="cite">Peekaboo is an unofficial fan guide. Tekken and Steve Fox belong to Bandai Namco Entertainment.</p>
    </section>`;
}

const VIEWS = { learn: viewLearn, moves: viewMoves, combos: viewCombos, tech: viewTech, train: viewTrain, videos: viewVideos };

/* ---------- Render & events ---------- */

function railProgress() {
  const el = $('#rail-progress');
  if (!el) return;
  const done = G.PATH.filter((p) => state.path[p.id]).length;
  el.innerHTML = `<span>Training</span><b>${done}/${G.PATH.length}</b><div class="hud-bar">${G.PATH.map((p) => `<i class="${state.path[p.id] ? 'on' : ''}"></i>`).join('')}</div>`;
}

function draw({ keepScroll = false, focusSearch = false, enter = false } = {}) {
  const y = window.scrollY;
  const view = $('#view');
  view.innerHTML = VIEWS[state.tab]();
  view.classList.toggle('enter', enter);
  document.querySelectorAll('.tabs button').forEach((b) => b.setAttribute('aria-current', b.dataset.v === state.tab ? 'page' : 'false'));
  railProgress();
  if (keepScroll) window.scrollTo(0, y);
  if (focusSearch) {
    const q = $('#q');
    q.focus();
    q.setSelectionRange(q.value.length, q.value.length);
  }
}

function go(tab, anchor, filter) {
  if (!VIEWS[tab]) return;
  const changed = tab !== state.tab;
  state.tab = tab;
  try { if (location.hash !== `#${tab}`) location.hash = tab; } catch { /* hash not available */ }
  if (filter) { state.filter = filter; state.query = ''; }
  persist();
  draw({ enter: changed || !anchor });
  const el = anchor && document.getElementById(anchor);
  if (el) el.scrollIntoView({ block: 'start' });
  else window.scrollTo(0, 0);
}

const toggle = (bucket, v) => {
  state[bucket][v] = !state[bucket][v];
  persist();
  draw({ keepScroll: true });
  return state[bucket][v];
};

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const { action, v } = el.dataset;
  if (action === 'tab') go(v);
  if (action === 'go') go(el.dataset.tab, el.dataset.anchor, el.dataset.filter);
  if (action === 'stance') {
    state.stance = v;
    draw({ keepScroll: true });
  }
  if (action === 'path' && toggle('path', v)) toast('Step cleared');
  if (action === 'drill' && toggle('drills', v)) toast('Drill done');
  if (action === 'learn' && toggle('learned', v)) toast(`${v} learned`);
  if (action === 'combo' && toggle('combos', v)) toast('Combo landed!', true);
  if (action === 'share') {
    const url = `${location.href.split('#')[0]}#${state.tab}`;
    try {
      navigator.clipboard.writeText(url).then(() => toast('Link copied'), () => toast(url));
    } catch { toast(url); }
  }
  if (action === 'replay') {
    const box = document.querySelector(`[data-replay="${v}"] .inputs`);
    if (box) {
      box.classList.remove('playing');
      [...box.children].forEach((c, i) => c.style.setProperty('--i', i));
      void box.offsetWidth;
      box.classList.add('playing');
    }
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

document.addEventListener('keydown', (e) => {
  const g = e.target.closest && e.target.closest('g[data-action="stance"]');
  if (g && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    state.stance = g.dataset.v;
    draw({ keepScroll: true });
  }
});

window.addEventListener('hashchange', () => {
  const h = location.hash.slice(1);
  if (VIEWS[h] && h !== state.tab) go(h);
});

{
  const h = location.hash.slice(1);
  if (VIEWS[h]) state.tab = h;
}
draw({ enter: true });

try {
  if (EMBED && 'serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
} catch { /* no service worker here */ }
