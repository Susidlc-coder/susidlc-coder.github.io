/* Share the locally rendered 1080 × 1920 Story for the current result. */
import {renderResultStory} from './result-story-card.js?v=20261013-story-adapted-meanings-1';

const states=new WeakMap();
const copy={
 es:{toggle:'Compartir',share:'Compartir imagen',label:'Elige qué destacar',focus:'Recomendación principal en tu Story',song:'Canción',verse:'Cita bíblica',reading:'Lectura',close:'Cerrar vista previa',preparing:'Preparando tu Story…',unsupported:'Este dispositivo no permite compartir la imagen directamente. Puedes abrir esta vista desde tu teléfono.',failure:'No se pudo abrir el menú para compartir. Inténtalo de nuevo.',cancel:'Puedes compartirla cuando quieras.',shared:'Menú para compartir cerrado.',imageError:'No se pudo preparar la imagen. Vuelve a abrir el resultado.'},
 en:{toggle:'Share',share:'Share image',label:'Choose what to highlight',focus:'Featured recommendation in your Story',song:'Song',verse:'Bible verse',reading:'Reading',close:'Close preview',preparing:'Preparing your Story…',unsupported:'This device cannot share the image directly. You can open this view on your phone.',failure:'The share menu could not open. Please try again.',cancel:'You can share it whenever you like.',shared:'Share menu closed.',imageError:'The image could not be prepared. Reopen the result.'}
};
function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text)node.textContent=text;return node;}
function renderStory(state){
 const token=++state.token,focus=state.focus,data=state.data,labels=state.labels;
 state.file=null;state.share.disabled=true;state.status.textContent=labels.preparing;state.preview.setAttribute('aria-busy','true');
 for(const [kind,button] of Object.entries(state.focusButtons))button.setAttribute('aria-pressed',String(kind===focus));
 if(!state.cache.has(focus))state.cache.set(focus,renderResultStory({...data,focus}));
 const pending=state.cache.get(focus);
 pending.then(({blob,width,height,alt})=>{
  if(state.token!==token)return;
  const nextURL=URL.createObjectURL(blob),previousURL=state.blobURL;
  state.file=new File([blob],'susidlc-story-'+data.lang+'-'+focus+'.png',{type:'image/png'});state.blobURL=nextURL;
  state.image.width=width;state.image.height=height;state.image.src=nextURL;state.image.alt=alt;
  state.preview.hidden=false;state.preview.setAttribute('aria-busy','false');state.share.disabled=false;state.status.textContent='';
  if(previousURL)URL.revokeObjectURL(previousURL);
 }).catch(()=>{
  if(state.token!==token)return;
  state.cache.delete(focus);state.preview.setAttribute('aria-busy','false');state.preview.hidden=true;state.status.textContent=labels.imageError;
 });
}
function install(dialog){
 const group=el('div','sp-share');
 const toggle=el('button','sp-share-toggle');toggle.type='button';
 const icon=el('span','sp-share-icon');icon.setAttribute('aria-hidden','true');icon.innerHTML='<svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12V2m-3 3 3-3 3 3M5 8H3v9h14V8h-2"/></svg>';
 const toggleLabel=el('span');toggle.append(icon,toggleLabel);
 const overlay=el('dialog','sp-story-preview-dialog');overlay.setAttribute('aria-label',copy.es.label);
 const shell=el('div','sp-story-preview-shell');const header=el('header','sp-story-preview-header');
 const heading=el('p','sp-story-preview-heading');const close=el('button','sp-story-preview-close','×');close.type='button';header.append(heading,close);
 const focusGroup=el('div','sp-story-focus');focusGroup.setAttribute('role','group');const focusButtons={};
 for(const kind of ['song','verse','reading']){const button=el('button','sp-story-focus-option');button.type='button';button.dataset.storyFocus=kind;button.setAttribute('aria-pressed',String(kind==='song'));focusButtons[kind]=button;focusGroup.append(button);}
 const preview=el('div','sp-share-preview');preview.hidden=true;
 const image=el('img');image.width=1080;image.height=1920;preview.append(image);
 const actions=el('div','sp-share-actions');const share=el('button','sp-share-action sp-share-primary');share.type='button';share.dataset.shareResult='';actions.append(share);
 const status=el('p','sp-share-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');
 group.append(toggle);shell.append(header,focusGroup,preview,actions,status);overlay.append(shell);document.body.append(overlay);
 const footer=dialog.querySelector('.sp-result-footer'),logo=dialog.querySelector('.sp-result-logo');if(footer)footer.append(group);else if(logo)logo.before(group);else dialog.querySelector('.sp-dialog-inner').append(group);
 const state={group,toggle,toggleLabel,overlay,heading,close,focusGroup,focusButtons,focus:'song',cache:new Map(),preview,image,share,status,token:0};states.set(dialog,state);
 toggle.addEventListener('click',()=>{overlay.showModal();if(!state.file)renderStory(state);});
 for(const [kind,button] of Object.entries(focusButtons))button.addEventListener('click',()=>{if(state.focus===kind&&state.file)return;state.focus=kind;renderStory(state);});
 close.addEventListener('click',()=>overlay.close());
 overlay.addEventListener('close',()=>toggle.focus({preventScroll:true}));
 share.addEventListener('click',async()=>{
  if(!state.file)return;
  const labels=state.labels,file=state.file;
  let supported=false;try{supported=typeof navigator.share==='function'&&typeof navigator.canShare==='function'&&navigator.canShare({files:[file]});}catch{}
  if(!supported){status.textContent=labels.unsupported;return;}
  share.disabled=true;for(const button of Object.values(focusButtons))button.disabled=true;
  try{await navigator.share({files:[file],url:'https://susidlc.com/quiz'});status.textContent=labels.shared;}
  catch(error){status.textContent=error.name==='AbortError'?labels.cancel:labels.failure;}
  finally{share.disabled=!state.file;for(const button of Object.values(focusButtons))button.disabled=false;}
 });
 return state;
}
export function prepareResultSharing(dialog,data){
 const state=states.get(dialog)||install(dialog),labels=copy[data.lang]||copy.es;
 ++state.token;if(state.blobURL)URL.revokeObjectURL(state.blobURL);
 state.labels=labels;state.data=data;state.cache=new Map();state.file=null;state.blobURL=null;if(state.overlay.open)state.overlay.close();state.group.setAttribute('aria-label',labels.label);state.toggleLabel.textContent=labels.toggle;
 state.overlay.setAttribute('aria-label',labels.label);state.heading.textContent=labels.label;state.close.setAttribute('aria-label',labels.close);
 state.focusGroup.setAttribute('aria-label',labels.focus);for(const [kind,button] of Object.entries(state.focusButtons))button.textContent=labels[kind];
 state.share.textContent=labels.share;state.preview.hidden=true;state.image.removeAttribute('src');renderStory(state);
}
