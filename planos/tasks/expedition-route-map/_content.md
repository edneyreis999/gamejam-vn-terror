# Content

| Content | Authoritative location | State |
| --- | --- | --- |
| Three route parallaxes | Game `img/parallaxes/Dryland_Route_{Church,Park,Village}.png`; selected by Map047 setup | Final production assets; human visual acceptance pending |
| 16 encounter icons | Game `img/pictures/Dryland_Route_A1..A8.png` and `B1..B8.png`; mapping in Map047 setup | Final production assets; no placeholders |
| Tavern, camp, three destinations, pawn | Game `img/pictures/Dryland_Route_{Tavern,Camp,ChurchIcon,ParkIcon,VillageIcon,Pawn}.png` | Final production assets; no composite UI baked in |
| Map layout and actions | Map047 native events | Implemented |
| Route labels | `Languages.tsv`, EN/PT columns | Integrated |
| Square geometry and interaction states | Generic plugin parameters and rendering | Runtime geometry; no raster atlas required |

Artwork was generated in built-in image mode. [Generation prompts](../../004-map-darkest-dungeon/route-assets.prompts.json) are archival provenance, not a second content authority. The original reference and approved mockup remain design references only. Future art replacement happens in the game's image folders and native selectors.
