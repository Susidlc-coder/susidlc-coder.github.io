"""Render and check the shared static footer on visitor-facing pages."""
import argparse
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
CONTACT = "me@susidlc.com"
STYLESHEET = '<link rel="stylesheet" href="/assets/world-footer.css?v=3">'
FOOTER = re.compile(r'<footer\b[^>]*class="[^"]*\b(?:world-footer|editorial-footer|m-footer|sp-source)\b[^"]*"[^>]*>.*?</footer>', re.S)
EXCLUDED = {"estudio", "referencia", "propuesta-anterior"}


def instagram(handle):
    icon = '<svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>'
    return f'<a class="world-instagram" href="https://www.instagram.com/{handle}/" aria-label="Instagram @{handle}">{icon}@{handle}</a>'


def render(lang):
    en = lang == "en"
    return f'''<footer class="world-footer" id="site-footer">
  <div class="world-footer-inner">
    <div class="world-footer-main">
      <a class="world-footer-brand" href="/{lang}/" aria-label="Susidlc World, {'home' if en else 'inicio'}">susidlc <em>world.</em></a>
      <div class="world-footer-destinations" role="navigation" aria-label="{'Footer' if en else 'Pie de página'}">
        <div><a href="/{lang}/music.html">{'Music' if en else 'Música'}</a>{instagram('susidlc')}</div>
        <span aria-hidden="true">|</span>
        <div><a href="/{lang}/pan-de-cada-dia/">Pan de Cada Día</a>{instagram('pandecadadia95')}</div>
      </div>
      <div class="world-footer-contact">
        <span>{'Contact' if en else 'Contacto'}</span>
        <a href="mailto:{CONTACT}">{CONTACT}</a>
      </div>
    </div>
    <div class="world-footer-baseline"><span>© 2026 Susidlc</span><a href="#top">{'Back to top' if en else 'Volver arriba'} <span aria-hidden="true">↑</span></a></div>
  </div>
</footer>'''


def update(source, route):
    if re.search(r'<meta\b[^>]*http-equiv=["\']?refresh\b', source, re.I):
        return None
    # The language chooser overlays an inert preview of the Spanish poems page.
    lang = "es" if route == "quiz/index.html" else re.search(r'<html\b[^>]*\blang="(es|en)\b', source)[1]
    footer = render(lang)
    source = re.sub(r'<link\b[^>]*href="/assets/world-footer\.css[^"]*"[^>]*>', '', source)
    source = source.replace("</head>", STYLESHEET + "</head>", 1)
    if not re.search(r'\bid=["\']top["\']', source):
        source = source.replace("<body", '<body id="top"', 1)
    existing = FOOTER.search(source)
    if existing and "sp-source" not in existing.group():
        return source[:existing.start()] + footer + source[existing.end():]
    if existing:
        old = existing.group()
        # The journey source supplies the poem attribution and script insertion point.
        native_source = old.replace("<footer", "<div", 1).replace("</footer>", "</div>") if 'data-source' in old else ""
        source = source[:existing.start()] + native_source + source[existing.end():]
    if route == "quiz/index.html":
        marker = '</div><div class="poems-language-scrim"'
        if marker not in source:
            raise ValueError("Cannot locate the inert background of the quiz language chooser")
        return source.replace(marker, footer + marker, 1)
    return source.replace("</body>", footer + "</body>", 1)


def run(check):
    count = 0
    for page in sorted(ROOT.rglob("*.html")):
        route = page.relative_to(ROOT)
        if route.parts[0] in EXCLUDED or any(part.startswith(".") for part in route.parts):
            continue
        source = page.read_text()
        revised = update(source, route.as_posix())
        if revised is None:
            continue
        count += 1
        if source != revised:
            if check:
                raise SystemExit(f"Footer out of sync: {route}")
            page.write_text(revised)
        if revised.count('<footer class="world-footer" id="site-footer">') != 1 or revised.count(STYLESHEET) != 1:
            raise ValueError(f"Expected one shared footer and stylesheet: {route}")
    print(f"Shared footer {'verified' if check else 'updated'} on {count} visitor pages.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    run(parser.parse_args().check)
