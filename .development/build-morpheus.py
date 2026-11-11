"""Build the local Morpheus preview from its stable, optimized image catalog."""
import json,re,html
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
C=json.loads((ROOT/'.development/morpheus-catalog.json').read_text())
CURATION=json.loads((ROOT/'.development/morpheus-curation.json').read_text())
for w in C['worlds']:
 w['artworks']=[a for a in w['artworks'] if a['id'] not in CURATION['excludedArtworkIds']]
 order=CURATION['worldOrder'].get(w['number'],[])
 if order:w['artworks'].sort(key=lambda a:order.index(a['id']) if a['id'] in order else len(order))
C['totalImages']=sum(len(w['artworks']) for w in C['worlds'])
BY={w['number']:w for w in C['worlds']}
INDEX=json.loads((ROOT/'.development/morpheus-index.json').read_text())
# Group primary worlds with their actual named connections. Artwork IDs stay fixed.
REGIONS=[('17',['06','07','09']),('14',['04','05']),('12',['01','08']),('16',['02']),('13',['03','11']),('15',[]),('19',['10']),('18',[])]
W=[BY[n] for core,edges in REGIONS for n in [core,*edges]]
# A connecting world is discoverable from both endpoints, but visited only once
# in the previous/next sequence above. Float connects Cloud, SVL and Sandais.
CONNECTIONS={'17':['06','07','09','10'],'14':['04','05','06','09'],'12':['01','05','08'],'16':['01','02'],'13':['02','03','11'],'15':['03','04','07','08','09'],'19':['10','11'],'18':[]}
VERSION='20261111-morpheus-15-authorship'
def esc(s):return html.escape(str(s),quote=True)
def url(lang,slug=''):return f'/{lang}/morpheus/'+(slug+'/' if slug else '')
def chrome(lang,title,body,extra_styles=""):
 en=lang=='en'; home=(ROOT/lang/'index.html').read_text()
 header=re.search(r'<header\b[\s\S]*?</header>',home).group()
 header=header.replace('</nav>',f'<a href="/{lang}/morpheus/" aria-current="page">Morpheus</a></nav>') if '>Morpheus</a>' not in header else header
 header=re.sub(r'(<a[^>]*href="/'+lang+r'/morpheus/"[^>]*)(>)',lambda m:m[1]+' aria-current="page">' if 'aria-current' not in m[1] else m[0],header)
 return f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><script src="/assets/language.js?v=20261011-horizontal-link-only-1"></script><title>{esc(title)} — Susidlc</title><meta name="description" content="{'Explore the worlds of Morpheus: numbered digital artwork by Susidlc.' if en else 'Explora los mundos de Morpheus: arte digital numerado de Susidlc.'}"><meta name="theme-color" content="#33241e"><link rel="icon" href="/assets/favicon.svg?v=2"><link rel="stylesheet" href="/assets/style.css"><link rel="stylesheet" href="/assets/language.css"><link rel="stylesheet" href="/assets/home-gold-header.css?v={VERSION}"><link rel="stylesheet" href="/assets/morpheus.css?v={VERSION}">{extra_styles}<script src="/assets/content.js" defer></script><script src="/assets/app-bilingual.js" defer></script><script src="/assets/home-gold-header.js?v={VERSION}" defer></script><script src="/assets/morpheus.js?v={VERSION}" defer></script></head><body class="morpheus-page" id="top"><script>try{{document.body.classList.toggle('evening',localStorage.getItem('susidlc-light')!=='day')}}catch{{document.body.classList.add('evening')}}</script><a class="skip" href="#main">{'Skip to content' if en else 'Ir al contenido'}</a>{header}<main id="main" class="m-shell">{body}</main><footer class="m-footer m-shell"><a href="/{lang}/"><em>susidlc world.</em></a><span>© 2026 Susidlc</span><a href="#top">{'Back to top' if en else 'Volver arriba'}</a></footer></body></html>'''
def index(lang):
 en=lang=='en'
 # Every named connection has its own point and direct gallery destination.
 positions={'17':(50,8),'14':(82,29),'12':(82,71),'16':(50,91),'13':(18,71),'15':(18,29),'19':(50,65)}
 connections={'06':((66,18.5),['17','14']),'07':((34,18.5),['17','15']),
  '04':((46,30),['14','15']),'05':((82,50),['14','12']),
  '01':((66,81),['12','16']),'02':((34,81),['16','13']),
  '03':((18,50),['13','15']),'11':((34,68),['13','19']),
  '10':((50,53),['17','19']),'08':((36,44),['15','12']),
  '09':((64,40),['17','14','15'])}
 lines=''.join(f'<line x1="{x}" y1="{y}" x2="{positions[end][0]}" y2="{positions[end][1]}"/>' for (x,y),ends in connections.values() for end in ends)
 nodes=''.join(f'<a class="m-map-node m-map-core" href="{url(lang,BY[k]["slug"])}" style="--x:{x}%;--y:{y}%"><span class="m-star" aria-hidden="true"></span><span class="m-map-name">{esc(BY[k]["name"])}</span></a>' for k,(x,y) in positions.items())
 for k,((x,y),ends) in connections.items():
  side=' m-map-between-left' if x<25 else ' m-map-between-right' if x>75 else ''
  nodes+=f'<a class="m-map-node m-map-between{side}" href="{url(lang,BY[k]["slug"])}" aria-label="{esc(BY[k]["name"])}" style="--x:{x}%;--y:{y}%"><span class="m-star" aria-hidden="true"></span><span class="m-map-tooltip" aria-hidden="true">{esc(BY[k]["name"])}</span></a>'
 directory=''
 for core,edges in REGIONS:
  entries=''
  for k in [core,*edges]:
   w=BY[k];thumb=INDEX[k]['thumbnail'];colors=INDEX[k]['colors']
   swatches=''.join(f'<i style="background:{color}"></i>' for color in colors)
   entries+=f'<a class="m-directory-entry{" m-directory-primary" if k==core else ""}" href="{url(lang,w["slug"])}"><span class="m-directory-thumb"><img src="{thumb["src"]}" alt="" width="{thumb["width"]}" height="{thumb["height"]}" loading="lazy" decoding="async"></span><span class="m-directory-copy"><span class="m-directory-name">{esc(w["name"])}</span><span class="m-directory-meta">{len(w["artworks"]):02} {"artworks" if en else "obras"}</span><span class="m-palette" aria-hidden="true">{swatches}</span></span></a>'
  directory+=f'<div class="m-directory-group">{entries}</div>'
 featured=[{**BY['16']['artworks'][0],'alt':'SilkCities (SC) — 16-001'},
  {'src':'/assets/morpheus/nazeo.webp','width':774,'height':900,'id':'Nazeo','alt':'Nazeo — Susidlc'},
  {**BY['14']['artworks'][1],'alt':'Saint Victoria Lands (SVL) — 14-002'}]
 hero=''.join(f'<figure class="m-feature m-feature-{i}"><img src="{a["src"]}" alt="{esc(a["alt"])}" width="{a["width"]}" height="{a["height"]}" loading="eager" decoding="async"><figcaption>{a["id"]}</figcaption></figure>' for i,a in enumerate(featured,1))
 return chrome(lang,'Morpheus World',f'''<section class="m-exhibition"><div class="m-exhibition-top"><p class="m-kicker">SUSIDLC / {'DIGITAL ART' if en else 'ARTE DIGITAL'}</p><span class="m-kicker">{len(W)} {'WORLDS' if en else 'MUNDOS'} · {C['totalImages']} {'ARTWORKS' if en else 'OBRAS'}</span></div><h1 class="m-exhibition-title"><span>Morpheus</span> <em>World</em></h1><div class="m-exhibit-stage"><div class="m-orbital" aria-hidden="true"></div>{hero}</div></section><section class="m-atlas" aria-labelledby="world-index"><div class="m-atlas-head"><h2 id="world-index">Atlas</h2><p>{'Every point opens a gallery.' if en else 'Cada punto abre una galería.'}</p></div><div class="m-map-frame" tabindex="0" role="region" aria-label="{'Morpheus map. On smaller screens, scroll horizontally to explore.' if en else 'Mapa de Morpheus. En pantallas pequeñas puedes desplazarlo horizontalmente.'}"><div class="m-map m-terrain-map" aria-label="{'Map of connected worlds' if en else 'Mapa de mundos conectados'}"><img class="m-terrain-image" src="/assets/morpheus/terrain-map.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async"><div class="m-terrain-grid" aria-hidden="true"></div><div class="m-terrain-shade" aria-hidden="true"></div><div class="m-map-compass" aria-hidden="true"><span>N</span><i></i></div><svg class="m-map-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><g class="m-route-glow">{lines}</g><g class="m-route-dashes">{lines}</g></svg>{nodes}</div></div><p class="m-map-mobile-hint">{'Swipe to explore the map.' if en else 'Desliza para recorrer el mapa.'}</p><div class="m-directory-head"><h3>{'Gallery index' if en else 'Índice de galerías'}</h3><span>{len(W):02}</span></div><div class="m-directory">{directory}</div></section>''',f'<link rel="stylesheet" href="/assets/morpheus-map.css?v={VERSION}">')
def inquiry(lang,w):
 en=lang=='en'; first=w['artworks'][0]['id']; options=''.join(f'<option value="{a["id"]}"></option>' for a in w['artworks'])
 return f'''<section class="m-request" id="inquiry" aria-labelledby="request-title"><div><span class="m-kicker">MERCH / MORPHEUS</span><h2 id="request-title">{'Interested in<br><em>an artwork?</em>' if en else '¿Te interesa<br><em>una obra?</em>'}</h2><p>{'Seen something you love? Tell me the artwork number and your postal code. I will send you a proposal with available merchandise and prices.' if en else '¿Hay una obra que te gustó? Dime su número y tu código postal. Te enviaré una propuesta con el merch disponible y sus precios.'}</p><a class="m-direct-email" href="mailto:susid95@gmail.com">{'Or email me directly' if en else 'O escríbeme directamente'}</a></div><form class="m-form" data-world="{esc(w['name'])}" data-recipient="susid95@gmail.com"><div class="m-field m-field-wide"><label for="m-email">Email *</label><input id="m-email" type="email" name="email" autocomplete="email" maxlength="254" required></div><div class="m-field"><label for="m-art">{'Artwork number' if en else 'Número de obra'} *</label><input id="m-art" name="artwork" list="m-artworks" placeholder="{first}" required maxlength="250" aria-describedby="art-help"><datalist id="m-artworks">{options}</datalist><small id="art-help">{'Use the code below each image. Separate several with commas.' if en else 'Usa el código debajo de cada imagen. Separa varios con comas.'}</small></div><div class="m-field"><label for="m-postal">{'ZIP / postal code' if en else 'ZIP / código postal'} *</label><input id="m-postal" name="postal" autocomplete="postal-code" required maxlength="20"></div><div class="m-field m-field-wide"><label for="m-message">{'Anything else?' if en else '¿Algo más?'} <span>({'optional' if en else 'opcional'})</span></label><textarea id="m-message" name="message" maxlength="2000" rows="3"></textarea></div><div class="m-field-wide"><button class="m-submit" type="submit">{'Prepare my inquiry' if en else 'Preparar mi consulta'}</button></div><p class="m-form-note">{'* Required fields. You will review and send the inquiry through your email app.' if en else '* Campos obligatorios. Revisarás y enviarás la consulta desde tu aplicación de correo.'}</p><p class="m-form-status" role="status" aria-live="polite"></p><div class="m-draft m-field" hidden><label for="m-draft-text">{'Your inquiry' if en else 'Tu consulta'}</label><textarea id="m-draft-text" readonly rows="6"></textarea><a class="m-submit" data-send-draft href="mailto:susid95@gmail.com">{'Open email to send' if en else 'Abrir correo para enviar'}</a><button type="button" class="m-copy" data-copy-draft>{'Copy inquiry' if en else 'Copiar consulta'}</button></div></form></section>'''
def display_title(w):
 return CURATION['displayTitles'].get(w['number'],[re.sub(r' \(.*?\)$','',w['name'].strip()),'Morpheus World'])
def world(lang,w,i):
 en=lang=='en'; title,location=display_title(w)
 related=CURATION['relatedAlbums'][w['number']]['slug']
 album_label={'sdlc-01':'SDLC_01 · Best Soundtracks','sdlc-02':'SDLC_02 · Anoche','sdlc-07':'SDLC_07','sdlc-10':'SDLC_10','sdlc-11':'SDLC_11 · Ambience'}[related]
 atlas_url=url(lang)+'#world-index'
 atlas_icon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="m5 6 13 3-9 10L5 6Zm0 0 4 13"/><circle cx="5" cy="6" r="2"/><circle cx="18" cy="9" r="2"/><circle cx="9" cy="19" r="2"/></svg>'
 music_icon='<svg viewBox="0 0 32 32" fill="none" stroke="url(#m-music-gold)" stroke-width="1.4" aria-hidden="true"><defs><linearGradient id="m-music-gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f4e6c8"/><stop offset="37%" stop-color="#e8c784"/><stop offset="53%" stop-color="#fff5d5"/><stop offset="76%" stop-color="#cf9d48"/><stop offset="100%" stop-color="#edd1a0"/></linearGradient></defs><circle cx="16" cy="16" r="13" opacity=".35"/><path d="M8 18v-3a8 8 0 0 1 16 0v3M8 16H6v7h4v-7H8Zm16 0h2v7h-4v-7h2Z"/></svg>'
 top_steps=''; cards=''
 for step,label,arrow in [(-1,'Previous world' if en else 'Mundo anterior','←'),(1,'Next world' if en else 'Siguiente mundo','→')]:
  j=i+step
  if 0<=j<len(W):
   dest=W[j];short,context=display_title(dest);link=url(lang,dest['slug']);thumb=INDEX[dest['number']]['thumbnail']
   top_steps+=f'<a class="m-step" href="{link}" aria-label="{label}: {esc(short)}" title="{label}: {esc(short)}"><span aria-hidden="true">{arrow}</span></a>'
   card=f'<a class="m-neighbour" href="{link}" aria-label="{label}: {esc(dest["name"])}"><img src="{thumb["src"]}" alt="" width="55" height="68" loading="lazy"><span><small>{label} <span aria-hidden="true">{arrow}</span></small><strong>{esc(short)}</strong><span class="m-neighbour-context">{esc(context)}</span></span></a>'
  else:
   top_steps+=f'<span class="m-step m-step-disabled" aria-hidden="true">{arrow}</span>'
   card='<span class="m-neighbour-empty" aria-hidden="true"></span>'
  if step==-1:
   cards+=card+f'<a class="m-atlas-return" href="{atlas_url}">{atlas_icon}<span>{"Back to Atlas" if en else "Volver al Atlas"}</span></a>'
  else:cards+=card
 arts=''.join(f'<figure class="m-art"><img src="{a["src"]}" width="{a["width"]}" height="{a["height"]}" loading="{"eager" if j<2 else "lazy"}" decoding="async" alt="{esc(w["name"])} — {"artwork" if en else "obra"} {a["id"]}"><figcaption>{a["id"]}</figcaption></figure>' for j,a in enumerate(w['artworks']))
 return chrome(lang,w['name']+' · Morpheus World',f'''<section class="m-world-head m-gallery-header"><nav class="m-gallery-topnav" aria-label="{'Gallery navigation' if en else 'Navegación de galerías'}"><a class="m-atlas-back" href="{atlas_url}">{atlas_icon}{'Back to Atlas' if en else 'Volver al Atlas'}</a><div class="m-gallery-stepper"><span class="m-position">{i+1:02} / {len(W):02}</span>{top_steps}</div></nav><div class="m-gallery-heading"><div><p class="m-world-location">{esc(location)}</p><h1>{esc(title)}</h1></div><a class="m-music-orbit" href="/{lang}/music/{related}/" aria-label="{'Related music — view album' if en else 'Música relacionada — ver álbum'} {esc(album_label)}"><span class="m-music-disc">{music_icon}</span><span class="m-music-label">{'Music' if en else 'Música'}</span><span class="m-music-tooltip">{esc(album_label)}</span></a></div><details class="m-about-art"><summary><span>{'My original paintings and drawings, reinterpreted with AI' if en else 'Mis pinturas y dibujos originales, reinterpretados con IA'}</span><span class="m-about-toggle" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M5 10h10M10 5v10"/></svg></span></summary><p>{'Morpheus is the signature I use for my paintings and drawings transformed with digital tools and artificial intelligence.' if en else 'Morpheus es la firma de mis pinturas y dibujos transformados con herramientas digitales e inteligencia artificial.'}</p></details></section><section class="m-gallery m-gallery-curated" aria-label="{esc(w['name'])}">{arts}</section><nav class="m-gallery-bottomnav" aria-label="{'Continue exploring' if en else 'Seguir explorando'}">{cards}</nav>{inquiry(lang,w)}''',f'<link rel="stylesheet" href="/assets/morpheus-gallery.css?v={VERSION}">')
for lang in ['es','en']:
 d=ROOT/lang/'morpheus';d.mkdir(parents=True,exist_ok=True);(d/'index.html').write_text(index(lang))
 for i,w in enumerate(W):
  d=ROOT/lang/'morpheus'/w['slug'];d.mkdir(parents=True,exist_ok=True);(d/'index.html').write_text(world(lang,w,i))
# Root fallbacks retain real content before language.js resolves the locale.
for p in (ROOT/'es/morpheus').rglob('*.html'):
 dest=ROOT/'morpheus'/p.relative_to(ROOT/'es/morpheus');dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(p.read_text())
print(f'Built {3*(len(W)+1)} Morpheus pages, {C["totalImages"]} artworks, no original files copied.')
