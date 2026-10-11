// Disclosure navigation changes the view, never the visitor's journey.
const installed=new WeakSet();
export function prepareResultNavigation(dialog){
 const panels=[...dialog.querySelectorAll('.sp-result-disclosure')];
 const bar=dialog.querySelector('[data-result-navigation]');
 const menu=dialog.querySelector('[data-recommendation-menu]');
 const icons=[...dialog.querySelectorAll('[data-mobile-open-recommendation]')];
 const titles=[...dialog.querySelectorAll('[data-title-open-recommendation]')];
 const back=dialog.querySelector('[data-mobile-result-back]');
 const footerBack=dialog.querySelector('[data-result-footer-back]');
 const restart=dialog.querySelector('[data-continue-quiz]');
 const mobile=window.matchMedia('(max-width:640px)');
 const update=()=>{
  const active=panels.findIndex(p=>p.open);
  bar.hidden=active<0;back.hidden=true;
  footerBack.hidden=active<0;restart.hidden=active>=0;
  icons.forEach((b,i)=>b.setAttribute('aria-expanded',String(i===active)));
  titles.forEach((b,i)=>b.setAttribute('aria-expanded',String(i===active)));
  if(active>=0){const heading=panels[active].closest('.sp-result-option').querySelector('.sp-result-option-heading');if(bar.parentElement!==heading)heading.append(bar);}
  bar.querySelectorAll('[data-open-recommendation]').forEach(b=>{b.hidden=Number(b.dataset.openRecommendation)===active;});
  if(active<0)menu.open=false;
 };
 if(!installed.has(dialog)){
  bar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-label',b.textContent.trim()));
  const collapse=()=>{
   const index=panels.findIndex(p=>p.open);panels.forEach(p=>p.open=false);menu.open=false;update();
   (mobile.matches?icons[index]:panels[index]?.querySelector('summary'))?.focus({preventScroll:true});
  };
  const open=index=>{
   panels.forEach((p,i)=>p.open=i===index);menu.open=false;update();
   const title=panels[index].closest('.sp-result-option').querySelector('h3');title.tabIndex=-1;title.focus({preventScroll:true});
   if(mobile.matches)dialog.scrollTop=0;
  };
  back.addEventListener('click',collapse);
  footerBack.addEventListener('click',collapse);
  icons.forEach((b,i)=>b.addEventListener('click',()=>open(i)));
  titles.forEach((b,i)=>b.addEventListener('click',()=>open(i)));
  bar.querySelectorAll('[data-collapse-recommendations]').forEach(b=>b.addEventListener('click',collapse));
  bar.querySelectorAll('[data-open-recommendation]').forEach(b=>b.addEventListener('click',()=>open(Number(b.dataset.openRecommendation))));
  panels.forEach(p=>p.addEventListener('toggle',update));
  dialog.addEventListener('click',e=>{if(!menu.contains(e.target))menu.open=false;});
  menu.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){e.preventDefault();e.stopPropagation();menu.open=false;menu.querySelector('summary').focus();}});
  installed.add(dialog);
 }
 menu.open=false;update();
}
