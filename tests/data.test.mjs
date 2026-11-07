// Checks the notation parser and that the guide data is consistent.
// Run: node tests/data.test.mjs
import assert from 'node:assert/strict';
import { tokenize, describe, render } from '../js/notation.js';
import { MOVES, CATEGORIES, safety, worstFrame } from '../js/moves.js';
import * as G from '../js/guide.js';

let n = 0;
const t = (name, fn) => { fn(); n += 1; console.log('ok', name); };

t('directions, held directions and buttons', () => {
  const k = tokenize('d/f+1,2~B');
  assert.deepEqual(k.map((x) => x.kind), ['dir', 'sep', 'btn', 'sep', 'btn', 'sep', 'dir']);
  assert.equal(k[0].v, 'd/f');
  assert.equal(k[6].held, true);
});

t('multi-button presses stay together', () => {
  const k = tokenize('f+1+2,2');
  assert.deepEqual(k[2].v, [1, 2]);
});

t('stance prefixes', () => {
  assert.equal(tokenize('FLK 1,d+1 S!')[0].v, 'FLK');
  assert.equal(tokenize('Ext DCK f+2')[0].v, 'Ext DCK');
  assert.ok(tokenize('FLK 1,d+1 S!').some((x) => x.kind === 'stance' && x.v === 'S!'));
});

t('motions and dash', () => {
  assert.equal(tokenize('qcf+1')[0].kind, 'motion');
  assert.equal(describe('f,F+2'), 'tap forward then hold forward and button 2');
});

t('frame safety', () => {
  assert.equal(worstFrame('-14~-13'), -14);
  assert.equal(safety('+3'), 'plus');
  assert.equal(safety('-9'), 'safe');
  assert.equal(safety('-10'), 'unsafe');
  assert.equal(safety('0~+1'), 'safe');
  assert.equal(safety('KND'), 'na');
});

t('every move has a known category and renders without leftover text', () => {
  const cats = new Set(CATEGORIES.map(([k]) => k));
  for (const m of MOVES) {
    assert.ok(m.cat === 'key' || cats.has(m.cat), m.c);
    const words = tokenize(m.c).filter((x) => x.kind === 'text');
    assert.equal(words.length, 0, `unparsed text in ${m.c}: ${words.map((w) => w.v)}`);
    assert.ok(render(m.c).includes('aria-label'));
  }
});

t('key moves are numbered 1..N without gaps', () => {
  const keys = MOVES.filter((m) => m.key).map((m) => m.key).sort((a, b) => a - b);
  assert.deepEqual(keys, keys.map((_, i) => i + 1));
  assert.ok(MOVES.filter((m) => m.key).every((m) => m.tip), 'every key move has a tip');
});

t('punishers and combos reference moves that exist', () => {
  const cmds = new Set(MOVES.map((m) => m.c));
  for (const p of G.PUNISH) assert.ok(cmds.has(p.input), p.input);
});

t('every cited source exists', () => {
  const all = [...G.COMBOS.flatMap((c) => c.src), ...G.TECH.flatMap((g) => g.items.flatMap((i) => i.src || [])), ...G.WHO.sources];
  for (const s of all) assert.ok(G.SOURCES[s], s);
});

t('stance map edges connect real nodes', () => {
  const ids = new Set(G.STANCE_NODES.map((n) => n.id));
  for (const e of G.STANCE_EDGES) assert.ok(ids.has(e.from) && ids.has(e.to), `${e.from}->${e.to}`);
  for (const k of Object.keys(G.STANCE_MOVES)) assert.ok(ids.has(k), k);
});

t('every input in drills, matchups and the stance map parses cleanly', () => {
  const all = [
    ...G.DRILLS.flatMap((d) => d.inputs), ...G.MATCHUPS.flatMap((m) => m.tools),
    ...G.STANCE_EDGES.flatMap((e) => e.inputs), ...Object.values(G.STANCE_MOVES).flat(),
  ];
  for (const x of all) {
    const words = tokenize(x).filter((k) => k.kind === 'text');
    assert.equal(words.length, 0, `unparsed text in ${x}`);
  }
});

t('videos have YouTube ids', () => {
  for (const v of G.VIDEOS) assert.match(v.id, /^[\w-]{11}$/);
});

console.log(`\n${n} checks passed`);
