/* The home and gateway use their existing golden surfaces and shared wave timing.
 * Only opacity animates in CSS. Geometry, gradients, links and text stay intact. */
import {COLOR_WAVE} from './poem-color-motion.js';

export function createFibonacciBreeze(svg){
 const doc=svg.ownerDocument,view=doc.defaultView;
 const cells=Array.from(svg.querySelectorAll('.home-fibonacci-cell,.gold-cell'));
 const surfaces=cells.map(cell=>cell.querySelector('.home-fibonacci-active,.gold-active'));
 const media=view.matchMedia?.('(prefers-reduced-motion: reduce)');
 let reduced=Boolean(media?.matches),enabled=true,destroyed=false;
 const original={mode:svg.getAttribute('data-fibonacci-breeze'),running:svg.getAttribute('data-fibonacci-running')};
 const saved=surfaces.map(surface=>surface?surface.style.getPropertyValue('--fibonacci-breeze-delay'):null);
 const period=svg.style.getPropertyValue('--susi-color-wave-period'),easing=svg.style.getPropertyValue('--susi-color-wave-easing');
 function inView(){const b=svg.getBoundingClientRect();return b.width>0&&b.height>0&&b.bottom>0&&b.right>0&&b.top<view.innerHeight&&b.left<view.innerWidth;}
 let visible=inView();
 function sync(){
  if(destroyed)return;
  svg.setAttribute('data-fibonacci-breeze',reduced?'static':'ambient');
  svg.setAttribute('data-fibonacci-running',String(!reduced&&enabled&&visible&&!doc.hidden&&doc.visibilityState!=='hidden'&&!doc.querySelector('dialog[open]')));
 }
 function phase(){
  // Screen-space centers also respect the gateway's existing rotation.
  const points=cells.map(cell=>{const b=cell.getBoundingClientRect();return{x:b.left+b.width/2,y:b.top+b.height/2};});
  const xs=points.map(p=>p.x),ys=points.map(p=>p.y),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
  points.forEach((p,i)=>{if(!surfaces[i])return;const x=maxX>minX?(p.x-minX)/(maxX-minX):.5,y=maxY>minY?(p.y-minY)/(maxY-minY):.5;surfaces[i].style.setProperty('--fibonacci-breeze-delay',(-(x*COLOR_WAVE.xWeight+y*COLOR_WAVE.yWeight)*COLOR_WAVE.durationMs).toFixed(1)+'ms');});
 }
 function refresh(){if(destroyed)return;phase();visible=inView();sync();}
 function motionChanged(){reduced=Boolean(media.matches);sync();}
 const observer=typeof view.IntersectionObserver==='function'?new view.IntersectionObserver(entries=>{const entry=entries.find(item=>item.target===svg);if(entry){visible=entry.isIntersecting&&entry.intersectionRatio>0;sync();}},{threshold:0}):null;
 const dialogs=typeof view.MutationObserver==='function'?new view.MutationObserver(sync):null;
 const resize=typeof view.ResizeObserver==='function'?new view.ResizeObserver(refresh):null;
 observer?.observe(svg);dialogs?.observe(doc.body,{subtree:true,attributes:true,attributeFilter:['open']});resize?.observe(svg);
 if(!observer)view.addEventListener('scroll',refresh,{passive:true});
 if(!resize)view.addEventListener('resize',refresh);
 doc.addEventListener('visibilitychange',sync);doc.addEventListener('close',sync,true);
 if(media?.addEventListener)media.addEventListener('change',motionChanged);else media?.addListener?.(motionChanged);
 surfaces.forEach(surface=>surface?.classList.add('fibonacci-breeze-surface'));
 svg.style.setProperty('--susi-color-wave-period',COLOR_WAVE.durationMs+'ms');svg.style.setProperty('--susi-color-wave-easing',COLOR_WAVE.easing);
 refresh();
 function restore(node,name,value){if(value===null)node.removeAttribute(name);else node.setAttribute(name,value);}
 function destroy(){
  if(destroyed)return;destroyed=true;observer?.disconnect();dialogs?.disconnect();resize?.disconnect();
  view.removeEventListener('scroll',refresh);view.removeEventListener('resize',refresh);doc.removeEventListener('visibilitychange',sync);doc.removeEventListener('close',sync,true);
  if(media?.removeEventListener)media.removeEventListener('change',motionChanged);else media?.removeListener?.(motionChanged);
  surfaces.forEach((surface,i)=>{if(!surface)return;surface.classList.remove('fibonacci-breeze-surface');if(saved[i])surface.style.setProperty('--fibonacci-breeze-delay',saved[i]);else surface.style.removeProperty('--fibonacci-breeze-delay');});
  for(const [key,value]of [['--susi-color-wave-period',period],['--susi-color-wave-easing',easing]]){if(value)svg.style.setProperty(key,value);else svg.style.removeProperty(key);}
  restore(svg,'data-fibonacci-breeze',original.mode);restore(svg,'data-fibonacci-running',original.running);
 }
 return{refresh,destroy,setEnabled(value){enabled=Boolean(value);sync();},getState:()=>({cells:cells.length,reducedMotion:reduced,visible,running:svg.getAttribute('data-fibonacci-running')==='true',destroyed})};
}

if(typeof document!=='undefined'){
 const figures=document.querySelectorAll('.home-fibonacci,.gold-fibonacci');
 if(figures.length){
  const sheet=document.createElement('link');sheet.rel='stylesheet';sheet.href=new URL('./fibonacci-breeze.css',import.meta.url).href;document.head.append(sheet);
  figures.forEach(svg=>createFibonacciBreeze(svg));
 }
}
