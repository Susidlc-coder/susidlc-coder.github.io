"""Extract gallery colours and tiny index images from existing web copies."""
import json, colorsys
from pathlib import Path
from PIL import Image, ImageOps

ROOT=Path(__file__).resolve().parents[1]
catalog=json.loads((ROOT/'.development/morpheus-catalog.json').read_text())
out=ROOT/'assets/morpheus/thumbs';out.mkdir(exist_ok=True)
preferred={'17':1,'14':1,'15':1}
data={}
for world in catalog['worlds']:
    sample=Image.new('RGB',(64,64*len(world['artworks'])))
    for i,art in enumerate(world['artworks']):
        with Image.open(ROOT/art['src'].lstrip('/')) as image:
            sample.paste(image.convert('RGB').resize((64,64)),(0,64*i))
    quantized=sample.quantize(colors=16,method=Image.Quantize.MEDIANCUT)
    palette=quantized.getpalette()
    candidates=[(count,tuple(palette[index*3:index*3+3])) for count,index in quantized.getcolors()]
    # Let coverage lead; favour distinct hues over near-identical neutrals.
    candidates.sort(key=lambda c:c[0]*(1+.3*colorsys.rgb_to_hsv(*(v/255 for v in c[1]))[1]),reverse=True)
    chosen=[]
    for threshold in [54,26,0]:
        for count,rgb in candidates:
            if rgb not in chosen and all(sum((a-b)**2 for a,b in zip(rgb,other))**.5>threshold for other in chosen):
                chosen.append(rgb)
            if len(chosen)==5:break
        if len(chosen)==5:break
    chosen.sort(key=lambda rgb:.2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2])
    art=world['artworks'][preferred.get(world['number'],0)]
    with Image.open(ROOT/art['src'].lstrip('/')) as image:
        thumb=ImageOps.contain(image.convert('RGB'),(160,160),Image.Resampling.LANCZOS)
        path=out/(world['number']+'.webp');thumb.save(path,'WEBP',quality=74,method=6)
    data[world['number']]={'colors':['#%02x%02x%02x'%rgb for rgb in chosen],
        'thumbnail':{'src':'/'+str(path.relative_to(ROOT)),'width':thumb.width,'height':thumb.height,'artwork':art['id']}}
(ROOT/'.development/morpheus-index.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print(f'Prepared {len(data)} gallery palettes and thumbnails ({sum(p.stat().st_size for p in out.glob("*.webp")):,} bytes).')
