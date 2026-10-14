import { trinityMarkup, trinityStyles } from './trinity.js';
/* Code-native recreations of the small handmade decorations in Susi's cards.
 * Magazine artwork remains the original attached photograph: SVG viewBox crops
 * its display only; original image files are not changed or regenerated.
 */
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const svg = (viewBox, content, klass = '', label = '') => `<svg class="fg-deco-svg ${klass}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" ${label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"'}>${content}</svg>`;

function bulb(suffix) {
  const id = `fg-bulb-${suffix}`;
  const rays = [
    [84, 13, -8, '#a58432'], [113, 18, 21, '#d78340'], [135, 40, 54, '#a27e2f'],
    [145, 72, 86, '#d68a46'], [131, 102, 122, '#a28231'], [104, 118, 158, '#d88036'],
    [65, 116, 201, '#a28231'], [39, 94, 234, '#d7803e'], [33, 61, 265, '#a68535'],
    [50, 30, 310, '#d7813c'],
  ];
  return svg('0 0 174 184', `
    <defs>
      <linearGradient id="${id}-gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#efd67d"/><stop offset=".45" stop-color="#c1a043"/><stop offset="1" stop-color="#9d7628"/></linearGradient>
      <pattern id="${id}-glitter" width="9" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#fff0b2"/><circle cx="7" cy="6" r=".6" fill="#785518"/><path d="M6 1v2M5 2h2" stroke="#f3df8c" stroke-width=".55"/></pattern>
    </defs>
    <path d="M68 3Q80-5 91 5Q99-5 110 2L116 13Q135 6 141 21L139 32Q159 29 162 47L152 58Q173 61 166 81L153 86Q164 103 148 114L135 112Q131 130 115 130L114 164Q113 179 91 181L78 179Q58 177 57 162L56 130Q38 129 36 114Q18 115 13 99L21 86Q1 82 7 65L19 57Q4 41 18 27L35 29Q32 10 49 8L61 16Z" fill="#fff2d2" stroke="#fffdfa" stroke-width="3"/>
    ${rays.map(([x,y,r,c])=>`<ellipse cx="${x}" cy="${y}" rx="4.5" ry="10" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`).join('')}
    <path d="M84 38C37 37 30 92 57 115C63 120 65 129 66 140L109 140C110 130 111 124 119 117C151 89 136 38 91 38Z" fill="url(#${id}-gold)"/>
    <path d="M84 38C37 37 30 92 57 115C63 120 65 129 66 140L109 140C110 130 111 124 119 117C151 89 136 38 91 38Z" fill="url(#${id}-glitter)" opacity=".8"/>
    <path d="M76 142C77 127 83 94 78 82C72 67 60 74 66 85C76 104 112 97 115 85C119 72 102 77 96 91C91 104 88 128 88 142" fill="none" stroke="#6b4b27" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M62 142Q60 136 66 134L110 136Q116 138 111 144L111 160Q109 168 101 169L75 168Q63 166 64 158Z" fill="#57b8da"/>
    <path d="M64 143L111 146M65 152L110 156" fill="none" stroke="#2586b7" stroke-width="5" stroke-linecap="round"/>
    <path d="M75 168Q78 178 93 177Q105 177 107 168" fill="#257ea6"/>
  `, 'fg-deco-bulb');
}

function elephant() {
  return svg('0 0 95 76', `<path d="M20 20Q27 6 53 12Q72 4 77 22Q89 22 85 39L86 47Q94 46 93 54Q90 66 76 59L67 54L61 67H46L44 58L35 59L30 68H16L17 47Q4 43 10 33L15 32Z" fill="#729544" stroke="#ebd7a6" stroke-width="5"/><path d="M20 25Q32 12 57 19Q68 14 73 25L78 33L77 43Q81 57 89 50Q88 65 75 55L65 46L59 62L49 61L48 51L31 53L27 62H20Z" fill="#a25a48"/><ellipse cx="55" cy="33" rx="12" ry="14" fill="#ab715a"/><path d="M57 23Q45 34 56 44" fill="none" stroke="#d3a264" stroke-width="2"/><circle cx="70" cy="27" r="2.3" fill="#352c20"/><path d="M21 31Q8 18 12 42" fill="none" stroke="#a05e4b" stroke-width="4"/>`, 'fg-deco-elephant');
}
function sheep() {
  return svg('0 0 101 84', `<path d="M17 19Q12 9 25 11Q32 1 41 10Q52 2 58 12Q69 3 76 17L86 20Q103 25 96 38L85 44L83 60L73 64L70 75L59 70L61 58L43 62L39 76L29 75L27 60Q10 61 10 47Q0 40 9 32Q2 23 17 19Z" fill="#faf0c6" stroke="#fff9e9" stroke-width="7"/><path d="M17 19Q12 9 25 11Q32 1 41 10Q52 2 58 12Q69 3 76 17L86 20Q103 25 96 38L85 44L83 60L73 64L70 75L59 70L61 58L43 62L39 76L29 75L27 60Q10 61 10 47Q0 40 9 32Q2 23 17 19Z" fill="#f3dc99" stroke="#a56e4d" stroke-width="3"/><path d="M72 22Q87 12 91 30L86 47Q76 57 69 42L70 32Q58 23 65 20Z" fill="#cf9c66"/><path d="M68 24L76 30" stroke="#9e6248" stroke-width="4" stroke-linecap="round"/><circle cx="83" cy="30" r="2" fill="#4b3b2f"/><path d="M21 25Q27 17 34 24M30 35Q37 27 44 34M46 19Q55 14 60 24M52 44Q59 34 65 40" fill="none" stroke="#e6c886" stroke-width="2"/>`, 'fg-deco-sheep');
}
function turtle() {
  return svg('0 0 92 68', `<path d="M19 23Q24 7 52 9Q69 6 74 23Q87 18 87 34Q86 43 74 43L69 55L58 54L54 46L33 48L28 56L15 51L18 40Q6 35 12 26Z" fill="#6b8d3d" stroke="#f8efd1" stroke-width="5"/><ellipse cx="42" cy="29" rx="25" ry="19" fill="#ab7855"/><path d="M23 27L34 17L48 16L61 26L57 40L38 45L22 36Z" fill="#bc875f"/><path d="M33 18L36 32L48 34L60 26M36 32L25 38M48 34L49 43" fill="none" stroke="#936448" stroke-width="2"/><circle cx="31" cy="24" r="4" fill="#d6bd69"/><circle cx="46" cy="25" r="4" fill="#d6bd69"/><circle cx="40" cy="37" r="4" fill="#d6bd69"/><circle cx="78" cy="28" r="2" fill="#252b18"/>`, 'fg-deco-turtle');
}
function butterfly() {
  return svg('0 0 76 78', `<path d="M36 21Q10-2 9 26Q0 36 21 44Q5 62 24 66L38 53Q60 77 67 57L56 40Q77 24 63 13Q52 7 39 24Z" fill="#8db853" stroke="#f2edc3" stroke-width="6"/><path d="M34 27Q15 7 15 28Q10 34 29 40L25 54L37 45L51 57Q59 61 61 50L50 39Q64 23 55 20L43 31Z" fill="#2f2b20"/><path d="M32 33Q26 20 21 29L25 35M46 36L55 26" stroke="#d4b965" fill="none" stroke-width="4"/><path d="M37 24L43 54M38 27L32 15M39 27L46 17" stroke="#655137" stroke-width="3" stroke-linecap="round"/>`, 'fg-deco-butterfly');
}
const star = (klass = '') => svg('0 0 35 35', '<path d="m17 2 4 10 11 1-8 7 2 11-9-6-9 6 2-11-8-7 11-1Z" fill="#d4a249" stroke="#fff2c6" stroke-width="2"/>', `fg-deco-star ${klass}`);

function hearts() {
  return `<div class="fg-deco-hearts" aria-hidden="true">${['#5b8291','#72526e','#59c9d4','#ad833e','#b787b0','#43617e','#edb3cd','#67bdb8'].map((color,index)=>svg('0 0 26 25', `<path d="M13 23C-8 9 2-6 13 4C24-6 34 9 13 23Z" fill="${color}"/><path d="M6 5Q3 7 5 11" fill="none" stroke="#fff" stroke-opacity=".3"/>`, `fg-deco-heart fg-deco-heart-${index}`)).join('')}</div>`;
}

const trinity = trinityMarkup;

function clipping(id) {
  // Coordinates refer to the source photo after its 90° clockwise display rotation.
  const windows = {
    6: '258 534 355 508',
    8: '266 548 365 510',
    13: '288 548 367 512',
    23: '270 540 365 530',
  };
  return `<figure class="fg-deco-clipping fg-deco-clipping-${id}" aria-hidden="true">${svg(windows[id], `<image href="/assets/faith-game/cards/${id}.jpg" width="1350" height="1800" transform="translate(1800 0) rotate(90)" preserveAspectRatio="none"/>`, 'fg-deco-source-window')}<span class="fg-deco-tape fg-deco-tape-top"></span><span class="fg-deco-tape fg-deco-tape-bottom"></span></figure>`;
}

function prayerStrips(id, lang) {
  const pieces = id === 7
    ? (lang === 'en' ? ['God, give me strength to forgive', 'and move forward', 'with LOVE'] : ['Dios, dame fuerza para perdonar', 'y seguir adelante', 'con AMOR'])
    : (lang === 'en' ? ['God, help me', 'notice', 'all the good', 'YOU provide', 'every day.'] : ['Dios, ayúdame a', 'reconocer', 'todo lo bueno que', 'TÚ nos das', 'cada día.']);
  return `<div class="fg-deco-prayer-strips fg-deco-prayer-${id}">${pieces.map((piece,index)=>`<span class="fg-deco-prayer-piece fg-deco-prayer-piece-${index}">${esc(piece)}</span>`).join('')}</div>`;
}

function faithfulBody(card, lang) {
  const body = card.body?.[lang] || '';
  const paragraphs = body.split('\n\n');
  if (card.id === 1) {
    const prayer = card.prayer?.[lang] || paragraphs.at(-1) || '';
    const prose = body.endsWith(prayer) ? body.slice(0, -prayer.length).trim() : body;
    return `<div class="fg-deco-faithful-body fg-deco-prayer-one"><p class="card-copy large-copy">${esc(prose)}</p><div class="fg-deco-prayer-strips"><span class="fg-deco-prayer-piece">${esc(prayer)}</span></div></div>`;
  }
  if (card.id === 12) {
    const first = paragraphs.shift() || '';
    const underlined = first.split(' ').map(word => `<span class="fg-deco-purple-word">${esc(word)}</span>`).join(' ');
    return `<div class="fg-deco-faithful-body fg-deco-hallowed"><p class="card-copy large-copy fg-deco-purple-sentence">${underlined}</p>${paragraphs.map(p => `<p class="card-copy large-copy">${esc(p)}</p>`).join('')}</div>`;
  }
  if (card.id === 22) {
    const trust = lang === 'en' ? 'TRUST' : 'CONFÍO';
    return `<div class="fg-deco-faithful-body fg-deco-trust">${paragraphs.map(p => `<p class="card-copy large-copy ${p.includes(trust)?'trust-prayer':''}">${esc(p).split(trust).join(`<span class="fg-deco-trust-word">${trust}</span>`)}</p>`).join('')}</div>`;
  }
  return '';
}

export function titleBulb(card) {return card.decorations?.includes('bulb') ? `<span class="card-title-bulb">${bulb(card.id)}</span>` : ''; }

export function decorationsMarkup(card, lang = 'es') {
  if (!card) return '';
  const motifs = new Set(card.decorations || []);
  const pieces = [];
  if (motifs.has('bulb')) pieces.push(bulb(card.id));
  if (motifs.has('foil-hearts')) pieces.push(hearts());
  if (motifs.has('cloud')) pieces.push(svg('0 0 80 52', '<path d="M18 42Q-2 40 8 24Q8 10 25 14Q31-2 44 10Q58 2 63 18Q84 22 69 39Q60 50 48 42Q31 53 24 42Z" fill="#f6f1df" stroke="#c5d1d3" stroke-width="2"/>', 'fg-deco-cloud'));
  if (motifs.has('elephant')) pieces.push(elephant());
  if (motifs.has('sheep')) pieces.push(sheep());
  if (motifs.has('turtle')) pieces.push(turtle());
  if (motifs.has('butterfly')) pieces.push(butterfly());
  if (motifs.has('stars')) pieces.push(star('fg-deco-star-one'), star('fg-deco-star-two'), star('fg-deco-star-three'));
  if ([6, 8, 13, 23].includes(card.id)) pieces.push(clipping(card.id));
  if (card.id === 21) pieces.push(trinity(lang));
  if ([7, 20].includes(card.id)) pieces.push(prayerStrips(card.id, lang));
  if ([1, 12, 22].includes(card.id)) pieces.push(faithfulBody(card, lang));
  return pieces.length ? `<div class="fg-decorations fg-decorations-${esc(card.id)}">${pieces.join('')}</div>` : '';
}

// Optional, narrowly scoped styling. Parent card should be position:relative.
// Do not hide normal body text unless decorationsIncludeBody(card) is true.
export function decorationsIncludeBody(card) { return [1, 7, 12, 20, 22].includes(card?.id); }
export const decorationsStyles = trinityStyles + `
.fg-decorations { position:relative; min-height:0; pointer-events:none; }
.fg-deco-svg { display:block; overflow:visible; }
.fg-deco-bulb { width:92px; height:100px; position:absolute; right:0; top:-112px; transform:rotate(7deg); filter:drop-shadow(0 3px 1px #00000012); }
.fg-deco-elephant,.fg-deco-sheep,.fg-deco-turtle,.fg-deco-butterfly,.fg-deco-star,.fg-deco-cloud { position:absolute; filter:drop-shadow(0 2px 1px #0000000d); }
.fg-deco-elephant { width:40px; top:-54px; left:10%; transform:rotate(-8deg); }
.fg-deco-sheep { width:48px; right:7%; bottom:-10px; transform:rotate(11deg); }
.fg-deco-turtle { width:36px; left:-5px; top:160px; transform:rotate(-16deg); }
.fg-deco-butterfly { width:35px; right:-2px; top:112px; transform:rotate(15deg); }
.fg-deco-star { width:17px; }
.fg-deco-star-one { left:15%; top:87px; transform:rotate(-11deg); }
.fg-deco-star-two { right:17%; top:186px; transform:rotate(14deg); }
.fg-deco-star-three { left:48%; top:270px; }
.fg-deco-hearts { position:absolute; inset:-125px 0 auto; height:400px; }
.fg-deco-heart { position:absolute; width:12px; filter:drop-shadow(0 1px 0 #ffffff55); }
.fg-deco-heart-0 { left:24%; top:5%; transform:rotate(-13deg); }
.fg-deco-heart-1 { left:49%; top:1%; transform:rotate(9deg); }
.fg-deco-heart-2 { right:11%; top:9%; transform:rotate(-16deg); }
.fg-deco-heart-3 { right:4%; top:28%; transform:rotate(12deg); }
.fg-deco-heart-4 { left:0; top:53%; transform:rotate(-18deg); }
.fg-deco-heart-5 { right:7%; top:73%; transform:rotate(10deg); }
.fg-deco-heart-6 { left:13%; top:85%; transform:rotate(-8deg); }
.fg-deco-heart-7 { right:24%; top:87%; transform:rotate(12deg); }
.fg-deco-cloud { width:33px; top:-115px; left:46%; transform:rotate(6deg); }
.fg-deco-trinity { width:min(100%,500px); max-height:280px; margin:12px auto 6px; }
.fg-deco-clipping { width:128px; aspect-ratio:355 / 510; margin:12px 20px 12px 0; position:relative; transform:rotate(-3deg); box-shadow:0 5px 12px #49132c2a; }
.fg-deco-source-window { width:100%; height:100%; overflow:hidden; border:5px solid #f8f4e9; background:#f8f4e9; }
.fg-deco-tape { position:absolute; width:84px; height:20px; background:#e52e3d66; box-shadow:inset 1px 1px 0 #ffffff20; }
.fg-deco-tape-top { top:-5px; left:-10px; transform:rotate(-8deg); }
.fg-deco-tape-bottom { bottom:-7px; right:-9px; transform:rotate(6deg); }
.fg-deco-prayer-strips { display:flex; flex-wrap:wrap; justify-content:center; gap:19px 13px; padding:25px 3px 30px; line-height:1.45; }
.fg-deco-prayer-piece { display:block; position:relative; padding:9px 18px; background:#fffef5; color:#3e332f; box-shadow:0 3px 5px #4e1b2119; transform:rotate(-1deg); }
.fg-deco-prayer-piece:before { content:''; position:absolute; inset:-5px -7px; background:#eb374d30; z-index:-1; transform:rotate(2deg); }
.fg-deco-prayer-7 { flex-direction:column; align-items:center; }
.fg-deco-prayer-7 .fg-deco-prayer-piece-0 { align-self:flex-start; }
.fg-deco-prayer-7 .fg-deco-prayer-piece-1 { transform:rotate(1deg); }
.fg-deco-prayer-7 .fg-deco-prayer-piece-2 { align-self:flex-end; font-size:1.35em; }
.fg-deco-prayer-20 .fg-deco-prayer-piece-2,.fg-deco-prayer-20 .fg-deco-prayer-piece-4 { background:transparent; box-shadow:none; padding-inline:2px; }
.fg-deco-prayer-20 .fg-deco-prayer-piece-2:before,.fg-deco-prayer-20 .fg-deco-prayer-piece-4:before { display:none; }
.fg-deco-faithful-body { padding-top:1px; }
.fg-deco-prayer-one .fg-deco-prayer-strips { justify-content:flex-start; padding-top:29px; padding-bottom:12px; }
.fg-deco-prayer-one .fg-deco-prayer-piece { font:24px/1.5 var(--serif,Georgia,serif); transform:rotate(-.65deg); }
.fg-deco-hallowed .fg-deco-purple-sentence { padding-right:95px; line-height:1.8; }
.fg-deco-purple-word { text-decoration:underline; text-decoration-color:#b16b9b; text-decoration-thickness:3px; text-underline-offset:7px; }
.fg-deco-trust-word { display:inline-block; color:#29331c; font-size:1.25em; font-weight:600; line-height:1.5; letter-spacing:1px; paint-order:stroke fill; -webkit-text-stroke:5px #d8cc9b; text-shadow:1px 1px 0 #d8cc9b,-1px -1px 0 #d8cc9b; padding:0 3px; }
@media(max-width:520px) { .fg-deco-bulb { width:65px; height:73px; top:-82px; } .fg-deco-clipping { width:100px; } .fg-deco-prayer-piece { padding:8px 10px; } }
`;
