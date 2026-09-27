# Music catalog

This is a local preview. Do not publish until the owner approves this revision.

The source of the music pages is `music-catalog.json`. Run `python3 .development/build-music.py` from the repository root after editing it. The builder writes `music.html`, four album pages, and their sitemap entries. It does not touch shared styles, shared scripts, other pages, or hosting configuration.

## Releases

The `albums` array determines collection order. Each album's `tracks` array preserves spreadsheet row order. Keep track `id` values stable when editing titles or numbers so existing direct links continue to work.

`upcoming` is a reusable object. Set it to `null` and rebuild to remove the entire section with no placeholder. Update its title, subtitle, cover, coverAlt, and status for another release. Supply both `link` and `linkLabel` to display a single announcement or presave link; otherwise no button appears. The tentative date is deliberately not in public HTML or metadata. The current status is Coming soon.

When a release is published, add its completed album object to `albums` with its desired collection position, cover, description, Spotify URL, and tracks. Then reuse `upcoming` or set it to null. New covers follow the responsive asset manifest format in `music-cover-manifest.json`.

Descriptions remain in static HTML. Browser JavaScript only manages disclosures and opening tracks from direct URL hashes. Track Link controls have been removed at the owner's request; stable article IDs, direct hash URLs, and recording URLs in structured data remain intact. Lyrics use native nested details controls. Without JavaScript, all track information remains readable. There are no embedded players, autoplay, or third party requests on initial load.

## Source and copy

The catalog comes from the owner's three page PDF export `001-SDLC_music Songs - Form Responses 1.pdf`. Album URLs were supplied earlier by the owner and verified through Spotify. Cover filenames identify their corresponding albums.

The following punctuation changes were disclosed before applying the owner's no dashes instruction: compound hyphens become spaces, the John 3:16 quote separator becomes a period, double hyphens around solid beat become quotation marks, and the lyric separator becomes a blank line. No original words were changed. Other typos, capitalization, and lyric notes remain as supplied.

The music page heading is the exact artist name `001-SDLC_music`. Its literal hyphen is an explicit exception requested by the owner to the earlier no dashes instruction. Keep that name unchanged. The current introduction is the owner's exact text:

> An evolving collection of cinematic and experimental music shaped by memory, faith, humor, tension, and everyday life. Explore the albums and imagine where these sounds could live next, from personal listening to film, movement, and visual storytelling. Available worldwide for original scores, soundtracks, licensing, and creative collaboration.

Pending owner content:

* The PDF contains no album descriptions. `description` is null and the paragraph is omitted until the owner provides copy.
* SDLC_10 contains two source track numbers 05. Its sixth row, I hate to love you, retains 05 pending confirmation. Its URL uses its row position, so renumbering will not break its link.
* The bonus track describes a traditional carol and Francisco playing. Its additional credits field is blank. The requested standard credit is retained pending the owner's exact correction.

The contact address for these music pages is me@susidlc.com. Their footer owns that value locally rather than loading the older global content file and overwriting it.

## Checks

Run `python3 .development/check-music.py`. For source comparison the original extraction must exist at `../../tmp/music-source/catalog-raw.json` relative to the repository, or pass its path with `--source`. The checks preserve the exact artist heading and introduction, permit the artist name's hyphen, and verify that removed Link controls stay absent while track IDs and structured direct URLs remain stable. It also builds temporary copies with upcoming release hidden and updated without changing the preview files.

The cover script needs Pillow and the original attached images. Generated images are included with the site, so hosting never needs Python or Pillow. The 320, 640, 960, and 1280 pixel WebP variants preserve full frames, with corrected EXIF rotation and sRGB colors. JPEG fallbacks are supplied.
