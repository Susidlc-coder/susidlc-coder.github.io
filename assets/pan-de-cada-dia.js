'use strict';
// Keep shared lighting behavior while localizing only Spanish section pages.
if (document.documentElement.lang === 'es') {
  const toggle = document.querySelector('.light-toggle');
  const localizeLight = () => {
    const evening = document.body.classList.contains('evening');
    toggle?.setAttribute('aria-label', evening ? 'Cambiar a luz de día' : 'Cambiar a luz nocturna');
    const label = document.querySelector('[data-light-label]');
    if (label) label.textContent = evening ? 'Luz nocturna' : 'Luz de día';
  };
  localizeLight();
  toggle?.addEventListener('click', localizeLight);
}
