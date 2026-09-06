# Packaged visual assets

This directory contains the 35 local images prepared for the `prototype-v2-gdd-layouts` evaluation build: eight hero portraits, four narrative character portraits, three destination previews, four scene backgrounds and sixteen encounter illustrations. They remain **Baseline de protótipo** material. Their presence here does not approve final art, editorial detail or cultural treatment.

The complete source-to-runtime record is [asset-inventory.json](asset-inventory.json). Each row records the source and packaged path, dimensions, PNG/JPEG mode, alpha extrema, source and packaged SHA-256 checksums, and whether the packaged bytes or RGB channels match the source. Rebuild and verify it with:

```sh
python3 docs/design/opendesign/prototype-v2-gdd-layouts/tools/verify_assets.py
```

## Source boundaries

- `heroes/` contains byte-preserving copies of the eight supplied RGBA portraits from `plano/gerar-spac-att-prototipo/imagens/herois/`.
- `characters/` contains RGBA presentation derivatives of the generated opaque Ivaí, Floraí, Pérola and Andirá images in `plano/gerar-spac-att-prototipo/imagens/personagens/`. Only the connected pale exterior background becomes alpha; RGB pixels remain identical to the preserved sources.
- `destinations/` contains byte-preserving copies of the three generated previews documented in `plano/gerar-spac-att-prototipo/imagens/destinos/README.md`.
- `scenes/` contains the supplied tavern and three generated narrative environments. The generation prompts, selected-original paths and historical hashes remain under `plano/gerar-spac-att-prototipo/imagens/geracao-narrativa/`.
- `encounters/` retains the sixteen existing provisional JPGs. They are packaged sources, not final representations of every canonical clue.

The four transparent derivatives are checked over their intended narrative backgrounds in `.compozy/tasks/prototype-v2-gdd-layouts/evidence/npc-over-background/`. Pérola and Floraí remain associated with their stone and fig-tree prisons. Andirá is composed only inside the Council reflection in the approved artboard; the standalone portrait is never authority for a physical body in that scene.

All runtime paths are relative and local. No asset requires a network request. Human final-art, editorial and cultural review remain outstanding, and every placeholder must be replaced before final game delivery.
