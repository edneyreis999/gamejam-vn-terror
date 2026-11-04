---
status: approved
slug: expedition-route-map
created: 2026-11-04
approved_on: 2026-11-04
approval: "Implement the plan. — user instruction in this session"
---

# Expedition route map

## Part I — Product

### Outcome

Give the player a visible journey between expedition scenes and give designers a reusable event-authored route surface. This increment replaces immediate scene-to-scene advancement with an explicit next-node choice, following the approved [mockup](../../004-map-darkest-dungeon/mockup-caminho-igreja-segunda-armadilha.png).

The canonical behavior catalog is [_user_stories.md](_user_stories.md). US-001 covers travel and discovery, US-002 covers saves and repeated attempts, and US-003 covers reusable authoring. Presentation, content and authoring contracts are in [_uiux.md](_uiux.md), [_content.md](_content.md) and [_dx.md](_dx.md).

### Confirmed rules

After party selection, departure and the existing opening dialogue, present the route with the pawn at the tavern. Only its next node can be entered in Afogados. Return to this map after a completed trap or continuing from a camp. A camp's scene, destination reward or Council starts only after reaching its node. Existing automatic retreat, bad ending, sacrifice and camp-only voluntary retreat rules remain in force.

Church and park: tavern → two traps → camp → two traps → camp → one trap → destination. Village: tavern → two traps → camp → two traps → camp → two traps → Council. Draw only immediately before entering a trap. Unknown traps show `?`; discovered assignments persist through retreat and later attempts. Visits reset at departure. No backward travel in Afogados.

Reusable maps allow at most four undirected links per node, explicit authoring of links, orthogonal straight segments and branches. Default return is allowed. The default arrival action runs once per attempt; authors may request every arrival. Returning from another scene, hovering and loading never invoke arrival.

### Boundaries

One new native map serves the three routes. All artwork is separate from square geometry and text. Mouse and keyboard work; reduced motion skips travel animation without skipping actions. New campaigns are required; personal saves are not deleted or migrated. Multiple paths are supported by the plugin but Afogados ships linear routes. Automatic routing, custom camera and zoom are outside this increment. Gamepad tests remain excluded by ADR-G005.

## Part II — Technical responsibilities

The user chose parallax + native events, explicit connection notes and native arrival event lists. Native lists can call Common Events, Script or transfer commands; no code is embedded in notes. Generic presentation and graph state belong to the reusable plugin. Campaign eligibility, drawing encounters and rewards remain in the existing domain rules. The bridge only projects campaign state and connects validated actions to native orchestration.

MZ capabilities were confirmed in `js/rmmz_objects.js` (event pages, event start, native save objects), `js/rmmz_scenes.js` (map scene and input), and `js/rmmz_core.js` (Bitmap/Sprite). Coreto's installed CLI and extension guidance were consulted; no installed route-graph provider was found. The approved custom plugin fills this gap without editing frozen Coreto, MZ or third-party sources. The game's existing event-owned scenes and PT/EN table remain authoritative.

The scene must not accept two arrivals during movement or native event execution. Saving a stable map restores position and discovery without repeating consequences. Author-facing controls need a discoverable CLI and an editor guide. Packaging must retain explicitly referenced route assets. Chrome covers the integrated journey; NW.js covers a representative short journey using the maintained runner. Checks and remaining human judgments are separated in [_tests.md](_tests.md) and [_playtest.md](_playtest.md).

### Baselines and evidence

This is an incremental change to the completed encounter/formation and campfire baselines, not a rewrite of their historical specs. Design authority: canonical GDD §§5.4, 7, 28 and the new §29. Native scene authority: Common Event 40, Map047 and the existing trap/camp/destination events. Delivery results belong in [verification.md](verification.md).

### Open questions

No blocking design questions. Human visual/readability and pacing acceptance remains pending; technical checks cannot establish it.
