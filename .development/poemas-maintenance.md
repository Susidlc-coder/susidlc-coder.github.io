# Poemas Interactivos

The approved experience lives at `/poemas/`. It uses `assets/poemas.css` and `assets/poemas.js`, with twelve precomputed SVG compositions, poem reading dialogs, five album announcements, and semantic recommendations every seven cell selections. It needs no build step, external library, backend, or per-visitor AI call. Journey state stays in browser session storage. URL fragments `#poema-01` through `#poema-12` open individual compositions.

The main navigation on every non-redirect page is **Música**, **Poemas**, **Pan de Cada Día**, in that order, linking to `/music.html`, `/poemas/`, and `/pan-de-cada-dia/`. Keep this order when creating pages or updating generators. Music templates are in `build-music.py`; current Pan pages are maintained as static HTML.

Keep the full approved poem texts, gradient relief, geometry, separate reading controls, and normalized semantic song profiles. The recommendation pool includes the 26 songs with descriptions; add new song profiles when descriptions are supplied. Do not substitute random songs for semantic recommendations.
