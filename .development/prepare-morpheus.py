"""Make display-size copies only; the owner's iCloud originals stay untouched."""
import json, re, unicodedata
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageOps, ImageCms, ImageDraw

ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path('/Users/susinanne/Library/Mobile Documents/com~apple~CloudDocs/*Susidlc/4_Morhpeus/City-morpheus copy')
OUT=ROOT/'assets/morpheus'
OUT.mkdir(parents=True,exist_ok=True)
CAT=ROOT/'.development/morpheus-catalog.json'
old=json.loads(CAT.read_text()) if CAT.exists() else {'worlds':[]}
prior={w['name']:w for w in old['worlds']}
SRGB=ImageCms.createProfile('sRGB')
def slug(s):
 return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()).strip('-')
def natural(s):
 return [int(v) if v.isdigit() else v.lower() for v in re.split(r'(\d+)',str(s))]
folders=sorted((p for p in SOURCE.iterdir() if p.is_dir()),key=lambda p:natural(p.name))
worlds=[]; thumbs=[]
next_world=max((int(w['number']) for w in old['worlds']),default=0)+1
for wi,folder in enumerate(folders,1):
 prev=prior.get(folder.name,{})
 number=prev.get('number')
 if number is None:
  number=f'{next_world:02}'; next_world+=1
 world={'name':folder.name,'number':number,'slug':prev.get('slug',slug(folder.name)),'artworks':[]}
 known={a['source']:a for a in prev.get('artworks',[])}
 next_art=max((int(a['id'].rsplit('-',1)[1]) for a in known.values()),default=0)+1
 files=sorted((p for p in folder.rglob('*') if p.suffix.lower() in {'.png','.jpg','.jpeg','.webp','.tif','.tiff'} and not p.name.startswith('.')),key=lambda p:natural(p.relative_to(folder)))
 for i,path in enumerate(files,1):
  rel=str(path.relative_to(SOURCE)); ident=known.get(rel,{}).get('id')
  if ident is None:
   ident=f'{number}-{next_art:03}'; next_art+=1
  dest=OUT/(ident+'.webp')
  with Image.open(path) as raw:
   im=ImageOps.exif_transpose(raw)
   icc=raw.info.get('icc_profile')
   alpha=im.getchannel('A') if 'A' in im.getbands() else None
   im=im.convert('RGB')
   if icc:
    try: im=ImageCms.profileToProfile(im,ImageCms.ImageCmsProfile(BytesIO(icc)),SRGB,outputMode='RGB')
    except (ValueError,OSError): pass
   if alpha is not None: im.putalpha(alpha)
   im.thumbnail((800,800),Image.Resampling.LANCZOS)
   if not dest.exists(): im.save(dest,'WEBP',quality=76,method=6)
   art={'id':ident,'source':rel,'src':'/'+str(dest.relative_to(ROOT)),'width':im.width,'height':im.height,'bytes':dest.stat().st_size,'sourceBytes':path.stat().st_size}
   world['artworks'].append(art)
   if i<=3:
    thumb=ImageOps.contain(im.convert('RGB'),(160,150))
    thumbs.append((world['name'],ident,thumb.copy()))
 worlds.append(world)
 print(world['name'],len(files),flush=True)
catalog={'worlds':worlds,'totalImages':sum(len(w['artworks']) for w in worlds),'sourceBytes':sum(a['sourceBytes'] for w in worlds for a in w['artworks']),'webBytes':sum(a['bytes'] for w in worlds for a in w['artworks'])}
CAT.write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
# The owner selected this top-level image for the landing only in revision 3.
# It is not assigned a gallery number or included in the 229-piece catalog.
hero_source=SOURCE/'Nazeo copy.png'
if hero_source.exists():
 with Image.open(hero_source) as raw:
  hero=ImageOps.exif_transpose(raw).convert('RGB')
  hero.thumbnail((900,900),Image.Resampling.LANCZOS)
  hero.save(OUT/'nazeo.webp','WEBP',quality=82,method=6)
outputs=ROOT.parents[1]/'outputs';outputs.mkdir(exist_ok=True)
for chunk in range(0,len(thumbs),24):
 items=thumbs[chunk:chunk+24]; sheet=Image.new('RGB',(1000,((len(items)+4)//5)*200),'#e6dfd0');draw=ImageDraw.Draw(sheet)
 for j,(name,ident,im) in enumerate(items):
  x=(j%5)*200;y=(j//5)*200;sheet.paste(im,(x+(200-im.width)//2,y))
  draw.text((x+10,y+154),ident,fill='#33241e');draw.text((x+10,y+170),name[:24],fill='#33241e')
 sheet.save(outputs/f'morpheus-contact-{chunk//24+1}.jpg',quality=88)
print(json.dumps({k:v for k,v in catalog.items() if k!='worlds'}))
