/* Render the visitor's result locally. No uploads, dependencies or background requests. */
const states=new WeakMap();
const copy={
 es:{share:'Compartir resultado',download:'Descargar imagen',link:'Copiar enlace',label:'Comparte tu recorrido',preparing:'Preparando tu tarjeta…',unsupported:'Este navegador no permite compartir imágenes directamente. Descarga tu tarjeta para compartirla.',failure:'No se pudo abrir el menú de compartir. Puedes descargar la imagen.',cancel:'Puedes compartir o descargar la tarjeta cuando quieras.',shared:'Menú de compartir cerrado.',copied:'Enlace al test copiado.',manual:'Selecciona y copia este enlace al test:',imageError:'No se pudo preparar la imagen. Vuelve a abrir el resultado para intentarlo de nuevo.',saved:'Descarga iniciada.',kicker:'POEMAS · SIETE PALABRAS, UNA CANCIÓN',song:'MI CANCIÓN',words:'MI RECORRIDO · SIETE PALABRAS',album:'ÁLBUM',file:'resultado',shareText:'Mi canción es'},
 en:{share:'Share result',download:'Download image',link:'Copy link',label:'Share your journey',preparing:'Preparing your card…',unsupported:'This browser cannot share images directly. Download your card to share it.',failure:'The share menu could not open. You can download the image instead.',cancel:'You can share or download the card whenever you like.',shared:'Share menu closed.',copied:'Test link copied.',manual:'Select and copy this link to the test:',imageError:'The image could not be prepared. Reopen the result to try again.',saved:'Download started.',kicker:'POEMS · SEVEN WORDS, ONE SONG',song:'MY SONG',words:'MY JOURNEY · SEVEN WORDS',album:'ALBUM',file:'result',shareText:'My song is'}
};
const serif='"Iowan Old Style", "Palatino Linotype", Georgia, serif';
const sans='"Helvetica Neue", Arial, sans-serif';
copy.es.preview='Ver tarjeta para compartir';copy.en.preview='Preview share card';
copy.es.toggle='Compartir';copy.en.toggle='Share';
copy.es.localCopied='Enlace a esta vista previa local copiado.';copy.en.localCopied='Link to this local preview copied.';
copy.es.connection='TU RESULTADO';copy.en.connection='YOUR RESULT';
copy.es.reading='LECTURA RECOMENDADA';copy.en.reading='RECOMMENDED READING';
copy.es.verse='CITA BÍBLICA RECOMENDADA';copy.en.verse='RECOMMENDED BIBLE VERSE';
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;}
function wrap(ctx,text,maxWidth){const lines=[];let line='';for(const word of text.split(/\s+/)){const next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>maxWidth){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);return lines;}
function fitText(ctx,text,width,height,start,min,italic=true){let size=start,lines;for(;size>=min;size-=2){ctx.font=(italic?'italic ':'')+size+'px '+serif;lines=wrap(ctx,text,width);if(lines.length*size*1.24<=height)break;}return {size,lines};}
function logoParts(scale=1){return [['susi',78*scale,sans,'#f2eee5','#e9b8cf'],['dlc',85*scale,serif,'#e9b8cf','#cf609a'],['.com',78*scale,sans,'#cf609a','#f2d5e3']];}
function drawLogo(ctx,x,baseline,scale=1){let left=x;for(const [text,size,font,a,b] of logoParts(scale)){ctx.font=(text==='dlc'?'italic ':'')+size+'px '+font;const width=ctx.measureText(text).width;const g=ctx.createLinearGradient(left,baseline-70*scale,left+width,baseline);g.addColorStop(0,a);g.addColorStop(1,b);ctx.fillStyle=g;ctx.fillText(text,left,baseline);left+=width;}}
function logoExtents(ctx,scale=1){let ascent=0,descent=0,width=0;for(const [text,size,font]of logoParts(scale)){ctx.font=(text==='dlc'?'italic ':'')+size+'px '+font;const m=ctx.measureText(text);width+=m.width;ascent=Math.max(ascent,Number.isFinite(m.actualBoundingBoxAscent)?m.actualBoundingBoxAscent:size*.8);descent=Math.max(descent,Number.isFinite(m.actualBoundingBoxDescent)?m.actualBoundingBoxDescent:size*.2);}return {ascent,descent,width};}
async function renderCard(data,labels){
 const cover=new Image();cover.decoding='async';cover.src=data.cover;
 await Promise.all([cover.decode(),document.fonts?.ready||Promise.resolve()]);
 const canvas=document.createElement('canvas');canvas.width=1080;
 const c=canvas.getContext('2d');if(!c)throw new Error('Canvas unavailable');
 const blocks=[],left=64,right=1016,width=952;
 const text=(value,x,y,w,size,font=serif,color='#f2eee5',leading=1.3)=>{c.font=size+'px '+font;const lines=wrap(c,String(value||''),w);blocks.push({lines,x,y,size,font,color,leading});return lines.length*size*leading;};
 const rules=[];let y=52;
 y+=text(data.lang==='es'?'TU RECORRIDO':'YOUR JOURNEY',left,y,width,15,sans,'#cabcaa')+12;
 y+=text(data.words.join(' → '),left,y,width,20,sans,'#e8a4b7')+22;rules.push(y);y+=24;
 const theme=data.theme||'',badgeTop=y;c.font='28px '+serif;const badgeWidth=c.measureText(theme).width+28;
 text(theme,left+14,y+7,width-28,28,serif,'#382511');y+=58;
 y+=text(data.essence||data.reason,left,y,width-216,27,serif,'#f2eee5',1.35)+24;y=Math.max(y,badgeTop+200);rules.push(y);y+=25;
 const rowTop=y,col=292,gap=38,xs=[left,left+col+gap,left+2*(col+gap)];
 const headingY=y+33;
 text(data.lang==='es'?'CANCIÓN':'SONG',xs[1],y,col,15,sans,'#cabcaa');
 text(data.lang==='es'?'LECTURA':'READING',xs[2],y,col,15,sans,'#cabcaa');
 text(data.lang==='es'?'CITA BÍBLICA':'BIBLE VERSE',xs[0],y,col,15,sans,'#cabcaa');
 const songHeight=text(data.title,xs[1],headingY,col,30),readingHeight=text(data.reading?.title,xs[2],headingY,col,30),verseHeight=text(data.verse?.reference,xs[0],headingY,col,30);
 const rowBottom=headingY+Math.max(songHeight,readingHeight,verseHeight,80)+20;rules.push(rowBottom);
 const logoScale=.6,logo=logoExtents(c,logoScale);canvas.height=Math.max(620,Math.ceil(rowBottom+logo.ascent+logo.descent+78));
 c.fillStyle='#33241e';c.fillRect(0,0,1080,canvas.height);c.strokeStyle='#87745f';c.lineWidth=1;c.strokeRect(24,24,1032,canvas.height-48);const gold=c.createLinearGradient(left,badgeTop,left+badgeWidth,badgeTop+43);gold.addColorStop(0,'#b38039');gold.addColorStop(.35,'#fff0bd');gold.addColorStop(.7,'#d3a35b');gold.addColorStop(1,'#f9e5a8');c.fillStyle=gold;c.fillRect(left,badgeTop,badgeWidth,43);c.strokeRect(left,badgeTop,badgeWidth,43);
 for(const y of rules){c.beginPath();c.moveTo(left,y);c.lineTo(right,y);c.stroke();}
 for(const x of [xs[1]-19,xs[2]-19]){c.beginPath();c.moveTo(x,rowTop);c.lineTo(x,rowBottom-20);c.stroke();}
 const size=176,coverX=right-size,ratio=Math.min(size/cover.naturalWidth,size/cover.naturalHeight),w=cover.naturalWidth*ratio,h=cover.naturalHeight*ratio;
 c.drawImage(cover,coverX+(size-w)/2,badgeTop+(size-h)/2,w,h);c.font='12px '+sans;c.fillStyle='#cabcaa';c.textAlign='right';c.textAlign='left';
 for(const b of blocks){c.font=b.size+'px '+b.font;c.fillStyle=b.color;b.lines.forEach((line,i)=>c.fillText(line,b.x,b.y+b.size*.84+i*b.size*b.leading));}
 drawLogo(c,(1080-logo.width)/2,canvas.height-42-logo.descent,logoScale);
 const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('PNG export failed')),'image/png'));
 return {blob,width:canvas.width,height:canvas.height};
}
function install(dialog){
 const group=el('details','sp-share');group.setAttribute('aria-label','');
 const toggle=el('summary','sp-share-toggle');const icon=el('span','sp-share-icon');icon.setAttribute('aria-hidden','true');icon.innerHTML='<svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12V2m-3 3 3-3 3 3M5 8H3v9h14V8h-2"/></svg>';const toggleLabel=el('span');toggle.append(icon,toggleLabel);
 const actions=el('div','sp-share-actions');const share=el('button','sp-share-action sp-share-primary');const download=el('a','sp-share-action');const link=el('button','sp-share-action');share.type=link.type='button';share.dataset.shareResult='';download.dataset.downloadResult='';link.dataset.copyTest='';download.setAttribute('aria-disabled','true');
 actions.append(share,download,link);const status=el('p','sp-share-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');
 const fallback=el('label','sp-share-copy-fallback');fallback.hidden=true;const fallbackLabel=el('span');const input=el('input');input.type='url';input.readOnly=true;input.spellcheck=false;input.addEventListener('focus',()=>input.select());fallback.append(fallbackLabel,input);group.append(toggle,actions,status,fallback);
 const preview=el('details','sp-share-preview');const previewLabel=el('summary');const previewImage=el('img');previewImage.width=1080;previewImage.height=680;preview.append(previewLabel,previewImage);group.append(preview);
 const resultFooter=dialog.querySelector('.sp-result-footer'),logo=dialog.querySelector('.sp-result-logo'),footer=dialog.querySelector('.sp-dialog-source');if(resultFooter)resultFooter.append(group);else if(logo)logo.before(group);else if(footer)footer.before(group);else dialog.querySelector('.sp-dialog-inner').append(group);
 const state={dialog,group,toggle,toggleLabel,share,download,link,status,fallback,fallbackLabel,input,preview,previewLabel,previewImage,token:0};states.set(dialog,state);
 share.addEventListener('click',async()=>{
  if(!state.file)return;
  const t=state.labels;const file=state.file;let supported=false;
  try{supported=typeof navigator.share==='function'&&typeof navigator.canShare==='function'&&navigator.canShare({files:[file]});}catch{}
  if(!supported){status.textContent=t.unsupported;download.focus();return;}
  share.disabled=true;
  try{await navigator.share({files:[file],url:state.url});status.textContent=t.shared;}
  catch(error){status.textContent=error.name==='AbortError'?t.cancel:t.failure;}
  finally{share.disabled=false;}
 });
 download.addEventListener('click',event=>{if(!state.file){event.preventDefault();return;}status.textContent=state.labels.saved;});
 link.addEventListener('click',async()=>{
  fallback.hidden=true;
  try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(state.url);status.textContent=state.labels.copied;}
  catch{fallback.hidden=false;fallbackLabel.textContent=state.labels.manual;input.value=state.url;input.focus();input.select();status.textContent='';}
 });
 return state;
}
export function prepareResultSharing(dialog,data){
 const state=states.get(dialog)||install(dialog),t=copy[data.lang]||copy.es;
 const token=++state.token;if(state.blobURL)URL.revokeObjectURL(state.blobURL);
 state.data=data;state.labels=t;state.file=null;state.url=new URL('/quiz','https://susidlc.com').href;
 state.group.open=false;state.toggleLabel.textContent=t.toggle;state.share.textContent=t.share;state.download.textContent=t.download;state.link.textContent=t.link;state.group.setAttribute('aria-label',t.label);state.status.textContent=t.preparing;state.fallback.hidden=true;state.share.disabled=true;state.download.removeAttribute('href');state.download.setAttribute('aria-disabled','true');
 state.preview.open=false;state.preview.hidden=true;state.previewLabel.textContent=t.preview;state.previewImage.removeAttribute('src');state.previewImage.alt=[data.theme,data.title,data.album,data.essence,data.reading?.title,data.verse?.reference,data.words.join(' → '),'Susidlc.com'].filter(Boolean).join(' · ');
 renderCard(data,t).then(({blob,width,height})=>{
  if(state.token!==token)return;
  const slug=data.title.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase();
  const name='susidlc-'+t.file+'-'+slug+'-'+data.lang+'.png';state.file=new File([blob],name,{type:'image/png'});state.blobURL=URL.createObjectURL(blob);state.download.href=state.blobURL;state.download.download=name;state.download.removeAttribute('aria-disabled');state.share.disabled=false;state.status.textContent='';
  state.previewImage.width=width;state.previewImage.height=height;state.previewImage.src=state.blobURL;state.preview.hidden=false;
 }).catch(()=>{if(state.token===token)state.status.textContent=t.imageError;});
}
