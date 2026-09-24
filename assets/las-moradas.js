'use strict';
(() => {
  const toolbar = document.querySelector('.reading-tools');
  if (!toolbar) return;
  const columns = [...document.querySelectorAll('.reading-columns')];
  const buttons = [...toolbar.querySelectorAll('[data-reading]')];
  const mobile = matchMedia('(max-width:720px)');
  let chosen = false;
  function setMode(mode, keepPosition = false) {
    const toolbarBottom = toolbar.getBoundingClientRect().bottom;
    const current = columns.find(column => {
      const rect = column.getBoundingClientRect();
      return rect.top < toolbarBottom && rect.bottom > toolbarBottom;
    });
    const rect = current?.getBoundingClientRect();
    const progress = rect ? Math.max(0, (toolbarBottom - rect.top) / rect.height) : 0;
    columns.forEach(column => {
      column.dataset.mode = mode;
      column.querySelectorAll('[data-version]').forEach(text => {
        text.hidden = mode !== 'ambos' && text.dataset.version !== mode;
      });
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.reading === mode)));
    if (keepPosition && current && progress > 0) {
      const updated = current.getBoundingClientRect();
      window.scrollBy({ top: updated.top + progress * updated.height - toolbarBottom, behavior: 'instant' });
    }
  }
  toolbar.hidden = false;
  setMode(mobile.matches ? 'adaptado' : 'ambos');
  buttons.forEach(button => button.addEventListener('click', () => {
    chosen = true;
    setMode(button.dataset.reading, true);
  }));
  mobile.addEventListener('change', () => {
    if (!chosen) setMode(mobile.matches ? 'adaptado' : 'ambos', true);
  });

  // Only verified URLs entered in this separate map enable remote thumbnails.
  // No iframe or YouTube script is requested before the reader clicks.
  const videos = window.LAS_MORADAS_VIDEOS || {};
  function videoId(value) {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:') return null;
      let id;
      if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
      else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)) {
        id = url.pathname === '/watch' ? url.searchParams.get('v') : /^\/(?:shorts|embed)\/([^/]+)$/.exec(url.pathname)?.[1];
      }
      return /^[a-zA-Z0-9_-]{11}$/.test(id || '') ? id : null;
    } catch { return null; }
  }
  document.querySelectorAll('[data-video-key]').forEach(figure => {
    const id = videoId(videos[figure.dataset.videoKey]);
    if (!id) return;
    const caption = figure.querySelector('figcaption').textContent;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'youtube-play';
    button.setAttribute('aria-label', 'Reproducir ' + caption);
    const thumbnail = document.createElement('img');
    thumbnail.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    thumbnail.alt = '';
    thumbnail.loading = 'lazy';
    thumbnail.decoding = 'async';
    const label = document.createElement('span');
    label.textContent = '▷ Reproducir video';
    button.append(thumbnail, label);
    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      iframe.title = caption;
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.tabIndex = 0;
      button.replaceWith(iframe);
      iframe.focus();
    }, { once: true });
    figure.querySelector('.youtube-placeholder').replaceWith(button);
  });
})();
