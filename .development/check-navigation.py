#!/usr/bin/env python3
"""Check the shared menu without changing any section's visual styling.

Default: inspect local public HTML. --ref origin/main: inspect a Git revision.
--overlay PATH can overlay a reviewed local file on that revision before release.
"""
import argparse
from html.parser import HTMLParser
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--ref')
parser.add_argument('--overlay', action='append', default=[])
args = parser.parse_args()

class Menu(HTMLParser):
    def __init__(self):
        super().__init__()
        self.inside = False
        self.links = []
        self.lang = 'es'
        self.link = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang = a.get('lang', 'es')
        if tag == 'nav' and (a.get('id') == 'navigation' or 'sp-site-nav' in a.get('class', '').split()):
            self.inside = True
        if self.inside and tag == 'a':
            self.link = [a.get('href', ''), '']
    def handle_data(self, data):
        if self.link is not None: self.link[1] += data
    def handle_endtag(self, tag):
        if tag == 'a' and self.link is not None:
            self.links.append((self.link[0], self.link[1].strip()))
            self.link = None
        if tag == 'nav': self.inside = False

def git(*cmd):
    return subprocess.check_output(['git', *cmd], cwd=ROOT, text=True)

paths = git('ls-tree', '-r', '--name-only', args.ref).splitlines() if args.ref else [str(p.relative_to(ROOT)) for p in ROOT.rglob('*.html')]
errors = []
checked = 0
for name in paths:
    if not name.endswith('.html') or any(part.startswith('.') for part in Path(name).parts) or name.startswith(('referencia/', 'propuesta-anterior/', 'estudio/')):
        continue
    html = git('show', args.ref + ':' + name) if args.ref and name not in args.overlay else (ROOT / name).read_text()
    menu = Menu()
    menu.feed(html)
    if not menu.links: continue  # Redirects and documents without a site header.
    lang = 'en' if name.startswith('en/') or menu.links[0][0].startswith('/en/') else 'es'
    expected = [(f'/{lang}/music.html', 'Music' if lang == 'en' else 'Música'), ('/quiz', 'Poems' if lang == 'en' else 'Poemas'), (f'/{lang}/pan-de-cada-dia/', 'Pan de Cada Día'), (f'/{lang}/morpheus/', 'Morpheus')]
    checked += 1
    if menu.links != expected: errors.append(f'{name}: {menu.links!r}')
if errors:
    print('Menu inconsistencies:\n' + '\n'.join(errors))
    sys.exit(1)
print(f'Navigation consistent across {checked} public pages (labels, order, language and destinations).')
