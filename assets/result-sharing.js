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
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;}
function wrap(ctx,text,maxWidth){const lines=[];let line='';for(const word of text.split(/\s+/)){const next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>maxWidth){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);return lines;}
function fitText(ctx,text,width,height,start,min,italic=true){let size=start,lines;for(;size>=min;size-=2){ctx.font=(italic?'italic ':'')+size+'px '+serif;lines=wrap(ctx,text,width);if(lines.length*size*1.24<=height)break;}return {size,lines};}
function drawLogo(ctx,x,baseline){let left=x;for(const [text,font,a,b] of [['susi','78px '+sans,'#f2eee5','#e9b8cf'],['dlc','italic 85px '+serif,'#e9b8cf','#cf609a'],['.com','78px '+sans,'#cf609a','#f2d5e3']]){ctx.font=font;const width=ctx.measureText(text).width;const g=ctx.createLinearGradient(left,baseline-70,left+width,baseline);g.addColorStop(0,a);g.addColorStop(1,b);ctx.fillStyle=g;ctx.fillText(text,left,baseline);left+=width;}}
function logoExtents(ctx){let ascent=0,descent=0,width=0;for(const [text,size,font]of [['susi',78,sans],['dlc',85,serif],['.com',78,sans]]){ctx.font=(text==='dlc'?'italic ':'')+size+'px '+font;const m=ctx.measureText(text);width+=m.width;ascent=Math.max(ascent,Number.isFinite(m.actualBoundingBoxAscent)?m.actualBoundingBoxAscent:size*.8);descent=Math.max(descent,Number.isFinite(m.actualBoundingBoxDescent)?m.actualBoundingBoxDescent:size*.2);}return {ascent,descent,width};}
async function renderCard(data,labels){
 const cover=new Image();cover.decoding='async';cover.src=data.cover;
 await Promise.all([cover.decode(),document.fonts?.ready||Promise.resolve()]);
 const canvas=document.createElement('canvas');canvas.width=1080;
 const c=canvas.getContext('2d');if(!c)throw new Error('Canvas unavailable');
 // Song and seven words share the left column; the real cover stays on the right.
 const title=fitText(c,data.title,510,230,76,44);
 const titleLastBaseline=321+(title.lines.length-1)*title.size*1.24;
 const routeLabelBaseline=Math.ceil(titleLastBaseline+66);
 const routeFirstBaseline=routeLabelBaseline+58;
 const routeSize=45;c.font='italic '+routeSize+'px '+serif;
 const route={size:routeSize,lines:wrap(c,data.words.join(' → '),510)};
 const routeLastBaseline=routeFirstBaseline+(route.lines.length-1)*route.size*1.24;
 const dividerY=Math.max(739,Math.ceil(routeLastBaseline+55));
 const logo=logoExtents(c),logoBaseline=Math.ceil(dividerY+54+logo.ascent);
 const footerBaseline=Math.ceil(logoBaseline+logo.descent+60);
 canvas.height=footerBaseline+100;
 c.fillStyle='#33241e';c.fillRect(0,0,canvas.width,canvas.height);
 c.strokeStyle='#b8aa96';c.lineWidth=2;c.strokeRect(48,48,984,canvas.height-96);
 c.fillStyle='#cfc3b2';c.font='20px '+sans;c.fillText(labels.kicker,92,115);
 c.strokeStyle='#766859';c.lineWidth=1;c.beginPath();c.moveTo(92,159);c.lineTo(988,159);c.stroke();
 c.fillStyle='#cfc3b2';c.font='22px '+sans;c.fillText(labels.song,92,236);
 c.fillStyle='#f2eee5';c.font='italic '+title.size+'px '+serif;title.lines.forEach((line,i)=>c.fillText(line,92,321+i*title.size*1.24));
 c.fillStyle='#241b18';c.fillRect(652,233,336,425);
 const ratio=Math.min(308/cover.naturalWidth,397/cover.naturalHeight);const w=cover.naturalWidth*ratio,h=cover.naturalHeight*ratio;
 c.drawImage(cover,666+(308-w)/2,247+(397-h)/2,w,h);
 c.fillStyle='#cfc3b2';c.font='19px '+sans;c.fillText(labels.album+' · '+data.album,652,694);
 c.strokeStyle='#766859';c.beginPath();c.moveTo(92,dividerY);c.lineTo(988,dividerY);c.stroke();
 c.fillStyle='#cfc3b2';c.font='21px '+sans;c.fillText(labels.words,92,routeLabelBaseline);
 c.fillStyle='#e195a6';c.font='italic '+route.size+'px '+serif;route.lines.forEach((line,i)=>c.fillText(line,92,routeFirstBaseline+i*route.size*1.24));
 drawLogo(c,(canvas.width-logo.width)/2,logoBaseline);
 c.fillStyle='#cfc3b2';c.font='21px '+sans;c.textAlign='right';c.fillText('https://susidlc.com',988,footerBaseline);
 const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('PNG export failed')),'image/png'));
 return {blob,width:canvas.width,height:canvas.height};
}
function install(dialog){
 const group=el('details','sp-share');group.setAttribute('aria-label','');
 const toggle=el('summary','sp-share-toggle');const icon=el('span','sp-share-icon');icon.setAttribute('aria-hidden','true');icon.innerHTML='<svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12V2m-3 3 3-3 3 3M5 8H3v9h14V8h-2"/></svg>';const toggleLabel=el('span');toggle.append(icon,toggleLabel);
 const actions=el('div','sp-share-actions');const share=el('button','sp-share-action sp-share-primary');const download=el('a','sp-share-action');const link=el('button','sp-share-action');share.type=link.type='button';share.dataset.shareResult='';download.dataset.downloadResult='';link.dataset.copyTest='';download.setAttribute('aria-disabled','true');
 actions.append(share,download,link);const status=el('p','sp-share-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');
 const fallback=el('label','sp-share-copy-fallback');fallback.hidden=true;const fallbackLabel=el('span');const input=el('input');input.type='url';input.readOnly=true;input.spellcheck=false;input.addEventListener('focus',()=>input.select());fallback.append(fallbackLabel,input);group.append(toggle,actions,status,fallback);
 const preview=el('details','sp-share-preview');const previewLabel=el('summary');const previewImage=el('img');previewImage.width=1080;previewImage.height=1350;preview.append(previewLabel,previewImage);group.append(preview);
 const footer=dialog.querySelector('.sp-dialog-source');if(footer)footer.before(group);else dialog.querySelector('.sp-result-logo').after(group);
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
 state.data=data;state.labels=t;state.file=null;state.url=new URL('/'+data.lang+'/poemas/','https://susidlc.com').href;
 state.group.open=false;state.toggleLabel.textContent=t.toggle;state.share.textContent=t.share;state.download.textContent=t.download;state.link.textContent=t.link;state.group.setAttribute('aria-label',t.label);state.status.textContent=t.preparing;state.fallback.hidden=true;state.share.disabled=true;state.download.removeAttribute('href');state.download.setAttribute('aria-disabled','true');
 state.preview.open=false;state.preview.hidden=true;state.previewLabel.textContent=t.preview;state.previewImage.removeAttribute('src');state.previewImage.alt=data.title+' · '+data.album+' · '+data.words.join(' → ')+' · Susidlc.com';
 renderCard(data,t).then(({blob,width,height})=>{
  if(state.token!==token)return;
  const slug=data.title.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase();
  const name='susidlc-'+t.file+'-'+slug+'-'+data.lang+'.png';state.file=new File([blob],name,{type:'image/png'});state.blobURL=URL.createObjectURL(blob);state.download.href=state.blobURL;state.download.download=name;state.download.removeAttribute('aria-disabled');state.share.disabled=false;state.status.textContent='';
  state.previewImage.width=width;state.previewImage.height=height;state.previewImage.src=state.blobURL;state.preview.hidden=false;
 }).catch(()=>{if(state.token===token)state.status.textContent=t.imageError;});
}
