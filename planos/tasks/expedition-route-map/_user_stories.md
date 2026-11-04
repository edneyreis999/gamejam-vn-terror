# User stories

## US-001 — Follow the expedition

As a player, I want to see and advance my route between scenes.

- AC-1: Departure shows the tavern; selecting the next trap moves the pawn and only then reveals the encounter. Completed scenes return to the map.
- AC-2: Known traps show their assigned name/art on hover/focus; unknown traps show `?`. The current and next positions are distinguishable.
- AC-3: Each route preserves its confirmed camp cadence and starts its destination only after the last click.
- EC-1: Clicking prior, distant or unavailable nodes, holding input, hovering and repeated confirmation cannot advance progress or draw extra encounters.

## US-002 — Resume and retry

As a player, I want my journey and discovered encounters to survive Continue and retreat.

- AC-1: Continue at a saved map restores the same node and assignments without firing arrival.
- AC-2: Camp retreat and a new departure reset visits to the tavern but preserve assignments and RNG until a genuinely new encounter is entered.
- EC-1: Saving/menu access during travel is unavailable; interruption resumes the last successful checkpoint.
- EC-2: Reduced motion preserves action order while omitting pawn travel.

## US-003 — Author another route

As a designer, I want to arrange events and native arrival actions without adding game-specific logic to the map plugin.

- AC-1: A marked native map with parallax, event graphics or picture notes and explicit links produces a selectable route.
- AC-2: Branches support four neighbours; return defaults to allowed and can be disabled per node. Arrival defaults to once per attempt, with an every-arrival option.
- AC-3: Plugin parameters, commands and CLI provide documented read/edit paths and units.
- EC-1: Missing links, duplicate IDs, diagonal segments or more than four links produce actionable errors instead of an inferred route.
