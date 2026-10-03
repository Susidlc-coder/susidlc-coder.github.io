"""Render the two homepage update links as static HTML, without browser fetches."""
import argparse
import html
import json
import re
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
START = '<!-- HOME UPDATES START -->'
END = '<!-- HOME UPDATES END -->'


def esc(value):
    return html.escape(str(value), quote=True)


def local_target(root, url):
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc or not parsed.path.startswith('/'):
        raise ValueError('Homepage updates must link to local site pages')
    target = (root / parsed.path.lstrip('/')).resolve()
    if not target.is_relative_to(root.resolve()):
        raise ValueError('Homepage update link leaves the project')
    if target.is_dir():
        target /= 'index.html'
    if not target.is_file():
        raise ValueError(f'Homepage update target does not exist: {url}')


def render(root=ROOT, catalog=None):
    updates = json.loads((root / '.development/site-updates.json').read_text())
    catalog = catalog or json.loads((root / '.development/music-catalog.json').read_text())
    music = updates['music']
    if music['source'] == 'latestRelease':
        release = catalog.get('latestRelease')
        if not release or not release.get('id'):
            raise ValueError('Select a released album in the music catalog before updating the homepage')
        album = next(a for a in catalog['albums'] if a['id'] == release['id'])
        music_title = esc(album['title'])
        music_subtitle = album.get('subtitle')
        music_url = '/music/' + album['slug'] + '/'
    elif music['source'] == 'custom':
        music_title = esc(music['title'])
        music_subtitle = music.get('subtitle')
        music_url = music['url']
    else:
        raise ValueError('Unknown music update source')
    pan = updates['panDeCadaDia']
    local_target(root, music_url)
    local_target(root, pan['url'])
    if music_subtitle:
        music_title += ' <em>' + esc(music_subtitle) + '</em>'
    music_status = music.get('status')
    if music_status:
        music_title += '<span class="update-status"> · ' + esc(music_status) + '</span>'
    pan_title = esc(pan['title'])
    if pan.get('subtitle'):
        pan_title += ' <span aria-hidden="true">·</span> <em>' + esc(pan['subtitle']) + '</em>'
    return f'''{START}
<div class="home-updates" role="navigation" aria-label="Latest updates">
<a class="home-update home-update-music" href="{esc(music_url)}"><span class="update-copy"><span class="update-label"><i aria-hidden="true"></i>Music / Latest update</span><span class="update-title">{music_title}</span></span></a>
<a class="home-update home-update-pan" href="{esc(pan['url'])}" lang="es"><span class="update-copy"><span class="update-label"><i aria-hidden="true"></i>Pan de Cada Día / <span lang="en">Latest update</span></span><span class="update-title">{pan_title}</span></span></a>
</div>
{END}'''


def update_home(root=ROOT, catalog=None, check=False):
    path = root / 'index.html'
    page = path.read_text()
    pattern = re.escape(START) + r'.*?' + re.escape(END)
    if len(re.findall(pattern, page, flags=re.S)) != 1:
        raise ValueError('The homepage must contain one marked update block')
    updated = re.sub(pattern, lambda _: render(root, catalog), page, flags=re.S)
    if check:
        if page != updated:
            raise SystemExit('Homepage updates are stale. Run python3 .development/build-home-updates.py')
        print('Homepage update text and links match their sources.')
    else:
        path.write_text(updated)
        print('Updated both homepage banners.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    update_home(check=args.check)
