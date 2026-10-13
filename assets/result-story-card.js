/* A personal selection of the actual recommendations; no synthetic aphorisms. */
import {STORY_READING_COPY} from './story-reading-copy.js?v=20261013-story-adapted-meanings-1';

const t=(es,en,lang)=>lang==='en'?en:es;
function font(ctx,size,style='serif'){
 ctx.font=(style==='italic'?'italic ':'')+size+'px '+(style==='sans'?'Arial':'Georgia');
}
function setText(ctx,value,size,style='serif',color='#f2eee5',x=540,y=0,align='center'){
 font(ctx,size,style);ctx.fillStyle=color;ctx.textAlign=align;ctx.fillText(String(value||''),x,y);
}
function wrapped(ctx,value,maxWidth){
 const out=[];let line='';
 for(const word of String(value||'').trim().split(/\s+/)){
  const next=line?line+' '+word:word;
  if(line&&ctx.measureText(next).width>maxWidth){out.push(line);line=word;}else line=next;
 }
 if(line)out.push(line);return out;
}
/* Fit complete text; never cut a quotation or drop trailing lines. */
function fit(ctx,value,width,height,start,min,style='serif',leading=1.25){
 for(let size=start;size>=min;size--){
  font(ctx,size,style);const lines=wrapped(ctx,value,width),lineHeight=size*leading;
  if(lines.length*lineHeight<=height&&lines.every(line=>ctx.measureText(line).width<=width))return {size,lines,lineHeight};
 }
 throw new Error('Story text exceeds its reserved area');
}
function paragraph(ctx,value,{x=540,y,width,height,size=52,min=30,style='serif',color='#f2eee5',align='center',vertical='center',leading=1.25}){
 const layout=fit(ctx,value,width,height,size,min,style,leading);
 const first=y+(vertical==='center'?(height-layout.lines.length*layout.lineHeight)/2:0)+layout.size;
 layout.lines.forEach((line,i)=>setText(ctx,line,layout.size,style,color,x,first+i*layout.lineHeight,align));
 return layout;
}
function rule(ctx,y){ctx.strokeStyle='#c5a98350';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(100,y);ctx.lineTo(980,y);ctx.stroke();}
function icon(ctx,kind,x,y,scale=1){
 ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.strokeStyle='#cabcaa';ctx.lineWidth=2.1;ctx.lineJoin='round';ctx.lineCap='round';ctx.beginPath();
 if(kind==='verse'){
  ctx.moveTo(11,0);ctx.lineTo(19,0);ctx.lineTo(19,9);ctx.lineTo(28,9);ctx.lineTo(28,17);ctx.lineTo(19,17);ctx.lineTo(19,30);ctx.lineTo(11,30);ctx.lineTo(11,17);ctx.lineTo(2,17);ctx.lineTo(2,9);ctx.lineTo(11,9);ctx.closePath();
 }else if(kind==='song'){
  ctx.moveTo(10,22);ctx.lineTo(10,6);ctx.lineTo(28,1);ctx.lineTo(28,20);ctx.moveTo(10,12);ctx.lineTo(28,7);ctx.moveTo(10,22);ctx.ellipse(5,24,5,3,-.25,0,Math.PI*2);ctx.moveTo(28,20);ctx.ellipse(23,22,5,3,-.25,0,Math.PI*2);
 }else{
  ctx.moveTo(15,5);ctx.bezierCurveTo(10,1,5,1,0,4);ctx.lineTo(0,28);ctx.bezierCurveTo(5,25,10,25,15,29);ctx.bezierCurveTo(20,25,25,25,30,28);ctx.lineTo(30,4);ctx.bezierCurveTo(25,1,20,1,15,5);ctx.moveTo(15,5);ctx.lineTo(15,29);
 }
 ctx.stroke();ctx.restore();
}
function brand(ctx,y){
 const parts=[['susi','64px Arial','#e9d7df','#e5bdd0'],['dlc','italic 76px Georgia','#c65f94','#e3a6c9'],['.com','64px Arial','#da7aa7','#ecd3df']];
 let total=0;for(const [s,f] of parts){ctx.font=f;total+=ctx.measureText(s).width;}
 let x=(1080-total)/2;ctx.textAlign='left';
 for(const [s,f,a,b] of parts){ctx.font=f;const width=ctx.measureText(s).width,g=ctx.createLinearGradient(x,y-64,x+width,y);g.addColorStop(0,a);g.addColorStop(1,b);ctx.fillStyle=g;ctx.fillText(s,x,y);x+=width;}
}
function readingParts(data,lang){
 const title=String(data.reading?.title||'').split(' · ')[0].replace(' Morada',' morada');
 const chapter=String(data.reading?.title||'').split(' · ')[1]||'';
 const source=String(data.reading?.author||'').split(' · ');
 return {title,chapter,work:source[0]||t('Las Moradas','The Interior Castle',lang),author:source[1]||t('Santa Teresa de Jesús','Saint Teresa of Ávila',lang)};
}
function secondary(ctx,kind,data,lang,x){
 const book=readingParts(data,lang),title=kind==='song'?data.title:kind==='verse'?data.verse.reference:book.title;
 icon(ctx,kind,x,1321);
 const heading=paragraph(ctx,title,{x:x+54,y:1316,width:312,height:82,size:34,min:26,style:kind==='song'?'italic':'serif',color:kind==='song'?'#f0d28a':'#f2eee5',align:'left',vertical:'top',leading:1.18});
 const top=1316+heading.lines.length*heading.lineHeight+13;
 const detail=kind==='song'?'Susi de León Campo':kind==='verse'?data.verse.context:book.work+' · '+book.author;
 paragraph(ctx,detail,{x:x+54,y:top,width:312,height:1480-top,size:23,min:17,style:kind==='verse'?'italic':'serif',color:'#cabcaa',align:'left',vertical:'top',leading:1.2});
}
async function loadCover(src){
 const image=new Image();image.decoding='async';image.src=src;await image.decode();return image;
}
export async function renderResultStory(data){
 const focus=['song','verse','reading'].includes(data.focus)?data.focus:'song';
 const lang=data.lang==='en'?'en':'es',book=readingParts(data,lang);
 const cover=focus==='song'?await loadCover(data.cover):null;
 await (document.fonts?.ready||Promise.resolve());
 const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1920;
 const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');
 const bg=ctx.createLinearGradient(0,0,1080,1920);bg.addColorStop(0,'#33241e');bg.addColorStop(.55,'#2b211c');bg.addColorStop(1,'#4b2634');ctx.fillStyle=bg;ctx.fillRect(0,0,1080,1920);
 ctx.strokeStyle='#b39a733d';ctx.lineWidth=1;ctx.strokeRect(44,44,992,1832);ctx.strokeRect(62,62,956,1796);
 setText(ctx,t('Lo que hoy me mueve','What moves me today',lang),47,'italic','#e8a4b7',540,274);
 const gold=ctx.createLinearGradient(140,340,940,475);gold.addColorStop(0,'#b78a49');gold.addColorStop(.32,'#edd399');gold.addColorStop(.54,'#fff0ba');gold.addColorStop(.82,'#d7b166');gold.addColorStop(1,'#b58844');ctx.fillStyle=gold;ctx.fillRect(140,340,800,136);ctx.strokeStyle='#f8dfa3';ctx.lineWidth=3;ctx.strokeRect(140,340,800,136);
 paragraph(ctx,data.theme,{y:344,width:720,height:127,size:82,min:42,style:'italic',color:'#302315',leading:1.15});
 let featuredText='';
 if(focus==='song'){
  const ratio=Math.min(620/cover.naturalWidth,550/cover.naturalHeight),w=cover.naturalWidth*ratio,h=cover.naturalHeight*ratio;
  ctx.strokeStyle='#bda58380';ctx.lineWidth=1;ctx.strokeRect(540-w/2-18,845-h/2-18,w+36,h+36);ctx.drawImage(cover,540-w/2,845-h/2,w,h);
  paragraph(ctx,data.title,{y:1141,width:800,height:110,size:61,min:34,style:'italic',color:'#f0d28a',leading:1.1});
  featuredText=data.title;
 }else if(focus==='verse'){
  icon(ctx,'verse',520,559,1.35);
  paragraph(ctx,data.verse.reference,{y:631,width:800,height:99,size:65,min:38,style:'italic',color:'#f0d28a'});
  const quote=lang==='en'?'“'+data.verse.text+'”':'«'+data.verse.text+'»';
  paragraph(ctx,quote,{y:766,width:790,height:335,size:57,min:35,leading:1.28});
  paragraph(ctx,data.verse.version,{y:1160,width:790,height:64,size:23,min:19,style:'sans',color:'#cabcaa'});
  featuredText=data.verse.reference+' · '+data.verse.text+' · '+data.verse.version;
 }else{
  icon(ctx,'reading',520,557,1.35);
  paragraph(ctx,book.title,{y:631,width:800,height:99,size:65,min:38,style:'italic',color:'#f0d28a'});
  setText(ctx,book.work,31,'serif','#cabcaa',540,752);
  setText(ctx,book.author,27,'serif','#cabcaa',540,798);
  const summary=STORY_READING_COPY[data.reading.id]?.[lang];
  if(!summary)throw new Error('Missing reviewed Story reading summary');
  paragraph(ctx,summary,{y:835,width:790,height:300,size:49,min:32,leading:1.28});
  paragraph(ctx,t('Resumen editorial','Editorial summary',lang)+(book.chapter?' · '+book.chapter:''),{y:1160,width:790,height:64,size:23,min:19,style:'sans',color:'#cabcaa'});
  featuredText=book.title+' · '+book.work+' · '+book.author+' · '+summary+' · '+t('Resumen editorial','Editorial summary',lang);
 }
 rule(ctx,1272);
 const rest=['song','verse','reading'].filter(kind=>kind!==focus);
 secondary(ctx,rest[0],data,lang,161);secondary(ctx,rest[1],data,lang,595);rule(ctx,1500);
 setText(ctx,t('¿Y tú, cómo estás hoy?','And you, how are you today?',lang),38,'italic','#e8a4b7',540,1587);
 brand(ctx,1734);setText(ctx,'susidlc.com/quiz',30,'sans','#ead8bb',540,1791);
 const blob=await new Promise((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error('PNG export failed')),'image/png'));
 return {blob,width:1080,height:1920,focus,alt:[t('Lo que hoy me mueve','What moves me today',lang),data.theme,featuredText,data.title,data.verse.reference,book.title,'susidlc.com/quiz'].join(' · ')};
}
