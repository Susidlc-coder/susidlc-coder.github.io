# Morpheus preview maintenance

Status: revision 4 is local preview only. Do not publish until the owner approves this exact revision.

## Sources

- `.development/morpheus-catalog.json`: stable world and artwork identifiers, relative original names, optimized asset paths and sizes.
- `.development/prepare-morpheus.py`: reads the owner's source folders and creates display-size WebP copies (800px longest edge, quality 76). Top-level source images are intentionally excluded. Never upload the original archive. Existing identifiers are retained; new identifiers append.
- `.development/build-morpheus.py`: generates root, Spanish and English gallery pages. Run with Python 3.12+ (the bundled Codex Python is available). REGIONS defines the primary-world and Between-world traversal; CONNECTIONS makes each shared Between world discoverable from all named endpoints. Keep folder names exact and Unassigned last. Do not alphabetize the display order.
- `assets/morpheus.css` and `assets/morpheus.js`: cosmic metallic appearance, gallery layout, and inquiry preparation.

## Design and interactions

Keep the title Morpheus World, the shared gold header, numbered editorial collages and NASA-photo-inspired ocean blue, silver, teal and copper palette. Use the owner's artwork, no invented slogans and no pause-colour control. Respect reduced motion. Provide distinct daylight and lamplight appearances. Do not add image enlargement or full-resolution downloads.

The inquiry requires email, artwork code(s) and ZIP/postal code, with an optional message. It currently prepares a mailto draft to the site's existing public contact address; there is no backend submission and no claim that a message was sent. Preserve this honest two-step behavior unless a form service is separately configured.

## Preview scope and publication caution

The existing checkout contains older, unrelated uncommitted work. Do not publish the whole working tree. The initial existing-file navigation scope is in morpheus-preview-scope.json; the complete Morpheus path manifest is morpheus-publication-files.json. Before eventual publication, apply these additive navigation changes to the current published baseline and preserve newer unrelated content. The three homepage files used for this preview were refreshed from known published commit 192df8caa5195f4bed7cfa729a9c59331bbcd4fc before adding the menu entry. Baseline backups and screenshots are under the workspace outputs folder, not publication files.

Checked in revision 2: 60 generated pages; 19 folders; 229 artwork files; 7,254,902 bytes of optimized art; no missing local href/src targets. Desktop and 390/320px mobile layouts, menu, locale switch, illumination switch, required inputs and email draft were exercised. No email was sent, and nothing was pushed or deployed.

## Revision 3 — owner refinements

Use Nazeo copy.png (top-level source) as the central landing artwork, keeping 16-001 left and 14-002 right. Nazeo is a feature image only; the gallery count remains 229. The title gradient span includes trailing padding so the final s is never clipped.

The constellation has 7 named primary worlds and 11 small Between points; all 18 link directly to galleries. Between names appear on hover and keyboard focus. Unassigned remains in the index only. Keep the graph's endpoint relationships from the folder names.

The index lists all 19 galleries once, grouped by primary world and related Between galleries. Each entry uses a small thumbnail and five colours extracted from that gallery. Rebuild these with .development/prepare-morpheus-index.py after catalog changes, then run build-morpheus.py. Index image metadata and palettes live in .development/morpheus-index.json; thumbnails total 61,578 bytes for this revision.

## Revision 4 — relief map integrated into the landing

The owner approved the relief map concept for integration, and requested a new preview before publication. The landing now loads assets/morpheus/terrain-map.webp (471,232 bytes, 1536×1024) below the interactive points, with assets/morpheus-map.css. Map routes are brighter and softly luminous. The 18 node positions and direct gallery URLs, all 19 thumbnail entries, their palettes and their order remain unchanged. On small screens the map scrolls within its frame; the gallery index flows normally below.

The original isolated experiment remains at .development/morpheus-map-preview.html for comparison; it is not a publication file. The generated terrain's provenance and prompt are recorded in .development/morpheus-map-test/generation.md. No new generation was needed for integration. Publish only after approval of the integrated revision4 preview.

### Revision 4 dashed refinement

Owner prefers the earlier dashed, shiny constellation treatment over solid connections. Use fine pale-ice dashed strokes with a soft cyan glow layer underneath on the integrated terrain map. Keep this exact styling in the next approval preview. No publication authorized.
