---
id: "06"
status: completed
depends_on: ["05"]
verification_ids: []
supporting_verification_ids: ["V-001", "V-002", "V-003", "V-005", "V-006", "V-007", "V-008"]
---

# Task 06 — Three approved endings and terminal routing

## Outcome

Reunite, destroy and total loss each show their approved prose over the existing corresponding illustration, preserve the committed ending through Continue and route only to the applicable memorial/epilogues/credits.

## Authority

- [spec.md](spec.md): RQ-001/006/007/009/010/011.
- [verification.md](verification.md): scoped sensor contributions below; aggregate verdict owners are [tasks 08 and 10](tasks.md#coverage).
- [narrativa](approved-narrative-dialogue-staging.narrativa.md), [uiux](approved-narrative-dialogue-staging.uiux.md), [audio](approved-narrative-dialogue-staging.audio.md), [programacao](approved-narrative-dialogue-staging.programacao.md) contracts.
- PR #16 feedbacks/fim-do-jogo, canonical GDD §§15–16 and the programming contract's existing outcome/save rules.
- [Shared execution contract](tasks.md#shared-execution-contract), including source freshness, native ownership, canonical commands, evidence and teardown.

## Scope

- Implementation: `rpg-maker/The Dryland Drowned/data/Map025.json` through `Map027.json` event001 and existing ending cue ownership in `data/CommonEvents.json` CE067. Inspect Map028/memorial/credit consumers; change only proven incoming-cleanup needs.
- Data/assets: existing Dryland_EndingReunite/Destroy/TotalLoss images and Musical1/Organ ME/contextual effects; no new art or audio production.
- Tests: `rpg-maker/tests/suites/endings.mjs` UT-034/035/036, IT-048 and ending parts of IT-054; `sacrifice.mjs` UT-028; `native-audio.mjs`; existing memorial assertions only if affected.
- Fixture/readiness owner: this task owns both legal final choices and total-loss terminal-boundary fixtures, committed-ending checkpoint inputs and cleanup/ME observations. Task 10 separately earns the directed branch parents.
- QA/docs: three-ending paragraph/asset ledger, native route and audio trace for S-08/S-10/S-11.
- Delete targets: only superseded ending prose and incompatible incoming presentation/audio commands; preserve memorial/credits text and functional events, all three existing images, and historical source art.

## Checklist

- [ ] Compare the pinned source's three narrative paragraphs per ending to the current maps. Exclude authoring headings and the unproduced 'Descrição das imagens' list from spoken content.
- [ ] Keep two semantic units per ending: source paragraphs 1–2 in .01, paragraph 3 in .02; split boxes without rewriting. Complete each unit once after its last acknowledgement.
- [ ] Keep each corresponding existing full-screen image, no narrator/bust overlay and no new art. Remove incoming Council pictures/attachments through explicit native ownership so they cannot leak over the illustration.
- [ ] Stop generic past BGM and incompatible ambience before the outcome ME; verify the generic score does not resume after ME. Preserve theme/effect volumes, mute and current memorial/epilogue/credit audio except necessary leak cleanup.
- [ ] Retain exclusive committed outcomes, eligible memorial/epilogue routing, solo exclusions and total-loss precedence over route completion. Do not rewrite the accepted historical memorial wording issue or add a choice to loss.
- [ ] Check HIDE/Settings, held confirmation and seen-only FAST through the new multi-box ending units and their outgoing transition; record local control evidence for 08/10.
- [ ] Run canonical outcome/native/audio cases; document independent branch/eligibility observations and ending checkpoint recipes for 08. Provide legal paths for S-08's separate final-choice children and independent total-loss trajectory, including credits skip/natural-completion variants.

## Validation

Execution mode/reference: Pure-domain plus real native-engine outcome fixtures for S-06's terminal boundary and S-08 readiness. S-08 directed branches/credits, S-10 earned ending Continue and S-11 listening stay with 10. Cover all three outcomes, no/mixed deaths and solo eligibility.

Invalidates/reuses: Reuse 05's legal final-choice fixture after checking plan dependencies. Source prose, ending events, Rules/eligibility, audio or saved payload changes invalidate corresponding evidence. A synthetic outcome or edited storage is never a directed branch parent.

Use the focused canonical command from [tasks.md](tasks.md#shared-execution-contract) with actual registered IDs, and record the exact command/result. Evidence names below are planned subdirectories beneath `docs/qa/evidence/approved-narrative-dialogue-staging/<run-id>/task-06/`; record actual canonical output paths when different.

| Verification ID | Command or sensor | Expected observable | Evidence path suffix |
| --- | --- | --- | --- |
| V-001/002/008 contribution | Source/asset comparison and canonical outcome/total-loss cases | All three texts complete; existing art; outcome/eligibility unchanged; no described-art production | ending-source-domain |
| V-003/005/006/007 contribution; S-06 total loss | IT-048/054 and native-audio/save-boundary probes | Own ending only, final-box completion, safe controls/transfer, ME precedence and current-file checkpoint | ending-native |

## Execution Notes

Native implementation applied on 2026-09-18; focused integration validation is running. Record decisions, actual changed paths/IDs, fixtures, commands, evidence, limitations and remaining QA here; synchronize task/graph status and the existing verification owner. No automatic commit or remote action.



### Frozen closing batch

ADR-G004/G006 groups 04–07 evidence after serialized native writes because these tasks share Rules, CommonEvents, closing helpers and legal recipes. Their dependency order was preserved for implementation; no downstream task is declared verified before its prerequisites. Task-local `task-06-integrate.py` records the transformation. Pinned sources remain PR #16 `ba53ad9d1d3848a2aef80d34abf1f5d391489b6c` and PR #15 `537b7e825d695799033223810c7429d190f30172`.

Pure-domain/source command `node --test --test-name-pattern='UT-032|UT-033|UT-034|UT-035|UT-036|UT-027|UT-028' rpg-maker/tests/campaign.test.mjs`: 7/7 PASS. An initial UT-034 source check used Map25 instead of Map025; the test path was corrected and the full focused set passed. Native batch: `node --test --test-name-pattern='IT-052|IT-053|IT-054|IT-061|IT-048|IT-073|IT-029' rpg-maker/tests/campaign.test.mjs`; log `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/closing-native.log`. No native verdict yet.

### Scoped closure — 2026-09-18

Nove parágrafos PR16 integrados em Map025–027, preservando imagens e roteamento. UT-034/036, IT-048 e IT-029 passaram; cada desfecho mantém sua elegibilidade e a parada BGM/BGS antes do ME. Controle/Continue nativo é consolidado em08; escolhas dirigidas, perda total, inspeção e audição continuam em10.

ADR-G004/G006: implementação e fixture local concluídas; sensores dirigidos, transições/inspeção final, controles integrados e escuta conservam os donos08/10 e os resultados esperados originais. Checkboxes que exigem esses sensores permanecem abertos até sua evidência. Não há PASS global implícito.

Reteste combinado: `IT-052|IT-053|IT-054|IT-061|IT-014|IT-062|IT-067`, log `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/closing-and-continuity-second.log`: 6/7 PASS, falha exclusiva do seletor de Novo jogo do segundo arquivo em IT-014. Correção do seletor e reteste `IT-014`: PASS em138.5s, `checkpoints-two-files.log`. O primeiro lote `closing-native.log` conserva os PASS de IT-048/073/029 e as falhas do sensor posteriormente corrigidas.
