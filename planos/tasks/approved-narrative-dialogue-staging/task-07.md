---
id: "07"
status: completed
depends_on: ["06"]
verification_ids: []
supporting_verification_ids: ["V-001", "V-002", "V-003", "V-004", "V-005", "V-008"]
---

# Task 07 — Eight whole-image illustrated epilogues

## Outcome

Every eligible surviving climax hero receives the full approved epilogue and its whole, proportionally fitted illustration, with native lower text/HIDE and no overlaid bust. Canonical hero-sheet epilogues match the approved source.

## Authority

- [spec.md](spec.md): RQ-001/006/007/010/011.
- [verification.md](verification.md): scoped sensor contributions below; aggregate verdict owners are [tasks 08 and 10](tasks.md#coverage).
- [narrativa](approved-narrative-dialogue-staging.narrativa.md), [uiux](approved-narrative-dialogue-staging.uiux.md), [technical-art](approved-narrative-dialogue-staging.technical-art.md), [programacao](approved-narrative-dialogue-staging.programacao.md) contracts.
- PR #15 pinned prose/HTML/illustrations, [prose and fit ADR](adrs/adr-003-approved-prose-and-illustrated-epilogues.md), canonical GDD §§15.1/18.2 and the existing hero sheets.
- [Shared execution contract](tasks.md#shared-execution-contract), including source freshness, native ownership, canonical commands, evidence and teardown.

## Scope

- Implementation: `rpg-maker/The Dryland Drowned/data/Map029.json` through `Map036.json`, event001; inspect shared exit consumers only where the former bust presentation requires cleanup.
- Data/assets: import eight PR #15 images from `docs/narrativa/ilustracao-epilogo/` into native `img/pictures/`; preserve original images and record native filenames. Convert Liora's BMP losslessly to PNG using available local tooling, without a new dependency. Retain maintained source/import provenance under `rpg-maker/asset-provenance/`.
- Tests: `rpg-maker/tests/suites/endings.mjs` UT-035, IT-073 and applicable IT-048 associations/eligibility; `content.mjs` source assertions and existing control owners only where needed.
- Fixture/readiness owner: this task owns valid native epilogue entry for all eight heroes, both viewport references, no/mixed deaths, solo/total-loss exclusions, all source pages and final-box completion observability.
- QA/docs: synchronize only epilogue sections of the eight files in `docs/narrativa/herois/`, retaining other character facts and linking pinned provenance. Record source-to-hero/map/image/page correspondence and authored geometry.
- Delete targets: superseded epilogue prose and bust commands/attachments in those eight maps. Do not remove original/source illustrations, hero portraits, shared helpers with consumers or historical specs.

## Checklist

- [ ] Obtain PR #15's pinned Git commit (fetch its source objects if absent), then materialize the required prose, HTML and illustration blobs in isolated temporary storage. The source directory is absent from the current checkout; do not assume it exists locally or merge the whole PR. Verify its eight image/prose associations against its 17-page HTML segmentation, checked against the prose file. Preserve Draska's final quotation; report any real source disagreement rather than silently rewriting.
- [ ] Import the images with exact source/import hashes and a pixel-equivalent Liora PNG derivative. Use the stable H1–H8 order Gorvak, Elowen, Griznik, Seraphina, Bimbren, Liora, Vaelith, Draska, not HTML author order.
- [ ] Replace each map's epilogue body with all its source pages in one semantic passage. Preserve punctuation and narrative order; split boxes for readability and keep ReadingComplete only after the last acknowledgement.
- [ ] Remove superseded epilogue bust staging/attachments. Center the whole illustration over black with scale min(logical width/source width, logical height/source height); no crop, stretch, filter or added frame. At 1280×720, 3:2 art is 1080×720 with 100px sides; do not confuse browser viewport with logical resolution.
- [ ] Update only the eight hero-sheet epilogue sections. Preserve eligibility for living climax participants, H1–H8 order, dead-only memorial and no reserve/solo/total-loss epilogues.
- [ ] Run S-09 native completion fixtures for all eight heroes and capture with/without text/HIDE at both viewport references. Compare source edges, text/control readability and geometry; include Draska's long ending/advance indicator without global vendor changes.
- [ ] Run focused canonical cases; deliver the complete art/page/geometry/native completion ledger to 08 and actual captures for 10's final visual inspection. Candidate visual judgments remain distinct from already accepted source artwork.

## Validation

Execution mode/reference: Owns S-09 native-engine integration; 10 owns its final visual verdict. All eight heroes, all source pages, both 1280×720 and 1920×1080 viewport references with actual MZ logical dimensions, no/mixed deaths and solo/total-loss exclusions; HIDE/Settings/FAST where applicable.

Invalidates/reuses: Reuse 06's legal ending fixtures and approved original PR #15 images as oracle. Any epilogue prose/art/import filename, fitting, eligibility or control change invalidates relevant correspondence/render/completion evidence. Source screenshots or merely existing image files cannot pass visual fitting.

Use the focused canonical command from [tasks.md](tasks.md#shared-execution-contract) with actual registered IDs, and record the exact command/result. Evidence names below are planned subdirectories beneath `docs/qa/evidence/approved-narrative-dialogue-staging/<run-id>/task-07/`; record actual canonical output paths when different.

| Verification ID | Command or sensor | Expected observable | Evidence path suffix |
| --- | --- | --- | --- |
| V-001/008 contribution | Source/HTML/art/sheet structured comparison and lossless conversion proof | Eight correct associations, 17 pages, source pixels preserved, only sheet epilogues changed | epilogue-correspondence |
| V-002/003 contribution; S-09 native | UT-035/IT-073 and applicable IT-048 cases | One final completion per eligible hero, stable order and exclusions, next hero/credits correct | epilogue-native |
| V-004/005 contribution | Eight-hero source-edge/geometry ledger and native HIDE/control renders | Whole proportional art over black, no bust/attachments, readable text and controls | epilogue-visual |

## Execution Notes

Native implementation applied on 2026-09-18; focused integration validation is running. Record decisions, actual changed paths/IDs, fixtures, commands, evidence, limitations and remaining QA here; synchronize task/graph status and the existing verification owner. No automatic commit or remote action.



### Frozen closing batch

ADR-G004/G006 groups 04–07 evidence after serialized native writes because these tasks share Rules, CommonEvents, closing helpers and legal recipes. Their dependency order was preserved for implementation; no downstream task is declared verified before its prerequisites. Task-local `task-07-integrate.py` records the transformation. Pinned sources remain PR #16 `ba53ad9d1d3848a2aef80d34abf1f5d391489b6c` and PR #15 `537b7e825d695799033223810c7429d190f30172`.

Pure-domain/source command `node --test --test-name-pattern='UT-032|UT-033|UT-034|UT-035|UT-036|UT-027|UT-028' rpg-maker/tests/campaign.test.mjs`: 7/7 PASS. An initial UT-034 source check used Map25 instead of Map025; the test path was corrected and the full focused set passed. Native batch: `node --test --test-name-pattern='IT-052|IT-053|IT-054|IT-061|IT-048|IT-073|IT-029' rpg-maker/tests/campaign.test.mjs`; log `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/closing-native.log`. No native verdict yet.

### Scoped closure — 2026-09-18

Os oito mapas contêm as 17 páginas PR15 e uma ilustração integral por herói, sem bustos. Sete PNGs são cópias exatas; BMP de Liora convertido sem perda de pixels. Proveniência em `rpg-maker/asset-provenance/approved-narrative-epilogues.json`; apenas seção de epílogo das oito fichas mudou. UT-035 e IT-073 passaram: todas as caixas, imagens e HIDE nos dois perfis. A inspeção visual de todas as páginas/arestas continua em V-004/task10; o PASS de geometria não a substitui.

ADR-G004/G006: implementação e fixture local concluídas; sensores dirigidos, transições/inspeção final, controles integrados e escuta conservam os donos08/10 e os resultados esperados originais. Checkboxes que exigem esses sensores permanecem abertos até sua evidência. Não há PASS global implícito.

Reteste combinado: `IT-052|IT-053|IT-054|IT-061|IT-014|IT-062|IT-067`, log `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/closing-and-continuity-second.log`: 6/7 PASS, falha exclusiva do seletor de Novo jogo do segundo arquivo em IT-014. Correção do seletor e reteste `IT-014`: PASS em138.5s, `checkpoints-two-files.log`. O primeiro lote `closing-native.log` conserva os PASS de IT-048/073/029 e as falhas do sensor posteriormente corrigidas.
