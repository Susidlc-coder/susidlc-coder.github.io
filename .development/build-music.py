"""Generate static music pages. Run with Python 3; no browser data fetches or build dependencies."""
import argparse
import html
import json
import re
import runpy
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEV = ROOT / '.development'
DOMAIN = 'https://susidlc.com'
ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M6 9c4-1.3 8-1 12 1M7 12c3-1 6.5-.7 10 1M8 15c2-.7 4.5-.4 7 .7" stroke-linecap="round"/></svg>'

def esc(value):
    return html.escape(str(value), quote=True)

def external(url, text, cls='quiet-link', label=None, icon=False):
    if not str(url).startswith('https://'):
        raise ValueError('External links must use HTTPS')
    return f'<a class="{cls}" href="{esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="{esc(label or text)} (opens in a new tab)">{ICON if icon else ""}{esc(text)}<span aria-hidden="true"> ↗</span></a>'

def picture(cover, alt, manifest, eager=False, sizes='(max-width: 460px) calc(100vw - 84px), (max-width: 720px) calc(50vw - 56px), (max-width: 1080px) calc(50vw - 69px), (max-width: 1572px) calc(50vw - 97px), 675px'):
    item = manifest[cover]
    srcset = ', '.join(f'{v["src"]} {v["width"]}w' for v in item['webp'])
    fallback = item['fallback']
    return f'<picture><source type="image/webp" srcset="{esc(srcset)}" sizes="{esc(sizes)}"><img src="{esc(fallback["src"])}" alt="{esc(alt)}" width="{fallback["width"]}" height="{fallback["height"]}" loading="{"eager" if eager else "lazy"}" decoding="async"{" fetchpriority=high" if eager else ""}></picture>'

def contact(data):
    return f'''<section class="quiet-contact music-contact wrap" id="contact" aria-labelledby="contact-heading">
<div><p class="eyebrow">AN OPEN CONVERSATION</p><h2 id="contact-heading">Music for your next story.</h2>
<p>Available worldwide for original soundtracks, scoring, collaboration, and music licensing. Filmmakers, directors, producers, and music supervisors are welcome to get in touch.</p></div>
<a class="quiet-link contact-link" href="mailto:{esc(data['contactEmail'])}">{esc(data['contactEmail'])} <span aria-hidden="true">↗</span></a></section>'''

def header():
    return '''<a class="skip" href="#main">Skip to content</a><header class="header"><a class="brand" href="/index.html" aria-label="Susidlc World, home"><span class="brand-portrait"><img src="/assets/doll-detail.webp" alt="" width="31" height="42"></span><span>susidlc<span class="brand-world">WORLD</span></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Explore <span>＋</span></button><nav id="navigation" aria-label="Main navigation"><a href="/music.html" aria-current="page">Music</a><a href="/pan-de-cada-dia/">Pan de Cada Día</a></nav><button class="light-toggle" aria-pressed="false" aria-label="Switch to evening light"><span class="light-orb"></span><span data-light-label>Daylight</span></button></header>'''

def footer(data):
    return f'''<footer class="wrap site-footer editorial-footer"><div class="footer-inner"><div class="footer-main"><div class="footer-identity"><a class="footer-brand" href="/index.html" aria-label="Susidlc World, home">susidlc <em>world.</em></a></div><div class="footer-music"><a class="footer-heading" href="/music.html">MUSIC<span aria-hidden="true"> ↗</span></a><div class="footer-related"><a href="{esc(data['artistUrl'])}" target="_blank" rel="noopener noreferrer" aria-label="Spotify (opens in a new tab)">Spotify</a><a href="https://www.instagram.com/susidlc/" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)">Instagram</a></div></div><div class="footer-contact-group"><h2>Say hello</h2><a class="footer-action" href="mailto:{esc(data['contactEmail'])}">Contact me<span aria-hidden="true"> ↗</span></a></div></div><div class="footer-baseline"><p class="footer-copyright">© 2026 Susidlc</p><a href="#top">Go to top ↑</a></div></div></footer>'''

def page(title, description, route, image, content, data, structured):
    schema = json.dumps(structured, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)} | Susidlc World</title><meta name="description" content="{esc(description)}">
<link rel="canonical" href="{DOMAIN}{route}"><meta name="theme-color" content="#f2eee5">
<meta property="og:title" content="{esc(title)} | Susidlc World"><meta property="og:description" content="{esc(description)}"><meta property="og:image" content="{DOMAIN}{image}"><meta property="og:type" content="website"><meta property="og:url" content="{DOMAIN}{route}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="{DOMAIN}{image}">
<link rel="icon" href="/assets/favicon.svg?v=2" type="image/svg+xml"><link rel="stylesheet" href="/assets/style.css?v=6"><link rel="stylesheet" href="/assets/music.css?v=9">
<script src="/assets/app.js?v=2" defer></script><script src="/assets/music.js?v=2" defer></script>
<script type="application/ld+json">{schema}</script></head><body id="top" class="music-page">
{header()}<main id="main">{content}</main>{footer(data)}
</body></html>'''

def album_route(album):
    return f'/music/{album["slug"]}/'

def artist_link(url):
    return f'<a class="artist-spotify" href="{esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="Listen to Susidlc on Spotify (opens in a new tab)">{ICON}<span>Listen on<br><strong>Spotify</strong></span><span class="artist-arrow" aria-hidden="true">↗</span></a>'

def main_page(data, manifest):
    content = f'''<section class="page-intro music-intro wrap"><p class="eyebrow">01 / THE LISTENING ROOM</p><h1><span>001-SDLC</span><em>_music</em></h1>
{artist_link(data['artistUrl'])}<div class="intro-line"><p>Cinematic and experimental music for listeners, filmmakers, movement artists, and visual storytellers. Available worldwide for original scores, licensing, and creative collaboration.</p></div></section>'''
    upcoming = data.get('latestRelease') or data.get('upcoming')
    if upcoming:
        art = f'<div class="upcoming-art">{picture(upcoming["cover"], upcoming["coverAlt"], manifest, True, "(max-width: 720px) 158px, 195px")}</div>' if upcoming.get('cover') else ''
        button = external(upcoming['link'], upcoming['linkLabel'], 'spotify-button release-listen', icon=True) if upcoming.get('link') and upcoming.get('linkLabel') else ''
        title = esc(upcoming['title'])
        if upcoming.get('subtitle') and upcoming['title'].endswith(upcoming['subtitle']):
            title = esc(upcoming['title'][:-len(upcoming['subtitle'])].strip()) + ' <em>' + esc(upcoming['subtitle']) + '</em>'
        content += f'''<section class="upcoming-release wrap" aria-labelledby="upcoming-title"><div class="upcoming-copy"><p class="eyebrow release-label">{esc(upcoming.get("label", "UPCOMING ALBUM"))}</p><h2 id="upcoming-title">{title}</h2><p class="upcoming-status">{esc(upcoming['status'])}</p>{button}</div>{art}</section>'''
    order = data.get('collectionOrder', [a['id'] for a in data['albums']])
    albums = sorted(data['albums'], key=lambda a: order.index(a['id']) if a['id'] in order else len(order))
    cards = []
    for album in albums:
        card_meta = str(len(album['tracks'])) + ' tracks'
        is_latest = album['id'] == data.get('latestRelease', {}).get('id')
        release_marker = '<span class="release-marker" aria-hidden="true"></span>' if is_latest else ''
        card_label = 'Explore ' + album['title'] + (', new release' if is_latest else '')
        card_subtitle = f'<span class="album-subtitle">{esc(album["subtitle"])}</span>' if album.get('subtitle') else '<span class="album-subtitle" aria-hidden="true"></span>'
        cards.append(f'''<a class="album-card" href="{album_route(album)}" aria-label="{esc(card_label)}"><div class="cover-mount">{picture(album['cover'], album['coverAlt'], manifest)}{release_marker}</div><div class="cover-caption"><h3>{esc(album['title'])}{card_subtitle}</h3><span class="cover-meta"><span class="track-count">{card_meta}</span><span class="arrow" aria-hidden="true">↗</span></span></div></a>''')
    content += f'''<section class="record-library wrap" aria-labelledby="collection-title"><div class="collection-heading"><h2 id="collection-title">The collection</h2><div class="collection-tools"><span class="eyebrow">{len(cards):02} ALBUMS / MANY MOODS</span><label class="album-sort" hidden>Sort by <select id="album-sort"><option value="recent">Most recent</option><option value="name">Name A to Z</option></select></label></div></div><div class="album-collection">{''.join(cards)}</div><div class="music-secondary">{external(data['youtubeUrl'], 'Watch on YouTube')}</div></section>'''
    content += contact(data)
    structured = {'@context': 'https://schema.org', '@type': 'CollectionPage', 'name': 'Music | Susidlc World', 'url': DOMAIN + '/music.html', 'mainEntity': {'@type': 'ItemList', 'itemListElement': [{'@type': 'ListItem', 'position': i, 'url': DOMAIN + album_route(a), 'name': a['title']} for i, a in enumerate(albums, 1)]}}
    return page('Music', 'Songs, soundtracks, and small worlds made of sound. Explore albums by Susidlc and get in touch for soundtrack work worldwide.', '/music.html', '/assets/doll-original.webp', content, data, structured).replace('music.css?v=9', 'music.css?v=15').replace('music.js?v=2', 'music.js?v=3')

def optional_field(value, title, cls=''):
    return f'<div class="{cls}"><h4>{esc(title)}</h4><p>{esc(value)}</p></div>' if value else ''

def track_html(track):
    tid = track['id']
    labels = [m.strip() for m in track.get('mood', '').split(',') if m.strip()][:3]
    if not labels:
        labels = [m.strip() for m in track.get('genre', '').split(',') if m.strip()][:2]
    tags = '<span class="track-tags">' + ''.join(f'<span>{esc(tag)}</span>' for tag in labels) + '</span>' if labels else ''
    duration = f'<span class="track-duration">{esc(track["duration"])}</span>' if track.get('duration') else ''
    panel = optional_field(track.get('about'), 'About the track', 'track-about')
    facts = ''.join(optional_field(track.get(field), title, cls) for field, title, cls in [('mood', 'Mood and atmosphere', ''), ('genre', 'Genre and musical style', ''), ('instrumentation', 'Instrumentation and sound', ''), ('scene', 'Scene or visual suggestion', 'track-scene'), ('additional_credits', 'Additional credits', 'track-scene')])
    if facts:
        panel += '<div class="track-facts">' + facts + '</div>'
    if track.get('lyrics'):
        panel += f'<details class="track-lyrics"><summary>View Lyrics<span class="sr-only"> for {esc(track["title"])}</span></summary><div class="lyrics-text">{esc(track["lyrics"])}</div></details>'
    if track.get('videoUrl'):
        panel += external(track['videoUrl'], 'Watch Video', 'track-video', 'Watch video for ' + track['title'])
    if not panel and track.get('detailsPending'):
        panel = '<p>Coming soon</p>'
    return f'''<article class="track" id="{tid}"><div class="track-row"><h3><button class="track-toggle" type="button" aria-expanded="true" aria-controls="{tid}-panel" id="{tid}-toggle"><span class="track-number">{esc(str(track['number']).zfill(2))}</span><span><span class="track-title">{esc(track['title'])}</span>{tags}</span>{duration}<span class="track-indicator" aria-hidden="true"></span></button></h3><div class="track-actions">{external(track['spotifyUrl'], 'Listen', 'track-listen', 'Listen to ' + track['title'] + ' on Spotify', True)}</div></div><div class="track-panel" id="{tid}-panel" role="region" aria-labelledby="{tid}-toggle">{panel}</div></article>'''

def new_album_page(album, data, manifest):
    cover = picture(album['cover'], album['coverAlt'], manifest, True)
    title = album['title'] + ' ' + album['subtitle']
    tracks = ''.join(track_html(t) for t in album['tracks'])
    content = f'''<div class="wrap new-album"><a class="album-breadcrumb" href="/music.html#collection-title"><span aria-hidden="true">←</span> The collection</a><section class="album-opening" aria-labelledby="album-title"><div class="album-art">{cover}</div><div class="album-copy"><p class="eyebrow">SUSIDLC / {len(album['tracks'])} TRACKS</p><h1 id="album-title">{esc(album['title'])}<em class="album-title-subtitle">{esc(album['subtitle'])}</em></h1>{external(album['spotifyUrl'], 'Listen on Spotify', 'spotify-button', 'Listen to ' + title + ' on Spotify', True)}</div></section><section class="track-list" aria-labelledby="tracks-title"><div class="track-section-heading"><h2 id="tracks-title">Inside the record</h2><span class="eyebrow">SELECT A TRACK TO EXPLORE</span></div>{tracks}</section><div class="album-next"><a class="quiet-link" href="/music.html#collection-title">All albums <span aria-hidden="true">↗</span></a></div></div>'''
    items = [{'@type': 'ListItem', 'position': t['number'], 'item': {'@type': 'MusicRecording', '@id': DOMAIN + album_route(album) + '#' + t['id'], 'url': DOMAIN + album_route(album) + '#' + t['id'], 'name': t['title'], 'sameAs': t['spotifyUrl']}} for t in album['tracks']]
    structured = {'@context': 'https://schema.org', '@type': 'MusicAlbum', 'name': title, 'url': DOMAIN + album_route(album), 'sameAs': album['spotifyUrl'], 'numTracks': len(album['tracks']), 'track': {'@type': 'ItemList', 'itemListElement': items}}
    return page(title, f'Explore the {len(album["tracks"])} tracks on {title} by Susidlc. Listen to the album on Spotify.', album_route(album), manifest[album['cover']]['fallback']['src'], content, data, structured).replace('music.css?v=9', 'music.css?v=15')

def album_page(album, data, manifest):
    if album.get('trackDetailsPending'):
        return new_album_page(album, data, manifest)
    description = album.get('description')
    intro = f'<p class="album-description">{esc(description)}</p>' if description else ''
    cover = picture(album['cover'], album['coverAlt'], manifest, True, '(max-width: 540px) calc(100vw - 80px), (max-width: 720px) 460px, (max-width: 1080px) calc(50vw - 97px), (max-width: 1572px) calc(50vw - 122px), 640px')
    content = f'''<div class="wrap"><a class="album-breadcrumb" href="/music.html#collection-title"><span aria-hidden="true">←</span> The collection</a><section class="album-opening" aria-labelledby="album-title"><div class="album-art">{cover}</div><div class="album-copy"><p class="eyebrow">SUSIDLC / {len(album['tracks'])} TRACKS</p><h1 id="album-title">{esc(album['title'])}</h1>{intro}{external(album['spotifyUrl'], 'Listen on Spotify', 'spotify-button', 'Listen to ' + album['title'] + ' on Spotify', True)}<p class="album-credit">{esc(data['standardCredit'])}</p></div></section><section class="track-list" aria-labelledby="tracks-title"><div class="track-section-heading"><h2 id="tracks-title">Inside the record</h2><span class="eyebrow">SELECT A TRACK TO EXPLORE</span></div>{''.join(track_html(t) for t in album['tracks'])}</section>'''
    other = data['albums'][(data['albums'].index(album) + 1) % len(data['albums'])]
    content += f'<div class="album-next"><a class="quiet-link" href="/music.html#collection-title">All albums <span aria-hidden="true">↗</span></a><a class="quiet-link" href="{album_route(other)}">Explore {esc(other["title"])} <span aria-hidden="true">→</span></a></div></div>' + contact(data)
    items = []
    for i, track in enumerate(album['tracks'], 1):
        recording = {'@type': 'MusicRecording', '@id': DOMAIN + album_route(album) + '#' + track['id'], 'url': DOMAIN + album_route(album) + '#' + track['id'], 'name': track['title'], 'byArtist': {'@type': 'Person', 'name': 'Susidlc'}, 'sameAs': track['spotifyUrl'], 'inAlbum': {'@type': 'MusicAlbum', 'name': album['title'], 'url': DOMAIN + album_route(album)}}
        if track.get('about'):
            recording['description'] = track['about']
        if track.get('duration'):
            m, s = track['duration'].split(':')
            recording['duration'] = f'PT{int(m)}M{int(s)}S'
        items.append({'@type': 'ListItem', 'position': i, 'item': recording})
    structured = {'@context': 'https://schema.org', '@type': 'MusicAlbum', '@id': DOMAIN + album_route(album), 'url': DOMAIN + album_route(album), 'name': album['title'], 'byArtist': {'@type': 'Person', 'name': 'Susidlc'}, 'image': DOMAIN + manifest[album['cover']]['fallback']['src'], 'sameAs': album['spotifyUrl'], 'numTracks': len(album['tracks']), 'track': {'@type': 'ItemList', 'itemListElement': items}}
    if description:
        structured['description'] = description
    return page(album['title'], description or f'Explore {album["title"]} by Susidlc. Listen on Spotify and discover the stories, moods, and sounds behind each track.', album_route(album), manifest[album['cover']]['fallback']['src'], content, data, structured)

def build(data, output=ROOT):
    manifest = json.loads((DEV / 'music-cover-manifest.json').read_text())
    output.mkdir(parents=True, exist_ok=True)
    (output / 'music.html').write_text(main_page(data, manifest))
    for album in data['albums']:
        path = output / 'music' / album['slug'] / 'index.html'
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(album_page(album, data, manifest))
    if output == ROOT:
        sitemap = (ROOT / 'sitemap.xml').read_text()
        sitemap = re.sub(r'  <url><loc>https://susidlc.com/music/[^<]+</loc></url>\n', '', sitemap)
        entries = ''.join(f'  <url><loc>{DOMAIN}{album_route(a)}</loc></url>\n' for a in data['albums'])
        (ROOT / 'sitemap.xml').write_text(sitemap.replace('</urlset>', entries + '</urlset>'))
        runpy.run_path(str(DEV / 'build-home-updates.py'))['update_home'](ROOT, data)
    print(f'Built music.html and {len(data["albums"])} album pages in {output}')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--catalog', type=Path, default=DEV / 'music-catalog.json')
    parser.add_argument('--output', type=Path, default=ROOT)
    args = parser.parse_args()
    build(json.loads(args.catalog.read_text()), args.output.resolve())
