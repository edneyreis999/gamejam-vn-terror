> Historical record: the HTML implementation has been retired. Procedures and source references below describe that past delivery only; do not execute them, recover its source, or treat its results as evidence of the current game. Current implementation: `rpg-maker/The Dryland Drowned/`; current tests: `rpg-maker/tests/`.

# Dungeon Route Selection Visual Contracts

Historical design examples for the six route-selection surfaces recorded in
`.compozy/tasks/dungeon-route-selection/_uiux.md`. They document the earlier
HTML presentation; current implementation and presentation authority belong
to the approved MZ contracts and canonical GDD.

These files recorded the historical baseline for composition, hierarchy, spacing, typography,
state signals, focus treatment, responsive topology, and the approved
prototype-baseline copy. Runtime data, native Chrome control internals, the
canonical GDD, and engine-owned behavior were considered by the original task 03. These examples are not imported by the current game.

## Design frame

- Scene: a playtester at night studies a worn expedition map in a local
  browser, weighing ominous rumors before risking a diminished party.
- Register: Brand.
- `VISUAL_VARIANCE`: 6/10.
- `MOTION_INTENSITY`: 1/10.
- `INFORMATION_DENSITY`: 7/10.
- Authority fallback: this repository has no root `DESIGN.md` or shared UI
  package. The earlier design used the canonical GDD and its contemporary UI contract.
  The retired stylesheet is not a source or fallback for current work.

## State URLs

All paths below are relative to this directory.

### Introduction

- `dungeon-route-selection-introduction.html`
- `dungeon-route-selection-introduction.html?state=action-activated`
- `dungeon-route-selection-introduction.html?mode=missing-decoration`

Use 1440×900 for the wide reference, 320×800 for narrow reflow, and
enable `prefers-reduced-motion: reduce` for the motion contract.

### Preparation

- `dungeon-route-selection-preparation.html?state=initial`
- `dungeon-route-selection-preparation.html?state=selected`
- `dungeon-route-selection-preparation.html?state=selected&error=destination-required`
- `dungeon-route-selection-preparation.html?state=after-retreat`
- `dungeon-route-selection-preparation.html?state=one-complete&completed=physical`
- `dungeon-route-selection-preparation.html?state=one-complete&completed=supernatural`
- `dungeon-route-selection-preparation.html?state=final-unlocked`
- `dungeon-route-selection-preparation.html?state=narrow-zoom`

The `narrow-zoom` contract uses a 640×900 Chrome viewport at 200 percent
zoom, producing an effective 320 CSS-pixel content width.

### Campaign shell

- `dungeon-route-selection-campaign-shell.html?state=initial-active`
- `dungeon-route-selection-campaign-shell.html?state=final-active`
- `dungeon-route-selection-campaign-shell.html?state=narrow-long-name`

### Dungeon threshold

- `dungeon-route-selection-threshold.html?state=first-entry`
- `dungeon-route-selection-threshold.html?state=revisit`
- `dungeon-route-selection-threshold.html?state=final-entry`
- `dungeon-route-selection-threshold.html?state=missing-decoration`

### Fragment recovery

- `dungeon-route-selection-fragment-recovery.html?state=first-fragment-either-path&completed=physical`
- `dungeon-route-selection-fragment-recovery.html?state=first-fragment-either-path&completed=supernatural`
- `dungeon-route-selection-fragment-recovery.html?state=second-fragment-final-unlock`
- `dungeon-route-selection-fragment-recovery.html?state=first-fragment-either-path&completed=physical&mode=narrow`

The fragment-recovery `mode=narrow` capture uses a 640×900 Chrome viewport at 200 percent zoom, producing an effective 320 CSS-pixel content width.

### Invalid state

- `dungeon-route-selection-invalid-state.html?state=unknown-destination`
- `dungeon-route-selection-invalid-state.html?state=locked-final`
- `dungeon-route-selection-invalid-state.html?state=invalid-progress`
- `dungeon-route-selection-invalid-state.html?state=crossed-assignments`

## State matrix

| Component | Required states represented |
| --- | --- |
| Route radio-card | default, hover, active, focus-visible, selected |
| Static destination card | completed, locked, missing optional decoration |
| Hero card | available, selected, reduced roster |
| Departure | no destination, selected destination, inline error |
| Preparation | initial, selected, after retreat, one complete, final unlocked, narrow/zoom |
| Fragment recovery | either first completion, second completion, final unlock |
| Invalid stop | unknown route, premature final, invalid progress, crossed assignments |

The artboards are visual contracts, not a second game engine. Native radios
remain operable for semantic inspection, but query-string state selection is
the only scripted behavior. Task 03 owns production interactions, validation,
and durable reference/implementation comparison bundles.

## Authorized differences for task 03

- Hero names, deaths, encounter text, and assignments may vary with the
  canonical runtime state and seed.
- Chrome may render the native radio glyph differently from this static
  capture; checked state, focus, label, hierarchy, and card signals remain
  normative.
- Optional decorative imagery may be absent. All names, rumors, states,
  progress, prerequisites, and controls must remain.
- Natural Portuguese wrapping and vertical growth are allowed at narrow
  widths. Reordering, clipping, or horizontal scrolling of the primary
  operation is not.
