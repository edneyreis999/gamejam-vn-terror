---
name: rpg-maker-mz-visustella-events-movement-core
description: Pilot VisuStella MZ Events and Movement Core and map-event extensions. Use for VisuMZ_1_EventsMoveCore, VisuMZ_4_MapCameraZoom, event templates, copy, morph, spawn, remote events, custom page conditions, self or map switches and variables, regions, collision, pathfinding, VS8 sprites, movement, or map camera behavior.
---

# Events and Movement Core

- Global parameters, map or event notes, active-page comments, and runtime
  plugin commands have different scopes. Page comments can override general
  event configuration.
- `<JS>`, `<Self>`, `<Map>`, and Save Core `<Global>` represent different
  evaluation or storage models; do not combine them as interchangeable flags.
- Copy supplies source data, Morph replaces an existing event, and Spawn creates
  a new instance. Location, morph, and spawn persistence are explicit choices;
  leaving a map can otherwise rebuild or discard state.
- Template events require their source maps to be available when copied,
  morphed, or spawned.
- Remote Read runs the remote page in the caller's context, so `This Event`
  continues to mean the caller.
- Regions, terrain tags, passability, logical hitboxes, and visual expansion are
  separate mechanisms.
- `[VS8]` selects the VS8 sprite parser and does not combine with the `$`
  filename contract.

Map Camera Zoom is stewarded here by domain, not dependency. Load exact APIs
from [the plugin reference index](references/index.md).
