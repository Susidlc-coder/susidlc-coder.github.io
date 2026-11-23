import html
import json
import re
from pathlib import Path


def update_bilingual(root, catalog=None, check=False):
    root = Path(root)
    updates = json.loads((root / '.development/site-updates.json').read_text())
    catalog = catalog or json.loads((root / '.development/music-catalog.json').read_text())
    music = updates['music']
    if music['source'] == 'latestRelease':
        album = next(a for a in catalog['albums'] if a['id'] == catalog['latestRelease']['id'])
        music = {**music, **album, 'url': '/music/' + album['slug'] + '/'}
    elif music['source'] != 'custom':
        raise ValueError('Unknown music update source')

    for lang in ('es', 'en'):
        english = lang == 'en'
        heading = 'Updates' if english else 'Novedades'
        sections = [
            ('music', 'Music' if english else 'Música', music),
            ('poems', 'Poems' if english else 'Poemas', updates.get('poems')),
            ('pan', 'Pan de Cada Día', updates['panDeCadaDia']),
            ('morpheus', 'Morpheus', updates.get('morpheus')),
        ]
        links = []
        for key, label, item in sections:
            if item is None:
                continue
            url = item['url'] if key == 'poems' else '/' + lang + item['url']
            if not (root / url.lstrip('/') / 'index.html').is_file():
                raise ValueError('Missing update destination: ' + url)
            title = item.get('titleEn', item['title']) if english else item['title']
            subtitle = item.get('subtitleEn', item.get('subtitle')) if english else item.get('subtitle')
            title_html = html.escape(title)
            if subtitle:
                separator = ' ' if key == 'music' else ' · '
                title_html += separator + '<em>' + html.escape(subtitle) + '</em>'
            badge = item.get('badgeEn', item.get('badge')) if english else item.get('badge')
            badge_html = ''
            if badge:
                text = html.escape(badge)
                if key == 'morpheus':
                    badge_html = f'<span class="update-ribbon"><span>{text}</span></span>'
                else:
                    badge_html = f'<span class="update-badge">{text}</span>'
            links.append(
                f'<a class="home-update home-update-{key}" href="{html.escape(url, quote=True)}">'
                f'<span class="update-label">{label}</span><span class="update-title">{title_html}</span>{badge_html}</a>'
            )

        lines = '\n'.join(links)
        block = f'''<!-- HOME UPDATES START -->
<div class="home-updates" role="navigation" aria-label="{heading}">
<span class="updates-heading" aria-hidden="true">{heading}</span>
<div class="update-lines">
{lines}
</div>
</div>
<!-- HOME UPDATES END -->'''
        path = root / lang / 'index.html'
        current = path.read_text()
        page, count = re.subn(r'<!-- HOME UPDATES START -->.*?<!-- HOME UPDATES END -->', lambda _: block, current, flags=re.S)
        if count != 1:
            raise ValueError('Expected one update section on the ' + lang + ' homepage')
        if check:
            if page != current:
                raise SystemExit('Stale homepage updates: ' + lang)
        else:
            path.write_text(page)

    spanish = (root / 'es/index.html').read_text()
    if check:
        if (root / 'index.html').read_text() != spanish:
            raise SystemExit('Root homepage differs from Spanish equivalent')
        print('Both localized homepages and root fallback match their content sources.')
    else:
        (root / 'index.html').write_text(spanish)
