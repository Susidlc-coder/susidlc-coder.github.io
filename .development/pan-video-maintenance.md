# Las Moradas videos

The owner supplied six chapter video links on 2026-10-10. las-moradas-videos.json is their canonical map; keys are morada-chapter-part, with part 0 for an unsplit chapter. The map is mirrored in assets/las-moradas-videos.js for older chapter source compatibility.

Current chapter pages render each player directly in the HTML with data-reader-video, using the existing bilingual-chapters.js playback control. Place the player after its corresponding part caption and before the reading columns, in Spanish and English. The unlocalized publication fallback also contains the Spanish player. First Dwelling chapter 2 has only a Part 1 video; never attach that video to Part 2.

Only the six supplied chapters show Video in the contents index. Keep original, adapted and translated reading text and the approved layout intact. The homepage Pan announcement remains Seventh Dwelling chapter 1, which is included in the supplied list and already had the correct video. Verify the banner with build-home-updates.py --check before publication.

The two previously missing players, First Dwelling chapter 1 and Third Dwelling chapter 1, were added in the current preview. Both played past ten seconds in the browser; Third Dwelling was also checked at a 390px mobile width. Existing players for 1-2-1, 6-10-0, 6-11-0 and 7-1-0 retain their supplied IDs. work/update-pan-videos.py updates preview and staging without replacing the reader layout.

The complete reading-mode toolbar belongs immediately after each part’s optional video and before its reading columns. All toolbars synchronize Adapted, Original and Side by side for the whole chapter. The English language note follows the first toolbar. Single-mode column labels are visually hidden to avoid duplicating the toolbar; parallel reading keeps both column labels visible. Preserve this placement when updating players.

At widths of 720px or less, hide the parallel-reading button and normalize a saved or active parallel mode to Adapted. Desktop retains all three modes.

Mobile Adapted and Original buttons sit together at the right edge. The contents heading shows only the available chapter count, without the editorial-description note.

Unsplit chapters omit the visible Reading/Lectura caption and its wrapper, preserving a named reading region. Leave Part 1/Part 2 headings for multipart chapters. The Las Moradas cover uses a centered SVG with animated gradients only in the three bands between arch outlines, at the Poems 5.5-second wave rhythm; reduced-motion preferences show a static blend.

The current cover palette is metallic bronze/copper. Highlight phases run outer to inner (0, 0.9, 1.8 seconds) on a 5.5-second cycle; the caption credits Saint Teresa. The reading toolbar omits its visible mode label, keeps its accessible group name, and uses compact padding. Preserve the current copper release when making targeted edits; older styling scripts are historical snapshots.

Reading buttons remain at the right edge, vertically balanced with 12px padding above and below. The chapter summary has no bottom margin; its bottom divider directly precedes the controls on chapters without video.
