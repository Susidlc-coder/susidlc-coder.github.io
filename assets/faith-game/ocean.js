// The Poems Fibonacci metallic rhythm, in one blue/turquoise sea palette.
// Original handmade paper colours are still revealed on interaction.
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mix = (hex, amount) => '#'+hex.slice(1).match(/../g).map(v=>Math.round(parseInt(v,16)*(1-amount)+255*amount).toString(16).padStart(2,'0')).join('');
const palettes = [
  ['#103e58','#12647d','#1b737e','#2b7b7b']
];
function metalGradient(id,palette,reverse=false) {
  const [a,b,c,d]=[palette[0],palette[1],palette[2],palette.at(-1)];
  const colors=reverse?[a,b,d,c,b,a]:[c,d,b,a,b,c];
  return `<linearGradient id="${id}" x1="${reverse?'100%':'0%'}" y1="0%" x2="${reverse?'0%':'100%'}" y2="100%">${colors.map((color,i)=>`<stop offset="${[0,13,31,54,78,100][i]}%" stop-color="${color}"/>`).join('')}</linearGradient>`;
}
function pawn(compact) {
  return `<g class="traveler-pawn" transform="translate(${compact?82:61} ${compact?-32:-25}) scale(${compact?1.48:1})" aria-hidden="true"><ellipse class="pawn-shadow" cx="1" cy="43" rx="25" ry="8"/><g class="pawn-figure"><path class="pawn-body" fill="url(#faith-gold-metal)" d="M0-43a12 12 0 1 1 0 24a12 12 0 1 1 0-24ZM-9-12Q0-18 9-12C15-7 14 4 17 14L25 31Q27 38 19 40Q0 46-19 40Q-27 38-25 31L-17 14C-14 4-15-7-9-12Z"/><path class="pawn-glint" d="M-4-38Q-11-34-7-27M-6-8Q-11-1-9 8L-16 28"/></g></g>`;
}
function lines(value, length) {
  const out = [''];
  for (const word of value.split(' ')) {
    if ((out.at(-1)+' '+word).trim().length>length && out.at(-1)) out.push(word);
    else out[out.length-1]=(out.at(-1)+' '+word).trim();
  }
  return out.slice(0,4);
}
export function oceanMarkup({cards, lang, player, started, compact=false, names}) {
  const cols=compact?4:6, rows=24/cols, width=1200, height=compact?1440:660;
  const cw=width/cols, ch=height/rows;
  const vertices=Array.from({length:rows+1},(_,y)=>Array.from({length:cols+1},(_,x)=>({
    x:Math.round(x*cw+(x===0||x===cols?0:Math.sin(x*9+y*3.7)*cw*.14)),
    y:Math.round(y*ch+(y===0||y===rows?0:Math.sin(x*4.2+y*7.6)*ch*.15))
  })));
  const gradients=cards.filter(c=>typeof c.id==='number'&&c.id>0).map(c=>{
    const palette=palettes[(c.id*7+3)%palettes.length];
    return `<linearGradient id="paper-${c.id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${mix(c.color,.3)}"/><stop offset=".5" stop-color="${c.color}"/><stop offset="1" stop-color="${c.accent}"/></linearGradient>${metalGradient(`metal-${c.id}`,palette)}${metalGradient(`metal-light-${c.id}`,palette,true)}`;
  }).join('');
  let cells='';
  for(let row=0;row<rows;row++) for(let col=0;col<cols;col++) {
    const stepRow=rows-1-row;
    const n=stepRow*cols+(stepRow%2?cols-col:col+1);
    const c=cards.find(c=>c.id===n), title=names[n];
    const points=[vertices[row][col],vertices[row][col+1],vertices[row+1][col+1],vertices[row+1][col]];
    const pointString=points.map(p=>`${p.x},${p.y}`).join(' ');
    const cx=points.reduce((s,p)=>s+p.x,0)/4, cy=points.reduce((s,p)=>s+p.y,0)/4;
    const icon=c.type==='fill'?'✉':c.type==='order'?'✧':c.type==='temptation'?'↙':n===21?'△':n===24?'♡':c.type==='classify'||c.type==='examples'?'✦':c.type==='match'?'↔':'';
    const current=started&&player.pos===n&&!player.amen;
    const delay=-5500*(cx/width*.68+cy/height*.32);
    cells+=`<g class="map-piece ${current?'is-current':''}" role="button" tabindex="0" data-card="${n}" aria-label="${n}. ${escape(c.title[lang])}" ${current?'aria-current="step"':''} style="--cell-ink:${c.paper==='red'?'#432b2d':'#203b3b'};--metal-delay:${delay.toFixed(1)}ms"><polygon class="cell-metal" fill="url(#metal-${n})" points="${pointString}"/><polygon class="cell-glow" fill="url(#metal-light-${n})" points="${pointString}"/><polygon class="cell-face" fill="url(#paper-${n})" points="${pointString}"/><polygon class="cell-hit" points="${pointString}"/><g class="cell-content" transform="translate(${cx} ${cy})"><text class="cell-number" text-anchor="middle" y="5">${String(n).padStart(2,'0')}</text><text class="cell-icon ${c.type==='fill'?'cell-envelope':''}" fill="url(#faith-gold-metal)" text-anchor="middle" y="${compact?89:53}">${icon}</text><text class="cell-name" text-anchor="middle">${lines(title,compact?16:21).map((line,i)=>`<tspan x="0" y="${i*(compact?30:23)+10}">${escape(line)}</tspan>`).join('')}</text>${current?pawn(compact):''}</g></g>`;
  }
  return `<svg class="ocean-map geometric-map" viewBox="0 0 ${width} ${height}" aria-label="${lang==='es'?'Padre Nuestro, 24 casillas':'Our Father, 24 spaces'}"><defs>${gradients}<linearGradient id="faith-gold-metal" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#956327"/><stop offset="18%" stop-color="#dab475"/><stop offset="33%" stop-color="#fff0bd"/><stop offset="49%" stop-color="#c38d42"/><stop offset="64%" stop-color="#f9e5a8"/><stop offset="83%" stop-color="#b38039"/><stop offset="100%" stop-color="#eacb88"/></linearGradient><linearGradient id="faith-bronze-metal" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#75402e"/><stop offset="23%" stop-color="#b97850"/><stop offset="42%" stop-color="#d6a579"/><stop offset="61%" stop-color="#8f5035"/><stop offset="82%" stop-color="#bc8058"/><stop offset="100%" stop-color="#82442f"/></linearGradient></defs>${cells}</svg>`;
}
