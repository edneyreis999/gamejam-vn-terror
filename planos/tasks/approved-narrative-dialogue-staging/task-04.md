---
id: "04"
status: completed
depends_on: ["01"]
verification_ids: []
supporting_verification_ids: ["V-001", "V-002", "V-003", "V-004", "V-005", "V-006", "V-007", "V-008"]
---

# Task 04 — Both route closures after their earned pieces

## Outcome

Completing either initial route awards its piece once, then shows the first or second approved Rheed closure by completion order and resumes the existing Irati/map-revelation continuation before preparation.

## Authority

- [spec.md](spec.md): RQ-001/003/004/008/009/010/011.
- [verification.md](verification.md): scoped sensor contributions below; aggregate verdict owners are [tasks 08 and 10](tasks.md#coverage).
- [narrativa](approved-narrative-dialogue-staging.narrativa.md), [uiux](approved-narrative-dialogue-staging.uiux.md), [technical-art](approved-narrative-dialogue-staging.technical-art.md), [audio](approved-narrative-dialogue-staging.audio.md), [programacao](approved-narrative-dialogue-staging.programacao.md) contracts.
- PR #16 feedbacks/fim-das-trilhas, [temporal ADR](adrs/adr-001-rheed-temporal-presentation.md), [prose ADR](adrs/adr-003-approved-prose-and-illustrated-epilogues.md) and canonical GDD progression/native-save rules.
- [Shared execution contract](tasks.md#shared-execution-contract), including source freshness, native ownership, canonical commands, evidence and teardown.

## Scope

- Implementation: `rpg-maker/The Dryland Drowned/js/plugins/Dryland_CampaignRules.js`; Map004 and `data/CommonEvents.json` CE040/046/049–052/303/304, CE292–302 and CE067 where this behavior has real callers. Inspect CE044 reward coordination and CE047/048 overlays; preserve their established responsibilities.
- Data/assets: existing lover/prison/location art, imported older Rheed and local temporal cues from 01. New native closure helper IDs, if needed, are allocated after an actual checkout consumer/ID survey.
- Tests: `rpg-maker/tests/suites/discovery.mjs` (UT-032, IT-052/053); `sacrifice.mjs` UT-026 solo boundary; closest `content.mjs` and `native-audio.mjs` assertions. Save contributions feed 08's existing persistence suites.
- Fixture/readiness owner: this task owns Church→Park and Park→Church, both solo initial-route identities with living reserves, last-box completion, piece/reward-checkpoint and continuation observability.
- QA/docs: source mapping for both new closures, lover/receipt/map-line target ledger, native ID allocation and known prison-visibility risk in execution notes.
- Delete targets: superseded native staging/routing commands only. Keep lover material, piece overlays, Irati/map text, all real helper consumers and stable IDs; no file deletion.

## Checklist

- [ ] Capture current lover/piece/Irati/map sequences and source prose before editing. Preserve the route-specific optional second-visit material and receipt, then insert closure.first/closure.second with one .01 passage each in dungeon_complete.
- [ ] Derive closure order from committed route/piece facts; extend reading-plan declaration, required-plan validation and dungeon_complete transitions together. Do not add a stored order counter, new phase or content hash. After closure, one piece selects irati.02; two select map.reveal.
- [ ] Route the new units through actual Map004/discovery native branches with refreshed queries. Keep passage capture/completion on the owning interpreter. Commit/save the existing reward before closure; reject stale/duplicate completions without another piece or checkpoint.
- [ ] Adapt Pérola/Floraí/receipt and CE302 Ivaí dialogue staging while preserving text and actual participants. Clear piece/map overlays and attachments before older Rheed over black; restore the correct past continuation afterwards with its own cues.
- [ ] Wire the new present/past cuts to 01's native audio foundation, without recurring applause or forced waits. Consecutive narrator boxes retain composition/track. Preserve normal 20-frame/reduced 0-frame style and native HIDE/Settings behavior.
- [ ] Inspect the actual lover/prison relationship, including the historical visibility bug linked in tasks.md. Do not claim confinement from coordinates alone or produce new art to bypass the approved scope. Record any demonstrated unsatisfied requirement and its concrete design constraint while independent work continues.
- [ ] Run both route orders and solo edge fixtures, proving one piece and one final-box completion, accepted unchanged solo wording, correct continuation and no invented reserves. Deliver receipt/closure checkpoint recipes and render/audio evidence for 08/10.

## Validation

Execution mode/reference: Prepare and run native/domain closure variants corresponding to S-05 and the initial-route portion of S-06. S-05 itself requires directed play in both orders in 10; fixture success does not replace it. Include both motion profiles, representative controls and reward-boundary trace.

Invalidates/reuses: Reuse 01's temporal source/default baseline and existing discovery helpers after updating reading expectations. Rules, CEs, overlay helpers, art/targets, audio or saved interpreter changes invalidate corresponding evidence and earned-checkpoint reuse.

Use the focused canonical command from [tasks.md](tasks.md#shared-execution-contract) with actual registered IDs, and record the exact command/result. Evidence names below are planned subdirectories beneath `docs/qa/evidence/approved-narrative-dialogue-staging/<run-id>/task-04/`; record actual canonical output paths when different.

| Verification ID | Command or sensor | Expected observable | Evidence path suffix |
| --- | --- | --- | --- |
| V-001/002 contribution | Pinned source comparison; UT-032 and solo-domain assertions | Correct first/second text and order; piece once; stable eligibility and phase validation | closure-source-domain |
| V-003/007 contribution; S-06 initial routes | IT-052/053 and real native solo/receipt fixtures | Reward saved before closure; no stale projection, duplicate completion or altered continuation | closure-native |
| V-004/005/006 contribution | Native lover/black-cut/return renders, controls and audio descriptors | Prison requirement actually inspected; black alone; correct past continuation and cue replacement | closure-presentation |

## Execution Notes

Native implementation applied on 2026-09-18; focused integration validation is running. Record decisions, actual changed paths/IDs, fixtures, commands, evidence, limitations and remaining QA here; synchronize task/graph status and the existing verification owner. No automatic commit or remote action.



### Frozen closing batch

ADR-G004/G006 groups 04–07 evidence after serialized native writes because these tasks share Rules, CommonEvents, closing helpers and legal recipes. Their dependency order was preserved for implementation; no downstream task is declared verified before its prerequisites. Task-local `task-04-integrate.py` records the transformation. Pinned sources remain PR #16 `ba53ad9d1d3848a2aef80d34abf1f5d391489b6c` and PR #15 `537b7e825d695799033223810c7429d190f30172`.

Pure-domain/source command `node --test --test-name-pattern='UT-032|UT-033|UT-034|UT-035|UT-036|UT-027|UT-028' rpg-maker/tests/campaign.test.mjs`: 7/7 PASS. An initial UT-034 source check used Map25 instead of Map025; the test path was corrected and the full focused set passed. Native batch: `node --test --test-name-pattern='IT-052|IT-053|IT-054|IT-061|IT-048|IT-073|IT-029' rpg-maker/tests/campaign.test.mjs`; log `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/closing-native.log`. No native verdict yet.

### Scoped closure — 2026-09-18

CE352/353 contêm os quatro parágrafos de cada fechamento; CE303 os despacha após a recompensa existente. UT-032 e IT-052/053 passaram em ambas as ordens. A primeira inspeção revelou rostos excessivamente ampliados: `task-04-lover-framing.py` corrigiu os alvos para a abertura nativa usada por Ivaí; o reteste inclui enquadramento real. O bug histórico da prisão foi reconfirmado nas duas capturas e continua FAIL, com decisão de design pendente. Esse requisito visual permanece em V-004/task10; não foi dispensado.

ADR-G004/G006: implementação e fixture local concluídas; sensores dirigidos, transições/inspeção final, controles integrados e escuta conservam os donos08/10 e os resultados esperados originais. Checkboxes que exigem esses sensores permanecem abertos até sua evidência. Não há PASS global implícito.

Reteste combinado: `IT-052|IT-053|IT-054|IT-061|IT-014|IT-062|IT-067`, log `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/closing-and-continuity-second.log`: 6/7 PASS, falha exclusiva do seletor de Novo jogo do segundo arquivo em IT-014. Correção do seletor e reteste `IT-014`: PASS em138.5s, `checkpoints-two-files.log`. O primeiro lote `closing-native.log` conserva os PASS de IT-048/073/029 e as falhas do sensor posteriormente corrigidas.
