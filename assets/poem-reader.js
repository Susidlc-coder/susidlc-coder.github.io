/* Reading language and comparison mode are local to this dialog.
 * Original and translated paragraphs are displayed verbatim, never modified. */
export function createPoemReader({root,pages,originals,translations,lang}){
  const q=s=>root.querySelector(s),dialog=q('[data-reading]'),body=q('[data-reading-body]');
  const messages={en:{group:'Reading language',original:'Original in Spanish',translation:'English translation',parallel:'Side by side',readEn:'Read in English',readEs:'Read in Spanish',source:'Author: ',publication:'View original publication'},es:{group:'Idioma de lectura',original:'Original en español',translation:'Traducción al inglés',parallel:'En paralelo',readEn:'Leer en inglés',readEs:'Leer en español',source:'Autor: ',publication:'Ver publicación original'}};
  let labels=messages[lang]||messages.es;
  const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
  let readingLang=lang==='en'?'en':'es',index=0,parallel=false;
  const controls=make('div','sp-reading-controls'),languageStack=make('div','sp-reading-language-stack');
  const toolbar=make('div','sp-reading-languages');toolbar.setAttribute('role','group');toolbar.setAttribute('aria-label',labels.group);const languageLabel=make('span','sp-reading-language-label',labels.group);toolbar.append(languageLabel);
  const buttons=['en','es'].map(code=>{const b=make('button','',code.toUpperCase());b.type='button';b.setAttribute('data-reading-language',code);b.lang=readingLang;b.setAttribute('aria-label',code==='en'?labels.readEn:labels.readEs);b.addEventListener('click',()=>{readingLang=code;render();});toolbar.append(b);return b;});
  const note=make('p','sp-reading-version');note.setAttribute('aria-live','polite');
  const compare=make('button','sp-reading-compare',labels.parallel);compare.type='button';compare.setAttribute('aria-pressed','false');
  if(!body.id)body.id='sp-reading-content';compare.setAttribute('aria-controls',body.id);
  compare.addEventListener('click',()=>{parallel=!parallel;render();});
  languageStack.append(toolbar,note);controls.append(languageStack,compare);body.before(controls);
  function versionName(code){return code==='es'?labels.original:labels.translation;}
  function paragraphs(code){return code==='es'?originals[index].paragraphs:translations[index].paragraphs;}
  function column(code){
    const section=make('section','sp-reading-column');section.lang=code;
    const heading=make('h3','sp-reading-column-title',versionName(code));heading.lang=readingLang;heading.id=body.id+'-'+code+'-title';section.setAttribute('aria-labelledby',heading.id);
    section.append(heading,...paragraphs(code).map(text=>make('p','',text)));return section;
  }
  function render(){
    const poem=originals[index];labels=messages[readingLang];body.lang=readingLang;
    toolbar.lang=readingLang;toolbar.setAttribute('aria-label',labels.group);languageLabel.textContent=labels.group;note.lang=readingLang;compare.lang=readingLang;compare.textContent=labels.parallel;
    dialog.setAttribute('data-reading-parallel',String(parallel));body.classList.toggle('sp-reading-parallel',parallel);
    if(parallel)body.replaceChildren(column(readingLang),column(readingLang==='en'?'es':'en'));
    else body.replaceChildren(...paragraphs(readingLang).map(text=>make('p','',text)));
    note.textContent=labels.original+(readingLang==='en'?' · '+labels.translation:'');
    buttons.forEach(b=>{const code=b.getAttribute('data-reading-language');b.lang=readingLang;b.setAttribute('aria-pressed',String(code===readingLang));b.setAttribute('aria-label',code==='en'?labels.readEn:labels.readEs);});compare.setAttribute('aria-pressed',String(parallel));
    const source=q('[data-reading-source]');source.lang=readingLang;
    source.replaceChildren(document.createTextNode(labels.source+'Susi de León Campo - '));
    const link=make('a','',labels.publication);link.href=pages[index].url;link.target='_blank';link.rel='noopener noreferrer';source.append(link);
  }
  function open(value){index=Number.isInteger(value)&&value>=0&&value<pages.length?value:0;q('[data-reading-title]').textContent=pages[index].title;q('[data-reading-title]').lang='es';render();dialog.showModal();dialog.scrollTop=0;}
  return {open};
}
