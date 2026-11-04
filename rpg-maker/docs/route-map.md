# Author an expedition map

Use `Dryland_6_RouteMap` to draw a route over a native MZ parallax. The plugin handles connections, selection and pawn travel. The destination event owns what happens on arrival. It has no dependency on Afogados campaign rules or Coreto; the order hint only places it after the installed theme when present.

## Build a route in the editor

1. Copy the plugin and your pawn PNG into another MZ project; enable the plugin in Plugin Manager and select the pawn from `img/pictures`. Set colors, sizes and travel time there.
2. Create a map that fits the screen. Put `<RouteMap>` in its Note and choose its parallax. On a route map the parallax fills the viewport; native walking and touch destinations are disabled.
3. Create three events at tiles `(2,7)`, `(5,7)` and `(5,4)`. Give them these Notes, respectively:

   ```text
   <RouteNode:start><RouteLinks:camp><RouteLabel:Start>
   <RouteNode:camp><RouteLinks:finish><RouteLabel:Camp>
   <RouteNode:finish><RouteLabel:Destination>
   ```

4. Select each event's native page graphic, or use `<RouteImage:MyCamp>` for `img/pictures/MyCamp.png`. Picture notes override page graphics. An event character sheet uses its selected character, direction and pattern; tile graphics also work. Node art is centered inside the square. Keep the pawn and parallax separate from node art.
5. In a setup autorun event, insert **RouteMap → Begin**, node `start`, then **Erase Event**. Only call Begin for a new attempt. Erase Event prevents the autorun from resetting visits every frame. Returning to a map should restore its existing state instead of beginning another attempt.
6. Set node pages to **Action Button**. Add native commands to the `camp` event, for example Show Text or Call Common Event. A Script command can use the normal MZ interpreter (`this` is `Game_Interpreter`, standard game globals are available, return value is ignored). The plugin starts this native page after travel. No JavaScript is evaluated from notes.
7. Play: hover or use arrow keys to inspect nodes; click or press Enter/Space to travel to a connected available node. The square connectors and pawn follow the event positions.

This example is illustrative. The delivered Map047 is the working Afogados example, with church, park and village groups selected by native variable 227. Its setup uses **Dryland_EventBridge → SyncRouteMap** to project campaign facts. That command belongs only to Afogados; other games use the generic commands below.

## Notes and geometry

| Note | Effect |
| --- | --- |
| Map `<RouteMap>` | Enables the surface on this map. |
| Event `<RouteNode:id>` | Stable, nonempty ID, unique within the map. |
| Event `<RouteLinks:a,b>` | Explicit undirected edges. Declare an edge at one or both ends. Maximum four distinct neighbours, including incoming declarations. |
| Event `<RouteReturn:false>` | From this node, forbid moving to a previously visited node. Omit or use `true` to allow return. All Afogados nodes use `false`. |
| Event `<RouteArrival:first>` | Run the arrival page only on the first visit of this attempt; default. `always` runs it on every arrival. |
| Event `<RouteImage:MyCamp>` | PNG basename from `img/pictures`, without extension; overrides the page graphic. |
| Event `<RouteLabel:$[my.key]>` | Hover/focus label. The installed localization provider resolves the key; without it, use literal labels. Afogados text belongs in `Languages.tsv` (EN/PT columns). |
| Page comment `<RouteHidden>` | Excludes the event while this page is active. Other page conditions are native MZ conditions. |

Coordinates are integer tiles measured from the map's top-left; node centers use the center of each tile. A link must be horizontal or vertical, never diagonal or zero-length. Add an explicit intermediate event for a bend. Crossings do not create junctions. Leave enough space between squares; the plugin neither reroutes around other nodes nor moves the camera. Place all nodes within the viewport. Missing targets, duplicate IDs, invalid arrival policies and excess degree report a `RouteMap` error with the relevant node ID.

## Runtime commands and saves

Commands act on the current marked map. Begin must run before Restore, SetNode or Query. Editor fields are strings; `node` is the stable ID.

| Command | Inputs and result |
| --- | --- |
| Begin | `node` (editor default `start`). Starts at this node, marks it visited and clears previous visits and overrides. The starting event does not fire. |
| Restore | `node`. Changes position without changing visits or firing arrival. Useful when returning from another scene. |
| SetNode | `node`, `enabled` and `revealed` (default true), `label`, `image`. Replaces these overrides for the attempt. Disabled nodes cannot be entered. Unrevealed nodes show `?`, including their tooltip. Empty image falls back to the page graphic. |
| Query | `kind=current` returns the current ID; `kind=visited` returns whether `node` was visited. `variable` stores that value; `switch` stores its truthiness. Both outputs default to 0, which disables writing that output. |

Position, visits and overrides live in native saves per map. Reopening the scene, loading or restoring position never fires an arrival. Begin resets visits, so `first` arrivals can run in a new attempt. No save or menu can open during travel. Closing the game during movement returns to the last successful native save. The generic plugin does not choose when to save; the host game's native event flow does.

Afogados saves stable map entries and existing semantic checkpoints. Its random draw happens only after the pawn arrives at the next trap. Hover, focus, rendering and restoring a save do not draw. Camp retreat keeps encounter assignments and resets visits at the next departure. This increment requires a new campaign; old save files are not migrated or deleted.

## Parameters

Sizes use screen pixels; travel uses milliseconds. Defaults: NodeSize `78` (min 24), StepSize `9` (min 2), StepGap `5` (min 1), Duration `650` (min 0). Duration `0` completes travel directly. Ink `#360a0b`, Accent `#62365f` and Paper `#ead3ae` accept CSS colors. Pawn is a PNG basename in `img/pictures`, default `Dryland_Route_Pawn`.

ReducedMotionVariable `0` follows the system motion preference. A positive native variable ID uses that variable: nonzero skips travel, zero animates it. Afogados uses its existing variable 47. Native event actions still execute in order with reduced motion.

MoveSe selects a native MZ audio basename in `audio/se` without extension (for example `sfx_b2_passos` for `sfx_b2_passos.ogg`). Its generic default is empty: silent movement. MoveSeVolume defaults to `90` (integer percent 0–100, multiplied by the player’s SE volume), MoveSePitch to `100` (integer speed percent 50–150), and MoveSePan to `0` (integer -100 left to 100 right). Afogados configures `sfx_b2_passos`, `80`, `120`, `0`. The scene preloads a dedicated buffer; it loops during travel and stops on arrival or scene exit without stopping other effects or extending travel to wait for audio. Reduced motion and Duration `0` are silent. Continue and Restore do not play it. Configuration is read on game boot; it is not saved as campaign state.

```sh
node rpg-maker/tools/route-map.mjs parameters --set '{"MoveSe":"sfx_b2_passos","MoveSeVolume":"80","MoveSePitch":"120","MoveSePan":"0"}' --dry-run
```

## Command-line authoring

Use Node 22+ from the repository root. Close the editor before writing externally and reopen it afterwards. All responses are JSON (`--json` is accepted for discoverability). Success exits 0; invalid IDs, input or graph exit nonzero with a diagnostic. `--project PATH` selects another installed game; default is `rpg-maker/The Dryland Drowned`. The tool loads that project's installed plugin.

```sh
node rpg-maker/tools/route-map.mjs list
node rpg-maker/tools/route-map.mjs describe route-map
node rpg-maker/tools/route-map.mjs map 47
node rpg-maker/tools/route-map.mjs node 47 1
node rpg-maker/tools/route-map.mjs commands 47 1 1
node rpg-maker/tools/route-map.mjs parameters
node rpg-maker/tools/route-map.mjs validate
```

These return descriptor IDs, the complete public contract, graph nodes, native event, native page list, effective registered parameters, and validation results respectively. Map/event/page IDs are positive integers; page numbering starts at 1. Map047 validation reports 28 nodes across its three conditional groups; runtime uses only the active group.

```sh
node rpg-maker/tools/route-map.mjs parameters --set '{"Duration":"400"}' --dry-run
node rpg-maker/tools/route-map.mjs node 47 1 --set '{"name":"Route setup"}' --dry-run
node rpg-maker/tools/route-map.mjs commands 47 1 1 --insert '{"command":"Query","args":{"node":"c0","kind":"visited","switch":"228","variable":"0"}}' --dry-run
```

These previews return changed parameters, event or page without writing. Remove `--dry-run` to persist. Parameter writes merge declared string fields. Node writes accept only `name`, `note`, `x`, `y`; coordinates must remain within map bounds and the graph must stay valid. Command insertion appends a generic plugin command before the page terminator; it authors future execution, never runs it. Use editor commands for other event operations. The Query example is an authoring example, not a recommended modification to the game's setup.

The CLI validates all authored node groups, including inactive pages. Runtime validation covers active pages; keep connected targets active together. Disabling the plugin leaves ordinary boot available but removes route interaction. Avoid disabling it in a campaign that needs this map.
