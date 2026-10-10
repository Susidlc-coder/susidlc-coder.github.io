import json,re,html
from pathlib import Path

def update_bilingual(root,catalog=None,check=False):
    root=Path(root)
    catalog=catalog or json.loads((root/'.development/music-catalog.json').read_text())
    updates=json.loads((root/'.development/site-updates.json').read_text())
    album=next(a for a in catalog['albums'] if a['id']==catalog['latestRelease']['id'])
    pan=updates['panDeCadaDia']
    esc=lambda x:html.escape(str(x),quote=True)
    for lang in ('es','en'):
        en=lang=='en'
        music_url=f'/{lang}/music/{album["slug"]}/'
        pan_url='/'+lang+pan['url']
        for url in (music_url,pan_url):
            target=root/url.lstrip('/')/'index.html'
            if not target.is_file():raise ValueError('Missing update destination: '+url)
        title=esc(album['title'])
        if album.get('subtitle'):title+=' <em>'+esc(album['subtitle'])+'</em>'
        status=updates['music'].get('status','')
        if not en and status=='New release':status='Nuevo lanzamiento'
        if status:title+='<span class="update-status"> · '+esc(status)+'</span>'
        pan_title=pan['title'];pan_subtitle=pan.get('subtitle','')
        if en:
            pan_title=pan_title.replace('Capítulo','Chapter')
            pan_subtitle=pan_subtitle.replace('Séptima Morada','Seventh Dwelling')
        pan_title=esc(pan_title)
        if pan_subtitle:pan_title+=' <span aria-hidden="true">·</span> <em>'+esc(pan_subtitle)+'</em>'
        block='''<!-- HOME UPDATES START -->
<div class="home-updates" role="navigation" aria-label="'''+('Latest updates' if en else 'Últimas novedades')+'''">
<a class="home-update home-update-music" href="'''+music_url+'''"><span class="update-copy"><span class="update-label"><i aria-hidden="true"></i>'''+('Music / Latest update' if en else 'Música / Última novedad')+'''</span><span class="update-title">'''+title+'''</span></span></a>
<a class="home-update home-update-pan" href="'''+pan_url+('"' if en else '" lang="es"')+'''><span class="update-copy"><span class="update-label"><i aria-hidden="true"></i>Pan de Cada Día / <span>'''+('Latest update' if en else 'Última novedad')+'''</span></span><span class="update-title">'''+pan_title+'''</span></span></a>
</div>
<!-- HOME UPDATES END -->'''
        page=root/lang/'index.html';s=page.read_text();pattern=r'<!-- HOME UPDATES START -->.*?<!-- HOME UPDATES END -->'
        updated=re.sub(pattern,lambda _:block,s,flags=re.S)
        if check:
            if updated!=s:raise SystemExit('Stale homepage banners: '+lang)
        else:page.write_text(updated)
    if check:
        if (root/'index.html').read_text()!=(root/'es/index.html').read_text():raise SystemExit('Root homepage differs from Spanish equivalent')
        print('Both localized homepages and root fallback match their content sources.')
    else:(root/'index.html').write_text((root/'es/index.html').read_text())
