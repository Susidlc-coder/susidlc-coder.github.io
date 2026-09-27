"""One time import of the supplied PDF extraction. Subsequent edits use music-catalog.json."""
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent
source = json.loads(Path(sys.argv[1]).read_text())
album_links = {
    'SDLC_01': '0NzChW1T76YKR1gzK7v90G',
    'SDLC_02': '0Th8A9DlTnhdbuchGE1mOG',
    'SDLC_07': '5QErTDSnHFNyJ71jZEJ2Je',
    'SDLC_10': '1qSKk9SSzkfj7O56uzxMdk',
}
alts = {
    'SDLC_01': 'SDLC_01 cover, a warmly lit stone corridor with a vaulted ceiling',
    'SDLC_02': 'SDLC_02 cover, a painted portrait in gray with a red accent',
    'SDLC_07': 'SDLC_07 cover, an abstract painted face in orange, cream, and gray',
    'SDLC_10': 'SDLC_10 cover, a painting of a seated figure beneath a triangular frame',
}

def punctuation(text):
    # Disclosed to the owner before application. Preserve every original word.
    return (text.strip().replace('--solid beat--', '“solid beat”')
            .replace('" - John 3:16', '". John 3:16')
            .replace('\n--\n', '\n\n').replace('-', ' '))

albums = []
for source_album in source['albums']:
    aid = source_album['id']
    tracks = []
    for position, track in enumerate(source_album['tracks'], 1):
        slug = unicodedata.normalize('NFKD', track['title']).encode('ascii', 'ignore').decode().lower()
        slug = re.sub(r'[^a-z0-9]+', '-', slug).strip('-')
        item = {'id': f'track-{position:02}-{slug}', 'number': track['track_number'],
                'title': track['title'], 'spotifyUrl': track['listening_link']}
        for field in ['about', 'mood', 'genre', 'instrumentation', 'scene', 'lyrics', 'additional_credits', 'duration']:
            value = track[field].strip()
            item[field] = '' if value.lower().strip('.') == 'none' else punctuation(value)
        item['videoUrl'] = None
        tracks.append(item)
    albums.append({'id': aid, 'slug': aid.lower().replace('_', '-'), 'title': aid,
                   'description': None, 'cover': aid, 'coverAlt': alts[aid],
                   'spotifyUrl': 'https://open.spotify.com/album/' + album_links[aid], 'tracks': tracks})

catalog = {
    'artistUrl': 'https://open.spotify.com/artist/3qu5vshqqfnVnWFNLV5Ouo?si=xnaDeyxLQnWhSuIZTkjKGQ',
    'youtubeUrl': 'https://www.youtube.com/@susid95',
    'contactEmail': 'me@susidlc.com',
    'standardCredit': 'All tracks written, composed, performed, and produced by Susi de León Campo',
    'upcoming': {'id': 'SDLC_11', 'title': 'SDLC_11 Ambience', 'subtitle': 'Ambience',
                 'cover': 'SDLC_11', 'coverAlt': 'SDLC_11 Ambience cover, sunlight through a canopy of trees',
                 'status': 'Coming soon', 'link': None, 'linkLabel': None},
    'albums': albums,
}
(ROOT / 'music-catalog.json').write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n')
print(f'Imported {len(albums)} albums and {sum(len(a["tracks"]) for a in albums)} tracks')
