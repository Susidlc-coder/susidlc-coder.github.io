"""Import only Cap 2_M7 into the current reader, preserving the supplied texts.

Usage: bundled-python .development/add-septima-capitulo-2.py /path/to/Las-Moradas-Importacion
The English adaptation is retained alongside this script for reproducible builds.
"""
from copy import deepcopy
from html import escape
import hashlib
import json
from pathlib import Path
import re
import sys
from zipfile import ZipFile

from lxml import etree as E, html

ROOT = Path(__file__).resolve().parents[1]
BASE = Path(sys.argv[1]) / 'las-moradas-solo-textos'
SOURCE = BASE / '7_Septima Morada/Cap 2_M7'
NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
W = '{' + NS['w'] + '}'
ROUTE = '/pan-de-cada-dia/las-moradas/septima-morada/capitulo-2/'
PREVIOUS = ROUTE.replace('capitulo-2', 'capitulo-1')
CONTENTS = '/pan-de-cada-dia/las-moradas/'
SUMMARY = {
    'es': 'Teresa describe el matrimonio espiritual como una unión con Dios que sostiene la paz en el centro del alma, aun entre sufrimientos y ocupaciones. Esa cercanía no asegura que el alma no pueda caer: la llama a cuidar su relación con Dios, reconocer lo recibido y desear servirle con mayor entrega.',
    'en': 'Teresa describes spiritual marriage as a union with God that sustains peace at the soul’s centre, even amid suffering and daily concerns. This closeness does not mean the soul cannot fall: it calls the soul to care for its relationship with God, acknowledge what it has received, and desire to serve Him more wholeheartedly.'
}
MORADA_SUMMARY = {
    'es': 'Los capítulos disponibles presentan la compañía de la Santísima Trinidad y el matrimonio espiritual. Teresa describe una unión con Dios que sostiene la paz interior entre trabajos y sufrimientos, y despierta un mayor deseo de servirle.',
    'en': 'The available chapters present the companionship of the Most Holy Trinity and spiritual marriage. Teresa describes a union with God that sustains inward peace amid work and suffering, and awakens a greater desire to serve Him.'
}


def text(p):
    return ''.join((n.text or '') if n.tag == W + 't' else '\t' if n.tag == W + 'tab' else '\n'
                   for n in p.iter() if n.tag in [W+'t', W+'tab', W+'br', W+'cr'])


def render(p, tag='p'):
    chunks = []
    for run in p.iter(W + 'r'):
        value = escape(text(run))
        for prop, element in [('i', 'em'), ('b', 'strong')]:
            node = run.find('w:rPr/w:' + prop, NS)
            if node is not None and node.get(W + 'val') not in ('0', 'false', 'off'):
                value = f'<{element}>{value}</{element}>'
        chunks.append(value)
    markup = ''.join(chunks)
    assert html.fromstring('<div>' + markup + '</div>').text_content() == text(p)
    cls = ' class="reading-empty"' if tag == 'p' and not text(p).strip() else ''
    return f'<{tag}{cls}>{markup}</{tag}>'


pair, evidence = {}, []
for kind, filename in [('original', 'Texto original (1577) _ Capítulo 2_Séptima Morada.docx'),
                       ('adaptado', 'Texto Adaptado _ Capítulo 2_Séptima Morada.docx')]:
    f = SOURCE / filename
    with ZipFile(f) as z:
        blocks = list(E.fromstring(z.read('word/document.xml')).find('w:body', NS))
    end = next(i for i, p in enumerate(blocks) if text(p).startswith('Continuar Leyendo'))
    tables = [p for p in blocks[:end] if p.tag == W + 'tbl']
    assert len(tables) == 1
    ps = tables[0].findall('.//w:p', NS)
    headings = [p for p in blocks[:blocks.index(tables[0])] if text(p).strip()]
    pair[kind] = {'html': ''.join(render(p) for p in ps), 'headings': ''.join(render(p, 'h4') for p in headings),
                  'texts': [text(p) for p in ps], 'headingTexts': [text(p) for p in headings]}
    evidence.append({'source': str(f.relative_to(BASE)), 'sha256': hashlib.sha256(f.read_bytes()).hexdigest(),
                     'morada': 7, 'chapter': 2, 'part': 0, 'version': kind,
                     'paragraphs': len(ps), 'characters': sum(len(text(p)) for p in ps)})

translated = json.loads((ROOT / '.development/las-moradas-septima-capitulo-2-english.json').read_text())['paragraphs']
assert len(translated) == sum(bool(p.strip()) for p in pair['adaptado']['texts']) == 36
iterator = iter(translated)
english = [next(iterator) if p.strip() else p for p in pair['adaptado']['texts']]


def replace_inner(node, markup):
    for child in list(node):
        node.remove(child)
    wrapper = html.fromstring('<div>' + markup + '</div>')
    node.text = wrapper.text
    for child in list(wrapper):
        node.append(child)


def serialize(doc):
    return '<!doctype html>\n' + html.tostring(doc, encoding='unicode', method='html')


for lang in ('es', 'en'):
    en = lang == 'en'
    p = ROOT / (lang + PREVIOUS) .lstrip('/') / 'index.html'
    doc = html.fromstring(p.read_text())
    doc.find('head/title').text = 'Seventh Dwelling. Chapter 2. — Susidlc' if en else 'Séptima Morada. Capítulo 2. — Susidlc'
    doc.xpath('//meta[@name="description"]')[0].set('content', SUMMARY[lang])
    doc.xpath('//link[@rel="canonical"]')[0].set('href', 'https://susidlc.com/' + lang + ROUTE)
    replace_inner(doc.xpath('//header[@class="reader-heading"]/h1')[0],
                  ('Seventh Dwelling.' if en else 'Séptima Morada.') + '<br><em>' + ('Chapter 2.' if en else 'Capítulo 2.') + '</em>')
    doc.xpath('//details[@class="chapter-summary"]/p')[0].text = SUMMARY[lang]
    for node in doc.xpath('//figure[@class="chapter-video"]'):
        node.getparent().remove(node)
    for kind in ('adaptado', 'original'):
        col = doc.xpath(f'//section[@data-version="{kind}"]')[0]
        heading = col.xpath('.//div[@class="source-headings"]')[0]
        body = col.xpath('.//div[@class="chapter-text"]')[0]
        if en and kind == 'adaptado':
            replace_inner(heading, '<h4>Seventh Dwelling</h4><h4>Chapter 2 | Adapted text</h4>')
            replace_inner(body, ''.join('<p' + (' class="reading-empty"' if not s.strip() else '') + '>' + escape(s) + '</p>' for s in english))
        else:
            replace_inner(heading, pair[kind]['headings'])
            replace_inner(body, pair[kind]['html'])
    note = html.fromstring('<p class="reading-language-note">' + ('Video coming soon.' if en else 'Video próximamente.') + '</p>')
    part = doc.xpath('//section[@class="reading-part"]')[0]
    part.insert(list(part).index(doc.xpath('//div[@class="reading-columns"]')[0]), note)
    nav = doc.xpath('//nav[@class="reader-next wrap"]')[0]
    nav[0].set('href', '/' + lang + PREVIOUS)
    replace_inner(nav[0], '<small><span class="reader-nav-arrow" aria-hidden="true">←</span> ' + ('Previous' if en else 'Anterior') + '</small>' + ('Seventh Dwelling · Chapter 1' if en else 'Séptima Morada · Capítulo 1'))
    nav[-1].set('href', '/' + lang + CONTENTS + '#indice')
    replace_inner(nav[-1], '<small>' + ('Back to contents' if en else 'Volver al índice') + ' <span class="reader-nav-arrow" aria-hidden="true">→</span></small>Las Moradas')
    output = ROOT / (lang + ROUTE).lstrip('/') / 'index.html'
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(serialize(doc))

    # Keep the current two-link navigation: previous and next (contents on the last chapter).
    before = p.read_text()
    previous_doc = html.fromstring(before)
    old_next = previous_doc.xpath('//nav[@class="reader-next wrap"]/a')[-1]
    new_next = deepcopy(old_next)
    new_next.set('href', '/' + lang + ROUTE)
    replace_inner(new_next, '<small>' + ('Next' if en else 'Siguiente') + ' <span class="reader-nav-arrow" aria-hidden="true">→</span></small>' + ('Seventh Dwelling · Chapter 2' if en else 'Séptima Morada · Capítulo 2'))
    old_markup = html.tostring(old_next, encoding='unicode')
    assert old_markup in before
    p.write_text(before.replace(old_markup, html.tostring(new_next, encoding='unicode'), 1))

    index = ROOT / (lang + CONTENTS).lstrip('/') / 'index.html'
    before = index.read_text()
    d = html.fromstring(before)
    group = d.xpath('//*[@id="morada-7"]')[0].getparent()
    old_group = html.tostring(group, encoding='unicode')
    group.xpath('./p[@class="morada-summary"]')[0].text = MORADA_SUMMARY[lang]
    for existing in group.xpath('./a'):
        if existing.get('href') == '/' + lang + ROUTE:
            group.remove(existing)
    entry = deepcopy(group.xpath('./a')[-1])
    entry.set('href', '/' + lang + ROUTE)
    entry[0].text = 'Chapter 2' if en else 'Capítulo 2'
    entry[1].text = 'Read ↗' if en else 'Leer ↗'
    group.append(entry)
    assert old_group in before
    index.write_text(before.replace(old_group, html.tostring(group, encoding='unicode'), 1)
                     .replace('24 chapters available', '25 chapters available')
                     .replace('24 capítulos disponibles', '25 capítulos disponibles'))

# Existing unlocalized links retain the Spanish fallback.
for route in (ROUTE, PREVIOUS, CONTENTS):
    target = ROOT / route.lstrip('/') / 'index.html'
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text((ROOT / ('es' + route) / 'index.html').read_text())
alias = ROOT / 'las-moradas/septima-morada-capitulo-2.html'
alias.write_text((ROOT / 'las-moradas/septima-morada-capitulo-1.html').read_text().replace('capitulo-1', 'capitulo-2'))

updates = ROOT / '.development/site-updates.json'
data = json.loads(updates.read_text())
data['panDeCadaDia'] = {'title': 'Capítulo 2', 'subtitle': 'Séptima Morada', 'url': ROUTE}
updates.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')

sitemap = ROOT / 'sitemap.xml'
s = sitemap.read_text()
for lang in ('es', 'en'):
    old = '<url><loc>https://susidlc.com/' + lang + PREVIOUS + '</loc></url>'
    assert old in s
    new = old.replace('capitulo-1', 'capitulo-2')
    if new not in s:
        s = s.replace(old, old + '\n' + new)
sitemap.write_text(s)

record = {'chapter': '7-2', 'summary': SUMMARY, 'moradaSummary': MORADA_SUMMARY,
          'editorialNotice': 'Resumen editorial del sitio; no forma parte del texto de Santa Teresa.',
          'sources': evidence, 'video': None, 'englishAdaptation': 'las-moradas-septima-capitulo-2-english.json'}
(ROOT / '.development/las-moradas-septima-capitulo-2.json').write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n')

# Verify every paragraph, heading, empty paragraph and source character after HTML serialization.
for lang in ('es', 'en'):
    d = html.parse(str(ROOT / (lang + ROUTE) / 'index.html'))
    for kind in ('original', 'adaptado'):
        col = d.xpath(f'//section[@data-version="{kind}"]')[0]
        expected = english if lang == 'en' and kind == 'adaptado' else pair[kind]['texts']
        assert [p.text_content() for p in col.xpath('.//div[@class="chapter-text"]/p')] == expected
        if not (lang == 'en' and kind == 'adaptado'):
            assert [p.text_content() for p in col.xpath('.//div[@class="source-headings"]/h4')] == pair[kind]['headingTexts']
    assert not d.xpath('//*[@data-reader-video]|//iframe')
    assert d.xpath('//link[@rel="canonical"]/@href') == ['https://susidlc.com/' + lang + ROUTE]
print('Verified complete original and adapted DOCX texts, English adaptation, chapter navigation, contents, and video pending.')
