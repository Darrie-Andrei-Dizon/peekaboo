// Steve Fox, Tekken 7 move list with frame data.
// Frame data: rbnorway.org (RBN) Steve T7 table, as captured by the mokujin
// frame-data bot in March 2021 (Season 4). A few values may differ on the final
// v5.x patch; check the in-game Frame Data Display if a number really matters.
//
// Fields: c command, lvl hit level, dmg damage, i startup, blk on block,
// hit on hit, ch on counter hit, cat category, key = one of the first moves
// to learn (number = learning order), tip = plain-English beginner note.
// On-hit codes: KND knockdown, CS crumple stun, JG juggle, Launch, S tailspin,
// a = opponent airborne, s = opponent forced to crouch, g = guard break.

export const CATEGORIES = [
  ['key', 'Start here'],
  ['jabs', 'Jabs & strings'],
  ['mids', 'Mids & specials'],
  ['lows', 'Lows'],
  ['ws', 'Crouch & rising'],
  ['FLK', 'Flicker'],
  ['PAB', 'Peekaboo'],
  ['DCK', 'Duck'],
  ['weave', 'Weaves'],
  ['SWY', 'Sway'],
  ['ALB', 'Albatross'],
  ['rage', 'Rage & throws'],
];

export const MOVES = [
  // ---------- Jabs & strings ----------
  { c: '1', lvl: 'h', dmg: '7', i: '10', blk: '+1', hit: '+8', ch: '+8', cat: 'jabs', key: 1,
    tip: 'Your jab. Fastest button, plus on block. Use it to interrupt, to check people, and to start your turn.' },
  { c: '1,2', lvl: 'h,h', dmg: '7,10', i: '10', blk: '-2', hit: '+6', ch: '+6', cat: 'jabs', key: 2,
    tip: 'The one-two. Safe, and +6 on hit means you can keep attacking. Your bread-and-butter poke.' },
  { c: '1,1', lvl: 'h,h', dmg: '7,7', i: '10', blk: '-3', hit: '+3', ch: '+3', cat: 'jabs' },
  { c: '1,1,2', lvl: 'h,h,h', dmg: '7,7,15', i: '10', blk: '-7~-6', hit: '+4~+5', ch: '+4~+5', cat: 'jabs', key: 3,
    tip: 'Your 10-frame punisher (29 damage). Add f+3 at the end to slide into Duck and stay safer.' },
  { c: '1,1,2,f+3', lvl: 'h,h,h', dmg: '7,7,15', i: '10', blk: '-3', hit: '+8', ch: '+8', cat: 'jabs', note: 'Ends in Duck (DCK)' },
  { c: '1,1,2~B', lvl: 'h,h,h', dmg: '7,7,15', i: '10', blk: '-5', hit: '+6', ch: '+6', cat: 'jabs', note: 'Ends in Sway' },
  { c: '1,1,d+1', lvl: 'h,h,m', dmg: '7,7,15', i: '10', blk: '-6', hit: '0', ch: '+5', cat: 'jabs' },
  { c: '1,1,d+1~B', lvl: 'h,h,m', dmg: '7,7,15', i: '10', blk: '0', hit: '+6', ch: '+11', cat: 'jabs', note: 'Ends in Flicker' },
  { c: '1,2,1', lvl: 'h,h,h', dmg: '7,10,15', i: '10', blk: '-3', hit: '+3', ch: '+3', cat: 'jabs' },
  { c: '1,2,1~B', lvl: 'h,h,h', dmg: '7,10,15', i: '10', blk: '-1', hit: '+5', ch: '+5', cat: 'jabs', note: 'Ends in Flicker' },
  { c: '1,2,1~F', lvl: 'h,h,h', dmg: '7,10,15', i: '10', blk: '-2', hit: '+4', ch: '+4', cat: 'jabs', note: 'Ends in Peekaboo' },
  { c: '1,2,1,2', lvl: 'h,h,h,m', dmg: '7,10,15,15', i: '10', blk: '-10~-9', hit: 'KND', ch: 'KND', cat: 'jabs' },
  { c: '1,2,1,d+2', lvl: 'h,h,h,l', dmg: '7,10,15,19', i: '10', blk: '-12~-11', hit: '+1~+2s', ch: 'KND', cat: 'jabs', note: 'Last hit is a low' },
  { c: '1,d+1', lvl: 'h,m', dmg: '7,15', i: '10', blk: '-6', hit: '0', ch: '+5', cat: 'jabs' },
  { c: '2', lvl: 'h', dmg: '12', i: '12', blk: '-1', hit: '+5', ch: '+5', cat: 'jabs' },
  { c: '2,1', lvl: 'h,h', dmg: '12,14', i: '12', blk: '-5', hit: '+6', ch: '+6', cat: 'jabs' },
  { c: '2,1~B', lvl: 'h,h', dmg: '12,14', i: '12', blk: '+3', hit: '+14', ch: '+14', cat: 'jabs', key: 6, note: 'Ends in Flicker',
    tip: 'Your 12-frame punisher. Holding back puts you in Flicker, which makes it plus on block and very plus on hit.' },
  { c: '2,1~F', lvl: 'h,h', dmg: '12,14', i: '12', blk: '+3', hit: '+14', ch: '+14', cat: 'jabs', note: 'Ends in Peekaboo' },
  { c: '2,1,2', lvl: 'h,h,m', dmg: '12,14,22', i: '12', blk: '-11', hit: 'KND', ch: 'KND', cat: 'jabs' },
  { c: 'f+1+2', lvl: 'm,h', dmg: '10,12', i: '15', blk: '-14~-12', hit: '-3~-1', ch: '-3~-1', cat: 'jabs' },
  { c: 'f+1+2,2', lvl: 'm,h,m', dmg: '10,12,20', i: '15', blk: '-13~-12', hit: 'KND', ch: 'KND', cat: 'jabs', key: 7,
    tip: 'Your 15-frame punisher: 42 damage and a knockdown. Steve has no 15-frame launcher, so this is your big punish.' },

  // ---------- Mids & specials ----------
  { c: 'd/f+1', lvl: 'm', dmg: '12', i: '13', blk: '-2~-1', hit: '+5~+6', ch: '+5~+6', cat: 'mids', key: 4,
    tip: 'Your safe mid poke. Stops opponents from just ducking your highs.' },
  { c: 'd/f+1,2', lvl: 'm,h', dmg: '12,13', i: '13', blk: '-6', hit: '+3', ch: '+5', cat: 'mids' },
  { c: 'd/f+1,2~1', lvl: 'm,h', dmg: '12,20', i: '13', blk: '-2~-1', hit: '+2~+3', ch: 'CS', cat: 'mids' },
  { c: 'd/f+1,2~1~B', lvl: 'm,h', dmg: '12,20', i: '13', blk: '0~+1', hit: '+4~+5', ch: 'CS', cat: 'mids', note: 'Ends in Flicker. Combo filler.' },
  { c: 'd/f+1,2~2', lvl: 'm,m', dmg: '12,20', i: '13', blk: '-9', hit: 'KND', ch: 'KND', cat: 'mids' },
  { c: 'd/f+2', lvl: 'm', dmg: '18', i: '16', blk: '-11~-10', hit: '+6~+7', ch: 'CS', cat: 'mids', key: 8, note: 'Homing',
    tip: 'Homing mid that crumples on counter hit (combo!). Catches sidesteps. Punishable on block, so pick your moments.' },
  { c: 'd/f+1+2', lvl: 'm,m', dmg: '14,21', i: '14', blk: '-12~-11', hit: 'KND', ch: 'KND', cat: 'mids', note: 'Sonic Fang. Wall-carry combo ender.' },
  { c: 'b+1', lvl: 'h', dmg: '17', i: '13', blk: '-14~-13', hit: '+2~+3', ch: 'CS', cat: 'mids', key: 5,
    tip: 'Steve’s signature move. A fast hook that launches on counter hit. Always hold back after it (b+1~B) to make it safe.' },
  { c: 'b+1~B', lvl: 'h', dmg: '17', i: '13', blk: '-1~0', hit: '+9~+10', ch: 'CS', cat: 'mids', note: 'Ends in Flicker' },
  { c: 'b+1,2', lvl: 'h,h', dmg: '17,9', i: '13', blk: '-5', hit: '+19', ch: '+19', cat: 'mids', note: 'Easy follow-up after CH b+1' },
  { c: 'b+1,2~F', lvl: 'h,h', dmg: '17,10', i: '13', blk: '-6~-5', hit: '+5~+6', ch: '+5~+6', cat: 'mids', note: 'Ends in Peekaboo' },
  { c: 'b+1,d+2', lvl: 'h,l', dmg: '17,10', i: '13', blk: '-12~-10', hit: '+1', ch: '-1~+1', cat: 'mids' },
  { c: 'b+1,d+2,1', lvl: 'h,l,m', dmg: '17,10,20', i: '13', blk: '-9~-7', hit: 'KND', ch: 'KND', cat: 'mids' },
  { c: 'b+2', lvl: 'm', dmg: '20', i: '17', blk: '-14~-12', hit: 'CS', ch: 'CS', cat: 'mids' },
  { c: 'f+2', lvl: 'm', dmg: '11', i: '21', blk: '-6~-5', hit: '+5~+6', ch: '+5~+6', cat: 'mids' },
  { c: 'f+2,1', lvl: 'm,h', dmg: '11,12', i: '21', blk: '-5', hit: '-1', ch: '-1', cat: 'mids', note: 'Consistent wall ender' },
  { c: 'f+2,1~2', lvl: 'm,m', dmg: '11,20', i: '21', blk: '-9', hit: 'KND', ch: 'KND', cat: 'mids' },
  { c: 'f,F+2', lvl: 'm', dmg: '24', i: '14', blk: '-13~-10', hit: 'KND', ch: 'KND', cat: 'mids', key: 10,
    tip: 'Dashing straight. Good whiff punisher and the simplest combo ender.' },
  { c: 'qcf+1', lvl: 'm', dmg: '21', i: '16', blk: '-10', hit: 'KND', ch: 'KND', cat: 'mids' },
  { c: 'qcf+1~B', lvl: 'm', dmg: '21', i: '16', blk: '-3', hit: 'KND', ch: 'KND', cat: 'mids', note: 'Ends in Flicker' },
  { c: 'u/f+1', lvl: 'm', dmg: '18', i: '19', blk: '-6~-4', hit: '+5~+7', ch: '+5~+7', cat: 'mids', note: 'Hops over lows' },
  { c: 'u/f+2', lvl: 'm', dmg: '20', i: '22', blk: '-14~-11', hit: 'KND', ch: 'KND', cat: 'mids', note: 'Hops over lows' },
  { c: 'u/f+4', lvl: 'm', dmg: '20', i: '23', blk: '-14~-13', hit: 'Launch', ch: 'Launch', cat: 'mids', key: 9,
    tip: 'A launcher that also jumps over lows. Slow, so use it when you expect a low, or to punish big mistakes.' },
  { c: 'f,f,f+2', lvl: 'm', dmg: '30', i: '20', blk: '+9~+13g', hit: 'KND', ch: 'KND', cat: 'mids', note: 'Running punch, guard break' },
  { c: 'b+1+2', lvl: 'parry', dmg: '-', i: '2', blk: '-', hit: '-', ch: '-', cat: 'mids', note: 'Parry: absorbs one high or mid punch. Press 1 after a successful parry.' },
  { c: 'd/b+1+2', lvl: 'm', dmg: '21', i: '36', blk: '-18~-17', hit: '+24~+25', ch: '+24~+25', cat: 'mids', note: 'Power crush (keeps going through hits)' },

  // ---------- Lows ----------
  { c: 'd+1', lvl: 'l', dmg: '14', i: '16', blk: '-13', hit: '0', ch: '0', cat: 'lows', note: 'Ducks highs while starting' },
  { c: 'd+2', lvl: 'l', dmg: '13', i: '17', blk: '-18', hit: '-5', ch: '-5', cat: 'lows' },
  { c: 'd+2,1,2', lvl: 'l,m,h', dmg: '13,8,17', i: '17', blk: '-2~-1', hit: 'KND', ch: 'CS', cat: 'lows' },
  { c: 'd/b+2', lvl: 'l', dmg: '21', i: '26', blk: '-12~-11', hit: '+1~+2s', ch: 'KND', cat: 'lows', key: 11,
    tip: 'Your main low. Slow, but good damage. Use it after they start blocking your mids and highs.' },
  { c: 'd/b+3', lvl: 'l', dmg: '10', i: '16', blk: '-15', hit: '+1', ch: '+1', cat: 'lows' },
  { c: 'd/b+3,2', lvl: 'l,h', dmg: '10,16', i: '16', blk: '-7~-6', hit: 'KND', ch: 'KND', cat: 'lows' },
  { c: 'qcf+2', lvl: 'l', dmg: '18', i: '19', blk: '-19', hit: '+2', ch: '+2', cat: 'lows' },
  { c: 'u/f+3', lvl: 'l', dmg: '20', i: '36', blk: '-12~-11', hit: '+9~+10', ch: '+9~+10', cat: 'lows' },

  // ---------- Crouch & rising ----------
  { c: 'd/b+1', lvl: 'sm', dmg: '5', i: '10', blk: '-5', hit: '+6', ch: '+6', cat: 'ws', key: 12, note: 'Crouch jab',
    tip: 'Crouch jab. Ducks highs and interrupts. Use it when you think they will throw or jab.' },
  { c: 'WS 1', lvl: 'm', dmg: '12', i: '11', blk: '-3~-2', hit: '+3~+4', ch: '+8~+9', cat: 'ws' },
  { c: 'WS 1,2', lvl: 'm,m', dmg: '12,20', i: '11', blk: '-13~-12', hit: '+3~+4s', ch: 'KND', cat: 'ws', key: 13,
    tip: 'Punish after blocking a low. Release down and press 1,2 as you stand up. One of the best 11-frame rising punishers.' },
  { c: 'WS 2', lvl: 'm', dmg: '17', i: '14', blk: '-7~-5', hit: '+4~+6a', ch: 'Launch', cat: 'ws' },
  { c: 'FC d/f+2', lvl: 'm', dmg: '20', i: '18', blk: '-15~-14', hit: 'Launch', ch: 'Launch', cat: 'ws' },
  { c: 'FC d/f+1', lvl: 'l', dmg: '12', i: '15', blk: '-12~-11', hit: '+2~+3', ch: '+2~+3', cat: 'ws', note: 'Ends in Peekaboo' },

  // ---------- Flicker (b+3+4, or hold B after many moves) ----------
  { c: 'b+3+4', lvl: 'stance', dmg: '-', i: '-', blk: '-', hit: '-', ch: '-', cat: 'FLK', note: 'Enter Flicker. Also: hold B after b+1, 2,1, 1,2,1 and more.' },
  { c: 'FLK 1', lvl: 'h', dmg: '14', i: '12', blk: '-4', hit: '+7', ch: '+7', cat: 'FLK' },
  { c: 'FLK 1~B', lvl: 'h', dmg: '14', i: '12', blk: '-1', hit: '+10', ch: '+10', cat: 'FLK', note: 'Back into Flicker' },
  { c: 'FLK 1,1,1,2', lvl: 'h,h,h,m', dmg: '14,8,8,22', i: '12', blk: '-7', hit: 'KND', ch: 'KND', cat: 'FLK' },
  { c: 'FLK 1,d+1', lvl: 'h,h', dmg: '14,23', i: '12', blk: '0~+2', hit: '+18', ch: 'S', cat: 'FLK', note: 'Tailspin. The screw in most combos.' },
  { c: 'FLK 1,f+1', lvl: 'h,m', dmg: '14,17', i: '12', blk: '-5', hit: '0s', ch: 'KND', cat: 'FLK' },
  { c: 'FLK 2', lvl: 'm', dmg: '21', i: '18', blk: '-5', hit: 'KND', ch: 'Launch', cat: 'FLK' },
  { c: 'FLK b+2', lvl: 'h', dmg: '27', i: '14', blk: '-9', hit: 'KND', ch: 'KND', cat: 'FLK', note: 'Power crush' },
  { c: 'FLK 1+2', lvl: 'throw', dmg: '40', i: '12', blk: '-', hit: 'KND', ch: '-', cat: 'FLK', note: 'Throw' },
  { c: 'FLK f+3+4', lvl: 'stance', dmg: '-', i: '-', blk: '-', hit: '-', ch: '-', cat: 'FLK', note: 'Flicker to Peekaboo' },
  { c: 'FLK d/b', lvl: 'stance', dmg: '-', i: '-', blk: '-', hit: '-', ch: '-', cat: 'FLK', note: 'Cancel Flicker (costs about 2 frames of advantage)' },

  // ---------- Peekaboo (f+3+4, or hold F after some moves) ----------
  { c: 'f+3+4', lvl: 'stance', dmg: '-', i: '-', blk: '-', hit: '-', ch: '-', cat: 'PAB', note: 'Enter Peekaboo' },
  { c: 'PAB 1', lvl: 'h', dmg: '10', i: '12', blk: '-2~-1', hit: '+9~+10', ch: '+9~+10', cat: 'PAB' },
  { c: 'PAB 1,2', lvl: 'h,h', dmg: '10,14', i: '12', blk: '0~+1', hit: '+8~+9', ch: '+8~+9', cat: 'PAB' },
  { c: 'PAB 2', lvl: 'h', dmg: '19', i: '14', blk: '-3', hit: '+2', ch: 'CS', cat: 'PAB', note: 'Homing, absorbs one high or mid hit' },
  { c: 'PAB d/f+1,2', lvl: 'm,h', dmg: '10,20', i: '15', blk: '-6~-5', hit: 'S', ch: 'S', cat: 'PAB', note: 'Go-to mid from Peekaboo. Tailspin.' },
  { c: 'PAB d/f+2', lvl: 'm', dmg: '16', i: '16', blk: '-10~-9', hit: 'Launch', ch: 'Launch', cat: 'PAB' },
  { c: 'PAB d+1', lvl: 'l', dmg: '12', i: '15', blk: '-12~-11', hit: '+2~+3', ch: '+2~+3', cat: 'PAB' },
  { c: 'PAB d+2', lvl: 'l', dmg: '25', i: '28', blk: '-12~-11', hit: '+7~+8', ch: 'KND', cat: 'PAB' },
  { c: 'PAB f+2,1', lvl: 'm,m', dmg: '18,25', i: '18', blk: '+1~+2', hit: 'KND', ch: 'KND', cat: 'PAB' },
  { c: 'PAB b+2', lvl: 'm', dmg: '25', i: '28', blk: '-14~-13', hit: 'KND', ch: 'KND', cat: 'PAB', note: 'Wall bounce' },
  { c: 'PAB 1+2', lvl: 'throw', dmg: '45', i: '11', blk: '-', hit: 'KND', ch: '-', cat: 'PAB', note: 'Throw' },
  { c: 'PAB d/b', lvl: 'stance', dmg: '-', i: '-', blk: '-', hit: '-', ch: '-', cat: 'PAB', note: 'Cancel Peekaboo' },

  // ---------- Duck (f+3 or f+4; hold F for Extended Duck) ----------
  { c: 'f+3', lvl: 'stance', dmg: '-', i: '-', blk: '-', hit: '-', ch: '-', cat: 'DCK', note: 'Enter Duck. Goes under highs. f+4 and d/f+3 work too.' },
  { c: 'DCK 1', lvl: 'm', dmg: '17', i: '19', blk: '-7~-6', hit: 'CS', ch: 'Launch', cat: 'DCK', note: 'Combo filler' },
  { c: 'DCK 2', lvl: 'm', dmg: '15', i: '19', blk: '-14~-12', hit: 'Launch', ch: 'Launch', cat: 'DCK' },
  { c: 'DCK f+2', lvl: 'h', dmg: '21', i: '15', blk: '-7~-6', hit: 'KND', ch: 'S', cat: 'DCK', note: 'Fast high, knocks down; tailspin on CH' },
  { c: 'DCK 1+2', lvl: 'm', dmg: '3', i: '16', blk: '-6', hit: '0', ch: '0', cat: 'DCK', note: 'Keep pressing 1,2 for the rapid-punch flurry' },
  { c: 'Ext DCK f+2', lvl: 'h', dmg: '28', i: '15', blk: '+5~+6', hit: 'CS', ch: 'CS', cat: 'DCK', note: 'From f+3 then hold F' },

  // ---------- Weaves (3 or 4, also at the end of many strings) ----------
  { c: '3', lvl: 'stance', dmg: '-', i: '-', blk: '-', hit: '-', ch: '-', cat: 'weave', note: 'Left Weave (LWV)' },
  { c: '4', lvl: 'stance', dmg: '-', i: '-', blk: '-', hit: '-', ch: '-', cat: 'weave', note: 'Right Weave (RWV)' },
  { c: 'LWV 1', lvl: 'm', dmg: '14', i: '15', blk: '-10', hit: '+1', ch: '+1', cat: 'weave' },
  { c: 'LWV 1~B', lvl: 'm', dmg: '14', i: '15', blk: '-3', hit: '+8', ch: '+8', cat: 'weave', note: 'Ends in Flicker' },
  { c: 'LWV 1,1', lvl: 'm,m', dmg: '14,22', i: '15', blk: '-13~-11', hit: 'KND', ch: 'KND', cat: 'weave', note: 'Wall-carry ender' },
  { c: 'LWV 2', lvl: 'm', dmg: '13', i: '14', blk: '-5~-3', hit: '+4~+6', ch: '+4~+6', cat: 'weave' },
  { c: 'RWV 1', lvl: 'm', dmg: '13', i: '14', blk: '-5~-3', hit: '+4~+6', ch: '+4~+6', cat: 'weave' },
  { c: 'RWV 1,2', lvl: 'm,m', dmg: '13,15', i: '14', blk: '-13~-11', hit: 'Launch', ch: 'Launch', cat: 'weave' },
  { c: 'RWV 2', lvl: 'm', dmg: '22', i: '15', blk: '-13~-12', hit: 'KND', ch: 'KND', cat: 'weave', note: 'Wall bounce' },

  // ---------- Sway (b+3 or b+4) ----------
  { c: 'b+3', lvl: 'stance', dmg: '-', i: '-', blk: '-', hit: '-', ch: '-', cat: 'SWY', note: 'Sway back. Goes under highs.' },
  { c: 'SWY 1', lvl: 'm', dmg: '26', i: '16', blk: '-1~0', hit: '+6~+7s', ch: 'KND', cat: 'SWY' },
  { c: 'SWY 2', lvl: 'm', dmg: '30', i: '17', blk: '-18~-17', hit: 'CS', ch: 'CS', cat: 'SWY' },

  // ---------- Albatross (3+4) ----------
  { c: '3+4', lvl: 'stance', dmg: '-', i: '-', blk: '-', hit: '-', ch: '-', cat: 'ALB', note: 'Albatross spin. Add U or D for a second spin.' },
  { c: 'ALB 2', lvl: 'm', dmg: '22', i: '23', blk: '-8~-7', hit: 'KND', ch: 'KND', cat: 'ALB' },
  { c: 'ALB d+2', lvl: 'l', dmg: '17', i: '21', blk: '-12', hit: '+1s', ch: 'KND', cat: 'ALB' },

  // ---------- Rage & throws ----------
  { c: 'Rage d/f+2+3', lvl: 'm,m', dmg: '14,21', i: '14', blk: '+7', hit: 'JG', ch: 'JG', cat: 'rage', key: 14, note: 'Rage Drive',
    tip: 'Rage Drive. Plus 7 on block and juggles on hit; often called the best Rage Drive in Tekken 7. Use it when you have rage.' },
  { c: 'Rage 1+2', lvl: 'h', dmg: '55', i: '13', blk: '-', hit: 'KND', ch: 'KND', cat: 'rage', note: 'Rage Art (power crush). Big punisher when you have rage.' },
  { c: '1+3', lvl: 'throw', dmg: '-', i: '12', blk: '-', hit: 'KND', ch: '-', cat: 'rage', note: 'Generic throw. Break with 1.' },
  { c: '2+4', lvl: 'throw', dmg: '-', i: '12', blk: '-', hit: 'KND', ch: '-', cat: 'rage', note: 'Generic throw. Break with 2.' },
];

// "-14~-13" -> -14 (worst case for the attacker). Non-numeric -> null.
export function worstFrame(v) {
  const s = String(v || '').trim();
  if (!/^[+-]?\d/.test(s)) return null;
  return Math.min(...s.match(/[+-]?\d+/g).map(Number));
}

// Block-frame class: plus, safe (0 to -9), punishable (-10 or worse).
export function safety(v) {
  const n = worstFrame(v);
  if (n === null) return 'na';
  if (n >= 1) return 'plus';
  if (n >= -9) return 'safe';
  return 'unsafe';
}

export const LEVEL_NAMES = { h: 'High', m: 'Mid', l: 'Low', sm: 'Special mid', throw: 'Throw', parry: 'Parry', stance: 'Stance' };
