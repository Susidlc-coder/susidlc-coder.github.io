export function createJourneyGuide({root,lang,displayWord}){
 const en=lang==='en',panel=document.createElement('section');panel.className='journey-guide';panel.setAttribute('aria-label',en?'Your seven words':'Tus siete palabras');
 panel.innerHTML='<div class="guide-top"><span class="guide-objective">'+(en?'7 words → 1 song for you':'7 palabras → 1 canción para ti')+'</span><span class="guide-count"></span></div><h2 class="guide-question"></h2><p class="guide-feedback" role="status" aria-live="polite"></p><ol class="guide-words" aria-label="'+(en?'Words in order':'Palabras en orden')+'"></ol><p class="guide-goal">'+(en?'Choose how you feel today. Your song appears after word seven.':'Elige según lo que sientes hoy. Tu canción aparece al completar las siete.')+'</p>';
 root.querySelector('.sp-nav').after(panel);
 const collectionLabel=document.createElement('p');collectionLabel.className='guide-collection-label';collectionLabel.textContent=en?'Your words, in order':'Tus palabras, en orden';panel.querySelector('ol').before(collectionLabel);
 root.querySelector('[data-art]').after(root.querySelector('.sp-read-invite'));
 const list=panel.querySelector('ol');for(let i=0;i<7;i++){const li=document.createElement('li');li.innerHTML='<span class="guide-position">'+(i+1)+'</span><span class="guide-word"></span>';list.append(li);}
 // Keep optional exploration available without competing with the choice task.
 const extra=document.createElement('details');extra.className='guide-extra';const summary=document.createElement('summary');summary.textContent=en?'Explore the poems and more music':'Explorar los poemas y más música';extra.append(summary);const footer=root.querySelector('.sp-source');footer.before(extra);
 ['.sp-tools','.sp-music-banner','.sp-atlas'].forEach(selector=>{const el=root.querySelector(selector);if(el)extra.append(el);});
 let previous=-1;
 function update(choices,total){
  const done=total%7|| (total?7:0),selected=choices.slice(-done),last=done?selected.at(-1):null;
  panel.querySelector('.guide-count').textContent=done+' / 7';
  panel.querySelector('.guide-question').textContent=done===7?(en?'Your song is ready.':'Tu canción está lista.'):done===6?(en?'One more word. Which one feels right?':'Una palabra más. ¿Cuál conecta contigo?'):(en?'Which word connects with you today?':'¿Qué palabra conecta contigo hoy?');
  panel.querySelector('.guide-feedback').textContent=last?(en?'You chose “'+displayWord(last.word,last.page)+'”. '+(done===7?'You have all seven.':'Now tap another word below.'):'Elegiste «'+displayWord(last.word,last.page)+'». '+(done===7?'Ya tienes las siete.':'Ahora toca otra palabra abajo.')):(en?'Tap a word inside the figure to begin.':'Toca una palabra dentro de la figura para comenzar.');
  [...list.children].forEach((li,i)=>{const choice=i<done?selected[i]:null;li.classList.toggle('is-filled',!!choice);li.classList.toggle('is-next',i===done);li.querySelector('.guide-word').textContent=choice?displayWord(choice.word,choice.page):(i===done?(en?'Next':'Siguiente'):'—');if(i===done)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');});
  if(total!==previous&&last&&!matchMedia('(prefers-reduced-motion: reduce)').matches)list.children[done-1].animate([{opacity:.4},{opacity:1}],{duration:400});previous=total;
 }
 root.querySelector('[data-result]').addEventListener('close',()=>{panel.querySelector('.guide-feedback').textContent=en?'To begin another journey, choose a word below.':'Para comenzar otro recorrido, elige una palabra abajo.';});
 function reveal(){const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;panel.scrollIntoView({block:'start',behavior:reduced?'instant':'smooth'});}
 return {update,reveal};
}
