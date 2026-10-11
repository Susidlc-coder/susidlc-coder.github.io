/* Colour only. CSS carries a 5.5-second spatial wave; JavaScript never ticks it.
 * Call refresh() after replacing SVG cells. Pausing changes play-state only, so
 * resuming preserves phase. No randomness, geometry edits or poem navigation.
 */
// Shared timing/direction for poem surfaces and the two Fibonacci gateways.
export const COLOR_WAVE=Object.freeze({durationMs:5500,xWeight:.68,yWeight:.32,easing:'cubic-bezier(.45,0,.55,1)'});
const labels={
 es:{pause:'Pausar color',resume:'Reanudar color',staticOn:'Activar color estático',staticOff:'Desactivar color estático'},
 en:{pause:'Pause colour',resume:'Resume colour',staticOn:'Enable static colour',staticOff:'Disable static colour'}
};
const lightInk={fill:'#f8f4ec',stroke:'#33241e66'},darkInk={fill:'#241b18',stroke:'#f2eee566'};
const rgb=hex=>/^#[\da-f]{6}$/i.test(hex||'')?hex.slice(1).match(/../g).map(v=>parseInt(v,16)):null;
const luminance=channels=>channels.reduce((sum,v,i)=>{const c=v/255;return sum+(c<=.04045?c/12.92:((c+.055)/1.055)**2.4)*[.2126,.7152,.0722][i];},0);
const inkLuminances=[luminance(rgb(lightInk.fill)),luminance(rgb(darkInk.fill))];

/* One fixed ink for the lifetime of a cell, including hover and pause. Select
 * the better minimum contrast over 33 samples of its existing background blend.
 * These are label-position samples, not a full-gradient accessibility audit.
 */
export function fixedColorInk(base,reveal){
 const a=rgb(base),b=rgb(reveal);if(!a||!b)return null;
 const minimum=[Infinity,Infinity];
 for(let i=0;i<=32;i++){
  const background=luminance(a.map((v,j)=>v+(b[j]-v)*i/32));
  inkLuminances.forEach((ink,j)=>{const contrast=(Math.max(ink,background)+.05)/(Math.min(ink,background)+.05);minimum[j]=Math.min(minimum[j],contrast);});
 }
 return {...(minimum[1]>=minimum[0]?darkInk:lightInk)};
}

export function createColorMotion({root,stage,getCells,button,lang='es'}){
 if(!root||!stage||!button||typeof getCells!=='function')throw new TypeError('Color motion requires root, stage, getCells and button.');
 const doc=root.ownerDocument,view=doc.defaultView,t=labels[lang]||labels.es;
 const media=view.matchMedia?.('(prefers-reduced-motion: reduce)');
 const original={text:button.textContent,pressed:button.getAttribute('aria-pressed'),label:button.getAttribute('aria-label'),disabled:button.disabled,mode:root.getAttribute('data-color-motion-mode'),running:root.getAttribute('data-color-motion-running'),stage:stage.getAttribute('data-color-wave-stage')};
 let reduced=Boolean(media?.matches),enabled=true,staticEnabled=false,destroyed=false,running=false;
 let cells=[],lit=new Set();const configured=new Map();
 const properties=['--sp-color-delay','--sp-fixed-ink','--sp-fixed-stroke'];
 function viewportVisible(){const r=stage.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>0&&r.right>0&&r.top<view.innerHeight&&r.left<view.innerWidth;}
 let visible=viewportVisible();
 function blocked(){return doc.hidden||doc.visibilityState==='hidden'||Boolean(doc.querySelector('dialog[open]'));}
 function canRun(){return !destroyed&&!reduced&&enabled&&visible&&cells.length>0&&!blocked();}
 function paint(next){
  for(const cell of lit)if(!next.has(cell))cell.classList.remove('sp-ambient');
  for(const cell of next)if(!lit.has(cell))cell.classList.add('sp-ambient');
  lit=next;
 }
 function paintStatic(){paint(staticEnabled?new Set(cells.filter((_,i)=>i%4===0)):new Set());}
 function clearPhases(){
  for(const [cell,previous]of configured){
   for(const [name,saved]of previous){if(saved.value)cell.style.setProperty(name,saved.value,saved.priority);else cell.style.removeProperty(name);}
  }
  configured.clear();
 }
 function preparePhases(){
  const points=cells.map(cell=>{
   try{const b=JSON.parse(cell.getAttribute('data-label-box'));if(b&&[b.x,b.y,b.w,b.h].every(Number.isFinite)&&b.w>0&&b.h>0)return {x:b.x+b.w/2,y:b.y+b.h/2};}catch{}
   return null;
  });
  const valid=points.filter(Boolean),xs=valid.map(p=>p.x),ys=valid.map(p=>p.y);
  const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
  cells.forEach((cell,i)=>{
   const p=points[i],x=p?(maxX>minX?(p.x-minX)/(maxX-minX):.5):0,y=p?(maxY>minY?(p.y-minY)/(maxY-minY):.5):0;
   const phase=p?x*COLOR_WAVE.xWeight+y*COLOR_WAVE.yWeight:i/Math.max(1,cells.length-1);
   configured.set(cell,new Map(properties.map(name=>[name,{value:cell.style.getPropertyValue(name),priority:cell.style.getPropertyPriority(name)}])));
   cell.style.setProperty('--sp-color-delay',(-phase*COLOR_WAVE.durationMs).toFixed(1)+'ms');
   const ink=fixedColorInk(cell.getAttribute('data-color-base'),cell.getAttribute('data-color-reveal'));
   if(ink){cell.style.setProperty('--sp-fixed-ink',ink.fill);cell.style.setProperty('--sp-fixed-stroke',ink.stroke);}
  });
 }
 function updateButton(){
  const on=reduced?staticEnabled:enabled;
  button.textContent=reduced?(on?t.staticOff:t.staticOn):(on?t.pause:t.resume);
  button.setAttribute('aria-label',button.textContent);button.setAttribute('aria-pressed',String(on));button.disabled=false;
  root.setAttribute('data-color-motion-mode',reduced?'static':'ambient');
 }
 function sync(){
  if(destroyed)return;
  running=canRun();const value=String(running);
  if(root.getAttribute('data-color-motion-running')!==value)root.setAttribute('data-color-motion-running',value);
 }
 function refresh(){
  if(destroyed)return;
  const next=Array.from(getCells()).filter(cell=>cell?.classList&&cell?.style);
  if(next.length!==cells.length||next.some((cell,i)=>cell!==cells[i])){
   paint(new Set());clearPhases();cells=next;preparePhases();if(reduced)paintStatic();
  }
  visible=viewportVisible();updateButton();sync();
 }
 function setEnabled(value){
  if(destroyed)return;
  if(reduced){staticEnabled=Boolean(value);paintStatic();}else enabled=Boolean(value);
  updateButton();sync();
 }
 function toggle(){setEnabled(!(reduced?staticEnabled:enabled));}
 function preferenceChanged(){
  if(destroyed)return;
  reduced=Boolean(media.matches);staticEnabled=false;paint(new Set());updateButton();sync();
 }
 function fallbackViewport(){visible=viewportVisible();sync();}
 const intersection=typeof view.IntersectionObserver==='function'?new view.IntersectionObserver(entries=>{
  if(destroyed)return;const entry=entries.find(item=>item.target===stage);
  if(entry){visible=entry.isIntersecting&&entry.intersectionRatio>0;sync();}
 },{threshold:0}):null;
 // Only dialog open/close attributes are observed; rendering cells creates no records.
 const dialogs=typeof view.MutationObserver==='function'?new view.MutationObserver(sync):null;
 intersection?.observe(stage);
 dialogs?.observe(doc.body||root,{subtree:true,attributes:true,attributeFilter:['open']});
 if(!intersection){view.addEventListener('scroll',fallbackViewport,{passive:true});view.addEventListener('resize',fallbackViewport);}
 doc.addEventListener('visibilitychange',sync);doc.addEventListener('close',sync,true);
 button.addEventListener('click',toggle);
 if(media?.addEventListener)media.addEventListener('change',preferenceChanged);else media?.addListener?.(preferenceChanged);
 function restoreAttribute(node,name,value){if(value===null)node.removeAttribute(name);else node.setAttribute(name,value);}
 function destroy(){
  if(destroyed)return;destroyed=true;running=false;paint(new Set());clearPhases();cells=[];
  intersection?.disconnect();dialogs?.disconnect();
  view.removeEventListener('scroll',fallbackViewport);view.removeEventListener('resize',fallbackViewport);
  doc.removeEventListener('visibilitychange',sync);doc.removeEventListener('close',sync,true);button.removeEventListener('click',toggle);
  if(media?.removeEventListener)media.removeEventListener('change',preferenceChanged);else media?.removeListener?.(preferenceChanged);
  button.textContent=original.text;button.disabled=original.disabled;
  restoreAttribute(button,'aria-pressed',original.pressed);restoreAttribute(button,'aria-label',original.label);
  restoreAttribute(root,'data-color-motion-mode',original.mode);restoreAttribute(root,'data-color-motion-running',original.running);restoreAttribute(stage,'data-color-wave-stage',original.stage);
 }
 stage.setAttribute('data-color-wave-stage','');refresh();
 return {refresh,destroy,setEnabled,getState:()=>({enabled:reduced?staticEnabled:enabled,running,reducedMotion:reduced,visible,destroyed,cells:cells.length})};
}
