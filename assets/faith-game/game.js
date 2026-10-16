import {bindWordBankScroll} from './word-bank-scroll.js?v=20261015-readable-instructions-1';
import { bindTrinity } from './trinity.js';
import {cards} from './cards.js?v=20261015-discernment-three-1';
import {activityStatus} from './activity.js?v=20261015-discernment-three-1';
import {mountReward} from './reward.js';
import {shuffle} from './random.js';
import {saints,selectSaint} from './saints.js?v=20261015-saint-rotation-1';
import {originalPhotoMarkup} from './original-framing.js';
import {currentPlayer,serializeGame,restoreGame} from './engine.js';
import {createSoloGame,advanceAndRoll,completeSoloCard,normalizeSoloState} from './solo.js?v=20261015-return-dice-1';
import {oceanMarkup} from './ocean.js?v=20261015-mobile-bronze-1';
import {decorationsMarkup,decorationsStyles,decorationsIncludeBody,titleBulb} from './decorations.js';
const lang=window.SusiLocale?.lang||document.documentElement.lang||'es';
const L=(es,en)=>lang==='en'?en:es;
const text=v=>typeof v==='object'&&v!==null?v[lang]:v;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const root=document.getElementById('game-root'),dialog=document.getElementById('card-dialog');
const SAVE='susidlc-faith-solo-v2',UI='susidlc-faith-solo-cards-v2',REWARD='susidlc-faith-gratitude-v1';
const tokenColors=['#bd477a','#488fa6','#b39337','#6e8b46'];
const shortES=['','No nos dejes caer','Génesis I','Perdona nuestras ofensas','Discernimiento','En la tierra como en el cielo','Tentación','Como nosotros perdonamos','Tentación','Ave María','Padre nuestro','La vida de Jesús I','Santificado sea Tu nombre','Tentación','Líbranos del mal','Sacramentos','Génesis II','Que estás en el cielo','La vida de Jesús II','Discernimiento','El pan de cada día','La Trinidad','Hágase Tu voluntad','Tentación','Venga Tu reino'];
const shortEN=['','Lead us not into temptation','Genesis I','Forgive us our trespasses','Discernment','On Earth as in Heaven','Temptation','As we forgive others','Temptation','Hail Mary','Our Father','Jesus’ Life I','Hallowed be Thy Name','Temptation','Deliver us from evil','Sacraments','Genesis II','Who art in Heaven','Jesus’ Life II','Discernment','Our daily bread','Holy Trinity','Thy will be done','Temptation','Thy Kingdom Come'];
const compact=matchMedia('(max-width:640px)'), reduced=matchMedia('(prefers-reduced-motion:reduce)');
let state=null,started=false,entered=false,rolling=false,pausing=false,opened=null,live=false,drafts={},storageAvailable=true,finishing=false,moving=false,displayPosition=null,saintVisit=0,lastSaintId=null,rewardValue='';
try{const raw=localStorage.getItem(SAVE);if(raw){state=normalizeSoloState(restoreGame(raw));if(state.players.length!==1)throw Error('solo');started=true;}const ui=JSON.parse(sessionStorage.getItem(UI)||'{}');drafts=ui.drafts||{};opened=ui.opened??null;live=Boolean(ui.live);}catch{state=null;started=false;drafts={};opened=null;live=false;}
try{saintVisit=Math.max(0,Number(localStorage.getItem('susidlc-faith-saint-visit'))||0);lastSaintId=localStorage.getItem('susidlc-faith-last-saint');}catch{}
try{rewardValue=localStorage.getItem(REWARD)||drafts['p1:0']?.reflection||'';}catch{}
if(opened===0)opened=null;
if(!state)state=createSoloGame(L('Tú','You'));
if(live&&opened!==null&&state.pendingCard!==opened){opened=null;live=false;}
let releaseWordBankScroll=()=>{};
const style=document.createElement('style');style.textContent=decorationsStyles;document.head.append(style);
function getCard(id){return cards.find(c=>c.id===id);}
function cardTitle(c){const title=text(c.title);return c.type==='reflection'?`“${title}”`:title;}
function save(){try{if(started)localStorage.setItem(SAVE,serializeGame(state));sessionStorage.setItem(UI,JSON.stringify({drafts,opened,live}));}catch{storageAvailable=false;}}
function announce(message){document.getElementById('announcement').textContent=message;}
const pipMap={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
function dieMarkup(value=5,animate=false){return `<span class="die ${animate?'rolling':''}" aria-hidden="true">${pipMap[value].map(n=>`<i class="pip" style="grid-area:${Math.ceil(n/3)} / ${(n-1)%3+1}"></i>`).join('')}</span>`;}
const icons={help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 .4c0 2-2.5 2.2-2.5 4M12 16.5v.2"/>',pause:'<path d="M9 5v14M15 5v14"/>',play:'<path d="m9 5 10 7-10 7Z"/>',reset:'<path d="M4 10a8 8 0 1 1 .6 6M4 4v6h6"/>'};
const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
function render(){
 const p={...currentPlayer(state),pos:displayPosition??currentPlayer(state).pos},done=state.phase==='game-over',pending=['awaiting-card','awaiting-retry'].includes(state.phase);
 const active=started&&entered;
 const dieLabel=pending?L('Abrir mi tarjeta','Open my card'):L('Lanzar el dado','Roll the die');
 root.innerHTML=`<section class="game-heading"><div><a class="game-breadcrumb" href="/${lang}/pan-de-cada-dia/">PAN DE CADA DÍA</a><h1>${L('Padre Nuestro <em>oración</em>','Our Father <em>prayer</em>')}</h1></div><div class="map-tools"><button class="icon-button" id="rules" aria-label="${L('Instrucciones','Instructions')}" title="${L('Instrucciones','Instructions')}">${icon('help')}</button>${active?`<button class="icon-button" id="new-game" aria-label="${L('Nueva partida','New game')}" ${rolling||pausing||moving?'disabled':''}>${icon('reset')}</button>`:''}</div></section>
 <section class="ocean-board ${active?'journey-started':'journey-intro'} ${rolling?'is-rolling':''} ${moving?'is-stepping':''} ${pausing?'is-pausing':''}" aria-label="${L('Tablero completo','Complete board')}"><div class="map-water">${oceanMarkup({cards,lang,player:p,started:active,compact:compact.matches,names:lang==='en'?shortEN:shortES})}</div><div class="shore"><button class="start-gate ${!entered?'is-invitation':''}" id="start-gate" aria-label="${L('INICIO','START')}">${!entered?'<span class="start-light" aria-hidden="true"></span>':''}<strong>${L('INICIO','START')}</strong></button><button class="amen-shore" data-card="amen"><span>AMEN</span><i aria-hidden="true">✧</i></button></div>${active?`<div class="dice-dock"><button class="dice-button ${pending?'has-pending':''}" id="primary" aria-label="${done?L('Has llegado','You have arrived'):dieLabel}" title="${done?L('Has llegado','You have arrived'):dieLabel}" ${rolling||pausing||moving?'disabled':''}>${done?'<span class="arrival-symbol" aria-hidden="true">✧</span>':pending&&!rolling&&!moving?`<span class="pending-card-token" aria-hidden="true">${state.pendingCard}</span>`:dieMarkup(state.lastRoll||5)}</button></div>`:''}${pausing?`<div class="amen-pause" role="status"><span>AMEN</span><small>${L('Una pausa. Vuelve a la','A pause. Return to')} ${p.pos}.</small></div>`:''}</section><div class="map-baseline"><span>${active?`${String(Math.min(p.pos,24)).padStart(2,'0')} <span aria-hidden="true">/</span> 24`:L('26 tarjetas · un camino','26 cards · one journey')}</span>${active&&pending&&!rolling&&!moving?`<button class="baseline-hint pending-cue" id="open-pending">${L('Abrir casilla ','Open space ')+state.pendingCard} ↗</button>`:`<span class="baseline-hint">${!entered?L('Toca INICIO para jugar','Tap START to play'):done?L('Has llegado','You have arrived'):L('Toca el dado para seguir','Tap the die to continue')}</span>`}<span class="saved-mark" aria-label="${L('Partida guardada en este dispositivo','Game saved on this device')}" title="${L('Se guarda en este dispositivo','Saved on this device')}">${storageAvailable?'◦':'!'}</span></div>`;
 root.querySelectorAll('[data-card]').forEach(b=>{
   const id=b.dataset.card==='amen'?'amen':+b.dataset.card;
   const browse=()=>{if(rolling||pausing||moving)return;b.classList.add('is-revealed');if(id==='amen')showSaint(false,true);else openCard(id,active&&state.pendingCard===id);};
   b.onclick=browse;if(b.tagName.toLowerCase()==='g')b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();browse();}};
 });
 document.getElementById('start-gate').onclick=()=>{if(rolling||pausing||moving)return;if(!started||state.phase==='game-over')startJourney();else{entered=true;render();primaryAction();}};
 document.getElementById('primary')?.addEventListener('click',primaryAction);
 document.getElementById('new-game')?.addEventListener('click',startJourney);
 document.getElementById('rules').onclick=showRules;
 document.getElementById('open-pending')?.addEventListener('click',()=>openCard(state.pendingCard,true));

}
function startJourney(){if(rolling||moving)return;dialog.close();opened=null;live=false;state=createSoloGame(L('Tú','You'));started=true;entered=true;drafts={};save();render();return showRollPrompt();}
function showRollPrompt(){
 const d=document.getElementById('roll-dialog');
 if(!entered||d.open||rolling||moving)return;
 const firstRoll=currentPlayer(state).pos===0&&state.lastRoll===null;
 d.innerHTML=`<div class="roll-prompt"><button class="roll-close" aria-label="${L('Cerrar','Close')}">×</button><button class="roll-trigger" aria-label="${firstRoll?L('Empezar: tira el dado','Start: roll the die'):L('Tira el dado','Roll the die')}"><span class="roll-face">${dieMarkup(5)}</span><span id="roll-title">${firstRoll?L('Empezar','Start'):L('Tira','Roll')}</span></button></div>`;
 d.querySelector('.roll-close').onclick=()=>d.close();
 d.oncancel=e=>{if(rolling)e.preventDefault();};
 d.querySelector('.roll-trigger').onclick=performRoll;
 d.showModal();d.querySelector('.roll-trigger').focus({preventScroll:true});
}
function primaryAction(){
 if(rolling||pausing||moving||finishing)return;
 if(!entered){document.getElementById('start-gate').focus();return;}
 if(!started){startJourney();return;}
 if(state.phase==='game-over'){showArrival();return;}
 if(['awaiting-card','awaiting-retry'].includes(state.phase)){openCard(state.pendingCard,true);return;}
 showRollPrompt();
}
async function performRoll(){
 const d=document.getElementById('roll-dialog');
 if(!d.open||rolling||pausing||moving||finishing)return;
 const before=state,button=d.querySelector('.roll-trigger'),close=d.querySelector('.roll-close'),face=d.querySelector('.roll-face');
 rolling=true;button.disabled=true;close.disabled=true;button.setAttribute('aria-busy','true');
 face.innerHTML=dieMarkup(5,true);render();
 const spin=face.querySelector('.die').getAnimations()[0];
 if(spin)await spin.finished.catch(()=>{});
 else await new Promise(r=>setTimeout(r,reduced.matches?100:1300));
 if(state!==before){rolling=false;d.close();render();return;}
 const from=currentPlayer(state).pos;
 state=advanceAndRoll(state);displayPosition=from;save();render();
 face.innerHTML=dieMarkup(state.lastRoll);button.removeAttribute('aria-busy');
 announce(L('Dado: ','Die: ')+state.lastRoll);
 await new Promise(r=>setTimeout(r,reduced.matches?250:850));
 d.close();rolling=false;await walkTo(from,currentPlayer(state).pos);
 announce(L('Casilla ','Space ')+currentPlayer(state).pos);
 if(state.phase==='game-over')showArrival();else if(state.pendingCard!==null)openCard(state.pendingCard,true);
}
async function walkTo(from,to,pauseAtEnd=0){
 if(from===to||reduced.matches){displayPosition=null;moving=false;render();return;}
 moving=true;const step=to>from?1:-1,delay=Math.min(250,1500/Math.abs(to-from));
 for(let n=from+step;step>0?n<=to:n>=to;n+=step){displayPosition=n;render();await new Promise(r=>setTimeout(r,delay));}
 if(pauseAtEnd)await new Promise(r=>setTimeout(r,pauseAtEnd));
 displayPosition=null;moving=false;render();
}
function showRules(){const d=document.getElementById('rules-dialog');d.innerHTML=`<div class="small-dialog"><div class="dialog-top"><h2 id="rules-title">${L('Instrucciones','Instructions')}</h2><button class="text-button" data-close aria-label="${L('Cerrar','Close')}">×</button></div><ol class="rules-list"><li>${L('Pulsa INICIO y luego «Empezar». En los siguientes turnos, toca «Tira» y sigue al peón.','Tap START, then “Start” on the die. On later turns, tap “Roll” and follow your piece.')}</li><li>${L('Lee, toca las palabras en orden o escribe tus respuestas.','Read, tap words in order, or write your answers.')}</li><li>${L('Usa el botón inferior para seguir. Si retrocedes, espera a que llegue el peón y vuelve a tirar.','Use the bottom button to continue. After moving back, wait for your piece to arrive, then roll again.')}</li><li>${L('AMEN muestra santos. Pulsa «Seguir jugando» para continuar.','AMEN shows saints. Tap “Keep playing” to continue.')}</li><li>${L('Al pasar la casilla 24 recibes «Él ha resucitado». Escribe tu agradecimiento y compártelo.','Pass space 24 to receive “He is risen”. Write your thanks and share them.')}</li></ol><button class="primary-button" data-play>${L('Jugar','Play')}</button></div>`;d.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>d.close());d.querySelector('[data-play]').onclick=()=>{d.close();primaryAction();};d.showModal();}
function showArrival(){mountReward(document.getElementById('reward-dialog'),{lang,value:rewardValue,onChange:value=>{rewardValue=value;try{localStorage.setItem(REWARD,value);}catch{}},onRestart:()=>startJourney()});}
compact.addEventListener('change',()=>{render();if(dialog.open&&opened!==null)renderCard();});

function draftKey(id){return `${live?currentPlayer(state).id:'explore'}:${id}`;}
function getDraft(c){const key=draftKey(c.id);let d=drafts[key];if(!d){d={slots:[],open:false,selected:null,checked:false,feedback:'',matches:{},left:null,choices:{},examples:{},reflection:'',shuffled:[]};const count=c.activity?.answers?.[lang]?.length||c.activity?.items?.[lang]?.length||0;d.slots=Array(count).fill(null);d.shuffled=shuffle(Array.from({length:count},(_,i)=>i));drafts[key]=d;}if(c.type==='classify'&&(!Array.isArray(d.questionOrder)||d.questionOrder.length!==c.activity.items.length))d.questionOrder=shuffle(c.activity.items.map(item=>item.id));if(c.type==='examples'){d.checked=false;d.feedback='';}return d;}
function openCard(id,isLive=false){if(id===0){if(state.phase==='game-over')showArrival();return;}const fresh=opened!==id||!dialog.open;opened=id;live=isLive;const c=getCard(id);if(!c)return;if(fresh){const main=dialog.querySelector('.card-main'),bank=dialog.querySelector('.word-bank');if(main)main.scrollTop=0;if(bank)bank.scrollTop=0;}getDraft(c);renderCard();if(!dialog.open)dialog.showModal();save();}
function closeCard(){releaseWordBankScroll();releaseWordBankScroll=()=>{};dialog.close();opened=null;live=false;save();root.querySelectorAll('.is-revealed').forEach(el=>el.classList.remove('is-revealed'));}
dialog.addEventListener('cancel',e=>{e.preventDefault();closeCard();});
function envelope(c,d){const list=c.type==='order'?c.activity.items[lang]:c.activity.words[lang];return `<aside class="envelope-panel"><button class="envelope ${d.open?'open':''}" id="envelope" aria-expanded="${d.open}" aria-label="${L('Abrir banco de palabras','Open word bank')}"><span class="seal" aria-hidden="true">♥</span><span class="env-label">${L('Banco de palabras','Word Bank')}</span></button><p class="envelope-note">${d.open?L('Toca en orden: cada pieza llena el siguiente espacio.','Tap in order: each piece fills the next space.'):L('Abre el sobre y toca las piezas en orden.','Open the envelope and tap the pieces in order.')}</p>${d.open?`<div class="word-bank-wrap"><div class="word-bank" tabindex="0" role="region" aria-label="${L('Palabras disponibles','Available words')}">${d.shuffled.map(i=>`<button class="word-piece ${d.slots.includes(i)?'used':''}" data-piece="${i}"  style="--tilt:${i%2?1.5:-1}deg" ${d.slots.includes(i)?'disabled':''}>${esc(list[i])}</button>`).join('')}</div><div class="word-bank-scrollbar" aria-hidden="true" hidden><span class="word-bank-scroll-thumb"></span></div></div>`:''}</aside>`;}
function activityMarkup(c,d){
 if(c.type==='fill'){return `<div class="activity-layout"><div class="activity-lines">${c.activity.segments[lang].map(line=>`<div class="fill-line">${esc(line).replace(/\{(\d+)\}/g,(_,s)=>{const i=+s;return `<button class="word-slot ${d.slots[i]!==null?'filled':''} ${d.selected===i?'selected':''}" data-slot="${i}" aria-label="${L('Espacio','Blank')} ${i+1}${d.slots[i]!==null?': '+esc(c.activity.words[lang][d.slots[i]]):''}">${d.slots[i]!==null?esc(c.activity.words[lang][d.slots[i]]):'&nbsp;&nbsp;&nbsp;&nbsp;'}</button>`;})}</div>`).join('')}</div>${envelope(c,d)}</div>`;}
 if(c.type==='order'){return `<div class="activity-layout"><div class="order-slots">${c.activity.items[lang].map((_,i)=>`<button class="order-slot ${d.slots[i]!==null?'filled':''} ${d.selected===i?'selected':''}" data-slot="${i}" aria-label="${L('Frase','Phrase')} ${i+1}${d.slots[i]!==null?': '+esc(c.activity.items[lang][d.slots[i]]):''}"><small>${String(i+1).padStart(2,'0')}</small><span>${d.slots[i]!==null?esc(c.activity.items[lang][d.slots[i]]):'________________'}</span></button>`).join('')}</div>${envelope(c,d)}</div>`;}
 if(c.type==='classify'){return `<div class="classify-list">${d.questionOrder.map(id=>c.activity.items.find(item=>item.id===id)).map(item=>`<div class="discern-item"><label for="choice-${item.id}">${esc(text(item.text))}</label><select data-choice="${item.id}" id="choice-${item.id}"><option value="">${L('¿De dónde viene?','Where does it come from?')}</option>${c.activity.categories.map(cat=>`<option value="${cat.id}" ${d.choices[item.id]===cat.id?'selected':''}>${esc(text(cat.label))}</option>`).join('')}</select></div>`).join('')}</div>`;}
 if(c.type==='match'){const pairs=c.activity.pairs,order=[1,3,0,2];return `<div class="match-layout"><svg class="match-lines" viewBox="0 0 100 260" preserveAspectRatio="none" aria-hidden="true">${Object.entries(d.matches).map(([left,right])=>{const i=pairs.findIndex(p=>p.id===left),j=order.findIndex(o=>pairs[o].id===right);return `<line x1="28" y1="${26+i*65}" x2="72" y2="${26+j*65}" stroke="${tokenColors[i]}" stroke-width=".6"/>`;}).join('')}</svg><div class="match-column">${pairs.map((p,i)=>`<button data-match-left="${p.id}" style="--pair:${tokenColors[i]}" class="match-choice ${d.left===p.id?'selected':''} ${d.matches[p.id]?'matched':''}">${esc(text(p.left))}</button>`).join('')}</div><div></div><div class="match-column">${order.map(i=>{let p=pairs[i],left=Object.keys(d.matches).find(k=>d.matches[k]===p.id),idx=pairs.findIndex(p=>p.id===left);return `<button data-match-right="${p.id}" style="--pair:${tokenColors[idx]||'#b39337'}" class="match-choice ${left?'matched':''}">${esc(text(p.right))}</button>`;}).join('')}</div></div><p class="small-note">${L('Toca un sacramento y después su gracia para unirlos.','Tap a sacrament, then its grace to connect them.')}</p>`;}
 if(c.type==='examples'){return `<div class="columns-activity">${c.activity.categories.map(cat=>`<div class="discern-column">${Array.from({length:c.activity.perCategory},(_,i)=>`<div class="example-input"><label for="example-${cat.id}-${i}">${esc(text(cat.label))}</label><textarea id="example-${cat.id}-${i}" data-example="${cat.id}-${i}" maxlength="400" placeholder="${L('Escribe un pensamiento…','Write one thought…')}">${esc(d.examples[`${cat.id}-${i}`]||'')}</textarea></div>`).join('')}</div>`).join('')}</div>`;}
 return '';
}
function nextLabel(c){
 if(c.type==='examples')return L('Siguiente','Next');
 if(c.move?.to==='amen')return L('Ir a AMEN','Go to AMEN');
 if(c.move)return (c.move.to<c.id?L('Volver a la casilla ','Return to space '):c.id===9?L('Siguiente: Casilla ','Next: Space '):L('Avanzar a la casilla ','Go to space '))+c.move.to;
 if(!started)return L('Comenzar','Begin');
 if(!live&&state.pendingCard!==null)return L('Seguir mi partida','Continue my game');
 return L('Continuar','Continue');
}
function updateActivity(c,d){
 const result=activityStatus(c,d,lang);d.checked=result.correct;
 d.feedback=result.correct?L('¡Muy bien! Lo completaste.','Well done! You completed it.'):'';
 renderCard();save();
}
function renderCard(){
 const scrollMain=dialog.querySelector('.card-main')?.scrollTop||0,scrollBank=dialog.querySelector('.word-bank')?.scrollTop||0;
 releaseWordBankScroll();releaseWordBankScroll=()=>{};
 const c=getCard(opened),d=getDraft(c),interactive=['fill','order','classify','match','examples'].includes(c.type),deco=decorationsMarkup({...c,decorations:c.decorations.filter(x=>x!=='bulb')},lang);
 const primary=c.type==='examples'?L('Siguiente','Next'):c.id===9&&!d.checked?L('Completar → 19','Complete → 19'):interactive&&!d.checked?L('Revisar','Check'):nextLabel(c);
 const move=c.move&&c.id!==9?c.move.to==='amen'?`<div class="amen-invitation"><button class="amen-action gold-button" id="amen-action">${esc(text(c.action))} ↗</button></div>`:`<p class="move-highlight">${esc(text(c.action))}</p>`:'';
 dialog.innerHTML=`<article class="card-paper paper-${c.paper} card-type-${c.type} ${d.checked?'is-complete':''}" style="--paper:${c.color}"><div class="card-toolbar"><span>${live?L('TU TARJETA','YOUR CARD'):L('EXPLORAR','EXPLORE')}</span><div class="card-tools"><button id="original">${L('Ver original','View original')} ↗</button><button class="close-card" id="close-card" aria-label="${L('Cerrar tarjeta','Close card')}">×</button></div></div><div class="card-title-row"><span class="card-number">${c.id===0?'☼':c.id==='amen'?'✦':c.id}</span><div><h2 id="card-title">${esc(cardTitle(c))}</h2>${text(c.subtitle)?`<span class="card-subtitle">${esc(text(c.subtitle))}</span>`:''}</div>${titleBulb(c)}</div><div class="card-main">${deco}${!decorationsIncludeBody(c)&&text(c.body)&&!['fill','order'].includes(c.type)?`<p class="${interactive?'instructions':'card-copy large-copy'}">${esc(text(c.body))}</p>`:''}${move}${activityMarkup(c,d)}${c.note?`<p class="small-note">${esc(text(c.note))}</p>`:''}</div><div class="card-bottom"><div class="card-feedback ${d.checked?'good card-celebration':d.feedback?'bad':''}" role="status">${d.checked?'<span aria-hidden="true">✦</span> ':''}${esc(d.feedback||'')}</div><div class="card-review-bar">${interactive?`<button class="card-restart secondary-button" id="reset-activity" aria-label="${L('Borrar respuestas','Clear answers')}" title="${L('Borra solo tus respuestas de esta tarjeta','Clears only your answers on this card')}">↺ <span>${L('Borrar respuestas','Clear answers')}</span></button>`:''}${c.move?.to==='amen'?'':`<button class="primary-button gold-button" id="card-primary" ${c.type==='examples'&&!activityStatus(c,d,lang).complete?'disabled':''}>${primary}</button>`}</div></div></article>`;
 bindTrinity(dialog);
 dialog.querySelector('#close-card').onclick=closeCard;
 dialog.querySelector('#original').onclick=()=>showOriginal(c);
 dialog.querySelector('#card-primary')?.addEventListener('click',()=>handleCard(c,d));
 dialog.querySelector('#amen-action')?.addEventListener('click',()=>handleCard(c,d));
 dialog.querySelector('#reset-activity')?.addEventListener('click',()=>{const order=d.questionOrder;delete drafts[draftKey(c.id)];const clean=getDraft(c);if(order)clean.questionOrder=order;renderCard();save();});
 dialog.querySelector('#envelope')?.addEventListener('click',()=>{d.open=!d.open;renderCard();save();});
 dialog.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>{const i=+b.dataset.slot;d.slots[i]=null;d.selected=i;updateActivity(c,d);});
 dialog.querySelectorAll('[data-piece]').forEach(b=>b.onclick=()=>{let i=d.selected??d.slots.findIndex(x=>x===null);if(i<0)return;d.slots[i]=+b.dataset.piece;d.selected=null;updateActivity(c,d);});
 dialog.querySelectorAll('[data-choice]').forEach(b=>b.onchange=()=>{d.choices[b.dataset.choice]=b.value;updateActivity(c,d);});
 dialog.querySelectorAll('[data-match-left]').forEach(b=>b.onclick=()=>{d.left=b.dataset.matchLeft;delete d.matches[d.left];updateActivity(c,d);});
 dialog.querySelectorAll('[data-match-right]').forEach(b=>b.onclick=()=>{if(!d.left)return;for(const k of Object.keys(d.matches))if(d.matches[k]===b.dataset.matchRight)delete d.matches[k];d.matches[d.left]=b.dataset.matchRight;d.left=null;updateActivity(c,d);});
 dialog.querySelectorAll('[data-example]').forEach(b=>b.oninput=()=>{d.examples[b.dataset.example]=b.value;dialog.querySelector('#card-primary').disabled=!activityStatus(c,d,lang).complete;save();});
 const main=dialog.querySelector('.card-main'),bank=dialog.querySelector('.word-bank');if(main)main.scrollTop=scrollMain;if(bank){bank.scrollTop=scrollBank;releaseWordBankScroll=bindWordBankScroll(bank);}
}
async function handleCard(c,d){
 if(finishing||moving||rolling)return;
 if(c.type==='examples'&&!activityStatus(c,d,lang).complete)return;
 if(['fill','order','classify','match'].includes(c.type)&&!d.checked){
  const result=activityStatus(c,d,lang);d.checked=result.correct;
  d.feedback=d.checked?L('¡Muy bien! Lo completaste.','Well done! You completed it.'):L('Revisa tus respuestas y prueba otra vez.','Check your answers and try again.');renderCard();save();return;
 }
 const wasLive=live,from=currentPlayer(state).pos;
 if(wasLive&&c.id!==0&&state.pendingCard===c.id){state=completeSoloCard(state,c.move?(c.move.to==='amen'?{kind:'amen'}:{kind:'move',to:c.move.to}):{kind:'complete'});delete drafts[draftKey(c.id)];}
 closeCard();save();render();
 if(c.move?.to==='amen'){showSaint(wasLive);return;}
 if(wasLive&&c.move){await walkTo(from,currentPlayer(state).pos,350);announce(L('Llegaste a la casilla ','You reached space ')+currentPlayer(state).pos);if(state.pendingCard!==null)openCard(state.pendingCard,true);else primaryAction();return;}
 if(!wasLive&&c.move){openCard(c.move.to,false);return;}
 await primaryAction();
}
function showSaint(fromCard=false,browseGallery=false){
 const info=selectSaint(new Date(),saintVisit++,{previousSaintId:lastSaintId}),d=document.getElementById('saint-dialog');let index=saints.findIndex(s=>s.id===info.saint.id);
 try{localStorage.setItem('susidlc-faith-saint-visit',String(saintVisit));}catch{}
 function draw(){const saint=saints[index],source=saint.source[lang];lastSaintId=saint.id;try{localStorage.setItem('susidlc-faith-last-saint',lastSaintId);}catch{}
 d.innerHTML=`<article class="saint-card" data-saint="${esc(saint.id)}"><button class="saint-close" aria-label="${L('Cerrar','Close')}">×</button><div class="saint-copy"><p class="saint-kicker">AMEN · ${L('SANTOS POR DESCUBRIR','SAINTS TO DISCOVER')}</p>${browseGallery?`<div class="saint-gallery-nav" role="group" aria-label="${L('Colección de santos','Saint collection')}"><button id="saint-prev" aria-label="${L('Santo anterior','Previous saint')}">←</button><span>${index+1} / ${saints.length}</span><button id="saint-next" aria-label="${L('Siguiente santo','Next saint')}">→</button></div><p class="saint-gallery-note">${L('Una colección de seis cartas que van cambiando durante el juego.','Six cards that change as you play.')}</p>`:''}<h2 id="saint-title">${esc(text(saint.name))}</h2><p class="saint-fact">${esc(text(saint.fact))}</p><div class="saint-actions"><button class="saint-continue primary-button" id="saint-continue">${L('Seguir jugando','Keep playing')}</button></div><div class="saint-source"><small>${L('Bibliografía','Source')}</small><a href="${esc(source)}" target="_blank" rel="noopener noreferrer">Vatican News · ${esc(text(saint.name))} ↗</a></div></div><figure class="saint-portrait"><img src="${esc(saint.image)}" alt="${esc(text(saint.imageAlt||saint.name))}" style="object-position:${saint.imagePosition||'50% 25%'}"><figcaption>${esc(saint.attribution||'Vatican News')}</figcaption></figure></article>`;
 d.querySelector('.saint-close').onclick=()=>d.close();d.querySelector('#saint-prev')?.addEventListener('click',()=>{index=(index+saints.length-1)%saints.length;draw();});d.querySelector('#saint-next')?.addEventListener('click',()=>{index=(index+1)%saints.length;draw();});d.querySelector('#saint-continue').onclick=async()=>{d.close();if(fromCard)await primaryAction();};}
 draw();d.showModal();
}

function showOriginal(c){const d=document.getElementById('photo-dialog');d.innerHTML=`<div class="photo-view"><button class="text-button" data-close>${L('Cerrar original','Close original')} ×</button><div class="original-frame framed-photo">${originalPhotoMarkup(c,lang)}</div></div>`;d.querySelector('[data-close]').onclick=()=>d.close();d.showModal();}
// Match Poems' compact mobile header: keep the light switch inside the menu.
const headerMedia=matchMedia('(max-width:669px)'),light=document.querySelector('.light-toggle'),utilities=document.querySelector('.header-utilities'),navigation=document.getElementById('navigation');
function placeLight(){if(light)(headerMedia.matches?navigation:utilities).append(light);}
headerMedia.addEventListener('change',placeLight);placeLight();
document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('tab-hidden',document.hidden);});
// Each page entry begins at START; saved progress and card drafts resume after it.
opened=null;live=false;render();save();
