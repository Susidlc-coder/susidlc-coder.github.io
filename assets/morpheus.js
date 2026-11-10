(()=>{'use strict';
const english=document.documentElement.lang==='en';
const form=document.querySelector('.m-form');if(!form)return;
const art=form.elements.artwork,postal=form.elements.postal,message=form.elements.message,email=form.elements.email;
const valid=new Set([...form.querySelectorAll('datalist option')].map(o=>o.value));
function validate(){const values=art.value.trim().split(/[\s,;]+/).filter(Boolean);art.setCustomValidity(values.length&&values.every(v=>valid.has(v))?'':english?'Enter an artwork number shown in this world.':'Escribe un número de obra que aparezca en este mundo.');postal.setCustomValidity(postal.value.trim()?'':english?'Enter your postal code.':'Escribe tu código postal.');}
art.addEventListener('input',()=>art.setCustomValidity(''));postal.addEventListener('input',()=>postal.setCustomValidity(''));
form.addEventListener('submit',event=>{event.preventDefault();validate();if(!form.reportValidity())return;
const world=form.dataset.world,recipient=form.dataset.recipient;
const body=english?`Hello Susi,\n\nI'd like a quote for available merchandise.\n\nWorld: ${world}\nArtwork: ${art.value.trim()}\nEmail: ${email.value.trim()}\nPostal code: ${postal.value.trim()}\n\n${message.value.trim()}`:`Hola Susi,\n\nMe gustaría recibir una propuesta de merch disponible y precios.\n\nMundo: ${world}\nObra: ${art.value.trim()}\nEmail: ${email.value.trim()}\nCódigo postal: ${postal.value.trim()}\n\n${message.value.trim()}`;
const draft=form.querySelector('.m-draft');draft.hidden=false;draft.querySelector('textarea').value=body;
const link=form.querySelector('[data-send-draft]');link.href=`mailto:${recipient}?subject=${encodeURIComponent('Morpheus · '+world+' · '+art.value.trim())}&body=${encodeURIComponent(body)}`;
form.querySelector('.m-form-status').textContent=english?'Your message is ready. Open your email app to review and send it.':'Tu consulta está lista. Abre tu correo para revisarla y enviarla.';
draft.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});link.focus({preventScroll:true});
});
form.querySelector('[data-copy-draft]').addEventListener('click',async()=>{const area=form.querySelector('.m-draft textarea');try{await navigator.clipboard.writeText(area.value);form.querySelector('.m-form-status').textContent=english?'Copied. Paste it into an email to '+form.dataset.recipient:'Copiado. Pégalo en un correo a '+form.dataset.recipient;}catch{area.focus();area.select();form.querySelector('.m-form-status').textContent=english?'Select and copy the message below.':'Selecciona y copia el mensaje de abajo.';}});
})();
