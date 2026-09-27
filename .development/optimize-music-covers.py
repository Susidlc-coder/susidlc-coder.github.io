#!/usr/bin/env python3
"""Build responsive covers from the supplied originals without cropping artwork.

Requires Pillow. Files are oriented using EXIF, converted to sRGB, then resized
with Lanczos. Originals are never modified. Run from any working directory.
"""

from io import BytesIO
import json
from pathlib import Path

from PIL import Image, ImageCms, ImageOps


PROJECT = Path(__file__).resolve().parent.parent
OUTPUT = PROJECT / "assets" / "music" / "covers"
ICLOUD = Path(
    "/Users/susinanne/Library/Mobile Documents/com~apple~CloudDocs/*Susidlc/DistroKid"
)
SOURCES = {
    "11": Path("/Users/susinanne/Downloads/SDLC_11.png"),
    "10": ICLOUD / "*UPLOADED SDLC_10/SDLC_10.jpeg",
    "07": ICLOUD / "*UPLOADED SDLC_07/SDLC_07.jpg",
    "01": ICLOUD / "*UPLOADED SDLC_01 Best Soundtracks/SDLC_01.png",
    "02": ICLOUD / "*UPLOADED SDLC_002 Anoche/SDLC_02.png",
}
WIDTHS = (320, 640, 960, 1280)
SRGB = ImageCms.ImageCmsProfile(ImageCms.createProfile("sRGB"))


def prepare(source):
    """Preserve appearance, orientation, full artwork, and any transparency."""
    with Image.open(source) as original:
        metadata = {
            "sourceFilename": source.name,
            "sourceDimensions": list(original.size),
            "sourceBytes": source.stat().st_size,
            "sourceOrientation": original.getexif().get(274, 1),
        }
        icc = original.info.get("icc_profile")
        image = ImageOps.exif_transpose(original)
        alpha = image.getchannel("A") if "A" in image.getbands() else None
        image = image.convert("RGB")
        if icc:
            profile = ImageCms.ImageCmsProfile(BytesIO(icc))
            metadata["sourceColorProfile"] = ImageCms.getProfileName(profile).strip()
            image = ImageCms.profileToProfile(image, profile, SRGB, outputMode="RGB")
        else:
            metadata["sourceColorProfile"] = "untagged, assumed sRGB"
        if alpha is not None and alpha.getextrema() != (255, 255):
            image.putalpha(alpha)
        metadata["dimensions"] = list(image.size)
        metadata["colorProfile"] = "sRGB"
        return image, metadata


def resize(image, width):
    width = min(width, image.width)
    height = round(image.height * width / image.width)
    return image.resize((width, height), Image.Resampling.LANCZOS)


def describe(path, image):
    return {
        "src": "/" + path.relative_to(PROJECT).as_posix(),
        "width": image.width,
        "height": image.height,
        "bytes": path.stat().st_size,
    }


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for code, source in SOURCES.items():
        image, metadata = prepare(source)
        metadata["webp"] = []
        for width in sorted({min(width, image.width) for width in WIDTHS}):
            resized = resize(image, width)
            path = OUTPUT / f"sdlc-{code}-{width}.webp"
            resized.save(path, "WEBP", quality=86, method=6, icc_profile=SRGB.tobytes())
            metadata["webp"].append(describe(path, resized))
        fallback = resize(image, 960)
        if fallback.mode == "RGBA":
            background = Image.new("RGB", fallback.size, (248, 243, 234))
            background.paste(fallback, mask=fallback.getchannel("A"))
            fallback = background
        path = OUTPUT / f"sdlc-{code}.jpg"
        fallback.save(
            path, "JPEG", quality=89, optimize=True, progressive=True,
            subsampling=0, icc_profile=SRGB.tobytes(),
        )
        metadata["fallback"] = describe(path, fallback)
        manifest[f"SDLC_{code}"] = metadata
    target = PROJECT / ".development" / "music-cover-manifest.json"
    target.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    total = sum(path.stat().st_size for path in OUTPUT.iterdir() if path.is_file())
    print(f"Generated {len(SOURCES)} covers, {len(SOURCES) * (len(WIDTHS) + 1)} assets, {total:,} bytes total.")
    for album, metadata in manifest.items():
        sizes = ", ".join(f'{item["width"]}w: {item["bytes"]:,} B' for item in metadata["webp"])
        print(f'{album}: {metadata["dimensions"]}, {sizes}; JPEG {metadata["fallback"]["bytes"]:,} B')


if __name__ == "__main__":
    main()
