# Prototype v2 visual references

These twelve local HTML files are authored reference artboards for `prototype-v2-gdd-layouts`. They translate the canonical GDD, accepted ADRs and the three inspected Figma compositions into renderable states. They are new reference outputs; they are not clean Figma exports and do not claim native Figma dimensions, exact fonts or unspecified interactions.

Each file accepts the design-only selector `?state=<name>`. The complete 252-row state/viewport contract is `.compozy/tasks/prototype-v2-gdd-layouts/analysis/visual-contract-inventory.json`. Captures and their source/capture checksums are retained under `.compozy/tasks/prototype-v2-gdd-layouts/evidence/references/`.

The reference pages load only `artboards.css`, `artboards.js` and packaged local images. They do not read campaign state, storage, external fonts or the live game's scripts. The selector is deliberately absent from `prototype/index.html` and the public QA API.

## Source identity

| Input | Authority and limitation |
| --- | --- |
| Canonical GDD sections 1.1, 18 and 19 | Product facts, public identity, desktop boundary and provisional-art status |
| `_spec.md`, `_uiux.md`, `_user_stories.md`, `_dx.md` | Frozen incremental behavior, surface and accessibility contracts |
| Figma nodes `0:1`, `34:186`, `12:64` | Inspected composition only; no clean export, native metrics or readable internal text was available |
| Supplied/generated images under `plano/gerar-spac-att-prototipo/imagens/` | Provisional visual inputs with prompts and provenance preserved in place |
| Hero sheets under `docs/narrativa/herois/` | Canonical public identity, summary, voice, farewell and fixed epilogue text |

The browser-editor views were not copied into the artboards or represented as exported frames. The local paper/ink implementation is an authorized adaptation for evaluation.

## Tavern anchors

The supplied tavern composition is represented by eight fixed anchors. Every `inspect-hN-*` state reuses these coordinates.

| Hero | Horizontal | Vertical | Speech zone |
| --- | ---: | ---: | --- |
| H1 Gorvak | 14% | 74% | left; speech to the right |
| H2 Elowen | 25% | 84% | left; speech to the right |
| H3 Griznik | 37% | 72% | left; speech to the right |
| H4 Seraphina | 47% | 86% | center; speech toward available space |
| H5 Bimbren | 57% | 73% | center; speech toward available space |
| H6 Liora | 68% | 85% | right; speech to the left |
| H7 Vaelith | 79% | 72% | right; speech to the left |
| H8 Draska | 90% | 84% | right; speech to the left |

Selected heroes retain a brass outline and a small scale increase. Inspection uses a separate dashed focus treatment. The public sheet stays above the hero and speech stays lateral within the supported 1280×720 and 1920×1080 desktop viewports.

These references remain provisional. Paired runtime comparison belongs to the consumer tasks; final-game visual approval remains a separate human decision.
