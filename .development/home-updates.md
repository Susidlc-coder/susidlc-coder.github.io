# Homepage latest updates

The homepage has two permanent, static links under Discover: Music in deep green and Pan de Cada Día in warm stone. The gallery overlaps the color bands on desktop. On mobile the readable links remain together above the artwork. Both work without JavaScript.

Both labels use the same gold yellow dot. The update links and Discover omit arrows, and the main introductory paragraph has no dot. Other site arrows keep their existing design.

## What the owner sends

Use ordinary messages. Examples:

> Music update: SDLC_12 is released. Here are the cover, Spotify album link, and song links. Give me a preview.

> Pan update: add Capítulo 11 of Sexta Morada. Here is the chapter text and/or video link. Give me a preview.

The same request includes the destination page, its section listing, and the homepage announcement. Missing optional details can remain pending, as with SDLC_11; never invent them. A chapter number in an example is not an instruction to create or announce that chapter.

## Sources and build

Music reads `latestRelease.id` from `music-catalog.json`, then uses the matching album's title, subtitle, and local page. Updating the catalog and running the music builder updates the homepage automatically. `site-updates.json` holds the short music status and the latest Pan de Cada Día title, subtitle, and URL. The Pan entry is explicit because a newly uploaded video or chapter is not always the highest numbered chapter.

For a new song or another Music content addition, set `music.source` to `custom` and supply `title`, optional `subtitle`, `status`, and `url` in that same file. The URL can point to a song's stable hash. Return to `latestRelease` for the next album release. Pan subtitles are also optional, so a reading outside Las Moradas can use its own title and link.

Run `python3 .development/build-home-updates.py` to refresh both links in `index.html`. It touches only `HOME UPDATES START` through `HOME UPDATES END`. Run it with `--check` before every publication; a stale banner fails the check. Publish the content page and refreshed homepage together after the owner's approval.

Latest means a content release or addition. Design fixes and credit/lyric corrections keep the current announcements unless the owner requests a new notice.

The workflow lives in project `AGENTS.md` so future agents and new checkouts receive it. It does not depend on conversational memory or a background schedule.
