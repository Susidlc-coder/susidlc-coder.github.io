import { cards } from './cards.js';
// A seamless portrait composition: resurrection greens, coffee ink and a gold signature.
// Sharing is always initiated by a click; nothing is sent or posted automatically.
const MAX_GRATITUDE = 600;
const instances = new WeakMap();
let nextId = 0;
const copy = {
  es: { title:'ÉL HA RESUCITADO', final:'HAS LLEGADO', section:'Pan de Cada Día', prompt:'Da gracias a Dios con tus propias palabras:', placeholder:'Escribe aquí tu agradecimiento…', share:'Compartir', edit:'Volver a mi tarjeta', close:'Cerrar tarjeta final', restart:'Volver a empezar', preview:'Tu imagen para compartir', gratitude:'Mi agradecimiento', preparing:'Preparando tu imagen…', error:'No se pudo preparar la imagen. Vuelve a intentarlo.', cancelled:'Tu imagen sigue aquí cuando quieras compartirla.', shared:'Menú para compartir cerrado.', fallback:'Mantén pulsada la imagen para compartirla desde tu dispositivo.', copied:'Imagen copiada. Pégala en la app donde quieras compartirla.', count:'caracteres', previewNote:'Vista previa · tu agradecimiento' },
  en: { title:'HE IS RISEN', final:'YOU HAVE ARRIVED', section:'Our Daily Bread', prompt:'Thank God in your own words:', placeholder:'Write your words of gratitude here…', share:'Share', edit:'Back to my card', close:'Close final card', restart:'Begin again', preview:'Your image to share', gratitude:'My gratitude', preparing:'Preparing your image…', error:'The image could not be prepared. Please try again.', cancelled:'Your image is here whenever you want to share it.', shared:'Share menu closed.', fallback:'Touch and hold the image to share it from your device.', copied:'Image copied. Paste it into the app where you want to share it.', count:'characters', previewNote:'Preview · your words of gratitude' },
};
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const language = lang => lang === 'en' ? 'en' : 'es';
const sun = '<svg viewBox="0 0 120 80" aria-hidden="true"><path d="M14 64h92M30 62a30 30 0 0 1 60 0M60 9v12M20 25l9 9M100 25l-9 9M5 46l12 3M115 46l-12 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

export function rewardMarkup(lang = 'es', gratitude = '') {
  const c = copy[language(lang)], id = `faith-reward-${++nextId}`;
  return `<article class="faith-reward" data-reward-root><header class="faith-reward-top"><span>${c.section} <i aria-hidden="true">/</i> ${c.final}</span><button type="button" class="faith-reward-close" data-reward-close aria-label="${c.close}">×</button></header><div class="faith-reward-editor" data-reward-editor><div class="faith-reward-sun">${sun}</div><h2 id="${id}-title">${c.title}</h2><div class="faith-reward-writing"><label for="${id}-gratitude">${c.prompt}</label><textarea id="${id}-gratitude" data-reward-gratitude maxlength="${MAX_GRATITUDE}" rows="4" placeholder="${c.placeholder}" aria-describedby="${id}-count">${escape(gratitude)}</textarea><span class="faith-reward-count" id="${id}-count" data-reward-count></span></div><footer class="faith-reward-actions"><button type="button" class="faith-reward-text" data-reward-restart>${c.restart} ↗</button><button type="button" class="faith-reward-gold" data-reward-preview>${c.share}</button></footer></div><section class="faith-reward-story" data-reward-story hidden aria-label="${c.preview}"><div class="faith-reward-story-heading"><button type="button" class="faith-reward-text" data-reward-edit>← ${c.edit}</button><p>${c.previewNote}</p></div><div class="faith-reward-image" data-reward-image-wrap aria-busy="false"><img data-reward-image width="1080" height="1920" alt="" hidden></div><div class="faith-reward-share-actions"><button type="button" class="faith-reward-gold" data-reward-send disabled>${c.share}</button></div><p class="faith-reward-status" data-reward-status role="status" aria-live="polite"></p></section></article>`;
}

function setFont(ctx, size, kind = 'serif') { ctx.font = `${kind === 'italic' ? 'italic ' : ''}${size}px ${kind === 'sans' ? 'Arial' : 'Georgia'}`; }
function line(ctx, text, x, y, size, kind = 'serif', color = '#29331c', align = 'center') {
  setFont(ctx,size,kind);ctx.textAlign=align;ctx.fillStyle=color;ctx.fillText(text,x,y);
}
function wrapText(ctx, text, width) {
  const lines = [];
  for (const paragraph of String(text).replace(/\r\n?/g,'\n').split('\n')) {
    if (!paragraph.trim()) { lines.push(''); continue; }
    let current = '';
    for (const word of paragraph.trim().split(/\s+/)) {
      const candidate = current ? current+' '+word : word;
      if (ctx.measureText(candidate).width <= width) { current=candidate; continue; }
      if (current) { lines.push(current);current=''; }
      // Long words and emoji sequences must fit too; never silently truncate.
      const chunks = typeof Intl.Segmenter === 'function' ? [...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(word)].map(x=>x.segment) : Array.from(word);
      for (const chunk of chunks) { if (current && ctx.measureText(current+chunk).width>width) {lines.push(current);current='';} current+=chunk; }
    }
    if(current)lines.push(current);
  }
  return lines;
}
function paragraph(ctx,text,{x=540,y,width,height,size=60,min=22,kind='serif',color='#29331c',leading=1.3}) {
  for(let fontSize=size;fontSize>=min;fontSize--) {
    setFont(ctx,fontSize,kind);const lines=wrapText(ctx,text,width), step=fontSize*leading;
    if(lines.length*step>height || lines.some(value=>ctx.measureText(value).width>width))continue;
    const first=y+(height-lines.length*step)/2+fontSize;
    lines.forEach((value,index)=>line(ctx,value,x,first+index*step,fontSize,kind,color));
    return;
  }
  throw new Error('Gratitude text exceeds its reserved area');
}
function brand(ctx,y) {
  const parts=[['susi','64px Arial'],['dlc','italic 76px Georgia'],['.com','64px Arial']];
  let total=0;for(const [text,font] of parts){ctx.font=font;total+=ctx.measureText(text).width;}
  let x=(1080-total)/2;ctx.textAlign='left';
  const gold=ctx.createLinearGradient(x,y-64,x+total,y);
  [[0,'#f4e6c8'],[.37,'#e8c784'],[.53,'#fff5d5'],[.76,'#cf9d48'],[1,'#edd1a0']].forEach(([stop,color])=>gold.addColorStop(stop,color));
  for(const [text,font] of parts){ctx.font=font;ctx.fillStyle=gold;ctx.fillText(text,x,y);x+=ctx.measureText(text).width;}
}

/** Produces a real, self-contained PNG; no external images can taint its canvas. */
export async function renderRewardStory({ lang = 'es', gratitude = '', value } = {}) {
  lang=language(lang);const c=copy[lang],text=String(value ?? gratitude).trim();
  if(!text)throw new Error('Gratitude is empty');
  if(text.length>MAX_GRATITUDE)throw new Error('Gratitude exceeds the card limit');
  await(document.fonts?.ready || Promise.resolve());
  const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1920;
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');
  // One continuous field, with no panels behind the title or personal words.
  const bg=ctx.createLinearGradient(120,0,850,1920);
  [[0,'#e6f29f'],[.23,'#d8ef55'],[.52,'#dce7ad'],[.68,'#aab880'],[.84,'#655e40'],[1,'#33251e']].forEach(([stop,color])=>bg.addColorStop(stop,color));
  ctx.fillStyle=bg;ctx.fillRect(0,0,1080,1920);
  line(ctx,c.section,540,180,30,'italic','#54422d');
  // A quiet sunrise, drawn directly on the same surface as the typography.
  ctx.strokeStyle='#655735';ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();
  ctx.moveTo(482,332);ctx.lineTo(598,332);ctx.moveTo(506,332);ctx.arc(540,332,34,Math.PI,0);
  ctx.moveTo(540,268);ctx.lineTo(540,280);ctx.moveTo(492,286);ctx.lineTo(501,296);ctx.moveTo(588,286);ctx.lineTo(579,296);ctx.stroke();
  paragraph(ctx,c.title,{y:391,width:890,height:250,size:102,min:78,color:'#392e23',leading:1.04});
  line(ctx,c.gratitude,540,776,32,'italic','#544632');
  paragraph(ctx,text,{y:828,width:780,height:505,size:62,min:22,color:'#342c22',leading:1.3});
  // The original card colors remain a small signature of the game.
  const colors=cards.filter(card=>card.number>=1&&card.number<=24).sort((a,b)=>a.number-b.number).map(card=>card.color);
  colors.forEach((color,i)=>{const col=i%12,row=Math.floor(i/12),x=266+col*46,y=1485+row*37;ctx.fillStyle=color;ctx.fillRect(x,y,41,31);});
  brand(ctx,1740);
  const blob=await new Promise((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error('PNG export failed')),'image/png'));
  return {blob,width:1080,height:1920,alt:`${c.title} · ${c.gratitude}: ${text} · susidlc.com`,gratitude:text};
}

/** Owns only this dialog. Call destroy before reusing it for unrelated content. */
export function mountReward(dialog,{lang='es',value='',onChange=()=>{},onRestart=()=>{},onClose=()=>{}}={}) {
  if(!dialog || typeof dialog.showModal!=='function')throw new TypeError('A dialog element is required');
  instances.get(dialog)?.destroy();lang=language(lang);const c=copy[lang];
  dialog.classList.add('faith-reward-dialog');dialog.innerHTML=rewardMarkup(lang,String(value).slice(0,MAX_GRATITUDE));
  dialog.setAttribute('aria-labelledby',dialog.querySelector('h2').id);
  const controller=new AbortController(),options={signal:controller.signal};
  const q=key=>dialog.querySelector(`[data-reward-${key}]`),input=q('gratitude'),editor=q('editor'),story=q('story'),image=q('image'),status=q('status'),send=q('send');
  let file=null,blobURL=null,renderToken=0,disposed=false,hasNativeShare=false;
  const listen=(element,event,handler)=>element.addEventListener(event,handler,options);
  const update=()=>{q('count').textContent=`${input.value.length} / ${MAX_GRATITUDE} ${c.count}`;q('preview').disabled=!input.value.trim();};
  const cleanImage=()=>{if(blobURL)URL.revokeObjectURL(blobURL);blobURL=null;file=null;};
  const close=()=>{if(dialog.open)dialog.close();};
  listen(input,'input',()=>{update();onChange(input.value);});
  listen(q('close'),'click',close);
  listen(q('restart'),'click',()=>{close();onRestart();});
  listen(dialog,'close',()=>{++renderToken;onClose();});
  listen(q('edit'),'click',()=>{++renderToken;story.hidden=true;editor.hidden=false;q('preview').focus({preventScroll:true});});
  listen(q('preview'),'click',async()=>{
    if(!input.value.trim())return;
    editor.hidden=true;story.hidden=false;image.hidden=true;send.disabled=true;status.textContent=c.preparing;q('image-wrap').setAttribute('aria-busy','true');
    const token=++renderToken;cleanImage();q('edit').focus({preventScroll:true});
    try {
      const result=await renderRewardStory({lang,gratitude:input.value});if(disposed || token!==renderToken)return;
      file=new File([result.blob],`susidlc-gratitude-${lang}.png`,{type:'image/png'});blobURL=URL.createObjectURL(result.blob);image.src=blobURL;image.alt=result.alt;image.hidden=false;
      hasNativeShare=false;try{hasNativeShare=typeof navigator.share==='function'&&typeof navigator.canShare==='function'&&navigator.canShare({files:[file]});}catch{}
      send.textContent=c.share;send.disabled=false;status.textContent='';
    } catch {if(token===renderToken)status.textContent=c.error;}
    finally {if(token===renderToken)q('image-wrap').setAttribute('aria-busy','false');}
  });
  listen(send,'click',async()=>{
    if(!file)return;
    send.disabled=true;
    try {if(hasNativeShare){await navigator.share({files:[file],title:c.title});status.textContent=c.shared;}else if(navigator.clipboard?.write&&typeof ClipboardItem==='function'){await navigator.clipboard.write([new ClipboardItem({'image/png':file})]);status.textContent=c.copied;}else{status.textContent=c.fallback;}}
    catch(error){status.textContent=error.name==='AbortError'?c.cancelled:c.fallback;}
    finally {if(!disposed)send.disabled=false;}
  });
  const api={
    destroy(){disposed=true;++renderToken;controller.abort();cleanImage();dialog.classList.remove('faith-reward-dialog');instances.delete(dialog);},
    setValue(next){++renderToken;cleanImage();story.hidden=true;editor.hidden=false;input.value=String(next).slice(0,MAX_GRATITUDE);update();onChange(input.value);},
  };
  instances.set(dialog,api);update();if(!dialog.open)dialog.showModal();return api;
}
