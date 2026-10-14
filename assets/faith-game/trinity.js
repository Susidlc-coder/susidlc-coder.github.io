// One shared light responds to three areas of the handmade triangle.
export function trinityMarkup(lang = 'es') {
  const en=lang==='en', labels=en?['Father','Son','Holy Spirit']:['Padre','Hijo','Espíritu Santo'];
  const zones=[
    {name:'father',shape:'M250 67 155 176 250 203 345 176Z',edge:'M155 176 250 67 345 176',x:250,y:104,labelX:250,labelY:20,hit:'205 0 90 65'},
    {name:'son',shape:'M155 176 70 276 250 276 250 203Z',edge:'M155 176 70 276 250 276',x:148,y:245,labelX:77,labelY:319,hit:'20 278 130 50'},
    {name:'spirit',shape:'M345 176 430 276 250 276 250 203Z',edge:'M345 176 430 276 250 276',x:352,y:245,labelX:413,labelY:319,hit:'338 278 160 50'},
  ];
  return `<figure class="trinity-light" data-trinity aria-label="${en?'Three persons, one shared light':'Tres personas, una misma luz'}">
    <svg class="trinity-scene" viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="${en?'Light up the triangle':'Ilumina el triángulo'}">
      <defs>
        <radialGradient id="trinity-shared"><stop stop-color="#fffdf0"/><stop offset=".22" stop-color="#fff5b5" stop-opacity=".95"/><stop offset="1" stop-color="#ffef9b" stop-opacity="0"/></radialGradient>
        <radialGradient id="trinity-torch"><stop stop-color="#fffdf3"/><stop offset=".25" stop-color="#fff2b8" stop-opacity=".8"/><stop offset="1" stop-color="#fff2b8" stop-opacity="0"/></radialGradient>
        <clipPath id="trinity-window"><path d="M250 67 70 276 430 276Z"/></clipPath>
      </defs>
      <path d="M250 67 70 276 430 276Z" fill="#62452f" fill-opacity=".16" stroke="#765431" stroke-width="3" stroke-linejoin="round"/>
      <g clip-path="url(#trinity-window)" class="trinity-radiance" aria-hidden="true">
        <circle class="trinity-center-glow" cx="250" cy="203" r="155" fill="url(#trinity-shared)"/>
        <path class="trinity-beam" d="M205 67 295 67 280 203 220 203Z" fill="#fff7cb"/>
        <circle class="trinity-torch" cx="250" cy="104" r="80" fill="url(#trinity-torch)"/>
      </g>
      <path class="trinity-lit-outline" d="M250 67 70 276 430 276Z" fill="none" stroke="#fff7c9" stroke-width="4" stroke-linejoin="round" aria-hidden="true"/>
      ${zones.map((z,i)=>{const [x,y,w,h]=z.hit.split(' ');return `<g class="trinity-zone" data-light="${z.name}" data-x="${z.x}" data-y="${z.y}" role="button" tabindex="0" aria-label="${en?'Illuminate':'Iluminar'}: ${labels[i]}" aria-pressed="false">
        <path class="trinity-hit" d="${z.shape}" fill="transparent"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="transparent"/>
        <path class="trinity-edge" d="${z.edge}" fill="none" stroke="#fffdf0" stroke-width="7" stroke-linejoin="round"/>
        <text x="${z.labelX}" y="${z.labelY}" text-anchor="middle">${labels[i]}</text>
      </g>`;}).join('')}
      <g class="trinity-symbols" aria-hidden="true" fill="none" stroke-linecap="round">
        <path d="M228 64a22 22 0 0 1 44 0M250 18v8M216 31l6 7M284 31l-6 7" stroke="#bd7b26" stroke-width="3" transform="translate(0 8)"/>
        <path d="M46 224v48M30 242h32" stroke="#99657c" stroke-width="7"/>
        <path d="M443 243q-15-28 4-19l15 9q8-27 14-10l-3 12q26-9 12 6l-18 10q12 21-4 11l-10-12-18 7 7-12-11 0Z" fill="#f2f0ff" stroke="#9998b0" stroke-width="2"/>
        <circle class="trinity-source" cx="250" cy="203" r="8" fill="#fffdf0"/>
      </g>
    </svg>
    <figcaption><strong>${en?'One shared light':'Una misma luz'}</strong></figcaption>
  </figure>`;
}

export function bindTrinity(container) {
  const root=container.querySelector('[data-trinity]');if(!root)return;
  const svg=root.querySelector('svg'),torch=root.querySelector('.trinity-torch'),beam=root.querySelector('.trinity-beam');
  const zones=[...root.querySelectorAll('[data-light]')];let chosen=null;
  const illuminate=(zone,x=Number(zone?.dataset.x),y=Number(zone?.dataset.y))=>{
    root.classList.toggle('is-lit',!!zone);
    zones.forEach(item=>{item.classList.toggle('is-lit',item===zone);item.setAttribute('aria-pressed',String(item===chosen));});
    if(!zone)return;
    torch.setAttribute('cx',x);torch.setAttribute('cy',y);
    beam.setAttribute('d',`M${x-28} ${y-12} L${x+28} ${y+12} L270 218 L230 188Z`);
  };
  zones.forEach(zone=>{
    zone.addEventListener('pointerenter',()=>illuminate(zone));
    zone.addEventListener('pointermove',event=>{
      if(event.pointerType==='touch')return;
      const matrix=svg.getScreenCTM();if(!matrix)return;
      const point=new DOMPoint(event.clientX,event.clientY).matrixTransform(matrix.inverse());
      illuminate(zone,point.x,point.y);
    });
    zone.addEventListener('focus',()=>illuminate(zone));
    zone.addEventListener('click',()=>{chosen=zone;illuminate(zone);});
    zone.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();chosen=zone;illuminate(zone);}});
  });
  root.addEventListener('pointerleave',()=>illuminate(chosen));
  root.addEventListener('focusout',event=>{if(!root.contains(event.relatedTarget))illuminate(chosen);});
}

export const trinityStyles=`
#card-dialog .trinity-light { pointer-events:auto; width:min(100%,540px); margin:0 auto; }
.trinity-scene { display:block; width:100%; overflow:visible; }
.trinity-zone { cursor:pointer; outline:none; }
.trinity-zone text { fill:#59422f; font:20px Georgia,serif; }
.trinity-zone:focus-visible text { text-decoration:underline; text-underline-offset:5px; }
.trinity-edge,.trinity-lit-outline,.trinity-torch { opacity:0; transition:opacity .35s ease; pointer-events:none; }
.trinity-center-glow { opacity:.22; transition:opacity .5s ease; }
.trinity-beam { opacity:0; transition:opacity .35s ease; }
.trinity-light.is-lit .trinity-center-glow { opacity:1; }
.trinity-light.is-lit .trinity-lit-outline { opacity:.55; }
.trinity-light.is-lit .trinity-torch { opacity:.95; }
.trinity-light.is-lit .trinity-beam { opacity:.3; }
.trinity-zone.is-lit .trinity-edge { opacity:1; filter:drop-shadow(0 0 7px #fff8ce); }
.trinity-zone.is-lit text { fill:#3d2b1f; font-weight:bold; }
.trinity-symbols { pointer-events:none; }
.trinity-light figcaption { display:flex; flex-direction:column; align-items:center; gap:9px; color:#674b30; font:12px/1.4 Arial,sans-serif; text-align:center; margin-top:6px; }
.trinity-light figcaption strong { font:italic 24px/1.2 Georgia,serif; color:#493726; }
@media(max-width:640px) { #card-dialog .trinity-light { max-width:360px; } .trinity-light figcaption { margin:0 0 8px; } }
@media(prefers-reduced-motion:reduce) { .trinity-light * { transition:none!important; } }
`;
