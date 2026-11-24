(()=>{
'use strict';
const localeEnglish=window.SusiLocale?.lang==='en';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const light = document.querySelector('.light-toggle');
function setMenu(open) {
 menu?.setAttribute('aria-expanded', String(open));
 nav?.classList.toggle('is-open', open);
 if (menu) menu.textContent = open ? (localeEnglish ? 'Close' : 'Cerrar') : (localeEnglish ? 'Menu' : 'Menú');
}
function closeMenu() { setMenu(false); }
menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
closeMenu();
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
nav?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
matchMedia('(min-width:721px)').addEventListener('change', closeMenu);
function setLight(evening) {
 document.body.classList.toggle('evening', evening);
 light?.setAttribute('aria-pressed', String(evening));
 light?.setAttribute('aria-label', evening ? (localeEnglish?'Switch to daylight':'Cambiar a luz de día') : (localeEnglish?'Switch to lamplight':'Cambiar a luz de lámpara'));
 const label = document.querySelector('[data-light-label]');
 if (label) label.textContent = evening ? (localeEnglish?'Lamplight':'Luz de lámpara') : (localeEnglish?'Daylight':'Luz de día');
}
try { setLight(localStorage.getItem('susidlc-light') !== 'day'); } catch { setLight(true); }
light?.addEventListener('click', () => { const evening = !document.body.classList.contains('evening'); setLight(evening); try { localStorage.setItem('susidlc-light', evening ? 'evening' : 'day'); } catch {} });
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
 const original = button.dataset.filter === 'original';
 document.querySelector('#original-gallery').hidden = !original;
 document.querySelector('#ai-gallery').hidden = original;
 document.querySelectorAll('[data-filter]').forEach(el => { const selected = el === button; el.classList.toggle('active', selected); el.setAttribute('aria-pressed', String(selected)); });
}));
const dialog = document.querySelector('#art-dialog');
const art = {
 original: { src: '/assets/doll-original.webp', title: localeEnglish?'The red doll':'La muñeca roja', description: localeEnglish?'Original artwork by Susidlc. The character at the heart of this world.':'Obra original de Susidlc. El personaje en el corazón de este espacio.' },
 detail: { src: '/assets/doll-detail.webp', title: localeEnglish?'A closer look':'Una mirada más cercana', description: localeEnglish?'A detail of the same original painting. Red hair, quiet eyes, a world of her own.':'Un detalle de la misma pintura original. Cabello rojo, ojos serenos y un mundo propio.' }
};
document.querySelectorAll('[data-art]').forEach(button => button.addEventListener('click', () => {
 const item = art[button.dataset.art]; if (!item || !dialog) return;
 const image = dialog.querySelector('img'); image.src = item.src; image.alt = item.description;
 dialog.querySelector('h2').textContent = item.title; dialog.querySelector('p').textContent = item.description;
 dialog.showModal();
}));
dialog?.querySelector('.close-dialog')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); });
const content = window.SUSIDLC_CONTENT || {};
function safeUrl(value) { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; } }
function externalLink(title, url, className = 'quiet-link') { const a = document.createElement('a'); a.href = url; a.className = className; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = title + ' ↗'; return a; }
const projects = document.querySelector('#music-projects');
if (projects) {
 const entries = (content.musicProjects || []).filter(p => p.title && safeUrl(p.url));
 if (entries.length) { projects.replaceChildren(); entries.forEach((p, index) => {
  const a = externalLink('', safeUrl(p.url), 'record-link record-' + index % 4); a.textContent = ''; a.setAttribute('aria-label', 'Listen to ' + p.title + ' on Spotify');
  const sleeve = document.createElement('div'); sleeve.className = 'album-sleeve';
  const name = document.createElement('span'); name.className = 'album-brand'; name.textContent = 'SUSIDLC / MUSIC';
  const number = document.createElement('span'); number.className = 'album-number'; number.textContent = p.number || String(index + 1).padStart(2, '0');
  const type = document.createElement('span'); type.className = 'album-type'; type.textContent = p.category || 'ALBUM'; sleeve.append(name, number, type);
  const caption = document.createElement('div'); caption.className = 'album-caption'; const title = document.createElement('h2'); title.textContent = p.title;
  const arrow = document.createElement('span'); arrow.textContent = 'Listen ↗'; caption.append(title, arrow); a.append(sleeve, caption); projects.append(a);
 }); }
}
const spotify = document.querySelector('main a[href*="open.spotify.com/artist/"]');
if (spotify && safeUrl(content.spotifyUrl)) spotify.href = safeUrl(content.spotifyUrl);
const youtube = document.querySelector('#music-youtube');
if (youtube && safeUrl(content.musicYoutubeUrl)) youtube.href = safeUrl(content.musicYoutubeUrl);
if (typeof content.contactEmail === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.contactEmail)) {
 document.querySelectorAll('a.contact-link[href^="mailto:"]').forEach(a => { a.href = 'mailto:' + content.contactEmail; if (a.classList.contains('contact-link')) a.textContent = content.contactEmail + ' ↗'; });
}
const bread = document.querySelector('#daily-bread');
if (bread) { const links = (content.dailyBreadLinks || []).filter(l => l.title && safeUrl(l.url)); if (links.length) bread.replaceChildren(...links.map(l => externalLink(l.title, safeUrl(l.url)))); }
const faith = document.querySelector('#faith-links');
if (faith) { const links = (content.moradas || []).filter(l => l.title && safeUrl(l.url) && ['youtube.com','www.youtube.com','youtu.be','m.youtube.com'].includes(new URL(l.url).hostname)); if (links.length) faith.replaceChildren(...links.map(l => externalLink(l.title, safeUrl(l.url)))); }

})();

// Older published reading pages keep their original document and load the shared footer.
if (document.querySelector('footer.editorial-footer') && !document.querySelector('#site-footer')) {
 const footers = {"en": "<footer class=\"world-footer\" id=\"site-footer\">\n  <div class=\"world-footer-inner\">\n    <div class=\"world-footer-main\">\n      <a class=\"world-footer-brand\" href=\"/en/\" aria-label=\"Susidlc World, home\">susidlc <em>world.</em></a>\n      <div class=\"world-footer-destinations\" role=\"navigation\" aria-label=\"Footer\">\n        <div><a href=\"/en/music.html\">Music</a><a class=\"world-instagram\" href=\"https://www.instagram.com/susidlc/\" aria-label=\"Instagram @susidlc\"><svg aria-hidden=\"true\" width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.3\" cy=\"6.8\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg>@susidlc</a></div>\n        <span aria-hidden=\"true\">|</span>\n        <div><a href=\"/en/pan-de-cada-dia/\">Pan de Cada Día</a><a class=\"world-instagram\" href=\"https://www.instagram.com/pandecadadia95/\" aria-label=\"Instagram @pandecadadia95\"><svg aria-hidden=\"true\" width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.3\" cy=\"6.8\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg>@pandecadadia95</a></div>\n      </div>\n      <div class=\"world-footer-contact\">\n        <span>Contact</span>\n        <a href=\"mailto:me@susidlc.com\">me@susidlc.com</a>\n      </div>\n    </div>\n    <div class=\"world-footer-baseline\"><span>© 2026 Susidlc</span><a href=\"#top\">Back to top <span aria-hidden=\"true\">↑</span></a></div>\n  </div>\n</footer>", "es": "<footer class=\"world-footer\" id=\"site-footer\">\n  <div class=\"world-footer-inner\">\n    <div class=\"world-footer-main\">\n      <a class=\"world-footer-brand\" href=\"/es/\" aria-label=\"Susidlc World, inicio\">susidlc <em>world.</em></a>\n      <div class=\"world-footer-destinations\" role=\"navigation\" aria-label=\"Pie de página\">\n        <div><a href=\"/es/music.html\">Música</a><a class=\"world-instagram\" href=\"https://www.instagram.com/susidlc/\" aria-label=\"Instagram @susidlc\"><svg aria-hidden=\"true\" width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.3\" cy=\"6.8\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg>@susidlc</a></div>\n        <span aria-hidden=\"true\">|</span>\n        <div><a href=\"/es/pan-de-cada-dia/\">Pan de Cada Día</a><a class=\"world-instagram\" href=\"https://www.instagram.com/pandecadadia95/\" aria-label=\"Instagram @pandecadadia95\"><svg aria-hidden=\"true\" width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.3\" cy=\"6.8\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg>@pandecadadia95</a></div>\n      </div>\n      <div class=\"world-footer-contact\">\n        <span>Contacto</span>\n        <a href=\"mailto:me@susidlc.com\">me@susidlc.com</a>\n      </div>\n    </div>\n    <div class=\"world-footer-baseline\"><span>© 2026 Susidlc</span><a href=\"#top\">Volver arriba <span aria-hidden=\"true\">↑</span></a></div>\n  </div>\n</footer>"};
 document.querySelector('footer.editorial-footer').outerHTML = footers[document.documentElement.lang === 'en' ? 'en' : 'es'];
 document.head.insertAdjacentHTML('beforeend', "<link rel=\"stylesheet\" href=\"/assets/world-footer.css?v=3\">");
}

// Give collection and section returns the same label and treatment across the site.
(() => {
 const main = document.querySelector('main');
 const path = location.pathname.replace(/^\/(es|en)(?=\/)/,'').replace(/index\.html$/, '');
 if (!main || path === '/' || /^\/quiz\/?$/.test(path) || main.querySelector('.site-return')) return;
 const en = document.documentElement.lang === 'en';
 const home = en ? '/en/' : '/es/';
 const back = en ? 'Back to ' : 'Volver a ';
 let href = home;
 let label = en ? 'Back to home' : 'Volver al inicio';
 let selector;
 const chapter = main.querySelector('.reader-back');
 if (chapter) {
   selector = '.reader-back';
   href = chapter.getAttribute('href');
   label = en ? 'Back to contents' : 'Volver al índice';
 } else if (main.querySelector('.back-link,.album-breadcrumb')) {
   selector = '.back-link,.album-return,.album-breadcrumb';
   href = home+'music.html#collection-title';
   label = en ? 'Browse all albums' : 'Ver todos los álbumes';
 } else if (main.querySelector('.m-atlas-back')) {
   selector = '.m-atlas-back,.m-atlas-return';
   href = home+'morpheus/#world-index';
   label = en ? 'Back to Atlas' : 'Volver al Atlas';
 } else if (main.querySelector('.advent-breadcrumb,.breadcrumbs,#game-root')) {
   selector = '.advent-breadcrumb a,.breadcrumbs a';
   href = home+'pan-de-cada-dia/';
   label = back+'Pan de Cada Día';
 } else if (path.endsWith('/recorrido.html')) {
   main.querySelector('.sp-nav-group a.sp-text-button')?.remove();
   href = home+'poemas/';
   label = back+(en?'Poems':'Poemas');
 }
 const sheet = document.createElement('link');
 sheet.rel = 'stylesheet';
 sheet.href = '/assets/return-navigation.css?v=1';
 document.head.append(sheet);
 const links = selector ? [...main.querySelectorAll(selector)] : [];
 if (!selector) {
   const row = document.createElement('div');
   row.className = 'site-return-row'+(['/music.html','/poemas/','/poemas/recorrido.html'].includes(path)?' inset':'');
   const link = document.createElement('a');
   row.append(link);
   if (path.endsWith('/recorrido.html')) document.querySelector('header').after(row);
   else main.prepend(row);
   links.push(link);
 }
 for (const link of links) {
   link.classList.add('site-return');
   link.href = href;
   link.textContent = '← '+label;
 }
})();
