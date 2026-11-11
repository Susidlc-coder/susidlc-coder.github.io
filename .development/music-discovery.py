"""Render the bilingual editorial invitation to the existing Poemas test."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
CSS = '/assets/music-discovery.css?v=20261111-discovery-1'

def render(lang='es'):
    en = lang == 'en'
    question = 'What music suits<br><em>you today?</em>' if en else '¿Qué música va<br><em>contigo hoy?</em>'
    label = 'What music suits you today? Take the test' if en else '¿Qué música va contigo hoy? Haz el test'
    action = 'Take the test' if en else 'Haz el test'
    url = '/en/poemas/recorrido.html?nuevo=1' if en else '/es/poemas/recorrido.html?nuevo=1'
    icon = '<span class="discovery-icon" aria-hidden="true"><svg viewBox="5 6 38 34" fill="none" stroke="url(#discovery-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><defs><linearGradient id="discovery-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stop-color="#c69a50"/><stop offset=".45" stop-color="#fff0c7"/><stop offset=".7" stop-color="#d3ae68"/><stop offset="1" stop-color="#f7dfaa"/></linearGradient></defs><path d="M11 27v-5a13 13 0 0 1 26 0v5M20 24v9m4-14v19m4-14v9"/><rect x="7" y="25" width="8" height="13" rx="2.5"/><rect x="33" y="25" width="8" height="13" rx="2.5"/></svg></span>'
    return f'<a class="music-discovery" href="{url}" aria-label="{label}">{icon}<span class="discovery-copy"><span class="discovery-question">{question}</span><span class="discovery-action">{action}<span aria-hidden="true">↗</span></span></span></a>'

if __name__ == '__main__':
    for name, lang in [('music.html','es'),('es/music.html','es'),('en/music.html','en')]:
        p=ROOT/name
        s=p.read_text()
        s,n=re.subn(r'<a class="(?:artist-spotify|music-discovery)".*?</a>',lambda _:render(lang),s,flags=re.S)
        if n != 1: raise ValueError(f'Expected one artist/test invitation in {name}; found {n}')
        if 'music-discovery.css' not in s:s=s.replace('</head>',f'<link rel="stylesheet" href="{CSS}"></head>')
        p.write_text(s)
    print('Updated the music test invitation in root, Spanish and English landing pages.')
