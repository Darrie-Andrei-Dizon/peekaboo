// Turns Tekken notation like "d/f+1,2~B" into tokens, and tokens into
// small visual pieces: arrows for directions, a 2x2 button pad for 1-4,
// and labelled pills for stances. Pure functions, testable in Node.

export const STANCES = {
  FLK: 'Flicker',
  PAB: 'Peekaboo',
  DCK: 'Duck',
  'Ext DCK': 'Extended Duck',
  LWV: 'Left Weave',
  RWV: 'Right Weave',
  SWY: 'Sway',
  ALB: 'Albatross',
  WS: 'While standing up',
  FC: 'Full crouch',
  SS: 'Sidestep',
  BT: 'Back turned',
  WR: 'While running',
  CH: 'Counter hit',
  'S!': 'Screw (tailspin)',
  'W!': 'Wall splat',
  Rage: 'In rage',
};

const ARROWS = {
  u: '↑', d: '↓', f: '→', b: '←',
  'u/f': '↗', 'u/b': '↖', 'd/f': '↘', 'd/b': '↙',
};

const MOTIONS = {
  qcf: ['d', 'd/f', 'f'],
  qcb: ['d', 'd/b', 'b'],
};

const WORD = /^(Ext DCK|FLK|PAB|DCK|LWV|RWV|SWY|ALB|WS|FC|SS|BT|WR|CH|S!|W!|Rage)/;
const DIR = /^([udfbUDFB])(?:\/([udfbUDFB]))?(?![a-z])/;

// Split an input string into tokens.
// Kinds: dir {v, held}, btn {v: [1..4]}, stance {v}, sep {v: ',' | '~' | '+' | ':'}, motion {v}, text {v}
export function tokenize(input) {
  const out = [];
  let s = String(input || '');
  while (s.length) {
    let m;
    if ((m = s.match(/^\s+/))) { s = s.slice(m[0].length); continue; }
    if ((m = s.match(WORD))) { out.push({ kind: 'stance', v: m[1] }); s = s.slice(m[0].length); continue; }
    if ((m = s.match(/^(qcf|qcb)/))) { out.push({ kind: 'motion', v: m[1] }); s = s.slice(m[0].length); continue; }
    if ((m = s.match(/^[1-4](?:\+[1-4])*/)) && !/^[1-4]\d/.test(s)) {
      out.push({ kind: 'btn', v: m[0].split('+').map(Number) });
      s = s.slice(m[0].length);
      continue;
    }
    if ((m = s.match(/^[nN](?![a-z])/))) { out.push({ kind: 'dir', v: 'n', held: false }); s = s.slice(1); continue; }
    if ((m = s.match(DIR))) {
      const a = m[1];
      const b = m[2];
      const held = a === a.toUpperCase() && (!b || b === b.toUpperCase());
      const v = (b ? `${a}/${b}` : a).toLowerCase();
      if (ARROWS[v]) { out.push({ kind: 'dir', v, held }); s = s.slice(m[0].length); continue; }
    }
    if ((m = s.match(/^[,~+:]/))) { out.push({ kind: 'sep', v: m[0] }); s = s.slice(1); continue; }
    if ((m = s.match(/^\[[^\]]*\]|^\([^)]*\)|^[A-Za-z][A-Za-z']*|^[^\s,~+:]+/))) {
      out.push({ kind: 'text', v: m[0] });
      s = s.slice(m[0].length);
      continue;
    }
    out.push({ kind: 'text', v: s[0] });
    s = s.slice(1);
  }
  return out;
}

// Plain-English reading of an input, for screen readers and the "say it" line.
export function describe(input) {
  const words = { ',': 'then', '~': 'immediately', '+': 'and', ':': 'just-frame' };
  const dirWord = { u: 'up', d: 'down', f: 'forward', b: 'back', 'u/f': 'up-forward', 'u/b': 'up-back', 'd/f': 'down-forward', 'd/b': 'down-back', n: 'neutral' };
  return tokenize(input).map((t) => {
    if (t.kind === 'dir') return (t.held ? 'hold ' : 'tap ') + dirWord[t.v];
    if (t.kind === 'btn') return `${t.v.length > 1 ? 'buttons' : 'button'} ${t.v.join(' and ')}`;
    if (t.kind === 'stance') return `${STANCES[t.v] || t.v}:`;
    if (t.kind === 'motion') return MOTIONS[t.v].map((d) => dirWord[d]).join(', ');
    if (t.kind === 'sep') return words[t.v];
    return t.v;
  }).join(' ').replace(/\s+/g, ' ').trim();
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function pad(buttons) {
  const on = (n) => (buttons.includes(n) ? ' on' : '');
  return `<span class="pad" aria-hidden="true"><i class="b1${on(1)}">1</i><i class="b2${on(2)}">2</i><i class="b3${on(3)}">3</i><i class="b4${on(4)}">4</i></span>`;
}

function arrow(v, held) {
  if (v === 'n') return '<span class="dir neutral" aria-hidden="true">★</span>';
  return `<span class="dir${held ? ' held' : ''}" aria-hidden="true">${ARROWS[v]}</span>`;
}

// HTML for one input. Directions joined to a button with "+" are kept together.
export function render(input) {
  const tokens = tokenize(input);
  const html = tokens.map((t) => {
    if (t.kind === 'dir') return arrow(t.v, t.held);
    if (t.kind === 'btn') return pad(t.v);
    if (t.kind === 'motion') return MOTIONS[t.v].map((d) => arrow(d, false)).join('');
    if (t.kind === 'stance') return `<span class="stance st-${t.v.replace(/[^A-Za-z]/g, '')}" title="${esc(STANCES[t.v] || t.v)}">${esc(t.v)}</span>`;
    if (t.kind === 'sep') {
      if (t.v === '+') return '<span class="join" aria-hidden="true">+</span>';
      if (t.v === ',') return '<span class="then" aria-hidden="true">›</span>';
      if (t.v === '~') return '<span class="tilde" aria-hidden="true">~</span>';
      return `<span class="then" aria-hidden="true">${esc(t.v)}</span>`;
    }
    return `<span class="word">${esc(t.v)}</span>`;
  }).join('');
  return `<span class="inputs" role="img" aria-label="${esc(describe(input))}">${html}</span>`;
}
