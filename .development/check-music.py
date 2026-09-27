"""Validate generated music content against the owner's PDF catalog, without network access.

Run: python3 .development/check-music.py [--source /path/to/catalog-raw.json]
Browser behavior and external service availability are checked separately.
"""
import argparse
import copy
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import sys
import tempfile
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
DEV = ROOT / '.development'
SOURCE_DEFAULT = ROOT.parents[1] / 'tmp/music-source/catalog-raw.json'
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
ARTIST_NAME = '001-SDLC_music'
INTRO_COPY = ('An evolving collection of cinematic and experimental music shaped by memory, faith, humor, tension, and everyday life. '
              'Explore the albums and imagine where these sounds could live next, from personal listening to film, movement, and visual storytelling. '
              'Available worldwide for original scores, soundtracks, licensing, and creative collaboration.')


class Node:
    def __init__(self, tag='', attrs=(), parent=None):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []

    def all(self, tag=None, cls=None):
        result = []
        for item in self.children:
            if isinstance(item, Node):
                if (tag is None or item.tag == tag) and (cls is None or cls in item.attrs.get('class', '').split()):
                    result.append(item)
                result.extend(item.all(tag, cls))
        return result

    def text(self):
        return ''.join(item.text() if isinstance(item, Node) else item for item in self.children)

    def one(self, tag=None, cls=None):
        matches = self.all(tag, cls)
        assert len(matches) == 1, f'Expected one {tag or "element"}.{cls or ""}, found {len(matches)}'
        return matches[0]


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.current = self.root
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs, self.current)
        self.current.children.append(node)
        if tag not in VOID:
            self.current = node

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        node = self.current
        while node.parent and node.tag != tag:
            node = node.parent
        if node.parent:
            self.current = node.parent

    def handle_data(self, data):
        self.current.children.append(data)


def parse(path):
    return Document(path.read_text()).root


def normalized(value):
    """The specifically disclosed punctuation changes, with source spelling preserved."""
    value = value.strip()
    if value.lower().strip('.') == 'none':
        return ''
    return (value.replace('--solid beat--', '“solid beat”')
            .replace('" - John 3:16', '". John 3:16')
            .replace('\n--\n', '\n\n').replace('-', ' '))


def schema(doc):
    scripts = [n for n in doc.all('script') if n.attrs.get('type') == 'application/ld+json']
    assert len(scripts) == 1, 'Expected exactly one JSON LD block'
    return json.loads(scripts[0].text())


def has_copy_dash(value):
    # The owner explicitly requested this exact artist name, including its hyphen.
    return re.search(r'[-\u2010-\u2015]', value.replace(ARTIST_NAME, ''))


def validate_references(doc, path):
    ids = [n.attrs['id'] for n in doc.all() if 'id' in n.attrs]
    assert len(ids) == len(set(ids)), f'Duplicate HTML IDs in {path}'
    for node in doc.all():
        if 'aria-controls' in node.attrs:
            assert node.attrs['aria-controls'] in ids, 'Disclosure references a missing panel'
        for key in ('alt', 'aria-label'):
            assert not has_copy_dash(node.attrs.get(key, '')), f'Dash in {key}'
        links = [node.attrs[k] for k in ('src', 'href') if k in node.attrs]
        links += [part.strip().split()[0] for part in node.attrs.get('srcset', '').split(',') if part.strip()]
        for value in links:
            url = urlsplit(value)
            if url.scheme or url.netloc:
                continue
            target = ROOT / unquote(url.path.lstrip('/')) if url.path.startswith('/') else path.parent / unquote(url.path)
            if not url.path:
                target = path
            elif target.is_dir():
                target = target / 'index.html'
            assert target.is_file(), f'Missing local reference {value} on {path}'
            if url.fragment:
                target_ids = ids if target == path else [n.attrs.get('id') for n in parse(target).all()]
                assert unquote(url.fragment) in target_ids, f'Missing fragment {value} on {path}'


def validate_page(doc, path):
    assert doc.one('html').attrs.get('lang') == 'en'
    assert doc.one('title').text().strip()
    assert len(doc.all('h1')) == 1
    assert not any(doc.all(tag) for tag in ('iframe', 'audio', 'video', 'object', 'embed')), 'Initial media player found'
    assert not any('autoplay' in n.attrs for n in doc.all()), 'Autoplay found'
    body = doc.one('body').text()
    assert not has_copy_dash(body), f'Dash outside the exact artist name in visible copy on {path}'
    assert not re.search(r'\bnone\.?\b', body, re.I), f'Optional none marker shown on {path}'
    assert 'me@susidlc.com' in body and 'Available worldwide' in body
    for image in doc.all('img'):
        assert 'alt' in image.attrs and image.attrs.get('width') and image.attrs.get('height'), 'Image accessibility/layout attributes missing'
    for link in doc.all('a'):
        assert link.attrs.get('href'), 'Empty link'
        assert link.text().strip() or link.attrs.get('aria-label'), 'Unnamed link'
    validate_references(doc, path)


def run(source_path):
    raw = json.loads(source_path.read_text())
    catalog = json.loads((DEV / 'music-catalog.json').read_text())
    assert [a['id'] for a in catalog['albums']] == raw['album_order'], 'Album order changed'
    pages = [ROOT / 'music.html'] + [ROOT / 'music' / a['slug'] / 'index.html' for a in catalog['albums']]
    initial_hashes = {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in pages}
    main = parse(pages[0])
    validate_page(main, pages[0])
    cards = main.all('a', 'album-card')
    assert [n.one('h3').text() for n in cards] == [a['title'] for a in catalog['albums']]
    assert [n.attrs['href'] for n in cards] == [f'/music/{a["slug"]}/' for a in catalog['albums']]
    assert all(n.one('img').attrs['loading'] == 'lazy' for n in cards)
    intro = main.one('section', 'music-intro')
    assert intro.one('h1').text() == ARTIST_NAME, 'Main heading must use the exact artist name'
    intro_paragraphs = [p.text().strip() for p in intro.all('p') if 'eyebrow' not in p.attrs.get('class', '').split()]
    assert ' '.join(' '.join(intro_paragraphs).split()) == INTRO_COPY, 'Main introduction differs from the owner supplied copy'
    assert intro.one('a', 'spotify-button').attrs['href'] == catalog['artistUrl']
    sections = main.one('main').all('section')
    assert sections.index(main.one('section', 'upcoming-release')) < sections.index(main.one('section', 'record-library'))
    assert main.one('section', 'upcoming-release').all('a') == [], 'Unexpected empty upcoming button'
    assert main.one('section', 'upcoming-release').one('h2').text() == catalog['upcoming']['title'], 'Upcoming title words are joined in accessible text'
    assert main.one('p', 'upcoming-status').text() == 'Coming soon'
    assert 'October' not in main.text() and '2026-10-04' not in main.text(), 'Unconfirmed release date exposed'
    collection_schema = schema(main)['mainEntity']['itemListElement']
    assert [a['name'] for a in collection_schema] == [a['title'] for a in catalog['albums']]
    assert [a['position'] for a in collection_schema] == list(range(1, len(cards) + 1))

    counts = {'tracks': 0, 'lyrics': 0, 'additional_credits': 0}
    direct_urls = []
    headings = {'about': 'About the track', 'mood': 'Mood and atmosphere', 'genre': 'Genre and musical style', 'instrumentation': 'Instrumentation and sound', 'scene': 'Scene or visual suggestion', 'additional_credits': 'Additional credits'}
    for source_album, album, path in zip(raw['albums'], catalog['albums'], pages[1:]):
        assert [t['title'] for t in album['tracks']] == [t['title'] for t in source_album['tracks']], 'Track order or title altered'
        doc = parse(path)
        validate_page(doc, path)
        assert doc.one('h1').text() == album['title']
        assert doc.one('p', 'album-credit').text() == catalog['standardCredit']
        assert doc.one('body').text().count(catalog['standardCredit']) == 1, 'Credit repeated'
        assert doc.one('a', 'spotify-button').attrs['href'] == album['spotifyUrl']
        assert doc.one('div', 'album-art').one('img').attrs['loading'] == 'eager'
        tracks = doc.all('article', 'track')
        album_schema = schema(doc)
        assert album_schema['name'] == album['title'] and album_schema['numTracks'] == len(tracks)
        assert album_schema['sameAs'] == album['spotifyUrl']
        recordings = album_schema['track']['itemListElement']
        assert len(recordings) == len(tracks) == len(source_album['tracks'])
        for position, (source, track, element, recording) in enumerate(zip(source_album['tracks'], album['tracks'], tracks, recordings), 1):
            counts['tracks'] += 1
            assert track['number'] == source['track_number'], f'Source number changed: {source["title"]}'
            assert element.one('span', 'track-number').text() == source['track_number'].zfill(2)
            assert element.one('span', 'track-title').text() == source['title']
            assert element.one('span', 'track-duration').text() == source['duration']
            assert element.one('a', 'track-listen').attrs['href'] == source['listening_link'] == track['spotifyUrl']
            assert urlsplit(source['listening_link']).netloc == 'open.spotify.com'
            assert re.fullmatch(r'/track/[A-Za-z0-9]{22}', urlsplit(source['listening_link']).path)
            tid = element.attrs['id']
            assert tid == track['id'], 'Stable track ID changed'
            assert not element.all(cls='track-permalink'), 'Removed track Link control has returned'
            assert not any(re.fullmatch(r'Link\s*↗?', link.text().strip()) for link in element.all('a')), 'Track Link control must remain removed'
            assert element.one('button', 'track-toggle').attrs['aria-controls'] == element.one('div', 'track-panel').attrs['id']
            direct_urls.append(f'https://susidlc.com/music/{album["slug"]}/#{tid}')
            fields = {n.one('h4').text(): n.one('p').text() for n in element.all('div') if len(n.all('h4')) == 1 and len(n.all('p')) == 1}
            for key, heading in headings.items():
                expected = normalized(source[key])
                assert track[key] == expected, f'Unexpected source edit: {album["id"]}, {source["title"]}, {key}'
                assert fields.get(heading, '') == expected, f'Missing or altered static description: {source["title"]}, {key}'
                if not expected:
                    assert heading not in fields, f'Empty heading shown: {heading}'
            lyrics = element.all('details', 'track-lyrics')
            expected_lyrics = normalized(source['lyrics'])
            assert track['lyrics'] == expected_lyrics
            assert len(lyrics) == bool(expected_lyrics)
            if lyrics:
                counts['lyrics'] += 1
                assert 'open' not in lyrics[0].attrs and lyrics[0].one('div', 'lyrics-text').text() == expected_lyrics
                assert lyrics[0].parent.attrs.get('class') == 'track-panel', 'Lyrics not nested within track panel'
            counts['additional_credits'] += bool(normalized(source['additional_credits']))
            assert len(element.all('a', 'track-video')) == bool(track.get('videoUrl'))
            item = recording['item']
            minutes, seconds = map(int, source['duration'].split(':'))
            assert recording['position'] == position and item['name'] == source['title']
            assert item['description'] == normalized(source['about']) and item['sameAs'] == source['listening_link']
            assert item['duration'] == f'PT{minutes}M{seconds}S'
            assert item['url'] == item['@id'] == direct_urls[-1]
    assert counts == {'tracks': 26, 'lyrics': 8, 'additional_credits': 1}, counts
    assert len(direct_urls) == len(set(direct_urls)), 'Duplicate direct song URLs'

    # Exercise the owner-facing update knobs without touching the real generated pages.
    with tempfile.TemporaryDirectory(prefix='susidlc-music-check-') as temporary:
        temp = Path(temporary)
        fixture = copy.deepcopy(catalog)
        fixture['upcoming'] = None
        fixture_path = temp / 'catalog.json'
        fixture_path.write_text(json.dumps(fixture))
        subprocess.run([sys.executable, str(DEV / 'build-music.py'), '--catalog', str(fixture_path), '--output', str(temp / 'hidden')], check=True, capture_output=True, text=True)
        hidden = parse(temp / 'hidden/music.html')
        assert not hidden.all(cls='upcoming-release') and not hidden.all(cls='upcoming-art') and 'UPCOMING ALBUM' not in hidden.text()
        fixture['upcoming'] = {'title': 'Future collection', 'status': 'Coming soon', 'link': 'https://example.com/announcement', 'linkLabel': 'Announcement'}
        for field in headings:
            fixture['albums'][0]['tracks'][0][field] = ''
        fixture['albums'][0]['tracks'][0]['lyrics'] = ''
        fixture_path.write_text(json.dumps(fixture))
        subprocess.run([sys.executable, str(DEV / 'build-music.py'), '--catalog', str(fixture_path), '--output', str(temp / 'updated')], check=True, capture_output=True, text=True)
        updated = parse(temp / 'updated/music.html').one('section', 'upcoming-release')
        assert updated.one('h2').text() == 'Future collection' and updated.one('a').attrs['href'] == 'https://example.com/announcement'
        assert not updated.all('img')
        blank_track = parse(temp / 'updated/music' / catalog['albums'][0]['slug'] / 'index.html').all('article', 'track')[0]
        assert not blank_track.all('h4') and not blank_track.all('details') and not blank_track.all('a', 'track-video')
    assert initial_hashes == {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in pages}, 'Validation modified production output'
    print('PASS: 4 albums, 26 tracks, 26 exact Spotify links, 26 direct song URLs, 8 compact lyrics, 1 additional credit.')
    print('PASS: exact artist heading and introduction, source copy, order, static descriptions, JSON LD, local assets, and optional fields.')
    print('PASS: no track Link controls or players; the exact artist name is the only permitted copy dash exception.')
    print('PASS: Upcoming Album hides and updates in isolated builds; original generated files remain unchanged.')
    print('Known source questions remain: missing album descriptions, duplicate track 05, and bonus track credit clarification.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=SOURCE_DEFAULT)
    args = parser.parse_args()
    run(args.source)
