'use strict';
// The catalog is rendered in HTML. This only manages disclosure and direct links.
(() => {
  const tracks = [...document.querySelectorAll('.track')];
  if (!tracks.length) return;
  const controls = tracks.map(track => ({
    track,
    button: track.querySelector('.track-toggle'),
    panel: track.querySelector('.track-panel')
  }));
  function show(selected, scroll = false) {
    controls.forEach(({track, button, panel}) => {
      const open = track === selected;
      button.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
      if (!open) panel.querySelectorAll('details[open]').forEach(lyrics => { lyrics.open = false; });
    });
    if (scroll && selected) selected.scrollIntoView({block: 'start', behavior: 'instant'});
  }
  function fromHash(scroll = false) {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const selected = tracks.find(track => track.id === id);
    if (selected) show(selected, scroll);
    else if (!id) show(null);
  }
  show(null);
  fromHash();
  controls.forEach(({track, button}) => {
    button.addEventListener('click', () => {
      const opening = button.getAttribute('aria-expanded') !== 'true';
      show(opening ? track : null);
      const url = new URL(location.href);
      url.hash = opening ? track.id : '';
      history.replaceState(null, '', url);
    });
  });
  window.addEventListener('hashchange', () => fromHash(true));
  // The primary image has fixed dimensions, so hashes stay stable as images load.
  if (location.hash) window.addEventListener('load', () => fromHash(true), {once: true});
})();

// Reorder existing cards without fetching or replacing album content.
(() => {
  const select = document.querySelector('#album-sort');
  const collection = document.querySelector('.album-collection');
  if (!select || !collection) return;
  const recent = [...collection.querySelectorAll('.album-card')];
  const byName = [...recent].sort((a, b) => a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent));
  select.value = 'recent';
  select.closest('label').hidden = false;
  select.addEventListener('change', () => {
    collection.append(...(select.value === 'name' ? byName : recent));
  });
})();
