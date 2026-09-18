---
id: "05"
status: completed
depends_on: ["04"]
verification_ids: []
supporting_verification_ids: ["V-001", "V-002", "V-003", "V-004", "V-005", "V-006", "V-007", "V-008"]
---

# Task 05 — Council revelation and actual witness ensemble

## Outcome

The Council plays the approved replacement revelation once, alternates older Rheed over black with actual past participants, then shows reflected Andirá, eligible opinions and Irati last before the existing final choice.

## Authority

- [spec.md](spec.md): RQ-001/003/005/008/009/010/011.
- [verification.md](verification.md): scoped sensor contributions below; aggregate verdict owners are [tasks 08 and 10](tasks.md#coverage).
- [narrativa](approved-narrative-dialogue-staging.narrativa.md), [uiux](approved-narrative-dialogue-staging.uiux.md), [technical-art](approved-narrative-dialogue-staging.technical-art.md), [audio](approved-narrative-dialogue-staging.audio.md), [programacao](approved-narrative-dialogue-staging.programacao.md) contracts.
- PR #16 third-route prose, the narrative contract's Council table, canonical GDD §§15/19/26 and [temporal ADR](adrs/adr-001-rheed-temporal-presentation.md).
- [Shared execution contract](tasks.md#shared-execution-contract), including source freshness, native ownership, canonical commands, evidence and teardown.

## Scope

- Implementation: `rpg-maker/The Dryland Drowned/data/Map023.json` event001; `data/CommonEvents.json` CE068–079 and relevant CE067 cue branches; `js/plugins/Dryland_CampaignRules.js` Council plan construction/validation.
- Data/assets: existing Council, Ivaí, H1–H8 and reflected Andirá art; imported older Rheed. Native per-portrait framing/cleanup, no new illustration.
- Tests: `rpg-maker/tests/suites/endings.mjs` UT-033, IT-054/061 and their canonical closing helpers; `sacrifice.mjs` UT-027/028; closest `native-audio.mjs` checks. Preserve shared fixtures used by 06/07.
- Fixture/readiness owner: this task owns Council 0/1/2/3 witness setups, all canonically reachable hero-slot recipes, repeated temporal cuts, medallion checkpoint and branch/sequence observations.
- QA/docs: five replacement-block correspondence, independent expected plan and participant/target ledger for S-06/S-07.
- Delete targets: the replaced coffer-through-confession prose and obsolete staging commands only. Preserve Andirá/opinions/Irati wording, final choice, functional helpers and source history; no file deletion.

## Checklist

- [ ] Capture the existing actual Rules order, not just Map023's command layout. Replace entry and validation with one shared plan builder: council.01/.02/.03, exactly one challenge/solo, confession, andira, eligible opinion.H* in H1–H8 order, then irati.03.
- [ ] Map the five approved PR #16 speaking blocks exactly as the narrative contract prescribes. Both challenge/solo identities use the supplied paragraph under D-008; only real living climax participants appear. Remove the superseded revelation rather than repeat it.
- [ ] Retain medallion grant/checkpoint at council.01. Preserve final choices and stale-action rejection. Refresh query projections after passage completion and keep ReadingComplete on the captured interpreter after the last box.
- [ ] Author older Rheed alone over black at narrator blocks, clearing the outgoing ensemble/background/attachments; restore the same actual past positions at direct dialogue. Preserve Andirá as a water reflection and Irati as a textual document without portrait.
- [ ] Calibrate Ivaí and every eligible hero/slot for visible faces, speaker/listener focus and normal/reduced motion, preserving the 2026-09-15 correction. Wire temporal audio cuts without applause, keep same-context consecutive boxes stable, and fully clean the ensemble before outcome transfer.
- [ ] Run legal solo/mixed/full Council and all hero-slot native recipes. Assert sequence independently of the builder under test, no reserve/dead opinions or extra participants, exactly one medallion and no repeated branch. Exercise HIDE/Settings/seen FAST through the final choice.
- [ ] Supply native eligibility/render proof, representative cut recordings and earned-Council/final-choice entry requirements to 08/10; keep directed group Council pending.

## Validation

Execution mode/reference: Own the Council portion of S-06 through pure-domain and native-engine fixtures, labeling the two separately. S-07 is directed-browser in 10 with both motion profiles. Prepare all 0/1/2/3 witness variants and every eligible hero-slot recipe, with both desktop references available for visual review.

Invalidates/reuses: Use updated 04 Rules/reading fixtures and 01 assets/defaults/audio. Council plan, Map023, CE068–079, audio, art/defaults or serialized event-list changes invalidate affected fixtures/renders and saved Council parents.

Use the focused canonical command from [tasks.md](tasks.md#shared-execution-contract) with actual registered IDs, and record the exact command/result. Evidence names below are planned subdirectories beneath `docs/qa/evidence/approved-narrative-dialogue-staging/<run-id>/task-05/`; record actual canonical output paths when different.

| Verification ID | Command or sensor | Expected observable | Evidence path suffix |
| --- | --- | --- | --- |
| V-001/002 contribution | Source correspondence and UT-033/027/028 with independent plan oracle | Exact replacement, one mechanical branch, actual witnesses, Irati last, total-loss precedence unchanged | council-source-domain |
| V-003/007 contribution; S-06 Council | IT-054/061 real-engine recipes and medallion trace | Each unit completes once; no dead/reserve cast or repeated reward; final choice reachable | council-native |
| V-004/005/006 contribution | Ensemble/black-cut renders and transitions, controls/audio probes | No past pictures behind narrator; restored slots, reflection, correct focus and context | council-presentation |

## Execution Notes

Native implementation applied on 2026-09-18; focused integration validation is running. Record decisions, actual changed paths/IDs, fixtures, commands, evidence, limitations and remaining QA here; synchronize task/graph status and the existing verification owner. No automatic commit or remote action.



### Frozen closing batch

ADR-G004/G006 groups 04–07 evidence after serialized native writes because these tasks share Rules, CommonEvents, closing helpers and legal recipes. Their dependency order was preserved for implementation; no downstream task is declared verified before its prerequisites. Task-local `task-05-integrate.py` records the transformation. Pinned sources remain PR #16 `ba53ad9d1d3848a2aef80d34abf1f5d391489b6c` and PR #15 `537b7e825d695799033223810c7429d190f30172`.

Pure-domain/source command `node --test --test-name-pattern='UT-032|UT-033|UT-034|UT-035|UT-036|UT-027|UT-028' rpg-maker/tests/campaign.test.mjs`: 7/7 PASS. An initial UT-034 source check used Map25 instead of Map025; the test path was corrected and the full focused set passed. Native batch: `node --test --test-name-pattern='IT-052|IT-053|IT-054|IT-061|IT-048|IT-073|IT-029' rpg-maker/tests/campaign.test.mjs`; log `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/closing-native.log`. No native verdict yet.

### Scoped closure — 2026-09-18

O plano único de Council termina em Irati, após Andirá e opiniões elegíveis. Cinco blocos PR16 transcritos sem reescrever solo; UT-033, IT-054 e IT-061 passaram, cobrindo todos os slots elegíveis. A primeira execução falhou porque o sensor buscava Rheed anexado à janela no container comum. O helper agora seleciona o container real e espera renderização, sem modificar vendor; os dois casos passaram no reteste. Imagens, cortes em movimento e escuta continuam em V-004/006/task10.

ADR-G004/G006: implementação e fixture local concluídas; sensores dirigidos, transições/inspeção final, controles integrados e escuta conservam os donos08/10 e os resultados esperados originais. Checkboxes que exigem esses sensores permanecem abertos até sua evidência. Não há PASS global implícito.

Reteste combinado: `IT-052|IT-053|IT-054|IT-061|IT-014|IT-062|IT-067`, log `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/closing-and-continuity-second.log`: 6/7 PASS, falha exclusiva do seletor de Novo jogo do segundo arquivo em IT-014. Correção do seletor e reteste `IT-014`: PASS em138.5s, `checkpoints-two-files.log`. O primeiro lote `closing-native.log` conserva os PASS de IT-048/073/029 e as falhas do sensor posteriormente corrigidas.
