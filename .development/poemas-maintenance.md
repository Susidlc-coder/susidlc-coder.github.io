# Poemas Interactivos

The bilingual experience lives at `/es/poemas/` and `/en/poemas/`, with individual journeys at `recorrido.html#poema-01` through `#poema-12`. It uses twelve SVG compositions, separate full-poem reading dialogs, a rotating music strip, and a recommendation after every seven word selections. The browser runs the editorial model locally; there is no per-visitor AI call. Journey state stays in session storage.

Keep the owner's approved centered, slim desktop navigation and mobile menu. The three sections are Música / Music, Poemas / Poems, and Pan de Cada Día, in that order. Preserve the full poem texts, literary translations, geometry, palettes, animation, reader credits, Spotify links, track anchors, and result sharing design.

## Editorial matching, version 2

`.development/editorial-recommendation-v2.json` is the current evidence record for all 36 described tracks and all 282 distinct selected words or short phrases. It records each track's supplied description, scene, interpretation, themes, emotional beginning and ending, and distinguishing combinations. Each cell label is taken verbatim from its own Spanish poem; the record identifies the original paragraph and English display translation. Do not insert album keywords into the literary texts.

`assets/poem-word-semantics.js` provides the contextual word profiles and desktop/mobile word banks. A word's meaning belongs to its own poem: for example, pride in surviving is different from envy; a returning pulse is renewed life rather than play. `assets/recommendation.js` is the single scoring implementation, shared by `poems-es.js` and `poems-en.js`. English labels are display translations of canonical Spanish choices, so the same sequence gives the same song in either language.

All seven choices contribute, with each word profile normalized before pooling. The shared editorial score combines overall meaning (46%), scene imagery (18%), the emotional movement from the first three choices to the last three (24%), and source-supported combinations of ideas (12%). These weights are editorial judgments, not psychological measures or measured visitor probabilities. Results explain actual selected words and the author's song description; they do not diagnose the visitor or claim to infer religious beliefs.

The owner explicitly chose **the strongest meaning match, with meaningful routes to every track**. Recent recommendation history only resolves mathematically equal scores. Never substitute a weaker match to increase album exposure, enforce equal probabilities, or meet frequency targets. Use the same rule for every song. Some tracks naturally fit more combinations than others.

## SDLC_11 Ambience and maintenance

The ten descriptions in `001-SDLC_music Songs.xlsx`, Form Responses 1, rows 28–37, supply Ambience's track meanings and bilingual music pages. `.development/ambience-editorial.json` retains those translations and result summaries; its profiles mirror the current version 2 evidence record. Keep catalog titles, Spotify targets, track anchors and credits consistent with `.development/music-catalog.json`.

When updating meanings or vocabulary, validate every label against its own poem, preserve the full Spanish and English paragraphs, and check labels actually rendered on desktop and mobile. Check every eligible track has a source-supported reachable combination, language parity, sequence sensitivity, and strongest-match behavior even when that song was recently recommended. Simulated frequencies are diagnostics, not real visitor odds. Version the session vocabulary so an old partial sequence cannot mix incompatible meanings with a new word bank.

The 2026-10-10 version 2 audit evaluated 40,000 synthetic seven-choice sequences using browser-observed desktop and mobile cell banks: uniform selections, meaning-guided selections, and direct entry. All 36 tracks appeared in both layouts. A separate seven-selection mobile browser journey verified Elbe from SDLC_11. Publish only after the owner approves the current revision, and run `.development/build-home-updates.py --check` before deployment.
