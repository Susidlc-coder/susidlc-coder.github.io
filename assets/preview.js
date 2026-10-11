(() => {
  'use strict';
  const paths = {
    reference: {home:'/referencia/',poems:'/referencia/poemas/',journey:'/referencia/poemas/',music:'/referencia/music.html',pan:'/referencia/pan-de-cada-dia/',album:'/referencia/music/sdlc-10/',chapter:'/referencia/pan-de-cada-dia/las-moradas/primera-morada/capitulo-1/',video:'/referencia/pan-de-cada-dia/las-moradas/septima-morada/capitulo-1/'},
    previous: {home:'/propuesta-anterior/',poems:'/propuesta-anterior/poemas.html',journey:'/propuesta-anterior/recorrido.html',music:'/propuesta-anterior/music.html',pan:'/propuesta-anterior/pan.html',album:'/propuesta-anterior/album-sdlc-10.html',chapter:'/propuesta-anterior/reader-1-1.html',video:'/propuesta-anterior/reader-7-1.html'},
    integrated: {home:'/',poems:'/poemas/',journey:'/poemas/recorrido.html',music:'/music.html',pan:'/pan-de-cada-dia/',album:'/music/sdlc-10/',chapter:'/pan-de-cada-dia/las-moradas/primera-morada/capitulo-1/',video:'/pan-de-cada-dia/las-moradas/septima-morada/capitulo-1/'}
  };
  const labels={reference:'Publicado · copia local',previous:'Propuesta anterior',integrated:'Integración bilingüe'};
  const frame=document.querySelector('#review-frame');
  const section=document.querySelector('#review-section');
  const open=document.querySelector('#review-open');
  const status=document.querySelector('#review-status');
  const languagePreview=document.querySelector('#review-language');
  let version='integrated';
  let size='desktop';
  function announce(){
    languagePreview.hidden=version!=='integrated';
    status.textContent=version==='reference' && section.value==='poems'
      ? 'Publicado · copia local. La versión publicada entra directamente al recorrido; no tiene landing.'
      : labels[version]+'. El sitio publicado no ha cambiado.';
    frame.title=labels[version]+' · '+section.selectedOptions[0].textContent;
  }
  function updateUrl(){
    const url=new URL(location.href);
    url.searchParams.set('version',version);url.searchParams.set('section',section.value);url.searchParams.set('size',size);
    history.replaceState(null,'',url);
  }
  function navigate(){frame.src=paths[version][section.value];open.href=frame.src;announce();updateUrl();}
  function setSize(value){
    size=value;document.body.dataset.size=size;
    document.querySelectorAll('button[data-size]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.size===size)));
    document.querySelector('#review-dimensions').textContent=size==='mobile'?'Móvil · 390 px · se adapta si la ventana es menor':'Escritorio adaptable';
  }
  document.querySelectorAll('[data-version]').forEach(button=>button.addEventListener('click',()=>{
    version=button.dataset.version;
    document.querySelectorAll('[data-version]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    navigate();
  }));
  document.querySelectorAll('button[data-size]').forEach(button=>button.addEventListener('click',()=>{setSize(button.dataset.size);updateUrl();}));
  section.addEventListener('change',navigate);
  frame.addEventListener('load',()=>{
    try {
      const url=new URL(frame.contentWindow.location.href);
      if(url.origin===location.origin){
        open.href=url.href;
        const current=url.pathname;
        const base=version==='reference'?'/referencia':version==='previous'?'/propuesta-anterior':'';
        const relative=current.slice(base.length).replace(/^\/(es|en)(?=\/|$)/,'');
        let found=null;
        if(relative==='/' || relative==='/index.html')found='home';
        else if(relative.includes('recorrido.html'))found='journey';
        else if(relative.startsWith('/poemas'))found=version==='reference' && section.value==='journey'?'journey':'poems';
        else if(relative.startsWith('/music/') || relative.startsWith('/album-'))found='album';
        else if(relative==='/music.html')found='music';
        else if(relative.includes('/septima-morada/capitulo-1') || relative.includes('reader-7-1'))found='video';
        else if(relative.includes('/capitulo-') || relative.includes('/reader-'))found='chapter';
        else if(relative.startsWith('/pan') || relative.startsWith('/reader-'))found='pan';
        if(found){section.value=found;announce();updateUrl();}
      }
    }catch{/* External destinations, if explicitly opened by the visitor, remain external. */}
  });
  open.addEventListener('click',()=>{try{open.href=frame.contentWindow.location.href;}catch{}});
  languagePreview.addEventListener('click',()=>{try{frame.contentWindow.SusiLocale?.openChooser();}catch{}});
  const query=new URLSearchParams(location.search);
  if(paths[query.get('version')])version=query.get('version');
  if(Object.hasOwn(paths.integrated,query.get('section')))section.value=query.get('section');
  document.querySelectorAll('[data-version]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.version===version)));
  setSize(query.get('size')==='mobile'?'mobile':'desktop');
  navigate();
})();
