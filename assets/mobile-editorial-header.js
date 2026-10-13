(()=>{
 const header=document.querySelector('#susi-poems .sp-header');if(!header)return;
 const menu=header.querySelector('[data-menu-toggle]'),nav=header.querySelector('[data-site-nav]'),utilities=header.querySelector('.header-utilities'),light=header.querySelector('.light-toggle');
 const mobile=matchMedia('(max-width:669px)'),spanish=document.documentElement.lang!=='en';
 const label=()=>menu.setAttribute('aria-label',menu.getAttribute('aria-expanded')==='true'?(spanish?'Cerrar menú':'Close menu'):(spanish?'Abrir menú':'Open menu'));
 const layout=()=>{if(light)(mobile.matches?nav:utilities).append(light);label();};
 new MutationObserver(label).observe(menu,{attributes:true,attributeFilter:['aria-expanded']});mobile.addEventListener('change',layout);layout();
})();
