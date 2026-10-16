---
status: draft
owner: Technical Art
---

# Technical art and scene staging

Owns RQ-005/009. Use existing `Dryland_Camp.png`, the eight existing stage portraits, current conversation busts and the colored older-Rheed portrait. No new illustration or edited character PNG is required. Inspect the actual loaded asset names and margins at implementation; do not restore historical tavern scales blindly.

## Composition

Use one stable camp position for each H1–H8 identity around the pictured fire, keeping its center legible and faces above the native message area. Missing living recruits are absent; dead recruits occupy only their own positions for the entry fade. A scene can briefly contain up to eight hero images (living party plus campaign dead), so frame that worst case before accepting the normal three-person layout. Use native picture positioning/scaling, preserve proportions and avoid face overlap. Numeric transforms remain editable in events; Lucas/user owns final framing.

The colored older narrator appears in the existing narration treatment before camp. Remove him before showing the past. Young Rheed and Ivaí use their existing dialogue bust conventions only when speaking/listening; no second older Rheed on the camp stage. Preserve native speaker focus, portrait orientation and HIDE behavior. Reuse the hero-map conversation framing over the camp background, with participating living interlocutors only.

The 2026-10-16 refinement retains each hero’s authored Talk scale, orientation and framing in new social topics. Keep the hero in slot 60 and the interlocutor in slot 63 from the first line, independent of speaking order. Reading-unit boundaries only reset permissions: they do not erase/re-enter continuing busts. A guest intervention adds slot 62, facing the host, while the original participants remain. Native event commands own these transforms and final cleanup.

## Absence and entry

On each genuine arrival, display all dead campaign heroes then fade their images simultaneously for three seconds (180 native frames). Their pictures never bind to choices. Living survivors remain stable. Reduced motion skips the visual appearance entirely, leaving empty positions; narration and grief retain the loss information. After fade, present eligible short grief reactions in the order specified by the programming contract.

Returning from a hero menu, returning from Options, or resuming a checkpoint after arrival does not replay the entrance. Native saved pictures/interpreters preserve supported resume; no Bridge replay renderer. Camp never consumes the tavern's once-per-death effect. Owner-approved refinement (2026-10-16): the tavern fade and its cleanup wait also last 180 frames; reduced-motion removal remains immediate.

The latest nameplate follow-up uses installed IconSet index 04 at native 32×32, centered 4 px above each plate. Keep the full tile visible even for top-row tavern names; names use centered 18 px text and retain selection ✓. The indicator is a child Sprite with a native atlas frame, not a battle state; ImageManager owns the shared bitmap.

## Lifecycle and assets

Scene owners explicitly retire their stage pictures, attached labels and busts on transfer. Do not erase unrelated persistent UI. Use existing native loading/error behavior, no custom wait loop, blank placeholder or silent missing-asset fallback. Add newly referenced existing files to native authoring/preload selectors only where the approved contract already requires them; do not expand loading infrastructure in this increment.

Capture actual normal/reduced-motion compositions, maximum simultaneous images, a two-person exchange, an interrupted/resumed checkpoint and return to tavern. Technical inspection is separate from Lucas/user framing acceptance. Devlog capture: visible absence and a survivor's short reaction, followed by a separately marked tavern subject.
