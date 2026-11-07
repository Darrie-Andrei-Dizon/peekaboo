// Guide content: beginner path, game plan, tech, punishers, combos and videos.
// Strategy points come from the sources listed in SOURCES; each section
// names the ones it draws on. Strictly Tekken 7 (not Tekken 8).

export const SOURCES = {
  rbn: { name: 'RBNorway Steve T7 frame data', url: 'https://rbnorway.org/steve-t7-frames/' },
  wavu: { name: 'Wavu Wiki: Steve (Tekken 7)', url: 'https://wavu.wiki/t/Steve_(Tekken_7)' },
  wavuCombos: { name: 'Wavu Wiki: Steve combos (Tekken 7)', url: 'https://wavu.wiki/t/Steve_combos_(Tekken_7)' },
  docs: { name: 'TekkenDocs: Steve T7 cheat sheet', url: 'https://tekkendocs.com/t7/steve/meta' },
  salty: { name: 'SaltyEU: Steve Guide', url: 'https://www.salty-eu.com/en/news/details/steve-guide' },
  steam: { name: 'Steam: Steve Fox Complete Guide for New & Veteran Steve Mains', url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2220893473' },
  kage: { name: 'T7 Combo: Overview and Guide for Steve', url: 'https://tekken7combo.kagewebsite.com/guide/overview-guide-steve' },
  gameplay: { name: 'Gameplay.tips: Useful T7 info (character notes)', url: 'https://gameplay.tips/guides/597-tekken-7.html' },
  dash: { name: 'DashFight: Steve Fox guide, combos and move list', url: 'https://dashfight.com/news/tekken-7-steve-fox-guide-combos-and-move-list-263' },
};

const yt = (id) => `https://www.youtube.com/watch?v=${id}`;

// Video guides. All are Tekken 7 Steve videos found on YouTube.
// `start` is in seconds; chapters jump inside the embed.
export const VIDEOS = [
  { id: 'MuUkgR9KecE', title: 'STEVE Basic Guide – TEKKEN 7 (Basic to Pro)', level: 'Beginner', why: 'Watch this first. A start-to-finish tour of Steve’s basics.' },
  { id: 'CWQqJ_bcUyg', title: 'Tekken 7 Steve PRACTICAL Guide – Beginner to KOREAN Series', level: 'Beginner', why: 'The practical version: what to actually press in real matches.' },
  { id: '4rFKiTg-seQ', title: 'STEVE GUIDE (PUNISH & OKI) – TEKKEN 7', level: 'Beginner', why: 'Punishment and what to do when the opponent is on the ground.' },
  { id: '9mzv0cVNcgA', title: 'Steve Fox Combo Guide (Season 4)', level: 'Intermediate', why: 'Every combo with on-screen inputs, including Season 4 additions. Pause and copy.' },
  { id: 'hH8w3mLAFfw', title: 'Tekken 7 – Steve Fox Complete Breakdown', level: 'Deep dive', why: 'About two hours on everything. Use the chapters.',
    chapters: [[0, 'Introduction'], [35, 'Overview'], [272, 'Stances'], [2584, 'Top moves']] },
  { id: 'XtpMUVN36WI', title: 'Steve Fox Season 4 Guide', level: 'Intermediate', why: 'A post-nerf Season 4 look at what still works.' },
  { id: 'MTDiri91idw', title: 'TEKKEN 7 Season 4 – Steve Fox vs. Kunimitsu Quick Dodge / Punish Guide', level: 'Matchup', why: 'An example of how to study a single matchup with Steve.' },
].map((v) => ({ ...v, url: yt(v.id) }));

// Beginner path. Each step can be ticked off.
export const PATH = [
  { id: 'read', title: 'Learn to read the inputs', tab: 'learn', anchor: 'notation',
    body: 'Every move in this app is written in standard Tekken notation and drawn as arrows and a button pad. Two minutes here makes everything else readable.' },
  { id: 'who', title: 'Understand who Steve is', tab: 'learn', anchor: 'who',
    body: 'A boxer with no real kicks. 3 and 4 move him (weaves, ducks, sways) instead of kicking. He wins by poking safely and catching people pressing buttons.' },
  { id: 'twelve', title: 'Learn the first 14 moves', tab: 'moves', filter: 'key',
    body: 'Open the Moves tab on “Start here”. Do each move in Practice mode until you can do it without looking.' },
  { id: 'punish', title: 'Learn 4 punishers', tab: 'combos', anchor: 'punish',
    body: '1,1,2 · 2,1~B · f+1+2,2 · WS 1,2. Turn on Punishment Training in Practice mode and drill them.' },
  { id: 'combo', title: 'Learn one combo', tab: 'combos', anchor: 'combos',
    body: 'Start with CH b+1,2. Then learn the main bread-and-butter. Set the dummy to counter hit to practise.' },
  { id: 'plan', title: 'Learn the game plan', tab: 'learn', anchor: 'plan',
    body: 'Poke, frame trap, cover with Flicker, catch them with counter hits. The whole character in one loop.' },
  { id: 'tech', title: 'Add stance tech', tab: 'tech',
    body: 'Holding back into Flicker to stay safe is the first habit. Peekaboo and Duck pressure come after.' },
  { id: 'watch', title: 'Watch the basics video', tab: 'videos',
    body: 'Seeing the moves used in real matches makes them stick. The Videos tab is ordered from beginner up.' },
];

export const NOTATION = [
  ['1 2 3 4', 'Left punch, right punch, left kick, right kick. On the pad, 1 and 2 are on top, 3 and 4 below.'],
  ['f b u d', 'Tap forward, back, up or down (for the player on the left side). The arrows show the direction.'],
  ['F B U D', 'Capital letter means hold the direction. Drawn as a filled arrow.'],
  ['d/f', 'Diagonal: down-forward. Also d/b, u/f, u/b.'],
  ['+', 'Press together. d/f+1 means hold down-forward and press 1.'],
  [',', 'Then. 1,2 means press 1, then 2.'],
  ['~', 'Immediately after. b+1~B means do b+1 and immediately hold back.'],
  ['qcf', 'Quarter circle forward: down, down-forward, forward.'],
  ['f,F+2', 'Dash forward, then hold forward and press 2.'],
  ['WS', 'While standing up from a crouch. Hold down, let go, and press the button as Steve rises.'],
  ['FC', 'From a full crouch (holding down).'],
  ['CH', 'Counter hit: your attack hits them while they are pressing a button. Many Steve moves do much more on counter hit.'],
  ['S!', 'Screw (tailspin): a hit that spins an airborne opponent so you can carry the combo further.'],
  ['FLK PAB DCK', 'Steve’s stances: Flicker, Peekaboo, Duck. Also LWV/RWV (weaves), SWY (sway), ALB (Albatross).'],
];

export const FRAMES = [
  ['i13', 'Startup: the move hits on frame 13. Smaller is faster. A jab is i10.'],
  ['+ on block', 'You recover first and get to act next. Keep attacking.'],
  ['0 to -9', 'Safe. You recover later, but nothing is guaranteed to punish you.'],
  ['-10 or worse', 'Punishable. At -10 anyone can hit you with a jab. At -15 most characters can launch you.'],
  ['h m l', 'High, mid, low. Highs can be ducked, lows must be blocked low, mids hit crouchers.'],
  ['KND CS Launch', 'Knockdown, crumple stun (falls slowly, combo!), launch (combo!).'],
];

// "Who is Steve" summary.
export const WHO = {
  sources: ['wavu', 'kage', 'steam', 'salty', 'gameplay'],
  strengths: [
    'Strong i10 jabs: 1 is +1 on block and +8 on hit, 1,2 is +6 on hit.',
    'b+1 is an i13 counter-hit launcher that is about -1 when you hold back into Flicker.',
    'Many strings can end in a stance (hold B for Flicker, F for Peekaboo) to stay safe or plus.',
    'Ducks and sways go under high attacks, so he can make opponents whiff and punish them.',
    'One of the strongest Rage Drives in Tekken 7 (d/f+2+3), plus on block.',
  ],
  weaknesses: [
    'Weak punishment: he can’t launch-punish a -15 move like most of the cast.',
    'His lows are slow and mostly punishable on block, so he relies on mids and highs.',
    'Damage comes mostly from counter hits, so patient opponents who don’t press buttons are harder.',
    'Many of his best tools are highs, which can be ducked.',
    'No real kicks: you have to learn stances to play him well.',
  ],
};

// The game plan, as a loop. Ground: Kage guide ("pepper with low-risk pokes,
// then punish frustration with counter-hit moves"), Wavu (b+1 / d/f+2 CH
// fishing, stance cancels), Steam guide (finish strings in stances to stay safe).
export const PLAN = [
  { step: 'Poke', inputs: ['1', '1,2', 'd/f+1', 'd/b+1'],
    body: 'Pepper them with fast, low-risk pokes. Jabs are plus on block, d/f+1 is a safe mid, and the crouch jab ducks highs. You are not trying to win big yet, just to take your turn.' },
  { step: 'Frame trap', inputs: ['b+1~B', 'd/f+2'],
    body: 'After a poke hits or is blocked, opponents want to press back. Throw out b+1 or d/f+2 right then. If they pressed a button, it is a counter hit and a combo.' },
  { step: 'Stay safe with stances', inputs: ['b+1~B', '2,1~B', '1,2,1~B'],
    body: 'Hold back after b+1, 2,1 or 1,2,1 to end in Flicker. It turns punishable moves into safe ones. From Flicker you can jab (FLK 1) or cancel with d/b.' },
  { step: 'Open them up', inputs: ['d/b+2', 'u/f+4', 'f+1+2,2'],
    body: 'Once they block and wait, mix in a low (d/b+2) or a throw. If they start ducking, a mid like d/f+1 or u/f+4 punishes it. Keep the low as a surprise; it is slow.' },
  { step: 'Punish everything', inputs: ['1,1,2', '2,1~B', 'f+1+2,2', 'WS 1,2'],
    body: 'Steve’s punishers are weaker than most, so punish every time. Easy damage adds up.' },
];

export const MISTAKES = [
  ['Spamming b+1', 'It is a high. Opponents who know Steve duck it or step back and whiff punish it. Mix it with d/f+1 and d/f+2.'],
  ['Forgetting ~B', 'b+1 is -14 on its own and -1 with ~B. Make holding back after it a habit.'],
  ['Staying in a stance on autopilot', 'Stances have their own weaknesses. A good opponent will learn your Flicker habit and hit you out of it. Sometimes cancel with d/b and block.'],
  ['Only pressing highs', 'Everything high can be ducked. Mix in d/f+1, d/f+2 and WS moves so ducking is punished.'],
  ['Not punishing', 'Steve wins on small damage. Block, check how negative the move was, and punish.'],
];

// Punishers. Ground: TekkenDocs (1,1,2 29 dmg at i10; ws1,2 at i11),
// SaltyEU and Steam guide (f+1+2,2 at i15 for 42; no launch until -17), RBN.
export const PUNISH = [
  { f: '-10', input: '1,1,2', dmg: 29, note: 'Add f+3 to end in Duck at +8 on hit.' },
  { f: '-12', input: '2,1~B', dmg: 26, note: 'Leaves you in Flicker at +14. You keep your turn.' },
  { f: '-13', input: 'b+1~B', dmg: 17, note: 'Ends in Flicker at +9 on hit.' },
  { f: '-15', input: 'f+1+2,2', dmg: 42, note: 'Knockdown. Steve’s best punisher for -15 and -16 moves.' },
  { f: 'Low blocked', input: 'WS 1,2', dmg: 32, note: 'i11 rising punisher after blocking a low.' },
  { f: 'Whiff', input: 'f,F+2', dmg: 24, note: 'When they miss a big move from a distance.' },
];

// Combos. Ground: Wavu combos page (CH b+1 needs a screw straight away;
// b+1,2 is easy, FLK 1,d+1 does more), TekkenDocs (DCK 1, d/f+1,2~1~B, FLK 1,d+1 S!;
// d/f+1+2 wall-carry ender), DashFight and Steam guide (FLK 1,d+1 into f,F+2;
// starters list), Wavu (f+2,1 for consistency at the wall).
export const COMBOS = [
  { id: 'chb1-easy', level: 'Beginner', name: 'Counter-hit b+1 (easy)', starter: 'CH b+1',
    route: ['CH b+1,2'], dmg: 'about 30',
    how: 'Just press 2 straight after b+1 hits. Only do it when b+1 counter hits (you will see “COUNTER” on screen).',
    src: ['wavuCombos'] },
  { id: 'chb1-screw', level: 'Intermediate', name: 'Counter-hit b+1 into screw', starter: 'CH b+1',
    route: ['CH b+1~B', 'FLK 1,d+1 S!', 'f,F+2'],
    how: 'Hold back right after b+1 to go into Flicker, then 1,d+1 straight away to screw them. Dash in and finish with f,F+2.',
    src: ['wavuCombos', 'dash'] },
  { id: 'bnb', level: 'Intermediate', name: 'Main bread-and-butter', starter: 'u/f+4, CH d/f+2, CH DCK 1, RWV 1,2',
    route: ['Launcher', 'DCK 1', 'd/f+1,2~1~B', 'FLK 1,d+1 S!', 'f,F+2'],
    how: 'After any launcher: f+3 then 1 (Duck 1), then d/f+1,2,1 holding back into Flicker, Flicker 1,d+1 for the screw, then dash f,F+2.',
    src: ['docs', 'steam', 'dash'] },
  { id: 'carry', level: 'Intermediate', name: 'Wall-carry ender', starter: 'Any screw',
    route: ['… FLK 1,d+1 S!', 'd/f+1+2'],
    how: 'Swap the ender for d/f+1+2 (Sonic Fang) to push them further toward the wall.',
    src: ['docs', 'wavu'] },
  { id: 'carry-lwv', level: 'Advanced', name: 'Weave wall-carry ender', starter: 'Any screw',
    route: ['… FLK 1,d+1 S!', 'LWV 1,1', 'd/f+1+2'],
    how: 'Wavu’s standard wall carry: 3 into Left Weave 1,1, then d/f+1+2. Less damage than the full route, much easier at the wall.',
    src: ['wavu'] },
  { id: 'wall', level: 'Beginner', name: 'At the wall (consistent)', starter: 'Wall splat',
    route: ['W!', 'f+2,1'],
    how: 'When you can’t reach the Flicker route in time at the wall, f+2,1 does less damage but works far more often.',
    src: ['wavu'] },
];

// Tech: Steve-specific and general Tekken 7 skills.
export const TECH = [
  { group: 'Steve tech', items: [
    { name: 'Stance cancel to stay safe', inputs: ['b+1~B', '2,1~B', 'qcf+1~B', '1,2,1~B'],
      body: 'Hold back at the end of these moves to slide into Flicker. It makes them much safer on block:',
      table: [['b+1', '-14', '-1'], ['qcf+1', '-10', '-3'], ['2,1', '-5', '+3'], ['1,2,1', '-3', '-1'], ['LWV 1', '-10', '-3']],
      src: ['wavu', 'steam', 'rbn'] },
    { name: 'Flicker (FLK)', inputs: ['b+3+4', 'FLK 1', 'FLK 2', 'FLK d/b'],
      body: 'Steve’s defensive stance. FLK 1 is a fast i12 jab you can repeat; FLK 1,d+1 screws. FLK 2 is a mid that launches on counter hit. Press d/b to drop the stance and block.',
      src: ['wavu', 'steam'] },
    { name: 'Peekaboo (PAB)', inputs: ['f+3+4', '2,1~F', 'PAB d/f+1,2', 'PAB 2'],
      body: 'Steve’s offensive stance. PAB d/f+1,2 is the go-to mid. PAB 2 is homing and absorbs a hit. In stance you can’t sidestep, but you can weave with 3 or 4.',
      src: ['salty', 'steam'] },
    { name: 'Duck (DCK)', inputs: ['f+3', 'DCK f+2', 'DCK 1'],
      body: 'Duck forward under highs. DCK f+2 is a fast high that knocks down and tailspins on counter hit. Hold F after f+3 for Extended Duck, where f+2 becomes +5 on block.',
      src: ['salty', 'rbn'] },
    { name: 'Weaves and sway', inputs: ['3', '4', 'b+3', 'SWY 1'],
      body: 'Kick buttons are movement for Steve. 3 and 4 weave left and right (also at the end of many strings). b+3 sways back under highs; SWY 1 is a big mid.',
      src: ['dash', 'gameplay'] },
    { name: 'Parry', inputs: ['b+1+2'],
      body: 'Absorbs one high or mid punch. Press 1 after a successful parry. Use it when you know a punch is coming.',
      src: ['wavu', 'rbn'] },
    { name: 'Power crushes', inputs: ['d/b+1+2', 'FLK b+2', 'Rage 1+2'],
      body: 'These keep going through high and mid hits (you still take damage). Use them sparingly to stop pressure.',
      src: ['rbn'] },
    { name: 'Rage Drive', inputs: ['Rage d/f+2+3'],
      body: 'Plus 7 on block and juggles on hit. Often called the strongest Rage Drive in Tekken 7. When you are in rage, it is your best way to keep your turn.',
      src: ['wavu', 'rbn'] },
  ] },
  { group: 'Tekken 7 basics', items: [
    { name: 'Blocking', inputs: ['B', 'D/B'],
      body: 'Hold back to block high and mid. Hold down-back to block low (highs whiff over you, but mids hit). Doing nothing while not attacking also blocks highs and mids.' },
    { name: 'Sidestep', inputs: ['u', 'd'],
      body: 'Tap up or down to step into or out of the screen. Beats linear attacks. Homing moves (like d/f+2) catch it.' },
    { name: 'Backdash', inputs: ['b,b'],
      body: 'Double-tap back to backdash. To keep backing off, cancel each dash with d/b and repeat. Makes opponents whiff, then punish with f,F+2.' },
    { name: 'Throw breaks', inputs: ['1', '2', '1+2'],
      body: 'When grabbed, press 1 if their left arm grabbed first, 2 for the right, 1+2 if both. Watch which arm reaches out first.' },
    { name: 'Get up safely', inputs: ['B'],
      body: 'When knocked down, don’t panic-press. Holding back to roll back, or staying on the ground, is usually safer than standing straight up into pressure.' },
    { name: 'Punishment Training', inputs: [],
      body: 'In Practice mode, choose Punishment Training. The game repeats unsafe moves so you can practise 1,1,2 and f+1+2,2 until they are automatic.' },
    { name: 'Frame Data Display', inputs: [],
      body: 'Tekken 7’s Frame Data Display add-on shows startup and on-block frames in Practice mode. Use it to check any number in this app.' },
  ] },
];
