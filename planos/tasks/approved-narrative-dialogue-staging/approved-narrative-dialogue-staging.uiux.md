---
status: approved
approved_on: 2026-09-18
owner: UI/UX
stage: surface-and-technical-design
---

# Reading and scene presentation

Owns the visible presentation of RQ-002–008/010/012 in [spec.md](spec.md). The user approved this design as part of the complete spec set; integrated rendering remains unverified. Preserve the [native interaction baseline](../eventbridge-minimal-runtime/eventbridge-minimal-runtime.uiux.md) wherever this contract states no replacement.

The player reads a remembered expedition on a desktop, periodically returning to its storyteller. The surface must make the current speaker and time frame understandable while keeping the player's reading pace and decisions intact. Use the current native message window, name box and reading controls; no new buttons, time labels, audience avatars or menus are needed.

## Scene ownership

| Scene | Visible composition | Reading and exit |
| --- | --- | --- |
| Older Rheed in prologue or new route narration | Older Rheed alone, full color, black background; native speaker name Rheed | Consecutive narrator boxes retain the same composition. The next direct dialogue explicitly restores its past scene and actual participants. |
| Young Rheed and Ivaí | Tavern from PR #17; young Rheed left, Ivaí right; source portraits and PR #17 focus style | Preserve the approved script and final response. Transfer to preparation once after the final acknowledgement. |
| Hero interaction Maps037–044 | The visited hero remains through their menu; Ivaí joins the conversation and leaves before returning to that menu | Main dialogue, successful selection and full-party response all use their applicable entrance/focus/exit. Living unselected heroes remain available for visits, conversation and selection under the existing formation rules. Dead heroes remain unavailable. Visiting a hero does not add them to the expedition. |
| Pérola / Floraí | Existing locations and prison framing, with Gorvak-style focus adapted to the portraits | Deliver the piece and character-specific material; then the new first/second closure uses older Rheed over black. Completion order determines which closure appears. |
| Council | New revelation alternates Rheed over black and direct past dialogue; actual eligible heroes and Ivaí retain their places when the past resumes | Preserve the solo case. Andirá stays in the water reflection; eligible opinions follow, then Irati's final excerpt and the ending choice. |
| Ending | Corresponding existing full-screen illustration and new native lower text | Preserve outcome, memorial, eligible epilogues and credits routing. No narrator bust is added. |
| Epilogue | Supplied hero illustration fitted whole and centered over black, lower native text, no bust overlay | Stable H1–H8 order and existing eligibility; HIDE reveals the illustration. |
| Trap success | Same encounter background and native lower text; no hero or narrator bust | Display only the supplied result associated with the chosen approach. Keep current approach labels and all other prose. Complete once after the final message. |

The full-game staging scope also includes native dialogue helpers outside the hero maps, such as sacrifice farewells and existing character exchanges. The technical inventory must identify their owners before implementation; this table is not permission to silently omit them.

## Continuity and control

- Keep normal entrance, speaker emphasis, listener dimming and exit from the approved reference. Adapt targets to each portrait and participant count. A repeated box by the same speaker does not replay entrance or focus unnecessarily.
- Preserve reduced motion. Its native alternatives reach the same final composition without the reference PR's newly unconditional movements; copying the source's removed preference checks is not part of the approved style.
- A cut to older Rheed clears the past background and participants before his visible appearance. Return restores the authored past composition, not campaign actions, rewards, choices or a second passage completion. No leftover listener, prison or reflection appears over the black narrator scene.
- Native text splitting may add boxes within a reading unit, without rewriting, truncating or duplicating the source prose. Preserve its paragraph and dialogue order. Keep text clear of controls at both supported viewport references.
- HIDE/Tab and restoration remain observational; restoring the interface cannot advance text or choose an action. Settings preserves composition, reader position, volumes and current participants. Input focus and mouse/keyboard behavior remain native.
- FAST remains available only for a completed reading unit already seen in that campaign. Partial or interrupted reading is not completion. A gesture that closes a message cannot also select the next choice.
- Preserve native checkpoint policy and file ownership. The save contract must describe what the last earned checkpoint actually contains; it must not promise persistence at every displayed line.

## Confirmed surface — epilogue image fit

The supplied source has seven 1536×1024 images (3:2) and Elowen at 1672×941 (approximately 16:9). A 3:2 image stretched to the native 1280×720 area distorts it; proportional fill crops about 16% of its source height. This is a visible trade-off, not a choice of arbitrary coordinates.

**Confirmed by D-018:** keep the whole illustration centered with proportional scaling, using black side margins when needed. It remains the scene's sole artwork, with the existing lower message window over it and HIDE available. Do not add frames, duplicated blurred backgrounds, portrait overlays or a special gallery interface.

The alternative of proportional fill with cropped edges was not selected. Never stretch the image. At a 1280×720 logical area, each 1536×1024 source occupies 1080×720, leaving 100 pixels on either side. Apply the same proportion to a genuinely larger logical area; a larger browser viewport alone must not be mistaken for a changed MZ logical resolution.

## Verification boundary

The later verification matrix must cover both 1280×720 and 1920×1080 game areas, normal/reduced motion, mouse/keyboard, all eight hero visits including alternate responses, maximal and solo Council, narrator cuts, and the eight epilogue illustrations. Check readability, visible faces, preserved prisons/reflection, control restoration and absence of stale pictures. Native zoom tests remain excluded by [ADR-G003](../../../docs/adrs/adr-g003-excluir-testes-de-zoom-nativo.md).

No gameplay, rendered integration, accessibility acceptance or motion comfort assessment has been performed during this authoring step.
