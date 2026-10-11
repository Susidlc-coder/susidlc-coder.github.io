/* Persist a copy variant per browser. No analytics or test-state changes. */
(()=>{
 const key='susidlc-poems-instruction-v1';let variant;
 try{variant=localStorage.getItem(key);}catch{}
 if(variant!=='A'&&variant!=='B'){
  variant=Math.random()<.5?'A':'B';
  try{localStorage.setItem(key,variant);}catch{try{variant=sessionStorage.getItem(key)||variant;sessionStorage.setItem(key,variant);}catch{}}
 }
 const copy={es:{A:'Elige una palabra en cada pantalla para avanzar. Después de siete elecciones, descubre la canción que conecta con tu recorrido.',B:'¿Qué palabras conectan contigo hoy? Elige una en cada pantalla. Al completar siete elecciones, descubre tu recomendación musical.'},en:{A:'Choose one word on each screen to move forward. After seven choices, discover the song that connects with your journey.',B:'Which words resonate with you today? Choose one on each screen. After seven choices, discover your musical recommendation.'}};
 document.documentElement.dataset.instructionVariant=variant;
 document.addEventListener('DOMContentLoaded',()=>{const text=document.querySelector('[data-instruction]');if(text)text.textContent=copy[document.documentElement.lang==='en'?'en':'es'][variant];
 const intro=document.querySelector('.gateway-copy');
 const reveal=()=>{if(intro)intro.classList.add('instruction-reveal');};
 const languageDialog=document.querySelector('[data-language-dialog][open]');
 if(languageDialog)languageDialog.addEventListener('close',reveal,{once:true});else reveal();
},{once:true});
})();
