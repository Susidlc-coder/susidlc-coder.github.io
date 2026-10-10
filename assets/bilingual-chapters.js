(() => {
  'use strict';
  const reading = document.querySelector('[data-reading-mode]');
  if (!reading) return;
  const modes = ['adaptado', 'original', 'ambos'];
  const buttons = [...document.querySelectorAll('[data-reader-mode]')];
  const storageKey = 'susidlc-bilingual-reading-mode';
  function setMode(mode) {
    if (!modes.includes(mode)) mode = 'adaptado';
    reading.dataset.readingMode = mode;
    reading.querySelectorAll('[data-version]').forEach(column => {
      column.hidden = mode !== 'ambos' && column.dataset.version !== mode;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.readerMode === mode)));
    try { localStorage.setItem(storageKey, mode); } catch {}
  }
  let initialMode = 'adaptado';
  try { initialMode = localStorage.getItem(storageKey) || initialMode; } catch {}
  setMode(initialMode);
  buttons.forEach(button => button.addEventListener('click', () => setMode(button.dataset.readerMode)));
  document.querySelectorAll('[data-reader-video]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.readerVideo;
      if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = button.getAttribute('aria-label');
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.tabIndex = 0;
      button.replaceWith(iframe);
      iframe.focus();
    }, {once:true});
  });
})();
