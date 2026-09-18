'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const light = document.querySelector('.light-toggle');
function closeMenu() { menu?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('is-open'); }
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
nav?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
matchMedia('(min-width:721px)').addEventListener('change', closeMenu);
function setLight(evening) {
 document.body.classList.toggle('evening', evening);
 light?.setAttribute('aria-pressed', String(evening));
 light?.setAttribute('aria-label', evening ? 'Switch to daylight' : 'Switch to evening light');
 const label = document.querySelector('[data-light-label]');
 if (label) label.textContent = evening ? 'Lamplight' : 'Daylight';
}
try { setLight(localStorage.getItem('susidlc-light') === 'evening'); } catch { setLight(false); }
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
 original: { src: 'assets/doll-original.webp', title: 'The red doll', description: 'Original artwork by Susidlc. The character at the heart of this world.' },
 detail: { src: 'assets/doll-detail.webp', title: 'A closer look', description: 'A detail of the same original painting. Red hair, quiet eyes, a world of her own.' }
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
const spotify = document.querySelector('a[href*="open.spotify.com/artist/"]');
if (spotify && safeUrl(content.spotifyUrl)) spotify.href = safeUrl(content.spotifyUrl);
const youtube = document.querySelector('#music-youtube');
if (youtube && safeUrl(content.musicYoutubeUrl)) youtube.href = safeUrl(content.musicYoutubeUrl);
if (typeof content.contactEmail === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.contactEmail)) {
 document.querySelectorAll('a[href^="mailto:"]').forEach(a => { a.href = 'mailto:' + content.contactEmail; if (a.classList.contains('contact-link')) a.textContent = content.contactEmail + ' ↗'; });
}
const bread = document.querySelector('#daily-bread');
if (bread) { const links = (content.dailyBreadLinks || []).filter(l => l.title && safeUrl(l.url)); if (links.length) bread.replaceChildren(...links.map(l => externalLink(l.title, safeUrl(l.url)))); }
const faith = document.querySelector('#faith-links');
if (faith) { const links = (content.moradas || []).filter(l => l.title && safeUrl(l.url) && ['youtube.com','www.youtube.com','youtu.be','m.youtube.com'].includes(new URL(l.url).hostname)); if (links.length) faith.replaceChildren(...links.map(l => externalLink(l.title, safeUrl(l.url)))); }
