# ADR-001 — Tavern actions behind the hamburger

Accepted by explicit user instruction on 2026-09-28. Scope: this increment only.

The visible top-right hamburger replaces the independent Quadro, Configurações and Salvar campanha atual buttons. These actions retain their existing native event bodies, save policy and return flows. This supersedes the independent-access presentation in GDD §28 / prototype-feedback-refinement D-001/023; access and campaign behavior remain unchanged. Hero artwork geometry and Seguir's position are fixed constraints.

Apply ADR-G007: the opened menu and age gate use their native choice windows. Hero-name controls and Seguir are spatially coupled to the authored composition and use the ADR's exception, with one existing picture target and a native Window.png renderer. No duplicate controls or new input dispatcher is permitted. Close the menu with its Fechar menu action or native cancel and return focus to its trigger.

This is an authorized presentation change, not acceptance of implementation or evidence. See the increment's spec for execution results.
