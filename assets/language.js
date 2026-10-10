/* The URL controls the displayed language. Only a visitor's choice is remembered. */
(() => {
  'use strict';
  const key = 'susidlc-language';
  const fallbackParam = 'susi-language';
  const allowed = value => value === 'es' || value === 'en';
  const ignored = /^\/(assets|referencia|propuesta-anterior|estudio)(?:\/|$)|^\/preview\.html/;
  if (ignored.test(location.pathname)) return;
  const match = /^\/(es|en)(?:\/|$)/.exec(location.pathname);
  let preference = null;
  let useQueryFallback = false;
  try { const value = localStorage.getItem(key); if (allowed(value)) preference = value; } catch {}
  if (!preference) {
    try { const value = sessionStorage.getItem(key); if (allowed(value)) preference = value; } catch {}
  }
  if (!preference) {
    const value = new URL(location.href).searchParams.get(fallbackParam);
    if (allowed(value)) { preference = value; useQueryFallback = true; }
  }
  const lang = match?.[1] || preference || 'es';
  function localURL(value, language = lang) {
    const url = new URL(value, location.href);
    if (!/^https?:$/.test(url.protocol) || url.origin !== location.origin || ignored.test(url.pathname)) return url.href;
    const path = url.pathname.replace(/^\/(es|en)(?=\/|$)/, '') || '/';
    url.pathname = '/' + language + path;
    if (useQueryFallback && preference) url.searchParams.set(fallbackParam, preference);
    return url.href;
  }
  window.SusiLocale = {lang, url:localURL, refresh, openChooser};
  if (!match) {
    // Hide the unprefixed fallback links while moving to the temporary/default locale.
    // This redirect does not confirm or store a language preference.
    document.documentElement.hidden = true;
    location.replace(localURL(location.href));
    return;
  }
  document.documentElement.lang = lang;

  const flags = {
    es: '<svg viewBox="0 0 24 16" width="20" height="14" aria-hidden="true" focusable="false"><path fill="#AA151B" d="M0 0h24v16H0z"/><path fill="#F1BF00" d="M0 4h24v8H0z"/></svg>',
    en: '<svg viewBox="0 0 60 30" width="14" height="10" aria-hidden="true" focusable="false"><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" stroke-width="6" d="m0 0 60 30m0-30L0 30"/><path fill="#C8102E" d="M0 0h4l26 13v2zm30 15v2l26 13h4zM60 0v2L34 15h-4zM0 30v-2l26-13h4z"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#C8102E" stroke-width="6" d="M30 0v30M0 15h60"/></svg>'
  };
  function remember(language) {
    preference = language;
    useQueryFallback = true;
    try { localStorage.setItem(key, language); useQueryFallback = false; } catch {}
    // Session storage avoids repeated prompts if persistent storage is denied.
    try { sessionStorage.setItem(key, language); useQueryFallback = false; } catch {}
    const url = new URL(location.href);
    if (useQueryFallback) url.searchParams.set(fallbackParam, language);
    else if (url.searchParams.has(fallbackParam)) url.searchParams.delete(fallbackParam);
    if (url.href !== location.href) history.replaceState(history.state, '', url.href);
  }
  function refresh() {
    document.querySelectorAll('[data-switch-language]').forEach(link => {
      const target = link.dataset.switchLanguage;
      if (!allowed(target)) return;
      link.href = localURL(location.href, target);
      link.setAttribute('hreflang', target);
      link.setAttribute('lang', target);
      link.setAttribute('title', target === 'es' ? 'Español' : 'English');
      link.setAttribute('aria-label', target === 'es' ? (target === lang ? 'Español, idioma actual' : 'Ver esta página en español') : (target === lang ? 'English, current language' : 'View this page in English'));
      if (target === lang) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
      if (!link.querySelector('.locale-flag')) {
        const flag = document.createElement('span');
        flag.className = 'locale-flag';
        flag.setAttribute('aria-hidden', 'true');
        flag.innerHTML = flags[target];
        link.prepend(flag);
      }
    });
  }
  /**
   * Open the same language dialog from a local review control.
   * Opening it never clears a saved preference. Closing a manual preview keeps
   * that preference; selecting Español or English explicitly updates it.
   */
  function openChooser() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => chooseInitialLanguage(true), {once:true});
    } else chooseInitialLanguage(true);
  }
  function chooseInitialLanguage(manual = false) {
    if ((!manual && preference) || document.querySelector('[data-language-dialog]')) return;
    const hadPreference = Boolean(preference);
    const dialog = document.createElement('dialog');
    dialog.className = 'locale-dialog';
    dialog.setAttribute('data-language-dialog', '');
    dialog.setAttribute('aria-labelledby', 'locale-choice-title');
    dialog.setAttribute('aria-describedby', 'locale-choice-note');
    dialog.innerHTML = '<button type="button" class="locale-dialog-close" aria-label="Cerrar / Close" data-close-language>×</button>' +
      '<p class="locale-dialog-brand" aria-label="Susidlc.com"><b>susi</b><em>dlc</em><span>.com</span></p>' +
      '<h2 id="locale-choice-title"><span lang="es">Elige tu idioma</span><em lang="en">Choose your language</em></h2>' +
      '<div class="locale-choices"><button type="button" data-choose-language="es" lang="es">' + flags.es + '<span>Español<small>ES</small></span></button>' +
      '<button type="button" data-choose-language="en" lang="en">' + flags.en + '<span>English<small>EN</small></span></button></div>' +
      '<p id="locale-choice-note"><span lang="es">Puedes cambiarlo en cualquier momento.</span><span lang="en">You can change it at any time.</span></p>';
    function dismiss() {
      // Escape or the close button accepts the visible language without nagging.
      if (!hadPreference) remember(lang);
      dialog.close();
      refresh();
    }
    dialog.addEventListener('cancel', event => { event.preventDefault(); dismiss(); });
    dialog.querySelector('[data-close-language]').addEventListener('click', dismiss);
    dialog.querySelectorAll('[data-choose-language]').forEach(button => button.addEventListener('click', () => {
      const target = button.dataset.chooseLanguage;
      remember(target);
      if (target === lang) { dialog.close(); refresh(); }
      else location.replace(localURL(location.href, target));
    }));
    dialog.addEventListener('close', () => {
      document.querySelector('[data-switch-language="' + lang + '"]')?.focus({preventScroll:true});
      dialog.remove();
    }, {once:true});
    document.body.append(dialog);
    dialog.showModal();
    dialog.querySelector('[data-choose-language="' + lang + '"]').focus({preventScroll:true});
  }
  function ready() { refresh(); chooseInitialLanguage(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, {once:true});
  else ready();
  window.addEventListener('hashchange', refresh);
  window.addEventListener('popstate', refresh);
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    if (link.hasAttribute('data-switch-language')) {
      const target = link.dataset.switchLanguage;
      if (!allowed(target)) return;
      remember(target);
      link.href = localURL(location.href, target);
      return;
    }
    const raw = link.getAttribute('href');
    if (!raw || raw.startsWith('#')) return;
    const url = new URL(raw, location.href);
    if (/^https?:$/.test(url.protocol) && url.origin === location.origin && !ignored.test(url.pathname) && !url.pathname.includes('/assets/')) link.href = localURL(url.href);
  }, true);
})();
