/* Reading language and comparison mode are local to this dialog.
 * Original and translated paragraphs are displayed verbatim, never modified. */
export function createPoemReader({root,pages,originals,translations,lang,songs=[]}){
  const q=s=>root.querySelector(s),dialog=q('[data-reading]'),body=q('[data-reading-body]');
  const messages={en:{group:'Reading language',original:'Original in Spanish',translation:'English translation',parallel:'Side by side',readEn:'Read in English',readEs:'Read in Spanish',source:'Author: ',publication:'View original publication'},es:{group:'Idioma de lectura',original:'Original en español',translation:'Traducción al inglés',parallel:'En paralelo',readEn:'Leer en inglés',readEs:'Leer en español',source:'Autor: ',publication:'Ver publicación original'}};
  let labels=messages[lang]||messages.es;
  const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
  let readingLang=lang==='en'?'en':'es',index=0,parallel=false;
  const compactReading=matchMedia('(max-width:720px)');
  const controls=make('div','sp-reading-controls'),languageStack=make('div','sp-reading-language-stack');
  const toolbar=make('div','sp-reading-languages');toolbar.setAttribute('role','group');toolbar.setAttribute('aria-label',labels.group);
  const buttons=['en','es'].map(code=>{const b=make('button','',code.toUpperCase());b.type='button';b.setAttribute('data-reading-language',code);b.lang=readingLang;b.setAttribute('aria-label',code==='en'?labels.readEn:labels.readEs);b.addEventListener('click',()=>{readingLang=code;render();});toolbar.append(b);return b;});
  const note=make('span','sp-reading-version');note.setAttribute('aria-hidden','true');buttons.find(b=>b.getAttribute('data-reading-language')==='es').append(note);
  const compare=make('button','sp-reading-compare',labels.parallel);compare.type='button';compare.setAttribute('aria-pressed','false');
  if(!body.id)body.id='sp-reading-content';compare.setAttribute('aria-controls',body.id);
  compare.addEventListener('click',()=>{if(compactReading.matches)return;parallel=!parallel;render();});
  compactReading.addEventListener('change',()=>{const hadFocus=document.activeElement===compare;if(compactReading.matches)parallel=false;render();if(hadFocus&&compactReading.matches)buttons.find(b=>b.getAttribute('data-reading-language')===readingLang).focus();});
  const music=make('div','sp-reading-music');
  const musicIcon=make('span','sp-reading-music-icon');musicIcon.setAttribute('aria-hidden','true');
  musicIcon.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V6l11-3v12M9 10l11-3"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="17" cy="15" rx="3" ry="2.5"/></svg>';
  const musicCopy=make('span','sp-reading-music-copy'),musicTitle=make('span','sp-reading-music-title'),musicAction=make('a','sp-reading-music-action');musicAction.target='_blank';musicAction.rel='noopener noreferrer';const musicLabel=make('span','sp-reading-music-label');musicCopy.append(musicLabel,musicTitle);musicAction.append(musicIcon);const actionText=make('span');musicAction.append(actionText);music.append(musicCopy,musicAction);
  const pairings=['Aurelillo','Crystal','Nebuú','Te Quiero','Dream 2','romA','Tortilla Song',"Sorrow'sDeep",'The Rebellion','I hate to love you','Green Tea','Aurel'];
  languageStack.append(toolbar);controls.append(music,compare,languageStack);body.before(controls);
  function versionName(code){return code==='es'?labels.original:labels.translation;}
  function paragraphs(code){return code==='es'?originals[index].paragraphs:translations[index].paragraphs;}
  function column(code){
    const section=make('section','sp-reading-column');section.lang=code;
    const heading=make('h3','sp-reading-column-title',versionName(code));heading.lang=readingLang;heading.id=body.id+'-'+code+'-title';section.setAttribute('aria-labelledby',heading.id);
    section.append(heading,...paragraphs(code).map(text=>make('p','',text)));return section;
  }
  function render(){
    if(compactReading.matches)parallel=false;
    compare.hidden=compactReading.matches;
    const poem=originals[index];labels=messages[readingLang];body.lang=readingLang;music.lang=readingLang;
    const song=songs.find(item=>item.title===pairings[index]);music.hidden=!song;
    if(song){musicTitle.textContent=song.title;musicLabel.textContent=readingLang==='es'?'Canción sugerida':'Suggested song';musicAction.href=song.listen;actionText.textContent=readingLang==='es'?'Escuchar':'Listen';musicAction.setAttribute('aria-label',(readingLang==='es'?'Escuchar ':'Listen to ')+song.title+(readingLang==='es'?' en Spotify (otra pestaña)':' on Spotify (new tab)'));}
    toolbar.lang=readingLang;toolbar.setAttribute('aria-label',labels.group);note.lang=readingLang;compare.lang=readingLang;compare.textContent=labels.parallel;
    dialog.setAttribute('data-reading-parallel',String(parallel));body.classList.toggle('sp-reading-parallel',parallel);
    if(parallel)body.replaceChildren(column(readingLang),column(readingLang==='en'?'es':'en'));
    else body.replaceChildren(...paragraphs(readingLang).map(text=>make('p','',text)));
    note.textContent=readingLang==='es'?'Original':'';note.hidden=readingLang!=='es';
    buttons.forEach(b=>{const code=b.getAttribute('data-reading-language');b.lang=readingLang;b.setAttribute('aria-pressed',String(code===readingLang));b.setAttribute('aria-label',code==='en'?labels.readEn:labels.readEs+' (original)');});compare.setAttribute('aria-pressed',String(parallel));
    const source=q('[data-reading-source]');source.lang=readingLang;
    source.replaceChildren(document.createTextNode(labels.source+'Susi de León Campo - '));
    const link=make('a','',labels.publication);link.href=pages[index].url;link.target='_blank';link.rel='noopener noreferrer';source.append(link);
  }
  function open(value){index=Number.isInteger(value)&&value>=0&&value<pages.length?value:0;q('[data-reading-title]').textContent=pages[index].title;q('[data-reading-title]').lang='es';render();dialog.showModal();dialog.scrollTop=0;}
  return {open};
}
