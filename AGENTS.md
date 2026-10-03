# Susidlc website maintenance

This is the active static susidlc.com website project. Follow the owner's latest instructions and preserve the approved visual style, song links, credits, and reader interactions. Publish only when the owner approves the current revision.

Homepage detail preferences: the main introductory paragraph has no dot. Both update banners use the same gold yellow dot. Discover and the two update banners have no arrows; arrows elsewhere remain part of the approved design.

## Homepage updates are part of content updates

Whenever the owner supplies a new music release, song, chapter, reading, or video, update its destination content and the corresponding homepage banner together. The other banner keeps its latest content. Routine spacing, typo, styling, and credit corrections do not replace a content announcement unless the owner asks.

- Music releases: maintain `.development/music-catalog.json`, including `latestRelease`. The homepage music banner derives its album title and local link from that catalog. The normal music build also refreshes the homepage banners.
- A different Music content announcement can use `music.source: "custom"` in `site-updates.json` with `title`, optional `subtitle`, `status`, and a local `url`. Switch back to `latestRelease` for the next album release.
- Pan de Cada Día: after adding the actual page/video, update `panDeCadaDia` in `.development/site-updates.json` with its chapter/title, Morada/subtitle, and local page URL. Never announce a chapter that is only an example or has not been added.
- Run `python3 .development/build-home-updates.py` after content changes. It replaces only the marked homepage update block, preserves the surrounding homepage, and validates both local destinations.
- Before any publication run `python3 .development/build-home-updates.py --check`. Include the updated `index.html` and changed sources in that same publication.
- Preview the affected page and homepage banners together before requesting publication approval. Do not ask again when the owner has already approved publication for that revision.

The owner can give updates in ordinary English or Spanish with the album/chapter name, content, and links or attachments. Do the catalog/page/banner work as part of that request; do not require a special form. See `.development/home-updates.md` for examples and the current sources.

Older architecture and maintenance notes describe earlier site revisions. Current approved pages, source data, these instructions, and the owner's latest requests take precedence over those obsolete descriptions.
