"""Import the supplied final Spanish chapters; preserve current bilingual site shell."""
from pathlib import Path
from zipfile import ZipFile
from lxml import etree as E,html
from html import escape
from copy import deepcopy
import json,hashlib,re,sys
R=Path(__file__).resolve().parents[1]
B=Path(sys.argv[1])/'las-moradas-solo-textos/7_Septima Morada'
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
C='/pan-de-cada-dia/las-moradas/'
def route(c):return C+f'septima-morada/capitulo-{c}/'
def text(p):return ''.join((n.text or '') if n.tag==W+'t' else '\t' if n.tag==W+'tab' else '\n' for n in p.iter() if n.tag in [W+'t',W+'tab',W+'br',W+'cr'])
def render(p,tag='p'):
 s=''
 for run in p.iter(W+'r'):
  v=escape(text(run))
  for prop,t in [('i','em'),('b','strong')]:
   n=run.find(W+'rPr/'+W+prop)
   if n is not None and n.get(W+'val') not in ('0','false','off'):v=f'<{t}>{v}</{t}>'
  s+=v
 assert html.fromstring('<div>'+s+'</div>').text_content()==text(p)
 return f'<{tag}'+(' class="reading-empty"' if tag=='p' and not text(p).strip() else '')+'>'+s+f'</{tag}>'
def inner(n,s):
 for x in list(n):n.remove(x)
 wrap=html.fromstring('<div>'+s+'</div>');n.text=wrap.text
 for x in list(wrap):n.append(x)
def save(p,d):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text('<!doctype html>\n'+html.tostring(d,encoding='unicode',method='html'))
summary={3:'Teresa describe los frutos de la unión con Dios: el olvido de sí, el amor a quienes hacen daño y el deseo de vivir para servir. La paz interior no elimina los trabajos ni la necesidad de humildad, pero permite afrontarlos con mayor fortaleza y confianza en Dios.',4:'Teresa concluye que la oración y la unión con Dios deben dar fruto en obras. Marta y María han de caminar juntas: contemplar y servir. Invita a cultivar la humildad y el amor en lo que está a nuestro alcance, porque el valor de las obras está en el amor con que se hacen.'}
ensummary={3:'Teresa describes the fruits of union with God: self-forgetfulness, love for those who cause harm, and the desire to live in service. Inner peace does not remove suffering or the need for humility, but helps the soul face them with greater strength and trust in God.',4:'Teresa concludes that prayer and union with God must bear fruit in deeds. Martha and Mary must walk together: contemplation and service. She encourages humility and love in what lies within our reach, because the value of our deeds rests in the love with which we do them.'}
records=[]
for c in (3,4):
 pair={}
 for f in sorted((B/f'Cap {c}_M7').glob('*.docx')):
  if f.name.startswith('~$'):continue
  kind='original' if f.name.startswith('Texto original') else 'adaptado'
  with ZipFile(f) as z:blocks=list(E.fromstring(z.read('word/document.xml')).find(W+'body'))
  tables=[b for b in blocks if b.tag==W+'tbl'];assert len(tables)==1
  ps=list(tables[0].iter(W+'p'));hs=[b for b in blocks[:blocks.index(tables[0])] if b.tag==W+'p' and text(b).strip()]
  pair[kind]={'ps':ps,'hs':hs}
  records.append({'source':str(f.relative_to(B.parent)),'chapter':c,'version':kind,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'paragraphs':len(ps)})
 assert set(pair)=={'original','adaptado'}
 for lang in ('es','en'):
  en=lang=='en';d=html.parse(str(R/(lang+route(2))/'index.html')).getroot()
  d.find('head/title').text=f'{"Seventh Dwelling. Chapter" if en else "Séptima Morada. Capítulo"} {c}. — Susidlc'
  d.xpath('//link[@rel="canonical"]')[0].set('href','https://susidlc.com/'+lang+route(c))
  d.xpath('//meta[@name="description"]')[0].set('content',ensummary[c] if en else summary[c])
  inner(d.xpath('//header[@class="reader-heading"]/h1')[0],('Seventh Dwelling.' if en else 'Séptima Morada.')+f'<br><em>{"Chapter" if en else "Capítulo"} {c}.</em>')
  d.xpath('//details[@class="chapter-summary"]/p')[0].text=ensummary[c] if en else summary[c]
  for n in d.xpath('//figure[@class="chapter-video"]|//p[@class="reading-language-note"]'):n.getparent().remove(n)
  for kind in pair:
   col=d.xpath('//section[@data-version=$k]',k=kind)[0]
   col.xpath('.//div[@class="reading-text"]')[0].set('lang','es')
   inner(col.xpath('.//div[@class="source-headings"]')[0],''.join(render(p,'h4') for p in pair[kind]['hs']))
   inner(col.xpath('.//div[@class="chapter-text"]')[0],''.join(render(p) for p in pair[kind]['ps']))
  part=d.xpath('//section[@class="reading-part"]')[0]
  note='This chapter is available in Spanish (original and adapted text). English adaptation is not yet available.' if en else ''
  if note:part.insert(0,html.fromstring('<p class="reading-language-note">'+note+'</p>'))
  if en:d.xpath('//section[@data-version="adaptado"]/h3')[0].text='Adapted text · Spanish'
  nav=d.xpath('//nav[@class="reader-next wrap"]')[0]
  for a,dest,small,title in [(nav[0],'/'+lang+route(c-1),'← Previous' if en else '← Anterior',f'{"Seventh Dwelling · Chapter" if en else "Séptima Morada · Capítulo"} {c-1}'),(nav[-1],'/'+lang+(route(4) if c==3 else C+'#indice'),('Next →' if en else 'Siguiente →') if c==3 else ('Back to contents →' if en else 'Volver al índice →'),('Seventh Dwelling · Chapter 4' if en else 'Séptima Morada · Capítulo 4') if c==3 else 'Las Moradas')]:
   a.set('href',dest);inner(a,'<small>'+small+'</small>'+title)
  for a in d.xpath('//*[@data-switch-language]'):a.set('href','/'+a.get('data-switch-language')+route(c))
  out=R/(lang+route(c))/'index.html';save(out,d)
  test=html.parse(str(out))
  for kind in pair:assert test.xpath('//section[@data-version=$k]//div[@class="chapter-text"]/p',k=kind) and [p.text_content() for p in test.xpath('//section[@data-version=$k]//div[@class="chapter-text"]/p',k=kind)]==[text(p) for p in pair[kind]['ps']]
 # fallback and legacy redirect
 p=R/route(c).lstrip('/')/'index.html';p.parent.mkdir(parents=True,exist_ok=True);p.write_text((R/('es'+route(c))/'index.html').read_text())
 (R/f'las-moradas/septima-morada-capitulo-{c}.html').write_text((R/'las-moradas/septima-morada-capitulo-2.html').read_text().replace('capitulo-2',f'capitulo-{c}'))
for lang in ('es','en'):
 en=lang=='en';p=R/(lang+route(2))/'index.html';d=html.parse(str(p)).getroot();a=d.xpath('//nav[@class="reader-next wrap"]/a')[-1];a.set('href','/'+lang+route(3));inner(a,'<small>'+('Next →' if en else 'Siguiente →')+'</small>'+('Seventh Dwelling · Chapter 3' if en else 'Séptima Morada · Capítulo 3'));save(p,d)
 p=R/(lang+C)/'index.html';d=html.parse(str(p)).getroot();g=d.xpath('//*[@id="morada-7"]')[0].getparent()
 g.xpath('./p[@class="morada-summary"]')[0].text=('These final dwellings explore union with God, inner peace, humility and love expressed in service. All four chapters are available in Spanish; English adaptations are available for chapters 1 and 2.' if en else 'Estas últimas moradas presentan la unión con Dios y sus frutos: paz interior, humildad y amor que se expresa en servicio. Teresa concluye que la oración ha de fortalecer las obras y el cuidado de quienes nos rodean.')
 for c in (3,4):
  a=deepcopy(g.xpath('./a')[-1]);a.set('href','/'+lang+route(c));a[0].text=f'{"Chapter" if en else "Capítulo"} {c}'+(' · Spanish' if en else '');a[1].text='Read ↗' if en else 'Leer ↗';g.append(a)
 save(p,d);s=p.read_text().replace('25 capítulos disponibles','27 capítulos · Libro completo').replace('25 chapters available','27 chapters available · Complete Spanish text');p.write_text(s)
for route_ in (route(2),C):(R/route_.lstrip('/')/'index.html').write_text((R/('es'+route_)/'index.html').read_text())
p=R/'.development/site-updates.json';d=json.loads(p.read_text());d['panDeCadaDia']={'title':'Las Moradas','subtitle':'Libro completo','url':C,'titleEn':'Las Moradas','subtitleEn':'Complete book in Spanish'};p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
p=R/'.development/bilingual_home_updates.py';s=p.read_text().replace("pan_title=pan_title.replace('Capítulo','Chapter')","pan_title=pan.get('titleEn',pan_title.replace('Capítulo','Chapter'))").replace("pan_subtitle=pan_subtitle.replace('Séptima Morada','Seventh Dwelling')","pan_subtitle=pan.get('subtitleEn',pan_subtitle.replace('Séptima Morada','Seventh Dwelling'))");p.write_text(s)
p=R/'sitemap.xml';s=p.read_text();new=''.join('<url><loc>https://susidlc.com/'+lang+route(c)+'</loc></url>\n' for lang in ('es','en') for c in (3,4));p.write_text(s.replace('</urlset>',new+'</urlset>'))
(R/'.development/las-moradas-septima-final.json').write_text(json.dumps({'sources':records,'summary':summary,'englishSummary':ensummary,'englishReading':'Spanish texts explicitly labeled; translation pending'},ensure_ascii=False,indent=2)+'\n')
print('Imported 4 DOCX files; all source paragraphs verified character for character.')
