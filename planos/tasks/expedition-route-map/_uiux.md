# UI/UX

The expedition map is a new surface for US-001/002. It uses the approved [church mockup](../../004-map-darkest-dungeon/mockup-caminho-igreja-segunda-armadilha.png) as its visual direction: parchment, ink illustration, large nodes, square connectors, purple current/focus state and a separate pawn.

States: tavern departure; unknown trap; known trap from a previous attempt; completed trap this attempt; current position; available next node; unavailable future node; travelling; native arrival event; saved/restored map. Unknown art and tooltip remain `?`. Filled connector squares show travelled edges. Completed nodes retain their art and check mark. Native dialogue windows appear above the map.

Mouse hover inspects; click selects an available adjacent node. Arrow keys cycle node focus, including history; Enter/Space confirms. Only the next node is available in Afogados. Hover/focus never runs an event. During movement and native events, route selection is locked. The existing motion preference removes interpolation. PT/EN labels come from Languages.tsv.

Devlog moment: return from the second church trap, inspect its known name with the pawn on it, then move to the first camp. Suggested capture: second-trap tooltip, two filled connection segments and the highlighted camp. Evidence and human acceptance are recorded separately.
